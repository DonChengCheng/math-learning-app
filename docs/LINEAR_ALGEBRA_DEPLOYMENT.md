# 线性代数课程系统部署方案

## 文档信息
- **项目名称**: 线性代数课程数据集成
- **版本**: 1.0
- **创建日期**: 2025-07-29
- **负责人**: 运维团队
- **文档类型**: 部署方案文档

## 1. 部署概述

### 1.1 部署目标
- 将线性代数课程数据安全、高效地部署到生产环境
- 确保数据导入过程零停机时间
- 建立完善的监控和回滚机制
- 保证数据完整性和一致性

### 1.2 部署策略
- **蓝绿部署**: 降低部署风险
- **灰度发布**: 逐步推广新功能
- **数据迁移**: 安全的数据导入流程
- **健康检查**: 实时监控系统状态

### 1.3 部署范围

**包含组件**:
- 线性代数种子数据脚本
- 数据验证和导入工具
- 配置文件和环境变量
- 监控和日志系统

**不包含组件**:
- 前端应用部署
- 基础设施配置
- 第三方服务集成

## 2. 环境规划

### 2.1 环境架构

```
┌─────────────────────────────────────────────────────────────┐
│                    生产环境架构                              │
├─────────────────────────────────────────────────────────────┤
│  负载均衡器 (Load Balancer)                                 │
│  ├── Nginx/HAProxy                                         │
│  └── SSL终端和流量分发                                      │
├─────────────────────────────────────────────────────────────┤
│  应用服务器集群 (Application Servers)                       │
│  ├── Node.js 应用实例 × 3                                  │
│  ├── Next.js 服务端渲染                                    │
│  └── Prisma ORM 连接层                                     │
├─────────────────────────────────────────────────────────────┤
│  数据库集群 (Database Cluster)                              │
│  ├── PostgreSQL 主库                                       │
│  ├── PostgreSQL 只读副本 × 2                               │
│  └── 连接池管理                                            │
├─────────────────────────────────────────────────────────────┤
│  监控和日志系统 (Monitoring & Logging)                      │
│  ├── Prometheus + Grafana                                 │
│  ├── ELK Stack (Elasticsearch, Logstash, Kibana)         │
│  └── 告警系统 (AlertManager)                               │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 环境配置

#### 开发环境 (Development)
```yaml
environment: development
database:
  host: localhost
  port: 5432
  database: math_learning_dev
  pool_size: 5
features:
  debug_mode: true
  detailed_logging: true
  test_data: true
performance:
  batch_size: 100
  timeout: 60000
```

#### 测试环境 (Staging)
```yaml
environment: staging
database:
  host: staging-db.example.com
  port: 5432
  database: math_learning_staging
  pool_size: 10
features:
  debug_mode: false
  detailed_logging: true
  test_data: false
performance:
  batch_size: 500
  timeout: 30000
```

#### 生产环境 (Production)
```yaml
environment: production
database:
  host: prod-db-cluster.example.com
  port: 5432
  database: math_learning_prod
  pool_size: 20
features:
  debug_mode: false
  detailed_logging: false
  test_data: false
performance:
  batch_size: 1000
  timeout: 30000
monitoring:
  metrics_enabled: true
  alerts_enabled: true
```

## 3. 部署准备

### 3.1 前置条件检查

#### 系统要求
- **操作系统**: Ubuntu 20.04+ / CentOS 8+
- **Node.js**: >= 16.14.0
- **NPM**: >= 8.0.0
- **PostgreSQL**: >= 12.0
- **内存**: >= 4GB
- **磁盘空间**: >= 10GB

#### 依赖服务检查
```bash
#!/bin/bash
# pre-deployment-check.sh

echo "正在检查系统环境..."

# 检查Node.js版本
NODE_VERSION=$(node --version | cut -d'v' -f2)
if [ "$(printf '%s\n' "16.14.0" "$NODE_VERSION" | sort -V | head -n1)" = "16.14.0" ]; then
    echo "✅ Node.js版本符合要求: $NODE_VERSION"
else
    echo "❌ Node.js版本过低: $NODE_VERSION，需要 >= 16.14.0"
    exit 1
fi

# 检查PostgreSQL连接
if psql "$DATABASE_URL" -c '\q' 2>/dev/null; then
    echo "✅ PostgreSQL数据库连接正常"
else
    echo "❌ 无法连接到PostgreSQL数据库"
    exit 1
fi

# 检查磁盘空间
AVAILABLE_SPACE=$(df / | awk 'NR==2 {print $4}')
REQUIRED_SPACE=10485760  # 10GB in KB
if [ "$AVAILABLE_SPACE" -gt "$REQUIRED_SPACE" ]; then
    echo "✅ 磁盘空间充足: $(($AVAILABLE_SPACE/1024/1024))GB"
