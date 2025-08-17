'use client'

import { MathContent } from '@/components/ui/math-content'

export default function TestLatexPage() {
  const testContent = `
# 测试数学公式渲染

## 测试1：二阶行列式

由4个数$a_{11}, a_{12}, a_{21}, a_{22}$排成的二行二列的数表

$$\\begin{vmatrix}
a_{11} & a_{12} \\\\
a_{21} & a_{22}
\\end{vmatrix}$$

称为**二阶行列式**，其值定义为：

$$\\begin{vmatrix}
a_{11} & a_{12} \\\\
a_{21} & a_{22}
\\end{vmatrix} = a_{11}a_{22} - a_{12}a_{21}$$

## 测试2：三阶行列式

$$\\begin{vmatrix}
a_{11} & a_{12} & a_{13} \\\\
a_{21} & a_{22} & a_{23} \\\\
a_{31} & a_{32} & a_{33}
\\end{vmatrix}$$

## 测试3：内联公式

这是一个内联公式 $x^2 + y^2 = z^2$ 的例子。
`

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">LaTeX 公式渲染测试</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <MathContent content={testContent} />
      </div>
    </div>
  )
}