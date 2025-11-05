# Drag & Drop Task Management Proposal

**Date:** November 5, 2025
**Target Page:** Task Monitoring (Timeline View)
**Goal:** Enable intuitive task reassignment and time adjustment via drag & drop

---

## 📊 CURRENT STATE ANALYSIS

### What Works Well:
✅ Timeline view shows all staff rows with tasks
✅ Tasks positioned accurately based on time
✅ Visual indicators (status colors, type badges)
✅ Three view modes (Timeline, Kanban, List)
✅ Handles task overlaps with vertical stacking

### What's Missing:
❌ No way to reassign tasks between staff (must go to AI Task Assignment)
❌ No way to adjust task timing (start/end time)
❌ No interactive editing capabilities
❌ No visual feedback for drag operations

---

## 🎯 PROPOSED FEATURES

### **Feature 1: Drag to Reassign Staff** (Priority: HIGH)

**User Action:**
1. Manager grabs a task card from Staff A's timeline
2. Drags it to Staff B's row
3. Drops it → Task reassigned to Staff B
4. System auto-adjusts time if conflict detected

**Visual Feedback:**
- Cursor changes to "grabbing" during drag
- Task card becomes semi-transparent (opacity: 0.5)
- Drop zone (staff row) highlights with blue border when hovering
- Ghost preview shows where task will land
- Success animation (green flash) on successful drop
- Error shake animation if invalid drop

**Business Rules:**
- ✅ Can reassign to any staff in current store
- ✅ Auto-detect time conflicts on target staff
- ✅ Auto-shift task to next available slot if conflict
- ❌ Cannot drop on same staff (no-op)
- ❌ Cannot drop outside timeline area
- ⚠️ Warn if new staff lacks required skills (mock check)

---

### **Feature 2: Drag to Adjust Time** (Priority: MEDIUM)

**User Action:**
1. Manager grabs task card's left or right edge
2. Drags left edge = adjust start time
3. Drags right edge = adjust end time (duration)
4. System snaps to 15-minute intervals

**Visual Feedback:**
- Resize cursor (↔) when hovering on task edges
- Task width changes in real-time during resize
- Time labels update dynamically
- Minimum width: 30 minutes (enforced)
- Maximum width: 4 hours (DWS limit)

**Business Rules:**
- ✅ Snap to 15-min intervals (e.g., 08:00, 08:15, 08:30)
- ✅ Prevent overlap with same staff's other tasks
- ✅ Respect shift boundaries (can't extend beyond staff shift)
- ❌ Cannot resize below minimum duration (30 mins)
- ⚠️ Warn if duration exceeds estimated time by >50%

---

### **Feature 3: Kanban Drag Between Status Columns** (Priority: MEDIUM)

**User Action:**
1. In Kanban view, drag task card from "Open" column
2. Drop in "Processing" column
3. Task status updates automatically

**Visual Feedback:**
- Column highlights when dragging over
- Card count badges update in real-time
- Smooth slide-in animation

**Business Rules:**
- ✅ Can move forward in workflow (Open → Processing → Done)
- ⚠️ Warn if moving backwards (Done → Processing)
- ❌ Cannot skip statuses (Open → Awaiting Approval directly)

---

## 🛠️ IMPLEMENTATION PLAN

### **Step 1: Install Dependencies**

```bash
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

**Why @dnd-kit?**
- Lightweight (60KB vs 150KB for react-beautiful-dnd)
- Better TypeScript support
- Active maintenance
- Supports multi-container drag (staff rows, Kanban columns)
- Built-in accessibility (keyboard navigation)

---

### **Step 2: Timeline View - Drag to Reassign**

#### **2.1: Wrap Timeline in DndContext**

```typescript
import { DndContext, DragOverlay, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useState } from 'react';

export default function TaskMonitoring() {
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [tasks, setTasks] = useState(initialTasks);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // 5px movement to activate (prevents accidental drags)
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveTaskId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveTaskId(null);
      return;
    }

    // Extract task ID and target staff ID
    const taskId = active.id as string;
    const targetStaffId = over.id as string; // Staff row is the droppable

    // Reassign task
    reassignTask(taskId, targetStaffId);
    setActiveTaskId(null);
  };

  const handleDragCancel = () => {
    setActiveTaskId(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      {/* Timeline content */}
      <TimelineView tasks={tasks} staff={storeStaff} />

      {/* Drag Overlay - Shows ghost preview */}
      <DragOverlay>
        {activeTaskId ? (
          <TaskCardPreview task={tasks.find(t => t.id === activeTaskId)} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
```

---

#### **2.2: Make Task Cards Draggable**

```typescript
import { useDraggable } from '@dnd-kit/core';

function DraggableTaskCard({ task, style }: { task: Task; style: React.CSSProperties }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
    data: {
      taskId: task.id,
      staffId: task.staffId,
      type: 'task',
    },
  });

  const dragStyle = transform
    ? {
        ...style,
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0.5 : 1,
        cursor: isDragging ? 'grabbing' : 'grab',
        zIndex: isDragging ? 1000 : 10,
      }
    : style;

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`absolute rounded-lg border-2 p-2 transition-all ${getStatusColor(task.status)}`}
      style={dragStyle}
    >
      <div className="flex items-start justify-between gap-1 mb-1">
        <span className="text-xs font-medium flex-1 truncate">{task.title}</span>
        <div className={`w-3 h-3 rounded-full shrink-0 ${getTypeDotColor(task.type)}`}></div>
      </div>
      <div className="opacity-70" style={{ fontSize: '10px' }}>
        {task.startTime} - {task.endTime}
      </div>
    </div>
  );
}
```

---

#### **2.3: Make Staff Rows Droppable**

```typescript
import { useDroppable } from '@dnd-kit/core';

