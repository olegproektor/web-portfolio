'use client'

import { useState, useEffect } from 'react'

interface AnalyticsData {
  pageViews: number
  uniqueVisitors: number
  averageSessionDuration: number
  bounceRate: number
  totalEvents: number
  topPages: Array<{
    path: string
    title: string
    views: number
    uniqueViews: number
  }>
  monthlyData: Array<{
    month: string
    views: number
    posts: number
    visitors: number
  }>
  realTimeData: {
    activeUsers: number
    pageViews: number
    topPages: string[]
  }
}

interface GoogleAnalyticsError {
  message: string
  code?: string
}

// Google Analytics Reporting API hook
export const useGoogleAnalytics = (gaId?: string) => {
  // Get GA ID from environment or passed parameter
  const analyticsId = gaId || (typeof import.meta !== 'undefined' ? import.meta.env?.VITE_GA_ID : undefined)
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<GoogleAnalyticsError | null>(null)

  // Check if GA is available and configured
  const isGAAvailable = () => {
    return (
      typeof window !== 'undefined' &&
      (window as any).gtag &&
      analyticsId &&
      analyticsId !== 'G-DEVELOPMENT' &&
      analyticsId !== 'G-XXXXXXXXXX'
    )
  }

  // Get analytics data from Google Analytics Reporting API
  const fetchAnalyticsData = async (): Promise<AnalyticsData> => {
    if (!isGAAvailable()) {
      // Return mock data for development
      return getMockAnalyticsData()
    }

    try {
      // In production, this would make calls to Google Analytics Reporting API v4
      // For now, return enhanced mock data that simulates real GA responses
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Real implementation would look like:
      /*
      const response = await gapi.client.analyticsreporting.reports.batchGet({
        reportRequests: [
          {
            viewId: 'YOUR_VIEW_ID',
            dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
            metrics: [
              { expression: 'ga:pageviews' },
              { expression: 'ga:users' },
              { expression: 'ga:avgSessionDuration' },
              { expression: 'ga:bounceRate' }
            ],
            dimensions: [{ name: 'ga:pagePath' }, { name: 'ga:pageTitle' }]
          }
        ]
      })
      */

      return getEnhancedMockData()
    } catch (err) {
      console.error('Error fetching analytics data:', err)
      throw new GoogleAnalyticsError({ 
        message: 'Failed to fetch analytics data',
        code: 'FETCH_ERROR' 
      })
    }
  }

  // Enhanced mock data that simulates real GA responses
  const getEnhancedMockData = (): AnalyticsData => {
    const now = new Date()
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    
    return {
      pageViews: Math.floor(Math.random() * 10000) + 5000,
      uniqueVisitors: Math.floor(Math.random() * 3000) + 1500,
      averageSessionDuration: Math.floor(Math.random() * 300) + 120, // seconds
      bounceRate: Math.random() * 40 + 30, // percentage
      totalEvents: Math.floor(Math.random() * 2000) + 500,
      topPages: [
        {
          path: '/',
          title: 'Главная страница',
          views: Math.floor(Math.random() * 2000) + 1000,
          uniqueViews: Math.floor(Math.random() * 1500) + 800
        },
        {
          path: '/blog',
          title: 'Блог',
          views: Math.floor(Math.random() * 1000) + 500,
          uniqueViews: Math.floor(Math.random() * 800) + 400
        },
        {
          path: '/projects',
          title: 'Портфолио',
          views: Math.floor(Math.random() * 800) + 300,
          uniqueViews: Math.floor(Math.random() * 600) + 250
        }
      ],
      monthlyData: Array.from({ length: 6 }, (_, i) => {
        const date = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1)
        return {
          month: date.toLocaleDateString('ru-RU', { month: 'short' }),
          views: Math.floor(Math.random() * 3000) + 1000,
          posts: Math.floor(Math.random() * 5) + 1,
          visitors: Math.floor(Math.random() * 1000) + 400
        }
      }),
      realTimeData: {
        activeUsers: Math.floor(Math.random() * 50) + 10,
        pageViews: Math.floor(Math.random() * 100) + 20,
        topPages: ['/', '/blog', '/projects']
      }
    }
  }

  // Basic mock data for development
  const getMockAnalyticsData = (): AnalyticsData => {
    return {
      pageViews: 15234,
      uniqueVisitors: 8456,
      averageSessionDuration: 180,
      bounceRate: 35.2,
      totalEvents: 1243,
      topPages: [
        { path: '/', title: 'Главная страница', views: 8500, uniqueViews: 5200 },
        { path: '/blog', title: 'Блог', views: 3200, uniqueViews: 2100 },
        { path: '/projects', title: 'Портфолио', views: 2800, uniqueViews: 1800 }
      ],
      monthlyData: [
        { month: 'Янв', views: 1200, posts: 2, visitors: 450 },
        { month: 'Фев', views: 1800, posts: 3, visitors: 680 },
        { month: 'Мар', views: 2400, posts: 4, visitors: 890 },
        { month: 'Апр', views: 2100, posts: 2, visitors: 750 },
        { month: 'Май', views: 2800, posts: 5, visitors: 1200 },
        { month: 'Июн', views: 3200, posts: 3, visitors: 1350 }
      ],
      realTimeData: {
        activeUsers: 23,
        pageViews: 45,
        topPages: ['/', '/blog']
      }
    }
  }

  // Fetch data on mount and set up refresh interval
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        setError(null)
        const analyticsData = await fetchAnalyticsData()
        setData(analyticsData)
      } catch (err) {
        setError(err as GoogleAnalyticsError)
      } finally {
        setLoading(false)
      }
    }

    loadData()

    // Refresh data every 5 minutes in production
    const refreshInterval = isGAAvailable() ? 5 * 60 * 1000 : 30 * 1000 // 5 min or 30 sec for dev
    const interval = setInterval(loadData, refreshInterval)

    return () => clearInterval(interval)
  }, [analyticsId])

  // Manual refresh function
  const refreshData = async () => {
    try {
      setLoading(true)
      const analyticsData = await fetchAnalyticsData()
      setData(analyticsData)
    } catch (err) {
      setError(err as GoogleAnalyticsError)
    } finally {
      setLoading(false)
    }
  }

  return {
    data,
    loading,
    error,
    refreshData,
    isGAAvailable: isGAAvailable()
  }
}

// Event tracking functions
export const trackAnalyticsEvent = (
  eventName: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, {
      event_category: category,
      event_label: label,
      value: value
    })
  }
}

// Track blog post views
export const trackBlogPostView = (postTitle: string, postId: string) => {
  trackAnalyticsEvent('blog_post_view', 'content', postTitle)
  
  // Custom event for blog analytics
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'page_view', {
      page_title: postTitle,
      page_location: window.location.href,
      content_group1: 'blog',
      custom_parameter_1: postId
    })
  }
}

// Track project views
export const trackProjectView = (projectTitle: string, projectId: string) => {
  trackAnalyticsEvent('project_view', 'portfolio', projectTitle)
  
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'page_view', {
      page_title: projectTitle,
      page_location: window.location.href,
      content_group1: 'portfolio',
      custom_parameter_1: projectId
    })
  }
}

// Track time spent reading
export const trackReadingTime = (contentTitle: string, timeInSeconds: number) => {
  if (timeInSeconds > 30) { // Only track if user spent more than 30 seconds
    trackAnalyticsEvent('content_engagement', 'reading_time', contentTitle, timeInSeconds)
  }
}

// Track CMS actions (for admin analytics)
export const trackCMSAction = (action: string, contentType: string) => {
  trackAnalyticsEvent('cms_action', 'admin', `${action}_${contentType}`)
}