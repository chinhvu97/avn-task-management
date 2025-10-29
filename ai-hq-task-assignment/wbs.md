# AVN Function List — Breakdown Detail (v2025-10-27)

## 1. SYSTEM ADMINISTRATION

### User & Permission Management
| Function | Role | Description | Priority |
|-----------|------|-------------|-----------|
| Create / Edit / Delete User | Super Admin / HQ | CRUD user with fields: username, password, role, email, phone | High |
| Assign Role to User | Super Admin / HQ | Map user with role (Staff, Store Manager, SI, AM, HQ, Super Admin) | High |
| Set Module Permissions | Super Admin / HQ | Configure permission matrix per role and module/function | High |
| Reset User Password | Super Admin / HQ | Reset password when forgotten and send notification by email/SMS |  |
| Lock / Unlock User | Super Admin / HQ | Deactivate or activate user account |  |

### Store Master Data Management
| Function | Role | Description | Priority |
|-----------|------|-------------|-----------|
| Create / Edit / Delete Store | Super Admin / HQ | CRUD store: name, code, address, phone, opening/closing hours | High |
| Assign Store Manager | Super Admin / HQ | Map 1 Store Manager to 1 store | High |
| Assign SI to Store | Super Admin / HQ | Map 1 SI to 2 stores |  |
| Assign AM to Store | Super Admin / HQ | Map 1 AM to N stores |  |
| Import / Export Store List | Super Admin / HQ | Import by Excel template or export store list |  |

### Task Category Management
| Function | Role | Description | Priority |
|-----------|------|-------------|-----------|
| Create / Edit / Delete Category | Super Admin / HQ | CRUD category (e.g. Cleaning, Kitchen, Warehouse, Display...) | High |
| Sort Category Display Order | Super Admin / HQ | Drag & drop or set display order |  |
| Assign Icon / Color | Super Admin / HQ | Customize icon and color for UI differentiation |  |

### Manual / Document Management
| Function | Role | Description | Priority |
|-----------|------|-------------|-----------|
| Link with Edoc System | Super Admin / HQ | API integration or config URL link to Edoc manual | High |
| Manage Manual List | Super Admin / HQ | View, search, and filter manuals (if not retrieved from Edoc) |  |

## 2. TASK MASTER MANAGEMENT

### DWS Task Template
| Function | Role | Description | Priority |
|-----------|------|-------------|-----------|
| Create Standard Tasks (111 tasks) | Super Admin / HQ | CRUD task: name, description, category, standard time (minutes), frequency | High |
| Set Task Recurrence | Super Admin / HQ | Configure recurrence: daily, weekly, monthly, holidays, start/end of month | High |
| Link Manual to Task | Super Admin / HQ | Map task to one or more manuals (link from Edoc) |  |
| Clone Task from Template | Super Admin / HQ | Duplicate existing task template for faster creation |  |
| Import / Export Task Template | Super Admin / HQ | Import list from Excel and export existing data |  |
| Task Version Control | Super Admin / HQ | Keep task history, rollback if needed |  |

### WS Task Template
| Function | Role | Description | Priority |
|-----------|------|-------------|-----------|
| Create Seasonal / Ad-hoc Task | Super Admin / HQ | CRUD WS task (e.g. Decoration for events like Oct 20) | High |
| Define Approval Workflow | Super Admin / HQ | Workflow: Staff upload photo → AI validation → Manager/HQ approval | High |
| Configure AI Validation Rules | Super Admin / HQ | Define AI rules to validate photo (flower presence, color, placement...) | High |
| Assign WS Task to Store | Super Admin / HQ | Select store or store group for task assignment | High |
| Set Deadline for WS Task | Super Admin / HQ | Define start and end date for seasonal tasks |  |

## 3. STAFF & SHIFT MANAGEMENT

### Store Staff Management
| Function | Role | Description | Priority |
|-----------|------|-------------|-----------|
| View Staff List | Store Manager / HQ | View store staff list (Full-time, Part-time) | High |
| Add / Remove Staff | Store Manager / HQ | CRUD staff in store | High |
| Classify Staff (FT/PT) | Store Manager / HQ | Tag Full-time or Part-time for shift calculation |  |

### Shift Management
| Function | Role | Description | Priority |
|-----------|------|-------------|-----------|
| Create / Edit Shift | Store Manager | CRUD shift: name, start/end time, break time | High |
| Assign Shift to Staff | Store Manager | Assign shifts daily/weekly | High |
| Integrate Shift Data from Edoc | Store Manager | One-way sync Edoc → New App | High |
| View Shift Calendar | Store Manager | Weekly/monthly view of all staff schedules |  |
| Detect Shift Conflicts | Store Manager | Warn if overlapping shifts or overtime |  |

