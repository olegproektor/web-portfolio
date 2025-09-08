import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { BlogPost, PortfolioItem } from '../contexts/CMSContext';
import { projectId, publicAnonKey } from '../utils/supabase/info';

// Safe environment variable access with fallbacks
const getEnvVar = (key: string, fallback: string = ''): string => {
  if (typeof window === 'undefined') {
    // Server-side - no environment variables available
    return fallback;
  }
  
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      return import.meta.env[key] || fallback;
    }
  } catch (error) {
    console.warn(`Failed to access environment variable ${key}:`, error);
  }
  
  return fallback;
};

// Supabase configuration (replace with your actual values)
const supabaseUrl = getEnvVar('VITE_SUPABASE_URL', 'https://placeholder.supabase.co');
const supabaseAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY', 'placeholder-key');

// Only create client if we have real credentials
const hasRealCredentials = supabaseUrl !== 'https://placeholder.supabase.co' && 
                          supabaseAnonKey !== 'placeholder-key' &&
                          !supabaseUrl.includes('YOUR_SUPABASE_URL_HERE') &&
                          !supabaseAnonKey.includes('YOUR_SUPABASE_ANON_KEY_HERE');

export const supabase = hasRealCredentials 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Database types
export interface Database {
  public: {
    Tables: {
      blog_posts: {
        Row: BlogPost;
        Insert: Omit<BlogPost, 'id' | 'updatedAt'>;
        Update: Partial<Omit<BlogPost, 'id'>>;
      };
      portfolio_items: {
        Row: PortfolioItem;
        Insert: Omit<PortfolioItem, 'id'>;
        Update: Partial<Omit<PortfolioItem, 'id'>>;
      };
    };
  };
}

// Server API calls using edge functions
const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-c2360911${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${publicAnonKey}`,
      ...options.headers,
    },
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(errorData.error || `HTTP ${response.status}`);
  }
  
  return response.json();
};

// Blog Posts API
export const blogPostsApi = {
  async getAll() {
    if (!supabase) throw new Error('Supabase client not available');
    
    try {
      const result = await apiCall('/api/blog-posts');
      return result.data as BlogPost[];
    } catch {
      // Fallback to direct Supabase call
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('publishedAt', { ascending: false });
      
      if (error) throw error;
      return data as BlogPost[];
    }
  },

  async create(blogPost: Omit<BlogPost, 'id' | 'updatedAt'>) {
    if (!supabase) throw new Error('Supabase client not available');
    
    try {
      const result = await apiCall('/api/blog-posts', {
        method: 'POST',
        body: JSON.stringify(blogPost),
      });
      return result.data as BlogPost;
    } catch {
      // Fallback to direct Supabase call
      const { data, error } = await supabase
        .from('blog_posts')
        .insert({
          ...blogPost,
          updatedAt: new Date().toISOString()
        })
        .select()
        .single();
      
      if (error) throw error;
      return data as BlogPost;
    }
  },

  async update(id: string, updates: Partial<Omit<BlogPost, 'id'>>) {
    if (!supabase) throw new Error('Supabase client not available');
    
    const { data, error } = await supabase
      .from('blog_posts')
      .update({
        ...updates,
        updatedAt: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as BlogPost;
  },

  async delete(id: string) {
    if (!supabase) throw new Error('Supabase client not available');
    
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  async getBySlug(slug: string) {
    if (!supabase) throw new Error('Supabase client not available');
    
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();
    
    if (error) throw error;
    return data as BlogPost;
  }
};

// Portfolio Items API
export const portfolioApi = {
  async getAll() {
    if (!supabase) throw new Error('Supabase client not available');
    
    const { data, error } = await supabase
      .from('portfolio_items')
      .select('*')
      .order('completedAt', { ascending: false });
    
    if (error) throw error;
    return data as PortfolioItem[];
  },

  async create(item: Omit<PortfolioItem, 'id'>) {
    if (!supabase) throw new Error('Supabase client not available');
    
    const { data, error } = await supabase
      .from('portfolio_items')
      .insert(item)
      .select()
      .single();
    
    if (error) throw error;
    return data as PortfolioItem;
  },

  async update(id: string, updates: Partial<Omit<PortfolioItem, 'id'>>) {
    if (!supabase) throw new Error('Supabase client not available');
    
    const { data, error } = await supabase
      .from('portfolio_items')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as PortfolioItem;
  },

  async delete(id: string) {
    if (!supabase) throw new Error('Supabase client not available');
    
    const { error } = await supabase
      .from('portfolio_items')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

// Authentication helpers
export const authApi = {
  async signIn(email: string, password: string) {
    if (!supabase) throw new Error('Supabase client not available');
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    return data;
  },

  async signOut() {
    if (!supabase) throw new Error('Supabase client not available');
    
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentUser() {
    if (!supabase) return null;
    
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  onAuthStateChange(callback: (user: any) => void) {
    if (!supabase) {
      callback(null);
      return { data: { subscription: { unsubscribe: () => {} } } };
    }
    
    return supabase.auth.onAuthStateChange((event, session) => {
      callback(session?.user || null);
    });
  }
};

// Check Supabase connection
export const checkSupabaseConnection = async (): Promise<boolean> => {
  if (!supabase) return false;
  
  try {
    const { data, error } = await supabase.from('blog_posts').select('count').limit(1);
    return !error;
  } catch {
    return false;
  }
};