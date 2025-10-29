# Task Visualization Alignment Proposal

**Date**: October 29, 2025
**Objective**: Align HQ app task visualizations with Staff Tablet app design patterns

---

## 📱 Staff Tablet App Analysis

### Key Design Patterns Identified

#### 1. **TaskCard Component**
- **Small colored dots** (not full badges)
  - DWS = Blue dot (`bg-blue-500`)
  - WS = Orange dot (`bg-orange-500`)
- **Status-based borders and backgrounds**:
  - Open: `bg-gray-100 border-gray-300 text-gray-700`
  - Processing: `bg-purple-100 border-purple-300 text-purple-700`
  - Pending: `bg-yellow-100 border-yellow-300 text-yellow-700`
  - Awaiting Approval: `bg-blue-100 border-blue-300 text-blue-700`
  - Done: `bg-green-100 border-green-300 text-green-700`
- **Minimal layout**:
  - Task title at top
  - Time range at bottom (small text)
  - Type dot in top-right corner

#### 2. **Timeline View** (`TimelineView.tsx`)
- **8h/24h toggle** buttons (top-right)
- **"Now" indicator**: Red vertical line with dot
- **Stats bar** showing:
  - Tasks Assigned (time)
  - Work Logged (time)
  - Staff Capacity (time)
- **Type legend**: `● DWS` `● WS` with small dots
- **Staff rows**:
  - Name + shift time on left (132px width)
  - Timeline with hour markers
  - Tasks positioned absolutely with overlap detection
- **Task stacking**: When tasks overlap, split vertically (max 2 parallel)
- **Narrow tasks**: Show only name + dot when width < 100px

#### 3. **Kanban View** (`KanbanView.tsx`)
- **6 status columns**: Open, Processing, Pending, Awaiting Approval, Done, Cancelled
- **Rounded cards** (`rounded-xl`)
- **White background** columns on gray background
- **Task count badges** in column headers
- **Consistent card styling** with colored dots

#### 4. **Filter Bar** (`TaskFilters.tsx`)
- **Date navigation**: Previous/Today/Next buttons
- **Task type filter**: All/DWS/WS pills
- Clean, minimal design

---

## 🎯 Changes Needed in HQ App

### Current State vs. Target

| Component | Current | Target | Priority |
|-----------|---------|--------|----------|
| **Task Type Indicator** | Full badge `[DWS]` `[WS]` | Small colored dot `●` | 🔴 High |
| **Timeline "Now" Line** | ❌ Missing | ✅ Red vertical line + dot | 🔴 High |
| **8h/24h Toggle** | ❌ Missing | ✅ Toggle buttons | 🟡 Medium |
| **Stats Bar** | ❌ Missing | ✅ Tasks/Work/Capacity | 🟡 Medium |
| **Type Legend** | ❌ Missing | ✅ `● DWS` `● WS` | 🟢 Low |
| **Task Stacking** | ❌ None | ✅ Vertical split on overlap | 🟡 Medium |
| **Kanban Styling** | Basic | Rounded + polished | 🟢 Low |
| **Staff Row Width** | `w-64` (256px) | `w-32` (132px) | 🟢 Low |

---

## 📋 Implementation Plan

### Phase 1: Task Card Alignment (30 min)

**File**: `src/pages/TaskMonitoring.tsx`

#### Change 1: Replace full badges with colored dots

**Before**:
```tsx
<span className={`${getTypeColor(task.type)} text-white px-2 py-1 rounded text-xs font-medium`}>
  {task.type}
</span>
```

**After**:
```tsx
<div className={`w-2 h-2 rounded-full ${task.type === 'DWS' ? 'bg-blue-500' : 'bg-orange-500'}`}></div>
```

#### Change 2: Update task card layout in Timeline view

```tsx
<div className="absolute rounded-lg border-2 p-2 transition-all hover:shadow-lg">
  <div className="flex items-start justify-between gap-1">
    <span className="text-xs flex-1 line-clamp-2">{task.title}</span>
    <div className={`w-2 h-2 rounded-full ${getDotColor(task.type)}`}></div>
  </div>
  <div className="text-[10px] opacity-70 mt-1">
    {task.startTime} - {task.endTime}
  </div>
</div>
```

---

### Phase 2: Timeline View Enhancements (45 min)

**File**: `src/pages/TaskMonitoring.tsx`

#### Change 1: Add "Now" indicator

```tsx
// Calculate current time position
const nowTime = new Date();
const nowHour = nowTime.getHours();
const nowMinute = nowTime.getMinutes();
const hoursFromStart = nowHour - 7; // Assuming 7:00 start
const minuteFraction = nowMinute / 60;
const nowPosition = (hoursFromStart + minuteFraction) * hourWidth;

// In timeline grid:
<div
  className="absolute bg-red-500 w-0.5 top-0 bottom-0 z-50"
  style={{ left: `${nowPosition}px` }}
>
  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-red-500 shadow-lg"></div>
</div>
```

#### Change 2: Add stats bar

