#!/usr/bin/env npx tsx

import * as fs from 'fs';
import * as path from 'path';

const filePath = path.join(process.cwd(), 'data/linear-algebra-content.ts');

console.log('🔧 修复线性代数内容中的LaTeX转义问题...\n');

// 读取文件内容
const content = fs.readFileSync(filePath, 'utf8');

// 定义需要修复的模式
const patterns = [
  // 修复双反斜杠的LaTeX命令
  { pattern: /\\\\/g, replacement: '\\' },
];

// 特殊处理：只在特定的LaTeX命令中替换
const latexCommands = [
  'begin', 'end', 'times', 'quad', 'cdot', 'cdots', 'sum', 'tau',
  'xrightarrow', 'pmatrix', 'vmatrix', 'bmatrix', 'align',
  'frac', 'sqrt', 'int', 'partial', 'nabla', 'vec', 'hat',
  'infty', 'alpha', 'beta', 'gamma', 'delta', 'epsilon',
  'theta', 'lambda', 'mu', 'nu', 'pi', 'rho', 'sigma', 'phi',
  'omega', 'Omega', 'Delta', 'Gamma', 'Lambda', 'Sigma', 'Phi',
  'geq', 'leq', 'neq', 'approx', 'equiv', 'subset', 'supset',
  'in', 'notin', 'forall', 'exists', 'rightarrow', 'leftarrow',
  'Rightarrow', 'Leftarrow', 'iff', 'implies'
];

// 创建一个函数来智能替换
function fixLatexEscaping(text: string): string {
  let result = text;
  
  // 修复常见的LaTeX命令中的双反斜杠
  latexCommands.forEach(cmd => {
    // 匹配 \\command 形式
    const regex = new RegExp(`\\\\\\\\(${cmd})`, 'g');
    result = result.replace(regex, '\\$1');
  });
  
  // 修复矩阵环境中的双反斜杠（但保留换行符\\）
  // 在矩阵中，行末的 \\ 应该保留为 \\（表示换行）
  // 但是 \\begin, \\end 等应该变为 \begin, \end
  
  // 修复 \\begin{vmatrix} 等
  result = result.replace(/\\\\begin\{(vmatrix|pmatrix|bmatrix|matrix|align)\}/g, '\\begin{$1}');
  result = result.replace(/\\\\end\{(vmatrix|pmatrix|bmatrix|matrix|align)\}/g, '\\end{$1}');
  
  // 修复其他常见的双反斜杠命令
  result = result.replace(/\\\\times/g, '\\times');
  result = result.replace(/\\\\quad/g, '\\quad');
  result = result.replace(/\\\\cdot/g, '\\cdot');
  result = result.replace(/\\\\cdots/g, '\\cdots');
  result = result.replace(/\\\\sum/g, '\\sum');
  result = result.replace(/\\\\tau/g, '\\tau');
  result = result.replace(/\\\\xrightarrow/g, '\\xrightarrow');
  result = result.replace(/\\\\frac/g, '\\frac');
  result = result.replace(/\\\\sqrt/g, '\\sqrt');
  result = result.replace(/\\\\int/g, '\\int');
  result = result.replace(/\\\\partial/g, '\\partial');
  
  return result;
}

// 应用修复
let fixedContent = content;

// 对于 String.raw 模板，我们不应该修改转义
// 因为 String.raw 会保留原始的反斜杠
// 所以我们需要寻找非 String.raw 的内容
let replacements: Array<{ start: number; end: number; original: string; fixed: string }> = [];

// 同时处理普通字符串中的LaTeX（如果有）
const normalStringRegex = /(['"])((?:[^\\]|\\.)*?)\1/g;
let match;
while ((match = normalStringRegex.exec(content)) !== null) {
  const stringContent = match[2];
  // 检查是否包含LaTeX命令
  if (stringContent.includes('\\\\begin') || stringContent.includes('\\\\end') || 
      stringContent.includes('\\\\times') || stringContent.includes('\\\\quad')) {
    const fixed = fixLatexEscaping(stringContent);
    if (stringContent !== fixed) {
      replacements.push({
        start: match.index + 1,
        end: match.index + 1 + stringContent.length,
        original: stringContent,
        fixed
      });
    }
  }
}

// 应用所有替换（从后向前，避免位置偏移）
replacements.sort((a, b) => b.start - a.start);
replacements.forEach(r => {
  fixedContent = fixedContent.slice(0, r.start) + r.fixed + fixedContent.slice(r.end);
});

// 写回文件
fs.writeFileSync(filePath, fixedContent, 'utf8');

console.log(`✅ 修复完成！共处理了 ${replacements.length} 处转义问题`);

// 显示一些修复的例子
if (replacements.length > 0) {
  console.log('\n修复示例：');
  const examples = replacements.slice(0, 3);
  examples.forEach((r, i) => {
    const originalSnippet = r.original.slice(0, 100);
    const fixedSnippet = r.fixed.slice(0, 100);
    console.log(`\n例子 ${i + 1}:`);
    console.log(`  原始: ...${originalSnippet}...`);
    console.log(`  修复: ...${fixedSnippet}...`);
  });
}