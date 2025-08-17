import { PrismaClient } from '@prisma/client'
import { LinearAlgebraContent, LinearAlgebraChapter, LinearAlgebraLesson, LinearAlgebraProblem } from '../types/linear-algebra'

const prisma = new PrismaClient()

export class LinearAlgebraImporter {
  private courseId: string | null = null

  // 数据清洗函数，确保LaTeX格式正确
  private cleanLatexContent(content: string): string {
    if (!content) return content
    
    // 移除可能的过度转义
    let cleaned = content
    
    // 修复可能的双重转义问题
    cleaned = cleaned.replace(/\\\\\\\\begin\{/g, '\\begin{')
    cleaned = cleaned.replace(/\\\\\\\\end\{/g, '\\end{')
    
    // 修复行分隔符的转义问题
    cleaned = cleaned.replace(/\\\\\\\\\\\\\\\\/g, '\\\\')
    
    // 确保数学环境的正确格式
    cleaned = cleaned.replace(/\$\$\s*\\\\/g, '$$\\')
    
    console.log(`已清洗内容，长度: ${content.length} -> ${cleaned.length}`)
    return cleaned
  }

  async importContent(content: LinearAlgebraContent): Promise<void> {
    try {
      console.log('开始导入线性代数课程内容...')
      
      await this.createCourse(content.course)
      
      for (const chapter of content.course.chapters) {
        await this.createChapter(chapter)
      }
      
      console.log('线性代数课程内容导入完成！')
      console.log(`课程ID: ${this.courseId}`)
      
    } catch (error) {
      console.error('导入过程中发生错误:', error)
      throw error
    }
  }

  private async createCourse(course: LinearAlgebraContent['course']): Promise<void> {
    console.log(`创建课程: ${course.title}`)
    
    const createdCourse = await prisma.course.create({
      data: {
        title: course.title,
        description: course.description,
        level: course.level,
        subject: course.subject,
        order: course.order
      }
    })
    
    this.courseId = createdCourse.id
    console.log(`✓ 课程创建成功: ${createdCourse.title}`)
  }

  private async createChapter(chapter: LinearAlgebraChapter): Promise<void> {
    if (!this.courseId) {
      throw new Error('课程未创建，无法创建章节')
    }

    console.log(`  创建章节: ${chapter.title}`)
    
    const createdChapter = await prisma.chapter.create({
      data: {
        courseId: this.courseId,
        title: chapter.title,
        description: chapter.description,
        order: chapter.order
      }
    })

    console.log(`  ✓ 章节创建成功: ${createdChapter.title}`)

    for (const lesson of chapter.lessons) {
      await this.createLesson(lesson, createdChapter.id)
    }
  }

  private async createLesson(lesson: LinearAlgebraLesson, chapterId: string): Promise<void> {
    console.log(`    创建课时: ${lesson.title}`)
    
    // 清洗课时内容中的LaTeX格式
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

    console.log(`    ✓ 课时创建成功: ${createdLesson.title}`)

    for (const problem of lesson.problems) {
      await this.createProblem(problem, createdLesson.id)
    }
  }

  private async createProblem(problem: LinearAlgebraProblem, lessonId: string): Promise<void> {
    console.log(`      创建题目: ${problem.title}`)
    
    // 清洗题目内容和解释中的LaTeX格式
    const cleanedContent = this.cleanLatexContent(problem.content)
    const cleanedExplanation = problem.explanation ? this.cleanLatexContent(problem.explanation) : null
    
    const createdProblem = await prisma.problem.create({
      data: {
        lessonId,
        title: problem.title,
        content: cleanedContent,
        type: problem.type,
        difficulty: problem.difficulty,
        points: problem.points,
        answer: problem.answer as any, // Prisma Json type
        explanation: cleanedExplanation,
        tags: problem.tags
      }
    })

    console.log(`      ✓ 题目创建成功: ${createdProblem.title}`)
  }

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

  async cleanup(): Promise<void> {
    await prisma.$disconnect()
  }
}

export async function validateLinearAlgebraContent(content: LinearAlgebraContent): Promise<boolean> {
  try {
    // 验证课程基本信息
    if (!content.course || !content.course.title || !content.course.description) {
      throw new Error('课程基本信息不完整')
    }

    // 验证章节
    if (!content.course.chapters || content.course.chapters.length === 0) {
      throw new Error('课程必须包含至少一个章节')
    }

    for (const chapter of content.course.chapters) {
      if (!chapter.title || !chapter.lessons || chapter.lessons.length === 0) {
        throw new Error(`章节 "${chapter.title}" 信息不完整或没有课时`)
      }

      // 验证课时
      for (const lesson of chapter.lessons) {
        if (!lesson.title || !lesson.content || !lesson.problems || lesson.problems.length === 0) {
          throw new Error(`课时 "${lesson.title}" 信息不完整或没有练习题`)
        }

        // 验证题目
        for (const problem of lesson.problems) {
          if (!problem.title || !problem.content || !problem.type || !problem.answer) {
            throw new Error(`题目 "${problem.title}" 信息不完整`)
          }

          // 验证答案格式
          if (problem.type === 'multiple_choice') {
            const answer = problem.answer as any
            if (!answer.options || !answer.correct || !Array.isArray(answer.options) || !Array.isArray(answer.correct)) {
              throw new Error(`选择题 "${problem.title}" 答案格式不正确`)
            }
          } else if (problem.type === 'fill_blank') {
            const answer = problem.answer as any
            if (!answer.blanks || !Array.isArray(answer.blanks)) {
              throw new Error(`填空题 "${problem.title}" 答案格式不正确`)
            }
          } else if (problem.type === 'solution') {
            const answer = problem.answer as any
            if (!answer.steps || !answer.finalAnswer || !Array.isArray(answer.steps)) {
              throw new Error(`解答题 "${problem.title}" 答案格式不正确`)
            }
          }
        }
      }
    }

    console.log('✓ 内容验证通过')
    return true
  } catch (error) {
    console.error('✗ 内容验证失败:', error instanceof Error ? error.message : String(error))
    return false
  }
}