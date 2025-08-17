/**
 * LaTeX 内容处理器
 * 专门用于处理数学公式的转义、格式化和预处理
 */

export interface LaTeXProcessorOptions {
  debug?: boolean
  preserveSpacing?: boolean
  autoDetectMath?: boolean
}

export class LaTeXProcessor {
  private options: LaTeXProcessorOptions
  private debugLog: string[] = []

  constructor(options: LaTeXProcessorOptions = {}) {
    this.options = {
      debug: false,
      preserveSpacing: true,
      autoDetectMath: true,
      ...options
    }
  }

  /**
   * 处理 LaTeX 内容的主入口
   */
  process(content: string): string {
    if (!content) return content

    this.debugLog = []
    this.log('开始处理 LaTeX 内容', content.substring(0, 100) + '...')

    let processed = content

    // 1. 规范化换行符
    processed = this.normalizeLineBreaks(processed)

    // 2. 处理内联数学公式
    processed = this.processInlineMath(processed)

    // 3. 处理显示数学公式
    processed = this.processDisplayMath(processed)

    // 4. 清理多余空格和换行
    processed = this.cleanWhitespace(processed)

    this.log('处理完成', processed.substring(0, 100) + '...')
    
    if (this.options.debug) {
      console.log('LaTeX 处理日志:', this.debugLog)
    }

    return processed
  }

  /**
   * 规范化换行符
   */
  private normalizeLineBreaks(content: string): string {
    // 统一换行符为 \n
    return content.replace(/\r\n/g, '\n').replace(/\r/g, '\n')
  }

  /**
   * 处理内联数学公式 $...$
   */
  private processInlineMath(content: string): string {
    this.log('处理内联数学公式')
    
    // 匹配内联数学公式，避免匹配显示公式的 $$
    const inlineMathRegex = /(?<!\$)\$(?!\$)([^$\n]+?)(?<!\$)\$(?!\$)/g
    
    return content.replace(inlineMathRegex, (match, formula) => {
      this.log('找到内联公式', match)
      
      // 确保公式前后有空格分隔
      const cleanFormula = formula.trim()
      return ` $${cleanFormula}$ `
    })
  }

  /**
   * 处理显示数学公式 $$...$$
   */
  private processDisplayMath(content: string): string {
    this.log('处理显示数学公式')
    
    // 匹配显示数学公式，包括多行的情况
    const displayMathRegex = /\$\$([\s\S]*?)\$\$/g
    
    return content.replace(displayMathRegex, (match, formula) => {
      this.log('找到显示公式', match.substring(0, 50) + '...')
      
      // 处理数学环境内容
      const processedFormula = this.processMathEnvironment(formula)
      
      // 确保显示公式前后有换行
      return `\n$$${processedFormula}$$\n`
    })
  }

  /**
   * 处理数学环境内容（矩阵、行列式等）
   */
  private processMathEnvironment(formula: string): string {
    let processed = formula.trim()

    // 保护矩阵环境内容
    processed = this.protectMatrixEnvironments(processed)
    
    // 确保数学环境命令格式正确
    processed = this.fixMathCommands(processed)

    // 恢复矩阵环境内容
    processed = this.restoreMatrixEnvironments(processed)

    return processed
  }

  /**
   * 保护矩阵环境内容，防止被其他处理破坏
   */
  private matrixPlaceholders: Map<string, string> = new Map()
  
  private protectMatrixEnvironments(content: string): string {
    this.matrixPlaceholders.clear()
    
    // 匹配所有矩阵环境
    const matrixPattern = /\\begin\{((?:v|b|p|B|V|matrix|smallmatrix|pmatrix|bmatrix|vmatrix|Vmatrix|Bmatrix)(?:matrix)?)\}([\s\S]*?)\\end\{\1\}/g
    
    let placeholderIndex = 0
    return content.replace(matrixPattern, (match, envName, matrixContent) => {
      const placeholder = `__MATRIX_PLACEHOLDER_${placeholderIndex++}__`
      
      // 确保矩阵内容格式正确
      const cleanMatrixContent = this.cleanMatrixContent(matrixContent)
      const cleanedMatch = `\\begin{${envName}}${cleanMatrixContent}\\end{${envName}}`
      
      this.matrixPlaceholders.set(placeholder, cleanedMatch)
      this.log(`保护矩阵环境: ${envName}`, cleanedMatch.substring(0, 50))
      
      return placeholder
    })
  }
  
  /**
   * 恢复矩阵环境内容
   */
  private restoreMatrixEnvironments(content: string): string {
    let restored = content
    
    this.matrixPlaceholders.forEach((originalContent, placeholder) => {
      restored = restored.replace(placeholder, originalContent)
      this.log('恢复矩阵环境', originalContent.substring(0, 50))
    })
    
    return restored
  }
  