else
    echo "❌ 磁盘空间不足，需要至少10GB"
    exit 1
fi

# 检查内存
TOTAL_MEM=$(free -m | awk 'NR==2{print $2}')
if [ "$TOTAL_MEM" -gt 4096 ]; then
    echo "✅ 内存充足: ${TOTAL_MEM}MB"
else
    echo "❌ 内存不足，需要至少4GB"
    exit 1
fi

echo "✅ 所有前置条件检查通过"
```

### 3.2 环境变量配置

#### 生产环境变量
```bash
# .env.production
# 数据库配置
DATABASE_URL="postgresql://username:password@prod-db-cluster.example.com:5432/math_learning_prod"
DIRECT_URL="postgresql://username:password@prod-db-direct.example.com:5432/math_learning_prod"

# 应用配置
NODE_ENV=production
PORT=3000
HOST=0.0.0.0

# 线性代数模块配置
LINEAR_ALGEBRA_BATCH_SIZE=1000
LINEAR_ALGEBRA_TIMEOUT=30000
LINEAR_ALGEBRA_ENABLE_VALIDATION=false
LINEAR_ALGEBRA_ENABLE_LOGGING=false

# 监控配置
MONITORING_ENABLED=true
METRICS_PORT=9090
LOG_LEVEL=info

# 安全配置
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="https://your-domain.com"

# 缓存配置
REDIS_URL="redis://redis-cluster.example.com:6379"
CACHE_TTL=3600
```

#### 敏感信息管理
```bash
# 使用密钥管理系统
kubectl create secret generic linear-algebra-secrets \
  --from-literal=database-password='your-db-password' \
  --from-literal=nextauth-secret='your-nextauth-secret' \
  --from-literal=redis-password='your-redis-password'
```

### 3.3 构建和打包

#### Docker容器化
```dockerfile
# Dockerfile
FROM node:16-alpine AS base

# 安装依赖
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production && npm cache clean --force

# 构建应用
FROM base AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

# 生产镜像
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/docs ./docs

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

#### Docker Compose配置
```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - DIRECT_URL=${DIRECT_URL}
    depends_on:
      - postgres
      - redis
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  postgres:
    image: postgres:13-alpine
    environment:
      - POSTGRES_DB=math_learning_prod
      - POSTGRES_USER=${DB_USER}
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./backups:/backups
    ports:
      - "5432:5432"
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    command: redis-server --requirepass ${REDIS_PASSWORD}
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - app
    restart: unless-stopped

volumes:
  postgres_data:
  redis_data:
```

## 4. 部署流程

### 4.1 蓝绿部署流程

#### 第一阶段：准备绿环境
```bash
#!/bin/bash
# deploy-green.sh

echo "开始准备绿环境..."

# 1. 创建绿环境实例
docker-compose -f docker-compose.green.yml up -d

# 2. 等待服务启动
echo "等待绿环境启动..."
sleep 30

# 3. 运行健康检查
if curl -f http://green.example.com:3000/api/health; then
    echo "✅ 绿环境健康检查通过"
else
    echo "❌ 绿环境健康检查失败"
    exit 1
fi

# 4. 运行数据库迁移
echo "运行数据库迁移..."
docker-compose -f docker-compose.green.yml exec app npx prisma migrate deploy

# 5. 导入线性代数数据
echo "导入线性代数课程数据..."
docker-compose -f docker-compose.green.yml exec app npm run seed-linear-algebra

# 6. 运行数据验证
echo "验证数据完整性..."
docker-compose -f docker-compose.green.yml exec app npm run validate-linear-algebra

if [ $? -eq 0 ]; then
    echo "✅ 绿环境准备完成"
else
    echo "❌ 绿环境准备失败"
    exit 1
fi
```

#### 第二阶段：流量切换
```bash
#!/bin/bash
# switch-traffic.sh

echo "开始流量切换..."

# 1. 更新负载均衡器配置
kubectl apply -f k8s/service-green.yml

# 2. 逐步切换流量
for i in {10..100..10}; do
    echo "切换${i}%流量到绿环境..."
    
    # 更新权重配置
    sed -i "s/weight: .*/weight: $i/" k8s/ingress.yml
    kubectl apply -f k8s/ingress.yml
    
    # 等待并监控
    sleep 60
    
    # 检查错误率
    ERROR_RATE=$(curl -s http://monitoring.example.com/api/error-rate | jq -r '.rate')
    if (( $(echo "$ERROR_RATE > 0.01" | bc -l) )); then
        echo "❌ 错误率过高，回滚流量"
        ./rollback.sh
        exit 1
    fi
    
    echo "✅ ${i}%流量切换成功"
done

echo "✅ 流量切换完成"
```

