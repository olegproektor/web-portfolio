'use client'

import React, { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Switch } from './ui/switch'
import { Badge } from './ui/badge'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from './ui/dialog'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  User,
  Briefcase,
  GraduationCap,
  Star,
  Database,
  AlertCircle,
  FileText,
  Folder,
  BarChart3,
  Eye,
  TrendingUp,
  Activity,
  Calendar,
  Globe
} from 'lucide-react'
import { motion } from 'motion/react'
import { toast } from 'sonner@2.0.3'
import { useDynamicCMS, ProfileData, Experience, Skill, Education, BlogPost, PortfolioItem } from '../contexts/DynamicCMSContext'
import MarkdownEditor from './MarkdownEditor'

const DynamicCMSDashboard: React.FC = () => {
  const {
    profile,
    experience,
    skills,
    education,
    blogPosts,
    portfolioItems,
    analytics,
    isAdmin,
    setAdmin,
    isLoading,
    isBlogLoading,
    isPortfolioLoading,
    error,
    isApiAvailable,
    updateProfile,
    createExperience,
    updateExperience,
    deleteExperience,
    createSkill,
    updateSkill,
    deleteSkill,
    createEducation,
    updateEducation,
    deleteEducation,
    createBlogPost,
    updateBlogPost,
    deleteBlogPost,
    createPortfolioItem,
    updatePortfolioItem,
    deletePortfolioItem,
    fetchAnalytics,
    refetch,
    seedDefaultData
  } = useDynamicCMS()

  const [adminPassword, setAdminPassword] = useState('')
  const [showAdminLogin, setShowAdminLogin] = useState(false)
  const [editingProfile, setEditingProfile] = useState<ProfileData | null>(null)
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null)
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)
  const [editingEducation, setEditingEducation] = useState<Education | null>(null)
  const [editingBlogPost, setEditingBlogPost] = useState<BlogPost | null>(null)
  const [editingPortfolioItem, setEditingPortfolioItem] = useState<PortfolioItem | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState('analytics')

  const handleAdminLogin = () => {
    if (adminPassword === 'admin123') {
      setAdmin(true)
      setShowAdminLogin(false)
      setAdminPassword('')
      toast.success('Вход в админ-панель выполнен')
    } else {
      toast.error('Неверный пароль')
    }
  }

  // Determine API status based on context
  const apiStatus = isApiAvailable ? 'online' : 'offline'

  const handleAdminLogout = () => {
    setAdmin(false)
    toast.success('Выход из админ-панели')
  }

  const handleSeedData = async () => {
    if (apiStatus === 'offline') {
      toast.info('В демо-режиме данные уже загружены для демонстрации')
      return
    }

    setIsSubmitting(true)
    try {
      const success = await seedDefaultData()
      if (success) {
        toast.success('Данные по умолчанию загружены')
      } else {
        toast.error('Ошибка загрузки данных')
      }
    } catch (error) {
      toast.error('Ошибка загрузки данных')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRefreshAnalytics = async () => {
    setIsSubmitting(true)
    try {
      await fetchAnalytics()
      toast.success('Аналитика обновлена')
    } catch (error) {
      toast.error('Ошибка обновления аналитики')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Profile save handler
  const handleProfileSave = async () => {
    if (!editingProfile) return

    if (apiStatus === 'offline') {
      toast.info('Демо-режим: изменения отображаются только визуально')
      setEditingProfile(null)
      return
    }
    
    setIsSubmitting(true)
    try {
      const result = await updateProfile(editingProfile)
      if (result) {
        toast.success('Профиль обновлен')
        setEditingProfile(null)
      } else {
        toast.error('Ошибка обновления профиля')
      }
    } catch (error) {
      toast.error('Ошибка обновления профиля')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Blog post save handler
  const handleBlogPostSave = async () => {
    if (!editingBlogPost) return
    
    if (apiStatus === 'offline') {
      toast.info('Демо-режим: создание и редактирование доступно только при подключении к Supabase')
      setEditingBlogPost(null)
      return
    }
    
    setIsSubmitting(true)
    try {
      let result
      if (editingBlogPost.id) {
        result = await updateBlogPost(editingBlogPost.id, editingBlogPost)
      } else {
        result = await createBlogPost(editingBlogPost)
      }
      
      if (result) {
        toast.success(editingBlogPost.id ? 'Статья обновлена' : 'Статья создана')
        setEditingBlogPost(null)
        await fetchAnalytics() // Refresh analytics
      } else {
        toast.error('Ошибка сохранения статьи')
      }
    } catch (error) {
      toast.error('Ошибка сохранения статьи')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Portfolio item save handler
  const handlePortfolioItemSave = async () => {
    if (!editingPortfolioItem) return
    
    if (apiStatus === 'offline') {
      toast.info('Демо-режим: создание и редактирование доступно только при подключении к Supabase')
      setEditingPortfolioItem(null)
      return
    }
    
    setIsSubmitting(true)
    try {
      let result
      if (editingPortfolioItem.id) {
        result = await updatePortfolioItem(editingPortfolioItem.id, editingPortfolioItem)
      } else {
        result = await createPortfolioItem(editingPortfolioItem)
      }
      
      if (result) {
        toast.success(editingPortfolioItem.id ? 'Проект обновлен' : 'Проект создан')
        setEditingPortfolioItem(null)
        await fetchAnalytics() // Refresh analytics
      } else {
        toast.error('Ошибка сохранения проекта')
      }
    } catch (error) {
      toast.error('Ошибка сохранения проекта')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Other save handlers (keeping existing ones)
  const handleExperienceSave = async () => {
    if (!editingExperience) return
    
    setIsSubmitting(true)
    try {
      let result
      if (editingExperience.id) {
        result = await updateExperience(editingExperience.id, editingExperience)
      } else {
        result = await createExperience(editingExperience)
      }
      
      if (result) {
        toast.success(editingExperience.id ? 'Опыт обновлен' : 'Опыт добавлен')
        setEditingExperience(null)
      } else {
        toast.error('Ошибка сохранения опыта')
      }
    } catch (error) {
      toast.error('Ошибка сохранения опыта')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSkillSave = async () => {
    if (!editingSkill) return
    
    setIsSubmitting(true)
    try {
      let result
      if (editingSkill.id) {
        result = await updateSkill(editingSkill.id, editingSkill)
      } else {
        result = await createSkill(editingSkill)
      }
      
      if (result) {
        toast.success(editingSkill.id ? 'Навык обновлен' : 'Навык добавлен')
        setEditingSkill(null)
      } else {
        toast.error('Ошибка сохранения навыка')
      }
    } catch (error) {
      toast.error('Ошибка сохранения навыка')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEducationSave = async () => {
    if (!editingEducation) return
    
    setIsSubmitting(true)
    try {
      let result
      if (editingEducation.id) {
        result = await updateEducation(editingEducation.id, editingEducation)
      } else {
        result = await createEducation(editingEducation)
      }
      
      if (result) {
        toast.success(editingEducation.id ? 'Образование обновлено' : 'Образование добавлено')
        setEditingEducation(null)
      } else {
        toast.error('Ошибка сох��анения образования')
      }
    } catch (error) {
      toast.error('Ошибка сохранения образования')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isAdmin) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="container">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                CMS панель
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="password">Пароль администратора</Label>
                  <Input
                    id="password"
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
                  />
                </div>
                <Button onClick={handleAdminLogin} className="w-full">
                  Войти
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Полнофункциональная CMS панель
                </CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={handleSeedData}
                    disabled={isSubmitting}
                  >
                    <Database className="w-4 h-4 mr-2" />
                    Загрузить данные по умолчанию
                  </Button>
                  <Button variant="outline" onClick={() => refetch()}>
                    Обновить
                  </Button>
                  <Button variant="destructive" onClick={handleAdminLogout}>
                    Выйти
                  </Button>
                </div>
              </div>
              
              {/* API Status */}
              <div className="flex items-center gap-4">
                <div className="flex items-center text-sm">
                  <div className={`w-2 h-2 rounded-full mr-2 ${
                    apiStatus === 'online' ? 'bg-green-500' : 
                    apiStatus === 'offline' ? 'bg-red-500' : 'bg-yellow-500'
                  }`} />
                  <span className="text-muted-foreground">
                    API: {apiStatus === 'online' ? 'Подключен' : 
                          apiStatus === 'offline' ? 'Недоступен' : 'Проверка...'}
                  </span>
                </div>
                
                {apiStatus === 'offline' && (
                  <Badge variant="outline" className="text-orange-600">
                    Работа в демо-режиме
                  </Badge>
                )}
              </div>

              {error && (
                <div className="flex items-center text-destructive text-sm">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  {error}
                </div>
              )}

              {apiStatus === 'offline' && (
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-blue-700 mb-2">🚀 Демо-режим активен</p>
                      <p className="text-blue-600 mb-3">
                        Отображаются реальные данные портфолио. Создание и редактирование статей/проектов 
                        доступно только при подключении к Supabase API.
                      </p>
                      <div className="bg-white border border-blue-200 rounded p-3">
                        <p className="text-blue-700 text-xs font-medium mb-1">💡 Для полной функциональности:</p>
                        <p className="text-blue-600 text-xs">
                          Настройте Supabase Edge Function согласно инструкции в файле 
                          <code className="bg-blue-100 px-1 rounded ml-1">SUPABASE_EDGE_FUNCTION_SETUP.md</code>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-7">
                  <TabsTrigger value="analytics">
                    <BarChart3 className="w-4 h-4 mr-1" />
                    Аналитика
                  </TabsTrigger>
                  <TabsTrigger value="profile">
                    <User className="w-4 h-4 mr-1" />
                    Профиль
                  </TabsTrigger>
                  <TabsTrigger value="blog">
                    <FileText className="w-4 h-4 mr-1" />
                    Блог
                  </TabsTrigger>
                  <TabsTrigger value="projects">
                    <Folder className="w-4 h-4 mr-1" />
                    Проекты
                  </TabsTrigger>
                  <TabsTrigger value="experience">
                    <Briefcase className="w-4 h-4 mr-1" />
                    Опыт
                  </TabsTrigger>
                  <TabsTrigger value="skills">
                    <Star className="w-4 h-4 mr-1" />
                    Навыки
                  </TabsTrigger>
                  <TabsTrigger value="education">
                    <GraduationCap className="w-4 h-4 mr-1" />
                    Образование
                  </TabsTrigger>
                </TabsList>

                {/* Analytics Tab */}
                <TabsContent value="analytics" className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2" />
                      Аналитика и обзор
                    </h3>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={handleRefreshAnalytics}
                        disabled={isSubmitting}
                      >
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Обновить аналитику
                      </Button>
                      {apiStatus === 'online' && (
                        <Button
                          variant="outline"
                          onClick={() => window.open('https://analytics.google.com', '_blank')}
                        >
                          <Globe className="w-4 h-4 mr-2" />
                          Google Analytics
                        </Button>
                      )}
                    </div>
                  </div>

                  {analytics ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-2">
                            <FileText className="w-8 h-8 text-blue-500" />
                            <div>
                              <p className="text-2xl font-bold">{analytics.blogPostsCount}</p>
                              <p className="text-xs text-muted-foreground">Статей в блоге</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-2">
                            <Folder className="w-8 h-8 text-green-500" />
                            <div>
                              <p className="text-2xl font-bold">{analytics.portfolioItemsCount}</p>
                              <p className="text-xs text-muted-foreground">Проектов в портфолио</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-2">
                            <Eye className="w-8 h-8 text-purple-500" />
                            <div>
                              <p className="text-2xl font-bold">{analytics.totalViews || 0}</p>
                              <p className="text-xs text-muted-foreground">Общих просмотров</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-2">
                            <Activity className="w-8 h-8 text-orange-500" />
                            <div>
                              <p className="text-2xl font-bold">{experience.length + skills.length + education.length}</p>
                              <p className="text-xs text-muted-foreground">Записей в профиле</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="p-6 text-center">
                        <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">Аналитика загружается...</p>
                      </CardContent>
                    </Card>
                  )}

                  {/* Recent Activity */}
                  {analytics?.recentActivity && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Activity className="w-5 h-5 mr-2" />
                          Последняя активность
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {analytics.recentActivity.map((activity, index) => (
                            <div key={index} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                              <div className={`w-2 h-2 rounded-full ${
                                activity.type === 'blog' ? 'bg-blue-500' :
                                activity.type === 'portfolio' ? 'bg-green-500' : 'bg-purple-500'
                              }`} />
                              <div className="flex-1">
                                <p className="text-sm font-medium">{activity.title}</p>
                                <p className="text-xs text-muted-foreground">
                                  {activity.action === 'created' ? 'Создано' : 
                                   activity.action === 'updated' ? 'Обновлено' : 'Удалено'} • {
                                   new Date(activity.date).toLocaleDateString('ru-RU')
                                  }
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                {/* Blog Tab */}
                <TabsContent value="blog" className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold flex items-center">
                      <FileText className="w-5 h-5 mr-2" />
                      Управление блогом ({blogPosts.length})
                    </h3>
                    <Button
                      onClick={() => setEditingBlogPost({
                        title: '',
                        excerpt: '',
                        content: '',
                        tags: [],
                        publishDate: new Date().toISOString().split('T')[0],
                        readTime: 5,
                        published: false
                      })}
                      disabled={apiStatus === 'offline'}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Создать статью
                    </Button>
                  </div>
                  
                  {apiStatus === 'offline' && (
                    <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
                      <p className="text-amber-700 text-sm">
                        💡 В демо-режиме отображаются примеры статей. 
                        Создание и редактирование доступно только при подключении к Supabase.
                      </p>
                    </div>
                  )}
                  
                  <div className="space-y-4">
                    {isBlogLoading ? (
                      <p className="text-center text-muted-foreground">Загрузка статей...</p>
                    ) : blogPosts.length > 0 ? (
                      blogPosts.map((post) => (
                        <Card key={post.id}>
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="font-medium mb-2">{post.title}</h4>
                                <p className="text-sm text-muted-foreground mb-2">{post.excerpt}</p>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <Badge variant={post.published ? "default" : "secondary"}>
                                    {post.published ? "Опубликовано" : "Черновик"}
                                  </Badge>
                                  <span>•</span>
                                  <Calendar className="w-3 h-3" />
                                  <span>{new Date(post.publishDate).toLocaleDateString('ru-RU')}</span>
                                  <span>•</span>
                                  <span>{post.readTime} мин чтения</span>
                                </div>
                                {post.tags.length > 0 && (
                                  <div className="flex flex-wrap gap-1 mt-2">
                                    {post.tags.map((tag, index) => (
                                      <Badge key={index} variant="outline" className="text-xs">
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>
                                )}
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setEditingBlogPost(post)}
                                  disabled={apiStatus === 'offline'}
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => {
                                    if (post.id && confirm('Удалить статью?')) {
                                      deleteBlogPost(post.id)
                                    }
                                  }}
                                  disabled={apiStatus === 'offline'}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <Card>
                        <CardContent className="p-6 text-center">
                          <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground">Статей пока нет</p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </TabsContent>

                {/* Projects Tab */}
                <TabsContent value="projects" className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold flex items-center">
                      <Folder className="w-5 h-5 mr-2" />
                      Управление проектами ({portfolioItems.length})
                    </h3>
                    <Button
                      onClick={() => setEditingPortfolioItem({
                        title: '',
                        description: '',
                        technologies: [],
                        category: '',
                        priority: 1,
                        published: true,
                        completionDate: new Date().toISOString().split('T')[0]
                      })}
                      disabled={apiStatus === 'offline'}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Добавить проект
                    </Button>
                  </div>
                  
                  {apiStatus === 'offline' && (
                    <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
                      <p className="text-amber-700 text-sm">
                        💡 В демо-режиме отображаются примеры проектов. 
                        Создание и редактирование доступно только при подключении к Supabase.
                      </p>
                    </div>
                  )}
                  
                  <div className="space-y-4">
                    {isPortfolioLoading ? (
                      <p className="text-center text-muted-foreground">Загрузка проектов...</p>
                    ) : portfolioItems.length > 0 ? (
                      portfolioItems.map((item) => (
                        <Card key={item.id}>
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="font-medium mb-2">{item.title}</h4>
                                <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                                  <Badge variant="outline">{item.category}</Badge>
                                  <Badge variant={item.published ? "default" : "secondary"}>
                                    {item.published ? "Опубликован" : "Скрыт"}
                                  </Badge>
                                  <span>•</span>
                                  <Calendar className="w-3 h-3" />
                                  <span>{new Date(item.completionDate).toLocaleDateString('ru-RU')}</span>
                                </div>
                                {item.technologies.length > 0 && (
                                  <div className="flex flex-wrap gap-1">
                                    {item.technologies.map((tech, index) => (
                                      <Badge key={index} variant="outline" className="text-xs">
                                        {tech}
                                      </Badge>
                                    ))}
                                  </div>
                                )}
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setEditingPortfolioItem(item)}
                                  disabled={apiStatus === 'offline'}
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => {
                                    if (item.id && confirm('Удалить проект?')) {
                                      deletePortfolioItem(item.id)
                                    }
                                  }}
                                  disabled={apiStatus === 'offline'}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <Card>
                        <CardContent className="p-6 text-center">
                          <Folder className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground">Проектов пока нет</p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </TabsContent>

                {/* Profile Tab (existing) */}
                <TabsContent value="profile" className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Профиль</h3>
                    <Button
                      onClick={() => setEditingProfile(profile || {
                        name: '',
                        title: '',
                        description: '',
                        location: '',
                        avatar: '',
                        availableForWork: true
                      })}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Редактировать
                    </Button>
                  </div>
                  
                  {profile ? (
                    <Card>
                      <CardContent className="p-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Имя</Label>
                            <p className="font-medium">{profile.name}</p>
                          </div>
                          <div>
                            <Label>Должность</Label>
                            <p className="font-medium">{profile.title}</p>
                          </div>
                          <div className="col-span-2">
                            <Label>Описание</Label>
                            <p className="text-muted-foreground">{profile.description}</p>
                          </div>
                          <div>
                            <Label>Местоположение</Label>
                            <p className="font-medium">{profile.location}</p>
                          </div>
                          <div>
                            <Label>Доступен для работы</Label>
                            <Badge variant={profile.availableForWork ? "default" : "secondary"}>
                              {profile.availableForWork ? "Да" : "Нет"}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <p className="text-muted-foreground">Профиль не найден</p>
                  )}
                </TabsContent>

                {/* Experience Tab (existing) */}
                <TabsContent value="experience" className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Опыт работы ({experience.length})</h3>
                    <Button
                      onClick={() => setEditingExperience({
                        title: '',
                        company: '',
                        startDate: '',
                        current: false,
                        description: '',
                        achievements: [],
                        technologies: [],
                        priority: 1
                      })}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Добавить
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {experience.map((exp) => (
                      <Card key={exp.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">{exp.title}</h4>
                              <p className="text-sm text-muted-foreground">{exp.company}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setEditingExperience(exp)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => {
                                  if (exp.id && confirm('Удалить опыт?')) {
                                    deleteExperience(exp.id)
                                  }
                                }}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* Skills Tab (existing) */}
                <TabsContent value="skills" className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Навыки ({skills.length})</h3>
                    <Button
                      onClick={() => setEditingSkill({
                        name: '',
                        category: 'technical',
                        level: 3,
                        priority: 1
                      })}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Добавить
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {skills.map((skill) => (
                      <Card key={skill.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{skill.name}</h4>
                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setEditingSkill(skill)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => {
                                  if (skill.id && confirm('Удалить навык?')) {
                                    deleteSkill(skill.id)
                                  }
                                }}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{skill.category}</Badge>
                            <Badge>{skill.level}/5</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* Education Tab (existing) */}
                <TabsContent value="education" className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Образование ({education.length})</h3>
                    <Button
                      onClick={() => setEditingEducation({
                        degree: '',
                        institution: '',
                        startDate: '',
                        current: false,
                        achievements: [],
                        priority: 1
                      })}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Добавить
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {education.map((edu) => (
                      <Card key={edu.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">{edu.degree}</h4>
                              <p className="text-sm text-muted-foreground">{edu.institution}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setEditingEducation(edu)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => {
                                  if (edu.id && confirm('Удалить образование?')) {
                                    deleteEducation(edu.id)
                                  }
                                }}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* ALL THE EXISTING DIALOGS - keeping them unchanged for now due to space */}
      {/* Profile Edit Dialog, Experience Edit Dialog, Skill Edit Dialog, Education Edit Dialog */}
      
      {/* NEW: Blog Post Edit Dialog */}
      <Dialog open={!!editingBlogPost} onOpenChange={() => setEditingBlogPost(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingBlogPost?.id ? 'Редактировать статью' : 'Создать статью'}
            </DialogTitle>
          </DialogHeader>
          {editingBlogPost && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="blog-title">Заголовок</Label>
                  <Input
                    id="blog-title"
                    value={editingBlogPost.title}
                    onChange={(e) => setEditingBlogPost({...editingBlogPost, title: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="blog-publish-date">Дата публикации</Label>
                  <Input
                    id="blog-publish-date"
                    type="date"
                    value={editingBlogPost.publishDate}
                    onChange={(e) => setEditingBlogPost({...editingBlogPost, publishDate: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="blog-excerpt">Краткое описание</Label>
                <Textarea
                  id="blog-excerpt"
                  value={editingBlogPost.excerpt}
                  onChange={(e) => setEditingBlogPost({...editingBlogPost, excerpt: e.target.value})}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="blog-tags">Теги (через запятую)</Label>
                  <Input
                    id="blog-tags"
                    value={editingBlogPost.tags.join(', ')}
                    onChange={(e) => setEditingBlogPost({
                      ...editingBlogPost, 
                      tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="blog-read-time">Время чтения (мин)</Label>
                  <Input
                    id="blog-read-time"
                    type="number"
                    value={editingBlogPost.readTime}
                    onChange={(e) => setEditingBlogPost({...editingBlogPost, readTime: parseInt(e.target.value) || 5})}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="blog-image">URL изображения</Label>
                <Input
                  id="blog-image"
                  value={editingBlogPost.image || ''}
                  onChange={(e) => setEditingBlogPost({...editingBlogPost, image: e.target.value})}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="blog-published"
                  checked={editingBlogPost.published}
                  onCheckedChange={(checked) => setEditingBlogPost({...editingBlogPost, published: checked})}
                />
                <Label htmlFor="blog-published">Опубликовать статью</Label>
              </div>

              <div>
                <Label htmlFor="blog-content">Содержание (Markdown)</Label>
                <MarkdownEditor
                  value={editingBlogPost.content}
                  onChange={(content) => setEditingBlogPost({...editingBlogPost, content})}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingBlogPost(null)}>
              Отмена
            </Button>
            <Button onClick={handleBlogPostSave} disabled={isSubmitting}>
              <Save className="w-4 h-4 mr-2" />
              Сохранить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* NEW: Portfolio Item Edit Dialog */}
      <Dialog open={!!editingPortfolioItem} onOpenChange={() => setEditingPortfolioItem(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingPortfolioItem?.id ? 'Редактировать проект' : 'Добавить проект'}
            </DialogTitle>
          </DialogHeader>
          {editingPortfolioItem && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="project-title">Название проекта</Label>
                  <Input
                    id="project-title"
                    value={editingPortfolioItem.title}
                    onChange={(e) => setEditingPortfolioItem({...editingPortfolioItem, title: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="project-category">Категория</Label>
                  <Input
                    id="project-category"
                    value={editingPortfolioItem.category}
                    onChange={(e) => setEditingPortfolioItem({...editingPortfolioItem, category: e.target.value})}
                    placeholder="FinTech, AI/ML, Web App..."
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="project-description">Описание проекта</Label>
                <Textarea
                  id="project-description"
                  value={editingPortfolioItem.description}
                  onChange={(e) => setEditingPortfolioItem({...editingPortfolioItem, description: e.target.value})}
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="project-completion-date">Дата завершения</Label>
                  <Input
                    id="project-completion-date"
                    type="date"
                    value={editingPortfolioItem.completionDate}
                    onChange={(e) => setEditingPortfolioItem({...editingPortfolioItem, completionDate: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="project-priority">Приоритет</Label>
                  <Input
                    id="project-priority"
                    type="number"
                    value={editingPortfolioItem.priority}
                    onChange={(e) => setEditingPortfolioItem({...editingPortfolioItem, priority: parseInt(e.target.value) || 1})}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="project-technologies">Технологии (через запятую)</Label>
                <Input
                  id="project-technologies"
                  value={editingPortfolioItem.technologies.join(', ')}
                  onChange={(e) => setEditingPortfolioItem({
                    ...editingPortfolioItem,
                    technologies: e.target.value.split(',').map(tech => tech.trim()).filter(tech => tech)
                  })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="project-demo-url">URL демо</Label>
                  <Input
                    id="project-demo-url"
                    value={editingPortfolioItem.demoUrl || ''}
                    onChange={(e) => setEditingPortfolioItem({...editingPortfolioItem, demoUrl: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="project-github-url">GitHub URL</Label>
                  <Input
                    id="project-github-url"
                    value={editingPortfolioItem.githubUrl || ''}
                    onChange={(e) => setEditingPortfolioItem({...editingPortfolioItem, githubUrl: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="project-image">URL изображения</Label>
                <Input
                  id="project-image"
                  value={editingPortfolioItem.image || ''}
                  onChange={(e) => setEditingPortfolioItem({...editingPortfolioItem, image: e.target.value})}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="project-published"
                  checked={editingPortfolioItem.published}
                  onCheckedChange={(checked) => setEditingPortfolioItem({...editingPortfolioItem, published: checked})}
                />
                <Label htmlFor="project-published">Опубликовать проект</Label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingPortfolioItem(null)}>
              Отмена
            </Button>
            <Button onClick={handlePortfolioItemSave} disabled={isSubmitting}>
              <Save className="w-4 h-4 mr-2" />
              Сохранить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* EXISTING DIALOGS (Profile, Experience, Skills, Education) - keeping all existing dialogs unchanged */}
      {/* Profile Edit Dialog */}
      <Dialog open={!!editingProfile} onOpenChange={() => setEditingProfile(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Редактировать профиль</DialogTitle>
          </DialogHeader>
          {editingProfile && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Имя</Label>
                <Input
                  id="name"
                  value={editingProfile.name}
                  onChange={(e) => setEditingProfile({...editingProfile, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="title">Должность</Label>
                <Input
                  id="title"
                  value={editingProfile.title}
                  onChange={(e) => setEditingProfile({...editingProfile, title: e.target.value})}
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="description">Описание</Label>
                <Textarea
                  id="description"
                  value={editingProfile.description}
                  onChange={(e) => setEditingProfile({...editingProfile, description: e.target.value})}
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="location">Местоположение</Label>
                <Input
                  id="location"
                  value={editingProfile.location}
                  onChange={(e) => setEditingProfile({...editingProfile, location: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="avatar">URL аватара</Label>
                <Input
                  id="avatar"
                  value={editingProfile.avatar}
                  onChange={(e) => setEditingProfile({...editingProfile, avatar: e.target.value})}
                />
              </div>
              <div className="col-span-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="available"
                    checked={editingProfile.availableForWork}
                    onCheckedChange={(checked) => setEditingProfile({...editingProfile, availableForWork: checked})}
                  />
                  <Label htmlFor="available">Доступен для работы</Label>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingProfile(null)}>
              Отмена
            </Button>
            <Button onClick={handleProfileSave} disabled={isSubmitting}>
              <Save className="w-4 h-4 mr-2" />
              Сохранить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Experience Edit Dialog - simplified version */}
      <Dialog open={!!editingExperience} onOpenChange={() => setEditingExperience(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingExperience?.id ? 'Редактировать опыт' : 'Добавить опыт'}
            </DialogTitle>
          </DialogHeader>
          {editingExperience && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="exp-title">Должность</Label>
                <Input
                  id="exp-title"
                  value={editingExperience.title}
                  onChange={(e) => setEditingExperience({...editingExperience, title: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="company">Компания</Label>
                <Input
                  id="company"
                  value={editingExperience.company}
                  onChange={(e) => setEditingExperience({...editingExperience, company: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="start-date">Дата начала</Label>
                <Input
                  id="start-date"
                  type="date"
                  value={editingExperience.startDate}
                  onChange={(e) => setEditingExperience({...editingExperience, startDate: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="end-date">Дата окончания</Label>
                <Input
                  id="end-date"
                  type="date"
                  value={editingExperience.endDate || ''}
                  onChange={(e) => setEditingExperience({...editingExperience, endDate: e.target.value})}
                  disabled={editingExperience.current}
                />
              </div>
              <div className="col-span-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="current-job"
                    checked={editingExperience.current}
                    onCheckedChange={(checked) => setEditingExperience({
                      ...editingExperience,
                      current: checked,
                      endDate: checked ? undefined : editingExperience.endDate
                    })}
                  />
                  <Label htmlFor="current-job">Текущая работа</Label>
                </div>
              </div>
              <div className="col-span-2">
                <Label htmlFor="description">Описание</Label>
                <Textarea
                  id="description"
                  value={editingExperience.description}
                  onChange={(e) => setEditingExperience({...editingExperience, description: e.target.value})}
                  rows={4}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingExperience(null)}>
              Отмена
            </Button>
            <Button onClick={handleExperienceSave} disabled={isSubmitting}>
              <Save className="w-4 h-4 mr-2" />
              Сохранить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Skill Edit Dialog - simplified version */}
      <Dialog open={!!editingSkill} onOpenChange={() => setEditingSkill(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingSkill?.id ? 'Редактировать навык' : 'Добавить навык'}
            </DialogTitle>
          </DialogHeader>
          {editingSkill && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="skill-name">Название навыка</Label>
                <Input
                  id="skill-name"
                  value={editingSkill.name}
                  onChange={(e) => setEditingSkill({...editingSkill, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="skill-category">Категория</Label>
                <Select
                  value={editingSkill.category}
                  onValueChange={(value) => setEditingSkill({...editingSkill, category: value as any})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Технические</SelectItem>
                    <SelectItem value="management">Управление</SelectItem>
                    <SelectItem value="design">Дизайн</SelectItem>
                    <SelectItem value="analytics">Аналитика</SelectItem>
                    <SelectItem value="other">Прочие</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="skill-level">Уровень (1-5)</Label>
                <Input
                  id="skill-level"
                  type="number"
                  min="1"
                  max="5"
                  value={editingSkill.level}
                  onChange={(e) => setEditingSkill({...editingSkill, level: parseInt(e.target.value) || 1})}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingSkill(null)}>
              Отмена
            </Button>
            <Button onClick={handleSkillSave} disabled={isSubmitting}>
              <Save className="w-4 h-4 mr-2" />
              Со��ранить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Education Edit Dialog - simplified version */}
      <Dialog open={!!editingEducation} onOpenChange={() => setEditingEducation(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingEducation?.id ? 'Редактировать образование' : 'Добавить образование'}
            </DialogTitle>
          </DialogHeader>
          {editingEducation && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edu-degree">Степень/Сертификат</Label>
                <Input
                  id="edu-degree"
                  value={editingEducation.degree}
                  onChange={(e) => setEditingEducation({...editingEducation, degree: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="institution">Учебное заведение</Label>
                <Input
                  id="institution"
                  value={editingEducation.institution}
                  onChange={(e) => setEditingEducation({...editingEducation, institution: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="edu-start-date">Дата начала</Label>
                <Input
                  id="edu-start-date"
                  type="date"
                  value={editingEducation.startDate}
                  onChange={(e) => setEditingEducation({...editingEducation, startDate: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="edu-end-date">Дата окончания</Label>
                <Input
                  id="edu-end-date"
                  type="date"
                  value={editingEducation.endDate || ''}
                  onChange={(e) => setEditingEducation({...editingEducation, endDate: e.target.value})}
                  disabled={editingEducation.current}
                />
              </div>
              <div className="col-span-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="current-education"
                    checked={editingEducation.current}
                    onCheckedChange={(checked) => setEditingEducation({
                      ...editingEducation,
                      current: checked,
                      endDate: checked ? undefined : editingEducation.endDate
                    })}
                  />
                  <Label htmlFor="current-education">Продолжается</Label>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingEducation(null)}>
              Отмена
            </Button>
            <Button onClick={handleEducationSave} disabled={isSubmitting}>
              <Save className="w-4 h-4 mr-2" />
              Сохранить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}

export default DynamicCMSDashboard