function DroppableStaffRow({ staff, children }: { staff: Staff; children: React.ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({
    id: staff.id,
    data: {
      staffId: staff.id,
      type: 'staff-row',
    },
  });

  return (
    <td
      ref={setNodeRef}
      className={`relative p-0 transition-all ${
        isOver ? 'bg-blue-50 ring-2 ring-blue-400 ring-inset' : ''
      }`}
      style={{ height: '100px' }}
    >
      {children}
    </td>
  );
}
```

---

#### **2.4: Task Reassignment Logic**

```typescript
interface TimeSlot {
  start: number; // minutes since midnight
  end: number;
}

function reassignTask(taskId: string, targetStaffId: string) {
  const task = tasks.find(t => t.id === taskId);
  if (!task || task.staffId === targetStaffId) return;

  // Get target staff's existing tasks
  const targetStaffTasks = tasks.filter(t => t.staffId === targetStaffId && t.id !== taskId);

  // Convert task times to minutes
  const taskStart = timeToMinutes(task.startTime);
  const taskEnd = timeToMinutes(task.endTime);

  // Check for conflicts
  const hasConflict = targetStaffTasks.some(t => {
    const tStart = timeToMinutes(t.startTime);
    const tEnd = timeToMinutes(t.endTime);
    return (taskStart < tEnd && taskEnd > tStart);
  });

  if (hasConflict) {
    // Find next available slot
    const newSlot = findNextAvailableSlot(targetStaffTasks, taskEnd - taskStart);

    if (newSlot) {
      // Auto-adjust time
      task.startTime = minutesToTime(newSlot.start);
      task.endTime = minutesToTime(newSlot.end);
      task.staffId = targetStaffId;

      showNotification('warning', `Task reassigned with adjusted time: ${task.startTime} - ${task.endTime}`);
    } else {
      showNotification('error', 'No available time slot found for this task');
      return;
    }
  } else {
    // No conflict, direct reassignment
    task.staffId = targetStaffId;
    showNotification('success', `Task reassigned to ${getStaffName(targetStaffId)}`);
  }

  // Update state
  setTasks([...tasks]);
}

function findNextAvailableSlot(existingTasks: Task[], duration: number): TimeSlot | null {
  const slots: TimeSlot[] = existingTasks
    .map(t => ({ start: timeToMinutes(t.startTime), end: timeToMinutes(t.endTime) }))
    .sort((a, b) => a.start - b.start);

  const shiftStart = 8 * 60; // 08:00
  const shiftEnd = 17 * 60; // 17:00

  // Check gap before first task
  if (slots.length === 0 || slots[0].start - shiftStart >= duration) {
    return { start: shiftStart, end: shiftStart + duration };
  }

  // Check gaps between tasks
  for (let i = 0; i < slots.length - 1; i++) {
    const gapStart = slots[i].end;
    const gapEnd = slots[i + 1].start;
    if (gapEnd - gapStart >= duration) {
      return { start: gapStart, end: gapStart + duration };
    }
  }

  // Check gap after last task
  const lastEnd = slots[slots.length - 1].end;
  if (shiftEnd - lastEnd >= duration) {
    return { start: lastEnd, end: lastEnd + duration };
  }

  return null; // No slot found
}

function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

function minutesToTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}
```

---

### **Step 3: Timeline View - Drag to Resize**

#### **3.1: Resizable Task Card Component**

```typescript
import { useRef, useState } from 'react';

function ResizableTaskCard({ task, style }: { task: Task; style: React.CSSProperties }) {
  const [isResizing, setIsResizing] = useState(false);
  const [resizeEdge, setResizeEdge] = useState<'left' | 'right' | null>(null);
  const taskRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (edge: 'left' | 'right') => (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeEdge(edge);

    const startX = e.clientX;
    const originalStart = timeToMinutes(task.startTime);
    const originalEnd = timeToMinutes(task.endTime);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaMinutes = Math.round((deltaX / hourWidth) * 60 / 15) * 15; // Snap to 15min

      if (edge === 'left') {
        const newStart = Math.max(8 * 60, originalStart + deltaMinutes);
        if (originalEnd - newStart >= 30) { // Min 30 mins
          updateTaskTime(task.id, minutesToTime(newStart), task.endTime);
        }
      } else {
        const newEnd = Math.min(17 * 60, originalEnd + deltaMinutes);
        if (newEnd - originalStart >= 30) { // Min 30 mins
          updateTaskTime(task.id, task.startTime, minutesToTime(newEnd));
        }
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      setResizeEdge(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      ref={taskRef}
      className={`absolute rounded-lg border-2 p-2 transition-all group ${getStatusColor(task.status)}`}
      style={style}
    >
      {/* Left resize handle */}
      <div
        className="absolute left-0 top-0 bottom-0 w-2 cursor-ew-resize hover:bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"
        onMouseDown={handleMouseDown('left')}
      />

      {/* Task content */}
      <div className="flex items-start justify-between gap-1 mb-1 pointer-events-none">
        <span className="text-xs font-medium flex-1 truncate">{task.title}</span>
        <div className={`w-3 h-3 rounded-full shrink-0 ${getTypeDotColor(task.type)}`}></div>
      </div>
      <div className="opacity-70 pointer-events-none" style={{ fontSize: '10px' }}>
        {task.startTime} - {task.endTime}
      </div>

      {/* Right resize handle */}
      <div
        className="absolute right-0 top-0 bottom-0 w-2 cursor-ew-resize hover:bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"
        onMouseDown={handleMouseDown('right')}
      />
    </div>
  );
}
```

---

### **Step 4: Kanban View - Drag Between Columns**

```typescript
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';

function KanbanColumn({ status, tasks }: { status: string; tasks: Task[] }) {
  const { setNodeRef } = useDroppable({
    id: status,
    data: { type: 'status-column', status },
  });

  return (
    <div ref={setNodeRef} className="flex-1 min-w-[280px] bg-white rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium">{status}</h3>
        <span className="text-xs bg-gray-100 px-2 py-1 rounded">{tasks.length}</span>
      </div>

      <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-3">
          {tasks.map(task => (
            <SortableTaskCard key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}

function SortableTaskCard({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: { taskId: task.id, status: task.status },
  });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={`rounded-lg border-2 p-3 cursor-grab active:cursor-grabbing ${getStatusColor(task.status)}`}
    >
      {/* Task content */}
    </div>
  );
}
```

---

## 🎨 VISUAL ENHANCEMENTS

### **1. Toast Notifications Component**

```typescript
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface ToastProps {
  type: 'success' | 'warning' | 'error';
  message: string;
  onClose: () => void;
}

function Toast({ type, message, onClose }: ToastProps) {
  const config = {
    success: { icon: CheckCircle, bg: 'bg-green-50', border: 'border-green-500', text: 'text-green-800' },
    warning: { icon: AlertTriangle, bg: 'bg-yellow-50', border: 'border-yellow-500', text: 'text-yellow-800' },
    error: { icon: XCircle, bg: 'bg-red-50', border: 'border-red-500', text: 'text-red-800' },
  };

  const { icon: Icon, bg, border, text } = config[type];

  return (
    <div className={`${bg} border-l-4 ${border} p-4 rounded shadow-lg flex items-center gap-3 animate-slide-in`}>
      <Icon className={`w-5 h-5 ${text}`} />
      <span className={`flex-1 ${text} text-sm font-medium`}>{message}</span>
      <button onClick={onClose} className="text-gray-400 hover:text-gray-600">×</button>
    </div>
  );
}
```

---

### **2. Drag Overlay Preview (Ghost)**

```typescript
function TaskCardPreview({ task }: { task?: Task }) {
  if (!task) return null;

  return (
    <div
      className={`rounded-lg border-2 p-2 shadow-2xl opacity-80 ${getStatusColor(task.status)}`}
      style={{ width: '200px', cursor: 'grabbing' }}
    >
      <div className="flex items-start justify-between gap-1 mb-1">
        <span className="text-xs font-medium flex-1 truncate">{task.title}</span>
        <div className={`w-3 h-3 rounded-full ${getTypeDotColor(task.type)}`}></div>
      </div>
      <div className="opacity-70" style={{ fontSize: '10px' }}>
        {task.startTime} - {task.endTime}
      </div>
    </div>
  );
}
```

---

## 📊 STATE MANAGEMENT

### **Task Update Functions**

```typescript
// Reassign task to different staff
function reassignTask(taskId: string, newStaffId: string) {
  setTasks(prevTasks =>
    prevTasks.map(task =>
      task.id === taskId
        ? { ...task, staffId: newStaffId }
        : task
    )
  );
}

// Update task timing
function updateTaskTime(taskId: string, newStartTime: string, newEndTime: string) {
  setTasks(prevTasks =>
    prevTasks.map(task =>
      task.id === taskId
        ? { ...task, startTime: newStartTime, endTime: newEndTime }
        : task
    )
  );
}

// Change task status (Kanban)
function updateTaskStatus(taskId: string, newStatus: string) {
  setTasks(prevTasks =>
    prevTasks.map(task =>
      task.id === taskId
        ? { ...task, status: newStatus }
        : task
    )
  );
}

// Undo functionality (optional but nice to have)
function useTaskHistory() {
  const [history, setHistory] = useState<Task[][]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const pushState = (newTasks: Task[]) => {
    const newHistory = history.slice(0, currentIndex + 1);
    setHistory([...newHistory, newTasks]);
    setCurrentIndex(newHistory.length);
  };

  const undo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      return history[currentIndex - 1];
    }
  };

  const redo = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
      return history[currentIndex + 1];
    }
  };

  return { pushState, undo, redo, canUndo: currentIndex > 0, canRedo: currentIndex < history.length - 1 };
}
```

---

## 🚀 IMPLEMENTATION TIMELINE

### **Day 1: Setup & Timeline Drag to Reassign** (6-8 hours)
- [ ] Install @dnd-kit dependencies
- [ ] Wrap Timeline in DndContext
- [ ] Make task cards draggable
- [ ] Make staff rows droppable
- [ ] Implement basic reassignment logic
- [ ] Add visual feedback (opacity, cursors)
- [ ] Test with mock data

### **Day 2: Conflict Detection & Time Adjustment** (6-8 hours)
- [ ] Implement conflict detection algorithm
- [ ] Build findNextAvailableSlot() function
- [ ] Add toast notifications component
- [ ] Add drag overlay (ghost preview)
- [ ] Implement resize handles for task cards
- [ ] Add time adjustment logic with 15-min snapping
- [ ] Test edge cases (overlaps, shift boundaries)

### **Day 3: Kanban Drag & Polish** (4-6 hours)
- [ ] Implement Kanban drag between columns
- [ ] Add status change validation
- [ ] Add undo/redo functionality (optional)
- [ ] Polish animations and transitions
- [ ] Add keyboard shortcuts (ESC to cancel drag)
- [ ] Cross-browser testing
- [ ] Documentation and code comments

**Total Estimated Time:** 2-3 days

---

## ⚠️ EDGE CASES TO HANDLE

### **1. Task Overlap on Drop**
- **Problem:** Dropping task creates overlap with existing tasks
- **Solution:** Auto-shift to next available slot + show warning toast

### **2. Drop Outside Timeline**
- **Problem:** User drags task outside visible area
- **Solution:** Snap back to original position (DndContext handles this)

### **3. Resize Beyond Shift Hours**
- **Problem:** User tries to resize past 17:00 or before 08:00
- **Solution:** Clamp to shift boundaries (08:00-17:00)

### **4. Minimum Task Duration**
- **Problem:** User resizes to <30 minutes
- **Solution:** Prevent resize below minimum (30 mins)

### **5. Multi-User Conflict**
- **Problem:** Two managers edit same task simultaneously
- **Solution:** Show warning "Task modified by another user. Refresh to see latest."
- **Future:** WebSocket for real-time sync

### **6. Task Spanning Multiple Days**
- **Problem:** Resize extends past 23:59
- **Solution:** Not supported in current version (tasks are single-day only)

### **7. Drag Between Different Stores**
- **Problem:** Multi-store managers might try cross-store assignment
- **Solution:** Allow but show warning "Transferring task to different store"

---

## 🎯 ACCEPTANCE CRITERIA

### **Must Have:**
- ✅ Drag task card between staff rows
- ✅ Visual feedback during drag (opacity, ghost, drop zone highlight)
- ✅ Auto-detect time conflicts
- ✅ Auto-adjust to next available slot if conflict
- ✅ Toast notifications (success/warning/error)
- ✅ Resize task duration by dragging edges
- ✅ Snap to 15-minute intervals

### **Nice to Have:**
- ⭐ Kanban drag between status columns
- ⭐ Undo/redo functionality
- ⭐ Keyboard shortcuts (Ctrl+Z to undo)
- ⭐ Bulk operations (multi-select tasks)
- ⭐ Drag to swap tasks (A ↔ B)

### **Future Enhancements:**
- 🔮 WebSocket for real-time multi-user sync
- 🔮 Drag to copy task (hold Ctrl while dragging)
- 🔮 Recurring task patterns
- 🔮 AI suggestions during drag ("Staff B has lower workload")

---

## 🎬 DEMO FLOW

### **Scenario 1: Reassign Task Due to Staff Unavailability**

1. Manager opens Task Monitoring → Timeline View
2. Sees "Morning Inventory" assigned to Sarah (08:00-09:00)
3. Sarah calls in sick → Need to reassign
4. Manager grabs "Morning Inventory" card
5. Drags to Mike's row
6. Drop zone (Mike's row) highlights blue
7. Drops → System checks Mike's schedule
8. Conflict detected (Mike has "Stock Check" 08:00-08:30)
9. Toast: "Task reassigned with adjusted time: 08:30-09:30"
10. Task card moves to Mike's row at new time slot

---

### **Scenario 2: Extend Task Duration**

1. Manager sees "Customer Training" (14:00-15:00)
2. Realizes it needs 2 hours, not 1
3. Hovers on right edge of task card
4. Cursor changes to ↔
5. Drags right edge to 16:00
6. Task card width expands in real-time
7. Time label updates: "14:00-16:00"
8. Releases → Toast: "Task duration updated to 2 hours"

---

### **Scenario 3: Kanban Status Change**

1. Manager switches to Kanban View
2. Drags "Safety Inspection" from "Open" column
3. Drops in "Processing" column
4. Card slides into new column with animation
5. Badge count updates (Open: 12 → 11, Processing: 8 → 9)
6. Toast: "Task status updated to Processing"

---

## ❓ QUESTIONS FOR YOU

1. **Should we allow cross-store task reassignment?**
   - [ ] Yes, with warning message
   - [ ] No, restrict to current store only

2. **What happens if no available slot found?**
   - [ ] Show error, don't allow drop
   - [ ] Force reassignment anyway (create overlap)
   - [ ] Ask user to manually adjust time

3. **Kanban status workflow restrictions?**
   - [ ] Strict (can only move forward: Open → Processing → Done)
   - [ ] Flexible (can move to any status)
   - [ ] Warn but allow backwards movement

4. **Undo/Redo priority?**
   - [ ] Must have (implement in Day 1-2)
   - [ ] Nice to have (implement if time permits)
   - [ ] Skip for now

5. **Mobile/Touch support?**
   - [ ] Yes, make it touch-friendly
   - [ ] No, desktop only for now

---

## 🚀 READY TO IMPLEMENT

Let me know:
1. ✅ Approve this proposal?
2. 🔧 Any modifications needed?
3. 🎯 Which features are must-have vs nice-to-have?
4. 📅 When should I start?

Then I'll begin building! 💪
