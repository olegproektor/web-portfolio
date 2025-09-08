'use client'

import React, { createContext, useContext, useReducer, useEffect, useState } from 'react'

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  publishedAt: string
  updatedAt: string
  status: 'draft' | 'published'
  tags: string[]
  coverImage?: string
  readTime: number
}

export interface PortfolioItem {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  github?: string
  demo?: string
  category: string
  accessType: 'public' | 'private'
  status: 'active' | 'archived'
  buttonType: 'github' | 'link' | 'none'
  buttonLabel?: string
  buttonUrl?: string
  completedAt: string
}

export interface CMSState {
  blogPosts: BlogPost[]
  portfolioItems: PortfolioItem[]
  isAdmin: boolean
}

type CMSAction = 
  | { type: 'SET_ADMIN'; payload: boolean }
  | { type: 'ADD_BLOG_POST'; payload: BlogPost }
  | { type: 'UPDATE_BLOG_POST'; payload: BlogPost }
  | { type: 'DELETE_BLOG_POST'; payload: string }
  | { type: 'ADD_PORTFOLIO_ITEM'; payload: PortfolioItem }
  | { type: 'UPDATE_PORTFOLIO_ITEM'; payload: PortfolioItem }
  | { type: 'DELETE_PORTFOLIO_ITEM'; payload: string }
  | { type: 'LOAD_DATA'; payload: Partial<CMSState> }

