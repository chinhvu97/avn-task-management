# Task Creation & Assignment Workflow Requirements

**Document Version**: 1.0
**Last Updated**: 2025-10-29
**Source**: requirement/images/DWS.png, requirement/images/WS.png

---

## Table of Contents
1. [Overview](#overview)
2. [DWS Workflow (Daily Work Standard)](#dws-workflow-daily-work-standard)
3. [WS Workflow (Work Standard - Event Tasks)](#ws-workflow-work-standard---event-tasks)
4. [Workflow Comparison](#workflow-comparison)
5. [Current Implementation Status](#current-implementation-status)
6. [Missing Features by Role](#missing-features-by-role)
7. [Implementation Roadmap](#implementation-roadmap)

---

## Overview

The RetailFlow Manager system supports two distinct task workflows:

- **DWS (Daily Work Standard)**: Recurring daily tasks automated from HQ to all stores
- **WS (Work Standard)**: Event/seasonal tasks with AI photo verification

Both workflows follow the pattern: **HQ Creates → System Distributes → Store Manager Assigns → Staff Executes**

---

## DWS Workflow (Daily Work Standard)

### Purpose
Automate daily recurring tasks and manage progress with real-time KPI tracking across all stores.

### Actors

| Actor | Japanese | Role | Responsibility |
|-------|----------|------|----------------|
| **HQ Staff** | 本部担当 | Template Creator | Create 110 recurring task instructions |
| **System** | システム | Automation Engine | Auto-distribute DWS to all stores daily |
| **Store Manager** | 店長 | Task Assigner | Assign tasks to staff members using AI |
| **Store Staff** | 店舗スタッフ | Task Executor | Execute work and mark complete |

### Workflow Steps

```
┌─────────────────────────────────────────────────────────────┐
│  STEP 1: HQ STAFF - 指示作成 (Create Instructions)          │
├─────────────────────────────────────────────────────────────┤
│  Actions:                                                   │
│  • Create recurring task templates (110 tasks)             │
│  • Set schedule (daily morning/evening/all-day, weekly)    │
│  • Link manual reference guides (e.g., 1.1.1, 1.2.3)       │
│  • Define estimated time per task                          │
│  • Set task priority (High/Medium/Low)                     │
│  • Assign task category (POS, Inventory, Cleaning, etc.)   │
│                                                             │
│  Result: 定期タスク設定 (Recurring task configuration)       │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  STEP 2: SYSTEM - DWSへ店舗に指定 (Auto-assign to Stores)   │
├─────────────────────────────────────────────────────────────┤
│  Actions:                                                   │
│  • Push 110 DWS templates to ALL 26 stores                 │
│  • Run daily automation (e.g., 6:00 AM)                    │
│  • Generate task instances for each store                  │
│  • Set status = "Open" for all new tasks                   │
│                                                             │
│  Result: Each store receives 110 tasks automatically       │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  STEP 3: STORE MANAGER - タスクアサイン (Task Assignment)    │
├─────────────────────────────────────────────────────────────┤
│  Actions:                                                   │
│  • View 110 received tasks from HQ                         │
│  • Use AI Task Assignment feature                          │
│    - Select date (today/tomorrow/future)                   │
│    - Choose AI scenario (Balanced/Speed/Efficiency/Custom) │
│    - Review Gantt chart visualization                      │
│  • Adjust assignments manually (drag & drop)               │
│  • Confirm assignment → Push to staff tablets              │
│                                                             │
│  Result: Tasks assigned to ~10 staff members               │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  STEP 4: STAFF - タスク着手 (Start Task)                     │
├─────────────────────────────────────────────────────────────┤
│  Actions:                                                   │
│  • Open staff tablet app                                   │
│  • View assigned tasks (sorted by start time)              │
│  • Click task to see details                               │
│  • Read manual reference guide (external link)             │
│  • Tap "Start Task" button                                 │
│                                                             │
│  Result: Task status = "Processing"                        │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  STEP 5: STAFF - 作業実施 (Execute Work)                     │
├─────────────────────────────────────────────────────────────┤
│  Actions:                                                   │
│  • Follow manual reference guide                           │
│  • Complete the work (e.g., POS reconciliation, cleaning)  │
│  • Tap "Complete Task" button                              │
│  • System records actual time taken                        │
│                                                             │
│  Result: Task status = "Done"                              │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  STEP 6: SYSTEM - 完了・KPI更新 (Complete & Update KPI)      │
├─────────────────────────────────────────────────────────────┤
│  Actions:                                                   │
│  • Update HQ dashboard with completion data                │
│  • Calculate store KPIs:                                   │
│    - Task completion rate (%)                              │
│    - Average completion time vs standard time              │
│    - Staff productivity metrics                            │
│  • Update leaderboard rankings                             │
│  • Trigger alerts if overdue                               │
│                                                             │
│  Result: Real-time KPI dashboard reflects completion       │
└─────────────────────────────────────────────────────────────┘
```

### Key Points (ポイント)
- ✅ **Automatic distribution from HQ** → Create once, all stores receive daily
- ✅ **Store-level execution** → Each store manager assigns to their staff
- ✅ **Real-time KPI** → Work data updates HQ dashboard instantly
- ✅ **No photo verification** → Simple status tracking (Open → Processing → Done)

---

## WS Workflow (Work Standard - Event Tasks)

### Purpose
Streamline event/seasonal task execution with AI-powered photo verification to reduce HQ review workload.

### Actors

| Actor | Japanese | Role | Responsibility |
|-------|----------|------|----------------|
| **HQ Staff** | 本部担当 | Event Task Creator | Create WS tasks with sample photos |
| **System** | システム | Distribution Engine | Assign WS to selected stores |
| **Store Manager** | 店長 | Task Assigner | Assign tasks to staff members |
| **Store Staff** | 店舗スタッフ | Task Executor | Execute work and upload photos |
| **AI Judgment** | AI判定 | Photo Validator | Verify photo quality automatically |

### Workflow Steps

```
┌─────────────────────────────────────────────────────────────┐
│  STEP 1: HQ STAFF - 指示作成 (Create Instructions)          │
├─────────────────────────────────────────────────────────────┤
│  Actions:                                                   │
│  • Create event/seasonal WS task template                  │
│  • Set implementation date range                           │
│  • Select target stores (specific stores, not all)         │
│  • Upload sample photos (2-5 reference images)             │
│    - Example: Proper display setup, promotional banner     │
│  • Set approval method:                                    │
│    - AI Auto-Approval (automatic verification)            │
│    - HQ Manual Approval (human review)                     │
│  • Define photo requirements (min/max count)               │
│                                                             │
│  Result: 実施日・対象店舗・サンプル画像を指定                 │
│          (Date, target stores, sample images defined)      │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  STEP 2: SYSTEM - WSへ店舗に指定 (Assign WS to Stores)      │
├─────────────────────────────────────────────────────────────┤
│  Actions:                                                   │
│  • Push WS task to SELECTED stores only (not all 26)       │
│  • Attach sample photos to task                            │
│  • Set deadline based on implementation date               │
│  • Notify Store Managers via system notification           │
│                                                             │
│  Result: Selected stores receive WS task with samples      │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  STEP 3: STORE MANAGER - タスクアサイン (Task Assignment)    │
├─────────────────────────────────────────────────────────────┤
│  Actions:                                                   │
│  • View received WS task from HQ                           │
│  • Review sample photos to understand requirements         │
│  • Assign to appropriate staff member                      │
│    - Consider skill level for complex setups               │
│    - Check staff schedule availability                     │
│  • Set deadline (within HQ's date range)                   │
│                                                             │
│  Result: WS task assigned to specific staff member         │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  STEP 4: STAFF - タスク着手 (Start Task)                     │
├─────────────────────────────────────────────────────────────┤
│  Actions:                                                   │
│  • Open staff tablet app                                   │
│  • View WS task assignment                                 │
│  • Review sample photos (reference images)                 │
│  • Understand expected result                              │
│  • Tap "Start Task" button                                 │
│                                                             │
│  Result: Task status = "Processing"                        │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  STEP 5: STAFF - 作業実施・撮影 (Execute Work & Photograph)  │
├─────────────────────────────────────────────────────────────┤
│  Actions:                                                   │
│  • Complete the work (e.g., set up seasonal display)       │
│  • Open camera from tablet app                             │
│  • Take verification photos (2-5 as required)              │
│  • Review photos before submission                         │
│  • Tap "Submit Photos" button                              │
│                                                             │
│  Result: Task status = "Pending" (awaiting AI judgment)    │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  STEP 6: AI SYSTEM - 写真AI判定 (AI Photo Judgment)         │
├─────────────────────────────────────────────────────────────┤
│  Process:                                                   │
│  • Compare uploaded photos vs sample photos                │
│  • Check composition similarity                            │
│  • Detect required elements (e.g., banner, products)       │
│  • Verify color accuracy                                   │
│  • Calculate confidence score (0-100%)                     │
│                                                             │
│  Decision Logic:                                           │
│  • Confidence ≥ 80% → AI approves (OK)                     │
│  • Confidence < 80% → Requires re-photograph (NG)          │
│  • Manual approval flag → Send to HQ for review            │
└─────────────────────────────────────────────────────────────┘
                              ↓
                      ┌───────┴───────┐
                      │  判定 (Judge) │
                      └───────┬───────┘
                              ↓
                    ┌─────────┴─────────┐
                    ↓                   ↓
        ┌───────────────────┐   ┌───────────────────┐
        │   OK (Approved)   │   │   NG (Rejected)   │
        └───────────────────┘   └───────────────────┘
                    ↓                   ↓
        ┌───────────────────┐   ┌───────────────────┐
        │ 完了・KPI更新      │   │ 差戻し・再撮影    │
        │ (Complete & KPI)  │   │ (Return & Retry)  │
        │                   │   │                   │
        │ Status = "Done"   │   │ Status = "Pending"│
        │ HQ dashboard ✓    │   │ Push notification │
        │ Leaderboard +1    │   │ "Photos rejected" │
        │                   │   │ Staff re-uploads  │
        └───────────────────┘   └─────────┬─────────┘
                                          │
                                          └──► (Loop back to STEP 5)
```

### Key Points (ポイント)
- ✅ **Streamlined workflow** → From HQ instruction to completion in one flow
- ✅ **AI-powered verification** → Reduce HQ manual review workload by 80%
- ✅ **Automatic retry loop** → NG photos trigger re-submission without HQ involvement
- ✅ **Selective distribution** → Only assigned to relevant stores (not all 26)

---

## Workflow Comparison

| Feature | DWS (Daily Work Standard) | WS (Work Standard - Event) |
|---------|---------------------------|----------------------------|
| **Frequency** | Daily/Weekly recurring | One-time event/seasonal |
| **Distribution** | Auto-push to ALL 26 stores | Manual assign to SELECTED stores |
| **HQ Setup** | Set recurrence schedule | Specify date + stores + sample photos |
| **Task Count** | 110 tasks per store | Variable (1-20 per event) |
| **Staff Execution** | Follow manual guide → Mark done | Follow samples → Take photos → Submit |
| **Verification** | None (simple completion) | AI photo judgment → OK/NG decision |
| **Completion Flow** | Open → Processing → Done | Open → Processing → Pending → Awaiting Approval → Done |
| **Retry Mechanism** | N/A (no verification) | Automatic (NG → re-photograph loop) |
| **HQ Workload** | Zero (fully automated) | Minimal (AI handles 80%) |
| **Typical Use Cases** | POS opening, cleaning, inventory counts | Seasonal displays, promotional setups, safety inspections |
| **Badge Color** | Blue (`bg-blue-500`) | Orange (`bg-orange-500`) |
| **Manual Reference** | Required (external link) | Optional (sample photos guide) |
| **Photo Upload** | Not required | Required (2-5 photos) |
| **Approval Method** | Automatic upon completion | AI auto-approval OR HQ manual approval |

---

## Current Implementation Status

### ✅ Implemented Features

#### 1. HQ Role - Template Viewing
- **DWS Templates Page** (`/dws-templates`)
  - ✅ Display 110 task templates
  - ✅ Category filtering (8 categories)
  - ✅ Manual reference links ("Open Guide" buttons)
  - ✅ Task metadata (code, time, priority, frequency)
  - ✅ Search functionality
  - ⚠️ Static action buttons (Edit, Copy, Delete)

- **WS Templates Page** (`/ws-templates`)
  - ✅ Display event/seasonal templates
  - ✅ Category filtering (4 categories)
  - ✅ Season pills (Winter, Spring, Summer, Fall, All Year)
  - ✅ Approval method badges (AI vs Manual)
  - ✅ Photo requirements display
  - ⚠️ Static action buttons

#### 2. Store Manager Role - Task Assignment
- **AI Task Assignment Page** (`/task-assignment`)
  - ✅ 3-step workflow (Date → Scenario → Confirmation)
  - ✅ 4 AI scenarios with metrics
  - ✅ Gantt chart visualization (08:00-17:00)
  - ✅ Staff schedule with avatars
  - ✅ Assignment scorecard
  - ⚠️ No "Confirm Assignment" button
  - ❌ No drag-and-drop editing

#### 3. Store Manager/HQ - Task Monitoring
- **Task Monitoring Page** (`/task-monitoring`)
  - ✅ 3 view modes (Timeline, Kanban, List)
  - ✅ Task cards with status badges
  - ✅ Date selector
  - ✅ Search bar
  - ✅ Type filter (All, DWS, WS)
  - ⚠️ Static data (no real-time updates)
  - ❌ No photo verification status for WS tasks
  - ❌ No overdue indicators

#### 4. Role-Based Access Control
- ✅ Role switcher (HQ, Store Manager, SI, AM)
- ✅ Dynamic navigation based on role
- ✅ Store selector for multi-store roles
- ✅ User profile display

---

## Missing Features by Role

### 🔴 HQ Staff - Template Creation (HIGH PRIORITY)

#### DWS Template Creation
**Missing from Workflow Step 1:**
- ❌ "Create New Template" dialog/modal
- ❌ Form fields:
  - Task code input (e.g., "1.1.1")
  - Task title input
  - Category dropdown (8 categories)
  - Estimated time input (minutes)
  - Description textarea
  - Manual reference URL input
  - Frequency dropdown (Daily Morning/Evening/All Day, Weekly)
  - Priority dropdown (High/Medium/Low)
  - Order number input
- ❌ "Save Template" button → Push to all stores
- ❌ "Edit Template" functionality
- ❌ "Delete Template" with confirmation dialog
- ❌ "Clone Template" for quick duplication
- ❌ Active/Inactive toggle

**Missing from Workflow Step 2:**
- ❌ "Push to All Stores" button
- ❌ Auto-distribution scheduling (daily at 6:00 AM)
- ❌ Distribution status indicator (Pending/Pushed/Active)

#### WS Template Creation
**Missing from Workflow Step 1:**
- ❌ "Create New WS Template" dialog/modal
- ❌ Form fields:
  - Task code input (e.g., "WS-001")
  - Task title input
  - Category dropdown (4 categories)
  - Estimated time input
  - Description textarea
  - Season dropdown (Winter/Spring/Summer/Fall/All Year)
  - Implementation date range picker (start/end date)
  - Photo requirements:
    - Min/max photo count (2-5)
    - Sample photo upload area (drag & drop)
    - Sample photo preview thumbnails
    - Delete/reorder sample photos
  - Approval method radio buttons:
    - ○ AI Auto-Approval
    - ○ HQ Manual Approval
  - Active/Inactive toggle
- ❌ "Upload Sample Photos" functionality
  - Drag & drop area
  - File browser
  - Max 5 photos
  - Preview with delete option
- ❌ "Configure AI Rules" button (advanced)
  - Required elements checklist
  - Color detection settings
  - Composition rules
  - Confidence threshold slider (0-100%)
  - "Test AI" with sample upload

**Missing from Workflow Step 2:**
- ❌ "Select Target Stores" multi-select dialog
  - All stores checkbox
  - Filter by region (North/Central/South)
  - Filter by city
  - Individual store selection
- ❌ "Push to Selected Stores" button
- ❌ Distribution status per store

---

### 🟡 Store Manager - Task Assignment (MEDIUM PRIORITY)

#### AI Task Assignment Enhancement
**Missing from Workflow Step 3:**
- ❌ "Confirm Assignment" button
  - Click → Apply assignments to all staff
  - Show success message: "Tasks assigned to 10 staff members"
  - Update Task Monitoring page with new tasks
- ❌ Manual drag-and-drop editing
  - Drag task between staff members
  - Adjust task duration by dragging edges
  - Visual feedback during drag
  - Conflict detection (overlapping tasks)
- ❌ "Add Task" button (create ad-hoc task)
- ❌ "Remove Task" option
- ❌ "Edit Task" dialog (time, assignee, duration)
- ❌ Undo/Redo buttons (Ctrl+Z, Ctrl+Y)
- ❌ "Export Schedule" button (PDF/Excel)
- ❌ "Save as Template" button (reuse scenario)

#### Task Assignment from Received Tasks
**Missing workflow:**
- ❌ "Received Tasks from HQ" page/section
  - Show 110 DWS tasks received today
  - Show WS tasks assigned to this store
  - Filter by assigned/unassigned
  - Bulk select → "Assign to AI" button
  - Manual assignment → "Assign to Staff" dropdown

---

### 🟢 Store Manager/HQ - Task Monitoring (LOW PRIORITY)

#### Task Monitoring Enhancement
**Missing from Workflow Step 4-6:**
- ❌ Real-time status updates (WebSocket)
  - "Live" badge on active tasks
  - Auto-refresh every 30 seconds
  - Last updated timestamp
  - Connection status indicator
- ❌ Advanced filters
  - Multi-select status filter
  - Store filter (for SI/AM roles)
  - Staff member filter
  - Category filter
  - Priority filter
  - Date range picker
- ❌ Overdue indicators
  - Red border on overdue tasks
  - "Overdue" badge
  - Count of overdue tasks in header
  - Sort by overdue first
- ❌ Task detail dialog
  - Click task → Full details modal
  - Show manual reference (DWS)
  - Show sample photos (WS)
  - Show completion photos (WS)
  - Show AI verification result (WS)
  - Action buttons (Reassign, Edit, Cancel)
- ❌ Bulk actions
  - Select multiple tasks
  - Bulk reassign
  - Bulk status update
  - Bulk export

#### WS Photo Verification Status
**Missing from Workflow Step 5-6:**
- ❌ "AI Verification" status indicators
  - Badge: "Awaiting AI Judgment" (purple)
  - Badge: "AI Approved" (green with checkmark)
  - Badge: "AI Rejected - Retry Required" (red with warning)
- ❌ Photo gallery modal
  - "View Photos" button on WS tasks
  - Side-by-side comparison (sample vs uploaded)
  - AI confidence score display (0-100%)
  - AI feedback messages (e.g., "Banner missing", "Lighting too dark")
- ❌ Re-photography notification
  - Push notification to staff tablet
  - "Retry Required" status change
  - Reason for rejection
  - Loop back to photo upload

---

### 🔵 System Automation (BACKEND)

#### DWS Auto-Distribution
**Missing from Workflow Step 2:**
- ❌ Cron job: Daily task distribution (6:00 AM)
- ❌ Task instance generation (110 tasks × 26 stores = 2,860 tasks/day)
- ❌ Store-level task creation API
- ❌ Notification to Store Managers (email/push)

#### WS Store Assignment
**Missing from Workflow Step 2:**
- ❌ Store selection API
- ❌ Task distribution to selected stores only
- ❌ Sample photo file upload API
- ❌ Notification to selected Store Managers

#### AI Photo Judgment Engine
**Missing from Workflow Step 6:**
- ❌ Photo comparison ML model
  - Image similarity algorithm (SSIM, MSE)
  - Object detection (YOLO, TensorFlow)
  - Color histogram comparison
  - Composition analysis
- ❌ Confidence scoring (0-100%)
- ❌ Decision logic (threshold-based)
- ❌ Automatic retry trigger (NG → notify staff)
- ❌ Fallback to HQ manual approval
- ❌ AI feedback generation (reason for rejection)

#### KPI Real-Time Aggregation
**Missing from Workflow Step 6:**
- ❌ Task completion rate calculation
- ❌ Average time vs standard time analysis
- ❌ Staff productivity metrics
- ❌ Store performance rankings
- ❌ WebSocket push to HQ dashboard
- ❌ Leaderboard auto-update

---

## Implementation Roadmap

### Phase 1: Demo-Ready Features (4-6 hours) 🎯

**Goal**: Make prototype presentation-ready for client proposal

#### Priority 1A: HQ Template Creation UI (2-3 hours)
- [ ] **DWS Template Creation Dialog**
  - Modal with form fields (code, title, category, time, description, manual URL, frequency, priority, order)
  - Mock save functionality (console.log + success message)
  - Add to DWS Templates page list (local state)
  - "Create New Template" button triggers modal

- [ ] **WS Template Creation Dialog**
  - Modal with form fields (code, title, category, time, description, season, date range, approval method)
  - Sample photo upload UI (drag & drop area)
  - Preview thumbnails (mock with placeholder images)
  - Mock save functionality
  - Add to WS Templates page list (local state)

#### Priority 1B: Store Manager Assignment Flow (1-2 hours)
- [ ] **"Confirm Assignment" Button**
  - Add button to AI Task Assignment page (Step 3)
  - Click → Show success toast: "Tasks assigned to 10 staff members"
  - Navigate to Task Monitoring page
  - Update task statuses from "Open" to "Processing"

- [ ] **Task Detail Dialog**
  - Click any task in Task Monitoring → Open modal
  - Display full task details (title, description, time, staff, status)
  - Show manual reference link (DWS) or sample photos (WS)
  - Action buttons: "Reassign", "Edit Time", "Cancel Task" (mock)

#### Priority 1C: Visual Enhancements (1 hour)
- [ ] **Real-Time Mock Indicators**
  - Add "Live" badge to active tasks (status = "Processing")
  - Add "Last updated: 2 min ago" timestamp
  - Simulate auto-refresh with setTimeout (update every 10 seconds)

- [ ] **Overdue Indicators**
  - Add red border to tasks with endTime < current time
  - "Overdue" badge (red)
  - Count badge in header: "3 tasks overdue"

- [ ] **WS Photo Verification Status**
  - Add badge to WS tasks: "Awaiting AI", "AI Approved", "AI Rejected"
  - "View Photos" button → Modal with sample photos
  - AI confidence score display (mock: 87%)

---

### Phase 2: Full Implementation (Post-Client Approval)

#### Sprint 1: Backend API Development (2 weeks)
- [ ] Task template CRUD endpoints (DWS/WS)
- [ ] Auto-distribution cron job (DWS)
- [ ] Store selection and WS distribution API
- [ ] Sample photo upload API (S3/CloudStorage)
- [ ] Task assignment API
- [ ] Task status update API
- [ ] KPI aggregation service

#### Sprint 2: AI Photo Verification (3 weeks)
- [ ] ML model training (photo comparison)
- [ ] Image similarity algorithm implementation
- [ ] Object detection integration
- [ ] Confidence scoring system
- [ ] Automatic retry trigger
- [ ] HQ fallback workflow

#### Sprint 3: Real-Time Features (2 weeks)
- [ ] WebSocket server setup
- [ ] Real-time task status push
- [ ] Live dashboard updates
- [ ] Push notifications (staff tablet)
- [ ] Overdue alerts system

#### Sprint 4: Staff Tablet Integration (3 weeks)
- [ ] Tablet app task list page
- [ ] Camera integration for WS photo capture
- [ ] Photo upload to backend
- [ ] Manual reference guide viewer
- [ ] Offline mode for task execution
- [ ] Push notification handling

---

### Phase 3: Advanced Features (Future)

#### Enhancements
- [ ] Drag-and-drop task editing (AI Assignment page)
- [ ] Undo/Redo stack (keyboard shortcuts)
- [ ] Import/Export templates (Excel)
- [ ] AI configuration UI (advanced rules)
- [ ] Version control for templates
- [ ] Bulk operations (select multiple tasks/templates)
- [ ] Calendar heatmap visualization
- [ ] Export to PDF/Excel
- [ ] Advanced analytics dashboards

---

## Success Metrics

### Demo Phase (Phase 1)
- ✅ HQ can create DWS/WS templates (UI only)
- ✅ Store Manager can confirm AI assignments
- ✅ Task Monitoring shows realistic real-time indicators
- ✅ WS tasks display photo verification status
- ✅ Client understands workflow differences (DWS vs WS)

### Full Implementation (Phase 2-3)
- ✅ 110 DWS tasks auto-distributed to 26 stores daily
- ✅ WS tasks with AI photo verification (80% auto-approval rate)
- ✅ Real-time KPI dashboard updates within 5 seconds
- ✅ Staff tablet app integrated with backend
- ✅ System handles 300 stores (33,000 daily tasks) by 2030

---

## Appendix

### File References
- **Workflow Diagrams**: `requirement/images/DWS.png`, `requirement/images/WS.png`
- **Current Implementation**: `src/pages/AITaskAssignment.tsx:1`, `src/pages/DWSTaskTemplates.tsx:1`, `src/pages/WSTaskTemplates.tsx:1`, `src/pages/TaskMonitoring.tsx:1`
- **Project Overview**: `CLAUDE.md`, `PROJECT_OVERVIEW.md` (if exists)
- **Audit Report**: `TASK_MANAGEMENT_AUDIT.md`
- **Demo Guide**: `DEMO_GUIDE.md`

### Contact
For questions about workflows or implementation, refer to this document and the requirement images in `requirement/images/`.

---

**Document Status**: ✅ Complete
**Next Action**: Implement Phase 1 features (HQ template creation UI + Store Manager assignment flow)
