# Drag & Drop Data Persistence Strategy

**Date:** November 5, 2025
**Question:** After drag & drop, where does the updated data go?

---

## 🔍 CURRENT DATA FLOW

### **1. Data Source (Read-Only)**
```
shared-data/src/mockTasks.ts
  ↓
  generateMonthTasks() → Creates mock Task[] array
  ↓
  exported as `mockTasks`
```

**Current State:**
- `mockTasks` is a **static read-only array** imported from shared-data package
- Generated once on app load
- Contains tasks for the entire month
- Used by both HQ app and Staff app

### **2. Component Data Flow (TaskMonitoring.tsx)**
```typescript
// Line 34-36: Read from shared-data
const filteredTasks = mockTasks.filter(task =>
  task.date === selectedDate && storeStaffIds.includes(task.staffId)
);

// Line 39-63: Transform for display
const tasks = filteredTasks.map(task => {
  const staff = storeStaff.find(s => s.id === task.staffId);
  return {
    ...task,
    assignee: staff?.name,
    avatar: staff?.avatar,
    // ... other enrichments
  };
});
```

**Problem:**
- Tasks are derived from `mockTasks` on every render
- No state management for task updates
- Changes would be lost on refresh/re-render

---

## 🎯 PROPOSED SOLUTION: LOCAL STATE + LOCALSTORAGE

### **Approach 1: Component State + localStorage** (RECOMMENDED)

This keeps changes in the browser and persists across page refreshes.

#### **Implementation:**

```typescript
import { useState, useEffect } from 'react';

export default function TaskMonitoring() {
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);

  // Initialize tasks from localStorage or mockTasks
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storageKey = `tasks_${selectedDate}`;
    const savedTasks = localStorage.getItem(storageKey);

    if (savedTasks) {
      // Use saved tasks if available
      return JSON.parse(savedTasks);
    } else {
      // Initialize from mockTasks (shared-data)
      return mockTasks.filter(task =>
        task.date === selectedDate && storeStaffIds.includes(task.staffId)
      ).map(task => {
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
    const storageKey = `tasks_${selectedDate}`;
    localStorage.setItem(storageKey, JSON.stringify(tasks));
  }, [tasks, selectedDate]);

  // Load tasks when date changes
  useEffect(() => {
    const storageKey = `tasks_${selectedDate}`;
    const savedTasks = localStorage.getItem(storageKey);

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      // Load fresh from mockTasks
      const freshTasks = mockTasks.filter(task =>
        task.date === selectedDate && storeStaffIds.includes(task.staffId)
      ).map(task => {
        // ... enrich tasks
      });
      setTasks(freshTasks);
    }
  }, [selectedDate, currentStore]);

  // Update functions for drag & drop
  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { ...task, ...updates }
          : task
      )
    );
  };

  const reassignTask = (taskId: string, newStaffId: string) => {
    updateTask(taskId, { staffId: newStaffId });
    showNotification('success', 'Task reassigned successfully');
  };

  const updateTaskTime = (taskId: string, startTime: string, endTime: string) => {
    updateTask(taskId, { startTime, endTime });
    showNotification('success', 'Task time updated');
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {/* ... UI */}
    </DndContext>
  );
}
```

---

### **Data Flow After Drag & Drop:**

```
User drags task from Staff A to Staff B
  ↓
handleDragEnd() triggered
  ↓
reassignTask(taskId, newStaffId)
  ↓
setTasks() → Updates React state
  ↓
useEffect() → Saves to localStorage
  ↓
UI re-renders with new task assignment
  ↓
Data persists across page refresh
```

---

## 📦 STORAGE STRUCTURE

### **localStorage Keys:**

```typescript
// Per-date storage
localStorage.setItem('tasks_2025-11-05', JSON.stringify(tasks));
localStorage.setItem('tasks_2025-11-06', JSON.stringify(tasks));
// ... etc

// Example stored data:
{
  "tasks_2025-11-05": [
    {
      "id": "task-001",
      "title": "Morning Inventory",
      "staffId": "staff-002", // Changed via drag & drop
      "startTime": "08:30", // Changed via resize
      "endTime": "09:30",
      "status": "Processing",
      "type": "DWS",
      "date": "2025-11-05",
      // ... other fields
    },
    // ... more tasks
  ]
}
```

### **Benefits:**
✅ **Persists across page refresh** - Data saved in browser
✅ **No backend needed** - Pure frontend solution (prototype-friendly)
✅ **Per-date isolation** - Each day has separate storage
✅ **Falls back to mockTasks** - If no saved data, loads fresh from shared-data
✅ **Fast performance** - No network calls