const initialState: CMSState = {
  blogPosts: [
    {
      id: '1',
      title: 'Влияние света на здоровье',
      slug: 'light-influence-on-health',
      excerpt: 'Исследование влияния светового дизайна на здоровье, с акцентом на сезонное аффективное расстройство (САР). Рассматриваются принципы создания световых решений.',
      content: `# Влияние света на здоровье

## Введение

Световой дизайн играет критически важную роль в нашем физическом и психическом здоровье. Особенно актуальной становится проблема сезонного аффективного расстройства (САР), которое затрагивает миллионы людей по всему миру.

## Сезонное аффективное расстройство (САР)

САР - это тип депрессии, связанный с изменениями сезонов и недостатком естественного света. Симптомы включают:

- Снижение настроения
- Усталость и сонливость
- Потеря интереса к деятельности
- Изменения аппетита

## Принципы светового дизайна для здоровья

### 1. Циркадные ритмы

Правильное освещение должн�� поддерживать естественный цикл сна-бодрствования:
- Утром: яркий, холодный свет (5000-6500K)
- Днем: максимальная освещенность (1000+ лк)
- Вечером: теплый, приглушенный свет (2700-3000K)

### 2. Работа с DIALux

DIALux позволяет создавать точные расчеты освещения:
- Моделирование естественного света
- Расчет уровней освещенности
- Анализ распределения света в помещении

## Влияние на серотонин

Правильное освещение стимулирует выработку серотонина - "гормона счастья":

- Яркий свет утром повышает уровень серотонина
- Недостаток света снижает его концентрацию
- Световая терапия эффективна при лечении САР

## Практические решения

### Световые панели

Разработка специальных световых панелей показывает отличные результаты:
- Имитация естественного со��нечного света
- Программируемые циклы освещения
- Интеграция с системами "умного дома"

### Рекомендации для интерьеров

- Максимальное использование естественного света
- Размещение рабочих мест у окон
- Использование светлых отражающих поверхностей
- Установка систем динамического освещения

## Заключение

Правильное освещение - это не роскошь, а необходимость для поддержания здоровья. Инвестиции в качественный световой дизайн окупаются улучшением самочувствия, продуктивности и общего качества жизни.`,
      author: 'Олег Кононенко',
      publishedAt: '2024-01-15',
      updatedAt: '2024-01-15',
      status: 'published',
      tags: ['Освещение и дизайн 3D'],
      coverImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop',
      readTime: 8
    },
    {
      id: '2', 
      title: 'ИИ для персонализированного маркетинга в рекламе',
      slug: 'ai-personalized-marketing-advertising',
      excerpt: 'Как использовать нейросети и GPT-4 для создания персонализированных рекламных кампаний на основе данных клиентов из CRM и Google Sheets.',
      content: `# ИИ для персонализированного маркетинга в рекламе

## Революция в маркетинге

Искусственный интеллект кардинально меняет подход к рекламе, позволяя создавать персонализированный контент в масштабах, недоступных ранее.

## Технологический стек

### Основные инструменты

- **GPT-4**: Генерация текстового контента
- **Нейросети**: Анализ поведения пользователей
- **CRM-системы**: Источник данных о клиентах
- **Google Sheets**: Централизованное хранение данных
- **Telegram Bot API**: Автоматизация процессов

## Проект "LLM-агент бренд режиссура"

### Ар��ит��ктура решения

Система состоит из нескольких компонентов:

1. **Сбор данных**: Интеграция с CRM и Google Sheets
2. **Анализ аудитории**: Сегментация клиентов
3. **Генерация контента**: GPT-4 создает персонализированные посты
4. **Автоматизация**: Telegram-бот обрабатывает запросы

### Алгоритм работы

\`\`\`python
def generate_personalized_content(client_data):
    # Анализ профиля клиента
    profile = analyze_client_profile(client_data)
    
    # Генерация персонализированного контента
    content = gpt4_generate(
        prompt=create_prompt(profile),
        temperature=0.7,
        max_tokens=500
    )
    
    return content
\`\`\`

## Преимущества ИИ в маркетинге

### 1. Скорость

- Создание контента за секунды вместо часов
- Мгновенная реакция на изменения в поведении клиентов
- Автоматическая оптимизация кампаний

### 2. Персонализация

- Уникальный контен�� для каждого сегмента
- Адаптация под предпочтения клиентов
- Динамическое изменение сообщений

### 3. Масштабируемость

- Обработка тысяч клиентов одновременно
- Многоканальное распространение
- Интеграция с множественными платформами

## Повышение вовлеченности

### Результаты внедрения

- **+150%** увеличение кликабельности
- **+80%** рост конверсии
- **-60%** снижение стоимости привлечения клиента

### Ключевые метрики

- Время реакции на запросы: менее 30 секунд
- Точность персонализации: 95%+
- Удовлетворенность клиентов: 4.8/5

## Telegram-бот для автоматизации

### Функционал

- Получение брифов от менеджеров
- Автоматическая генерация постов
- Модерация и утверждение контента
- Публикация в социальных сетях

### Интеграция с CRM

\`\`\`javascript
// Получение да��ных клиента из CRM
const clientData = await crm.getClientInfo(clientId);

// Генерация персонализированного контента
const personalizedPost = await ai.generateContent({
  clientProfile: clientData,
  campaignType: 'product_launch',
  tone: 'professional'
});
\`\`\`

## Будущее ИИ-маркетинга

### Тенденции развития

- Мультимодальные ИИ (текст + изображения + видео)
- Реальное время персонализации
- Предиктивная аналитика поведения

### Этические аспекты

- Прозрачность использования ИИ
- Защита персональных данных
- Баланс автоматизации и человеческого участия

## Заключение

ИИ-инструменты революционизируют маркетинг, делая его более эффективным, персонализированным и масштабируемым. Компании, которые внедряют эти техноло��ии сегодня, получают значительное конкурентное преимущество.`,
      author: 'Олег Кононенко',
      publishedAt: '2024-01-10',
      updatedAt: '2024-01-10',
      status: 'published',
      tags: ['ИИ и нейросети'],
      coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
      readTime: 6
    },
    {
      id: '3',
      title: 'Нейросети для оптимизации офисных процессов',
      slug: 'neural-networks-office-optimization',
      excerpt: 'Как ИИ-решения (GPT-4, Python, AmoCRM) автоматизируют рутинные задачи, такие как обработка заказов и генерация документов.',
      content: `# Нейросети для оптимизации офисных процессов

## Проблема офисной рутины

Современные офисы тонут в рутинных задачах: обработка документов, генерация отчетов, управление клиентской базой. ИИ-решения кардинально меняют этот подход.

## Технологический стек для автоматизации

### Основные компоненты

- **GPT-4**: Генерация текстов и анализ документов
- **Python**: Автоматизация и интеграция систем
- **AmoCRM**: Управление клиентскими данными
- **FastAPI**: Создание API для интеграций
- **Pandas**: Обработка и анализ данных

## Автоматизация обработки заказов

### Традиционный процесс

1. Получение заявки от клиента
2. Ручная обработка данных
3. Создание документов
4. Согласование с отделами
5. Отправка клиенту

**Время выполнения**: 2-4 часа

### Автоматизированный процесс с ИИ

\`\`\`python
def process_order_automatically(order_data):
    # Извлечение информации с помощью GPT-4
    extracted_info = gpt4_extract_order_info(order_data)
    
    # Создание записи в CRM
    crm_record = amocrm.create_lead(extracted_info)
    
    # Генерац��я документов
    documents = generate_order_documents(extracted_info)
    
    # Автоматическое согласование
    approval_status = auto_approve(documents)
    
    return {
        'status': 'processed',
        'time_saved': '85%',
        'documents': documents
    }
\`\`\`

**Время выполнения**: 15-20 минут

## Генерация документов

### Автоматизированные шаблоны

ИИ создает документы на основе контекста:

- **Коммерческие предложения**: Персонализированные под клиента
- **Договоры**: С учетом специфики сделки
- **Технические задания**: На основе требований проекта
- **Отчеты**: Анализ данных и выводы

### Пример генерации КП

\`\`\`python
def generate_commercial_proposal(client_info, service_type):
    prompt = f"""
    Создай коммерческое предложение для {client_info.company_name}
    Тип услуги: {service_type}
    Бюджет клиента: {client_info.budget}
    Особые требования: {client_info.requirements}
    """
    
    proposal = gpt4_generate(prompt, temperature=0.3)
    return format_document(proposal)
\`\`\`

## Результаты внедрения

### Экономия времени

- **Обработка заказов**: сокращение с 4 часов до 20 минут (-85%)
- **Генерация документов**: с 2 часов до 15 минут (-87%)
- **Подготовка отчетов**: с 1 дня до 2 часов (-75%)

### Повышение качества

- Устранение человеческих ошибок
- Стандартизация процессов
- Консистентность документов

### ROI проекта

- **Первый месяц**: экономия 120 часов рабочего времени
- **Годовая экономия**: $180,000 на зарплатах
- **Окупаемость**: 3 месяца

## Интеграция с AmoCRM

### Автоматизация CRM-процессов

\`\`\`python
class AmoCRMAutomation:
    def __init__(self, api_key):
        self.client = AmoCRMClient(api_key)
        self.ai_assistant = GPT4Assistant()
    
    def auto_qualify_lead(self, lead_id):
        lead_data = self.client.get_lead(lead_id)
        
        # ИИ анализирует качество лида
        qualification = self.ai_assistant.analyze_lead(lead_data)
        
        # Автоматически обновляем статус
        self.client.update_lead_status(lead_id, qualification.status)
        
        return qualification
\`\`\`

## Практические советы по внедрению

### Этапы внедрения в малом бизнесе

1. **Аудит процессов** (1 неделя)
   - Выявление узких мест
   - Оценка потенциала автоматизации

2. **MVP разработка** (2-3 недели)
   - Автоматизация 1-2 ключевых процессов
   - Базовая интеграция с существующими системами

3. **Тестирование** (1 неделя)
   - Проверка на реальных данных
   - Сбор обратной связи от сотрудников

4. **Масштабирование** (1-2 месяца)
   - Расширение функционала
   - Интеграция дополнительных систем

### Бюджет для малого бизнеса

- **Первоначальные затраты**: $5,000-15,000
- **Ежемесячные расходы**: $500-1,500
- **Окупаемость**: 3-6 месяцев

## Типичные ошибки внедрения

### Технические ошибки

- Недооценка сложности интеграций
- Игнорирование безопасности данных
- Отсутствие резервных планов

### Организационные ��шибки

- Сопротивление сотрудников изменениям
- Недостаточное обучение персонала
- Попытка автоматизировать все сразу

## Будущее офисной автоматизации

### Тренды 2024-2025

- **Мультимодальные ИИ**: обработка текста, изображений, аудио
- **No-code автоматизация**: создание ИИ-решений без программирования
- **Персональные ИИ-ассистенты**: для каждого сотрудника

### Подготовка к изменениям

- Непрерывное обучение сотрудников
- Гибкие рабочие процессы
- Культура экспериментов и инноваций

## Заключение

ИИ-автоматизация офисных процессов - это не будущее, а настоящее. Компании, которые внедряют эти решения сегодня, получают значительное преимущество в скорости, качестве и стоимости операций. Начните с малого, но начните уже сейчас.`,
      author: 'Олег Кононенко',
      publishedAt: '2024-01-05',
      updatedAt: '2024-01-05',
      status: 'published',
      tags: ['Оптимизация'],
      coverImage: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=400&fit=crop',
      readTime: 10
    }
  ],
  portfolioItems: [
    {
      id: '1',
      title: 'Система компьютерного зрения «Безопасная стройка»',
      description: 'ИИ-система для мониторинга безопасности на строительных площадках с использованием компьютерного зрения и машинного обучения.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop',
      technologies: ['Python', 'OpenCV', 'TensorFlow', 'YOLO', 'FastAPI'],
      github: 'https://github.com/kononenkooleg/safe-construction',
      category: 'ИИ и компьютерное зрение',
      accessType: 'public',
      status: 'active',
      buttonType: 'github',
      completedAt: '2024-03-15'
    },
    {
      id: '2',
      title: 'LLM-агент бренд режиссура',
      description: 'Автоматизированная система создания контента для социальных сетей с использованием GPT-4 и интеграцией с CRM.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
      technologies: ['GPT-4 API', 'Python', 'Telegram Bot API', 'Google Sheets API'],
      category: 'ИИ и автоматизация',
      accessType: 'private',
      status: 'active',
      buttonType: 'none',
      completedAt: '2024-02-20'
    },
    {
      id: '3',
      title: 'Система световых панелей для интерьеров',
      description: 'Разработка технологии рассеивания света для создания энергоэффективных интерьерных решений.',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
      technologies: ['DIALux', 'Cinema4D', 'AutoCAD', 'Photoshop'],
      category: 'Освещение и дизайн',
      accessType: 'public',
      status: 'active',
      buttonType: 'link',
      buttonLabel: 'Посмотреть проект',
      buttonUrl: 'https://example.com/light-panels',
      completedAt: '2017-12-01'
    }
  ],
  isAdmin: false
}

