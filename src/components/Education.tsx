'use client'

import React from 'react'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { motion } from 'motion/react'
import { GraduationCap, Award, Calendar, ExternalLink } from 'lucide-react'

const Education = () => {
  const education = [
    {
      institution: "ГОСУДАРСТВЕННАЯ ДОНБАССКАЯ МАШИНОСТРОИТЕЛЬНАЯ АКАДЕМИЯ",
      degree: "Бакалавр автоматизации машиностроения и информационных технологий",
      period: "1995 - 1998",
      location: "г. Краматорск",
      description: "Специализация: автоматизация машиностроительных процессов и информационные технологии.",
      grade: "Хорошо"
    },
    {
      institution: "КОЛЛЕДЖ ГОСУДАРСТВЕННОЙ ДОНБАССКОЙ МАШИНОСТРОИТЕЛЬНОЙ АКАДЕМИИ",
      degree: "Обработка материалов на станках и автоматических линиях",
      period: "1993 - 1995",
      location: "г. Краматорск",
      description: "Техническое образование по обработке материалов, работе со станочным оборудованием и автоматическими линиями.",
      grade: "Хорошо"
    }
  ]

  const certifications: any[] = []

  const awards = [
    {
      title: "Лучший образовательный проект",
      organization: "Сбер",
      description: "За разработку и проведение цикла онлайн-семинаров по декоративному искусству в период пандемии для 200+ сотрудников."
    }
  ]

  return (
    <section id="education" className="py-20 lg:py-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="mb-4">Образование и достижения</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Мое академическое образование, профессиональные сертификаты и награды
          </p>
        </motion.div>

        {/* Education */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-8"
          >
            <GraduationCap className="w-6 h-6 text-primary" />
            <h3>Образование</h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full hover:shadow-medium transition-shadow">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{edu.period}</span>
                    </div>
                    <Badge variant="secondary">{edu.grade}</Badge>
                  </div>
                  
                  <h4 className="font-semibold mb-2">{edu.degree}</h4>
                  <p className="font-medium text-primary mb-2">{edu.institution}</p>
                  <p className="text-sm text-muted-foreground mb-4">{edu.location}</p>
                  <p className="text-muted-foreground text-sm">{edu.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-8"
          >
            <Award className="w-6 h-6 text-primary" />
            <h3>Сертификаты</h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground">
              Сертификаты будут добавлены в ближайшее время
            </p>
          </motion.div>
        </div>

        {/* Awards */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-8"
          >
            <Award className="w-6 h-6 text-primary" />
            <h3>Награды и достижения</h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-6 max-w-md mx-auto">
            {awards.map((award, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 text-center hover:shadow-medium transition-shadow">
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  
                  <h4 className="font-semibold mb-2">{award.title}</h4>
                  <p className="font-medium text-primary text-sm mb-3">{award.organization}</p>
                  <p className="text-muted-foreground text-sm">{award.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Education