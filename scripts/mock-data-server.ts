/**
 * 模拟数据服务器 - 用于测试网络数据获取
 * 运行: npx tsx scripts/mock-data-server.ts
 */

import { createServer } from 'http'

const mockLinearAlgebraData = {
  course: {
    title: '线性代数（测试数据）',
    description: '这是从模拟服务器获取的线性代数课程',
    level: '大学',
    subject: '线性代数',
    order: 1,
    chapters: [
      {
        title: '向量空间',
        description: '向量空间的基本概念',
        order: 1,
        lessons: [
          {
            title: '向量的定义',
            content: `# 向量的定义

向量是具有大小和方向的量。在数学中，我们通常用以下方式表示向量：

$$\\vec{v} = \\begin{bmatrix} v_1 \\\\ v_2 \\\\ \\vdots \\\\ v_n \\end{bmatrix}$$

## 向量的基本性质

1. **向量加法**: $\\vec{u} + \\vec{v} = \\begin{bmatrix} u_1 + v_1 \\\\ u_2 + v_2 \\\\ \\vdots \\\\ u_n + v_n \\end{bmatrix}$

2. **标量乘法**: $k\\vec{v} = \\begin{bmatrix} kv_1 \\\\ kv_2 \\\\ \\vdots \\\\ kv_n \\end{bmatrix}$`,
            order: 1,
            problems: [
              {
                title: '向量加法计算',
                content: '计算向量 $\\vec{u} = \\begin{bmatrix} 1 \\\\ 2 \\\\ 3 \\end{bmatrix}$ 和 $\\vec{v} = \\begin{bmatrix} 4 \\\\ 5 \\\\ 6 \\end{bmatrix}$ 的和。',
                type: 'solution',
                difficulty: 2,
                points: 10,
                answer: {
                  steps: [
                    '根据向量加法规则，对应分量相加',
                    '$\\vec{u} + \\vec{v} = \\begin{bmatrix} 1+4 \\\\ 2+5 \\\\ 3+6 \\end{bmatrix}$',
                    '$\\vec{u} + \\vec{v} = \\begin{bmatrix} 5 \\\\ 7 \\\\ 9 \\end{bmatrix}$'
                  ],
                  finalAnswer: '$\\begin{bmatrix} 5 \\\\ 7 \\\\ 9 \\end{bmatrix}$'
                },
                explanation: '向量加法是将对应分量相加得到新向量。',
                tags: ['向量', '加法']
              }
            ]
          },
          {
            title: '向量空间的定义',
            content: `# 向量空间

向量空间是满足以下公理的集合 $V$：

## 加法公理
- **封闭性**: 对于 $\\vec{u}, \\vec{v} \\in V$，有 $\\vec{u} + \\vec{v} \\in V$
- **交换律**: $\\vec{u} + \\vec{v} = \\vec{v} + \\vec{u}$
- **结合律**: $(\\vec{u} + \\vec{v}) + \\vec{w} = \\vec{u} + (\\vec{v} + \\vec{w})$
- **零元素**: 存在 $\\vec{0} \\in V$ 使得 $\\vec{v} + \\vec{0} = \\vec{v}$
- **逆元素**: 对于每个 $\\vec{v} \\in V$，存在 $-\\vec{v} \\in V$ 使得 $\\vec{v} + (-\\vec{v}) = \\vec{0}$`,
            order: 2,
            problems: [
              {
                title: '验证向量空间',
                content: '判断实数集 $\\mathbb{R}^2$ 是否构成向量空间。',
                type: 'multiple_choice',
                difficulty: 3,
                points: 15,
                answer: {
                  correct: ['A'],
                  options: [
                    '是，$\\mathbb{R}^2$ 满足所有向量空间公理',
                    '否，$\\mathbb{R}^2$ 不满足封闭性',
                    '否，$\\mathbb{R}^2$ 没有零元素',
                    '无法判断'
                  ]
                },
                explanation: '$\\mathbb{R}^2$ 满足所有向量空间的公理，是一个标准的向量空间。',
                tags: ['向量空间', '公理']
              }
            ]
          }
        ]
      },
      {
        title: '矩阵理论',
        description: '矩阵的基本运算和性质',
        order: 2,
        lessons: [
          {
            title: '矩阵乘法',
            content: `# 矩阵乘法

矩阵乘法是线性代数中的基本运算。

## 定义
设 $A$ 是 $m \\times n$ 矩阵，$B$ 是 $n \\times p$ 矩阵，则乘积 $AB$ 是 $m \\times p$ 矩阵。

## 计算规则
$$(AB)_{ij} = \\sum_{k=1}^{n} a_{ik}b_{kj}$$

## 示例
$$\\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix} \\begin{bmatrix} 5 & 6 \\\\ 7 & 8 \\end{bmatrix} = \\begin{bmatrix} 19 & 22 \\\\ 43 & 50 \\end{bmatrix}$$`,
            order: 1,
            problems: [
              {
                title: '矩阵乘法计算',
                content: '计算矩阵乘积 $\\begin{bmatrix} 2 & 1 \\\\ 0 & 3 \\end{bmatrix} \\begin{bmatrix} 1 & 0 \\\\ 2 & 1 \\end{bmatrix}$',
                type: 'fill_blank',
                difficulty: 2,
                points: 10,
                answer: {
                  blanks: [
                    { answer: '4', tolerance: 0 },
                    { answer: '1', tolerance: 0 },
                    { answer: '6', tolerance: 0 },
                    { answer: '3', tolerance: 0 }
                  ]
                },
                explanation: '使用矩阵乘法规则，逐个计算结果矩阵的每个元素。',
                tags: ['矩阵', '乘法']
              }
            ]
          }
        ]
      }
    ]
  }
}

const server = createServer((req, res) => {
  // 设置 CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200)
    res.end()
    return
  }
  
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
  
  if (req.url === '/api/mock-courses' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(mockLinearAlgebraData))
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('Not Found')
  }
})

const PORT = process.env.MOCK_SERVER_PORT ? parseInt(process.env.MOCK_SERVER_PORT) : 3002
server.listen(PORT, () => {
  console.log(`🚀 模拟数据服务器运行在 http://localhost:${PORT}`)
  console.log(`   测试端点: http://localhost:${PORT}/api/mock-courses`)
  console.log(`   按 Ctrl+C 停止服务器`)
})