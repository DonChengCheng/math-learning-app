import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function cleanLinearAlgebraData() {
  console.log('🧹 开始清理线性代数课程数据...')
  console.log('=====================================')

  try {
    // 查找线性代数课程
    const courses = await prisma.course.findMany({
      where: {
        subject: '线性代数'
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

    if (courses.length === 0) {
      console.log('ℹ️  未找到线性代数课程数据，无需清理')
      return
    }

    console.log(`找到 ${courses.length} 门线性代数课程`)

    for (const course of courses) {
      console.log(`\n🗑️  删除课程: ${course.title}`)
      
      // 统计要删除的数据
      const totalChapters = course.chapters.length
      const totalLessons = course.chapters.reduce((sum, chapter) => sum + chapter.lessons.length, 0)
      const totalProblems = course.chapters.reduce((sum, chapter) => 
        sum + chapter.lessons.reduce((lessonSum, lesson) => lessonSum + lesson.problems.length, 0), 0)

      console.log(`   章节数: ${totalChapters}`)
      console.log(`   课时数: ${totalLessons}`)
      console.log(`   题目数: ${totalProblems}`)

      // 删除课程（级联删除会自动删除相关数据）
      await prisma.course.delete({
        where: {
          id: course.id
        }
      })

      console.log(`   ✅ 课程 "${course.title}" 已删除`)
    }

    // 验证删除结果
    const remainingCourses = await prisma.course.count({
      where: {
        subject: '线性代数'
      }
    })

    const remainingChapters = await prisma.chapter.count({
      where: {
        course: {
          subject: '线性代数'
        }
      }
    })

    const remainingLessons = await prisma.lesson.count({
      where: {
        chapter: {
          course: {
            subject: '线性代数'
          }
        }
      }
    })

    const remainingProblems = await prisma.problem.count({
      where: {
        lesson: {
          chapter: {
            course: {
              subject: '线性代数'
            }
          }
        }
      }
    })

    console.log('\n📊 清理后统计:')
    console.log(`   剩余课程数: ${remainingCourses}`)
    console.log(`   剩余章节数: ${remainingChapters}`)
    console.log(`   剩余课时数: ${remainingLessons}`)
    console.log(`   剩余题目数: ${remainingProblems}`)

    if (remainingCourses === 0 && remainingChapters === 0 && remainingLessons === 0 && remainingProblems === 0) {
      console.log('\n🎉 线性代数课程数据清理完成！')
    } else {
      console.log('\n⚠️  清理可能未完全成功，请检查数据')
    }

  } catch (error) {
    console.error('❌ 清理过程中发生错误:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  cleanLinearAlgebraData()
    .then(() => {
      console.log('\n✨ 清理脚本执行完成')
      process.exit(0)
    })
    .catch((error) => {
      console.error('💥 清理脚本执行失败:', error)
      process.exit(1)
    })
}

export { cleanLinearAlgebraData }