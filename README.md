# 🚀 Web Portfolio - Олег Кононенко

This is a fully functional dynamic portfolio website with an advanced CMS system, blog management, and project showcase.

[![React](https://img.shields.io/badge/React-18-blue?style=flat&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v3-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Ready-green?style=flat&logo=supabase)](https://supabase.com)

## ✨ Features

### 🎨 **Design & UX**
- 🌗 Light/dark theme support
- 📱 Fully responsive design (Desktop/Tablet/Mobile)
- 🎭 Smooth animations and transitions with Motion
- 🎨 Modern color scheme with gradients
- ⚡ Atomic animations in Hero section

### 🛠 **Dynamic Functionality**
- 🔗 **Full-featured CMS system**: manage all content
- 🗄️ **Supabase integration**: cloud database with API
- 📊 **Hybrid architecture**: automatic fallback to demo data
- 🔄 **Server functions**: 15+ API endpoints
- 📈 **Analytics system** with event tracking
- 🔍 **Search and filtering** for projects and articles
- 📧 **Contact form** with validation
- 🔐 **Authentication system** with Supabase Auth support
- 🔄 **Graceful degradation**: works in any conditions

## 🚀 Quick Start

### Local Setup with Docker (Recommended)

```bash
# Clone the repository
git clone <repository-url>
cd web-portfolio

# Setup environment
cp .env.example .env

# Run in development mode
docker-compose -f src/docker-compose.dev.yml up --build

# Open http://localhost:3000
```

### Standard Installation

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Open http://localhost:5173
```

## ⚙️ Environment Configuration

The application supports different environments through environment variables. Create a `.env` file in the root directory based on `.env.example`:

```env
# Google Analytics (optional)
VITE_GA_ID=G-XXXXXXXXXX

# Supabase Configuration (optional - if not provided, app will use localStorage)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Environment Modes

1. **Demo Mode** (default):
   - Works immediately without setup
   - Rich test data
   - Full UI functionality
   - CMS panel available (password: `admin123`)
   - Read-only, no new content creation

2. **Full Mode with Supabase**:
   - Cloud data storage
   - Full CRUD management
   - Authentication system
   - Real-time capabilities
   - Scalability

## 📁 Project Structure

```
web-portfolio/
├── src/
│   ├── components/              # React components
│   ├── contexts/                # React contexts for state management
│   ├── hooks/                   # Custom React hooks
│   ├── lib/                     # Library integrations (Supabase)
│   ├── styles/                  # CSS styles
│   ├── utils/                   # Utility functions
│   └── README.md               # Detailed project documentation
├── Dockerfile                  # Production Docker configuration
├── Dockerfile.dev              # Development Docker configuration
├── docker-compose.yml          # Production Docker Compose
├── docker-compose.dev.yml      # Development Docker Compose
├── package.json                # Project dependencies and scripts
├── vite.config.ts              # Vite build configuration
└── README.md                   # This file
```

## 🎛 Full-Featured CMS Dashboard

### 🔐 CMS Access
- **Demo Mode**: Scroll to the bottom of the page, password `admin123`
- **Supabase Mode**: Email/password from your Supabase project
- **Automatic Switching**: System automatically detects available mode

### 📊 CMS Capabilities

#### **Content Management**
- 📝 **Blog articles**: Markdown editor, SEO metadata, tags
- 🚀 **Portfolio projects**: Technologies, links, images
- 💼 **Work experience**: Companies, positions, achievements
- 🛠 **Skills**: Frontend/Backend statistics with visualization
- 🎓 **Education**: Diplomas, certificates, courses
- 👤 **Personal information**: About me, contacts, social networks

## 🚀 Deployment

### Docker Deployment (Recommended)

```bash
# Production build
docker-compose up --build

# Or development with hot-reload
docker-compose -f src/docker-compose.dev.yml up --build
```

### Vercel Deployment

1. **Fork** the repository
2. Connect to [vercel.com](https://vercel.com)
3. Add environment variables:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_GA_ID=G-XXXXXXXXXX
   ```
4. Deploy ✨

### Environment Variable Priority

Environment variables are loaded with the following priority (highest to lowest):
1. **System environment variables** (export in shell, Docker environment, platform variables)
2. **.env.local** (if exists)
3. **.env.[mode].local** (if exists, where [mode] is development or production)
4. **.env.[mode]** (depends on NODE_ENV)
5. **.env**
6. **Default values in code**

## 📚 Detailed Documentation

For comprehensive documentation, please refer to the detailed README in the src directory:
- [src/README.md](src/README.md) - Main project documentation
- [src/DEVELOPMENT_SETUP.md](src/DEVELOPMENT_SETUP.md) - Development setup guide
- [src/SUPABASE_INTEGRATION_GUIDE.md](src/SUPABASE_INTEGRATION_GUIDE.md) - Supabase configuration guide
- [src/DOCKER_LOCAL_SETUP.md](src/DOCKER_LOCAL_SETUP.md) - Docker setup guide
- [src/DYNAMIC_CMS_GUIDE.md](src/DYNAMIC_CMS_GUIDE.md) - CMS usage guide
- [src/ENVIRONMENT_CONFIGURATION.md](src/ENVIRONMENT_CONFIGURATION.md) - Comprehensive environment configuration guide

## 🛠 Development Commands

```bash
# Development
npm run dev              # Development server
docker-compose -f src/docker-compose.dev.yml up  # Docker development

# Production
npm run build           # Build for production
npm run preview         # Preview production build
docker-compose up --build  # Docker production

# Utilities
npm run type-check      # Type checking
npm run lint           # Linting
```

## 👨‍💻 Author

**Oleg Kononenko** - Full-cycle Product Manager

- 📧 Email: [Lespola76@gmail.com](mailto:Lespola76@gmail.com)
- 📱 Phone: [+7 (931) 585-16-76](tel:+79315851676)
- 💼 LinkedIn: [kononenkooleg](https://linkedin.com/in/kononenkooleg)
- 🐙 GitHub: [olegproektor](https://github.com/olegproektor)
- 📍 Location: Krasnodar, Russia

---

<div align="center">

**⭐ If you find this project useful, please star it! ⭐**

**Modern dynamic portfolio with full-featured CMS**  
Made with ❤️ and cutting-edge technologies

</div>