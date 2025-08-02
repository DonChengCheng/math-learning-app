import { PrismaClient } from '@prisma/client'

async function testConnection() {
  console.log('🔍 测试数据库连接...')
  
  const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  })

  try {
    console.log('📡 连接到数据库...')
    await prisma.$connect()
    console.log('✅ 数据库连接成功！')

    console.log('\n📊 获取数据库信息...')
    const courseCount = await prisma.course.count()
    console.log(`   课程数量: ${courseCount}`)

    if (courseCount === 0) {
      console.log('\n⚠️  数据库为空，需要导入数据')
      console.log('   运行: npm run seed-linear-algebra')
    } else {
      const courses = await prisma.course.findMany({
        include: {
          _count: {
            select: {
              chapters: true
            }
          }
        }
      })

      console.log('\n📚 课程列表:')
      courses.forEach(course => {
        console.log(`   - ${course.title} (${course._count.chapters} 章节)`)
      })
    }

    console.log('\n🎉 测试完成！')
  } catch (error) {
    console.error('\n❌ 数据库连接失败:')
    console.error(error)
    
    console.log('\n💡 解决方案:')
    console.log('1. 确保 Prisma 开发服务器正在运行:')
    console.log('   npx prisma dev')
    console.log('2. 检查 .env 文件中的 DATABASE_URL')
    console.log('3. 尝试重新生成客户端:')
    console.log('   npx prisma generate')
  } finally {
    await prisma.$disconnect()
  }
}

// 直接运行
testConnection()
  .then(() => process.exit(0))
  .catch(() => process.exit(1))