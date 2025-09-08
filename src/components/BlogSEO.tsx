'use client'

import React, { useEffect } from 'react'
import { useCMS } from '../contexts/CMSContext'

interface BlogSEOProps {
  post?: any
  isHome?: boolean
}

const BlogSEO: React.FC<BlogSEOProps> = ({ post, isHome = false }) => {
  const { state } = useCMS()

  useEffect(() => {
    // Update document title and meta tags
    if (isHome) {
      document.title = 'Блог Олега Кононенко - Product Manager полного цикла'
      updateMetaTag('description', 'Блог о продуктовом управлении, комплексных решениях и современных технологиях от опытного Product Manager.')
      updateMetaTag('og:title', 'Блог Олега Кононенко - Product Manager полного цикла')
      updateMetaTag('og:description', 'Блог о современной веб-разработке, React, TypeScript и frontend технологиях от опытного разработчика.')
    } else if (post) {
      document.title = `${post.title} | Блог Олега Кононенко`
      updateMetaTag('description', post.excerpt)
      updateMetaTag('og:title', post.title)
      updateMetaTag('og:description', post.excerpt)
      updateMetaTag('og:image', post.coverImage)
      updateMetaTag('article:published_time', post.publishedAt)
      updateMetaTag('article:author', post.author)
      updateMetaTag('article:tag', post.tags.join(', '))
    }

    // Generate JSON-LD structured data
    const structuredData = generateStructuredData(post, isHome)
    updateStructuredData(structuredData)

    return () => {
      // Cleanup on unmount
      document.title = 'Олег Кононенко - Product Manager полного цикла'
    }
  }, [post, isHome])

  const updateMetaTag = (name: string, content: string) => {
    if (!content) return

    let meta = document.querySelector(`meta[name="${name}"]`) || 
               document.querySelector(`meta[property="${name}"]`)
    
    if (!meta) {
      meta = document.createElement('meta')
      if (name.startsWith('og:') || name.startsWith('article:')) {
        meta.setAttribute('property', name)
      } else {
        meta.setAttribute('name', name)
      }
      document.head.appendChild(meta)
    }
    
    meta.setAttribute('content', content)
  }

  const updateStructuredData = (data: any) => {
    // Remove existing structured data
    const existing = document.querySelector('#structured-data')
    if (existing) {
      existing.remove()
    }

    // Add new structured data
    const script = document.createElement('script')
    script.id = 'structured-data'
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(data)
    document.head.appendChild(script)
  }

  const generateStructuredData = (post: any, isHome: boolean) => {
    if (isHome) {
      return {
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "Блог Олега Кононенко",
        "description": "Блог о современной веб-разработке",
        "author": {
          "@type": "Person",
          "name": "Олег Кононенко",
          "jobTitle": "Frontend Developer"
        },
        "blogPost": state.blogPosts.filter(p => p.status === 'published').map(p => ({
          "@type": "BlogPosting",
          "headline": p.title,
          "description": p.excerpt,
          "datePublished": p.publishedAt,
          "author": {
            "@type": "Person",
            "name": p.author
          }
        }))
      }
    } else if (post) {
      return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.excerpt,
        "image": post.coverImage,
        "datePublished": post.publishedAt,
        "dateModified": post.updatedAt,
        "author": {
          "@type": "Person",
          "name": post.author,
          "jobTitle": "Frontend Developer"
        },
        "publisher": {
          "@type": "Person",
          "name": "Олег Кононенко"
        },
        "keywords": post.tags.join(', '),
        "wordCount": post.content.split(' ').length,
        "timeRequired": `PT${post.readTime}M`
      }
    }

    return null
  }

  // Generate RSS feed data
  const generateRSSFeed = () => {
    const publishedPosts = state.blogPosts.filter(p => p.status === 'published')
    
    const rssItems = publishedPosts.map(post => `
      <item>
        <title><![CDATA[${post.title}]]></title>
        <description><![CDATA[${post.excerpt}]]></description>
        <link>https://example.com/blog/${post.slug}</link>
        <guid>https://example.com/blog/${post.slug}</guid>
        <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
        <author>${post.author}</author>
        ${post.tags.map(tag => `<category>${tag}</category>`).join('')}
      </item>
    `).join('')

    return `<?xml version="1.0" encoding="UTF-8"?>
      <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
        <channel>
          <title>Бло�� Олега Кононенко</title>
          <description>Блог о современной веб-разработке</description>
          <link>https://example.com/blog</link>
          <atom:link href="https://example.com/rss.xml" rel="self" type="application/rss+xml"/>
          <language>ru</language>
          <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
          <generator>Portfolio CMS</generator>
          ${rssItems}
        </channel>
      </rss>`
  }

  // This component doesn't render anything visible
  return null
}

export default BlogSEO