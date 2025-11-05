# Prototype Improvements Plan - Frontend Only

**Date:** November 5, 2025
**Focus:** 3 Key Features for Better Demo Experience

---

## 📋 IMPROVEMENT SUMMARY

Based on analysis, here are the 3 improvements needed:

### 1. 🎯 Drag & Drop Task Reassignment
**Current State:** No drag & drop functionality
**What's Needed:** Manager can drag tasks between staff timelines to reassign
**Where:** AI Task Assignment page (Gantt chart)
**Impact:** Makes task reassignment intuitive and visual

### 2. 👥 Role-Based UI Differences
**Current State:** Role switching works but UI looks identical
**What's Needed:** Show different features/data based on role (HQ, Store Manager, SI, AM)
**Where:** Multiple pages (Dashboard, Task Assignment, Staff Management, etc.)
**Impact:** Demonstrates hierarchy and permissions system

### 3. ⚠️ Shift Understaffing Alerts
**Current State:** Shifts shown but no alerts or recommendations
**What's Needed:** Detect understaffing, show alerts, recommend actions
**Where:** Shift Schedule page (HQ app) + Shift Management (Staff app)
**Impact:** Proactive management, demonstrates AI capabilities

---

## 🎯 FEATURE 1: DRAG & DROP TASK REASSIGNMENT

### Current Behavior
- Tasks displayed in Gantt chart (fixed positions)
- No way to move tasks between staff
- Must delete and recreate to reassign

### Desired Behavior
**Manager can:**
1. Drag a task box from Staff A's timeline
2. Drop it on Staff B's timeline
3. Task automatically adjusts time slot if conflict detected
4. Visual feedback during drag (ghost preview)
5. Confirmation tooltip after drop

### Implementation Details

**Library to Use:** `@dnd-kit/core` + `@dnd-kit/sortable`
- Lightweight (better than react-beautiful-dnd)
- Supports multiple drop zones
- Good TypeScript support

**Steps:**
1. Wrap Gantt chart in `<DndContext>`
2. Make each task card a `<Draggable>`
3. Make each staff row a `<Droppable>`
4. Add collision detection
5. Add visual feedback (opacity, scale)
6. Handle time slot conflicts (shift forward/backward)
7. Update state on drop

**UI Enhancements:**
- Cursor changes to "grab" on hover
- Task becomes semi-transparent during drag
- Drop zone highlights when hovering
- Success animation on successful drop
- Error indicator if conflict detected

**Mock Data Update:**
```typescript
const handleTaskDrag = (taskId: string, fromStaffId: string, toStaffId: string) => {
  // Find task
  const task = tasks.find(t => t.id === taskId);

  // Check for time slot conflicts on target staff
  const targetStaffTasks = tasks.filter(t => t.staffId === toStaffId);
  const hasConflict = targetStaffTasks.some(t =>
    timeOverlaps(t.startTime, t.endTime, task.startTime, task.endTime)
  );

  if (hasConflict) {
    // Auto-adjust time slot
    task.startTime = findNextAvailableSlot(targetStaffTasks, task.duration);
  }

  // Update staff assignment
  task.staffId = toStaffId;

  // Show success notification
  showToast(`Task reassigned to ${getStaffName(toStaffId)}`);
};
```

**Edge Cases to Handle:**
- Task too long for available time slot → split or shift to next day?
- Drop on same staff → no action
- Drop outside valid zone → snap back
- Multiple simultaneous drags → queue updates

**Estimated Effort:** 1-2 days
**Dependencies:** Install `@dnd-kit/core` and `@dnd-kit/sortable`

---

## 👥 FEATURE 2: ROLE-BASED UI DIFFERENCES

### Current Behavior
- Role switching dropdown works
- RoleContext tracks current role
- But UI shows same content for all roles

### Desired Behavior
**Show different UI based on role:**

#### HQ Manager (All Access)
**Dashboard:**
- See all 4 stores' KPIs
- System-wide metrics
- All staff count

**AI Task Assignment:**
- Store selector dropdown (4 stores)
- Can assign tasks to any store
- See all scenarios

**Task Monitoring:**
- Multi-store filter
- Can see all 27 staff
- Global search

**Staff Management:**
- All 27 staff visible
- Can reassign cross-store
- Can create/edit all roles

**Shift Schedule:**
- Multi-store view
- Can create shifts for any store

**Leaderboard:**
- Global/Regional/Store tabs
- See top performers across all stores

---

