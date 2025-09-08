'use client'

import React, { useEffect, useRef } from 'react'
import { motion } from 'motion/react'

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Размеры канваса
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Частицы для создания технологичного фона
    const particles: Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
      color: string
    }> = []

    // Создание частиц
    const createParticles = () => {
      const particleCount = Math.min(80, Math.floor(canvas.width / 15))
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 4 + 1.5,
          speedX: (Math.random() - 0.5) * 0.8,
          speedY: (Math.random() - 0.5) * 0.8,
          opacity: Math.random() * 0.7 + 0.3,
          color: Math.random() > 0.5 ? '#14B8A6' : '#2563EB'
        })
      }
    }

    createParticles()

    // Анимация частиц
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Обновление и рисование частиц
      particles.forEach((particle, index) => {
        // Обновление позиции
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Отражение от границ
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1
        }

        // Рисование частицы как атом
        ctx.save()
        ctx.globalAlpha = particle.opacity
        
        // Центральное ядро
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 0.4, 0, Math.PI * 2)
        ctx.fill()
        
        // Орбиты атома
        ctx.strokeStyle = particle.color
        ctx.lineWidth = 0.5
        ctx.globalAlpha = particle.opacity * 0.6
        
        // Первая орбита
        ctx.beginPath()
        ctx.ellipse(particle.x, particle.y, particle.size * 1.2, particle.size * 0.6, 0, 0, Math.PI * 2)
        ctx.stroke()
        
        // Вторая орбита
        ctx.beginPath()
        ctx.ellipse(particle.x, particle.y, particle.size * 0.6, particle.size * 1.2, 0, 0, Math.PI * 2)
        ctx.stroke()
        
        // Электроны на орбитах
        const time = Date.now() * 0.002
        ctx.fillStyle = particle.color
        ctx.globalAlpha = particle.opacity * 0.8
        
        // Электрон 1
        const electron1X = particle.x + Math.cos(time + index) * particle.size * 1.2
        const electron1Y = particle.y + Math.sin(time + index) * particle.size * 0.6
        ctx.beginPath()
        ctx.arc(electron1X, electron1Y, particle.size * 0.15, 0, Math.PI * 2)
        ctx.fill()
        
        // Электрон 2
        const electron2X = particle.x + Math.cos(time * 1.5 + index + Math.PI) * particle.size * 0.6
        const electron2Y = particle.y + Math.sin(time * 1.5 + index + Math.PI) * particle.size * 1.2
        ctx.beginPath()
        ctx.arc(electron2X, electron2Y, particle.size * 0.15, 0, Math.PI * 2)
        ctx.fill()
        
        ctx.restore()

        // Рисование соединительных лин��й
        particles.slice(index + 1).forEach(otherParticle => {
          const distance = Math.sqrt(
            Math.pow(particle.x - otherParticle.x, 2) + 
            Math.pow(particle.y - otherParticle.y, 2)
          )

          if (distance < 150) {
            ctx.save()
            ctx.globalAlpha = (150 - distance) / 150 * 0.4
            ctx.strokeStyle = particle.color
            ctx.lineWidth = 0.8
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
            ctx.restore()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Градиентный фон */}
      <div 
        className="absolute inset-0 opacity-50"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(20, 184, 166, 0.15) 0%, rgba(37, 99, 235, 0.08) 50%, transparent 70%)'
        }}
      />
      
      {/* Анимированный канвас */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-80"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Геометрические элементы */}
      <div className="absolute inset-0">
        {/* Плавающие символы атома и технологий */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${15 + i * 12}%`,
              top: `${25 + (i % 4) * 18}%`,
            }}
            animate={{
              y: [0, -25, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10 + i * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.7,
            }}
          >
            <div className={`w-4 h-4 ${i % 2 === 0 ? 'text-teal-500/30' : 'text-blue-500/30'} flex items-center justify-center`}>
              {i % 4 === 0 && '⚛️'}
              {i % 4 === 1 && '🔬'}
              {i % 4 === 2 && '⚡'}
              {i % 4 === 3 && '🧠'}
            </div>
          </motion.div>
        ))}

        {/* Волнообразные линии */}
        <motion.div
          className="absolute top-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-teal-500/40 to-transparent"
          animate={{
            scaleX: [0.5, 1.8, 0.5],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.div
          className="absolute top-3/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"
          animate={{
            scaleX: [1.8, 0.5, 1.8],
            opacity: [0.8, 0.4, 0.8],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* Пульсирующие круги */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`circle-${i}`}
            className="absolute rounded-full border-2 border-white/20"
            style={{
              right: `${8 + i * 18}%`,
              top: `${35 + i * 12}%`,
              width: `${70 + i * 25}px`,
              height: `${70 + i * 25}px`,
            }}
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 5 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.2,
            }}
          />
        ))}
      </div>

      {/* Шум и текстура */}
      <div 
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}

export default AnimatedBackground