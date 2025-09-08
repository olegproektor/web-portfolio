'use client'

import React from 'react'
import { useEffect } from 'react'

interface GoogleAnalyticsProps {
  gaId: string
}

// Google Analytics component
const GoogleAnalytics: React.FC<GoogleAnalyticsProps> = ({ gaId }) => {
  useEffect(() => {
    // Only load if we have a valid GA ID and we're in the browser
    if (!gaId || gaId === 'G-XXXXXXXXXX' || gaId === 'G-DEVELOPMENT' || typeof window === 'undefined') {
      // Only log in development mode
      if (gaId === 'G-DEVELOPMENT') {
        console.log('Google Analytics: Running in development mode - analytics disabled')
      }
      return
    }

    // Load Google Analytics
    const script1 = document.createElement('script')
    script1.async = true
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
    document.head.appendChild(script1)

    const script2 = document.createElement('script')
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gaId}', {
        page_title: document.title,
        page_location: window.location.href,
        cookie_flags: 'secure;samesite=none'
      });
    `
    document.head.appendChild(script2)

    // Make gtag available globally for event tracking
    if (typeof window !== 'undefined') {
      (window as any).gtag = (window as any).gtag || function() {
        ((window as any).dataLayer = (window as any).dataLayer || []).push(arguments)
      }
    }

    console.log('Google Analytics loaded successfully with ID:', gaId)

    return () => {
      // Cleanup scripts on unmount
      try {
        if (script1 && document.head.contains(script1)) {
          document.head.removeChild(script1)
        }
        if (script2 && document.head.contains(script2)) {
          document.head.removeChild(script2)
        }
      } catch (error) {
        console.warn('Error cleaning up Google Analytics scripts:', error)
      }
    }
  }, [gaId])

  return null
}

// Analytics utility functions
export const trackEvent = (eventName: string, parameters?: any) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, {
      event_category: 'engagement',
      event_label: parameters?.label || '',
      value: parameters?.value || 1,
      ...parameters
    })
  }
}

export const trackPageView = (pagePath: string, pageTitle?: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    // Safe access to environment variables
    const getGAId = () => {
      try {
        return (import.meta?.env?.VITE_GA_ID) || 'GA_MEASUREMENT_ID'
      } catch (error) {
        return 'GA_MEASUREMENT_ID'
      }
    }
    
    (window as any).gtag('config', getGAId(), {
      page_path: pagePath,
      page_title: pageTitle || document.title
    })
  }
}

export const trackOutboundLink = (url: string, linkText?: string) => {
  trackEvent('click', {
    event_category: 'outbound',
    event_label: linkText || url,
    transport_type: 'beacon'
  })
}

export const trackDownload = (fileName: string, fileType?: string) => {
  trackEvent('file_download', {
    event_category: 'downloads',
    event_label: fileName,
    file_extension: fileType || fileName.split('.').pop()
  })
}

export const trackFormSubmission = (formName: string, success: boolean = true) => {
  trackEvent('form_submit', {
    event_category: 'forms',
    event_label: formName,
    success: success
  })
}

export const trackProjectView = (projectTitle: string, projectCategory?: string) => {
  trackEvent('project_view', {
    event_category: 'portfolio',
    event_label: projectTitle,
    project_category: projectCategory
  })
}

export const trackBlogRead = (articleTitle: string, readTime?: number) => {
  trackEvent('blog_read', {
    event_category: 'content',
    event_label: articleTitle,
    read_time: readTime
  })
}

export const trackSearchQuery = (query: string, resultsCount?: number) => {
  trackEvent('search', {
    search_term: query,
    event_category: 'search',
    results_count: resultsCount
  })
}

export const trackScrollDepth = (percentage: number) => {
  trackEvent('scroll', {
    event_category: 'engagement',
    event_label: `${percentage}%`,
    value: percentage
  })
}

export const trackTimeOnPage = (timeInSeconds: number) => {
  trackEvent('timing_complete', {
    name: 'page_read_time',
    value: timeInSeconds
  })
}

export default GoogleAnalytics