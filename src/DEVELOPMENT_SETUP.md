# 🚀 Руководство по настройке разработки

## Системные требования

- **Node.js** 18+ 
- **Docker** и **Docker Compose**
- **Git**
- **VS Code** (рекомендуется)

## 📦 Локальная установка

### 1. Клонирование проекта
```bash
git clone <repository-url>
cd portfolio-website
```

### 2. Установка зависимостей
```bash
npm install
```

### 3. Настройка переменных окружения
```bash
# Скопировать пример файла
cp .env.example .env

# Отредактировать .env файл
# Добавить реальные значения для Supabase и Google Analytics
```

### 4. Запуск в режиме разработки
```bash
# Обычный запуск
npm run dev

# С Docker
npm run docker:dev
```

## ⚙️ Конфигурация окружения

### Файлы окружения
Проект поддерживает различные режимы работы через переменные окружения:

- **`.env`** - основной файл конфигурации
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

## 🐳 Docker разработка

### Преимущества Docker:
- ✅ Изолированная среда
- ✅ Одинаковое поведение на всех машинах
- ✅ Простое управление зависимостями
- ✅ Hot reload для быстрой разработки

### Команды Docker:
```bash
# Сборка и запуск dev окружения
docker-compose -f docker-compose.dev.yml up --build

# Запуск в фоне
docker-compose -f docker-compose.dev.yml up -d

# Остановка
docker-compose -f docker-compose.dev.yml down

# Просмотр логов
docker-compose -f docker-compose.dev.yml logs -f

# Перестроить контейнеры
docker-compose -f docker-compose.dev.yml up --build --force-recreate
```

### Отладка в контейнере:
```bash
# Войти в контейнер
docker exec -it portfolio-website-dev /bin/sh

# Посмотреть процессы
docker-compose -f docker-compose.dev.yml ps

# Посмотреть переменные окружения
docker exec portfolio-website-dev env
```

## 🔧 VS Code настройка

### Рекомендуемые расширения:
Все расширения автоматически предлагаются при открытии проекта в VS Code.

### Основные:
- **Prettier** - форматирование кода
- **ESLint** - проверка качества кода  
- **Tailwind CSS IntelliSense** - автодополнение для Tailwind
- **Docker** - управление контейнерами

### Команды VS Code:
```bash
# Открыть проект в VS Code
code .

# Запуск dev server через VS Code
Ctrl+Shift+P -> Tasks: Run Task -> npm: dev

# Отладка в Chrome
F5 -> выбрать "Debug in Chrome"
```

### Настройки форматирования:
Автоматическое форматирование настроено для:
- Сохранение файла (Ctrl+S)
- Автоимпорты
- ESLint автоисправления
- Организация импортов

## 🗄️ Структура проекта

```
portfolio-website/
├── src/
│   ├── components/          # React компоненты
│   │   ├── ui/             # UI компоненты (shadcn/ui)
│   │   └── figma/          # Figma импорты
│   ├── contexts/           # React контексты (CMS, Auth)
│   ├── hooks/              # Кастомные хуки
│   ├── lib/                # Утилиты и конфигурации
│   └── styles/             # Стили (Tailwind CSS)
├── docker/                 # Docker конфигурации
├── .vscode/                # VS Code настройки
├── public/                 # Статичные файлы
└── docs/                   # Документация
```

## 🔄 Workflow разработки

### 1. Создание новой функции:
```bash
# Создать ветку
git checkout -b feature/new-feature

# Внести изменения
# Тестировать локально

# Коммит и пуш
git add .
git commit -m "feat: добавить новую функцию"
git push origin feature/new-feature
```

### 2. Тестирование:
```bash
# Линтинг
npm run lint

# Сборка для продакшена
npm run build

# Превью продакшен сборки
npm run preview
```

### 3. Hot Reload:
- Изменения в `.tsx` файлах - мгновенное обновление
- Изменения в `.css` файлах - мгновенное обновление
- Изменения в `vite.config.ts` - требует перезапуска

## 🧪 Режимы разработки

### Development режим:
- **URL**: `http://localhost:5173`
- **Hot reload**: включен
- **Source maps**: включены
- **Google Analytics**: отключен (G-DEVELOPMENT)
- **Supabase**: опциональный

### Production Preview:
```bash
npm run build
npm run preview
# URL: http://localhost:4173
```

### Docker режимы:
```bash
# Development с горячей перезагрузкой
npm run docker:dev

# Production build
npm run docker:prod
```

## 🔌 Интеграции

### Supabase (опционально):
```bash
# Проверить подключение
# Открыть консоль браузера на localhost:5173
# Найти сообщения "Supabase connection: ..."
```

### Google Analytics:
```bash
# Development: отключен автоматически
# Production: активируется с VITE_GA_ID
```

## 🛠️ Кастомизация