import { useState, useEffect } from 'react';
import { blogPostsApi, portfolioApi, authApi, supabase } from '../lib/supabase';
import { BlogPost, PortfolioItem } from '../contexts/CMSContext';

interface UseSupabaseCMSReturn {
  // Data
  blogPosts: BlogPost[];
  portfolioItems: PortfolioItem[];
  
  // Loading states
  isLoading: boolean;
  isLoadingBlog: boolean;
  isLoadingPortfolio: boolean;
  
  // Auth
  isAuthenticated: boolean;
  user: any;
  
  // Blog operations
  createBlogPost: (post: Omit<BlogPost, 'id' | 'updatedAt'>) => Promise<BlogPost>;
  updateBlogPost: (id: string, updates: Partial<BlogPost>) => Promise<BlogPost>;
  deleteBlogPost: (id: string) => Promise<void>;
  
  // Portfolio operations
  createPortfolioItem: (item: Omit<PortfolioItem, 'id'>) => Promise<PortfolioItem>;
  updatePortfolioItem: (id: string, updates: Partial<PortfolioItem>) => Promise<PortfolioItem>;
  deletePortfolioItem: (id: string) => Promise<void>;
  
  // Auth operations
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  
  // Utility
  refetch: () => Promise<void>;
  error: string | null;
}

export const useSupabaseCMS = (): UseSupabaseCMSReturn => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [isLoadingBlog, setIsLoadingBlog] = useState(false);
  const [isLoadingPortfolio, setIsLoadingPortfolio] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState<string | null>(null);

  const isLoading = isLoadingBlog || isLoadingPortfolio;
  const isAuthenticated = !!user;

  // Load data on mount only if Supabase is available
  useEffect(() => {
    if (!supabase) {
      console.log('Supabase not available, skipping data loading');
      return;
    }

    loadBlogPosts();
    loadPortfolioItems();
    checkUser();
    
    // Set up auth state listener
    const { data: authListener } = authApi.onAuthStateChange(setUser);
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const loadBlogPosts = async () => {
    if (!supabase) {
      console.log('Supabase not available for blog posts');
      return;
    }

    try {
      setIsLoadingBlog(true);
      const posts = await blogPostsApi.getAll();
      setBlogPosts(posts);
      setError(null);
    } catch (err) {
      console.error('Failed to load blog posts:', err);
      setError(err instanceof Error ? err.message : 'Failed to load blog posts');
    } finally {
      setIsLoadingBlog(false);
    }
  };

  const loadPortfolioItems = async () => {
    if (!supabase) {
      console.log('Supabase not available for portfolio items');
      return;
    }

    try {
      setIsLoadingPortfolio(true);
      const items = await portfolioApi.getAll();
      setPortfolioItems(items);
      setError(null);
    } catch (err) {
      console.error('Failed to load portfolio items:', err);
      setError(err instanceof Error ? err.message : 'Failed to load portfolio items');
    } finally {
      setIsLoadingPortfolio(false);
    }
  };

  const checkUser = async () => {
    if (!supabase) {
      return;
    }

    try {
      const currentUser = await authApi.getCurrentUser();
      setUser(currentUser);
    } catch (err) {
      console.error('Failed to check user:', err);
    }
  };

  // Blog operations
  const createBlogPost = async (post: Omit<BlogPost, 'id' | 'updatedAt'>): Promise<BlogPost> => {
    try {
      const newPost = await blogPostsApi.create(post);
      setBlogPosts(prev => [newPost, ...prev]);
      setError(null);
      return newPost;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create blog post';
      setError(errorMessage);
      throw err;
    }
  };

  const updateBlogPost = async (id: string, updates: Partial<BlogPost>): Promise<BlogPost> => {
    try {
      const updatedPost = await blogPostsApi.update(id, updates);
      setBlogPosts(prev => prev.map(post => post.id === id ? updatedPost : post));
      setError(null);
      return updatedPost;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update blog post';
      setError(errorMessage);
      throw err;
    }
  };

  const deleteBlogPost = async (id: string): Promise<void> => {
    try {
      await blogPostsApi.delete(id);
      setBlogPosts(prev => prev.filter(post => post.id !== id));
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete blog post';
      setError(errorMessage);
      throw err;
    }
  };

  // Portfolio operations
  const createPortfolioItem = async (item: Omit<PortfolioItem, 'id'>): Promise<PortfolioItem> => {
    try {
      const newItem = await portfolioApi.create(item);
      setPortfolioItems(prev => [newItem, ...prev]);
      setError(null);
      return newItem;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create portfolio item';
      setError(errorMessage);
      throw err;
    }
  };

  const updatePortfolioItem = async (id: string, updates: Partial<PortfolioItem>): Promise<PortfolioItem> => {
    try {
      const updatedItem = await portfolioApi.update(id, updates);
      setPortfolioItems(prev => prev.map(item => item.id === id ? updatedItem : item));
      setError(null);
      return updatedItem;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update portfolio item';
      setError(errorMessage);
      throw err;
    }
  };

  const deletePortfolioItem = async (id: string): Promise<void> => {
    try {
      await portfolioApi.delete(id);
      setPortfolioItems(prev => prev.filter(item => item.id !== id));
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete portfolio item';
      setError(errorMessage);
      throw err;
    }
  };

  // Auth operations
  const signIn = async (email: string, password: string) => {
    try {
      const result = await authApi.signIn(email, password);
      setError(null);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to sign in';
      setError(errorMessage);
      throw err;
    }
  };

  const signOut = async () => {
    try {
      await authApi.signOut();
      setUser(null);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to sign out';
      setError(errorMessage);
      throw err;
    }
  };

  const refetch = async () => {
    await Promise.all([loadBlogPosts(), loadPortfolioItems()]);
  };

  return {
    // Data
    blogPosts,
    portfolioItems,
    
    // Loading states
    isLoading,
    isLoadingBlog,
    isLoadingPortfolio,
    
    // Auth
    isAuthenticated,
    user,
    
    // Blog operations
    createBlogPost,
    updateBlogPost,
    deleteBlogPost,
    
    // Portfolio operations
    createPortfolioItem,
    updatePortfolioItem,
    deletePortfolioItem,
    
    // Auth operations
    signIn,
    signOut,
    
    // Utility
    refetch,
    error,
  };
};