#### 第三阶段：清理蓝环境
```bash
#!/bin/bash
# cleanup-blue.sh

echo "开始清理蓝环境..."

# 1. 等待观察期
echo "等待观察期（30分钟）..."
sleep 1800

# 2. 检查系统稳定性
if ! ./health-check.sh; then
    echo "❌ 系统不稳定，保留蓝环境"
    exit 1
fi

# 3. 停止蓝环境
docker-compose -f docker-compose.blue.yml down

# 4. 清理资源
docker system prune -f

echo "✅ 蓝环境清理完成"
```

### 4.2 灰度发布流程

#### 灰度配置
```yaml
# k8s/canary-deployment.yml
apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: linear-algebra-rollout
spec:
  replicas: 5
  strategy:
    canary:
      steps:
      - setWeight: 10
      - pause: {duration: 10m}
      - setWeight: 20
      - pause: {duration: 10m}
      - setWeight: 50
      - pause: {duration: 10m}
      - setWeight: 100
      canaryService: linear-algebra-canary
      stableService: linear-algebra-stable
      trafficRouting:
        nginx:
          stableIngress: linear-algebra-stable
          annotationPrefix: nginx.ingress.kubernetes.io
          additionalIngressAnnotations:
            canary-by-header: X-Canary
  selector:
    matchLabels:
      app: linear-algebra
  template:
    metadata:
      labels:
        app: linear-algebra
    spec:
      containers:
      - name: app
        image: your-registry/linear-algebra:latest
        env:
        - name: CANARY_ENABLED
          value: "true"
```

#### 灰度监控
```bash
#!/bin/bash
# canary-monitor.sh

echo "开始监控灰度发布..."

while true; do
    # 检查成功率
    SUCCESS_RATE=$(curl -s http://monitoring.example.com/api/success-rate | jq -r '.rate')
    
    # 检查响应时间
    RESPONSE_TIME=$(curl -s http://monitoring.example.com/api/response-time | jq -r '.p95')
    
    # 检查错误日志
    ERROR_COUNT=$(curl -s http://logging.example.com/api/errors/count | jq -r '.count')
    
    echo "成功率: ${SUCCESS_RATE}%, 响应时间: ${RESPONSE_TIME}ms, 错误数: ${ERROR_COUNT}"
    
    # 判断是否需要回滚
    if (( $(echo "$SUCCESS_RATE < 99.5" | bc -l) )) || \
       (( $(echo "$RESPONSE_TIME > 500" | bc -l) )) || \
       [ "$ERROR_COUNT" -gt 10 ]; then
        echo "❌ 检测到问题，执行回滚"
        kubectl argo rollouts abort linear-algebra-rollout
        exit 1
    fi
    
    sleep 30
done
```

### 4.3 数据迁移流程

#### 数据备份
```bash
#!/bin/bash
# backup-data.sh

BACKUP_DIR="/backups/$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"

echo "开始数据备份..."

# 1. 备份数据库
pg_dump "$DATABASE_URL" > "$BACKUP_DIR/database.sql"

# 2. 备份配置文件
cp -r /app/config "$BACKUP_DIR/"
cp .env.production "$BACKUP_DIR/"

# 3. 创建备份清单
cat > "$BACKUP_DIR/backup-manifest.json" << EOF
{
  "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "database_size": "$(du -h $BACKUP_DIR/database.sql | cut -f1)",
  "files": [
    "database.sql",
    "config/",
    ".env.production"
  ],
  "version": "$(git rev-parse HEAD)"
}
EOF

# 4. 压缩备份
tar -czf "$BACKUP_DIR.tar.gz" -C "$BACKUP_DIR" .
rm -rf "$BACKUP_DIR"

echo "✅ 备份完成: $BACKUP_DIR.tar.gz"
```

#### 数据导入脚本
```bash
#!/bin/bash
# deploy-linear-algebra-data.sh

echo "开始部署线性代数课程数据..."

# 1. 设置环境变量
export NODE_ENV=production
export DATABASE_URL="$PROD_DATABASE_URL"

# 2. 检查数据库连接
if ! npx prisma db pull; then
    echo "❌ 数据库连接失败"
    exit 1
fi

# 3. 运行数据库迁移
echo "运行数据库迁移..."
npx prisma migrate deploy

if [ $? -ne 0 ]; then
    echo "❌ 数据库迁移失败"
    exit 1
fi

# 4. 导入线性代数数据
echo "导入线性代数课程数据..."
npm run seed-linear-algebra 2>&1 | tee /var/log/linear-algebra-import.log

if [ $? -ne 0 ]; then
    echo "❌ 数据导入失败"
    exit 1
fi

# 5. 验证数据完整性
echo "验证数据完整性..."
npm run validate-linear-algebra

if [ $? -ne 0 ]; then
    echo "❌ 数据验证失败"
    exit 1
fi

# 6. 生成导入报告
cat > /var/log/import-report.json << EOF
{
  "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "status": "success",
  "courses_imported": $(echo "SELECT COUNT(*) FROM courses WHERE subject='线性代数';" | psql -t "$DATABASE_URL"),
  "chapters_imported": $(echo "SELECT COUNT(*) FROM chapters WHERE course_id IN (SELECT id FROM courses WHERE subject='线性代数');" | psql -t "$DATABASE_URL"),
  "lessons_imported": $(echo "SELECT COUNT(*) FROM lessons WHERE chapter_id IN (SELECT id FROM chapters WHERE course_id IN (SELECT id FROM courses WHERE subject='线性代数'));" | psql -t "$DATABASE_URL"),
  "problems_imported": $(echo "SELECT COUNT(*) FROM problems WHERE lesson_id IN (SELECT id FROM lessons WHERE chapter_id IN (SELECT id FROM chapters WHERE course_id IN (SELECT id FROM courses WHERE subject='线性代数')));" | psql -t "$DATABASE_URL")
}
EOF

echo "✅ 线性代数课程数据部署完成"
```

## 5. 监控和告警

### 5.1 监控指标

#### 系统指标
```yaml
# prometheus/linear-algebra-metrics.yml
groups:
- name: linear-algebra.rules
  rules:
  - alert: LinearAlgebraImportFailed
    expr: linear_algebra_import_success_total == 0
    for: 1m
    labels:
      severity: critical
    annotations:
      summary: "线性代数数据导入失败"
      description: "线性代数课程数据导入过程失败"

  - alert: LinearAlgebraHighMemoryUsage
    expr: process_resident_memory_bytes > 500 * 1024 * 1024
    for: 5m
    labels:
      severity: warning
    annotations:
      summary: "线性代数模块内存使用过高"
      description: "内存使用超过500MB，当前: {{ $value }}"

  - alert: LinearAlgebraSlowQuery
    expr: linear_algebra_query_duration_seconds > 0.1
    for: 2m
    labels:
      severity: warning
    annotations:
      summary: "线性代数查询响应缓慢"
      description: "查询响应时间超过100ms，当前: {{ $value }}s"
```

#### 业务指标
```typescript
// lib/metrics.ts
import { register, Counter, Histogram, Gauge } from 'prom-client';

export const Metrics = {
  // 导入指标
  importSuccess: new Counter({
    name: 'linear_algebra_import_success_total',
    help: '线性代数数据导入成功次数'
  }),

  importDuration: new Histogram({
    name: 'linear_algebra_import_duration_seconds',
    help: '线性代数数据导入耗时',
    buckets: [1, 5, 10, 30, 60, 120]
  }),

  // 查询指标
  queryDuration: new Histogram({
    name: 'linear_algebra_query_duration_seconds',
    help: '线性代数查询耗时',
    buckets: [0.01, 0.05, 0.1, 0.5, 1]
  }),

  // 数据指标
  totalCourses: new Gauge({
    name: 'linear_algebra_courses_total',
    help: '线性代数课程总数'
  }),

  totalProblems: new Gauge({
    name: 'linear_algebra_problems_total',
    help: '线性代数题目总数'
  })
};

// 注册指标
register.registerMetric(Metrics.importSuccess);
register.registerMetric(Metrics.importDuration);
register.registerMetric(Metrics.queryDuration);
register.registerMetric(Metrics.totalCourses);
register.registerMetric(Metrics.totalProblems);
```

### 5.2 日志管理

#### 日志配置
```typescript
// lib/logger.ts
import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { 
    service: 'linear-algebra',
    version: process.env.APP_VERSION 
  },
  transports: [
    new winston.transports.File({ 
      filename: '/var/log/linear-algebra-error.log', 
      level: 'error' 
    }),
    new winston.transports.File({ 
      filename: '/var/log/linear-algebra-combined.log' 
    })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

export default logger;
```

#### 结构化日志示例
```typescript
// 数据导入日志
logger.info('开始导入线性代数数据', {
  action: 'import_start',
  course: 'linear_algebra',
  timestamp: new Date().toISOString()
});

logger.info('章节创建完成', {
  action: 'chapter_created',
  chapter_id: 'chapter-1',
  chapter_title: '行列式',
  lesson_count: 4
});

logger.error('数据导入失败', {
  action: 'import_failed',
  error: error.message,
  stack: error.stack,
  data: { courseId, chapterId }
});
```

### 5.3 告警配置

#### AlertManager配置
```yaml
# alertmanager/config.yml
global:
  smtp_smarthost: 'smtp.example.com:587'
  smtp_from: 'alerts@example.com'

route:
  group_by: ['alertname']
  group_wait: 10s
  group_interval: 10s
  repeat_interval: 1h
  receiver: 'web.hook'
  routes:
  - match:
      service: linear-algebra
    receiver: 'linear-algebra-team'

receivers:
- name: 'web.hook'
  webhook_configs:
  - url: 'http://webhook.example.com/alerts'

- name: 'linear-algebra-team'
  email_configs:
  - to: 'dev-team@example.com'
    subject: '线性代数模块告警: {{ .GroupLabels.alertname }}'
    body: |
      {{ range .Alerts }}
      告警名称: {{ .Annotations.summary }}
      告警描述: {{ .Annotations.description }}
      告警时间: {{ .StartsAt }}
      标签: {{ .Labels }}
      {{ end }}
  slack_configs:
  - api_url: 'YOUR_SLACK_WEBHOOK_URL'
    channel: '#linear-algebra-alerts'
    title: '线性代数模块告警'
    text: '{{ range .Alerts }}{{ .Annotations.summary }}{{ end }}'
```

## 6. 回滚方案

### 6.1 自动回滚触发条件

```yaml
# 回滚触发条件
rollback_triggers:
  error_rate:
    threshold: 5%
    duration: 2m
  response_time:
    threshold: 1000ms
    duration: 5m
  availability:
    threshold: 99%
    duration: 1m
  custom_metrics:
    import_failure_rate:
      threshold: 1%
      duration: 1m
```

### 6.2 回滚执行脚本

```bash
#!/bin/bash
# rollback.sh

echo "开始执行回滚操作..."

ROLLBACK_VERSION=${1:-"previous"}
BACKUP_DIR="/backups"

# 1. 停止新版本服务
echo "停止新版本服务..."
docker-compose -f docker-compose.green.yml down

# 2. 恢复数据库
if [ -f "$BACKUP_DIR/database-backup.sql" ]; then
    echo "恢复数据库..."
    psql "$DATABASE_URL" < "$BACKUP_DIR/database-backup.sql"
else
    echo "❌ 未找到数据库备份文件"
    exit 1
fi

# 3. 切换流量到稳定版本
echo "切换流量到稳定版本..."
kubectl apply -f k8s/service-stable.yml

# 4. 验证回滚结果
echo "验证回滚结果..."
sleep 30

if curl -f http://stable.example.com/api/health; then
    echo "✅ 回滚成功"
    
    # 发送回滚通知
    curl -X POST "$SLACK_WEBHOOK_URL" \
      -H 'Content-type: application/json' \
      --data '{"text":"线性代数模块已成功回滚到稳定版本"}'
else
    echo "❌ 回滚验证失败"
    exit 1
fi

# 5. 清理资源
docker system prune -f

echo "✅ 回滚操作完成"
```

### 6.3 数据回滚策略

```sql
-- 数据回滚SQL脚本
-- rollback-linear-algebra.sql

BEGIN;

-- 记录回滚操作
INSERT INTO deployment_log (action, target, timestamp, operator)
VALUES ('rollback', 'linear_algebra_data', NOW(), 'deployment_system');

-- 删除线性代数相关数据
DELETE FROM problems 
WHERE lesson_id IN (
  SELECT l.id FROM lessons l
  JOIN chapters c ON l.chapter_id = c.id
  JOIN courses co ON c.course_id = co.id
  WHERE co.subject = '线性代数'
);

DELETE FROM lessons 
WHERE chapter_id IN (
  SELECT c.id FROM chapters c
  JOIN courses co ON c.course_id = co.id
  WHERE co.subject = '线性代数'
);

DELETE FROM chapters 
WHERE course_id IN (
  SELECT id FROM courses WHERE subject = '线性代数'
);

DELETE FROM courses WHERE subject = '线性代数';

-- 验证删除结果
DO $$
DECLARE
  remaining_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO remaining_count 
  FROM courses WHERE subject = '线性代数';
  
  IF remaining_count > 0 THEN
    RAISE EXCEPTION '数据删除不完整，剩余课程数: %', remaining_count;
  END IF;
  
  RAISE NOTICE '线性代数数据回滚完成';
END $$;

COMMIT;
```

## 7. 安全考虑

### 7.1 部署安全

