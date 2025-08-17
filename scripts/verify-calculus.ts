import { verifyCalculusContent } from '@/lib/calculus-importer'
import { testDatabaseConnection, disconnectPrisma } from '@/lib/prisma'

async function main() {
  console.log('🔍 开始验证微积分课程数据...')
  
  try {
    // 测试数据库连接
    console.log('测试数据库连接...')
    await testDatabaseConnection()
    
    // 验证微积分内容
    const result = await verifyCalculusContent()
    
    if (result.success) {
      console.log('✅ 微积分课程数据验证成功!')
    } else {
      console.log('❌ 微积分课程数据验证失败:', result.message)
    }
    
  } catch (error) {
    console.error('❌ 微积分课程数据验证出错:', error)
    process.exit(1)
  } finally {
    await disconnectPrisma()
  }
}

main()