#### Store Manager (Single Store)
**Dashboard:**
- Only their store's KPIs
- 8 staff members
- Store-specific alerts

**AI Task Assignment:**
- No store selector (locked to their store)
- See only their 8 staff
- Can only assign to own staff

**Task Monitoring:**
- Filter locked to own store
- See only own 8 staff
- Cannot reassign to other stores

**Staff Management:**
- Only their 8 staff
- Can edit but not delete
- Cannot create managers

**Shift Schedule:**
- Only their store's shifts
- Can only manage own staff shifts

**Leaderboard:**
- Store tab only (no regional/global)
- See only their staff rankings

---

#### SI - Store Inspection (2-3 Stores)
**Dashboard:**
- KPIs from 3 assigned stores
- Can switch between stores
- Store comparison widget

**AI Task Assignment:**
- Store selector (3 stores only)
- Can assign tasks cross-store
- Can reallocate staff between stores

**Task Monitoring:**
- Multi-store filter (3 stores)
- See staff from all 3 stores
- Can reassign cross-store

**Staff Management:**
- Staff from 3 stores (mix of ~24 staff)
- Can reallocate between their stores
- Special "Transfer Staff" button

**Shift Schedule:**
- 3-store view with tabs
- Can create shifts cross-store

**Leaderboard:**
- Regional tab highlighted
- Compare their 3 stores

---

#### AM - Area Manager (4-8 Stores, Regional)
**Dashboard:**
- Regional KPIs (4 stores)
- Regional alerts
- Regional performance trends

**AI Task Assignment:**
- Store selector (4 stores)
- Bulk assign to multiple stores
- Regional optimization scenarios

**Task Monitoring:**
- Regional filter (4 stores)
- Cross-store task reallocation
- Regional bottleneck alerts

**Staff Management:**
- Regional staff pool
- Cross-store reallocation
- Regional hiring dashboard

**Shift Schedule:**
- Regional calendar view
- Multi-store shift planning

**Leaderboard:**
- Regional tab emphasized
- Regional vs global comparison

---

### Implementation Details

**Approach:** Conditional rendering based on `profile.role`

**Example Code:**
```typescript
import { useRole } from '../contexts/RoleContext';

function Dashboard() {
  const { profile } = useRole();

  return (
    <div>
      {/* HQ sees all stores */}
      {profile.role === 'hq' && (
        <div className="grid grid-cols-4 gap-4">
          {profile.stores.map(store => (
            <StoreKPICard key={store.id} store={store} />
          ))}
        </div>
      )}

      {/* Store Manager sees only their store */}
      {profile.role === 'store-manager' && (
        <div>
          <StoreKPICard store={profile.stores[0]} />
          <StaffList staff={getStaffByStore(profile.stores[0].id)} />
        </div>
      )}

      {/* SI/AM see multiple stores with comparison */}
      {(profile.role === 'si' || profile.role === 'am') && (
        <div>
          <StoreSelector stores={profile.stores} />
          <MultiStoreComparison stores={profile.stores} />
        </div>
      )}
    </div>
  );
}
```

**Components to Create:**
1. `<StoreSelector>` - Dropdown for multi-store roles
2. `<MultiStoreKPIGrid>` - Compare stores side-by-side
3. `<RoleBasedFeatureFlag>` - Wrapper to show/hide features
4. `<CrossStoreStaffTransfer>` - SI/AM special feature
5. `<RegionalPerformanceWidget>` - AM dashboard widget

**Pages to Update:**
- [x] Dashboard.tsx
- [x] AITaskAssignment.tsx (already has store filtering)
- [x] TaskMonitoring.tsx
- [x] StaffManagement.tsx
- [x] ShiftSchedule.tsx
- [x] Leaderboard.tsx
- [x] Performance.tsx (analytics)

**Visual Differences:**
- **HQ:** Blue accent color, "System Admin" badge
- **Store Manager:** Pink accent (current), "Store Manager" badge
- **SI:** Purple accent, "Multi-Store" badge, store switcher
- **AM:** Orange accent, "Regional Manager" badge, region selector

**Estimated Effort:** 2-3 days
**Dependencies:** None (use existing RoleContext)

---

## ⚠️ FEATURE 3: SHIFT UNDERSTAFFING ALERTS

### Current Behavior
- Shifts displayed in calendar grid
- No alerts or warnings
- No recommendations

### Desired Behavior

