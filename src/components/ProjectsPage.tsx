'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Github, ExternalLink, Calendar, Filter, Search, Eye, EyeOff, X, Link } from 'lucide-react'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { useCMS, PortfolioItem } from '../contexts/CMSContext'
import { ImageWithFallback } from './figma/ImageWithFallback'

interface ProjectsPageProps {
  onBackToMain: () => void
  selectedProjectId?: string | null
  onProjectSelect?: (projectId: string | null) => void
}

const ProjectsPage: React.FC<ProjectsPageProps> = ({ 
  onBackToMain, 
  selectedProjectId, 
  onProjectSelect 
}) => {
  const { state } = useCMS()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedAccessType, setSelectedAccessType] = useState<string>('all')
  const [expandedProject, setExpandedProject] = useState<PortfolioItem | null>(null)

  // SEO для страницы проектов
  useEffect(() => {
    document.title = 'Проекты - Олег Кононенко | Портфолио разработчика ИИ-решений'
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Портфолио проектов Олега Кононенко: ИИ-системы, автоматизация бизнес-процессов, компьютерное зрение, световой дизайн. Практические решения с использованием современных технологий.')
    }
  }, [])

  // Автоматически открыть выбранный проект
  useEffect(() => {
    if (selectedProjectId) {
      const project = state.portfolioItems.find(p => p.id === selectedProjectId)
      if (project) {
        setExpandedProject(project)
      }
    }
  }, [selectedProjectId, state.portfolioItems])

  // Закрыть модальное окно
  const closeExpandedProject = () => {
    setExpandedProject(null)
    if (onProjectSelect) {
      onProjectSelect(null)
    }
  }

  const filteredProjects = state.portfolioItems.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory
    const matchesAccessType = selectedAccessType === 'all' || project.accessType === selectedAccessType
    
    return matchesSearch && matchesCategory && matchesAccessType && project.status === 'active'
  })

  const categories = [...new Set(state.portfolioItems.map(project => project.category))]

  const handleProjectInteraction = (projectTitle: string) => {
    // Аналитика для маркетинга
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'project_view', {
        'event_category': 'engagement',
        'event_label': projectTitle,
        'value': 1
      })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container h-16 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={onBackToMain}
            className="hover:bg-accent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад
          </Button>
          
          <h1 className="text-lg font-semibold gradient-text">Проекты</h1>
          
          <div className="w-[120px]" /> {/* Spacer for alignment */}
        </div>
      </header>

      <main className="py-8 lg:py-16">
        <div className="container px-4 sm:px-6 lg:px-8">
          {/* Hero секция */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="mb-4">Мои проекты</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              Коллекция решений в области искусственного интеллекта, автоматизации бизнес-процессов 
              и инновационных технологий. Каждый проект — это практическое применение современных 
              подходов для решения реальных задач.
            </p>

            {/* Статистика */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">{state.portfolioItems.length}</div>
                <div className="text-sm text-muted-foreground">Проектов</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">{categories.length}</div>
                <div className="text-sm text-muted-foreground">Категорий</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">
                  {state.portfolioItems.filter(p => p.accessType === 'public').length}
                </div>
                <div className="text-sm text-muted-foreground">Публичных</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">
                  {state.portfolioItems.filter(p => p.accessType === 'private').length}
                </div>
                <div className="text-sm text-muted-foreground">Частных</div>
              </div>
            </div>
          </motion.div>

          {/* Фильтры */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Поиск по проектам..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full sm:w-64"
                  />
                </div>
                
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full sm:w-48">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Категория" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все категории</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedAccessType} onValueChange={setSelectedAccessType}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Доступ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все проекты</SelectItem>
                    <SelectItem value="public">Публичные</SelectItem>
                    <SelectItem value="private">Частные</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="text-sm text-muted-foreground">
                Найдено проектов: {filteredProjects.length}
              </div>
            </div>
          </motion.div>

          {/* Проекты */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                onViewportEnter={() => handleProjectInteraction(project.title)}
              >
                <Card 
                  className="group hover:shadow-medium transition-all duration-300 h-full overflow-hidden cursor-pointer"
                  onClick={() => setExpandedProject(project)}
                >
                  {/* Изображение проекта */}
                  <div className="relative overflow-hidden">
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Оверлей с метками */}
                    <div className="absolute top-3 left-3">
                      <Badge 
                        variant={project.accessType === 'public' ? 'default' : 'secondary'}
                        className="flex items-center gap-1"
                      >
                        {project.accessType === 'public' ? (
                          <>
                            <Eye className="w-3 h-3" />
                            Публичный
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3" />
                            Без доступа
                          </>
                        )}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col h-full">
                    <div className="flex-1">
                      <div className="mb-3">
                        <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {project.description}
                        </p>
                      </div>

                      {/* Дата и категория */}
                      <div className="mb-4 flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(project.completedAt).toLocaleDateString('ru-RU')}
                        </div>
                        <span>{project.category}</span>
                      </div>
                    </div>

                    {/* Технологии - зафиксированы внизу */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 3).map((tech, techIndex) => (
                          <Badge key={techIndex} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.technologies.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Кнопки действий - зафиксированы внизу */}
                    <div className="flex gap-2 mt-auto">
                      {project.buttonType === 'github' && project.github && (
                        <Button
                          size="sm"
                          className="flex-1 gradient-bg text-white hover:opacity-90"
                          onClick={(e: React.MouseEvent) => {
                            e.stopPropagation()
                            window.open(project.github, '_blank')
                            handleProjectInteraction(`GitHub: ${project.title}`)
                          }}
                        >
                          <Github className="w-4 h-4 mr-2" />
                          GitHub
                        </Button>
                      )}
                      {project.buttonType === 'link' && project.buttonUrl && (
                        <Button
                          size="sm"
                          className="flex-1 gradient-bg text-white hover:opacity-90"
                          onClick={(e: React.MouseEvent) => {
                            e.stopPropagation()
                            window.open(project.buttonUrl, '_blank')
                            handleProjectInteraction(`Link: ${project.title}`)
                          }}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          {project.buttonLabel || 'Ссылка'}
                        </Button>
                      )}
                      {project.buttonType === 'none' && (
                        <div className="flex-1 text-center text-sm text-muted-foreground py-2">
                          Нет доступа
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Пустое состояние */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="mb-2">Проекты не найдены</h3>
              <p className="text-muted-foreground mb-6">
                Попробуйте изменить параметры поиска или фильтры
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('all')
                  setSelectedAccessType('all')
                }}
              >
                Сбросить фильтры
              </Button>
            </motion.div>
          )}

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-16 p-8 bg-accent/30 rounded-lg"
          >
            <h3 className="mb-4">Заинтересованы в сотрудничестве?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Готов реализовать ваши идеи с помощью современных технологий ИИ и автоматизации. 
              Обсудим ваш проект и найдем оптимальное решение.
            </p>
            <Button
              onClick={() => {
                onBackToMain()
                // Прокрутка к контактам после возврата на главную
                setTimeout(() => {
                  const contactElement = document.querySelector('#contact')
                  if (contactElement) {
                    contactElement.scrollIntoView({ behavior: 'smooth' })
                  }
                }, 100)
              }}
              className="gradient-bg text-white"
            >
              Связаться со мной
            </Button>
          </motion.div>
        </div>
      </main>

      {/* Модальное окно для развернутого проекта */}
      <AnimatePresence>
        {expandedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={closeExpandedProject}
          >
            {/* Размытый фон */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-md" />
            
            {/* Контент проекта */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-background rounded-lg shadow-2xl max-w-4xl max-h-[90vh] overflow-y-auto w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Кнопка закрытия */}
              <button
                onClick={closeExpandedProject}
                className="absolute top-4 right-4 z-10 p-2 bg-background/80 rounded-full hover:bg-accent transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Изображение проекта */}
              <div className="relative h-64 lg:h-80 overflow-hidden rounded-t-lg">
                <ImageWithFallback
                  src={expandedProject.image}
                  alt={expandedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Метка доступа */}
                <div className="absolute top-4 left-4">
                  <Badge 
                    variant={expandedProject.accessType === 'public' ? 'default' : 'secondary'}
                    className="flex items-center gap-1"
                  >
                    {expandedProject.accessType === 'public' ? (
                      <>
                        <Eye className="w-3 h-3" />
                        Публичный проект
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3 h-3" />
                        Без публичного доступа
                      </>
                    )}
                  </Badge>
                </div>

                {/* Заголовок на изображении */}
                <div className="absolute bottom-4 left-4 right-16">
                  <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                    {expandedProject.title}
                  </h1>
                  <p className="text-white/80 text-sm">
                    {expandedProject.category}
                  </p>
                </div>
              </div>

              {/* Контент */}
              <div className="p-6 lg:p-8">
                {/* Мета-информация */}
                <div className="flex items-center justify-between mb-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Завершен: {new Date(expandedProject.completedAt).toLocaleDateString('ru-RU')}
                  </div>
                  <div>
                    Статус: {expandedProject.status === 'active' ? 'Активный' : 'Архивный'}
                  </div>
                </div>

                {/* Описание с прокруткой */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">О проекте</h3>
                  <div className="max-h-60 overflow-y-auto pr-2">
                    <p className="text-muted-foreground leading-relaxed">
                      {expandedProject.description}
                    </p>
                  </div>
                </div>

                {/* Технологии */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">Технологии</h3>
                  <div className="flex flex-wrap gap-2">
                    {expandedProject.technologies.map((tech, index) => (
                      <Badge key={index} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Кнопки действий */}
                <div className="flex gap-4 pt-6 border-t">
                  {expandedProject.buttonType === 'github' && expandedProject.github && (
                    <Button
                      className="gradient-bg text-white hover:opacity-90"
                      onClick={() => {
                        window.open(expandedProject.github, '_blank')
                        handleProjectInteraction(`GitHub Modal: ${expandedProject.title}`)
                      }}
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Исходный код
                    </Button>
                  )}
                  {expandedProject.buttonType === 'link' && expandedProject.buttonUrl && (
                    <Button
                      className="gradient-bg text-white hover:opacity-90"
                      onClick={() => {
                        window.open(expandedProject.buttonUrl, '_blank')
                        handleProjectInteraction(`Link Modal: ${expandedProject.title}`)
                      }}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {expandedProject.buttonLabel || 'Перейти к проекту'}
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    onClick={closeExpandedProject}
                    className="ml-auto"
                  >
                    Закрыть
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ProjectsPage