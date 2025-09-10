'use client'

import React from 'react'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { motion } from 'framer-motion'
import { Calendar, MapPin, ExternalLink } from 'lucide-react'

const Experience = () => {
  const experiences = [
    {
      company: "НВБ Энергия (контрактный проект)",
      position: "Специалист по ИИ-решениям для бизнеса",
      period: "2024 - настоящее время",
      location: "Санкт-Петербург",
      description: "Разработка ИИ-системы для оптимизации офисных процессов, упрощающей работу сотрудников. Реализация парсинга данных из интернета по спецификациям для быстрого анализа информации. Подключение ИИ к номенклатуре для автоматизации обработки заказов. Настройка автоматической генерации пакетов документов для делопроизводства, сокращающая рутину. Запуск ИИ-продуктов с интеграцией в бизнес-процессы. Проведение однодневных семинаров для обучения персонала работе с ИИ-инструментами, обеспечивающее их эффективное внедрение.",
      achievements: [
        "Сокращение времени офисных задач на 30% благодаря ИИ-системе",
        "Автоматизация генерации документов, повысившая точность и скорость делопроизводства",
        "Обучение 20+ сотрудников работе с ИИ, увеличившее их продуктивность"
      ],
      technologies: ["GPT-4 API", "Flask", "Microsoft Power Automate"],
      website: "#"
    },
    {
      company: "Рекламная производственная фирма (контрактный проект)",
      position: "Специалист по автоматизации бизнес-процесов",
      period: "2022-2023",
      location: "Санкт-Петербург",
      description: "Разработка и проектирование процессов для менеджеров производства и руководителей в рекламной производственной фирме с использованием AmoCRM. Провёл анализ рабочих процессов, определил ключевые точки для автоматизации, включая управление заказами, взаимодействие с клиентами и координацию производства. Настроил AmoCRM под задачи фирмы, интегрировав её с внутренними системами и обеспечив автоматизацию воронки продаж. Разработал сценарии для эффективной работы менеджеров, упрощающие отслеживание заказов и коммуникацию. Организовал обучение сотрудников для работы с CRM, обеспечив быстрое внедрение.",
      achievements: [
        "Сократил время обработки заказов на 50% за счёт автоматизации процессов в AmoCRM",
        "Повысил прозрачность взаимодействия между менеджерами и производством, минимизировав ошибки",
        "Обучил сотрудников работе с AmoCRM, увеличив эффективность их работы",
        "Успешно интегрировал CRM с внутренними системами, повысив точность данных"
      ],
      technologies: ["CRM (AmoCRM)", "Excel", "AmoCRM Analytics"],
      website: "#"
    },
    {
      company: "Сбер (контрактный проект)",
      position: "Руководитель проекта",
      period: "2020",
      location: "Санкт-Петербург",
      description: "Разработка и проведение цикла онлайн-семинаров для сотрудников Сбера, обучающих созданию флорариумов и панно из стабилизированного мха в условиях пандемии. Создание сценариев и лекционных презентаций для каждого семинара, обеспечивающих вовлечение аудитории. Настройка технических аспектов трансляций, включая работу нескольких камер, освещение и звук. Дистанционная режиссура трансляций, координация команды операторов и ведущих. Организация интерактивных элементов (опросы, Q&A) для повышения эффективности обучения.",
      achievements: [
        "10 онлайн-семинаров, 200+ сотрудников Сбера",
        "Разработал интерактивные сценарии, увеличившие вовлечённость участников",
        "Обеспечил высокое качество трансляций, минимизировав технические сбои",
        "Получил положительные отзывы от Сбера за организацию и креативный подход"
      ],
      technologies: ["Zoom", "PowerPoint", "Освещение и звук (студийное оборудование)"],
      website: "#"
    },
    {
      company: "Нева-Инжиниринг",
      position: "Руководитель проекта",
      period: "2018-2019",
      location: "Санкт-Петербург",
      description: "Руководил проектом реконструкции и ребрендинга торговых комплексов IKEA в Санкт-Петербурге, обеспечивая реализацию готовых брендовых решений. Разработал детальный план проекта, включающий этапы реконструкции, внедрение стандартов IKEA и координацию работ. Организовал взаимодействие команды подрядчиков и инженеров, контролировал соблюдение сроков, бюджета и качества. Настроил логистику материалов и оборудования, оптимизировал процессы для минимизации затрат.",
      achievements: [
        "Завершил реконструкцию двух торговых комплексов в срок, обеспечив их открытие в соответствии с бренд-стандартами IKEA",
        "Координировал команду из 50+ человек"
      ],
      technologies: ["Контроль качества (стандарты IKEA)"],
      website: "#"
    },
    {
      company: "Истрем",
      position: "Product Manager",
      period: "2013-2017",
      location: "Санкт-Петербург",
      description: "Разработка уникальной системы рассеивания света для интерьерных панелей, используемых в жилых и общественных помещениях. Проектирование производственного процесса, включая выбор оборудования и технологий. Налаживание производства с оптимизацией материалов и процессов для повышения эффективности. Запуск продаж через разработку стратегии продвижения, включая проведение семинаров для дизайнеров и архитекторов, повышающих интерес к продукту.",
      achievements: [
        "Создал энергоэффективную технологию рассеивания света, обеспечив высокое качество панелей",
        "Увеличил прибыль компании за счёт семинаров для дизайнеров и архитекторов, повысивших спрос на продукт"
      ],
      technologies: ["DIALux", "Cinema4D", "AutoCAD", "Adobe Photoshop"],
      website: "#"
    }
  ]

  return (
    <section id="experience" className="py-20 lg:py-32 bg-accent/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">Опыт работы</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Мой профессиональный путь в управлении проектами и комплексных решениях
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-500 to-blue-600 md:left-8 lg:left-8 hidden md:block"></div>

          <div className="space-y-8 px-4 sm:px-6 lg:px-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Timeline dot */}
                <div className="absolute left-2 top-8 w-4 h-4 gradient-bg rounded-full border-4 border-background shadow-soft md:left-6 lg:left-6 hidden md:block"></div>

                <Card className="md:ml-12 lg:ml-20 p-6 lg:p-8 hover:shadow-medium transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                    <div className="mb-4 md:mb-0">
                      <h3 className="text-xl font-semibold mb-2">{exp.position}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">{exp.period}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{exp.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-primary">{exp.company}</span>
                        <a
                          href={exp.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-6">{exp.description}</p>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Ключевые достижения:</h4>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="flex items-start gap-2 text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Технологии:</h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary" className="text-sm">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience