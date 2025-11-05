# Drag & Drop Implementation Status

**Date:** November 5, 2025
**Current Progress:** Day 1 - Setup & Foundation

---

## ✅ COMPLETED

### 1. Dependencies Installed
```bash
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```
- ✅ @dnd-kit/core (drag & drop core)
- ✅ @dnd-kit/sortable (sortable lists)
- ✅ @dnd-kit/utilities (helper functions)

### 2. Toast Notification Component Created
**File:** `src/components/Toast.tsx`

Features:
- ✅ 4 toast types (success, warning, error, info)
- ✅ Auto-dismiss after 3 seconds
- ✅ Manual close button
- ✅ Slide-in animation
- ✅ Toast container for multiple toasts
- ✅ Color-coded icons and borders

### 3. CSS Animation Added
**File:** `src/index.css`

Added:
- ✅ @keyframes slide-in animation
- ✅ .animate-slide-in utility class

---

## 🚧 NEXT STEPS (Resume from here)

### Step 1: Add localStorage State Management to TaskMonitoring
**Goal:** Replace static mockTasks with stateful tasks + localStorage persistence

**Changes needed in `TaskMonitoring.tsx`:**

```typescript
// Add at top of component
const [tasks, setTasks] = useState<Task[]>(() => {
  const storageKey = `tasks_${selectedDate}_${currentStore?.id || 'all'}`;
  const saved = localStorage.getItem(storageKey);

  if (saved) {
    return JSON.parse(saved);
  } else {
    // Initialize from mockTasks
    return filteredTasks.map(task => {
      const staff = storeStaff.find(s => s.id === task.staffId);
      return {
        ...task,
        assignee: staff?.name || 'Unassigned',
        avatar: staff?.avatar || '',
        // ... other enrichments
      };
    });
  }
});

// Save to localStorage whenever tasks change
useEffect(() => {
  const storageKey = `tasks_${selectedDate}_${currentStore?.id || 'all'}`;
  localStorage.setItem(storageKey, JSON.stringify(tasks));
}, [tasks, selectedDate, currentStore]);

// Reload tasks when date/store changes
useEffect(() => {
  const storageKey = `tasks_${selectedDate}_${currentStore?.id || 'all'}`;
  const saved = localStorage.getItem(storageKey);

  if (saved) {
    setTasks(JSON.parse(saved));
  } else {
    // Load fresh from mockTasks
    const freshTasks = filteredTasks.map(/* ... */);
    setTasks(freshTasks);
  }
}, [selectedDate, currentStore]);

// Helper functions
const updateTask = (taskId: string, updates: Partial<Task>) => {
  setTasks(prevTasks =>
    prevTasks.map(task =>
      task.id === taskId ? { ...task, ...updates } : task
    )
  );
};

const reassignTask = (taskId: string, newStaffId: string) => {
  updateTask(taskId, { staffId: newStaffId });
  showToast('success', 'Task reassigned successfully');
};
```

---

### Step 2: Add Toast State Management

```typescript
const [toasts, setToasts] = useState<Array<{ id: string; type: ToastType; message: string }>>([]);

const showToast = (type: ToastType, message: string) => {
  const id = Date.now().toString();
  setToasts(prev => [...prev, { id, type, message }]);
};

const removeToast = (id: string) => {
  setToasts(prev => prev.filter(t => t.id !== id));
};

// In JSX:
<ToastContainer toasts={toasts} onRemove={removeToast} />
```

---

### Step 3: Wrap Timeline in DndContext

```typescript
import { DndContext, DragOverlay, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';

const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

const sensors = useSensors(
  useSensor(PointerSensor, {
    activationConstraint: {
      distance: 5, // 5px movement to activate
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

  const taskId = active.id as string;
  const targetStaffId = over.id as string;

  reassignTask(taskId, targetStaffId);
  setActiveTaskId(null);
};

// Wrap timeline view:
{viewMode === 'timeline' && (
  <DndContext
    sensors={sensors}
    collisionDetection={closestCenter}
    onDragStart={handleDragStart}
    onDragEnd={handleDragEnd}
  >
    <div className="flex-1 overflow-auto bg-white">
      {/* ... existing timeline table */}
    </div>

    <DragOverlay>
      {activeTaskId ? (
        <TaskCardPreview task={tasks.find(t => t.id === activeTaskId)} />
      ) : null}
    </DragOverlay>
  </DndContext>
)}
```

---

### Step 4: Make Task Cards Draggable

**Create new component `DraggableTaskCard.tsx`:**

```typescript
import { useDraggable } from '@dnd-kit/core';

interface DraggableTaskCardProps {
  task: Task;
  style: React.CSSProperties;
  getStatusColor: (status: string) => string;
  getTypeDotColor: (type: string) => string;
}

export function DraggableTaskCard({ task, style, getStatusColor, getTypeDotColor }: DraggableTaskCardProps) {
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
      className={`absolute rounded-lg border-2 p-2 transition-all hover:shadow-lg ${getStatusColor(task.status)}`}
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

**Replace task rendering in TaskMonitoring.tsx (Line 583-600):**

```typescript
// Before:
<div className={`absolute rounded-lg border-2 p-2 cursor-pointer...`}>

// After:
<DraggableTaskCard
  task={task}
  style={{ left: `${left}px`, width: `${width}px`, top: `${taskTop}px`, height: `${taskHeight}px` }}
  getStatusColor={getStatusColor}
  getTypeDotColor={getTypeDotColor}
/>
```

---

### Step 5: Make Staff Rows Droppable

**Create new component `DroppableStaffRow.tsx`:**

```typescript
import { useDroppable } from '@dnd-kit/core';

interface DroppableStaffRowProps {
  staffId: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export function DroppableStaffRow({ staffId, children, style }: DroppableStaffRowProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: staffId,
    data: {
      staffId,
      type: 'staff-row',
    },
  });

  return (
    <td
      ref={setNodeRef}
      className={`relative p-0 transition-all ${
        isOver ? 'bg-blue-50 ring-2 ring-blue-400 ring-inset' : ''
      }`}
      style={style || { height: '100px' }}
    >
      {children}
    </td>
  );
}
```

**Replace staff row `<td>` in TaskMonitoring.tsx (Line 490):**

```typescript
// Before:
<td className="relative p-0" style={{ height: '100px' }}>

// After:
<DroppableStaffRow staffId={staff.id} style={{ height: '100px' }}>
  {/* ... existing content */}
</DroppableStaffRow>
```

---

### Step 6: Implement Task Reassignment with Conflict Detection

**Add helper functions to TaskMonitoring.tsx:**

```typescript
// Convert time string to minutes since midnight
const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

// Convert minutes to time string
const minutesToTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
};

// Find next available time slot
const findNextAvailableSlot = (existingTasks: Task[], duration: number): { start: number; end: number } | null => {
  const slots = existingTasks
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
};

// Reassign task with conflict detection
const reassignTask = (taskId: string, targetStaffId: string) => {
  const task = tasks.find(t => t.id === taskId);
  if (!task || task.staffId === targetStaffId) return;

  // Get target staff's existing tasks
  const targetStaffTasks = tasks.filter(t => t.staffId === targetStaffId && t.id !== taskId);

  // Calculate task duration
  const taskStart = timeToMinutes(task.startTime);
  const taskEnd = timeToMinutes(task.endTime);
  const duration = taskEnd - taskStart;

  // Check for conflicts
  const hasConflict = targetStaffTasks.some(t => {
    const tStart = timeToMinutes(t.startTime);
    const tEnd = timeToMinutes(t.endTime);
    return (taskStart < tEnd && taskEnd > tStart);
  });

  if (hasConflict) {
    // Find next available slot
    const newSlot = findNextAvailableSlot(targetStaffTasks, duration);

    if (newSlot) {
      // Auto-adjust time
      const staffName = storeStaff.find(s => s.id === targetStaffId)?.name || 'staff';
      updateTask(taskId, {
        staffId: targetStaffId,
        startTime: minutesToTime(newSlot.start),
        endTime: minutesToTime(newSlot.end),
      });
      showToast('warning', `Task reassigned to ${staffName} with adjusted time: ${minutesToTime(newSlot.start)} - ${minutesToTime(newSlot.end)}`);
    } else {
      showToast('error', 'No available time slot found for this task');
    }
  } else {
    // No conflict, direct reassignment
    const staffName = storeStaff.find(s => s.id === targetStaffId)?.name || 'staff';
    updateTask(taskId, { staffId: targetStaffId });
    showToast('success', `Task reassigned to ${staffName}`);
  }
};
```

---

### Step 7: Add Reset to Original Button

**Add to header section:**

```typescript
<div className="flex gap-3">
  <button
    onClick={resetTasks}
    className="px-4 py-2 border border-gray-200 rounded-md hover:bg-gray-50 flex items-center gap-2"
  >
    <RefreshCw className="w-4 h-4" />
    Reset to Original
  </button>
  <button className="px-4 py-2 border border-gray-200 rounded-md hover:bg-gray-50 flex items-center gap-2">
    <Download className="w-4 h-4" />
    Export
  </button>
</div>

// Add function:
const resetTasks = () => {
  const storageKey = `tasks_${selectedDate}_${currentStore?.id || 'all'}`;
  localStorage.removeItem(storageKey);

  // Reload from mockTasks
  const freshTasks = filteredTasks.map(/* ... */);
  setTasks(freshTasks);

  showToast('info', 'Tasks reset to original state');
};
```

---

## 📝 TESTING CHECKLIST

Once implementation is complete:

- [ ] Drag task from Staff A to Staff B → Task reassigned
- [ ] Drag to staff with conflict → Time auto-adjusted + warning toast
- [ ] Page refresh → Changes persist
- [ ] Switch date → Fresh data loaded
- [ ] Reset button → Original tasks restored
- [ ] Toast appears and auto-dismisses
- [ ] Drag overlay (ghost) shows during drag
- [ ] Drop zone highlights when hovering
- [ ] Invalid drop (outside timeline) → Snaps back

---

## 🎯 ESTIMATED TIME REMAINING

- ✅ Step 1 (localStorage): 30 mins
- ✅ Step 2 (Toast state): 10 mins
- ✅ Step 3 (DndContext): 20 mins
- ✅ Step 4 (Draggable cards): 30 mins
- ✅ Step 5 (Droppable rows): 20 mins
- ✅ Step 6 (Reassignment logic): 45 mins
- ✅ Step 7 (Reset button): 10 mins
- ✅ Testing & Polish: 30 mins

**Total:** ~3 hours remaining

---

## 📦 FILES TO CREATE/MODIFY

**New Files:**
- [x] `src/components/Toast.tsx` (DONE)
- [ ] `src/components/DraggableTaskCard.tsx`
- [ ] `src/components/DroppableStaffRow.tsx`

**Modified Files:**
- [x] `src/index.css` (DONE - added animation)
- [ ] `src/pages/TaskMonitoring.tsx` (Major changes needed)

---

**Ready to continue?** Let me know and I'll proceed with the implementation!
