import { prisma } from '@/lib/prisma'
import { calculusContent } from '@/data/calculus-content'

export async function importCalculusContent() {
  console.log('开始导入微积分课程内容...')
  
  try {
    // 创建课程
    const course = await prisma.course.create({
      data: {
        title: calculusContent.course.title,
        description: calculusContent.course.description,
        level: calculusContent.course.level,
        subject: calculusContent.course.subject,
        order: calculusContent.course.order,
      }
    })
    
    console.log(`创建课程: ${course.title}`)
    
    // 创建章节和课时
    for (const chapterData of calculusContent.course.chapters) {
      const chapter = await prisma.chapter.create({
        data: {
          title: chapterData.title,
          description: chapterData.description,
          order: chapterData.order,
          courseId: course.id,
        }
      })
      
      console.log(`  创建章节: ${chapter.title}`)
      
      // 创建课时
      for (const lessonData of chapterData.lessons) {
        const lesson = await prisma.lesson.create({
          data: {
            title: lessonData.title,
            content: lessonData.content,
            videoUrl: lessonData.videoUrl || null,
            order: lessonData.order,
            chapterId: chapter.id,
          }
        })
        
        console.log(`    创建课时: ${lesson.title}`)
        
        // 创建练习题
        for (const problemData of lessonData.problems) {
          const problem = await prisma.problem.create({
            data: {
              title: problemData.title,
              content: problemData.content,
              type: problemData.type,
              difficulty: problemData.difficulty,
              points: problemData.points,
              answer: problemData.answer as any,
              explanation: problemData.explanation,
              tags: problemData.tags,
              lessonId: lesson.id,
            }
          })
          
          console.log(`      创建练习题: ${problem.title}`)
        }
      }
    }
    
    console.log('微积分课程内容导入完成!')
    return { success: true, courseId: course.id }
    
  } catch (error) {
    console.error('导入微积分课程内容时出错:', error)
    throw error
  }
}

export async function cleanCalculusContent() {
  console.log('开始清理微积分课程内容...')
  
  try {
    // 查找微积分课程
    const course = await prisma.course.findFirst({
      where: {
        subject: '微积分'
      },
      include: {
        chapters: {
          include: {
            lessons: {
              include: {
                problems: true
              }
            }
          }
        }
      }
    })
    
    if (!course) {
      console.log('未找到微积分课程，无需清理')
      return { success: true, message: '未找到微积分课程' }
    }
    
    // 删除练习题
    for (const chapter of course.chapters) {
      for (const lesson of chapter.lessons) {
        await prisma.problem.deleteMany({
          where: { lessonId: lesson.id }
        })
      }
    }
    
    // 删除课时
    for (const chapter of course.chapters) {
      await prisma.lesson.deleteMany({
        where: { chapterId: chapter.id }
      })
    }
    
    // 删除章节
    await prisma.chapter.deleteMany({
      where: { courseId: course.id }
    })
    
    // 删除课程
    await prisma.course.delete({
      where: { id: course.id }
    })
    
    console.log('微积分课程内容清理完成!')
    return { success: true, message: '微积分课程内容已清理' }
    
  } catch (error) {
    console.error('清理微积分课程内容时出错:', error)
    throw error
  }
}

export async function verifyCalculusContent() {
  console.log('开始验证微积分课程内容...')
  
  try {
    const course = await prisma.course.findFirst({
      where: {
        subject: '微积分'
      },
      include: {
        chapters: {
          include: {
            lessons: {
              include: {
                problems: true
              }
            }
          }
        }
      }
    })
    
    if (!course) {
      console.log('❌ 未找到微积分课程')
      return { success: false, message: '未找到微积分课程' }
    }
    
    console.log(`✅ 找到课程: ${course.title}`)
    console.log(`📚 章节数量: ${course.chapters.length}`)
    
    let totalLessons = 0
    let totalProblems = 0
    
    for (const chapter of course.chapters) {
      console.log(`  📖 章节: ${chapter.title} (${chapter.lessons.length} 课时)`)
      totalLessons += chapter.lessons.length
      
      for (const lesson of chapter.lessons) {
        totalProblems += lesson.problems.length
        console.log(`    📝 课时: ${lesson.title} (${lesson.problems.length} 练习题)`)
      }
    }
    
    console.log(`📊 总计: ${totalLessons} 课时, ${totalProblems} 练习题`)
    console.log('微积分课程内容验证完成!')
    
    return { 
      success: true, 
      stats: {
        courseTitle: course.title,
        chaptersCount: course.chapters.length,
        lessonsCount: totalLessons,
        problemsCount: totalProblems
      }
    }
    
  } catch (error) {
    console.error('验证微积分课程内容时出错:', error)
    throw error
  }
}