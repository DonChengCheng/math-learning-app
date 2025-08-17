import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function fixBackslashEscaping() {
  console.log('🔧 修复LaTeX反斜杠转义问题...')
  console.log('=====================================')

  try {
    // 获取所有包含LaTeX环境的课时
    const lessons = await prisma.lesson.findMany({
      where: {
        OR: [
          { content: { contains: '\\begin{' } },
          { content: { contains: '\\end{' } },
          { content: { contains: 'egin{' } }
        ]
      }
    })

    console.log(`找到 ${lessons.length} 个需要检查的课时`)

    let fixedCount = 0
    
    for (const lesson of lessons) {
      let originalContent = lesson.content
      let fixedContent = originalContent
      let hasChanges = false

      // 修复各种反斜杠转义问题
      
      // 1. 修复 \begin{ -> \\begin{ (单反斜杠变双反斜杠)
      const singleBackslashBegin = /([^\\])\\begin\{/g
      if (singleBackslashBegin.test(fixedContent)) {
        fixedContent = fixedContent.replace(singleBackslashBegin, '$1\\\\begin{')
        hasChanges = true
      }
      
      // 2. 修复 \end{ -> \\end{ (单反斜杠变双反斜杠)  
      const singleBackslashEnd = /([^\\])\\end\{/g
      if (singleBackslashEnd.test(fixedContent)) {
        fixedContent = fixedContent.replace(singleBackslashEnd, '$1\\\\end{')
        hasChanges = true
      }
      
      // 3. 修复行首的 \begin{ -> \\begin{
      const lineStartBegin = /^\\begin\{/gm
      if (lineStartBegin.test(fixedContent)) {
        fixedContent = fixedContent.replace(lineStartBegin, '\\\\begin{')
        hasChanges = true
      }
      
      // 4. 修复行首的 \end{ -> \\end{
      const lineStartEnd = /^\\end\{/gm
      if (lineStartEnd.test(fixedContent)) {
        fixedContent = fixedContent.replace(lineStartEnd, '\\\\end{')
        hasChanges = true
      }
      
      // 5. 修复 $$\begin{ -> $$\\begin{
      const dollarBegin = /\$\$\\begin\{/g
      if (dollarBegin.test(fixedContent)) {
        fixedContent = fixedContent.replace(dollarBegin, '$$\\\\begin{')
        hasChanges = true
      }
      
      // 6. 修复 \end{}$$ -> \\end{}$$
      const dollarEnd = /\\end\{([^}]+)\}\$\$/g
      if (dollarEnd.test(fixedContent)) {
        fixedContent = fixedContent.replace(dollarEnd, '\\\\end{$1}$$')
        hasChanges = true
      }
      
      // 7. 修复 egin{ -> \\begin{ (完全缺失反斜杠的情况)
      const missingBackslashBegin = /([^\\])egin\{/g
      if (missingBackslashBegin.test(fixedContent)) {
        fixedContent = fixedContent.replace(missingBackslashBegin, '$1\\\\begin{')
        hasChanges = true
      }
      
      // 8. 修复行首的 egin{ -> \\begin{
      const lineStartMissingBegin = /^egin\{/gm
      if (lineStartMissingBegin.test(fixedContent)) {
        fixedContent = fixedContent.replace(lineStartMissingBegin, '\\\\begin{')
        hasChanges = true
      }

      if (hasChanges) {
        await prisma.lesson.update({
          where: { id: lesson.id },
          data: { content: fixedContent }
        })
        
        console.log(`✅ 修复课时: ${lesson.title}`)
        fixedCount++
        
        // 显示修复示例
        const originalSample = originalContent.substring(400, 600).replace(/\\n/g, '↵')
        const fixedSample = fixedContent.substring(400, 600).replace(/\\n/g, '↵')
        
        if (originalSample !== fixedSample) {
          console.log(`   Before: ${originalSample}`)
          console.log(`   After:  ${fixedSample}`)
        }
      }
    }

    // 同样修复题目内容
    const problems = await prisma.problem.findMany({
      where: {
        OR: [
          { content: { contains: '\\begin{' } },
          { content: { contains: '\\end{' } },
          { content: { contains: 'egin{' } }
        ]
      }
    })

    console.log(`\\n找到 ${problems.length} 个需要检查的题目`)

    for (const problem of problems) {
      let originalContent = problem.content
      let fixedContent = originalContent
      let hasChanges = false

      // 应用同样的修复规则
      const patterns = [
        { from: /([^\\])\\begin\{/g, to: '$1\\\\begin{' },
        { from: /([^\\])\\end\{/g, to: '$1\\\\end{' },
        { from: /^\\begin\{/gm, to: '\\\\begin{' },
        { from: /^\\end\{/gm, to: '\\\\end{' },
        { from: /\$\$\\begin\{/g, to: '$$\\\\begin{' },
        { from: /\\end\{([^}]+)\}\$\$/g, to: '\\\\end{$1}$$' },
        { from: /([^\\])egin\{/g, to: '$1\\\\begin{' },
        { from: /^egin\{/gm, to: '\\\\begin{' }
      ]

      patterns.forEach(({ from, to }) => {
        if (from.test(fixedContent)) {
          fixedContent = fixedContent.replace(from, to)
          hasChanges = true
        }
      })

      if (hasChanges) {
        await prisma.problem.update({
          where: { id: problem.id },
          data: { content: fixedContent }
        })
        
        console.log(`✅ 修复题目: ${problem.title}`)
        fixedCount++
      }
    }

    console.log(`\\n🎉 修复完成！总共修复了 ${fixedCount} 个内容项`)
    
    // 验证修复结果
    const remainingIssues = await prisma.lesson.count({
      where: {
        OR: [
          // 检查是否还有单反斜杠的LaTeX环境
          { content: { contains: '$$\\begin{' } },
          { content: { contains: '\\end{}$$' } },
          // 检查是否还有缺失反斜杠的情况
          { content: { contains: 'egin{' } }
        ]
      }
    })
    
    console.log(`\\n📊 验证结果: ${remainingIssues === 0 ? '✅ 无剩余问题' : `⚠️  仍有 ${remainingIssues} 个可能的问题`}`)
    
  } catch (error) {
    console.error('❌ 修复过程中出错:', error)
  } finally {
    await prisma.$disconnect()
  }
}

fixBackslashEscaping().catch(console.error)