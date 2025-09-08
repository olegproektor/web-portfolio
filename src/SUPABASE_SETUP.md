# Настройка Supabase для сайта-визитки

## Общая информация

Ваш сайт теперь поддерживает гибридную систему управления контентом:
- **localStorage режим**: работает без подключения к интернету
- **Supabase режим**: облачная база данных с синхронизацией

## 🚀 Быстрый старт

### 1. Создание проекта Supabase

1. Зайдите на [supabase.com](https://supabase.com)
2. Создайте аккаунт или войдите
3. Нажмите "New Project"
4. Выберите организацию
5. Введите название проекта (например, "portfolio-cms")
6. Создайте надежный пароль для базы данных
7. Выберите регион (лучше ближайший к вашим пользователям)

### 2. Получение учетных данных

После создания проекта:
1. Перейдите в **Settings → API**
2. Найдите **Project URL** - это ваш `VITE_SUPABASE_URL`
3. Найдите **anon/public** ключ - это ваш `VITE_SUPABASE_ANON_KEY`

### 3. Настройка переменных окружения

Создайте файл `.env.local` в корне проекта:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Замените значения на реальные из вашего проекта Supabase!**

## 📊 Создание схемы базы данных

### Автоматическое создание таблиц

Выполните следующий SQL в **SQL Editor** Supabase:

```sql
-- Создание таблицы blog_posts
CREATE TABLE blog_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT NOT NULL DEFAULT 'Олег Кононенко',
    published_at DATE NOT NULL DEFAULT CURRENT_DATE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status TEXT CHECK (status IN ('draft', 'published')) DEFAULT 'draft',
    tags TEXT[] DEFAULT '{}',
    cover_image TEXT,
    read_time INTEGER DEFAULT 5,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Создание таблицы portfolio_items
CREATE TABLE portfolio_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    technologies TEXT[] DEFAULT '{}',
    github TEXT,
    demo TEXT,
    category TEXT NOT NULL,
    access_type TEXT CHECK (access_type IN ('public', 'private')) DEFAULT 'public',
    status TEXT CHECK (status IN ('active', 'archived')) DEFAULT 'active',
    button_type TEXT CHECK (button_type IN ('github', 'link', 'none')) DEFAULT 'none',
    button_label TEXT,
    button_url TEXT,
    completed_at DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Включение RLS (Row Level Security)
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;

-- Политики доступа - чтение для всех
CREATE POLICY "Allow public read access on blog_posts" ON blog_posts
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access on portfolio_items" ON portfolio_items
    FOR SELECT USING (true);

-- Политики записи только для аутентифицированных пользователей
CREATE POLICY "Allow authenticated insert on blog_posts" ON blog_posts
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update on blog_posts" ON blog_posts
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete on blog_posts" ON blog_posts
    FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated insert on portfolio_items" ON portfolio_items
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update on portfolio_items" ON portfolio_items
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete on portfolio_items" ON portfolio_items
    FOR DELETE USING (auth.role() = 'authenticated');

-- Функция для автоматического обновления updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Триггер для blog_posts
CREATE TRIGGER update_blog_posts_updated_at 
    BEFORE UPDATE ON blog_posts 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### Добавление начальных данных

```sql
-- Вставка тестовых данных в blog_posts
INSERT INTO blog_posts (title, slug, excerpt, content, status, tags, cover_image, read_time) VALUES
(
    'Влияние света на здоровье',
    'light-influence-on-health',
    'Исследование влияния светового дизайна на здоровье, с акцентом на сезонное аффективное расстройство (САР).',
    '# Влияние света на здоровье

## Введение

Световой дизайн играет критически важную роль в нашем физическом и психическом здоровье...

## Практические решения

- Максимальное использование естественного света
- Размещение рабочих мест у окон
- Использование светлых отражающих поверхностей',
    'published',
    ARRAY['Освещение и дизайн 3D'],
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop',
    8
);

-- Вставка тестовых данных в portfolio_items
INSERT INTO portfolio_items (title, description, image, technologies, github, category, access_type, status, button_type) VALUES
(
    'Система компьютерного зрения «Безопасная стройка»',
    'ИИ-система для мониторинга безопасности на строительных площадках с использованием компьютерного зрения.',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop',
    ARRAY['Python', 'OpenCV', 'TensorFlow', 'YOLO', 'FastAPI'],
    'https://github.com/username/safe-construction',
    'ИИ и компьютерное зрение',
    'public',
    'active',
    'github'
);
```

## 👤 Настройка аутентификации

### 1. Создание пользователя-администратора

В **Authentication → Users**:
1. Нажмите "Add user"
2. Введите email и пароль
3. Подтвердите создание

### 2. Настройка email-провайдера (опционально)

Для продакшн-использования настройте SMTP в **Authentication → Settings → SMTP Settings**.

## 🔧 Конфигурация приложения

### Переменные окружения для продакшна

Для развертывания на Vercel добавьте переменные в настройки проекта:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### Локальная разработка

1. Установите зависимости:
```bash
npm install @supabase/supabase-js
```

2. Запустите проект:
```bash
npm run dev
```

## 📱 Как использовать

### Режим localStorage (по умолчанию)
- Работает без интернета
- Данные хранятся локально
- Подходит для демонстрации

### Режим Supabase
1. Откройте CMS панель
2. Если Supabase настроен, увидите "Supabase подключен"
3. Войдите с учетными данными администратора
4. Управляйте контентом через полноценную CMS

## 🎯 Функциональность CMS

### Управление блогом
- ✅ Создание статей
- ✅ Редактирование контента
- ✅ Markdown поддержка
- ✅ Управление тегами
- ✅ Статусы (черновик/опубликовано)

### Управление портфолио
- ✅ Добавление проектов
- ✅ Загрузка изображений
- ✅ Управление технологиями
- ✅ Ссылки на GitHub/демо

### Безопасность
- ✅ Row Level Security (RLS)
- ✅ Аутентификация пользователей
- ✅ Публичное чтение, приватная запись

## 🐛 Устранение неполадок

### Проблема: "Supabase недоступен"
1. Проверьте переменные окружения
2. Убедитесь, что URL и ключ правильные
3. Проверьте подключение к интернету

### Проблема: "Ошибка авторизации"
1. Проверьте email/пароль
2. Убедитесь, что пользователь создан в Supabase
3. Проверьте RLS политики

### Проблема: "Не могу создать/редактировать"
1. Убедитесь, что вошли в систему
2. Проверьте RLS политики
3. Проверьте права пользователя

## 🚀 Деплой

### Vercel
1. Подключите GitHub репозиторий
2. Добавьте переменные окружения
3. Деплойте проект

### Netlify
1. Подключите репозиторий
2. Добавьте переменные окружения в Site settings
3. Установите команду сборки: `npm run build`

## 📞 Поддержка

Если возникли проблемы:
1. Проверьте консоль браузера на ошибки
2. Убедитесь, что все переменные окружения заданы
3. Проверьте документацию Supabase
4. Проверьте лимиты бесплатного плана Supabase

---

**Важно**: Supabase бесплатный план включает:
- 500MB хранилища
- 2GB пропускной способности
- 50MB файлового хранилища

Для продакшн-использования рассмотрите платные планы.