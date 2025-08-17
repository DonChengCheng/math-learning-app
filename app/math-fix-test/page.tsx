'use client'

import { useState } from 'react'
import { MathContent } from '@/components/ui/math-content'
import { processLaTeXWithDebug } from '@/lib/latex-processor'

export default function MathFixTestPage() {
  const [testContent] = useState(`# 1.1 二阶与三阶行列式

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
$$\\begin{vmatrix} 3 & 5 \\\\ 2 & 4 \\end{vmatrix} = 3 \\times 4 - 5 \\times 2 = 12 - 10 = 2$$

## 1.1.2 三阶行列式

### 定义
由9个数排成的三行三列的数表
$$\\begin{vmatrix}
a_{11} & a_{12} & a_{13} \\\\
a_{21} & a_{22} & a_{23} \\\\
a_{31} & a_{32} & a_{33}
\\end{vmatrix}$$

称为**三阶行列式**。

### 计算方法

#### 方法一：代数余子式展开法
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

#### 方法二：沙吕斯公式（对角线法则）
$$\\begin{align}
&= a_{11}a_{22}a_{33} + a_{12}a_{23}a_{31} + a_{13}a_{21}a_{32} \\\\
&\\quad - a_{13}a_{22}a_{31} - a_{11}a_{23}a_{32} - a_{12}a_{21}a_{33}
\\end{align}$$

### 例题2  
计算行列式$\\begin{vmatrix} 1 & 2 & 3 \\\\ 4 & 5 & 6 \\\\ 7 & 8 & 9 \\end{vmatrix}$

**解：**（用沙吕斯公式）
$$\\begin{align}
&= 1 \\times 5 \\times 9 + 2 \\times 6 \\times 7 + 3 \\times 4 \\times 8 \\\\
&\\quad - 3 \\times 5 \\times 7 - 1 \\times 6 \\times 8 - 2 \\times 4 \\times 9 \\\\
&= 45 + 84 + 96 - 105 - 48 - 72 \\\\
&= 225 - 225 = 0
\\end{align}$$`)

  const debugInfo = processLaTeXWithDebug(testContent)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">数学公式修复效果测试</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* 修复后的渲染 */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 text-green-600">✅ 修复后的渲染</h2>
            <div className="border rounded-lg p-4 bg-gray-50">
              <MathContent content={testContent} />
            </div>
          </div>

          {/* 调试信息 */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 text-blue-600">🔍 调试信息</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-sm mb-2">检测到的数学元素:</h3>
                <div className="bg-gray-100 p-3 rounded text-xs">
                  {debugInfo.mathElements.length > 0 ? (
                    <ul className="space-y-1">
                      {debugInfo.mathElements.map((math, index) => (
                        <li key={index}>
                          <span className={`inline-block px-2 py-1 rounded text-xs ${
                            math.type === 'display' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {math.type}
                          </span>
                          : {math.content.substring(0, 30)}...
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-gray-500">没有检测到数学元素</span>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-sm mb-2">处理日志:</h3>
                <div className="bg-gray-100 p-3 rounded text-xs max-h-40 overflow-y-auto">
                  {debugInfo.debugLog.length > 0 ? (
                    debugInfo.debugLog.map((log, index) => (
                      <div key={index} className="mb-1">{log}</div>
                    ))
                  ) : (
                    <span className="text-gray-500">没有处理日志</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 内容对比 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">内容处理对比</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-gray-600">原始内容 (前500字符)</h3>
              <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto h-64 border">
                {testContent.substring(0, 500)}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold mb-2 text-green-600">处理后内容 (前500字符)</h3>
              <pre className="bg-green-50 p-4 rounded text-xs overflow-auto h-64 border border-green-200">
                {debugInfo.processed.substring(0, 500)}
              </pre>
            </div>
          </div>
        </div>

        {/* 关键测试点 */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">关键测试点检查</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-sm mb-2">二阶行列式</h3>
              <div className="text-xs space-y-1">
                <div className={`flex items-center ${debugInfo.processed.includes('\\begin{vmatrix}') ? 'text-green-600' : 'text-red-600'}`}>
                  <span className="mr-2">{debugInfo.processed.includes('\\begin{vmatrix}') ? '✅' : '❌'}</span>
                  vmatrix 环境
                </div>
                <div className={`flex items-center ${debugInfo.mathElements.some(m => m.content.includes('vmatrix')) ? 'text-green-600' : 'text-red-600'}`}>
                  <span className="mr-2">{debugInfo.mathElements.some(m => m.content.includes('vmatrix')) ? '✅' : '❌'}</span>
                  数学环境检测
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-sm mb-2">内联公式</h3>
              <div className="text-xs space-y-1">
                <div className={`flex items-center ${debugInfo.mathElements.filter(m => m.type === 'inline').length > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  <span className="mr-2">{debugInfo.mathElements.filter(m => m.type === 'inline').length > 0 ? '✅' : '❌'}</span>
                  内联公式数量: {debugInfo.mathElements.filter(m => m.type === 'inline').length}
                </div>
                <div className={`flex items-center ${debugInfo.mathElements.some(m => m.content.includes('a_{')) ? 'text-green-600' : 'text-red-600'}`}>
                  <span className="mr-2">{debugInfo.mathElements.some(m => m.content.includes('a_{')) ? '✅' : '❌'}</span>
                  下标格式
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-sm mb-2">显示公式</h3>
              <div className="text-xs space-y-1">
                <div className={`flex items-center ${debugInfo.mathElements.filter(m => m.type === 'display').length > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  <span className="mr-2">{debugInfo.mathElements.filter(m => m.type === 'display').length > 0 ? '✅' : '❌'}</span>
                  显示公式数量: {debugInfo.mathElements.filter(m => m.type === 'display').length}
                </div>
                <div className={`flex items-center ${debugInfo.mathElements.some(m => m.content.includes('\\\\')) ? 'text-green-600' : 'text-red-600'}`}>
                  <span className="mr-2">{debugInfo.mathElements.some(m => m.content.includes('\\\\')) ? '✅' : '❌'}</span>
                  矩阵换行符
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}