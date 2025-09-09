# Figma Design Token Mapping

This document maps Figma design tokens to CSS custom properties used in the application.

## Color Tokens

### Primary Colors
| Figma Token | CSS Variable | Value | Usage |
|-------------|--------------|-------|-------|
| primary-50 | --primary-50 | #F0F9FF | Light primary accent |
| primary-100 | --primary-100 | #E0F2FE | Light primary accent |
| primary-200 | --primary-200 | #BAE6FD | Light primary accent |
| primary-300 | --primary-300 | #7DD3FC | Primary accent |
| primary-400 | --primary-400 | #38BDF8 | Primary accent |
| primary-500 | --primary-500 | #0EA5E9 | Primary color |
| primary-600 | --primary-600 | #0284C7 | Primary color |
| primary-700 | --primary-700 | #0369A1 | Primary color |
| primary-800 | --primary-800 | #075985 | Dark primary |
| primary-900 | --primary-900 | #0C4A6E | Dark primary |

### Neutral Colors
| Figma Token | CSS Variable | Value | Usage |
|-------------|--------------|-------|-------|
| neutral-50 | --neutral-50 | #F8FAFC | Background light |
| neutral-100 | --neutral-100 | #F1F5F9 | Background light |
| neutral-200 | --neutral-200 | #E2E8F0 | Borders |
| neutral-300 | --neutral-300 | #CBD5E1 | Borders |
| neutral-400 | --neutral-400 | #94A3B8 | Muted text |
| neutral-500 | --neutral-500 | #64748B | Muted text |
| neutral-600 | --neutral-600 | #475569 | Text |
| neutral-700 | --neutral-700 | #334155 | Text |
| neutral-800 | --neutral-800 | #1E293B | Cards |
| neutral-900 | --neutral-900 | #0F172A | Text |

### Semantic Colors
| Figma Token | CSS Variable | Value | Usage |
|-------------|--------------|-------|-------|
| background | --background | #F7F9FC | Page background |
| foreground | --foreground | #0F172A | Primary text |
| card | --card | #FFFFFF | Card backgrounds |
| card-foreground | --card-foreground | #0F172A | Card text |
| popover | --popover | #FFFFFF | Popover backgrounds |
| popover-foreground | --popover-foreground | #0F172A | Popover text |
| primary | --primary | #0F172A | Primary buttons |
| primary-foreground | --primary-foreground | #FFFFFF | Primary button text |
| secondary | --secondary | #F1F5F9 | Secondary elements |
| secondary-foreground | --secondary-foreground | #0F172A | Secondary text |
| muted | --muted | #F1F5F9 | Muted backgrounds |
| muted-foreground | --muted-foreground | #64748B | Muted text |
| accent | --accent | #E2E8F0 | Accent elements |
| accent-foreground | --accent-foreground | #0F172A | Accent text |
| destructive | --destructive | #EF4444 | Error states |
| destructive-foreground | --destructive-foreground | #FFFFFF | Error text |
| border | --border | #E2E8F0 | Border colors |
| input | --input | #FFFFFF | Input backgrounds |
| ring | --ring | #2563EB | Focus rings |

### Chart Colors
| Figma Token | CSS Variable | Value | Usage |
|-------------|--------------|-------|-------|
| chart-1 | --chart-1 | #14B8A6 | Chart color 1 |
| chart-2 | --chart-2 | #2563EB | Chart color 2 |
| chart-3 | --chart-3 | #8B5CF6 | Chart color 3 |
| chart-4 | --chart-4 | #F59E0B | Chart color 4 |
| chart-5 | --chart-5 | #EF4444 | Chart color 5 |

### Sidebar Colors
| Figma Token | CSS Variable | Value | Usage |
|-------------|--------------|-------|-------|
| sidebar-background | --sidebar | #F7F9FC | Sidebar background |
| sidebar-foreground | --sidebar-foreground | #0F172A | Sidebar text |
| sidebar-primary | --sidebar-primary | #0F172A | Sidebar primary |
| sidebar-primary-foreground | --sidebar-primary-foreground | #F7F9FC | Sidebar primary text |
| sidebar-accent | --sidebar-accent | #F1F5F9 | Sidebar accent |
| sidebar-accent-foreground | --sidebar-accent-foreground | #0F172A | Sidebar accent text |
| sidebar-border | --sidebar-border | #E2E8F0 | Sidebar borders |
| sidebar-ring | --sidebar-ring | #2563EB | Sidebar focus rings |

## Typography Tokens

### Font Families
| Figma Token | CSS Variable | Value | Usage |
|-------------|--------------|-------|-------|
| font-family-sans | --font-family-sans | Inter, Manrope, system-ui, -apple-system, sans-serif | Default font stack |

### Font Sizes
| Figma Token | CSS Variable | Value | Usage |
|-------------|--------------|-------|-------|
| font-size-xs | --font-size-xs | 0.75rem | Extra small text |
| font-size-sm | --font-size-sm | 0.875rem | Small text |
| font-size-base | --font-size | 1rem | Base text |
| font-size-lg | --font-size-lg | 1.125rem | Large text |
| font-size-xl | --font-size-xl | 1.25rem | Extra large text |
| font-size-2xl | --font-size-2xl | 1.5rem | 2x large text |
| font-size-3xl | --font-size-3xl | 1.875rem | 3x large text |
| font-size-4xl | --font-size-4xl | 2.25rem | 4x large text |
| font-size-5xl | --font-size-5xl | 3rem | 5x large text |
| font-size-6xl | --font-size-6xl | 3.75rem | 6x large text |
| font-size-7xl | --font-size-7xl | 4.5rem | 7x large text |

