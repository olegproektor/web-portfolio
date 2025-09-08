# Руководство по локальной разработке

## 📋 Содержание
1. [Системные требования](#системные-требования)
2. [Установка Docker](#установка-docker)
3. [Настройка Visual Studio Code](#настройка-visual-studio-code)
4. [Развертывание проекта](#развертывание-проекта)
5. [Работа с CMS](#работа-с-cms)
6. [Отладка и мониторинг](#отладка-и-мониторинг)
7. [Полезные команды](#полезные-команды)

## 💻 Системные требования

### Минимальные требования:
- **ОС**: Windows 10/11, macOS 10.15+, или Linux (Ubuntu 18.04+)
- **RAM**: 8 GB (рекомендуется 16 GB)
- **Диск**: 10 GB свободного места
- **Процессор**: Intel i5 или AMD Ryzen 5 (или аналогичный)

### Необходимое программное обеспечение:
- Git
- Docker Desktop
- Visual Studio Code
- Node.js 18+ (для локальной разработки без Docker)

## 🐳 Установка Docker

### Windows

1. Скачайте Docker Desktop с [официального сайта](https://www.docker.com/products/docker-desktop/)
2. Запустите установщик и следуйте инструкциям
3. Перезагрузите компьютер
4. Запустите Docker Desktop
5. Убедитесь, что WSL 2 включен (Settings → General → Use WSL 2)

### macOS

1. Скачайте Docker Desktop для Mac
2. Перетащите Docker в папку Applications
3. Запустите Docker из Applications
4. Дождитесь запуска Docker Engine

### Linux (Ubuntu/Debian)

```bash
# Обновляем систему
sudo apt update
sudo apt upgrade -y

# Устанавливаем зависимости
sudo apt install apt-transport-https ca-certificates curl gnupg lsb-release

# Добавляем GPG ключ Docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Добавляем репозиторий Docker
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Устанавливаем Docker
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Добавляем пользователя в группу docker
sudo usermod -aG docker $USER

# Перезагружаемся или выполняем
newgrp docker

# Проверяем установку
docker --version
docker compose version
```

## 🛠️ Настройка Visual Studio Code

### Установка VS Code

1. Скачайте VS Code с [официального сайта](https://code.visualstudio.com/)
2. Установите программу
3. Запустите VS Code

### Необходимые расширения

Откройте VS Code и установите расширения:

1. **Docker** (Microsoft)
2. **Dev Containers** (Microsoft)
3. **TypeScript and JavaScript Language Features** (встроено)
4. **ES7+ React/Redux/React-Native snippets**
5. **Tailwind CSS IntelliSense**
6. **GitLens**
7. **Prettier - Code formatter**
8. **ESLint**

### Установка расширений через командную строку:

```bash
code --install-extension ms-vscode.vscode-docker
code --install-extension ms-vscode-remote.remote-containers
code --install-extension bradlc.vscode-tailwindcss
code --install-extension eamodio.gitlens
code --install-extension esbenp.prettier-vscode
code --install-extension dbaeumer.vscode-eslint
```

## 🚀 Развертывание проекта

### Шаг 1: Клонирование репозитория

```bash
# Клонируем репозиторий
git clone <URL_ВАШЕГО_РЕПОЗИТОРИЯ>
cd portfolio-website

# Или если репозиторий уже существует
cd путь/к/portfolio-website
```

### Шаг 2: Настройка переменных окружения

```bash
# Копируем пример конфигурации
cp .env.example .env

# Редактируем конфигурацию
# Windows
notepad .env

# macOS
open -e .env

# Linux
nano .env
```

Пример содержимого `.env`:
```env
# Google Analytics (опционально)
VITE_GA_ID=G-XXXXXXXXXX

# Supabase Configuration (опционально)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# Режим разработки
NODE_ENV=development
```

### Шаг 3: Запуск с Docker

#### Режим разработки с hot reload:

```bash
# Запуск в режиме разработки
docker compose -f docker-compose.dev.yml up --build

# Или в фоновом режиме
docker compose -f docker-compose.dev.yml up -d --build
```

#### Производственный режим:

```bash
# Сборка и запуск
docker compose up --build

# В фоновом режиме
docker compose up -d --build
```

### Шаг 4: Открытие в VS Code

```bash
# Открываем проект в VS Code
code .
```

### Шаг 5: Проверка работы

1. Откройте браузер и перейдите на:
   - **Режим разработки**: http://localhost:5173
   - **Производственный режим**: http://localhost:3000

2. Проверьте работу CMS:
   - Прокрутите к разделу "CMS Dashboard"
   - Введите пароль: `admin123` (для localStorage режима)

## 📝 Работа с CMS

### Локальный режим (localStorage)

**По умолчанию активен**, если Supabase не настроен:

1. **Пароль администратора**: `admin123`
2. **Функции**:
   - Создание/редактирование постов блога
   - Управление проектами портфолио
   - Просмотр аналитики (мок данные)
3. **Хранение**: localStorage браузера
4. **Ограничения**: Данные доступны только в текущем браузере

### Режим Supabase

Активируется при наличии корректных настроек:

1. **Аутентификация**: Через Supabase Auth
2. **Функции**:
   - Все функции локального режима
   - Синхронизация между устройствами
   - Реальная аналитика (при настройке Google Analytics)
3. **Хранение**: Облачная база данных Supabase
4. **Преимущества**: Доступ с любого устройства

### Переключение между режимами

Система автоматически определяет доступный режим:

```typescript
// Проверка в консоли разработчика
localStorage.getItem('portfolio-cms-data') // Локальные данные
console.log('Supabase available:', !!window.supabase) // Supabase статус
```

## 🔧 Отладка и мониторинг

### VS Code Debugger

1. Откройте панель **Run and Debug** (Ctrl+Shift+D)
2. Выберите конфигурацию "Launch Chrome"
3. Поставьте точки останова в коде
4. Нажмите F5 для запуска отладки

### Docker логи

```bash
# Просмотр логов всех сервисов
docker compose logs

# Логи конкретного сервиса
docker compose logs app

# Следить за логами в реальном времени
docker compose logs -f

# Логи с метками времени
docker compose logs -t
```

### Мониторинг ресурсов

```bash
# Статистика контейнеров
docker stats

# Информация о контейнерах
docker compose ps

# Использование Docker
docker system df
```

### Инспекция базы данных (Supabase)

1. Откройте панель Supabase
2. Перейдите в **Table Editor**
3. Просмотрите содержимое таблиц `blog_posts` и `portfolio_items`

### Отладка в браузере

1. Откройте Developer Tools (F12)
2. Вкладка **Console** - JavaScript ошибки
3. Вкладка **Network** - HTTP запросы
4. Вкладка **Application** → **Local Storage** - localStorage данные

## 📋 Полезные команды

### Docker команды

```bash
# Остановка всех сервисов
docker compose down

# Остановка с удалением volumes
docker compose down -v

# Пересборка без кеша
docker compose build --no-cache

# Просмотр запущенных контейнеров
docker ps

# Вход в контейнер
docker compose exec app bash

# Очистка Docker системы
docker system prune -a
```

### Node.js команды (без Docker)

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Сборка для продакшена
npm run build

# Просмотр собранного проекта
npm run preview

# Линтинг кода
npm run lint
```

### Git команды

```bash
# Статус репозитория
git status

# Добавление изменений
git add .

# Коммит изменений
git commit -m "Описание изменений"

# Отправка на сервер
git push

# Получение изменений
git pull

# Просмотр истории
git log --oneline
```

### Управление базой данных

```bash
# Резервное копирование localStorage
# Откройте консоль браузера и выполните:
const data = localStorage.getItem('portfolio-cms-data');
console.log('Backup:', data);

# Восстановление localStorage
localStorage.setItem('portfolio-cms-data', 'YOUR_BACKUP_DATA');
```

## 🚨 Решение проблем

### Docker не запускается

1. **Windows**: Убедитесь, что WSL 2 включен и обновлен
2. **macOS**: Перезапустите Docker Desktop
3. **Linux**: Проверьте статус Docker: `sudo systemctl status docker`

### Порт уже занят

```bash
# Найдите процесс, использующий порт
lsof -i :5173  # macOS/Linux
netstat -ano | findstr :5173  # Windows

# Остановите процесс или измените порт в docker-compose.dev.yml
```

### Проблемы с hot reload

1. Проверьте монтирование volume в `docker-compose.dev.yml`
2. Перезапустите контейнер: `docker compose restart`
3. Очистите кеш браузера

### Ошибки TypeScript

```bash
# Проверка типов
npx tsc --noEmit

# Перезапуск TypeScript сервера в VS Code
Ctrl+Shift+P → "TypeScript: Restart TS Server"
```

### Проблемы с Supabase

1. Проверьте переменные окружения
2. Убедитесь, что таблицы созданы
3. Проверьте политики RLS
4. Просмотрите логи в консоли браузера

## 📚 Дополнительные ресурсы

### Документация

- [Docker Compose](https://docs.docker.com/compose/)
- [Vite](https://vitejs.dev/guide/)
- [React](https://react.dev/learn)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs/)

### Полезные инструменты

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Postman](https://www.postman.com/) - тестирование API
- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
- [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)

## 🎯 Следующие шаги

1. **Изучите код**: Начните с `/App.tsx` и `/components`
2. **Кастомизируйте дизайн**: Измените цвета в `/styles/globals.css`
3. **Добавьте контент**: Используйте CMS для добавления проектов и постов
4. **Настройте аналитику**: Подключите Google Analytics
5. **Деплой**: Разверните на Vercel или Netlify

## 🤝 Поддержка

При возникновении проблем:

1. Проверьте логи Docker
2. Посмотрите консоль браузера
3. Убедитесь, что все зависимости установлены
4. Перезапустите Docker сервисы

**Удачной разработки! 🚀**