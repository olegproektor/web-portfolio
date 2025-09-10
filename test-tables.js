// Test if tables exist in Supabase database
const { createClient } = require('@supabase/supabase-js');

// Configuration from your .env file
const supabaseUrl = 'https://agnfvrtumarvysiuyeyh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnbmZ2cnR1bWFydnlzaXV5ZXloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxMTU1MzYsImV4cCI6MjA3MjY5MTUzNn0.rd7uaQTDQK5J5iKttCgJZcI4z2-SfZ8gWuyJo2i9tko';

console.log('Testing if tables exist in Supabase database...');
console.log('Project URL:', supabaseUrl);

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testTables() {
  try {
    // Test if blog_posts table exists
    console.log('\n1. Testing blog_posts table...');
    const { data: blogData, error: blogError } = await supabase
      .from('blog_posts')
      .select('count')
      .limit(1);
    
    if (blogError) {
      console.log('   blog_posts table does not exist or is not accessible');
      console.log('   Error:', blogError.message);
    } else {
      console.log('   blog_posts table exists and is accessible');
    }
    
    // Test if portfolio_items table exists
    console.log('\n2. Testing portfolio_items table...');
    const { data: portfolioData, error: portfolioError } = await supabase
      .from('portfolio_items')
      .select('count')
      .limit(1);
    
    if (portfolioError) {
      console.log('   portfolio_items table does not exist or is not accessible');
      console.log('   Error:', portfolioError.message);
    } else {
      console.log('   portfolio_items table exists and is accessible');
    }
    
    // If tables don't exist, we need to create them
    if (blogError || portfolioError) {
      console.log('\n=== Tables need to be created ===');
      console.log('Please execute the SQL commands from init-database.js in your Supabase SQL Editor');
      console.log('Or run the following commands in the Supabase SQL Editor:\n');
      
      console.log('-- Create blog_posts table');
      console.log('CREATE TABLE IF NOT EXISTS blog_posts (');
      console.log('  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,');
      console.log('  title TEXT NOT NULL,');
      console.log('  slug TEXT UNIQUE NOT NULL,');
      console.log('  excerpt TEXT,');
      console.log('  content TEXT NOT NULL,');
      console.log('  author TEXT NOT NULL,');
      console.log('  publishedAt TIMESTAMP WITH TIME ZONE NOT NULL,');
      console.log('  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),');
      console.log('  status TEXT CHECK (status IN (\'draft\', \'published\')) DEFAULT \'draft\',');
      console.log('  tags TEXT[] DEFAULT \'{}\',');
      console.log('  readTime INTEGER DEFAULT 5,');
      console.log('  featuredImage TEXT,');
      console.log('  seoTitle TEXT,');
      console.log('  seoDescription TEXT');
      console.log(');');
      
      console.log('\n-- Create portfolio_items table');
      console.log('CREATE TABLE IF NOT EXISTS portfolio_items (');
      console.log('  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,');
      console.log('  title TEXT NOT NULL,');
      console.log('  description TEXT NOT NULL,');
      console.log('  longDescription TEXT,');
      console.log('  technologies TEXT[] NOT NULL,');
      console.log('  category TEXT NOT NULL,');
      console.log('  status TEXT CHECK (status IN (\'planning\', \'in-progress\', \'completed\', \'on-hold\')) NOT NULL,');
      console.log('  startDate DATE,');
      console.log('  completedAt TIMESTAMP WITH TIME ZONE,');
      console.log('  githubUrl TEXT,');
      console.log('  liveUrl TEXT,');
      console.log('  images TEXT[] DEFAULT \'{}\',');
      console.log('  featured BOOLEAN DEFAULT FALSE,');
      console.log('  priority INTEGER DEFAULT 0');
      console.log(');');
    } else {
      console.log('\n=== Both tables exist ===');
      console.log('Your database is properly configured!');
    }
  } catch (error) {
    console.error('Error testing tables:', error);
  }
}

// Run the test
testTables();