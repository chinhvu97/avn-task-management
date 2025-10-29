# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**RetailFlow Manager** - HQ and Store Manager interface for AEON Vietnam retail task and shift management system. This is a React + TypeScript web application for PC/laptop users (HQ, Store Managers, Regional/Area Managers) to manage task assignment, staff scheduling, and performance analytics across 26 stores (scaling to 300 by 2030).

**Related Repository**: Staff tablet UI is maintained separately. See `src/PROJECT_OVERVIEW.md` for integration details.

**Current Status**: Prototype phase with AI Task Assignment feature implemented. Core functionality needs backend integration.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (runs on port 3000)
npm run dev

# Build for production
npm run build
```

## Architecture

### Technology Stack
- **Frontend**: React 18.3 + TypeScript
- **Build Tool**: Vite 6.3.5 with React SWC plugin
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS with custom globals
- **Icons**: lucide-react
- **State**: React hooks (no global state management yet)

### Key Design Patterns

**Route Structure** (`src/App.tsx`):
- All routes wrapped in `<Layout>` component with collapsible sidebar
- Pages are loaded directly (no lazy loading yet)
- Current routes: Dashboard, Task Management (4 sub-pages), Staff, Shift Management (3 sub-pages), Analytics (2 sub-pages), Store Management, Settings

**Layout System** (`src/components/Layout.tsx`):
- Two-column layout: collapsible sidebar (64px collapsed, 256px expanded) + main content area
- Sidebar navigation with expandable sections
- Persistent header with notification bell and user profile
- Uses React Router's `useLocation` for active link highlighting

**Page Architecture**:
- Pages are self-contained components in `src/pages/`
- Mock data defined inline (no central data store yet)
- Consistent card-based layouts with Tailwind utilities
- Primary brand color: Pink #D61F69

### Critical Business Logic

**Task Types** (see `src/TASK_TEMPLATE_GUIDE.md`):
1. **DWS (Daily Work Standard)**: 110 recurring daily tasks with manual reference links
   - Blue color badge (`bg-blue-500`)
   - No photo upload required
   - Simple status: Open → Processing → Done
   - Each task linked to external manual guide

2. **WS (Work Standard)**: Event-based/seasonal tasks requiring photo verification
   - Orange color badge (`bg-orange-500`)
   - Requires photo upload (2-5 sample images)
   - Two approval methods: AI auto-approval OR HQ manual approval
   - Status flow: Open → Processing → Pending → Awaiting Approval → Done

**Task Statuses** (must match Staff app):
- Open (Gray)
- Processing (Purple)
- Pending (Yellow)
- Awaiting Approval (Blue)
- Done (Green)
- Cancelled (Red)

**AI Task Assignment** (`src/pages/AITaskAssignment.tsx`):
- 3-step workflow: Date Selection → Scenario Generation → Confirmation
- Four AI scenarios: Balanced, Speed, Efficiency, Custom
- Gantt chart visualization with time slots (08:00-17:00)
- Assignment scorecard metrics: workload %, time estimate, satisfaction %, success rate %

**Organizational Hierarchy**:
```
Staff → Store Manager → SI (2+ stores) → AM (area/region) → HQ → Super Admin
```

### File Structure

```
src/
├── App.tsx                    # Router and route definitions
├── main.tsx                   # React entry point
├── index.css                  # Tailwind directives
├── components/
│   └── Layout.tsx             # Sidebar + header layout wrapper
├── pages/                     # All page components
│   ├── Dashboard.tsx          # Home page with stats and recent activity
│   ├── AITaskAssignment.tsx   # ✅ AI-powered task assignment (prototype complete)
│   ├── TaskMonitoring.tsx     # Real-time task tracking
│   ├── DWSTaskTemplates.tsx   # 110 daily task templates with manual refs
│   ├── WSTaskTemplates.tsx    # Event task templates with photo verification
│   ├── StaffManagement.tsx    # Staff profiles and performance
│   ├── ShiftSchedule.tsx      # Weekly shift planning
│   ├── LeaveRequests.tsx      # Leave approval workflow
│   ├── Attendance.tsx         # (Placeholder) Edoc integration
│   ├── Performance.tsx        # (Placeholder) Analytics
│   ├── Leaderboard.tsx        # Multi-level rankings
│   ├── StoreList.tsx          # (Placeholder) Multi-store management
│   └── Settings.tsx           # (Placeholder) Configuration
├── styles/
│   └── globals.css            # Global styles and CSS variables
├── imports/                   # Figma design assets (original imported design)
├── guidelines/                # Development guidelines
├── PROJECT_OVERVIEW.md        # Comprehensive project documentation
├── SETUP_INSTRUCTIONS.md      # Page-by-page implementation status
└── TASK_TEMPLATE_GUIDE.md     # DWS vs WS task type specifications
```

## Development Patterns

### Component Style
- Use functional components with TypeScript
- Props defined with inline interfaces (no separate type files yet)
- Mock data defined within components as constants
- Tailwind CSS for all styling (no CSS modules or styled-components)

### Color System
**Primary Brand**: `#D61F69` (Pink) - used for buttons, active states, focused elements

**Status Colors**:
```typescript
// Open: bg-gray-100 border-gray-300 text-gray-700
// Processing: bg-purple-100 border-purple-300 text-purple-700
// Pending: bg-yellow-100 border-yellow-300 text-yellow-700
// Awaiting Approval: bg-blue-100 border-blue-300 text-blue-700
// Done: bg-green-100 border-green-300 text-green-700
// Cancelled: bg-red-100 border-red-300 text-red-700
```

**Task Type Colors**:
- DWS: `bg-blue-500` (Blue)
- WS: `bg-orange-500` (Orange)

### Vite Configuration
- Path alias: `@` → `./src`
- Figma asset aliases for 4 PNG images
- Build output: `build/` directory
- Dev server port: 3000 (auto-open enabled)

## Backend Integration (Planned)

**Current State**: All data is mocked within components
**Future**: REST or GraphQL API with WebSocket for real-time updates

**Key API Endpoints to Implement**:
```
# Task Management
GET  /api/tasks              # List tasks with filters
POST /api/tasks              # Create task
PUT  /api/tasks/:id          # Update task
POST /api/tasks/bulk-assign  # AI-assisted bulk assignment

# Templates
GET  /api/templates/dws      # 110 daily task templates
GET  /api/templates/ws       # Event task templates
POST /api/templates/ws/:id/photos  # Upload sample photos

# Staff & Shifts
GET  /api/staff              # Staff list
GET  /api/shifts             # Shift schedules
POST /api/leave-requests     # Submit leave request
PUT  /api/leave-requests/:id # Approve/reject

# Analytics
GET  /api/leaderboard        # Rankings (store/regional/global)
GET  /api/performance        # Performance metrics
GET  /api/analytics          # Task completion analytics
```

## Data Models

**Task Interface** (align with Staff app):
```typescript
interface Task {
  id: string;
  title: string;
  staffId: string;             // Single assignment (or string[] for multiple)
  status: 'Open' | 'Processing' | 'Pending' | 'Awaiting Approval' | 'Done' | 'Cancelled';
  type: 'DWS' | 'WS';
  startTime: string;           // "HH:MM"
  endTime: string;             // "HH:MM"
  estimatedMinutes: number;
  actualMinutes?: number;
  description?: string;
  date: string;                // ISO date
  guide?: string;              // Manual reference (DWS only)
  sampleImages?: string[];     // Reference photos (WS only)
  completionPhotos?: string[]; // Uploaded by staff (WS only)
  aiVerificationStatus?: 'pending' | 'passed' | 'failed' | 'not_required';
  requiresHQApproval?: boolean;
  autoApproved?: boolean;
}
```

**AI Scenario Interface**:
```typescript
interface AIScenario {
  id: string;
  name: string;
  description: string;
  icon: string;
  iconColor: string;
  metrics: {
    workload: number;        // Percentage (0-100)
    timeEst: string;         // e.g., "7.5h"
    satisfaction: number;    // Percentage (0-100)
    success: number;         // Percentage (0-100)
  };
  tags: string[];
}
```

## Styling Consistency

**Visual Alignment with Staff App**: This app must maintain consistent colors, status indicators, and task type badges with the Staff tablet app. Before creating new UI components, reference the Staff app's design system (see `src/PROJECT_OVERVIEW.md` section "Design System & Styling Consistency").

**Desktop-Optimized Features**:
- Multi-column layouts (unlike tablet's single column)
- Hover states and tooltips
- Context menus and keyboard shortcuts
- Resizable panels
- Advanced data tables with sorting/filtering

## Important Constraints

1. **Scalability**: Must support 300 stores by 2030
   - Efficient rendering for 33,000 tasks (300 stores × 110 DWS tasks)
   - Consider virtual scrolling for large lists
   - Pagination for data tables

2. **Integration**:
   - One-way data sync from Edoc system (attendance/shifts)
   - Edoc may be discontinued (design for future-proofing)
   - Real-time sync with Staff tablet app

3. **Task Assignment Workflow**:
   - Bulk assignment of 110 DWS tasks per store per day
   - AI-assisted workload balancing (reduce manual burden)
   - Manual override and drag-and-drop editing

4. **Photo Verification** (WS tasks only):
   - AI analyzes uploaded photos vs sample images
   - Falls back to HQ manual approval if AI uncertain
   - Critical tasks (safety/compliance) always require HQ approval

5. **Multi-Store Management**:
   - SI role: Manage 2+ stores (220+ tasks)
   - AM role: Multi-region oversight
   - Efficient store switcher/selector UI

## Common Development Tasks

### Adding a New Page
1. Create component in `src/pages/YourPage.tsx`
2. Add route in `src/App.tsx`
3. Add navigation item in `src/components/Layout.tsx` navigation array
4. Follow existing page structure patterns (header, cards, tables)

### Working with Status Colors
Always use the documented status color combinations. Never hardcode status colors - consider creating a utility function:
```typescript
function getStatusColor(status: TaskStatus) {
  const colors = {
    'Open': 'bg-gray-100 border-gray-300 text-gray-700',
    'Processing': 'bg-purple-100 border-purple-300 text-purple-700',
    // ... etc
  };
  return colors[status];
}
```

### Adding Mock Data
Currently, mock data is defined inline within components. When adding features:
- Define mock data as constants at top of component
- Use realistic data that reflects actual business requirements
- Include all required fields from data models

### Testing Multi-Store Scenarios
When implementing features for SI/AM roles:
- Test with 2+ stores for SI role (220 tasks minimum)
- Test cross-store staff allocation
- Verify store switcher functionality
- Ensure performance with large datasets

## Future Enhancements

### Phase 1 (Foundation) - In Progress
- [x] AI Task Assignment prototype
- [x] Basic routing and navigation
- [x] Page layouts for all major features
- [ ] shadcn/ui component integration
- [ ] Central type definitions
- [ ] Utility functions library

### Phase 2 (Core Features) - Next
- Backend API integration
- Real-time WebSocket updates
- Complete AI scenario generation flow
- Drag-and-drop task editing
- Authentication and role-based access
- Edoc system integration

### Phase 3 (Analytics & Reporting)
- Performance dashboards
- Time tracking analytics
- Export to Excel/PDF
- Advanced filtering and search
- Calendar heatmap visualization

## Code References

When implementing features:
- **DWS templates**: See `src/pages/DWSTaskTemplates.tsx:1`
- **WS templates**: See `src/pages/WSTaskTemplates.tsx:1`
- **AI scenarios**: See `src/pages/AITaskAssignment.tsx:1`
- **Navigation**: See `src/components/Layout.tsx:25`
- **Mock data patterns**: See `src/pages/Dashboard.tsx:1`

## Business Context

- **Target Users**: HQ staff, Store Managers, SI (multi-store managers), AM (area managers)
- **Current Scale**: 26 AEON Vietnam stores
- **2030 Goal**: 300 stores nationwide
- **Average Staff**: ~10 per store
- **Daily Tasks**: 110 DWS tasks per store
- **Store Hours**: 06:00 - 22:30
- **Deployment**: May 2026

For complete business requirements, organizational hierarchy, and integration details, see `src/PROJECT_OVERVIEW.md`.
