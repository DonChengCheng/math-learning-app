import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('开始创建完整的数学课程数据...')

  // 清理现有数据
  await prisma.progress.deleteMany()
  await prisma.problem.deleteMany()
  await prisma.lesson.deleteMany()
  await prisma.chapter.deleteMany()
  await prisma.course.deleteMany()

  // ===================== 小学数学课程 =====================

  // 小学一年级数学
  const primaryGrade1 = await prisma.course.create({
    data: {
      title: '小学一年级数学',
      description: '适合6-7岁儿童的数学启蒙课程，包含数字认识、简单加减法等基础知识',
      level: '小学',
      subject: '数学',
      order: 1,
      chapters: {
        create: [
          {
            title: '认识数字（1-20）',
            description: '学习1到20的数字认识、书写和比较',
            order: 1,
            lessons: {
              create: [
                {
                  title: '认识数字1-10',
                  content: `# 认识数字1-10

## 学习目标
- 正确识别和书写数字1-10
- 理解数字的含义和大小关系
- 学会用数字表示物体的数量

## 数字认识
**1** - 像铅笔直又长
**2** - 像小鸭水上游  
**3** - 像耳朵听声音
**4** - 像小旗迎风飘
**5** - 像钩子来钓鱼
**6** - 像豆芽咧嘴笑
**7** - 像镰刀割青草
**8** - 像麻花拧一道
**9** - 像蝌蚪尾巴摇
**10** - 像筷子加鸡蛋

## 练习活动
1. 数一数：数出图片中物体的数量
2. 写一写：在田字格中正确书写数字
3. 比一比：比较数字的大小`,
                  order: 1,
                  problems: {
                    create: [
                      {
                        title: '数字识别',
                        content: '请选择数字"3"',
                        type: 'multiple_choice',
                        difficulty: 1,
                        points: 5,
                        answer: { correct: 'B', options: ['2', '3', '5', '8'] },
                        explanation: '数字3像耳朵的形状',
                        tags: ['数字识别', '基础']
                      },
                      {
                        title: '数数练习',
                        content: '数一数有几个苹果？🍎🍎🍎🍎🍎',
                        type: 'fill_blank',
                        difficulty: 1,
                        points: 5,
                        answer: { correct: '5' },
                        explanation: '一个一个地数：1、2、3、4、5',
                        tags: ['数数', '基础']
                      },
                      {
                        title: '比大小',
                        content: '比较：5 ○ 3（填入>、<或=）',
                        type: 'fill_blank',
                        difficulty: 1,
                        points: 5,
                        answer: { correct: '>' },
                        explanation: '5比3大，所以填>',
                        tags: ['比较大小', '基础']
                      }
                    ]
                  }
                },
                {
                  title: '认识数字11-20',
                  content: `# 认识数字11-20

## 学习目标
- 认识和书写11-20的数字
- 理解十位和个位的概念
- 学会用小棒表示这些数字

## 数字组成
- **11** = 1个十 + 1个一
- **12** = 1个十 + 2个一  
- **13** = 1个十 + 3个一
- **14** = 1个十 + 4个一
- **15** = 1个十 + 5个一
- **16** = 1个十 + 6个一
- **17** = 1个十 + 7个一
- **18** = 1个十 + 8个一
- **19** = 1个十 + 9个一
- **20** = 2个十 + 0个一

## 十位和个位
每个两位数都有十位和个位：
- 十位：表示有几个十
- 个位：表示有几个一

例如：15中，1在十位，表示1个十；5在个位，表示5个一`,
                  order: 2,
                  problems: {
                    create: [
                      {
                        title: '十位个位',
                        content: '数字17的十位是几？',
                        type: 'fill_blank',
                        difficulty: 1,
                        points: 5,
                        answer: { correct: '1' },
                        explanation: '17中，1在十位，7在个位',
                        tags: ['位数概念', '基础']
                      },
                      {
                        title: '数字组成',
                        content: '1个十和6个一组成的数字是？',
                        type: 'fill_blank',
                        difficulty: 1,
                        points: 5,
                        answer: { correct: '16' },
                        explanation: '1个十加6个一等于16',
                        tags: ['数字组成', '基础']
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            title: '加法和减法（10以内）',
            description: '学习10以内数字的加法和减法运算',
            order: 2,
            lessons: {
              create: [
                {
                  title: '加法的认识',
                  content: `# 加法的认识

## 什么是加法？
加法就是把两个或几个数合并在一起，求出总数。

## 加法的符号
- **+** 加号，表示相加
- **=** 等号，表示结果

## 加法的含义
3 + 2 = 5
- 3是第一个加数
- 2是第二个加数  
- 5是和（结果）

## 生活中的加法
- 小明有3个苹果，小红给了他2个苹果，小明现在有几个苹果？
- 答案：3 + 2 = 5（个）

## 加法练习
用实物帮助理解：
- 用小棒、积木等具体物品练习
- 先摆出第一个数，再摆出第二个数，最后数总数`,
                  order: 1,
                  problems: {
                    create: [
                      {
                        title: '简单加法',
                        content: '计算：2 + 3 = ?',
                        type: 'fill_blank',
                        difficulty: 1,
                        points: 5,
                        answer: { correct: '5' },
                        explanation: '2个加上3个等于5个',
                        tags: ['加法', '基础运算']
                      },
                      {
                        title: '加法应用',
                        content: '树上有4只鸟，又飞来了3只鸟，现在树上一共有几只鸟？',
                        type: 'fill_blank',
                        difficulty: 1,
                        points: 10,
                        answer: { correct: '7' },
                        explanation: '4 + 3 = 7（只）',
                        tags: ['加法', '应用题']
                      },
                      {
                        title: '加法选择',
                        content: '下面哪个算式的结果是6？',
                        type: 'multiple_choice',
                        difficulty: 1,
                        points: 5,
                        answer: { correct: 'B', options: ['2 + 3', '4 + 2', '1 + 4', '3 + 2'] },
                        explanation: '4 + 2 = 6',
                        tags: ['加法', '选择题']
                      }
                    ]
                  }
                },
                {
                  title: '减法的认识',
                  content: `# 减法的认识

## 什么是减法？
减法就是从一个数里面去掉一部分，求剩下多少。

## 减法的符号
- **-** 减号，表示减去
- **=** 等号，表示结果

## 减法的含义
7 - 3 = 4
- 7是被减数
- 3是减数
- 4是差（结果）

## 生活中的减法
- 盘子里有8个包子，吃了3个，还剩几个包子？
- 答案：8 - 3 = 5（个）

## 减法练习
用实物帮助理解：
- 先摆出被减数个物品
- 拿走减数个物品
- 数剩下的物品个数`,
                  order: 2,
                  problems: {
                    create: [
                      {
                        title: '简单减法',
                        content: '计算：8 - 5 = ?',
                        type: 'fill_blank',
                        difficulty: 1,
                        points: 5,
                        answer: { correct: '3' },
                        explanation: '8减去5等于3',
                        tags: ['减法', '基础运算']
                      },
                      {
                        title: '减法应用',
                        content: '花园里有9朵花，摘走了4朵，还剩几朵花？',
                        type: 'fill_blank',
                        difficulty: 1,
                        points: 10,
                        answer: { correct: '5' },
                        explanation: '9 - 4 = 5（朵）',
                        tags: ['减法', '应用题']
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            title: '认识图形',
            description: '认识基本的平面图形：圆形、正方形、三角形、长方形',
            order: 3,
            lessons: {
              create: [
                {
                  title: '认识圆形',
                  content: `# 认识圆形

## 圆形的特点
- 没有角
- 边是弯曲的，很光滑
- 从中心到边的距离都相等

## 生活中的圆形
我们身边有很多圆形的物体：
- 车轮 🚗
- 硬币 🪙
- 钟表 🕐
- 盘子 🍽️
- 皮球 ⚽
- 太阳 ☀️

## 画圆形
可以用圆规画圆，也可以：
- 用杯子底部画圆
- 用硬币画圆  
- 用圆形模板画圆

## 找一找
在教室里找一找哪些物体是圆形的？`,
                  order: 1,
                  problems: {
                    create: [
                      {
                        title: '圆形识别',
                        content: '下面哪个是圆形？',
                        type: 'multiple_choice',
                        difficulty: 1,
                        points: 5,
                        answer: { correct: 'A', options: ['⭕', '⬜', '🔺', '⬛'] },
                        explanation: '圆形没有角，边是弯曲的',
                        tags: ['图形识别', '圆形']
                      },
                      {
                        title: '生活中的圆形',
                        content: '车轮是什么形状？',
                        type: 'multiple_choice',
                        difficulty: 1,
                        points: 5,
                        answer: { correct: 'A', options: ['圆形', '方形', '三角形', '长方形'] },
                        explanation: '车轮是圆形的，这样才能滚动',
                        tags: ['图形应用', '圆形']
                      }
                    ]
                  }
                },
                {
                  title: '认识正方形和长方形',
                  content: `# 认识正方形和长方形

## 正方形的特点
- 有4个角，每个角都是直角
- 有4条边，每条边都相等
- 4个角都一样大

## 长方形的特点  
- 有4个角，每个角都是直角
- 有4条边，对边相等
- 长的两条边相等，短的两条边相等

## 区别
- 正方形：4条边都相等
- 长方形：只有对边相等

## 生活中的正方形和长方形
**正方形：**
- 方桌 🟫
- 正方形饼干
- 方格纸上的格子

**长方形：**
- 门 🚪
- 窗户 🪟  
- 书本 📖
- 黑板 ⬛`,
                  order: 2,
                  problems: {
                    create: [
                      {
                        title: '形状区分',
                        content: '正方形有几条边？',
                        type: 'fill_blank',
                        difficulty: 1,
                        points: 5,
                        answer: { correct: '4' },
                        explanation: '正方形有4条边，而且4条边都相等',
                        tags: ['图形性质', '正方形']
                      },
                      {
                        title: '图形识别',
                        content: '书本通常是什么形状？',
                        type: 'multiple_choice',
                        difficulty: 1,
                        points: 5,
                        answer: { correct: 'B', options: ['圆形', '长方形', '三角形', '正方形'] },
                        explanation: '书本是长方形的，有长边和短边',
                        tags: ['图形应用', '长方形']
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

  // 小学二年级数学
  const primaryGrade2 = await prisma.course.create({
    data: {
      title: '小学二年级数学',
      description: '7-8岁儿童的数学进阶课程，包含100以内加减法、认识时间等',
      level: '小学',
      subject: '数学',
      order: 2,
      chapters: {
        create: [
          {
            title: '100以内的加法和减法',
            description: '学习100以内数字的加减运算',
            order: 1,
            lessons: {
              create: [
                {
                  title: '两位数加一位数',
                  content: `# 两位数加一位数

## 学习目标
- 掌握两位数加一位数的计算方法
- 理解进位加法的概念
- 能够正确计算并验证结果

## 不进位加法
当个位相加不满10时，直接相加：
- 23 + 4 = 27
- 45 + 3 = 48
- 61 + 7 = 68

## 进位加法
当个位相加满10时，需要进位：
- 28 + 5 = 33（8+5=13，写3进1）
- 47 + 6 = 53（7+6=13，写3进1）
- 39 + 4 = 43（9+4=13，写3进1）

## 计算步骤
1. 个位对个位相加
2. 如果和大于等于10，向十位进1
3. 十位数加上进位数

## 验算方法
用减法验算：33 - 5 = 28 ✓`,
                  order: 1,
                  problems: {
                    create: [
                      {
                        title: '不进位加法',
                        content: '计算：34 + 5 = ?',
                        type: 'fill_blank',
                        difficulty: 2,
                        points: 10,
                        answer: { correct: '39' },
                        explanation: '4 + 5 = 9，十位不变，所以是39',
                        tags: ['两位数加法', '不进位']
                      },
                      {
                        title: '进位加法',
                        content: '计算：27 + 8 = ?',
                        type: 'fill_blank',
                        difficulty: 2,
                        points: 10,
                        answer: { correct: '35' },
                        explanation: '7 + 8 = 15，写5进1，2 + 1 = 3，所以是35',
                        tags: ['两位数加法', '进位']
                      },
                      {
                        title: '加法应用',
                        content: '小明有36张邮票，又买了7张，现在有多少张？',
                        type: 'fill_blank',
                        difficulty: 2,
                        points: 15,
                        answer: { correct: '43' },
                        explanation: '36 + 7 = 43（张）',
                        tags: ['加法应用', '两位数']
                      }
                    ]
                  }
                },
                {
                  title: '两位数减一位数',
                  content: `# 两位数减一位数

## 学习目标
- 掌握两位数减一位数的计算方法
- 理解退位减法的概念
- 能够正确计算并验证结果

## 不退位减法
当个位够减时，直接相减：
- 47 - 3 = 44
- 89 - 6 = 83
- 75 - 2 = 73

## 退位减法
当个位不够减时，需要退位：
- 32 - 8 = 24（个位2不够减8，从十位退1变成12-8=4）
- 51 - 7 = 44（个位1不够减7，从十位退1变成11-7=4）
- 63 - 9 = 54（个位3不够减9，从十位退1变成13-9=4）

## 计算步骤
1. 看个位够不够减
2. 如果不够减，从十位退1，个位加10
3. 然后进行减法计算

## 验算方法
用加法验算：24 + 8 = 32 ✓`,
                  order: 2,
                  problems: {
                    create: [
                      {
                        title: '不退位减法',
                        content: '计算：58 - 3 = ?',
                        type: 'fill_blank',
                        difficulty: 2,
                        points: 10,
                        answer: { correct: '55' },
                        explanation: '8 - 3 = 5，十位不变，所以是55',
                        tags: ['两位数减法', '不退位']
                      },
                      {
                        title: '退位减法',
                        content: '计算：42 - 7 = ?',
                        type: 'fill_blank',
                        difficulty: 2,
                        points: 10,
                        answer: { correct: '35' },
                        explanation: '个位2不够减7，从十位退1：12-7=5，4-1=3，所以是35',
                        tags: ['两位数减法', '退位']
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            title: '认识时间',
            description: '学习时间的基本概念，认识钟表',
            order: 2,
            lessons: {
              create: [
                {
                  title: '认识钟表',
                  content: `# 认识钟表

## 钟表的组成
钟表有两根针：
- **时针**：短针，指示小时
- **分针**：长针，指示分钟

## 钟面数字
钟面上有12个数字：1、2、3、4、5、6、7、8、9、10、11、12
- 数字12在最上面
- 数字6在最下面
- 数字3在右边
- 数字9在左边

## 整点时间
当分针指向12时，就是整点：
- 时针指向1，分针指向12 → 1点整
- 时针指向2，分针指向12 → 2点整
- 时针指向3，分针指向12 → 3点整

## 时间的表示方法
- 1点整 可以写成 1:00
- 上午8点 可以写成 8:00
- 下午3点 可以写成 3:00`,
                  order: 1,
                  problems: {
                    create: [
                      {
                        title: '认识时针',
                        content: '钟表上的短针叫什么针？',
                        type: 'multiple_choice',
                        difficulty: 1,
                        points: 5,
                        answer: { correct: 'A', options: ['时针', '分针', '秒针', '指针'] },
                        explanation: '短针是时针，用来指示小时',
                        tags: ['钟表认识', '时针']
                      },
                      {
                        title: '整点识别',
                        content: '当时针指向5，分针指向12时，现在是几点？',
                        type: 'fill_blank',
                        difficulty: 1,
                        points: 10,
                        answer: { correct: '5' },
                        explanation: '分针指向12表示整点，时针指向5，所以是5点整',
                        tags: ['时间认识', '整点']
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

  // 小学三年级数学
  const primaryGrade3 = await prisma.course.create({
    data: {
      title: '小学三年级数学',
      description: '8-9岁儿童的数学课程，包含乘法表、除法、分数初步认识等',
      level: '小学',
      subject: '数学',
      order: 3,
      chapters: {
        create: [
          {
            title: '乘法的认识',
            description: '学习乘法的概念和乘法口诀',
            order: 1,
            lessons: {
              create: [
                {
                  title: '乘法的意义',
                  content: `# 乘法的意义

## 什么是乘法？
乘法是求几个相同数连加的简便方法。

## 从连加到乘法
- 3 + 3 + 3 + 3 = 12（4个3相加）
- 可以写成：3 × 4 = 12 或 4 × 3 = 12

## 乘法的符号
- **×** 乘号，表示乘法
- **=** 等号，表示结果

## 乘法的读法
- 3 × 4 读作：3乘以4，或3乘4
- 4 × 3 读作：4乘以3，或4乘3

## 乘法的意义
3 × 4 = 12
- 3是乘数
- 4是乘数  
- 12是积

表示4个3相加，或3个4相加

## 生活中的乘法
- 每排有5个苹果，有3排，一共有多少个苹果？
- 5 × 3 = 15（个）`,
                  order: 1,
                  problems: {
                    create: [
                      {
                        title: '乘法意义',
                        content: '2 + 2 + 2 + 2 + 2 可以写成什么乘法算式？',
                        type: 'multiple_choice',
                        difficulty: 2,
                        points: 10,
                        answer: { correct: 'A', options: ['2 × 5', '2 × 4', '5 × 3', '3 × 2'] },
                        explanation: '5个2相加，可以写成2 × 5',
                        tags: ['乘法概念', '连加']
                      },
                      {
                        title: '乘法计算',
                        content: '计算：6 × 3 = ?',
                        type: 'fill_blank',
                        difficulty: 2,
                        points: 10,
                        answer: { correct: '18' },
                        explanation: '6 × 3 = 18，表示3个6相加或6个3相加',
                        tags: ['乘法计算', '基础']
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

  // 初中七年级数学（代数部分）
  const middleGrade7Algebra = await prisma.course.create({
    data: {
      title: '初中七年级代数',
      description: '初中代数入门课程，包含有理数、整式、一元一次方程等内容',
      level: '初中',
      subject: '代数',
      order: 1,
      chapters: {
        create: [
          {
            title: '有理数',
            description: '学习正数、负数、有理数的概念和运算',
            order: 1,
            lessons: {
              create: [
                {
                  title: '正数和负数',
                  content: `# 正数和负数

## 正数和负数的概念
在实际生活中，我们经常遇到具有相反意义的量：
- 收入和支出
- 上升和下降  
- 前进和后退
- 盈利和亏损

## 正数
大于0的数叫做正数。
- 例如：+3, +5.2, +1/2（通常省略"+"号，写作3, 5.2, 1/2）

## 负数  
小于0的数叫做负数。
- 例如：-3, -5.2, -1/2
- 负数前面必须有"-"号

## 0的特殊性
0既不是正数，也不是负数。
0是正数和负数的分界点。

## 实际应用
- 温度：零上5℃记作+5℃，零下3℃记作-3℃
- 海拔：海平面以上100米记作+100米，海平面以下50米记作-50米
- 盈亏：盈利200元记作+200元，亏损150元记作-150元`,
                  order: 1,
                  problems: {
                    create: [
                      {
                        title: '正数负数判断',
                        content: '下列数中，哪个是负数？',
                        type: 'multiple_choice',
                        difficulty: 2,
                        points: 10,
                        answer: { correct: 'B', options: ['+5', '-3', '0', '2.5'] },
                        explanation: '-3是负数，前面有负号',
                        tags: ['有理数', '正负数']
                      },
                      {
                        title: '实际应用',
                        content: '如果向东走3米记作+3米，那么向西走5米应记作多少？',
                        type: 'fill_blank',
                        difficulty: 2,
                        points: 10,
                        answer: { correct: '-5' },
                        explanation: '向西是向东的相反方向，所以记作-5米',
                        tags: ['有理数', '实际应用']
                      }
                    ]
                  }
                },
                {
                  title: '有理数的加法',
                  content: `# 有理数的加法

## 有理数加法法则
1. **同号两数相加**：取相同的符号，并把绝对值相加
2. **异号两数相加**：取绝对值较大的数的符号，并用较大的绝对值减去较小的绝对值
3. **一个数同0相加**：仍得这个数

## 同号两数相加
- (+3) + (+5) = +(3+5) = +8
- (-3) + (-5) = -(3+5) = -8

## 异号两数相加  
- (+7) + (-3) = +(7-3) = +4
- (-7) + (+3) = -(7-3) = -4
- (+5) + (-5) = 0

## 与0相加
- (+3) + 0 = +3
- (-3) + 0 = -3

## 加法交换律
a + b = b + a

## 加法结合律
(a + b) + c = a + (b + c)`,
                  order: 2,
                  problems: {
                    create: [
                      {
                        title: '同号相加',
                        content: '计算：(-5) + (-3) = ?',
                        type: 'fill_blank',
                        difficulty: 2,
                        points: 10,
                        answer: { correct: '-8' },
                        explanation: '同号两数相加，取相同符号，|-5| + |-3| = 5 + 3 = 8，所以结果是-8',
                        tags: ['有理数加法', '同号']
                      },
                      {
                        title: '异号相加',
                        content: '计算：(+8) + (-3) = ?',
                        type: 'fill_blank',
                        difficulty: 2,
                        points: 10,
                        answer: { correct: '5' },
                        explanation: '异号两数相加，|+8| > |-3|，取正号，8 - 3 = 5',
                        tags: ['有理数加法', '异号']
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            title: '一元一次方程',
            description: '学习一元一次方程的概念、解法和应用',
            order: 2,
            lessons: {
              create: [
                {
                  title: '方程的概念',
                  content: `# 方程的概念

## 什么是方程？
含有未知数的等式叫做方程。

## 方程的特征
1. 必须是等式（有等号）
2. 必须含有未知数

## 方程的实例
- x + 3 = 7 ✓（是方程）
- 2y - 1 = 5 ✓（是方程）  
- 3 + 4 = 7 ✗（不含未知数，不是方程）
- x + 2 ✗（不是等式，不是方程）

## 一元一次方程
只含有一个未知数，并且未知数的最高次数是1的方程，叫做一元一次方程。

- "一元"：只有一个未知数
- "一次"：未知数的最高次数是1

## 一元一次方程的标准形式
ax + b = 0（其中a≠0）

## 实例分析
- 2x + 1 = 7 ✓（一元一次方程）
- x² + 1 = 0 ✗（未知数的次数是2，不是一次）
- 2x + y = 3 ✗（有两个未知数，不是一元）`,
                  order: 1,
                  problems: {
                    create: [
                      {
                        title: '方程识别',
                        content: '下列式子中，哪个是方程？',
                        type: 'multiple_choice',
                        difficulty: 2,
                        points: 10,
                        answer: { correct: 'A', options: ['x + 2 = 5', '3 + 4', 'x + 2', '3 = 3'] },
                        explanation: 'x + 2 = 5含有未知数且是等式，所以是方程',
                        tags: ['方程概念', '识别']
                      },
                      {
                        title: '一元一次方程判断',
                        content: '2x + 3 = 7是几元几次方程？',
                        type: 'fill_blank',
                        difficulty: 2,
                        points: 10,
                        answer: { correct: '一元一次' },
                        explanation: '只有一个未知数x，且x的次数是1，所以是一元一次方程',
                        tags: ['一元一次方程', '判断']
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

  // 高中函数与导数
  const highSchoolFunctions = await prisma.course.create({
    data: {
      title: '高中函数与导数',
      description: '高中数学核心内容，包含函数概念、性质、导数及其应用',
      level: '高中',
      subject: '函数',
      order: 1,
      chapters: {
        create: [
          {
            title: '函数的概念与性质',
            description: '理解函数的定义、表示方法和基本性质',
            order: 1,
            lessons: {
              create: [
                {
                  title: '函数的定义',
                  content: `# 函数的定义

## 函数的概念
设A、B是非空的实数集，如果按照某个确定的对应关系f，使对于集合A中的任意一个数x，在集合B中都有唯一确定的数f(x)和它对应，那么就称f：A→B为从集合A到集合B的一个函数。

## 函数的记号
通常记作：y = f(x)，x ∈ A

其中：
- x叫做自变量
- y叫做因变量  
- f(x)叫做函数值
- x的取值范围A叫做函数的定义域
- 函数值的集合{f(x) | x ∈ A}叫做函数的值域

## 函数的三要素
1. **定义域**：自变量x的取值范围
2. **对应关系**：从x到y的对应法则f
3. **值域**：因变量y的取值范围

只有当两个函数的定义域和对应关系都相同时，这两个函数才是同一个函数。

## 函数的表示方法
1. **解析法**：用数学表达式表示，如y = 2x + 1
2. **图象法**：用坐标平面上的图形表示  
3. **列表法**：用表格形式表示对应关系

## 实例
f(x) = x² + 1，x ∈ R
- 定义域：R（所有实数）
- 对应关系：每个x对应x² + 1
- 当x = 2时，f(2) = 2² + 1 = 5`,
                  order: 1,
                  problems: {
                    create: [
                      {
                        title: '函数概念',
                        content: '对于函数f(x) = 2x + 3，当x = 1时，f(1) = ?',
                        type: 'fill_blank',
                        difficulty: 3,
                        points: 15,
                        answer: { correct: '5' },
                        explanation: 'f(1) = 2×1 + 3 = 2 + 3 = 5',
                        tags: ['函数', '函数值']
                      },
                      {
                        title: '函数要素',
                        content: '确定一个函数需要哪些要素？',
                        type: 'multiple_choice',
                        difficulty: 3,
                        points: 15,
                        answer: { correct: 'A', options: ['定义域和对应关系', '值域和对应关系', '定义域和值域', '自变量和因变量'] },
                        explanation: '函数由定义域和对应关系唯一确定',
                        tags: ['函数', '概念理解']
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
      title: '高等数学（微积分）',
      description: '大学数学基础课程，包含极限、导数、积分等核心内容',
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
                  content: `# 数列极限

## 数列极限的定义
设{aₙ}为一数列，如果存在常数a，对于任意给定的正数ε（无论它多么小），总存在正整数N，使得当n > N时，恒有|aₙ - a| < ε，那么就称常数a是数列{aₙ}的极限。

## 记号
lim(n→∞) aₙ = a 或 aₙ → a (n → ∞)

## 几何意义
当n充分大时，数列的项aₙ可以任意接近于a。

## 常见数列极限
1. lim(n→∞) 1/n = 0
2. lim(n→∞) 1/n² = 0  
3. lim(n→∞) (2n+1)/(3n-1) = 2/3
4. 如果|q| < 1，则 lim(n→∞) qⁿ = 0

## 极限的性质
1. **唯一性**：如果数列收敛，则极限唯一
2. **有界性**：收敛数列必定有界
3. **保号性**：如果lim aₙ = a > 0，则存在N，当n > N时，aₙ > 0

## 极限的运算法则
设lim aₙ = A，lim bₙ = B，则：
- lim(aₙ ± bₙ) = A ± B
- lim(aₙ · bₙ) = A · B  
- lim(aₙ / bₙ) = A / B（B ≠ 0）`,
                  order: 1,
                  problems: {
                    create: [
                      {
                        title: '数列极限计算',
                        content: '计算：lim(n→∞) (3n+2)/(2n+1)',
                        type: 'fill_blank',
                        difficulty: 4,
                        points: 20,
                        answer: { correct: '3/2' },
                        explanation: '分子分母同除以n：lim(n→∞) (3+2/n)/(2+1/n) = 3/2',
                        tags: ['极限', '数列', '计算']
                      },
                      {
                        title: '极限性质',
                        content: '如果数列{aₙ}收敛，那么它一定具有什么性质？',
                        type: 'multiple_choice',
                        difficulty: 4,
                        points: 20,
                        answer: { correct: 'A', options: ['有界性', '单调性', '周期性', '奇偶性'] },
                        explanation: '收敛数列必定有界，这是极限的基本性质',
                        tags: ['极限', '性质']
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

  console.log('完整课程数据创建完成！')
  console.log(`创建了以下课程：`)
  console.log(`小学课程：`)
  console.log(`- ${primaryGrade1.title}`)
  console.log(`- ${primaryGrade2.title}`)  
  console.log(`- ${primaryGrade3.title}`)
  console.log(`初中课程：`)
  console.log(`- ${middleGrade7Algebra.title}`)
  console.log(`高中课程：`)
  console.log(`- ${highSchoolFunctions.title}`)
  console.log(`大学课程：`)
  console.log(`- ${collegeMath.title}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })