# Vercel Deployment Guide

This guide will help you deploy your Task and Shift Management App to Vercel for testing.

## Prerequisites

- A Vercel account ([Sign up here](https://vercel.com/signup))
- GitHub account (for version control)
- Your app must be pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Deployment Steps

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin master
   ```

2. **Go to Vercel Dashboard**
   - Visit [vercel.com](https://vercel.com)
   - Click "Sign Up" or "Log In"

3. **Import Project**
   - Click "Add New..." → "Project"
   - Import your Git repository from GitHub
   - Select your repository

4. **Configure Project**
   Vercel will auto-detect your Vite configuration:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build` (auto-detected)
   - **Output Directory:** `build` (auto-detected)
   - **Install Command:** `npm install` (auto-detected)

5. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete (usually 1-3 minutes)

6. **Access Your App**
   - Once deployed, you'll get a URL like: `your-app-name.vercel.app`
   - You can customize the domain in project settings

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   - Answer the prompts:
     - Set up and deploy? **Yes**
     - Which scope? **Your account**
     - Link to existing project? **No**
     - What's your project's name? **task-and-shift-management-app**
     - In which directory is your code located? **./**

4. **Production Deployment**
   ```bash
   vercel --prod
   ```

## Configuration Files

### `vercel.json`
This file has been created with the optimal configuration for your Vite app:
- Build command: `npm run build`
- Output directory: `build`
- Framework: Vite
- Routing: SPA rewrites for client-side routing

### Environment Variables
If you need to add environment variables:
1. Go to your project settings on Vercel
2. Navigate to "Environment Variables"
3. Add any variables (if needed)

## Post-Deployment

### Automatic Deployments
- Every push to your `master` branch will trigger a production deployment
- Every push to other branches will trigger a preview deployment

### Custom Domains
- Go to Project Settings → Domains
- Add your custom domain
- Follow DNS configuration instructions

### Build Logs
- View build logs in the Vercel dashboard
- Debug any build issues directly from the interface

## Troubleshooting

### Build Fails
1. Check build logs in Vercel dashboard
2. Ensure all dependencies are in `package.json`
3. Check for TypeScript errors locally:
   ```bash
   npm run build
   ```

### Routing Issues
- The `vercel.json` includes SPA rewrites to handle client-side routing
- All routes will redirect to `index.html`

### Environment Variables
- If using `.env.local`, add variables in Vercel dashboard
- Update your code to read from `import.meta.env.*` (Vite convention)

## Local Testing

Before deploying, test the production build locally:
```bash
# Build the project
npm run build

# Preview the production build
npm run preview
```

Visit `http://localhost:4173` to test your production build.

## Monitoring

- Vercel provides analytics and monitoring out of the box
- Check the Analytics tab for performance metrics
- Use Vercel's Edge Network for optimal performance

## Support

For issues or questions:
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Support](https://vercel.com/support)

---

**Good luck with your deployment! 🚀**

