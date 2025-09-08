'use client'

import React, { useState } from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { useCMS } from '../contexts/CMSContext'
import type { BlogPost, PortfolioItem } from '../contexts/CMSContext'
import { motion } from 'motion/react'
import { toast } from 'sonner@2.0.3'
import BlogAnalytics from './BlogAnalytics'
import { 
  Settings, 
  FileText, 
  BarChart3, 
  Users, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye,
  Save,
  X,
  User,
  MapPin,
  Mail,
  Phone,
  Globe,
  Upload,
  Image,
  Download,
  Briefcase,
  Calendar,
  Building,
  ExternalLink
} from 'lucide-react'

const CMSDashboard = () => {
  const { state, dispatch } = useCMS()
  const [isAdmin, setIsAdmin] = useState(false)
  const [loginPassword, setLoginPassword] = useState('')
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [editingProject, setEditingProject] = useState<PortfolioItem | null>(null)
  const [showDashboard, setShowDashboard] = useState(false)

  const stats = {
    totalPosts: state.blogPosts.length,
    publishedPosts: state.blogPosts.filter(p => p.status === 'published').length,
    draftPosts: state.blogPosts.filter(p => p.status === 'draft').length,
    totalProjects: state.portfolioItems.length,
    activeProjects: state.portfolioItems.filter(p => p.status === 'active').length
  }

  const handleLogin = () => {
    const correctPassword = 'admin123' // В реальном проекте пароль должен храниться безопасно
    if (loginPassword === correctPassword) {
      setIsAdmin(true)
      dispatch({ type: 'SET_ADMIN', payload: true })
      setLoginPassword('')
      toast.success('Вход выполнен успешно!')
    } else {
      toast.error('Неверный пароль')
    }
  }

  const handleLogout = () => {
    setIsAdmin(false)
    dispatch({ type: 'SET_ADMIN', payload: false })
    setShowDashboard(false)
    toast.success('Вы вышли из системы')
  }

  const handleSaveBlogPost = (postData: Omit<BlogPost, 'id' | 'updatedAt'>) => {
    if (editingPost?.id) {
      // Обновление существующего поста
      dispatch({
        type: 'UPDATE_BLOG_POST',
        payload: {
          ...postData,
          id: editingPost.id,
          updatedAt: new Date().toISOString()
        } as BlogPost
      })
      toast.success('Статья обновлена!')
    } else {
      // Создание нового поста
      const newPost: BlogPost = {
        ...postData,
        id: Date.now().toString(),
        updatedAt: new Date().toISOString()
      } as BlogPost
      dispatch({ type: 'ADD_BLOG_POST', payload: newPost })
      toast.success('Статья создана!')
    }
    setEditingPost(null)
  }

  const handleDeleteBlogPost = (id: string) => {
    if (confirm('Вы уверены, что хотите удалить эту статью?')) {
      dispatch({ type: 'DELETE_BLOG_POST', payload: id })
      toast.success('Статья удалена!')
    }
  }

  const handleSaveProject = (projectData: Omit<PortfolioItem, 'id'>) => {
    if (editingProject?.id) {
      // Обновление существующего проекта
      dispatch({
        type: 'UPDATE_PORTFOLIO_ITEM',
        payload: {
          ...projectData,
          id: editingProject.id
        } as PortfolioItem
      })
      toast.success('Проект обновлен!')
    } else {
      // Создание нового проекта
      const newProject: PortfolioItem = {
        ...projectData,
        id: Date.now().toString()
      } as PortfolioItem
      dispatch({ type: 'ADD_PORTFOLIO_ITEM', payload: newProject })
      toast.success('Проект создан!')
    }
    setEditingProject(null)
  }

  const handleDeleteProject = (id: string) => {
    if (confirm('Вы уверены, что хотите удалить этот проект?')) {
      dispatch({ type: 'DELETE_PORTFOLIO_ITEM', payload: id })
      toast.success('Проект удален!')
    }
  }

  if (!isAdmin) {
    return (
      <section id="cms" className="py-20 lg:py-32">
        <div className="container max-w-md text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-8">
              <div className="flex items-center justify-center mb-4">
                <Settings className="size-12 text-teal-500" />
              </div>
              <h2 className="mb-2">CMS панель управления</h2>
              <p className="text-muted-foreground mb-6">
                Введите пароль для доступа к панели управления контентом
              </p>
              <div className="space-y-4">
                <Input
                  type="password"
                  placeholder="Введите пароль"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                />
                <Button 
                  onClick={handleLogin}
                  className="w-full gradient-bg text-white"
                  disabled={!loginPassword}
                >
                  <User className="mr-2 size-4" />
                  Войти
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <>
      <section id="cms" className="py-20 lg:py-32">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Settings className="size-8 text-teal-500" />
                <div>
                  <h2 className="mb-1">CMS Панель управления</h2>
                  <p className="text-sm text-muted-foreground">
                    Управление контентом сайта
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={() => setShowDashboard(true)}
                  className="gradient-bg text-white"
                >
                  <Settings className="mr-2 size-4" />
                  Открыть панель
                </Button>
                <Button 
                  onClick={handleLogout}
                  variant="outline"
                >
                  <X className="mr-2 size-4" />
                  Выйти
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Всего статей</span>
                </div>
                <div className="text-2xl font-bold">{stats.totalPosts}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.publishedPosts} опубликовано, {stats.draftPosts} черновиков
                </p>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="w-4 h-4 text-teal-600" />
                  <span className="text-sm font-medium">Проекты</span>
                </div>
                <div className="text-2xl font-bold">{stats.totalProjects}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.activeProjects} активных
                </p>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium">Просмотры</span>
                </div>
                <div className="text-2xl font-bold">1.2k</div>
                <p className="text-xs text-muted-foreground">
                  За последний месяц
                </p>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium">Посетители</span>
                </div>
                <div className="text-2xl font-bold">340</div>
                <p className="text-xs text-muted-foreground">
                  Уникальные за неделю
                </p>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="mb-4">Быстрые действия</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <Button 
                  onClick={() => setShowDashboard(true)}
                  variant="outline" 
                  className="h-auto p-4 flex flex-col items-start"
                >
                  <FileText className="size-5 mb-2 text-primary" />
                  <span className="font-medium">Управление блогом</span>
                  <span className="text-xs text-muted-foreground">
                    {stats.totalPosts} статей
                  </span>
                </Button>
                
                <Button 
                  onClick={() => setShowDashboard(true)}
                  variant="outline" 
                  className="h-auto p-4 flex flex-col items-start"
                >
                  <Briefcase className="size-5 mb-2 text-teal-600" />
                  <span className="font-medium">Управление проектами</span>
                  <span className="text-xs text-muted-foreground">
                    {stats.totalProjects} проектов
                  </span>
                </Button>
                
                <Button 
                  onClick={() => setShowDashboard(true)}
                  variant="outline" 
                  className="h-auto p-4 flex flex-col items-start"
                >
                  <BarChart3 className="size-5 mb-2 text-purple-600" />
                  <span className="font-medium">Аналитика</span>
                  <span className="text-xs text-muted-foreground">
                    Статистика сайта
                  </span>
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Full Dashboard Modal */}
      {showDashboard && (
        <div className="fixed inset-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="border-b p-4">
              <div className="flex justify-between items-center">
                <h1>CMS Dashboard</h1>
                <Button variant="outline" size="sm" onClick={() => setShowDashboard(false)}>
                  <X className="size-4" />
                </Button>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto p-4">
              <Tabs defaultValue="analytics">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="analytics">
                    📊 Аналитика
                  </TabsTrigger>
                  <TabsTrigger value="blog">
                    📝 Блог ({state.blogPosts.length})
                  </TabsTrigger>
                  <TabsTrigger value="portfolio">
                    💼 Портфолио ({state.portfolioItems.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="analytics" className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2>Аналитика и статистика</h2>
                    <div className="text-sm text-muted-foreground">
                      Обновлено: {new Date().toLocaleDateString('ru-RU')}
                    </div>
                  </div>
                  <BlogAnalytics />
                </TabsContent>

                <TabsContent value="blog" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2>Управление статьями</h2>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button onClick={() => setEditingPost({} as BlogPost)}>
                          <Plus className="size-4 mr-2" />
                          Новая статья
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
                        <DialogHeader>
                          <DialogTitle>
                            {editingPost?.id ? 'Редактировать статью' : 'Создать статью'}
                          </DialogTitle>
                        </DialogHeader>
                        <BlogPostForm
                          initialData={editingPost}
                          onSave={handleSaveBlogPost}
                          onCancel={() => setEditingPost(null)}
                        />
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="grid gap-4">
                    {state.blogPosts.map((post) => (
                      <Card key={post.id}>
                        <div className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold">{post.title}</h3>
                              <p className="text-sm text-muted-foreground mb-2">
                                {post.excerpt}
                              </p>
                              <div className="flex gap-2">
                                <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                                  {post.status === 'published' ? 'Опубликовано' : 'Черновик'}
                                </Badge>
                                {post.tags.map((tag) => (
                                  <Badge key={tag} variant="outline">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => setEditingPost(post)}
                                  >
                                    <Edit3 className="size-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
                                  <DialogHeader>
                                    <DialogTitle>Редактировать статью</DialogTitle>
                                  </DialogHeader>
                                  <BlogPostForm
                                    initialData={post}
                                    onSave={handleSaveBlogPost}
                                    onCancel={() => setEditingPost(null)}
                                  />
                                </DialogContent>
                              </Dialog>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteBlogPost(post.id)}
                              >
                                <Trash2 className="size-4 text-destructive" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="portfolio" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2>Управление портфолио</h2>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button onClick={() => setEditingProject({} as PortfolioItem)}>
                          <Plus className="size-4 mr-2" />
                          Новый проект
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>
                            {editingProject?.id ? 'Редактировать проект' : 'Создать проект'}
                          </DialogTitle>
                        </DialogHeader>
                        <PortfolioItemForm
                          initialData={editingProject}
                          onSave={handleSaveProject}
                          onCancel={() => setEditingProject(null)}
                        />
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="grid gap-4">
                    {state.portfolioItems.map((item) => (
                      <Card key={item.id}>
                        <div className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold">{item.title}</h3>
                              <p className="text-sm text-muted-foreground mb-2">
                                {item.description}
                              </p>
                              <div className="flex gap-2">
                                <Badge>{item.category}</Badge>
                                <Badge variant="outline">
                                  {item.accessType === 'public' ? 'Публичный' : 'Приватный'}
                                </Badge>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => setEditingProject(item)}
                                  >
                                    <Edit3 className="size-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle>Редактировать проект</DialogTitle>
                                  </DialogHeader>
                                  <PortfolioItemForm
                                    initialData={item}
                                    onSave={handleSaveProject}
                                    onCancel={() => setEditingProject(null)}
                                  />
                                </DialogContent>
                              </Dialog>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteProject(item.id)}
                              >
                                <Trash2 className="size-4 text-destructive" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// Blog Post Form Component
const BlogPostForm: React.FC<{
  initialData?: BlogPost | null
  onSave: (data: Omit<BlogPost, 'id' | 'updatedAt'>) => void
  onCancel: () => void
}> = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    excerpt: initialData?.excerpt || '',
    content: initialData?.content || '',
    author: initialData?.author || 'Олег Кононенко',
    publishedAt: initialData?.publishedAt || new Date().toISOString().split('T')[0],
    status: (initialData?.status || 'draft') as 'draft' | 'published',
    tags: initialData?.tags?.join(', ') || '',
    coverImage: initialData?.coverImage || '',
    readTime: initialData?.readTime || 5,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>Заголовок *</label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Слаг *</label>
          <Input
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            required
          />
        </div>
      </div>

      <div>
        <label>Краткое описание *</label>
        <Textarea
          value={formData.excerpt}
          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          rows={3}
          required
        />
      </div>

      <div>
        <label>Контент *</label>
        <Textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          rows={10}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>Статус</label>
          <Select
            value={formData.status}
            onValueChange={(value) => setFormData({ ...formData, status: value as 'draft' | 'published' })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Черновик</SelectItem>
              <SelectItem value="published">Опубликовано</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label>Время чтения (мин)</label>
          <Input
            type="number"
            value={formData.readTime}
            onChange={(e) => setFormData({ ...formData, readTime: parseInt(e.target.value) || 5 })}
          />
        </div>
      </div>

      <div>
        <label>Теги (через запятую)</label>
        <Input
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          placeholder="ИИ и нейросети, Оптимизация"
        />
      </div>

      <div>
        <label>URL изображения обложки</label>
        <Input
          value={formData.coverImage}
          onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="flex gap-2">
        <Button type="submit">
          <Save className="size-4 mr-2" />
          Сохранить
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Отмена
        </Button>
      </div>
    </form>
  )
}

// Portfolio Item Form Component
const PortfolioItemForm: React.FC<{
  initialData?: PortfolioItem | null
  onSave: (data: Omit<PortfolioItem, 'id'>) => void
  onCancel: () => void
}> = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    image: initialData?.image || '',
    technologies: initialData?.technologies?.join(', ') || '',
    github: initialData?.github || '',
    demo: initialData?.demo || '',
    category: initialData?.category || '',
    accessType: (initialData?.accessType || 'public') as 'public' | 'private',
    status: (initialData?.status || 'active') as 'active' | 'archived',
    buttonType: (initialData?.buttonType || 'none') as 'github' | 'link' | 'none',
    buttonLabel: initialData?.buttonLabel || '',
    buttonUrl: initialData?.buttonUrl || '',
    completedAt: initialData?.completedAt || new Date().toISOString().split('T')[0],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...formData,
      technologies: formData.technologies.split(',').map(tech => tech.trim()).filter(Boolean),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>Название проекта *</label>
        <Input
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      <div>
        <label>Описание *</label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
          required
        />
      </div>

      <div>
        <label>URL изображения *</label>
        <Input
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          required
        />
      </div>

      <div>
        <label>Технологии (через запятую) *</label>
        <Input
          value={formData.technologies}
          onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
          placeholder="Python, React, Node.js"
          required
        />
      </div>

      <div>
        <label>Категория *</label>
        <Input
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          placeholder="ИИ и машинное обучение"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>Тип доступа</label>
          <Select
            value={formData.accessType}
            onValueChange={(value) => setFormData({ ...formData, accessType: value as 'public' | 'private' })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="public">Публичный</SelectItem>
              <SelectItem value="private">Приватный</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label>Статус</label>
          <Select
            value={formData.status}
            onValueChange={(value) => setFormData({ ...formData, status: value as 'active' | 'archived' })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Активный</SelectItem>
              <SelectItem value="archived">Архивный</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <label>Тип кнопки</label>
        <Select
          value={formData.buttonType}
          onValueChange={(value) => setFormData({ ...formData, buttonType: value as 'github' | 'link' | 'none' })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Без кнопки</SelectItem>
            <SelectItem value="github">GitHub</SelectItem>
            <SelectItem value="link">Ссылка</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {formData.buttonType !== 'none' && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Текст кнопки</label>
            <Input
              value={formData.buttonLabel}
              onChange={(e) => setFormData({ ...formData, buttonLabel: e.target.value })}
            />
          </div>
          <div>
            <label>URL кнопки</label>
            <Input
              value={formData.buttonUrl}
              onChange={(e) => setFormData({ ...formData, buttonUrl: e.target.value })}
            />
          </div>
        </div>
      )}

      <div>
        <label>Дата завершения</label>
        <Input
          type="date"
          value={formData.completedAt}
          onChange={(e) => setFormData({ ...formData, completedAt: e.target.value })}
        />
      </div>

      <div className="flex gap-2">
        <Button type="submit">
          <Save className="size-4 mr-2" />
          Сохранить
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Отмена
        </Button>
      </div>
    </form>
  )
}

export default CMSDashboard