'use client'

import React, { useState } from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { motion } from 'framer-motion'
import { 
  Bold, 
  Italic, 
  Link, 
  List, 
  ListOrdered, 
  Quote, 
  Code, 
  Image,
  Eye,
  Edit3
} from 'lucide-react'

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ 
  value, 
  onChange, 
  placeholder = "Введите содержание..." 
}) => {
  const [activeTab, setActiveTab] = useState('write')

  const insertMarkdown = (prefix: string, suffix: string = '') => {
    const textarea = document.getElementById('markdown-editor') as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const text = textarea.value
    const selectedText = text.substring(start, end)
    
    const newText = text.substring(0, start) + prefix + selectedText + suffix + text.substring(end)
    onChange(newText)
    
    // Restore cursor position
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + selectedText.length
      )
    }, 0)
  }

  const formatButtons = [
    { icon: Bold, action: () => insertMarkdown('**', '**'), tooltip: 'Жирный' },
    { icon: Italic, action: () => insertMarkdown('*', '*'), tooltip: 'Курсив' },
    { icon: Link, action: () => insertMarkdown('[', '](url)'), tooltip: 'Ссылка' },
    { icon: List, action: () => insertMarkdown('\n- '), tooltip: 'Список' },
    { icon: ListOrdered, action: () => insertMarkdown('\n1. '), tooltip: 'Нумерованный список' },
    { icon: Quote, action: () => insertMarkdown('\n> '), tooltip: 'Цитата' },
    { icon: Code, action: () => insertMarkdown('`', '`'), tooltip: 'Код' },
    { icon: Image, action: () => insertMarkdown('![alt](', ')'), tooltip: 'Изображение' }
  ]

  const renderMarkdownPreview = (markdown: string) => {
    // Simple markdown to HTML conversion
    return markdown
      .replace(/#{6}\s(.+)/g, '<h6 class="text-sm font-semibold mt-4 mb-2">$1</h6>')
      .replace(/#{5}\s(.+)/g, '<h5 class="text-base font-semibold mt-4 mb-2">$1</h5>')
      .replace(/#{4}\s(.+)/g, '<h4 class="text-lg font-semibold mt-6 mb-3">$1</h4>')
      .replace(/#{3}\s(.+)/g, '<h3 class="text-xl font-semibold mt-6 mb-3">$1</h3>')
      .replace(/#{2}\s(.+)/g, '<h2 class="text-2xl font-semibold mt-8 mb-4">$1</h2>')
      .replace(/#{1}\s(.+)/g, '<h1 class="text-3xl font-bold mt-8 mb-4">$1</h1>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`(.+?)`/g, '<code class="bg-accent px-1 py-0.5 rounded text-sm">$1</code>')
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-primary hover:underline">$1</a>')
      .replace(/!\[(.+?)\]\((.+?)\)/g, '<img src="$2" alt="$1" class="max-w-full h-auto rounded-lg my-4" />')
      .replace(/^> (.+)/gm, '<blockquote class="border-l-4 border-primary pl-4 italic my-4">$1</blockquote>')
      .replace(/^- (.+)/gm, '<li class="ml-4">$1</li>')
      .replace(/^1\. (.+)/gm, '<li class="ml-4">$1</li>')
      .replace(/\n\n/g, '</p><p class="mb-4">')
      .replace(/\n/g, '<br>')
      .replace(/^/, '<p class="mb-4">')
      .replace(/$/, '</p>')
  }

  return (
    <Card className="overflow-hidden">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="border-b p-4">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="write" className="flex items-center gap-2">
                <Edit3 className="w-4 h-4" />
                Редактор
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Предпросмотр
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Toolbar */}
          {activeTab === 'write' && (
            <div className="flex flex-wrap gap-1">
              {formatButtons.map((button, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={button.action}
                  title={button.tooltip}
                  className="w-8 h-8 p-0"
                >
                  <button.icon className="w-4 h-4" />
                </Button>
              ))}
            </div>
          )}
        </div>

        <TabsContent value="write" className="p-0 m-0">
          <Textarea
            id="markdown-editor"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="min-h-[400px] border-0 rounded-none resize-none focus-visible:ring-0"
          />
        </TabsContent>

        <TabsContent value="preview" className="p-6 m-0">
          <div className="min-h-[400px]">
            {value ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: renderMarkdownPreview(value) }}
              />
            ) : (
              <div className="flex items-center justify-center h-[400px] text-muted-foreground">
                Начните писать, чтобы увидеть предпросмотр
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  )
}

export default MarkdownEditor