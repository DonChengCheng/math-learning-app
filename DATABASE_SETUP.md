# 数据库设置指南

## 开发环境数据库配置

本项目使用 PostgreSQL 数据库和 Prisma ORM。在开发环境中，我们使用 Prisma 提供的本地开发数据库服务。

### 快速开始

1. **启动 Prisma 开发服务器**
   ```bash
   npx prisma dev
   ```
   这将在端口 51213-51215 上启动本地 PostgreSQL 实例。

2. **推送数据库架构**（如果是首次设置）
   ```bash
   npx prisma db push
   ```

3. **生成 Prisma 客户端**（如果需要）
   ```bash
   npx prisma generate
   ```

### 后台运行 Prisma 开发服务器

如果你想在后台运行 Prisma 开发服务器：

```bash
nohup npx prisma dev > prisma-dev.log 2>&1 &
```

查看日志：
```bash
tail -f prisma-dev.log
```

### 环境变量配置

项目已经配置好了 `.env` 文件，包含：
- `DATABASE_URL`: Prisma 连接字符串
- `DIRECT_URL`: 直接 PostgreSQL 连接（用于迁移）

### 故障排除

1. **500 错误**：确保 Prisma 开发服务器正在运行
2. **连接错误**：检查端口 51213-51215 是否被占用
3. **查看进程**：`ps aux | grep "prisma dev"`

### 生产环境

在生产环境中，请使用真实的 PostgreSQL 实例，并更新 `DATABASE_URL` 环境变量。