```tsx
<div className="px-6 py-3 border-b bg-white">
  <div className="flex items-center gap-6 text-sm">
    <div>
      <span className="text-gray-500">Tasks Assigned</span>
      <span className="ml-2 font-medium">{calculateTasksTime()}</span>
    </div>
    <div>
      <span className="text-gray-500">Work Logged</span>
      <span className="ml-2 font-medium">{calculateWorkLogged()}</span>
    </div>
    <div>
      <span className="text-gray-500">Staff Capacity</span>
      <span className="ml-2 font-medium">{calculateCapacity()}</span>
    </div>
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1.5">
        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
        <span className="text-gray-500">DWS</span>
      </div>
      <div className="flex items-center gap-1.5">
        <div className="w-2 h-2 rounded-full bg-orange-500"></div>
        <span className="text-gray-500">WS</span>
      </div>
    </div>
  </div>
</div>
```

#### Change 3: Add 8h/24h toggle

```tsx
const [timeRange, setTimeRange] = useState<'8h' | '24h'>('8h');

<div className="flex gap-2">
  <Button
    variant={timeRange === '8h' ? 'default' : 'outline'}
    size="sm"
    onClick={() => setTimeRange('8h')}
  >
    8 hour
  </Button>
  <Button
    variant={timeRange === '24h' ? 'default' : 'outline'}
    size="sm"
    onClick={() => setTimeRange('24h')}
  >
    24 hour
  </Button>
</div>
```

#### Change 4: Narrow staff column

```tsx
// Change from w-64 to w-32
<div className="w-32 shrink-0 border-r px-4 py-3">
  <div className="text-sm">{staff.name}</div>
  <div className="text-xs text-gray-500">{staff.role}</div>
</div>
```

---

### Phase 3: Kanban View Polish (20 min)

**File**: `src/pages/TaskMonitoring.tsx`

```tsx
<div className="flex-1 overflow-auto bg-gray-50 p-6">
  <div className="flex gap-4 h-full">
    {statusGroups.map((group) => (
      <div
        key={group.name}
        className="flex-1 min-w-[280px] bg-white rounded-xl p-4 flex flex-col"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm">{group.name}</h3>
          <span className="text-xs bg-gray-100 px-2 py-1 rounded">
            {group.tasks.length}
          </span>
        </div>

        <div className="flex-1 overflow-auto space-y-3">
          {group.tasks.map((task) => (
            <button
              key={task.id}
              className={`w-full text-left rounded-lg border-2 p-3 ${getStatusColor(task.status)}`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-sm flex-1">{task.title}</span>
                <div className={`w-2 h-2 rounded-full ${getDotColor(task.type)}`}></div>
              </div>
              <div className="text-xs opacity-70">
                {task.startTime} - {task.endTime}
              </div>
            </button>
          ))}
        </div>
      </div>
    ))}
  </div>
</div>
```

---

### Phase 4: AI Assignment Gantt Chart (30 min)

**File**: `src/pages/AITaskAssignment.tsx`

Apply same changes:
- Replace badge with colored dot
- Add "Now" indicator
- Update card layout
- Narrow staff column

---

## 🎨 Visual Comparison

### Task Cards

**Before** (HQ App):
```
┌────────────────────────────┐
│ Morning Register Setup     │
│ [DWS] ← Full badge        │
│ 08:00 - 08:30             │
└────────────────────────────┘
```

**After** (Matching Staff App):
```
┌────────────────────────────┐
│ Morning Register Setup  ● │ ← Dot
│ 08:00 - 08:30             │
└────────────────────────────┘
```

### Timeline View

**Before**:
```
┌─────────────┬──────────────────────────────────┐
│             │  08:00  09:00  10:00  11:00      │
│ Sarah       │  [────────Task─────────]         │
│ Floor Mgr   │                                   │
└─────────────┴──────────────────────────────────┘
```

**After**:
```
┌─────────┬──────────────────────────────────────┐
│         │  08:00  09:00  10:00  11:00  12:00   │
│         │           │← Now                      │
│ Sarah   │  [─Task─●]│        [─Task─●]        │
│ 8:00-17 │           │                           │
└─────────┴──────────────────────────────────────┘
                      ↑ Red line indicator
```

### Type Legend

**Before**: Large badges
**After**: `● DWS  ● WS` (Small dots with labels)

---

## ✅ Benefits

1. **Visual Consistency**: Staff sees same design on tablet, managers see same on desktop
2. **Cleaner UI**: Dots take less space than badges
3. **Better UX**: Now indicator helps track current time
4. **Professional**: Matches modern task management tools
5. **Responsive**: Narrow tasks still readable with dots

---

## 📊 Before & After Metrics

| Metric | Before | After |
|--------|--------|-------|
| Task type indicator size | 40px × 20px | 8px × 8px |
| Staff column width | 256px | 132px |
| Timeline visible area | +25% | |
| Visual consistency | ❌ Different | ✅ Same |
| Now indicator | ❌ None | ✅ Present |

---

## 🚀 Implementation Order

1. ✅ **Phase 1**: Task card dots (30 min) - High impact, easy
2. ✅ **Phase 2**: Timeline enhancements (45 min) - Core feature
3. ✅ **Phase 3**: Kanban polish (20 min) - Quick win
4. ✅ **Phase 4**: AI Assignment update (30 min) - Consistency

**Total Time**: ~2 hours

---

## 🎯 Success Criteria

- [  ] Task cards show colored dots instead of badges
- [  ] Timeline has red "now" indicator line
- [  ] Stats bar displays task metrics
- [  ] 8h/24h toggle functional
- [  ] Type legend uses dots
- [  ] Kanban view matches staff app styling
- [  ] AI Assignment Gantt uses same patterns
- [  ] Visual consistency between HQ and Staff apps

---

**Status**: Ready for Implementation
**Approval**: Pending user confirmation
