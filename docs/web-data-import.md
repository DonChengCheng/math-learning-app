# 网络数据导入功能

本文档说明如何使用新的网络数据导入功能，直接从外部数据源获取课程内容并导入数据库。

## 架构概述

新的数据导入架构包含以下核心组件：

1. **数据源配置** (`config/data-sources.ts`)
   - 定义各种数据源（GitHub, API, Markdown等）
   - 支持认证、速率限制、缓存等配置

2. **内容获取服务** (`lib/content-fetcher.ts`)
   - 从网络获取数据
   - 自动重试和错误处理
   - 缓存管理
   - 速率限制控制

3. **增强导入器** (`lib/enhanced-linear-algebra-importer.ts`)
   - 支持网络和本地数据源
   - 批量并行处理
   - 进度追踪
   - 错误恢复

4. **种子脚本** (`prisma/seed-from-web.ts`)
   - 命令行界面
   - 支持多种选项

## 使用方法

### 基本用法

```bash
# 从默认数据源导入线性代数
npm run seed-web

# 导入特定主题
npm run seed-web -- --subject 微积分

# 清理旧数据后导入
npm run seed-web:clean

# 检查数据源健康状态
npm run seed-web:check

# 干运行（仅获取数据不导入）
npm run seed-web:dry
```

### 高级选项

```bash
# 使用特定数据源
npx tsx prisma/seed-from-web.ts --source github-linear-algebra

# 批量导入多个主题
npm run seed-web:all

# 查看帮助
npx tsx prisma/seed-from-web.ts --help
```

## 配置数据源

### 添加新数据源

在 `config/data-sources.ts` 中添加新的数据源配置：

```typescript
export const dataSources: Record<string, DataSource> = {
  myNewSource: {
    id: 'my-new-source',
    name: 'My New Data Source',
    description: '描述',
    type: 'api',
    url: 'https://api.example.com/courses',
    headers: {
      'Accept': 'application/json'
    },
    auth: {
      type: 'bearer',
      token: process.env.MY_API_TOKEN
    },
    rateLimit: {
      requests: 100,
      period: 3600
    }
  }
}
```

### 映射主题到数据源

```typescript
export const subjectSourceMapping: Record<string, string> = {
  '我的主题': 'myNewSource'
}
```

## 环境变量

可以通过环境变量配置数据源：

```bash
# .env.local
LINEAR_ALGEBRA_DATA_URL=https://your-data-source.com/linear-algebra.json
EDUCATION_API_URL=https://api.your-education-site.com/v1/courses
EDUCATION_API_TOKEN=your-api-token
USE_MOCK_DATA=true  # 使用模拟数据进行测试
MOCK_SERVER_URL=http://localhost:3002/api/mock-courses
CLEAN_OLD_DATA=true  # 导入前清理旧数据
```

## 数据格式

数据源应返回以下格式的 JSON：

```typescript
{
  course: {
    title: string
    description: string
    level: string
    subject: string
    order: number
    chapters: [
      {
        title: string
        description: string
        order: number
        lessons: [
          {
            title: string
            content: string  // 支持 Markdown 和 LaTeX
            videoUrl?: string
            order: number
            problems: [
              {
                title: string
                content: string
                type: 'multiple_choice' | 'fill_blank' | 'solution'
                difficulty: number
                points: number
                answer: any
                explanation?: string
                tags: string[]
              }
            ]
          }
        ]
      }
    ]
  }
}
```

## 测试

### 使用模拟服务器测试

1. 启动模拟数据服务器：
```bash
npx tsx scripts/mock-data-server.ts
```

2. 导入测试数据：
```bash
npm run seed-web -- --subject 测试课程
```

### 健康检查

检查所有配置的数据源是否可用：
```bash
npm run seed-web:check
```

## 数据转换

如果外部数据源的格式不同，可以定义转换函数：

```typescript
// 在 config/data-sources.ts 中
export const defaultTransformers = {
  myTransform: (data: any) => {
    // 转换逻辑
    return transformedData
  }
}
```

## 错误处理

系统包含以下错误处理机制：

1. **自动重试** - 网络请求失败时自动重试（默认3次）
2. **速率限制** - 自动遵守 API 速率限制
3. **缓存** - 减少重复请求
4. **进度追踪** - 显示导入进度和错误
5. **部分成功** - 即使某些数据失败也继续导入

## 性能优化

- **批量处理** - 章节和题目并行导入
- **流式处理** - 支持大数据集
- **缓存** - 减少网络请求
- **增量更新** - 支持更新现有数据

## 注意事项

1. 确保数据源 URL 可访问
2. 设置正确的认证信息
3. 遵守 API 速率限制
4. 定期检查数据源健康状态
5. 大数据集可能需要较长导入时间

## 故障排除

### 常见问题

1. **代理问题**
```bash
unset http_proxy https_proxy
```

2. **端口冲突**
```bash
MOCK_SERVER_PORT=3003 npx tsx scripts/mock-data-server.ts
```

3. **数据库连接失败**
```bash
npx prisma db push
npx prisma generate
```

4. **认证失败**
确保环境变量中设置了正确的 API token。

## 扩展性

系统设计为易于扩展：

1. 添加新的数据源类型
2. 自定义数据转换器
3. 实现新的认证方式
4. 添加更多缓存策略
5. 支持更多数据格式（XML, CSV等）