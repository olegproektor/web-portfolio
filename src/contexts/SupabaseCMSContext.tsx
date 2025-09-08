'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useSupabaseCMS } from '../hooks/useSupabaseCMS'
import { BlogPost, PortfolioItem } from './CMSContext'
import { checkSupabaseConnection } from '../lib/supabase'

export interface SupabaseCMSContextType {
  // Data
  blogPosts: BlogPost[]
  portfolioItems: PortfolioItem[]
  
  // Loading states
  isLoading: boolean
  isLoadingBlog: boolean
  isLoadingPortfolio: boolean
  
  // Supabase connection
  isSupabaseConnected: boolean
  isCheckingConnection: boolean
  
  // Auth
  isAuthenticated: boolean
  user: any
  
  // Blog operations
  createBlogPost: (post: Omit<BlogPost, 'id' | 'updatedAt'>) => Promise<BlogPost>
  updateBlogPost: (id: string, updates: Partial<BlogPost>) => Promise<BlogPost>
  deleteBlogPost: (id: string) => Promise<void>
  
  // Portfolio operations
  createPortfolioItem: (item: Omit<PortfolioItem, 'id'>) => Promise<PortfolioItem>
  updatePortfolioItem: (id: string, updates: Partial<PortfolioItem>) => Promise<PortfolioItem>
  deletePortfolioItem: (id: string) => Promise<void>
  
  // Auth operations
  signIn: (email: string, password: string) => Promise<any>
  signOut: () => Promise<void>
  
  // Admin
  isAdmin: boolean
  setAdmin: (isAdmin: boolean) => void
  
  // Utility
  refetch: () => Promise<void>
  error: string | null
}

const SupabaseCMSContext = createContext<SupabaseCMSContextType | null>(null)

export const SupabaseCMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(false)
  const [isCheckingConnection, setIsCheckingConnection] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  
  const supabaseHook = useSupabaseCMS()

  // Check Supabase connection on mount
  useEffect(() => {
    const checkConnection = async () => {
      try {
        setIsCheckingConnection(true)
        const connected = await checkSupabaseConnection()
        setIsSupabaseConnected(connected)
        
        if (!connected) {
          console.log('Supabase not connected, using fallback data')
        } else {
          console.log('Supabase connected successfully')
        }
      } catch (error) {
        console.error('Failed to check Supabase connection:', error)
        setIsSupabaseConnected(false)
      } finally {
        setIsCheckingConnection(false)
      }
    }
    
    checkConnection()
  }, [])

  // Load admin state from localStorage
  useEffect(() => {
    const savedAdminState = localStorage.getItem('portfolio-admin-state')
    if (savedAdminState === 'true') {
      setIsAdmin(true)
    }
  }, [])

  // Save admin state to localStorage
  const setAdmin = (adminState: boolean) => {
    setIsAdmin(adminState)
    localStorage.setItem('portfolio-admin-state', adminState.toString())
  }

  const contextValue: SupabaseCMSContextType = {
    // Data
    blogPosts: supabaseHook.blogPosts,
    portfolioItems: supabaseHook.portfolioItems,
    
    // Loading states
    isLoading: supabaseHook.isLoading,
    isLoadingBlog: supabaseHook.isLoadingBlog,
    isLoadingPortfolio: supabaseHook.isLoadingPortfolio,
    
    // Supabase connection
    isSupabaseConnected,
    isCheckingConnection,
    
    // Auth
    isAuthenticated: supabaseHook.isAuthenticated,
    user: supabaseHook.user,
    
    // Blog operations
    createBlogPost: supabaseHook.createBlogPost,
    updateBlogPost: supabaseHook.updateBlogPost,
    deleteBlogPost: supabaseHook.deleteBlogPost,
    
    // Portfolio operations
    createPortfolioItem: supabaseHook.createPortfolioItem,
    updatePortfolioItem: supabaseHook.updatePortfolioItem,
    deletePortfolioItem: supabaseHook.deletePortfolioItem,
    
    // Auth operations
    signIn: supabaseHook.signIn,
    signOut: supabaseHook.signOut,
    
    // Admin
    isAdmin,
    setAdmin,
    
    // Utility
    refetch: supabaseHook.refetch,
    error: supabaseHook.error,
  }

  return (
    <SupabaseCMSContext.Provider value={contextValue}>
      {children}
    </SupabaseCMSContext.Provider>
  )
}

export const useSupabaseCMSContext = () => {
  const context = useContext(SupabaseCMSContext)
  if (!context) {
    throw new Error('useSupabaseCMSContext must be used within a SupabaseCMSProvider')
  }
  return context
}