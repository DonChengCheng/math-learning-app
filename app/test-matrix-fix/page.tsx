import { MathContent } from '@/components/ui/math-content'

export default function TestMatrixFixPage() {
  // These are the exact problematic patterns from the error
  const problematicContent1 = `由4个数$a_{11}, a_{12}, a_{21}, a_{22}$排成的二行二列的数表

$$\\begin{vmatrix}
a_{11} & a_{12} \\\\
a_{21} & a_{22}
\\end{vmatrix}$$`

  const problematicContent2 = `$$\\begin{pmatrix}
a_{11} & a_{12} & a_{13} \\\\
a_{21} & a_{22} & a_{23} \\\\
a_{31} & a_{32} & a_{33}
\\end{pmatrix}$$`

  const problematicContent3 = `$$\\begin{bmatrix}
a_{11} & a_{12} \\\\
a_{21} & a_{22}
\\end{bmatrix}$$`

  return (
    <div className="container mx-auto py-8 space-y-8">
      <h1 className="text-3xl font-bold">Matrix Fix Test</h1>
      
      <div className="space-y-6">
        <div className="border p-4 rounded">
          <h2 className="text-xl font-bold mb-2">Test 1: vmatrix (determinant)</h2>
          <div className="bg-gray-100 p-2 mb-4 font-mono text-xs">
            <pre>{problematicContent1}</pre>
          </div>
          <MathContent content={problematicContent1} debug={true} />
        </div>

        <div className="border p-4 rounded">
          <h2 className="text-xl font-bold mb-2">Test 2: pmatrix (parentheses)</h2>
          <div className="bg-gray-100 p-2 mb-4 font-mono text-xs">
            <pre>{problematicContent2}</pre>
          </div>
          <MathContent content={problematicContent2} debug={true} />
        </div>

        <div className="border p-4 rounded">
          <h2 className="text-xl font-bold mb-2">Test 3: bmatrix (brackets)</h2>
          <div className="bg-gray-100 p-2 mb-4 font-mono text-xs">
            <pre>{problematicContent3}</pre>
          </div>
          <MathContent content={problematicContent3} debug={true} />
        </div>
      </div>
    </div>
  )
}