### **Limitations:**
⚠️ **Browser-specific** - Data not synced across devices/browsers
⚠️ **Storage limit** - localStorage has ~5-10MB limit (sufficient for this use case)
⚠️ **No multi-user sync** - Changes only visible to current user
⚠️ **Can be cleared** - User clearing browser data loses changes

---

## 🔄 ALTERNATIVE APPROACHES

### **Approach 2: Context API (Global State)**

For sharing task changes across multiple pages:

```typescript
// src/contexts/TaskContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';

interface TaskContextType {
  tasks: Task[];
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  reassignTask: (taskId: string, newStaffId: string) => void;
  updateTaskTime: (taskId: string, startTime: string, endTime: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('all_tasks');
    return saved ? JSON.parse(saved) : mockTasks;
  });

  useEffect(() => {
    localStorage.setItem('all_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, ...updates } : t));
  };

  const reassignTask = (taskId: string, newStaffId: string) => {
    updateTask(taskId, { staffId: newStaffId });
  };

  const updateTaskTime = (taskId: string, startTime: string, endTime: string) => {
    updateTask(taskId, { startTime, endTime });
  };

  return (
    <TaskContext.Provider value={{ tasks, updateTask, reassignTask, updateTaskTime }}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTasks must be used within TaskProvider');
  return context;
};
```

**Usage in TaskMonitoring:**
```typescript
import { useTasks } from '../contexts/TaskContext';

export default function TaskMonitoring() {
  const { tasks, reassignTask, updateTaskTime } = useTasks();

  // Filter for current date/store
  const visibleTasks = tasks.filter(task =>
    task.date === selectedDate && storeStaffIds.includes(task.staffId)
  );

  return (
    <DndContext onDragEnd={(e) => {
      const taskId = e.active.id;
      const newStaffId = e.over.id;
      reassignTask(taskId, newStaffId);
    }}>
      {/* ... */}
    </DndContext>
  );
}
```

**Benefits:**
✅ Shared across all pages (Dashboard, TaskMonitoring, AITaskAssignment)
✅ Single source of truth
✅ Still persists via localStorage

**Drawbacks:**
⚠️ More complex setup
⚠️ All tasks loaded at once (memory usage)

---

### **Approach 3: IndexedDB (Advanced)**

For larger datasets or offline-first apps:

```typescript
import { openDB } from 'idb';

const dbPromise = openDB('TaskDB', 1, {
  upgrade(db) {
    db.createObjectStore('tasks', { keyPath: 'id' });
  },
});

export async function saveTasks(tasks: Task[]) {
  const db = await dbPromise;
  const tx = db.transaction('tasks', 'readwrite');
  await Promise.all(tasks.map(task => tx.store.put(task)));
  await tx.done;
}

export async function getTasks(date: string): Promise<Task[]> {
  const db = await dbPromise;
  const allTasks = await db.getAll('tasks');
  return allTasks.filter(task => task.date === date);
}
```

**Benefits:**
✅ Larger storage capacity (50MB+)
✅ Better performance for large datasets
✅ Structured queries

**Drawbacks:**
⚠️ More complex API
⚠️ Async operations
⚠️ Overkill for this prototype

---

## 🎯 RECOMMENDED SOLUTION FOR THIS PROJECT

### **Use Approach 1: Component State + localStorage**

**Why?**
1. **Simple to implement** - Minimal code changes
2. **Prototype-friendly** - No backend needed
3. **Sufficient for demo** - Works great for showcasing drag & drop
4. **Easy to understand** - Clear data flow
5. **Fast development** - Can implement in Day 1

**When to upgrade to Context API:**
- If Dashboard needs to reflect task changes
- If multiple pages need to update tasks
- If you want undo/redo across pages

**When to upgrade to Backend:**
- For production deployment
- Multi-user collaboration needed
- Data needs to sync across devices
- Real-time updates required

---

## 🔄 RESET & REFRESH STRATEGY

### **1. Reset to Original Data (Fresh Start)**

Add a "Reset Tasks" button:

```typescript
const resetTasks = () => {
  const storageKey = `tasks_${selectedDate}`;
  localStorage.removeItem(storageKey);

  // Reload from mockTasks
  const freshTasks = mockTasks.filter(/* ... */);
  setTasks(freshTasks);

  showNotification('info', 'Tasks reset to original state');
};

// In UI:
<button onClick={resetTasks} className="...">
  <RefreshCw className="w-4 h-4" />
  Reset to Original
</button>
```

