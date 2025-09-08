# 🚀 Руководство по развертыванию на серверных платформах

## Обзор

Данное руководство описывает развертывание проекта портфолио на различных серверных платформах с поддержкой динамических функций, баз данных и CMS функциональности.

## 📋 Содержание

1. [Подготовка проекта](#подготовка-проекта)
2. [Vercel с Serverless Functions](#vercel-с-serverless-functions)
3. [Netlify с Functions](#netlify-с-functions)
4. [Railway](#railway)
5. [Render](#render)
6. [DigitalOcean App Platform](#digitalocean-app-platform)
7. [AWS Amplify](#aws-amplify)
8. [Собственный VPS](#собственный-vps)
9. [Docker развертывание](#docker-развертывание)
10. [Настройка баз данных](#настройка-баз-данных)

## 🔧 Подготовка проекта

### 1. Обновление зависимостей

```bash
# Установка всех зависимостей включая серверные
npm install

# Установка дополнительных серверных зависимостей
npm install express cors helmet compression express-rate-limit
npm install prisma @prisma/client
npm install bcryptjs jsonwebtoken
npm install multer sharp
npm install nodemailer
```

### 2. Структура проекта для серверного развертывания

```
portfolio/
├── api/                 # API endpoints
│   ├── cms/            # CMS API routes
│   ├── contact/        # Contact form handling
│   ├── auth/           # Authentication
│   └── upload/         # File upload
├── server/             # Server configuration
│   ├── middleware/     # Custom middleware
│   ├── models/         # Database models
│   └── utils/          # Server utilities
├── prisma/             # Database schema
├── public/             # Static assets
├── components/         # React components
└── dist/               # Build output
```

### 3. Переменные окружения

Создайте файл `.env`:

```env
# Основные настройки
NODE_ENV=production
PORT=3000
SITE_URL=https://your-domain.com

# База данных
DATABASE_URL="postgresql://user:password@host:5432/portfolio_db"

# Аутентификация
JWT_SECRET="your-super-secret-jwt-key"
ADMIN_PASSWORD="your-admin-password-hash"

# Email (для контактной формы)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# Файловое хранилище
UPLOAD_PATH="/uploads"
MAX_FILE_SIZE=10485760

# Google Analytics
GA_MEASUREMENT_ID="G-XXXXXXXXXX"

# Внешние API
UNSPLASH_ACCESS_KEY="your-unsplash-key"

# E-commerce настройки (для будущего масштабирования)
YOOMONEY_SHOP_ID="your-shop-id"
YOOMONEY_SECRET_KEY="your-secret-key"
SBERBANK_USERNAME="your-username"
SBERBANK_PASSWORD="your-password"
TINKOFF_TERMINAL_KEY="your-terminal-key"
TINKOFF_SECRET_KEY="your-secret-key"
```

## ☁️ Vercel с Serverless Functions

### Конфигурация

Создайте `vercel.json`:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "dist/**",
      "use": "@vercel/static"
    },
    {
      "src": "api/**/*.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/dist/$1"
    }
  ],
  "functions": {
    "api/**/*.js": {
      "runtime": "nodejs18.x"
    }
  },
  "env": {
    "NODE_ENV": "production"
  }
}
```

### API Routes для Vercel

Создайте `api/cms/posts.js`:

```javascript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const posts = await prisma.post.findMany({
        where: { published: true },
        orderBy: { createdAt: 'desc' }
      })
      res.json(posts)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch posts' })
    }
  } else if (req.method === 'POST') {
    // Create new post
    try {
      const post = await prisma.post.create({
        data: req.body
      })
      res.json(post)
    } catch (error) {
      res.status(500).json({ error: 'Failed to create post' })
    }
  }
  
  // Handle other methods...
}
```

### Развертывание

```bash
# Установка Vercel CLI
npm i -g vercel

# Логин
vercel login

# Развертывание
vercel --prod

# Настройка переменных окружения
vercel env add DATABASE_URL
vercel env add JWT_SECRET
# ... добавить все остальные переменные
```

## 🌐 Netlify с Functions

### Конфигурация

Создайте `netlify.toml`:

```toml
[build]
  publish = "dist"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"

[functions]
  directory = "netlify/functions"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
```

### Netlify Functions

Создайте `netlify/functions/cms-posts.js`:

```javascript
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

exports.handler = async (event, context) => {
  const { httpMethod, body } = event

  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
  }

  if (httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' }
  }

  try {
    if (httpMethod === 'GET') {
      const posts = await prisma.post.findMany({
        where: { published: true },
        orderBy: { createdAt: 'desc' }
      })
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(posts)
      }
    }

    if (httpMethod === 'POST') {
      const data = JSON.parse(body)
      const post = await prisma.post.create({ data })
      
      return {
        statusCode: 201,
        headers,
        body: JSON.stringify(post)
      }
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    }
  }
}
```

## 🚂 Railway

### Конфигурация

Создайте `railway.json`:

```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start",
    "healthcheckPath": "/health"
  }
}
```

### Подготовка к развертыванию

```bash
# Установка Railway CLI
npm install -g @railway/cli

# Логин
railway login

# Инициализация проекта
railway init

# Добавление переменных окружения
railway variables set DATABASE_URL="your-database-url"
railway variables set JWT_SECRET="your-jwt-secret"

