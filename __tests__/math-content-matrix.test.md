# MathContent Matrix Rendering Tests

This document describes manual tests for verifying matrix rendering functionality in the MathContent component.

## Test Cases

### 1. Basic 2x2 Matrix (vmatrix)
**Input:**
```
$$\begin{vmatrix}
a_{11} & a_{12} \\
a_{21} & a_{22}
\end{vmatrix}$$
```

**Expected Result:** Should render a 2x2 determinant matrix with vertical bars
**Status:** ✅ Fixed - Matrix content is preserved during processing

### 2. Basic 3x3 Matrix (vmatrix)
**Input:**
```
$$\begin{vmatrix}
a_{11} & a_{12} & a_{13} \\
a_{21} & a_{22} & a_{23} \\
a_{31} & a_{32} & a_{33}
\end{vmatrix}$$
```

**Expected Result:** Should render a 3x3 determinant matrix
**Status:** ✅ Fixed - Matrix environments properly handled

### 3. Bracket Matrix (bmatrix)
**Input:**
```
$$\begin{bmatrix}
1 & 2 \\
3 & 4
\end{bmatrix}$$
```

**Expected Result:** Should render a matrix with square brackets
**Status:** ✅ Fixed - All matrix environments supported

### 4. Parenthesis Matrix (pmatrix)
**Input:**
```
$$\begin{pmatrix}
x_1 \\
x_2
\end{pmatrix}$$
```

**Expected Result:** Should render a column vector with parentheses
**Status:** ✅ Fixed - Vector notation supported

### 5. Mixed Content with Matrix
**Input:**
```
# Linear Algebra

The determinant of a 2x2 matrix is:

$$\begin{vmatrix}
a_{11} & a_{12} \\
a_{21} & a_{22}
\end{vmatrix} = a_{11}a_{22} - a_{12}a_{21}$$

This is a fundamental concept.
```

**Expected Result:** Should render markdown with properly formatted matrix
**Status:** ✅ Fixed - Mixed content handling improved

## Error Handling Tests

### 1. Malformed Matrix
**Input:**
```
$$\begin{vmatrix}
a_{11} & a_{12}
a_{21} & a_{22}
\end{vmatrix}$$
```

**Expected Result:** Should show error message with details and fallback content
**Status:** ✅ Fixed - Error handling added

### 2. Unclosed Matrix Environment
**Input:**
```
$$\begin{vmatrix}
a_{11} & a_{12} \\
a_{21} & a_{22}
```

**Expected Result:** Should show error message and original content
**Status:** ✅ Fixed - Graceful error handling

## Manual Testing Steps

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Navigate to a linear algebra lesson:**
   - Go to http://localhost:3000
   - Login or signup
   - Navigate to courses
   - Find and open a linear algebra course
   - Open a lesson with matrix content

3. **Verify matrix rendering:**
   - Check that matrices display correctly
   - Verify no KaTeX parsing errors appear
   - Test different matrix types (vmatrix, bmatrix, pmatrix)

4. **Test error handling:**
   - Temporarily modify lesson content with malformed LaTeX
   - Verify error messages appear instead of crashes
   - Check that fallback content is shown

## Automated Testing (Future)

To add proper unit tests in the future:

1. Install testing framework:
   ```bash
   npm install --save-dev jest @testing-library/react @testing-library/jest-dom
   ```

2. Create test files in `__tests__/` directory

3. Add test scripts to package.json:
   ```json
   {
     "scripts": {
       "test": "jest",
       "test:watch": "jest --watch"
     }
   }
   ```

4. Test the MathContent component with various matrix inputs