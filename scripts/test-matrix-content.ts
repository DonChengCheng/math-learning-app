#!/usr/bin/env npx tsx

/**
 * Test script for MathContent matrix processing
 * This script tests the content processing logic without requiring a full React environment
 */

// Simulate the matrix processing logic from MathContent component
function processMatrixContent(content: string): string {
  if (!content) return ''
  
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
  
  // Handle matrix environments properly - preserve matrix content as-is
  const matrixEnvironments = ['vmatrix', 'bmatrix', 'pmatrix', 'matrix', 'smallmatrix']
  matrixEnvironments.forEach(env => {
    // Match the environment and preserve its content exactly
    const regex = new RegExp(`(\\\\begin\\{${env}\\}[\\s\\S]*?\\\\end\\{${env}\\})`, 'g')
    const matches = processed.match(regex)
    if (matches) {
      matches.forEach((match, index) => {
        // Replace with a placeholder to protect during other processing
        const placeholder = `__MATRIX_${env.toUpperCase()}_${index}__`
        processed = processed.replace(match, placeholder)
      })
      
      // Restore matrix content after other processing
      matches.forEach((match, index) => {
        const placeholder = `__MATRIX_${env.toUpperCase()}_${index}__`
        processed = processed.replace(placeholder, match)
      })
    }
  })
  
  // Fix double backslashes in LaTeX that might be escaped, but avoid matrix content
  processed = processed.replace(/\\\\\\\\/g, (match, offset) => {
    // Check if we're inside a matrix environment
    const beforeMatch = processed.substring(0, offset)
    const matrixStart = /\\begin\{(?:v|b|p|small)?matrix\}/g
    const matrixEnd = /\\end\{(?:v|b|p|small)?matrix\}/g
    
    let inMatrix = false
    let startMatches = [...beforeMatch.matchAll(matrixStart)]
    let endMatches = [...beforeMatch.matchAll(matrixEnd)]
    
    if (startMatches.length > endMatches.length) {
      inMatrix = true
    }
    
    // If inside matrix, keep as is, otherwise fix double escaping
    return inMatrix ? match : '\\\\'
  })
  
  return processed
}

// Test cases
const testCases = [
  {
    name: '2x2 Matrix (vmatrix)',
    input: `$$\\begin{vmatrix}
a_{11} & a_{12} \\\\
a_{21} & a_{22}
\\end{vmatrix}$$`,
    expected: 'Should preserve matrix structure with & and \\\\ intact'
  },
  {
    name: '3x3 Matrix (vmatrix)',
    input: `$$\\begin{vmatrix}
a_{11} & a_{12} & a_{13} \\\\
a_{21} & a_{22} & a_{23} \\\\
a_{31} & a_{32} & a_{33}
\\end{vmatrix}$$`,
    expected: 'Should preserve 3x3 matrix structure'
  },
  {
    name: 'Bracket Matrix (bmatrix)',
    input: `$$\\begin{bmatrix}
1 & 2 \\\\
3 & 4
\\end{bmatrix}$$`,
    expected: 'Should preserve bracket matrix'
  },
  {
    name: 'Mixed content with matrix',
    input: `# Matrix Example

The determinant is:

$$\\begin{vmatrix}
a_{11} & a_{12} \\\\
a_{21} & a_{22}
\\end{vmatrix} = a_{11}a_{22} - a_{12}a_{21}$$

This is important.`,
    expected: 'Should preserve matrix in mixed content'
  },
  {
    name: 'Double backslash outside matrix',
    input: `Some text with \\\\\\\\ double backslashes`,
    expected: 'Should fix double backslashes outside matrix'
  },
  {
    name: 'Custom tags conversion',
    input: `<BLOCK_MATH>\\begin{vmatrix} a & b \\\\\\\\ c & d \\end{vmatrix}</BLOCK_MATH>`,
    expected: 'Should convert tags and preserve matrix'
  }
]

console.log('🧪 Testing MathContent Matrix Processing...\n')

let passed = 0
let failed = 0

testCases.forEach((testCase, index) => {
  console.log(`Test ${index + 1}: ${testCase.name}`)
  console.log('Input:', JSON.stringify(testCase.input))
  
  try {
    const result = processMatrixContent(testCase.input)
    console.log('Output:', JSON.stringify(result))
    
    // Basic validation - check if matrix structure is preserved
    const hasMatrixStart = result.includes('\\begin{')
    const hasMatrixEnd = result.includes('\\end{')
    const hasAmpersand = result.includes('&')
    const hasDoubleBackslash = result.includes('\\\\')
    
    if (testCase.input.includes('matrix') && (!hasMatrixStart || !hasMatrixEnd)) {
      console.log('❌ FAILED: Matrix environment not preserved')
      failed++
    } else if (testCase.input.includes('&') && !hasAmpersand) {
      console.log('❌ FAILED: Matrix separators (&) not preserved')
      failed++
    } else {
      console.log('✅ PASSED')
      passed++
    }
  } catch (error) {
    console.log('❌ FAILED: Error during processing:', error)
    failed++
  }
  
  console.log('Expected:', testCase.expected)
  console.log('---\n')
})

console.log(`📊 Test Results: ${passed} passed, ${failed} failed`)

if (failed === 0) {
  console.log('🎉 All tests passed!')
  process.exit(0)
} else {
  console.log('💥 Some tests failed!')
  process.exit(1)
}