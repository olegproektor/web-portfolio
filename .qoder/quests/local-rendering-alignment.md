# Local Rendering Alignment with Figma Design

## Overview
This document outlines the plan to align the local rendering of the web portfolio with the Figma design specifications at [https://www.figma.com/make/6olmItVRsZ0YUgGGz1A4HU/Адаптивный-сайт-визитка-специалиста](https://www.figma.com/make/6olmItVRsZ0YUgGGz1A4HU/%D0%90%D0%B4%D0%B0%D0%BF%D1%82%D0%B8%D0%B2%D0%BD%D1%8B%D0%B9-%D1%81%D0%B0%D0%B9%D1%82-%D0%B2%D0%B8%D0%B7%D0%B8%D1%82%D0%BA%D0%B0-%D1%81%D0%BF%D0%B5%D1%86%D0%B8%D0%B0%D0%BB%D0%B8%D1%81%D1%82%D0%B0?t=00NeH1a4NIPg08LZ-6). The goal is to ensure that the local development environment accurately reflects the visual design from Figma, including proper implementation of theme variables, custom properties, and styling.

## Current State Analysis
Based on the codebase analysis, the project currently uses:
- Tailwind CSS with custom theme configuration
- CSS custom properties for color management
- A globals.css file with existing theme definitions
- React components with Tailwind classes
- Experimental @theme inline syntax already partially implemented

## Figma Design Integration Plan

### 1. Theme Variable Integration
- Extract color palette, typography, and spacing values from Figma
- Map Figma design tokens to CSS custom properties
- Update globals.css with Figma variables

### 2. CSS Custom Properties Implementation
- Fully implement experimental @theme inline syntax as specified
- Ensure all design tokens are available as CSS variables
- Validate variable naming consistency with Figma

### 3. Component Styling Alignment
- Review each component against Figma designs
- Adjust styling to match Figma specifications
- Ensure proper font rendering and text styles

### 4. Validation Process
- Verify fill colors match Figma
- Check block layout and positioning
- Validate typography styles (font family, size, weight)

## Implementation Steps

### Step 1: Extract Figma Design Tokens
- Create an MCP script to download theme.css or JSON styles from Figma
- Parse design tokens (colors, typography, spacing)
- Map to existing CSS custom properties

**MCP Script Requirements:**
- Access Figma API to extract design tokens
- Generate theme.css file with CSS custom properties
- Handle both light and dark theme variants
- Export typography scales and spacing values

**MCP Script Implementation:**
```javascript
// figma-theme-extractor.js
const fetch = require('node-fetch');

async function extractFigmaTokens(figmaFileId, accessToken) {
  // Fetch Figma design tokens
  const response = await fetch(
    `https://api.figma.com/v1/files/${figmaFileId}/styles`,
    {
      headers: {
        'X-Figma-Token': accessToken
      }
    }
  );
  
  const data = await response.json();
  
  // Parse color styles
  const colorTokens = {};
  const typographyTokens = {};
  
  // Generate CSS custom properties
  let cssContent = ':root {\n';
  
  // Add color tokens
  for (const [key, value] of Object.entries(colorTokens)) {
    cssContent += `  --${key}: ${value};\n`;
  }
  
  cssContent += '}\n\n';
  
  // Add dark theme
  cssContent += '.dark {\n';
  // Add dark theme tokens
  cssContent += '}\n';
  
  return cssContent;
}

module.exports = { extractFigmaTokens };
```

### Step 2: Update Theme Configuration
- Modify globals.css to include Figma variables in the :root section
- Ensure proper implementation of @theme inline directive with all design tokens
- Verify dark mode variables align with Figma dark theme

### Step 3: Component Alignment
- Review Hero component against Figma design
- Align button styles with Figma specifications
- Ensure proper spacing and layout matching using Tailwind classes

### Step 4: Validation and Testing
- Compare local rendering with Figma design
- Verify responsive behavior matches Figma
- Test dark/light mode transitions

## Technical Implementation Details

### @theme inline Syntax Implementation
The project already has partial implementation of the experimental @theme inline syntax. We need to ensure all CSS custom properties are properly mapped:

```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-input-background: var(--input-background);
  --color-switch-background: var(--switch-background);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}
