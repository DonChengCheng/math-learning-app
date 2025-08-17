import { PrismaClient } from '@prisma/client'
import { EnhancedLinearAlgebraImporter } from '../lib/enhanced-linear-algebra-importer'
import { contentFetcher } from '../lib/content-fetcher'
import { dataSources } from '../config/data-sources'

const prisma = new PrismaClient()

// 支持的命令行参数
interface SeedOptions {
  subject?: string
  source?: string
  clean?: boolean
  checkHealth?: boolean
  dryRun?: boolean
}

/**
 * 解析命令行参数
 */
function parseArgs(): SeedOptions {
  const args = process.argv.slice(2)
  const options: SeedOptions = {}
  
  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--subject':
      case '-s':
        options.subject = args[++i]
        break
      case '--source':
        options.source = args[++i]
        break
      case '--clean':
      case '-c':
        options.clean = true
        break
      case '--check-health':
        options.checkHealth = true
        break
      case '--dry-run':
        options.dryRun = true
        break
    }
  }
  
  return options
}

/**
 * 检查所有数据源健康状态
 */
async function checkDataSourcesHealth() {
  console.log('🏥 检查数据源健康状态...')
  console.log('=====================================')
  
  const sources = Object.values(dataSources)
  const results = await contentFetcher.checkAllSourcesHealth(sources)
  
  const healthy = Array.from(results.values()).filter(v => v).length
  console.log(`\n总计: ${healthy}/${sources.length} 数据源可用`)
}

/**
 * 从网络导入单个主题
 */
async function importSubjectFromWeb(subject: string, options: SeedOptions) {
  const importer = new EnhancedLinearAlgebraImporter()
  
  try {
    // 清理旧数据（如果指定）
    if (options.clean) {
      console.log('🗑️ 清理旧数据...')
      await importer.cleanupLinearAlgebra()
    }
    
    // 干运行模式
    if (options.dryRun) {
      console.log('🔍 干运行模式 - 仅获取数据不导入')
      const content = await contentFetcher.fetchCourseBySubject(subject)
      if (content) {
        console.log('✅ 数据获取成功')
        console.log(`   章节数: ${content.course.chapters.length}`)
        const totalLessons = content.course.chapters.reduce((sum, ch) => sum + ch.lessons.length, 0)
        const totalProblems = content.course.chapters.reduce(
          (sum, ch) => sum + ch.lessons.reduce(
            (lSum, l) => lSum + (l.problems?.length || 0), 0
          ), 0
        )
        console.log(`   课时数: ${totalLessons}`)
        console.log(`   题目数: ${totalProblems}`)
      }
      return
    }
    
    // 实际导入
    await importer.importFromWeb(subject)
    
    // 显示导入统计
    const stats = await importer.getImportStats()
    console.log('\n📊 数据库统计:')
    console.log(`   课程: ${stats.coursesCount}`)
    console.log(`   章节: ${stats.chaptersCount}`)
    console.log(`   课时: ${stats.lessonsCount}`)
    console.log(`   题目: ${stats.problemsCount}`)
    
  } finally {
    await importer.cleanup()
  }
}

/**
 * 批量导入多个主题
 */
async function importMultipleSubjects(subjects: string[], options: SeedOptions) {
  console.log(`📚 准备导入 ${subjects.length} 个主题`)
  console.log('=====================================')
  
  for (const subject of subjects) {
    console.log(`\n\n🎯 开始导入: ${subject}`)
    console.log('-------------------------------------')
    
    try {
      await importSubjectFromWeb(subject, options)
      console.log(`✅ ${subject} 导入成功`)
    } catch (error) {
      console.error(`❌ ${subject} 导入失败:`, error)
    }
  }
}

/**
 * 主函数
 */
async function main() {
  const options = parseArgs()
  
  console.log('🚀 课程数据网络导入工具')
  console.log('=====================================')
  console.log('选项:', options)
  console.log()
  
  try {
    // 检查数据源健康状态
    if (options.checkHealth) {
      await checkDataSourcesHealth()
      return
    }
    
    // 确定要导入的主题
    const subjects = options.subject 
      ? [options.subject]
      : ['线性代数'] // 默认导入线性代数
    
    // 导入数据
    if (subjects.length === 1) {
      await importSubjectFromWeb(subjects[0], options)
    } else {
      await importMultipleSubjects(subjects, options)
    }
    
    console.log('\n✅ 所有操作完成！')
    
  } catch (error) {
    console.error('\n❌ 导入过程出错:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

// 显示使用帮助
function showHelp() {
  console.log(`
使用方法:
  npx tsx prisma/seed-from-web.ts [选项]

选项:
  -s, --subject <name>    指定要导入的主题 (默认: 线性代数)
  --source <id>           指定数据源ID
  -c, --clean            导入前清理旧数据
  --check-health         检查所有数据源的健康状态
  --dry-run              干运行模式，仅获取数据不导入
  
示例:
  # 导入线性代数（默认）
  npx tsx prisma/seed-from-web.ts
  
  # 导入微积分
  npx tsx prisma/seed-from-web.ts --subject 微积分
  
  # 清理旧数据后导入
  npx tsx prisma/seed-from-web.ts --clean
  
  # 检查数据源状态
  npx tsx prisma/seed-from-web.ts --check-health
  
  # 干运行模式
  npx tsx prisma/seed-from-web.ts --dry-run

支持的主题:
  - 线性代数
  - 微积分
  - 概率统计
  - 离散数学
`)
}

// 处理帮助命令
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  showHelp()
  process.exit(0)
}

// 运行主函数
if (require.main === module) {
  main().catch(console.error)
}