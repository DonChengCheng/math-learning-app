# 数学学习平台快速开始指南

## 项目概述

这是一个基于 Next.js 14 的数学学习Web应用，提供系统化的数学课程、智能练习和学习分析功能。

## 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS v4
- **数据库**: PostgreSQL + Prisma ORM
- **认证**: NextAuth.js v5
- **数学渲染**: KaTeX
- **UI组件**: 自定义组件库

## 已完成功能

1. ✅ Next.js 14项目初始化
2. ✅ TypeScript和Tailwind CSS配置
3. ✅ Prisma ORM集成和数据模型设计
4. ✅ 用户认证系统（登录/注册）
5. ✅ 基础页面（首页、登录页、注册页、仪表板）

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置数据库

如果使用本地PostgreSQL:
```bash
# 修改 .env 文件中的 DATABASE_URL
DATABASE_URL="postgresql://用户名:密码@localhost:5432/数据库名?schema=public"
```

如果使用Prisma提供的开发数据库:
```bash
# 使用默认的 prisma+postgres URL
```

### 3. 初始化数据库

```bash
# 生成Prisma客户端
npx prisma generate

# 创建数据库表
npx prisma db push
```

### 4. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

## 主要路由

- `/` - 首页
- `/auth/signin` - 登录页面
- `/auth/signup` - 注册页面
- `/dashboard` - 用户仪表板（需要登录）

## 待开发功能

- 基础页面布局和导航
- KaTeX数学公式渲染集成
- 课程管理模块
- 练习题库系统
- 图形计算器功能

## 开发提示

1. 所有需要认证的页面会自动重定向到登录页
2. UI组件使用 `@/components/ui` 目录下的组件
3. 数据库操作使用 `@/lib/prisma` 导出的实例
4. 认证相关功能使用 `@/auth` 导出的方法

## 测试账号

首次使用需要在注册页面创建新账号。