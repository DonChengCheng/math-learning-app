import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function finalLatexCleanup() {
  console.log('🧹 进行最终LaTeX清理...')
  console.log('=====================================')

  try {
    // 获取所有线性代数课时
    const lessons = await prisma.lesson.findMany({
      where: {
        chapter: {
          course: {
            title: '线性代数'
          }
        }
      },
      include: {
        chapter: {
          include: {
            course: true
          }
        }
      }
    })

    console.log(`找到 ${lessons.length} 个线性代数课时`)

    let fixedCount = 0
    
    for (const lesson of lessons) {
      let originalContent = lesson.content
      let fixedContent = originalContent

      // 全面的LaTeX格式修复

      // 1. 修复 \\b\\begin 这种错误格式
      fixedContent = fixedContent.replace(/\\\\b\\\\begin\{/g, '\\\\begin{')
      
      // 2. 修复 $$\\b\\begin -> $$\\begin
      fixedContent = fixedContent.replace(/\$\$\\\\b\\\\begin\{/g, '$$\\\\begin{')
      
      // 3. 修复缺少反斜杠的情况
      fixedContent = fixedContent.replace(/\$\$\\\\begin\{vmatrix\}/g, '$$\\\\begin{vmatrix}')
      fixedContent = fixedContent.replace(/\$\$\\\\begin\{pmatrix\}/g, '$$\\\\begin{pmatrix}')
      fixedContent = fixedContent.replace(/\$\$\\\\begin\{bmatrix\}/g, '$$\\\\begin{bmatrix}')
      
      // 4. 修复行尾的end问题
      fixedContent = fixedContent.replace(/\\\\\\\\\\\\end\{/g, '\\\\\\\\end{')
      
      // 5. 确保所有begin都有正确的反斜杠
      // 但要小心不要破坏已经正确的格式
      const lines = fixedContent.split('\\n')
      const fixedLines = lines.map(line => {
        // 只修复明显错误的行
        if (line.includes('$$') && line.includes('egin{vmatrix}')) {
          line = line.replace(/egin\{vmatrix\}/g, '\\\\begin{vmatrix}')
        }
        if (line.includes('$$') && line.includes('end{vmatrix}')) {
          line = line.replace(/end\{vmatrix\}/g, '\\\\end{vmatrix}')
        }
        if (line.includes('$$') && line.includes('egin{pmatrix}')) {
          line = line.replace(/egin\{pmatrix\}/g, '\\\\begin{pmatrix}')
        }
        if (line.includes('$$') && line.includes('end{pmatrix}')) {
          line = line.replace(/end\{pmatrix\}/g, '\\\\end{pmatrix}')
        }
        return line
      })
      
      fixedContent = fixedLines.join('\\n')

      if (fixedContent !== originalContent) {
        await prisma.lesson.update({
          where: { id: lesson.id },
          data: { content: fixedContent }
        })
        
        console.log(`✅ 清理课时: ${lesson.title}`)
        fixedCount++
        
        // 显示修复前后的对比示例
        const oldSample = originalContent.substring(400, 600)
        const newSample = fixedContent.substring(400, 600)
        if (oldSample !== newSample) {
          console.log(`   Before: ${oldSample.replace(/\\n/g, '↵')}`)
          console.log(`   After:  ${newSample.replace(/\\n/g, '↵')}`)
        }
      }
    }

    // 同样修复题目
    const problems = await prisma.problem.findMany({
      where: {
        lesson: {
          chapter: {
            course: {
              title: '线性代数'
            }
          }
        }
      }
    })

    console.log(`\\n找到 ${problems.length} 个线性代数题目`)

    for (const problem of problems) {
      let originalContent = problem.content
      let fixedContent = originalContent

      // 应用同样的修复规则
      fixedContent = fixedContent.replace(/\\\\b\\\\begin\{/g, '\\\\begin{')
      fixedContent = fixedContent.replace(/\$\$\\\\b\\\\begin\{/g, '$$\\\\begin{')
      
      const lines = fixedContent.split('\\n')
      const fixedLines = lines.map(line => {
        if (line.includes('$$') && line.includes('egin{')) {
          line = line.replace(/egin\{([^}]+)\}/g, '\\\\begin{$1}')
        }
        if (line.includes('$$') && line.includes('end{')) {
          line = line.replace(/end\{([^}]+)\}/g, '\\\\end{$1}')
        }
        return line
      })
      
      fixedContent = fixedLines.join('\\n')

      if (fixedContent !== originalContent) {
        await prisma.problem.update({
          where: { id: problem.id },
          data: { content: fixedContent }
        })
        
        console.log(`✅ 清理题目: ${problem.title}`)
        fixedCount++
      }
    }

    console.log(`\\n🎉 清理完成！总共修复了 ${fixedCount} 个内容项`)
    
  } catch (error) {
    console.error('❌ 清理过程中出错:', error)
  } finally {
    await prisma.$disconnect()
  }
}

finalLatexCleanup().catch(console.error)