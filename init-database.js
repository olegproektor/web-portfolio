// Script to initialize Supabase database schema
const { createClient } = require('@supabase/supabase-js');

// Configuration from your .env file
const supabaseUrl = 'https://agnfvrtumarvysiuyeyh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnbmZ2cnR1bWFydnlzaXV5ZXloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxMTU1MzYsImV4cCI6MjA3MjY5MTUzNn0.rd7uaQTDQK5J5iKttCgJZcI4z2-SfZ8gWuyJo2i9tko';

console.log('Initializing Supabase database schema...');
console.log('Project URL:', supabaseUrl);

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Function to execute SQL commands
async function executeSQL(sql) {
  try {
    // Note: Supabase JS client doesn't directly support raw SQL execution
    // We'll need to use the REST API or create the tables through the client
    console.log('SQL execution would happen here in a real implementation');
    console.log('For now, please execute the SQL commands in the Supabase SQL Editor');
    return { data: null, error: null };
  } catch (error) {
    console.error('Error executing SQL:', error);
    return { data: null, error };
  }
}

// SQL schema for blog_posts table
const createBlogPostsTable = `
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  publishedAt TIMESTAMP WITH TIME ZONE NOT NULL,
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT CHECK (status IN ('draft', 'published')) DEFAULT 'draft',
  tags TEXT[] DEFAULT '{}',
  readTime INTEGER DEFAULT 5,
  featuredImage TEXT,
  seoTitle TEXT,
  seoDescription TEXT
);`;

// SQL schema for portfolio_items table
const createPortfolioItemsTable = `
CREATE TABLE IF NOT EXISTS portfolio_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  longDescription TEXT,
  technologies TEXT[] NOT NULL,
  category TEXT NOT NULL,
  status TEXT CHECK (status IN ('planning', 'in-progress', 'completed', 'on-hold')) NOT NULL,
  startDate DATE,
  completedAt TIMESTAMP WITH TIME ZONE,
  githubUrl TEXT,
  liveUrl TEXT,
  images TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT FALSE,
  priority INTEGER DEFAULT 0
);`;

// Create indexes
const createIndexes = `
CREATE INDEX IF NOT EXISTS blog_posts_status_idx ON blog_posts(status);
CREATE INDEX IF NOT EXISTS blog_posts_published_at_idx ON blog_posts(publishedAt);
CREATE INDEX IF NOT EXISTS blog_posts_slug_idx ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS portfolio_items_category_idx ON portfolio_items(category);
CREATE INDEX IF NOT EXISTS portfolio_items_status_idx ON portfolio_items(status);
CREATE INDEX IF NOT EXISTS portfolio_items_featured_idx ON portfolio_items(featured);
`;

// Create function for updating updatedAt
const createFunction = `
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updatedAt = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';
`;

// Create triggers
const createTriggers = `
CREATE TRIGGER update_blog_posts_updated_at 
    BEFORE UPDATE ON blog_posts 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
`;

// Enable RLS
const enableRLS = `
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;
`;

// Create policies
const createPolicies = `
CREATE POLICY "Allow public read access to published blog posts" ON blog_posts
    FOR SELECT USING (status = 'published');

CREATE POLICY "Allow public read access to portfolio items" ON portfolio_items
    FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users full access to blog posts" ON blog_posts
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users full access to portfolio items" ON portfolio_items
    FOR ALL USING (auth.role() = 'authenticated');
`;

async function initializeDatabase() {
  console.log('=== Initializing Database Schema ===');
  
  console.log('\n1. Please execute the following SQL commands in your Supabase SQL Editor:');
  console.log('\n--- Create blog_posts table ---');
  console.log(createBlogPostsTable);
  
  console.log('\n--- Create portfolio_items table ---');
  console.log(createPortfolioItemsTable);
  
  console.log('\n--- Create indexes ---');
  console.log(createIndexes);
  
  console.log('\n--- Create function ---');
  console.log(createFunction);
  
  console.log('\n--- Create triggers ---');
  console.log(createTriggers);
  
  console.log('\n--- Enable RLS ---');
  console.log(enableRLS);
  
  console.log('\n--- Create policies ---');
  console.log(createPolicies);
  
  console.log('\n2. After executing the SQL commands, insert some sample data:');
  console.log(`
-- Insert sample blog post
INSERT INTO blog_posts (title, slug, excerpt, content, author, publishedAt, status, tags, readTime) VALUES
('Welcome to Your Portfolio', 'welcome-to-portfolio', 'This is your first blog post', 'Congratulations on setting up your portfolio CMS!', 'Admin User', NOW(), 'published', ARRAY['welcome', 'cms'], 1);

-- Insert sample portfolio item
INSERT INTO portfolio_items (title, description, technologies, category, status, completedAt, priority) VALUES
('Sample Project', 'This is a sample project to demonstrate the CMS', ARRAY['React', 'TypeScript', 'Supabase'], 'Web Development', 'completed', NOW(), 1);
  `);
  
  console.log('\n=== Database initialization instructions complete ===');
  console.log('Please follow the instructions above to set up your database schema.');
}

// Run the initialization
initializeDatabase().catch(console.error);