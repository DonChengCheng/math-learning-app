# 线性代数内容扩展指南

## 📚 如何扩展课程内容

### 1. 文件结构理解

`data/linear-algebra-content.ts` 文件的基本结构：

```typescript
export const linearAlgebraContent: LinearAlgebraContent = {
  course: {
    title: '线性代数',
    description: '...',
    level: '大学',
    subject: '线性代数',
    order: 1,
    chapters: [
      // 章节列表
      {
        title: '第1章 行列式',
        description: '...',
        order: 1,
        lessons: [
          // 课时列表
          {
            title: '1.1 二阶与三阶行列式',
            content: `...`, // Markdown内容
            order: 1,
            problems: [
              // 练习题列表
              {
                title: '题目标题',
                content: '题目内容',
                type: 'multiple_choice', // 题目类型
                difficulty: 1, // 难度等级
                points: 10, // 分值
                answer: { /* 答案对象 */ },
                explanation: '解析',
                tags: ['标签1', '标签2']
              }
            ]
          }
        ]
      }
    ]
  }
}
```

### 2. 添加新章节

在现有的 `chapters` 数组末尾添加新章节：

```typescript
// 在第2章后面添加第3章
{
  title: '第3章 向量组与线性方程组',
  description: '介绍向量组的线性相关性、线性方程组的解法和解的结构。',
  order: 3,
  lessons: [
    {
      title: '3.1 向量组的线性组合',
      content: `
# 3.1 向量组的线性组合

## 学习目标
- 掌握向量线性组合的概念
- 理解向量组线性相关和线性无关的定义
- 会判断向量组的线性相关性

## 3.1.1 向量的线性组合

### 定义
设有向量组 $\\alpha_1, \\alpha_2, \\ldots, \\alpha_s$，如果存在数 $k_1, k_2, \\ldots, k_s$，使得
$$\\beta = k_1\\alpha_1 + k_2\\alpha_2 + \\cdots + k_s\\alpha_s$$

则称向量 $\\beta$ 是向量组 $\\alpha_1, \\alpha_2, \\ldots, \\alpha_s$ 的一个**线性组合**。

### 例题1
设 $\\alpha_1 = \\begin{pmatrix} 1 \\\\ 2 \\\\ 3 \\end{pmatrix}$，$\\alpha_2 = \\begin{pmatrix} 2 \\\\ 1 \\\\ 0 \\end{pmatrix}$，
求 $2\\alpha_1 - 3\\alpha_2$。

**解：**
$$2\\alpha_1 - 3\\alpha_2 = 2\\begin{pmatrix} 1 \\\\ 2 \\\\ 3 \\end{pmatrix} - 3\\begin{pmatrix} 2 \\\\ 1 \\\\ 0 \\end{pmatrix} = \\begin{pmatrix} 2-6 \\\\ 4-3 \\\\ 6-0 \\end{pmatrix} = \\begin{pmatrix} -4 \\\\ 1 \\\\ 6 \\end{pmatrix}$$

## 小结
1. 线性组合是向量空间理论的基础
2. 任何向量都可以表示为基向量的线性组合
      `,
      order: 1,
      problems: [
        {
          title: '向量线性组合计算',
          content: '设 $\\vec{a} = (1, 2, -1)$，$\\vec{b} = (2, -1, 3)$，计算 $3\\vec{a} - 2\\vec{b}$。',
          type: 'fill_blank',
          difficulty: 1,
          points: 10,
          answer: {
            type: 'fill_blank',
            blanks: ['(-1, 8, -9)']
          },
          explanation: '$3\\vec{a} - 2\\vec{b} = 3(1, 2, -1) - 2(2, -1, 3) = (3, 6, -3) - (4, -2, 6) = (-1, 8, -9)$',
          tags: ['vector', 'calculation', 'linear_combination']
        },
        {
          title: '线性组合概念理解',
          content: '下列关于向量线性组合的说法中，正确的是：',
          type: 'multiple_choice',
          difficulty: 2,
          points: 15,
          answer: {
            type: 'multiple_choice',
            options: [
              'A. 任何向量都可以表示为单位向量的线性组合',
              'B. 零向量不能表示为非零向量的线性组合',
              'C. n维向量至多可以表示为n个线性无关向量的线性组合',
              'D. 线性组合的系数必须为正数'
            ],
            correct: [0]
          },
          explanation: '任何n维向量都可以表示为n个线性无关向量（如标准基向量）的线性组合。',
          tags: ['vector', 'linear_combination', 'theory']
        }
      ]
    }
  ]
}
```

### 3. 添加新课时

在现有章节的 `lessons` 数组中添加新课时：

```typescript
// 在现有课时后面添加
{
  title: '3.2 向量组的线性相关性',
  content: `
# 3.2 向量组的线性相关性

## 学习目标
- 掌握向量组线性相关和线性无关的定义
- 学会判断向量组的线性相关性
- 理解线性相关性的几何意义

## 3.2.1 线性相关和线性无关

### 定义
设有向量组 $\\alpha_1, \\alpha_2, \\ldots, \\alpha_s$：

- 如果存在不全为零的数 $k_1, k_2, \\ldots, k_s$，使得
  $$k_1\\alpha_1 + k_2\\alpha_2 + \\cdots + k_s\\alpha_s = \\mathbf{0}$$
  则称向量组**线性相关**。

