# Vercel Deployment Guide

This guide explains how to deploy the AEON Task Management System monorepo to Vercel with two separate endpoints.

## 📋 Overview

The monorepo contains three packages:
- **ai-hq-task-assignment** (HQ App) - Manager/HQ interface
- **staff-task-management** (Staff App) - Tablet interface for staff
- **shared-data** - Shared data and types used by both apps

## 🚀 Deployment Endpoints

After deployment, you'll have two endpoints:
- **HQ App**: `https://your-domain.vercel.app/hq`
- **Staff App**: `https://your-domain.vercel.app/staff`
- **Root**: Redirects to `/hq` by default

## 📁 Project Structure

```
sourcecode/
├── package.json                    # Root monorepo config
├── vercel.json                     # Vercel deployment config
├── ai-hq-task-assignment/          # HQ App
│   ├── package.json
│   ├── vite.config.ts             # Configured with base: '/hq/'
│   └── build/                     # Output directory
├── staff-task-management/          # Staff App
│   ├── package.json
│   ├── vite.config.ts             # Configured with base: '/staff/'
│   └── build/                     # Output directory
└── shared-data/                    # Shared package
    └── package.json
```

## 🔧 Prerequisites

1. **Vercel Account**: Sign up at https://vercel.com
2. **GitHub Repository**: Your code should be in a GitHub repository
3. **Node.js**: Version 18 or higher

## 📝 Step-by-Step Deployment

### Method 1: Deploy via Vercel Dashboard (Recommended)

#### 1. Connect Your Repository

1. Go to https://vercel.com/dashboard
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Select the repository containing this monorepo

#### 2. Configure Project Settings

**Framework Preset**: `Other` (we're using custom Vite setup)

**Build & Development Settings**:
- **Root Directory**: `./` (leave empty or select root)
- **Build Command**: Leave empty (we use vercel.json)
- **Output Directory**: Leave empty (we use vercel.json)
- **Install Command**: `npm install`

#### 3. Environment Variables

No environment variables are required for the basic setup. Add these if needed:

| Name | Value | Description |
|------|-------|-------------|
| `NODE_VERSION` | `18` | Specify Node.js version |
| `NPM_VERSION` | `9` | Specify npm version |

#### 4. Deploy

Click **"Deploy"** and wait for the build to complete (2-5 minutes).

### Method 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Navigate to project root
cd /path/to/sourcecode

# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Or deploy to preview
vercel
```

## 🔍 How It Works

### Build Process

The `vercel.json` configuration tells Vercel to:

1. **Build two separate apps** using `@vercel/static-build`
   - `ai-hq-task-assignment` → outputs to `build/`
   - `staff-task-management` → outputs to `build/`

2. **Route requests** based on URL paths:
   - `/hq/*` → HQ App
   - `/staff/*` → Staff App
   - `/` → Redirects to `/hq`

### Vite Configuration

Both apps have modified `vite.config.ts` files:

```typescript
export default defineConfig({
  base: process.env.VERCEL ? '/hq/' : '/',  // or '/staff/' for staff app
  // ... rest of config
});
```

This ensures:
- Assets are loaded from correct paths on Vercel
- Local development works normally (base: '/')
- Production builds work with URL prefixes

### Package Scripts

Each app has a `vercel-build` script:

```json
{
  "scripts": {
    "vercel-build": "cd ../shared-data && npm install && cd ../ai-hq-task-assignment && npm install && VERCEL=true vite build"
  }
}
```

This script:
1. Installs shared-data dependencies
2. Installs app dependencies
3. Sets `VERCEL=true` environment variable
4. Runs Vite build with correct base path

## 🧪 Testing Deployment

### Local Testing with Production Build

```bash
# Build both apps
cd ai-hq-task-assignment
VERCEL=true npm run build

cd ../staff-task-management
VERCEL=true npm run build

# Test with a local server
npx http-server -p 3000
```

### After Deployment

1. **Test HQ App**: `https://your-domain.vercel.app/hq`
2. **Test Staff App**: `https://your-domain.vercel.app/staff`
3. **Test Root Redirect**: `https://your-domain.vercel.app/` → should redirect to `/hq`

## 🔄 Continuous Deployment

### Automatic Deployments

Vercel will automatically deploy when you:
- Push to `main` branch → Production deployment
- Push to other branches → Preview deployment
- Open a pull request → Preview deployment

### Manual Deployments

```bash
# Deploy specific branch
vercel --prod

# Deploy with custom domain
vercel --prod --name my-custom-name
```

## 🎯 Custom Domain Setup

1. Go to **Project Settings** → **Domains**
2. Add your custom domain (e.g., `task.aeon.vn`)
3. Update DNS records as instructed by Vercel
4. Your endpoints will be:
   - `https://task.aeon.vn/hq`
   - `https://task.aeon.vn/staff`

## 🛠️ Troubleshooting

### Build Fails

**Error**: `Cannot find module 'shared-data'`

**Solution**: The `vercel-build` script should handle this. If not, check:
```bash
cd shared-data
npm install
npm run build
```

### Assets Not Loading

**Error**: 404 errors for CSS/JS files

**Solution**: Verify `base` path in `vite.config.ts`:
```typescript
base: process.env.VERCEL ? '/hq/' : '/',
```

### Routes Not Working

**Error**: 404 on `/hq` or `/staff` paths

**Solution**: Check `vercel.json` routes configuration. Ensure:
```json
{
  "routes": [
    { "src": "/hq/(.*)", "dest": "/ai-hq-task-assignment/$1" },
    { "src": "/staff/(.*)", "dest": "/staff-task-management/$1" }
  ]
}
```

### Shared Data Not Updated

**Error**: Old data showing after deployment

**Solution**: The monorepo uses `file:` protocol for shared-data. On each deployment:
1. Shared-data is installed fresh from the filesystem
2. No caching issues should occur
3. If problems persist, increment version in `shared-data/package.json`

## 📊 Build Logs

View detailed build logs in Vercel Dashboard:
1. Go to **Deployments**
2. Click on any deployment
3. View **Build Logs** tab

## 🔐 Security Considerations

1. **Environment Variables**: Add sensitive data in Vercel Dashboard → Settings → Environment Variables
2. **Access Control**: Use Vercel's authentication if needed
3. **CORS**: Configure in each app if accessing external APIs

## 📈 Performance Optimization

### Recommended Vercel Settings

- **Framework**: Other
- **Node Version**: 18.x
- **Region**: Auto (or closest to Vietnam)
- **Function Region**: Auto

### Build Optimization

Both apps use:
- Vite for fast builds
- React SWC plugin for faster transpilation
- Production builds are minified and optimized

Expected build time: **2-5 minutes**

## 🎉 Post-Deployment

After successful deployment:

1. ✅ Test both `/hq` and `/staff` endpoints
2. ✅ Verify all features work (navigation, data loading)
3. ✅ Check leaderboard displays correctly
4. ✅ Test on different devices (desktop, tablet)
5. ✅ Share URLs with team

## 📞 Support

- **Vercel Documentation**: https://vercel.com/docs
- **Vite Documentation**: https://vitejs.dev/guide/
- **Project Issues**: See repository README

---

**Last Updated**: October 30, 2024
**Version**: 1.0.0
