'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin, CheckCircle } from 'lucide-react'
import { Badge } from './ui/badge'
import { Card, CardContent } from './ui/card'
import { useDynamicCMS } from '../contexts/DynamicCMSContext'

const DynamicExperience: React.FC = () => {
  const { experience, isExperienceLoading } = useDynamicCMS()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ru-RU', { 
      year: 'numeric', 
      month: 'long' 
    })
  }

  if (isExperienceLoading) {
    return (
      <section id="experience" className="py-20 bg-muted/30">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="h-12 bg-accent rounded mb-4 w-64 mx-auto animate-pulse"></div>
            <div className="h-6 bg-accent rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <Card>
                  <CardContent className="p-8">
                    <div className="h-8 bg-accent rounded mb-4 w-80"></div>
                    <div className="h-6 bg-accent rounded mb-4 w-60"></div>
                    <div className="h-24 bg-accent rounded mb-4"></div>
                    <div className="flex gap-2">
                      <div className="h-6 bg-accent rounded w-20"></div>
                      <div className="h-6 bg-accent rounded w-20"></div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="experience" className="py-20 bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Опыт работы
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Мой профессиональный путь и ключевые достижения
          </p>
        </motion.div>

        <div className="space-y-8 px-4 sm:px-6 lg:px-8">
          {experience.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden hover:shadow-medium transition-shadow">
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">{exp.title}</h3>
                      <div className="flex items-center text-lg font-medium text-primary mb-2">
                        {exp.company}
                        {exp.location && (
                          <>
                            <span className="mx-2">•</span>
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {exp.location}
                            </div>
                          </>
                        )}
                      </div>
                      <div className="flex items-center text-muted-foreground mb-4">
                        <Calendar className="w-4 h-4 mr-2" />
                        {formatDate(exp.startDate)}
                        {' — '}
                        {exp.current ? 'настоящее время' : formatDate(exp.endDate!)}
                        {exp.current && (
                          <Badge variant="secondary" className="ml-2">
                            Сейчас
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {exp.description}
                  </p>

                  {exp.achievements && exp.achievements.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-medium mb-3">Ключевые достижения:</h4>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {exp.technologies && exp.technologies.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-3">Технологии и навыки:</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, i) => (
                          <Badge key={i} variant="outline">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {experience.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Опыт работы пока не добавлен
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default DynamicExperience