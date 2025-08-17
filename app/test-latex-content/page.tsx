'use client'

import { useState } from 'react'
import { linearAlgebraContent } from '@/data/linear-algebra-content'
import { MathContent } from '@/components/ui/math-content'

export default function TestLatexContent() {
  const [selectedLesson, setSelectedLesson] = useState(0)
  
  // 获取第一章的第一课内容
  const firstChapter = linearAlgebraContent.course.chapters[0]
  const lessons = firstChapter.lessons
  const currentLesson = lessons[selectedLesson]
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">LaTeX内容测试页面</h1>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">选择课程：</label>
        <select 
          value={selectedLesson} 
          onChange={(e) => setSelectedLesson(Number(e.target.value))}
          className="w-full p-2 border rounded"
        >
          {lessons.map((lesson, index) => (
            <option key={index} value={index}>
              {lesson.title}
            </option>
          ))}
        </select>
      </div>
      
      <div className="border rounded-lg p-6 bg-white">
        <h2 className="text-xl font-semibold mb-4">{currentLesson.title}</h2>
        
        <div className="prose prose-lg max-w-none">
          <MathContent content={currentLesson.content} />
        </div>
        
        {currentLesson.problems && currentLesson.problems.length > 0 && (
          <div className="mt-8 pt-6 border-t">
            <h3 className="text-lg font-semibold mb-4">练习题</h3>
            {currentLesson.problems.map((problem, index) => (
              <div key={index} className="mb-6 p-4 bg-gray-50 rounded">
                <div className="mb-2">
                  <strong>题目 {index + 1}:</strong>
                </div>
                <MathContent content={problem.content} />
                {problem.explanation && (
                  <div className="mt-4 p-3 bg-blue-50 rounded">
                    <strong>解释：</strong>
                    <MathContent content={problem.explanation} />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="mt-6 p-4 bg-yellow-50 rounded">
        <h3 className="font-semibold mb-2">调试信息</h3>
        <p className="text-sm text-gray-600">
          当前课程内容长度：{currentLesson.content.length} 字符
        </p>
        <details className="mt-2">
          <summary className="cursor-pointer text-sm text-blue-600">查看原始内容（前500字符）</summary>
          <pre className="mt-2 p-2 bg-white rounded text-xs overflow-x-auto">
            {currentLesson.content.substring(0, 500)}
          </pre>
        </details>
      </div>
    </div>
  )
}