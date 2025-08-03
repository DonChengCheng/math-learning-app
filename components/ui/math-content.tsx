'use client'

import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import remarkGfm from 'remark-gfm'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'
import { useMemo } from 'react'

interface MathContentProps {
  content: string
  className?: string
}

export function MathContent({ content, className = '' }: MathContentProps) {
  const processedContent = useMemo(() => {
    if (!content) return ''
    
    // Process the content to handle special tags and convert to standard format
    let processed = content
    
    // Remove trailing plus signs from database output if present
    processed = processed.replace(/\s*\+\s*$/gm, '')
    
    // Convert <BLOCK_MATH> tags to $$ notation
    processed = processed.replace(/<BLOCK_MATH>(.*?)<\/BLOCK_MATH>/g, (match, math) => {
      return `$$${math.trim()}$$`
    })
    
    // Convert <INLINE_MATH> tags to $ notation
    processed = processed.replace(/<INLINE_MATH>(.*?)<\/INLINE_MATH>/g, (match, math) => {
      return `$${math.trim()}$`
    })
    
    // Fix double backslashes in LaTeX that might be escaped
    processed = processed.replace(/\\\\\\\\/g, '\\\\')
    
    return processed
  }, [content])

  return (
    <div className={`prose prose-gray max-w-none prose-headings:font-bold prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-h4:text-base prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900 ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={[rehypeKatex]}
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
}