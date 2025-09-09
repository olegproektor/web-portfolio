'use client'

import React from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'
import { motion } from 'motion/react'
import { useForm } from 'react-hook-form@7.55.0'
import { toast } from 'sonner@2.0.3'
import { Mail, Phone, MapPin, Github, Linkedin, Send, Download, MessageCircle, Users } from 'lucide-react'

interface ContactForm {
  name: string
  email: string
  message: string
}

const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactForm>()

  const onSubmit = async (data: ContactForm) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log('Form data:', data)
      toast.success('Сообщение отправлено! Я свяжусь с вами в ближайшее время.')
      reset()
    } catch (error) {
      toast.error('Произошла ошибка. Попробуйте еще раз.')
    }
  }

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: "Lespola76@gmail.com",
      link: "mailto:Lespola76@gmail.com"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Телефон",
      value: "+7 (931) 585-16-76",
      link: "tel:+79315851676"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Местоположение",
      value: "Краснодар, Россия",
      link: null
    }
  ]

  const socialLinks = [
    {
      icon: <Github className="w-5 h-5" />,
      label: "GitHub",
      url: "https://github.com/olegproektor",
      username: "@olegproektor"
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: "LinkedIn",
      url: "https://linkedin.com/in/olegproektor",
      username: "Олег Кононенко"
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      label: "Telegram",
      url: "https://t.me/Lespol",
      username: "@Lespol"
    },
    {
      icon: <Users className="w-5 h-5" />,
      label: "VKontakte",
      url: "https://vk.com/lespola",
      username: "Lespola"
    }
  ]

  return (
    <section id="contact" className="py-20 lg:py-32 bg-accent/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="mb-4">Свяжитесь со мной</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Готов обсудить ваш проект или новые возможности сотрудничества
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Contact Form */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 lg:p-8">
                <h3 className="mb-6">Отправить сообщение</h3>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Имя *</Label>
                      <Input
                        id="name"
                        {...register('name', { required: 'Имя обязательно' })}
                        className="mt-2"
                        placeholder="Ваше имя"
                      />
                      {errors.name && (
                        <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register('email', { 
                          required: 'Email обязателен',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Неверный формат email'
                          }
                        })}
                        className="mt-2"
                        placeholder="your@email.com"
                      />
                      {errors.email && (
                        <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Сообщение *</Label>
                    <Textarea
                      id="message"
                      {...register('message', { required: 'Сообщение обязательно' })}
                      className="mt-2 min-h-[120px]"
                      placeholder="Расскажите о вашем проекте..."
                    />
                    {errors.message && (
                      <p className="text-sm text-red-600 mt-1">{errors.message.message}</p>
                    )}
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full sm:w-auto gradient-bg text-white hover:opacity-90 transition-opacity"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      'Отправка...'
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Отправить сообщение
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </motion.div>
          </div>

          {/* Contact Info & Social */}
          <div className="space-y-6">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="p-6">
                <h4 className="mb-6">Контактная информация</h4>
                
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="text-primary">{info.icon}</div>
                      <div>
                        <p className="text-sm text-muted-foreground">{info.label}</p>
                        {info.link ? (
                          <a 
                            href={info.link}
                            className="font-medium hover:text-primary transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="font-medium">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="p-6">
                <h4 className="mb-6">Социальные сети</h4>
                
                <div className="space-y-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-colors group"
                    >
                      <div className="text-muted-foreground group-hover:text-primary transition-colors">
                        {social.icon}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{social.label}</p>
                        <p className="text-xs text-muted-foreground">{social.username}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Download CV */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="p-6">
                <h4 className="mb-4">Резюме</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Скачайте мое резюме в формате PDF для более подробной информации
                </p>
                
                <Button 
                  className="w-full gradient-bg text-white hover:opacity-90 transition-opacity"
                  onClick={() => {
                    window.open('https://goryachij-klyuch.hh.ru/resume/edad53b8ff0f1da9c30039ed1f306e5674576f', '_blank')
                    toast.success('Переход к резюме на HeadHunter')
                  }}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Скачать CV (PDF)
                </Button>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact