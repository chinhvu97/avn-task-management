## Project Overview

Task & Shift Management application for AEON Vietnam retail stores. The system manages Daily Work Standard (DWS) tasks and event-based Work Standard (WS) tasks across multiple organizational levels (Store → Regional → Global).

**Repository Scope**: This repository focuses on HQ and Store Manager interfaces (PC/laptop). Staff UI (tablet) is maintained in a separate repository.

**Related Repository**: The Staff tablet UI is built with React + TypeScript + Vite + shadcn/ui. See `STAFF_REPORSITORY_CLAUDE.md` for details.

**Current Status**: 
- ✅ **Prototype Phase** - AI Task Assignment feature implemented
- 🎨 Initial design imported from existing RetailFlow Manager system
- 🚧 Core functionality needs backend integration
- 📋 Planning documents and requirements defined

**Currently Implemented**:
- **AI Task Assignment Interface** (`/App.tsx`):
  - Multi-step workflow (Date Selection → Scenario Generation → Confirmation)
  - Four AI-generated assignment scenarios (Balanced, Speed, Efficiency, Custom)
  - Interactive scenario selection with real-time metrics
  - Gantt chart visualization for staff task schedules
  - Assignment scorecard with performance metrics (workload, duration, satisfaction, success rate)
  - View mode toggle (Gantt/List)
  - Staff profile integration with avatars
  - Responsive header with navigation

**Target Scale**:
- Current: 26 stores
- 2030 Goal: 300 stores nationwide
- ~10 staff per store
- 110 daily routine tasks per store

**Deployment Deadline**: May 2026

## Business Context

### Task Types

**DWS (Daily Work Standard)**:
- Fixed daily tasks (~110 tasks per store)
- Simple status tracking without approval workflow
- Each task: minimum 15 minutes
- Categorized by activity (POS, freezer, cafe counter, etc.)
- Manual references stored separately in internal documentation (format: "x.x.x")
- Performance tracking: estimated vs actual time

**WS (Work Standard)**:
- Event-based/seasonal tasks (e.g., holiday decorations)
- Requires photo upload capability
- AI validation for image approval (replacing discontinued Hansoku system)
- Approval workflow required

### Organizational Hierarchy

```
Staff → Store Manager → SI (2+ stores) → AM (area/region) → HQ → Super Admin
```

**Multi-level Support**:
- Store Level: Individual retail locations
- Regional Level: Multiple stores within a city
- Global Level: Multiple cities/regions

### Key Requirements

1. **Task Management**:
   - Three view modes: Timeline (15-min intervals), Kanban, List
   - Six statuses: Open → Processing → Pending → Awaiting Approval → Done → Cancelled
   - Real-time visibility of all staff tasks for mutual support
   - Performance metrics (completion rate, time tracking, efficiency)

2. **Shift Management**:
   - Attendance tracking (check-in/check-out)
   - Integration with existing Edoc system (one-way data sync: Edoc → New App)
   - Leave request management (3-day advance notice required)
   - Staff scheduling and reallocation across stores (for SI/AM roles)

3. **Leaderboard & Gamification**:
   - Rankings at Store, Regional, Global levels
   - Metrics: tasks completed, completion rate, total hours, efficiency
   - Calendar heatmap visualization
   - Rewards system

4. **Device Support** (this repository):
   - Target Users: HQ, Store Manager, SI (Store Manager Multi), AM (Area Manager)
   - Platform: PC/Laptop web interface
   - Note: Staff tablet UI is in a separate repository

5. **Integration**:
   - One-way data sync from Edoc system for attendance/shift data
   - Future-proof design (Edoc may be replaced)
   - Security: No external web access required

### Core Features for HQ/Store Manager Interface

**Store Manager Functions**:
- Task assignment and distribution across staff
- AI-assisted workload balancing to reduce manual assignment burden ✅ **(Currently Implemented)**
- Real-time monitoring of task completion across all staff
- Staff management (view schedules, attendance, task performance)
- Leave request approval
- Shift schedule management
- Performance analytics for their store
- Multi-view task visualization (Timeline, Kanban, List)

**SI (Store Manager Multi) Functions**:
- Manage 2+ stores simultaneously
- Cross-store staff allocation
- Aggregate view of 220+ tasks (2 stores × 110 tasks)
- Regional performance comparison

**AM (Area Manager) Functions**:
- Multi-region oversight
- Staff reallocation across stores in their area
- Area-level performance analytics
- Regional leaderboard management

**HQ Functions**:
- Create and maintain master task list (110 DWS tasks)
- Global task template management
- Manual reference updates (~2 times/year)
- System-wide performance dashboards
- Store performance comparison
- Global leaderboard
- Category management
- Scalability monitoring for 300 stores

**Super Admin Functions**:
- User management across all roles
- Professional permission system by role and module
- Store management (CRUD operations)
- Task category management
- System configuration

## Technical Stack

**Current Implementation**:
- ✅ **Frontend**: React 18.3 + TypeScript
- ✅ **Styling**: Tailwind CSS
- ✅ **Icons**: lucide-react
- ✅ **UI Components**: Custom components (ready for shadcn/ui integration)

**Recommended Full Stack** (aligned with Staff repository):
- **Build Tool**: Vite with React SWC plugin
- **Frontend**: React 18.3 + TypeScript ✅
- **UI Components**: shadcn/ui (built on Radix UI)
- **Styling**: Tailwind CSS v4 with CSS variables ✅
- **State Management**: React hooks (or consider Zustand/Redux for complex multi-store state)
- **Data Fetching**: TanStack Query (React Query) recommended for server state management
- **Routing**: React Router for multi-page management interface
- **Charts/Visualization**: Recharts (already used in Staff app)
- **Form Handling**: React Hook Form
- **Icons**: lucide-react ✅
- **Backend API**: REST or GraphQL (to be determined)
- **Cloud Infrastructure**: Cloud-ready deployment

## Design System & Styling Consistency

**IMPORTANT**: This app should maintain visual consistency with the Staff Tablet app. See `STAFF_TABLET_STYLING_REFERENCE.md` for complete details.

### Color System (from Staff app)

**Brand Color**: Custom Pink `#D61F69` - use for primary actions and navigation ✅ **(Currently using #D61F69)**

**Status Colors** (must match Staff app):
- Open: Gray (`bg-gray-100 border-gray-300 text-gray-700`)
- Processing: Purple (`bg-purple-100 border-purple-300 text-purple-700`)
- Pending: Yellow (`bg-yellow-100 border-yellow-300 text-yellow-700`)
- Awaiting Approval: Blue (`bg-blue-100 border-blue-300 text-blue-700`)
- Done: Green (`bg-green-100 border-green-300 text-green-700`)
- Cancelled: Red (`bg-red-100 border-red-300 text-red-700`)

**Task Type Colors**:
- DWS: Blue (`bg-blue-500`)
- WS: Orange (`bg-orange-500`)

### Reusable Components & Utilities

Copy these from the Staff app (see `STAFF_TABLET_STYLING_REFERENCE.md`):

1. **Core Utilities**:
   - `cn()` function from `lib/utils.ts` - merges Tailwind classes
   - `getStatusColor()` - returns status badge colors
   - `getTaskTypeColor()` - returns task type colors
   - `formatTime()`, `formatDate()` - consistent formatting

2. **UI Components** (shadcn/ui):
   - Button, Card, Badge, Dialog, Tabs
   - Input, Label, Select, Switch
   - Dropdown Menu, Popover, Tooltip
   - All components from `src/components/ui/`

3. **CSS Variables**:
   - Copy `globals.css` for consistent color tokens ✅ **(globals.css exists)**
   - Use same `--radius`, `--border`, `--primary`, etc.
   - Maintain dark mode support (optional for HQ app)

### Desktop-Specific Enhancements

While maintaining visual consistency, add desktop-optimized features:
- Larger layouts with multi-column views ✅ **(Implemented in AI Task Assignment)**
- Hover states and tooltips for dense information
- Keyboard navigation shortcuts
- Context menus (right-click actions)
- Resizable panels and split views
- Advanced data tables with sorting/filtering

## Repository Structure

**Current Structure**:
```
/
├── App.tsx                     # ✅ AI Task Assignment main component
├── Attributions.md            # Attribution information
├── guidelines/
│   └── Guidelines.md          # Development guidelines
├── imports/                   # Imported design assets
│   ├── HttpsRetailflow...tsx  # Original imported design
│   └── svg-il1r19guj0.ts     # SVG assets
└── styles/
    └── globals.css            # ✅ Global styles and CSS variables
```

**Planned Structure**:
```
requirement/          # Requirement documents (to be added)
  ├── proposal-contents.MD           # Slide deck structure/proposal outline
  ├── meeting-minutes-chinh.txt      # Client meeting notes (Vietnamese)
  ├── meeting-minutes-duc.txt        # Technical requirements notes
  └── meeting-minutes-nguyen.txt     # Detailed system requirements

screenshot/           # UI mockups and design references (to be added)
  ├── ai-assigned-task.png
  ├── ai-task-assignment-break-down.png
  ├── ai-task-assignment-scenarios.png
  ├── ai-task-assignment.png
  ├── staff-task-DWS.png
  ├── staff-task-WS.png
  └── staff-task-assigned-screen.png

STAFF_REPORSITORY_CLAUDE.md         # Reference documentation for Staff tablet app
STAFF_TABLET_STYLING_REFERENCE.md   # Styling, components, and utilities to reuse
IMPLEMENTATION_PLAN.md              # Step-by-step implementation plan (13 phases)
QUICK_START.md                      # Quick setup guide (get running in 10 minutes)
PROJECT_OVERVIEW.md                 # ✅ This file
```

## Integration with Staff Application

**Division of Responsibilities**:

**Staff App (Tablet)** - Task Execution:
- View assigned tasks (Timeline, Kanban, List views)
- Update task status (Open → Processing → Done)
- View shift schedule
- Check-in/check-out attendance
- View leaderboard rankings
- Mock data currently in `lib/mockData.ts`

**HQ/Manager App (This Repo)** - Task Management & Oversight:
- Create and assign tasks to staff
- AI-assisted task distribution ✅ **(Prototype implemented)**
- Monitor real-time task progress across all staff/stores
- Manage staff schedules and leave requests
- Performance analytics and reporting
- Master data management (task templates, categories, stores)
- Multi-store oversight (SI/AM roles)
- Global leaderboard management

**Shared Backend Requirements**:
- Both apps will communicate with the same backend API
- Real-time updates for task status changes
- Consistent data models for tasks, shifts, users, stores
- Role-based access control (Staff vs Manager vs HQ vs Admin)
- Integration with Edoc system for attendance data

**API Endpoints to Consider**:
- Task CRUD and assignment operations
- Bulk task assignment for 110 DWS tasks
- Real-time task status updates
- Staff/store management endpoints
- Performance analytics aggregation
- Leaderboard calculations
- Shift and attendance data sync

**Shared Data Models** (must align with Staff app):

See `STAFF_TABLET_STYLING_REFERENCE.md` for complete type definitions. Key types:

```typescript
// Task statuses (must match Staff app exactly)
export type TaskStatus = 'Open' | 'Processing' | 'Pending' | 'Awaiting Approval' | 'Done' | 'Cancelled';

// Task types
export type TaskType = 'DWS' | 'WS';

// AI verification for WS tasks
export type AIVerificationStatus = 'pending' | 'passed' | 'failed' | 'not_required';

export interface Task {
  id: string;
  title: string;
  staffId: string;               // Single staff assignment (Staff app)
  // assignedTo?: string[];      // Multiple staff assignment (Manager app extension)
  status: TaskStatus;
  type: TaskType;
  startTime: string;             // Format: "HH:MM"
  endTime: string;               // Format: "HH:MM"
  estimatedMinutes: number;
  actualMinutes?: number;
  description?: string;
  date: string;                  // ISO date string
  guide?: string;                // Manual reference (e.g., "1.2.a")
  sampleImages?: string[];       // For WS tasks
  completionPhotos?: string[];   // Uploaded by staff
  aiVerificationStatus?: AIVerificationStatus;
  aiVerificationMessage?: string;
  requiresHQApproval?: boolean;
  autoApproved?: boolean;
  cancellationReason?: string;
}

export interface Staff {
  id: string;
  name: string;
  shiftStart: string;
  shiftEnd: string;
  taskAssignmentPercentage: number;
  building: string;              // Store/building name
  city: string;
  region: string;
}

export interface Shift {
  id: string;
  staffId: string;
  date: string;                  // ISO date string
  scheduledStart: string;        // Format: "HH:MM"
  scheduledEnd: string;          // Format: "HH:MM"
  actualCheckIn?: string;        // Format: "HH:MM"
  actualCheckOut?: string;       // Format: "HH:MM"
  isOff: boolean;
  shiftName?: string;
  taskAssignmentPercentage?: number;
}

export interface LeaderboardEntry {
  staffId: string;
  staffName: string;
  tasksCompleted: number;
  completionRate: number;        // Percentage
  totalHours: number;
  efficiency: number;            // Percentage
  rank: number;
}

// Additional types for HQ/Manager app
export interface Store {
  id: string;
  name: string;
  regionId: string;
  cityId: string;
  address: string;
  storeManagerId: string;
  staffCount: number;
  isActive: boolean;
}

export interface Region {
  id: string;
  name: string;
  cityId: string;
  storeCount: number;
}

export interface TaskTemplate {
  id: string;
  title: string;
  category: string;
  type: TaskType;
  estimatedMinutes: number;
  description?: string;
  guide?: string;
  isActive: boolean;
  order: number;                 // For sorting 110 DWS tasks
}

// AI Scenario types (currently implemented)
export interface AIScenario {
  id: string;
  name: string;
  description: string;
  icon: string;
  iconColor: string;
  iconTextColor?: string;
  metrics: {
    workload: number;
    timeEst: string;
    satisfaction: number;
    success: number;
  };
  tags: string[];
}
```

## Key Design Considerations

1. **Workload Distribution** ✅ **(Partially Implemented)**:
   - Reduce Store Manager workload for task assignment
   - Smart/AI-assisted task assignment to balance workload ✅
   - Automatic task allocation based on shift data
   - Bulk assignment for 110 DWS tasks

2. **Performance Tracking** ✅ **(Metrics UI Implemented)**:
   - Time measurement per task (15-min minimum units)
   - Category-based aggregation
   - Store-level performance comparison
   - Gap filling for idle time optimization

3. **Scalability**:
   - Must support 300 stores simultaneously
   - SI role managing 220+ tasks (2 stores × 110 tasks)
   - AM role managing multiple stores across regions
   - Efficient UI/UX for multi-store visibility
   - Handle concurrent task updates from multiple staff

4. **Desktop-Optimized UX** ✅ **(Implemented in AI Assignment)**:
   - Multi-panel layouts for complex data views ✅
   - Keyboard shortcuts for power users
   - Advanced filtering and search capabilities
   - Export functionality for reports
   - Drag-and-drop task assignment
   - Split-screen views for multi-store management

5. **Data Synchronization**:
   - One-way sync from Edoc for attendance data
   - Handle discrepancies in shift schedules vs attendance
   - Support for manual override/adjustment
   - Real-time updates across Staff and Manager apps

## Important Notes

- Edoc system integration is temporary; Edoc may be discontinued
- AEON has multiple departments with separate IT systems/apps
- Previous vendor (Hansoku) being discontinued end of year
- Manual update frequency: ~2 times per year by Kaizen department
- Store operating hours: 6:00 - 22:30
- Average daily customers: 300-350 per store
- Daily routine tasks: 95%, ad-hoc tasks: 5%

## Recommended Application Structure

```
src/
├── pages/
│   ├── Dashboard.tsx           # Overview metrics, quick actions
│   ├── TaskManagement/
│   │   ├── TaskAssignment.tsx  # ✅ Bulk task assignment with AI assistance (IMPLEMENTED)
│   │   ├── TaskMonitoring.tsx  # Real-time task progress tracking
│   │   └── TaskTemplates.tsx   # Manage 110 DWS task templates
│   ├── ShiftManagement/
│   │   ├── ShiftSchedule.tsx   # Schedule management
│   │   ├── LeaveRequests.tsx   # Approve/reject leave requests
│   │   └── Attendance.tsx      # Edoc sync and attendance tracking
│   ├── Analytics/
│   │   ├── Performance.tsx     # Store/staff performance metrics
│   │   ├── TimeTracking.tsx    # Task time analysis
│   │   └── Leaderboard.tsx     # Multi-level rankings
│   ├── StoreManagement/
│   │   ├── StoreList.tsx       # For SI/AM/HQ multi-store view
│   │   ├── StoreDetails.tsx    # Individual store overview
│   │   └── StaffManagement.tsx # Staff CRUD and assignment
│   └── Admin/
│       ├── UserManagement.tsx  # System users and roles
│       ├── Categories.tsx      # Task categories
│       └── Settings.tsx        # System configuration
├── components/
│   ├── task/                   # Task-related components
│   ├── analytics/              # Charts and metrics components
│   ├── layout/                 # Sidebar, header, navigation
│   └── ui/                     # shadcn/ui components
├── lib/
│   ├── api.ts                  # API client
│   ├── types.ts                # Shared TypeScript types
│   └── utils.ts                # Utility functions
└── hooks/
    ├── useTasks.ts
    ├── useStores.ts
    └── useAnalytics.ts
```

## Development Priorities

### Phase 1: Foundation ✅ **(In Progress)**
- [x] AI Task Assignment prototype
- [x] Basic UI structure with header and navigation
- [x] Scenario selection and visualization
- [x] Gantt chart for task timeline
- [ ] Setup routing with React Router
- [ ] Implement shadcn/ui components
- [ ] Create utility functions and type definitions

### Phase 2: Core Features (Next Steps)
1. **Task Assignment & Distribution**:
   - Complete AI-assisted task assignment flow
   - Backend integration for scenario generation
   - Bulk task allocation across staff
   - Template-based assignment for recurring 110 DWS tasks
   - Drag-and-drop interface for manual adjustments

2. **Multi-store Management**:
   - Efficient UI for SI/AM roles managing multiple stores
   - Scalable views supporting 300 stores
   - Cross-store staff allocation interface
   - Store selector/switcher for quick navigation

3. **Performance Analytics & Dashboards**:
   - Real-time monitoring dashboards
   - Store/Regional/Global performance comparison
   - Time tracking analytics (estimated vs actual)
   - Category-based task aggregation
   - Export to Excel/PDF functionality

4. **Master Data Management**:
   - Task template management (110 DWS tasks)
   - Category management system
   - Store and user administration
   - Role-based permission system

5. **Integration Layer**:
   - Flexible design for Edoc sync (anticipate future changes)
   - API design for Staff tablet app integration
   - WebSocket for real-time updates

6. **Leaderboard & Reporting**:
   - Multi-level rankings (Store/Regional/Global)
   - Performance metrics and KPIs
   - Export and reporting capabilities

## Language Support

- UI: Likely Vietnamese and English
- Meeting minutes are in Vietnamese
- Technical documentation should be in English

## Project Initialization Guide

### Current Setup Status
✅ Basic React + TypeScript setup
✅ Tailwind CSS configured
✅ lucide-react icons installed
✅ Initial component structure

### Next Steps for Full Setup

#### 1. Install Additional Dependencies
```bash
# Core UI dependencies (shadcn/ui)
npm install @radix-ui/react-slot @radix-ui/react-dialog @radix-ui/react-dropdown-menu
npm install @radix-ui/react-select @radix-ui/react-tabs @radix-ui/react-tooltip
npm install @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-avatar
npm install @radix-ui/react-checkbox @radix-ui/react-label @radix-ui/react-popover
npm install @radix-ui/react-switch

# Utilities
npm install class-variance-authority clsx tailwind-merge

# Form handling
npm install react-hook-form

# Charts
npm install recharts

# Routing
npm install react-router-dom

# State management (optional, but recommended)
npm install @tanstack/react-query zustand

# Build tool (if not already using Vite)
npm create vite@latest . -- --template react-swc-ts
```

#### 2. Copy Shared Files from Staff Repository

**From `STAFF_TABLET_STYLING_REFERENCE.md`, copy:**
- `src/lib/utils.ts` - Utility functions (cn, getStatusColor, etc.)
- `src/types/index.ts` - TypeScript type definitions
- `src/components/ui/` - All shadcn/ui components
- Update `src/styles/globals.css` with CSS variables from Staff app

#### 3. Configure Vite

Update `vite.config.ts`:
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,  // Different from Staff app (3000)
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'build',
  },
})
```

#### 4. Project Structure Setup

Create the recommended folder structure:
```bash
mkdir -p src/{pages,components,lib,hooks,types}
mkdir -p src/pages/{Dashboard,TaskManagement,ShiftManagement,Analytics,StoreManagement,Admin}
mkdir -p src/components/{task,analytics,layout,ui}
```

#### 5. Environment Variables

Create `.env` file:
```
VITE_API_URL=http://localhost:8000/api
VITE_WS_URL=ws://localhost:8000/ws
```

## Important Development Notes

1. **Type Safety**: Use the exact same TypeScript types as Staff app for Tasks, Shifts, Staff to ensure API compatibility

2. **Visual Consistency**: Always reference `STAFF_TABLET_STYLING_REFERENCE.md` when creating new components to maintain consistent colors, spacing, and interaction patterns

3. **Component Reuse**: Don't recreate shadcn/ui components - copy them directly from the Staff app to ensure consistency

4. **Status Colors**: Never hardcode status colors - always use the `getStatusColor()` utility function

5. **Real-time Updates**: Plan for WebSocket integration to sync with Staff app updates in real-time

6. **Testing**: Test cross-browser (Chrome, Safari, Firefox) and ensure layout works on various desktop screen sizes

7. **Performance**: With 300 stores and potentially 33,000 tasks (300 × 110), implement:
   - Virtual scrolling for large lists
   - Pagination for data tables
   - Debounced search and filters
   - Optimistic UI updates

8. **Accessibility**: Maintain ARIA attributes from shadcn/ui components, keyboard navigation, and screen reader support

## Current Implementation Details

### AI Task Assignment (`/App.tsx`)

**Features Implemented**:
- ✅ Step indicator showing progress (Step 1: Date Selection → Step 2: Scenario Generation → Step 3: Confirmation)
- ✅ Four AI scenario cards with metrics:
  - Balanced (85% workload, 7.5h, 92% satisfaction, 88% success)
  - Speed (95% workload, 6.2h, 78% satisfaction, 82% success)
  - Efficiency (88% workload, 7.8h, 85% satisfaction, 90% success)
  - Custom (82% workload, 8.0h, 95% satisfaction, 85% success)
- ✅ Interactive scenario selection
- ✅ Gantt chart visualization with staff schedules
- ✅ Time slot headers (08:00 - 17:00)
- ✅ Color-coded tasks (Morning Briefing, Inventory Check, Customer Service, etc.)
- ✅ Staff profiles with avatars and roles
- ✅ Assignment scorecard with 4 key metrics
- ✅ View mode toggle (Gantt/List)
- ✅ Navigation header with RetailFlow branding
- ✅ Help section with support resources

**Mock Data Included**:
- 3 staff members (Sarah Johnson, Mike Chen, Emily Rodriguez)
- Task schedules with color coding
- Metric calculations per scenario

**Next Steps for This Feature**:
1. Connect to backend API for real scenario generation
2. Add date picker for Step 1
3. Implement confirmation flow for Step 3
4. Add drag-and-drop task editing
5. Implement export/print functionality
6. Add undo/redo for manual edits
7. Store selected scenario preferences

## Getting Started

1. **View the current prototype**:
   - The AI Task Assignment interface is already implemented in `/App.tsx`
   - Review the code to understand the component structure

2. **Install dependencies** (if needed):
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Next development tasks**:
   - Set up proper routing structure
   - Create additional pages (Dashboard, Task Monitoring, etc.)
   - Integrate with backend API
   - Add authentication and role-based access
   - Implement data persistence

## Related Documentation

- `STAFF_REPORSITORY_CLAUDE.md` - Staff tablet app reference
- `STAFF_TABLET_STYLING_REFERENCE.md` - Styling guide and shared components
- `IMPLEMENTATION_PLAN.md` - Detailed 13-phase implementation plan
- `QUICK_START.md` - 10-minute quick start guide
- `guidelines/Guidelines.md` - Development guidelines
