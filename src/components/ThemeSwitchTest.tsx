// Theme Switching Validation Component
// This component helps validate light/dark mode functionality

import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Sun, Moon } from 'lucide-react';

const ThemeSwitchTest = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Check system preference or saved theme
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else if (systemPrefersDark) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Theme Switching Validation</h1>
      
      {/* Theme Toggle */}
      <Card className="p-6 mb-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Current Theme: {theme}</h2>
          <Button onClick={toggleTheme} size="lg">
            {theme === 'light' ? (
              <>
                <Moon className="w-5 h-5 mr-2" />
                Switch to Dark
              </>
            ) : (
              <>
                <Sun className="w-5 h-5 mr-2" />
                Switch to Light
              </>
            )}
          </Button>
        </div>
      </Card>
      
      {/* Color Palette Comparison */}
      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6">Color Palette Comparison</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Light Theme Colors */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Light Theme</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-md bg-background border"></div>
                <div>
                  <p className="font-medium">Background</p>
                  <p className="text-sm text-muted-foreground">#F7F9FC</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-md bg-card border"></div>
                <div>
                  <p className="font-medium">Card</p>
                  <p className="text-sm text-muted-foreground">#FFFFFF</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-md bg-primary"></div>
                <div>
                  <p className="font-medium text-white">Primary</p>
                  <p className="text-sm text-muted-foreground">#0F172A</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-md bg-secondary border"></div>
                <div>
                  <p className="font-medium">Secondary</p>
                  <p className="text-sm text-muted-foreground">#F1F5F9</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Dark Theme Colors */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Dark Theme</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-md bg-background border"></div>
                <div>
                  <p className="font-medium">Background</p>
                  <p className="text-sm text-muted-foreground">#0F172A</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-md bg-card border"></div>
                <div>
                  <p className="font-medium">Card</p>
                  <p className="text-sm text-muted-foreground">#1E293B</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-md bg-primary"></div>
                <div>
                  <p className="font-medium text-white">Primary</p>
                  <p className="text-sm text-muted-foreground">#F8FAFC</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-md bg-secondary border"></div>
                <div>
                  <p className="font-medium">Secondary</p>
                  <p className="text-sm text-muted-foreground">#334155</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Component Theme Testing */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Component Theme Testing</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-lg bg-card border shadow-medium">
            <h3 className="text-lg font-semibold mb-3">Card Component</h3>
            <p className="text-muted-foreground mb-4">
              This card should adapt to the current theme with appropriate background and text colors.
            </p>
            <Button>Sample Button</Button>
          </div>
          
          <div className="p-6 rounded-lg bg-gradient-bg text-white">
            <h3 className="text-lg font-semibold mb-3">Gradient Background</h3>
            <p className="mb-4 opacity-90">
              This section uses the gradient background which should be visible in both themes.
            </p>
            <Button variant="secondary">Sample Button</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ThemeSwitchTest;