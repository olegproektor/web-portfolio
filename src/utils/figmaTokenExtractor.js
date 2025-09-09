/**
 * Figma Design Token Extractor
 * This script extracts design tokens from Figma and maps them to CSS custom properties
 */

// Mock Figma design tokens based on the existing implementation
const figmaDesignTokens = {
  // Color Tokens
  colors: {
    // Primary Colors
    primary: {
      50: '#F0F9FF',
      100: '#E0F2FE',
      200: '#BAE6FD',
      300: '#7DD3FC',
      400: '#38BDF8',
      500: '#0EA5E9',
      600: '#0284C7',
      700: '#0369A1',
      800: '#075985',
      900: '#0C4A6E',
    },
    
    // Neutral Colors
    neutral: {
      50: '#F8FAFC',
      100: '#F1F5F9',
      200: '#E2E8F0',
      300: '#CBD5E1',
      400: '#94A3B8',
      500: '#64748B',
      600: '#475569',
      700: '#334155',
      800: '#1E293B',
      900: '#0F172A',
    },
    
    // Semantic Colors
    semantic: {
      background: '#F7F9FC',
      foreground: '#0F172A',
      card: '#FFFFFF',
      'card-foreground': '#0F172A',
      popover: '#FFFFFF',
      'popover-foreground': '#0F172A',
      primary: '#0F172A',
      'primary-foreground': '#FFFFFF',
      secondary: '#F1F5F9',
      'secondary-foreground': '#0F172A',
      muted: '#F1F5F9',
      'muted-foreground': '#64748B',
      accent: '#E2E8F0',
      'accent-foreground': '#0F172A',
      destructive: '#EF4444',
      'destructive-foreground': '#FFFFFF',
      border: '#E2E8F0',
      input: '#FFFFFF',
      ring: '#2563EB',
    },
    
    // Chart Colors
    chart: {
      1: '#14B8A6',
      2: '#2563EB',
      3: '#8B5CF6',
      4: '#F59E0B',
      5: '#EF4444',
    },
    
    // Sidebar Colors
    sidebar: {
      background: '#F7F9FC',
      foreground: '#0F172A',
      primary: '#0F172A',
      'primary-foreground': '#F7F9FC',
      accent: '#F1F5F9',
      'accent-foreground': '#0F172A',
      border: '#E2E8F0',
      ring: '#2563EB',
    }
  },
  
  // Typography Tokens
  typography: {
    fontFamily: {
      sans: ['Inter', 'Manrope', 'system-ui', '-apple-system', 'sans-serif'],
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
      '7xl': '4.5rem',
    },
    fontWeight: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
    lineHeight: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    },
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    }
  },
  
  // Spacing Tokens
  spacing: {
    0: '0px',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    32: '8rem',
    40: '10rem',
    48: '12rem',
    56: '14rem',
    64: '16rem',
  },
  
  // Radius Tokens
  radius: {
    none: '0px',
    sm: 'calc(0.75rem - 4px)',
    md: 'calc(0.75rem - 2px)',
    lg: '0.75rem',
    xl: 'calc(0.75rem + 4px)',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },
  
  // Shadow Tokens
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -1px rgb(0 0 0 / 0.06)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.06)',
    none: 'none',
  }
};

/**
 * Maps Figma design tokens to CSS custom properties
 * @returns {string} CSS custom properties string
 */
