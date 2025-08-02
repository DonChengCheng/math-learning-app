# 数据库连接解决方案

## 问题描述

当前遇到的问题：
- Prisma Client 错误：`Invalid STUDIO_EMBED_BUILD...`
- PostgreSQL 连接错误：`Can't reach database server at localhost:51214`
- 准备语句冲突：`prepared statement "s0" already exists`

## 根本原因

Prisma 开发服务器（位于端口 51214）未运行或无法访问，这是一个托管的 PostgreSQL 实例。

## 解决方案

### 方案 1：使用本地 PostgreSQL（推荐用于生产）

1. **安装 PostgreSQL**
   ```bash
   brew install postgresql@16
   brew services start postgresql@16
   ```

2. **创建数据库**
   ```bash
   createdb math_learning
   ```

3. **更新环境变量**
   编辑 `.env` 文件：
   ```env
   DATABASE_URL="postgresql://postgres:password@localhost:5432/math_learning?schema=public"
   DIRECT_URL="postgresql://postgres:password@localhost:5432/math_learning?schema=public"
   ```

4. **同步数据库**
   ```bash
   npx prisma db push
   npm run seed-linear-algebra
   ```

### 方案 2：使用 SQLite（推荐用于开发测试）

1. **更新环境变量**
   编辑 `.env` 文件：
   ```env
   DATABASE_URL="file:./prisma/dev.db"
   ```

2. **更新 Prisma Schema**
   编辑 `prisma/schema.prisma`：
   ```prisma
   datasource db {
     provider = "sqlite"
     url      = env("DATABASE_URL")
   }
   ```

3. **重新生成客户端并同步**
   ```bash
   npx prisma generate
   npx prisma db push
   npm run seed-linear-algebra
   ```

### 方案 3：使用 Prisma 托管数据库（当前配置）

1. **确保 Prisma CLI 已登录**
   ```bash
   npx prisma login
   ```

2. **启动开发服务器**
   ```bash
   npx prisma dev
   ```

3. **验证连接**
   ```bash
   npx prisma db push
   ```

## 临时解决方案

如果上述方案都不可行，可以使用内存数据库进行测试：

1. 安装依赖：
   ```bash
   npm install --save-dev @prisma/migrate
   ```

2. 使用 SQLite 内存模式：
   ```env
   DATABASE_URL="file::memory:?cache=shared"
   ```

## 验证步骤

无论使用哪种方案，完成后运行以下命令验证：

```bash
# 1. 生成 Prisma 客户端
npx prisma generate

# 2. 推送数据库架构
npx prisma db push

# 3. 导入线性代数数据
npm run seed-linear-algebra

# 4. 验证数据
npm run verify-linear-algebra

# 5. 启动开发服务器
npm run dev
```

## 常见问题

### Q: 仍然遇到 "prepared statement" 错误？
A: 确保使用单例模式的 Prisma 客户端（已在 `lib/prisma.ts` 中配置）

### Q: 数据库迁移失败？
A: 清理现有数据并重新开始：
```bash
rm -rf prisma/dev.db prisma/migrations
npx prisma db push --force-reset
```

### Q: 性能问题？
A: 对于生产环境，建议使用本地 PostgreSQL 或云数据库服务。

## 推荐配置

对于您的情况，建议使用 **方案 2（SQLite）** 进行快速测试和开发，因为：
- 无需安装额外软件
- 设置简单快速
- 适合单用户开发环境
- 数据持久化到文件

后续可以轻松迁移到 PostgreSQL 用于生产环境。