#### Detection Logic
**Understaffed if:**
1. **Morning shift (07:00-12:00):** Less than 2 staff
2. **Mid shift (12:00-17:00):** Less than 3 staff (busiest)
3. **Evening shift (17:00-22:00):** Less than 2 staff
4. **Weekend:** Less than 3 staff (any time)

**Over-allocated if:**
- More than 6 staff in any 1-hour slot

### UI Components

#### 1. Alert Banner (Top of Shift Schedule Page)
```typescript
<div className="bg-orange-50 border-l-4 border-orange-400 p-4 mb-4">
  <div className="flex items-center">
    <AlertTriangle className="text-orange-400 mr-3" />
    <div>
      <h3 className="font-semibold text-orange-800">Understaffing Detected</h3>
      <p className="text-sm text-orange-700">
        3 shifts this week have insufficient coverage
      </p>
    </div>
  </div>
  <button className="mt-2 text-sm text-orange-600 underline">
    View Recommendations
  </button>
</div>
```

#### 2. Warning Icons on Calendar Cells
```typescript
// In each shift cell
{isUnderstaffed && (
  <div className="absolute top-1 right-1">
    <AlertTriangle className="w-4 h-4 text-red-500" />
  </div>
)}
```

#### 3. Understaffing Details Modal
**Shows when clicking warning:**
```
⚠️ Tuesday, Oct 29 - Mid Shift Understaffed

Current Coverage: 2 staff (Target: 3 staff)
Staff on duty:
  - Sarah Johnson (Store Manager) - 09:00-18:00
  - Mike Chen (Sales Associate) - 12:00-21:00

Recommended Actions:
  ✓ Call John Doe (on leave, available after 14:00)
  ✓ Extend Emily's shift by 2 hours (current: 07:00-16:00 → extend to 18:00)
  ✓ Add overtime shift for Lisa Wang (off today)
  ✓ Transfer staff from Store #02 (currently 5 staff on duty)
```

#### 4. Smart Recommendations Panel
**Sidebar widget showing:**
```typescript
<div className="bg-blue-50 p-4 rounded-lg">
  <h4 className="font-semibold mb-2 flex items-center">
    <Lightbulb className="w-4 h-4 mr-2 text-blue-500" />
    Smart Recommendations
  </h4>

  <div className="space-y-2">
    {/* Recommendation 1 */}
    <div className="bg-white p-2 rounded border">
      <p className="text-sm font-medium">Extend Emily's shift</p>
      <p className="text-xs text-gray-600">Covers mid-shift gap on Tue</p>
      <button className="text-xs text-blue-600 mt-1">Apply</button>
    </div>

    {/* Recommendation 2 */}
    <div className="bg-white p-2 rounded border">
      <p className="text-sm font-medium">Request overtime: Lisa Wang</p>
      <p className="text-xs text-gray-600">Available for evening shift</p>
      <button className="text-xs text-blue-600 mt-1">Send Request</button>
    </div>

    {/* Recommendation 3 */}
    <div className="bg-white p-2 rounded border">
      <p className="text-sm font-medium">Transfer from Store #02</p>
      <p className="text-xs text-gray-600">Store #02 has surplus staff</p>
      <button className="text-xs text-blue-600 mt-1">View Options</button>
    </div>
  </div>
</div>
```

### Implementation Details

#### Step 1: Shift Coverage Calculation
```typescript
interface ShiftCoverage {
  date: string;
  timeSlot: 'morning' | 'mid' | 'evening';
  requiredStaff: number;
  actualStaff: number;
  isUnderstaffed: boolean;
  isOverstaffed: boolean;
  staffMembers: string[];
}

function calculateShiftCoverage(shifts: Shift[], date: string): ShiftCoverage[] {
  const timeSlots = [
    { name: 'morning', start: '07:00', end: '12:00', required: 2 },
    { name: 'mid', start: '12:00', end: '17:00', required: 3 },
    { name: 'evening', start: '17:00', end: '22:00', required: 2 },
  ];

  return timeSlots.map(slot => {
    const staffInSlot = shifts.filter(shift =>
      shift.date === date &&
      timeOverlaps(shift.start, shift.end, slot.start, slot.end)
    );

    return {
      date,
      timeSlot: slot.name,
      requiredStaff: slot.required,
      actualStaff: staffInSlot.length,
      isUnderstaffed: staffInSlot.length < slot.required,
      isOverstaffed: staffInSlot.length > 6,
      staffMembers: staffInSlot.map(s => s.staffName),
    };
  });
}
```

