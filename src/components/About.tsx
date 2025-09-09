'use client'

import React from 'react'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { motion } from 'motion/react'
import { Award, Users, Clock, Code } from 'lucide-react'

const About = () => {
  const stats = [
    {
      icon: <Clock className="w-6 h-6" />,
      value: "10+",
      label: "Лет опыта"
    },
    {
      icon: <Code className="w-6 h-6" />,
      value: "3",
      label: "Отрасли"
    },
    {
      icon: <Users className="w-6 h-6" />,
      value: "5",
      label: "Технологий ИИ"
    },
    {
      icon: <Award className="w-6 h-6" />,
      value: "24/7",
      label: "Доступность"
    }
  ]

  const interests = [
    "Architecting Business Systems",
    "Cross-Domain Solution Design", 
    "Tech-to-Business Integration",
    "Full-Cycle Project Leadership",
    "Mentoring & Knowledge Transfer"
  ]

  return (
    <section id="about" className="py-20 lg:py-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16"
        >
          {/* Text Content */}
          <div>
            <h2 className="mb-8">О себе</h2>
            
            <div className="space-y-6 text-muted-foreground">
              <p className="leading-relaxed">
                Меня зовут Олег Кононенко, и я — специалист по комплексным решениям с более чем 10-летним опытом, где технологии, управление и креативность работают вместе. Мой путь начался с предпринимательства: я создавал производство столярных изделий и рекламное агентство, где разработал уникальные световые панно и вывел новые продукты на рынок.
              </p>
              
              <p className="leading-relaxed">
                Руководил масштабными проектами, такими как реконструкция и ребрендинг IKEA в Санкт-Петербурге, координируя команды и обеспечивая выполнение высоких стандартов. Внедрял CRM-системы, оптимизируя бизнес-процессы в производстве и рекламе.
              </p>
              
              <p className="leading-relaxed">
                В области ИИ я фокусируюсь на: разработке ИИ-агентов — создаю автоматизированных помощников для решения бизнес-задач, таких как подбор персонала, анализ отзывов, поддержка клиентов и премодерация контента. Интеграции ИИ в бизнес-процессы — анализирую рабочие процессы компаний и внедряю ИИ-инструменты для автоматизации рутины, ускорения и повышения качества работы. ИИ-стратегии для бизнеса — определяю точки роста и оптимизации, разрабатывая дорожные карты внедрения ИИ.
              </p>
              
              <p className="leading-relaxed">
                В период пандемии разработал для Сбера и провёл цикл онлайн-семинаров по декоративному искусству, освоив техническую режиссуру и создание образовательного контента. Сегодня я сосредоточен на IT и изучаю искусственный интеллект, чтобы создавать решения, которые автоматизируют процессы и открывают новые возможности.
              </p>
              
              <p className="leading-relaxed">
                Мой опыт в управлении проектами, дизайне и инженерии позволяет находить нестандартные подходы к задачам и доводить их до результата. Я ценю вызовы, требующие аналитики, креативности и системного мышления, и готов привнести эту энергию в ваш проект. В свободное время увлекаюсь спортивным горным туризмом, который помогает мне перезагружаться и находить вдохновение для новых идей.
              </p>
            </div>

            <div className="mt-8">
              <h4 className="mb-4">Интересы и хобби</h4>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest, index) => (
                  <Badge key={index} variant="secondary" className="text-sm px-3 py-1.5">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-6 text-center hover:shadow-medium transition-shadow h-full flex flex-col shadow-soft">
                    <div className="flex justify-center mb-4 text-primary">
                      {stat.icon}
                    </div>
                    <div className="gradient-text text-2xl font-bold mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground mt-auto">
                      {stat.label}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About