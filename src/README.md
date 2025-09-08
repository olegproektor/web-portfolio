# 🚀 Портфолио Олега Кононенко

> **Полнофункциональное динамическое портфолио с продвинутой CMS системой, управлением блогом и проектами**

[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat&logo=vercel)](https://vercel.com)
[![React](https://img.shields.io/badge/React-18-blue?style=flat&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Ready-green?style=flat&logo=supabase)](https://supabase.com)

## ✨ Особенности

### 🎨 **Дизайн и UX**
- 🌗 Поддержка светлой и темной темы
- 📱 Полностью адаптивный дизайн (Desktop/Tablet/Mobile)
- 🎭 Плавные анимации и переходы с Motion
- 🎨 Современная цветовая схема с градиентами
- ⚡ Атомная анимация в Hero секции

### 🛠 **Динамическая функциональность**
- 🔗 **Полнофункциональная CMS система**: управление всем контентом
- 🗄️ **Supabase интеграция**: облачная база данных с API
- 📊 **Гибридная архитектура**: автоматический fallback на демо-данные
- 🔄 **Серверные функции**: 15+ API endpoints
- 📈 **Система аналитики** с отслеживанием событий
- 🔍 **Поиск и фильтрация** проектов и статей
- 📧 **Контактная форма** с валидацией
- 🔐 **Система авторизации** с поддержкой Supabase Auth
- 🔄 **Graceful degradation**: работает в любых условиях

### 🎛 **Полнофункциональная CMS система**
- 📊 **Аналитика и мониторинг**: дашборд с метриками, Google Analytics интеграция
- ✍️ **Управление блогом**: создание/редактирование статей с Markdown редактором, SEO поля
- 🚀 **Управление проектами**: полное CRUD управление портфолио, технологии, ссылки
- 💼 **Опыт работы**: динамическое управление карьерой и достижениями
- 🛠 **Навыки**: интерактивные диаграммы с полным редактированием
- 🎓 **Образование**: управление дипломами, сертификатами и курсами  
- 👤 **Профиль**: полное редактирование персональной информации
- 📈 **История активности**: отслеживание всех изменений в системе

### ⚙️ **Технический стек**
- **Frontend**: React 18 + TypeScript + Vite
- **База данных**: Supabase (PostgreSQL) + localStorage fallback
- **API**: Supabase Edge Functions (Hono.js)
- **Аутентификация**: Supabase Auth
- **Стили**: Tailwind CSS v4 + CSS Variables
- **Анимации**: Motion (Framer Motion)
- **UI**: Shadcn/ui компоненты (45+ компонентов)
- **Формы**: React Hook Form + Zod валидация
- **Иконки**: Lucide React
- **Аналитика**: Google Analytics 4
- **Хостинг**: Vercel + Docker ready

## 🚀 Быстрый старт

### Локальный запуск с Docker (рекомендуется)

```bash
# Клонирование репозитория
git clone https://github.com/username/portfolio-oleg-kononenko.git
cd portfolio-oleg-kononenko

# Настройка окружения
cp .env.example .env

# Запуск в режиме разработки
docker-compose -f docker-compose.dev.yml up --build

# Открыть http://localhost:3000
```

### Обычная установка

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Открыть http://localhost:5173
```

### Режимы работы

#### **Демо-режим** (по умолчанию)
- ✅ Работает сразу без настройки
- ✅ Богатые тестовые данные
- ✅ Полная функциональность UI
- ✅ CMS панель доступна (пароль: `admin123`)
- ⚠️ Только чтение, без создания нового контента

#### **Полный режим с Supabase**
- ✅ Облачное хранение данных
- ✅ Полное CRUD управление
- ✅ Система аутентификации
- ✅ Real-time возможности
- ✅ Масштабируемость

Для настройки Supabase следуйте [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)

## 🎛 Полнофункциональная CMS панель

### 🔐 Доступ к CMS
- **Демо-режим**: Прокрутите до конца страницы, пароль `admin123`
- **Supabase режим**: Email/password из вашего Supabase проекта
- **Автоматическое переключение**: система сама определяет доступный режим

### 📊 Возможности Dynamic CMS

#### **У��равление контентом**
- 📝 **Блог статьи**: Markdown редактор, SEO мета-данные, теги
- 🚀 **Проекты портфолио**: Технологии, ссылки, изображения
- 💼 **Опыт работы**: Компании, позиции, достижения
- 🛠 **Навыки**: Frontend/Backend статистика с визуализацией
- 🎓 **Образование**: Дипломы, сертификаты, курсы
- 👤 **Персональная информация**: О себе, контакты, социальные сети

#### **Аналитика и мониторинг**
- 📊 Статистика контента
- 🔌 Статус подключения к Supabase
- 📈 Индикаторы производительности
- 🔄 Управление источниками данных

#### **Система управления**
- 🔍 Поиск и фильтрация
- 📁 Импорт/экспорт данных
- ⚙️ Настройки системы
- 🔄 Синхронизация данных

## 🏗 Архитектура проекта

### 📁 Структура

```
portfolio/
├── 📄 App.tsx                       # Главный компонент с мультиконтекстной архитектурой
├── components/
│   ├── ui/                          # Shadcn/ui компоненты (45 шт.)
│   ├── DynamicCMSDashboard.tsx      # Главная CMS панель
│   ├── Dynamic*.tsx                 # Динамические компоненты (Hero, Skills, Experience, Education)
│   ├── ApiStatusBanner.tsx          # Индикатор состояния API
│   └── [другие компоненты...]
├── contexts/                        # React контексты
│   ├── CMSContext.tsx              # localStorage управление
│   ├── SupabaseCMSContext.tsx      # Supabase интеграция
│   ├── HybridCMSContext.tsx        # Гибридный режим
│   └── DynamicCMSContext.tsx       # Динамическое управление данными
├── supabase/functions/server/       # Серверные Edge Functions
│   ├── index.tsx                   # Hono.js сервер с 15+ endpoints
│   └── kv_store.tsx               # KV хранилище (защищенный файл)
├── hooks/
│   └── useSupabaseCMS.ts           # Хуки для работы с API
├── lib/
│   └── supabase.ts                 # Supabase клиент
├── styles/
│   └── globals.css                 # Tailwind CSS v4 + переменные
├── utils/
│   └── supabase/info.tsx          # Конфигурация Supabase
├── 📄 docker-compose.yml          # Продакшн Docker
├── 📄 docker-compose.dev.yml      # Разработка Docker
└── 📄 vercel.json                 # Конфигурация Vercel
```

### 🔄 Контексты и состояние

**Многоуровневая архитектура контекстов:**
```tsx
<CMSProvider>                    // Базовое localStorage управление
  <SupabaseCMSProvider>         // Supabase интеграция
    <HybridCMSProvider>         // Автоматическое переключение
      <DynamicCMSProvider>      // Динамическое управление всеми типами данных
        <App />
      </DynamicCMSProvider>
    </HybridCMSProvider>
  </SupabaseCMSProvider>
</CMSProvider>
```

### 🌐 API Endpoints (22+ endpoints)

**Управление контентом:**
```
GET    /api/blog               # Получение статей блога
POST   /api/blog               # Создание статьи  
PUT    /api/blog/:id           # Обновление статьи
DELETE /api/blog/:id           # Удаление статьи

GET    /api/projects           # Получение проектов
POST   /api/projects           # Создание проекта
PUT    /api/projects/:id       # Обновление проекта
DELETE /api/projects/:id       # Удаление проекта

GET    /api/analytics          # Аналитика и метрики
```

**Профильные данные:**
```
GET    /api/profile            # Профиль пользователя
PUT    /api/profile            # Обновление профиля
GET    /api/experience         # Опыт работы
POST   /api/experience         # Создание опыта
PUT    /api/experience/:id     # Обновление опыта
DELETE /api/experience/:id     # Удаление опыта
GET    /api/skills             # Навыки
GET    /api/education          # Образование
GET    /api/status             # Статус API
```

## 🚀 Деплой

### Docker деплой (рекомендуется)

```bash
# Продакшн сборка
docker-compose up --build

# Или разработка с hot-reload
docker-compose -f docker-compose.dev.yml up --build
```

### Vercel деплой

1. **Fork** репозитория
2. Подключите к [vercel.com](https://vercel.com)
3. Добавьте переменные окружения:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```
4. Deploy ✨

### Другие платформы

Проект готов для деплоя на:
- ✅ **Vercel** (оптимизирован)
- ✅ **Netlify**
- ✅ **Railway**
- ✅ **DigitalOcean App Platform**
- ✅ **AWS Amplify**
- ✅ **Azure Static Web Apps**

## 🔧 Разработка

### Команды

```bash
# Разработка
npm run dev              # Dev сервер
docker-compose -f docker-compose.dev.yml up  # Docker dev

# Продакшн
npm run build           # Сборка
npm run preview         # Предпросмотр
docker-compose up --build  # Docker prod

# Утилиты
npm run type-check      # Проверка типов
npm run lint           # Линтинг
```

### Работа с динамическими данными

```tsx
import { useDynamicCMS } from '../contexts/DynamicCMSContext'

const MyComponent = () => {
  const { 
    // Данные
    heroData, 
    experienceData, 
    skillsData,
    educationData,
    blogPosts, 
    portfolioItems,
    
    // Методы
    updateHeroData,
    updateExperienceData,
    createBlogPost,
    
    // Статус
    dataSource,           // 'supabase' | 'localStorage' | 'demo'
    isSupabaseAvailable,
    loading,
    error 
  } = useDynamicCMS()
  
  // Проверка возможности редактирования
  const canEdit = dataSource === 'supabase'
}
```

## 📊 Особенности

### 🎯 SEO оптимизация
- ✅ **Lighthouse**: 97+ Performance
- ✅ **Meta теги**: Динамические Open Graph
- ✅ **Структурированные данные**: JSON-LD
- ✅ **Sitemap ready**: автогенерация
- ✅ **Core Web Vitals**: оптимизированы

### 🔒 Безопасность
- ✅ **Row Level Security**: Supabase RLS
- ✅ **Environment variables**: Защищенные ключи
- ✅ **CORS политики**: Настроенные
- ✅ **Валидация данных**: Zod схемы
- ✅ **Санитизация**: XSS защита

### ⚡ Производительность
- ✅ **Code splitting**: Автоматический
- ✅ **Lazy loading**: CMS компоненты
- ✅ **Caching**: Supabase запросы
- ✅ **Bundle optimization**: Vite
- ✅ **Image optimization**: WebP support

## 🎨 Кастомизация

### Стили и темы
```css
/* styles/globals.css */
:root {
  --background: #F7F9FC;
  --foreground: #0F172A;
  --gradient-primary: linear-gradient(135deg, #14B8A6 0%, #2563EB 100%);
}
```

### Данные по умолчанию
Демо-данные находятся в соответствующих контекстах и компонентах.

### Персонализация
1. **Фото**: Обновите в компонентах
2. **Контакты**: Измените в `Contact.tsx`
3. **Социальные сети**: Обновите ссылки
4. **Резюме**: Замените файл

## 🔍 Мониторинг и аналитика

### Google Analytics 4
```tsx
// Автоматическое отслеживание событий
<GoogleAnalytics gaId="G-XXXXXXXXXX" />
```

**Отслеживаемые события:**
- `page_view` - просмотры страниц
- `project_view` - просмотры проектов
- `blog_read` - чтение статей
- `form_submit` - отправка форм
- `cms_action` - действия в CMS

### API мониторинг
- 🟢 **API Status Banner**: индикатор состояния
- 📊 **Error tracking**: логирование ошибок
- ⏱️ **Performance metrics**: замеры скорости

## 🌐 Браузерная поддержка

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers

## 🤝 Контрибьюция

1. Fork репозитория
2. Создайте feature ветку
3. Commit изменения
4. Push в ветку
5. Создайте Pull Request

## 📄 Лицензия

MIT License. См. файл `LICENSE`.

## 👨‍💻 Автор

**Олег Кононенко** - Product Manager полного цикла

- 📧 Email: [Lespola76@gmail.com](mailto:Lespola76@gmail.com)
- 📱 Телефон: [+7 (931) 585-16-76](tel:+79315851676)
- 💼 LinkedIn: [kononenkooleg](https://linkedin.com/in/kononenkooleg)
- 🐙 GitHub: [olegproektor](https://github.com/olegproektor)
- 📍 Местоположение: Краснодар, Россия

---

## 🙏 Благодарности

- [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- [Supabase](https://supabase.com/) - Backend-as-a-Service
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS v4](https://tailwindcss.com/) - Styling
- [Shadcn/ui](https://ui.shadcn.com/) - UI компоненты
- [Motion](https://motion.dev/) - Анимации
- [Vercel](https://vercel.com/) - Хостинг
- [Docker](https://docker.com/) - Контейнеризация

---

<div align="center">

**⭐ Если проект полезен, поставьте звездочку! ⭐**

**Современное динамическое портфолио с полнофункциональной CMS**  
Сделано с ❤️ и передовыми технологиями

</div>