#### Step 2: Generate Recommendations
```typescript
interface Recommendation {
  type: 'extend-shift' | 'overtime' | 'transfer' | 'call-backup';
  staffName: string;
  action: string;
  benefit: string;
  priority: 'high' | 'medium' | 'low';
}

function generateRecommendations(coverage: ShiftCoverage[]): Recommendation[] {
  const recommendations: Recommendation[] = [];

  coverage.forEach(slot => {
    if (slot.isUnderstaffed) {
      // Find staff who can extend their shift
      const canExtend = findStaffWithAdjacentShift(slot);
      if (canExtend) {
        recommendations.push({
          type: 'extend-shift',
          staffName: canExtend.name,
          action: `Extend shift by ${canExtend.hoursNeeded} hours`,
          benefit: `Covers ${slot.timeSlot} gap on ${slot.date}`,
          priority: 'high',
        });
      }

      // Find staff on leave who might be available
      const onLeave = findStaffOnLeave(slot.date);
      if (onLeave.length > 0) {
        recommendations.push({
          type: 'call-backup',
          staffName: onLeave[0].name,
          action: `Call ${onLeave[0].name} (on leave)`,
          benefit: `Available after ${onLeave[0].availableFrom}`,
          priority: 'medium',
        });
      }

      // Check if other stores have surplus
      const surplusStores = findStoresWithSurplus(slot.date, slot.timeSlot);
      if (surplusStores.length > 0) {
        recommendations.push({
          type: 'transfer',
          staffName: surplusStores[0].staffName,
          action: `Transfer from ${surplusStores[0].storeName}`,
          benefit: `${surplusStores[0].storeName} has ${surplusStores[0].surplus} extra staff`,
          priority: 'high',
        });
      }
    }
  });

  return recommendations;
}
```

#### Step 3: Alert Summary Widget
```typescript
function ShiftAlertsWidget() {
  const coverage = calculateShiftCoverage(shifts, selectedWeek);
  const understaffedCount = coverage.filter(c => c.isUnderstaffed).length;
  const overstaffedCount = coverage.filter(c => c.isOverstaffed).length;

  if (understaffedCount === 0 && overstaffedCount === 0) {
    return (
      <div className="bg-green-50 border border-green-200 p-3 rounded">
        <CheckCircle className="text-green-600" />
        <span>All shifts fully staffed</span>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {understaffedCount > 0 && (
        <div className="bg-red-50 border border-red-200 p-3 rounded">
          <AlertTriangle className="text-red-600" />
          <span>{understaffedCount} shifts understaffed</span>
        </div>
      )}
      {overstaffedCount > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 p-3 rounded">
          <AlertCircle className="text-yellow-600" />
          <span>{overstaffedCount} shifts overstaffed</span>
        </div>
      )}
    </div>
  );
}
```

### UI Locations

**HQ App - Shift Schedule Page:**
1. Alert banner at top (always visible)
2. Warning icons on calendar cells
3. Right sidebar: Smart Recommendations panel
4. Click warning icon → Modal with details and actions

**Staff App - Shift Management:**
1. Personal shift alert: "Your shift on Oct 29 is understaffed"
2. Banner: "Help needed: Consider overtime on Oct 30?"
3. Notification dot on Shifts tab icon

### Mock Data Updates

Add to `shared-data` or local mock:
```typescript
// Shift requirements by store
const shiftRequirements = {
  storeId: 'store-01',
  rules: [
    { timeSlot: 'morning', weekday: true, minStaff: 2, maxStaff: 4 },
    { timeSlot: 'mid', weekday: true, minStaff: 3, maxStaff: 6 },
    { timeSlot: 'evening', weekday: true, minStaff: 2, maxStaff: 4 },
    { timeSlot: 'morning', weekend: true, minStaff: 3, maxStaff: 5 },
    { timeSlot: 'mid', weekend: true, minStaff: 4, maxStaff: 7 },
    { timeSlot: 'evening', weekend: true, minStaff: 3, maxStaff: 5 },
  ],
};

// Sample understaffed scenarios
const understaffedShifts = [
  { date: '2025-10-29', timeSlot: 'mid', actualStaff: 2, requiredStaff: 3 },
  { date: '2025-10-31', timeSlot: 'evening', actualStaff: 1, requiredStaff: 2 },
  { date: '2025-11-02', timeSlot: 'morning', actualStaff: 2, requiredStaff: 3 }, // Weekend
];
```

**Estimated Effort:** 2-3 days
**Dependencies:** None (use existing shift data)