  /**
   * 清理矩阵内容，确保格式正确
   */
  private cleanMatrixContent(matrixContent: string): string {
    return matrixContent
      // 标准化行分隔符 - 确保是双反斜杠
      .replace(/(?<!\\)\\(?!\\)/g, '\\\\')
      // 清理多余的空白
      .replace(/^\s+|\s+$/g, '')
      // 确保行与行之间有适当的空白
      .replace(/\\\\\s*/g, ' \\\\ ')
  }

  /**
   * 修复数学命令格式
   */
  private fixMathCommands(content: string): string {
    let fixed = content

    // 修复可能的转义问题（但要小心不要过度修复）
    const fixes = [
      // 修复 begin/end 环境
      { pattern: /\\\\begin\{/g, replacement: '\\begin{' },
      { pattern: /\\\\end\{/g, replacement: '\\end{' },
      
      // 修复常见的数学符号
      { pattern: /\\\\times/g, replacement: '\\times' },
      { pattern: /\\\\frac/g, replacement: '\\frac' },
      { pattern: /\\\\sum/g, replacement: '\\sum' },
      { pattern: /\\\\int/g, replacement: '\\int' },
      { pattern: /\\\\lim/g, replacement: '\\lim' },
      
      // 修复下标和上标
      { pattern: /\\\\_\{/g, replacement: '_{' },
      { pattern: /\\\\\^\{/g, replacement: '^{' }
    ]

    fixes.forEach(fix => {
      const beforeLength = fixed.length
      fixed = fixed.replace(fix.pattern, fix.replacement)
      if (fixed.length !== beforeLength) {
        this.log(`修复命令: ${fix.pattern} -> ${fix.replacement}`)
      }
    })

    return fixed
  }

  /**
   * 清理多余的空格和换行
   */
  private cleanWhitespace(content: string): string {
    return content
      // 合并多个空格为一个（但保留换行前后的空格）
      .replace(/ +/g, ' ')
      // 移除行尾空格
      .replace(/ +$/gm, '')
      // 移除行首空格（除了缩进）
      .replace(/^ +/gm, '')
      // 合并多个连续换行（最多保留两个）
      .replace(/\n{3,}/g, '\n\n')
      // 移除首尾空白
      .trim()
  }

  /**
   * 调试日志
   */
  private log(message: string, detail?: string): void {
    if (this.options.debug) {
      const logEntry = detail ? `${message}: ${detail}` : message
      this.debugLog.push(logEntry)
    }
  }

  /**
   * 获取调试日志
   */
  getDebugLog(): string[] {
    return [...this.debugLog]
  }

  /**
   * 检测内容是否包含数学公式
   */
  static hasMath(content: string): boolean {
    return /\$.*?\$|\$\$[\s\S]*?\$\$/.test(content)
  }

  /**
   * 提取所有数学公式
   */
  static extractMath(content: string): { type: 'inline' | 'display', content: string, index: number }[] {
    const results: { type: 'inline' | 'display', content: string, index: number }[] = []
    
    // 提取显示公式
    const displayRegex = /\$\$([\s\S]*?)\$\$/g
    let match
    while ((match = displayRegex.exec(content)) !== null) {
      results.push({
        type: 'display',
        content: match[1],
        index: match.index
      })
    }
    
    // 提取内联公式（避免与显示公式重复）
    const inlineRegex = /(?<!\$)\$(?!\$)([^$\n]+?)(?<!\$)\$(?!\$)/g
    while ((match = inlineRegex.exec(content)) !== null) {
      // 检查是否与显示公式重叠
      const isOverlapping = results.some(result => 
        match!.index >= result.index && match!.index < result.index + result.content.length + 4
      )
      
      if (!isOverlapping) {
        results.push({
          type: 'inline',
          content: match[1],
          index: match.index
        })
      }
    }
    
    return results.sort((a, b) => a.index - b.index)
  }
}

/**
 * 便捷的处理函数
 */
export function processLaTeX(content: string, options?: LaTeXProcessorOptions): string {
  const processor = new LaTeXProcessor(options)
  return processor.process(content)
}

/**
 * 带调试信息的处理函数
 */
export function processLaTeXWithDebug(content: string): { 
  processed: string, 
  debugLog: string[],
  mathElements: { type: 'inline' | 'display', content: string, index: number }[]
} {
  const processor = new LaTeXProcessor({ debug: true })
  const processed = processor.process(content)
  const mathElements = LaTeXProcessor.extractMath(processed)
  
  return {
    processed,
    debugLog: processor.getDebugLog(),
    mathElements
  }
}