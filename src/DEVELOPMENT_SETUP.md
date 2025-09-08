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
├── .vscode/               # VS Code настройки
├── public/                # Статичные файлы
└── docs/                  # Документация
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

### Добавление новых компонентов:
```bash
# Создать компонент
touch src/components/NewComponent.tsx

# Добавить в индекс (если нужно)
# Импортировать в App.tsx или другой родительский компонент
```

### Изменение стилей:
```css
/* Глобальные стили в src/styles/globals.css */
/* Компонентные стили через Tailwind классы */
```

### Добавление новых зависимостей:
```bash
# Обычные зависимости
npm install package-name

# Dev зависимости  
npm install -D package-name

# Обновить Docker образ
docker-compose -f docker-compose.dev.yml build
```

## 🚨 Отладка

### Общие проблемы:

#### Port уже используется:
```bash
# Найти процесс на порту 5173
lsof -i :5173
# или
netstat -nlp | grep 5173

# Убить процесс
kill -9 <PID>
```

#### Docker проблемы:
```bash
# Очистить все контейнеры
docker system prune -a

# Пересобрать без кэша
docker-compose -f docker-compose.dev.yml build --no-cache

# Проверить логи
docker-compose -f docker-compose.dev.yml logs portfolio-website-dev
```

#### Проблемы с зависимостями:
```bash
# Очистить node_modules и package-lock
rm -rf node_modules package-lock.json
npm install

# Для Docker
docker-compose -f docker-compose.dev.yml down
docker-compose -f docker-compose.dev.yml build --no-cache
```

#### VS Code не видит типы:
```bash
# Перезапустить TypeScript сервер
Ctrl+Shift+P -> TypeScript: Restart TS Server
```

## 📋 Чек-лист готовности к разработке

### ✅ Перед началом работы:
- [ ] Node.js 18+ установлен
- [ ] Docker установлен (если используете)
- [ ] Проект склонирован
- [ ] `npm install` выполнен успешно
- [ ] `.env` файл настроен
- [ ] `npm run dev` работает
- [ ] `http://localhost:5173` открывается
- [ ] VS Code настроен с расширениями

### ✅ Перед коммитом:
- [ ] `npm run lint` проходит без ошибок
- [ ] `npm run build` успешно
- [ ] Функциональность протестирована
- [ ] Документация обновлена (если нужно)

## 🎯 Полезные команды

```bash
# Разработка
npm run dev                    # Запуск dev сервера
npm run build                  # Сборка для продакшена  
npm run preview                # Превью prod сборки
npm run lint                   # Проверка кода

# Docker
npm run docker:build          # Сборка Docker образа
npm run docker:dev            # Запуск dev окружения
npm run docker:prod           # Запуск prod окружения

# Утилиты
npm run clean                 # Очистка build файлов (если добавить)
npm run analyze               # Анализ bundle размера (если добавить)
```

## 📞 Поддержка разработки

**Нужна помощь?**
1. Проверьте консоль браузера на ошибки
2. Проверьте Docker/Node.js логи  
3. Убедитесь что все зависимости установлены
4. Проверьте переменные окружения
5. Создайте issue в репозитории

**Полезные ссылки:**
- [Vite документация](https://vitejs.dev/)
- [React документация](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [VS Code](https://code.visualstudio.com/docs)