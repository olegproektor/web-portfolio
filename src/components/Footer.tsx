'use client'

import React from 'react'
import { motion } from 'motion/react'
import { ArrowUp, Linkedin, Github, Instagram } from 'lucide-react'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-primary text-primary-foreground py-8">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center md:text-left mb-4 md:mb-0"
          >
            <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
              <a 
                href="https://www.linkedin.com/in/kononenkooleg" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://github.com/olegproektor" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/oleg_projektor/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
            <p className="text-xs text-primary-foreground/70">
              © K.N.K.O. Все права защищены.
            </p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sm hover:text-primary-foreground/70 transition-colors group"
          >
            <span>Наверх</span>
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}

export default Footer