# Task Template Management Guide

## Overview

The RetailFlow Manager system uses two distinct types of task templates:

1. **DWS (Daily Work Standard)** - Recurring daily operational tasks
2. **WS (Work Standard)** - Event-based and seasonal tasks

Each type has been separated into its own management interface for easier organization and configuration.

---

## DWS Task Templates (`/dws-templates`)

### Purpose
Daily recurring tasks that are performed regularly as part of standard store operations.

### Key Characteristics
- **Total Templates**: 110 standardized tasks
- **Frequency**: Daily operations (Morning, Evening, All Day, etc.)
- **Manual References**: Every task links to a detailed manual guide
- **Categories**: POS Operations, Inventory Management, Customer Service, Cleaning & Maintenance, Merchandising, Safety & Security, Administrative

### Features

#### 1. Manual Reference System
- **Code Format**: Numeric format (e.g., "1.1.1", "2.3.4")
- **Manual Links**: Direct links to external manual guide app
- **"Open Guide" Button**: Staff can access detailed instructions during task execution
- **Purpose**: Ensures consistent execution across all staff members

#### 2. Task Structure
```typescript
{
  code: '1.1.1',
  title: 'Morning Register Setup',
  category: 'POS Operations',
  estimatedMinutes: 30,
  description: 'Set up cash registers and prepare POS systems...',
  manualGuide: '1.1.1',
  manualLink: 'https://manual.aeon.vn/pos/1.1.1',
  frequency: 'Daily - Morning',
  priority: 'High',
  order: 1,
  isActive: true
}
```

#### 3. UI Elements
- **Blue Color Badge**: DWS tasks are marked with blue badges
- **Manual Reference Card**: Prominent display of manual guide with "Open Guide" button
- **Category Filtering**: 8 categories for easy navigation
- **Priority Indicators**: High, Medium, Low with color coding
- **Order Number**: Tasks can be sequenced for optimal workflow

#### 4. Staff UI Integration
When a staff member views a DWS task on their tablet:
- Task card shows manual reference code
- "View Manual" button opens guide in separate window/tab
- Staff can reference instructions while performing task
- No photo upload required
- Simple status updates: Open → Processing → Done

---

## WS Task Templates (`/ws-templates`)

### Purpose
Event-based, seasonal, or compliance tasks that require photo documentation and approval.

### Key Characteristics
- **Variable Quantity**: Event-dependent (currently ~24 templates)
- **Frequency**: Seasonal, ad-hoc, or compliance-driven
- **Photo Requirements**: All tasks require photo evidence
- **Approval Workflow**: AI auto-approval OR manual HQ approval
- **Categories**: Seasonal Events, Safety & Compliance, Promotional, Special Events

### Features

#### 1. Photo Verification System
- **Sample Photos**: 2-5 reference images showing expected results
- **Upload Required**: Staff must upload photos upon completion
- **Photo Count**: Minimum photos specified per task
- **Purpose**: Visual verification of proper task execution

#### 2. Approval Methods

**AI Auto-Approval:**
- Fast turnaround (minutes)
- AI analyzes uploaded photos against sample images
- Checks composition, elements, quality
- Auto-approves if criteria met
- Falls back to manual review if uncertain

**HQ Manual Approval:**
- Required for critical/sensitive tasks
- HQ staff reviews photos
- Can approve, reject, or request re-submission
- Used for safety, compliance, major events

#### 3. Task Structure
```typescript
{
  code: 'WS-001',
  title: 'Holiday Decoration Setup - Christmas',
  category: 'Seasonal Events',
  estimatedMinutes: 240,
  description: 'Set up Christmas decorations...',
  season: 'Winter',
  requiresPhotoUpload: true,
  requiresHQApproval: true,      // Manual approval required
  aiAutoApproval: false,          // AI not used
  samplePhotos: 3,                // 3 reference images
  isActive: false                 // Seasonal - inactive off-season
}
```

#### 4. UI Elements
- **Orange Color Badge**: WS tasks are marked with orange badges
- **Photo Sample Card**: Shows number of reference images with "View Samples" button
- **Approval Method Card**: 
  - Purple gradient for AI Auto-Approval
  - Green gradient for HQ Manual Approval
- **Season Tags**: Winter, Spring, Summer, Fall, All Year
- **Status Indicators**: Active/Inactive based on season

#### 5. Staff UI Integration
When a staff member views a WS task on their tablet:
- Task card shows photo upload requirement
- "View Sample Photos" button shows reference images
- Camera integration for photo capture
- Upload progress indicator
- Status flow:
  - Open → Processing → Pending → Awaiting Approval → Done
  - Or: Open → Processing → Done (if AI auto-approved)

---

## Comparison Table

