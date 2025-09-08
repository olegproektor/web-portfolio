'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { BlogPost, PortfolioItem } from './CMSContext'
import { useSupabaseCMSContext } from './SupabaseCMSContext'
import { useCMS } from './CMSContext'

export interface HybridCMSContextType {
  // Data
  blogPosts: BlogPost[]
  portfolioItems: PortfolioItem[]
  
  // Meta
  dataSource: 'supabase' | 'localStorage' | 'fallback'
  isSupabaseAvailable: boolean
  isLoading: boolean
  
  // Auth (only for Supabase)
  isAuthenticated: boolean
  user: any
  
  // Operations (conditional based on data source)
  createBlogPost?: (post: Omit<BlogPost, 'id' | 'updatedAt'>) => Promise<BlogPost>
  updateBlogPost?: (id: string, updates: Partial<BlogPost>) => Promise<BlogPost>
  deleteBlogPost?: (id: string) => Promise<void>
  
  createPortfolioItem?: (item: Omit<PortfolioItem, 'id'>) => Promise<PortfolioItem>
  updatePortfolioItem?: (id: string, updates: Partial<PortfolioItem>) => Promise<PortfolioItem>
  deletePortfolioItem?: (id: string) => Promise<void>
  
  signIn?: (email: string, password: string) => Promise<any>
  signOut?: () => Promise<void>
  
  // Admin
  isAdmin: boolean
  setAdmin: (isAdmin: boolean) => void
  
  // Utility
  refetch?: () => Promise<void>
  error: string | null
}

const HybridCMSContext = createContext<HybridCMSContextType | null>(null)

export const HybridCMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const supabaseContext = useSupabaseCMSContext()
  const localStorageContext = useCMS()
  
  const [dataSource, setDataSource] = useState<'supabase' | 'localStorage' | 'fallback'>('fallback')
  
  // Определяем источник данных
  useEffect(() => {
    if (supabaseContext.isSupabaseConnected && !supabaseContext.isCheckingConnection) {
      setDataSource('supabase')
    } else if (!supabaseContext.isCheckingConnection) {
      setDataSource('localStorage')
    }
  }, [supabaseContext.isSupabaseConnected, supabaseContext.isCheckingConnection])

  // Выбираем правильные данные в зависимости от источника
  const getContextData = (): HybridCMSContextType => {
    const baseData = {
      dataSource,
      isSupabaseAvailable: supabaseContext.isSupabaseConnected,
      error: supabaseContext.error,
    }

    if (dataSource === 'supabase') {
      return {
        ...baseData,
        blogPosts: supabaseContext.blogPosts,
        portfolioItems: supabaseContext.portfolioItems,
        isLoading: supabaseContext.isLoading,
        isAuthenticated: supabaseContext.isAuthenticated,
        user: supabaseContext.user,
        isAdmin: supabaseContext.isAdmin,
        setAdmin: supabaseContext.setAdmin,
        
        // Supabase operations
        createBlogPost: supabaseContext.createBlogPost,
        updateBlogPost: supabaseContext.updateBlogPost,
        deleteBlogPost: supabaseContext.deleteBlogPost,
        createPortfolioItem: supabaseContext.createPortfolioItem,
        updatePortfolioItem: supabaseContext.updatePortfolioItem,
        deletePortfolioItem: supabaseContext.deletePortfolioItem,
        signIn: supabaseContext.signIn,
        signOut: supabaseContext.signOut,
        refetch: supabaseContext.refetch,
      }
    } else {
      // Fallback to localStorage
      return {
        ...baseData,
        blogPosts: localStorageContext.state.blogPosts,
        portfolioItems: localStorageContext.state.portfolioItems,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        isAdmin: localStorageContext.state.isAdmin,
        setAdmin: (isAdmin: boolean) => {
          localStorageContext.dispatch({ type: 'SET_ADMIN', payload: isAdmin })
        },
        error: null,
      }
    }
  }

  const contextValue = getContextData()

  return (
    <HybridCMSContext.Provider value={contextValue}>
      {children}
    </HybridCMSContext.Provider>
  )
}

export const useHybridCMS = () => {
  const context = useContext(HybridCMSContext)
  if (!context) {
    throw new Error('useHybridCMS must be used within a HybridCMSProvider')
  }
  return context
}