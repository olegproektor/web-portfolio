'use client'

import React from 'react'
import { Button } from './ui/button'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { motion } from 'framer-motion'
import { ChevronDown, Briefcase, Github, Linkedin, MapPin, User, Mail } from 'lucide-react'
import HeroAtomAnimation from './HeroAtomAnimation'
import { useDynamicCMS } from '../contexts/DynamicCMSContext'

interface DynamicHeroProps {
  onScrollToProjects?: () => void
}

const DynamicHero: React.FC<DynamicHeroProps> = ({ onScrollToProjects }) => {
  const { profile, isProfileLoading } = useDynamicCMS()
  
  const scrollToAbout = () => {
    const element = document.querySelector('#about')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (isProfileLoading) {
    return (
      <section className="min-h-screen flex items-center justify-center pt-16 lg:pt-20">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="animate-pulse">
                <div className="h-8 bg-accent rounded mb-6 w-48"></div>
                <div className="h-16 bg-accent rounded mb-4"></div>
                <div className="h-8 bg-accent rounded mb-6 w-80"></div>
                <div className="h-32 bg-accent rounded mb-8"></div>
                <div className="flex gap-4">
                  <div className="h-12 bg-accent rounded w-32"></div>
                  <div className="h-12 bg-accent rounded w-32"></div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 order-1 lg:order-2">
              <div className="w-80 h-80 lg:w-96 lg:h-96 mx-auto bg-accent rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (!profile) {
    return (
      <section className="min-h-screen flex items-center justify-center pt-16 lg:pt-20">
        <div className="container text-center">
          <p className="text-muted-foreground">Профиль не найден</p>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen flex items-center justify-center pt-16 lg:pt-20 relative overflow-hidden">
      {/* Атом анимация в качестве фона */}
      <div className="absolute inset-0 z-0 opacity-20">
        <HeroAtomAnimation />
      </div>
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Content */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {profile.availableForWork && (
                <div className="inline-flex items-center px-4 py-2 bg-accent rounded-full mb-6">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-sm font-medium">Доступен для работы</span>
                </div>
              )}
              
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-4">
                Привет, я{' '}
                <span className="gradient-text">{profile.name}</span>
              </h1>
              
              <h2 className="text-xl lg:text-2xl text-muted-foreground mb-6">
                {profile.title}
              </h2>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
                {profile.description}
              </p>

              <div className="flex items-center text-sm text-muted-foreground mb-8">
                <MapPin className="w-4 h-4 mr-2" />
                {profile.location}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  onClick={onScrollToProjects}
                  size="lg" 
                  className="gradient-bg text-white hover:opacity-90 transition-opacity"
                >
                  <Briefcase className="w-4 h-4 mr-2" />
                  Проекты
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => scrollToAbout()}
                >
                  <User className="w-4 h-4 mr-2" />
                  О себе
                </Button>
              </div>

              <div className="flex items-center space-x-4">
                {profile.githubUrl && (
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {profile.linkedinUrl && (
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {profile.email && (
                  <a
                    href={`mailto:${profile.email}`}
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                )}
              </div>
            </motion.div>
          </div>

          {/* Profile Image */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-80 h-80 lg:w-96 lg:h-96 mx-auto">
                <div className="absolute inset-0 gradient-bg rounded-full opacity-20 blur-xl"></div>
                <div className="relative w-full h-full rounded-full overflow-hidden shadow-medium border-4 border-white">
                  <ImageWithFallback
                    src={profile.avatar}
                    alt={`${profile.name} - ${profile.title}`}
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

export default DynamicHero