import { PrismaClient } from '@prisma/client'
import { LinearAlgebraImporter, validateLinearAlgebraContent } from '../lib/linear-algebra-importer'
import { linearAlgebraContent } from '../data/linear-algebra-content'

const prisma = new PrismaClient()

async function main() {
  console.log('🚀 开始线性代数课程数据导入...')
  console.log('==========================================')

  try {
    // 1. 验证内容
    console.log('📋 第一步: 验证课程内容...')
    const isValid = await validateLinearAlgebraContent(linearAlgebraContent)
    
    if (!isValid) {
      throw new Error('课程内容验证失败，请检查数据格式')
    }

    // 2. 检查是否已存在线性代数课程
    console.log('\n🔍 第二步: 检查现有数据...')
    const existingCourse = await prisma.course.findFirst({
      where: {
        subject: '线性代数',
        level: '大学'
      }
    })

    if (existingCourse) {
      console.log('⚠️  发现已存在的线性代数课程')
      console.log('如需重新导入，请先删除现有数据或修改课程标识')
      
      // 显示现有课程信息
      const stats = await getExistingStats()
      console.log('\n📊 现有数据统计:')
      console.log(`   课程数: ${stats.coursesCount}`)
      console.log(`   章节数: ${stats.chaptersCount}`)
      console.log(`   课时数: ${stats.lessonsCount}`)
      console.log(`   题目数: ${stats.problemsCount}`)
      
      return
    }

    // 3. 导入数据
    console.log('\n📥 第三步: 导入课程数据...')
    const importer = new LinearAlgebraImporter()
    
    await importer.importContent(linearAlgebraContent)

    // 4. 显示导入统计
    console.log('\n📊 第四步: 统计导入结果...')
    const stats = await importer.getImportStats()
    
    console.log('\n✅ 导入完成！统计信息:')
    console.log('==========================================')
    console.log(`📚 课程数: ${stats.coursesCount}`)
    console.log(`📖 章节数: ${stats.chaptersCount}`) 
    console.log(`📝 课时数: ${stats.lessonsCount}`)
    console.log(`🎯 题目数: ${stats.problemsCount}`)
    console.log('==========================================')

    // 5. 清理资源
    await importer.cleanup()

  } catch (error) {
    console.error('❌ 导入过程中发生错误:')
    console.error(error instanceof Error ? error.message : String(error))
    
    if (error instanceof Error && error.stack) {
      console.error('\n详细错误信息:')
      console.error(error.stack)
    }
    
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

async function getExistingStats() {
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

// 如果直接运行此脚本
if (require.main === module) {
  main()
    .then(() => {
      console.log('\n🎉 脚本执行完成')
      process.exit(0)
    })
    .catch((error) => {
      console.error('💥 脚本执行失败:', error)
      process.exit(1)
    })
}

export { main as seedLinearAlgebra }