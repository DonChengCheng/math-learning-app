'use client'

import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import remarkGfm from 'remark-gfm'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'
import { useMemo, useState, useEffect } from 'react'

interface MathContentProps {
  content: string
  className?: string
}

export function MathContent({ content, className = '' }: MathContentProps) {
  const [renderError, setRenderError] = useState<string | null>(null)
  const processedContent = useMemo(() => {
    if (!content) return ''
    
    // Process the content to handle special tags and convert to standard format
    let processed = content
    
    // Remove trailing plus signs from database output if present
    processed = processed.replace(/\s*\+\s*$/gm, '')
    
    // Fix double backslash escaping issue from JavaScript string templates
    // In template literals, \\\\ becomes \\, but KaTeX needs \\ for line breaks
    processed = processed.replace(/\\\\\\\\/g, '\\\\')
    
    // Convert <BLOCK_MATH> tags to $$ notation
    processed = processed.replace(/<BLOCK_MATH>(.*?)<\/BLOCK_MATH>/g, (_, math) => {
      return `$$${math.trim()}$$`
    })
    
    // Convert <INLINE_MATH> tags to $ notation
    processed = processed.replace(/<INLINE_MATH>(.*?)<\/INLINE_MATH>/g, (_, math) => {
      return `$${math.trim()}$`
    })
    
    // Fix matrix environment issues
    processed = fixMatrixEnvironments(processed)
    
    return processed
  }, [content])

  // Function to detect and fix matrix environment issues
  function fixMatrixEnvironments(content: string): string {
    let fixed = content
    
    // First, detect and fix the most common issue: standalone matrix content without proper environment
    // Look for $$ blocks that contain & and \\ but no matrix environment
    const standaloneMatrixPattern = /\$\$([^$]+?)\$\$/g
    fixed = fixed.replace(standaloneMatrixPattern, (match, mathContent) => {
      // Check if this looks like matrix content without environment
      if (mathContent.includes('&') && mathContent.includes('\\\\') && 
          !mathContent.includes('\\begin{') && !mathContent.includes('\\end{') &&
          mathContent.match(/[a-zA-Z_]\{[^}]*\}/)) {
        console.warn('Detected standalone matrix content, wrapping with vmatrix environment')
        return `$$\\begin{vmatrix}\n${mathContent.trim()}\n\\end{vmatrix}$$`
      }
      return match
    })
    
    // Fix missing \begin{vmatrix} - look for content that has \end{vmatrix} but no \begin
    const missingBeginPattern = /\$\$([^$]*?[a-zA-Z_]\{[^}]*\}\s*&[^$]*?)\\end\{vmatrix\}/g
    fixed = fixed.replace(missingBeginPattern, (match, matrixContent) => {
      if (!matrixContent.includes('\\begin{vmatrix}')) {
        console.warn('Fixed missing \\begin{vmatrix}')
        return `$$\\begin{vmatrix}\n${matrixContent}\\end{vmatrix}`
      }
      return match
    })
    
    // Fix missing \end{vmatrix} - look for \begin{vmatrix} without corresponding \end
    const missingEndPattern = /\$\$(\\begin\{vmatrix\}[^$]*?)(?!\$\$[^$]*\\end\{vmatrix\})\$\$/g
    fixed = fixed.replace(missingEndPattern, (match, matrixContent) => {
      if (matrixContent.includes('&') && !matrixContent.includes('\\end{vmatrix}')) {
        console.warn('Fixed missing \\end{vmatrix}')
        return `$$${matrixContent}\n\\end{vmatrix}$$`
      }
      return match
    })
    
    return fixed
  }

  // Reset error when content changes
  useEffect(() => {
    setRenderError(null)
  }, [content])

  if (renderError) {
    return (
      <div className={`prose prose-gray max-w-none ${className}`}>
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">数学内容渲染错误</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>数学公式解析失败，请检查公式语法。</p>
                <details className="mt-2">
                  <summary className="cursor-pointer text-gray-600">查看详情</summary>
                  <pre className="mt-1 text-xs bg-red-100 p-2 rounded overflow-x-auto">{renderError}</pre>
                </details>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 text-gray-600">
          <h4 className="font-medium">原始内容：</h4>
          <pre className="mt-2 bg-gray-100 p-3 rounded text-sm overflow-x-auto">{content}</pre>
        </div>
      </div>
    )
  }

  try {
    return (
      <div className={`prose prose-gray max-w-none prose-headings:font-bold prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-h4:text-base prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900 ${className}`}>
        <ReactMarkdown
          remarkPlugins={[remarkMath, remarkGfm]}
          rehypePlugins={[
            [rehypeKatex, {
              strict: false,
              trust: true,
              throwOnError: false,
              displayMode: false,
              errorColor: '#cc0000',
              output: 'html',
              macros: {
                // Add common matrix macros if needed
                '\\RR': '\\mathbb{R}',
                '\\NN': '\\mathbb{N}',
                '\\ZZ': '\\mathbb{Z}',
                '\\QQ': '\\mathbb{Q}',
                '\\CC': '\\mathbb{C}',
                "\\R": "\\mathbb{R}",
                "\\N": "\\mathbb{N}",
                "\\Z": "\\mathbb{Z}",
                "\\Q": "\\mathbb{Q}",
                "\\C": "\\mathbb{C}",
                "\\det": "\\operatorname{det}",
                "\\rank": "\\operatorname{rank}",
                "\\trace": "\\operatorname{trace}",
                "\\dim": "\\operatorname{dim}",
              },
              // Custom error handler for better debugging
              errorCallback: (msg: string, error: any) => {
                console.error('KaTeX error details:', { msg, error, processedContent })
                // Check if it's a matrix-related error
                if (msg.includes('&') || msg.includes('vmatrix') || msg.includes('bmatrix')) {
                  console.error('Matrix parsing error detected. Content may have incomplete matrix environments.')
                }
                setRenderError(`KaTeX Error: ${msg}`)
                return false // Don't throw, handle gracefully
              }
            }]
          ]}
          components={{
            // Custom rendering for specific elements if needed
            h1: ({ children }) => <h1 className="text-2xl font-bold mt-6 mb-4">{children}</h1>,
            h2: ({ children }) => <h2 className="text-xl font-bold mt-5 mb-3">{children}</h2>,
            h3: ({ children }) => <h3 className="text-lg font-bold mt-4 mb-2">{children}</h3>,
            h4: ({ children }) => <h4 className="text-base font-bold mt-3 mb-2">{children}</h4>,
            p: ({ children }) => <p className="my-3 leading-relaxed">{children}</p>,
            ul: ({ children }) => <ul className="list-disc list-inside my-3 space-y-1">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal list-inside my-3 space-y-1">{children}</ol>,
            li: ({ children }) => <li className="ml-4">{children}</li>,
            // Enhanced math element handling
            span: ({ className, children, ...props }) => {
              // KaTeX renders math as spans with specific classes
              if (className?.includes('katex')) {
                return <span className={`${className} select-text`} {...props}>{children}</span>
              }
              return <span className={className} {...props}>{children}</span>
            },
            div: ({ className, children, ...props }) => {
              // Handle KaTeX display math divs
              if (className?.includes('katex-display')) {
                return <div className={`${className} my-6 text-center overflow-x-auto max-w-full`} {...props}>{children}</div>
              }
              return <div className={className} {...props}>{children}</div>
            },
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
          }}
        >
          {processedContent}
        </ReactMarkdown>
      </div>
    )
  } catch (error) {
    console.error('MathContent render error:', error)
    setRenderError(error instanceof Error ? error.message : String(error))
    return null
  }
}