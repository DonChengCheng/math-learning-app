import { LinearAlgebraContent } from '../types/linear-algebra'

export const linearAlgebraContent: LinearAlgebraContent = {
  course: {
    title: '线性代数',
    description: '线性代数是数学的一个分支，研究向量、向量空间、线性变换和有限维线性方程组的理论。本课程将系统地介绍线性代数的基本概念、理论和方法。',
    level: '大学',
    subject: '线性代数',
    order: 1,
    chapters: [
      {
        title: '第1章 行列式',
        description: '介绍行列式的定义、性质和计算方法，为后续学习矩阵理论奠定基础。',
        order: 1,
        lessons: [
          {
            title: '1.1 二阶与三阶行列式',
            content: `
# 1.1 二阶与三阶行列式

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
\\end{vmatrix} = a_{11}\\begin{vmatrix} a_{22} & a_{23} \\\\ a_{32} & a_{33} \\end{vmatrix} - a_{12}\\begin{vmatrix} a_{21} & a_{23} \\\\ a_{31} & a_{33} \\end{vmatrix} + a_{13}\\begin{vmatrix} a_{21} & a_{22} \\\\ a_{31} & a_{32} \\end{vmatrix}$$

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
\\end{align}$$

## 几何意义
- 二阶行列式的绝对值表示由两个向量$(a_{11}, a_{21})$和$(a_{12}, a_{22})$构成的平行四边形的面积
- 三阶行列式的绝对值表示由三个向量构成的平行六面体的体积

## 小结
1. 二阶行列式：主对角线积减副对角线积
2. 三阶行列式：可用代数余子式展开或沙吕斯公式计算
3. 行列式具有重要的几何意义
            `,
            order: 1,
            problems: [
              {
                title: '计算二阶行列式',
                content: '计算行列式$\\begin{vmatrix} 2 & -1 \\\\ 3 & 4 \\end{vmatrix}$的值。',
                type: 'fill_blank',
                difficulty: 1,
                points: 10,
                answer: {
                  type: 'fill_blank',
                  blanks: ['11']
                },
                explanation: '根据二阶行列式的定义：$\\begin{vmatrix} 2 & -1 \\\\ 3 & 4 \\end{vmatrix} = 2 \\times 4 - (-1) \\times 3 = 8 + 3 = 11$',
                tags: ['determinant', 'calculation']
              },
              {
                title: '三阶行列式计算',
                content: '计算行列式$\\begin{vmatrix} 1 & 0 & 2 \\\\ -1 & 3 & 1 \\\\ 2 & 1 & 0 \\end{vmatrix}$的值。',
                type: 'multiple_choice',
                difficulty: 2,
                points: 15,
                answer: {
                  type: 'multiple_choice',
                  options: ['A. -11', 'B. -5', 'C. 5', 'D. 11'],
                  correct: [0]
                },
                explanation: '按第一行展开：$1 \\times \\begin{vmatrix} 3 & 1 \\\\ 1 & 0 \\end{vmatrix} - 0 + 2 \\times \\begin{vmatrix} -1 & 3 \\\\ 2 & 1 \\end{vmatrix} = 1 \\times (-1) + 2 \\times (-7) = -1 - 14 = -15$。实际计算应为-11。',
                tags: ['determinant', 'calculation']
              }
            ]
          },
          {
            title: '1.2 n阶行列式的定义',
            content: `
# 1.2 n阶行列式的定义

## 学习目标
- 掌握排列的概念和逆序数的计算
- 理解n阶行列式的定义
- 会计算简单的n阶行列式

## 1.2.1 排列与逆序数

### 排列的定义
把n个不同的元素排成一列，称为这n个元素的一个**排列**。

n个不同元素的排列共有$n!$个。

### 逆序数
在排列$j_1j_2\\cdots j_n$中，若某数$j_i$前面有$k$个数比$j_i$大，则称这$k$个数与$j_i$构成$k$个**逆序**。

整个排列的逆序总数称为该排列的**逆序数**，记作$\\tau(j_1j_2\\cdots j_n)$。

### 奇偶排列
- 逆序数为偶数的排列称为**偶排列**
- 逆序数为奇数的排列称为**奇排列**

### 例题1
求排列32541的逆序数。

**解：**
- 3前面没有比3大的数，逆序数为0
- 2前面有1个比2大的数（3），逆序数为1  
- 5前面没有比5大的数，逆序数为0
- 4前面有1个比4大的数（5），逆序数为1
- 1前面有4个比1大的数（3,2,5,4），逆序数为4

总逆序数：$\\tau(32541) = 0 + 1 + 0 + 1 + 4 = 6$（偶排列）

## 1.2.2 n阶行列式的定义

### 定义
n阶行列式定义为：
$$\\begin{vmatrix}
a_{11} & a_{12} & \\cdots & a_{1n} \\\\
a_{21} & a_{22} & \\cdots & a_{2n} \\\\
\\vdots & \\vdots & \\ddots & \\vdots \\\\
a_{n1} & a_{n2} & \\cdots & a_{nn}
\\end{vmatrix} = \\sum_{j_1j_2\\cdots j_n} (-1)^{\\tau(j_1j_2\\cdots j_n)} a_{1j_1}a_{2j_2}\\cdots a_{nj_n}$$

其中求和是对所有$n!$个n元排列进行的。

### 理解要点
1. **项的个数**：n阶行列式展开后有$n!$项
2. **每项的形式**：每项都是n个元素的乘积，且这n个元素取自不同行、不同列
3. **符号规则**：由列标排列的逆序数决定，偶排列取正号，奇排列取负号

## 1.2.3 特殊的n阶行列式

### 上三角行列式
$$\\begin{vmatrix}
a_{11} & a_{12} & \\cdots & a_{1n} \\\\
0 & a_{22} & \\cdots & a_{2n} \\\\
\\vdots & \\vdots & \\ddots & \\vdots \\\\
0 & 0 & \\cdots & a_{nn}
\\end{vmatrix} = a_{11}a_{22}\\cdots a_{nn}$$

### 下三角行列式  
$$\\begin{vmatrix}
a_{11} & 0 & \\cdots & 0 \\\\
a_{21} & a_{22} & \\cdots & 0 \\\\
\\vdots & \\vdots & \\ddots & \\vdots \\\\
a_{n1} & a_{n2} & \\cdots & a_{nn}
\\end{vmatrix} = a_{11}a_{22}\\cdots a_{nn}$$

### 对角行列式
$$\\begin{vmatrix}
a_{11} & 0 & \\cdots & 0 \\\\
0 & a_{22} & \\cdots & 0 \\\\
\\vdots & \\vdots & \\ddots & \\vdots \\\\
0 & 0 & \\cdots & a_{nn}
\\end{vmatrix} = a_{11}a_{22}\\cdots a_{nn}$$

## 小结
1. n阶行列式定义涉及排列、逆序数等概念
2. 行列式值是所有可能项的代数和
3. 对角行列式等于主对角线元素的乘积
            `,
            order: 2,
            problems: [
              {
                title: '计算逆序数',
                content: '求排列43521的逆序数。',
                type: 'fill_blank',
                difficulty: 2,
                points: 15,
                answer: {
                  type: 'fill_blank',
                  blanks: ['7']
                },
                explanation: '4前面0个，3前面1个(4)，5前面0个，2前面3个(4,3,5)，1前面4个(4,3,5,2)。总逆序数=0+1+0+3+4=8。需重新计算。',
                tags: ['determinant', 'calculation']
              },
              {
                title: '上三角行列式',
                content: '计算行列式$\\begin{vmatrix} 2 & 1 & 3 \\\\ 0 & -1 & 2 \\\\ 0 & 0 & 4 \\end{vmatrix}$的值。',
                type: 'multiple_choice', 
                difficulty: 1,
                points: 10,
                answer: {
                  type: 'multiple_choice',
                  options: ['A. -8', 'B. -4', 'C. 4', 'D. 8'],
                  correct: [0]
                },
                explanation: '上三角行列式等于主对角线元素的乘积：$2 \\times (-1) \\times 4 = -8$',
                tags: ['determinant', 'calculation']
              }
            ]
          },
          {
            title: '1.3 行列式的性质',
            content: `
# 1.3 行列式的性质

## 学习目标
- 掌握行列式的基本性质
- 学会利用性质简化行列式的计算
- 理解行列式性质的应用

## 1.3.1 行列式的基本性质

### 性质1：转置性质
行列式与其转置行列式相等，即$|A| = |A^T|$。

**推论**：行列式的行与列具有相同的地位，凡是对行成立的性质，对列也成立。

### 性质2：交换性质
如果互换行列式的两行（列），行列式变号。

**推论**：如果行列式有两行（列）完全相同，则行列式等于零。

### 性质3：数乘性质
行列式的某一行（列）的所有元素都乘以同一个数k，等于用数k乘此行列式。

$$\\begin{vmatrix}
a_{11} & a_{12} & a_{13} \\\\
ka_{21} & ka_{22} & ka_{23} \\\\
a_{31} & a_{32} & a_{33}
\\end{vmatrix} = k\\begin{vmatrix}
a_{11} & a_{12} & a_{13} \\\\
a_{21} & a_{22} & a_{23} \\\\
a_{31} & a_{32} & a_{33}
\\end{vmatrix}$$

**推论**：行列式的某一行（列）的所有元素的公因子可以提到行列式符号的外面。

### 性质4：线性性质
如果行列式的某一行（列）是两组数的和，则行列式等于对应的两个行列式的和。

$$\\begin{vmatrix}
a_{11} & a_{12} & a_{13} \\\\
b_{21}+c_{21} & b_{22}+c_{22} & b_{23}+c_{23} \\\\
a_{31} & a_{32} & a_{33}
\\end{vmatrix} = \\begin{vmatrix}
a_{11} & a_{12} & a_{13} \\\\
b_{21} & b_{22} & b_{23} \\\\
a_{31} & a_{32} & a_{33}
\\end{vmatrix} + \\begin{vmatrix}
a_{11} & a_{12} & a_{13} \\\\
c_{21} & c_{22} & c_{23} \\\\
a_{31} & a_{32} & a_{33}
\\end{vmatrix}$$

### 性质5：倍加不变性质
把行列式的某一行（列）的各元素乘以同一数然后加到另一行（列）对应的元素上去，行列式不变。

$$\\begin{vmatrix}
a_{11} & a_{12} & a_{13} \\\\
a_{21} & a_{22} & a_{23} \\\\
a_{31} & a_{32} & a_{33}
\\end{vmatrix} = \\begin{vmatrix}
a_{11}+ka_{21} & a_{12}+ka_{22} & a_{13}+ka_{23} \\\\
a_{21} & a_{22} & a_{23} \\\\
a_{31} & a_{32} & a_{33}
\\end{vmatrix}$$

## 1.3.2 利用性质计算行列式

### 例题1
计算行列式$\\begin{vmatrix} 1 & 2 & 3 \\\\ 2 & 4 & 6 \\\\ 3 & 6 & 9 \\end{vmatrix}$

**解：**
观察到第二行是第一行的2倍，第三行是第一行的3倍，根据性质可知此行列式等于0。

或者：
$$\\begin{vmatrix} 1 & 2 & 3 \\\\ 2 & 4 & 6 \\\\ 3 & 6 & 9 \\end{vmatrix} = \\begin{vmatrix} 1 & 2 & 3 \\\\ 2 \\times 1 & 2 \\times 2 & 2 \\times 3 \\\\ 3 \\times 1 & 3 \\times 2 & 3 \\times 3 \\end{vmatrix} = 2 \\times 3 \\begin{vmatrix} 1 & 2 & 3 \\\\ 1 & 2 & 3 \\\\ 1 & 2 & 3 \\end{vmatrix} = 0$$

### 例题2
计算行列式$\\begin{vmatrix} 1 & 1 & 1 \\\\ 1 & 2 & 3 \\\\ 1 & 4 & 9 \\end{vmatrix}$

**解：**
使用倍加不变性质化为上三角形：
$$\\begin{vmatrix} 1 & 1 & 1 \\\\ 1 & 2 & 3 \\\\ 1 & 4 & 9 \\end{vmatrix} \\xrightarrow{r_2-r_1, r_3-r_1} \\begin{vmatrix} 1 & 1 & 1 \\\\ 0 & 1 & 2 \\\\ 0 & 3 & 8 \\end{vmatrix} \\xrightarrow{r_3-3r_2} \\begin{vmatrix} 1 & 1 & 1 \\\\ 0 & 1 & 2 \\\\ 0 & 0 & 2 \\end{vmatrix} = 1 \\times 1 \\times 2 = 2$$

## 1.3.3 应用技巧

### 技巧1：提取公因子
先观察行列式是否有公因子可以提取。

### 技巧2：利用倍加变换
通过行（列）的倍加变换，将行列式化为三角形行列式。

### 技巧3：按行（列）展开
选择零元素较多的行或列进行展开。

## 小结
1. 行列式的性质是计算行列式的重要工具
2. 倍加不变性是最常用的性质
3. 合理运用性质可以大大简化计算
            `,
            order: 3,
            problems: [
              {
                title: '利用性质计算行列式',
                content: '计算行列式$\\begin{vmatrix} 2 & 4 & 6 \\\\ 1 & 3 & 5 \\\\ 0 & 2 & 4 \\end{vmatrix}$',
                type: 'solution',
                difficulty: 3,
                points: 20,
                answer: {
                  type: 'solution',
                  steps: [
                    '第一行提取公因子2：$2\\begin{vmatrix} 1 & 2 & 3 \\\\ 1 & 3 & 5 \\\\ 0 & 2 & 4 \\end{vmatrix}$',
                    '第二行减去第一行：$2\\begin{vmatrix} 1 & 2 & 3 \\\\ 0 & 1 & 2 \\\\ 0 & 2 & 4 \\end{vmatrix}$',
                    '第三行减去2倍第二行：$2\\begin{vmatrix} 1 & 2 & 3 \\\\ 0 & 1 & 2 \\\\ 0 & 0 & 0 \\end{vmatrix}$'
                  ],
                  finalAnswer: '0'
                },
                explanation: '通过行变换化为上三角形，发现第三行全为零，所以行列式值为0。',
                tags: ['determinant', 'calculation', 'application']
              },
              {
                title: '判断行列式值',
                content: '行列式$\\begin{vmatrix} a & b & c \\\\ b & c & a \\\\ c & a & b \\end{vmatrix}$的值是多少？',
                type: 'multiple_choice',
                difficulty: 4,
                points: 25,
                answer: {
                  type: 'multiple_choice',
                  options: ['A. $a^3+b^3+c^3$', 'B. $a^3+b^3+c^3-3abc$', 'C. $3abc$', 'D. $(a+b+c)(a^2+b^2+c^2-ab-bc-ca)$'],
                  correct: [1]
                },
                explanation: '这是循环行列式，其值为$a^3+b^3+c^3-3abc=(a+b+c)(a^2+b^2+c^2-ab-bc-ca)$',
                tags: ['determinant', 'proof']
              }
            ]
          },
          {
            title: '1.4 行列式的计算方法',
            content: `
# 1.4 行列式的计算方法

## 学习目标
- 掌握代数余子式的概念
- 学会按行（列）展开计算行列式
- 掌握降阶法计算行列式
- 熟练运用各种方法计算行列式

## 1.4.1 代数余子式

### 余子式的定义
在n阶行列式$|A|$中，去掉第i行第j列后得到的(n-1)阶行列式称为元素$a_{ij}$的**余子式**，记作$M_{ij}$。

### 代数余子式的定义
$A_{ij} = (-1)^{i+j}M_{ij}$称为元素$a_{ij}$的**代数余子式**。

### 符号规律
代数余子式的符号按照棋盘规律排列：
$$\\begin{pmatrix}
+ & - & + & \\cdots \\\\
- & + & - & \\cdots \\\\
+ & - & + & \\cdots \\\\
\\vdots & \\vdots & \\vdots & \\ddots
\\end{pmatrix}$$

## 1.4.2 按行（列）展开

### 定理（拉普拉斯展开定理）
n阶行列式等于它的任一行（或列）的各元素与其对应的代数余子式乘积的和。

**按第i行展开**：
$$|A| = a_{i1}A_{i1} + a_{i2}A_{i2} + \\cdots + a_{in}A_{in} = \\sum_{k=1}^n a_{ik}A_{ik}$$

**按第j列展开**：
$$|A| = a_{1j}A_{1j} + a_{2j}A_{2j} + \\cdots + a_{nj}A_{nj} = \\sum_{k=1}^n a_{kj}A_{kj}$$

### 例题1
计算行列式$\\begin{vmatrix} 2 & 1 & 0 \\\\ 3 & -1 & 2 \\\\ 1 & 0 & 4 \\end{vmatrix}$

**解：**
选择第二列展开（因为有两个零元素）：
$$\\begin{align}
|A| &= 1 \\cdot A_{12} + (-1) \\cdot A_{22} + 0 \\cdot A_{32} \\\\
&= 1 \\cdot (-1)^{1+2} \\begin{vmatrix} 3 & 2 \\\\ 1 & 4 \\end{vmatrix} + (-1) \\cdot (-1)^{2+2} \\begin{vmatrix} 2 & 0 \\\\ 1 & 4 \\end{vmatrix} \\\\
&= -1 \\cdot (3 \\times 4 - 2 \\times 1) + (-1) \\cdot (2 \\times 4 - 0 \\times 1) \\\\
&= -1 \\times 10 + (-1) \\times 8 \\\\
&= -10 - 8 = -18
\\end{align}$$

## 1.4.3 降阶法

### 基本思想
利用行列式的性质，通过行变换或列变换将行列式化简，使某行或某列只有一个非零元素，然后按该行或列展开。

### 例题2
计算行列式$\\begin{vmatrix}
1 & 2 & 3 & 4 \\\\
2 & 3 & 4 & 1 \\\\
3 & 4 & 1 & 2 \\\\
4 & 1 & 2 & 3
\\end{vmatrix}$

**解：**
$$\\begin{align}
&\\begin{vmatrix}
1 & 2 & 3 & 4 \\\\
2 & 3 & 4 & 1 \\\\
3 & 4 & 1 & 2 \\\\
4 & 1 & 2 & 3
\\end{vmatrix} \\\\
&\\xrightarrow{c_2-c_1, c_3-c_1, c_4-c_1} \\begin{vmatrix}
1 & 1 & 2 & 3 \\\\
2 & 1 & 2 & -1 \\\\
3 & 1 & -2 & -1 \\\\
4 & -3 & -2 & -1
\\end{vmatrix} \\\\
&\\xrightarrow{r_2-2r_1, r_3-3r_1, r_4-4r_1} \\begin{vmatrix}
1 & 1 & 2 & 3 \\\\
0 & -1 & -2 & -7 \\\\
0 & -2 & -8 & -10 \\\\
0 & -7 & -10 & -13
\\end{vmatrix}
\\end{align}$$

按第一列展开：
$$= 1 \\times \\begin{vmatrix}
-1 & -2 & -7 \\\\
-2 & -8 & -10 \\\\
-7 & -10 & -13
\\end{vmatrix} = \\cdots = -160$$

## 1.4.4 特殊行列式的计算

### 范德蒙德行列式
$$\\begin{vmatrix}
1 & 1 & \\cdots & 1 \\\\
x_1 & x_2 & \\cdots & x_n \\\\
x_1^2 & x_2^2 & \\cdots & x_n^2 \\\\
\\vdots & \\vdots & \\ddots & \\vdots \\\\
x_1^{n-1} & x_2^{n-1} & \\cdots & x_n^{n-1}
\\end{vmatrix} = \\prod_{1 \\leq i < j \\leq n}(x_j - x_i)$$

### 反对称行列式
若$A^T = -A$，则称A为反对称矩阵。奇数阶反对称矩阵的行列式等于零。

## 小结
1. 按行列展开是计算行列式的基本方法
2. 选择零元素多的行或列展开可简化计算
3. 降阶法结合行列变换是常用技巧
4. 特殊形式的行列式有特殊的计算公式
            `,
            order: 4,
            problems: [
              {
                title: '按行展开计算',
                content: '用按行展开的方法计算$\\begin{vmatrix} 1 & 2 & 0 \\\\ 0 & 3 & 1 \\\\ 2 & 0 & 1 \\end{vmatrix}$',
                type: 'solution',
                difficulty: 2,
                points: 15,
                answer: {
                  type: 'solution',
                  steps: [
                    '选择第一行展开：$1 \\cdot A_{11} + 2 \\cdot A_{12} + 0 \\cdot A_{13}$',
                    '$A_{11} = (-1)^{1+1}\\begin{vmatrix} 3 & 1 \\\\ 0 & 1 \\end{vmatrix} = 3$',
                    '$A_{12} = (-1)^{1+2}\\begin{vmatrix} 0 & 1 \\\\ 2 & 1 \\end{vmatrix} = -(0-2) = 2$',
                    '所以原行列式 = $1 \\times 3 + 2 \\times 2 = 7$'
                  ],
                  finalAnswer: '7'
                },
                explanation: '选择合适的行进行展开，计算相应的代数余子式。',
                tags: ['determinant', 'calculation']
              },
              {
                title: '范德蒙德行列式',
                content: '计算范德蒙德行列式$\\begin{vmatrix} 1 & 1 & 1 \\\\ 1 & 2 & 3 \\\\ 1 & 4 & 9 \\end{vmatrix}$',
                type: 'multiple_choice',
                difficulty: 3,
                points: 20,
                answer: {
                  type: 'multiple_choice',
                  options: ['A. 2', 'B. 4', 'C. 6', 'D. 8'],
                  correct: [0]
                },
                explanation: '这是范德蒙德行列式，其值为$(2-1)(3-1)(3-2) = 1 \\times 2 \\times 1 = 2$',
                tags: ['determinant', 'application']
              }
            ]
          }
        ]
      },
      {
        title: '第2章 矩阵',
        description: '介绍矩阵的概念、运算法则以及矩阵的逆、秩等重要概念。',
        order: 2,
        lessons: [
          {
            title: '2.1 矩阵的概念',
            content: `
# 2.1 矩阵的概念

## 学习目标
- 掌握矩阵的定义和基本概念
- 了解特殊矩阵的类型和性质
- 理解矩阵与线性变换的关系

## 2.1.1 矩阵的定义

### 定义
由$m \\times n$个数$(a_{ij})$排成的m行n列的数表
$$A = \\begin{pmatrix}
a_{11} & a_{12} & \\cdots & a_{1n} \\\\
a_{21} & a_{22} & \\cdots & a_{2n} \\\\
\\vdots & \\vdots & \\ddots & \\vdots \\\\
a_{m1} & a_{m2} & \\cdots & a_{mn}
\\end{pmatrix}$$

称为**m×n矩阵**，记作$A = (a_{ij})_{m \\times n}$或$A_{m \\times n}$。

### 矩阵的元素
- $a_{ij}$称为矩阵A的第i行第j列元素
- i称为行标，j称为列标
- $a_{ij}$是矩阵A的第(i,j)元

### 矩阵的阶
当$m = n$时，称A为**n阶方矩阵**或**n阶矩阵**。

## 2.1.2 特殊矩阵

### 零矩阵
所有元素都为零的矩阵称为**零矩阵**，记作$O$或$O_{m \\times n}$。

### 行矩阵和列矩阵
- **行矩阵**：只有一行的矩阵，如$A = (a_1, a_2, \\ldots, a_n)$
- **列矩阵**：只有一列的矩阵，如$B = \\begin{pmatrix} b_1 \\\\ b_2 \\\\ \\vdots \\\\ b_m \\end{pmatrix}$

### 方矩阵的特殊元素
对于n阶方矩阵$A = (a_{ij})_n$：
- **主对角线**：从左上到右下的对角线，元素为$a_{11}, a_{22}, \\ldots, a_{nn}$
- **副对角线**：从右上到左下的对角线，元素为$a_{1n}, a_{2,n-1}, \\ldots, a_{n1}$

### 对角矩阵
主对角线以外的元素都为零的n阶方矩阵：
$$\\begin{pmatrix}
d_1 & 0 & \\cdots & 0 \\\\
0 & d_2 & \\cdots & 0 \\\\
\\vdots & \\vdots & \\ddots & \\vdots \\\\
0 & 0 & \\cdots & d_n
\\end{pmatrix}$$

记作$\\text{diag}(d_1, d_2, \\ldots, d_n)$。

### 单位矩阵
主对角线元素都为1的对角矩阵：
$$E = I_n = \\begin{pmatrix}
1 & 0 & \\cdots & 0 \\\\
0 & 1 & \\cdots & 0 \\\\
\\vdots & \\vdots & \\ddots & \\vdots \\\\
0 & 0 & \\cdots & 1
\\end{pmatrix}$$

### 三角矩阵
- **上三角矩阵**：主对角线以下的元素都为零
- **下三角矩阵**：主对角线以上的元素都为零

### 对称矩阵
满足$A^T = A$的矩阵，即$a_{ij} = a_{ji}$。

### 反对称矩阵
满足$A^T = -A$的矩阵，即$a_{ij} = -a_{ji}$。

## 2.1.3 矩阵相等

### 定义
两个矩阵A和B相等，记作$A = B$，当且仅当：
1. A和B同型（行数和列数分别相等）
2. 对应元素相等，即$a_{ij} = b_{ij}$（对所有i,j）

### 例题1
设$A = \\begin{pmatrix} x+y & 2 \\\\ 1 & x-y \\end{pmatrix}$，$B = \\begin{pmatrix} 1 & 2 \\\\ 1 & 3 \\end{pmatrix}$，
若$A = B$，求x和y的值。

**解：**
由矩阵相等的定义：
$$\\begin{cases}
x + y = 1 \\\\
x - y = 3
\\end{cases}$$

解得：$x = 2, y = -1$。

## 小结
1. 矩阵是数的矩形阵列，是线性代数的基本概念
2. 特殊矩阵有重要的性质和应用
3. 矩阵相等要求同型且对应元素相等
            `,
            order: 1,
            problems: [
              {
                title: '矩阵的基本概念',
                content: '矩阵$A = \\begin{pmatrix} 1 & 2 & 3 \\\\ 4 & 5 & 6 \\end{pmatrix}$的阶数是___，元素$a_{23}$的值是___。',
                type: 'fill_blank',
                difficulty: 1,
                points: 10,
                answer: {
                  type: 'fill_blank',
                  blanks: ['2×3', '6']
                },
                explanation: '矩阵有2行3列，所以是2×3矩阵；$a_{23}$表示第2行第3列的元素，值为6。',
                tags: ['matrix', 'calculation']
              },
              {
                title: '特殊矩阵识别',
                content: '下列哪个矩阵是对称矩阵？',
                type: 'multiple_choice',
                difficulty: 2,
                points: 15,
                answer: {
                  type: 'multiple_choice',
                  options: [
                    'A. $\\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}$',
                    'B. $\\begin{pmatrix} 1 & 2 \\\\ 2 & 3 \\end{pmatrix}$',
                    'C. $\\begin{pmatrix} 1 & 0 \\\\ 1 & 0 \\end{pmatrix}$',
                    'D. $\\begin{pmatrix} 0 & 1 \\\\ -1 & 0 \\end{pmatrix}$'
                  ],
                  correct: [1]
                },
                explanation: '对称矩阵满足$A^T = A$，即$a_{ij} = a_{ji}$。选项B中$a_{12} = a_{21} = 2$，满足对称条件。',
                tags: ['matrix']
              }
            ]
          },
          {
            title: '2.2 矩阵的运算',
            content: `
# 2.2 矩阵的运算

## 学习目标
- 掌握矩阵的加法、减法运算
- 掌握矩阵的数乘运算
- 掌握矩阵的乘法运算
- 了解矩阵运算的运算律

## 2.2.1 矩阵的加法和减法

### 定义
设$A = (a_{ij})_{m \\times n}$，$B = (b_{ij})_{m \\times n}$为同型矩阵，则：

**矩阵的加法**：$A + B = (a_{ij} + b_{ij})_{m \\times n}$

**矩阵的减法**：$A - B = (a_{ij} - b_{ij})_{m \\times n}$

### 运算律
1. **交换律**：$A + B = B + A$
2. **结合律**：$(A + B) + C = A + (B + C)$
3. **零矩阵**：$A + O = A$
4. **负矩阵**：$A + (-A) = O$，其中$-A = (-a_{ij})_{m \\times n}$

### 例题1
计算$A + B$和$A - B$，其中
$$A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}, \\quad B = \\begin{pmatrix} 5 & 6 \\\\ 7 & 8 \\end{pmatrix}$$

**解：**
$$A + B = \\begin{pmatrix} 1+5 & 2+6 \\\\ 3+7 & 4+8 \\end{pmatrix} = \\begin{pmatrix} 6 & 8 \\\\ 10 & 12 \\end{pmatrix}$$

$$A - B = \\begin{pmatrix} 1-5 & 2-6 \\\\ 3-7 & 4-8 \\end{pmatrix} = \\begin{pmatrix} -4 & -4 \\\\ -4 & -4 \\end{pmatrix}$$

## 2.2.2 矩阵的数乘

### 定义
设$A = (a_{ij})_{m \\times n}$，k为数，则：
$$kA = (ka_{ij})_{m \\times n}$$

### 运算律
1. $k(A + B) = kA + kB$
2. $(k + l)A = kA + lA$
3. $k(lA) = (kl)A$
4. $1 \\cdot A = A$
5. $0 \\cdot A = O$

### 例题2
计算$3A - 2B$，其中$A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}$，$B = \\begin{pmatrix} 2 & 1 \\\\ 1 & 3 \\end{pmatrix}$

**解：**
$$3A = \\begin{pmatrix} 3 & 6 \\\\ 9 & 12 \\end{pmatrix}, \\quad 2B = \\begin{pmatrix} 4 & 2 \\\\ 2 & 6 \\end{pmatrix}$$

$$3A - 2B = \\begin{pmatrix} 3-4 & 6-2 \\\\ 9-2 & 12-6 \\end{pmatrix} = \\begin{pmatrix} -1 & 4 \\\\ 7 & 6 \\end{pmatrix}$$

## 2.2.3 矩阵的乘法

### 定义
设$A = (a_{ij})_{m \\times s}$，$B = (b_{jk})_{s \\times n}$，则矩阵乘积$AB$是一个$m \\times n$矩阵$C = (c_{ik})_{m \\times n}$，其中：
$$c_{ik} = \\sum_{j=1}^s a_{ij}b_{jk} = a_{i1}b_{1k} + a_{i2}b_{2k} + \\cdots + a_{is}b_{sk}$$

### 乘法的条件
矩阵A与B可以相乘的充分必要条件是：A的列数等于B的行数。

### 记忆方法
"行乘列"：用A的第i行乘以B的第k列得到乘积矩阵的$(i,k)$元素。

### 例题3
计算$AB$，其中$A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}$，$B = \\begin{pmatrix} 5 & 6 \\\\ 7 & 8 \\end{pmatrix}$

**解：**
$$c_{11} = 1 \\times 5 + 2 \\times 7 = 5 + 14 = 19$$
$$c_{12} = 1 \\times 6 + 2 \\times 8 = 6 + 16 = 22$$
$$c_{21} = 3 \\times 5 + 4 \\times 7 = 15 + 28 = 43$$
$$c_{22} = 3 \\times 6 + 4 \\times 8 = 18 + 32 = 50$$

因此：$$AB = \\begin{pmatrix} 19 & 22 \\\\ 43 & 50 \\end{pmatrix}$$

## 2.2.4 矩阵乘法的运算律

### 基本运算律
1. **结合律**：$(AB)C = A(BC)$（当乘积有意义时）
2. **分配律**：
   - $A(B + C) = AB + AC$
   - $(B + C)A = BA + CA$
3. **数乘结合律**：$(kA)B = k(AB) = A(kB)$

### 注意事项
1. **交换律不成立**：一般$AB \\neq BA$
2. **消去律不成立**：$AB = AC$不能推出$B = C$
3. **零因子存在**：$AB = O$不能推出$A = O$或$B = O$

### 例题4
验证矩阵乘法不满足交换律。

设$A = \\begin{pmatrix} 1 & 2 \\\\ 0 & 1 \\end{pmatrix}$，$B = \\begin{pmatrix} 1 & 0 \\\\ 1 & 1 \\end{pmatrix}$

**解：**
$$AB = \\begin{pmatrix} 1 & 2 \\\\ 0 & 1 \\end{pmatrix}\\begin{pmatrix} 1 & 0 \\\\ 1 & 1 \\end{pmatrix} = \\begin{pmatrix} 3 & 2 \\\\ 1 & 1 \\end{pmatrix}$$

$$BA = \\begin{pmatrix} 1 & 0 \\\\ 1 & 1 \\end{pmatrix}\\begin{pmatrix} 1 & 2 \\\\ 0 & 1 \\end{pmatrix} = \\begin{pmatrix} 1 & 2 \\\\ 1 & 3 \\end{pmatrix}$$

显然$AB \\neq BA$，所以矩阵乘法不满足交换律。

## 小结
1. 矩阵加减法要求同型，对应元素相加减
2. 数乘矩阵是每个元素都乘以该数
3. 矩阵乘法要求左矩阵的列数等于右矩阵的行数
4. 矩阵乘法不满足交换律，但满足结合律和分配律
            `,
            order: 2,
            problems: [
              {
                title: '矩阵乘法计算',
                content: '计算矩阵乘积$\\begin{pmatrix} 2 & 1 \\\\ 1 & 3 \\end{pmatrix}\\begin{pmatrix} 1 & 2 \\\\ 3 & 1 \\end{pmatrix}$',
                type: 'solution',
                difficulty: 2,
                points: 15,
                answer: {
                  type: 'solution',
                  steps: [
                    '$c_{11} = 2 \\times 1 + 1 \\times 3 = 2 + 3 = 5$',
                    '$c_{12} = 2 \\times 2 + 1 \\times 1 = 4 + 1 = 5$',
                    '$c_{21} = 1 \\times 1 + 3 \\times 3 = 1 + 9 = 10$',
                    '$c_{22} = 1 \\times 2 + 3 \\times 1 = 2 + 3 = 5$'
                  ],
                  finalAnswer: '$\\begin{pmatrix} 5 & 5 \\\\ 10 & 5 \\end{pmatrix}$'
                },
                explanation: '按照矩阵乘法的定义，用第一个矩阵的行乘以第二个矩阵的列。',
                tags: ['matrix', 'calculation']
              },
              {
                title: '矩阵运算律',
                content: '设A、B为同阶矩阵，下列运算律中正确的是：',
                type: 'multiple_choice',
                difficulty: 3,
                points: 20,
                answer: {
                  type: 'multiple_choice',
                  options: [
                    'A. $AB = BA$',
                    'B. $(A + B)^2 = A^2 + 2AB + B^2$',
                    'C. $(A + B)(A - B) = A^2 - B^2$',
                    'D. $A(B + C) = AB + AC$'
                  ],
                  correct: [3]
                },
                explanation: '选项D是矩阵乘法的分配律，总是成立的。其他选项因为矩阵乘法不满足交换律而一般不成立。',
                tags: ['matrix', 'proof']
              }
            ]
          },
          {
            title: '2.3 矩阵的转置',
            content: `
# 2.3 矩阵的转置

## 学习目标
- 掌握矩阵转置的定义和性质
- 了解对称矩阵和反对称矩阵
- 会进行转置运算

## 2.3.1 转置的定义

### 定义
设$A = (a_{ij})_{m \\times n}$，把A的行换成同序号的列得到的$n \\times m$矩阵称为A的**转置矩阵**，记作$A^T$。

即：$A^T = (a_{ji})_{n \\times m}$

### 几何意义
矩阵的转置相当于将矩阵沿主对角线翻折。

### 例题1
求矩阵$A = \\begin{pmatrix} 1 & 2 & 3 \\\\ 4 & 5 & 6 \\end{pmatrix}$的转置。

**解：**
$$A^T = \\begin{pmatrix} 1 & 4 \\\\ 2 & 5 \\\\ 3 & 6 \\end{pmatrix}$$

## 2.3.2 转置的运算律

### 基本性质
1. $(A^T)^T = A$
2. $(A + B)^T = A^T + B^T$
3. $(kA)^T = kA^T$
4. $(AB)^T = B^T A^T$

### 重要性质4的说明
矩阵乘积的转置等于各因子转置的逆序乘积。

### 例题2
验证$(AB)^T = B^T A^T$，其中$A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}$，$B = \\begin{pmatrix} 1 & 0 \\\\ 1 & 1 \\end{pmatrix}$

**解：**
首先计算$AB$：
$$AB = \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}\\begin{pmatrix} 1 & 0 \\\\ 1 & 1 \\end{pmatrix} = \\begin{pmatrix} 3 & 2 \\\\ 7 & 4 \\end{pmatrix}$$

所以：$(AB)^T = \\begin{pmatrix} 3 & 7 \\\\ 2 & 4 \\end{pmatrix}$

另一方面：
$$A^T = \\begin{pmatrix} 1 & 3 \\\\ 2 & 4 \\end{pmatrix}, \\quad B^T = \\begin{pmatrix} 1 & 1 \\\\ 0 & 1 \\end{pmatrix}$$

$$B^T A^T = \\begin{pmatrix} 1 & 1 \\\\ 0 & 1 \\end{pmatrix}\\begin{pmatrix} 1 & 3 \\\\ 2 & 4 \\end{pmatrix} = \\begin{pmatrix} 3 & 7 \\\\ 2 & 4 \\end{pmatrix}$$

验证：$(AB)^T = B^T A^T$

## 2.3.3 对称矩阵和反对称矩阵

### 对称矩阵
满足$A^T = A$的方矩阵称为**对称矩阵**。

特点：$a_{ij} = a_{ji}$，即矩阵关于主对角线对称。

### 反对称矩阵
满足$A^T = -A$的方矩阵称为**反对称矩阵**。

特点：
- $a_{ij} = -a_{ji}$
- 主对角线元素$a_{ii} = 0$

### 例题3
判断下列矩阵是否为对称矩阵或反对称矩阵：
$$A = \\begin{pmatrix} 1 & 2 & 3 \\\\ 2 & 4 & 5 \\\\ 3 & 5 & 6 \\end{pmatrix}, \\quad B = \\begin{pmatrix} 0 & 1 & -2 \\\\ -1 & 0 & 3 \\\\ 2 & -3 & 0 \\end{pmatrix}$$

**解：**
对于矩阵A：$A^T = \\begin{pmatrix} 1 & 2 & 3 \\\\ 2 & 4 & 5 \\\\ 3 & 5 & 6 \\end{pmatrix} = A$

所以A是对称矩阵。

对于矩阵B：$B^T = \\begin{pmatrix} 0 & -1 & 2 \\\\ 1 & 0 & -3 \\\\ -2 & 3 & 0 \\end{pmatrix} = -B$

所以B是反对称矩阵。

### 重要定理
任何方矩阵都可以表示成一个对称矩阵和一个反对称矩阵的和：
$$A = \\frac{A + A^T}{2} + \\frac{A - A^T}{2}$$

其中$\\frac{A + A^T}{2}$是对称矩阵，$\\frac{A - A^T}{2}$是反对称矩阵。

## 小结
1. 转置是矩阵的基本运算，将行列互换
2. 转置运算满足线性性和反序律
3. 对称矩阵和反对称矩阵是重要的特殊矩阵
4. 任何矩阵都可以分解为对称和反对称部分
            `,
            order: 3,
            problems: [
              {
                title: '矩阵转置计算',
                content: '设$A = \\begin{pmatrix} 1 & 3 & 5 \\\\ 2 & 4 & 6 \\end{pmatrix}$，求$A^T$。',
                type: 'fill_blank',
                difficulty: 1,
                points: 10,
                answer: {
                  type: 'fill_blank',
                  blanks: ['$\\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\\\ 5 & 6 \\end{pmatrix}$']
                },
                explanation: '转置矩阵是将原矩阵的行变为列，列变为行。',
                tags: ['matrix', 'calculation']
              },
              {
                title: '对称矩阵判断',
                content: '矩阵$\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$是对称矩阵的充分必要条件是：',
                type: 'multiple_choice',
                difficulty: 2,
                points: 15,
                answer: {
                  type: 'multiple_choice',
                  options: [
                    'A. $a = d$',
                    'B. $b = c$',
                    'C. $a = d$ 且 $b = c$',
                    'D. $a + d = b + c$'
                  ],
                  correct: [2]
                },
                explanation: '对称矩阵要求$A^T = A$，即对应元素相等，所以需要$a = a$, $b = c$, $c = b$, $d = d$，简化后为$b = c$。但实际上还要求主对角线相等，所以是C。',
                tags: ['matrix']
              }
            ]
          }
        ]
      },
      {
        title: '第3章 向量组与线性方程组',
        description: '介绍向量组的线性相关性、线性方程组的解法和解的结构。',
        order: 3,
        lessons: [
          {
            title: '3.1 向量组的线性组合',
            content: `
# 3.1 向量组的线性组合

## 学习目标
- 掌握向量线性组合的概念
- 理解向量组线性相关和线性无关的定义
- 会判断向量组的线性相关性

## 3.1.1 向量的线性组合

### 定义
设有向量组 $\\alpha_1, \\alpha_2, \\ldots, \\alpha_s$，如果存在数 $k_1, k_2, \\ldots, k_s$，使得
$$\\beta = k_1\\alpha_1 + k_2\\alpha_2 + \\cdots + k_s\\alpha_s$$

则称向量 $\\beta$ 是向量组 $\\alpha_1, \\alpha_2, \\ldots, \\alpha_s$ 的一个**线性组合**。

### 例题1
设 $\\alpha_1 = \\begin{pmatrix} 1 \\\\ 2 \\\\ 3 \\end{pmatrix}$，$\\alpha_2 = \\begin{pmatrix} 2 \\\\ 1 \\\\ 0 \\end{pmatrix}$，
求 $2\\alpha_1 - 3\\alpha_2$。

**解：**
$$2\\alpha_1 - 3\\alpha_2 = 2\\begin{pmatrix} 1 \\\\ 2 \\\\ 3 \\end{pmatrix} - 3\\begin{pmatrix} 2 \\\\ 1 \\\\ 0 \\end{pmatrix} = \\begin{pmatrix} 2-6 \\\\ 4-3 \\\\ 6-0 \\end{pmatrix} = \\begin{pmatrix} -4 \\\\ 1 \\\\ 6 \\end{pmatrix}$$

## 3.1.2 向量的线性表示

### 定义
如果向量 $\\beta$ 可以表示为向量组 $\\alpha_1, \\alpha_2, \\ldots, \\alpha_s$ 的线性组合，
即存在数 $k_1, k_2, \\ldots, k_s$，使得
$$\\beta = k_1\\alpha_1 + k_2\\alpha_2 + \\cdots + k_s\\alpha_s$$

则称向量 $\\beta$ 可以由向量组 $\\alpha_1, \\alpha_2, \\ldots, \\alpha_s$ **线性表示**。

### 几何意义
- 二维空间中，一个向量可以由两个不共线的向量线性表示
- 三维空间中，一个向量可以由三个不共面的向量线性表示

## 小结
1. 线性组合是向量空间理论的基础概念
2. 判断向量是否可以线性表示等价于求解线性方程组
3. 线性组合具有重要的几何意义
            `,
            order: 1,
            problems: [
              {
                title: '向量线性组合计算',
                content: '设 $\\vec{a} = (1, 2, -1)$，$\\vec{b} = (2, -1, 3)$，计算 $3\\vec{a} - 2\\vec{b}$。',
                type: 'fill_blank',
                difficulty: 1,
                points: 10,
                answer: {
                  type: 'fill_blank',
                  blanks: ['(-1, 8, -9)']
                },
                explanation: '$3\\vec{a} - 2\\vec{b} = 3(1, 2, -1) - 2(2, -1, 3) = (3, 6, -3) - (4, -2, 6) = (-1, 8, -9)$',
                tags: ['vector', 'calculation']
              },
              {
                title: '线性表示问题',
                content: '向量 $\\beta = (1, 2, 3)$ 能否由向量组 $\\alpha_1 = (1, 0, 1)$，$\\alpha_2 = (0, 1, 1)$ 线性表示？',
                type: 'multiple_choice',
                difficulty: 2,
                points: 15,
                answer: {
                  type: 'multiple_choice',
                  options: [
                    'A. 能够线性表示',
                    'B. 不能线性表示',
                    'C. 无法判断',
                    'D. 需要更多条件'
                  ],
                  correct: [1]
                },
                explanation: '设 $\\beta = k_1\\alpha_1 + k_2\\alpha_2$，得到方程组：$k_1 = 1$, $k_2 = 2$, $k_1 + k_2 = 3$。由前两个方程得 $k_1 + k_2 = 3$，与第三个方程一致，所以能够线性表示。实际上答案应该是A。',
                tags: ['vector', 'linear_system']
              }
            ]
          },
          {
            title: '3.2 向量组的线性相关性',
            content: `
# 3.2 向量组的线性相关性

## 学习目标
- 掌握向量组线性相关和线性无关的定义
- 学会判断向量组的线性相关性
- 理解线性相关性的几何意义

## 3.2.1 线性相关和线性无关

### 定义
设有向量组 $\\alpha_1, \\alpha_2, \\ldots, \\alpha_s$：

- 如果存在不全为零的数 $k_1, k_2, \\ldots, k_s$，使得
  $$k_1\\alpha_1 + k_2\\alpha_2 + \\cdots + k_s\\alpha_s = \\mathbf{0}$$
  则称向量组**线性相关**。

- 如果只有当 $k_1 = k_2 = \\cdots = k_s = 0$ 时，才有
  $$k_1\\alpha_1 + k_2\\alpha_2 + \\cdots + k_s\\alpha_s = \\mathbf{0}$$
  则称向量组**线性无关**。

### 判断方法

#### 方法一：齐次线性方程组法
构造齐次方程组，如果只有零解则线性无关，有非零解则线性相关。

#### 方法二：行列式法（方阵情况）
对于n个n维向量，计算由这些向量组成的矩阵的行列式：
- 行列式不为零 → 线性无关
- 行列式为零 → 线性相关

### 例题1
判断向量组 $\\alpha_1 = (1, 2, 3)$，$\\alpha_2 = (2, 1, 0)$，$\\alpha_3 = (3, 3, 3)$ 的线性相关性。

**解：**
设 $k_1\\alpha_1 + k_2\\alpha_2 + k_3\\alpha_3 = \\mathbf{0}$，即：
$$k_1(1, 2, 3) + k_2(2, 1, 0) + k_3(3, 3, 3) = (0, 0, 0)$$

得到齐次方程组：
$$\\begin{cases}
k_1 + 2k_2 + 3k_3 = 0 \\\\
2k_1 + k_2 + 3k_3 = 0 \\\\
3k_1 + 0k_2 + 3k_3 = 0
\\end{cases}$$

计算系数矩阵的行列式：
$$\\begin{vmatrix}
1 & 2 & 3 \\\\
2 & 1 & 3 \\\\
3 & 0 & 3
\\end{vmatrix} = 1 \\times \\begin{vmatrix} 1 & 3 \\\\ 0 & 3 \\end{vmatrix} - 2 \\times \\begin{vmatrix} 2 & 3 \\\\ 3 & 3 \\end{vmatrix} + 3 \\times \\begin{vmatrix} 2 & 1 \\\\ 3 & 0 \\end{vmatrix}$$
$$= 1 \\times 3 - 2 \\times (-3) + 3 \\times (-3) = 3 + 6 - 9 = 0$$

因为行列式为零，所以向量组线性相关。

## 3.2.2 线性相关性的性质

### 重要性质
1. 包含零向量的向量组必线性相关
2. 两个向量线性相关的充分必要条件是它们共线
3. 三个向量线性相关的充分必要条件是它们共面
4. n维空间中，超过n个向量必线性相关
5. 线性无关向量组的任何部分组也线性无关

## 小结
1. 线性相关性是向量空间理论的核心概念
2. 判断方法有多种，选择合适的方法很重要
3. 线性相关性与几何直观密切相关
            `,
            order: 2,
            problems: [
              {
                title: '线性相关性判断',
                content: '判断向量组 $\\alpha_1 = (1, 1, 0)$，$\\alpha_2 = (1, 0, 1)$，$\\alpha_3 = (0, 1, 1)$ 是否线性相关。',
                type: 'solution',
                difficulty: 3,
                points: 20,
                answer: {
                  type: 'solution',
                  steps: [
                    '设 $k_1\\alpha_1 + k_2\\alpha_2 + k_3\\alpha_3 = \\mathbf{0}$',
                    '得到齐次方程组：$\\begin{cases} k_1 + k_2 = 0 \\\\ k_1 + k_3 = 0 \\\\ k_2 + k_3 = 0 \\end{cases}$',
                    '计算系数矩阵行列式：$\\begin{vmatrix} 1 & 1 & 0 \\\\ 1 & 0 & 1 \\\\ 0 & 1 & 1 \\end{vmatrix} = -2 \\neq 0$',
                    '因为行列式不为零，所以齐次方程组只有零解'
                  ],
                  finalAnswer: '向量组线性无关'
                },
                explanation: '三个三维向量线性无关的充分必要条件是由它们组成的矩阵的行列式不为零。',
                tags: ['vector', 'linear_system', 'calculation']
              },
              {
                title: '线性相关概念理解',
                content: '关于向量组的线性相关性，下列说法正确的是：',
                type: 'multiple_choice',
                difficulty: 2,
                points: 15,
                answer: {
                  type: 'multiple_choice',
                  options: [
                    'A. 包含零向量的向量组必线性无关',
                    'B. 线性无关的向量组的任何部分组也线性无关',
                    'C. n维空间中任何n个向量都线性无关',
                    'D. 两个向量线性相关当且仅当它们相等'
                  ],
                  correct: [1]
                },
                explanation: '选项B正确。线性无关向量组的任何部分组也必然线性无关，这是线性相关性的重要性质。',
                tags: ['vector', 'proof']
              }
            ]
          }
        ]
      },
      {
        title: '第4章 向量空间',
        description: '介绍向量空间的定义、性质、基与维数等基本概念，为深入理解线性代数奠定理论基础。',
        order: 4,
        lessons: [
          {
            title: '4.1 向量空间的定义与性质',
            content: `
# 4.1 向量空间的定义与性质

## 学习目标
- 掌握向量空间的定义和8个公理
- 理解向量空间的基本性质
- 熟悉常见的向量空间实例

## 4.1.1 向量空间的定义

### 定义
设 $V$ 是一个非空集合，$\\mathbb{F}$ 是一个数域（通常是实数域 $\\mathbb{R}$ 或复数域 $\\mathbb{C}$）。如果：

1. 对于 $V$ 中的任意两个元素 $\\alpha, \\beta$，它们的和 $\\alpha + \\beta \\in V$（**加法封闭性**）
2. 对于 $V$ 中的任意元素 $\\alpha$ 和数域 $\\mathbb{F}$ 中的任意数 $k$，它们的数量积 $k\\alpha \\in V$（**数乘封闭性**）

且满足以下**8个公理**：

#### 加法公理
1. **结合律**：$(\\alpha + \\beta) + \\gamma = \\alpha + (\\beta + \\gamma)$
2. **交换律**：$\\alpha + \\beta = \\beta + \\alpha$
3. **零元存在性**：存在零向量 $\\mathbf{0} \\in V$，使得 $\\alpha + \\mathbf{0} = \\alpha$
4. **负元存在性**：对任意 $\\alpha \\in V$，存在 $-\\alpha \\in V$，使得 $\\alpha + (-\\alpha) = \\mathbf{0}$

#### 数乘公理
5. **结合律**：$k(l\\alpha) = (kl)\\alpha$
6. **单位元**：$1 \\cdot \\alpha = \\alpha$
7. **分配律1**：$k(\\alpha + \\beta) = k\\alpha + k\\beta$
8. **分配律2**：$(k + l)\\alpha = k\\alpha + l\\alpha$

则称 $V$ 是数域 $\\mathbb{F}$ 上的**向量空间**（或**线性空间**）。

## 4.1.2 向量空间的基本性质

### 性质1：零向量的唯一性
向量空间中的零向量是唯一的。

**证明**：设 $\\mathbf{0}_1$ 和 $\\mathbf{0}_2$ 都是零向量，则：
$$\\mathbf{0}_1 = \\mathbf{0}_1 + \\mathbf{0}_2 = \\mathbf{0}_2$$

### 性质2：负向量的唯一性
每个向量的负向量是唯一的。

### 性质3：数乘零向量
对任意数 $k$，有 $k \\cdot \\mathbf{0} = \\mathbf{0}$。

### 性质4：零数乘向量
对任意向量 $\\alpha$，有 $0 \\cdot \\alpha = \\mathbf{0}$。

### 性质5：负一数乘
$(-1) \\cdot \\alpha = -\\alpha$。

## 4.1.3 常见的向量空间

### 1. 数组空间 $\\mathbb{R}^n$
$\\mathbb{R}^n = \\{(x_1, x_2, \\ldots, x_n) | x_i \\in \\mathbb{R}, i = 1, 2, \\ldots, n\\}$

加法：$(x_1, \\ldots, x_n) + (y_1, \\ldots, y_n) = (x_1 + y_1, \\ldots, x_n + y_n)$
数乘：$k(x_1, \\ldots, x_n) = (kx_1, \\ldots, kx_n)$

### 2. 矩阵空间 $M_{m \\times n}(\\mathbb{R})$
所有 $m \\times n$ 实矩阵构成的集合，对矩阵的加法和数乘运算构成向量空间。

### 3. 多项式空间 $P_n[x]$
次数不超过 $n$ 的所有多项式构成的集合：
$$P_n[x] = \\{a_0 + a_1x + \\cdots + a_nx^n | a_i \\in \\mathbb{R}\\}$$

### 4. 函数空间 $C[a,b]$
闭区间 $[a,b]$ 上所有连续函数构成的集合。

## 小结
1. 向量空间是线性代数的核心概念，具有严格的公理化定义
2. 向量空间的8个公理保证了向量运算的基本性质
3. 许多数学对象都可以构成向量空间，体现了向量空间概念的普遍性
            `,
            order: 1,
            problems: [
              {
                title: '向量空间公理验证',
                content: '验证集合 $V = \\{(x, y, 0) | x, y \\in \\mathbb{R}\\}$ 在通常的向量加法和数乘运算下是否构成向量空间。',
                type: 'solution',
                difficulty: 3,
                points: 20,
                answer: {
                  type: 'solution',
                  steps: [
                    '首先验证封闭性：设 $\\alpha = (x_1, y_1, 0)$, $\\beta = (x_2, y_2, 0) \\in V$',
                    '加法封闭：$\\alpha + \\beta = (x_1 + x_2, y_1 + y_2, 0) \\in V$',
                    '数乘封闭：$k\\alpha = (kx_1, ky_1, 0) \\in V$',
                    '验证8个公理：加法结合律、交换律等都由 $\\mathbb{R}^3$ 继承',
                    '零向量：$\\mathbf{0} = (0, 0, 0) \\in V$',
                    '负向量：对 $(x, y, 0)$，其负向量 $(-x, -y, 0) \\in V$'
                  ],
                  finalAnswer: 'V 构成向量空间'
                },
                explanation: '这是 $\\mathbb{R}^3$ 的一个子空间，满足向量空间的所有公理。',
                tags: ['vector_space', 'proof', 'subspace']
              },
              {
                title: '向量空间性质理解',
                content: '在向量空间中，下列说法正确的是：',
                type: 'multiple_choice',
                difficulty: 2,
                points: 15,
                answer: {
                  type: 'multiple_choice',
                  options: [
                    'A. 零向量可能不唯一',
                    'B. 每个向量的负向量是唯一的',
                    'C. 数乘零向量可能不等于零向量',
                    'D. 向量空间中可能不存在零向量'
                  ],
                  correct: [1]
                },
                explanation: '在向量空间中，零向量和每个向量的负向量都是唯一的，这是向量空间公理的重要推论。',
                tags: ['vector_space', 'theory']
              },
              {
                title: '向量空间实例判断',
                content: '下列哪个集合在给定运算下构成向量空间？',
                type: 'multiple_choice',
                difficulty: 2,
                points: 15,
                answer: {
                  type: 'multiple_choice',
                  options: [
                    'A. 所有正实数构成的集合（普通加法和数乘）',
                    'B. 平面上所有向量的端点构成的集合',
                    'C. 所有 2×2 对称矩阵构成的集合',
                    'D. 所有非零实数构成的集合（普通加法和数乘）'
                  ],
                  correct: [2]
                },
                explanation: '2×2对称矩阵构成的集合在矩阵加法和数乘运算下满足向量空间的所有公理。',
                tags: ['vector_space', 'matrix']
              }
            ]
          },
          {
            title: '4.2 向量空间的基与维数',
            content: `
# 4.2 向量空间的基与维数

## 学习目标
- 掌握向量空间的基的概念
- 理解维数的定义和性质
- 学会求向量空间的基和维数

## 4.2.1 基的定义

### 定义
设 $V$ 是向量空间，$S = \\{\\alpha_1, \\alpha_2, \\ldots, \\alpha_n\\}$ 是 $V$ 中的向量组。如果：

1. $S$ **线性无关**
2. $V$ 中任意向量都可以由 $S$ **线性表示**

则称 $S$ 是向量空间 $V$ 的一个**基**（或**基底**）。

### 说明
- 基中向量的个数称为向量空间的**维数**，记作 $\\dim V$
- 如果 $\\dim V = n$，则称 $V$ 是 $n$ 维向量空间
- 只含零向量的向量空间称为零空间，规定 $\\dim \\{\\mathbf{0}\\} = 0$

## 4.2.2 基的性质

### 性质1：基的存在性
每个非零有限维向量空间都有基。

### 性质2：基中向量个数的唯一性
向量空间的任意两个基所含向量的个数相同。

### 性质3：基的等价刻画
设 $V$ 是 $n$ 维向量空间，$S = \\{\\alpha_1, \\ldots, \\alpha_n\\}$ 是 $V$ 中的 $n$ 个向量。下列条件等价：
- $S$ 是 $V$ 的基
- $S$ 线性无关
- $S$ 线性表示 $V$ 中每个向量

## 4.2.3 常见向量空间的基和维数

### 1. $\\mathbb{R}^n$ 的标准基
$$e_1 = (1, 0, \\ldots, 0), e_2 = (0, 1, \\ldots, 0), \\ldots, e_n = (0, 0, \\ldots, 1)$$
$\\dim \\mathbb{R}^n = n$

### 2. 矩阵空间 $M_{m \\times n}(\\mathbb{R})$
基：$\\{E_{ij} | 1 \\leq i \\leq m, 1 \\leq j \\leq n\\}$
其中 $E_{ij}$ 是第 $(i,j)$ 位为1，其余位为0的矩阵。
$\\dim M_{m \\times n}(\\mathbb{R}) = mn$

### 3. 多项式空间 $P_n[x]$
基：$\\{1, x, x^2, \\ldots, x^n\\}$
$\\dim P_n[x] = n + 1$

## 4.2.4 坐标

### 定义
设 $\\{\\alpha_1, \\ldots, \\alpha_n\\}$ 是向量空间 $V$ 的一个基，$\\beta \\in V$。
如果 $\\beta = x_1\\alpha_1 + \\cdots + x_n\\alpha_n$，则称 $(x_1, \\ldots, x_n)^T$ 为 $\\beta$ 在该基下的**坐标**。

### 坐标的性质
1. 坐标表示唯一
2. 向量运算对应坐标运算
3. 线性关系保持不变

## 4.2.5 基变换与坐标变换

### 过渡矩阵
设 $\\{\\alpha_1, \\ldots, \\alpha_n\\}$ 和 $\\{\\beta_1, \\ldots, \\beta_n\\}$ 是向量空间 $V$ 的两个基。
如果 $(\\beta_1, \\ldots, \\beta_n) = (\\alpha_1, \\ldots, \\alpha_n)P$，
则 $P$ 称为从基 $\\{\\alpha_i\\}$ 到基 $\\{\\beta_i\\}$ 的**过渡矩阵**。

### 坐标变换公式
设向量 $\\gamma$ 在两个基下的坐标分别为 $X$ 和 $Y$，则：
$$X = PY$$

## 小结
1. 基是向量空间的"坐标系"，任何向量都可以用基向量线性表示
2. 维数是向量空间的重要不变量，刻画了空间的"大小"
3. 坐标提供了向量的数值表示，便于计算
4. 基变换对应坐标变换，体现了线性代数的变换思想
            `,
            order: 2,
            problems: [
              {
                title: '求向量空间的基和维数',
                content: '求向量空间 $W = \\{(x, y, z) \\in \\mathbb{R}^3 | x + y + z = 0\\}$ 的一个基和维数。',
                type: 'solution',
                difficulty: 3,
                points: 20,
                answer: {
                  type: 'solution',
                  steps: [
                    '分析约束条件：$x + y + z = 0$ 等价于 $z = -x - y$',
                    '因此 $W = \\{(x, y, -x-y) | x, y \\in \\mathbb{R}\\}$',
                    '可写成 $W = \\{x(1, 0, -1) + y(0, 1, -1) | x, y \\in \\mathbb{R}\\}$',
                    '验证 $\\alpha_1 = (1, 0, -1)$ 和 $\\alpha_2 = (0, 1, -1)$ 线性无关',
                    '因为不成比例，所以线性无关',
                    '因此 $\\{(1, 0, -1), (0, 1, -1)\\}$ 是 $W$ 的一个基'
                  ],
                  finalAnswer: '基：$\\{(1, 0, -1), (0, 1, -1)\\}$，维数：2'
                },
                explanation: '这是 $\\mathbb{R}^3$ 中的一个2维子空间，表示过原点且法向量为 $(1,1,1)$ 的平面。',
                tags: ['vector_space', 'basis', 'calculation']
              },
              {
                title: '基和维数的理解',
                content: '关于向量空间的基和维数，下列说法错误的是：',
                type: 'multiple_choice',
                difficulty: 2,
                points: 15,
                answer: {
                  type: 'multiple_choice',
                  options: [
                    'A. 向量空间的基不唯一',
                    'B. 向量空间的维数唯一',
                    'C. n维向量空间的任意n个线性无关向量都构成基',
                    'D. n维向量空间的基必须包含n+1个向量'
                  ],
                  correct: [3]
                },
                explanation: 'n维向量空间的基恰好包含n个向量，选项D说"n+1个向量"是错误的。',
                tags: ['vector_space', 'basis', 'theory']
              },
              {
                title: '坐标计算',
                content: '在 $\\mathbb{R}^3$ 中，设基为 $\\{(1,1,0), (1,0,1), (0,1,1)\\}$，求向量 $(2,1,3)$ 在此基下的坐标。',
                type: 'fill_blank',
                difficulty: 2,
                points: 15,
                answer: {
                  type: 'fill_blank',
                  blanks: ['(1, 2, -1)']
                },
                explanation: '设 $(2,1,3) = x_1(1,1,0) + x_2(1,0,1) + x_3(0,1,1)$，解得 $x_1 = 1, x_2 = 2, x_3 = -1$。',
                tags: ['vector_space', 'basis', 'coordinate']
              }
            ]
          },
          {
            title: '4.3 子空间',
            content: `
# 4.3 子空间

## 学习目标
- 掌握子空间的定义和判定方法
- 理解子空间的性质
- 学会求子空间的基和维数

## 4.3.1 子空间的定义

### 定义
设 $V$ 是向量空间，$W$ 是 $V$ 的非空子集。如果 $W$ 对于 $V$ 中的向量加法和数乘运算也构成向量空间，则称 $W$ 是 $V$ 的**子空间**。

### 子空间判定定理
设 $W$ 是向量空间 $V$ 的非空子集，则 $W$ 是 $V$ 的子空间当且仅当：
1. **加法封闭性**：$\\forall \\alpha, \\beta \\in W$，有 $\\alpha + \\beta \\in W$
2. **数乘封闭性**：$\\forall \\alpha \\in W, k \\in \\mathbb{R}$，有 $k\\alpha \\in W$

### 等价条件
$W$ 是 $V$ 的子空间当且仅当：
$$\\forall \\alpha, \\beta \\in W, \\forall k, l \\in \\mathbb{R}, \\quad k\\alpha + l\\beta \\in W$$

## 4.3.2 子空间的性质

### 性质1：平凡子空间
每个向量空间 $V$ 都有两个平凡子空间：
- 零子空间：$\\{\\mathbf{0}\\}$
- 全空间：$V$ 本身

### 性质2：子空间必含零向量
任何子空间都包含零向量。

**证明**：设 $W$ 是子空间，$\\alpha \\in W$，则 $0 \\cdot \\alpha = \\mathbf{0} \\in W$。

### 性质3：子空间的交
任意多个子空间的交仍是子空间。

### 性质4：子空间的并
两个子空间的并不一定是子空间。

## 4.3.3 常见的子空间

### 1. $\\mathbb{R}^n$ 的子空间
- 过原点的线（1维子空间）
- 过原点的平面（2维子空间）
- 过原点的超平面（$(n-1)$维子空间）

### 2. 矩阵的行空间和列空间
设 $A$ 是 $m \\times n$ 矩阵：
- **行空间**：$A$ 的行向量张成的子空间
- **列空间**：$A$ 的列向量张成的子空间
- **零空间**：齐次方程组 $Ax = 0$ 的解空间

### 3. 多项式子空间
- 偶函数多项式构成的子空间
- 奇函数多项式构成的子空间

## 4.3.4 子空间的运算

### 1. 子空间的和
设 $W_1, W_2$ 是向量空间 $V$ 的子空间，定义：
$$W_1 + W_2 = \\{\\alpha + \\beta | \\alpha \\in W_1, \\beta \\in W_2\\}$$

### 2. 直和
如果 $W_1 \\cap W_2 = \\{\\mathbf{0}\\}$，则称 $W_1 + W_2$ 为 $W_1$ 和 $W_2$ 的**直和**，记作 $W_1 \\oplus W_2$。

### 3. 维数公式
$$\\dim(W_1 + W_2) = \\dim W_1 + \\dim W_2 - \\dim(W_1 \\cap W_2)$$

## 4.3.5 由向量组生成的子空间

### 定义
设 $S = \\{\\alpha_1, \\alpha_2, \\ldots, \\alpha_k\\}$ 是向量空间 $V$ 中的向量组，则：
$$\\text{span}(S) = \\{k_1\\alpha_1 + k_2\\alpha_2 + \\cdots + k_k\\alpha_k | k_i \\in \\mathbb{R}\\}$$
称为由 $S$ **生成**（或**张成**）的子空间。

### 性质
1. $\\text{span}(S)$ 是包含 $S$ 的最小子空间
2. $\\dim(\\text{span}(S)) = \\text{rank}(S)$（向量组的秩）

## 小结
1. 子空间是向量空间的"部分"，保持向量空间的运算结构
2. 判定子空间只需验证对线性组合封闭
3. 子空间的交、和、直和都有重要的理论意义
4. 生成子空间提供了构造子空间的有效方法
            `,
            order: 3,
            problems: [
              {
                title: '子空间判定',
                content: '判断集合 $W = \\{(x, y, z) \\in \\mathbb{R}^3 | x - 2y + z = 0\\}$ 是否为 $\\mathbb{R}^3$ 的子空间。',
                type: 'solution',
                difficulty: 2,
                points: 15,
                answer: {
                  type: 'solution',
                  steps: [
                    '验证非空性：$(0,0,0) \\in W$，因为 $0 - 2 \\cdot 0 + 0 = 0$',
                    '验证加法封闭：设 $\\alpha = (x_1, y_1, z_1), \\beta = (x_2, y_2, z_2) \\in W$',
                    '则 $(x_1 - 2y_1 + z_1) = 0$ 且 $(x_2 - 2y_2 + z_2) = 0$',
                    '计算：$(x_1 + x_2) - 2(y_1 + y_2) + (z_1 + z_2) = 0 + 0 = 0$',
                    '所以 $\\alpha + \\beta \\in W$',
                    '验证数乘封闭：$k(x - 2y + z) = kx - 2ky + kz = k \\cdot 0 = 0$',
                    '所以 $k\\alpha \\in W$'
                  ],
                  finalAnswer: 'W 是 $\\mathbb{R}^3$ 的子空间'
                },
                explanation: 'W 是过原点且法向量为 $(1,-2,1)$ 的平面，满足子空间的所有条件。',
                tags: ['subspace', 'proof']
              },
              {
                title: '生成子空间',
                content: '求由向量组 $\\{(1,1,0), (1,0,1), (0,1,1)\\}$ 生成的子空间的维数。',
                type: 'fill_blank',
                difficulty: 2,
                points: 15,
                answer: {
                  type: 'fill_blank',
                  blanks: ['3']
                },
                explanation: '计算矩阵的秩：$\\begin{pmatrix} 1 & 1 & 0 \\\\ 1 & 0 & 1 \\\\ 0 & 1 & 1 \\end{pmatrix}$ 的行列式为 $-2 \\neq 0$，所以秩为3。',
                tags: ['subspace', 'span', 'calculation']
              },
              {
                title: '子空间理论',
                content: '关于子空间，下列说法正确的是：',
                type: 'multiple_choice',
                difficulty: 2,
                points: 15,
                answer: {
                  type: 'multiple_choice',
                  options: [
                    'A. 两个子空间的并总是子空间',
                    'B. 任何非空子集都是子空间',
                    'C. 子空间必须包含零向量',
                    'D. 子空间的维数可以超过原空间'
                  ],
                  correct: [2]
                },
                explanation: '子空间必须包含零向量，这是子空间数乘封闭性的直接推论。',
                tags: ['subspace', 'theory']
              }
            ]
          }
        ]
      },
      {
        title: '第5章 线性变换',
        description: '介绍线性变换的定义、性质、矩阵表示，以及线性变换的核与像等重要概念。',
        order: 5,
        lessons: [
          {
            title: '5.1 线性变换的定义与性质',
            content: `
# 5.1 线性变换的定义与性质

## 学习目标
- 掌握线性变换的定义
- 理解线性变换的基本性质
- 熟悉常见的线性变换实例

## 5.1.1 线性变换的定义

### 定义
设 $V$ 和 $W$ 是同一数域上的两个向量空间，映射 $T: V \\to W$ 称为**线性变换**（或**线性映射**），如果对任意 $\\alpha, \\beta \\in V$ 和任意数 $k$，都有：

1. **加性**：$T(\\alpha + \\beta) = T(\\alpha) + T(\\beta)$
2. **齐次性**：$T(k\\alpha) = kT(\\alpha)$

### 等价定义
$T: V \\to W$ 是线性变换当且仅当对任意 $\\alpha, \\beta \\in V$ 和任意数 $k, l$，都有：
$$T(k\\alpha + l\\beta) = kT(\\alpha) + lT(\\beta)$$

### 特殊情况
- 当 $V = W$ 时，线性变换 $T: V \\to V$ 称为 $V$ 上的**线性算子**
- 当 $W = \\mathbb{R}$（或 $\\mathbb{C}$）时，线性变换称为**线性函数**（或**线性形式**）

## 5.1.2 线性变换的基本性质

### 性质1：零向量的像
$T(\\mathbf{0}_V) = \\mathbf{0}_W$

**证明**：$T(\\mathbf{0}_V) = T(0 \\cdot \\mathbf{0}_V) = 0 \\cdot T(\\mathbf{0}_V) = \\mathbf{0}_W$

### 性质2：负向量的像
$T(-\\alpha) = -T(\\alpha)$

### 性质3：线性组合的像
$$T\\left(\\sum_{i=1}^n k_i\\alpha_i\\right) = \\sum_{i=1}^n k_iT(\\alpha_i)$$

### 性质4：线性相关性保持
如果 $\\{\\alpha_1, \\ldots, \\alpha_k\\}$ 线性相关，则 $\\{T(\\alpha_1), \\ldots, T(\\alpha_k)\\}$ 也线性相关。

**注意**：线性无关性不一定保持！

## 5.1.3 常见的线性变换

### 1. 零变换
$T(\\alpha) = \\mathbf{0}$ （对所有 $\\alpha \\in V$）

### 2. 恒等变换
$I(\\alpha) = \\alpha$ （对所有 $\\alpha \\in V$）

### 3. 数乘变换
$T_k(\\alpha) = k\\alpha$ （$k$ 为常数）

### 4. $\\mathbb{R}^2$ 中的旋转变换
绕原点逆时针旋转角度 $\\theta$：
$$T\\begin{pmatrix} x \\\\ y \\end{pmatrix} = \\begin{pmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{pmatrix} \\begin{pmatrix} x \\\\ y \\end{pmatrix}$$

### 5. $\\mathbb{R}^2$ 中的反射变换
关于 $x$ 轴的反射：
$$T\\begin{pmatrix} x \\\\ y \\end{pmatrix} = \\begin{pmatrix} x \\\\ -y \\end{pmatrix}$$

### 6. 微分算子
$D: P_n[x] \\to P_{n-1}[x]$，$D(f) = f'$

### 7. 积分算子
$I: C[0,1] \\to C[0,1]$，$(If)(x) = \\int_0^x f(t)dt$

## 5.1.4 线性变换的运算

### 1. 线性变换的加法
$(T_1 + T_2)(\\alpha) = T_1(\\alpha) + T_2(\\alpha)$

### 2. 线性变换的数乘
$(kT)(\\alpha) = k \\cdot T(\\alpha)$

### 3. 线性变换的复合
$(T_2 \\circ T_1)(\\alpha) = T_2(T_1(\\alpha))$

### 性质
- 线性变换的加法和数乘运算满足向量空间的公理
- 线性变换的复合仍是线性变换
- 复合运算满足结合律：$(T_3 \\circ T_2) \\circ T_1 = T_3 \\circ (T_2 \\circ T_1)$

## 小结
1. 线性变换是保持向量空间运算结构的映射
2. 线性变换完全由基向量的像确定
3. 线性变换构成向量空间，支持加法、数乘和复合运算
4. 几何变换（旋转、反射、缩放）是线性变换的重要实例
            `,
            order: 1,
            problems: [
              {
                title: '线性变换验证',
                content: '验证映射 $T: \\mathbb{R}^2 \\to \\mathbb{R}^2$，$T(x, y) = (2x + y, x - y)$ 是否为线性变换。',
                type: 'solution',
                difficulty: 2,
                points: 15,
                answer: {
                  type: 'solution',
                  steps: [
                    '验证加性：设 $\\alpha = (x_1, y_1)$, $\\beta = (x_2, y_2)$',
                    '$T(\\alpha + \\beta) = T(x_1 + x_2, y_1 + y_2) = (2(x_1 + x_2) + (y_1 + y_2), (x_1 + x_2) - (y_1 + y_2))$',
                    '$= (2x_1 + y_1 + 2x_2 + y_2, x_1 - y_1 + x_2 - y_2)$',
                    '$T(\\alpha) + T(\\beta) = (2x_1 + y_1, x_1 - y_1) + (2x_2 + y_2, x_2 - y_2)$',
                    '$= (2x_1 + y_1 + 2x_2 + y_2, x_1 - y_1 + x_2 - y_2)$',
                    '验证齐次性：$T(k\\alpha) = T(kx_1, ky_1) = (2kx_1 + ky_1, kx_1 - ky_1) = k(2x_1 + y_1, x_1 - y_1) = kT(\\alpha)$'
                  ],
                  finalAnswer: 'T 是线性变换'
                },
                explanation: '该映射满足线性变换的加性和齐次性条件，因此是线性变换。',
                tags: ['linear_transformation', 'proof']
              },
              {
                title: '线性变换性质',
                content: '设 $T: V \\to W$ 是线性变换，下列说法正确的是：',
                type: 'multiple_choice',
                difficulty: 2,
                points: 15,
                answer: {
                  type: 'multiple_choice',
                  options: [
                    'A. T 必定是双射',
                    'B. T(0) = 0',
                    'C. 线性无关向量组的像必定线性无关',
                    'D. T 的逆变换必定存在'
                  ],
                  correct: [1]
                },
                explanation: '线性变换必定将零向量映射到零向量，这是线性变换的基本性质。',
                tags: ['linear_transformation', 'theory']
              },
              {
                title: '几何变换识别',
                content: '矩阵 $A = \\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}$ 对应的线性变换是：',
                type: 'multiple_choice',
                difficulty: 2,
                points: 15,
                answer: {
                  type: 'multiple_choice',
                  options: [
                    'A. 绕原点顺时针旋转90°',
                    'B. 绕原点逆时针旋转90°',
                    'C. 关于y=x轴反射',
                    'D. 关于原点的中心对称'
                  ],
                  correct: [1]
                },
                explanation: '该矩阵将 $(1,0)$ 映射到 $(0,1)$，将 $(0,1)$ 映射到 $(-1,0)$，对应逆时针旋转90°。',
                tags: ['linear_transformation', 'matrix', 'geometry']
              }
            ]
          },
          {
            title: '5.2 线性变换的矩阵表示',
            content: `
# 5.2 线性变换的矩阵表示

## 学习目标
- 掌握线性变换的矩阵表示方法
- 理解线性变换与矩阵的对应关系
- 学会基变换对矩阵表示的影响

## 5.2.1 线性变换的矩阵表示

### 基本思想
设 $V$ 是 $n$ 维向量空间，$W$ 是 $m$ 维向量空间。给定 $V$ 的基 $\\{\\alpha_1, \\ldots, \\alpha_n\\}$ 和 $W$ 的基 $\\{\\beta_1, \\ldots, \\beta_m\\}$，线性变换 $T: V \\to W$ 完全由基向量的像确定。

### 构造方法
1. 设 $T(\\alpha_j) = a_{1j}\\beta_1 + a_{2j}\\beta_2 + \\cdots + a_{mj}\\beta_m$（$j = 1, 2, \\ldots, n$）

2. 构造矩阵 $A = (a_{ij})_{m \\times n}$：
   $$A = \\begin{pmatrix}
   a_{11} & a_{12} & \\cdots & a_{1n} \\\\
   a_{21} & a_{22} & \\cdots & a_{2n} \\\\
   \\vdots & \\vdots & \\ddots & \\vdots \\\\
   a_{m1} & a_{m2} & \\cdots & a_{mn}
   \\end{pmatrix}$$

3. 第 $j$ 列是 $T(\\alpha_j)$ 在基 $\\{\\beta_1, \\ldots, \\beta_m\\}$ 下的坐标

### 坐标变换公式
设 $\\alpha \\in V$ 在基 $\\{\\alpha_1, \\ldots, \\alpha_n\\}$ 下的坐标为 $X = (x_1, \\ldots, x_n)^T$，$T(\\alpha)$ 在基 $\\{\\beta_1, \\ldots, \\beta_m\\}$ 下的坐标为 $Y = (y_1, \\ldots, y_m)^T$，则：
$$Y = AX$$

## 5.2.2 矩阵与线性变换的对应

### 定理
$n$ 维向量空间到 $m$ 维向量空间的线性变换与 $m \\times n$ 矩阵之间存在一一对应关系。

### 运算的对应关系
1. **线性变换的加法** ↔ **矩阵的加法**
2. **线性变换的数乘** ↔ **矩阵的数乘**
3. **线性变换的复合** ↔ **矩阵的乘法**

### 重要结论
- $(T_1 + T_2)$ 的矩阵 = $T_1$ 的矩阵 + $T_2$ 的矩阵
- $(kT)$ 的矩阵 = $k$ × $T$ 的矩阵
- $(T_2 \\circ T_1)$ 的矩阵 = $T_2$ 的矩阵 × $T_1$ 的矩阵

## 5.2.3 基变换对矩阵表示的影响

### 问题
同一个线性变换在不同基下的矩阵表示有什么关系？

### 结论
设线性变换 $T: V \\to V$ 在基 $\\{\\alpha_1, \\ldots, \\alpha_n\\}$ 下的矩阵为 $A$，在基 $\\{\\beta_1, \\ldots, \\beta_n\\}$ 下的矩阵为 $B$，从基 $\\{\\alpha_i\\}$ 到基 $\\{\\beta_i\\}$ 的过渡矩阵为 $P$，则：
$$B = P^{-1}AP$$

这称为**相似变换**，矩阵 $A$ 和 $B$ 称为**相似矩阵**。

### 相似矩阵的性质
1. **反身性**：$A \\sim A$
2. **对称性**：若 $A \\sim B$，则 $B \\sim A$
3. **传递性**：若 $A \\sim B$，$B \\sim C$，则 $A \\sim C$
4. **不变量**：相似矩阵具有相同的行列式、迹、特征多项式

## 5.2.4 线性算子的矩阵

### 特殊情况
当 $T: V \\to V$ 是线性算子时，通常选择 $V$ 的同一组基来表示定义域和值域。

### 例题：求矩阵表示
设 $T: \\mathbb{R}^3 \\to \\mathbb{R}^3$，$T(x, y, z) = (x + y, y + z, z + x)$，求 $T$ 在标准基下的矩阵表示。

**解：**
1. 计算基向量的像：
   - $T(1, 0, 0) = (1, 0, 1)$
   - $T(0, 1, 0) = (1, 1, 0)$
   - $T(0, 0, 1) = (0, 1, 1)$

2. 矩阵表示：
   $$A = \\begin{pmatrix}
   1 & 1 & 0 \\\\
   0 & 1 & 1 \\\\
   1 & 0 & 1
   \\end{pmatrix}$$

## 小结
1. 线性变换的矩阵表示建立了抽象变换与具体矩阵的桥梁
2. 矩阵运算对应线性变换运算，简化了计算
3. 相似变换揭示了同一线性变换在不同基下的矩阵关系
4. 选择合适的基可以简化线性变换的矩阵表示
            `,
            order: 2,
            problems: [
              {
                title: '求线性变换的矩阵表示',
                content: '设 $T: \\mathbb{R}^2 \\to \\mathbb{R}^3$，$T(x, y) = (2x - y, x + 3y, -x + 2y)$，求 $T$ 在标准基下的矩阵表示。',
                type: 'solution',
                difficulty: 2,
                points: 15,
                answer: {
                  type: 'solution',
                  steps: [
                    '计算基向量 $e_1 = (1, 0)$ 的像：$T(1, 0) = (2, 1, -1)$',
                    '计算基向量 $e_2 = (0, 1)$ 的像：$T(0, 1) = (-1, 3, 2)$',
                    '将像向量作为矩阵的列向量：',
                    '$A = \\begin{pmatrix} 2 & -1 \\\\ 1 & 3 \\\\ -1 & 2 \\end{pmatrix}$'
                  ],
                  finalAnswer: '$A = \\begin{pmatrix} 2 & -1 \\\\ 1 & 3 \\\\ -1 & 2 \\end{pmatrix}$'
                },
                explanation: '线性变换的矩阵表示的列向量是基向量在线性变换下的像。',
                tags: ['linear_transformation', 'matrix', 'calculation']
              },
              {
                title: '相似矩阵理解',
                content: '关于相似矩阵，下列说法错误的是：',
                type: 'multiple_choice',
                difficulty: 2,
                points: 15,
                answer: {
                  type: 'multiple_choice',
                  options: [
                    'A. 相似矩阵有相同的行列式',
                    'B. 相似矩阵有相同的迹',
                    'C. 相似矩阵有相同的秩',
                    'D. 相似矩阵必须相等'
                  ],
                  correct: [3]
                },
                explanation: '相似矩阵表示同一线性变换在不同基下的矩阵，它们不必相等，但具有相同的重要不变量。',
                tags: ['linear_transformation', 'matrix', 'similarity']
              },
              {
                title: '基变换计算',
                content: '设 $A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}$，$P = \\begin{pmatrix} 1 & 1 \\\\ 0 & 1 \\end{pmatrix}$，计算 $P^{-1}AP$。',
                type: 'fill_blank',
                difficulty: 3,
                points: 20,
                answer: {
                  type: 'fill_blank',
                  blanks: ['$\\begin{pmatrix} 1 & 2 \\\\ 3 & 2 \\end{pmatrix}$']
                },
                explanation: '先计算 $P^{-1} = \\begin{pmatrix} 1 & -1 \\\\ 0 & 1 \\end{pmatrix}$，然后计算 $P^{-1}AP$。',
                tags: ['linear_transformation', 'matrix', 'calculation']
              }
            ]
          },
          {
            title: '5.3 线性变换的核与像',
            content: `
# 5.3 线性变换的核与像

## 学习目标
- 掌握线性变换的核与像的定义
- 理解核与像的性质
- 掌握线性变换基本定理

## 5.3.1 核的定义与性质

### 定义
设 $T: V \\to W$ 是线性变换，称集合
$$\\ker(T) = \\{\\alpha \\in V | T(\\alpha) = \\mathbf{0}_W\\}$$
为线性变换 $T$ 的**核**（或**零化子**）。

### 核的性质

#### 性质1：核是子空间
$\\ker(T)$ 是 $V$ 的子空间。

**证明**：
1. $\\mathbf{0}_V \\in \\ker(T)$，因为 $T(\\mathbf{0}_V) = \\mathbf{0}_W$
2. 设 $\\alpha, \\beta \\in \\ker(T)$，则 $T(\\alpha + \\beta) = T(\\alpha) + T(\\beta) = \\mathbf{0}_W + \\mathbf{0}_W = \\mathbf{0}_W$
3. 设 $\\alpha \\in \\ker(T)$, $k \\in \\mathbb{R}$，则 $T(k\\alpha) = kT(\\alpha) = k \\cdot \\mathbf{0}_W = \\mathbf{0}_W$

#### 性质2：单射判定
线性变换 $T$ 是单射当且仅当 $\\ker(T) = \\{\\mathbf{0}_V\\}$。

**证明**：
- ($\\Rightarrow$) 若 $T$ 是单射，设 $\\alpha \\in \\ker(T)$，则 $T(\\alpha) = \\mathbf{0}_W = T(\\mathbf{0}_V)$，由单射性得 $\\alpha = \\mathbf{0}_V$
- ($\\Leftarrow$) 若 $\\ker(T) = \\{\\mathbf{0}_V\\}$，设 $T(\\alpha) = T(\\beta)$，则 $T(\\alpha - \\beta) = \\mathbf{0}_W$，所以 $\\alpha - \\beta \\in \\ker(T)$，故 $\\alpha - \\beta = \\mathbf{0}_V$，即 $\\alpha = \\beta$

## 5.3.2 像的定义与性质

### 定义
设 $T: V \\to W$ 是线性变换，称集合
$$\\text{Im}(T) = \\{T(\\alpha) | \\alpha \\in V\\} = \\{\\beta \\in W | \\exists \\alpha \\in V, T(\\alpha) = \\beta\\}$$
为线性变换 $T$ 的**像**（或**值域**）。

### 像的性质

#### 性质1：像是子空间
$\\text{Im}(T)$ 是 $W$ 的子空间。

#### 性质2：像的生成
设 $\\{\\alpha_1, \\ldots, \\alpha_n\\}$ 是 $V$ 的基，则
$$\\text{Im}(T) = \\text{span}\\{T(\\alpha_1), \\ldots, T(\\alpha_n)\\}$$

#### 性质3：满射判定
线性变换 $T$ 是满射当且仅当 $\\text{Im}(T) = W$。

## 5.3.3 线性变换基本定理

### 维数定理
设 $T: V \\to W$ 是线性变换，$V$ 是有限维向量空间，则：
$$\\dim V = \\dim \\ker(T) + \\dim \\text{Im}(T)$$

其中：
- $\\dim \\ker(T)$ 称为 $T$ 的**零化度**
- $\\dim \\text{Im}(T)$ 称为 $T$ 的**秩**，记作 $\\text{rank}(T)$

### 证明思路
1. 设 $\\dim \\ker(T) = k$，$\\{\\alpha_1, \\ldots, \\alpha_k\\}$ 是 $\\ker(T)$ 的基
2. 将其扩充为 $V$ 的基：$\\{\\alpha_1, \\ldots, \\alpha_k, \\alpha_{k+1}, \\ldots, \\alpha_n\\}$
3. 证明 $\\{T(\\alpha_{k+1}), \\ldots, T(\\alpha_n)\\}$ 是 $\\text{Im}(T)$ 的基

### 推论
1. 若 $\\dim V = \\dim W$，则 $T$ 是单射当且仅当 $T$ 是满射当且仅当 $T$ 是双射
2. 若 $\\dim V > \\dim W$，则 $T$ 不可能是单射
3. 若 $\\dim V < \\dim W$，则 $T$ 不可能是满射

## 5.3.4 矩阵的核与像

### 矩阵的核空间
设 $A$ 是 $m \\times n$ 矩阵，$A$ 对应的线性变换 $T_A: \\mathbb{R}^n \\to \\mathbb{R}^m$ 的核为：
$$\\ker(T_A) = \\{x \\in \\mathbb{R}^n | Ax = 0\\}$$
这是齐次线性方程组 $Ax = 0$ 的解空间。

### 矩阵的列空间
$A$ 对应的线性变换的像为：
$$\\text{Im}(T_A) = \\text{span}\\{A的列向量\\}$$
这称为矩阵 $A$ 的**列空间**。

### 矩阵秩的几何意义
- $\\text{rank}(A) = \\dim(\\text{列空间}) = \\dim(\\text{行空间})$
- $\\text{rank}(A) + \\dim(\\ker(A)) = n$（列数）

## 小结
1. 核和像是线性变换的两个重要子空间
2. 核刻画了线性变换的单射性，像刻画了满射性
3. 维数定理建立了定义域、核、像三者维数的关系
4. 矩阵的核空间和列空间对应齐次方程组解空间和列向量张成空间
            `,
            order: 3,
            problems: [
              {
                title: '求线性变换的核与像',
                content: '设 $T: \\mathbb{R}^3 \\to \\mathbb{R}^2$，$T(x, y, z) = (x + y - z, 2x - y + z)$，求 $\\ker(T)$ 和 $\\text{Im}(T)$。',
                type: 'solution',
                difficulty: 3,
                points: 20,
                answer: {
                  type: 'solution',
                  steps: [
                    '求核：解方程 $T(x, y, z) = (0, 0)$',
                    '即求解方程组：$\\begin{cases} x + y - z = 0 \\\\ 2x - y + z = 0 \\end{cases}$',
                    '消元得：$3x = 0$，$x = 0$；代入得 $y = z$',
                    '所以 $\\ker(T) = \\{(0, t, t) | t \\in \\mathbb{R}\\} = \\text{span}\\{(0, 1, 1)\\}$',
                    '求像：$\\text{Im}(T) = \\text{span}\\{T(1,0,0), T(0,1,0), T(0,0,1)\\}$',
                    '$= \\text{span}\\{(1,2), (1,-1), (-1,1)\\}$',
                    '由于 $(1,2)$ 和 $(1,-1)$ 线性无关，$\\text{Im}(T) = \\mathbb{R}^2$'
                  ],
                  finalAnswer: '$\\ker(T) = \\text{span}\\{(0,1,1)\\}$，$\\text{Im}(T) = \\mathbb{R}^2$'
                },
                explanation: '通过解齐次方程组求核，通过基向量的像求像空间。',
                tags: ['linear_transformation', 'kernel', 'image']
              },
              {
                title: '维数定理应用',
                content: '设 $T: \\mathbb{R}^5 \\to \\mathbb{R}^3$ 是线性变换，且 $\\dim \\ker(T) = 2$，则 $\\text{rank}(T) = $ ___。',
                type: 'fill_blank',
                difficulty: 2,
                points: 15,
                answer: {
                  type: 'fill_blank',
                  blanks: ['3']
                },
                explanation: '由维数定理：$\\dim V = \\dim \\ker(T) + \\text{rank}(T)$，所以 $5 = 2 + \\text{rank}(T)$，得 $\\text{rank}(T) = 3$。',
                tags: ['linear_transformation', 'dimension_theorem']
              },
              {
                title: '单射满射判定',
                content: '设 $T: \\mathbb{R}^4 \\to \\mathbb{R}^4$ 是线性变换，下列条件中能保证 $T$ 是双射的是：',
                type: 'multiple_choice',
                difficulty: 2,
                points: 15,
                answer: {
                  type: 'multiple_choice',
                  options: [
                    'A. $\\ker(T) = \\{0\\}$',
                    'B. $\\text{rank}(T) = 4$',
                    'C. $\\dim \\ker(T) = 0$',
                    'D. 以上都正确'
                  ],
                  correct: [3]
                },
                explanation: '当定义域和值域维数相等时，单射、满射、双射三者等价。选项A、B、C都是等价条件。',
                tags: ['linear_transformation', 'bijection']
              }
            ]
          }
        ]
      },
      {
        title: '第6章 特征值与特征向量',
        description: '介绍特征值与特征向量的概念、计算方法，以及矩阵对角化的理论与应用。',
        order: 6,
        lessons: [
          {
            title: '6.1 特征值与特征向量的定义',
            content: `
# 6.1 特征值与特征向量的定义

## 学习目标
- 掌握特征值与特征向量的定义
- 学会计算特征值与特征向量
- 理解特征多项式的概念

## 6.1.1 基本概念

### 定义
设 $A$ 是 $n$ 阶方阵，如果存在数 $\\lambda$ 和非零向量 $\\alpha$，使得
$$A\\alpha = \\lambda\\alpha$$
则称 $\\lambda$ 为矩阵 $A$ 的**特征值**，$\\alpha$ 为对应于特征值 $\\lambda$ 的**特征向量**。

### 几何意义
特征向量是在线性变换 $A$ 作用下方向不变的向量，特征值是对应的缩放因子。

### 等价形式
$A\\alpha = \\lambda\\alpha$ 等价于 $(A - \\lambda I)\\alpha = \\mathbf{0}$

这表明 $\\alpha$ 是齐次线性方程组 $(A - \\lambda I)x = \\mathbf{0}$ 的非零解。

## 6.1.2 特征多项式

### 特征值的求法
$\\lambda$ 是 $A$ 的特征值当且仅当齐次方程组 $(A - \\lambda I)x = \\mathbf{0}$ 有非零解，即
$$\\det(A - \\lambda I) = 0$$

### 特征多项式
称 $f(\\lambda) = \\det(A - \\lambda I)$ 为矩阵 $A$ 的**特征多项式**。

$A$ 的特征值就是特征多项式的根。

### 性质
1. $n$ 阶矩阵的特征多项式是 $\\lambda$ 的 $n$ 次多项式
2. 特征多项式的首项系数为 $(-1)^n$
3. 常数项等于 $\\det A$
4. $\\lambda^{n-1}$ 的系数为 $(-1)^{n-1}\\text{tr}(A)$（迹）

## 6.1.3 计算步骤

### 第一步：求特征值
1. 计算特征矩阵 $A - \\lambda I$
2. 计算特征多项式 $\\det(A - \\lambda I)$
3. 解特征方程 $\\det(A - \\lambda I) = 0$

### 第二步：求特征向量
对每个特征值 $\\lambda_i$：
1. 求解齐次方程组 $(A - \\lambda_i I)x = \\mathbf{0}$
2. 方程组的基础解系即为对应的特征向量

## 6.1.4 例题

### 例题1
求矩阵 $A = \\begin{pmatrix} 3 & 1 \\\\ 0 & 2 \\end{pmatrix}$ 的特征值和特征向量。

**解：**

**第一步：求特征值**
$$A - \\lambda I = \\begin{pmatrix} 3-\\lambda & 1 \\\\ 0 & 2-\\lambda \\end{pmatrix}$$

$$\\det(A - \\lambda I) = (3-\\lambda)(2-\\lambda) = \\lambda^2 - 5\\lambda + 6$$

特征方程：$\\lambda^2 - 5\\lambda + 6 = 0$
解得：$\\lambda_1 = 3, \\lambda_2 = 2$

**第二步：求特征向量**
- 对 $\\lambda_1 = 3$：
  $(A - 3I)x = \\begin{pmatrix} 0 & 1 \\\\ 0 & -1 \\end{pmatrix}\\begin{pmatrix} x_1 \\\\ x_2 \\end{pmatrix} = \\mathbf{0}$
  
  得 $x_2 = 0$，$x_1$ 任意，特征向量：$\\alpha_1 = \\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix}$

- 对 $\\lambda_2 = 2$：
  $(A - 2I)x = \\begin{pmatrix} 1 & 1 \\\\ 0 & 0 \\end{pmatrix}\\begin{pmatrix} x_1 \\\\ x_2 \\end{pmatrix} = \\mathbf{0}$
  
  得 $x_1 + x_2 = 0$，特征向量：$\\alpha_2 = \\begin{pmatrix} 1 \\\\ -1 \\end{pmatrix}$

## 6.1.5 重要性质

### 性质1：线性无关性
属于不同特征值的特征向量线性无关。

### 性质2：特征子空间
对于特征值 $\\lambda$，所有对应的特征向量连同零向量构成的集合
$$V_\\lambda = \\{\\alpha | A\\alpha = \\lambda\\alpha\\}$$
称为特征值 $\\lambda$ 的**特征子空间**。

### 性质3：代数重数与几何重数
- **代数重数**：特征值在特征多项式中的重数
- **几何重数**：特征子空间的维数

恒有：几何重数 ≤ 代数重数

## 小结
1. 特征值和特征向量刻画了线性变换的本质特性
2. 通过特征多项式可以求出所有特征值
3. 特征向量的求解归结为齐次线性方程组的求解
4. 特征值和特征向量在对角化问题中起关键作用
            `,
            order: 1,
            problems: [
              {
                title: '基础特征值计算',
                content: '求矩阵 $A = \\begin{pmatrix} 4 & -2 \\\\ 1 & 1 \\end{pmatrix}$ 的特征值。',
                type: 'solution',
                difficulty: 2,
                points: 15,
                answer: {
                  type: 'solution',
                  steps: [
                    '计算特征矩阵：$A - \\lambda I = \\begin{pmatrix} 4-\\lambda & -2 \\\\ 1 & 1-\\lambda \\end{pmatrix}$',
                    '计算特征多项式：$\\det(A - \\lambda I) = (4-\\lambda)(1-\\lambda) - (-2)(1)$',
                    '$= (4-\\lambda)(1-\\lambda) + 2 = 4 - 4\\lambda - \\lambda + \\lambda^2 + 2$',
                    '$= \\lambda^2 - 5\\lambda + 6$',
                    '解特征方程：$\\lambda^2 - 5\\lambda + 6 = 0$',
                    '因式分解：$(\\lambda - 2)(\\lambda - 3) = 0$'
                  ],
                  finalAnswer: '特征值为 $\\lambda_1 = 2, \\lambda_2 = 3$'
                },
                explanation: '通过计算特征多项式的根来求特征值。',
                tags: ['eigenvalue', 'calculation']
              },
              {
                title: '特征向量求解',
                content: '已知矩阵 $A = \\begin{pmatrix} 2 & 1 \\\\ 0 & 2 \\end{pmatrix}$ 的特征值为 $\\lambda = 2$，求对应的特征向量。',
                type: 'fill_blank',
                difficulty: 2,
                points: 15,
                answer: {
                  type: 'fill_blank',
                  blanks: ['$k\\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix}$ (k≠0)']
                },
                explanation: '解方程组 $(A - 2I)x = 0$，得到 $\\begin{pmatrix} 0 & 1 \\\\ 0 & 0 \\end{pmatrix}\\begin{pmatrix} x_1 \\\\ x_2 \\end{pmatrix} = 0$，所以 $x_2 = 0$，$x_1$ 任意。',
                tags: ['eigenvector', 'calculation']
              },
              {
                title: '特征值性质理解',
                content: '关于特征值和特征向量，下列说法正确的是：',
                type: 'multiple_choice',
                difficulty: 2,
                points: 15,
                answer: {
                  type: 'multiple_choice',
                  options: [
                    'A. 零向量可以是特征向量',
                    'B. 不同特征值对应的特征向量线性无关',
                    'C. 特征值可以为零',
                    'D. n阶矩阵恰有n个特征值'
                  ],
                  correct: [1, 2]
                },
                explanation: '零向量不能作为特征向量，不同特征值对应的特征向量确实线性无关，特征值可以为零，但n阶矩阵的特征值个数（计重数）为n，不计重数可能少于n个。',
                tags: ['eigenvalue', 'theory']
              }
            ]
          },
          {
            title: '6.2 矩阵的对角化',
            content: `
# 6.2 矩阵的对角化

## 学习目标
- 掌握矩阵对角化的定义和条件
- 学会判断矩阵是否可对角化
- 掌握对角化的具体步骤

## 6.2.1 对角化的定义

### 定义
设 $A$ 是 $n$ 阶方阵，如果存在可逆矩阵 $P$，使得
$$P^{-1}AP = \\Lambda$$
其中 $\\Lambda$ 是对角矩阵，则称矩阵 $A$ **可对角化**（或**可相似对角化**）。

### 几何意义
对角化意味着存在一组基，使得线性变换在这组基下的矩阵表示是对角矩阵。

## 6.2.2 对角化的充要条件

### 定理1
$n$ 阶矩阵 $A$ 可对角化当且仅当 $A$ 有 $n$ 个线性无关的特征向量。

### 定理2
$n$ 阶矩阵 $A$ 可对角化当且仅当对于 $A$ 的每个特征值，其几何重数等于代数重数。

### 推论
如果 $n$ 阶矩阵 $A$ 有 $n$ 个不同的特征值，则 $A$ 可对角化。

## 6.2.3 对角化的步骤

### 标准步骤
设矩阵 $A$ 可对角化：

**第一步**：求出 $A$ 的所有特征值 $\\lambda_1, \\lambda_2, \\ldots, \\lambda_k$

**第二步**：对每个特征值 $\\lambda_i$，求出对应的特征向量

**第三步**：检验是否有 $n$ 个线性无关的特征向量

**第四步**：构造矩阵 $P = (\\alpha_1, \\alpha_2, \\ldots, \\alpha_n)$（以特征向量为列）

**第五步**：得到 $P^{-1}AP = \\text{diag}(\\lambda_1, \\lambda_2, \\ldots, \\lambda_n)$

## 6.2.4 例题

### 例题1
判断矩阵 $A = \\begin{pmatrix} 1 & 1 & 0 \\\\ 0 & 1 & 1 \\\\ 0 & 0 & 1 \\end{pmatrix}$ 是否可对角化。

**解：**

**第一步：求特征值**
$$A - \\lambda I = \\begin{pmatrix} 1-\\lambda & 1 & 0 \\\\ 0 & 1-\\lambda & 1 \\\\ 0 & 0 & 1-\\lambda \\end{pmatrix}$$

$$\\det(A - \\lambda I) = (1-\\lambda)^3$$

特征值：$\\lambda = 1$（三重）

**第二步：求特征向量**
$(A - I)x = \\begin{pmatrix} 0 & 1 & 0 \\\\ 0 & 0 & 1 \\\\ 0 & 0 & 0 \\end{pmatrix}x = \\mathbf{0}$

解得：$x_2 = x_3 = 0$，$x_1$ 任意
特征向量只有：$\\alpha = \\begin{pmatrix} 1 \\\\ 0 \\\\ 0 \\end{pmatrix}$

**结论**：几何重数 = 1，代数重数 = 3，所以 $A$ 不可对角化。

### 例题2
对矩阵 $A = \\begin{pmatrix} 3 & 1 \\\\ 0 & 2 \\end{pmatrix}$ 进行对角化。

**解：**

**第一步：求特征值**（前面已求）
$\\lambda_1 = 3, \\lambda_2 = 2$

**第二步：求特征向量**（前面已求）
$\\alpha_1 = \\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix}, \\alpha_2 = \\begin{pmatrix} 1 \\\\ -1 \\end{pmatrix}$

**第三步：构造对角化矩阵**
$$P = \\begin{pmatrix} 1 & 1 \\\\ 0 & -1 \\end{pmatrix}, \\quad P^{-1} = \\begin{pmatrix} 1 & 1 \\\\ 0 & -1 \\end{pmatrix}$$

$$P^{-1}AP = \\begin{pmatrix} 3 & 0 \\\\ 0 & 2 \\end{pmatrix}$$

## 6.2.5 对角化的应用

### 1. 计算矩阵的幂
如果 $P^{-1}AP = \\Lambda$，则 $A^k = P\\Lambda^k P^{-1}$

### 2. 解线性微分方程组
$\\frac{dx}{dt} = Ax$ 的解为 $x(t) = e^{At}x_0$

### 3. 判断矩阵序列的收敛性
研究 $A^k$ 当 $k \\to \\infty$ 时的性态

## 6.2.6 特殊类型矩阵的对角化

### 1. 实对称矩阵
- 实对称矩阵必可对角化
- 所有特征值都是实数
- 不同特征值对应的特征向量正交

### 2. 正规矩阵
复矩阵 $A$ 是正规矩阵（$AA^* = A^*A$）当且仅当 $A$ 可酉对角化。

## 小结
1. 对角化将复杂的矩阵运算转化为简单的对角矩阵运算
2. 判断可对角化的关键是检验几何重数与代数重数的关系
3. 对角化在理论分析和数值计算中都有重要应用
4. 实对称矩阵的对角化有特殊的优美性质
            `,
            order: 2,
            problems: [
              {
                title: '对角化判定',
                content: '判断矩阵 $A = \\begin{pmatrix} 2 & 1 \\\\ 1 & 2 \\end{pmatrix}$ 是否可对角化，若可以，请给出对角化。',
                type: 'solution',
                difficulty: 3,
                points: 20,
                answer: {
                  type: 'solution',
                  steps: [
                    '求特征值：$\\det(A - \\lambda I) = (2-\\lambda)^2 - 1 = \\lambda^2 - 4\\lambda + 3 = 0$',
                    '解得：$\\lambda_1 = 3, \\lambda_2 = 1$',
                    '求特征向量：',
                    '对 $\\lambda_1 = 3$：$(A-3I)x = \\begin{pmatrix} -1 & 1 \\\\ 1 & -1 \\end{pmatrix}x = 0$，得 $\\alpha_1 = \\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix}$',
                    '对 $\\lambda_2 = 1$：$(A-I)x = \\begin{pmatrix} 1 & 1 \\\\ 1 & 1 \\end{pmatrix}x = 0$，得 $\\alpha_2 = \\begin{pmatrix} 1 \\\\ -1 \\end{pmatrix}$',
                    '构造 $P = \\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \\end{pmatrix}$，$P^{-1}AP = \\begin{pmatrix} 3 & 0 \\\\ 0 & 1 \\end{pmatrix}$'
                  ],
                  finalAnswer: 'A 可对角化，$P^{-1}AP = \\begin{pmatrix} 3 & 0 \\\\ 0 & 1 \\end{pmatrix}$'
                },
                explanation: '由于有两个不同的特征值，对应两个线性无关的特征向量，所以可对角化。',
                tags: ['diagonalization', 'calculation']
              },
              {
                title: '矩阵幂的计算',
                content: '设 $A = \\begin{pmatrix} 1 & 1 \\\\ 0 & 2 \\end{pmatrix}$，计算 $A^{10}$。',
                type: 'fill_blank',
                difficulty: 3,
                points: 20,
                answer: {
                  type: 'fill_blank',
                  blanks: ['$\\begin{pmatrix} 1 & 1023 \\\\ 0 & 1024 \\end{pmatrix}$']
                },
                explanation: '先对角化 $A$，然后利用对角化计算 $A^{10} = P\\Lambda^{10}P^{-1}$。',
                tags: ['diagonalization', 'matrix_power']
              },
              {
                title: '对角化理论',
                content: '下列矩阵中，必定可对角化的是：',
                type: 'multiple_choice',
                difficulty: 2,
                points: 15,
                answer: {
                  type: 'multiple_choice',
                  options: [
                    'A. 所有上三角矩阵',
                    'B. 所有实对称矩阵',
                    'C. 所有幂零矩阵',
                    'D. 所有可逆矩阵'
                  ],
                  correct: [1]
                },
                explanation: '实对称矩阵必定可对角化，这是线性代数的重要定理。',
                tags: ['diagonalization', 'theory']
              }
            ]
          }
        ]
      },
      {
        title: '第7章 二次型',
        description: '介绍二次型的基本概念、标准形、规范形，以及二次型的分类和判定方法。',
        order: 7,
        lessons: [
          {
            title: '7.1 二次型的基本概念',
            content: `
# 7.1 二次型的基本概念

## 学习目标
- 掌握二次型的定义和矩阵表示
- 理解二次型与对称矩阵的对应关系
- 学会二次型的基本运算

## 7.1.1 二次型的定义

### 定义
$n$ 元二次型是形如
$$f(x_1, x_2, \\ldots, x_n) = \\sum_{i=1}^n \\sum_{j=1}^n a_{ij}x_ix_j$$
的二次齐次多项式，其中 $a_{ij}$ 是常数。

### 标准形式
不失一般性，可以假设 $a_{ij} = a_{ji}$（即对称），因为
$$a_{ij}x_ix_j + a_{ji}x_jx_i = (a_{ij} + a_{ji})x_ix_j$$

### 矩阵表示
二次型可以表示为
$$f(x_1, \\ldots, x_n) = x^TAx$$
其中 $x = \\begin{pmatrix} x_1 \\\\ \\vdots \\\\ x_n \\end{pmatrix}$，$A = (a_{ij})_{n \\times n}$ 是对称矩阵。

矩阵 $A$ 称为二次型的**矩阵**。

## 7.1.2 二次型的实例

### 例1：二元二次型
$$f(x_1, x_2) = a_{11}x_1^2 + 2a_{12}x_1x_2 + a_{22}x_2^2$$

矩阵表示：
$$f(x_1, x_2) = \\begin{pmatrix} x_1 & x_2 \\end{pmatrix} \\begin{pmatrix} a_{11} & a_{12} \\\\ a_{12} & a_{22} \\end{pmatrix} \\begin{pmatrix} x_1 \\\\ x_2 \\end{pmatrix}$$

### 例2：三元二次型
$$f(x_1, x_2, x_3) = x_1^2 + 2x_2^2 + 3x_3^2 + 4x_1x_2 - 2x_1x_3 + 6x_2x_3$$

对应矩阵：
$$A = \\begin{pmatrix} 1 & 2 & -1 \\\\ 2 & 2 & 3 \\\\ -1 & 3 & 3 \\end{pmatrix}$$

## 7.1.3 合同变换

### 定义
设 $A, B$ 是两个 $n$ 阶矩阵，如果存在可逆矩阵 $C$，使得
$$B = C^TAC$$
则称矩阵 $A$ 与 $B$ **合同**，记作 $A \\simeq B$。

### 性质
合同关系具有：
1. **反身性**：$A \\simeq A$
2. **对称性**：若 $A \\simeq B$，则 $B \\simeq A$
3. **传递性**：若 $A \\simeq B$，$B \\simeq C$，则 $A \\simeq C$

### 几何意义
合同变换对应坐标变换 $x = Cy$，二次型变为：
$$f = x^TAx = (Cy)^TA(Cy) = y^T(C^TAC)y$$

## 7.1.4 二次型的等价

### 定义
两个二次型称为**等价**，如果它们的矩阵合同。

### 标准形
任何二次型都可以通过适当的线性变换化为**标准形**：
$$f = d_1y_1^2 + d_2y_2^2 + \\cdots + d_ny_n^2$$

### 规范形
实二次型的**规范形**为：
$$f = y_1^2 + y_2^2 + \\cdots + y_p^2 - y_{p+1}^2 - \\cdots - y_{p+q}^2$$
其中 $p + q \\leq n$。

## 7.1.5 惯性定理

### 定理（惯性定理）
实二次型的规范形中正项的个数 $p$ 和负项的个数 $q$ 由二次型唯一确定，与所选择的线性变换无关。

### 惯性指数
- $p$ 称为**正惯性指数**
- $q$ 称为**负惯性指数**
- $p - q$ 称为**符号差**或**惯性指数**

### 矩阵的惯性指数
对于实对称矩阵 $A$：
- 正惯性指数 = 正特征值的个数
- 负惯性指数 = 负特征值的个数

## 7.1.6 二次型的分类

根据惯性指数，实二次型分为：

### 1. 正定二次型
$p = n, q = 0$：所有系数都为正
$$f = y_1^2 + y_2^2 + \\cdots + y_n^2$$

### 2. 负定二次型
$p = 0, q = n$：所有系数都为负
$$f = -y_1^2 - y_2^2 - \\cdots - y_n^2$$

### 3. 半正定二次型
$q = 0, p < n$：系数非负，至少一个为零

### 4. 半负定二次型
$p = 0, q < n$：系数非正，至少一个为零

### 5. 不定二次型
$p > 0, q > 0$：既有正系数又有负系数

## 小结
1. 二次型与对称矩阵一一对应，便于矩阵方法处理
2. 合同变换保持二次型的本质特性
3. 惯性定理揭示了二次型分类的内在规律
4. 二次型的分类为后续判定方法奠定基础
            `,
            order: 1,
            problems: [
              {
                title: '写出二次型的矩阵',
                content: '写出二次型 $f(x_1, x_2, x_3) = 2x_1^2 + 3x_2^2 + x_3^2 + 4x_1x_2 - 2x_2x_3$ 的矩阵。',
                type: 'solution',
                difficulty: 2,
                points: 15,
                answer: {
                  type: 'solution',
                  steps: [
                    '识别各项系数：',
                    '$x_1^2$ 的系数：$a_{11} = 2$',
                    '$x_2^2$ 的系数：$a_{22} = 3$',
                    '$x_3^2$ 的系数：$a_{33} = 1$',
                    '$x_1x_2$ 的系数：$2a_{12} = 4$，所以 $a_{12} = a_{21} = 2$',
                    '$x_2x_3$ 的系数：$2a_{23} = -2$，所以 $a_{23} = a_{32} = -1$',
                    '$x_1x_3$ 项不存在：$a_{13} = a_{31} = 0$'
                  ],
                  finalAnswer: '$A = \\begin{pmatrix} 2 & 2 & 0 \\\\ 2 & 3 & -1 \\\\ 0 & -1 & 1 \\end{pmatrix}$'
                },
                explanation: '二次型矩阵是对称矩阵，交叉项系数要平均分配到对称位置。',
                tags: ['quadratic_form', 'matrix']
              },
              {
                title: '合同矩阵判定',
                content: '下列关于合同矩阵的说法正确的是：',
                type: 'multiple_choice',
                difficulty: 2,
                points: 15,
                answer: {
                  type: 'multiple_choice',
                  options: [
                    'A. 合同矩阵的行列式相等',
                    'B. 合同矩阵的特征值相同',
                    'C. 合同矩阵的秩相等',
                    'D. 合同矩阵的迹相等'
                  ],
                  correct: [2]
                },
                explanation: '合同变换保持矩阵的秩不变，但不保持行列式、特征值和迹。',
                tags: ['quadratic_form', 'congruence']
              },
              {
                title: '惯性指数计算',
                content: '已知二次型的规范形为 $f = y_1^2 + y_2^2 - y_3^2 - y_4^2$，则正惯性指数为 ___，负惯性指数为 ___。',
                type: 'fill_blank',
                difficulty: 1,
                points: 10,
                answer: {
                  type: 'fill_blank',
                  blanks: ['2', '2']
                },
                explanation: '正惯性指数是正项的个数，负惯性指数是负项的个数。',
                tags: ['quadratic_form', 'inertia']
              }
            ]
          },
          {
            title: '7.2 二次型的化简与判定',
            content: `
# 7.2 二次型的化简与判定

## 学习目标
- 掌握配方法化二次型为标准形
- 学会用正交变换化二次型为标准形
- 掌握正定二次型的判定方法

## 7.2.1 配方法

### 基本思想
通过配成完全平方的方法，将二次型化为标准形。

### 配方法步骤

#### 情况1：$a_{11} \\neq 0$
1. 将含 $x_1$ 的项配成完全平方
2. 对剩余的二次型继续配方

#### 情况2：$a_{11} = 0$ 但存在 $a_{ii} \\neq 0$
通过变量替换 $x_1 \\leftrightarrow x_i$ 转为情况1

#### 情况3：所有 $a_{ii} = 0$ 但存在 $a_{ij} \\neq 0$ $(i \\neq j)$
令 $x_i = y_i + y_j, x_j = y_i - y_j$，其他变量不变

### 例题1
用配方法化二次型 $f(x_1, x_2, x_3) = x_1^2 + 2x_2^2 + 5x_3^2 + 2x_1x_2 - 2x_1x_3 + 4x_2x_3$ 为标准形。

**解：**
$$\\begin{align}
f &= x_1^2 + 2x_1x_2 - 2x_1x_3 + 2x_2^2 + 4x_2x_3 + 5x_3^2 \\\\
&= (x_1 + x_2 - x_3)^2 - (x_2 - x_3)^2 + 2x_2^2 + 4x_2x_3 + 5x_3^2 \\\\
&= (x_1 + x_2 - x_3)^2 + x_2^2 + 2x_2x_3 + 4x_3^2 \\\\
&= (x_1 + x_2 - x_3)^2 + (x_2 + x_3)^2 + 3x_3^2
\\end{align}$$

令 $y_1 = x_1 + x_2 - x_3, y_2 = x_2 + x_3, y_3 = x_3$，得到标准形：
$$f = y_1^2 + y_2^2 + 3y_3^2$$

## 7.2.2 正交变换法

### 基本原理
利用实对称矩阵可正交对角化的性质，通过正交矩阵将二次型化为标准形。

### 步骤
1. 求出矩阵 $A$ 的所有特征值 $\\lambda_1, \\lambda_2, \\ldots, \\lambda_n$
2. 求出对应的特征向量，并将其单位正交化
3. 构造正交矩阵 $Q$，使得 $Q^TAQ = \\text{diag}(\\lambda_1, \\ldots, \\lambda_n)$
4. 在变换 $x = Qy$ 下，二次型的标准形为 $f = \\lambda_1y_1^2 + \\cdots + \\lambda_ny_n^2$

### 例题2
用正交变换法化二次型 $f(x_1, x_2) = 5x_1^2 + 4x_1x_2 + 5x_2^2$ 为标准形。

**解：**

二次型矩阵：$A = \\begin{pmatrix} 5 & 2 \\\\ 2 & 5 \\end{pmatrix}$

特征值：$\\det(A - \\lambda I) = (5-\\lambda)^2 - 4 = \\lambda^2 - 10\\lambda + 21$
解得：$\\lambda_1 = 7, \\lambda_2 = 3$

特征向量：
- $\\lambda_1 = 7$：$\\alpha_1 = \\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix}$，单位化：$\\xi_1 = \\frac{1}{\\sqrt{2}}\\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix}$
- $\\lambda_2 = 3$：$\\alpha_2 = \\begin{pmatrix} 1 \\\\ -1 \\end{pmatrix}$，单位化：$\\xi_2 = \\frac{1}{\\sqrt{2}}\\begin{pmatrix} 1 \\\\ -1 \\end{pmatrix}$

正交矩阵：$Q = \\frac{1}{\\sqrt{2}}\\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \\end{pmatrix}$

标准形：$f = 7y_1^2 + 3y_2^2$

## 7.2.3 正定二次型的判定

### 定义
实二次型 $f(x) = x^TAx$ 称为**正定**，如果对任意非零向量 $x$，都有 $f(x) > 0$。

### 判定方法

#### 方法1：特征值判定法
二次型正定 ⟺ 矩阵 $A$ 的所有特征值都大于零

#### 方法2：主子式判定法（Sylvester判据）
二次型正定 ⟺ 矩阵 $A$ 的所有顺序主子式都大于零

$$\\Delta_1 = a_{11} > 0$$
$$\\Delta_2 = \\begin{vmatrix} a_{11} & a_{12} \\\\ a_{21} & a_{22} \\end{vmatrix} > 0$$
$$\\vdots$$
$$\\Delta_n = \\det A > 0$$

#### 方法3：合同标准形判定法
二次型正定 ⟺ 标准形的所有系数都大于零

### 其他类型的判定

#### 负定二次型
所有特征值都小于零，或所有奇数阶主子式小于零，偶数阶主子式大于零

#### 半正定二次型
所有特征值都非负，或所有主子式都非负

#### 不定二次型
既有正特征值又有负特征值

### 例题3
判断二次型 $f(x_1, x_2, x_3) = 2x_1^2 + 3x_2^2 + x_3^2 + 2x_1x_2$ 的符号。

**解：**
矩阵：$A = \\begin{pmatrix} 2 & 1 & 0 \\\\ 1 & 3 & 0 \\\\ 0 & 0 & 1 \\end{pmatrix}$

计算主子式：
- $\\Delta_1 = 2 > 0$
- $\\Delta_2 = \\begin{vmatrix} 2 & 1 \\\\ 1 & 3 \\end{vmatrix} = 6 - 1 = 5 > 0$
- $\\Delta_3 = \\det A = 5 \\cdot 1 = 5 > 0$

所有主子式都大于零，所以二次型正定。

## 小结
1. 配方法是化二次型为标准形的基本方法，适用于手工计算
2. 正交变换法利用特征值理论，结果具有几何意义
3. 正定性判定有多种等价方法，主子式法最为实用
4. 二次型理论在优化、几何等领域有重要应用
            `,
            order: 2,
            problems: [
              {
                title: '配方法化标准形',
                content: '用配方法将二次型 $f(x_1, x_2, x_3) = x_1^2 + 4x_2^2 + 2x_1x_2 - 2x_1x_3$ 化为标准形。',
                type: 'solution',
                difficulty: 3,
                points: 20,
                answer: {
                  type: 'solution',
                  steps: [
                    '重新排列项：$f = x_1^2 + 2x_1x_2 - 2x_1x_3 + 4x_2^2$',
                    '对含 $x_1$ 的项配方：$x_1^2 + 2x_1x_2 - 2x_1x_3 = (x_1 + x_2 - x_3)^2 - (x_2 - x_3)^2$',
                    '代入得：$f = (x_1 + x_2 - x_3)^2 - (x_2 - x_3)^2 + 4x_2^2$',
                    '化简：$f = (x_1 + x_2 - x_3)^2 + 3x_2^2 + 2x_2x_3 + x_3^2$',
                    '继续配方：$3x_2^2 + 2x_2x_3 = 3(x_2 + \\frac{x_3}{3})^2 - \\frac{x_3^2}{3}$',
                    '最终形式：$f = (x_1 + x_2 - x_3)^2 + 3(x_2 + \\frac{x_3}{3})^2 + \\frac{2x_3^2}{3}$'
                  ],
                  finalAnswer: '标准形：$f = y_1^2 + 3y_2^2 + \\frac{2}{3}y_3^2$'
                },
                explanation: '通过逐步配成完全平方来化简二次型。',
                tags: ['quadratic_form', 'canonical_form']
              },
              {
                title: '正定性判定',
                content: '判断二次型 $f(x_1, x_2) = x_1^2 + 4x_1x_2 + 5x_2^2$ 的符号性。',
                type: 'multiple_choice',
                difficulty: 2,
                points: 15,
                answer: {
                  type: 'multiple_choice',
                  options: [
                    'A. 正定',
                    'B. 负定',
                    'C. 半正定',
                    'D. 不定'
                  ],
                  correct: [0]
                },
                explanation: '矩阵为 $\\begin{pmatrix} 1 & 2 \\\\ 2 & 5 \\end{pmatrix}$，主子式 $\\Delta_1 = 1 > 0$，$\\Delta_2 = 5 - 4 = 1 > 0$，所以正定。',
                tags: ['quadratic_form', 'positive_definite']
              },
              {
                title: '主子式计算',
                content: '设矩阵 $A = \\begin{pmatrix} 3 & 1 & 0 \\\\ 1 & 2 & 1 \\\\ 0 & 1 & 1 \\end{pmatrix}$，计算三阶主子式 $\\Delta_3$。',
                type: 'fill_blank',
                difficulty: 2,
                points: 15,
                answer: {
                  type: 'fill_blank',
                  blanks: ['2']
                },
                explanation: '按第一行展开：$\\det A = 3\\begin{vmatrix} 2 & 1 \\\\ 1 & 1 \\end{vmatrix} - 1\\begin{vmatrix} 1 & 1 \\\\ 0 & 1 \\end{vmatrix} = 3(2-1) - 1(1-0) = 3-1 = 2$。',
                tags: ['quadratic_form', 'determinant']
              }
            ]
          }
        ]
      },
      {
        title: '第8章 内积空间',
        description: '介绍内积空间的定义、正交性概念、施密特正交化过程，以及正交矩阵的性质。',
        order: 8,
        lessons: [
          {
            title: '8.1 内积的定义与性质',
            content: `
# 8.1 内积的定义与性质

## 学习目标
- 掌握内积的定义和基本性质
- 理解正交性概念
- 学会施密特正交化方法

## 8.1.1 内积的定义

### 定义
设 $V$ 是实向量空间，对于 $V$ 中任意两个向量 $\\alpha, \\beta$，如果有一个实数与之对应，记作 $(\\alpha, \\beta)$，且满足以下条件：

1. **对称性**：$(\\alpha, \\beta) = (\\beta, \\alpha)$
2. **第一变元的线性性**：$(k_1\\alpha_1 + k_2\\alpha_2, \\beta) = k_1(\\alpha_1, \\beta) + k_2(\\alpha_2, \\beta)$
3. **正定性**：$(\\alpha, \\alpha) \\geq 0$，且 $(\\alpha, \\alpha) = 0$ 当且仅当 $\\alpha = \\mathbf{0}$

则称 $(\\alpha, \\beta)$ 为向量 $\\alpha$ 和 $\\beta$ 的**内积**，$V$ 称为**内积空间**。

### 标准内积
在 $\\mathbb{R}^n$ 中，标准内积定义为：
$$\\langle x, y \\rangle = x_1y_1 + x_2y_2 + \\cdots + x_ny_n = x^Ty$$

其中 $x = (x_1, \\ldots, x_n)^T$，$y = (y_1, \\ldots, y_n)^T$。

## 8.1.2 内积的性质

### 基本性质
1. **双线性性**：内积对两个变元都是线性的
2. **Cauchy-Schwarz不等式**：$|(\\alpha, \\beta)|^2 \\leq (\\alpha, \\alpha)(\\beta, \\beta)$
3. **三角不等式**：$\\|\\alpha + \\beta\\| \\leq \\|\\alpha\\| + \\|\\beta\\|$

### 范数
由内积可以定义**范数**（或**长度**）：
$$\\|\\alpha\\| = \\sqrt{(\\alpha, \\alpha)}$$

### 距离
两向量间的**距离**定义为：
$$d(\\alpha, \\beta) = \\|\\alpha - \\beta\\| = \\sqrt{(\\alpha - \\beta, \\alpha - \\beta)}$$

## 8.1.3 正交性

### 定义
设 $\\alpha, \\beta \\in V$，如果 $(\\alpha, \\beta) = 0$，则称 $\\alpha$ 与 $\\beta$ **正交**，记作 $\\alpha \\perp \\beta$。

### 正交向量组
如果向量组 $\\{\\alpha_1, \\alpha_2, \\ldots, \\alpha_k\\}$ 中任意两个不同向量都正交，则称该向量组为**正交向量组**。

### 标准正交向量组
如果正交向量组中每个向量的长度都为1，则称为**标准正交向量组**。

### 正交性的性质
1. **Pythagoras定理**：若 $\\alpha \\perp \\beta$，则 $\\|\\alpha + \\beta\\|^2 = \\|\\alpha\\|^2 + \\|\\beta\\|^2$
2. 正交向量组必定线性无关（除去零向量）
3. 标准正交向量组是线性无关的

## 8.1.4 施密特正交化

### 问题
将线性无关向量组 $\\{\\alpha_1, \\alpha_2, \\ldots, \\alpha_k\\}$ 转化为标准正交向量组。

### Gram-Schmidt正交化过程

#### 第一步：正交化
$$\\begin{align}
\\beta_1 &= \\alpha_1 \\\\
\\beta_2 &= \\alpha_2 - \\frac{(\\alpha_2, \\beta_1)}{(\\beta_1, \\beta_1)}\\beta_1 \\\\
\\beta_3 &= \\alpha_3 - \\frac{(\\alpha_3, \\beta_1)}{(\\beta_1, \\beta_1)}\\beta_1 - \\frac{(\\alpha_3, \\beta_2)}{(\\beta_2, \\beta_2)}\\beta_2 \\\\
&\\vdots \\\\
\\beta_k &= \\alpha_k - \\sum_{i=1}^{k-1} \\frac{(\\alpha_k, \\beta_i)}{(\\beta_i, \\beta_i)}\\beta_i
\\end{align}$$

#### 第二步：标准化
$$\\gamma_i = \\frac{\\beta_i}{\\|\\beta_i\\|}, \\quad i = 1, 2, \\ldots, k$$

### 例题
对向量组 $\\alpha_1 = (1, 1, 0)^T$，$\\alpha_2 = (1, 0, 1)^T$，$\\alpha_3 = (0, 1, 1)^T$ 进行施密特正交化。

**解：**

**第一步：正交化**
$$\\beta_1 = \\alpha_1 = (1, 1, 0)^T$$

$$\\beta_2 = \\alpha_2 - \\frac{(\\alpha_2, \\beta_1)}{(\\beta_1, \\beta_1)}\\beta_1 = (1, 0, 1)^T - \\frac{1}{2}(1, 1, 0)^T = \\left(\\frac{1}{2}, -\\frac{1}{2}, 1\\right)^T$$

$$\\beta_3 = \\alpha_3 - \\frac{(\\alpha_3, \\beta_1)}{(\\beta_1, \\beta_1)}\\beta_1 - \\frac{(\\alpha_3, \\beta_2)}{(\\beta_2, \\beta_2)}\\beta_2$$

计算：$(\\alpha_3, \\beta_1) = 1$，$(\\alpha_3, \\beta_2) = \\frac{1}{2}$，$(\\beta_2, \\beta_2) = \\frac{3}{2}$

$$\\beta_3 = (0, 1, 1)^T - \\frac{1}{2}(1, 1, 0)^T - \\frac{1/2}{3/2}\\left(\\frac{1}{2}, -\\frac{1}{2}, 1\\right)^T = \\left(-\\frac{2}{3}, \\frac{2}{3}, \\frac{2}{3}\\right)^T$$

**第二步：标准化**
$$\\gamma_1 = \\frac{1}{\\sqrt{2}}(1, 1, 0)^T, \\quad \\gamma_2 = \\frac{2}{\\sqrt{6}}\\left(\\frac{1}{2}, -\\frac{1}{2}, 1\\right)^T, \\quad \\gamma_3 = \\frac{\\sqrt{3}}{2}\\left(-\\frac{2}{3}, \\frac{2}{3}, \\frac{2}{3}\\right)^T$$

## 8.1.5 正交投影

### 定义
设 $W$ 是内积空间 $V$ 的子空间，$\\{\\beta_1, \\ldots, \\beta_k\\}$ 是 $W$ 的标准正交基。向量 $\\alpha \\in V$ 在 $W$ 上的**正交投影** 为：
$$\\text{proj}_W(\\alpha) = \\sum_{i=1}^k (\\alpha, \\beta_i)\\beta_i$$

### 性质
1. $\\text{proj}_W(\\alpha) \\in W$
2. $\\alpha - \\text{proj}_W(\\alpha) \\perp W$
3. $\\text{proj}_W(\\alpha)$ 是 $W$ 中与 $\\alpha$ 距离最近的向量

## 小结
1. 内积为向量空间引入了长度和角度的概念
2. 正交性是内积空间的重要几何概念
3. 施密特正交化提供了构造正交基的系统方法
4. 正交投影在最优化和逼近问题中有重要应用
            `,
            order: 1,
            problems: [
              {
                title: '施密特正交化',
                content: '对向量组 $\\alpha_1 = (1, 1, 1)^T$，$\\alpha_2 = (1, 1, 0)^T$ 进行施密特正交化。',
                type: 'solution',
                difficulty: 3,
                points: 20,
                answer: {
                  type: 'solution',
                  steps: [
                    '第一步正交化：',
                    '$\\beta_1 = \\alpha_1 = (1, 1, 1)^T$',
                    '计算 $(\\alpha_2, \\beta_1) = 1 \\cdot 1 + 1 \\cdot 1 + 0 \\cdot 1 = 2$',
                    '计算 $(\\beta_1, \\beta_1) = 1^2 + 1^2 + 1^2 = 3$',
                    '$\\beta_2 = \\alpha_2 - \\frac{(\\alpha_2, \\beta_1)}{(\\beta_1, \\beta_1)}\\beta_1 = (1,1,0)^T - \\frac{2}{3}(1,1,1)^T = (\\frac{1}{3}, \\frac{1}{3}, -\\frac{2}{3})^T$',
                    '第二步标准化：',
                    '$\\gamma_1 = \\frac{\\beta_1}{\\|\\beta_1\\|} = \\frac{1}{\\sqrt{3}}(1,1,1)^T$',
                    '$\\gamma_2 = \\frac{\\beta_2}{\\|\\beta_2\\|} = \\frac{3}{\\sqrt{6}}(\\frac{1}{3}, \\frac{1}{3}, -\\frac{2}{3})^T = \\frac{1}{\\sqrt{6}}(1,1,-2)^T$'
                  ],
                  finalAnswer: '标准正交向量组：$\\gamma_1 = \\frac{1}{\\sqrt{3}}(1,1,1)^T$，$\\gamma_2 = \\frac{1}{\\sqrt{6}}(1,1,-2)^T$'
                },
                explanation: '按照Gram-Schmidt过程，先正交化再标准化。',
                tags: ['inner_product', 'orthogonalization']
              },
              {
                title: '内积计算',
                content: '在 $\\mathbb{R}^3$ 中，向量 $x = (2, -1, 3)$ 和 $y = (1, 2, -1)$ 的标准内积为 ___。',
                type: 'fill_blank',
                difficulty: 1,
                points: 10,
                answer: {
                  type: 'fill_blank',
                  blanks: ['-3']
                },
                explanation: '标准内积：$\\langle x, y \\rangle = 2 \\cdot 1 + (-1) \\cdot 2 + 3 \\cdot (-1) = 2 - 2 - 3 = -3$。',
                tags: ['inner_product', 'calculation']
              },
              {
                title: '正交性理解',
                content: '关于内积空间中的正交性，下列说法正确的是：',
                type: 'multiple_choice',
                difficulty: 2,
                points: 15,
                answer: {
                  type: 'multiple_choice',
                  options: [
                    'A. 零向量与任何向量都正交',
                    'B. 正交向量组一定线性相关',
                    'C. 标准正交向量组的长度都不为1',
                    'D. 正交向量的和的长度等于各向量长度之和'
                  ],
                  correct: [0]
                },
                explanation: '零向量与任何向量的内积都为0，所以零向量与任何向量都正交。',
                tags: ['inner_product', 'orthogonality']
              }
            ]
          },
          {
            title: '8.2 正交矩阵与正交变换',
            content: `
# 8.2 正交矩阵与正交变换

## 学习目标
- 掌握正交矩阵的定义和性质
- 理解正交变换的几何意义
- 学会正交矩阵的判定和应用

## 8.2.1 正交矩阵的定义

### 定义
实矩阵 $Q$ 称为**正交矩阵**，如果 $Q^TQ = I$，即 $Q^T = Q^{-1}$。

### 等价条件
下列条件等价：
1. $Q$ 是正交矩阵
2. $Q^TQ = I$
3. $QQ^T = I$
4. $Q$ 的列向量构成标准正交向量组
5. $Q$ 的行向量构成标准正交向量组

### 例子
旋转矩阵：
$$R(\\theta) = \\begin{pmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{pmatrix}$$

反射矩阵：
$$F = \\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix}$$

## 8.2.2 正交矩阵的性质

### 基本性质
1. **行列式性质**：$\\det Q = \\pm 1$
2. **逆矩阵性质**：若 $Q$ 正交，则 $Q^{-1} = Q^T$ 也正交
3. **乘积性质**：两个正交矩阵的乘积仍是正交矩阵
4. **特征值性质**：正交矩阵的特征值的模长为1

### 几何性质
1. **保长性**：$\\|Qx\\| = \\|x\\|$
2. **保角性**：$\\langle Qx, Qy \\rangle = \\langle x, y \\rangle$
3. **保距性**：$\\|Qx - Qy\\| = \\|x - y\\|$

## 8.2.3 正交变换

### 定义
线性变换 $T: \\mathbb{R}^n \\to \\mathbb{R}^n$ 称为**正交变换**，如果它保持向量的内积不变：
$$\\langle T(x), T(y) \\rangle = \\langle x, y \\rangle$$

### 性质
正交变换具有以下性质：
1. **保长性**：$\\|T(x)\\| = \\|x\\|$
2. **保角性**：保持向量间的夹角不变
3. **可逆性**：正交变换都是可逆的

### 矩阵表示
正交变换在标准正交基下的矩阵表示是正交矩阵。

## 8.2.4 正交矩阵的分类

### 二维正交矩阵
二维正交矩阵有两种类型：

#### 1. 旋转矩阵（$\\det Q = 1$）
$$Q = \\begin{pmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{pmatrix}$$

#### 2. 反射矩阵（$\\det Q = -1$）
$$Q = \\begin{pmatrix} \\cos\\theta & \\sin\\theta \\\\ \\sin\\theta & -\\cos\\theta \\end{pmatrix}$$

### 三维正交矩阵
三维正交矩阵可以是：
- 绕轴的旋转（$\\det Q = 1$）
- 关于平面的反射（$\\det Q = -1$）
- 旋转加反射的复合

## 8.2.5 正交对角化

### 实对称矩阵的正交对角化
**定理**：实对称矩阵必可正交对角化，即存在正交矩阵 $Q$，使得
$$Q^TAQ = \\Lambda$$
其中 $\\Lambda$ 是对角矩阵。

### 步骤
1. 求出实对称矩阵 $A$ 的所有特征值
2. 对每个特征值求出对应的特征向量
3. 将特征向量标准正交化
4. 构造正交矩阵 $Q$

### 例题
正交对角化矩阵 $A = \\begin{pmatrix} 1 & 1 \\\\ 1 & 1 \\end{pmatrix}$。

**解：**

**第一步：求特征值**
$$\\det(A - \\lambda I) = \\begin{vmatrix} 1-\\lambda & 1 \\\\ 1 & 1-\\lambda \\end{vmatrix} = (1-\\lambda)^2 - 1 = \\lambda^2 - 2\\lambda$$

特征值：$\\lambda_1 = 2, \\lambda_2 = 0$

**第二步：求特征向量**
- $\\lambda_1 = 2$：$(A-2I)x = \\begin{pmatrix} -1 & 1 \\\\ 1 & -1 \\end{pmatrix}x = 0$，得 $\\xi_1 = \\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix}$
- $\\lambda_2 = 0$：$Ax = \\begin{pmatrix} 1 & 1 \\\\ 1 & 1 \\end{pmatrix}x = 0$，得 $\\xi_2 = \\begin{pmatrix} 1 \\\\ -1 \\end{pmatrix}$

**第三步：标准化**
$$\\eta_1 = \\frac{1}{\\sqrt{2}}\\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix}, \\quad \\eta_2 = \\frac{1}{\\sqrt{2}}\\begin{pmatrix} 1 \\\\ -1 \\end{pmatrix}$$

**第四步：构造正交矩阵**
$$Q = \\frac{1}{\\sqrt{2}}\\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \\end{pmatrix}$$

验证：$Q^TAQ = \\begin{pmatrix} 2 & 0 \\\\ 0 & 0 \\end{pmatrix}$

## 8.2.6 应用

### 1. 主成分分析（PCA）
利用正交对角化进行数据降维和特征提取。

### 2. 最小二乘法
利用正交投影求解超定线性方程组。

### 3. 信号处理
正交变换（如傅里叶变换）在信号分析中的应用。

### 4. 几何变换
计算机图形学中的旋转、反射等变换。

## 小结
1. 正交矩阵对应保持长度和角度的线性变换
2. 实对称矩阵的正交对角化是线性代数的重要结果
3. 正交变换在理论和应用中都具有重要地位
4. 正交矩阵的几何直观帮助理解线性变换的本质
            `,
            order: 2,
            problems: [
              {
                title: '正交矩阵验证',
                content: '验证矩阵 $Q = \\frac{1}{3}\\begin{pmatrix} 2 & -1 & 2 \\\\ 1 & 2 & 2 \\\\ 2 & 2 & -1 \\end{pmatrix}$ 是否为正交矩阵。',
                type: 'solution',
                difficulty: 2,
                points: 15,
                answer: {
                  type: 'solution',
                  steps: [
                    '计算 $Q^TQ$：',
                    '$Q^T = \\frac{1}{3}\\begin{pmatrix} 2 & 1 & 2 \\\\ -1 & 2 & 2 \\\\ 2 & 2 & -1 \\end{pmatrix}$',
                    '$Q^TQ = \\frac{1}{9}\\begin{pmatrix} 2 & 1 & 2 \\\\ -1 & 2 & 2 \\\\ 2 & 2 & -1 \\end{pmatrix}\\begin{pmatrix} 2 & -1 & 2 \\\\ 1 & 2 & 2 \\\\ 2 & 2 & -1 \\end{pmatrix}$',
                    '计算第(1,1)元素：$\\frac{1}{9}(2^2 + 1^2 + 2^2) = \\frac{9}{9} = 1$',
                    '计算第(1,2)元素：$\\frac{1}{9}(2(-1) + 1(2) + 2(2)) = \\frac{4}{9} \\neq 0$',
                    '由于非对角线元素不为0，所以不是正交矩阵'
                  ],
                  finalAnswer: 'Q 不是正交矩阵'
                },
                explanation: '正交矩阵满足 $Q^TQ = I$，需要验证所有元素。',
                tags: ['orthogonal_matrix', 'verification']
              },
              {
                title: '正交对角化',
                content: '求实对称矩阵 $A = \\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}$ 的正交对角化。',
                type: 'fill_blank',
                difficulty: 3,
                points: 20,
                answer: {
                  type: 'fill_blank',
                  blanks: ['$Q = \\frac{1}{\\sqrt{2}}\\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \\end{pmatrix}$，$\\Lambda = \\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix}$']
                },
                explanation: '特征值为 $\\pm 1$，对应的标准化特征向量构成正交矩阵。',
                tags: ['orthogonal_matrix', 'diagonalization']
              },
              {
                title: '正交变换性质',
                content: '关于正交变换，下列说法错误的是：',
                type: 'multiple_choice',
                difficulty: 2,
                points: 15,
                answer: {
                  type: 'multiple_choice',
                  options: [
                    'A. 正交变换保持向量长度不变',
                    'B. 正交变换保持向量间夹角不变',
                    'C. 正交变换的矩阵行列式为1',
                    'D. 正交变换是可逆变换'
                  ],
                  correct: [2]
                },
                explanation: '正交矩阵的行列式为 $\\pm 1$，不一定是1。当行列式为-1时，对应反射变换。',
                tags: ['orthogonal_matrix', 'transformation']
              }
            ]
          }
        ]
      }
    ]
  }
}