# Руководство по интеграции Supabase

## Обзор

Этот проект поддерживает две системы управления контентом:
- **localStorage CMS** - работает локально без внешних зависимостей
- **Supabase CMS** - облачная база данных с аутентификацией

Система автоматически определяет доступность Supabase и переключается между режимами.

## 🚀 Быстрая настройка Supabase

### Шаг 1: Создание проекта Supabase

1. Перейдите на [supabase.com](https://supabase.com)
2. Нажмите "Start your project" и войдите в аккаунт
3. Создайте новый проект:
   - **Name**: `portfolio-website` (или любое имя)
   - **Database Password**: Создайте надежный пароль
   - **Region**: Выберите ближайший регион
4. Дождитесь создания проекта (2-3 минуты)

### Шаг 2: Получение конфигурации

1. В панели управления Supabase перейдите в **Settings** → **API**
2. Скопируйте:
   - **Project URL** (например: `https://abc123def.supabase.co`)
   - **anon public** ключ (длинная строка начинающаяся с `eyJ`)

### Шаг 3: Настройка переменных окружения

1. Скопируйте файл `.env.example` в `.env`:
   ```bash
   cp .env.example .env
   ```

2. Откройте `.env` и заполните переменные:
   ```env
   # Google Analytics (опционально)
   VITE_GA_ID=G-XXXXXXXXXX

   # Supabase Configuration
   VITE_SUPABASE_URL=https://your-project-url.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

### Шаг 4: Создание таблиц в базе данных

1. В панели Supabase перейдите в **SQL Editor**
2. Выполните следующий SQL код:

```sql
-- Создание таблицы для постов блога
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  publishedAt TIMESTAMP WITH TIME ZONE NOT NULL,
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT CHECK (status IN ('draft', 'published')) DEFAULT 'draft',
  tags TEXT[] DEFAULT '{}',
  readTime INTEGER DEFAULT 5,
  featuredImage TEXT,
  seoTitle TEXT,
  seoDescription TEXT
);

-- Создание таблицы для элементов портфолио
CREATE TABLE IF NOT EXISTS portfolio_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  longDescription TEXT,
  technologies TEXT[] NOT NULL,
  category TEXT NOT NULL,
  status TEXT CHECK (status IN ('planning', 'in-progress', 'completed', 'on-hold')) NOT NULL,
  startDate DATE,
  completedAt TIMESTAMP WITH TIME ZONE,
  githubUrl TEXT,
  liveUrl TEXT,
  images TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT FALSE,
  priority INTEGER DEFAULT 0
);

-- Создание индексов для оптимизации запросов
CREATE INDEX IF NOT EXISTS blog_posts_status_idx ON blog_posts(status);
CREATE INDEX IF NOT EXISTS blog_posts_published_at_idx ON blog_posts(publishedAt);
CREATE INDEX IF NOT EXISTS blog_posts_slug_idx ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS portfolio_items_category_idx ON portfolio_items(category);
CREATE INDEX IF NOT EXISTS portfolio_items_status_idx ON portfolio_items(status);
CREATE INDEX IF NOT EXISTS portfolio_items_featured_idx ON portfolio_items(featured);

-- Функция для автоматического обновления updatedAt
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updatedAt = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Триггер для автоматического обновления updatedAt в blog_posts
CREATE TRIGGER update_blog_posts_updated_at 
    BEFORE UPDATE ON blog_posts 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Настройка Row Level Security (RLS)
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;

-- Политики для чтения (публичные)
CREATE POLICY "Allow public read access to published blog posts" ON blog_posts
    FOR SELECT USING (status = 'published');

CREATE POLICY "Allow public read access to portfolio items" ON portfolio_items
    FOR SELECT USING (true);

-- Политики для записи (только для аутентифицированных пользователей)
CREATE POLICY "Allow authenticated users full access to blog posts" ON blog_posts
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users full access to portfolio items" ON portfolio_items
    FOR ALL USING (auth.role() = 'authenticated');
```

### Шаг 5: Настройка аутентификации

1. В панели Supabase перейдите в **Authentication** → **Settings**
2. В разделе **Site URL** добавьте URL вашего сайта:
   - Для разработки: `http://localhost:5173`
   - Для продакшена: ваш домен
3. В **Redirect URLs** добавьте те же URL

### Шаг 6: Создание администратора

1. Перейдите в **Authentication** → **Users**
2. Нажмите **Add user**
3. Заполните данные:
   - **Email**: ваш email
   - **Password**: надежный пароль
   - **Email Confirm**: true
4. Нажмите **Create user**

## 🔧 Настройка проекта

### Установка зависимостей

```bash
npm install
```

### Запуск в режиме разработки

```bash
npm run dev
```

Откройте браузер на `http://localhost:5173`

## 📊 Использование CMS

### Локальный режим (без Supabase)
- CMS работает с localStorage
- Пароль администратора: `admin123`
- Данные сохраняются только в браузере

### Режим Supabase
- Автоматически активируется при правильной настройке
- Использует аутентификацию Supabase
- Данные синхронизируются в облаке
- Поддерживает множественных пользователей

### Переключение между режимами

Система автоматически определяет доступность Supabase:

1. **Supabase доступен** → использует Supabase CMS
2. **Supabase недоступен** → использует localStorage CMS

## 🛡️ Безопасность

### Row Level Security (RLS)

Политики безопасности настроены следующим образом:

- **Чтение**: Публичный доступ к опубликованным постам и всем проектам
- **Запись**: Только аутентифицированные пользователи

### Переменные окружения

**Важно**: Никогда не коммитьте файл `.env` в репозиторий!

```bash
# Добавьте .env в .gitignore
echo ".env" >> .gitignore
```

## 🚀 Деплой

### Vercel

1. Подключите репозиторий к Vercel
2. Добавьте переменные окружения в настройках проекта:
   - `VITE_GA_ID`
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

### Netlify

1. Подключите репозиторий к Netlify
2. В **Site settings** → **Environment variables** добавьте:
   - `VITE_GA_ID`
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

## 🔄 Миграция данных

### Из localStorage в Supabase

1. Войдите в локальную CMS (пароль: `admin123`)
2. Скопируйте данные из localStorage
3. Настройте Supabase
4. Войдите в Supabase CMS
5. Создайте элементы вручную (автомиграция будет добавлена в следующих версиях)

## 🐛 Устранение неполадок

### Supabase не подключается

1. Проверьте переменные окружения в `.env`
2. Убедитесь, что URL и ключ скопированы правильно
3. Проверьте настройки CORS в Supabase
4. Откройте консоль браузера для проверки ошибок

### Ошибки аутентификации

1. Проверьте **Site URL** и **Redirect URLs** в настройках Supabase
2. Убедитесь, что пользователь создан и подтвержден
3. Проверьте политики RLS

### База данных не создается

1. Выполните SQL код еще раз
2. Проверьте права доступа к базе данных
3. Используйте **SQL Editor** в панели Supabase

## 📚 Дополнительные ресурсы

- [Документация Supabase](https://supabase.com/docs)
- [Руководство по RLS](https://supabase.com/docs/guides/auth/row-level-security)
- [API Reference](https://supabase.com/docs/reference/javascript/introduction)

## 💡 Советы по оптимизации

1. **Индексы**: Создавайте индексы для часто используемых запросов
2. **Кеширование**: Используйте локальное кеширование для улучшения производительности
3. **Оптимизация изображений**: Используйте Supabase Storage для хранения изображений
4. **Мониторинг**: Следите за использованием ресурсов в панели Supabase