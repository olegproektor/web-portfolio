'use client'

import React, { useEffect } from 'react'

interface SEOHeadProps {
  title?: string
  description?: string
  keywords?: string
  canonical?: string
  ogImage?: string
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'Олег Кононенко - Product Manager и специалист по ИИ-решениям',
  description = 'Product Manager полного цикла с опытом в ИИ, автоматизации бизнес-процессов и управлении проектами. Специализация: нейросети, CRM-системы, световой дизайн.',
  keywords = 'Product Manager, ИИ, искусственный интеллект, автоматизация, CRM, AmoCRM, GPT-4, Python, управление проектами, Олег Кононенко',
  canonical = 'https://your-vercel-domain.vercel.app', // Замените на ваш Vercel домен
  ogImage = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=630&fit=crop&crop=face'
}) => {
  useEffect(() => {
    // Установка title
    document.title = title

    // Установка meta тегов
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name'
      let meta = document.querySelector(`meta[${attribute}="${name}"]`)
      
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute(attribute, name)
        document.head.appendChild(meta)
      }
      
      meta.setAttribute('content', content)
    }

    // Основные meta теги
    updateMetaTag('description', description)
    updateMetaTag('keywords', keywords)
    updateMetaTag('author', 'Олег Кононенко')
    updateMetaTag('robots', 'index, follow')
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0')

    // Open Graph теги
    updateMetaTag('og:title', title, true)
    updateMetaTag('og:description', description, true)
    updateMetaTag('og:type', 'website', true)
    updateMetaTag('og:url', canonical, true)
    updateMetaTag('og:image', ogImage, true)
    updateMetaTag('og:site_name', 'Олег Кононенко - Портфолио', true)
    updateMetaTag('og:locale', 'ru_RU', true)

    // Twitter Card теги
    updateMetaTag('twitter:card', 'summary_large_image')
    updateMetaTag('twitter:title', title)
    updateMetaTag('twitter:description', description)
    updateMetaTag('twitter:image', ogImage)

    // Canonical URL
    let canonical_link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
    if (!canonical_link) {
      canonical_link = document.createElement('link')
      canonical_link.rel = 'canonical'
      document.head.appendChild(canonical_link)
    }
    canonical_link.href = canonical

    // JSON-LD структурированные данные
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Олег Кононенко",
      "jobTitle": "Product Manager полного цикла",
      "description": description,
      "url": canonical,
      "image": ogImage,
      "email": "Lespola76@gmail.com",
      "telephone": "+7 (931) 585-16-76",
      "sameAs": [
        "https://github.com/olegproektor",
        "https://linkedin.com/in/olegproektor",
        "https://t.me/olegproektor"
      ],
      "knowsAbout": [
        "Product Management",
        "Agile/Scrum",
        "AI/ML Integration", 
        "Digital Transformation",
        "Process Optimization",
        "Team Leadership",
        "Data Analysis",
        "Stakeholder Management"
      ],
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "Высшее техническое образование"
      },
      "workLocation": {
        "@type": "Place",
        "name": "Краснодар, Россия",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Краснодар",
          "addressCountry": "RU"
        }
      },
      "hasOccupation": {
        "@type": "Occupation",
        "name": "Product Manager",
        "occupationLocation": {
          "@type": "City",
          "name": "Краснодар"
        },
        "skills": [
          "Product Strategy",
          "User Experience Design",
          "Data-Driven Decision Making",
          "Cross-functional Team Leadership",
          "Agile Methodologies"
        ]
      }
    }

    let scriptTag = document.querySelector('#structured-data')
    if (!scriptTag) {
      scriptTag = document.createElement('script')
      scriptTag.id = 'structured-data'
      scriptTag.type = 'application/ld+json'
      document.head.appendChild(scriptTag)
    }
    scriptTag.textContent = JSON.stringify(structuredData)

  }, [title, description, keywords, canonical, ogImage])

  return null
}

export default SEOHead