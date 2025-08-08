'use client'

import { MathContent } from '@/components/ui/math-content'

const testContents = [
  {
    title: "Simple Matrix",
    content: `$$\\begin{vmatrix}
a_{11} & a_{12} \\\\
a_{21} & a_{22}
\\end{vmatrix}$$`
  },
  {
    title: "Matrix from Data Source", 
    content: `行列式的某一行（列）的所有元素都乘以同一个数k，等于用数k乘此行列式。

$$\\begin{vmatrix}
a_{11} & a_{12} & a_{13} \\\\
ka_{21} & ka_{22} & ka_{23} \\\\
a_{31} & a_{32} & a_{33}
\\end{vmatrix} = k\\begin{vmatrix}
a_{11} & a_{12} & a_{13} \\\\
a_{21} & a_{22} & a_{23} \\\\
a_{31} & a_{32} & a_{33}
\\end{vmatrix}$$`
  },
  {
    title: "Complex Matrix Expression",
    content: `### 性质4：线性性质
如果行列式的某一行（列）是两组数的和，则行列式等于对应的两个行列式的和。

$$\\begin{vmatrix}
a_{11} & a_{12} & a_{13} \\\\
b_{21}+c_{21} & b_{22}+c_{22} & b_{23}+c_{23} \\\\
a_{31} & a_{32} & a_{33}
\\end{vmatrix} = \\begin{vmatrix}
a_{11} & a_{12} & a_{13} \\\\
b_{21} & b_{22} & b_{23} \\\\
a_{31} & a_{32} & a_{33}
\\end{vmatrix} + \\begin{vmatrix}
a_{11} & a_{12} & a_{13} \\\\
c_{21} & c_{22} & c_{23} \\\\
a_{31} & a_{32} & a_{33}
\\end{vmatrix}$$`
  }
]

export default function TestMathPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Math Rendering Test Page</h1>
      
      {testContents.map((test, index) => (
        <div key={index} className="mb-8 border-b pb-6">
          <h2 className="text-xl font-semibold mb-4">{test.title}</h2>
          <MathContent content={test.content} />
          
          <details className="mt-4">
            <summary className="cursor-pointer text-sm text-gray-600">View Raw Content</summary>
            <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-x-auto">
              {test.content}
            </pre>
          </details>
        </div>
      ))}
    </div>
  )
}