import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('开始创建完整教育体系数学课程（小学-初中-高中-大学）...')

  // 清理现有数据
  await prisma.progress.deleteMany()
  await prisma.problem.deleteMany()
  await prisma.lesson.deleteMany()
  await prisma.chapter.deleteMany()
  await prisma.course.deleteMany()

  // ===================== 小学数学课程（简化版） =====================
  
  const primary4 = await prisma.course.create({
    data: {
      title: '小学四年级数学',
      description: '大数认识、角的度量、乘除法等基础数学内容',
      level: '小学',
      subject: '数学',
      order: 4,
      chapters: {
        create: [
          {
            title: '大数的认识',
            description: '万以上数的认识和运算',
            order: 1,
            lessons: {
              create: [
                {
                  title: '万以上数的认识',
                  content: '学习万、十万、百万、千万、亿等大数的概念和读写',
                  order: 1
                }
              ]
            }
          },
          {
            title: '角的度量',
            description: '学习角的概念和度量',
            order: 2,
            lessons: {
              create: [
                {
                  title: '角的认识',
                  content: '学习角的概念、分类和测量方法',
                  order: 1
                }
              ]
            }
          }
        ]
      }
    }
  })

  // ===================== 初中数学课程（简化版） =====================
  
  const middle8 = await prisma.course.create({
    data: {
      title: '八年级数学',
      description: '三角形、函数、几何等核心内容',
      level: '初中',
      subject: '数学',
      order: 2,
      chapters: {
        create: [
          {
            title: '三角形',
            description: '三角形的性质和应用',
            order: 1,
            lessons: {
              create: [
                {
                  title: '三角形的基本性质',
                  content: '学习三角形的边角关系和内角和定理',
                  order: 1
                }
              ]
            }
          },
          {
            title: '一次函数',
            description: '函数概念和一次函数',
            order: 2,
            lessons: {
              create: [
                {
                  title: '一次函数的图像和性质',
                  content: '学习一次函数的概念、图像和基本性质',
                  order: 1
                }
              ]
            }
          }
        ]
      }
    }
  })

  // ===================== 高中数学课程（完整版） =====================

  const highSchoolMath1 = await prisma.course.create({
    data: {
      title: '高中数学必修第一册',
      description: '集合与函数概念、一元二次函数方程不等式、函数概念与性质、指数函数与对数函数、三角函数',
      level: '高中',
      subject: '数学',
      order: 1,
      chapters: {
        create: [
          {
            title: '集合与常用逻辑用语',
            description: '学习集合的概念、运算和常用逻辑用语',
            order: 1,
            lessons: {
              create: [
                {
                  title: '集合的概念',
                  content: `# 集合的概念

## 集合的定义
集合是指具有某种特定性质的具体的或抽象的对象汇总而成的集体。

## 集合的三个特性
1. **确定性**：集合中的元素必须是确定的
2. **互异性**：集合中的元素是互不相同的
3. **无序性**：集合中的元素没有顺序关系

## 常用数集
- **自然数集**：N = {0, 1, 2, 3, ...}
- **正整数集**：N* = {1, 2, 3, ...}
- **整数集**：Z = {..., -2, -1, 0, 1, 2, ...}
- **有理数集**：Q
- **实数集**：R`,
                  order: 1,
                  problems: {
                    create: [
                      {
                        title: '集合元素关系',
                        content: '设A = {1, 2, 3}，判断：2____A（填∈或∉）',
                        type: 'fill_blank',
                        difficulty: 3,
                        points: 10,
                        answer: { correct: '∈' },
                        explanation: '2是集合A的元素，所以2∈A',
                        tags: ['集合', '元素关系']
                      }
                    ]
                  }
                },
                {
                  title: '集合间的基本关系',
                  content: '学习子集、真子集、空集等概念',
                  order: 2
                },
                {
                  title: '集合的基本运算',
                  content: '学习交集、并集、补集等运算',
                  order: 3
                }
              ]
            }
          },
          {
            title: '函数概念与性质',
            description: '函数的概念、图像、基本性质',
            order: 2,
            lessons: {
              create: [
                {
                  title: '函数的概念',
                  content: `# 函数的概念

## 函数的定义
设A、B是非空的数集，如果按照某个确定的对应关系f，使对于集合A中的任意一个数x，在集合B中都有唯一确定的数f(x)和它对应，那么就称f：A→B为从集合A到集合B的一个函数。

## 函数的三要素
1. **定义域**：自变量x的取值范围
2. **值域**：因变量y的取值范围
3. **对应关系**：变量间的对应法则`,
                  order: 1,
                  problems: {
                    create: [
                      {
                        title: '函数定义域',
                        content: '函数f(x) = √(x-1)的定义域是？',
                        type: 'fill_blank',
                        difficulty: 3,
                        points: 15,
                        answer: { correct: '[1,+∞)' },
                        explanation: '根号下的表达式x-1≥0，所以x≥1',
                        tags: ['函数', '定义域']
                      }
                    ]
                  }
                },
                {
                  title: '函数的基本性质',
                  content: '学习函数的单调性、奇偶性等性质',
                  order: 2
                }
              ]
            }
          },
          {
            title: '指数函数与对数函数',
            description: '指数函数和对数函数的概念、图像、性质',
            order: 3,
            lessons: {
              create: [
                {
                  title: '指数函数',
                  content: `# 指数函数

## 指数函数的定义
形如y = aˣ（a > 0且a ≠ 1）的函数叫做指数函数

## 指数函数的性质
### 当a > 1时：
- 定义域：R，值域：(0, +∞)
- 在R上单调递增，过点(0, 1)

### 当0 < a < 1时：
- 定义域：R，值域：(0, +∞)
- 在R上单调递减，过点(0, 1)`,
                  order: 1
                },
                {
                  title: '对数函数',
                  content: '学习对数函数的定义、性质和运算法则',
                  order: 2
                }
              ]
            }
          },
          {
            title: '三角函数',
            description: '任意角、弧度制、三角函数概念和性质',
            order: 4,
            lessons: {
              create: [
                {
                  title: '任意角和弧度制',
                  content: '学习任意角的概念和弧度制',
                  order: 1
                },
                {
                  title: '三角函数的定义',
                  content: '学习正弦、余弦、正切函数的定义和性质',
                  order: 2
                }
              ]
            }
          }
        ]
      }
    }
  })

  const highSchoolMath2 = await prisma.course.create({
    data: {
      title: '高中数学必修第二册',
      description: '立体几何初步、平面解析几何初步',
      level: '高中',
      subject: '数学',
      order: 2,
      chapters: {
        create: [
          {
            title: '立体几何初步',
            description: '空间几何体、点线面位置关系',
            order: 1,
            lessons: {
              create: [
                {
                  title: '空间几何体的结构',
                  content: '学习多面体和旋转体的概念和性质',
                  order: 1
                },
                {
                  title: '空间几何体的三视图',
                  content: '学习三视图的画法和识别',
                  order: 2
                }
              ]
            }
          },
          {
            title: '平面解析几何初步',
            description: '直线和圆的方程',
            order: 2,
            lessons: {
              create: [
                {
                  title: '直线的方程',
                  content: '学习直线方程的各种形式',
                  order: 1
                },
                {
                  title: '圆的方程',
                  content: '学习圆的标准方程和一般方程',
                  order: 2
                }
              ]
            }
          }
        ]
      }
    }
  })

  const highSchoolMath3 = await prisma.course.create({
    data: {
      title: '高中数学选择性必修第一册',
      description: '空间向量与立体几何、直线和圆的方程、圆锥曲线的方程',
      level: '高中',
      subject: '数学',
      order: 3,
      chapters: {
        create: [
          {
            title: '空间向量与立体几何',
            description: '空间向量的概念和应用',
            order: 1,
            lessons: {
              create: [
                {
                  title: '空间向量及其运算',
                  content: '学习空间向量的概念和基本运算',
                  order: 1
                }
              ]
            }
          },
          {
            title: '圆锥曲线的方程',
            description: '椭圆、双曲线、抛物线的方程',
            order: 2,
            lessons: {
              create: [
                {
                  title: '椭圆',
                  content: '学习椭圆的定义、标准方程和性质',
                  order: 1
                },
                {
                  title: '双曲线',
                  content: '学习双曲线的定义、标准方程和性质',
                  order: 2
                },
                {
                  title: '抛物线',
                  content: '学习抛物线的定义、标准方程和性质',
                  order: 3
                }
              ]
            }
          }
        ]
      }
    }
  })

  // ===================== 大学数学课程（完整版） =====================

  const calculus = await prisma.course.create({
    data: {
      title: '高等数学',
      description: '函数与极限、导数与微分、积分学等大学数学基础',
      level: '大学',
      subject: '高等数学',
      order: 1,
      chapters: {
        create: [
          {
            title: '函数与极限',
            description: '函数概念、数列极限、函数极限、连续性',
            order: 1,
            lessons: {
              create: [
                {
                  title: '函数',
                  content: `# 函数

## 函数的概念
设D是一个非空的数集，如果按某个确定的法则f，使对于集合D中的每一个数x，在数集Y中都有唯一确定的数y和它对应，那么就称这个对应法则f为从集合D到集合Y的一个函数。

## 函数的性质
### 有界性
设函数f(x)在数集X上有定义，如果存在数M > 0，使得对于任意x ∈ X，有|f(x)| ≤ M，则称f(x)在X上有界。

### 单调性
设函数f(x)在区间I上有定义，如果对于区间I上任意两点x₁、x₂，当x₁ < x₂时，恒有f(x₁) < f(x₂)，则称f(x)在区间I上单调递增。

### 奇偶性
- f(-x) = f(x)，则称f(x)为偶函数
- f(-x) = -f(x)，则称f(x)为奇函数`,
                  order: 1,
                  problems: {
                    create: [
                      {
                        title: '函数性质判断',
                        content: '判断函数f(x) = x³的奇偶性',
                        type: 'multiple_choice',
                        difficulty: 4,
                        points: 15,
                        answer: { correct: 'A', options: ['奇函数', '偶函数', '非奇非偶函数', '既奇又偶函数'] },
                        explanation: 'f(-x) = (-x)³ = -x³ = -f(x)，所以f(x) = x³是奇函数',
                        tags: ['函数', '奇偶性']
                      }
                    ]
                  }
                },
                {
                  title: '数列的极限',
                  content: '学习数列极限的定义和性质',
                  order: 2
                },
                {
                  title: '函数的极限',
                  content: '学习函数极限的定义和计算',
                  order: 3
                }
              ]
            }
          },
          {
            title: '导数与微分',
            description: '导数的概念、计算和应用',
            order: 2,
            lessons: {
              create: [
                {
                  title: '导数的概念',
                  content: `# 导数的概念

## 导数的定义
设函数y = f(x)在点x₀的某个邻域内有定义，如果极限
$$\\lim_{\\Delta x \\to 0} \\frac{f(x_0 + \\Delta x) - f(x_0)}{\\Delta x}$$
存在，则称函数f(x)在点x₀处可导，这个极限为f(x)在点x₀处的导数。

## 基本导数公式
- (C)' = 0 （C为常数）
- (xⁿ)' = nxⁿ⁻¹
- (sin x)' = cos x
- (cos x)' = -sin x
- (eˣ)' = eˣ
- (ln x)' = 1/x`,
                  order: 1,
                  problems: {
                    create: [
                      {
                        title: '基本导数计算',
                        content: '求函数f(x) = x³的导数',
                        type: 'fill_blank',
                        difficulty: 4,
                        points: 15,
                        answer: { correct: '3x²' },
                        explanation: '根据幂函数导数公式(xⁿ)\'=nxⁿ⁻¹，得f\'(x)=3x²',
                        tags: ['导数', '计算']
                      }
                    ]
                  }
                },
                {
                  title: '导数的运算法则',
                  content: '学习导数的四则运算法则和复合函数求导',
                  order: 2
                }
              ]
            }
          },
          {
            title: '不定积分',
            description: '原函数与不定积分的概念和计算',
            order: 3,
            lessons: {
              create: [
                {
                  title: '不定积分的概念',
                  content: '学习原函数和不定积分的定义',
                  order: 1
                },
                {
                  title: '基本积分公式',
                  content: '学习基本函数的积分公式',
                  order: 2
                }
              ]
            }
          },
          {
            title: '定积分',
            description: '定积分的概念、性质和计算',
            order: 4,
            lessons: {
              create: [
                {
                  title: '定积分的概念',
                  content: '学习定积分的定义和几何意义',
                  order: 1
                },
                {
                  title: '定积分的计算',
                  content: '学习牛顿-莱布尼茨公式',
                  order: 2
                }
              ]
            }
          }
        ]
      }
    }
  })

  const linearAlgebra = await prisma.course.create({
    data: {
      title: '线性代数',
      description: '行列式、矩阵、向量组线性相关性、线性方程组、特征值与特征向量',
      level: '大学',
      subject: '线性代数',
      order: 2,
      chapters: {
        create: [
          {
            title: '行列式',
            description: '行列式的定义、性质和计算',
            order: 1,
            lessons: {
              create: [
                {
                  title: '二阶与三阶行列式',
                  content: `# 二阶与三阶行列式

## 二阶行列式
$$\\begin{vmatrix}
a_{11} & a_{12} \\\\
a_{21} & a_{22}
\\end{vmatrix} = a_{11}a_{22} - a_{12}a_{21}$$

## 三阶行列式的计算
可以按第一行展开计算`,
                  order: 1,
                  problems: {
                    create: [
                      {
                        title: '二阶行列式计算',
                        content: '计算行列式的值：|2 3; 1 4|',
                        type: 'fill_blank',
                        difficulty: 4,
                        points: 15,
                        answer: { correct: '5' },
                        explanation: '2×4 - 3×1 = 8 - 3 = 5',
                        tags: ['行列式', '计算']
                      }
                    ]
                  }
                },
                {
                  title: 'n阶行列式',
                  content: '学习n阶行列式的定义和按行列展开',
                  order: 2
                }
              ]
            }
          },
          {
            title: '矩阵',
            description: '矩阵的概念、运算和性质',
            order: 2,
            lessons: {
              create: [
                {
                  title: '矩阵的概念',
                  content: '学习矩阵的定义和特殊矩阵',
                  order: 1
                },
                {
                  title: '矩阵的运算',
                  content: '学习矩阵的加法、乘法、转置等运算',
                  order: 2
                }
              ]
            }
          },
          {
            title: '线性方程组',
            description: '线性方程组的解法和解的结构',
            order: 3,
            lessons: {
              create: [
                {
                  title: '高斯消元法',
                  content: '学习用高斯消元法解线性方程组',
                  order: 1
                }
              ]
            }
          }
        ]
      }
    }
  })

  const probability = await prisma.course.create({
    data: {
      title: '概率论与数理统计',
      description: '随机事件和概率、随机变量及其分布、数字特征、参数估计',
      level: '大学',
      subject: '概率统计',
      order: 3,
      chapters: {
        create: [
          {
            title: '随机事件和概率',
            description: '随机试验、样本空间、概率的定义和性质',
            order: 1,
            lessons: {
              create: [
                {
                  title: '随机试验',
                  content: `# 随机试验

## 随机试验的特点
1. **可重复性**：试验可以在相同的条件下重复进行
2. **多结果性**：每次试验的可能结果不止一个
3. **不确定性**：进行一次试验之前不能确定哪一个结果会出现

## 样本空间
随机试验E的所有可能结果组成的集合称为E的样本空间，记为S。

## 随机事件
试验E的样本空间S的子集称为E的随机事件。`,
                  order: 1,
                  problems: {
                    create: [
                      {
                        title: '样本空间确定',
                        content: '抛两枚硬币，样本空间包含多少个基本事件？',
                        type: 'fill_blank',
                        difficulty: 4,
                        points: 10,
                        answer: { correct: '4' },
                        explanation: '样本空间为{(正,正), (正,反), (反,正), (反,反)}，共4个基本事件',
                        tags: ['概率', '样本空间']
                      }
                    ]
                  }
                },
                {
                  title: '概率的定义',
                  content: '学习概率的统计定义和公理化定义',
                  order: 2
                }
              ]
            }
          },
          {
            title: '随机变量及其分布',
            description: '随机变量的概念和常见分布',
            order: 2,
            lessons: {
              create: [
                {
                  title: '随机变量的概念',
                  content: '学习随机变量的定义和分类',
                  order: 1
                },
                {
                  title: '常见分布',
                  content: '学习二项分布、泊松分布、正态分布等',
                  order: 2
                }
              ]
            }
          }
        ]
      }
    }
  })

  console.log('完整教育体系数学课程创建完成！')
  
  const stats = await Promise.all([
    prisma.course.count(),
    prisma.chapter.count(), 
    prisma.lesson.count(),
    prisma.problem.count()
  ])

  console.log(`\\n📊 完整教育体系统计：`)
  console.log(`- 课程总数：${stats[0]}`)
  console.log(`- 章节总数：${stats[1]}`)
  console.log(`- 课时总数：${stats[2]}`)
  console.log(`- 练习题总数：${stats[3]}`)

  console.log(`\\n🎓 完整教育体系覆盖：`)
  console.log(`📚 小学：四年级数学（2章节）`)
  console.log(`📚 初中：八年级数学（2章节）`)
  console.log(`📚 高中：必修第一册（4章节）、必修第二册（2章节）、选择性必修第一册（2章节）`)
  console.log(`📚 大学：高等数学（4章节）、线性代数（3章节）、概率论与数理统计（2章节）`)
  console.log(`\\n🏆 涵盖从小学到大学的完整数学教育体系！`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })