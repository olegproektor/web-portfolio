import React, { useState } from 'react';
import { useHybridCMS } from '../contexts/HybridCMSContext';
import { DataMigration } from './DataMigration';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { 
  Settings, 
  FileText, 
  BarChart3, 
  Users, 
  Plus, 
  Edit3, 
  Trash2,
  Save,
  X,
  User,
  Briefcase,
  Database
} from 'lucide-react';

export const CMSWithHybrid: React.FC = () => {
  const hybridCMS = useHybridCMS();
  const [showDashboard, setShowDashboard] = useState(false);
  const [loginPassword, setLoginPassword] = useState('');

  const stats = {
    totalPosts: hybridCMS.blogPosts.length,
    publishedPosts: hybridCMS.blogPosts.filter(p => p.status === 'published').length,
    draftPosts: hybridCMS.blogPosts.filter(p => p.status === 'draft').length,
    totalProjects: hybridCMS.portfolioItems.length,
    activeProjects: hybridCMS.portfolioItems.length // Adjust based on your status field
  };

  const handleLogin = async () => {
    if (hybridCMS.dataSource === 'supabase' && hybridCMS.signIn) {
      // Supabase authentication
      try {
        await hybridCMS.signIn(loginPassword, 'password');
        setLoginPassword('');
        toast.success('Вход выполнен успешно!');
      } catch (error) {
        toast.error('Ошибка авторизации');
      }
    } else {
      // localStorage authentication
      const correctPassword = 'admin123';
      if (loginPassword === correctPassword) {
        hybridCMS.setAdmin(true);
        setLoginPassword('');
        toast.success('Вход выполнен успешно!');
      } else {
        toast.error('Неверный пароль');
      }
    }
  };

  const handleLogout = async () => {
    if (hybridCMS.dataSource === 'supabase' && hybridCMS.signOut) {
      await hybridCMS.signOut();
    }
    hybridCMS.setAdmin(false);
    setShowDashboard(false);
    toast.success('Вы вышли из системы');
  };

  const getDataSourceBadge = () => {
    switch (hybridCMS.dataSource) {
      case 'supabase':
        return <Badge className="bg-green-100 text-green-700">Supabase</Badge>;
      case 'localStorage':
        return <Badge className="bg-yellow-100 text-yellow-700">localStorage</Badge>;
      default:
        return <Badge variant="secondary">Не определен</Badge>;
    }
  };

  if (!hybridCMS.isAdmin) {
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
              <p className="text-muted-foreground mb-4">
                Введите пароль для доступа к панели управления контентом
              </p>
              
              <div className="mb-4">
                <div className="text-sm text-muted-foreground mb-2">
                  Источник данных: {getDataSourceBadge()}
                </div>
                {hybridCMS.dataSource === 'supabase' && (
                  <div className="text-xs text-green-600">
                    Подключен к облачной базе данных
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <Input
                  type={hybridCMS.dataSource === 'supabase' ? 'email' : 'password'}
                  placeholder={hybridCMS.dataSource === 'supabase' ? 'Email' : 'Введите пароль'}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                />
                <Button 
                  onClick={handleLogin}
                  className="w-full gradient-bg text-white"
                  disabled={!loginPassword || hybridCMS.isLoading}
                >
                  <User className="mr-2 size-4" />
                  {hybridCMS.isLoading ? 'Подключение...' : 'Войти'}
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="cms" className="py-20 lg:py-32">
        <div className="container px-4 sm:px-6 lg:px-8">
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
                    Управление контентом сайта • {getDataSourceBadge()}
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

            {/* Enhanced Stats Cards with Data Source Info */}
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
                  <Database className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium">Данные</span>
                </div>
                <div className="text-xl font-bold">
                  {hybridCMS.dataSource === 'supabase' ? 'Облако' : 'Локально'}
                </div>
                <p className="text-xs text-muted-foreground">
                  {hybridCMS.isSupabaseAvailable ? 'Supabase подключен' : 'localStorage режим'}
                </p>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium">Пользователь</span>
                </div>
                <div className="text-lg font-bold">
                  {hybridCMS.user?.email || 'Админ'}
                </div>
                <p className="text-xs text-muted-foreground">
                  {hybridCMS.isAuthenticated ? 'Авторизован' : 'Локальный доступ'}
                </p>
              </Card>
            </div>

            {/* Quick Actions with Data Management */}
            <Card className="p-6">
              <h3 className="mb-4">Быстрые действия</h3>
              <div className="grid md:grid-cols-4 gap-4">
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

                <Button 
                  onClick={() => setShowDashboard(true)}
                  variant="outline" 
                  className="h-auto p-4 flex flex-col items-start"
                >
                  <Database className="size-5 mb-2 text-blue-600" />
                  <span className="font-medium">Управление данными</span>
                  <span className="text-xs text-muted-foreground">
                    Экспорт и миграция
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
                <div>
                  <h1>CMS Dashboard</h1>
                  <div className="text-sm text-muted-foreground">
                    {getDataSourceBadge()} • {hybridCMS.isSupabaseAvailable ? 'Облачный' : 'Локальный'} режим
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => setShowDashboard(false)}>
                  <X className="size-4" />
                </Button>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto p-4">
              <Tabs defaultValue="analytics">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="analytics">
                    📊 Аналитика
                  </TabsTrigger>
                  <TabsTrigger value="blog">
                    📝 Блог ({hybridCMS.blogPosts.length})
                  </TabsTrigger>
                  <TabsTrigger value="portfolio">
                    💼 Портфолио ({hybridCMS.portfolioItems.length})
                  </TabsTrigger>
                  <TabsTrigger value="data">
                    🔄 Данные
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="analytics" className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2>Аналитика и статистика</h2>
                    <div className="text-sm text-muted-foreground">
                      Обновлено: {new Date().toLocaleDateString('ru-RU')} • {getDataSourceBadge()}
                    </div>
                  </div>
                  
                  {hybridCMS.isLoading ? (
                    <div className="text-center p-8">Загрузка аналитики...</div>
                  ) : (
                    <div className="space-y-6">
                      {/* Overview Cards */}
                      <div className="grid md:grid-cols-3 gap-4">
                        <Card className="p-4">
                          <h3 className="text-sm font-medium mb-2">Общая статистика</h3>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Всего постов:</span>
                              <span className="font-bold">{hybridCMS.blogPosts.length}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Всего проектов:</span>
                              <span className="font-bold">{hybridCMS.portfolioItems.length}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Источник данных:</span>
                              <span>{hybridCMS.dataSource}</span>
                            </div>
                          </div>
                        </Card>
                        
                        <Card className="p-4">
                          <h3 className="text-sm font-medium mb-2">Статус системы</h3>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Supabase:</span>
                              <span className={hybridCMS.isSupabaseAvailable ? 'text-green-600' : 'text-red-600'}>
                                {hybridCMS.isSupabaseAvailable ? '✅ Подключен' : '❌ Отключен'}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Авторизация:</span>
                              <span className="text-green-600">✅ Активна</span>
                            </div>
                          </div>
                        </Card>

                        <Card className="p-4">
                          <h3 className="text-sm font-medium mb-2">Возможности</h3>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Создание:</span>
                              <span className="text-green-600">✅ Доступно</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Редактирование:</span>
                              <span className="text-green-600">✅ Доступно</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Синхронизация:</span>
                              <span className={hybridCMS.dataSource === 'supabase' ? 'text-green-600' : 'text-yellow-600'}>
                                {hybridCMS.dataSource === 'supabase' ? '✅ Включена' : '⚠️ Локально'}
                              </span>
                            </div>
                          </div>
                        </Card>
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="blog" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2>Управление статьями</h2>
                    <div className="text-sm text-muted-foreground">
                      {getDataSourceBadge()}
                    </div>
                  </div>

                  <div className="grid gap-4">
                    {hybridCMS.blogPosts.map((post) => (
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
                              <Button variant="outline" size="sm">
                                <Edit3 className="size-4" />
                              </Button>
                              <Button variant="outline" size="sm">
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
                    <div className="text-sm text-muted-foreground">
                      {getDataSourceBadge()}
                    </div>
                  </div>

                  <div className="grid gap-4">
                    {hybridCMS.portfolioItems.map((item) => (
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
                                {item.technologies.slice(0, 3).map((tech) => (
                                  <Badge key={tech} variant="outline">
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Edit3 className="size-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Trash2 className="size-4 text-destructive" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="data" className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2>Управление данными</h2>
                    <div className="text-sm text-muted-foreground">
                      {getDataSourceBadge()}
                    </div>
                  </div>
                  
                  <DataMigration />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      )}
    </>
  );
};