### Font Weights
| Figma Token | CSS Variable | Value | Usage |
|-------------|--------------|-------|-------|
| font-weight-thin | --font-weight-thin | 100 | Thin text |
| font-weight-extralight | --font-weight-extralight | 200 | Extra light text |
| font-weight-light | --font-weight-light | 300 | Light text |
| font-weight-normal | --font-weight-normal | 400 | Normal text |
| font-weight-medium | --font-weight-medium | 500 | Medium text |
| font-weight-semibold | --font-weight-semibold | 600 | Semi-bold text |
| font-weight-bold | --font-weight-bold | 700 | Bold text |
| font-weight-extrabold | --font-weight-extrabold | 800 | Extra bold text |
| font-weight-black | --font-weight-black | 900 | Black text |

### Line Heights
| Figma Token | CSS Variable | Value | Usage |
|-------------|--------------|-------|-------|
| line-height-none | --line-height-none | 1 | No line height |
| line-height-tight | --line-height-tight | 1.25 | Tight line height |
| line-height-snug | --line-height-snug | 1.375 | Snug line height |
| line-height-normal | --line-height-normal | 1.5 | Normal line height |
| line-height-relaxed | --line-height-relaxed | 1.625 | Relaxed line height |
| line-height-loose | --line-height-loose | 2 | Loose line height |

## Spacing Tokens
| Figma Token | CSS Variable | Value | Usage |
|-------------|--------------|-------|-------|
| spacing-0 | --spacing-0 | 0px | No spacing |
| spacing-1 | --spacing-1 | 0.25rem | Extra small spacing |
| spacing-2 | --spacing-2 | 0.5rem | Small spacing |
| spacing-3 | --spacing-3 | 0.75rem | Small spacing |
| spacing-4 | --spacing-4 | 1rem | Base spacing |
| spacing-5 | --spacing-5 | 1.25rem | Medium spacing |
| spacing-6 | --spacing-6 | 1.5rem | Medium spacing |
| spacing-8 | --spacing-8 | 2rem | Large spacing |
| spacing-10 | --spacing-10 | 2.5rem | Large spacing |
| spacing-12 | --spacing-12 | 3rem | Extra large spacing |
| spacing-16 | --spacing-16 | 4rem | Extra large spacing |
| spacing-20 | --spacing-20 | 5rem | 2x extra large |
| spacing-24 | --spacing-24 | 6rem | 2x extra large |
| spacing-32 | --spacing-32 | 8rem | 3x extra large |
| spacing-40 | --spacing-40 | 10rem | 3x extra large |
| spacing-48 | --spacing-48 | 12rem | 4x extra large |
| spacing-56 | --spacing-56 | 14rem | 4x extra large |
| spacing-64 | --spacing-64 | 16rem | 4x extra large |

## Radius Tokens
| Figma Token | CSS Variable | Value | Usage |
|-------------|--------------|-------|-------|
| radius-none | --radius-none | 0px | No radius |
| radius-sm | --radius-sm | calc(0.75rem - 4px) | Small radius |
| radius-md | --radius-md | calc(0.75rem - 2px) | Medium radius |
| radius-lg | --radius | 0.75rem | Large radius (default) |
| radius-xl | --radius-xl | calc(0.75rem + 4px) | Extra large radius |
| radius-2xl | --radius-2xl | 1rem | 2x extra large |
| radius-3xl | --radius-3xl | 1.5rem | 3x extra large |
| radius-full | --radius-full | 9999px | Full radius |

## Shadow Tokens
| Figma Token | CSS Variable | Value | Usage |
|-------------|--------------|-------|-------|
| shadow-sm | --shadow-sm | 0 1px 2px 0 rgb(0 0 0 / 0.05) | Small shadow |
| shadow-md | --shadow-md | 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -1px rgb(0 0 0 / 0.06) | Medium shadow |
| shadow-lg | --shadow-lg | 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05) | Large shadow |
| shadow-xl | --shadow-xl | 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04) | Extra large shadow |
| shadow-2xl | --shadow-2xl | 0 25px 50px -12px rgb(0 0 0 / 0.25) | 2x extra large shadow |
| shadow-inner | --shadow-inner | inset 0 2px 4px 0 rgb(0 0 0 / 0.06) | Inner shadow |
| shadow-none | --shadow-none | none | No shadow |

## Custom Variables
| Figma Token | CSS Variable | Value | Usage |
|-------------|--------------|-------|-------|
| gradient-primary | --gradient-primary | linear-gradient(135deg, #14B8A6 0%, #2563EB 100%) | Primary gradient |
| gradient-secondary | --gradient-secondary | linear-gradient(135deg, #14B8A6 0%, #0D9488 100%) | Secondary gradient |
| shadow-soft | --shadow-soft | 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) | Soft shadow |
| shadow-medium | --shadow-medium | 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) | Medium shadow |