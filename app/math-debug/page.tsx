'use client'

import { useState } from 'react'
import { MathContent } from '@/components/ui/math-content'

export default function MathDebugPage() {
  const [selectedTest, setSelectedTest] = useState(0)
  const [showDebug, setShowDebug] = useState(false)
  
  const testCases = [
    {
      title: '实际数据库内容测试',
      content: `# 1.1 二阶与三阶行列式

## 学习目标
- 掌握二阶行列式的定义和计算方法
- 掌握三阶行列式的定义和计算方法
- 理解行列式的几何意义

## 1.1.1 二阶行列式

### 定义
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

### 记忆方法
- **主对角线**：从左上到右下的对角线，元素为$a_{11}, a_{22}$
- **副对角线**：从右上到左下的对角线，元素为$a_{12}, a_{21}$
- 二阶行列式的值 = 主对角线元素之积 - 副对角线元素之积

### 例题1
计算行列式$\\begin{vmatrix} 3 & 5 \\\\ 2 & 4 \\end{vmatrix}$

**解：**
$$\\begin{vmatrix} 3 & 5 \\\\ 2 & 4 \\end{vmatrix} = 3 \\times 4 - 5 \\times 2 = 12 - 10 = 2$$`
    },
    {
      title: '二阶行列式测试',
      content: `# 二阶行列式

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

### 例题
计算行列式$\\begin{vmatrix} 3 & 5 \\\\ 2 & 4 \\end{vmatrix}$

**解：**
$$\\begin{vmatrix} 3 & 5 \\\\ 2 & 4 \\end{vmatrix} = 3 \\times 4 - 5 \\times 2 = 12 - 10 = 2$$`
    },
    {
      title: '三阶行列式测试',
      content: `# 三阶行列式

定义：由9个数排成的三行三列的数表
$$\\begin{vmatrix}
a_{11} & a_{12} & a_{13} \\\\
a_{21} & a_{22} & a_{23} \\\\
a_{31} & a_{32} & a_{33}
\\end{vmatrix}$$

称为**三阶行列式**。

## 计算方法

### 方法一：代数余子式展开法
$$\\begin{vmatrix}
a_{11} & a_{12} & a_{13} \\\\
a_{21} & a_{22} & a_{23} \\\\
a_{31} & a_{32} & a_{33}
\\end{vmatrix} = a_{11}\\begin{vmatrix}
a_{22} & a_{23} \\\\
a_{32} & a_{33}
\\end{vmatrix} - a_{12}\\begin{vmatrix}
a_{21} & a_{23} \\\\
a_{31} & a_{33}
\\end{vmatrix} + a_{13}\\begin{vmatrix}
a_{21} & a_{22} \\\\
a_{31} & a_{32}
\\end{vmatrix}$$

### 方法二：沙吕斯公式（对角线法则）
$$\\begin{align}
&= a_{11}a_{22}a_{33} + a_{12}a_{23}a_{31} + a_{13}a_{21}a_{32} \\\\
&\\quad - a_{13}a_{22}a_{31} - a_{11}a_{23}a_{32} - a_{12}a_{21}a_{33}
\\end{align}$$`
    },
    {
      title: '矩阵运算测试',
      content: `# 矩阵运算

## 矩阵加法
设$A = \\begin{bmatrix} a_{11} & a_{12} \\\\ a_{21} & a_{22} \\end{bmatrix}$，$B = \\begin{bmatrix} b_{11} & b_{12} \\\\ b_{21} & b_{22} \\end{bmatrix}$

则：$A + B = \\begin{bmatrix} a_{11}+b_{11} & a_{12}+b_{12} \\\\ a_{21}+b_{21} & a_{22}+b_{22} \\end{bmatrix}$

## 矩阵乘法
$$AB = \\begin{bmatrix}
a_{11}b_{11}+a_{12}b_{21} & a_{11}b_{12}+a_{12}b_{22} \\\\
a_{21}b_{11}+a_{22}b_{21} & a_{21}b_{12}+a_{22}b_{22}
\\end{bmatrix}$$

## 特殊矩阵

### 单位矩阵
$$I = \\begin{bmatrix}
1 & 0 & 0 \\\\
0 & 1 & 0 \\\\
0 & 0 & 1
\\end{bmatrix}$$

### 零矩阵
$$O = \\begin{bmatrix}
0 & 0 \\\\
0 & 0
\\end{bmatrix}$$`
    },
    {
      title: '内联公式测试',
      content: `# 内联公式测试

这是一个内联公式的例子：$x^2 + y^2 = z^2$，这是勾股定理。

另一个例子：对于二次方程$ax^2 + bx + c = 0$，其解为$x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$。

更复杂的内联公式：$\\lim_{n \\to \\infty} \\sum_{i=1}^{n} \\frac{1}{n^2} = \\frac{\\pi^2}{6}$。

混合内联和显示公式：

设$f(x) = x^2$，则其导数为：
$$f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h} = \\lim_{h \\to 0} \\frac{(x+h)^2 - x^2}{h} = 2x$$

因此，$\\frac{d}{dx}x^2 = 2x$。`
    },
    {
      title: '复杂公式测试',
      content: `# 复杂数学公式测试

## 积分公式
$$\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}$$

## 级数展开
$$e^x = \\sum_{n=0}^{\\infty} \\frac{x^n}{n!} = 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\cdots$$

## 傅里叶变换
$$\\hat{f}(\\xi) = \\int_{-\\infty}^{\\infty} f(x) e^{-2\\pi i x \\xi} dx$$

## 矩阵特征值
对于矩阵$A$，特征方程为：
$$\\det(A - \\lambda I) = 0$$

## 多重积分
$$\\iiint_V f(x,y,z) \\, dx \\, dy \\, dz$$

## 向量运算
$$\\vec{a} \\times \\vec{b} = \\begin{vmatrix}
\\vec{i} & \\vec{j} & \\vec{k} \\\\
a_1 & a_2 & a_3 \\\\
b_1 & b_2 & b_3
\\end{vmatrix}$$`
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">数学公式渲染调试工具</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* 测试用例选择器 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold mb-4">测试用例</h2>
              <div className="space-y-2">
                {testCases.map((testCase, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedTest(index)}
                    className={`w-full text-left p-3 rounded-md transition-colors ${
                      selectedTest === index
                        ? 'bg-blue-100 border-blue-500 border-2'
                        : 'bg-gray-100 hover:bg-gray-200 border-2 border-transparent'
                    }`}
                  >
                    <div className="font-medium text-sm">{testCase.title}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 渲染结果 */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">{testCases[selectedTest].title}</h2>
                <div className="text-sm text-gray-500">
                  渲染结果
                </div>
              </div>
              
              <div className="border-2 border-gray-200 rounded-lg p-6 bg-white">
                <div className="mb-4">
                  <label className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      checked={showDebug}
                      onChange={(e) => setShowDebug(e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm font-medium">启用调试模式</span>
                  </label>
                </div>
                <MathContent content={testCases[selectedTest].content} debug={showDebug} />
              </div>
              
              {/* 原始内容显示 */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">原始内容</h3>
                <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-auto border">
                  <code>{testCases[selectedTest].content}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
        
        {/* 使用说明 */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">使用说明</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h3 className="font-semibold mb-2">支持的LaTeX语法</h3>
              <ul className="space-y-1 text-gray-600">
                <li>• 内联公式：<code>$formula$</code></li>
                <li>• 显示公式：<code>$$formula$$</code></li>
                <li>• 矩阵：<code>{'\\begin{matrix}...\\end{matrix}'}</code></li>
                <li>• 行列式：<code>{'\\begin{vmatrix}...\\end{vmatrix}'}</code></li>
                <li>• 分数：<code>{'\\frac{a}{b}'}</code></li>
                <li>• 求和：<code>{'\\sum_{i=1}^{n}'}</code></li>
                <li>• 积分：<code>{'\\int_{a}^{b}'}</code></li>
                <li>• 极限：<code>{'\\lim_{x \\to a}'}</code></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">常用数学符号</h3>
              <ul className="space-y-1 text-gray-600">
                <li>• 希腊字母：<code>{'\\alpha, \\beta, \\gamma'}</code></li>
                <li>• 运算符：<code>{'\\times, \\div, \\pm, \\mp'}</code></li>
                <li>• 关系符：<code>{'\\leq, \\geq, \\neq, \\approx'}</code></li>
                <li>• 集合符：<code>{'\\in, \\subset, \\cup, \\cap'}</code></li>
                <li>• 箭头：<code>{'\\to, \\rightarrow, \\Rightarrow'}</code></li>
                <li>• 特殊字体：<code>{'\\mathbb{R}，\\mathcal{L}'}</code></li>
                <li>• 上下标：<code>{'x^2, x_i, x_i^2'}</code></li>
                <li>• 根号：<code>{'\\sqrt{x}，\\sqrt[n]{x}'}</code></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}