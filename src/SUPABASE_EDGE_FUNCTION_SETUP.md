# Настройка Supabase Edge Function для полной функциональности

## Обзор

В настоящее время приложение работает в **демо-режиме** с предустановленными данными. Для получения полной функциональности CMS с возможностью сохранения данных на сервере, необходимо развернуть Supabase Edge Function.

## Шаги настройки

### 1. Установка Supabase CLI

```bash
# macOS
brew install supabase/tap/supabase

# Windows
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase

# Linux
curl -fsSL https://supabase.com/install.sh | sh
```

### 2. Инициализация проекта

```bash
# Войти в аккаунт Supabase
supabase login

# Связать с существующим проектом
supabase link --project-ref YOUR_PROJECT_ID

# Или создать новый проект
supabase projects create your-portfolio-site
```

### 3. Развертывание Edge Function

```bash
# Развернуть функцию
supabase functions deploy server

# Проверить развертывание
supabase functions list
```

### 4. Настройка переменных окружения

Убедитесь, что в вашем Supabase проекте настроены следующие переменные:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY` 
- `SUPABASE_SERVICE_ROLE_KEY`

### 5. Создание таблиц (опционально)

Если вы хотите использовать PostgreSQL таблицы вместо Key-Value storage:

```sql
-- Создание таблиц в SQL редакторе Supabase
CREATE TABLE blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  author TEXT NOT NULL,
  published_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'draft',
  tags TEXT[],
  read_time INTEGER,
  featured_image TEXT,
  seo_title TEXT,
  seo_description TEXT
);

CREATE TABLE portfolio_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  technologies TEXT[],
  category TEXT NOT NULL,
  status TEXT DEFAULT 'completed',
  start_date DATE,
  completed_at DATE,
  github_url TEXT,
  live_url TEXT,
  images TEXT[],
  featured BOOLEAN DEFAULT false,
  priority INTEGER DEFAULT 0
);
```

## Проверка работы

После развертывания:

1. Обновите страницу приложения
2. Зеленый индикатор "API: Подключен" означает успешное подключение
3. В CMS панели кнопка "Загрузить данные по умолчанию" должна работать
4. Все изменения будут сохраняться на сервере

## Устранение неполадок

### Функция не развертывается
```bash
# Проверить логи
supabase functions logs server

# Перезапустить развертывание
supabase functions deploy server --no-verify-jwt
```

### CORS ошибки
Убедитесь, что в `index.tsx` настроены правильные origins:
```typescript
app.use('*', cors({
  origin: ['http://localhost:5173', 'https://your-domain.com'],
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}))
```

### Ошибки авторизации
Проверьте, что в запросах используется правильный ключ:
- Для чтения: `SUPABASE_ANON_KEY`
- Для записи: токен пользователя или `SERVICE_ROLE_KEY`

## Альтернативы

Если настройка Supabase Edge Function вызывает сложности, вы можете:

1. **Использовать демо-режим** - приложение полностью функционально для демонстрации
2. **Развернуть на других платформах**:
   - Vercel Functions
   - Netlify Functions  
   - Railway
   - Fly.io

3. **Локальная разработка**:
```bash
# Запуск локального Supabase
supabase start

# Развертывание функции локально
supabase functions serve server
```

## Стоимость

- Supabase Edge Functions: бесплатно до 2M запросов/месяц
- Database: бесплатно до 500MB
- Bandwidth: бесплатно до 5GB/месяц

Для большинства портфолио сайтов бесплатного уровня более чем достаточно.

## Поддержка

Если у вас возникли проблемы с настройкой, обратитесь к:
- [Документации Supabase](https://supabase.com/docs)
- [Сообществу Supabase](https://github.com/supabase/supabase/discussions)

Приложение разработано с учетом graceful degradation и будет работать в демо-режиме даже без серверной части.