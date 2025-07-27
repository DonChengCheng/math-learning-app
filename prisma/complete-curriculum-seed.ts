import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('开始创建完整数学课程体系...')

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
      description: '四年级数学完整课程，包含数与计算、图形与几何、统计与概率等',
      level: '小学',
      subject: '数学',
      order: 4,
      chapters: {
        create: [
          {
            title: '大数的认识',
            description: '学习万以上的大数，掌握数位、计数单位和读写方法',
            order: 1,
            lessons: {
              create: [
                {
                  title: '万以上数的认识',
                  content: `# 万以上数的认识

## 数位顺序表
| 数级 | 亿级 | 万级 | 个级 |
|------|------|------|------|
| 数位 | 千亿位 百亿位 十亿位 亿位 | 千万位 百万位 十万位 万位 | 千位 百位 十位 个位 |
| 计数单位 | 千亿 百亿 十亿 亿 | 千万 百万 十万 万 | 千 百 十 一 |

## 读数规则
1. 从高位到低位，一级一级地读
2. 读亿级、万级时，先按照个级的读法读，再在后面加上"亿"或"万"
3. 每级末尾的0都不读出来
4. 其他数位连续几个0都只读一个"零"

## 例题
读出下面各数：
- 5407000 读作：五百四十万七千
- 30080500 读作：三千零八万零五百`,
                  order: 1,
                  problems: {
                    create: [
                      {
                        title: '大数读法练习',
                        content: '读出这个数：8050400',
                        type: 'fill_blank',
                        difficulty: 2,
                        points: 10,
                        answer: { correct: '八百零五万零四百' },
                        explanation: '按照万级和个级分别读，中间的连续0读作"零"',
                        tags: ['大数', '读法']
                      },
                      {
                        title: '数位判断',
                        content: '在数字604308中，6在什么位上？',
                        type: 'multiple_choice',
                        difficulty: 2,
                        points: 10,
                        answer: { correct: 'A', options: ['十万位', '万位', '千位', '百万位'] },
                        explanation: '从右往左数，6在第6位，是十万位',
                        tags: ['大数', '数位']
                      }
                    ]
                  }
                },
                {
                  title: '万以上数的写法',
                  content: `# 万以上数的写法

## 写数规则
1. 从高位到低位，一级一级地写
2. 哪一个数位上一个单位也没有，就在那个数位上写0

## 例题
写出下面各数：
- 六十万零三 写作：600003
- 五千零二万八千 写作：50028000

## 练习技巧
1. 先确定这个数是几位数
2. 从最高位开始写起
3. 注意0的位置要准确`,
                  order: 2,
                  problems: {
                    create: [
                      {
                        title: '大数写法练习',
                        content: '写出这个数：三千零六万零五十',
                        type: 'fill_blank',
                        difficulty: 2,
                        points: 10,
                        answer: { correct: '30060050' },
                        explanation: '三千零六万是30060000，再加上五十就是30060050',
                        tags: ['大数', '写法']
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            title: '公顷和平方千米',
            description: '认识面积单位公顷和平方千米，学会单位换算',
            order: 2,
            lessons: {
              create: [
                {
                  title: '认识公顷',
                  content: `# 认识公顷

## 公顷的概念
- 公顷是测量土地面积的单位
- 1公顷 = 10000平方米
- 边长100米的正方形面积是1公顷

## 实际应用
- 天安门广场约44公顷
- 一个标准足球场约0.7公顷
- 学校操场约0.4公顷

## 单位换算
- 1公顷 = 10000平方米
- 1平方千米 = 100公顷`,
                  order: 1,
                  problems: {
                    create: [
                      {
                        title: '公顷换算',
                        content: '3公顷等于多少平方米？',
                        type: 'fill_blank',
                        difficulty: 2,
                        points: 10,
                        answer: { correct: '30000' },
                        explanation: '1公顷=10000平方米，所以3公顷=3×10000=30000平方米',
                        tags: ['面积', '公顷', '换算']
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            title: '角的度量',
            description: '学习角的概念、分类和度量方法',
            order: 3,
            lessons: {
              create: [
                {
                  title: '角的认识',
                  content: `# 角的认识

## 角的定义
角是由一个顶点引出的两条射线所组成的图形

## 角的组成
- 顶点：角的端点
- 边：角的两条射线

## 角的分类
- 锐角：小于90°的角
- 直角：等于90°的角  
- 钝角：大于90°小于180°的角
- 平角：等于180°的角
- 周角：等于360°的角

## 角的度量单位
- 度（°）是角的度量单位
- 1周角 = 360°
- 1平角 = 180°
- 1直角 = 90°`,
                  order: 1,
                  problems: {
                    create: [
                      {
                        title: '角的分类',
                        content: '125°是什么角？',
                        type: 'multiple_choice',
                        difficulty: 2,
                        points: 10,
                        answer: { correct: 'B', options: ['锐角', '钝角', '直角', '平角'] },
                        explanation: '125°大于90°小于180°，所以是钝角',
                        tags: ['角', '分类']
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            title: '三位数乘两位数',
            description: '掌握三位数乘两位数的计算方法和应用',
            order: 4,
            lessons: {
              create: [
                {
                  title: '笔算乘法',
                  content: `# 三位数乘两位数

## 计算法则
1. 先用两位数个位上的数去乘三位数
2. 再用两位数十位上的数去乘三位数
3. 把两次乘得的积加起来

## 例题：计算 234 × 56
\`\`\`
    2 3 4
  ×   5 6
  -------
  1 4 0 4  ← 234×6
1 1 7 0 0  ← 234×50
---------
1 3 1 0 4
\`\`\`

## 注意事项
- 第二步乘积的末位要和十位对齐
- 进位要正确处理`,
                  order: 1,
                  problems: {
                    create: [
                      {
                        title: '三位数乘两位数计算',
                        content: '计算：145 × 23',
                        type: 'fill_blank',
                        difficulty: 3,
                        points: 15,
                        answer: { correct: '3335' },
                        explanation: '145×3=435, 145×20=2900, 435+2900=3335',
                        tags: ['乘法', '计算']
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
      description: '五年级数学完整课程，包含小数运算、方程、几何等核心内容',
      level: '小学',
      subject: '数学',
      order: 5,
      chapters: {
        create: [
          {
            title: '小数乘法',
            description: '学习小数乘法的计算方法和规律',
            order: 1,
            lessons: {
              create: [
                {
                  title: '小数乘整数',
                  content: `# 小数乘整数

## 计算方法
1. 先按照整数乘法的法则算出积
2. 再看被乘数有几位小数，就从积的右边起数出几位，点上小数点

## 例题：2.45 × 3
\`\`\`
  2.45
×    3
------
  7.35
\`\`\`

## 验算方法
可以用除法验算：7.35 ÷ 3 = 2.45`,
                  order: 1,
                  problems: {
                    create: [
                      {
                        title: '小数乘整数',
                        content: '计算：3.25 × 4',
                        type: 'fill_blank',
                        difficulty: 2,
                        points: 10,
                        answer: { correct: '13' },
                        explanation: '325×4=1300，被乘数有2位小数，积就有2位小数：13.00=13',
                        tags: ['小数', '乘法']
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            title: '简易方程',
            description: '学习用字母表示数，解简单的方程',
            order: 2,
            lessons: {
              create: [
                {
                  title: '用字母表示数',
                  content: `# 用字母表示数

## 用字母表示数的意义
- 简洁明了
- 便于表达规律
- 具有一般性

## 书写规定
1. 数与字母、字母与字母相乘时，乘号可以省略或用"·"表示
2. 数字要写在字母前面
3. 1与字母相乘时，1可以省略

## 例子
- 速度×时间=路程：v×t=s 或 vt=s
- 长方形面积：长×宽=a×b=ab`,
                  order: 1,
                  problems: {
                    create: [
                      {
                        title: '用字母表示数',
                        content: '苹果每千克a元，买5千克需要多少元？',
                        type: 'fill_blank',
                        difficulty: 2,
                        points: 10,
                        answer: { correct: '5a' },
                        explanation: '5千克苹果的价钱是：5×a=5a元',
                        tags: ['字母', '表示数']
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            title: '多边形的面积',
            description: '学习平行四边形、三角形、梯形的面积计算',
            order: 3,
            lessons: {
              create: [
                {
                  title: '平行四边形的面积',
                  content: `# 平行四边形的面积

## 面积公式
平行四边形的面积 = 底 × 高
S = a × h

## 公式推导
通过剪拼可以将平行四边形转化为长方形：
- 平行四边形的底 = 长方形的长
- 平行四边形的高 = 长方形的宽

## 注意事项
- 高是指底边上的高，与底边垂直
- 平行四边形的对边平行且相等`,
                  order: 1,
                  problems: {
                    create: [
                      {
                        title: '平行四边形面积计算',
                        content: '一个平行四边形的底是8米，高是6米，面积是多少？',
                        type: 'fill_blank',
                        difficulty: 2,
                        points: 10,
                        answer: { correct: '48' },
                        explanation: '面积 = 底×高 = 8×6 = 48平方米',
                        tags: ['平行四边形', '面积']
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

  // 小学六年级数学
  const primaryGrade6 = await prisma.course.create({
    data: {
      title: '小学六年级数学',
      description: '六年级数学完整课程，分数、比例、圆、统计等进阶内容',
      level: '小学',
      subject: '数学',
      order: 6,
      chapters: {
        create: [
          {
            title: '分数乘法',
            description: '掌握分数乘法的计算方法和应用',
            order: 1,
            lessons: {
              create: [
                {
                  title: '分数乘整数',
                  content: `# 分数乘整数

## 计算方法
分数乘整数，用分数的分子和整数相乘的积作分子，分母不变

## 公式
a/b × c = (a×c)/b

## 例题
2/5 × 3 = (2×3)/5 = 6/5

## 约分
计算结果能约分的要约分，能化成带分数的要化成带分数`,
                  order: 1,
                  problems: {
                    create: [
                      {
                        title: '分数乘整数',
                        content: '计算：3/4 × 8',
                        type: 'fill_blank',
                        difficulty: 2,
                        points: 10,
                        answer: { correct: '6' },
                        explanation: '3/4 × 8 = (3×8)/4 = 24/4 = 6',
                        tags: ['分数', '乘法']
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            title: '圆',
            description: '学习圆的特征、周长和面积',
            order: 2,
            lessons: {
              create: [
                {
                  title: '圆的认识',
                  content: `# 圆的认识

## 圆的特征
- 圆是平面上的一种曲线图形
- 圆上任意一点到圆心的距离都相等

## 圆的各部分名称
- **圆心**：圆中心的点，一般用字母O表示
- **半径**：连接圆心和圆上任意一点的线段，一般用字母r表示
- **直径**：通过圆心并且两端都在圆上的线段，一般用字母d表示

## 圆的性质
- 在同一个圆里，所有半径都相等
- 在同一个圆里，直径等于半径的2倍：d = 2r`,
                  order: 1,
                  problems: {
                    create: [
                      {
                        title: '圆的基本概念',
                        content: '一个圆的半径是5厘米，它的直径是多少厘米？',
                        type: 'fill_blank',
                        difficulty: 2,
                        points: 10,
                        answer: { correct: '10' },
                        explanation: '直径 = 2×半径 = 2×5 = 10厘米',
                        tags: ['圆', '半径', '直径']
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

  // 七年级数学
  const middle7 = await prisma.course.create({
    data: {
      title: '七年级数学',
      description: '初中一年级数学课程，有理数、整式、方程、几何等基础内容',
      level: '初中',
      subject: '数学',
      order: 1,
      chapters: {
        create: [
          {
            title: '有理数',
            description: '学习有理数的概念、分类和运算',
            order: 1,
            lessons: {
              create: [
                {
                  title: '正数和负数',
                  content: `# 正数和负数

## 正数和负数的产生
在生活中，我们经常遇到具有相反意义的量：
- 零上温度和零下温度
- 收入和支出
- 上升和下降

## 正数和负数的表示
- **正数**：大于0的数，如：+5, +3.2, +1/2
- **负数**：小于0的数，如：-3, -0.5, -2/3
- **零**：既不是正数，也不是负数

## 数轴
- 数轴是规定了原点、正方向和单位长度的直线
- 所有的有理数都可以用数轴上的点来表示`,
                  order: 1,
                  problems: {
                    create: [
                      {
                        title: '正负数判断',
                        content: '下列各数中，哪个是负数？',
                        type: 'multiple_choice',
                        difficulty: 2,
                        points: 10,
                        answer: { correct: 'B', options: ['+5', '-3', '0', '1.5'] },
                        explanation: '-3小于0，是负数',
                        tags: ['有理数', '正负数']
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            title: '整式的加减',
            description: '学习单项式、多项式的概念和加减运算',
            order: 2,
            lessons: {
              create: [
                {
                  title: '单项式',
                  content: `# 单项式

## 单项式的定义
数或字母的积组成的式子叫做单项式。单独的一个数或一个字母也是单项式。

## 单项式的系数和次数
- **系数**：单项式中的数字因数
- **次数**：单项式中所有字母的指数的和

## 例子
- 3x²y：系数是3，次数是2+1=3
- -5a：系数是-5，次数是1
- 7：系数是7，次数是0`,
                  order: 1,
                  problems: {
                    create: [
                      {
                        title: '单项式的系数和次数',
                        content: '单项式-4x³y²的系数是多少？',
                        type: 'fill_blank',
                        difficulty: 2,
                        points: 10,
                        answer: { correct: '-4' },
                        explanation: '单项式-4x³y²中的数字因数是-4，所以系数是-4',
                        tags: ['单项式', '系数']
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

  // 八年级数学
  const middle8 = await prisma.course.create({
    data: {
      title: '八年级数学',
      description: '初中二年级数学课程，三角形、函数、二次根式等重点内容',
      level: '初中',
      subject: '数学',
      order: 2,
      chapters: {
        create: [
          {
            title: '三角形',
            description: '学习三角形的性质、分类和相关定理',
            order: 1,
            lessons: {
              create: [
                {
                  title: '三角形的边',
                  content: `# 三角形的边

## 三角形的定义
由不在同一直线上的三条线段首尾顺次相接所组成的图形叫做三角形。

## 三角形的三边关系
**三角形任意两边的和大于第三边，任意两边的差小于第三边。**

## 应用
判断三条线段能否组成三角形：
- 设三边长分别为a、b、c（a≤b≤c）
- 只需验证a+b>c即可

## 例题
能否用长度分别为3cm、4cm、8cm的三条线段组成三角形？
解：3+4=7<8，所以不能组成三角形。`,
                  order: 1,
                  problems: {
                    create: [
                      {
                        title: '三角形三边关系',
                        content: '三条边长分别为5、7、11的线段能组成三角形吗？',
                        type: 'multiple_choice',
                        difficulty: 3,
                        points: 15,
                        answer: { correct: 'A', options: ['能', '不能', '不确定', '需要更多条件'] },
                        explanation: '5+7=12>11，满足三角形三边关系，能组成三角形',
                        tags: ['三角形', '三边关系']
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            title: '一次函数',
            description: '深入学习一次函数的性质、图像和应用',
            order: 2,
            lessons: {
              create: [
                {
                  title: '一次函数的图像',
                  content: `# 一次函数的图像

## 一次函数图像的特点
一次函数y = kx + b（k≠0）的图像是一条直线

## 图像与系数的关系
- **k > 0**：图像从左到右上升（递增）
- **k < 0**：图像从左到右下降（递减）
- **b > 0**：直线与y轴交点在x轴上方
- **b < 0**：直线与y轴交点在x轴下方
- **b = 0**：直线过原点（正比例函数）

## 画图方法
两点确定一条直线，所以只需找两个点：
1. 令x=0，求出y值，得到与y轴的交点
2. 令y=0，求出x值，得到与x轴的交点`,
                  order: 1,
                  problems: {
                    create: [
                      {
                        title: '一次函数图像性质',
                        content: '函数y = -2x + 3的图像经过哪个象限？',
                        type: 'multiple_choice',
                        difficulty: 3,
                        points: 15,
                        answer: { correct: 'B', options: ['一、二、三象限', '一、二、四象限', '一、三、四象限', '二、三、四象限'] },
                        explanation: 'k=-2<0，b=3>0，图像递减且与y轴正半轴相交，经过一、二、四象限',
                        tags: ['一次函数', '图像']
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

  // 高中必修一
  const highMath1 = await prisma.course.create({
    data: {
      title: '高中数学必修一',
      description: '高中数学基础，集合与函数概念、基本初等函数',
      level: '高中',
      subject: '数学',
      order: 1,
      chapters: {
        create: [
          {
            title: '集合与函数概念',
            description: '学习集合的基本概念和函数的定义',
            order: 1,
            lessons: {
              create: [
                {
                  title: '集合的含义与表示',
                  content: `# 集合的含义与表示

## 集合的概念
一般地，指定的某些对象的全体称为集合。集合中的每个对象叫做这个集合的元素。

## 集合的特性
1. **确定性**：集合的元素必须是确定的
2. **互异性**：集合中的元素是互不相同的  
3. **无序性**：集合中的元素没有顺序

## 元素与集合的关系
- a是集合A的元素，记作a∈A
- a不是集合A的元素，记作a∉A

## 集合的表示方法
1. **列举法**：{1, 2, 3, 4, 5}
2. **描述法**：{x|x>0}
3. **图示法**：韦恩图`,
                  order: 1,
                  problems: {
                    create: [
                      {
                        title: '集合的表示',
                        content: '用列举法表示集合{x|x²=4}',
                        type: 'fill_blank',
                        difficulty: 3,
                        points: 15,
                        answer: { correct: '{-2,2}' },
                        explanation: 'x²=4的解是x=2或x=-2，所以集合为{-2,2}',
                        tags: ['集合', '表示方法']
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            title: '基本初等函数',
            description: '学习指数函数、对数函数、幂函数',
            order: 2,
            lessons: {
              create: [
                {
                  title: '指数函数',
                  content: `# 指数函数

## 指数函数的定义
形如y = aˣ（a>0且a≠1）的函数叫做指数函数

## 指数函数的性质
当a>1时：
- 定义域：R
- 值域：(0,+∞)
- 在R上单调递增
- 过点(0,1)

当0<a<1时：
- 定义域：R  
- 值域：(0,+∞)
- 在R上单调递减
- 过点(0,1)

## 指数运算法则
- aᵐ·aⁿ = aᵐ⁺ⁿ
- (aᵐ)ⁿ = aᵐⁿ
- (ab)ⁿ = aⁿbⁿ`,
                  order: 1,
                  problems: {
                    create: [
                      {
                        title: '指数函数性质',
                        content: '函数y = 3ˣ在R上是什么性质？',
                        type: 'multiple_choice',
                        difficulty: 3,
                        points: 15,
                        answer: { correct: 'A', options: ['单调递增', '单调递减', '先增后减', '先减后增'] },
                        explanation: '因为3>1，所以y = 3ˣ在R上单调递增',
                        tags: ['指数函数', '单调性']
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

  // 高等数学
  const collegeMath = await prisma.course.create({
    data: {
      title: '高等数学',
      description: '大学数学基础课程，极限、导数、积分等核心内容',
      level: '大学',
      subject: '高等数学',
      order: 1,
      chapters: {
        create: [
          {
            title: '函数与极限',
            description: '学习函数概念、极限理论和连续性',
            order: 1,
            lessons: {
              create: [
                {
                  title: '函数的概念',
                  content: `# 函数的概念

## 函数的定义
设D是一个非空的数集，如果按某个确定的法则f，使对于集合D中的每一个数x，在数集Y中都有唯一确定的数y和它对应，那么就称这个对应法则f为从集合D到集合Y的一个函数。

## 函数的要素
1. **定义域**：自变量x的取值范围
2. **值域**：因变量y的取值范围  
3. **对应法则**：x与y之间的关系

## 函数的表示法
1. **解析法**：用数学表达式表示
2. **图象法**：用图形表示
3. **表格法**：用表格表示

## 基本初等函数
- 常数函数：y = c
- 幂函数：y = xⁿ
- 指数函数：y = aˣ  
- 对数函数：y = log_a x
- 三角函数：y = sin x, y = cos x等`,
                  order: 1,
                  problems: {
                    create: [
                      {
                        title: '函数定义域',
                        content: '函数f(x) = √(x-1)的定义域是什么？',
                        type: 'fill_blank',
                        difficulty: 4,
                        points: 20,
                        answer: { correct: '[1,+∞)' },
                        explanation: '根号下的表达式x-1≥0，所以x≥1，定义域为[1,+∞)',
                        tags: ['函数', '定义域']
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            title: '导数与微分',
            description: '学习导数的定义、计算和应用',
            order: 2,
            lessons: {
              create: [
                {
                  title: '导数的定义',
                  content: `# 导数的定义

## 导数的几何意义
函数y = f(x)在点x₀处的导数f'(x₀)等于曲线y = f(x)在点(x₀, f(x₀))处的切线斜率。

## 导数的定义
设函数y = f(x)在点x₀的某个邻域内有定义，如果极限
$$\\lim_{\\Delta x \\to 0} \\frac{f(x_0 + \\Delta x) - f(x_0)}{\\Delta x}$$
存在，则称函数f(x)在点x₀处可导，并称这个极限为f(x)在点x₀处的导数。

## 基本导数公式
- (C)' = 0（C为常数）
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
                }
              ]
            }
          }
        ]
      }
    }
  })

  console.log('完整数学课程体系创建完成！')
  
  const stats = await Promise.all([
    prisma.course.count(),
    prisma.chapter.count(), 
    prisma.lesson.count(),
    prisma.problem.count()
  ])

  console.log(`\\n📊 课程统计：`)
  console.log(`- 课程总数：${stats[0]}`)
  console.log(`- 章节总数：${stats[1]}`)
  console.log(`- 课时总数：${stats[2]}`)
  console.log(`- 练习题总数：${stats[3]}`)

  console.log(`\\n📚 课程体系：`)
  console.log(`小学：四年级、五年级、六年级数学`)
  console.log(`初中：七年级、八年级数学`) 
  console.log(`高中：数学必修一`)
  console.log(`大学：高等数学`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })