# Руководство по динамической CMS системе

## Обзор

Ваш сайт теперь полностью динамический! Все основные секции (профиль, опыт, навыки, образование) загружаются из API и могут быть изменены через CMS панель.

## Новые компоненты

### Динамические компоненты
- `DynamicHero` - секция героя с данными профиля
- `DynamicExperience` - секция опыта работы
- `DynamicSkills` - секция навыков с прогресс-барами
- `DynamicEducation` - секция образования
- `DynamicCMSDashboard` - расширенная CMS панель

### Контекст
- `DynamicCMSContext` - управление всеми типами данных через API

## API Endpoints

### Профиль
- `GET /api/profile` - получение данных профиля
- `PUT /api/profile` - обновление профиля (требует авторизации)

### Опыт работы
- `GET /api/experience` - получение списка опыта
- `POST /api/experience` - создание нового опыта (требует авторизации)
- `PUT /api/experience/:id` - обновление опыта (требует авторизации)
- `DELETE /api/experience/:id` - удаление опыта (требует авторизации)

### Навыки
- `GET /api/skills` - получение списка навыков
- `POST /api/skills` - создание нового навыка (требует авторизации)
- `PUT /api/skills/:id` - обновление навыка (требует авторизации)
- `DELETE /api/skills/:id` - удаление навыка (требует авторизации)

### Образование
- `GET /api/education` - получение списка образования
- `POST /api/education` - создание нового образования (требует авторизации)
- `PUT /api/education/:id` - обновление образования (требует авторизации)
- `DELETE /api/education/:id` - удаление образования (требует авторизации)

### Утилиты
- `POST /api/seed-data` - загрузка данных по умолчанию (требует авторизации)

## Использование CMS панели

1. **Вход в админ-панель**: Используйте пароль `admin123`

2. **Секции управления**:
   - **Профиль**: Основная информация, контакты, статус доступности
   - **Опыт**: Места работы, должности, достижения, технологии
   - **Навыки**: Технические и профессиональные компетенции с уровнем
   - **Образование**: Учебные заведения, степени, достижения

3. **Операции**:
   - Просмотр существующих данных
   - Добавление новых записей
   - Редактирование существующих записей
   - Удаление записей
   - Загрузка данных по умолчанию

## Типы данных

### ProfileData
```typescript
interface ProfileData {
  name: string
  title: string
  description: string
  location: string
  avatar: string
  availableForWork: boolean
  githubUrl?: string
  linkedinUrl?: string
  email?: string
  phone?: string
}
```

### Experience
```typescript
interface Experience {
  title: string
  company: string
  location?: string
  startDate: string
  endDate?: string
  current: boolean
  description: string
  achievements: string[]
  technologies: string[]
  priority: number
}
```

### Skill
```typescript
interface Skill {
  name: string
  category: 'technical' | 'management' | 'design' | 'analytics' | 'other'
  level: number // 1-5
  description?: string
  priority: number
}
```

### Education
```typescript
interface Education {
  degree: string
  institution: string
  location?: string
  startDate: string
  endDate?: string
  current: boolean
  description?: string
  achievements: string[]
  priority: number
}
```

## Особенности

- **Автоматическая сортировка**: Данные сортируются по приоритету
- **Состояния загрузки**: Скелетоны для каждой секции
- **Обработка ошибок**: Уведомления об ошибках через toast
- **Валидация**: Проверка обязательных полей
- **Приоритеты**: Настройка порядка отображения элементов

## Резервные данные

При первом запуске система автоматически создаст данные по умолчанию. Вы также можете использовать кнопку "Загрузить данные по умолчанию" в CMS панели.

## Интеграция с существующей системой

Новая динамическая CMS работает независимо от существующей CMS для блогов и проектов. Все системы интегрированы в единый интерфейс управления.

## Безопасность

- Все операции записи требуют авторизации
- Пароль администратора сохраняется в localStorage
- API использует Bearer токены для аутентификации
- Валидация данных на стороне сервера

## Производительность

- Данные загружаются асинхронно
- Кэширование состояния в контексте
- Оптимистичные обновления
- Минимальные ререндеры компонентов