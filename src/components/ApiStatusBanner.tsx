'use client'

import React from 'react'
import { AlertCircle, Wifi, WifiOff } from 'lucide-react'
import { Badge } from './ui/badge'
import { useDynamicCMS } from '../contexts/DynamicCMSContext'

const ApiStatusBanner: React.FC = () => {
  const { isApiAvailable, error } = useDynamicCMS()
  
  if (isApiAvailable) return null

  return (
    <div className="bg-orange-50 border-b border-orange-200 px-4 py-2">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-2 text-sm">
          <WifiOff className="w-4 h-4 text-orange-500" />
          <span className="text-orange-700">
            Демо-режим: отображаются реальные демонстрационные данные Олега Кононенко
          </span>
          <Badge variant="outline" className="text-orange-600 border-orange-300">
            Суперб API недоступен
          </Badge>
        </div>
      </div>
    </div>
  )
}

export default ApiStatusBanner