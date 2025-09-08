'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { projectId, publicAnonKey } from '../utils/supabase/info'

export interface ProfileData {
  id?: string
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
  updatedAt?: string
}

export interface Experience {
  id?: string
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

export interface Skill {
  id?: string
  name: string
  category: 'technical' | 'management' | 'design' | 'analytics' | 'other'
  level: number // 1-5
  description?: string
  priority: number
}

export interface Education {
  id?: string
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

// Import types from other contexts
export interface BlogPost {
  id?: string
  title: string
  excerpt: string
  content: string
  tags: string[]
  publishDate: string
  readTime: number
  published: boolean
  image?: string
  seoTitle?: string
  seoDescription?: string
  updatedAt?: string
}

export interface PortfolioItem {
  id?: string
  title: string
  description: string
  image?: string
  technologies: string[]
  category: string
  demoUrl?: string
  githubUrl?: string
  priority: number
  published: boolean
  completionDate: string
  updatedAt?: string
}

export interface AnalyticsData {
  blogPostsCount: number
  portfolioItemsCount: number
  totalViews?: number
  topBlogPost?: BlogPost
  topProject?: PortfolioItem
  recentActivity: Array<{
    type: 'blog' | 'portfolio' | 'experience' | 'skill' | 'education'
    action: 'created' | 'updated' | 'deleted'
    title: string
    date: string
  }>
}

export interface DynamicCMSContextType {
  // Profile data
  profile: ProfileData | null
  
  // Content data
  experience: Experience[]
  skills: Skill[]
  education: Education[]
  blogPosts: BlogPost[]
  portfolioItems: PortfolioItem[]
  analytics: AnalyticsData | null
  
  // Loading states
  isLoading: boolean
  isProfileLoading: boolean
  isExperienceLoading: boolean
  isSkillsLoading: boolean
  isEducationLoading: boolean
  isBlogLoading: boolean
  isPortfolioLoading: boolean
  
  // Error states
  error: string | null
  isApiAvailable: boolean
  
  // Admin state
  isAdmin: boolean
  setAdmin: (isAdmin: boolean) => void
  
  // Profile operations
  updateProfile: (profile: ProfileData) => Promise<ProfileData | null>
  
  // Experience operations
  createExperience: (experience: Omit<Experience, 'id'>) => Promise<Experience | null>
  updateExperience: (id: string, updates: Partial<Experience>) => Promise<Experience | null>
  deleteExperience: (id: string) => Promise<boolean>
  
  // Skills operations
  createSkill: (skill: Omit<Skill, 'id'>) => Promise<Skill | null>
  updateSkill: (id: string, updates: Partial<Skill>) => Promise<Skill | null>
  deleteSkill: (id: string) => Promise<boolean>
  
  // Education operations
  createEducation: (education: Omit<Education, 'id'>) => Promise<Education | null>
  updateEducation: (id: string, updates: Partial<Education>) => Promise<Education | null>
  deleteEducation: (id: string) => Promise<boolean>
  
  // Blog operations
  createBlogPost: (post: Omit<BlogPost, 'id' | 'updatedAt'>) => Promise<BlogPost | null>
  updateBlogPost: (id: string, updates: Partial<BlogPost>) => Promise<BlogPost | null>
  deleteBlogPost: (id: string) => Promise<boolean>
  
  // Portfolio operations
  createPortfolioItem: (item: Omit<PortfolioItem, 'id' | 'updatedAt'>) => Promise<PortfolioItem | null>
  updatePortfolioItem: (id: string, updates: Partial<PortfolioItem>) => Promise<PortfolioItem | null>
  deletePortfolioItem: (id: string) => Promise<boolean>
  
  // Analytics operations
  fetchAnalytics: () => Promise<void>
  
  // Utility
  refetch: () => Promise<void>
  seedDefaultData: () => Promise<boolean>
}

const DynamicCMSContext = createContext<DynamicCMSContextType | null>(null)

export const DynamicCMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [experience, setExperience] = useState<Experience[]>([])
  const [skills, setSkills] = useState<Skill[]>([])
  const [education, setEducation] = useState<Education[]>([])
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([])
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  
  const [isLoading, setIsLoading] = useState(false)
  const [isProfileLoading, setIsProfileLoading] = useState(false)
  const [isExperienceLoading, setIsExperienceLoading] = useState(false)
  const [isSkillsLoading, setIsSkillsLoading] = useState(false)
  const [isEducationLoading, setIsEducationLoading] = useState(false)
  const [isBlogLoading, setIsBlogLoading] = useState(false)
  const [isPortfolioLoading, setIsPortfolioLoading] = useState(false)
  
  const [error, setError] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isApiAvailable, setIsApiAvailable] = useState(true)