```

### CSS Custom Properties Structure
The globals.css file should be organized with:
1. Font imports from Google Fonts
2. Light theme variables in :root
3. Dark theme variables in .dark
4. @theme inline directive mapping all variables
5. Base styles and utility classes

### Figma Design Token Integration
We need to create a mapping between Figma design tokens and CSS custom properties:

| Figma Token | CSS Variable | Current Value | Figma Value |
|-------------|--------------|---------------|-------------|
| Primary Color | --primary | #0F172A | TBD |
| Background Color | --background | #F7F9FC | TBD |
| Font Family | font-family | Inter, Manrope | TBD |
| Border Radius | --radius | 0.75rem | TBD |
| Foreground Color | --foreground | #0F172A | TBD |
| Card Background | --card | #ffffff | TBD |
| Muted Text | --muted-foreground | #64748B | TBD |

## Files to be Modified
- `src/styles/globals.css` - Theme variables and @theme inline implementation
- Component files as needed for styling adjustments

## Expected Outcomes
- Local rendering visually matches Figma design
- Proper implementation of design tokens
- Consistent styling across all components
- Responsive design alignment with Figma specifications

## Validation Criteria
- [ ] Fill colors match Figma specifications
- [ ] Block layout and positioning align with Figma
- [ ] Typography styles (font family, size, weight) match Figma
- [ ] Component styling is consistent with Figma designs
- [ ] Responsive behavior matches Figma breakpoints- Extract color palette, typography, and spacing values from Figma
- Map Figma design tokens to CSS custom properties
- Update theme.css with Figma variables

### 2. CSS Custom Properties Implementation
- Implement experimental @theme inline syntax as specified
- Ensure all design tokens are available as CSS variables
- Validate variable naming consistency with Figma

### 3. Component Styling Alignment
- Review each component against Figma designs
- Adjust styling to match Figma specifications
- Ensure proper font rendering and text styles

### 4. Validation Process
- Verify fill colors match Figma
- Check block layout and positioning
- Validate typography styles (font family, size, weight)

## Implementation Steps

### Step 1: Extract Figma Design Tokens
- Download theme.css or JSON styles from Figma
- Parse design tokens (colors, typography, spacing)
- Map to existing CSS custom properties

### Step 2: Update Theme Configuration
- Modify globals.css to include Figma variables
- Implement @theme inline directive with proper syntax
- Ensure dark mode variables align with Figma dark theme

### Step 3: Component Alignment
- Review Hero component against Figma design
- Align button styles with Figma specifications
- Ensure proper spacing and layout matching

### Step 4: Validation and Testing
- Compare local rendering with Figma design
- Verify responsive behavior matches Figma
- Test dark/light mode transitions

## Validation and Testing Procedures

### Visual Comparison Checklist
- [ ] Color palette accuracy (primary, secondary, accent colors)
- [ ] Typography consistency (font family, sizes, weights)
- [ ] Spacing and layout alignment
- [ ] Component styling (buttons, cards, inputs)
- [ ] Gradient implementations
- [ ] Shadow and elevation effects

### Responsive Design Validation
- [ ] Mobile breakpoint alignment
- [ ] Tablet breakpoint alignment
- [ ] Desktop breakpoint alignment
- [ ] Component resizing behavior

### Theme Switching Validation
- [ ] Light mode color accuracy
- [ ] Dark mode color accuracy
- [ ] Smooth transition between themes
- [ ] Persistence of theme preference

## Files to be Modified
- `src/styles/globals.css` - Theme variables and @theme inline implementation
- Component files as needed for styling adjustments

## Expected Outcomes
- Local rendering visually matches Figma design
- Proper implementation of design tokens
- Consistent styling across all components
- Responsive design alignment with Figma specifications

## Implementation Approach

### Phase 1: Foundation Alignment (Days 1-2)
1. Extract Figma design tokens using MCP script
2. Update CSS custom properties in globals.css
3. Implement complete @theme inline directive
4. Validate color palette accuracy

### Phase 2: Component Alignment (Days 3-4)
1. Align Hero component with Figma design
2. Update button styles to match Figma specifications
3. Ensure typography consistency across components
4. Validate spacing and layout alignment

### Phase 3: Validation and Refinement (Days 5-6)
1. Conduct visual comparison with Figma design
2. Test responsive behavior across breakpoints
3. Validate theme switching functionality
4. Refine any discrepancies

## Validation Criteria
- [ ] Fill colors match Figma specifications
- [ ] Block layout and positioning align with Figma
- [ ] Typography styles (font family, size, weight) match Figma
- [ ] Component styling is consistent with Figma designs
- [ ] Responsive behavior matches Figma breakpoints

## Conclusion

By following this alignment process, we will ensure that the local rendering of the web portfolio accurately reflects the Figma design specifications. The implementation of the experimental @theme inline syntax and proper integration of CSS custom properties will create a consistent design system that matches the visual design from Figma. Regular validation against the Figma design will ensure ongoing alignment as the project evolves.






































