# Подключение PostgreSQL
railway add postgresql

# Развертывание
railway up
```

## 🎨 Render

### Конфигурация

Создайте `render.yaml`:

```yaml
services:
  - type: web
    name: portfolio
    env: node
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: DATABASE_URL
        fromDatabase:
          name: portfolio-db
          property: connectionString
    
databases:
  - name: portfolio-db
    databaseName: portfolio
    user: portfolio_user
```

### Развертывание

1. Подключите GitHub репозиторий к Render
2. Выберите "Web Service"
3. Настройте build и start команды:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
4. Добавьте переменные окружения
5. Подключите PostgreSQL database

## 🌊 DigitalOcean App Platform

### Конфигурация

Создайте `.do/app.yaml`:

```yaml
name: portfolio
services:
- name: web
  source_dir: /
  github:
    repo: your-username/portfolio
    branch: main
  run_command: npm start
  build_command: npm install && npm run build
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  routes:
  - path: /
  envs:
  - key: NODE_ENV
    value: production
  - key: DATABASE_URL
    value: ${db.DATABASE_URL}

databases:
- name: db
  engine: PG
  num_nodes: 1
  size: db-s-dev-database
```

## ☁️ AWS Amplify

### Конфигурация

Создайте `amplify.yml`:

```yaml
version: 1
backend:
  phases:
    build:
      commands:
        - '# Execute Amplify CLI with the helper script'
        - amplifyPush --simple
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

### Настройка Amplify Backend

```bash
# Установка Amplify CLI
npm install -g @aws-amplify/cli

# Инициализация
amplify init

# Добавление API
amplify add api

# Добавление хранилища
amplify add storage

# Добавление аутентификации
amplify add auth

# Публикация
amplify publish
```

## 🖥️ Собственный VPS

### Nginx конфигурация

Создайте `/etc/nginx/sites-available/portfolio`:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com www.your-domain.com;

    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    location /uploads {
        alias /var/www/portfolio/uploads;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

### PM2 конфигурация

Создайте `ecosystem.config.js`:

```javascript
module.exports = {
  apps: [{
    name: 'portfolio',
    script: 'server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
}
```

### Развертывание на VPS

```bash
# На локальной машине
git push origin main

# На сервере
git clone https://github.com/your-username/portfolio.git
cd portfolio

# Установка зависимостей
npm install

# Настройка переменных окружения
cp .env.example .env
nano .env

# Сборка проекта
npm run build

# Миграция базы данных
npx prisma migrate deploy
npx prisma generate

# Запуск с PM2
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup

# Настройка Nginx
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Настройка SSL
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

## 🐳 Docker развертывание

### Dockerfile

```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build
RUN npx prisma generate

FROM node:18-alpine AS runner

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/server.js ./server.js

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV NODE_ENV production

CMD ["npm", "start"]
```

### Docker Compose

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://postgres:password@db:5432/portfolio
      - JWT_SECRET=your-jwt-secret
    depends_on:
      - db
    restart: unless-stopped
    volumes:
      - ./uploads:/app/uploads

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=portfolio
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/ssl:ro
      - ./uploads:/var/www/uploads:ro
    depends_on:
      - web
    restart: unless-stopped

volumes:
  postgres_data:
```

### Команды Docker

```bash
# Сборка и запуск
docker-compose up -d

# Просмотр логов
docker-compose logs -f web

# Миграция базы данных
docker-compose exec web npx prisma migrate deploy

# Остановка
docker-compose down

# Обновление
git pull
docker-compose build
docker-compose up -d
```

## 💾 Настройка баз данных

### PostgreSQL (Рекомендуется)

```sql
-- Создание базы данных
CREATE DATABASE portfolio;
CREATE USER portfolio_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE portfolio TO portfolio_user;

-- Подключение к базе
\c portfolio

-- Создание расширений
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
```

### MongoDB

```javascript
// Подключение к MongoDB
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Схемы данных
const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  published: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});
```

### Supabase

```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'your-project-url'
const supabaseKey = 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Использование
const { data, error } = await supabase
  .from('posts')
  .select('*')
  .eq('published', true)
```

## 🔧 Устранение неполадок

### Проблема: Отсутствует package.json

```bash
# Если package.json отсутствует, создайте его:
npm init -y

# Затем установите зависимости:
npm install react react-dom typescript vite
npm install -D @types/react @types/react-dom
```

### Проблема: Ошибки сборки

```bash
# Очистка кэша
npm run clean
rm -rf node_modules package-lock.json
npm install

# Обновление зависимостей
npm update
```

### Проблема: Проблемы с базой данных

```bash
# Перезапуск миграций
npx prisma migrate reset
npx prisma migrate dev
npx prisma generate
```

## 📈 Мониторинг и логирование

### Winston Logger

```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});
```

### Health Check Endpoint

```javascript
// api/health.js
export default function handler(req, res) {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV
  });
}
```

---

## 🚀 Заключение

Выберите платформу развертывания в зависимости от ваших потребностей:

- **Vercel/Netlify**: Для статических сайтов с serverless функциями
- **Railway/Render**: Для полноценных веб-приложений
- **DigitalOcean/AWS**: Для масштабируемых проектов
- **VPS**: Для полного контроля над сервером

Все конфигурации подготовлены для масштабирования с e-commerce функциями и интеграцией российских платежных систем.