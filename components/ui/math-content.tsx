'use client'

import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import remarkGfm from 'remark-gfm'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'
import { processLaTeX, processLaTeXWithDebug } from '@/lib/latex-processor'
import { useState, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

interface MathContentProps {
  content: string
  className?: string
  debug?: boolean
}

interface ProcessingResult {
  processed: string
  hasError: boolean
  errorMessage?: string
}

interface ErrorFallbackProps {
  error: Error
  resetErrorBoundary: () => void
  originalContent: string
}

function MathErrorFallback({ error, resetErrorBoundary, originalContent }: ErrorFallbackProps) {
  return (
    <div className="border border-red-300 bg-red-50 p-4 rounded-lg">
      <div className="text-red-800 font-semibold mb-2">Math Rendering Error</div>
      <div className="text-red-600 text-sm mb-3">
        {error.message.includes('KaTeX') ? 
          'KaTeX encountered an issue parsing the mathematical content. This often occurs with matrix formatting.' :
          error.message
        }
      </div>
      <details className="text-sm">
        <summary className="text-gray-600 cursor-pointer hover:text-gray-800 mb-2">
          Show original content
        </summary>
        <pre className="bg-white p-2 rounded text-xs overflow-x-auto border">
          {originalContent}
        </pre>
      </details>
      <button 
        onClick={resetErrorBoundary}
        className="text-blue-600 hover:text-blue-800 text-sm underline mt-2"
      >
        Try again
      </button>
    </div>
  )
}

export function MathContent({ content, className = '', debug = false }: MathContentProps) {
  const [processingResult, setProcessingResult] = useState<ProcessingResult>({ 
    processed: '', 
    hasError: false 
  })

  useEffect(() => {
    if (!content) {
      setProcessingResult({ processed: '', hasError: false })
      return
    }

    try {
      // 使用专用的 LaTeX 处理器
      const processedContent = debug 
        ? processLaTeXWithDebug(content).processed
        : processLaTeX(content, { preserveSpacing: true })
      
      setProcessingResult({
        processed: processedContent,
        hasError: false
      })
    } catch (error) {
      console.error('LaTeX processing error:', error)
      setProcessingResult({
        processed: content, // 回退到原始内容
        hasError: true,
        errorMessage: error instanceof Error ? error.message : 'Unknown processing error'
      })
    }
  }, [content, debug])

  // 开发环境下显示调试信息
  useEffect(() => {
    if (debug && process.env.NODE_ENV === 'development' && content) {
      const debugInfo = processLaTeXWithDebug(content)
      console.group('MathContent Debug Info')
      console.log('原始内容:', content.substring(0, 200) + (content.length > 200 ? '...' : ''))
      console.log('处理后内容:', debugInfo.processed.substring(0, 200) + (debugInfo.processed.length > 200 ? '...' : ''))
      console.log('数学元素:', debugInfo.mathElements)
      console.log('处理日志:', debugInfo.debugLog)
      console.log('处理结果:', processingResult)
      console.groupEnd()
    }
  }, [content, debug, processingResult])

  if (!content) return null

  if (processingResult.hasError && debug) {
    return (
      <div className={`border border-red-300 bg-red-50 p-4 rounded-lg ${className}`}>
        <div className="text-red-800 font-semibold mb-2">LaTeX Processing Error</div>
        <div className="text-red-600 text-sm mb-3">{processingResult.errorMessage}</div>
        <div className="text-gray-700 text-sm">
          <strong>Original content:</strong>
          <pre className="bg-white p-2 mt-1 rounded text-xs overflow-x-auto">
            {content}
          </pre>
        </div>
      </div>
    )
  }

  return (
    <ErrorBoundary
      FallbackComponent={(props) => <MathErrorFallback {...props} originalContent={content} />}
      onReset={() => setProcessingResult({ processed: content, hasError: false })}
    >
      <div className={`prose prose-gray max-w-none prose-headings:font-bold prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-h4:text-base prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900 ${className}`}>
        <ReactMarkdown
        remarkPlugins={[
          [remarkMath, { 
            singleDollarTextMath: true, // 允许单个$作为内联数学
            inlineMathDouble: false // 禁用双美元符号作为内联数学
          }],
          remarkGfm
        ]}
        rehypePlugins={[
          [rehypeKatex, {
            strict: false, // 不严格模式，允许更多的LaTeX命令
            trust: (context: { command?: string; environment?: string }) => {
              // 信任矩阵环境和基本数学命令
              const trustedCommands = ['\\begin', '\\end', '\\times', '\\frac', '\\sum', '\\int', '\\lim']
              const trustedEnvironments = ['matrix', 'pmatrix', 'bmatrix', 'vmatrix', 'Vmatrix', 'Bmatrix', 'smallmatrix', 'align', 'aligned', 'split', 'gather', 'multline', 'eqnarray']
              return trustedCommands.some(cmd => context.command === cmd) || 
                     trustedEnvironments.some(env => context.environment === env)
            },
            throwOnError: false, // 遇到错误时不抛出异常，而是显示错误
            errorColor: '#dc2626', // 更明显的错误颜色
            output: 'html', // 仅输出HTML，避免MathML兼容性问题
            displayMode: false, // 默认不是显示模式
            fleqn: false, // 不强制左对齐
            // 移除可能冲突的宏定义，让KaTeX使用默认行为
            macros: {
              // 仅保留最基本的数学符号宏
              "\\RR": "\\mathbb{R}",
              "\\NN": "\\mathbb{N}",
              "\\ZZ": "\\mathbb{Z}",
              "\\QQ": "\\mathbb{Q}",
              "\\CC": "\\mathbb{C}"
            }
          }]
        ]}
        components={{
          h1: ({ children }) => <h1 className="text-2xl font-bold mt-6 mb-4">{children}</h1>,
          h2: ({ children }) => <h2 className="text-xl font-bold mt-5 mb-3">{children}</h2>,
          h3: ({ children }) => <h3 className="text-lg font-bold mt-4 mb-2">{children}</h3>,
          h4: ({ children }) => <h4 className="text-base font-bold mt-3 mb-2">{children}</h4>,
          p: ({ children }) => <p className="my-3 leading-relaxed">{children}</p>,
          ul: ({ children }) => <ul className="list-disc list-inside my-3 space-y-1">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal list-inside my-3 space-y-1">{children}</ol>,
          li: ({ children }) => <li className="ml-4">{children}</li>,
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '')
            return match ? (
              <pre className="bg-gray-100 rounded-md p-4 overflow-x-auto my-3">
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            ) : (
              <code className="bg-gray-100 rounded px-1 py-0.5 text-sm" {...props}>
                {children}
              </code>
            )
          },
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-gray-300 pl-4 my-3 italic">
              {children}
            </blockquote>
          ),
          // 增强数学渲染的显示效果
          span: ({ className, children, ...props }) => {
            if (className?.includes('katex')) {
              return <span className={`${className} select-text`} {...props}>{children}</span>
            }
            return <span className={className} {...props}>{children}</span>
          },
          div: ({ className, children, ...props }) => {
            if (className?.includes('katex-display')) {
              return <div className={`${className} my-6 text-center overflow-x-auto max-w-full`} {...props}>{children}</div>
            }
            return <div className={className} {...props}>{children}</div>
          },
        }}
      >
        {processingResult.processed}
      </ReactMarkdown>
      </div>
    </ErrorBoundary>
  )
}