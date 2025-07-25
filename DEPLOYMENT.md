# Deployment Guide

This guide covers deploying your Auralis website to various platforms.

## 🚀 Quick Deploy to Vercel

### Option 1: GitHub + Vercel (Recommended)

1. **Push to GitHub**:
```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit: Auralis animated website"

# Create GitHub repository and push
git remote add origin https://github.com/yourusername/auralis-website.git
git branch -M main
git push -u origin main
```

2. **Deploy with Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with GitHub
   - Click "New Project"
   - Import your repository
   - Vercel will automatically:
     - Detect the framework (React/Node.js)
     - Configure build settings
     - Deploy your site

3. **Environment Variables**:
   In Vercel dashboard → Settings → Environment Variables, add:
   ```
   DATABASE_URL=your_postgresql_connection_string
   NODE_ENV=production
   ```

### Option 2: Vercel CLI

1. **Install Vercel CLI**:
```bash
npm i -g vercel
```

2. **Deploy**:
```bash
vercel
# Follow the prompts to configure your project
```

## 🐙 GitHub Setup

### Create Repository

1. Go to [github.com](https://github.com)
2. Click "New repository"
3. Name it "auralis-website" (or your preferred name)
4. Keep it public or private as desired
5. Don't add README (we already have one)

### Push Your Code

```bash
# In your project directory
git init
git add .
git commit -m "feat: animated Auralis tech website with Framer Motion"
git branch -M main
git remote add origin https://github.com/YOURUSERNAME/auralis-website.git
git push -u origin main
```

## ☁️ Alternative Deployment Options

### Netlify

1. **Build Configuration**:
   Create `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "dist/public"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

2. **Deploy**:
   - Connect GitHub to Netlify
   - Import your repository
   - Set build command: `npm run build`
   - Set publish directory: `dist/public`

### Railway

1. **Deploy**:
   - Connect GitHub to Railway
   - Select your repository
   - Railway will auto-detect and deploy

2. **Environment Variables**:
   Add `DATABASE_URL` in Railway dashboard

### DigitalOcean App Platform

1. **Create App**:
   - Connect your GitHub repository
   - Configure build settings
   - Set environment variables

## 🗃️ Database Setup

### Neon (Recommended for Serverless)

1. Go to [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string
4. Add to your deployment environment variables

### Supabase

1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Get PostgreSQL connection string
4. Add to environment variables

### PlanetScale (MySQL alternative)

1. Go to [planetscale.com](https://planetscale.com)
2. Create database
3. Get connection string
4. Update schema if needed

## 🔧 Build Configuration

The project is configured with:

- **Frontend Build**: Vite builds static files to `dist/public`
- **Backend Build**: esbuild bundles server to `dist/index.js`
- **Production Start**: `node dist/index.js`

### Vercel Configuration (`vercel.json`)

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server/index.ts",
      "use": "@vercel/node"
    },
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "dist/public" }
    }
  ],
  "routes": [
    { "src": "/api/(.*)", "dest": "/server/index.ts" },
    { "src": "/(.*)", "dest": "/dist/public/$1" }
  ]
}
```

## 🌍 Custom Domain

### Vercel

1. Go to project settings in Vercel
2. Click "Domains"
3. Add your domain (e.g., `auralis.fyi`)
4. Follow DNS configuration instructions

### Cloudflare (DNS + CDN)

1. Add your domain to Cloudflare
2. Update nameservers
3. Configure DNS records to point to your deployment

## 📊 Performance Optimization

### Pre-deployment Checklist

- [ ] Test all animations on mobile devices
- [ ] Verify all API endpoints work
- [ ] Check database connection
- [ ] Test contact form submission
- [ ] Verify newsletter signup
- [ ] Test affiliate links
- [ ] Check SEO meta tags
- [ ] Validate responsive design

### Performance Tips

1. **Image Optimization**: Ensure all images are optimized
2. **Bundle Analysis**: Check bundle size with Vite
3. **Animation Performance**: Test on lower-end devices
4. **Database Queries**: Optimize for production load

## 🔍 Monitoring & Analytics

### Vercel Analytics

- Enable in Vercel dashboard
- Track page views and performance

### Google Analytics

Add to `client/src/main.tsx`:
```typescript
// Add Google Analytics tracking code
```

## 🆘 Troubleshooting

### Common Issues

1. **Build Fails**:
   - Check Node.js version (use 18+)
   - Verify all dependencies are installed
   - Check for TypeScript errors

2. **API Routes Don't Work**:
   - Verify serverless function configuration
   - Check environment variables
   - Test database connection

3. **Animations Not Smooth**:
   - Test on different devices
   - Check Framer Motion configuration
   - Verify CSS animations

### Getting Help

1. Check deployment logs in your platform dashboard
2. Test locally first: `npm run build && npm start`
3. Verify environment variables are set correctly

---

**Your animated Auralis website is ready to go live! 🚀**