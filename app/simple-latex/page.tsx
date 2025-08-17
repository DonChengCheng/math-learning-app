import { MathContent } from '@/components/ui/math-content'

export default function SimpleLatexPage() {
  // 直接使用数据库中的内容格式
  const content1 = String.raw`由4个数$a_{11}, a_{12}, a_{21}, a_{22}$排成的二行二列的数表
$$\begin{vmatrix}
a_{11} & a_{12} \\
a_{21} & a_{22}
\end{vmatrix}$$`

  // 测试不同的格式
  const content2 = `由4个数$a_{11}, a_{12}, a_{21}, a_{22}$排成的二行二列的数表

$$\\begin{vmatrix}
a_{11} & a_{12} \\\\
a_{21} & a_{22}
\\end{vmatrix}$$`

  const content3 = '$$\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix}$$'

  return (
    <div className="container mx-auto py-8 space-y-8">
      <h1 className="text-3xl font-bold">简单LaTeX测试</h1>
      
      <div className="space-y-6">
        <div className="border p-4 rounded">
          <h2 className="text-xl font-bold mb-2">测试1: String.raw（单反斜杠）</h2>
          <div className="bg-gray-100 p-2 mb-4 font-mono text-xs">
            <pre>{content1}</pre>
          </div>
          <MathContent content={content1} />
        </div>

        <div className="border p-4 rounded">
          <h2 className="text-xl font-bold mb-2">测试2: 普通字符串（双反斜杠）</h2>
          <div className="bg-gray-100 p-2 mb-4 font-mono text-xs">
            <pre>{content2}</pre>
          </div>
          <MathContent content={content2} />
        </div>

        <div className="border p-4 rounded">
          <h2 className="text-xl font-bold mb-2">测试3: 简单矩阵</h2>
          <div className="bg-gray-100 p-2 mb-4 font-mono text-xs">
            <pre>{content3}</pre>
          </div>
          <MathContent content={content3} />
        </div>
      </div>
    </div>
  )
}