const cmsReducer = (state: CMSState, action: CMSAction): CMSState => {
  switch (action.type) {
    case 'SET_ADMIN':
      return { ...state, isAdmin: action.payload }
    
    case 'ADD_BLOG_POST':
      return {
        ...state,
        blogPosts: [action.payload, ...state.blogPosts]
      }
    
    case 'UPDATE_BLOG_POST':
      return {
        ...state,
        blogPosts: state.blogPosts.map(post =>
          post.id === action.payload.id ? action.payload : post
        )
      }
    
    case 'DELETE_BLOG_POST':
      return {
        ...state,
        blogPosts: state.blogPosts.filter(post => post.id !== action.payload)
      }
    
    case 'ADD_PORTFOLIO_ITEM':
      return {
        ...state,
        portfolioItems: [action.payload, ...state.portfolioItems]
      }
    
    case 'UPDATE_PORTFOLIO_ITEM':
      return {
        ...state,
        portfolioItems: state.portfolioItems.map(item =>
          item.id === action.payload.id ? action.payload : item
        )
      }
    
    case 'DELETE_PORTFOLIO_ITEM':
      return {
        ...state,
        portfolioItems: state.portfolioItems.filter(item => item.id !== action.payload)
      }
    
    case 'LOAD_DATA':
      return { ...state, ...action.payload }
    
    default:
      return state
  }
}

