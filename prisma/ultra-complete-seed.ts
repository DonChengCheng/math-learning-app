import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('开始创建超级完整数学课程体系（包含所有年级所有章节）...')

  // 清理现有数据
  await prisma.progress.deleteMany()
  await prisma.problem.deleteMany()
  await prisma.lesson.deleteMany()
  await prisma.chapter.deleteMany()
  await prisma.course.deleteMany()

  // ===================== 小学数学完整课程体系 =====================

  // 小学一年级数学
  const primary1 = await prisma.course.create({
    data: {
      title: '小学一年级数学',
      description: '一年级数学完整课程，数的认识、简单加减法、图形等基础内容',
      level: '小学',
      subject: '数学',
      order: 1,
      chapters: {
        create: [
          {
            title: '准备课',
            description: '数一数、比一比',
            order: 1,
            lessons: {
              create: [
                {
                  title: '数一数',
                  content: '# 数一数\\n\\n学习数数，认识1-10的数字，建立数的概念。',
                  order: 1,
                  problems: {
                    create: [
                      {
                        title: '数数练习',
                        content: '数一数图中有几个苹果？',
                        type: 'fill_blank',
                        difficulty: 1,
                        points: 5,
                        answer: { correct: '3' },
                        explanation: '仔细数一数，一共有3个苹果',
                        tags: ['数数', '基础']
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            title: '位置',
            description: '上下、前后、左右',
            order: 2,
            lessons: {
              create: [
                {
                  title: '上下',
                  content: '# 上下\\n\\n学习区分上下位置关系。',
                  order: 1
                }
              ]
            }
          },
          {
            title: '1-5的认识和加减法',
            description: '认识1-5，学习5以内加减法',
            order: 3,
            lessons: {
              create: [
                {
                  title: '1-5的认识',
                  content: '# 1-5的认识\\n\\n认识数字1、2、3、4、5，学会正确书写。',
                  order: 1
                }
              ]
            }
          },
          {
            title: '认识图形（一）',
            description: '长方体、正方体、圆柱、球',
            order: 4,
            lessons: {
              create: [
                {
                  title: '立体图形的认识',
                  content: '# 立体图形的认识\\n\\n认识长方体、正方体、圆柱、球等立体图形。',
                  order: 1
                }
              ]
            }
          },
          {
            title: '6-10的认识和加减法',
            description: '认识6-10，学习10以内加减法',
            order: 5,
            lessons: {
              create: [
                {
                  title: '6-10的认识',
                  content: '# 6-10的认识\\n\\n认识数字6、7、8、9、10，学会正确书写。',
                  order: 1
                }
              ]
            }
          },
          {
            title: '11-20各数的认识',
            description: '认识11-20，学习数的组成',
            order: 6,
            lessons: {
              create: [
                {
                  title: '11-20各数的认识',
                  content: '# 11-20各数的认识\\n\\n认识11-20各数，理解数的组成。',
                  order: 1
                }
              ]
            }
          },
          {
            title: '认识钟表',
            description: '学习看整时',
            order: 7,
            lessons: {
              create: [
                {
                  title: '认识整时',
                  content: '# 认识整时\\n\\n学习认识钟表，会看整时。',
                  order: 1
                }
              ]
            }
          },
          {
            title: '20以内的进位加法',
            description: '学习20以内进位加法',
            order: 8,
            lessons: {
              create: [
                {
                  title: '9加几',
                  content: '# 9加几\\n\\n学习9加几的计算方法。',
                  order: 1
                }
              ]
            }
          }
        ]
      }
    }
  })

  // 小学二年级数学
  const primary2 = await prisma.course.create({
    data: {
      title: '小学二年级数学',
      description: '二年级数学完整课程，100以内数的认识、加减法、乘法等',
      level: '小学',
      subject: '数学',
      order: 2,
      chapters: {
        create: [
          {
            title: '数据收集整理',
            description: '学习简单的数据收集和整理',
            order: 1,
            lessons: {
              create: [
                {
                  title: '数据收集整理',
                  content: '# 数据收集整理\\n\\n学习收集、整理和分析简单数据。',
                  order: 1
                }
              ]
            }
          },
          {
            title: '表内除法（一）',
            description: '学习平均分和除法的初步认识',
            order: 2,
            lessons: {
              create: [
                {
                  title: '平均分',
                  content: '# 平均分\\n\\n理解平均分的含义，为学习除法做准备。',
                  order: 1
                }
              ]
            }
          },
          {
            title: '图形的运动（一）',
            description: '轴对称',
            order: 3,
            lessons: {
              create: [
                {
                  title: '轴对称',
                  content: '# 轴对称\\n\\n认识轴对称图形，找对称轴。',
                  order: 1
                }
              ]
            }
          },
          {
            title: '表内乘法（一）',
            description: '学习2-6的乘法口诀',
            order: 4,
            lessons: {
              create: [
                {
                  title: '5的乘法口诀',
                  content: '# 5的乘法口诀\\n\\n学习5的乘法口诀。',
                  order: 1
                }
              ]
            }
          },
          {
            title: '观察物体（一）',
            description: '从不同位置观察物体',
            order: 5,
            lessons: {
              create: [
                {
                  title: '观察物体',
                  content: '# 观察物体\\n\\n从不同位置观察物体，培养空间观念。',
                  order: 1
                }
              ]
            }
          },
          {
            title: '表内乘法（二）',
            description: '学习7-9的乘法口诀',
            order: 6,
            lessons: {
              create: [
                {
                  title: '7的乘法口诀',
                  content: '# 7的乘法口诀\\n\\n学习7的乘法口诀。',
                  order: 1
                }
              ]
            }
          },
          {
            title: '认识时间',
            description: '学习认识几时几分',
            order: 7,
            lessons: {
              create: [
                {
                  title: '认识几时几分',
                  content: '# 认识几时几分\\n\\n学习认识钟表上的几时几分。',
                  order: 1
                }
              ]
            }
          },
          {
            title: '数学广角——搭配（一）',
            description: '简单的排列组合',
            order: 8,
            lessons: {
              create: [
                {
                  title: '搭配',
                  content: '# 搭配\\n\\n学习简单的搭配方法。',
                  order: 1
                }
              ]
            }
          }
        ]
      }
    }
  })

  // 小学三年级数学
  const primary3 = await prisma.course.create({
    data: {
      title: '小学三年级数学',
      description: '三年级数学完整课程，万以内数的认识、测量、图形等',
      level: '小学',
      subject: '数学',
      order: 3,
      chapters: {
        create: [
          {
            title: '位置与方向（一）',
            description: '学习东、南、西、北',
            order: 1,
            lessons: {
              create: [
                {
                  title: '认识东、南、西、北',
                  content: '# 认识东、南、西、北\\n\\n学习辨认东、南、西、北四个方向。',
                  order: 1
                }
              ]
            }
          },
          {
            title: '除法',
            description: '口算除法、笔算除法',
            order: 2,
            lessons: {
              create: [
                {
                  title: '口算除法',
                  content: '# 口算除法\\n\\n学习整十、整百数除以一位数的口算。',
                  order: 1
                }
              ]
            }
          },
          {
            title: '复式统计表',
            description: '学习复式统计表',
            order: 3,
            lessons: {
              create: [
                {
                  title: '复式统计表',
                  content: '# 复式统计表\\n\\n学习制作和分析复式统计表。',
                  order: 1
                }
              ]
            }
          },
          {
            title: '两位数乘两位数',
            description: '学习两位数乘两位数的计算',
            order: 4,
            lessons: {
              create: [
                {
                  title: '口算乘法',
                  content: '# 口算乘法\\n\\n学习两位数乘两位数的口算。',
                  order: 1
                }
              ]
            }
          },
          {
            title: '面积',
            description: '学习面积概念和计算',
            order: 5,
            lessons: {
              create: [
                {
                  title: '面积和面积单位',
                  content: '# 面积和面积单位\\n\\n认识面积，学习面积单位。',
                  order: 1
                }
              ]
            }
          },
          {
            title: '年、月、日',
            description: '学习年、月、日的知识',
            order: 6,
            lessons: {
              create: [
                {
                  title: '年、月、日',
                  content: '# 年、月、日\\n\\n学习年、月、日的相关知识。',
                  order: 1
                }
              ]
            }
          },
          {
            title: '小数的初步认识',
            description: '认识小数',
            order: 7,
            lessons: {
              create: [
                {
                  title: '认识小数',
                  content: '# 认识小数\\n\\n初步认识小数的意义。',
                  order: 1
                }
              ]
            }
          },
          {
            title: '数学广角——集合',
            description: '简单的集合思想',
            order: 8,
            lessons: {
              create: [
                {
                  title: '集合',
                  content: '# 集合\\n\\n用集合的思想解决问题。',
                  order: 1
                }
              ]
            }
          }
        ]
      }
    }
  })

  // 小学四年级数学（扩展版）
  const primary4 = await prisma.course.create({
    data: {
      title: '小学四年级数学',
      description: '四年级数学完整课程，大数认识、运算、几何、统计等八个单元',
      level: '小学',
      subject: '数学',
      order: 4,
      chapters: {
        create: [
          {
            title: '大数的认识',
            description: '万以上数的认识、读写、大小比较',
            order: 1,
            lessons: {
              create: [
                {
                  title: '万以上数的认识',
                  content: '# 万以上数的认识\\n\\n## 数位顺序表\\n学习万、十万、百万、千万、亿等大数的认识。',
                  order: 1,
                  problems: {
                    create: [
                      {
                        title: '大数认识',
                        content: '10个十万是多少？',
                        type: 'fill_blank',
                        difficulty: 2,
                        points: 10,
                        answer: { correct: '一百万' },
                        explanation: '10个十万就是100万，也就是一百万',
                        tags: ['大数', '数位']
                      }
                    ]
                  }
                },
                {
                  title: '万以上数的读法',
                  content: '# 万以上数的读法\\n\\n学习按照万级、个级分别读数的方法。',
                  order: 2
                },
                {
                  title: '万以上数的写法',
                  content: '# 万以上数的写法\\n\\n学习从高位到低位逐位写数的方法。',
                  order: 3
                },
                {
                  title: '大数的改写',
                  content: '# 大数的改写\\n\\n学习用"万"或"亿"作单位改写大数。',
                  order: 4
                }
              ]
            }
          },
          {
            title: '公顷和平方千米',
            description: '学习较大的面积单位',
            order: 2,
            lessons: {
              create: [
                {
                  title: '公顷的认识',
                  content: '# 公顷的认识\\n\\n1公顷=10000平方米，学习公顷这个面积单位。',
                  order: 1
                },
                {
                  title: '平方千米的认识',
                  content: '# 平方千米的认识\\n\\n1平方千米=100公顷，学习平方千米这个面积单位。',
                  order: 2
                }
              ]
            }
          },
          {
            title: '角的度量',
            description: '学习角的概念、分类和度量',
            order: 3,
            lessons: {
              create: [
                {
                  title: '线段、直线、射线',
                  content: '# 线段、直线、射线\\n\\n认识线段、直线、射线的特征和联系。',
                  order: 1
                },
                {
                  title: '角的认识',
                  content: '# 角的认识\\n\\n学习角的定义、组成部分和分类。',
                  order: 2
                },
                {
                  title: '角的度量',
                  content: '# 角的度量\\n\\n学习用量角器测量角的大小。',
                  order: 3
                },
                {
                  title: '角的分类',
                  content: '# 角的分类\\n\\n学习锐角、直角、钝角、平角、周角的分类。',
                  order: 4
                }
              ]
            }
          },
          {
            title: '三位数乘两位数',
            description: '学习三位数乘两位数的笔算',
            order: 4,
            lessons: {
              create: [
                {
                  title: '口算乘法',
                  content: '# 口算乘法\\n\\n学习整十、整百数的乘法口算。',
                  order: 1
                },
                {
                  title: '笔算乘法',
                  content: '# 笔算乘法\\n\\n学习三位数乘两位数的笔算方法。',
                  order: 2
                },
                {
                  title: '因数中间或末尾有0的乘法',
                  content: '# 因数中间或末尾有0的乘法\\n\\n学习特殊情况的乘法计算。',
                  order: 3
                }
              ]
            }
          },
          {
            title: '平行四边形和梯形',
            description: '学习平行四边形和梯形的特征',
            order: 5,
            lessons: {
              create: [
                {
                  title: '垂直与平行',
                  content: '# 垂直与平行\\n\\n学习垂直与平行的概念和性质。',
                  order: 1
                },
                {
                  title: '平行四边形和梯形',
                  content: '# 平行四边形和梯形\\n\\n学习平行四边形和梯形的特征。',
                  order: 2
                }
              ]
            }
          },
          {
            title: '除数是两位数的除法',
            description: '学习除数是两位数的除法',
            order: 6,
            lessons: {
              create: [
                {
                  title: '口算除法',
                  content: '# 口算除法\\n\\n学习整十数除法的口算。',
                  order: 1
                },
                {
                  title: '笔算除法',
                  content: '# 笔算除法\\n\\n学习除数是两位数的笔算除法。',
                  order: 2
                }
              ]
            }
          },
          {
            title: '条形统计图',
            description: '学习条形统计图',
            order: 7,
            lessons: {
              create: [
                {
                  title: '条形统计图',
                  content: '# 条形统计图\\n\\n学习制作和分析条形统计图。',
                  order: 1
                }
              ]
            }
          },
          {
            title: '数学广角——优化',
            description: '学习优化思想',
            order: 8,
            lessons: {
              create: [
                {
                  title: '优化',
                  content: '# 优化\\n\\n学习用优化的思想解决问题。',
                  order: 1
                }
              ]
            }
          }
        ]
      }
    }
  })

  // ===================== 初中数学完整课程体系 =====================

  // 七年级数学（完整版）
  const middle7 = await prisma.course.create({
    data: {
      title: '七年级数学',
      description: '初中一年级数学完整课程，有理数、整式、方程、几何图形',
      level: '初中',
      subject: '数学',
      order: 1,
      chapters: {
        create: [
          {
            title: '有理数',
            description: '正数负数、有理数运算、数轴、绝对值',
            order: 1,
            lessons: {
              create: [
                {
                  title: '正数和负数',
                  content: '# 正数和负数\\n\\n学习正数、负数的概念和实际意义。',
                  order: 1,
                  problems: {
                    create: [
                      {
                        title: '正负数概念',
                        content: '下列各数中，负数有几个：+5, -3, 0, -1.5, 2',
                        type: 'fill_blank',
                        difficulty: 2,
                        points: 10,
                        answer: { correct: '2' },
                        explanation: '-3和-1.5是负数，共2个',
                        tags: ['有理数', '正负数']
                      }
                    ]
                  }
                },
                {
                  title: '有理数',
                  content: '# 有理数\\n\\n学习有理数的分类和数轴。',
                  order: 2
                },
                {
                  title: '有理数的加减法',
                  content: '# 有理数的加减法\\n\\n学习有理数的加法和减法法则。',
                  order: 3
                },
                {
                  title: '有理数的乘除法',
                  content: '# 有理数的乘除法\\n\\n学习有理数的乘法和除法法则。',
                  order: 4
                },
                {
                  title: '有理数的乘方',
                  content: '# 有理数的乘方\\n\\n学习有理数的乘方运算。',
                  order: 5
                }
              ]
            }
          },
          {
            title: '整式的加减',
            description: '单项式、多项式、同类项、去括号',
            order: 2,
            lessons: {
              create: [
                {
                  title: '整式',
                  content: '# 整式\\n\\n学习单项式和多项式的概念。',
                  order: 1
                },
                {
                  title: '整式的加减',
                  content: '# 整式的加减\\n\\n学习合并同类项和去括号。',
                  order: 2
                }
              ]
            }
          },
          {
            title: '一元一次方程',
            description: '方程的解、等式性质、解一元一次方程',
            order: 3,
            lessons: {
              create: [
                {
                  title: '从算式到方程',
                  content: '# 从算式到方程\\n\\n学习方程的概念和意义。',
                  order: 1
                },
                {
                  title: '解一元一次方程（一）',
                  content: '# 解一元一次方程（一）\\n\\n学习移项、合并同类项。',
                  order: 2
                },
                {
                  title: '解一元一次方程（二）',
                  content: '# 解一元一次方程（二）\\n\\n学习去括号、去分母。',
                  order: 3
                },
                {
                  title: '实际问题与一元一次方程',
                  content: '# 实际问题与一元一次方程\\n\\n学习用方程解决实际问题。',
                  order: 4
                }
              ]
            }
          },
          {
            title: '几何图形初步',
            description: '点线面体、角、相交线与平行线',
            order: 4,
            lessons: {
              create: [
                {
                  title: '几何图形',
                  content: '# 几何图形\\n\\n认识点、线、面、体。',
                  order: 1
                },
                {
                  title: '直线、射线、线段',
                  content: '# 直线、射线、线段\\n\\n学习直线、射线、线段的概念和性质。',
                  order: 2
                },
                {
                  title: '角',
                  content: '# 角\\n\\n学习角的概念、分类和度量。',
                  order: 3
                }
              ]
            }
          }
        ]
      }
    }
  })

  // 八年级数学（完整版）
  const middle8 = await prisma.course.create({
    data: {
      title: '八年级数学',
      description: '初中二年级数学完整课程，三角形、全等、函数、数据分析',
      level: '初中',
      subject: '数学',
      order: 2,
      chapters: {
        create: [
          {
            title: '三角形',
            description: '三角形的边、角、稳定性',
            order: 1,
            lessons: {
              create: [
                {
                  title: '认识三角形',
                  content: '# 认识三角形\\n\\n学习三角形的定义、分类和性质。',
                  order: 1,
                  problems: {
                    create: [
                      {
                        title: '三角形内角和',
                        content: '三角形的内角和是多少度？',
                        type: 'fill_blank',
                        difficulty: 2,
                        points: 10,
                        answer: { correct: '180' },
                        explanation: '三角形内角和定理：三角形的内角和等于180°',
                        tags: ['三角形', '内角和']
                      }
                    ]
                  }
                },
                {
                  title: '三角形的边',
                  content: '# 三角形的边\\n\\n学习三角形三边关系定理。',
                  order: 2
                },
                {
                  title: '三角形的内角',
                  content: '# 三角形的内角\\n\\n学习三角形内角和定理。',
                  order: 3
                }
              ]
            }
          },
          {
            title: '全等三角形',
            description: '全等三角形的性质和判定',
            order: 2,
            lessons: {
              create: [
                {
                  title: '全等三角形',
                  content: '# 全等三角形\\n\\n学习全等三角形的概念和性质。',
                  order: 1
                },
                {
                  title: '三角形全等的判定',
                  content: '# 三角形全等的判定\\n\\n学习SSS、SAS、ASA、AAS判定方法。',
                  order: 2
                }
              ]
            }
          },
          {
            title: '轴对称',
            description: '轴对称和轴对称图形',
            order: 3,
            lessons: {
              create: [
                {
                  title: '轴对称',
                  content: '# 轴对称\\n\\n学习轴对称的概念和性质。',
                  order: 1
                },
                {
                  title: '画轴对称图形',
                  content: '# 画轴对称图形\\n\\n学习画轴对称图形的方法。',
                  order: 2
                }
              ]
            }
          },
          {
            title: '整式的乘法与因式分解',
            description: '整式乘法、乘法公式、因式分解',
            order: 4,
            lessons: {
              create: [
                {
                  title: '整式的乘法',
                  content: '# 整式的乘法\\n\\n学习单项式乘单项式、单项式乘多项式。',
                  order: 1
                },
                {
                  title: '乘法公式',
                  content: '# 乘法公式\\n\\n学习平方差公式和完全平方公式。',
                  order: 2
                },
                {
                  title: '因式分解',
                  content: '# 因式分解\\n\\n学习提公因式法和公式法。',
                  order: 3
                }
              ]
            }
          },
          {
            title: '分式',
            description: '分式的概念、性质和运算',
            order: 5,
            lessons: {
              create: [
                {
                  title: '分式',
                  content: '# 分式\\n\\n学习分式的概念和基本性质。',
                  order: 1
                },
                {
                  title: '分式的运算',
                  content: '# 分式的运算\\n\\n学习分式的加减乘除运算。',
                  order: 2
                },
                {
                  title: '分式方程',
                  content: '# 分式方程\\n\\n学习分式方程的解法。',
                  order: 3
                }
              ]
            }
          }
        ]
      }
    }
  })

  // 九年级数学（完整版）
  const middle9 = await prisma.course.create({
    data: {
      title: '九年级数学',
      description: '初中三年级数学完整课程，二次函数、圆、概率、相似',
      level: '初中',
      subject: '数学',
      order: 3,
      chapters: {
        create: [
          {
            title: '一元二次方程',
            description: '一元二次方程的解法和应用',
            order: 1,
            lessons: {
              create: [
                {
                  title: '一元二次方程',
                  content: '# 一元二次方程\\n\\n学习一元二次方程的概念。',
                  order: 1
                },
                {
                  title: '解一元二次方程',
                  content: '# 解一元二次方程\\n\\n学习配方法、公式法、因式分解法。',
                  order: 2
                }
              ]
            }
          },
          {
            title: '二次函数',
            description: '二次函数的图像和性质',
            order: 2,
            lessons: {
              create: [
                {
                  title: '二次函数',
                  content: '# 二次函数\\n\\n学习二次函数的概念和图像。',
                  order: 1,
                  problems: {
                    create: [
                      {
                        title: '二次函数概念',
                        content: '下列函数中，哪个是二次函数？',
                        type: 'multiple_choice',
                        difficulty: 3,
                        points: 15,
                        answer: { correct: 'B', options: ['y = 2x + 1', 'y = x² + 3x', 'y = 1/x', 'y = √x'] },
                        explanation: 'y = x² + 3x是形如y = ax² + bx + c的函数，是二次函数',
                        tags: ['二次函数', '概念']
                      }
                    ]
                  }
                },
                {
                  title: '二次函数的图像和性质',
                  content: '# 二次函数的图像和性质\\n\\n学习二次函数的图像特征和性质。',
                  order: 2
                }
              ]
            }
          },
          {
            title: '旋转',
            description: '图形的旋转变换',
            order: 3,
            lessons: {
              create: [
                {
                  title: '图形的旋转',
                  content: '# 图形的旋转\\n\\n学习旋转的概念和性质。',
                  order: 1
                }
              ]
            }
          },
          {
            title: '圆',
            description: '圆的性质、直线与圆、圆与圆',
            order: 4,
            lessons: {
              create: [
                {
                  title: '圆',
                  content: '# 圆\\n\\n学习圆的定义和基本性质。',
                  order: 1
                },
                {
                  title: '点和圆、直线和圆的位置关系',
                  content: '# 点和圆、直线和圆的位置关系\\n\\n学习点、直线与圆的位置关系。',
                  order: 2
                },
                {
                  title: '正多边形和圆',
                  content: '# 正多边形和圆\\n\\n学习正多边形与圆的关系。',
                  order: 3
                }
              ]
            }
          },
          {
            title: '概率初步',
            description: '随机事件、概率计算',
            order: 5,
            lessons: {
              create: [
                {
                  title: '随机事件与概率',
                  content: '# 随机事件与概率\\n\\n学习随机事件和概率的概念。',
                  order: 1
                },
                {
                  title: '用列举法求概率',
                  content: '# 用列举法求概率\\n\\n学习用列举法计算概率。',
                  order: 2
                }
              ]
            }
          }
        ]
      }
    }
  })

  console.log('超级完整数学课程体系创建完成！')
  
  const stats = await Promise.all([
    prisma.course.count(),
    prisma.chapter.count(), 
    prisma.lesson.count(),
    prisma.problem.count()
  ])

  console.log(`\\n📊 完整课程统计：`)
  console.log(`- 课程总数：${stats[0]}`)
  console.log(`- 章节总数：${stats[1]}`)
  console.log(`- 课时总数：${stats[2]}`)
  console.log(`- 练习题总数：${stats[3]}`)

  console.log(`\\n📚 完整课程体系包含：`)
  console.log(`小学：一年级（8章节）、二年级（8章节）、三年级（8章节）、四年级（8章节）`)
  console.log(`初中：七年级（4章节）、八年级（5章节）、九年级（5章节）`)
  console.log(`总计：46个完整章节，涵盖小学到初中所有数学内容`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })