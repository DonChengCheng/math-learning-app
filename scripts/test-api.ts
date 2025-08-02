import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function testLinearAlgebraAPI() {
  console.log('🧪 测试线性代数API数据获取...')
  console.log('=====================================')

  try {
    // 模拟API调用 - 获取所有课程
    const courses = await prisma.course.findMany({
      where: {
        subject: '线性代数'
      },
      include: {
        chapters: {
          orderBy: { order: 'asc' },
          include: {
            lessons: {
              orderBy: { order: 'asc' },
              include: {
                problems: {
                  select: {
                    id: true,
                    title: true,
                    type: true,
                    difficulty: true,
                    points: true
                  }
                }
              }
            }
          }
        }
      }
    })

    console.log('✅ 获取课程列表成功')
    console.log(`找到 ${courses.length} 门线性代数课程`)

    if (courses.length === 0) {
      console.log('❌ 未找到线性代数课程')
      return
    }

    const course = courses[0]
    console.log(`\n📚 课程: ${course.title}`)
    console.log(`   ID: ${course.id}`)
    console.log(`   级别: ${course.level}`)

    // 模拟API调用 - 获取特定课程详情
    const courseDetail = await prisma.course.findUnique({
      where: { id: course.id },
      include: {
        chapters: {
          orderBy: { order: 'asc' },
          include: {
            lessons: {
              orderBy: { order: 'asc' },
              select: {
                id: true,
                title: true,
                order: true
              }
            }
          }
        }
      }
    })

    if (courseDetail) {
      console.log('\n✅ 获取课程详情成功')
      console.log('章节结构:')
      
      for (const chapter of courseDetail.chapters) {
        console.log(`  📖 ${chapter.title}`)
        for (const lesson of chapter.lessons) {
          console.log(`    📝 ${lesson.title}`)
        }
      }
    }

    // 模拟API调用 - 获取特定课时内容
    if (courseDetail && courseDetail.chapters.length > 0) {
      const firstLesson = courseDetail.chapters[0].lessons[0]
      
      const lessonDetail = await prisma.lesson.findUnique({
        where: { id: firstLesson.id },
        include: {
          chapter: {
            include: {
              course: {
                select: {
                  id: true,
                  title: true,
                  level: true,
                  subject: true
                }
              }
            }
          },
          problems: {
            select: {
              id: true,
              title: true,
              content: true,
              type: true,
              difficulty: true,
              points: true,
              tags: true
            }
          }
        }
      })

      if (lessonDetail) {
        console.log('\n✅ 获取课时详情成功')
        console.log(`📝 课时: ${lessonDetail.title}`)
        console.log(`   章节: ${lessonDetail.chapter.title}`)
        console.log(`   课程: ${lessonDetail.chapter.course.title}`)
        console.log(`   题目数: ${lessonDetail.problems.length}`)
        
        // 检查内容是否包含LaTeX
        const hasLatex = lessonDetail.content.includes('$') || lessonDetail.content.includes('\\')
        console.log(`   包含LaTeX: ${hasLatex ? '✅' : '❌'}`)
        
        if (lessonDetail.problems.length > 0) {
          console.log('   题目类型分布:')
          const typeCount = lessonDetail.problems.reduce((acc, p) => {
            acc[p.type] = (acc[p.type] || 0) + 1
            return acc
          }, {} as Record<string, number>)
          
          Object.entries(typeCount).forEach(([type, count]) => {
            console.log(`     ${type}: ${count}`)
          })
        }
      }
    }

    console.log('\n🎉 API测试完成！所有接口都能正常返回数据。')

  } catch (error) {
    console.error('❌ API测试失败:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  testLinearAlgebraAPI()
}

export { testLinearAlgebraAPI }