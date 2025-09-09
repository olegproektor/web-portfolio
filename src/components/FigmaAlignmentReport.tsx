// Figma Alignment Validation Report
// This component serves as a validation tool to check color palette accuracy and typography consistency

import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

const FigmaAlignmentReport = () => {
  // Color palette validation
  const colorPalette = {
    primary: 'var(--primary)',
    secondary: 'var(--secondary)',
    accent: 'var(--accent)',
    background: 'var(--background)',
    foreground: 'var(--foreground)',
    muted: 'var(--muted)',
    'muted-foreground': 'var(--muted-foreground)',
    destructive: 'var(--destructive)',
    border: 'var(--border)',
  };

  // Typography validation
  const typography = {
    'Heading 1': 'text-4xl sm:text-5xl lg:text-6xl font-bold',
    'Heading 2': 'text-2xl lg:text-3xl font-bold',
    'Heading 3': 'text-xl lg:text-2xl font-semibold',
    'Heading 4': 'text-lg lg:text-xl font-medium',
    'Body Text': 'text-base text-muted-foreground',
    'Small Text': 'text-sm text-muted-foreground',
  };

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Figma Alignment Validation Report</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Color Palette Validation */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6">Color Palette Validation</h2>
          <div className="space-y-4">
            {Object.entries(colorPalette).map(([name, variable]) => (
              <div key={name} className="flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded-md border" 
                  style={{ backgroundColor: `var(${variable})` }}
                ></div>
                <div>
                  <h3 className="font-medium capitalize">{name}</h3>
                  <p className="text-sm text-muted-foreground">{variable}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
        
        {/* Typography Validation */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6">Typography Validation</h2>
          <div className="space-y-6">
            {Object.entries(typography).map(([name, classes]) => (
              <div key={name}>
                <h3 className="font-medium mb-2">{name}</h3>
                <p className={classes}>
                  The quick brown fox jumps over the lazy dog
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
      
      {/* Gradient Validation */}
      <Card className="p-6 mt-8">
        <h2 className="text-2xl font-bold mb-6">Gradient Validation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-2">Primary Gradient</h3>
            <div 
              className="h-24 rounded-md flex items-center justify-center text-white font-medium"
              style={{ background: 'var(--gradient-primary)' }}
            >
              Primary Gradient
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-2">Secondary Gradient</h3>
            <div 
              className="h-24 rounded-md flex items-center justify-center text-white font-medium"
              style={{ background: 'var(--gradient-secondary)' }}
            >
              Secondary Gradient
            </div>
          </div>
        </div>
      </Card>
      
      {/* Shadow Validation */}
      <Card className="p-6 mt-8">
        <h2 className="text-2xl font-bold mb-6">Shadow Validation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-2">Soft Shadow</h3>
            <div className="h-24 rounded-md bg-card flex items-center justify-center shadow-soft border">
              Soft Shadow
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-2">Medium Shadow</h3>
            <div className="h-24 rounded-md bg-card flex items-center justify-center shadow-medium border">
              Medium Shadow
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FigmaAlignmentReport;