  // Use a fallback approach - try to construct API URL but handle failures gracefully
  const baseUrl = React.useMemo(() => {
    try {
      if (projectId && publicAnonKey) {
        return `https://${projectId}.supabase.co/functions/v1/make-server-c2360911/api`
      }
      return null
    } catch (error) {
      console.error('Error constructing API URL:', error)
      return null
    }
  }, [projectId, publicAnonKey])
  
  const getAuthHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${publicAnonKey}`
  })

  // Fetch profile data
  const fetchProfile = async () => {
    setIsProfileLoading(true)
    try {
      if (!baseUrl) {
        throw new Error('API URL not available')
      }

      const response = await fetch(`${baseUrl}/profile`, {
        headers: getAuthHeaders()
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch profile')
      }
      
      const result = await response.json()
      setProfile(result.data)
      setIsApiAvailable(true)
    } catch (error) {
      // Silently switch to demo mode
      setIsApiAvailable(false)
      console.error('Profile API не доступен, переход в демо-режим:', error.message)
      // Use fallback data when API is not available
      const fallbackProfile: ProfileData = {
        name: 'Олег Кононенко',
        title: 'Product Manager полного цикла',
        description: 'Я трансформирую идеи в решения, объединяя IT, управление проектами и креативный дизайн. От реконструкции IKEA и внедрения CRM-систем до создания онлайн-семинаров и изучения ИИ — я нахожу комплексные подходы к задачам любого масштаба.',
        location: 'Краснодар, Россия',
        avatar: 'https://images.unsplash.com/photo-1652471943570-f3590a4e52ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMGJ1c2luZXNzbWFufGVufDF8fHx8MTc1Njk5NDE5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        availableForWork: true,
        githubUrl: 'https://github.com/olegproektor',
        linkedinUrl: 'https://www.linkedin.com/in/kononenkooleg',
        email: 'oleg@example.com'
      }
      setProfile(fallbackProfile)
    } finally {
      setIsProfileLoading(false)
    }
  }

  // Fetch experience data
  const fetchExperience = async () => {
    setIsExperienceLoading(true)
    try {
      if (!baseUrl) {
        throw new Error('API URL not available')
      }

      const response = await fetch(`${baseUrl}/experience`, {
        headers: getAuthHeaders()
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch experience')
      }
      
      const result = await response.json()
      setExperience(result.data.sort((a: Experience, b: Experience) => b.priority - a.priority))
    } catch (error) {
      // Silently switch to demo mode  
      setIsApiAvailable(false)
      console.error('Experience API не доступен, переход в демо-режим:', error.message)
      // Use fallback data
      const fallbackExperience: Experience[] = [
        {
          id: '1',
          title: 'Product Manager',
          company: 'IKEA',
          location: 'Краснодар',
          startDate: '2020-01-01',
          current: true,
          description: 'Руководство реконструкцией торгового центра и управление командой специалистов. Ответственнос��ь за полный цикл проекта от планирования до реализации.',
          achievements: [
            'Управление бюджетом более 100 млн рублей',
            'Координация команды 50+ специалистов',
            'Внедрение новых процессов управления',
            'Сокращение времени выполнения проектов на 25%'
          ],
          technologies: ['Project Management', 'Agile', 'Scrum', 'Team Leadership', 'Budget Planning'],
          priority: 1
        },
        {
          id: '2',
          title: 'Основатель и CEO',
          company: 'Рекламное агентство',
          location: 'Кра��нодар',
          startDate: '2015-01-01',
          endDate: '2019-12-31',
          current: false,
          description: 'Создание и развитие рекламного агентства с нуля. Разработка уникальных световых панно и вывод новых продуктов на рынок.',
          achievements: [
            'Создание бизнеса с оборотом 50+ млн рублей',
            'Кома��да 20+ сотрудников',
            'Разработка собственной производственной линии',
            'Более 500 успешных проектов'
          ],
          technologies: ['Business Development', 'Team Building', 'Manufacturing', 'Sales', 'Marketing'],
          priority: 2
        },
        {
          id: '3',
          title: 'ИИ-консультант',
          company: 'Фриланс',
          location: 'Удаленно',
          startDate: '2023-01-01',
          current: true,
          description: 'Консультирование компаний по внедрению ИИ-решений и автоматизации бизнес-процессов.',
          achievements: [
            'Внедрение ИИ-агентов в 10+ комп��ниях',
            'Автоматизация процессов подбора персонала',
            'Разработка чат-ботов для поддержки клиентов',
            'Повышение эффективности бизнес-процессов на 40%'
          ],
          technologies: ['AI/ML', 'ChatGPT', 'Process Automation', 'Data Analysis', 'Python'],
          priority: 3
        }
      ]
      setExperience(fallbackExperience)
    } finally {
      setIsExperienceLoading(false)
    }
  }

  // Fetch skills data
  const fetchSkills = async () => {
    setIsSkillsLoading(true)
    try {
      if (!baseUrl) {
        throw new Error('API URL not available')
      }

      const response = await fetch(`${baseUrl}/skills`, {
        headers: getAuthHeaders()
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch skills')
      }
      
      const result = await response.json()
      setSkills(result.data.sort((a: Skill, b: Skill) => b.priority - a.priority))
    } catch (error) {
      // Silently switch to demo mode
      setIsApiAvailable(false)
      console.error('Skills API не доступен, переход в демо-режим:', error.message)
      // Use fallback data
      const fallbackSkills: Skill[] = [
        {
          id: '1',
          name: 'Project Management',
          category: 'management',
          level: 5,
          description: 'Управление проектами различной сложности и масштаба',
          priority: 1
        },
        {
          id: '2',
          name: 'Team Leadership',
          category: 'management',
          level: 5,
          description: 'Управление командами до 50+ человек',
          priority: 2
        },
        {
          id: '3',
          name: 'Product Strategy',
          category: 'management',
          level: 4,
          description: 'Разработка продуктовой стратегии и roadmap',
          priority: 3
        },
        {
          id: '4',
          name: 'Budget Planning',
          category: 'management',
          level: 5,
          description: 'Планирование и контроль бюджетов 100+ млн рублей',
          priority: 4
        },
        {
          id: '5',
          name: 'AI Integration',
          category: 'technical',
          level: 4,
          description: 'Внедрение ИИ решений в бизнес-процессы',
          priority: 5
        },
        {
          id: '6',
          name: 'Python',
          category: 'technical',
          level: 3,
          description: 'Автоматизация процессов и анализ данных',
          priority: 6
        },
        {
          id: '7',
          name: 'Prompt Engineering',
          category: 'technical',
          level: 4,
          description: 'Оптимизация работы с языковыми моделями',
          priority: 7
        },
        {
          id: '8',
          name: 'Data Analysis',
          category: 'analytics',
          level: 4,
          description: 'Анализ данных и метрик для принятия решений',
          priority: 8
        },
        {
          id: '9',
          name: 'Business Analytics',
          category: 'analytics',
          level: 4,
          description: 'Анализ бизнес-процессов и KPI',
          priority: 9
        },
        {
          id: '10',
          name: 'UX Research',
          category: 'design',
          level: 3,
          description: 'Исследование пользователей и их потребностей',
          priority: 10
        },
        {
          id: '11',
          name: 'Process Design',
          category: 'design',
          level: 4,
          description: 'Проектирование и оптимизация бизнес-процессов',
          priority: 11
        }
      ]
      setSkills(fallbackSkills)
    } finally {
      setIsSkillsLoading(false)
    }
  }

  // Fetch education data
  const fetchEducation = async () => {
    setIsEducationLoading(true)
    try {
      if (!baseUrl) {
        throw new Error('API URL not available')
      }

      const response = await fetch(`${baseUrl}/education`, {
        headers: getAuthHeaders()
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch education')
      }
      
      const result = await response.json()
      setEducation(result.data.sort((a: Education, b: Education) => b.priority - a.priority))
    } catch (error) {
      // Silently switch to demo mode
      setIsApiAvailable(false)
      console.error('Education API не доступен, переход в демо-режим:', error.message)
      // Use fallback data
      const fallbackEducation: Education[] = [
        {
          id: '1',
          degree: 'Магистратура по управлению проектами',
          institution: 'Кубанский государственный университет',
          location: 'Краснодар',
          startDate: '2018-09-01',
          endDate: '2020-06-01',
          current: false,
          description: 'Специализация на управлении проектами в IT и инжиниринге',
          achievements: [
            'Диплом с отличием',
            'Участие в международных конференциях',
            'Стипендиат программы академических достижений'
          ],
          priority: 1
        },
        {
          id: '2',
          degree: 'Курсы по искусственному интеллекту',
          institution: 'Онлайн-платформы',
          startDate: '2023-01-01',
          current: true,
          description: 'Изучение современных методов ИИ и их применения в бизнесе',
          achievements: [
            'Сертификаты по Machine Learning',
            'Проекты по внедрению ИИ-агентов',
            'Разработка автоматизированных решений'
          ],
          priority: 2
        }
      ]
      setEducation(fallbackEducation)
    } finally {
      setIsEducationLoading(false)
    }
  }

  // Profile operations
  const updateProfile = async (profileData: ProfileData): Promise<ProfileData | null> => {
    if (!baseUrl) {
      setError('API не доступен. Обновления будут применены после подключения к серверу.')
      return null
    }

    try {
      const response = await fetch(`${baseUrl}/profile`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(profileData)
      })
      
      if (!response.ok) {
        throw new Error('Failed to update profile')
      }
      
      const result = await response.json()
      setProfile(result.data)
      return result.data
    } catch (error) {
      setError('Невозможно обновить профиль в демо-режиме')
      return null
    }
  }

  // Experience operations
  const createExperience = async (experienceData: Omit<Experience, 'id'>): Promise<Experience | null> => {
    if (!baseUrl) {
      setError('API не доступен. Изменения не будут сохранены.')
      return null
    }

    try {
      const response = await fetch(`${baseUrl}/experience`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(experienceData)
      })
      
      if (!response.ok) {
        throw new Error('Failed to create experience')
      }
      
      const result = await response.json()
      setExperience(prev => [...prev, result.data].sort((a, b) => b.priority - a.priority))
      return result.data
    } catch (error) {
      setError('Невозможно создать опыт в демо-режиме')
      return null
    }
  }

  const updateExperience = async (id: string, updates: Partial<Experience>): Promise<Experience | null> => {
    try {
      const response = await fetch(`${baseUrl}/experience/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updates)
      })
      
      if (!response.ok) {
        throw new Error('Failed to update experience')
      }
      
      const result = await response.json()
      setExperience(prev => 
        prev.map(item => item.id === id ? result.data : item)
           .sort((a, b) => b.priority - a.priority)
      )
      return result.data
    } catch (error) {
      console.error('Error updating experience:', error)
      setError(error instanceof Error ? error.message : 'Failed to update experience')
      return null
    }
  }

  const deleteExperience = async (id: string): Promise<boolean> => {
    try {
      const response = await fetch(`${baseUrl}/experience/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      })
      
      if (!response.ok) {
        throw new Error('Failed to delete experience')
      }
      
      setExperience(prev => prev.filter(item => item.id !== id))
      return true
    } catch (error) {
      console.error('Error deleting experience:', error)
      setError(error instanceof Error ? error.message : 'Failed to delete experience')
      return false
    }
  }

  // Skills operations
  const createSkill = async (skillData: Omit<Skill, 'id'>): Promise<Skill | null> => {
    try {
      const response = await fetch(`${baseUrl}/skills`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(skillData)
      })
      
      if (!response.ok) {
        throw new Error('Failed to create skill')
      }
      
      const result = await response.json()
      setSkills(prev => [...prev, result.data].sort((a, b) => b.priority - a.priority))
      return result.data
    } catch (error) {
      console.error('Error creating skill:', error)
      setError(error instanceof Error ? error.message : 'Failed to create skill')
      return null
    }
  }

  const updateSkill = async (id: string, updates: Partial<Skill>): Promise<Skill | null> => {
    try {
      const response = await fetch(`${baseUrl}/skills/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updates)
      })
      
      if (!response.ok) {
        throw new Error('Failed to update skill')
      }
      
      const result = await response.json()
      setSkills(prev => 
        prev.map(item => item.id === id ? result.data : item)
           .sort((a, b) => b.priority - a.priority)
      )
      return result.data
    } catch (error) {
      console.error('Error updating skill:', error)
      setError(error instanceof Error ? error.message : 'Failed to update skill')
      return null
    }
  }

  const deleteSkill = async (id: string): Promise<boolean> => {
    try {
      const response = await fetch(`${baseUrl}/skills/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      })
      
      if (!response.ok) {
        throw new Error('Failed to delete skill')
      }
      
      setSkills(prev => prev.filter(item => item.id !== id))
      return true
    } catch (error) {
      console.error('Error deleting skill:', error)
      setError(error instanceof Error ? error.message : 'Failed to delete skill')
      return false
    }
  }

  // Education operations
  const createEducation = async (educationData: Omit<Education, 'id'>): Promise<Education | null> => {
    try {
      const response = await fetch(`${baseUrl}/education`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(educationData)
      })
      
      if (!response.ok) {
        throw new Error('Failed to create education')
      }
      
      const result = await response.json()
      setEducation(prev => [...prev, result.data].sort((a, b) => b.priority - a.priority))
      return result.data
    } catch (error) {
      console.error('Error creating education:', error)
      setError(error instanceof Error ? error.message : 'Failed to create education')
      return null
    }
  }

  const updateEducation = async (id: string, updates: Partial<Education>): Promise<Education | null> => {
    try {
      const response = await fetch(`${baseUrl}/education/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updates)
      })
      
      if (!response.ok) {
        throw new Error('Failed to update education')
      }
      
      const result = await response.json()
      setEducation(prev => 
        prev.map(item => item.id === id ? result.data : item)
           .sort((a, b) => b.priority - a.priority)
      )
      return result.data
    } catch (error) {
      console.error('Error updating education:', error)
      setError(error instanceof Error ? error.message : 'Failed to update education')
      return null
    }
  }

  const deleteEducation = async (id: string): Promise<boolean> => {
    try {
      const response = await fetch(`${baseUrl}/education/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      })
      
      if (!response.ok) {
        throw new Error('Failed to delete education')
      }
      
      setEducation(prev => prev.filter(item => item.id !== id))
      return true
    } catch (error) {
      console.error('Error deleting education:', error)
      setError(error instanceof Error ? error.message : 'Failed to delete education')
      return false
    }
  }

  // Seed default data
  const seedDefaultData = async (): Promise<boolean> => {
    if (!isApiAvailable) {
      return false
    }

    try {
      setIsLoading(true)
      // This would call backend API to seed default data
      const response = await fetch(`${baseUrl}/seed`, {
        method: 'POST',
        headers: getAuthHeaders()
      })

      if (response.ok) {
        await refetch()
        return true
      }
      return false
    } catch (error) {
      console.error('Error seeding data:', error)
      setError(error instanceof Error ? error.message : 'Failed to seed data')
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // Refetch all data
  const refetch = async () => {
    setIsLoading(true)
    setError(null)
    
    await Promise.all([
      fetchProfile(),
      fetchExperience(),
      fetchSkills(),
      fetchEducation(),
      fetchBlogPosts(),
      fetchPortfolioItems(),
      fetchAnalytics()
    ])
    
    setIsLoading(false)
  }

  // Load admin state from localStorage
  useEffect(() => {
    const savedAdmin = localStorage.getItem('dynamic-cms-admin')
    if (savedAdmin === 'true') {
      setIsAdmin(true)
    }
  }, [])

  // Load all data on mount
  useEffect(() => {
    refetch()
  }, [baseUrl])

  // API health check
  const checkAPIHealth = async (): Promise<boolean> => {
    if (!baseUrl) return false
    
    try {
      const response = await fetch(`${baseUrl.replace('/api', '')}/health`, {
        headers: getAuthHeaders()
      })
      return response.ok
    } catch (error) {
      console.error('API health check failed:', error)
      return false
    }
  }

  // Blog operations
  const fetchBlogPosts = async () => {
    setIsBlogLoading(true)
    try {
      if (!baseUrl) {
        throw new Error('API URL not available')
      }

      const response = await fetch(`${baseUrl}/blog`, {
        headers: getAuthHeaders()
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch blog posts')
      }
      
      const result = await response.json()
      setBlogPosts(result.data || [])
      setIsApiAvailable(true)
    } catch (error) {
      // Silently switch to demo mode
      setIsApiAvailable(false)
      console.error('Blog API не доступен, переход в демо-режим:', error.message)
      
      // Fallback demo data for blog
      const fallbackBlogPosts: BlogPost[] = [
        {
          id: '1',
          title: 'Революция в управлении продуктом: как ИИ меняет подходы к разработке',
          excerpt: 'Исследование влияния искусственного интеллекта на современные методы Product Management',
          content: '# Искусственный интеллект в Product Management\n\nСовременный мир продуктовой разработки кардинально меняется под влиянием ИИ технологий. Как Product Manager с опытом внедрения ИИ-решений, я наблюдаю фундаментальные изменения в подходах к разработке продуктов.\n\n## Новые возможности\n\n**Автоматизация принятия решений**: ИИ анализирует пользовательские данные и предлагает оптимальные решения для развития продукта.\n\n**Предиктивная аналитика**: Машинное обучение помогает прогнозировать потребности пользователей и тренды рынка.\n\n**Персонализация на масштабе**: ИИ позволяет создавать индивидуальный опыт для каждого пользователя.\n\n## Практические кейсы\n\nВ моей практике внедрения ИИ-агентов в 10+ компаниях мы достигли:\n- 40% повышения эффективности бизнес-процессов\n- Автоматизации процессов подбора персонала\n- Улучшения качества клиентской поддержки через чат-ботов\n\n## Будущее профессии\n\nProduct Manager будущего - это специалист, который умеет работать с ИИ как с мощным инструментом для принятия решений. Важно развивать навыки prompt engineering и понимание возможностей машинного обучения.',
          tags: ['Product Management', 'AI', 'Innovation'],
          publishDate: '2024-12-01',
          readTime: 8,
          published: true,
          image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80'
        },
        {
          id: '2',
          title: 'Стратегия цифровой трансформации: опыт масштабирования команды',
          excerpt: 'Как масштабировать продуктовую команду с 5 до 50+ человек и сохранить эффективность',
          content: '# Масштабирование продуктовых команд\n\nОпыт масштабирования команды в условиях быстрого роста - одна из самых сложных задач в Product Management. За время работы в IKEA я руководил ростом команды с 5 до 50+ специалистов.\n\n## Ключевые принципы масштабирования\n\n### 1. Структурированный подход к найму\n- Четкие роли и зоны ответственности\n- Стандартизированные процессы онбординга\n- Культурное соответствие как приоритет\n\n### 2. Процессы и методологии\n- Внедрение Agile/Scrum практик\n- Автоматизация рутинных задач\n- Четкие KPI и метрики эффективности\n\n### 3. Инструменты и технологии\n- Единая экосистема инструментов\n- Системы управления проектами\n- Аналитические платформы\n\n## Практические результаты\n\nБлагодаря системному подходу удалось:\n- **Сократить время выполнения проектов на 25%**\n- **Увеличить производительность команды**\n- **Сохранить качество при росте объемов**\n- **Создать самоорганизующиеся подкоманды**\n\n## Уроки и ошибки\n\nОсновные инсайты из опыта масштабирования:\n- Культура важнее процессов\n- Коммуникация - основа эффективности\n- Автоматизация должна предшествовать росту\n- Важность менторинга и развития\n\nМасштабирование команды - это не только увеличение числа людей, но и эволюция процессов, культуры и подходов к работе.',
          tags: ['Team Management', 'Scaling', 'Digital Transformation'],
          publishDate: '2024-11-15',
          readTime: 12,
          published: true,
          image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80'
        },
        {
          id: '3',
          title: 'Опыт запуска собственного бизнеса: от идеи до 50+ млн оборота',
          excerpt: 'История создания рекламного агентства с нуля и ключевые уроки предпринимательства',
          content: '# От идеи до успешного бизнеса\n\nВ 2015 году я основал рекламное агентство, которое за 4 года выросло до оборота 50+ млн рублей и команды 20+ сотрудников. Хочу поделиться ключевыми инсайтами этого пути.\n\n## Начало пути\n\n### Поиск ниши\nВместо конкуренции на перенасыщенном рынке мы сосредоточились на разработке уникальных световых панно - продукте, который практически отсутствовал в регионе.\n\n### Первые клиенты\n- Локальные кафе и рестораны\n- Торговые центры\n- Корпоративные клиенты\n\n## Этапы развития\n\n### Год 1-2: Становление\n- Отработка технологий производства\n- Формирование команды (5 человек)\n- Оборот: 5-10 млн рублей\n\n### Год 3-4: Масштабирование  \n- Собственная производственная линия\n- Расширение в соседние регионы\n- Команда: 20+ специалистов\n- Оборот: 50+ млн рублей\n\n## Ключевые факторы успеха\n\n### 1. Фокус на качестве\n- Использование премиальных материалов\n- Контроль качества на каждом этапе\n- Гарантийное обслуживание\n\n### 2. Клиентоориентированность\n- Индивидуальный подход к каждому проекту\n- Быстрая реакция на запросы\n- Долгосрочные партнерские отношения\n\n### 3. Инновации\n- Разработка собственных технологий\n- Постоянное улучшение процессов\n- Внедрение новых материалов\n\n## Уроки предпринимательства\n\n**Важность команды**: Успех бизнеса на 80% зависит от команды. Инвестиции в людей окупаются многократно.\n\n**Финансовая дисциплина**: Четкий контроль денежных потоков и планирование - основа стабильного роста.\n\n**Адаптивность**: Готовность менять стратегию в зависимости от рыночных условий.\n\n**Системный подход**: Документирование процессов позволяет масштабировать бизнес без потери качества.\n\n## Завершение проекта\n\nВ 2019 году я продал агентство, чтобы сосредоточиться на новых вызовах в Product Management. Опыт предпринимательства дал бесценное понимание бизнес-процессов, которое применяю в текущей деятельности.',
          tags: ['Entrepreneurship', 'Business Development', 'Leadership'],
          publishDate: '2024-10-20',
          readTime: 10,
          published: true,
          image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80'
        }
      ]
      setBlogPosts(fallbackBlogPosts)
    } finally {
      setIsBlogLoading(false)
    }
  }

  const createBlogPost = async (postData: Omit<BlogPost, 'id' | 'updatedAt'>): Promise<BlogPost | null> => {
    if (!isApiAvailable) {
      setError('Создание статей доступно только при подключении к Supabase API')
      return null
    }

    try {
      const response = await fetch(`${baseUrl}/blog`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(postData)
      })
      
      if (!response.ok) {
        throw new Error('Failed to create blog post')
      }
      
      const result = await response.json()
      setBlogPosts(prev => [result.data, ...prev])
      return result.data
    } catch (error) {
      console.error('Error creating blog post:', error)
      setError(error instanceof Error ? error.message : 'Failed to create blog post')
      return null
    }
  }

  const updateBlogPost = async (id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> => {
    if (!isApiAvailable) {
      setError('Редактирование статей доступно только при подключении к Supabase API')
      return null
    }

    try {
      const response = await fetch(`${baseUrl}/blog/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updates)
      })
      
      if (!response.ok) {
        throw new Error('Failed to update blog post')
      }
      
      const result = await response.json()
      setBlogPosts(prev => prev.map(post => post.id === id ? result.data : post))
      return result.data
    } catch (error) {
      console.error('Error updating blog post:', error)
      setError(error instanceof Error ? error.message : 'Failed to update blog post')
      return null
    }
  }

  const deleteBlogPost = async (id: string): Promise<boolean> => {
    if (!isApiAvailable) {
      setError('Удаление статей доступно только при подключении к Supabase API')
      return false
    }

    try {
      const response = await fetch(`${baseUrl}/blog/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      })
      
      if (!response.ok) {
        throw new Error('Failed to delete blog post')
      }
      
      setBlogPosts(prev => prev.filter(post => post.id !== id))
      return true
    } catch (error) {
      console.error('Error deleting blog post:', error)
      setError(error instanceof Error ? error.message : 'Failed to delete blog post')
      return false
    }
  }

  // Portfolio operations
  const fetchPortfolioItems = async () => {
    setIsPortfolioLoading(true)
    try {
      if (!baseUrl) {
        throw new Error('API URL not available')
      }

      const response = await fetch(`${baseUrl}/projects`, {
        headers: getAuthHeaders()
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch portfolio items')
      }
      
      const result = await response.json()
      setPortfolioItems(result.data || [])
      setIsApiAvailable(true)
    } catch (error) {
      // Silently switch to demo mode
      setIsApiAvailable(false)
      console.error('Portfolio API не доступен, переход в демо-режим:', error.message)
      
      // Fallback demo data for portfolio
      const fallbackPortfolioItems: PortfolioItem[] = [
        {
          id: '1',
          title: 'Реконструкция торгового центра IKEA',
          description: 'Управление масштабным проектом реконструкции с бюджетом 100+ млн рублей, координация команды 50+ специалистов и внедрение новых бизнес-процессов',
          image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
          technologies: ['Project Management', 'Team Leadership', 'Budget Planning', 'Process Optimization'],
          category: 'Retail & Construction',
          priority: 1,
          published: true,
          completionDate: '2024-09-01',
          demoUrl: '#',
          githubUrl: '#'
        },
        {
          id: '2',
          title: 'AI-платформа для автоматизации бизнес-процессов',
          description: 'Концептуальная разработка и внедрение ИИ-решений для оптимизации операционных процессов в 10+ компаниях с повышением эффективности на 40%',
          image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',
          technologies: ['AI Strategy', 'Process Automation', 'Machine Learning', 'ChatGPT', 'Python'],
          category: 'AI/ML',
          priority: 2,
          published: true,
          completionDate: '2024-11-01'
        },
        {
          id: '3',
          title: 'Рекламное агентство полного цикла',
          description: 'Создание и развитие рекламного агентства с нуля до оборота 50+ млн рублей, команды 20+ сотрудников и собственного производства световых панно',
          image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80',
          technologies: ['Business Development', 'Team Building', 'Manufacturing', 'Sales', 'Marketing'],
          category: 'Business & Entrepreneurship',
          priority: 3,
          published: true,
          completionDate: '2019-12-01'
        },
        {
          id: '4',
          title: 'Динамическое портфолио с CMS системой',
          description: 'Разработка современного адаптивного портфолио с полнофункциональной CMS системой, включающей управление блогом, проектами и аналитикой',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
          technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'CMS Development'],
          category: 'Web Development',
          priority: 4,
          published: true,
          completionDate: '2024-12-01',
          demoUrl: '#',
          githubUrl: 'https://github.com/olegproektor'
        },
        {
          id: '5',
          title: 'Система подбора персонала с ИИ',
          description: 'Автоматизация процессов HR через внедрение ИИ-агентов для скрининга кандидатов, анализа резюме и предварительного интервьюирования',
          image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80',
          technologies: ['AI/ML', 'HR Tech', 'NLP', 'Automation', 'Data Analysis'],
          category: 'HR Technology',
          priority: 5,
          published: true,
          completionDate: '2024-08-01'
        }
      ]
      setPortfolioItems(fallbackPortfolioItems)
    } finally {
      setIsPortfolioLoading(false)
    }
  }

  const createPortfolioItem = async (itemData: Omit<PortfolioItem, 'id' | 'updatedAt'>): Promise<PortfolioItem | null> => {
    if (!isApiAvailable) {
      setError('Создание проектов доступно только при подключении к Supabase API')
      return null
    }

    try {
      const response = await fetch(`${baseUrl}/projects`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(itemData)
      })
      
      if (!response.ok) {
        throw new Error('Failed to create portfolio item')
      }
      
      const result = await response.json()
      setPortfolioItems(prev => [result.data, ...prev.sort((a, b) => b.priority - a.priority)])
      return result.data
    } catch (error) {
      console.error('Error creating portfolio item:', error)
      setError(error instanceof Error ? error.message : 'Failed to create portfolio item')
      return null
    }
  }

  const updatePortfolioItem = async (id: string, updates: Partial<PortfolioItem>): Promise<PortfolioItem | null> => {
    if (!isApiAvailable) {
      setError('Редактирование проектов доступно только при подключении к Supabase API')
      return null
    }

    try {
      const response = await fetch(`${baseUrl}/projects/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updates)
      })
      
      if (!response.ok) {
        throw new Error('Failed to update portfolio item')
      }
      
      const result = await response.json()
      setPortfolioItems(prev => 
        prev.map(item => item.id === id ? result.data : item)
           .sort((a, b) => b.priority - a.priority)
      )
      return result.data
    } catch (error) {
      console.error('Error updating portfolio item:', error)
      setError(error instanceof Error ? error.message : 'Failed to update portfolio item')
      return null
    }
  }

  const deletePortfolioItem = async (id: string): Promise<boolean> => {
    if (!isApiAvailable) {
      setError('Удаление проектов доступно только при подключении к Supabase API')
      return false
    }

    try {
      const response = await fetch(`${baseUrl}/projects/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      })
      
      if (!response.ok) {
        throw new Error('Failed to delete portfolio item')
      }
      
      setPortfolioItems(prev => prev.filter(item => item.id !== id))
      return true
    } catch (error) {
      console.error('Error deleting portfolio item:', error)
      setError(error instanceof Error ? error.message : 'Failed to delete portfolio item')
      return false
    }
  }

  // Analytics operations
  const fetchAnalytics = async () => {
    try {
      if (!baseUrl || !isApiAvailable) {
        throw new Error('API URL not available')
      }

      const response = await fetch(`${baseUrl}/analytics`, {
        headers: getAuthHeaders()
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch analytics')
      }
      
      const result = await response.json()
      setAnalytics(result.data)
    } catch (error) {
      // Generate analytics based on current data
      const currentDate = new Date()
      const fallbackAnalytics: AnalyticsData = {
        blogPostsCount: blogPosts.length || 3,
        portfolioItemsCount: portfolioItems.length || 5,
        totalViews: 15420,
        topBlogPost: blogPosts.length > 0 ? blogPosts[0] : {
          id: '1',
          title: 'Революция в управлении продуктом: как ИИ меняет подходы к разработке',
          excerpt: 'Исследование влияния искусственного интеллекта на современные методы Product Management',
          content: '',
          tags: ['Product Management', 'AI', 'Innovation'],
          publishDate: '2024-12-01',
          readTime: 8,
          published: true
        },
        topProject: portfolioItems.length > 0 ? portfolioItems[0] : {
          id: '1',
          title: 'Реконструкция торгового центра IKEA',
          description: 'Управление масштабным проектом реконструкции',
          technologies: ['Project Management'],
          category: 'Retail',
          priority: 1,
          published: true,
          completionDate: '2024-09-01'
        },
        recentActivity: [
          {
            type: 'blog',
            action: 'created',
            title: 'Создана статья о Product Management и ИИ',
            date: new Date(currentDate.getTime() - 86400000).toISOString()
          },
          {
            type: 'portfolio',
            action: 'updated',
            title: 'Обновлен проект AI-платформы',
            date: new Date(currentDate.getTime() - 2 * 86400000).toISOString()
          },
          {
            type: 'experience',
            action: 'created',
            title: 'Добавлен опыт работы в IKEA',
            date: new Date(currentDate.getTime() - 3 * 86400000).toISOString()
          },
          {
            type: 'skill',
            action: 'updated',
            title: 'Обновлены навыки ИИ-консультирования',
            date: new Date(currentDate.getTime() - 4 * 86400000).toISOString()
          },
          {
            type: 'education',
            action: 'created',
            title: 'Добавлены курсы по искусственному интеллекту',
            date: new Date(currentDate.getTime() - 5 * 86400000).toISOString()
          }
        ]
      }
      setAnalytics(fallbackAnalytics)
    }
  }

  // Admin state management
  const setAdmin = (admin: boolean) => {
    setIsAdmin(admin)
    localStorage.setItem('dynamic-cms-admin', admin.toString())
  }

  const contextValue: DynamicCMSContextType = {
    // Data
    profile,
    experience,
    skills,
    education,
    blogPosts,
    portfolioItems,
    analytics,
    
    // Loading states
    isLoading,
    isProfileLoading,
    isExperienceLoading,
    isSkillsLoading,
    isEducationLoading,
    isBlogLoading,
    isPortfolioLoading,
    
    // Error state
    error,
    isApiAvailable,
    
    // Admin
    isAdmin,
    setAdmin,
    
    // Profile operations
    updateProfile,
    
    // Experience operations
    createExperience,
    updateExperience,
    deleteExperience,
    
    // Skills operations
    createSkill,
    updateSkill,
    deleteSkill,
    
    // Education operations
    createEducation,
    updateEducation,
    deleteEducation,
    
    // Blog operations
    createBlogPost,
    updateBlogPost,
    deleteBlogPost,
    
    // Portfolio operations
    createPortfolioItem,
    updatePortfolioItem,
    deletePortfolioItem,
    
    // Analytics operations
    fetchAnalytics,
    
    // Utility
    refetch,
    seedDefaultData
  }

  return (
    <DynamicCMSContext.Provider value={contextValue}>
      {children}
    </DynamicCMSContext.Provider>
  )
}

export const useDynamicCMS = () => {
  const context = useContext(DynamicCMSContext)
  if (!context) {
    throw new Error('useDynamicCMS must be used within a DynamicCMSProvider')
  }
  return context
}