#### 权限控制
```yaml
# k8s/rbac.yml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: linear-algebra
  name: linear-algebra-deployer
rules:
- apiGroups: [""]
  resources: ["pods", "services", "configmaps", "secrets"]
  verbs: ["get", "list", "create", "update", "patch", "delete"]
- apiGroups: ["apps"]
  resources: ["deployments", "replicasets"]
  verbs: ["get", "list", "create", "update", "patch", "delete"]

---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: linear-algebra-deployer-binding
  namespace: linear-algebra
subjects:
- kind: User
  name: deployment-user
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role
  name: linear-algebra-deployer
  apiGroup: rbac.authorization.k8s.io
```

#### 镜像安全扫描
```bash
#!/bin/bash
# security-scan.sh

echo "开始安全扫描..."

# 1. 扫描Docker镜像
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
  anchore/grype:latest \
  your-registry/linear-algebra:latest > security-report.json

# 2. 检查高危漏洞
HIGH_VULNS=$(jq '.matches[] | select(.vulnerability.severity == "High")' security-report.json | jq -s length)

if [ "$HIGH_VULNS" -gt 0 ]; then
    echo "❌ 发现 $HIGH_VULNS 个高危漏洞，停止部署"
    exit 1
fi

# 3. 检查依赖包漏洞
npm audit --audit-level high

if [ $? -ne 0 ]; then
    echo "❌ 发现高危依赖漏洞，停止部署"
    exit 1
fi

echo "✅ 安全扫描通过"
```

### 7.2 数据安全

#### 数据加密
```typescript
// lib/encryption.ts
import crypto from 'crypto';

export class DataEncryption {
  private readonly algorithm = 'aes-256-gcm';
  private readonly key: Buffer;

  constructor(secretKey: string) {
    this.key = crypto.scryptSync(secretKey, 'salt', 32);
  }

  encrypt(text: string): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipher(this.algorithm, this.key);
    cipher.setAAD(Buffer.from('linear-algebra-data', 'utf8'));
    
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const authTag = cipher.getAuthTag();
    
    return iv.toString('hex') + ':' + authTag.toString('hex') + ':' + encrypted;
  }

  decrypt(encryptedData: string): string {
    const parts = encryptedData.split(':');
    const iv = Buffer.from(parts[0], 'hex');
    const authTag = Buffer.from(parts[1], 'hex');
    const encrypted = parts[2];
    
    const decipher = crypto.createDecipher(this.algorithm, this.key);
    decipher.setAAD(Buffer.from('linear-algebra-data', 'utf8'));
    decipher.setAuthTag(authTag);
    
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  }
}
```

#### 敏感数据处理
```typescript
// 敏感数据掩码
export function maskSensitiveData(data: any): any {
  const sensitiveFields = ['password', 'secret', 'token', 'key'];
  
  if (typeof data === 'object' && data !== null) {
    const masked = { ...data };
    
    for (const [key, value] of Object.entries(masked)) {
      if (sensitiveFields.some(field => key.toLowerCase().includes(field))) {
        masked[key] = '***masked***';
      } else if (typeof value === 'object') {
        masked[key] = maskSensitiveData(value);
      }
    }
    
    return masked;
  }
  
  return data;
}
```

## 8. 性能优化

### 8.1 数据库优化

#### 索引策略
```sql
-- 线性代数模块索引优化
-- indexes.sql

-- 课程查询索引
CREATE INDEX IF NOT EXISTS idx_courses_subject_level 
ON courses(subject, level) 
WHERE subject = '线性代数';

-- 章节查询索引
CREATE INDEX IF NOT EXISTS idx_chapters_course_order 
ON chapters(course_id, "order");

-- 课时查询索引
CREATE INDEX IF NOT EXISTS idx_lessons_chapter_order 
ON lessons(chapter_id, "order");

-- 题目查询索引
CREATE INDEX IF NOT EXISTS idx_problems_lesson_difficulty 
ON problems(lesson_id, difficulty);

-- 复合查询索引
CREATE INDEX IF NOT EXISTS idx_lessons_full_path 
ON lessons(id) 
INCLUDE (title, content, chapter_id);

-- 分析表统计信息
ANALYZE courses, chapters, lessons, problems;
```

#### 连接池优化
```typescript
// lib/database.ts
import { PrismaClient } from '@prisma/client';

export const db = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  },
  log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
  errorFormat: 'pretty'
});

// 连接池配置
const connectionString = new URL(process.env.DATABASE_URL!);
connectionString.searchParams.set('connection_limit', '20');
connectionString.searchParams.set('pool_timeout', '20');
connectionString.searchParams.set('schema', 'public');

// 生产环境优化
if (process.env.NODE_ENV === 'production') {
  connectionString.searchParams.set('statement_timeout', '30s');
  connectionString.searchParams.set('idle_in_transaction_session_timeout', '5min');
}
```

