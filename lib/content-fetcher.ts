import { DataSource, getDataSourceForSubject, validateDataSource, defaultTransformers } from '@/config/data-sources'
import { LinearAlgebraContent } from '@/types/linear-algebra'

interface FetchOptions {
  maxRetries?: number
  retryDelay?: number
  timeout?: number
  cache?: boolean
  cacheTime?: number // in seconds
}

interface CacheEntry {
  data: any
  timestamp: number
  ttl: number
}

export class ContentFetcher {
  private cache: Map<string, CacheEntry> = new Map()
  private rateLimitTracker: Map<string, { count: number; resetTime: number }> = new Map()
  
  constructor(private defaultOptions: FetchOptions = {}) {
    this.defaultOptions = {
      maxRetries: 3,
      retryDelay: 1000,
      timeout: 30000,
      cache: true,
      cacheTime: 3600, // 1 hour
      ...defaultOptions
    }
  }
  
  /**
   * 从数据源获取内容
   */
  async fetchFromSource(source: DataSource, options?: FetchOptions): Promise<any> {
    const opts = { ...this.defaultOptions, ...options }
    
    // 验证数据源配置
    if (!validateDataSource(source)) {
      throw new Error(`数据源配置无效: ${source.id}`)
    }
    
    // 检查缓存
    if (opts.cache) {
      const cached = this.getFromCache(source.id)
      if (cached) {
        console.log(`✅ 从缓存获取数据: ${source.id}`)
        return cached
      }
    }
    
    // 检查速率限制
    await this.checkRateLimit(source)
    
    // 获取数据
    const data = await this.fetchWithRetry(source, opts)
    
    // 存入缓存
    if (opts.cache && data) {
      this.saveToCache(source.id, data, opts.cacheTime!)
    }
    
    return data
  }
  
  /**
   * 根据主题获取课程内容
   */
  async fetchCourseBySubject(subject: string, options?: FetchOptions): Promise<LinearAlgebraContent | null> {
    const source = getDataSourceForSubject(subject)
    
    if (!source) {
      throw new Error(`未找到主题 "${subject}" 的数据源`)
    }
    
    console.log(`📚 正在获取 ${subject} 课程内容...`)
    console.log(`   数据源: ${source.name}`)
    
    try {
      const rawData = await this.fetchFromSource(source, options)
      
      // 根据数据源类型进行转换
      let transformedData = rawData
      
      if (source.id === 'khanAcademyStyle') {
        transformedData = defaultTransformers.khanToOurFormat(rawData)
      } else if (source.type === 'markdown') {
        transformedData = defaultTransformers.markdownToStructured(rawData)
      }
      
      // 验证转换后的数据
      if (!this.validateCourseData(transformedData)) {
        throw new Error('数据格式验证失败')
      }
      
      return transformedData as LinearAlgebraContent
      
    } catch (error) {
      console.error(`❌ 获取 ${subject} 课程失败:`, error)
      throw error
    }
  }
  
  /**
   * 批量获取多个主题的课程
   */
  async fetchMultipleCourses(subjects: string[], options?: FetchOptions): Promise<Map<string, LinearAlgebraContent>> {
    const results = new Map<string, LinearAlgebraContent>()
    
    for (const subject of subjects) {
      try {
        const content = await this.fetchCourseBySubject(subject, options)
        if (content) {
          results.set(subject, content)
        }
      } catch (error) {
        console.error(`跳过主题 ${subject}:`, error)
      }
    }
    
    return results
  }
  
  /**
   * 带重试的 fetch
   */
  private async fetchWithRetry(source: DataSource, options: FetchOptions): Promise<any> {
    let lastError: Error | null = null
    
    for (let attempt = 0; attempt <= (options.maxRetries || 3); attempt++) {
      try {
        if (attempt > 0) {
          console.log(`   重试 ${attempt}/${options.maxRetries}...`)
          await this.delay(options.retryDelay! * attempt)
        }
        
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), options.timeout!)
        
        const fetchOptions: RequestInit = {
          method: 'GET',
          headers: this.buildHeaders(source),
          signal: controller.signal
        }
        
        const response = await fetch(source.url, fetchOptions)
        clearTimeout(timeoutId)
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }
        
        // 根据内容类型解析响应
        const contentType = response.headers.get('content-type')
        
