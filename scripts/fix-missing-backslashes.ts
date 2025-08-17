import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function fixMissingBackslashes() {
  console.log('🔧 修复缺少反斜杠的LaTeX代码...')
  console.log('=====================================')

  try {
    // 获取所有包含缺少反斜杠问题的内容
    const lessons = await prisma.lesson.findMany({
      where: {
        OR: [
          { content: { contains: 'egin{' } },
          { content: { contains: 'end{' } },
          // 也要检查 end{ 而不是 \end{ 的情况
          { content: { contains: '$$end{' } }
        ]
      }
    })

    console.log(`找到 ${lessons.length} 个需要修复的课时`)

    let fixedCount = 0
    
    for (const lesson of lessons) {
      let originalContent = lesson.content
      let fixedContent = originalContent

      // 修复各种缺少反斜杠的情况
      
      // 1. 修复 $$egin{ -> $$\begin{
      fixedContent = fixedContent.replace(/\$\$egin\{/g, '$$\\begin{')
      
      // 2. 修复 end{}$$ -> \end{}$$
      fixedContent = fixedContent.replace(/end\{([^}]+)\}\$\$/g, '\\end{$1}$$')
      
      // 3. 修复行首的 egin{ -> \begin{
      fixedContent = fixedContent.replace(/^egin\{/gm, '\\begin{')
      
      // 4. 修复行首的 end{ -> \end{
      fixedContent = fixedContent.replace(/^end\{/gm, '\\end{')
      
      // 5. 修复在非$环境中的 egin{ 和 end{，但要小心不要重复修复
      // 匹配前面不是反斜杠的情况
      fixedContent = fixedContent.replace(/([^\\])egin\{/g, '$1\\begin{')
      fixedContent = fixedContent.replace(/([^\\])end\{/g, '$1\\end{')

      if (fixedContent !== originalContent) {
        await prisma.lesson.update({
          where: { id: lesson.id },
          data: { content: fixedContent }
        })
        
        console.log(`✅ 修复课时: ${lesson.title}`)
        fixedCount++
        
        // 显示一些修复的样本
        const changes = []
        if (originalContent.includes('$$egin{')) changes.push('$$egin{ → $$\\begin{')
        if (originalContent.includes('end{') && originalContent.includes('}$$')) changes.push('end{}$$ → \\end{}$$')
        
        if (changes.length > 0) {
          console.log(`   修复项: ${changes.join(', ')}`)
        }
      }
    }

    // 同样修复题目内容
    const problems = await prisma.problem.findMany({
      where: {
        OR: [
          { content: { contains: 'egin{' } },
          { content: { contains: 'end{' } }
        ]
      }
    })

    console.log(`\n找到 ${problems.length} 个需要修复的题目`)

    for (const problem of problems) {
      let originalContent = problem.content
      let fixedContent = originalContent

      // 应用同样的修复规则
      fixedContent = fixedContent.replace(/\$\$egin\{/g, '$$\\begin{')
      fixedContent = fixedContent.replace(/end\{([^}]+)\}\$\$/g, '\\end{$1}$$')
      fixedContent = fixedContent.replace(/^egin\{/gm, '\\begin{')
      fixedContent = fixedContent.replace(/^end\{/gm, '\\end{')
      fixedContent = fixedContent.replace(/([^\\])egin\{/g, '$1\\begin{')
      fixedContent = fixedContent.replace(/([^\\])end\{/g, '$1\\end{')

      if (fixedContent !== originalContent) {
        await prisma.problem.update({
          where: { id: problem.id },
          data: { content: fixedContent }
        })
        
        console.log(`✅ 修复题目: ${problem.title}`)
        fixedCount++
      }
    }

    console.log(`\n🎉 修复完成！总共修复了 ${fixedCount} 个内容项`)
    
    // 验证修复结果
    const remainingIssues = await prisma.lesson.count({
      where: {
        AND: [
          {
            OR: [
              { content: { contains: 'egin{' } },
              { content: { contains: '$$end{' } }
            ]
          },
          // 排除正确格式的内容
          {
            NOT: {
              AND: [
                { content: { contains: '\\begin{' } },
                { content: { contains: '\\end{' } }
              ]
            }
          }
        ]
      }
    })
    
    if (remainingIssues === 0) {
      console.log('✨ 验证通过：未发现剩余的反斜杠问题')
    } else {
      console.log(`⚠️  仍有 ${remainingIssues} 个内容项可能存在问题`)
    }
    
  } catch (error) {
    console.error('❌ 修复过程中出错:', error)
  } finally {
    await prisma.$disconnect()
  }
}

fixMissingBackslashes().catch(console.error)