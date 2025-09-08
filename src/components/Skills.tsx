'use client'

import React, { useState, useEffect } from 'react'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { motion } from 'motion/react'

const Skills = () => {
  const [skillsData, setSkillsData] = useState<any>(null)

  useEffect(() => {
    const loadSkillsData = () => {
      try {
        const savedSkills = localStorage.getItem('skills-data')
        if (savedSkills) {
          setSkillsData(JSON.parse(savedSkills))
        }
      } catch (error) {
        console.error('Error loading skills data:', error)
      }
    }

    loadSkillsData()
    
    // Listen for storage changes to update in real-time
    const handleStorageChange = () => {
      loadSkillsData()
    }
    
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  // Default data
  const defaultFrontendSkills = [
    { name: "React", level: 85 },
    { name: "TypeScript", level: 80 },
    { name: "JavaScript", level: 85 },
    { name: "HTML/CSS", level: 90 }
  ]

  const defaultBackendSkills = [
    { name: "Python", level: 75 },
    { name: "Node.js", level: 70 },
    { name: "PostgreSQL", level: 65 },
    { name: "Docker", level: 60 }
  ]

  const defaultTools = [
    "Git", "VS Code", "Microsoft Power Automate", "AutoCAD", "Cinema 4D", 
    "3ds Max", "Corel Painter", "DaVinci Resolve", "GPT-4 API", "Telegram Bot API",
    "Illustrator", "DIALux", "Photoshop", "Stable Diffusion", "Figma", "Microsoft Office", "CorelDraw"
  ]

  const defaultSoftSkills = [
    "Product Management", "Agile/Scrum", "Data Analysis", "Team Leadership",
    "Strategic Planning", "Process Optimization", "Stakeholder Management", "UX/UI Design", "AI/ML Integration"
  ]

  // Use data from CMS or defaults
  const getFrontendSkills = () => {
    if (skillsData?.frontendStats) {
      return Object.entries(skillsData.frontendStats).map(([name, level]) => ({
        name,
        level: Number(level)
      }))
    }
    return defaultFrontendSkills
  }

  const getBackendSkills = () => {
    if (skillsData?.backendStats) {
      return Object.entries(skillsData.backendStats).map(([name, level]) => ({
        name,
        level: Number(level)
      }))
    }
    return defaultBackendSkills
  }

  const getTools = () => {
    if (skillsData?.toolsAndTech) {
      return skillsData.toolsAndTech.split(',').map((tool: string) => tool.trim()).filter(Boolean)
    }
    return defaultTools
  }

  const getSoftSkills = () => {
    if (skillsData?.professionalSkills) {
      return skillsData.professionalSkills.split(',').map((skill: string) => skill.trim()).filter(Boolean)
    }
    return defaultSoftSkills
  }

  const frontendSkills = getFrontendSkills()
  const backendSkills = getBackendSkills()
  const tools = getTools()
  const softSkills = getSoftSkills()

  const languages = [
    { name: "Русский", level: "Родной" },
    { name: "Английский", level: "A2 (Elementary)" }
  ]

  return (
    <section id="skills" className="py-20 lg:py-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="mb-4">Навыки и технологии</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Мой технический стек и профессиональные компетенции
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Frontend Skills */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="p-6 lg:p-8 h-full">
              <h3 className="mb-6">Frontend</h3>
              <div className="space-y-6">
                {frontendSkills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Progress value={skill.level} className="h-2" />
                    </motion.div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Backend Skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="p-6 lg:p-8 h-full">
              <h3 className="mb-6">Backend</h3>
              <div className="space-y-6">
                {backendSkills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Progress value={skill.level} className="h-2" />
                    </motion.div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Languages */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="p-6 lg:p-8 h-full">
              <h3 className="mb-6">Языки</h3>
              <div className="space-y-4">
                {languages.map((lang, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex justify-between items-center"
                  >
                    <span className="font-medium">{lang.name}</span>
                    <Badge variant="secondary">{lang.level}</Badge>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8">
                <h4 className="mb-4">Профессиональные навыки</h4>
                <div className="flex flex-wrap gap-2">
                  {softSkills.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <Badge variant="outline" className="text-sm">
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Tools & Technologies */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="p-6 lg:p-8 h-full">
              <h3 className="mb-6">Инструменты и технологии</h3>
              <div className="flex flex-wrap gap-3">
                {tools.map((tool, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Badge 
                      className="px-4 py-2 text-sm cursor-pointer hover:shadow-soft transition-all"
                      style={{ background: 'var(--gradient-primary)', color: 'white' }}
                    >
                      {tool}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Skills