import { PrismaClient } from '@prisma/client'
import { LinearAlgebraContent, LinearAlgebraChapter, LinearAlgebraLesson, LinearAlgebraProblem } from '../types/linear-algebra'
import { contentFetcher, fetchLinearAlgebraContent } from './content-fetcher'

const prisma = new PrismaClient()

export class EnhancedLinearAlgebraImporter {
  private courseId: string | null = null
  private importProgress = {
    totalChapters: 0,
    completedChapters: 0,
    totalLessons: 0,
    completedLessons: 0,
    totalProblems: 0,
    completedProblems: 0,
    startTime: Date.now(),
    errors: [] as string[]
  }
  
  /**
   * 从网络数据源导入内容
   */
  async importFromWeb(subject: string = '线性代数'): Promise<void> {
    try {
      console.log('🌐 开始从网络获取课程内容...')
      console.log(`   主题: ${subject}`)
      
      // 从网络获取数据
      const content = await contentFetcher.fetchCourseBySubject(subject)
      
      if (!content) {
        throw new Error(`无法获取 ${subject} 的课程内容`)
      }
      
      console.log('✅ 成功获取课程数据')
      console.log(`   章节数: ${content.course.chapters.length}`)
      
      // 导入到数据库
      await this.importContent(content)
      
      // 显示导入统计
      this.showImportSummary()
      
    } catch (error) {
      console.error('❌ 导入失败:', error)
      throw error
    }
  }
  
  /**
   * 从本地文件导入（保持向后兼容）
   */
  async importFromLocal(content: LinearAlgebraContent): Promise<void> {
    console.log('📁 从本地文件导入课程内容...')
    await this.importContent(content)
    this.showImportSummary()
  }
  
  /**
   * 核心导入逻辑
   */
  private async importContent(content: LinearAlgebraContent): Promise<void> {
    try {
      // 初始化进度
      this.initializeProgress(content)
      
      console.log('\n📚 开始导入课程到数据库...')
      console.log('=====================================')
      
      // 创建课程
      await this.createCourse(content.course)
      
      // 批量导入章节
      await this.batchImportChapters(content.course.chapters)
      
      console.log('\n✅ 课程内容导入完成！')
      console.log(`   课程ID: ${this.courseId}`)
      
    } catch (error) {
      this.importProgress.errors.push(String(error))
      throw error
    }
  }
  
  /**
   * 批量导入章节（并行处理）
   */
  private async batchImportChapters(chapters: LinearAlgebraChapter[]): Promise<void> {
    const batchSize = 3 // 每批处理3个章节
    
    for (let i = 0; i < chapters.length; i += batchSize) {
      const batch = chapters.slice(i, i + batchSize)
      
      await Promise.all(
        batch.map(chapter => this.createChapter(chapter))
      )
      
      // 显示进度
      const progress = Math.round((i + batch.length) / chapters.length * 100)
      console.log(`   进度: ${progress}% (${i + batch.length}/${chapters.length} 章节)`)
    }
  }
  
  /**
   * 创建课程
   */
  private async createCourse(course: LinearAlgebraContent['course']): Promise<void> {
    console.log(`\n📘 创建课程: ${course.title}`)
    
    // 检查是否已存在
    const existing = await prisma.course.findFirst({
      where: {
        title: course.title,
        subject: course.subject
      }
    })
    
    if (existing) {
      console.log(`   ⚠️ 课程已存在，将更新内容`)
      
      // 更新现有课程
      const updated = await prisma.course.update({
        where: { id: existing.id },
        data: {
          description: course.description,
          level: course.level,
          order: course.order
        }
      })
      
      this.courseId = updated.id
      
      // 清理旧的章节（可选）
      if (process.env.CLEAN_OLD_DATA === 'true') {
        await prisma.chapter.deleteMany({
          where: { courseId: this.courseId }
        })
        console.log(`   🗑️ 已清理旧章节`)
      }
    } else {
      // 创建新课程
      const created = await prisma.course.create({
        data: {
          title: course.title,
          description: course.description,
          level: course.level,
          subject: course.subject,
          order: course.order
        }
      })
      
      this.courseId = created.id
    }
    
    console.log(`   ✅ 课程准备完成`)
  }
  
