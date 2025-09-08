'use client'

import React, { useState, useEffect } from 'react'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { useCMS, BlogPost } from '../contexts/CMSContext'
import { motion, AnimatePresence } from 'motion/react'
import { Search, Calendar, Clock, User, ArrowLeft, Home, X } from 'lucide-react'
import BlogSEO from './BlogSEO'
import { trackBlogPostView, trackReadingTime } from '../hooks/useGoogleAnalytics'

interface BlogPageProps {
  onBackToMain?: () => void
  selectedBlogPostId?: string | null
  onBlogPostSelect?: (postId: string | null) => void
}

const BlogPage: React.FC<BlogPageProps> = ({ 
  onBackToMain, 
  selectedBlogPostId, 
  onBlogPostSelect 
}) => {
  const { state } = useCMS()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [expandedPost, setExpandedPost] = useState<BlogPost | null>(null)
  const [readingStartTime, setReadingStartTime] = useState<number | null>(null)

  const publishedPosts = state.blogPosts.filter(post => post.status === 'published')

  // Filter posts by search query and selected tag
  const filteredPosts = publishedPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesTag = !selectedTag || post.tags.includes(selectedTag)
    
    return matchesSearch && matchesTag
  })

  // Get all unique tags
  const allTags = Array.from(new Set(publishedPosts.flatMap(post => post.tags)))

  // Автоматически открыть выбранный пост
  useEffect(() => {
    if (selectedBlogPostId) {
      const post = state.blogPosts.find(p => p.id === selectedBlogPostId)
      if (post) {
        setExpandedPost(post)
      }
    }
  }, [selectedBlogPostId, state.blogPosts])

  // Закрыть модальное окно
  const closeExpandedPost = () => {
    // Track reading time if available
    if (readingStartTime && expandedPost) {
      const readingTime = Math.floor((Date.now() - readingStartTime) / 1000)
      trackReadingTime(expandedPost.title, readingTime)
    }
    
    setExpandedPost(null)
    setReadingStartTime(null)
    if (onBlogPostSelect) {
      onBlogPostSelect(null)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <BlogSEO isHome />
      
      {/* Navigation */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {onBackToMain && (
                <Button variant="ghost" onClick={onBackToMain}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Назад к портфолио
                </Button>
              )}
              <h1 className="text-2xl font-bold">Блог</h1>
            </div>
            <Button variant="ghost" onClick={onBackToMain}>
              <Home className="w-4 h-4 mr-2" />
              Главная
            </Button>
          </div>
        </div>
      </div>

      <div className="container py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Мой блог</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Делюсь опытом, инсайтами и размышлениями о технологиях, дизайне и бизнес-процессах
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Поиск статей..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Tags Filter */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedTag === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTag(null)}
            >
              Все темы
            </Button>
            {allTags.map(tag => (
              <Button
                key={tag}
                variant={selectedTag === tag ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className="overflow-hidden hover:shadow-medium transition-shadow duration-300 h-full flex flex-col group cursor-pointer"
                onClick={() => {
                  // Track blog post view
                  trackBlogPostView(post.title, post.id)
                  setExpandedPost(post)
                  setReadingStartTime(Date.now())
                }}
              >
                <div className="relative overflow-hidden">
                  {post.coverImage && (
                    <ImageWithFallback
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                </div>

                <div className="p-6 flex flex-col h-full">
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-1 mb-3">
                      {post.tags.slice(0, 3).map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <h3 className="font-semibold mb-3 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Мета-информация - зафиксирована внизу */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime} мин</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Статьи не найдены</p>
          </div>
        )}

        {/* Модальное окно для развернутого поста */}
        <AnimatePresence>
          {expandedPost && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={closeExpandedPost}
            >
              {/* Размытый фон */}
              <div className="absolute inset-0 bg-black/50 backdrop-blur-md" />
              
              {/* Контент поста */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative bg-background rounded-lg shadow-2xl max-w-4xl max-h-[90vh] overflow-y-auto w-full mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Кнопка закрытия */}
                <button
                  onClick={closeExpandedPost}
                  className="absolute top-4 right-4 z-10 p-2 bg-background/80 rounded-full hover:bg-accent transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Изображение поста */}
                <div className="relative h-64 lg:h-80 overflow-hidden rounded-t-lg">
                  {expandedPost.coverImage && (
                    <>
                      <ImageWithFallback
                        src={expandedPost.coverImage}
                        alt={expandedPost.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </>
                  )}
                  
                  {/* Заголовок на изображении */}
                  <div className="absolute bottom-4 left-4 right-16">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {expandedPost.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="bg-white/20 text-white border-white/30">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                      {expandedPost.title}
                    </h1>
                    <div className="flex items-center gap-4 text-white/80 text-sm">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{expandedPost.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(expandedPost.publishedAt)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{expandedPost.readTime} мин</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Контент поста с прокруткой */}
                <div className="p-6 lg:p-8">
                  <div className="mb-6">
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {expandedPost.excerpt}
                    </p>
                  </div>

                  {/* Контент с прокруткой */}
                  <div className="max-h-96 overflow-y-auto pr-2">
                    <div className="prose prose-lg max-w-none">
                      <div 
                        className="text-muted-foreground leading-relaxed"
                        dangerouslySetInnerHTML={{ 
                          __html: expandedPost.content.replace(/\n/g, '<br>').replace(/#{1,6}\s/g, '<h3>').replace(/<h3>/g, '<h3 class="text-xl font-semibold mt-8 mb-4 text-foreground">') 
                        }} 
                      />
                    </div>
                  </div>

                  {/* Кнопка закрытия внизу */}
                  <div className="flex justify-center mt-8 pt-6 border-t">
                    <Button
                      variant="outline"
                      onClick={closeExpandedPost}
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
    </div>
  )
}

// Blog Post Detail Component
const BlogPost: React.FC<{ 
  post: any 
  onBack: () => void 
}> = ({ post, onBack }) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container py-12 max-w-4xl">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="mb-8"
        >
          ← Назад к блогу
        </Button>

        <article>
          {post.coverImage && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <ImageWithFallback
                src={post.coverImage}
                alt={post.title}
                className="w-full h-64 lg:h-96 object-cover"
              />
            </div>
          )}

          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag: string, index: number) => (
                <Badge key={index} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold mb-4">{post.title}</h1>

            <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.publishedAt).toLocaleDateString('ru-RU')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime} мин чтения</span>
              </div>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <div 
              dangerouslySetInnerHTML={{ 
                __html: post.content.replace(/\n/g, '<br>').replace(/#{1,6}\s/g, '<h3>').replace(/<h3>/g, '<h3 class="text-xl font-semibold mt-8 mb-4">') 
              }} 
            />
          </div>
        </article>
      </div>
    </div>
  )
}

export default BlogPage