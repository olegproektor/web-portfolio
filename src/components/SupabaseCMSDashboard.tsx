import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Alert, AlertDescription } from './ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Database, 
  LogOut,
  Loader2,
  AlertCircle,
  CheckCircle 
} from 'lucide-react';
import { useHybridCMS } from '../contexts/HybridCMSContext';
import { BlogPost, PortfolioItem } from '../contexts/CMSContext';
import MarkdownEditor from './MarkdownEditor';

interface SupabaseCMSDashboardProps {
  onClose: () => void;
}

export const SupabaseCMSDashboard: React.FC<SupabaseCMSDashboardProps> = ({ onClose }) => {
  const {
    blogPosts,
    portfolioItems,
    isLoading,
    user,
    error,
    dataSource,
    isSupabaseAvailable,
    createBlogPost,
    updateBlogPost,
    deleteBlogPost,
    createPortfolioItem,
    updatePortfolioItem,
    deletePortfolioItem,
    signOut,
    refetch
  } = useHybridCMS();

  const [editingBlogPost, setEditingBlogPost] = useState<BlogPost | null>(null);
  const [editingPortfolioItem, setEditingPortfolioItem] = useState<PortfolioItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [activeTab, setActiveTab] = useState('blog');
  const [operationStatus, setOperationStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  // Clear operation status after 5 seconds
  useEffect(() => {
    if (operationStatus) {
      const timer = setTimeout(() => setOperationStatus(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [operationStatus]);

  const showStatus = (type: 'success' | 'error', message: string) => {
    setOperationStatus({ type, message });
  };

  const handleSignOut = async () => {
    try {
      if (signOut) {
        await signOut();
      }
      onClose();
    } catch (err) {
      showStatus('error', 'Ошибка при выходе');
    }
  };

  const handleCreateBlogPost = async (postData: Omit<BlogPost, 'id' | 'updatedAt'>) => {
    if (!createBlogPost) {
      showStatus('error', 'Создание недоступно в режиме localStorage');
      return;
    }
    
    try {
      setIsCreating(true);
      await createBlogPost(postData);
      setEditingBlogPost(null);
      showStatus('success', 'Статья создана успешно');
    } catch (err) {
      showStatus('error', 'Ошибка при создании статьи');
    } finally {
      setIsCreating(false);
    }
  };

  const handleUpdateBlogPost = async (id: string, updates: Partial<BlogPost>) => {
    if (!updateBlogPost) {
      showStatus('error', 'Обновление недоступно в режиме localStorage');
      return;
    }
    
    try {
      setIsCreating(true);
      await updateBlogPost(id, updates);
      setEditingBlogPost(null);
      showStatus('success', 'Статья обновлена успешно');
    } catch (err) {
      showStatus('error', 'Ошибка при обновлении статьи');
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteBlogPost = async (id: string) => {
    if (!deleteBlogPost) {
      showStatus('error', 'Удаление недоступно в режиме localStorage');
      return;
    }
    
    if (!confirm('Вы уверены, что хотите удалить эту статью?')) return;
    
    try {
      await deleteBlogPost(id);
      showStatus('success', 'Статья удалена успешно');
    } catch (err) {
      showStatus('error', 'Ошибка при удалении статьи');
    }
  };

  const handleCreatePortfolioItem = async (itemData: Omit<PortfolioItem, 'id'>) => {
    if (!createPortfolioItem) {
      showStatus('error', 'Создание недоступно в режиме localStorage');
      return;
    }
    
    try {
      setIsCreating(true);
      await createPortfolioItem(itemData);
      setEditingPortfolioItem(null);
      showStatus('success', 'Проект создан успешно');
    } catch (err) {
      showStatus('error', 'Ошибка при создании проекта');
    } finally {
      setIsCreating(false);
    }
  };

  const handleUpdatePortfolioItem = async (id: string, updates: Partial<PortfolioItem>) => {
    if (!updatePortfolioItem) {
      showStatus('error', 'Обновление недоступно в режиме localStorage');
      return;
    }
    
    try {
      setIsCreating(true);
      await updatePortfolioItem(id, updates);
      setEditingPortfolioItem(null);
      showStatus('success', 'Проект обновлен успешно');
    } catch (err) {
      showStatus('error', 'Ошибка при обновлении проекта');
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeletePortfolioItem = async (id: string) => {
    if (!deletePortfolioItem) {
      showStatus('error', 'Удаление недоступно в режиме localStorage');
      return;
    }
    
    if (!confirm('Вы уверены, что хотите удалить этот проект?')) return;
    
    try {
      await deletePortfolioItem(id);
      showStatus('success', 'Проект удален успешно');
    } catch (err) {
      showStatus('error', 'Ошибка при удалении проекта');
    }
  };

  const getTitle = () => {
    switch (dataSource) {
      case 'supabase':
        return 'Supabase CMS Panel'
      case 'localStorage':
        return 'CMS Panel (localStorage)'
      default:
        return 'CMS Panel'
    }
  };

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="border-b p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Database className="size-5 text-teal-500" />
              <h1>{getTitle()}</h1>
              {user && dataSource === 'supabase' && (
                <Badge variant="outline" className="ml-2">
                  {user.email}
                </Badge>
              )}
              {dataSource === 'localStorage' && (
                <Badge variant="secondary" className="ml-2">
                  Локальный режим
                </Badge>
              )}
            </div>
            <div className="flex gap-2">
              {refetch && (
                <Button variant="outline" size="sm" onClick={refetch} disabled={isLoading}>
                  {isLoading ? <Loader2 className="size-4 animate-spin" /> : 'Обновить'}
                </Button>
              )}
              {dataSource === 'supabase' && signOut && (
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  <LogOut className="size-4 mr-2" />
                  Выйти
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={onClose}>
                <X className="size-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Data Source Info */}
        <div className="p-4 bg-muted/50">
          <div className="flex items-center gap-2 text-sm">
            <Database className="size-4" />
            <span>
              Источник данных: {dataSource === 'supabase' ? 'Supabase' : 'localStorage'}
              {!isSupabaseAvailable && ' (Supabase недоступен)'}
            </span>
          </div>
        </div>

        {/* Status Messages */}
        {operationStatus && (
          <div className="p-4">
            <Alert variant={operationStatus.type === 'error' ? 'destructive' : 'default'}>
              {operationStatus.type === 'success' ? (
                <CheckCircle className="size-4" />
              ) : (
                <AlertCircle className="size-4" />
              )}
              <AlertDescription>{operationStatus.message}</AlertDescription>
            </Alert>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="p-4">
            <Alert variant="destructive">
              <AlertCircle className="size-4" />
              <AlertDescription>Ошибка подключения: {error}</AlertDescription>
            </Alert>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="blog">
                Статьи блога ({blogPosts.length})
              </TabsTrigger>
              <TabsTrigger value="portfolio">
                Портфолио ({portfolioItems.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="blog" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2>Управление статьями</h2>
                {dataSource === 'supabase' ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button onClick={() => setEditingBlogPost({} as BlogPost)}>
                        <Plus className="size-4 mr-2" />
                        Новая статья
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
                      <DialogHeader>
                        <DialogTitle>
                          {editingBlogPost?.id ? 'Редактировать статью' : 'Создать статью'}
                        </DialogTitle>
                      </DialogHeader>
                      <BlogPostForm
                        initialData={editingBlogPost || undefined}
                        onSave={editingBlogPost?.id ? 
                          (data) => handleUpdateBlogPost(editingBlogPost.id, data) :
                          handleCreateBlogPost
                        }
                        onCancel={() => setEditingBlogPost(null)}
                        isLoading={isCreating}
                      />
                    </DialogContent>
                  </Dialog>
                ) : (
                  <Badge variant="secondary">
                    Редактирование доступно только в Supabase режиме
                  </Badge>
                )}
              </div>

              <div className="grid gap-4">
                {blogPosts.map((post) => (
                  <Card key={post.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{post.title}</CardTitle>
                          <CardDescription>
                            {post.excerpt}
                          </CardDescription>
                          <div className="flex gap-2 mt-2">
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
                        {dataSource === 'supabase' && (
                          <div className="flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => setEditingBlogPost(post)}
                                >
                                  <Edit className="size-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
                                <DialogHeader>
                                  <DialogTitle>Редактировать статью</DialogTitle>
                                </DialogHeader>
                                <BlogPostForm
                                  initialData={post}
                                  onSave={(data) => handleUpdateBlogPost(post.id, data)}
                                  onCancel={() => setEditingBlogPost(null)}
                                  isLoading={isCreating}
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
                        )}
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="portfolio" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2>Управление портфолио</h2>
                {dataSource === 'supabase' ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button onClick={() => setEditingPortfolioItem({} as PortfolioItem)}>
                        <Plus className="size-4 mr-2" />
                        Новый проект
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>
                          {editingPortfolioItem?.id ? 'Редактировать проект' : 'Создать проект'}
                        </DialogTitle>
                      </DialogHeader>
                      <PortfolioItemForm
                        initialData={editingPortfolioItem || undefined}
                        onSave={editingPortfolioItem?.id ? 
                          (data) => handleUpdatePortfolioItem(editingPortfolioItem.id, data) :
                          handleCreatePortfolioItem
                        }
                        onCancel={() => setEditingPortfolioItem(null)}
                        isLoading={isCreating}
                      />
                    </DialogContent>
                  </Dialog>
                ) : (
                  <Badge variant="secondary">
                    Редактирование доступно только в Supabase режиме
                  </Badge>
                )}
              </div>

              <div className="grid gap-4">
                {portfolioItems.map((item) => (
                  <Card key={item.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{item.title}</CardTitle>
                          <CardDescription>{item.description}</CardDescription>
                          <div className="flex gap-2 mt-2">
                            <Badge>{item.category}</Badge>
                            <Badge variant="outline">
                              {item.accessType === 'public' ? 'Публичный' : 'Приватный'}
                            </Badge>
                          </div>
                        </div>
                        {dataSource === 'supabase' && (
                          <div className="flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => setEditingPortfolioItem(item)}
                                >
                                  <Edit className="size-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Редактировать проект</DialogTitle>
                                </DialogHeader>
                                <PortfolioItemForm
                                  initialData={item}
                                  onSave={(data) => handleUpdatePortfolioItem(item.id, data)}
                                  onCancel={() => setEditingPortfolioItem(null)}
                                  isLoading={isCreating}
                                />
                              </DialogContent>
                            </Dialog>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeletePortfolioItem(item.id)}
                            >
                              <Trash2 className="size-4 text-destructive" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

// Blog Post Form Component
const BlogPostForm: React.FC<{
  initialData?: BlogPost;
  onSave: (data: any) => void;
  onCancel: () => void;
  isLoading: boolean;
}> = ({ initialData, onSave, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    excerpt: initialData?.excerpt || '',
    content: initialData?.content || '',
    author: initialData?.author || 'Олег Кононенко',
    publishedAt: initialData?.publishedAt || new Date().toISOString().split('T')[0],
    status: initialData?.status || 'draft' as 'draft' | 'published',
    tags: initialData?.tags?.join(', ') || '',
    coverImage: initialData?.coverImage || '',
    readTime: initialData?.readTime || 5,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      updatedAt: new Date().toISOString(),
    });
  };

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
        <MarkdownEditor
          value={formData.content}
          onChange={(value) => setFormData({ ...formData, content: value })}
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

      <Separator />

      <div className="flex gap-2">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="size-4 mr-2 animate-spin" />
              Сохранение...
            </>
          ) : (
            <>
              <Save className="size-4 mr-2" />
              Сохранить
            </>
          )}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Отмена
        </Button>
      </div>
    </form>
  );
};

// Portfolio Item Form Component
const PortfolioItemForm: React.FC<{
  initialData?: PortfolioItem;
  onSave: (data: any) => void;
  onCancel: () => void;
  isLoading: boolean;
}> = ({ initialData, onSave, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    image: initialData?.image || '',
    technologies: initialData?.technologies?.join(', ') || '',
    github: initialData?.github || '',
    demo: initialData?.demo || '',
    category: initialData?.category || '',
    accessType: initialData?.accessType || 'public' as 'public' | 'private',
    status: initialData?.status || 'active' as 'active' | 'archived',
    buttonType: initialData?.buttonType || 'none' as 'github' | 'link' | 'none',
    buttonLabel: initialData?.buttonLabel || '',
    buttonUrl: initialData?.buttonUrl || '',
    completedAt: initialData?.completedAt || new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      technologies: formData.technologies.split(',').map(tech => tech.trim()).filter(Boolean),
    });
  };

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

      <Separator />

      <div className="flex gap-2">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="size-4 mr-2 animate-spin" />
              Сохранение...
            </>
          ) : (
            <>
              <Save className="size-4 mr-2" />
              Сохранить
            </>
          )}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Отмена
        </Button>
      </div>
    </form>
  );
};