        if (contentType?.includes('application/json')) {
          return await response.json()
        } else if (source.type === 'markdown' || contentType?.includes('text/')) {
          return await response.text()
        } else {
          return await response.blob()
        }
        
      } catch (error: any) {
        lastError = error
        
        if (error.name === 'AbortError') {
          console.error(`   ⏱️ 请求超时 (${options.timeout}ms)`)
        } else {
          console.error(`   ❌ 请求失败:`, error.message)
        }
      }
    }
    
    throw lastError || new Error('获取数据失败')
  }
  
  /**
   * 构建请求头
   */
  private buildHeaders(source: DataSource): HeadersInit {
    const headers: HeadersInit = {
      ...source.headers
    }
    
    if (source.auth) {
      switch (source.auth.type) {
        case 'bearer':
          headers['Authorization'] = `Bearer ${source.auth.token}`
          break
        case 'api-key':
          headers['X-API-Key'] = source.auth.token!
          break
        case 'basic':
          const credentials = Buffer.from(`${source.auth.username}:${source.auth.password}`).toString('base64')
          headers['Authorization'] = `Basic ${credentials}`
          break
      }
    }
    
    return headers
  }
  
  /**
   * 检查速率限制
   */
  private async checkRateLimit(source: DataSource): Promise<void> {
    if (!source.rateLimit) return
    
    const tracker = this.rateLimitTracker.get(source.id)
    const now = Date.now()
    
    if (tracker) {
      if (now < tracker.resetTime) {
        if (tracker.count >= source.rateLimit.requests) {
          const waitTime = tracker.resetTime - now
          console.log(`⏳ 速率限制，等待 ${Math.ceil(waitTime / 1000)} 秒...`)
          await this.delay(waitTime)
          // 重置计数器
          this.rateLimitTracker.set(source.id, {
            count: 1,
            resetTime: now + source.rateLimit.period * 1000
          })
          return
        }
        tracker.count++
      } else {
        // 时间窗口已过，重置
        this.rateLimitTracker.set(source.id, {
          count: 1,
          resetTime: now + source.rateLimit.period * 1000
        })
      }
    } else {
      // 首次请求
      this.rateLimitTracker.set(source.id, {
        count: 1,
        resetTime: now + source.rateLimit.period * 1000
      })
    }
  }
  
  /**
   * 缓存管理
   */
  private getFromCache(key: string): any | null {
    const entry = this.cache.get(key)
    if (!entry) return null
    
    const now = Date.now()
    if (now > entry.timestamp + entry.ttl * 1000) {
      this.cache.delete(key)
      return null
    }
    
    return entry.data
  }
  
  private saveToCache(key: string, data: any, ttl: number): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    })
  }
  
  /**
   * 清除缓存
   */
  clearCache(sourceId?: string): void {
    if (sourceId) {
      this.cache.delete(sourceId)
    } else {
      this.cache.clear()
    }
    console.log('✅ 缓存已清除')
  }
  
  /**
   * 验证课程数据格式
   */
  private validateCourseData(data: any): boolean {
    if (!data || !data.course) return false
    
    const course = data.course
    if (!course.title || !course.description || !course.chapters) return false
    
    if (!Array.isArray(course.chapters) || course.chapters.length === 0) return false
    
    for (const chapter of course.chapters) {
      if (!chapter.title || !chapter.lessons || !Array.isArray(chapter.lessons)) return false
      
      for (const lesson of chapter.lessons) {
        if (!lesson.title || !lesson.content) return false
      }
    }
    
    return true
  }
  
  /**
   * 延迟函数
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
  
  /**
   * 获取数据源状态
   */
  async checkSourceHealth(source: DataSource): Promise<boolean> {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000)
      
      const response = await fetch(source.url, {
        method: 'HEAD',
        headers: this.buildHeaders(source),
        signal: controller.signal
      })
      
      clearTimeout(timeoutId)
      return response.ok
    } catch {
      return false
    }
  }
  
  /**
   * 批量检查数据源健康状态
   */
  async checkAllSourcesHealth(sources: DataSource[]): Promise<Map<string, boolean>> {
    const results = new Map<string, boolean>()
    
    await Promise.all(
      sources.map(async (source) => {
        const isHealthy = await this.checkSourceHealth(source)
        results.set(source.id, isHealthy)
        console.log(`${isHealthy ? '✅' : '❌'} ${source.name}: ${isHealthy ? '正常' : '不可用'}`)
      })
    )
    
    return results
  }
}

// 导出单例实例
export const contentFetcher = new ContentFetcher()

// 便捷函数
export async function fetchLinearAlgebraContent(): Promise<LinearAlgebraContent | null> {
  return contentFetcher.fetchCourseBySubject('线性代数')
}

export async function fetchAllMathCourses(): Promise<Map<string, LinearAlgebraContent>> {
  const subjects = ['线性代数', '微积分', '概率统计', '离散数学']
  return contentFetcher.fetchMultipleCourses(subjects)
}