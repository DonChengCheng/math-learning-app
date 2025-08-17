import { importCalculusContent } from '@/lib/calculus-importer'
import { testDatabaseConnection, disconnectPrisma } from '@/lib/prisma'

async function main() {
  console.log('🧮 开始微积分课程种子数据导入...')
  
  try {
    // 测试数据库连接
    console.log('测试数据库连接...')
    await testDatabaseConnection()
    
    // 导入微积分内容
    await importCalculusContent()
    
    console.log('✅ 微积分课程种子数据导入成功!')
    
  } catch (error) {
    console.error('❌ 微积分课程种子数据导入失败:', error)
    process.exit(1)
  } finally {
    await disconnectPrisma()
  }
}

main()