| Feature | DWS Tasks | WS Tasks |
|---------|-----------|----------|
| **Purpose** | Daily operations | Events & compliance |
| **Quantity** | 110 fixed | Variable (~24) |
| **Frequency** | Daily recurring | Seasonal/Ad-hoc |
| **Color Badge** | Blue | Orange |
| **Code Format** | "1.1.1" | "WS-001" |
| **Manual Reference** | ✅ Required | ❌ Not applicable |
| **Photo Upload** | ❌ Not required | ✅ Required |
| **Sample Photos** | ❌ None | ✅ 2-5 images |
| **Approval** | None needed | AI or HQ |
| **Active Status** | Year-round | Seasonal control |
| **Staff View** | Manual guide link | Sample photos |

---

## Navigation Structure

```
Task Management
├── AI Task Assignment      (Bulk assignment with scenarios)
├── Task Monitoring        (Real-time tracking)
├── DWS Templates          (110 daily tasks with manuals)
└── WS Templates           (Event tasks with photos)
```

---

## Workflow Examples

### DWS Workflow
1. HQ creates DWS template with manual reference link
2. Store Manager assigns to staff via AI or manual method
3. Staff receives task on tablet
4. Staff clicks "View Manual" to see instructions
5. Staff performs task following manual
6. Staff marks task as Done (no photos needed)
7. Task automatically recorded as completed

### WS Workflow (AI Auto-Approval)
1. HQ creates WS template with sample photos
2. HQ enables "AI Auto-Approval" setting
3. Store Manager assigns task to staff
4. Staff receives task with sample photos
5. Staff views sample photos for guidance
6. Staff completes task and uploads photos
7. AI analyzes photos (2-3 minutes)
8. If approved: Task → Done
9. If rejected: Task → Pending (retry needed)

### WS Workflow (HQ Manual Approval)
1. HQ creates WS template (e.g., Safety Inspection)
2. HQ requires manual approval (critical task)
3. Store Manager assigns task to staff
4. Staff completes task and uploads photos
5. Task status: Awaiting Approval
6. HQ reviewer sees notification
7. HQ reviews photos and documentation
8. HQ approves or rejects with feedback
9. If approved: Task → Done
10. If rejected: Staff notified to redo

---

## Best Practices

### For DWS Templates
- Keep manual references up-to-date
- Use clear, sequential task codes
- Group related tasks in same category
- Set realistic time estimates
- Order tasks by logical sequence
- Update manuals 2x per year (Kaizen process)

### For WS Templates
- Provide high-quality sample photos
- Use AI approval for routine events (decorations, displays)
- Require HQ approval for safety/compliance tasks
- Mark seasonal tasks as inactive off-season
- Include clear acceptance criteria in description
- Test AI approval accuracy before deployment

---

## Integration Points

### With Staff Tablet App
- DWS tasks show manual reference prominently
- WS tasks show sample photos and camera upload
- Both types use same status tracking system
- Real-time sync between manager and staff apps

### With Edoc System
- Shift data determines task assignment eligibility
- Attendance affects task availability
- Leave requests prevent task assignment

### With AI System
- AI analyzes WS task photos
- AI generates task assignment scenarios
- AI learns from approval patterns

---

## Future Enhancements

### DWS Templates
- [ ] Video tutorials in addition to manual links
- [ ] Voice-guided instructions
- [ ] Multi-language manual support
- [ ] Interactive checklists within tasks
- [ ] Manual update notifications

### WS Templates
- [ ] AI confidence scoring
- [ ] Photo annotation tools
- [ ] Bulk photo approval interface
- [ ] Approval history and audit trail
- [ ] Photo comparison view (before/after)
- [ ] Template cloning for similar events

---

## Technical Notes

### File Locations
- `/pages/DWSTaskTemplates.tsx` - DWS management interface
- `/pages/WSTaskTemplates.tsx` - WS management interface
- Navigation: `/components/Layout.tsx`
- Routes: `/App.tsx`

### API Endpoints (Planned)
```
GET  /api/templates/dws           - List all DWS templates
POST /api/templates/dws           - Create DWS template
PUT  /api/templates/dws/:id       - Update DWS template

GET  /api/templates/ws            - List all WS templates
POST /api/templates/ws            - Create WS template
PUT  /api/templates/ws/:id        - Update WS template
POST /api/templates/ws/:id/photos - Upload sample photos

GET  /api/manuals/:code           - Get manual content
POST /api/tasks/:id/photos        - Staff upload completion photos
POST /api/tasks/:id/approve       - HQ approve WS task
```

---

## Summary

The separation of DWS and WS templates provides:

1. **Clarity**: Each type has distinct requirements and workflows
2. **Efficiency**: Staff see only relevant fields for each task type
3. **Scalability**: Easy to add more templates of either type
4. **Flexibility**: Different approval methods for different needs
5. **Maintainability**: Clear separation of concerns in codebase

The system is designed to scale from 26 stores to 300 stores while maintaining ease of use and operational efficiency.
