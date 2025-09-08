# 📥 Инструкция по скачиванию проекта

## Способ 1: Через Git (рекомендуется)

Если проект размещен в Git репозитории:

```bash
# Клонировать проект
git clone <repository-url> portfolio-website
cd portfolio-website

# Запустить
cp .env.example .env
docker-compose -f docker-compose.dev.yml up --build
```

## Способ 2: Скачать архив

### Что нужно скачать:

**Все файлы из корневой папки проекта:**

#### 📁 Основные файлы:
- `App.tsx` - главный компонент приложения
- `main.tsx` - точка входа React
- `index.html` - HTML шаблон
- `package.json` - зависимости проекта
- `vite.config.ts` - конфигурация Vite
- `tsconfig.json` - конфигурация TypeScript
- `.env.example` - пример переменных окружения

#### 📁 Docker файлы:
- `Dockerfile` - продакшн сборка
- `Dockerfile.dev` - разработка
- `docker-compose.yml` - продакшн запуск
- `docker-compose.dev.yml` - разработка
- `docker/nginx.conf` - конфигурация веб-сервера

#### 📁 Папки (целиком):
- `components/` - React компоненты
- `contexts/` - React контексты
- `hooks/` - пользовательские хуки
- `lib/` - утилиты и библиотеки
- `styles/` - CSS стили
- `utils/` - вспомогательные функции
- `supabase/` - серверные функции
- `public/` - статические файлы

### Структура после скачивания:

```
portfolio-website/
├── App.tsx
├── main.tsx
├── index.html
├── package.json
├── vite.config.ts
├── Dockerfile
├── Dockerfile.dev
├── docker-compose.yml
├── docker-compose.dev.yml
├── .env.example
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   └── ... (все остальные)
├── contexts/
├── hooks/
├── lib/
├── styles/
│   └── globals.css
├── utils/
├── supabase/
├── docker/
└── public/
```

## Способ 3: Создать заново

Если не можете скачать файлы, создайте проект с нуля:

```bash
# Создать папку
mkdir portfolio-website
cd portfolio-website

# Создать package.json
npm init -y

# Установить зависимости
npm install react react-dom @types/react @types/react-dom
npm install -D vite @vitejs/plugin-react typescript tailwindcss

# Создать Docker файлы и компоненты
# (скопировать содержимое из исходного проекта)
```

## 🚀 После скачивания:

1. **Откройте терминал** в папке проекта
2. **Запустите команду:**
   ```bash
   cp .env.example .env
   docker-compose -f docker-compose.dev.yml up --build
   ```
3. **Откройте браузер:** http://localhost:3000

## ❗ Важные замечания:

- **Docker Desktop** должен быть установлен и запущен
- **Все файлы** должны сохранить свою структуру
- **Права доступа** на Linux/Mac: `chmod +x setup.sh`
- **Кодировка файлов** должна быть UTF-8

## 🆘 Нужна помощь?

Если что-то не работает:

1. Проверьте что Docker запущен: `docker --version`
2. Проверьте свободные порты: `lsof -i :3000`
3. Посмотрите логи: `docker-compose logs`
4. Очистите кеш: `docker system prune`

**Готово к запуску!** 🎉