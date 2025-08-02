import { prisma, testDatabaseConnection, disconnectPrisma } from '../lib/prisma'

async function verifyLinearAlgebraData() {
  console.log('🔍 验证线性代数课程数据...')
  console.log('=====================================')

  // 首先测试数据库连接
  console.log('🔌 检查数据库连接...')
  const isConnected = await testDatabaseConnection()
  if (!isConnected) {
    console.error('❌ 数据库连接失败')
    return false
  }
  console.log('✅ 数据库连接正常')

  try {
    // 查询课程信息
    const course = await prisma.course.findFirst({
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

    if (!course) {
      console.log('❌ 未找到线性代数课程')
      return
    }

    console.log('✅ 课程信息:')
    console.log(`   标题: ${course.title}`)
    console.log(`   描述: ${course.description}`)
    console.log(`   级别: ${course.level}`)
    console.log(`   学科: ${course.subject}`)
    console.log('')

    console.log('📚 章节信息:')
    for (const chapter of course.chapters) {
      console.log(`   ${chapter.order}. ${chapter.title}`)
      console.log(`      描述: ${chapter.description}`)
      
      console.log('   📝 课时:')
      for (const lesson of chapter.lessons) {
        console.log(`      ${lesson.order}. ${lesson.title}`)
        console.log(`         题目数: ${lesson.problems.length}`)
        
        // 显示题目类型统计
        const problemTypes = lesson.problems.reduce((acc, problem) => {
          acc[problem.type] = (acc[problem.type] || 0) + 1
          return acc
        }, {} as Record<string, number>)
        
        console.log(`         题目类型: ${JSON.stringify(problemTypes)}`)
      }
      console.log('')
    }

    // 统计信息
    const totalLessons = course.chapters.reduce((sum, chapter) => sum + chapter.lessons.length, 0)
    const totalProblems = course.chapters.reduce((sum, chapter) => 
      sum + chapter.lessons.reduce((lessonSum, lesson) => lessonSum + lesson.problems.length, 0), 0)

    console.log('📊 统计信息:')
    console.log(`   章节数: ${course.chapters.length}`)
    console.log(`   课时数: ${totalLessons}`)
    console.log(`   题目数: ${totalProblems}`)

    // 验证LaTeX内容
    console.log('\n🧮 LaTeX内容检查:')
    let latexCount = 0
    for (const chapter of course.chapters) {
      for (const lesson of chapter.lessons) {
        if (lesson.content.includes('$') || lesson.content.includes('\\')) {
          latexCount++
        }
      }
    }
    console.log(`   包含LaTeX的课时: ${latexCount}`)

    // 验证题目答案格式
    console.log('\n✅ 题目答案格式检查:')
    const answerTypes = { multiple_choice: 0, fill_blank: 0, solution: 0 }
    for (const chapter of course.chapters) {
      for (const lesson of chapter.lessons) {
        for (const problem of lesson.problems) {
          answerTypes[problem.type as keyof typeof answerTypes]++
        }
      }
    }
    console.log(`   选择题: ${answerTypes.multiple_choice}`)
    console.log(`   填空题: ${answerTypes.fill_blank}`)
    console.log(`   解答题: ${answerTypes.solution}`)

    console.log('\n🎉 验证完成！数据结构正确。')
    return true

  } catch (error) {
    console.error('❌ 验证过程中发生错误:', error)
    if (error instanceof Error) {
      console.error('错误详情:', error.message)
      if (error.message.includes('prepared statement')) {
        console.log('💡 提示: 尝试重启数据库连接或重新生成Prisma客户端')
      }
    }
    return false
  } finally {
    // 在脚本环境下断开连接
    if (require.main === module) {
      await disconnectPrisma()
    }
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  verifyLinearAlgebraData()
}

export { verifyLinearAlgebraData }