### 8.2 应用优化

#### 缓存策略
```typescript
// lib/cache.ts
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

export class LinearAlgebraCache {
  private readonly prefix = 'linear_algebra:';
  private readonly ttl = 3600; // 1小时

  async getCourse(courseId: string) {
    const cacheKey = `${this.prefix}course:${courseId}`;
    const cached = await redis.get(cacheKey);
    
    if (cached) {
      return JSON.parse(cached);
    }
    
    // 缓存未命中，从数据库获取
    const course = await db.course.findUnique({
      where: { id: courseId },
      include: {
        chapters: {
          include: {
            lessons: {
              include: {
                problems: true
              }
            }
          }
        }
      }
    });
    
    if (course) {
      await redis.setex(cacheKey, this.ttl, JSON.stringify(course));
    }
    
    return course;
  }

  async invalidateCourse(courseId: string) {
    const cacheKey = `${this.prefix}course:${courseId}`;
    await redis.del(cacheKey);
  }

  async warmupCache() {
    const courses = await db.course.findMany({
      where: { subject: '线性代数' }
    });
    
    for (const course of courses) {
      await this.getCourse(course.id);
    }
  }
}
```

#### 批量处理优化
```typescript
// lib/batch-processor.ts
export class BatchProcessor {
  private readonly batchSize: number;
  private readonly concurrency: number;

  constructor(batchSize = 100, concurrency = 5) {
    this.batchSize = batchSize;
    this.concurrency = concurrency;
  }

  async processBatch<T>(
    items: T[],
    processor: (batch: T[]) => Promise<void>
  ): Promise<void> {
    const batches = this.chunkArray(items, this.batchSize);
    
    // 使用信号量控制并发
    const semaphore = new Semaphore(this.concurrency);
    
    const promises = batches.map(async (batch) => {
      await semaphore.acquire();
      try {
        await processor(batch);
      } finally {
        semaphore.release();
      }
    });
    
    await Promise.all(promises);
  }

  private chunkArray<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }
}

class Semaphore {
  private permits: number;
  private waitQueue: (() => void)[] = [];

  constructor(permits: number) {
    this.permits = permits;
  }

  async acquire(): Promise<void> {
    return new Promise((resolve) => {
      if (this.permits > 0) {
        this.permits--;
        resolve();
      } else {
        this.waitQueue.push(resolve);
      }
    });
  }

  release(): void {
    this.permits++;
    if (this.waitQueue.length > 0) {
      const resolve = this.waitQueue.shift()!;
      this.permits--;
      resolve();
    }
  }
}
```

## 9. 故障排除

### 9.1 常见问题诊断

#### 部署失败诊断
```bash
#!/bin/bash
# diagnose-deployment.sh

echo "开始诊断部署问题..."

# 1. 检查系统资源
echo "=== 系统资源检查 ==="
df -h
free -h
top -n 1 -b | head -20

# 2. 检查Docker服务
echo "=== Docker服务检查 ==="
docker info
docker ps -a
docker logs linear-algebra-app --tail 50

# 3. 检查数据库连接
echo "=== 数据库连接检查 ==="
if psql "$DATABASE_URL" -c '\q' 2>/dev/null; then
    echo "✅ 数据库连接正常"
    
    # 检查表结构
    psql "$DATABASE_URL" -c "\dt" | grep -E "(courses|chapters|lessons|problems)"
else
    echo "❌ 数据库连接失败"
    
    # 检查数据库服务
    systemctl status postgresql
fi

# 4. 检查网络连接
echo "=== 网络连接检查 ==="
netstat -tlnp | grep :3000
curl -I http://localhost:3000/api/health

# 5. 检查日志
echo "=== 应用日志检查 ==="
tail -50 /var/log/linear-algebra-error.log
tail -50 /var/log/linear-algebra-combined.log

echo "诊断完成"
```

#### 性能问题诊断
```bash
#!/bin/bash
# diagnose-performance.sh

echo "开始性能问题诊断..."

# 1. 检查数据库性能
echo "=== 数据库性能分析 ==="
psql "$DATABASE_URL" << EOF
SELECT schemaname, tablename, n_tup_ins, n_tup_upd, n_tup_del, n_live_tup, n_dead_tup
FROM pg_stat_user_tables 
WHERE tablename IN ('courses', 'chapters', 'lessons', 'problems');

SELECT query, calls, total_time, mean_time, rows
FROM pg_stat_statements 
WHERE query LIKE '%linear%' OR query LIKE '%courses%'
ORDER BY total_time DESC LIMIT 10;
EOF

# 2. 检查应用性能
echo "=== 应用性能分析 ==="
# 内存使用
ps aux | grep node | grep -v grep

# 磁盘I/O
iostat -x 1 3

# 网络连接
ss -tuln | grep :3000

# 3. 检查缓存性能
echo "=== 缓存性能分析 ==="
redis-cli info memory
redis-cli info stats

# 4. 生成性能报告
echo "=== 生成性能报告 ==="
cat > performance-report.json << EOF
{
  "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "memory_usage": "$(free -m | awk 'NR==2{printf "%.1f%%", $3*100/$2}')",
  "disk_usage": "$(df / | awk 'NR==2{printf "%.1f%%", $5}')",
  "cpu_load": "$(uptime | awk -F'load average:' '{print $2}')",
  "active_connections": "$(ss -tuln | grep :3000 | wc -l)"
}
EOF

echo "性能诊断完成，报告保存至 performance-report.json"
```

