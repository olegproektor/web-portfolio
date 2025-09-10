-- Supabase Schema Setup for Portfolio Website
-- Execute this script in the Supabase SQL Editor

-- Create blog_posts table
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
);

-- Create portfolio_items table
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
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS blog_posts_status_idx ON blog_posts(status);
CREATE INDEX IF NOT EXISTS blog_posts_published_at_idx ON blog_posts(publishedAt);
CREATE INDEX IF NOT EXISTS blog_posts_slug_idx ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS portfolio_items_category_idx ON portfolio_items(category);
CREATE INDEX IF NOT EXISTS portfolio_items_status_idx ON portfolio_items(status);
CREATE INDEX IF NOT EXISTS portfolio_items_featured_idx ON portfolio_items(featured);

-- Create function for automatic updatedAt column update
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updatedAt = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updatedAt column
CREATE TRIGGER update_blog_posts_updated_at 
    BEFORE UPDATE ON blog_posts 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS) for both tables
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to published blog posts" ON blog_posts
    FOR SELECT USING (status = 'published');

CREATE POLICY "Allow public read access to portfolio items" ON portfolio_items
    FOR SELECT USING (true);

-- Create policies for authenticated users (full access)
CREATE POLICY "Allow authenticated users full access to blog posts" ON blog_posts
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users full access to portfolio items" ON portfolio_items
    FOR ALL USING (auth.role() = 'authenticated');

-- Insert sample data to verify the setup
INSERT INTO blog_posts (title, slug, excerpt, content, author, publishedAt, status, tags, readTime) VALUES
('Welcome to Your Portfolio', 'welcome-to-portfolio', 'This is your first blog post', '# Welcome to Your Portfolio CMS

Congratulations on setting up your portfolio CMS with Supabase!

## Getting Started

You can now manage all your content through the admin panel:

- Create and edit blog posts
- Manage portfolio items
- Upload images
- Control content visibility

## Next Steps

1. Log in to the CMS panel using your Supabase credentials
2. Start adding your real content
3. Customize the design to match your brand

Enjoy your new CMS-powered portfolio!', 'Admin User', NOW(), 'published', ARRAY['welcome', 'cms'], 2);

INSERT INTO portfolio_items (title, description, longDescription, technologies, category, status, completedAt, priority, featured) VALUES
('Sample Project', 'This is a sample project to demonstrate the CMS functionality', '# Sample Project

This is a sample project created to demonstrate the CMS functionality.

## Features

- **Full CRUD operations**: Create, read, update, and delete projects
- **Technology tags**: Organize projects by technologies used
- **Category system**: Group projects by category
- **Priority ordering**: Control the display order of projects
- **Featured projects**: Highlight important projects

## Technologies Used

This sample project showcases the following technologies:

- React
- TypeScript
- Supabase
- Tailwind CSS', ARRAY['React', 'TypeScript', 'Supabase', 'Tailwind CSS'], 'Web Development', 'completed', NOW(), 1, true);

-- Verify the data was inserted
SELECT 'Blog posts count: ' || COUNT(*) FROM blog_posts;
SELECT 'Portfolio items count: ' || COUNT(*) FROM portfolio_items;

-- Success message
SELECT '✅ Database schema successfully created and sample data inserted!' as result;