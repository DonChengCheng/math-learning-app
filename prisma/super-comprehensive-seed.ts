import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('开始创建超级完整的数学课程数据...')

  // 清理现有数据
  await prisma.progress.deleteMany()
  await prisma.problem.deleteMany()
  await prisma.lesson.deleteMany()
  await prisma.chapter.deleteMany()
  await prisma.course.deleteMany()

  // ===================== 小学数学课程 =====================

  // 小学四年级数学
  const primaryGrade4 = await prisma.course.create({
    data: {
      title: '小学四年级数学',
      description: '9-10岁儿童的数学课程，包含乘除法进阶、分数、几何等',
      level: '小学',
      subject: '数学',
      order: 4,
      chapters: {
        create: [
          {
            title: '大数的认识',
            description: '学习万以上的大数，理解数位和计数单位',
            order: 1,
            lessons: {
              create: [
                {
                  title: '万以上数的读法',
                  content: `# 万以上数的读法

## 数位和计数单位
**数位**：个位、十位、百位、千位、万位、十万位、百万位、千万位...
**计数单位**：一、十、百、千、万、十万、百万、千万...

## 四位分级法
从右往左，每四位为一级：
- 个级：个位、十位、百位、千位
- 万级：万位、十万位、百万位、千万位
- 亿级：亿位、十亿位、百亿位、千亿位

## 大数的读法规则
1. 先读万级，再读个级
2. 万级的数按照个级的读法读，再在后面加上"万"
3. 每级末尾的0都不读
4. 其他数位有一个或连续几个0，都只读一个"零"

## 例子
- 58,640 读作：五万八千六百四十
- 305,070 读作：三十万五千零七十
- 8,000,500 读作：八百万零五百`,
                  order: 1,
                  problems: {
                    create: [
                      {
                        title: '大数读法',
                        content: '读出这个数：45,032',
                        type: 'fill_blank',
                        difficulty: 2,
                        points: 10,
                        answer: { correct: '四万五千零三十二' },
                        explanation: '按照万级和个级分别读，中间的0要读作"零"',
                        tags: ['大数', '读法']
                      },
                      {
                        title: '数位理解',
                        content: '在数字59,834中，5在什么位上？',
                        type: 'multiple_choice',
                        difficulty: 2,
                        points: 10,
                        answer: { correct: 'A', options: ['万位', '千位', '百位', '十位'] },
                        explanation: '从右往左数，5在第5位，是万位',
                        tags: ['大数', '数位']
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            title: '分数的初步认识',
            description: '认识分数，理解分数的意义',
            order: 2,
            lessons: {
              create: [
                {
                  title: '认识分数',
                  content: `# 认识分数

## 分数的产生
在日常生活中，我们经常遇到不能用整数表示的情况：
- 把一个苹果平均分给2个人，每人得到多少？
- 把一张纸平均分成4份，每份是多少？

这时候就需要用分数来表示。

## 分数的意义
把单位"1"平均分成若干份，表示这样一份或几份的数叫做分数。

## 分数的写法
分数用分数线分隔，写作：分子/分母
- 分数线下面的数叫**分母**，表示把单位"1"平均分成多少份
- 分数线上面的数叫**分子**，表示取了多少份

## 分数的读法
先读分母，再读分子
- 1/2 读作：二分之一
- 3/4 读作：四分之三
- 5/8 读作：八分之五

## 生活中的分数
- 半个苹果：1/2个苹果
- 一刻钟：1/4小时
- 三个月：3/12年 = 1/4年`,
                  order: 1,
                  problems: {
                    create: [
                      {
                        title: '分数认识',
                        content: '把一个圆平均分成8份，取其中的3份，用分数表示是？',
                        type: 'fill_blank',
                        difficulty: 2,
                        points: 10,
                        answer: { correct: '3/8' },
                        explanation: '分母是8（平均分成8份），分子是3（取3份）',
                        tags: ['分数', '基础概念']
                      },
                      {
                        title: '分数读法',
                        content: '分数5/6应该读作什么？',
                        type: 'multiple_choice',
                        difficulty: 2,
                        points: 10,
                        answer: { correct: 'B', options: ['五六分之一', '六分之五', '五分之六', '六五分之一'] },
                        explanation: '先读分母再读分子：六分之五',
                        tags: ['分数', '读法']
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

  // 小学五年级数学
  const primaryGrade5 = await prisma.course.create({
    data: {
      title: '小学五年级数学',
      description: '10-11岁儿童的数学课程，包含分数运算、小数、几何面积等',
      level: '小学',
      subject: '数学',
      order: 5,
      chapters: {
        create: [
          {
            title: '小数的意义和性质',
            description: '学习小数的概念、读写和性质',
            order: 1,
            lessons: {
              create: [
                {
                  title: '小数的意义',
                  content: `# 小数的意义

## 小数的产生
在测量和计算时，往往不能得到整数结果。比如：
- 身高1米3分米，可以写成1.3米
- 2元3角，可以写成2.3元

## 小数的组成
小数由整数部分、小数点和小数部分组成。
- 整数部分：小数点左边的数
- 小数点：分隔整数部分和小数部分的点
- 小数部分：小数点右边的数

例如：25.67
- 整数部分：25
- 小数点：.
- 小数部分：67

## 小数的计数单位
| 数位 | 计数单位 |
|------|----------|
| 十位 | 十 |
| 个位 | 一 |
| 十分位 | 十分之一(0.1) |
| 百分位 | 百分之一(0.01) |
| 千分位 | 千分之一(0.001) |

## 小数的读法
先读整数部分，再读"点"，最后依次读小数部分的每一位数字。
- 3.5 读作：三点五
- 0.08 读作：零点零八
- 12.345 读作：十二点三四五`,
                  order: 1,
                  problems: {
                    create: [
                      {
                        title: '小数组成',
                        content: '在小数15.67中，整数部分是多少？',
                        type: 'fill_blank',
                        difficulty: 2,
                        points: 10,
                        answer: { correct: '15' },
                        explanation: '小数点左边的数是整数部分',
                        tags: ['小数', '组成']
                      },
                      {
                        title: '小数读法',
                        content: '小数0.205应该读作什么？',
                        type: 'multiple_choice',
                        difficulty: 2,
                        points: 10,
                        answer: { correct: 'A', options: ['零点二零五', '零点二十五', '零点二百零五', '二百零五'] },
                        explanation: '小数部分要依次读出每一位数字',
                        tags: ['小数', '读法']
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

  // ===================== 初中数学课程 =====================

  // 初中八年级数学
  const middleGrade8 = await prisma.course.create({
    data: {
      title: '初中八年级数学',
      description: '初中二年级数学课程，包含二次根式、一次函数、勾股定理等',
      level: '初中',
      subject: '数学',
      order: 2,
      chapters: {
        create: [
          {
            title: '一次函数',
            description: '学习一次函数的概念、图像和性质',
            order: 1,
            lessons: {
              create: [
                {
                  title: '一次函数的概念',
                  content: `# 一次函数的概念

## 什么是函数？
一般地，在某个变化过程中，有两个变量x和y，如果对于x的每一个值，y都有唯一的值与它对应，那么就说y是x的函数，x是自变量，y是因变量。

## 一次函数的定义
形如y = kx + b（k、b是常数，k≠0）的函数叫做一次函数。
- 当b = 0时，y = kx，这时一次函数叫做正比例函数

## 一次函数的特点
1. 自变量x的次数是1
2. 函数表达式是整式
3. 系数k≠0

## 实例分析
- y = 2x + 3 ✓（一次函数，k=2，b=3）
- y = -x + 5 ✓（一次函数，k=-1，b=5）
- y = 3x ✓（正比例函数，k=3，b=0）
- y = x² + 1 ✗（不是一次函数，x的次数是2）

## 实际应用
某出租车的收费标准是：起步价8元（3千米内），超过3千米的部分每千米收费2元。
设路程为x千米（x>3），车费为y元，则：
y = 2x + 2 = 2x + 2（这是一次函数）`,
                  order: 1,
                  problems: {
                    create: [
                      {
                        title: '一次函数判断',
                        content: '下列函数中，哪个是一次函数？',
                        type: 'multiple_choice',
                        difficulty: 3,
                        points: 15,
                        answer: { correct: 'B', options: ['y = x² + 1', 'y = 2x - 3', 'y = 1/x', 'y = 2^x'] },
                        explanation: 'y = 2x - 3是形如y = kx + b的函数，k=2≠0',
                        tags: ['一次函数', '概念']
                      },
                      {
                        title: '函数关系',
                        content: '在函数y = -3x + 5中，当x = 2时，y = ?',
                        type: 'fill_blank',
                        difficulty: 3,
                        points: 15,
                        answer: { correct: '-1' },
                        explanation: 'y = -3×2 + 5 = -6 + 5 = -1',
                        tags: ['一次函数', '计算']
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            title: '勾股定理',
            description: '学习勾股定理的概念和应用',
            order: 2,
            lessons: {
              create: [
                {
                  title: '勾股定理',
                  content: `# 勾股定理

## 勾股定理的发现
在中国古代，人们发现了"勾三股四弦五"的规律：
- 如果直角三角形的两直角边分别为3和4，那么斜边长为5
- 因为 3² + 4² = 9 + 16 = 25 = 5²

## 勾股定理的内容
在直角三角形中，两直角边的平方和等于斜边的平方。

如果直角三角形的两直角边长分别为a、b，斜边长为c，那么：
a² + b² = c²

## 勾股定理的应用
1. **已知两直角边，求斜边**
   如果a = 3，b = 4，求c
   c² = a² + b² = 3² + 4² = 9 + 16 = 25
   所以 c = 5

2. **已知斜边和一直角边，求另一直角边**
   如果c = 13，a = 5，求b
   b² = c² - a² = 13² - 5² = 169 - 25 = 144
   所以 b = 12

## 勾股定理的逆定理
如果三角形的三边长a、b、c满足a² + b² = c²，那么这个三角形是直角三角形。

## 实际应用
- 建筑工程中检验建筑物是否垂直
- 测量不能直接测量的距离
- 导航系统中的距离计算`,
                  order: 1,
                  problems: {
                    create: [
                      {
                        title: '勾股定理计算',
                        content: '直角三角形的两直角边分别为6和8，斜边长是多少？',
                        type: 'fill_blank',
                        difficulty: 3,
                        points: 15,
                        answer: { correct: '10' },
                        explanation: 'c² = 6² + 8² = 36 + 64 = 100，所以c = 10',
                        tags: ['勾股定理', '计算']
                      },
                      {
                        title: '勾股定理应用',
                        content: '一个梯子长13米，梯子底端离墙5米，梯子顶端距地面多少米？',
                        type: 'fill_blank',
                        difficulty: 3,
                        points: 20,
                        answer: { correct: '12' },
                        explanation: '设高度为h，则h² + 5² = 13²，h² = 169 - 25 = 144，h = 12',
                        tags: ['勾股定理', '应用题']
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

  // 初中九年级数学
  const middleGrade9 = await prisma.course.create({
    data: {
      title: '初中九年级数学',
      description: '初中三年级数学课程，包含二次函数、圆、概率等',
      level: '初中',
      subject: '数学',
      order: 3,
      chapters: {
        create: [
          {
            title: '二次函数',
            description: '学习二次函数的概念、图像和性质',
            order: 1,
            lessons: {
              create: [
                {
                  title: '二次函数的概念',
                  content: `# 二次函数的概念

## 二次函数的定义
形如y = ax² + bx + c（a、b、c是常数，a≠0）的函数叫做二次函数。

## 二次函数的特点
1. 自变量x的最高次数是2
2. 系数a≠0（否则就不是二次函数了）
3. 函数表达式是整式

## 二次函数的一般形式
y = ax² + bx + c（a≠0）
- a叫做二次项系数
- b叫做一次项系数  
- c叫做常数项

## 特殊形式
1. **y = ax²**（b=0，c=0）
2. **y = ax² + c**（b=0）
3. **y = ax² + bx**（c=0）

## 实例分析
- y = x² ✓（二次函数，a=1，b=0，c=0）
- y = -2x² + 3x - 1 ✓（二次函数，a=-2，b=3，c=-1）
- y = 3x + 2 ✗（一次函数，不是二次函数）
- y = 1/x² ✗（不是整式，不是二次函数）

## 实际应用
- 物体的抛物运动轨迹
- 利润最大化问题
- 建筑物的抛物线拱形`,
                  order: 1,
                  problems: {
                    create: [
                      {
                        title: '二次函数识别',
                        content: '下列函数中，哪个是二次函数？',
                        type: 'multiple_choice',
                        difficulty: 3,
                        points: 15,
                        answer: { correct: 'A', options: ['y = 3x² - 2', 'y = 2x + 1', 'y = 1/x', 'y = √x'] },
                        explanation: 'y = 3x² - 2是形如y = ax² + bx + c的函数，a=3≠0',
                        tags: ['二次函数', '概念']
                      },
                      {
                        title: '二次函数系数',
                        content: '在二次函数y = -x² + 4x - 3中，二次项系数是多少？',
                        type: 'fill_blank',
                        difficulty: 3,
                        points: 10,
                        answer: { correct: '-1' },
                        explanation: '二次项系数是x²前面的系数，即-1',
                        tags: ['二次函数', '系数']
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

  // ===================== 高中数学课程 =====================

  // 高中必修一（集合与函数）
  const highSchoolMath1 = await prisma.course.create({
    data: {
      title: '高中数学必修一',
      description: '高中数学基础课程，包含集合、函数概念与性质等核心内容',
      level: '高中',
      subject: '数学',
      order: 1,
      chapters: {
        create: [
          {
            title: '集合',
            description: '学习集合的概念、表示方法和运算',
            order: 1,
            lessons: {
              create: [
                {
                  title: '集合的概念',
                  content: `# 集合的概念

## 集合的定义
把一些确定的对象看成一个整体，这个整体就叫做集合（简称集）。
集合中的每个对象叫做这个集合的元素（或成员）。

## 集合的性质
1. **确定性**：集合中的元素必须是确定的
2. **互异性**：集合中的元素是互不相同的
3. **无序性**：集合中的元素没有顺序关系

## 元素与集合的关系
- 如果a是集合A的元素，记作a ∈ A，读作"a属于A"
- 如果a不是集合A的元素，记作a ∉ A，读作"a不属于A"

## 常用的数集及其记号
- **自然数集**：N = {0, 1, 2, 3, ...}
- **正整数集**：N* = {1, 2, 3, ...}
- **整数集**：Z = {..., -2, -1, 0, 1, 2, ...}
- **有理数集**：Q
- **实数集**：R

## 集合的表示方法
1. **列举法**：{1, 2, 3, 4}
2. **描述法**：{x | x > 0}
3. **图示法**：用韦恩图表示`,
                  order: 1,
                  problems: {
                    create: [
                      {
                        title: '集合概念',
                        content: '设A = {1, 2, 3}，判断：2____A（填∈或∉）',
                        type: 'fill_blank',
                        difficulty: 3,
                        points: 10,
                        answer: { correct: '∈' },
                        explanation: '2是集合A的元素，所以2∈A',
                        tags: ['集合', '元素关系']
                      },
                      {
                        title: '集合性质',
                        content: '集合具有哪些基本性质？',
                        type: 'multiple_choice',
                        difficulty: 3,
                        points: 15,
                        answer: { correct: 'A', options: ['确定性、互异性、无序性', '确定性、有序性、互异性', '无序性、可重复性、确定性', '有序性、确定性、可重复性'] },
                        explanation: '集合的三个基本性质是确定性、互异性、无序性',
                        tags: ['集合', '性质']
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

  // 高中必修二（三角函数）
  const highSchoolMath2 = await prisma.course.create({
    data: {
      title: '高中数学必修二',
      description: '高中数学三角函数课程，包含三角函数定义、图像与性质',
      level: '高中',
      subject: '三角函数',
      order: 2,
      chapters: {
        create: [
          {
            title: '任意角的三角函数',
            description: '学习任意角的概念和三角函数定义',
            order: 1,
            lessons: {
              create: [
                {
                  title: '任意角的概念',
                  content: `# 任意角的概念

## 角的概念推广
在初中，我们学习的角都是0°到180°之间的角。在高中，我们要把角的概念推广到任意大小的角。

## 角的定义
角可以看作平面内一条射线绕着端点从一个位置旋转到另一个位置所成的图形。

## 角的表示
- **始边**：射线的起始位置
- **终边**：射线的终止位置  
- **顶点**：射线的端点

## 角的分类（按旋转方向）
- **正角**：按逆时针方向旋转形成的角
- **负角**：按顺时针方向旋转形成的角
- **零角**：射线没有旋转，始边和终边重合

## 象限角
以角的顶点为原点，始边为x轴正半轴建立坐标系：
- **第一象限角**：0° < α < 90°
- **第二象限角**：90° < α < 180°
- **第三象限角**：180° < α < 270°
- **第四象限角**：270° < α < 360°

## 终边相同的角
所有与角α终边相同的角，连同角α在内，可构成一个集合：
{β | β = α + k·360°, k ∈ Z}`,
                  order: 1,
                  problems: {
                    create: [
                      {
                        title: '角的分类',
                        content: '按逆时针方向旋转120°得到的角是什么角？',
                        type: 'multiple_choice',
                        difficulty: 3,
                        points: 10,
                        answer: { correct: 'A', options: ['正角', '负角', '零角', '直角'] },
                        explanation: '逆时针方向旋转形成的是正角',
                        tags: ['任意角', '分类']
                      },
                      {
                        title: '象限角',
                        content: '150°角是第几象限角？',
                        type: 'fill_blank',
                        difficulty: 3,
                        points: 10,
                        answer: { correct: '二' },
                        explanation: '90° < 150° < 180°，所以是第二象限角',
                        tags: ['任意角', '象限']
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

  // ===================== 大学数学课程 =====================

  // 线性代数
  const linearAlgebra = await prisma.course.create({
    data: {
      title: '线性代数',
      description: '大学数学基础课程，包含矩阵、向量空间、线性变换等内容',
      level: '大学',
      subject: '线性代数',
      order: 2,
      chapters: {
        create: [
          {
            title: '行列式',
            description: '学习行列式的概念、性质和计算方法',
            order: 1,
            lessons: {
              create: [
                {
                  title: '二阶行列式',
                  content: `# 二阶行列式

## 二元线性方程组
考虑二元线性方程组：
\\begin{cases}
a_{11}x_1 + a_{12}x_2 = b_1 \\\\
a_{21}x_1 + a_{22}x_2 = b_2
\\end{cases}

## 二阶行列式的定义
二阶行列式定义为：
$$\\begin{vmatrix}
a_{11} & a_{12} \\\\
a_{21} & a_{22}
\\end{vmatrix} = a_{11}a_{22} - a_{12}a_{21}$$

## 计算方法
计算二阶行列式的方法：
1. 主对角线元素的乘积：$a_{11} \\times a_{22}$
2. 副对角线元素的乘积：$a_{12} \\times a_{21}$
3. 主对角线乘积减去副对角线乘积

## 例子
$$\\begin{vmatrix}
2 & 3 \\\\
1 & 4
\\end{vmatrix} = 2 \\times 4 - 3 \\times 1 = 8 - 3 = 5$$

## 克拉默法则
当系数行列式不为零时，二元线性方程组有唯一解：
$$x_1 = \\frac{D_1}{D}, \\quad x_2 = \\frac{D_2}{D}$$

其中$D$是系数行列式，$D_1$、$D_2$是将常数项替换相应列得到的行列式。`,
                  order: 1,
                  problems: {
                    create: [
                      {
                        title: '二阶行列式计算',
                        content: '计算行列式的值：|3 2; 1 4|',
                        type: 'fill_blank',
                        difficulty: 4,
                        points: 15,
                        answer: { correct: '10' },
                        explanation: '3×4 - 2×1 = 12 - 2 = 10',
                        tags: ['行列式', '计算']
                      },
                      {
                        title: '行列式应用',
                        content: '二阶行列式主要用于解什么类型的方程组？',
                        type: 'multiple_choice',
                        difficulty: 4,
                        points: 15,
                        answer: { correct: 'A', options: ['二元线性方程组', '一元二次方程', '三元线性方程组', '微分方程'] },
                        explanation: '二阶行列式主要应用于求解二元线性方程组',
                        tags: ['行列式', '应用']
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

  // 概率论与数理统计
  const probability = await prisma.course.create({
    data: {
      title: '概率论与数理统计',
      description: '大学数学课程，包含概率基础、随机变量、统计推断等内容',
      level: '大学',
      subject: '概率统计',
      order: 3,
      chapters: {
        create: [
          {
            title: '随机事件及其概率',
            description: '学习随机事件的概念和概率的基本性质',
            order: 1,
            lessons: {
              create: [
                {
                  title: '随机试验和随机事件',
                  content: `# 随机试验和随机事件

## 随机试验
满足下列条件的试验称为随机试验：
1. **可重复性**：试验可以在相同条件下重复进行
2. **多结果性**：每次试验的可能结果不止一个，且能事先明确所有可能的结果
3. **不确定性**：进行一次试验之前不能确定哪一个结果会出现

## 样本空间
随机试验E的所有可能结果组成的集合称为E的样本空间，记为S。
样本空间的元素，即E的每个结果，称为样本点。

## 随机事件
试验E的样本空间S的子集称为E的随机事件，简称事件。

## 事件的分类
1. **必然事件**：在每次试验中一定会发生的事件，用S表示
2. **不可能事件**：在每次试验中一定不会发生的事件，用∅表示
3. **随机事件**：在试验中可能发生也可能不发生的事件

## 事件间的关系
设A、B是两个事件：
- **包含关系**：若A发生必导致B发生，记作A ⊂ B
- **相等关系**：若A ⊂ B且B ⊂ A，记作A = B
- **互斥关系**：若A∩B = ∅，称A与B互斥（互不相容）

## 例子
抛一枚硬币的试验：
- 样本空间：S = {正面, 反面}
- 事件A = {正面}
- 事件B = {反面}
- A和B互斥`,
                  order: 1,
                  problems: {
                    create: [
                      {
                        title: '样本空间',
                        content: '抛两枚硬币，样本空间有几个元素？',
                        type: 'fill_blank',
                        difficulty: 4,
                        points: 15,
                        answer: { correct: '4' },
                        explanation: '样本空间为{(正,正), (正,反), (反,正), (反,反)}，共4个元素',
                        tags: ['概率', '样本空间']
                      },
                      {
                        title: '事件关系',
                        content: '如果事件A和B不能同时发生，那么A和B的关系是？',
                        type: 'multiple_choice',
                        difficulty: 4,
                        points: 15,
                        answer: { correct: 'A', options: ['互斥', '相等', '包含', '独立'] },
                        explanation: '不能同时发生的事件称为互斥事件',
                        tags: ['概率', '事件关系']
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

  console.log('超级完整课程数据创建完成！')
  console.log(`创建了以下课程：`)
  console.log(`小学课程：`)
  console.log(`- ${primaryGrade4.title}`)
  console.log(`- ${primaryGrade5.title}`)
  console.log(`初中课程：`)
  console.log(`- ${middleGrade8.title}`)
  console.log(`- ${middleGrade9.title}`)
  console.log(`高中课程：`)
  console.log(`- ${highSchoolMath1.title}`)
  console.log(`- ${highSchoolMath2.title}`)
  console.log(`大学课程：`)
  console.log(`- ${linearAlgebra.title}`)
  console.log(`- ${probability.title}`)

  const totalStats = await Promise.all([
    prisma.course.count(),
    prisma.chapter.count(),
    prisma.lesson.count(),
    prisma.problem.count()
  ])

  console.log(`\\n📊 数据统计：`)
  console.log(`- 课程总数：${totalStats[0]}`)
  console.log(`- 章节总数：${totalStats[1]}`)
  console.log(`- 课时总数：${totalStats[2]}`)
  console.log(`- 练习题总数：${totalStats[3]}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })