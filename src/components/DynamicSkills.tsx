'use client'

import React from 'react'
import { motion } from 'motion/react'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { useDynamicCMS } from '../contexts/DynamicCMSContext'
import { 
  Code, 
  Users, 
  Palette, 
  BarChart3, 
  Star 
} from 'lucide-react'

const DynamicSkills: React.FC = () => {
  const { skills, isSkillsLoading } = useDynamicCMS()

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'technical':
        return <Code className="w-5 h-5" />
      case 'management':
        return <Users className="w-5 h-5" />
      case 'design':
        return <Palette className="w-5 h-5" />
      case 'analytics':
        return <BarChart3 className="w-5 h-5" />
      default:
        return <Star className="w-5 h-5" />
    }
  }

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'technical':
        return 'Технические навыки'
      case 'management':
        return 'Управление'
      case 'design':
        return 'Дизайн'
      case 'analytics':
        return 'Аналитика'
      default:
        return 'Прочее'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'technical':
        return 'text-blue-500'
      case 'management':
        return 'text-green-500'
      case 'design':
        return 'text-purple-500'
      case 'analytics':
        return 'text-orange-500'
      default:
        return 'text-gray-500'
    }
  }

  const getSkillsByCategory = () => {
    const categories = ['technical', 'management', 'design', 'analytics', 'other']
    return categories.map(category => ({
      category,
      skills: skills.filter(skill => skill.category === category)
    })).filter(group => group.skills.length > 0)
  }

  if (isSkillsLoading) {
    return (
      <section id="skills" className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <div className="h-12 bg-accent rounded mb-4 w-64 mx-auto animate-pulse"></div>
            <div className="h-6 bg-accent rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <Card>
                  <CardContent className="p-6">
                    <div className="h-6 bg-accent rounded mb-4 w-32"></div>
                    <div className="space-y-3">
                      <div className="h-4 bg-accent rounded w-full"></div>
                      <div className="h-2 bg-accent rounded w-full"></div>
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

  const skillGroups = getSkillsByCategory()

  return (
    <section id="skills" className="py-20">
      <div className="container px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Навыки и компетенции
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Мои профессиональные навыки и уровень экспертизы
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillGroups.map((group, groupIndex) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: groupIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-fit hover:shadow-medium transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`mr-3 ${getCategoryColor(group.category)}`}>
                      {getCategoryIcon(group.category)}
                    </div>
                    <h3 className="font-bold text-lg">
                      {getCategoryName(group.category)}
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    {group.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ 
                          duration: 0.4, 
                          delay: (groupIndex * 0.1) + (skillIndex * 0.05) 
                        }}
                        viewport={{ once: true }}
                        className="space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{skill.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {skill.level}/5
                          </Badge>
                        </div>
                        
                        <Progress 
                          value={(skill.level / 5) * 100} 
                          className="h-2"
                        />
                        
                        {skill.description && (
                          <p className="text-sm text-muted-foreground">
                            {skill.description}
                          </p>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {skills.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Навыки пока не добавлены
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default DynamicSkills