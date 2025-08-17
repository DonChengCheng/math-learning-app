import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkDatabaseContent() {
  try {
    // 查找线性代数课程
    const course = await prisma.course.findFirst({
      where: { title: '线性代数' },
      include: {
        chapters: {
          include: {
            lessons: {
              take: 1,
              orderBy: { order: 'asc' }
            }
          },
          orderBy: { order: 'asc' },
          take: 1
        }
      }
    })

    if (course && course.chapters[0] && course.chapters[0].lessons[0]) {
      const lesson = course.chapters[0].lessons[0]
      console.log('课时标题:', lesson.title)
      console.log('\n内容预览（前500字符）:')
      console.log(lesson.content.substring(0, 500))
      
      // 检查是否包含正确的LaTeX标记
      console.log('\n检查LaTeX标记:')
      console.log('包含 $$\\begin{vmatrix}:', lesson.content.includes('$$\\begin{vmatrix}'))
      console.log('包含 $\\begin{vmatrix}:', lesson.content.includes('$\\begin{vmatrix}'))
      console.log('包含 \\begin{vmatrix}:', lesson.content.includes('\\begin{vmatrix}'))
      
      // 查找第一个矩阵内容
      const matrixStart = lesson.content.indexOf('\\begin{vmatrix}')
      if (matrixStart !== -1) {
        console.log('\n第一个矩阵附近的内容:')
        console.log(lesson.content.substring(Math.max(0, matrixStart - 20), matrixStart + 100))
      }
    }
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkDatabaseContent()