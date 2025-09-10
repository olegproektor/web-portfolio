'use client'

import React from 'react'
import { Button } from './ui/button'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { motion } from 'framer-motion'
import { ChevronDown, Briefcase, Github, Linkedin, MapPin, User } from 'lucide-react'
import HeroAtomAnimation from './HeroAtomAnimation'

interface HeroProps {
  onScrollToProjects?: () => void
}

const Hero: React.FC<HeroProps> = ({ onScrollToProjects }) => {
  const scrollToAbout = () => {
    const element = document.querySelector('#about')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center pt-16 lg:pt-20 relative overflow-hidden">
      {/* Атом анимация в качестве фона */}
      <div className="absolute inset-0 z-0 opacity-20">
        <HeroAtomAnimation />
      </div>
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center px-4 py-2 bg-accent rounded-full mb-6 shadow-soft">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                <span className="text-sm font-medium">Доступен для работы</span>
              </div>
              
              <div className="mb-4">
                <span className="block text-sm sm:text-base md:text-lg font-medium">
                  Привет, я
                </span>
                <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium gradient-text">
                  Олег Кононенко
                </span>
              </div>
              
              <div className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-6 font-medium">
                Product Manager полного цикла
              </div>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl leading-relaxed">
                Я трансформирую идеи в решения, объединяя IT, управление проектами и креативный дизайн. От реконструкции IKEA и внедрения CRM-систем до создания онлайн-семинаров и изучения ИИ — я нахожу комплексные подходы к задачам любого масштаба.
              </p>

              <div className="flex items-center text-sm text-muted-foreground mb-8">
                <MapPin className="w-4 h-4 mr-2" />
                Краснодар, Россия
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  onClick={onScrollToProjects}
                  size="lg" 
                  className="gradient-bg text-white hover:opacity-90 transition-opacity shadow-medium hover:shadow-lg"
                >
                  <Briefcase className="w-4 h-4 mr-2" />
                  Проекты
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => scrollToAbout()}
                  className="text-base sm:text-lg shadow-soft hover:shadow-medium"
                >
                  <User className="w-4 h-4 mr-2" />
                  О себе
                </Button>
              </div>

              <div className="flex items-center space-x-4">
                <a
                  href="https://github.com/olegproektor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-accent text-muted-foreground hover:text-foreground hover:bg-accent/80 transition-all shadow-soft hover:shadow-medium"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/kononenkooleg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-accent text-muted-foreground hover:text-foreground hover:bg-accent/880 transition-all shadow-soft hover:shadow-medium"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Profile Image */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 mx-auto">
                <div className="absolute inset-0 gradient-bg rounded-full opacity-20 blur-xl"></div>
                <div className="relative w-full h-full rounded-full overflow-hidden shadow-medium border-4 border-white dark:border-card">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1652471943570-f3590a4e52ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMGJ1c2luZXNzbWFufGVufDF8fHx8MTc1Njk5NDE5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Олег Кононенко - Product Manager"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <button
            onClick={scrollToAbout}
            className="flex flex-col items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="text-sm mb-2">Прокрутить вниз</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero