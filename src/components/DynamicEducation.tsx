'use client'

import React from 'react'
import { motion } from 'motion/react'
import { Calendar, MapPin, CheckCircle, GraduationCap } from 'lucide-react'
import { Badge } from './ui/badge'
import { Card, CardContent } from './ui/card'
import { useDynamicCMS } from '../contexts/DynamicCMSContext'

const DynamicEducation: React.FC = () => {
  const { education, isEducationLoading } = useDynamicCMS()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ru-RU', { 
      year: 'numeric', 
      month: 'long' 
    })
  }

  if (isEducationLoading) {
    return (
      <section id="education" className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <div className="h-12 bg-accent rounded mb-4 w-64 mx-auto animate-pulse"></div>
            <div className="h-6 bg-accent rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <div key={i} className="animate-pulse">
                <Card>
                  <CardContent className="p-8">
                    <div className="h-8 bg-accent rounded mb-4 w-80"></div>
                    <div className="h-6 bg-accent rounded mb-4 w-60"></div>
                    <div className="h-16 bg-accent rounded mb-4"></div>
                    <div className="h-6 bg-accent rounded w-40"></div>
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
    <section id="education" className="py-20 bg-muted/30">
      <div className="container px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Образование
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Моя образовательная база и квалификации
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {education.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-medium transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-start mb-6">
                    <div className="p-3 bg-primary text-primary-foreground rounded-lg mr-4">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{edu.degree}</h3>
                      <div className="flex items-center text-lg font-medium text-primary mb-2">
                        {edu.institution}
                        {edu.location && (
                          <>
                            <span className="mx-2">•</span>
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {edu.location}
                            </div>
                          </>
                        )}
                      </div>
                      <div className="flex items-center text-muted-foreground mb-4">
                        <Calendar className="w-4 h-4 mr-2" />
                        {formatDate(edu.startDate)}
                        {' — '}
                        {edu.current ? 'настоящее время' : formatDate(edu.endDate!)}
                        {edu.current && (
                          <Badge variant="secondary" className="ml-2">
                            Сейчас
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  {edu.description && (
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {edu.description}
                    </p>
                  )}

                  {edu.achievements && edu.achievements.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-3">Достижения:</h4>
                      <ul className="space-y-2">
                        {edu.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {education.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Информация об образовании пока не добавлена
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default DynamicEducation