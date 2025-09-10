import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { useTheme } from './ThemeProvider';

const DarkModeTest = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Dark Mode Implementation Test</h1>
      
      {/* Theme Toggle */}
      <Card className="p-6 mb-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Current Theme: {theme}</h2>
          <Button onClick={toggleTheme} size="lg">
            Toggle Theme
          </Button>
        </div>
      </Card>
      
      {/* Color Palette Test */}
      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6">Color Palette Test</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Background & Foreground</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-background border">
                <p className="text-foreground">This text should be visible in both themes</p>
                <p className="text-sm text-muted-foreground mt-2">This is muted text</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Components</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-card border">
                <p className="text-card-foreground">Card component</p>
              </div>
              <div className="p-4 rounded-lg bg-primary">
                <p className="text-primary-foreground">Primary component</p>
              </div>
              <div className="p-4 rounded-lg bg-secondary border">
                <p className="text-secondary-foreground">Secondary component</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Button Test */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Button Test</h2>
        <div className="flex flex-wrap gap-4">
          <Button>Default Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="ghost">Ghost Button</Button>
        </div>
      </Card>
    </div>
  );
};

export default DarkModeTest;