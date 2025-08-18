'use client'

import { MathContent } from '@/components/ui/math-content'

const testContent = `# 矩阵渲染测试

## 基本矩阵测试

### 测试1：基本行列式
计算行列式$\\begin{vmatrix} 3 & 5 \\\\ 2 & 4 \\end{vmatrix}$

### 测试2：显示模式矩阵
$$\\begin{vmatrix} 
a_{11} & a_{12} \\\\
a_{21} & a_{22}
\\end{vmatrix} = a_{11}a_{22} - a_{12}a_{21}$$

### 测试3：对齐环境
$$\\begin{aligned}
&= 1 \\times 5 \\times 9 + 2 \\times 6 \\times 7 \\\\
&= 45 + 84 \\\\
&= 129
\\end{aligned}$$

### 测试4：混合内容
行列式$\\begin{vmatrix} 1 & 2 \\\\ 3 & 4 \\end{vmatrix} = 1 \\times 4 - 2 \\times 3 = -2$的计算过程。

### 测试5：大矩阵
$$\\begin{vmatrix}
1 & 2 & 3 \\\\
4 & 5 & 6 \\\\
7 & 8 & 9
\\end{vmatrix}$$
`

export default function TestMatrixDebugPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-6">Matrix Rendering Debug Test</h1>
          <MathContent content={testContent} debug={true} />
        </div>
      </div>
    </div>
  )
}