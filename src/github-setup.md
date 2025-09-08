# 🔧 Настройка GitHub репозитория для проекта

## 📋 Пошаговая инструкция создания репозитория

### 1. Создание репозитория на GitHub

1. Перейдите на [GitHub.com](https://github.com)
2. Нажмите "New repository" (зеленая кнопка)
3. Заполните настройки:
   - **Repository name**: `portfolio` или `oleg-portfolio`
   - **Description**: `Современный адаптивный сайт-портфолио с CMS панелью управления`
   - **Visibility**: Public (для GitHub Pages)
   - **Initialize**: НЕ инициализируйте с README (у нас уже есть файлы)

### 2. Подготовка локального проекта

```bash
# В корневой папке проекта
git init
git add .
git commit -m "Initial commit: Complete portfolio website with CMS"

# Добавьте удаленный репозиторий (замените username на ваш)
git remote add origin https://github.com/your-username/portfolio.git

# Загрузите код
git branch -M main
git push -u origin main
```

### 3. Настройка GitHub Pages

1. В реп��зитории перейдите в **Settings** → **Pages**
2. В разделе **Source** выберите:
   - **Deploy from a branch**
   - **Branch**: `gh-pages`
   - **Folder**: `/ (root)`
3. Нажмите **Save**

### 4. Настройка автоматического деплоя

Создайте файл `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout
      uses: actions/checkout@v4

    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Build
      run: npm run build

    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

### 5. Настройка Vercel (альтернатива)

1. Перейдите на [vercel.com](https://vercel.com)
2. Подключите GitHub аккаунт
3. Импортируйте репозиторий
4. Настройки:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

## 📁 Структура файлов для Git

Убедитесь, что у вас есть файл `.gitignore`:

```gitignore
# Dependencies
node_modules/

# Production build
dist/
build/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
*.lcov

# nyc test coverage
.nyc_output

# ESLint cache
.eslintcache

# Dependency directories
jspm_packages/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Microbundle cache
.rpt2_cache/
.rts2_cache_cjs/
.rts2_cache_es/
.rts2_cache_umd/

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# Next.js build output
.next

# Nuxt.js build / generate output
.nuxt
dist

# Storybook build outputs
.out
.storybook-out

# Temporary folders
tmp/
temp/

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
```

## 🏷️ Теги для релизов

Создайте первый релиз:

```bash
git tag -a v2.0.0 -m "Release v2.0.0: Complete portfolio with CMS"
git push origin v2.0.0
```

## 📄 README бэдж

Добавьте бэджи в README для статуса билда:

```markdown
[![Build Status](https://github.com/your-username/portfolio/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)](https://github.com/your-username/portfolio/actions)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen.svg)](https://your-username.github.io/portfolio)
```

## 🔒 Настройки безопасности

### Branch Protection Rules

1. Перейдите в **Settings** → **Branches**
2. Добавьте правило для `main` ветки:
   - ✅ Require pull request reviews before merging
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging

### Secrets для CI/CD

Если используете внешние API:
1. **Settings** → **Secrets and variables** → **Actions**
2. Добавьте необходимые секреты

## 📊 GitHub Analytics

Включите а��алитику:
1. **Settings** → **General**
2. **Features** → ✅ Issues, ✅ Wiki, ✅ Projects

## 🎯 Рекомендуемые Labels

Создайте labels для issues:
- `bug` - 🐛 Ошибки
- `enhancement` - ✨ Улучшения  
- `documentation` - 📚 Документация
- `good first issue` - 👍 Хорошо для новичков
- `help wanted` - 🆘 Нужна помощь

## 🤖 GitHub Actions для качества кода

Дополнительный workflow `.github/workflows/quality.yml`:

```yaml
name: Code Quality

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Lint
      run: npm run lint
      
    - name: Type check
      run: npm run type-check
      
    - name: Run tests
      run: npm run test
```

## 📈 Monitoring

Настройте мониторинг:
1. **Insights** → **Traffic** - статистика посещений
2. **Settings** → **Webhooks** - уведомления
3. Подключите [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

## 🚀 После создания репозитория

1. **Проверьте сборку** - убедитесь что GitHub Actions работает
2. **Протестируйте сайт** - откройте GitHub Pages URL
3. **Настройте домен** (опционально) - в Settings → Pages
4. **Создайте первый issue** - план развития проекта
5. **Добавьте collaborators** - если работаете в команде

## 📞 Поддержка

При возникновении проблем:
1. Проверьте **Actions** вкладку на наличие ошибок
2. Посмотрите логи сборки
3. Убедитесь что все зависимости установлены
4. Проверьте настройки GitHub Pages

---

**URL вашего сайта будет**: `https://your-username.github.io/portfolio`

Замените `your-username` на ваш GitHub логин!