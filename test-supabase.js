// Test Supabase connection
const { createClient } = require('@supabase/supabase-js');

// Use the same configuration as in your application
const supabaseUrl = 'https://agnfvrtumarvysiuyeyh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnbmZ2cnR1bWFydnlzaXV5ZXloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxMTU1MzYsImV4cCI6MjA3MjY5MTUzNn0.rd7uaQTDQK5J5iKttCgJZcI4z2-SfZ8gWuyJo2i9tko';

console.log('Testing Supabase connection...');
console.log('URL:', supabaseUrl);
console.log('Key length:', supabaseAnonKey.length);

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Test a simple query
supabase
  .from('portfolio_items')
  .select('count')
  .limit(1)
  .then(response => {
    console.log('Connection test result:', response);
  })
  .catch(error => {
    console.error('Connection test error:', error);
  });