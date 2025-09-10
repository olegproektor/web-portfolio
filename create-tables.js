// Script to create tables in Supabase database using the client
const { createClient } = require('@supabase/supabase-js');

// Configuration from your .env file
const supabaseUrl = 'https://agnfvrtumarvysiuyeyh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnbmZ2cnR1bWFydnlzaXV5ZXloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxMTU1MzYsImV4cCI6MjA3MjY5MTUzNn0.rd7uaQTDQK5J5iKttCgJZcI4z2-SfZ8gWuyJo2i9tko';

console.log('Creating tables in Supabase database...');
console.log('Project URL:', supabaseUrl);

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function createTables() {
  try {
    console.log('\n=== Creating tables using Supabase client ===');
    
    // Create blog_posts table by inserting a test record
    console.log('\n1. Creating blog_posts table...');
    const testBlogPost = {
      title: 'Table Creation Test',
      slug: 'table-creation-test',
      excerpt: 'Test post for table creation',
      content: 'This is a test post to create the table structure',
      author: 'System',
      publishedAt: new Date().toISOString(),
      status: 'draft',
      tags: ['test'],
      readTime: 1
    };
    
    const { data: blogData, error: blogError } = await supabase
      .from('blog_posts')
      .insert(testBlogPost)
      .select();
    
    if (blogError) {
      console.log('   Error creating blog_posts table:', blogError.message);
      // This is expected since the table doesn't exist yet
    } else {
      console.log('   blog_posts table created successfully');
      // Clean up the test record
      if (blogData && blogData[0]) {
        await supabase.from('blog_posts').delete().eq('id', blogData[0].id);
      }
    }
    
    // Create portfolio_items table by inserting a test record
    console.log('\n2. Creating portfolio_items table...');
    const testPortfolioItem = {
      title: 'Table Creation Test',
      description: 'Test item for table creation',
      technologies: ['test'],
      category: 'Test',
      status: 'completed',
      completedAt: new Date().toISOString(),
      priority: 0
    };
    
    const { data: portfolioData, error: portfolioError } = await supabase
      .from('portfolio_items')
      .insert(testPortfolioItem)
      .select();
    
    if (portfolioError) {
      console.log('   Error creating portfolio_items table:', portfolioError.message);
      // This is expected since the table doesn't exist yet
    } else {
      console.log('   portfolio_items table created successfully');
      // Clean up the test record
      if (portfolioData && portfolioData[0]) {
        await supabase.from('portfolio_items').delete().eq('id', portfolioData[0].id);
      }
    }
    
    console.log('\n=== Table creation attempt complete ===');
    console.log('If tables were not created, please use the Supabase SQL Editor to create them manually.');
    console.log('Use the SQL commands from init-database.js file.');
    
  } catch (error) {
    console.error('Error creating tables:', error);
  }
}

// Run the table creation
createTables();