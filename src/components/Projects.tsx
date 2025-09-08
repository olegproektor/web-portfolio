'use client'

import React from 'react'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { motion, AnimatePresence } from 'motion/react'
import { ExternalLink, Github, Eye, EyeOff, Calendar, X } from 'lucide-react'
import { useCMS } from '../contexts/CMSContext'

interface ProjectsProps {
  onProjectClick?: (projectId: string) => void
  onModalProjectClick?: (projectId: string) => void
  expandedProjectId?: string | null
  onCloseModal?: () => void
}

const Projects: React.FC<ProjectsProps> = ({ 
  onProjectClick, 
  onModalProjectClick, 
  expandedProjectId, 
  onCloseModal 
}) => {
  const { state } = useCMS()
  const { portfolioItems } = state
  
  // Показываем только активные проекты (максимум 6 для главной страницы)
  const featuredProjects = portfolioItems
    .filter(project => project.status === 'active')
    .slice(0, 6)

  // Найти расширенный проект
  const expandedProject = expandedProjectId 
    ? portfolioItems.find(p => p.id === expandedProjectId) 
    : null

  const handleProjectInteraction = (projectTitle: string, action: string) => {
    // Аналит��ка для маркетинга
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'project_interaction', {
        'event_category': 'engagement',
        'event_label': `${action}: ${projectTitle}`,
        'value': 1
      })
    }
  }

  return (
    <section id="projects" className="py-20 lg:py-32 bg-accent/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="mb-4">Проекты</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Избранные работы, демонстрирующие мои навыки и подход к разработке
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              onViewportEnter={() => handleProjectInteraction(project.title, 'view')}
            >
              <Card 
                className="group hover:shadow-medium transition-all duration-300 h-full overflow-hidden cursor-pointer"
                onClick={() => {
                  handleProjectInteraction(project.title, 'click')
                  if (onModalProjectClick) {
                    onModalProjectClick(project.id)
                  } else if (onProjectClick) {
                    onProjectClick(project.id)
                  }
                }}
              >
                {/* Изображение проекта */}
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Оверлей с меткой доступа */}
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
                        onClick={(e) => {
                          e.stopPropagation()
                          window.open(project.github, '_blank')
                          handleProjectInteraction(project.title, 'github')
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
                        onClick={(e) => {
                          e.stopPropagation()
                          window.open(project.buttonUrl, '_blank')
                          handleProjectInteraction(project.title, 'link')
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
        {featuredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🚀</div>
            <h3 className="mb-2">Проекты скоро появятся</h3>
            <p className="text-muted-foreground">
              В данный момент ведется работа над новыми проектами
            </p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => {
              window.open('https://github.com/olegproektor', '_blank')
              handleProjectInteraction('GitHub Profile', 'visit')
            }}
          >
            <Github className="w-4 h-4 mr-2" />
            Больше проектов
          </Button>
        </motion.div>

        {/* Модальное окно для расширенного проекта */}
        <AnimatePresence>
          {expandedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={onCloseModal}
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
                  onClick={onCloseModal}
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

                {/* Контент с прокруткой */}
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
                          handleProjectInteraction(`GitHub Modal: ${expandedProject.title}`, 'github')
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
                          handleProjectInteraction(`Link Modal: ${expandedProject.title}`, 'link')
                        }}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        {expandedProject.buttonLabel || 'Перейти к проекту'}
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      onClick={onCloseModal}
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
    </section>
  )
}

export default Projects