- 如果只有当 $k_1 = k_2 = \\cdots = k_s = 0$ 时，才有
  $$k_1\\alpha_1 + k_2\\alpha_2 + \\cdots + k_s\\alpha_s = \\mathbf{0}$$
  则称向量组**线性无关**。

### 判断方法
1. **齐次线性方程组法**：构造齐次方程组，看是否有非零解
2. **行列式法**：对于方阵，计算行列式是否为零
3. **矩阵的秩**：比较系数矩阵的秩与向量个数

## 小结
线性相关性是向量空间理论的核心概念之一。
  `,
  order: 2,
  problems: [
    // 添加相应的练习题...
  ]
}
```

### 4. 题目类型详解

#### 4.1 选择题 (multiple_choice)
```typescript
{
  title: '题目标题',
  content: '题目内容',
  type: 'multiple_choice',
  difficulty: 2,
  points: 15,
  answer: {
    type: 'multiple_choice',
    options: [
      'A. 选项1',
      'B. 选项2', 
      'C. 选项3',
      'D. 选项4'
    ],
    correct: [1] // 正确答案的索引（从0开始），支持多选
  },
  explanation: '解析内容',
  tags: ['标签1', '标签2']
}
```

#### 4.2 填空题 (fill_blank)
```typescript
{
  title: '题目标题',
  content: '题目内容，空白处用___表示',
  type: 'fill_blank',
  difficulty: 1,
  points: 10,
  answer: {
    type: 'fill_blank',
    blanks: ['答案1', '答案2'] // 按顺序填入空白处
  },
  explanation: '解析内容',
  tags: ['标签1', '标签2']
}
```

#### 4.3 解答题 (solution)
```typescript
{
  title: '题目标题',
  content: '题目内容',
  type: 'solution',
  difficulty: 3,
  points: 20,
  answer: {
    type: 'solution',
    steps: [
      '解题步骤1',
      '解题步骤2',
      '解题步骤3'
    ],
    finalAnswer: '最终答案'
  },
  explanation: '解析内容',
  tags: ['标签1', '标签2']
}
```

### 5. LaTeX 数学公式

在内容中使用 LaTeX 公式：

```markdown
# 行内公式
这是行内公式：$x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$

# 独立公式
$$\\begin{vmatrix}
a & b \\\\
c & d
\\end{vmatrix} = ad - bc$$

# 矩阵
$$\\begin{pmatrix}
1 & 2 & 3 \\\\
4 & 5 & 6 \\\\
7 & 8 & 9
\\end{pmatrix}$$

# 方程组
$$\\begin{cases}
x + y = 3 \\\\
2x - y = 1
\\end{cases}$$
```

### 6. 标签系统

使用预定义的标签来分类题目：

```typescript
// 可用标签（在 types/linear-algebra.ts 中定义）
export const LINEAR_ALGEBRA_TAGS = [
  'determinant',          // 行列式
  'matrix',              // 矩阵
  'vector',              // 向量
  'linear_system',       // 线性方程组
  'vector_space',        // 向量空间
  'linear_transformation', // 线性变换
  'eigenvalue',          // 特征值
  'eigenvector',         // 特征向量
  'quadratic_form',      // 二次型
  'inner_product',       // 内积
  'orthogonal',          // 正交
  'calculation',         // 计算
  'proof',              // 证明
  'application'         // 应用
] as const
```

### 7. 完整示例

以下是添加第3章完整内容的示例：

```typescript
// 在 chapters 数组末尾添加
{
  title: '第3章 向量组与线性方程组',
  description: '介绍向量组的线性相关性、线性方程组的解法和解的结构。',
  order: 3,
  lessons: [
    {
      title: '3.1 向量组的线性组合',
      content: `
# 3.1 向量组的线性组合
// ... 完整的课时内容
      `,
      order: 1,
      problems: [
        {
          title: '向量线性组合计算',
          content: '设 $\\vec{a} = (1, 2, -1)$，$\\vec{b} = (2, -1, 3)$，计算 $3\\vec{a} - 2\\vec{b}$。',
          type: 'fill_blank',
          difficulty: 1,
          points: 10,
          answer: {
            type: 'fill_blank',
            blanks: ['(-1, 8, -9)']
          },
          explanation: '$3\\vec{a} - 2\\vec{b} = 3(1, 2, -1) - 2(2, -1, 3) = (3, 6, -3) - (4, -2, 6) = (-1, 8, -9)$',
          tags: ['vector', 'calculation', 'linear_combination']
        }
      ]
    }
  ]
}
```

### 8. 扩展后的导入

添加内容后，运行以下命令重新导入：

```bash
# 重新导入数据（会检查重复）
npm run seed-linear-algebra

# 验证新内容
npx tsx scripts/verify-linear-algebra.ts

# 测试API功能
npx tsx scripts/test-api.ts
```

### 9. 注意事项

1. **顺序编号**：确保 `order` 字段按顺序递增
2. **LaTeX转义**：在字符串中使用双反斜杠 `\\\\`
3. **题目ID**：系统会自动生成，无需手动指定
4. **数据验证**：添加内容后会自动验证格式
5. **重复导入**：系统会检查是否已存在相同课程

这样你就可以轻松扩展线性代数课程的内容了！