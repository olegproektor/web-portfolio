// Responsive Testing Component
// This component helps validate responsive behavior across different breakpoints

import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';

const ResponsiveTest = () => {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Responsive Behavior Testing</h1>
      
      {/* Grid Layout Tests */}
      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6">Grid Layouts</h2>
        
        {/* 1 Column Grid */}
        <div className="mb-6">
          <h3 className="font-medium mb-3">1 Column (Mobile)</h3>
          <div className="grid grid-cols-1 gap-4">
            <div className="p-4 bg-accent rounded-md">Column 1</div>
            <div className="p-4 bg-accent rounded-md">Column 2</div>
            <div className="p-4 bg-accent rounded-md">Column 3</div>
          </div>
        </div>
        
        {/* 2 Column Grid */}
        <div className="mb-6">
          <h3 className="font-medium mb-3">2 Columns (Tablet)</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-accent rounded-md">Column 1</div>
            <div className="p-4 bg-accent rounded-md">Column 2</div>
            <div className="p-4 bg-accent rounded-md">Column 3</div>
            <div className="p-4 bg-accent rounded-md">Column 4</div>
          </div>
        </div>
        
        {/* 3 Column Grid */}
        <div className="mb-6">
          <h3 className="font-medium mb-3">3 Columns (Desktop)</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-accent rounded-md">Column 1</div>
            <div className="p-4 bg-accent rounded-md">Column 2</div>
            <div className="p-4 bg-accent rounded-md">Column 3</div>
            <div className="p-4 bg-accent rounded-md">Column 4</div>
            <div className="p-4 bg-accent rounded-md">Column 5</div>
            <div className="p-4 bg-accent rounded-md">Column 6</div>
          </div>
        </div>
      </Card>
      
      {/* Typography Tests */}
      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6">Typography Responsiveness</h2>
        
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl">Heading 1 - Responsive</h1>
          <h2 className="text-2xl lg:text-3xl">Heading 2 - Responsive</h2>
          <h3 className="text-xl lg:text-2xl">Heading 3 - Responsive</h3>
          <h4 className="text-lg lg:text-xl">Heading 4 - Responsive</h4>
          <p className="text-base">Body text that adjusts based on screen size</p>
        </div>
      </Card>
      
      {/* Button Tests */}
      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6">Button Responsiveness</h2>
        
        <div className="flex flex-wrap gap-4">
          <Button size="sm">Small Button</Button>
          <Button>Default Button</Button>
          <Button size="lg">Large Button</Button>
        </div>
      </Card>
      
      {/* Spacing Tests */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Spacing Responsiveness</h2>
        
        <div className="space-y-4 sm:space-y-6 lg:space-y-8">
          <div className="p-4 bg-accent rounded-md">
            <p>Section with responsive padding</p>
          </div>
          <div className="p-4 bg-accent rounded-md">
            <p>Section with responsive padding</p>
          </div>
          <div className="p-4 bg-accent rounded-md">
            <p>Section with responsive padding</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ResponsiveTest;