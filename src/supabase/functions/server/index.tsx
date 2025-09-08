import { Hono } from 'npm:hono'
import { cors } from 'npm:hono/cors'
import { logger } from 'npm:hono/logger'
import { createClient } from 'npm:@supabase/supabase-js@2'
import * as kv from './kv_store.tsx'

interface BlogPost {
  id?: string
  title: string
  slug: string
  excerpt?: string
  content: string
  author: string
  publishedAt: string
  updatedAt?: string
  status: 'draft' | 'published'
  tags: string[]
  readTime?: number
  featuredImage?: string
  seoTitle?: string
  seoDescription?: string
}

interface PortfolioItem {
  id?: string
  title: string
  description: string
  longDescription?: string
  technologies: string[]
  category: string
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold'
  startDate?: string
  completedAt?: string
  githubUrl?: string
  liveUrl?: string
  images: string[]
  featured: boolean
  priority: number
}

interface ProfileData {
  id?: string
  name: string
  title: string
  description: string
  location: string
  avatar: string
  availableForWork: boolean
  githubUrl?: string
  linkedinUrl?: string
  email?: string
  phone?: string
  updatedAt?: string
}

interface Experience {
  id?: string
  title: string
  company: string
  location?: string
  startDate: string
  endDate?: string
  current: boolean
  description: string
  achievements: string[]
  technologies: string[]
  priority: number
}

interface Skill {
  id?: string
  name: string
  category: 'technical' | 'management' | 'design' | 'analytics' | 'other'
  level: number // 1-5
  description?: string
  priority: number
}

interface Education {
  id?: string
  degree: string
  institution: string
  location?: string
  startDate: string
  endDate?: string
  current: boolean
  description?: string
  achievements: string[]
  priority: number
}

const app = new Hono()

// CORS configuration
app.use('*', cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'https://*.vercel.app', 'https://*.netlify.app'],
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}))

app.use('*', logger(console.log))

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

// Utility function to verify authentication
async function verifyAuth(authHeader: string | null) {
  if (!authHeader?.startsWith('Bearer ')) {
    return null
  }
  
  const token = authHeader.split(' ')[1]
  const { data: { user }, error } = await supabase.auth.getUser(token)
  
  if (error || !user) {
    return null
  }
  
  return user
}

// Health check
app.get('/make-server-c2360911/health', (c) => {
  return c.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'portfolio-cms-server'
  })
})

