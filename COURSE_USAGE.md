# 课程数据获取和使用指南

## 概述

数学学习平台现已支持完整的课程数据获取功能，包括课程列表、章节、课时和练习题等内容。

## 主要功能

### 1. 数据模型结构

```
Course（课程）
  ├── Chapter（章节）
      ├── Lesson（课时）
          ├── Problem（练习题）
          └── Progress（学习进度）
```

### 2. API接口

#### 课程相关接口
- `GET /api/courses` - 获取所有课程（按级别分组）
- `GET /api/courses?type=recommended` - 获取推荐课程
- `GET /api/courses/[id]` - 获取单个课程详情
- `GET /api/courses/[id]/chapters` - 获取课程章节列表
- `GET /api/courses/[id]/chapters/[chapterId]` - 获取章节详情
- `GET /api/courses/[id]/progress` - 获取学习进度
- `POST /api/courses/[id]/progress` - 更新学习进度

#### 课时相关接口
- `GET /api/lessons/[id]` - 获取课时详情

### 3. 数据查询服务（lib/courses.ts）

```typescript
// 获取所有课程
const courses = await getAllCourses(userId)

// 获取课程详情
const course = await getCourseById(courseId, userId)

// 获取用户学习进度
const progress = await getUserCourseProgress(userId, courseId)

// 获取推荐课程
const recommended = await getRecommendedCourses(userId)

// 更新学习进度
await updateUserProgress(userId, courseId, lessonId, completed)
```

## 页面路由

### 课程相关页面
- `/courses` - 课程列表页面
- `/courses/[id]` - 课程详情页面
- `/courses/[id]/chapters/[chapterId]/lessons/[lessonId]` - 课时学习页面

## 示例数据

系统已创建以下示例课程：

1. **小学数学基础**
   - 数与运算（认识数字、加法入门）
   - 几何图形（认识圆形）

2. **初中代数基础**
   - 一元一次方程（概念和解法）

3. **高中函数与导数**
   - 函数的概念
   - 导数的概念

4. **高等数学（一）**
   - 极限与连续（数列极限）

## 使用方式

### 1. 通过页面访问
```
1. 访问 /courses 查看所有课程
2. 选择课程进入 /courses/[id] 查看详情
3. 点击课时链接进入学习页面
```

### 2. 通过API获取数据
```javascript
// 获取课程列表
const response = await fetch('/api/courses')
const courses = await response.json()

// 获取课程详情
const response = await fetch('/api/courses/[courseId]')
const course = await response.json()
```

### 3. 在Server Components中使用
```typescript
import { getAllCourses, getCourseById } from '@/lib/courses'

// 在页面组件中直接使用
const courses = await getAllCourses(session?.user?.id)
const course = await getCourseById(courseId, session?.user?.id)
```

## 数据创建

要添加新的课程数据，可以：

1. **通过种子脚本**：修改 `prisma/seed.ts` 添加新课程
2. **通过Prisma直接操作**：使用Prisma Client在代码中创建
3. **通过管理接口**：未来可以开发管理界面

### 运行种子脚本
```bash
npm run seed
```

## 学习进度跟踪

系统支持用户学习进度跟踪：
- 课程级别进度（完成百分比）
- 课时级别进度（是否完成）
- 最后访问时间记录
- 智能推荐基于学习历史

## 下一步开发

1. 课时完成状态更新功能
2. 练习题答题和评分系统
3. 学习数据统计和可视化
4. 课程收藏和笔记功能