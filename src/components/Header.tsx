'use client'

import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Menu, X, Download, Settings, Briefcase, FileText } from 'lucide-react'
import { motion } from 'motion/react'
import { useCMS } from '../contexts/CMSContext'

interface HeaderProps {
  onBlogClick?: () => void
  onProjectsClick?: () => void
}

const Header: React.FC<HeaderProps> = ({ onBlogClick, onProjectsClick }) => {
  const { state } = useCMS()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '#about', label: 'О себе' },
    { href: '#experience', label: 'Опыт' },
    { href: '#skills', label: 'Навыки' },
    { href: '#projects', label: 'Проекты' },
    { href: '#education', label: 'Образование' },
    { href: '#blog', label: 'Блог' },
    { href: '#contact', label: 'Контакты' }
  ]

  const scrollToSection = (href: string) => {
    if (href === '#blog' && onBlogClick) {
      onBlogClick()
    } else if (href === '#projects' && onProjectsClick) {
      onProjectsClick()
    } else {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-soft' : 'bg-transparent'
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold gradient-text">ОК</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            {state.isAdmin && (
              <Button
                onClick={() => scrollToSection('#cms')}
                variant="outline"
                size="sm"
              >
                <Settings className="w-4 h-4 mr-2" />
                CMS
              </Button>
            )}
            <Button
              onClick={() => {
                const fileURL = localStorage.getItem('resume-file')
                const filename = localStorage.getItem('resume-filename')
                if (fileURL && filename) {
                  const link = document.createElement('a')
                  link.href = fileURL
                  link.download = filename
                  link.click()
                } else {
                  alert('Резюме не загружено. Пожалуйста, загрузите резюме в CMS панели.')
                }
              }}
              className="gradient-bg text-white hover:opacity-90 transition-opacity"
            >
              <Download className="w-4 h-4 mr-2" />
              Скачать резюме
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-medium border-t"
          >
            <nav className="container py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-2 border-t space-y-2">
                {state.isAdmin && (
                  <Button
                    onClick={() => scrollToSection('#cms')}
                    variant="outline"
                    className="w-full"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    CMS
                  </Button>
                )}
                <Button
                  onClick={() => {
                    const fileURL = localStorage.getItem('resume-file')
                    const filename = localStorage.getItem('resume-filename')
                    if (fileURL && filename) {
                      const link = document.createElement('a')
                      link.href = fileURL
                      link.download = filename
                      link.click()
                    } else {
                      alert('Резюме не загружено. Пожалуйста, загрузите резюме в CMS панели.')
                    }
                  }}
                  className="w-full gradient-bg text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Скачать резюме
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}

export default Header