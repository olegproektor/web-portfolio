# 🔧 Workflow настройки окружения для портфолио

## 📋 Проблема отсутствующих зависимостей

Если при развертывании проекта возникает проблема с отсутствующим `package.json` или неустановленными зависимостями, следуйте данному workflow.

## 🚨 Диагностика проблем

### 1. Проверка наличия основных файлов

```bash
# Проверьте наличие основных файлов
ls -la

# Ищите следующие файлы:
# ✅ package.json - управление зависимостями
# ✅ vite.config.ts - конфигурация сборщика
# ✅ tsconfig.json - конфигурация TypeScript
# ✅ index.html - точка входа
# ✅ App.tsx - главный компонент
```

### 2. Проверка содержимого package.json

```bash
# Если package.json существует, проверьте его содержимое
cat package.json

# Убедитесь, что содержит основные секции:
# - "name"
# - "version"
# - "scripts"
# - "dependencies"
# - "devDependencies"
```

## ⚙️ Конфигурация окружения

### Файлы окружения

Проект поддерживает различные режимы работы через переменные окружения:

- **`.env`** - основной файл конфигурации (используется во всех режимах)
- **`.env.example`** - пример файла конфигурации
- **`.env.development`** - специфичные настройки для разработки
- **`.env.production`** - специфичные настройки для продакшена
- **`.env.local`** - локальные настройки (игнорируются Git)
- **`.env.development.local`** - локальные настройки для разработки
- **`.env.production.local`** - локальные настройки для продакшена

### Приоритет переменных окружения

Переменные окружения загружаются с следующим приоритетом (от высшего к низшему):
1. **Системные переменные окружения** (export в shell, переменные Docker, переменные платформы)
2. **.env.local** (если существует)
3. **.env.[mode].local** (если существует, где [mode] - development или production)
4. **.env.[mode]** (зависит от NODE_ENV)
5. **.env**
6. **Значения по умолчанию в коде**

### Основные переменные окружения

```env
# Google Analytics (опционально)
VITE_GA_ID=G-XXXXXXXXXX

# Supabase Configuration (опционально - если не указано, используется localStorage)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# Режим разработки
NODE_ENV=development
```

### Режимы работы

1. **Демо-режим** (по умолчанию):
   - Работает без настройки Supabase
   - Использует тестовые данные
   - Полная функциональность CMS
   - Данные сохраняются в localStorage

2. **Полный режим с Supabase**:
   - Облачное хранение данных
   - Полное CRUD управление
   - Система аутентификации
   - Real-time возможности
   - Масштабируемость

## 🛠️ Решение проблем

### Сценарий 1: package.json отсутствует полностью

```bash
# Создайте package.json с нуля
npm init -y

# Обновите базовую информацию
npm pkg set name="oleg-portfolio"
npm pkg set version="2.0.0"
npm pkg set description="Современный адаптивный сайт-портфолио с CMS панелью управления"
npm pkg set author="Олег Кононенко <Lespola76@gmail.com>"
npm pkg set license="MIT"
npm pkg set type="module"

# Добавьте scripts
npm pkg set scripts.dev="vite"
npm pkg set scripts.build="tsc && vite build"  
npm pkg set scripts.preview="vite preview"
npm pkg set scripts.lint="eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0"

# Установите основные зависимости
npm install react@^18.2.0 react-dom@^18.2.0

# Установите dev зависимости
npm install -D @types/react@^18.2.66 @types/react-dom@^18.2.22
npm install -D @vitejs/plugin-react@^4.2.1
npm install -D typescript@^5.2.2
npm install -D vite@^5.2.0
npm install -D eslint@^8.57.0
npm install -D @typescript-eslint/eslint-plugin@^7.2.0
npm install -D @typescript-eslint/parser@^7.2.0
npm install -D eslint-plugin-react-hooks@^4.6.0
npm install -D eslint-plugin-react-refresh@^0.4.6

# Дополнительные зависимости для проекта
npm install motion@^10.0.0
npm install lucide-react@^0.400.0
npm install react-hook-form@^7.55.0
npm install sonner@^2.0.3
npm install class-variance-authority@^0.7.0
npm install clsx@^2.0.0
npm install tailwind-merge@^2.0.0
npm install recharts@^2.8.0
```

### Сценарий 2: package.json неполный или поврежден

```bash
# Сделайте резервную копию текущего package.json
cp package.json package.json.backup

# Удалите node_modules и package-lock.json
rm -rf node_modules package-lock.json

# Скопируйте правильный package.json (из этого проекта)
# Или воссоздайте как в Сценарии 1

# Переустановите зависимости
npm install
```

### Сценарий 3: Проблемы с версиями Node.js

```bash
# Проверьте версию Node.js
node --version

# Версия должна быть 18.0.0 или выше
# Если версия меньше, обновите Node.js

# Используя nvm (рекомендуется)
nvm install 18
nvm use 18

# Или скачайте с официального сайта
# https://nodejs.org/

# Проверьте версию npm
npm --version

# Обновите npm если нужно
npm install -g npm@latest
```

## 📁 Создание недостающих конфигурационных файлов

### vite.config.ts

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react', 'motion']
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src", "*.ts", "*.tsx"],
  "exclude": ["node_modules", "dist"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### tsconfig.node.json

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

## 🔧 Настройка окружения в Docker

### Docker Compose конфигурация

Docker Compose автоматически передает переменные окружения из файла `.env` в контейнеры:

```yaml
version: '3.8'
services:
  portfolio-website-dev:
    build:
      context: .
      dockerfile: Dockerfile.dev
    environment:
      - NODE_ENV=development
      # Переменные из .env автоматически передаются
    env_file:
      - .env
```

### Передача переменных в Docker

1. **Через файл `.env`** - автоматически загружается
2. **Через параметр `environment`** в `docker-compose.yml`
3. **Через параметр `env_file`** в `docker-compose.yml`

### Приоритет переменных окружения в Docker

Переменные окружения в Docker загружаются с следующим приоритетом (от высшего к низшему):
1. **Переменные, указанные в `environment`** (высший приоритет)
2. **Переменные из файлов, указанных в `env_file`**
3. **Переменные из файла `.env`**
4. **Переменные окружения хост-системы** (низший приоритет)

## ✅ Финальная проверка

### Необходимые файлы для работы:
- [ ] `package.json` создан и заполнен
- [ ] `vite.config.ts` создан
- [ ] `tsconfig.json` создан
- [ ] `.env` файл настроен
- [ ] Все зависимости установлены (`node_modules/`)
- [ ] Docker файлы присутствуют

### Команды для проверки:
```bash
# Проверить установку зависимостей
npm list

# Проверить конфигурацию TypeScript
npx tsc --noEmit

# Проверить сборку
npm run build

# Запустить dev сервер
npm run dev
```

Если все шаги выполнены успешно, проект готов к разработке!