---

## 📅 IMPLEMENTATION TIMELINE

### Phase 1: Planning & Setup (Day 1)
- [x] Document requirements (this file)
- [ ] Install dependencies (`@dnd-kit/core`, `@dnd-kit/sortable`)
- [ ] Create feature branches
- [ ] Set up mock data structures

### Phase 2: Feature 1 - Drag & Drop (Days 2-3)
**Day 2:**
- [ ] Install and configure @dnd-kit
- [ ] Create DragContext wrapper for Gantt chart
- [ ] Make task cards draggable
- [ ] Add visual feedback (ghost, hover)

**Day 3:**
- [ ] Implement drop logic
- [ ] Handle time slot conflicts
- [ ] Add success/error notifications
- [ ] Test edge cases
- [ ] Polish animations

### Phase 3: Feature 2 - Role-Based UI (Days 4-6)
**Day 4:**
- [ ] Create reusable components (StoreSelector, RoleBasedFeatureFlag)
- [ ] Update Dashboard page with role-specific layouts
- [ ] Update AI Task Assignment (add/hide store selector)

**Day 5:**
- [ ] Update Task Monitoring with role filters
- [ ] Update Staff Management with role permissions
- [ ] Update Shift Schedule with role-specific views

**Day 6:**
- [ ] Update Leaderboard with role-based tabs
- [ ] Add visual role indicators (badges, accent colors)
- [ ] Test all 4 roles thoroughly
- [ ] Document role differences

### Phase 4: Feature 3 - Shift Alerts (Days 7-9)
**Day 7:**
- [ ] Create shift coverage calculation logic
- [ ] Create recommendation generator
- [ ] Mock data for understaffed scenarios

**Day 8:**
- [ ] Build alert banner component
- [ ] Build recommendations sidebar
- [ ] Add warning icons to calendar
- [ ] Create understaffing detail modal

**Day 9:**
- [ ] Add staff app shift alerts
- [ ] Polish UI and animations
- [ ] Test various scenarios
- [ ] Add documentation

### Phase 5: Testing & Polish (Day 10)
- [ ] Cross-browser testing
- [ ] Mobile responsiveness check
- [ ] Fix any bugs
- [ ] Update CLAUDE.md documentation
- [ ] Record demo video

**Total Estimated Time:** 10 working days (~2 weeks)

---

## 🎬 WHAT TO DO NEXT?

### Option 1: Do All 3 Features Sequentially
**Pros:** Complete package, comprehensive demo
**Cons:** Takes 2 weeks
**Timeline:** Days 1-10

### Option 2: Do Quick Wins First
**Order:** Feature 2 (Role UI) → Feature 3 (Alerts) → Feature 1 (Drag & Drop)
**Pros:** Visible changes faster, easier features first
**Cons:** Most impressive feature (drag & drop) comes last
**Timeline:** Days 1-10 (reordered)

### Option 3: Do One Feature at a Time
**Start with:** Feature 1 (Drag & Drop) - Most impressive
**Then discuss:** Do we need the others?
**Pros:** Fastest to something impressive
**Cons:** Incomplete feature set
**Timeline:** Days 1-3 for Feature 1

---

## ❓ QUESTIONS FOR YOU

1. **Which features are highest priority?**
   - [ ] Feature 1: Drag & Drop (most impressive)
   - [ ] Feature 2: Role-Based UI (demonstrates hierarchy)
   - [ ] Feature 3: Shift Alerts (shows AI/intelligence)
   - [ ] All 3 equally important

2. **Timeline preference?**
   - [ ] Start all 3 now (2 weeks)
   - [ ] Do one at a time (3-4 days each)
   - [ ] Pick the most important one only

3. **For Feature 2 (Role-Based UI), how different should roles be?**
   - [ ] Major differences (completely different dashboards)
   - [ ] Moderate differences (same layout, different data)
   - [ ] Minor differences (just show/hide some features)

4. **For Feature 3 (Shift Alerts), should we also add:**
   - [ ] Automatic shift suggestions (one-click apply)
   - [ ] Email/SMS notifications (mocked)
   - [ ] Shift swap requests between staff
   - [ ] Just the basic alerts and recommendations

5. **Any other frontend features you want while we're at it?**
   - Examples: Export to Excel (mock), Print views, Dark mode, etc.

---

## 🚀 READY TO START!

**Tell me:**
1. Which feature(s) to implement?
2. What order?
3. Any specific requirements or preferences?

Then I'll start building! 💪
