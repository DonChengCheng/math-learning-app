'use client'

import { InlineMath, BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import { useMemo } from 'react'
import { ReactElement } from 'react'

interface MathContentProps {
  content: string
  className?: string
}

export function MathContent({ content, className = '' }: MathContentProps) {
  const processedContent = useMemo(() => {
    if (!content) return ''
    
    // Process the content to handle LaTeX math expressions
    let processed = content
    
    // Handle block math expressions ($$...$$)
    processed = processed.replace(/\$\$([^$]+)\$\$/g, (match, math) => {
      return `<BLOCK_MATH>${math.trim()}</BLOCK_MATH>`
    })
    
    // Handle inline math expressions ($...$)
    processed = processed.replace(/\$([^$]+)\$/g, (match, math) => {
      return `<INLINE_MATH>${math.trim()}</INLINE_MATH>`
    })
    
    return processed
  }, [content])

  const renderContent = (text: string) => {
    const parts: (string | ReactElement)[] = []
    let lastIndex = 0
    
    // Find and replace block math
    const blockMathRegex = /<BLOCK_MATH>(.*?)<\/BLOCK_MATH>/g
    let match
    
    while ((match = blockMathRegex.exec(text)) !== null) {
      // Add text before math
      if (match.index > lastIndex) {
        const beforeText = text.slice(lastIndex, match.index)
        parts.push(...renderInlineMath(beforeText))
      }
      
      // Add block math
      parts.push(
        <div key={`block-${match.index}`} className="my-4">
          <BlockMath math={match[1]} />
        </div>
      )
      
      lastIndex = match.index + match[0].length
    }
    
    // Add remaining text
    if (lastIndex < text.length) {
      const remainingText = text.slice(lastIndex)
      parts.push(...renderInlineMath(remainingText))
    }
    
    return parts
  }
  
  const renderInlineMath = (text: string): (string | ReactElement)[] => {
    const parts: (string | ReactElement)[] = []
    const inlineMathRegex = /<INLINE_MATH>(.*?)<\/INLINE_MATH>/g
    let lastIndex = 0
    let match
    
    while ((match = inlineMathRegex.exec(text)) !== null) {
      // Add text before math
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index))
      }
      
      // Add inline math
      parts.push(
        <InlineMath key={`inline-${match.index}`} math={match[1]} />
      )
      
      lastIndex = match.index + match[0].length
    }
    
    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex))
    }
    
    return parts
  }

  const content_parts = renderContent(processedContent)

  return (
    <div className={`prose max-w-none ${className}`}>
      <div className="whitespace-pre-wrap leading-relaxed">
        {content_parts.map((part, index) => {
          if (typeof part === 'string') {
            return <span key={index}>{part}</span>
          }
          return part
        })}
      </div>
    </div>
  )
}