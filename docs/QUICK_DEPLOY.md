# Quick Deploy to Vercel

## 🚀 3-Step Deployment

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### Step 2: Import in Vercel

1. Go to https://vercel.com/new
2. Click **"Import Git Repository"**
3. Select your repository
4. Click **"Import"**

### Step 3: Deploy

**Important Settings**:
- ✅ **Framework Preset**: Other
- ✅ **Root Directory**: `./` (leave empty)
- ✅ **Build Command**: Leave empty
- ✅ **Output Directory**: Leave empty
- ✅ **Install Command**: `npm install`

Click **"Deploy"** and wait 2-5 minutes.

## 🎯 Your Endpoints

After deployment:
- **HQ App**: `https://your-project.vercel.app/hq`
- **Staff App**: `https://your-project.vercel.app/staff`

## ✅ Verification Checklist

After deployment, test:
- [ ] `/hq` loads correctly
- [ ] `/staff` loads correctly
- [ ] `/` redirects to `/hq`
- [ ] Navigation works in both apps
- [ ] Leaderboard displays data
- [ ] No console errors

## 🔧 If Something Goes Wrong

### Build Fails?
Check **Deployment Logs** in Vercel Dashboard:
1. Go to your project
2. Click **"Deployments"** tab
3. Click on the failed deployment
4. Read **"Build Logs"**

Common issues:
- Missing dependencies: Check `package.json` files
- Build errors: Run `npm run build:all` locally first
- Path issues: Verify `vercel.json` configuration

### Assets Not Loading?
Verify in browser dev tools:
- Assets should load from `/hq/assets/...` or `/staff/assets/...`
- Check for 404 errors in Network tab
- Verify `base` path in `vite.config.ts`

## 📞 Need Help?

See full documentation: [VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md)

---

**Quick Deploy Checklist**:
- ✅ Committed all changes
- ✅ Pushed to GitHub
- ✅ Imported in Vercel
- ✅ Used correct settings
- ✅ Deployment succeeded
- ✅ Tested both endpoints