// Blog Posts Routes (Updated to match DynamicCMSContext expectations)
app.get('/make-server-c2360911/api/blog', async (c) => {
  try {
    const blogPosts = await kv.get('blogPosts') || []
    return c.json({ data: blogPosts })
  } catch (error) {
    console.error('Server error fetching blog posts:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// Legacy endpoint for compatibility
app.get('/make-server-c2360911/api/blog-posts', async (c) => {
  try {
    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .order('publishedAt', { ascending: false })
    
    if (error) {
      console.error('Error fetching blog posts:', error)
      return c.json({ error: 'Failed to fetch blog posts' }, 500)
    }
    
    return c.json({ data: posts })
  } catch (error) {
    console.error('Server error fetching blog posts:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

app.post('/make-server-c2360911/api/blog', async (c) => {
  const authHeader = c.req.header('Authorization')
  const user = await verifyAuth(authHeader)
  
  if (!user) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  
  try {
    const body = await c.req.json()
    const newPost = {
      id: crypto.randomUUID(),
      ...body,
      updatedAt: new Date().toISOString()
    }
    
    const existingPosts = await kv.get('blogPosts') || []
    const updatedPosts = [newPost, ...existingPosts]
    
    await kv.set('blogPosts', updatedPosts)
    return c.json({ data: newPost })
  } catch (error) {
    console.error('Server error creating blog post:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// Legacy endpoint for compatibility
app.post('/make-server-c2360911/api/blog-posts', async (c) => {
  const authHeader = c.req.header('Authorization')
  const user = await verifyAuth(authHeader)
  
  if (!user) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  
  try {
    const body = await c.req.json() as BlogPost
    
    const { data: post, error } = await supabase
      .from('blog_posts')
      .insert({
        ...body,
        updatedAt: new Date().toISOString()
      })
      .select()
      .single()
    
    if (error) {
      console.error('Error creating blog post:', error)
      return c.json({ error: 'Failed to create blog post' }, 500)
    }
    
    return c.json({ data: post })
  } catch (error) {
    console.error('Server error creating blog post:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// Blog PUT/DELETE for DynamicCMSContext
app.put('/make-server-c2360911/api/blog/:id', async (c) => {
  const authHeader = c.req.header('Authorization')
  const user = await verifyAuth(authHeader)
  
  if (!user) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  
  try {
    const id = c.req.param('id')
    const body = await c.req.json()
    
    const existingPosts = await kv.get('blogPosts') || []
    const postIndex = existingPosts.findIndex((p: any) => p.id === id)
    
    if (postIndex === -1) {
      return c.json({ error: 'Blog post not found' }, 404)
    }
    
    const updatedPost = {
      ...existingPosts[postIndex],
      ...body,
      updatedAt: new Date().toISOString()
    }
    
    existingPosts[postIndex] = updatedPost
    await kv.set('blogPosts', existingPosts)
    
    return c.json({ data: updatedPost })
  } catch (error) {
    console.error('Server error updating blog post:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

app.delete('/make-server-c2360911/api/blog/:id', async (c) => {
  const authHeader = c.req.header('Authorization')
  const user = await verifyAuth(authHeader)
  
  if (!user) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  
  try {
    const id = c.req.param('id')
    
    const existingPosts = await kv.get('blogPosts') || []
    const updatedPosts = existingPosts.filter((p: any) => p.id !== id)
    
    await kv.set('blogPosts', updatedPosts)
    return c.json({ message: 'Blog post deleted successfully' })
  } catch (error) {
    console.error('Server error deleting blog post:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// Legacy endpoints
app.put('/make-server-c2360911/api/blog-posts/:id', async (c) => {
  const authHeader = c.req.header('Authorization')
  const user = await verifyAuth(authHeader)
  
  if (!user) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  
  try {
    const id = c.req.param('id')
    const body = await c.req.json() as Partial<BlogPost>
    
    const { data: post, error } = await supabase
      .from('blog_posts')
      .update({
        ...body,
        updatedAt: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating blog post:', error)
      return c.json({ error: 'Failed to update blog post' }, 500)
    }
    
    return c.json({ data: post })
  } catch (error) {
    console.error('Server error updating blog post:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

app.delete('/make-server-c2360911/api/blog-posts/:id', async (c) => {
  const authHeader = c.req.header('Authorization')
  const user = await verifyAuth(authHeader)
  
  if (!user) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  
  try {
    const id = c.req.param('id')
    
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error deleting blog post:', error)
      return c.json({ error: 'Failed to delete blog post' }, 500)
    }
    
    return c.json({ message: 'Blog post deleted successfully' })
  } catch (error) {
    console.error('Server error deleting blog post:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// Portfolio Items Routes
app.get('/make-server-c2360911/api/portfolio-items', async (c) => {
  try {
    const { data: items, error } = await supabase
      .from('portfolio_items')
      .select('*')
      .order('priority', { ascending: false })
    
    if (error) {
      console.error('Error fetching portfolio items:', error)
      return c.json({ error: 'Failed to fetch portfolio items' }, 500)
    }
    
    return c.json({ data: items })
  } catch (error) {
    console.error('Server error fetching portfolio items:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

app.post('/make-server-c2360911/api/portfolio-items', async (c) => {
  const authHeader = c.req.header('Authorization')
  const user = await verifyAuth(authHeader)
  
  if (!user) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  
  try {
    const body = await c.req.json() as PortfolioItem
    
    const { data: item, error } = await supabase
      .from('portfolio_items')
      .insert(body)
      .select()
      .single()
    
    if (error) {
      console.error('Error creating portfolio item:', error)
      return c.json({ error: 'Failed to create portfolio item' }, 500)
    }
    
    return c.json({ data: item })
  } catch (error) {
    console.error('Server error creating portfolio item:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

app.put('/make-server-c2360911/api/portfolio-items/:id', async (c) => {
  const authHeader = c.req.header('Authorization')
  const user = await verifyAuth(authHeader)
  
  if (!user) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  
  try {
    const id = c.req.param('id')
    const body = await c.req.json() as Partial<PortfolioItem>
    
    const { data: item, error } = await supabase
      .from('portfolio_items')
      .update(body)
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating portfolio item:', error)
      return c.json({ error: 'Failed to update portfolio item' }, 500)
    }
    
    return c.json({ data: item })
  } catch (error) {
    console.error('Server error updating portfolio item:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

app.delete('/make-server-c2360911/api/portfolio-items/:id', async (c) => {
  const authHeader = c.req.header('Authorization')
  const user = await verifyAuth(authHeader)
  
  if (!user) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  
  try {
    const id = c.req.param('id')
    
    const { error } = await supabase
      .from('portfolio_items')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error deleting portfolio item:', error)
      return c.json({ error: 'Failed to delete portfolio item' }, 500)
    }
    
    return c.json({ message: 'Portfolio item deleted successfully' })
  } catch (error) {
    console.error('Server error deleting portfolio item:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// Authentication Routes
app.post('/make-server-c2360911/api/auth/signup', async (c) => {
  try {
    const { email, password, name } = await c.req.json()
    
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    })
    
    if (error) {
      console.error('Error creating user:', error)
      return c.json({ error: error.message }, 400)
    }
    
    return c.json({ data })
  } catch (error) {
    console.error('Server error creating user:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// Data Migration Route
app.post('/make-server-c2360911/api/migrate-data', async (c) => {
  const authHeader = c.req.header('Authorization')
  const user = await verifyAuth(authHeader)
  
  if (!user) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  
  try {
    const { blogPosts, portfolioItems } = await c.req.json()
    
    let migratedBlogPosts = 0
    let migratedPortfolioItems = 0
    
    // Migrate blog posts
    if (blogPosts && Array.isArray(blogPosts)) {
      for (const post of blogPosts) {
        const { data, error } = await supabase
          .from('blog_posts')
          .upsert({
            ...post,
            updatedAt: new Date().toISOString()
          })
          .select()
        
        if (!error) migratedBlogPosts++
      }
    }
    
    // Migrate portfolio items
    if (portfolioItems && Array.isArray(portfolioItems)) {
      for (const item of portfolioItems) {
        const { data, error } = await supabase
          .from('portfolio_items')
          .upsert(item)
          .select()
        
        if (!error) migratedPortfolioItems++
      }
    }
    
    return c.json({ 
      message: 'Migration completed',
      results: {
        blogPosts: migratedBlogPosts,
        portfolioItems: migratedPortfolioItems
      }
    })
  } catch (error) {
    console.error('Server error during migration:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// Analytics Route
app.get('/make-server-c2360911/api/analytics', async (c) => {
  const authHeader = c.req.header('Authorization')
  const user = await verifyAuth(authHeader)
  
  if (!user) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  
  try {
    // Get blog posts count and views
    const { count: blogCount } = await supabase
      .from('blog_posts')
      .select('*', { count: 'exact', head: true })
    
    // Get portfolio items count
    const { count: portfolioCount } = await supabase
      .from('portfolio_items')
      .select('*', { count: 'exact', head: true })
    
    // Generate analytics data (this would connect to Google Analytics in production)
    const analytics = {
      overview: {
        totalViews: Math.floor(Math.random() * 10000) + 5000,
        totalBlogPosts: blogCount || 0,
        totalProjects: portfolioCount || 0,
        avgReadTime: '4.2'
      },
      pageViews: [
        { name: 'Главная', views: Math.floor(Math.random() * 2000) + 1000 },
        { name: 'Блог', views: Math.floor(Math.random() * 1500) + 800 },
        { name: 'Портфолио', views: Math.floor(Math.random() * 1200) + 600 },
        { name: 'О себе', views: Math.floor(Math.random() * 800) + 400 }
      ],
      topPosts: [],
      recentActivity: []
    }
    
    return c.json({ data: analytics })
  } catch (error) {
    console.error('Server error fetching analytics:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// Initialize storage buckets on startup
async function initializeStorage() {
  try {
    const bucketName = 'make-c2360911-images'
    const { data: buckets } = await supabase.storage.listBuckets()
    const bucketExists = buckets?.some(bucket => bucket.name === bucketName)
    
    if (!bucketExists) {
      await supabase.storage.createBucket(bucketName, {
        public: false,
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
        fileSizeLimit: 5242880 // 5MB
      })
      console.log(`Created bucket: ${bucketName}`)
    }
  } catch (error) {
    console.error('Error initializing storage:', error)
  }
}

// Image upload route
app.post('/make-server-c2360911/api/upload-image', async (c) => {
  const authHeader = c.req.header('Authorization')
  const user = await verifyAuth(authHeader)
  
  if (!user) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  
  try {
    const formData = await c.req.formData()
    const file = formData.get('image') as File
    
    if (!file) {
      return c.json({ error: 'No image file provided' }, 400)
    }
    
    const bucketName = 'make-c2360911-images'
    const fileName = `${Date.now()}-${file.name}`
    const arrayBuffer = await file.arrayBuffer()
    
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(fileName, arrayBuffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false
      })
    
    if (error) {
      console.error('Error uploading image:', error)
      return c.json({ error: 'Failed to upload image' }, 500)
    }
    
    // Get signed URL for the uploaded image
    const { data: signedUrlData } = await supabase.storage
      .from(bucketName)
      .createSignedUrl(fileName, 60 * 60 * 24 * 365) // 1 year expiry
    
    return c.json({ 
      data: {
        path: data.path,
        url: signedUrlData?.signedUrl
      }
    })
  } catch (error) {
    console.error('Server error uploading image:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// Profile Data Routes
app.get('/make-server-c2360911/api/profile', async (c) => {
  try {
    const profileData = await kv.get('profile')
    if (!profileData) {
      // Return default profile data
      const defaultProfile: ProfileData = {
        name: 'Олег Кононенко',
        title: 'Product Manager полного цикла',
        description: 'Я трансформирую идеи в решения, объединяя IT, управление проектами и креативный дизайн. От реконструкции IKEA и внедрения CRM-систем до создания онлайн-семинаров и изучения ИИ — я нахожу комплексные подходы к задачам любого масштаба.',
        location: 'Краснодар, Россия',
        avatar: 'https://images.unsplash.com/photo-1652471943570-f3590a4e52ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMGJ1c2luZXNzbWFufGVufDF8fHx8MTc1Njk5NDE5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        availableForWork: true,
        githubUrl: 'https://github.com/olegproektor',
        linkedinUrl: 'https://www.linkedin.com/in/kononenkooleg',
        email: 'oleg@example.com'
      }
      return c.json({ data: defaultProfile })
    }
    return c.json({ data: profileData })
  } catch (error) {
    console.error('Server error fetching profile:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

app.put('/make-server-c2360911/api/profile', async (c) => {
  const authHeader = c.req.header('Authorization')
  const user = await verifyAuth(authHeader)
  
  if (!user) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  
  try {
    const body = await c.req.json() as ProfileData
    const updatedProfile = {
      ...body,
      updatedAt: new Date().toISOString()
    }
    
    await kv.set('profile', updatedProfile)
    return c.json({ data: updatedProfile })
  } catch (error) {
    console.error('Server error updating profile:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// Experience Routes
app.get('/make-server-c2360911/api/experience', async (c) => {
  try {
    const experienceData = await kv.get('experience') || []
    return c.json({ data: experienceData })
  } catch (error) {
    console.error('Server error fetching experience:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

app.post('/make-server-c2360911/api/experience', async (c) => {
  const authHeader = c.req.header('Authorization')
  const user = await verifyAuth(authHeader)
  
  if (!user) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  
  try {
    const body = await c.req.json() as Experience
    const newExperience = {
      ...body,
      id: crypto.randomUUID()
    }
    
    const currentData = await kv.get('experience') || []
    const updatedData = [...currentData, newExperience]
    
    await kv.set('experience', updatedData)
    return c.json({ data: newExperience })
  } catch (error) {
    console.error('Server error creating experience:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

app.put('/make-server-c2360911/api/experience/:id', async (c) => {
  const authHeader = c.req.header('Authorization')
  const user = await verifyAuth(authHeader)
  
  if (!user) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  
  try {
    const id = c.req.param('id')
    const body = await c.req.json() as Partial<Experience>
    
    const currentData = await kv.get('experience') || []
    const updatedData = currentData.map((item: Experience) => 
      item.id === id ? { ...item, ...body } : item
    )
    
    await kv.set('experience', updatedData)
    const updatedItem = updatedData.find((item: Experience) => item.id === id)
    
    return c.json({ data: updatedItem })
  } catch (error) {
    console.error('Server error updating experience:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

app.delete('/make-server-c2360911/api/experience/:id', async (c) => {
  const authHeader = c.req.header('Authorization')
  const user = await verifyAuth(authHeader)
  
  if (!user) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  
  try {
    const id = c.req.param('id')
    const currentData = await kv.get('experience') || []
    const updatedData = currentData.filter((item: Experience) => item.id !== id)
    
    await kv.set('experience', updatedData)
    return c.json({ message: 'Experience deleted successfully' })
  } catch (error) {
    console.error('Server error deleting experience:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// Skills Routes
app.get('/make-server-c2360911/api/skills', async (c) => {
  try {
    const skillsData = await kv.get('skills') || []
    return c.json({ data: skillsData })
  } catch (error) {
    console.error('Server error fetching skills:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

app.post('/make-server-c2360911/api/skills', async (c) => {
  const authHeader = c.req.header('Authorization')
  const user = await verifyAuth(authHeader)
  
  if (!user) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  
  try {
    const body = await c.req.json() as Skill
    const newSkill = {
      ...body,
      id: crypto.randomUUID()
    }
    
    const currentData = await kv.get('skills') || []
    const updatedData = [...currentData, newSkill]
    
    await kv.set('skills', updatedData)
    return c.json({ data: newSkill })
  } catch (error) {
    console.error('Server error creating skill:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

app.put('/make-server-c2360911/api/skills/:id', async (c) => {
  const authHeader = c.req.header('Authorization')
  const user = await verifyAuth(authHeader)
  
  if (!user) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  
  try {
    const id = c.req.param('id')
    const body = await c.req.json() as Partial<Skill>
    
    const currentData = await kv.get('skills') || []
    const updatedData = currentData.map((item: Skill) => 
      item.id === id ? { ...item, ...body } : item
    )
    
    await kv.set('skills', updatedData)
    const updatedItem = updatedData.find((item: Skill) => item.id === id)
    
    return c.json({ data: updatedItem })
  } catch (error) {
    console.error('Server error updating skill:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

app.delete('/make-server-c2360911/api/skills/:id', async (c) => {
  const authHeader = c.req.header('Authorization')
  const user = await verifyAuth(authHeader)
  
  if (!user) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  
  try {
    const id = c.req.param('id')
    const currentData = await kv.get('skills') || []
    const updatedData = currentData.filter((item: Skill) => item.id !== id)
    
    await kv.set('skills', updatedData)
    return c.json({ message: 'Skill deleted successfully' })
  } catch (error) {
    console.error('Server error deleting skill:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// Education Routes
app.get('/make-server-c2360911/api/education', async (c) => {
  try {
    const educationData = await kv.get('education') || []
    return c.json({ data: educationData })
  } catch (error) {
    console.error('Server error fetching education:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

app.post('/make-server-c2360911/api/education', async (c) => {
  const authHeader = c.req.header('Authorization')
  const user = await verifyAuth(authHeader)
  
  if (!user) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  
  try {
    const body = await c.req.json() as Education
    const newEducation = {
      ...body,
      id: crypto.randomUUID()
    }
    
    const currentData = await kv.get('education') || []
    const updatedData = [...currentData, newEducation]
    
    await kv.set('education', updatedData)
    return c.json({ data: newEducation })
  } catch (error) {
    console.error('Server error creating education:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

app.put('/make-server-c2360911/api/education/:id', async (c) => {
  const authHeader = c.req.header('Authorization')
  const user = await verifyAuth(authHeader)
  
  if (!user) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  
  try {
    const id = c.req.param('id')
    const body = await c.req.json() as Partial<Education>
    
    const currentData = await kv.get('education') || []
    const updatedData = currentData.map((item: Education) => 
      item.id === id ? { ...item, ...body } : item
    )
    
    await kv.set('education', updatedData)
    const updatedItem = updatedData.find((item: Education) => item.id === id)
    
    return c.json({ data: updatedItem })
  } catch (error) {
    console.error('Server error updating education:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

app.delete('/make-server-c2360911/api/education/:id', async (c) => {
  const authHeader = c.req.header('Authorization')
  const user = await verifyAuth(authHeader)
  
  if (!user) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  
  try {
    const id = c.req.param('id')
    const currentData = await kv.get('education') || []
    const updatedData = currentData.filter((item: Education) => item.id !== id)
    
    await kv.set('education', updatedData)
    return c.json({ message: 'Education deleted successfully' })
  } catch (error) {
    console.error('Server error deleting education:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// Seed data route for initial setup
app.post('/make-server-c2360911/api/seed-data', async (c) => {
  const authHeader = c.req.header('Authorization')
  const user = await verifyAuth(authHeader)
  
  if (!user) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  
  try {
    // Seed default experience data
    const defaultExperience: Experience[] = [
      {
        id: crypto.randomUUID(),
        title: 'Product Manager',
        company: 'IKEA',
        location: 'Краснодар',
        startDate: '2020-01-01',
        current: true,
        description: 'Руководство реконструкцией торгового центра',
        achievements: [
          'Управление бюджетом более 100 млн рублей',
          'Координация команды 50+ специалистов',
          'Внедрение новых процессов управления'
        ],
        technologies: ['Project Management', 'Agile', 'Scrum'],
        priority: 1
      }
    ]
    
    // Seed default skills data
    const defaultSkills: Skill[] = [
      {
        id: crypto.randomUUID(),
        name: 'Project Management',
        category: 'management',
        level: 5,
        description: 'Управление проектами различной сложности',
        priority: 1
      },
      {
        id: crypto.randomUUID(),
        name: 'Product Strategy',
        category: 'management',
        level: 4,
        description: 'Разработка продуктовой стратег��и',
        priority: 2
      },
      {
        id: crypto.randomUUID(),
        name: 'Data Analysis',
        category: 'analytics',
        level: 4,
        description: 'Анализ ��анных и метрик',
        priority: 3
      }
    ]
    
    // Seed default education data
    const defaultEducation: Education[] = [
      {
        id: crypto.randomUUID(),
        degree: 'Магистратура по управлению проектами',
        institution: 'Кубанский государственный университет',
        location: 'Краснодар',
        startDate: '2018-09-01',
        endDate: '2020-06-01',
        current: false,
        description: 'Специализация на управлении проектами в IT',
        achievements: [
          'Диплом с отличием',
          'Участие в международных конференциях'
        ],
        priority: 1
      }
    ]
    
    await kv.set('experience', defaultExperience)
    await kv.set('skills', defaultSkills)
    await kv.set('education', defaultEducation)
    
    return c.json({ 
      message: 'Default data seeded successfully',
      data: {
        experience: defaultExperience.length,
        skills: defaultSkills.length,
        education: defaultEducation.length
      }
    })
  } catch (error) {
    console.error('Server error seeding data:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// Initialize storage on startup
initializeStorage()

console.log('Portfolio CMS Server starting...')

Deno.serve(app.fetch)