function generateCSSCustomProperties() {
  let css = '/* Figma Design Tokens mapped to CSS Custom Properties */\n';
  css += ':root {\n';
  
  // Color Tokens
  css += '  /* Color Tokens */\n';
  css += `  --background: ${figmaDesignTokens.colors.semantic.background};\n`;
  css += `  --foreground: ${figmaDesignTokens.colors.semantic.foreground};\n`;
  css += `  --card: ${figmaDesignTokens.colors.semantic.card};\n`;
  css += `  --card-foreground: ${figmaDesignTokens.colors.semantic['card-foreground']};\n`;
  css += `  --popover: ${figmaDesignTokens.colors.semantic.popover};\n`;
  css += `  --popover-foreground: ${figmaDesignTokens.colors.semantic['popover-foreground']};\n`;
  css += `  --primary: ${figmaDesignTokens.colors.semantic.primary};\n`;
  css += `  --primary-foreground: ${figmaDesignTokens.colors.semantic['primary-foreground']};\n`;
  css += `  --secondary: ${figmaDesignTokens.colors.semantic.secondary};\n`;
  css += `  --secondary-foreground: ${figmaDesignTokens.colors.semantic['secondary-foreground']};\n`;
  css += `  --muted: ${figmaDesignTokens.colors.semantic.muted};\n`;
  css += `  --muted-foreground: ${figmaDesignTokens.colors.semantic['muted-foreground']};\n`;
  css += `  --accent: ${figmaDesignTokens.colors.semantic.accent};\n`;
  css += `  --accent-foreground: ${figmaDesignTokens.colors.semantic['accent-foreground']};\n`;
  css += `  --destructive: ${figmaDesignTokens.colors.semantic.destructive};\n`;
  css += `  --destructive-foreground: ${figmaDesignTokens.colors.semantic['destructive-foreground']};\n`;
  css += `  --border: ${figmaDesignTokens.colors.semantic.border};\n`;
  css += `  --input: ${figmaDesignTokens.colors.semantic.input};\n`;
  css += `  --ring: ${figmaDesignTokens.colors.semantic.ring};\n`;
  css += `  --chart-1: ${figmaDesignTokens.colors.chart[1]};\n`;
  css += `  --chart-2: ${figmaDesignTokens.colors.chart[2]};\n`;
  css += `  --chart-3: ${figmaDesignTokens.colors.chart[3]};\n`;
  css += `  --chart-4: ${figmaDesignTokens.colors.chart[4]};\n`;
  css += `  --chart-5: ${figmaDesignTokens.colors.chart[5]};\n`;
  
  // Sidebar Colors
  css += `  --sidebar: ${figmaDesignTokens.colors.sidebar.background};\n`;
  css += `  --sidebar-foreground: ${figmaDesignTokens.colors.sidebar.foreground};\n`;
  css += `  --sidebar-primary: ${figmaDesignTokens.colors.sidebar.primary};\n`;
  css += `  --sidebar-primary-foreground: ${figmaDesignTokens.colors.sidebar['primary-foreground']};\n`;
  css += `  --sidebar-accent: ${figmaDesignTokens.colors.sidebar.accent};\n`;
  css += `  --sidebar-accent-foreground: ${figmaDesignTokens.colors.sidebar['accent-foreground']};\n`;
  css += `  --sidebar-border: ${figmaDesignTokens.colors.sidebar.border};\n`;
  css += `  --sidebar-ring: ${figmaDesignTokens.colors.sidebar.ring};\n`;
  
  // Typography Tokens
  css += '  /* Typography Tokens */\n';
  css += `  --font-size: ${figmaDesignTokens.typography.fontSize.base};\n`;
  css += `  --font-weight-normal: ${figmaDesignTokens.typography.fontWeight.normal};\n`;
  css += `  --font-weight-medium: ${figmaDesignTokens.typography.fontWeight.medium};\n`;
  
  // Radius Tokens
  css += '  /* Radius Tokens */\n';
  css += `  --radius: ${figmaDesignTokens.radius.lg};\n`;
  
  // Custom variables
  css += '  /* Custom Variables */\n';
  css += '  --gradient-primary: linear-gradient(135deg, #14B8A6 0%, #2563EB 100%);\n';
  css += '  --gradient-secondary: linear-gradient(135deg, #14B8A6 0%, #0D9488 100%);\n';
  css += '  --shadow-soft: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);\n';
  css += '  --shadow-medium: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);\n';
  
  css += '}\n\n';
  
  // Dark theme
  css += '.dark {\n';
  css += '  --background: #0F172A;\n';
  css += '  --foreground: #F8FAFC;\n';
  css += '  --card: #1E293B;\n';
  css += '  --card-foreground: #F8FAFC;\n';
  css += '  --popover: #1E293B;\n';
  css += '  --popover-foreground: #F8FAFC;\n';
  css += '  --primary: #F8FAFC;\n';
  css += '  --primary-foreground: #0F172A;\n';
  css += '  --secondary: #334155;\n';
  css += '  --secondary-foreground: #F8FAFC;\n';
  css += '  --muted: #334155;\n';
  css += '  --muted-foreground: #94A3B8;\n';
  css += '  --accent: #475569;\n';
  css += '  --accent-foreground: #F8FAFC;\n';
  css += '  --destructive: #DC2626;\n';
  css += '  --destructive-foreground: #F8FAFC;\n';
  css += '  --border: #334155;\n';
  css += '  --input: #1E293B;\n';
  css += '  --ring: #2563EB;\n';
  css += '}\n';
  
  return css;
}

/**
 * Generates the @theme inline directive with all design tokens
 * @returns {string} @theme inline directive string
 */
function generateThemeInlineDirective() {
  return `@theme inline {
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
}`;
}

module.exports = {
  figmaDesignTokens,
  generateCSSCustomProperties,
  generateThemeInlineDirective
};