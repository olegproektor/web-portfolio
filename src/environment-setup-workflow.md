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
npm install motion@^1.0.0
npm install lucide-react@^0.400.0
npm install react-hook-form@7.55.0
npm install sonner@2.0.3
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

### index.html

```html
<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Олег Кононенко - Product Manager | Портфолио</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/main.tsx"></script>
  </body>
</html>
```

### main.tsx

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

## 🔍 Проверка и тестирование

### 1. Проверка сборки

```bash
# Проверьте TypeScript
npm run type-check

# Попробуйте сборку
npm run build

# Если ошибки, проверьте логи и исправьте
```

### 2. Проверка dev сервера

```bash
# Запустите dev сервер
npm run dev

# Должен запуститься на http://localhost:5173
# Если порт занят, Vite выберет следующий доступный
```

### 3. Проверка линтинга

```bash
# Запустите ESLint
npm run lint

# Исправьте найденные проблемы
```

## 🚀 Автоматизация исправления

### Скрипт автоматической настройки

Создайте файл `setup.sh`:

```bash
#!/bin/bash

echo "🔧 Настройка окружения для портфолио Олега Кононенко..."

# Проверка Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js не найден. Установите Node.js 18+ с https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Требуется Node.js 18+. Текущая версия: $(node -v)"
    exit 1
fi

echo "✅ Node.js версия: $(node -v)"

# Проверка package.json
if [ ! -f "package.json" ]; then
    echo "⚠️  package.json не найден. Создаю новый..."
    
    npm init -y
    npm pkg set name="oleg-portfolio"
    npm pkg set version="2.0.0"
    npm pkg set type="module"
    npm pkg set scripts.dev="vite"
    npm pkg set scripts.build="tsc && vite build"
    npm pkg set scripts.preview="vite preview"
    
    echo "✅ package.json создан"
fi

# Очистка старых зависимостей
if [ -d "node_modules" ]; then
    echo "🧹 Очистка старых зависимостей..."
    rm -rf node_modules package-lock.json
fi

# Установка зависимостей
echo "📦 Установка зависимостей..."
npm install

# Создание недостающих файлов
if [ ! -f "vite.config.ts" ]; then
    echo "⚙️  Создание vite.config.ts..."
    # Создать файл с содержимым выше
fi

if [ ! -f "tsconfig.json" ]; then
    echo "⚙️  Создание tsconfig.json..."
    # Создать файл с содержимым выше
fi

# Проверка сборки
echo "🔨 Проверка сборки..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Настройка завершена успешно!"
    echo "🚀 Запустите 'npm run dev' для разработки"
else
    echo "❌ Ошибка при сборке. Проверьте логи выше."
    exit 1
fi
```

Запуск скрипта:

```bash
chmod +x setup.sh
./setup.sh
```

## 📋 Чек-лист полной настройки

### Основные файлы ✅
- [ ] `package.json` - управление зависимостями  
- [ ] `vite.config.ts` - конфигурация сборщика
- [ ] `tsconfig.json` - конфигурация TypeScript
- [ ] `index.html` - точка входа HTML
- [ ] `main.tsx` - точка входа React
- [ ] `App.tsx` - главный компонент

### Стили и ресурсы ✅
- [ ] `styles/globals.css` - глобальные стили
- [ ] `public/favicon.svg` - иконка сайта
- [ ] Компоненты UI в `components/ui/`

### Настройки разработки ✅
- [ ] `.gitignore` - исключения Git
- [ ] `.env.example` - шаблон переменных окружения
- [ ] ESLint конфигурация
- [ ] Prettier конфигурация

### Проверка работоспособности ✅
- [ ] `npm install` - установка без ошибок
- [ ] `npm run dev` - запуск dev сервера
- [ ] `npm run build` - сборка без ошибок
- [ ] `npm run preview` - preview сборки

## 🆘 Служба поддержки

### Часто встречающиеся ошибки

**1. "Cannot resolve dependency"**
```bash
# Переустановите зависимости
rm -rf node_modules package-lock.json
npm install
```

**2. "TypeScript error"**
```bash
# Проверьте tsconfig.json
npm run type-check
```

**3. "Vite config error"**
```bash
# Убедитесь что vite.config.ts правильно настроен
# Проверьте импорты и синтаксис
```

**4. "Port already in use"**
```bash
# Vite автоматически найдет свободный порт
# Или укажите конкретный порт: npm run dev -- --port 3000
```

### Получение помощи

1. Проверьте логи в консоли
2. Убедитесь в правильности версий Node.js/npm
3. Проверьте содержимое всех конфигурационных файлов
4. При необходимости создайте issue в репозитории проекта

---

## ✅ Заключение

Следуя этому workflow, вы сможете настроить окружение для разработки портфолио даже при отсутствующих зависимостях. Все необходимые файлы и конфигурации включены в данное руководство.