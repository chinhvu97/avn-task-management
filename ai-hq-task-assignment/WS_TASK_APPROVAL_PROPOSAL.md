# WS Task Approval Feature - Proposal

## Overview
A dedicated HQ interface for reviewing and approving WS (Work Standard) tasks that require photo verification. After store staff complete WS tasks with photo uploads, HQ staff can review, approve, or reject submissions based on compliance with sample images and standards.

---

## 1. Feature Purpose & Business Context

### Problem Statement
- WS tasks (seasonal events, safety inspections, compliance) require photo verification
- Some tasks need HQ manual approval (safety-critical, compliance, high-value events)
- Some tasks can use AI auto-approval (routine seasonal displays)
- Currently no centralized interface for HQ to review pending approvals

### User Roles
- **HQ Staff**: Primary users who review and approve/reject WS task submissions
- **Store Managers**: Can view approval status of their store's submissions
- **Area Managers (AM)**: Can monitor approval status across multiple stores in their region

### Business Impact
- Ensures compliance with brand standards and safety regulations
- Reduces risk through systematic photo verification
- Creates audit trail for critical tasks (safety, compliance)
- Scales efficiently with AI auto-approval for routine tasks

---

## 2. Navigation & Access

### Menu Location
Add new item under **Task Management** section:
```
Task Management
├── AI Task Assignment
├── Task Monitoring
├── WS Task Approval      ← NEW (HQ only)
├── DWS Templates (HQ only)
└── WS Templates (HQ only)
```

### Access Control
- **Permission Required**: `settings` (HQ-only permission)
- **Visible To**: HQ staff only
- **Hidden From**: Store Managers, SI, AM (they can see status in Task Monitoring, but not approval interface)

---

## 3. Page Layout & UI Design

### Page Header
```
┌─────────────────────────────────────────────────────────────┐
│ [Icon] WS Task Approval                    [Role Indicator]  │
│                                                               │
│ Review and approve photo verification tasks from stores      │
└─────────────────────────────────────────────────────────────┘
```

### Filter & Search Bar
```
┌─────────────────────────────────────────────────────────────┐
│ [Search by task code, store...]                              │
│                                                               │
│ Filters:                                                      │
│ [All Status ▼] [All Stores ▼] [All Categories ▼] [Date ▼]  │
│                                                               │
│ Quick Filters:                                                │
│ [⏳ Pending (24)] [🤖 AI Suggested (8)] [⚠️ Urgent (3)]     │
└─────────────────────────────────────────────────────────────┘
```

### Statistics Cards
```
┌──────────────┬──────────────┬──────────────┬──────────────┐
│ ⏳ Pending   │ ✅ Approved  │ ❌ Rejected  │ ⚡ Avg Time  │
│    24 tasks  │    156 (↑8%) │    12 (↓2%)  │    4.2 hours │
└──────────────┴──────────────┴──────────────┴──────────────┘
```

