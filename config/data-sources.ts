export interface DataSource {
  id: string
  name: string
  description: string
  type: 'api' | 'json' | 'markdown'
  url: string
  headers?: Record<string, string>
  auth?: {
    type: 'bearer' | 'api-key' | 'basic'
    token?: string
    username?: string
    password?: string
  }
  rateLimit?: {
    requests: number
    period: number // in seconds
  }
}

export interface ContentSource {
  source: DataSource
  transform?: (data: any) => any
  validate?: (data: any) => boolean
}

// 数据源配置
export const dataSources: Record<string, DataSource> = {
  // GitHub 存储的 JSON 数据
  githubLinearAlgebra: {
    id: 'github-linear-algebra',
    name: 'GitHub Linear Algebra Content',
    description: '从 GitHub 获取线性代数课程内容',
    type: 'json',
    url: process.env.LINEAR_ALGEBRA_DATA_URL || 'https://raw.githubusercontent.com/example/math-content/main/linear-algebra.json',
    headers: {
      'Accept': 'application/json',
      'Cache-Control': 'no-cache'
    }
  },
  
  // 教育 API 示例
  openEducationApi: {
    id: 'open-education-api',
    name: 'Open Education API',
    description: '开放教育 API 提供的数学课程',
    type: 'api',
    url: process.env.EDUCATION_API_URL || 'https://api.example.edu/v1/courses',
    auth: {
      type: 'bearer',
      token: process.env.EDUCATION_API_TOKEN
    },
    rateLimit: {
      requests: 100,
      period: 3600 // 1 hour
    }
  },
  
  // Khan Academy 风格的 API（示例）
  khanAcademyStyle: {
    id: 'khan-academy-style',
    name: 'Khan Academy Style API',
    description: '类似 Khan Academy 的课程数据源',
    type: 'api',
    url: process.env.KHAN_STYLE_API_URL || 'https://api.example.com/math/courses',
    headers: {
      'Content-Type': 'application/json'
    }
  },
  
  // Markdown 文件源
  markdownContent: {
    id: 'markdown-content',
    name: 'Markdown Content Source',
    description: '从 Markdown 文件获取课程内容',
    type: 'markdown',
    url: process.env.MARKDOWN_CONTENT_URL || 'https://raw.githubusercontent.com/example/content/main/{subject}/{chapter}.md'
  },
  
  // 本地开发用的模拟数据源
  mockData: {
    id: 'mock-data',
    name: 'Mock Data Source',
    description: '用于开发和测试的模拟数据',
    type: 'json',
    url: process.env.MOCK_SERVER_URL || 'http://localhost:3002/api/mock-courses'
  }
}

// 课程主题到数据源的映射
export const subjectSourceMapping: Record<string, string> = {
  '线性代数': process.env.USE_MOCK_DATA === 'true' ? 'mockData' : 'githubLinearAlgebra',
  '微积分': 'openEducationApi',
  '概率统计': 'khanAcademyStyle',
  '离散数学': 'markdownContent',
  '测试课程': 'mockData'
}

// 获取特定主题的数据源
export function getDataSourceForSubject(subject: string): DataSource | null {
  const sourceId = subjectSourceMapping[subject]
  if (!sourceId) return null
  return dataSources[sourceId] || null
}

// 验证数据源配置
export function validateDataSource(source: DataSource): boolean {
  if (!source.url) {
    console.error(`数据源 ${source.id} 缺少 URL`)
    return false
  }
  
  if (source.auth) {
    if (source.auth.type === 'bearer' && !source.auth.token) {
      console.warn(`数据源 ${source.id} 需要 Bearer token 但未提供`)
      return false
    }
    if (source.auth.type === 'basic' && (!source.auth.username || !source.auth.password)) {
      console.warn(`数据源 ${source.id} 需要用户名和密码但未提供`)
      return false
    }
  }
  
  return true
}

// 默认的数据转换函数
export const defaultTransformers = {
  // Khan Academy 风格到我们的格式
  khanToOurFormat: (data: any) => {
    return {
      course: {
        title: data.title,
        description: data.description,
        level: data.grade_level || '高中',
        subject: data.subject,
        chapters: data.units?.map((unit: any, index: number) => ({
          title: unit.title,
          description: unit.description,
          order: index + 1,
          lessons: unit.lessons?.map((lesson: any, lessonIndex: number) => ({
            title: lesson.title,
            content: lesson.content || lesson.markdown_content,
            videoUrl: lesson.video_url,
            order: lessonIndex + 1,
            problems: lesson.exercises?.map((exercise: any, exerciseIndex: number) => ({
              title: exercise.title || `练习 ${exerciseIndex + 1}`,
              content: exercise.question,
              type: exercise.type || 'solution',
              difficulty: exercise.difficulty || 3,
              points: exercise.points || 10,
              answer: exercise.answer,
              explanation: exercise.explanation,
              tags: exercise.tags || []
            })) || []
          })) || []
        })) || []
      }
    }
  },
  
  // Markdown 到结构化数据
  markdownToStructured: (markdown: string) => {
    // 这里需要实现 Markdown 解析逻辑
    // 可以使用 remark 或其他 Markdown 解析库
    console.log('Markdown 解析功能待实现')
    return null
  }
}