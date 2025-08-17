'use client'

import { useState } from 'react'
import { MathContent } from '@/components/ui/math-content'

export default function DebugLatexPage() {
  const [content, setContent] = useState(`由4个数$a_{11}, a_{12}, a_{21}, a_{22}$排成的二行二列的数表
$$\\begin{vmatrix}
a_{11} & a_{12} \\\\
a_{21} & a_{22}
\\end{vmatrix}$$`)

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">LaTeX 调试页面</h1>
      
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-4">输入内容</h2>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-64 p-4 border rounded font-mono text-sm"
          />
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <h3 className="font-bold mb-2">原始内容（调试）</h3>
            <pre className="text-xs overflow-x-auto">{JSON.stringify(content, null, 2)}</pre>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-bold mb-4">渲染结果</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <MathContent content={content} />
          </div>
        </div>
      </div>
    </div>
  )
}