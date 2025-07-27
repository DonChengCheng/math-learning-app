import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('开始创建示例课程数据...')

  // 清理现有数据
  await prisma.progress.deleteMany()
  await prisma.problem.deleteMany()
  await prisma.lesson.deleteMany()
  await prisma.chapter.deleteMany()
  await prisma.course.deleteMany()

  // 小学数学课程
  const primaryMathCourse = await prisma.course.create({
    data: {
      title: '小学数学基础',
      description: '适合小学生的数学基础课程，包含加减乘除、分数、几何等基础知识',
      level: '小学',
      subject: '数学',
      order: 1,
      chapters: {
        create: [
          {
            title: '数与运算',
            description: '学习基本的数字概念和四则运算',
            order: 1,
            lessons: {
              create: [
                {
                  title: '认识数字1-10',
                  content: '# 认识数字1-10\n\n在这一课中，我们将学习数字1到10的认识和书写。\n\n## 学习目标\n- 能够正确识别数字1-10\n- 学会数字的正确书写方法\n- 理解数字的大小关系\n\n## 数字展示\n1, 2, 3, 4, 5, 6, 7, 8, 9, 10',
                  order: 1,
                  problems: {
                    create: [
                      {
                        title: '数字识别',
                        content: '请选择数字"5"',
                        type: 'multiple_choice',
                        difficulty: 1,
                        points: 10,
                        answer: { correct: 'B', options: ['3', '5', '7', '9'] },
                        explanation: '数字5的形状像一个钩子',
                        tags: ['数字识别', '基础']
                      }
                    ]
                  }
                },
                {
                  title: '加法入门',
                  content: '# 加法入门\n\n加法是数学中最基本的运算之一。\n\n## 什么是加法？\n加法就是把两个或多个数合在一起。\n\n## 加法符号\n我们用"+"号表示加法，用"="号表示等于。\n\n## 例子\n1 + 1 = 2\n2 + 3 = 5',
                  order: 2,
                  problems: {
                    create: [
                      {
                        title: '简单加法',
                        content: '计算：2 + 3 = ?',
                        type: 'fill_blank',
                        difficulty: 1,
                        points: 10,
                        answer: { correct: '5' },
                        explanation: '2个苹果加上3个苹果，一共是5个苹果',
                        tags: ['加法', '基础运算']
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            title: '几何图形',
            description: '认识基本的几何图形',
            order: 2,
            lessons: {
              create: [
                {
                  title: '认识圆形',
                  content: '# 认识圆形\n\n圆形是我们生活中常见的图形。\n\n## 圆形的特点\n- 没有角\n- 边是弯曲的\n- 从中心到边的距离都相等\n\n## 生活中的圆形\n- 车轮\n- 硬币\n- 钟表',
                  order: 1
                }
              ]
            }
          }
        ]
      }
    }
  })

  // 初中数学课程
  const middleMathCourse = await prisma.course.create({
    data: {
      title: '初中代数基础',
      description: '初中阶段的代数基础知识，包含方程、不等式、函数等内容',
      level: '初中',
      subject: '代数',
      order: 1,
      chapters: {
        create: [
          {
            title: '一元一次方程',
            description: '学习一元一次方程的概念、解法和应用',
            order: 1,
            lessons: {
              create: [
                {
                  title: '什么是一元一次方程',
                  content: '# 一元一次方程\n\n## 定义\n只含有一个未知数，且未知数的次数是1的方程叫做一元一次方程。\n\n## 一般形式\nax + b = 0 (其中a≠0)\n\n## 例子\n- 2x + 3 = 7\n- 5x - 1 = 9\n- x + 4 = 10',
                  order: 1,
                  problems: {
                    create: [
                      {
                        title: '识别一元一次方程',
                        content: '下列哪个是一元一次方程？',
                        type: 'multiple_choice',
                        difficulty: 2,
                        points: 15,
                        answer: { 
                          correct: 'A', 
                          options: ['2x + 1 = 5', 'x² + 1 = 0', '2x + y = 3', '1/x = 2'] 
                        },
                        explanation: '一元一次方程只有一个未知数，且次数为1',
                        tags: ['一元一次方程', '概念理解']
                      }
                    ]
                  }
                },
                {
                  title: '解一元一次方程',
                  content: '# 解一元一次方程\n\n## 解方程的步骤\n1. 去分母\n2. 去括号\n3. 移项\n4. 合并同类项\n5. 系数化为1\n\n## 例题\n解方程：2x + 3 = 7\n\n解：\n2x = 7 - 3\n2x = 4\nx = 2',
                  order: 2
                }
              ]
            }
          }
        ]
      }
    }
  })

  // 高中数学课程
  const highMathCourse = await prisma.course.create({
    data: {
      title: '高中函数与导数',
      description: '高中数学函数概念、性质和导数的基础知识',
      level: '高中',
      subject: '函数',
      order: 1,
      chapters: {
        create: [
          {
            title: '函数的概念',
            description: '理解函数的定义、表示方法和基本性质',
            order: 1,
            lessons: {
              create: [
                {
                  title: '函数的定义',
                  content: '# 函数的定义\n\n## 函数的概念\n设A、B是非空的数集，如果按照某个确定的对应关系f，使对于集合A中的任意一个数x，在集合B中都有唯一确定的数f(x)和它对应，那么就称f：A→B为从集合A到集合B的一个函数。\n\n## 函数的三要素\n- 定义域\n- 值域\n- 对应关系\n\n## 函数的表示方法\n- 解析法：y = f(x)\n- 图象法：坐标系中的图形\n- 列表法：表格形式',
                  order: 1,
                  problems: {
                    create: [
                      {
                        title: '函数概念理解',
                        content: '下列关系中，哪个是函数关系？',
                        type: 'multiple_choice',
                        difficulty: 3,
                        points: 20,
                        answer: { 
                          correct: 'A', 
                          options: ['y = 2x + 1', 'x² + y² = 1', 'x = y²', '|y| = x'] 
                        },
                        explanation: '函数要求对于定义域内每个x值，都有唯一的y值对应',
                        tags: ['函数', '概念理解']
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            title: '导数的概念',
            description: '理解导数的定义和几何意义',
            order: 2,
            lessons: {
              create: [
                {
                  title: '导数的定义',
                  content: '# 导数的定义\n\n## 导数的定义\n函数y = f(x)在点x₀处的导数定义为：\n\nf\'(x₀) = lim[h→0] [f(x₀+h) - f(x₀)]/h\n\n## 导数的几何意义\n函数y = f(x)在点x₀处的导数f\'(x₀)就是曲线y = f(x)在点(x₀, f(x₀))处的切线斜率。\n\n## 导数的物理意义\n导数表示函数在某点的瞬时变化率。',
                  order: 1
                }
              ]
            }
          }
        ]
      }
    }
  })

  // 大学数学课程
  const collegeMathCourse = await prisma.course.create({
    data: {
      title: '高等数学（一）',
      description: '大学高等数学课程，涵盖极限、连续、导数和积分等内容',
      level: '大学',
      subject: '高等数学',
      order: 1,
      chapters: {
        create: [
          {
            title: '极限与连续',
            description: '学习极限的概念、性质和连续函数',
            order: 1,
            lessons: {
              create: [
                {
                  title: '数列极限',
                  content: '# 数列极限\n\n## 数列极限的定义\n设{aₙ}为一数列，如果存在常数a，对于任意给定的正数ε（无论它多么小），总存在正整数N，使得当n > N时，恒有|aₙ - a| < ε，那么就称常数a是数列{aₙ}的极限。\n\n## 记法\nlim[n→∞] aₙ = a\n\n## 几何意义\n当n充分大时，数列的项aₙ可以任意接近于a。',
                  order: 1,
                  problems: {
                    create: [
                      {
                        title: '数列极限计算',
                        content: '计算极限：lim[n→∞] (2n+1)/(3n-1)',
                        type: 'solution',
                        difficulty: 4,
                        points: 25,
                        answer: { 
                          correct: '2/3',
                          steps: ['分子分母同除以n', '(2+1/n)/(3-1/n)', '当n→∞时，1/n→0', '所以极限为2/3']
                        },
                        explanation: '对于分式极限，可以分子分母同时除以n的最高次幂',
                        tags: ['极限', '数列', '高等数学']
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  })

  console.log('示例课程数据创建完成！')
  console.log(`创建了以下课程：`)
  console.log(`- ${primaryMathCourse.title} (${primaryMathCourse.level})`)
  console.log(`- ${middleMathCourse.title} (${middleMathCourse.level})`)
  console.log(`- ${highMathCourse.title} (${highMathCourse.level})`)
  console.log(`- ${collegeMathCourse.title} (${collegeMathCourse.level})`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })