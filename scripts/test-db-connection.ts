import { PrismaClient } from '@prisma/client'

async function testConnection() {
  console.log('🧪 测试数据库连接...')
  
  const prisma = new PrismaClient({
    log: ['error'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL
      }
    }
  })

  try {
    // 测试基本连接
    console.log('1. 测试基本连接...')
    await prisma.$connect()
    console.log('✅ Prisma客户端连接成功')

    // 测试原始查询
    console.log('2. 测试原始查询...')
    const result = await prisma.$queryRaw`SELECT 1 as test`
    console.log('✅ 原始查询成功:', result)

    // 测试表查询
    console.log('3. 测试表查询...')
    const courseCount = await prisma.course.count()
    console.log(`✅ 表查询成功: 找到${courseCount}个课程`)

    // 如果有数据，测试具体查询
    if (courseCount > 0) {
      console.log('4. 测试具体查询...')
      const courses = await prisma.course.findMany({
        take: 3,
        select: {
          id: true,
          title: true,
          subject: true,
          level: true
        }
      })
      console.log('✅ 具体查询成功:')
      courses.forEach(course => {
        console.log(`   - ${course.title} (${course.level} - ${course.subject})`)
      })
    } else {
      console.log('ℹ️  数据库中暂无课程数据')
    }

    console.log('\n🎉 所有连接测试通过！')
    return true

  } catch (error) {
    console.error('❌ 连接测试失败:', error)
    if (error instanceof Error) {
      console.error('错误详情:', error.message)
    }
    return false

  } finally {
    try {
      await prisma.$disconnect()
      console.log('📤 数据库连接已断开')
    } catch (error) {
      console.error('警告: 断开连接时出错:', error)
    }
  }
}

if (require.main === module) {
  testConnection()
    .then((success) => {
      process.exit(success ? 0 : 1)
    })
    .catch((error) => {
      console.error('脚本执行失败:', error)
      process.exit(1)
    })
}

export { testConnection }