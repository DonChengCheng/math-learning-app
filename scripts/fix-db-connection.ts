import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

async function fixDatabaseConnection() {
  console.log('🔧 修复数据库连接问题...')
  console.log('=====================================')

  try {
    // 1. 尝试启动 Prisma 开发服务器
    console.log('\n1️⃣ 启动 Prisma 开发服务器...')
    try {
      // 首先停止旧的进程
      await execAsync('pkill -f "prisma"')
      console.log('   ✅ 已停止旧的 Prisma 进程')
    } catch {
      console.log('   ℹ️  没有运行中的 Prisma 进程')
    }

    // 启动新的开发服务器
    console.log('   🚀 启动新的开发服务器...')
    const { stdout, stderr } = await execAsync('npx prisma dev --detach', {
      env: { ...process.env, PRISMA_HIDE_UPDATE_MESSAGE: 'true' }
    })
    
    console.log('   ✅ Prisma 开发服务器已启动')
    if (stdout) console.log(stdout)
    if (stderr) console.log(stderr)

    // 等待服务器启动
    console.log('   ⏳ 等待服务器完全启动...')
    await new Promise(resolve => setTimeout(resolve, 3000))

    // 2. 测试数据库连接
    console.log('\n2️⃣ 测试数据库连接...')
    try {
      const { PrismaClient } = await import('@prisma/client')
      const prisma = new PrismaClient()
      
      await prisma.$connect()
      console.log('   ✅ 数据库连接成功！')
      
      // 获取数据库统计
      const courseCount = await prisma.course.count()
      console.log(`   📊 当前课程数: ${courseCount}`)
      
      await prisma.$disconnect()
    } catch (error) {
      console.error('   ❌ 数据库连接失败:', error.message)
      throw error
    }

    console.log('\n✅ 数据库连接问题已修复！')
    console.log('\n下一步操作：')
    console.log('1. 运行 npm run seed-linear-algebra 导入数据')
    console.log('2. 运行 npm run verify-linear-algebra 验证数据')
    console.log('3. 运行 npm run dev 启动开发服务器')

  } catch (error) {
    console.error('\n❌ 修复失败:', error)
    
    console.log('\n💡 备选方案：')
    console.log('1. 使用本地 PostgreSQL:')
    console.log('   - 安装 PostgreSQL: brew install postgresql')
    console.log('   - 启动服务: brew services start postgresql')
    console.log('   - 创建数据库: createdb math_learning')
    console.log('   - 修改 .env 文件使用本地数据库')
    console.log('\n2. 使用 SQLite (开发测试):')
    console.log('   - 修改 .env: DATABASE_URL="file:./dev.db"')
    console.log('   - 修改 schema.prisma: provider = "sqlite"')
    console.log('   - 运行 npx prisma db push')
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  fixDatabaseConnection()
    .then(() => process.exit(0))
    .catch(() => process.exit(1))
}

export { fixDatabaseConnection }