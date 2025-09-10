# 🌐 Environment Configuration: Development vs Production

## Overview

This document describes the differences in environment configuration between development and production modes, as well as how to set them up to ensure consistent application behavior.

## 📁 Environment Files

The project supports the following environment configuration files:

```
project/
├── .env                    # Shared environment variables (all modes)
├── .env.example           # Example configuration file
├── .env.development       # Development-specific variables
├── .env.production        # Production-specific variables
├── .env.local            # Local variables (ignored by Git)
├── .env.development.local # Local development variables
└── .env.production.local  # Local production variables
```

## 🔧 Default Environment Variables

### Shared Variables

```env
# Google Analytics
VITE_GA_ID=G-DEVELOPMENT

# Supabase Configuration
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=

# Node Environment
NODE_ENV=development
```

### Development-Specific Variables

File `.env.development`:
```env
# Development-specific variables
NODE_ENV=development
VITE_GA_ID=G-DEVELOPMENT
```

### Production-Specific Variables

File `.env.production`:
```env
# Production-specific variables
NODE_ENV=production
# VITE_GA_ID should be set to actual GA ID in deployment platform
```

## 🔄 Environment Variable Priority

Environment variables are loaded with the following priority (highest to lowest):

1. **System environment variables** (export in shell, Docker environment, platform variables)
2. **.env.production.local** or **.env.development.local** (if exists)
3. **.env.local** (if exists)
4. **.env.production** or **.env.development** (depending on NODE_ENV)
5. **.env**
6. **Default values in code**

## 🎯 Operating Modes

### Demo Mode (Default)

**When active:**
- `VITE_SUPABASE_URL` is not set or empty
- `VITE_SUPABASE_ANON_KEY` is not set or empty

**Characteristics:**
- ✅ Works immediately without setup
- ✅ Rich test data
- ✅ Full UI functionality
- ✅ CMS panel available (password: `admin123`)
- ⚠️ Read-only, no new content creation

### Development Mode

**When active:**
- `NODE_ENV=development`
- `VITE_GA_ID=G-DEVELOPMENT` (or not set)

**Characteristics:**
- 🐞 Hot reload on code changes
- 📊 Source maps for debugging
- 🚫 Google Analytics disabled
- 🧪 Demo data for content
- 🛠 Development with instant feedback

### Production Mode

**When active:**
- `NODE_ENV=production`
- `VITE_GA_ID=G-XXXXXXXXXX` (real ID)

**Characteristics:**
- ⚡ Optimized build
- 🗜 Code and resource minification
- ✅ Google Analytics enabled
- 🔒 Production security headers
- 🚀 Maximum performance

### Full Supabase Mode

**When active:**
- `VITE_SUPABASE_URL` is set with real URL
- `VITE_SUPABASE_ANON_KEY` is set with real key

**Characteristics:**
- ✅ Cloud data storage
- ✅ Full CRUD management
- ✅ Authentication system
- ✅ Real-time capabilities
- ✅ Scalability

## 🐳 Docker Configuration

### Passing Variables to Docker

Docker Compose automatically passes environment variables:

```yaml
version: '3.8'
services:
  portfolio-website-dev:
    build:
      context: .
      dockerfile: Dockerfile.dev
    environment:
      - NODE_ENV=development
    env_file:
      - .env
      - .env.development
```

### Variable Priority in Docker

1. **environment** in docker-compose.yml (highest priority)
2. **env_file** in docker-compose.yml
3. **Variables from .env files**
4. **Host system environment variables** (lowest priority)

## ☁️ Platform Deployment

### Vercel

**Environment Variables in project settings:**
```
VITE_GA_ID=G-XXXXXXXXXX
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Netlify

**Environment Variables in site settings:**
```
VITE_GA_ID=G-XXXXXXXXXX
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Other Platforms

For other platforms, follow their documentation for setting environment variables.

## 🔍 Configuration Debugging

### Checking Current Environment

1. **In browser:**
   ```javascript
   console.log('NODE_ENV:', import.meta.env.MODE)
   console.log('VITE_GA_ID:', import.meta.env.VITE_GA_ID)
   console.log('VITE_SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL)
   ```

2. **In Docker container:**
   ```bash
   docker exec -it container_name env
   ```

3. **In application logs:**
   Look for messages about current operating mode

### Common Issues

#### 1. Variables not passed
**Solution:** Check variable priority and ensure they are not overwritten

#### 2. Demo mode instead of Supabase
**Solution:** Check `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` correctness

#### 3. Google Analytics not working
**Solution:** Ensure `VITE_GA_ID` is set and not equal to `G-DEVELOPMENT`

#### 4. Differences between dev and prod
**Solution:** Check `.env.development` and `.env.production` files

## 🛠 Recommendations

### For Development
- Use `.env.development.local` for local settings
- Do not commit files with real keys
- Use `G-DEVELOPMENT` to disable GA in development

### For Production
- Set environment variables at platform level
- Use real values for `VITE_GA_ID` and Supabase
- Check configuration before deployment

### For Team Work
- Document all environment variables in `.env.example`
- Use the same variable names in all environments
- Create checklists for deployment with proper configuration

## 📚 See Also

- [DEVELOPMENT_SETUP.md](DEVELOPMENT_SETUP.md) - Development environment setup
- [SUPABASE_INTEGRATION_GUIDE.md](SUPABASE_INTEGRATION_GUIDE.md) - Supabase integration
- [GOOGLE_ANALYTICS_SETUP.md](GOOGLE_ANALYTICS_SETUP.md) - Google Analytics setup
- [DOCKER_LOCAL_SETUP.md](DOCKER_LOCAL_SETUP.md) - Local Docker setup