  /**
   * 创建章节
   */
  private async createChapter(chapter: LinearAlgebraChapter): Promise<void> {
    if (!this.courseId) {
      throw new Error('课程未创建，无法创建章节')
    }
    
    try {
      console.log(`\n📖 创建章节: ${chapter.title}`)
      
      const createdChapter = await prisma.chapter.create({
        data: {
          courseId: this.courseId,
          title: chapter.title,
          description: chapter.description,
          order: chapter.order
        }
      })
      
      this.importProgress.completedChapters++
      
      // 批量导入课时
      await this.batchImportLessons(chapter.lessons, createdChapter.id)
      
    } catch (error) {
      console.error(`   ❌ 章节创建失败: ${chapter.title}`)
      this.importProgress.errors.push(`章节 "${chapter.title}": ${error}`)
      throw error
    }
  }
  
  /**
   * 批量导入课时
   */
  private async batchImportLessons(lessons: LinearAlgebraLesson[], chapterId: string): Promise<void> {
    for (const lesson of lessons) {
      await this.createLesson(lesson, chapterId)
    }
  }
  
  /**
   * 创建课时
   */
  private async createLesson(lesson: LinearAlgebraLesson, chapterId: string): Promise<void> {
    try {
      console.log(`     📝 创建课时: ${lesson.title}`)
      
      // 清洗内容
      const cleanedContent = this.cleanLatexContent(lesson.content)
      
      const createdLesson = await prisma.lesson.create({
        data: {
          chapterId,
          title: lesson.title,
          content: cleanedContent,
          videoUrl: lesson.videoUrl || null,
          order: lesson.order
        }
      })
      
      this.importProgress.completedLessons++
      
      // 批量导入题目
      if (lesson.problems && lesson.problems.length > 0) {
        await this.batchImportProblems(lesson.problems, createdLesson.id)
      }
      
    } catch (error) {
      console.error(`     ❌ 课时创建失败: ${lesson.title}`)
      this.importProgress.errors.push(`课时 "${lesson.title}": ${error}`)
    }
  }
  
  /**
   * 批量导入题目
   */
  private async batchImportProblems(problems: LinearAlgebraProblem[], lessonId: string): Promise<void> {
    const batchSize = 10 // 每批处理10个题目
    
    for (let i = 0; i < problems.length; i += batchSize) {
      const batch = problems.slice(i, i + batchSize)
      
      await Promise.all(
        batch.map(problem => this.createProblem(problem, lessonId))
      )
    }
  }
  
  /**
   * 创建题目
   */
  private async createProblem(problem: LinearAlgebraProblem, lessonId: string): Promise<void> {
    try {
      // 清洗内容
      const cleanedContent = this.cleanLatexContent(problem.content)
      const cleanedExplanation = problem.explanation ? this.cleanLatexContent(problem.explanation) : null
      
      await prisma.problem.create({
        data: {
          lessonId,
          title: problem.title,
          content: cleanedContent,
          type: problem.type,
          difficulty: problem.difficulty,
          points: problem.points,
          answer: problem.answer as any,
          explanation: cleanedExplanation,
          tags: problem.tags
        }
      })
      
      this.importProgress.completedProblems++
      
    } catch (error) {
      console.error(`       ❌ 题目创建失败: ${problem.title}`)
      this.importProgress.errors.push(`题目 "${problem.title}": ${error}`)
    }
  }
  
