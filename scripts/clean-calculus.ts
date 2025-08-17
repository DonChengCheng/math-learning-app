import { cleanCalculusContent } from '@/lib/calculus-importer'
import { testDatabaseConnection, disconnectPrisma } from '@/lib/prisma'

async function main() {
  console.log('🧹 开始清理微积分课程数据...')
  
  try {
    // 测试数据库连接
    console.log('测试数据库连接...')
    await testDatabaseConnection()
    
    // 清理微积分内容
    await cleanCalculusContent()
    
    console.log('✅ 微积分课程数据清理成功!')
    
  } catch (error) {
    console.error('❌ 微积分课程数据清理失败:', error)
    process.exit(1)
  } finally {
    await disconnectPrisma()
  }
}

main()