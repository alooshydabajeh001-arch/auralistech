# Auralis - Tech Product Showcase & Review Platform

A modern, animated affiliate marketing website for tech products built with React, Express, and Framer Motion.

## 🚀 Features

- **Animated UI**: Beautiful animations powered by Framer Motion
- **Dark Theme**: Professional dark mode with blue/green tech styling
- **Product Showcase**: Dynamic product cards with affiliate links
- **Blog System**: Tech reviews and insights
- **Newsletter**: Subscription management with animations
- **Responsive**: Mobile-first design that works on all devices
- **SEO Optimized**: Meta tags and structured data

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Build**: Vite (frontend), esbuild (backend)
- **UI Components**: Radix UI + shadcn/ui
- **Animations**: Framer Motion
- **State Management**: TanStack Query

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd auralis-website
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Database
DATABASE_URL=your_postgres_connection_string

# Optional: Newsletter service API keys
NEWSLETTER_API_KEY=your_api_key
```

4. Run database migrations:
```bash
npm run db:push
```

5. Start development server:
```bash
npm run dev
```

## 🚀 Deployment

### Vercel (Recommended)

1. **GitHub Setup**:
   - Push your code to GitHub
   - Connect your GitHub account to Vercel

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect the settings

3. **Environment Variables**:
   - In Vercel dashboard, go to Settings > Environment Variables
   - Add your DATABASE_URL and any other required variables

4. **Automatic Deployments**:
   - Vercel will automatically deploy on every push to main branch

### Manual Deployment

1. **Build the project**:
```bash
npm run build
```

2. **Start production server**:
```bash
npm start
```

## 🎨 Customization

### Colors
Update the CSS variables in `client/src/index.css`:
```css
:root {
  --tech-green-500: hsl(142, 76%, 36%);
  --tech-blue-500: hsl(217, 91%, 60%);
}
```

### Animations
Modify animations in the component files:
- `animated-hero.tsx` - Hero section animations
- `animated-product-card.tsx` - Product card animations
- `animated-blog-card.tsx` - Blog card animations

### Content
Update sample data in `server/storage.ts` with your actual products and blog posts.

## 📁 Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utilities and configuration
├── server/                # Backend Express application
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API route handlers
│   └── storage.ts        # Data storage interface
├── shared/               # Shared TypeScript schemas
└── dist/                 # Build output (generated)
```

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run check` - TypeScript type checking
- `npm run db:push` - Push database schema

## 📱 Pages

- **Home** (`/`) - Hero section, featured products, recent blog posts
- **Products** (`/products`) - Product catalog with filtering and search
- **Blog** (`/blog`) - Tech articles and reviews
- **About** (`/about`) - Company information
- **Contact** (`/contact`) - Contact form

## 🎯 Performance

- **Animations**: Optimized with Framer Motion for 60fps
- **Images**: Optimized loading with proper aspect ratios
- **Code Splitting**: Automatic with Vite
- **Caching**: HTTP caching headers for static assets

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use for personal or commercial projects.

## 🆘 Support

For issues or questions:
- Check the GitHub issues
- Review the documentation
- Contact support@auralis.com

---

Built with ❤️ using modern web technologies.