### Main Task List (Table View)
```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Task Code │ Task Title        │ Store      │ Staff    │ Status    │ Actions │
├───────────┼───────────────────┼────────────┼──────────┼───────────┼─────────┤
│ WS-001    │ Christmas Setup   │ Binh Tan   │ Nguyen T │ 🤖 AI OK │ [View]  │
│ WS-003    │ Fire Safety Check │ Ocean Park │ Tran V   │ ⏳ Pending│ [Review]│
│ WS-004    │ Product Recall    │ SKY OASIS  │ Le H     │ ❌ Denied │ [View]  │
│ WS-005    │ Store Opening     │ Binh Tan   │ Pham M   │ ✅ Approved│ [View] │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Task Detail Modal (When clicking Review/View)
```
┌─────────────────────────────────────────────────────────────────────┐
│ WS-003: Fire Safety Equipment Inspection           [✕ Close]        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│ 📍 Store: AEON Mall Ocean Park                                      │
│ 👤 Completed By: Tran Van B (Staff ID: DEMO-003)                    │
│ 📅 Completed: Nov 6, 2025 14:35                                     │
│ ⏱️ Duration: 85 minutes (Est: 90 min)                               │
│ 📂 Category: Safety & Compliance                                     │
│ ⚠️ Priority: HIGH (Safety Critical)                                 │
│                                                                       │
│ ─────────────────────────────────────────────────────────────────── │
│                                                                       │
│ 📷 Sample Images (Reference)                                         │
│ ┌────────┬────────┬────────┐                                        │
│ │[IMG 1] │[IMG 2] │[IMG 3] │  ← HQ-provided reference photos       │
│ └────────┴────────┴────────┘                                        │
│                                                                       │
│ 📸 Submitted Photos (Staff Upload)                                   │
│ ┌────────┬────────┬────────┬────────┐                              │
│ │[IMG 1] │[IMG 2] │[IMG 3] │[IMG 4] │  ← Click to zoom/compare    │
│ │ ✓ Match│ ✓ Match│ ⚠️ Issue│ ✓ Match│                            │
│ └────────┴────────┴────────┴────────┘                              │
│                                                                       │
│ 🤖 AI Analysis (Confidence: 72% - Manual review recommended)        │
│ ┌─────────────────────────────────────────────────────────────────┐│
│ │ • Photo 1: Fire extinguisher visible, pressure gauge OK ✓       ││
│ │ • Photo 2: Emergency exit sign illuminated ✓                    ││
│ │ • Photo 3: ⚠️ Lighting issue - exit path partially obscured     ││
│ │ • Photo 4: Alarm panel visible, indicators normal ✓             ││
│ │                                                                   ││
│ │ Recommendation: Manual review needed due to Photo 3 issue       ││
│ └─────────────────────────────────────────────────────────────────┘│
│                                                                       │
│ 💬 Staff Notes                                                       │
│ "Completed during afternoon inspection. Photo 3 taken from best     │
│  available angle due to temporary storage near exit."               │
│                                                                       │
│ ─────────────────────────────────────────────────────────────────── │
│                                                                       │
│ [← Previous Task]  [Reject & Request Retake]  [Approve Task]  [Next →]│
│                                                                       │
│ If Rejecting:                                                        │
│ ┌─────────────────────────────────────────────────────────────────┐│
│ │ 📝 Rejection Reason (required):                                  ││
│ │ ┌───────────────────────────────────────────────────────────────┐││
│ │ │ [Textarea: Explain what needs to be fixed...]                 │││
│ │ └───────────────────────────────────────────────────────────────┘││
│ │                                                                   ││
│ │ Quick Templates:                                                  ││
│ │ • [Photo quality too low - retake with better lighting]          ││
│ │ • [Missing required items in photo]                              ││
│ │ • [Does not match sample images - check placement]               ││
│ │ • [Safety issue detected - immediate correction needed]          ││
│ └─────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────┘
```

---

## 4. Data Structure

### Task Submission Interface
```typescript
interface WSTaskSubmission {
  id: string;
  taskCode: string;                    // e.g., "WS-003"
  templateId: number;                  // Link to WS template
  title: string;
  category: string;

  // Store & Staff Info
  storeId: string;
  storeName: string;
  staffId: string;
  staffName: string;

  // Timing
  assignedDate: string;                // When task was assigned
  completedDate: string;               // When staff marked complete
  submittedDate: string;               // When photos uploaded
  reviewedDate?: string;               // When HQ reviewed (if approved/rejected)
  estimatedMinutes: number;
  actualMinutes: number;

  // Photos
  samplePhotos: string[];              // Reference images from template
  submittedPhotos: string[];           // Photos uploaded by staff

  // Approval Status
  status: 'Pending' | 'AI Approved' | 'Manual Approved' | 'Rejected' | 'Retake Required';
  approvalType: 'AI' | 'Manual' | 'Not Required';

  // AI Analysis (if applicable)
  aiAnalysis?: {
    confidence: number;                // 0-100
    recommendation: 'Approve' | 'Review' | 'Reject';
    findings: Array<{
      photoIndex: number;
      status: 'Match' | 'Warning' | 'Issue';
      description: string;
    }>;
    processedDate: string;
  };

  // Manual Review (if done by HQ)
  manualReview?: {
    reviewerId: string;
    reviewerName: string;
    decision: 'Approved' | 'Rejected';
    notes: string;
    reviewDate: string;
  };

  // Staff Notes
  staffNotes?: string;

  // Priority
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  requiresHQApproval: boolean;
}
```

---

## 5. Approval Workflow States

### State Flow Diagram
```
[Staff Completes Task]
         ↓
[Staff Uploads Photos]
         ↓
    ┌────────────┐
    │  Pending   │ ← Initial state after photo upload
    └─────┬──────┘
          │
    ┌─────┴──────────────────────┐
    │                             │
    ↓                             ↓
┌─────────────┐          ┌───────────────┐
│ AI Analysis │          │ Direct to HQ  │
│ (if enabled)│          │ Manual Review │
└──────┬──────┘          └───────┬───────┘
       │                         │
   ┌───┴────┐                   │
   │        │                   │
   ↓        ↓                   ↓
[High    [Low              ┌──────────┐
Confidence] Confidence]    │ HQ       │
   │        │               │ Reviews  │
   │        └──────┐        └────┬─────┘
   │               │             │
   ↓               ↓             ↓
