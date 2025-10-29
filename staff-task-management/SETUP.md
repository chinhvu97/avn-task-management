# Local Development Setup Guide

This guide will help you set up and run the Task and Shift Management App locally for development.

## Prerequisites

Before you begin, make sure you have the following installed on your system:

- **Node.js** (version 16 or higher recommended)
- **npm** (comes with Node.js) or **yarn**
- **Git** (for version control)

You can check if you have these installed by running:
```bash
node --version
npm --version
git --version
```

## Project Overview

This is a React/TypeScript application built with:
- **Vite** - Fast build tool and development server
- **React 18** - Frontend framework
- **TypeScript** - Type-safe JavaScript
- **shadcn/ui** - Modern UI component library (Radix UI + Tailwind CSS)
- **Tailwind CSS** - Utility-first CSS framework

## Quick Start

### 1. Clone/Navigate to Project Directory
```bash
cd "/Users/macbook/Downloads/Task and Shift Management App_1"
```

### 2. Install Dependencies
Install all required packages and dependencies:
```bash
npm install
```

This will install all dependencies listed in `package.json`, including:
- React 18.3.1
- Vite (build tool)
- Radix UI components
- Tailwind CSS utilities
- Various UI libraries

### 3. Start Development Server
Start the local development server:
```bash
npm run dev
```

### 4. Access the Application
Once the server starts, you can access the application at:
- **Local**: `http://localhost:5173`
- **Network**: The terminal will show a network URL for access from other devices

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build the application for production |

## Development Features

- **Hot Module Replacement (HMR)** - Changes are reflected instantly without page refresh
- **TypeScript Support** - Full type checking and IntelliSense
- **Modern React** - Uses React 18 with latest features
- **Component Library** - Pre-built UI components from shadcn/ui
- **Responsive Design** - Mobile-first approach with Tailwind CSS

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   └── figma/          # Figma-related components
├── lib/                # Utility functions and mock data
├── types/              # TypeScript type definitions
├── styles/             # Global styles
└── main.tsx           # Application entry point
```

## Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

**Dependencies not installing:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**TypeScript errors:**
- Make sure you're using a compatible Node.js version
- Check that all dependencies are properly installed
- Restart your development server

### Performance Tips

- Use the browser's React Developer Tools extension
- Check the Network tab for any slow-loading resources
- Use `npm run build` to test production performance

## Building for Production

To create a production build:

```bash
npm run build
```

This will:
- Create optimized files in the `dist/` directory
- Minify JavaScript and CSS
- Remove development-only code
- Generate source maps for debugging

## Additional Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

## Getting Help

If you encounter any issues:
1. Check this guide first
2. Review the console for error messages
3. Ensure all dependencies are installed correctly
4. Try restarting the development server

---

**Happy coding!** 🚀