---

### **2. Clear All Saved Data**

```typescript
const clearAllSavedTasks = () => {
  Object.keys(localStorage)
    .filter(key => key.startsWith('tasks_'))
    .forEach(key => localStorage.removeItem(key));

  showNotification('info', 'All saved tasks cleared');
  window.location.reload();
};
```

---

## 📊 DATA SYNC WITH STAFF APP

Since both HQ and Staff apps use `shared-data/mockTasks`, here's how they interact:

### **Current State (After Drag & Drop Implementation):**

```
HQ App (TaskMonitoring)
  - Reads: mockTasks (initial load)
  - Writes: localStorage (task_2025-11-05)
  - Updates: Only in HQ app's browser

Staff App (Task List)
  - Reads: mockTasks (initial load)
  - Shows: Original task assignments
  - Does NOT see: Changes made in HQ app
```

### **Future Enhancement: Shared Backend**

```
HQ App → API → Database ← API ← Staff App
  ↓                                    ↓
  Updates task                      Sees update
  assignment                        in real-time
```

**For Production:**
```typescript
// Instead of:
setTasks([...updated]);
localStorage.setItem('tasks', JSON.stringify(tasks));

// Use:
const response = await fetch('/api/tasks/${taskId}', {
  method: 'PATCH',
  body: JSON.stringify({ staffId: newStaffId }),
});

if (response.ok) {
  setTasks([...updated]); // Update local state
  // WebSocket would notify Staff app
}
```

---

## 🎬 DEMO SCENARIO WITH PERSISTENCE

### **Day 1: November 5, 2025**

1. Manager opens Task Monitoring
2. Sees tasks loaded from `mockTasks` (fresh data)
3. Drags "Morning Inventory" from Sarah to Mike
4. Task saved to `localStorage['tasks_2025-11-05']`
5. Page refreshed → Task still assigned to Mike ✅

### **Day 2: November 6, 2025**

6. Manager selects November 6 in date picker
7. No saved data for Nov 6 → Loads fresh from `mockTasks`
8. Makes new changes → Saved to `localStorage['tasks_2025-11-06']`

### **Switching Stores:**

9. Manager switches from "Ocean Park" to "Sky Oasis"
10. Different staff displayed → Different tasks loaded
11. Each store has separate localStorage keys (if needed)

---

## 💡 IMPLEMENTATION CHECKLIST

### **Day 1: Basic Persistence**
- [ ] Add `useState` for tasks in TaskMonitoring
- [ ] Initialize from localStorage or mockTasks
- [ ] Add `useEffect` to save on changes
- [ ] Implement `updateTask()` helper
- [ ] Test drag & drop → refresh → data persists

### **Day 2: Enhanced Features**
- [ ] Add "Reset to Original" button
- [ ] Add timestamp to track last modified
- [ ] Add visual indicator: "✏️ Edited" badge on modified tasks
- [ ] Add undo/redo using history array

### **Day 3: Polish**
- [ ] Add loading state when reading localStorage
- [ ] Handle localStorage quota errors gracefully
- [ ] Add export/import functionality (download as JSON)
- [ ] Test cross-browser compatibility

---

## ❓ QUESTIONS FOR YOU

1. **Storage preference:**
   - [ ] localStorage (simple, browser-only)
   - [ ] Context API + localStorage (shared across pages)
   - [ ] IndexedDB (advanced, larger capacity)

2. **Reset functionality:**
   - [ ] Yes, add "Reset to Original" button
   - [ ] No, changes should be permanent until manually reverted

3. **Visual indicators:**
   - [ ] Show "✏️ Edited" badge on modified tasks
   - [ ] Show last modified timestamp
   - [ ] No indicators needed

4. **Export/Import:**
   - [ ] Add "Export Tasks" (download JSON)
   - [ ] Add "Import Tasks" (upload JSON)
   - [ ] Not needed for now

5. **Future backend integration:**
   - [ ] Design with backend in mind (easy migration later)
   - [ ] Pure frontend for now (don't worry about backend)

---

## 🚀 READY TO IMPLEMENT

**Recommended Stack:**
- ✅ Component State (useState)
- ✅ localStorage for persistence
- ✅ Per-date storage keys
- ✅ Reset button for demo purposes
- ✅ Fallback to mockTasks

This gives you a working prototype with data persistence, easy to demo, and easy to upgrade to a real backend later!

Let me know if you want me to proceed with this approach! 💪
