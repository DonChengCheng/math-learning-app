import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkAlignIssue() {
  try {
    // 查找线性代数课程第一章的内容
    const lesson = await prisma.lesson.findFirst({
      where: { 
        title: { contains: '1.1' },
        chapter: {
          course: { title: '线性代数' }
        }
      }
    })

    if (lesson) {
      console.log('课时标题:', lesson.title)
      
      // 查找沙吕斯公式部分
      const alignIndex = lesson.content.indexOf('沙吕斯公式')
      if (alignIndex !== -1) {
        const snippet = lesson.content.substring(alignIndex - 50, alignIndex + 200)
        console.log('\n沙吕斯公式附近的内容:')
        console.log('---')
        console.log(snippet)
        console.log('---')
        
        // 检查是否包含正确的格式
        console.log('\n格式检查:')
        const alignStart = lesson.content.indexOf('$$\\begin{align}', alignIndex)
        const alignStartWrong = lesson.content.indexOf('\\begin{align}', alignIndex)
        console.log('包含 $$\\begin{align}:', alignStart !== -1, '位置:', alignStart)
        console.log('包含 \\begin{align} (无$$):', alignStartWrong !== -1, '位置:', alignStartWrong)
        
        if (alignStartWrong !== -1 && alignStartWrong < alignStart) {
          console.log('\n⚠️ 发现问题：\\begin{align} 前面缺少 $$')
          
          // 显示问题区域
          const problemArea = lesson.content.substring(alignStartWrong - 20, alignStartWrong + 100)
          console.log('问题区域:')
          console.log(problemArea)
        }
      }
    }
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkAlignIssue()