# Setup Instructions

## Installation

To run this project, you need to install the required dependencies:

```bash
npm install react-router-dom
```

This adds routing capabilities to the application.

## Running the Application

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
/
├── App.tsx                          # Main app with routing
├── components/
│   └── Layout.tsx                   # Sidebar layout wrapper
├── pages/
│   ├── Dashboard.tsx                # ✅ Overview dashboard
│   ├── AITaskAssignment.tsx         # ✅ AI task assignment
│   ├── TaskMonitoring.tsx           # ✅ Real-time task monitoring
│   ├── DWSTaskTemplates.tsx         # ✅ Manage 110 DWS templates (Daily Work Standard)
│   ├── WSTaskTemplates.tsx          # ✅ Manage WS templates (Work Standard - Event-based)
│   ├── StaffManagement.tsx          # ✅ Staff CRUD & management
│   ├── ShiftSchedule.tsx            # ✅ Weekly shift planning
│   ├── LeaveRequests.tsx            # ✅ Approve leave requests
│   ├── Attendance.tsx               # Attendance tracking (placeholder)
│   ├── Performance.tsx              # Analytics (placeholder)
│   ├── Leaderboard.tsx              # ✅ Multi-level rankings
│   ├── StoreList.tsx                # Store management (placeholder)
│   └── Settings.tsx                 # Settings (placeholder)
└── imports/                         # Figma imported assets
    ├── figma:asset/*.png            # Staff avatars
    └── svg-*.ts                     # SVG icons
```

## Features Implemented

### ✅ Fully Functional Pages

1. **Dashboard** (`/`)
   - Stats overview (Active Tasks, Staff on Duty, Completion Rate, Pending Approvals)
   - Recent tasks list with status badges
   - Upcoming shifts timeline
   - Store performance table
   - Quick action cards

2. **AI Task Assignment** (`/task-assignment`)
   - 3-step progress indicator
   - 4 AI scenarios (Balanced, Speed, Efficiency, Custom)
   - Interactive scenario selection
   - Gantt chart visualization
   - Assignment scorecard with metrics
   - View mode toggle (Gantt/List)

3. **Task Monitoring** (`/task-monitoring`)
   - Real-time task tracking
   - 3 view modes: Timeline, Kanban, List
   - Search and filter functionality
   - Task status tracking
   - Progress indicators

4. **DWS Task Templates** (`/dws-templates`)
   - 110 daily work standard templates
   - Category-based filtering (POS, Inventory, Customer Service, etc.)
   - Manual reference links for each task
   - "Open Guide" button to external manual app
   - Template management (Edit, Copy, Delete)
   - Estimated time and task order

5. **WS Task Templates** (`/ws-templates`)
   - Event-based work standard templates
   - Photo sample requirements (2-5 reference images per task)
   - AI auto-approval vs HQ manual approval settings
   - Photo verification workflow indicators
   - Seasonal/category filtering
   - Template management with approval configuration

6. **Staff Management** (`/staff`)
   - Grid and List views
   - Staff profiles with avatars
   - Performance metrics
   - Contact information
   - Task completion statistics

7. **Shift Schedule** (`/shift-schedule`)
   - Weekly calendar view
   - Staff shift assignments
   - Day off and leave indicators
   - Week navigation
   - Hours summary

8. **Leave Requests** (`/leave-requests`)
   - Pending requests list
   - Approve/Reject actions
   - Leave type categorization
   - Duration tracking
   - Request history

9. **Leaderboard** (`/leaderboard`)
   - Top 3 podium display
   - Staff rankings with points
   - Store rankings
   - Multi-level view (Store/Regional/Global)
   - Performance metrics

### 🚧 Placeholder Pages

These pages have basic structure but need full implementation:

- **Attendance** (`/attendance`) - Edoc integration and check-in/check-out tracking
- **Performance** (`/performance`) - Detailed analytics and charts
- **Store List** (`/stores`) - Multi-store management
- **Settings** (`/settings`) - System configuration

## Navigation

The app uses a collapsible sidebar with the following structure:

- **Dashboard** - Home page
- **Task Management**
  - AI Task Assignment
  - Task Monitoring
  - DWS Templates (Daily Work Standard)
  - WS Templates (Work Standard - Event-based)
- **Staff Management** - Employee management
- **Shift Management**
  - Shift Schedule
  - Leave Requests
  - Attendance
- **Analytics**
  - Performance
  - Leaderboard
- **Store Management**
  - Store List
- **Settings**

## Design System

- **Primary Color**: Pink #D61F69
- **Status Colors**: Consistent with Staff tablet app
  - Open: Gray
  - Processing: Purple
  - Pending: Yellow
  - Awaiting Approval: Blue
  - Done: Green
  - Cancelled: Red
- **Task Types**:
  - DWS: Blue
  - WS: Orange

## Next Steps

1. Connect to backend API
2. Implement real-time WebSocket updates
3. Complete placeholder pages
4. Add authentication
5. Integrate with Edoc system
6. Add data export functionality
7. Implement drag-and-drop task editing
8. Add advanced filtering and search
