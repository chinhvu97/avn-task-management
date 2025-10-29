# Push to GitHub Guide

Your GitHub repository: `git@github.com:chinhvu97/avn-task-management.git`

## 🔐 Option 1: Use SSH (Recommended)

### Check if you have SSH key
```bash
ls -la ~/.ssh
```

If you see `id_rsa.pub` or `id_ed25519.pub`, you already have a key.

### Generate SSH key (if needed)
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
# Press Enter to accept defaults
```

### Copy your SSH public key
```bash
# For Ed25519 key
cat ~/.ssh/id_ed25519.pub

# OR for RSA key
cat ~/.ssh/id_rsa.pub
```

### Add SSH key to GitHub
1. Go to https://github.com/settings/keys
2. Click **"New SSH key"**
3. Paste your public key
4. Click **"Add SSH key"**

### Test SSH connection
```bash
ssh -T git@github.com
# Should say: "Hi chinhvu97! You've successfully authenticated..."
```

### Push to GitHub
```bash
cd /Users/macbook/Documents/ops/AVN/sourcecode
git push -u origin main
```

---

## 🌐 Option 2: Use HTTPS (Easier)

### Change remote to HTTPS
```bash
git remote set-url origin https://github.com/chinhvu97/avn-task-management.git
```

### Push to GitHub
```bash
git push -u origin main
# Enter your GitHub username and Personal Access Token when prompted
```

### Creating Personal Access Token (if needed)
1. Go to https://github.com/settings/tokens
2. Click **"Generate new token (classic)"**
3. Give it a name (e.g., "AVN Task Management")
4. Check **"repo"** scope
5. Click **"Generate token"**
6. Copy the token (save it somewhere safe!)
7. Use this token as your password when pushing

---

## 📝 After Successful Push

Once you've pushed successfully, you'll see:
```
Enumerating objects: XX, done.
Counting objects: 100% (XX/XX), done.
...
To github.com:chinhvu97/avn-task-management.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

## 🚀 Next: Deploy to Vercel

After pushing to GitHub:

1. Go to https://vercel.com/new
2. Click **"Import Git Repository"**
3. Select **"chinhvu97/avn-task-management"**
4. Configure settings:
   - Framework: **Other**
   - Root Directory: Leave empty
   - Build Command: Leave empty
   - Output Directory: Leave empty
5. Click **"Deploy"**

Your apps will be live at:
- HQ: `https://avn-task-management.vercel.app/hq`
- Staff: `https://avn-task-management.vercel.app/staff`

---

## 🆘 Troubleshooting

### "Permission denied (publickey)"
- You need to add SSH key to GitHub (see Option 1 above)
- OR switch to HTTPS (see Option 2 above)

### "Repository not found"
```bash
# Make sure the repository exists on GitHub
# Go to: https://github.com/chinhvu97/avn-task-management
```

### "failed to push some refs"
```bash
# Pull first, then push
git pull origin main --rebase
git push -u origin main
```

---

## ✅ Quick Commands

**If you have SSH set up:**
```bash
git push -u origin main
```

**If you want to use HTTPS:**
```bash
git remote set-url origin https://github.com/chinhvu97/avn-task-management.git
git push -u origin main
```

**Check your commits are ready:**
```bash
git log --oneline -5
```

You should see:
- `5ac0611 Add Vercel deployment configuration`
- `5bbe3f4 Migrate leaderboard to shared-data and fix consistency`
- `405d452 stable commit 1`