┌──────────┐  ┌──────────┐  ┌─────────┐
│   AI     │  │ Manual   │  │ Manual  │
│ Approved │  │ Review   │  │ Decision│
└──────────┘  │ Queue    │  └────┬────┘
              └────┬─────┘       │
                   │         ┌───┴────┐
                   │         │        │
                   ↓         ↓        ↓
              ┌─────────┐ ┌────────┐ ┌────────┐
              │   HQ    │ │Approved│ │Rejected│
              │ Reviews │ └────────┘ └───┬────┘
              └────┬────┘                 │
                   │                      ↓
                   └────────────→  [Retake Required]
                                          │
                                          ↓
                                   [Back to Staff]
```

### Status Color Coding
- **Pending** (Yellow `bg-yellow-100 border-yellow-300`): Awaiting initial review
- **AI Approved** (Green `bg-green-100 border-green-300`): Auto-approved by AI (high confidence)
- **Manual Approved** (Green `bg-green-100 border-green-300`): HQ manually approved
- **Rejected** (Red `bg-red-100 border-red-300`): HQ rejected, needs retake
- **Retake Required** (Orange `bg-orange-100 border-orange-300`): Staff needs to redo

---

## 6. Mock Data for Demo (15-20 submissions)

### Distribution
- **Pending (Manual Review)**: 8 tasks (33%)
  - 3 High Priority (safety/compliance)
  - 5 Medium Priority (seasonal events)

- **AI Approved**: 6 tasks (25%)
  - High confidence (>85%)
  - Routine seasonal displays

- **Manual Approved**: 4 tasks (17%)
  - HQ reviewed and approved
  - Mix of priorities

- **Rejected (Retake Required)**: 3 tasks (13%)
  - Photo quality issues
  - Non-compliance with standards
  - Missing required elements

- **AI Suggested (Low Confidence)**: 3 tasks (13%)
  - AI analyzed but recommends manual review
  - Confidence 60-75%

### Sample Tasks
1. **WS-001 Christmas Decoration** - AI Approved (92% confidence)
2. **WS-003 Fire Safety Inspection** - Pending (Safety critical, needs HQ)
3. **WS-004 Product Recall Documentation** - Manual Approved (Yesterday)
4. **WS-005 Store Opening Ceremony** - Rejected (Missing ribbon cutting setup photo)
5. **WS-002 Lunar New Year Display** - AI Approved (88% confidence)
6. **WS-006 Floor Marking Maintenance** - Pending (Compliance)
7. **WS-007 Shelf Tag Update Campaign** - AI Suggested (68% confidence)
8. **WS-008 Emergency Drill Documentation** - Pending (High priority)
9. **WS-009 Halloween Decoration Setup** - Manual Approved (Last week)
10. **WS-010 Refrigeration Temperature Log** - Rejected (Thermometer not visible)
11. **WS-011 Customer Service Desk Setup** - AI Approved (91% confidence)
12. **WS-012 Parking Lot Safety Check** - Pending (High priority)
13. **WS-013 Restroom Cleanliness Inspection** - AI Suggested (72% confidence)
14. **WS-014 Food Safety Inspection** - Pending (Compliance)
15. **WS-015 Loading Bay Organization** - Rejected (Safety violations visible)

---

## 7. Key Features & Functionality

### 7.1 Filtering & Search
- **Status Filter**: All / Pending / AI Approved / Approved / Rejected
- **Store Filter**: All stores or specific store (multi-select for AM role)
- **Category Filter**: Safety & Compliance / Seasonal Events / Special Events / Compliance / Maintenance
- **Date Range**: Today / Last 7 days / Last 30 days / Custom range
- **Priority Filter**: All / Urgent / High / Medium / Low
- **Search**: By task code, title, store name, staff name

### 7.2 Bulk Actions
- Select multiple pending tasks
- Bulk approve (with confirmation)
- Bulk reject with common reason
- Export selected to Excel/PDF

### 7.3 Photo Comparison
- Side-by-side view: Sample vs Submitted
- Zoom/pan functionality
- Lightbox gallery view
- Image quality indicators
- Highlight AI-detected discrepancies

### 7.4 AI Analysis Display
- Confidence score with visual indicator (progress bar)
- Per-photo analysis breakdown
- Recommendation badge (Approve/Review/Reject)
- Explainable AI: Show what was detected/missing

### 7.5 Approval Actions
- **Approve**: One-click approval (with optional notes)
- **Reject**: Requires reason (mandatory text field)
- **Request More Info**: Ask staff for clarification without full rejection
- **Escalate**: Flag for senior HQ review

### 7.6 Audit Trail
- Record all actions (approve/reject/view)
- Timestamp all decisions
- Track reviewer identity
- Export audit log for compliance

### 7.7 Notifications
- Badge count in navigation menu (e.g., "WS Task Approval (24)")
- Desktop notifications for urgent tasks
- Daily digest email to HQ staff

---

## 8. Technical Implementation Notes

### New Components
1. **`WSTaskApproval.tsx`** - Main page component
2. **`WSTaskApprovalModal.tsx`** - Detailed review modal
3. **`PhotoComparisonViewer.tsx`** - Side-by-side image comparison
4. **`AIAnalysisCard.tsx`** - Display AI findings
5. **`RejectionReasonModal.tsx`** - Rejection reason form

### Route
- Path: `/ws-task-approval`
- Permission: `settings` (HQ only)

### Mock Data Location
- File: `shared-data/src/mock/wsTaskSubmissions.ts`
- 15-20 pre-populated task submissions with various states

### Integration Points
- **Task Monitoring**: Link to approval status
- **WS Templates**: Reference sample photos
- **Staff Data**: Link to staff profiles
- **Store Data**: Link to store information

---

## 9. User Stories

### HQ Staff
> "As an HQ staff member, I want to quickly review pending WS task submissions so that I can ensure all stores comply with brand standards."

> "As an HQ staff member, I want to see AI-suggested approvals so that I can focus my time on high-risk tasks requiring manual review."

> "As an HQ staff member, I want to reject tasks with clear feedback so that store staff know exactly what needs to be corrected."

### Store Manager
> "As a Store Manager, I want to see the approval status of my store's WS tasks so that I can follow up if any are rejected."

> "As a Store Manager, I want my staff to receive clear feedback when tasks are rejected so that they can quickly retake photos correctly."

---

## 10. Future Enhancements (Out of Scope for Prototype)

- Real-time WebSocket notifications for new submissions
- Advanced AI: Object detection, OCR for safety labels
- Mobile HQ app for on-the-go approvals
- Approval SLA tracking (time to approve)
- Store performance scoring based on approval rate
- Automated reminders for overdue approvals
- Integration with training system (rejected tasks → training content)
- Multi-language support for rejection reasons

---

## 11. Success Metrics

### For Prototype Demo
- ✅ Display 15-20 mock task submissions
- ✅ Filter by status, store, category
- ✅ View detailed task submission with photos
- ✅ Approve/reject functionality (updates state)
- ✅ AI analysis display with confidence scores
- ✅ Side-by-side photo comparison
- ✅ Rejection reason form with templates
- ✅ Statistics cards showing pending/approved/rejected counts

### For Production (Future)
- Reduce average approval time to <4 hours
- 70% of routine tasks auto-approved by AI
- 95%+ first-time approval rate for experienced staff
- Zero compliance violations due to missed inspections

---

## 12. Visual Design References

### Color Scheme (Match existing app)
- Primary Brand: `#D61F69` (Pink)
- Status Colors: Yellow (Pending), Green (Approved), Red (Rejected), Blue (Review)
- Background: White cards on gray background
- Tailwind CSS utility classes

