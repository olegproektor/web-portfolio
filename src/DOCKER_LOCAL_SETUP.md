# 🐳 Локальный запуск с Docker

## Предварительные требования

- **Docker Desktop** установлен и запущен
- **Git** для клонирования проекта
- **Минимум 4GB RAM** свободной памяти
- **Порты 3000 и 80** должны быть свободны

## 🚀 Быстрый старт

### 1. Скачивание проекта

```bash
# Скачать все файлы проекта в папку
# (предполагается, что у вас есть доступ к файлам проекта)
```

### 2. Настройка окружения

```bash
# Перейти в папку с проектом
cd portfolio-website

# Скопировать файл с переменными окружения
cp .env.example .env

# Отредактировать .env файл (необязательно для демо-режима)
# nano .env  # или любой текстовый редактор
```

### Конфигурация окружения в Docker

#### Переменные окружения Docker

Docker Compose автоматически передает переменные окружения из файла `.env` в контейнеры. Основные переменные:

```env
# Google Analytics (опционально)
VITE_GA_ID=G-XXXXXXXXXX

# Supabase Configuration (опционально - если не указано, используется localStorage)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# Режим разработки
NODE_ENV=development
```

#### Передача переменных в Docker

Docker Compose использует следующие методы передачи переменных:

1. **Через файл `.env`** - автоматически загружается
2. **Через параметр `environment`** в `docker-compose.yml`
3. **Через параметр `env_file`** в `docker-compose.yml`

#### Приоритет переменных окружения в Docker

Переменные окружения в Docker загружаются с следующим приоритетом (от высшего к низшему):
1. **Переменные, указанные в `environment`** (высший приоритет)
2. **Переменные из файлов, указанных в `env_file`**
3. **Переменные из файла `.env`**
4. **Переменные окружения хост-системы** (низший приоритет)

### 3. Запуск в режиме разработки

```bash
# Запуск с горячей перезагрузкой
docker-compose -f docker-compose.dev.yml up --build

# Или в фоновом режиме
docker-compose -f docker-compose.dev.yml up -d --build
```

### 4. Запуск в продакшн режиме

```bash
# Сборка и запуск продакшн версии
docker-compose up --build

# Или в фоновом режиме
docker-compose up -d --build
```

## 📱 Доступ к приложению

После успешного запуска:

- **Режим разработки**: http://localhost:3000
- **Продакшн режим**: http://localhost:80

## 🛠️ Управление контейнерами

### Просмотр логов
```bash
# Все логи
docker-compose logs

# Логи в реальном времени
docker-compose logs -f

# Логи конкретного сервиса
docker-compose logs portfolio-app
```

### Остановка
```bash
# Остановить контейнеры
docker-compose down

# Остановить и удалить все данные
docker-compose down -v --remove-orphans
```

### Перестройка
```bash
# Принудительная перестройка
docker-compose build --no-cache
docker-compose up
```

## 🔧 Режимы работы

### Демо-режим (по умолчанию)
- Работает без настройки Supabase
- Использует тестовые данные
- Полная функциональность CMS
- Данные сохраняются в localStorage

### Полный режим с Supabase
1. Настроить переменные в `.env`:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

2. Перезапустить контейнеры:
```bash
docker-compose down
docker-compose up --build
```

## 📂 Структура Docker

```
├── Dockerfile              # Продакшн сборка
├── Dockerfile.dev          # Разработка с hot-reload
├── docker-compose.yml      # Продакшн конфигурация
├── docker-compose.dev.yml  # Разработка конфигурация
└── docker/
    └── nginx.conf          # Nginx конфигурация
```

## 🐛 Решение проблем

### Порт уже занят
```bash
# Найти процесс на порту 3000
lsof -i :3000

# Или изменить порт в docker-compose.yml:
ports:
  - "3001:3000"  # Использовать порт 3001
```

### Проблемы с разрешениями
```bash
# Linux/Mac: дать права на выполнение
chmod +x setup.sh

# Windows: запустить PowerShell как администратор
```

### Очистка Docker
```bash
# Очистить все неиспользуемые контейнеры и образы
docker system prune -a

# Очистить только этот проект
docker-compose down --rmi all -v --remove-orphans
```

### Проблемы с сетью
```bash
# Пересоздать сеть Docker
docker network prune
docker-compose up --force-recreate
```

## 📊 Мониторинг

### Использование ресурсов
```bash
# Статистика контейнеров
docker stats

# Информация о конкретном контейнере
docker inspect <container_id>
```

### Логи приложения
```bash
# Логи в реальном времени
docker-compose logs -f portfolio-app

# Последние 100 строк
docker-compose logs --tail=100 portfolio-app
```

## 🔄 Обновление проекта

```bash
# Остановить текущие контейнеры
docker-compose down

# Обновить код проекта
git pull  # если используете git

# Пересобрать и запустить
docker-compose build --no-cache
docker-compose up
```

## 📝 Полезные команды

```bash
# Войти в контейнер для отладки
docker-compose exec portfolio-app /bin/sh

# Проверить статус контейнеров
docker-compose ps
```