const CMSContext = createContext<{
  state: CMSState
  dispatch: React.Dispatch<CMSAction>
} | null>(null)

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cmsReducer, initialState)
  const [isInitialized, setIsInitialized] = useState(false)

  // Load data from localStorage on mount
  useEffect(() => {
    const loadInitialData = () => {
      try {
        const savedData = localStorage.getItem('portfolio-cms-data')
        if (savedData) {
          const parsedData = JSON.parse(savedData)
          // Only validate that data is a proper object structure
          if (parsedData && typeof parsedData === 'object' && 
              Array.isArray(parsedData.blogPosts) && 
              Array.isArray(parsedData.portfolioItems)) {
            dispatch({ type: 'LOAD_DATA', payload: parsedData })
          } else {
            console.log('Invalid data structure, using defaults')
            localStorage.removeItem('portfolio-cms-data')
          }
        }
      } catch (error) {
        console.error('Failed to load CMS data:', error)
        localStorage.removeItem('portfolio-cms-data')
      }
      setIsInitialized(true)
    }
    
    loadInitialData()
  }, [])

  // Save data to localStorage on state change (only after initialization)
  useEffect(() => {
    if (!isInitialized) return
    
    try {
      const dataToSave = JSON.stringify(state)
      localStorage.setItem('portfolio-cms-data', dataToSave)
    } catch (error) {
      console.error('Failed to save CMS data:', error)
      // Only remove localStorage if there's a critical error
      if (error instanceof TypeError || error instanceof RangeError) {
        localStorage.removeItem('portfolio-cms-data')
      }
    }
  }, [state, isInitialized])

  return (
    <CMSContext.Provider value={{ state, dispatch }}>
      {children}
    </CMSContext.Provider>
  )
}

export const useCMS = () => {
  const context = useContext(CMSContext)
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider')
  }
  return context
}