'use client'

import React, { useEffect } from 'react'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useCMS } from '../contexts/CMSContext'
import { useGoogleAnalytics, trackBlogPostView } from '../hooks/useGoogleAnalytics'
import { motion } from 'motion/react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'
import { TrendingUp, Eye, Heart, MessageCircle, Share2, Calendar, RefreshCw, Users, Clock, MousePointer } from 'lucide-react'

const BlogAnalytics = () => {
  const { state } = useCMS()
  const { data: analyticsData, loading, error, refreshData, isGAAvailable } = useGoogleAnalytics()

  // Track analytics view
  useEffect(() => {
    if (isGAAvailable) {
      trackBlogPostView('Analytics Dashboard', 'analytics-dashboard')
    }
  }, [isGAAvailable])

  const tagStats = state.blogPosts.reduce((acc, post) => {
    post.tags.forEach(tag => {
      acc[tag] = (acc[tag] || 0) + 1
    })
    return acc
  }, {} as Record<string, number>)

  const pieData = Object.entries(tagStats).map(([tag, count]) => ({
    name: tag,
    value: count
  }))

  const colors = ['#14B8A6', '#2563EB', '#8B5CF6', '#F59E0B', '#EF4444']

  // Use real Google Analytics data when available
  const stats = analyticsData ? [
    {
      icon: <Eye className="w-5 h-5" />,
      label: 'Просмотры страниц',
      value: analyticsData.pageViews.toLocaleString(),
      change: '+12%',
      color: 'text-blue-600',
      description: 'За последние 30 дней'
    },
    {
      icon: <Users className="w-5 h-5" />,
      label: 'Уникальные посетители',
      value: analyticsData.uniqueVisitors.toLocaleString(),
      change: '+8%',
      color: 'text-green-600',
      description: 'Новые пользователи'
    },
    {
      icon: <Clock className="w-5 h-5" />,
      label: 'Среднее время сессии',
      value: `${Math.floor(analyticsData.averageSessionDuration / 60)}:${String(analyticsData.averageSessionDuration % 60).padStart(2, '0')}`,
      change: '+15%',
      color: 'text-purple-600',
      description: 'Минуты:секунды'
    },
    {
      icon: <MousePointer className="w-5 h-5" />,
      label: 'Показатель отказов',
      value: `${analyticsData.bounceRate.toFixed(1)}%`,
      change: '-5%',
      color: 'text-orange-600',
      description: 'Ниже - лучше'
    }
  ] : [
    {
      icon: <Eye className="w-5 h-5" />,
      label: 'Всего просмотров',
      value: '15.2K',
      change: '+12%',
      color: 'text-blue-600',
      description: 'Mock данные'
    },
    {
      icon: <Users className="w-5 h-5" />,
      label: 'Посетители',
      value: '8.4K',
      change: '+8%',
      color: 'text-green-600',
      description: 'Mock данные'
    },
    {
      icon: <Clock className="w-5 h-5" />,
      label: 'Время сессии',
      value: '3:20',
      change: '+15%',
      color: 'text-purple-600',
      description: 'Mock данные'
    },
    {
      icon: <MousePointer className="w-5 h-5" />,
      label: 'Показатель отказов',
      value: '35.2%',
      change: '-5%',
      color: 'text-orange-600',
      description: 'Mock данные'
    }
  ]

  // Get top posts from analytics data or use mock data
  const topPosts = analyticsData?.topPages 
    ? analyticsData.topPages
        .filter(page => page.path.includes('blog') || page.title.includes('блог'))
        .slice(0, 5)
        .map((page, index) => ({
          id: `page-${index}`,
          title: page.title,
          views: page.views,
          publishedAt: new Date().toISOString().split('T')[0] // Mock date
        }))
    : state.blogPosts
        .map(post => ({
          ...post,
          views: Math.floor(Math.random() * 1000) + 100 // Mock views
        }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 5)

  // Use real monthly data or mock data
  const monthlyViewsData = analyticsData?.monthlyData || [
    { month: 'Янв', views: 1200, posts: 2, visitors: 450 },
    { month: 'Фев', views: 1800, posts: 3, visitors: 680 },
    { month: 'Мар', views: 2400, posts: 4, visitors: 890 },
    { month: 'Апр', views: 2100, posts: 2, visitors: 750 },
    { month: 'Май', views: 2800, posts: 5, visitors: 1200 },
    { month: 'Июн', views: 3200, posts: 3, visitors: 1350 }
  ]

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center p-8">
          <RefreshCw className="w-8 h-8 animate-spin text-muted-foreground" />
          <span className="ml-2 text-muted-foreground">Загрузка аналитики...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Card className="p-6">
          <div className="text-center">
            <div className="text-destructive mb-2">⚠️ Ошибка загрузки аналитики</div>
            <p className="text-sm text-muted-foreground mb-4">{error.message}</p>
            <Button onClick={refreshData} variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Попробовать снова
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Status indicator */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${isGAAvailable ? 'bg-green-500' : 'bg-yellow-500'}`} />
          <span className="text-sm text-muted-foreground">
            {isGAAvailable ? 'Google Analytics подключен' : 'Демо-данные (GA не подключен)'}
          </span>
        </div>
        <Button onClick={refreshData} variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Обновить
        </Button>
      </div>

      {/* Real-time data */}
      {analyticsData?.realTimeData && (
        <Card className="p-4">
          <h3 className="mb-3 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Данные в реальном времени
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{analyticsData.realTimeData.activeUsers}</div>
              <div className="text-sm text-muted-foreground">Активных пользователей</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{analyticsData.realTimeData.pageViews}</div>
              <div className="text-sm text-muted-foreground">Просмотров за час</div>
            </div>
          </div>
        </Card>
      )}

      {/* Key Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className={`${stat.color}`}>
                  {stat.icon}
                </div>
                <Badge variant="secondary" className="text-xs">
                  {stat.change}
                </Badge>
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.description}</div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Views Chart */}
        <Card className="p-6">
          <h3 className="mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Статистика по месяцам
            {!isGAAvailable && <Badge variant="outline" className="text-xs">Demo</Badge>}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyViewsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-card border rounded-lg p-3 shadow-lg">
                        <p className="font-medium">{label}</p>
                        <p className="text-blue-600">
                          Просмотры: {payload[0]?.value?.toLocaleString()}
                        </p>
                        <p className="text-green-600">
                          Посетители: {payload[1]?.value?.toLocaleString()}
                        </p>
                        <p className="text-purple-600">
                          Статей: {payload[2]?.value}
                        </p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Bar dataKey="views" fill="#14B8A6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="visitors" fill="#2563EB" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Tags Distribution */}
        <Card className="p-6">
          <h3 className="mb-4">Популярные теги</h3>
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[300px] text-muted-foreground">
              Нет данных для отображения
            </div>
          )}
          <div className="flex flex-wrap gap-2 mt-4">
            {pieData.map((item, index) => (
              <div key={item.name} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: colors[index % colors.length] }}
                />
                <span className="text-sm">{item.name} ({item.value})</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Top Posts */}
      <Card className="p-6">
        <h3 className="mb-4 flex items-center justify-between">
          <span>Самые популярные статьи</span>
          {!isGAAvailable && <Badge variant="outline" className="text-xs">Demo</Badge>}
        </h3>
        <div className="space-y-3">
          {topPosts.length > 0 ? topPosts.map((post, index) => (
            <div key={post.id || index} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium mb-1">{post.title}</h4>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{post.publishedAt || 'Недавно'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    <span>{post.views?.toLocaleString() || 0} просмотров</span>
                  </div>
                </div>
              </div>
              <Badge variant={index < 3 ? "default" : "secondary"}>
                #{index + 1}
              </Badge>
            </div>
          )) : (
            <div className="text-center py-8 text-muted-foreground">
              <Eye className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>Нет данных о популярных статьях</p>
              <p className="text-sm">Данные появятся после подключения Google Analytics</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

export default BlogAnalytics