### 9.2 故障恢复流程

#### 自动恢复脚本
```bash
#!/bin/bash
# auto-recovery.sh

echo "开始自动恢复流程..."

MAX_RETRY=3
RETRY_COUNT=0

while [ $RETRY_COUNT -lt $MAX_RETRY ]; do
    echo "尝试恢复 (第 $((RETRY_COUNT + 1)) 次)..."
    
    # 1. 重启应用服务
    docker-compose restart app
    
    # 2. 等待服务启动
    sleep 30
    
    # 3. 健康检查
    if curl -f http://localhost:3000/api/health; then
        echo "✅ 服务恢复成功"
        
        # 发送恢复通知
        curl -X POST "$SLACK_WEBHOOK_URL" \
          -H 'Content-type: application/json' \
          --data '{"text":"线性代数模块已自动恢复正常"}'
        
        exit 0
    fi
    
    RETRY_COUNT=$((RETRY_COUNT + 1))
    echo "恢复失败，等待重试..."
    sleep 60
done

echo "❌ 自动恢复失败，需要人工介入"

# 发送故障通知
curl -X POST "$SLACK_WEBHOOK_URL" \
  -H 'Content-type: application/json' \
  --data '{"text":"线性代数模块自动恢复失败，需要人工介入处理"}'

exit 1
```

## 10. 验收和交付

### 10.1 部署验收清单

#### 功能验收
- [ ] 线性代数课程数据成功导入
- [ ] 所有8个章节创建完成
- [ ] 35个课时内容正确显示
- [ ] 约100道题目可正常访问
- [ ] LaTeX公式正确渲染
- [ ] API接口响应正常

#### 性能验收
- [ ] 数据导入时间 < 30秒
- [ ] 页面加载时间 < 2秒
- [ ] API响应时间 < 100ms
- [ ] 内存使用 < 500MB
- [ ] 并发支持 > 100用户

#### 安全验收
- [ ] 安全扫描无高危漏洞
- [ ] 访问权限配置正确
- [ ] 敏感数据加密存储
- [ ] 审计日志正常记录

#### 运维验收
- [ ] 监控告警正常工作
- [ ] 日志收集和分析正常
- [ ] 备份恢复流程验证
- [ ] 自动化部署流程测试

### 10.2 交付文档

#### 交付清单
```markdown
# 线性代数课程系统交付清单

## 代码交付
- [x] 源代码提交到主分支
- [x] Docker镜像推送到仓库
- [x] 配置文件模板提供
- [x] 种子数据脚本完成

## 文档交付
- [x] 需求规格说明书
- [x] 技术设计文档
- [x] 部署方案文档
- [x] 运维手册
- [x] 故障排除指南

## 环境交付
- [x] 生产环境部署完成
- [x] 监控告警配置完成
- [x] 备份策略实施
- [x] 安全加固完成

## 培训交付
- [x] 运维团队培训完成
- [x] 开发团队交接完成
- [x] 文档移交完成
- [x] 知识库更新完成
```

#### 移交会议记录
```markdown
# 线性代数课程系统移交会议纪要

**时间**: 2025-07-29 14:00-15:00
**参会人员**: 开发团队、运维团队、产品团队

## 移交内容确认
1. ✅ 代码和配置移交完成
2. ✅ 文档移交完成
3. ✅ 环境配置移交完成
4. ✅ 监控告警移交完成

## 后续支持安排
- **技术支持**: 开发团队提供1个月技术支持
- **问题处理**: 建立问题反馈和处理流程
- **知识转移**: 安排3次技术分享会议

## 验收确认
- 运维团队确认已掌握部署和运维流程
- 产品团队确认功能满足需求
- 开发团队承诺后续支持

**会议结论**: 线性代数课程系统正式移交给运维团队维护
```

---

**文档版本**: 1.0  
**最后更新**: 2025-07-29  
**下次评审**: 部署完成后1周