### Icons (lucide-react)
- CheckCircle (Approve)
- XCircle (Reject)
- AlertTriangle (Warning/Issue)
- Camera (Photos)
- Sparkles (AI)
- Clock (Pending)
- Eye (View/Review)

---

## Questions for Clarification

1. **Photo Upload Count**: Should there be a minimum/maximum number of photos per task?
2. **AI Confidence Threshold**: What confidence % should trigger auto-approval vs manual review?
3. **Rejection Limits**: Can a task be rejected multiple times, or is there a limit?
4. **Approval Authority**: Can Store Managers approve their own store's tasks, or only HQ?
5. **Urgent Priority**: What makes a task "Urgent"? (e.g., safety violations, expired deadlines)
6. **Photo Storage**: For prototype, use placeholder images or actual sample images?

---

## Implementation Plan (If Approved)

### Phase 1: Core UI (2-3 hours)
- Create main page with task list table
- Add filters and search
- Create statistics cards
- Add navigation menu item

### Phase 2: Task Detail Modal (2 hours)
- Build detailed review modal
- Add photo gallery/comparison view
- Display AI analysis section
- Add approve/reject buttons

### Phase 3: Mock Data (1 hour)
- Create 15-20 task submissions
- Generate realistic data across all states
- Add sample photos (placeholders or real)

### Phase 4: Actions & State Management (1-2 hours)
- Implement approve/reject logic
- Add rejection reason form
- Update task state on actions
- Add success/error toasts

### Total Estimated Time: 6-8 hours

---

## Approval Required

Please review this proposal and provide feedback on:
- ✅ Overall approach and UI design
- ✅ Data structure and workflow states
- ✅ Mock data distribution (pending/approved/rejected ratio)
- ✅ Any missing features or edge cases
- ✅ Answers to clarification questions above

Once approved, I will proceed with implementation.