### Attendance & Leave Management
| Function | Role | Description | Priority |
|-----------|------|-------------|-----------|
| Integrate Attendance Data from Edoc | Store Manager | One-way sync attendance from Edoc | High |
| View Attendance History | Store Manager | View check-in/out by day/week/month |  |
| Approve Leave Request | Store Manager | Approve/reject leave requests | High |
| Approve Shift Swap Request | Store Manager | Approve/reject shift swap between staff |  |
| Manual Leave Entry | Store Manager | Input manually if no Edoc data or override needed |  |
| Reassign Task for Absent Staff | Store Manager | Reassign task automatically or manually | High |
| Reassign Task for Late/Early Staff | Store Manager | Reallocate task based on actual check-in/out |  |

## 4. TASK ASSIGNMENT AUTOMATION

### AI Auto / Copy / Manual Assignment
| Function | Role | Description | Priority |
|-----------|------|-------------|-----------|
| View Auto Assignment Suggestion | Store Manager | View auto-assign timeline, workload | High |
| Edit Assignment Manually | Store Manager | Drag & drop task between staff | High |
| Add / Remove Store Tasks | Store Manager | Choose subset of 111 tasks per store |  |
| Create Ad-hoc Task | Store Manager | Create temporary task not in template |  |
| Design AI Rules Engine | Store Manager | Define architecture (rule-based + ML), input/output flow | High |
| Define Business Rules | Store Manager | List all task assignment rules, priorities, constraints | High |
| Setup Rule Priority Matrix | Store Manager | Configure priority and dependency matrix | High |
| Identify Conflict Scenarios | Store Manager | Define conflicts (absent staff, new/deleted tasks, shift changes) | High |
| Define Resolution Strategy | Store Manager | Skip, suggest replacement, or flag for manual fix | High |
| Design Drag & Drop UX | Store Manager | Timeline-based UX (similar to Google Calendar) | High |
| Define Editing Capabilities | Store Manager | Define assign/unassign/swap/adjust duration actions | High |
| Undo / Redo Mechanism | Store Manager | Allow reverting last actions |  |

## 5. STAFF INTERFACE (UI)

| Function | Role | Description | Priority |
|-----------|------|-------------|-----------|
| View Own Task List | Staff | List or card view by timeline | High |
| Filter Task by Status or Category | Staff | Pending / In Progress / Completed |  |
| View Task Details | Staff | Popup with description, manual link, deadline | High |
| Start Task | Staff | Record actual start time | High |
| Complete Task | Staff | Record actual finish time | High |
| Upload WS Task Photo | Staff | Upload photo for AI validation | High |
| View AI Validation Result | Staff | Display Pass/Fail and reason |  |
| View Colleague Tasks | Staff | View all tasks in store by staff or timeline | High |
| Submit Leave Request | Staff | Form: date, reason → submit to Manager | High |
| Submit Shift Swap Request | Staff | Form: select shift, partner, reason |  |
| View Request Status | Staff | Check status (Pending / Approved / Rejected) |  |
| Receive Approval Notification | Staff | Push or in-app notification on approval/rejection |  |
| Tablet-Friendly Interface | Staff | Large font, easy touch, bright colors | High |
| Gamification (Optional) | Staff | Badges, points, leaderboard for engagement |  |

## 6. MANAGER INTERFACE (UI)

| Function | Role | Description | Priority |
|-----------|------|-------------|-----------|
| Daily/Weekly Task Completion Overview | Store Manager | Show % completed tasks | High |
| Workload Distribution Chart | Store Manager | Chart by staff or category |  |
| Real-time Task Status | Store Manager | Live update via WebSocket/polling |  |
| Overdue Task Alert | Store Manager | Notify tasks past deadline | High |
| Timeline View (15-min slots) | Store Manager | Calendar-like daily task view | High |
| Drag & Drop Task | Store Manager | Reschedule or reassign task | High |
| Compare Actual vs Standard Time | Store Manager | Highlight if actual > standard | High |
| View Manual Link | Store Manager | Link to Edoc manual |  |

## 7. REPORTS & ANALYTICS

| Function | Role | Description | Priority |
|-----------|------|-------------|-----------|
| Staff Performance Report | Store Manager | Completed tasks, avg time, time over standard | High |
| Staff Ranking | Store Manager | Leaderboard (top/bottom performers) |  |
| Category Report | Store Manager | Avg time per category, bottleneck detection | High |
| Store Performance Report | Store Manager | Completion rate, avg time per store | High |
| Store Comparison | Store Manager | Benchmark performance between stores |  |
| System-wide Data Aggregation | Super Admin / HQ | Total tasks, total time, completion rate | High |
| Performance Trend Analysis | Super Admin / HQ | Performance over time |  |
| Predictive Analytics (Future) | Super Admin / HQ | ML-based workload prediction and optimization |  |