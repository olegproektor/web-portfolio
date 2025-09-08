// Server adapters for different hosting platforms

// Next.js adapter
export const nextjsAdapter = {
  config: {
    // next.config.js content
    async redirects() {
      return [
        {
          source: '/admin',
          destination: '/#cms',
          permanent: false,
        },
      ]
    },
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: '/api/:path*',
        },
      ]
    },
    images: {
      domains: ['images.unsplash.com'],
      formats: ['image/webp', 'image/avif'],
    },
    experimental: {
      optimizeCss: true,
    }
  },
  
  // API routes structure
  apiRoutes: {
    '/api/cms/posts': 'CRUD operations for blog posts',
    '/api/cms/projects': 'CRUD operations for portfolio items',
    '/api/cms/skills': 'Skills management',
    '/api/cms/experience': 'Work experience management',
    '/api/cms/upload': 'File upload endpoint',
    '/api/cms/export': 'Data export',
    '/api/cms/import': 'Data import',
    '/api/analytics': 'Analytics data',
    '/api/contact': 'Contact form submission',
    '/api/newsletter': 'Newsletter subscription',
    '/api/search': 'Search functionality',
  }
}

// Nuxt.js adapter
export const nuxtAdapter = {
  config: {
    // nuxt.config.js content
    nitro: {
      prerender: {
        routes: ['/sitemap.xml', '/robots.txt']
      }
    },
    runtimeConfig: {
      public: {
        gaId: process.env.NUXT_PUBLIC_GA_ID,
        siteUrl: process.env.NUXT_PUBLIC_SITE_URL
      }
    },
    css: ['~/styles/globals.css'],
    modules: [
      '@nuxtjs/tailwindcss',
      '@nuxtjs/google-analytics',
      '@nuxtjs/sitemap'
    ]
  }
}

// Express.js server setup
export const expressServerSetup = `
const express = require('express');
const path = require('path');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:", "blob:"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://www.googletagmanager.com"],
      connectSrc: ["'self'", "https://www.google-analytics.com"]
    }
  }
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Middleware
app.use(compression());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files
app.use(express.static(path.join(__dirname, 'dist')));

// API routes
app.use('/api/cms', require('./api/cms'));
app.use('/api/contact', require('./api/contact'));
app.use('/api/analytics', require('./api/analytics'));

// Catch all handler for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
`

// Database configurations
export const databaseConfigs = {
  // PostgreSQL with Prisma
  postgresql: {
    schema: `
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  role      Role     @default(USER)
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Post {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  content     String
  excerpt     String?
  published   Boolean  @default(false)
  authorId    String
  author      User     @relation(fields: [authorId], references: [id])
  tags        Tag[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Tag {
  id    String @id @default(cuid())
  name  String @unique
  posts Post[]
}

model Project {
  id           String   @id @default(cuid())
  title        String
  description  String
  image        String?
  technologies String[]
  category     String
  status       String   @default("active")
  githubUrl    String?
  demoUrl      String?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model Experience {
  id          String    @id @default(cuid())
  company     String
  position    String
  description String?
  tools       String?
  projects    String?
  startDate   DateTime
  endDate     DateTime?
  current     Boolean   @default(false)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

enum Role {
  USER
  ADMIN
}
`,
    
    env: `
DATABASE_URL="postgresql://username:password@localhost:5432/portfolio_db"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
`
  },

  // MongoDB
  mongodb: {
    models: `
// User model
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: String,
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Post model
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  excerpt: String,
  published: { type: Boolean, default: false },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tags: [String],
  coverImage: String,
  readTime: Number,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Project model
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: String,
  technologies: [String],
  category: String,
  status: { type: String, default: 'active' },
  githubUrl: String,
  demoUrl: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
`
  },

  // Supabase
  supabase: {
    sql: `
-- Users table
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  role VARCHAR(20) DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Posts table
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  published BOOLEAN DEFAULT FALSE,
  author_id UUID REFERENCES users(id),
  tags TEXT[],
  cover_image VARCHAR(500),
  read_time INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects table
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image VARCHAR(500),
  technologies TEXT[],
  category VARCHAR(100),
  status VARCHAR(20) DEFAULT 'active',
  github_url VARCHAR(500),
  demo_url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Experience table
CREATE TABLE experience (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  description TEXT,
  tools TEXT,
  projects TEXT,
  start_date DATE NOT NULL,
  end_date DATE,
  current BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS policies
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON posts FOR SELECT USING (published = true);
CREATE POLICY "Allow public read access" ON projects FOR SELECT USING (status = 'active');
CREATE POLICY "Allow public read access" ON experience FOR SELECT USING (true);

-- Allow admin full access
CREATE POLICY "Allow admin full access" ON posts FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Allow admin full access" ON projects FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Allow admin full access" ON experience FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
`
  }
}

// Docker configuration
export const dockerConfig = {
  dockerfile: `
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM node:18-alpine AS runner

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "start"]
`,

  dockerCompose: `
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://postgres:password@db:5432/portfolio
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=portfolio
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/ssl
    depends_on:
      - web
    restart: unless-stopped

volumes:
  postgres_data:
`
}

// Deployment scripts
export const deploymentScripts = {
  vercel: `
{
  "functions": {
    "app.js": {
      "runtime": "nodejs18.x"
    }
  },
  "redirects": [
    {
      "source": "/admin",
      "destination": "/#cms",
      "permanent": false
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
`,

  netlify: `
# Netlify configuration
[build]
  publish = "dist"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/admin"
  to = "/#cms"
  status = 302

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
`
}