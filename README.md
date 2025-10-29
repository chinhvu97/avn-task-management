# AEON Vietnam Task Management System

Monorepo containing HQ Manager interface and Staff tablet interface for AEON Vietnam retail task and shift management.

## 📦 Packages

This monorepo contains three packages:

### 1. **ai-hq-task-assignment** (HQ App)
Manager and HQ interface for:
- AI-powered task assignment
- Task monitoring across stores
- Staff management
- Shift scheduling
- Performance analytics and leaderboards
- Store management

**Target Users**: HQ Staff, Store Managers, Regional/Area Managers

### 2. **staff-task-management** (Staff App)
Tablet interface for store staff:
- Personal task list
- Shift schedule view
- Performance leaderboard
- Task completion tracking

**Target Users**: Store staff members

### 3. **shared-data**
Shared data package containing:
- Type definitions
- Master data (staff, stores)
- Task templates (DWS, WS)
- Mock data for testing
- Leaderboard data

## 🚀 Quick Start

### Development

```bash
# Install all dependencies
npm run install:all

# Run HQ app (http://localhost:3000)
npm run dev:hq

# Run Staff app (http://localhost:3000)
npm run dev:staff
```

### Build

```bash
# Build all packages
npm run build:all

# Build individual apps
npm run build:hq
npm run build:staff
```

## 📁 Project Structure

```
sourcecode/
├── package.json                    # Monorepo root config
├── vercel.json                     # Vercel deployment config
├── VERCEL_DEPLOYMENT_GUIDE.md      # Deployment instructions
│
├── ai-hq-task-assignment/          # HQ App
│   ├── src/
│   │   ├── pages/                  # Page components
│   │   ├── components/             # Reusable components
│   │   ├── contexts/               # React contexts
│   │   └── data/                   # Local data
│   ├── package.json
│   ├── vite.config.ts
│   └── CLAUDE.md                   # Development guide
│
├── staff-task-management/          # Staff App
│   ├── src/
│   │   ├── components/             # Components
│   │   ├── lib/                    # Utilities & mock data
│   │   └── types/                  # Type definitions
│   ├── package.json
│   ├── vite.config.ts
│   └── CLAUDE.md                   # Development guide
│
└── shared-data/                    # Shared Package
    ├── src/
    │   ├── master/                 # Master data
    │   │   ├── staff.ts            # Staff data
    │   │   └── stores.ts           # Store data
    │   ├── templates/              # Task templates
    │   │   ├── dws/                # Daily Work Standard
    │   │   └── ws/                 # Work Standard
    │   ├── types.ts                # Type definitions
    │   ├── leaderboard.ts          # Leaderboard data
    │   └── index.ts                # Main export
    └── package.json

```

## 🌐 Deployment

### Vercel (Recommended)

This project is configured for Vercel deployment with two separate endpoints:

- **HQ App**: `https://your-domain.vercel.app/hq`
- **Staff App**: `https://your-domain.vercel.app/staff`

**Quick Deploy**:
1. Push to GitHub
2. Import project in Vercel Dashboard
3. Deploy (automatic configuration via `vercel.json`)

See **[VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md)** for detailed instructions.

## 🛠️ Technology Stack

- **Framework**: React 18.3 + TypeScript
- **Build Tool**: Vite 6.3.5 with React SWC plugin
- **Routing**: React Router DOM (HQ app)
- **Styling**: Tailwind CSS
- **UI Components**:
  - HQ: Custom components
  - Staff: shadcn/ui (Radix UI + Tailwind)
- **Icons**: lucide-react
- **Package Manager**: npm with workspaces

## 📊 Data Architecture

### Shared Data Flow

```
shared-data/
    ↓
    ├──→ ai-hq-task-assignment
    └──→ staff-task-management
```

Both apps import from `shared-data`:
```typescript
import { staff, stores, dwsTemplates, wsTemplates, mockLeaderboard } from 'shared-data';
```

### Key Data Sources

- **Staff**: 27 staff members across 4 stores
- **Stores**: 4 AEON stores (demo phase)
- **Task Templates**: 110 DWS + 30+ WS templates
- **Leaderboard**: Dynamic rankings based on performance

## 🎯 Features

### HQ App Features

✅ AI Task Assignment (3 scenarios + custom)
✅ Task Monitoring across stores
✅ Staff Management with filtering
✅ Shift Scheduling
✅ DWS Task Templates (110 tasks)
✅ WS Task Templates with photo verification
✅ Performance Analytics
✅ Leaderboard (Store/Regional/Global)
✅ Store Management

### Staff App Features

✅ Personal Task List (Timeline/Kanban/List views)
✅ Shift Management
✅ Performance Leaderboard
✅ Task Status Updates
✅ Monthly/Weekly calendar views

## 🔄 Development Workflow

### Making Changes to Shared Data

1. Edit files in `shared-data/src/`
2. Changes automatically available to both apps
3. No rebuild needed (Vite HMR)

### Adding New Stores

1. Update `shared-data/src/master/stores.ts`
2. Update `shared-data/src/master/staff.ts` (add staff for new store)
3. Both apps will automatically use new data

### Adding New Task Templates

1. Update `shared-data/src/templates/dws/` or `ws/`
2. Templates available in both apps immediately

## 📝 Code Style

- TypeScript strict mode
- ESLint + Prettier (configure as needed)
- Component naming: PascalCase
- File naming: PascalCase for components, camelCase for utilities

## 🧪 Testing

```bash
# Build all apps to verify no errors
npm run build:all

# Run dev server and test manually
npm run dev:hq
npm run dev:staff
```

## 📈 Current Status

- **Phase**: Prototype/Demo
- **Current Stores**: 4 (Ocean Park Hawaii, Sky Oasis, Ecopark Rừng Cọ, Ecopark)
- **Current Staff**: 27 total
- **Target 2030**: 300 stores, ~3000 staff

## 🤝 Contributing

1. Create a feature branch
2. Make changes
3. Test both apps
4. Commit with descriptive messages
5. Create pull request

## 📞 Support

- HQ App Guide: `ai-hq-task-assignment/CLAUDE.md`
- Staff App Guide: `staff-task-management/CLAUDE.md`
- Deployment: `VERCEL_DEPLOYMENT_GUIDE.md`

## 📄 License

Private - AEON Vietnam Internal Use Only

---

**Last Updated**: October 30, 2024
**Version**: 1.0.0