  /**
   * LaTeX 内容清洗
   */
  private cleanLatexContent(content: string): string {
    if (!content) return content
    
    let cleaned = content
    
    // 修复常见的LaTeX问题
    cleaned = cleaned.replace(/\\\\\\\\begin\{/g, '\\begin{')
    cleaned = cleaned.replace(/\\\\\\\\end\{/g, '\\end{')
    cleaned = cleaned.replace(/\\\\\\\\\\\\\\\\/g, '\\\\')
    cleaned = cleaned.replace(/\$\$\s*\\\\/g, '$$\\')
    
    // 确保数学环境正确
    cleaned = cleaned.replace(/\$([^$]+)\$/g, (match, p1) => {
      // 确保内联数学表达式格式正确
      return `$${p1.trim()}$`
    })
    
    return cleaned
  }
  
  /**
   * 初始化进度追踪
   */
  private initializeProgress(content: LinearAlgebraContent): void {
    this.importProgress = {
      totalChapters: content.course.chapters.length,
      completedChapters: 0,
      totalLessons: content.course.chapters.reduce((sum, ch) => sum + ch.lessons.length, 0),
      completedLessons: 0,
      totalProblems: content.course.chapters.reduce(
        (sum, ch) => sum + ch.lessons.reduce(
          (lSum, l) => lSum + (l.problems?.length || 0), 0
        ), 0
      ),
      completedProblems: 0,
      startTime: Date.now(),
      errors: []
    }
  }
  
  /**
   * 显示导入摘要
   */
  private showImportSummary(): void {
    const duration = Date.now() - this.importProgress.startTime
    const minutes = Math.floor(duration / 60000)
    const seconds = Math.floor((duration % 60000) / 1000)
    
    console.log('\n=====================================')
    console.log('📊 导入统计')
    console.log('=====================================')
    console.log(`⏱️ 用时: ${minutes}分${seconds}秒`)
    console.log(`📖 章节: ${this.importProgress.completedChapters}/${this.importProgress.totalChapters}`)
    console.log(`📝 课时: ${this.importProgress.completedLessons}/${this.importProgress.totalLessons}`)
    console.log(`✏️ 题目: ${this.importProgress.completedProblems}/${this.importProgress.totalProblems}`)
    
    if (this.importProgress.errors.length > 0) {
      console.log(`\n⚠️ 错误数: ${this.importProgress.errors.length}`)
      this.importProgress.errors.slice(0, 5).forEach(err => {
        console.log(`   - ${err}`)
      })
      if (this.importProgress.errors.length > 5) {
        console.log(`   ... 还有 ${this.importProgress.errors.length - 5} 个错误`)
      }
    }
    
    console.log('=====================================')
  }
  
  /**
   * 获取导入统计
   */
  async getImportStats(): Promise<{
    coursesCount: number
    chaptersCount: number
    lessonsCount: number
    problemsCount: number
  }> {
    const [coursesCount, chaptersCount, lessonsCount, problemsCount] = await Promise.all([
      prisma.course.count({ where: { subject: '线性代数' } }),
      prisma.chapter.count({
        where: {
          course: { subject: '线性代数' }
        }
      }),
      prisma.lesson.count({
        where: {
          chapter: {
            course: { subject: '线性代数' }
          }
        }
      }),
      prisma.problem.count({
        where: {
          lesson: {
            chapter: {
              course: { subject: '线性代数' }
            }
          }
        }
      })
    ])
    
    return {
      coursesCount,
      chaptersCount,
      lessonsCount,
      problemsCount
    }
  }
  
  /**
   * 清理数据库中的线性代数内容
   */
  async cleanupLinearAlgebra(): Promise<void> {
    console.log('🗑️ 清理线性代数课程数据...')
    
    const courses = await prisma.course.findMany({
      where: { subject: '线性代数' },
      select: { id: true, title: true }
    })
    
    for (const course of courses) {
      console.log(`   删除课程: ${course.title}`)
      await prisma.course.delete({
        where: { id: course.id }
      })
    }
    
    console.log('✅ 清理完成')
  }
  
  /**
   * 清理资源
   */
  async cleanup(): Promise<void> {
    await prisma.$disconnect()
  }
}

// 导出便捷函数
export async function importLinearAlgebraFromWeb(): Promise<void> {
  const importer = new EnhancedLinearAlgebraImporter()
  try {
    await importer.importFromWeb('线性代数')
  } finally {
    await importer.cleanup()
  }
}

export async function cleanLinearAlgebraData(): Promise<void> {
  const importer = new EnhancedLinearAlgebraImporter()
  try {
    await importer.cleanupLinearAlgebra()
  } finally {
    await importer.cleanup()
  }
}