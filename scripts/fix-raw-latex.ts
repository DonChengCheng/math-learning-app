#!/usr/bin/env npx tsx

import * as fs from 'fs';
import * as path from 'path';

const filePath = path.join(process.cwd(), 'data/linear-algebra-content.ts');

console.log('🔧 修复String.raw模板中的LaTeX双反斜杠问题...\n');

// 读取文件内容
let content = fs.readFileSync(filePath, 'utf8');

// 统计修复前的双反斜杠数量
const beforeCount = (content.match(/\\\\/g) || []).length;
console.log(`修复前双反斜杠数量: ${beforeCount}`);

// LaTeX命令列表（这些命令前面不应该有双反斜杠）
const latexCommands = [
  'begin', 'end', 'times', 'quad', 'cdot', 'cdots', 'sum', 'tau',
  'xrightarrow', 'pmatrix', 'vmatrix', 'bmatrix', 'align', 'aligned',
  'frac', 'sqrt', 'int', 'partial', 'nabla', 'vec', 'hat', 'det',
  'infty', 'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'vdots', 'ddots',
  'theta', 'lambda', 'mu', 'nu', 'pi', 'rho', 'sigma', 'phi',
  'omega', 'Omega', 'Delta', 'Gamma', 'Lambda', 'Sigma', 'Phi',
  'geq', 'leq', 'neq', 'approx', 'equiv', 'subset', 'supset',
  'in', 'notin', 'forall', 'exists', 'rightarrow', 'leftarrow',
  'Rightarrow', 'Leftarrow', 'iff', 'implies', 'text', 'mathbf',
  'mathcal', 'mathbb', 'mathrm', 'boldsymbol', 'operatorname',
  'prod', 'perp', 'pm', 'langle', 'rangle', 'left', 'right',
  'dim', 'ker', 'rank', 'det', 'tr', 'diag', 'span', 'min', 'max',
  'lim', 'log', 'ln', 'exp', 'sin', 'cos', 'tan', 'arcsin', 'arccos', 'arctan',
  'ldots', 'cdot', 'circ', 'star', 'otimes', 'oplus', 'cup', 'cap',
  'subset', 'supset', 'subseteq', 'supseteq', 'setminus', 'emptyset',
  'textbf', 'textit', 'textrm', 'texttt', 'textsf', 'textup', 'textsl',
  'overline', 'underline', 'widehat', 'widetilde', 'overrightarrow',
  'xleftarrow', 'xrightarrow', 'xLeftarrow', 'xRightarrow'
];

// 修复函数
function fixDoubleBackslashes(text: string): string {
  let result = text;
  
  // 1. 修复LaTeX命令前的双反斜杠
  latexCommands.forEach(cmd => {
    // 匹配 \\command
    const regex = new RegExp(`\\\\\\\\(${cmd})`, 'g');
    result = result.replace(regex, '\\$1');
  });
  
  // 2. 特别处理 \\\\ 换行符（在矩阵中需要保留为 \\）
  // 在矩阵环境中，行末的 \\\\ 应该变为 \\
  // 匹配模式：在矩阵元素后的 \\\\
  result = result.replace(/(\w|\}|\)|\d)\s*\\\\\\\\/g, '$1 \\\\');
  
  // 3. 修复特定的模式
  // \\begin{xxx} -> \begin{xxx}
  result = result.replace(/\\\\begin\{/g, '\\begin{');
  // \\end{xxx} -> \end{xxx}
  result = result.replace(/\\\\end\{/g, '\\end{');
  // \\times -> \times
  result = result.replace(/\\\\times/g, '\\times');
  // \\cdots -> \cdots
  result = result.replace(/\\\\cdots/g, '\\cdots');
  // \\vdots -> \vdots
  result = result.replace(/\\\\vdots/g, '\\vdots');
  // \\ddots -> \ddots
  result = result.replace(/\\\\ddots/g, '\\ddots');
  // \\quad -> \quad
  result = result.replace(/\\\\quad/g, '\\quad');
  // \\det -> \det
  result = result.replace(/\\\\det/g, '\\det');
  
  return result;
}

// 应用修复到整个文件
content = fixDoubleBackslashes(content);

// 统计修复后的双反斜杠数量
const afterCount = (content.match(/\\\\/g) || []).length;
console.log(`修复后双反斜杠数量: ${afterCount}`);
console.log(`减少了 ${beforeCount - afterCount} 个双反斜杠`);

// 写回文件
fs.writeFileSync(filePath, content, 'utf8');

console.log('\n✅ 修复完成！');

// 显示一些统计信息
console.log('\n📊 统计信息：');
console.log(`- 文件大小: ${(content.length / 1024).toFixed(2)} KB`);
console.log(`- 总行数: ${content.split('\n').length}`);

// 检查是否还有潜在的问题
const remainingDoubleSlashes = content.match(/\\\\[a-zA-Z]/g);
if (remainingDoubleSlashes && remainingDoubleSlashes.length > 0) {
  console.log('\n⚠️ 警告：仍有一些双反斜杠模式：');
  const unique = [...new Set(remainingDoubleSlashes)].slice(0, 10);
  console.log(unique.join(', '));
}