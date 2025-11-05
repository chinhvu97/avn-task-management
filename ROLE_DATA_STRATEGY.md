# Role-Based Data Strategy

**Date:** November 5, 2025
**Question:** How do we show different data for different roles?

---

## 🎯 THE STRATEGY

### **Option 1: Filter Existing Data** ⭐ RECOMMENDED
**Approach:** Use existing mock data, filter it based on role

**How It Works:**
```typescript
// We have ALL data available
const allStaff = [27 staff members from shared-data];
const allTasks = [440 tasks across 4 stores];
const allStores = [4 stores from shared-data];

// Filter based on role
const visibleStaff = useMemo(() => {
  // HQ sees all
  if (profile.role === 'hq') return allStaff;

  // Store Manager sees only their store's staff
  if (profile.role === 'store-manager') {
    return allStaff.filter(s => s.storeId === profile.stores[0].id);
  }

  // SI/AM see staff from their assigned stores
  const storeIds = profile.stores.map(s => s.id);
  return allStaff.filter(s => storeIds.includes(s.storeId));
}, [profile]);
```

**Pros:**
- ✅ No new mock data needed
- ✅ Uses existing 27 staff from shared-data
- ✅ Simple filtering logic
- ✅ Fast to implement
- ✅ Consistent data across roles

**Cons:**
- ⚠️ All 27 staff must be assigned to stores in shared-data
- ⚠️ Need to ensure 4 stores have staff distributed

---

### **Option 2: Create Role-Specific Mock Data** ❌ NOT RECOMMENDED
**Approach:** Create separate data sets for each role

**How It Would Work:**
```typescript
const hqMockData = {
  staff: [27 staff],
  tasks: [440 tasks],
  stores: [4 stores],
};

const storeManagerMockData = {
  staff: [8 staff], // Subset
  tasks: [110 tasks],
  stores: [1 store],
};
```

**Pros:**
- Very explicit

**Cons:**
- ❌ Duplicate data maintenance
- ❌ Data can get out of sync
- ❌ More complex
- ❌ Harder to test
- ❌ Takes longer to implement

---

## ✅ RECOMMENDED APPROACH: FILTER EXISTING DATA

### Current Data Structure (shared-data)

**What We Already Have:**
```typescript
// From shared-data/src/master/stores.ts
export const stores = [
  { id: '1', name: 'AEON MAXVALU OCEAN PARK HAWAII BUILDING', location: 'Hanoi' },
  { id: '2', name: 'AEON MAXVALU SKY OASIS', location: 'Hanoi' },
  { id: '3', name: 'AEON MAXVALU ECOPARK RỪNG CỌ', location: 'Hung Yen' },
  { id: '4', name: 'AEON MAXVALU ECOPARK', location: 'Hung Yen' },
  // ... more stores
];

// From shared-data/src/master/staff.ts
export const staff = [
  { id: '1', name: 'Sarah Johnson', role: 'Store Manager', building: 'AEON MAXVALU OCEAN PARK HAWAII BUILDING' },
  { id: '2', name: 'Mike Chen', role: 'Floor Manager', building: 'AEON MAXVALU OCEAN PARK HAWAII BUILDING' },
  // ... 27 total staff
];

// Helper function that already exists
export function getStaffByBuilding(buildingName: string) {
  return staff.filter(s => s.building === buildingName);
}
```

**What We Need to Check:**
- ✅ Are all 27 staff assigned to specific stores? (YES - checked code)
- ✅ Do we have staff in all 4 stores? (NEED TO VERIFY)
- ✅ Can we use `getStaffByBuilding()` helper? (YES - already exists!)

---

## 📊 DATA DISTRIBUTION ACROSS ROLES

### Role Configuration (RoleContext)
```typescript
const roleConfigs = {
  'hq': {
    stores: allStores, // All 4 stores
  },
  'store-manager': {
    stores: [allStores[0]], // Only Store #01 (Ocean Park Hawaii)
  },
  'si': {
    stores: [allStores[0], allStores[1], allStores[6]], // 3 stores
  },
  'am': {
    stores: [allStores[2], allStores[3], allStores[5], allStores[7]], // 4 stores (South region)
  },
};
```

### Data Each Role Sees

#### **1. HQ Manager**
```typescript
Stores: All 4 stores
Staff: All 27 staff members

// Implementation
const visibleStores = profile.stores; // [Store1, Store2, Store3, Store4]

const visibleStaff = useMemo(() => {
  return profile.stores.flatMap(store =>
    getStaffByBuilding(store.name)
  );
}, [profile]);

// Result: 27 staff
```

#### **2. Store Manager**
```typescript
Stores: 1 store (Ocean Park Hawaii)
Staff: 8 staff members (only from their store)

// Implementation
const visibleStores = profile.stores; // [Store1]

const visibleStaff = useMemo(() => {
  const currentStore = profile.stores[0];
  return getStaffByBuilding(currentStore.name);
}, [profile]);

// Result: 8 staff from Ocean Park Hawaii
```

#### **3. SI (Store Inspection)**
```typescript
Stores: 3 stores (Ocean Park Hawaii, Sky Oasis, Store #6)
Staff: ~18-24 staff (from their 3 stores)

// Implementation
const visibleStores = profile.stores; // [Store1, Store2, Store6]

const visibleStaff = useMemo(() => {
  return profile.stores.flatMap(store =>
    getStaffByBuilding(store.name)
  );
}, [profile]);

// Result: 18-24 staff (depends on distribution)
```

#### **4. AM (Area Manager)**
```typescript
Stores: 4 stores (South region)
Staff: ~20-27 staff (from their 4 stores)

// Implementation
const visibleStores = profile.stores; // [Store3, Store4, Store5, Store8]

const visibleStaff = useMemo(() => {
  return profile.stores.flatMap(store =>
    getStaffByBuilding(store.name)
  );
}, [profile]);

// Result: 20-27 staff (depends on distribution)
```

---

## 🔧 IMPLEMENTATION EXAMPLES

### Example 1: Dashboard Stats

**Current (shows all data):**
```typescript
const stats = [
  { name: 'Active Tasks', value: '847', ... },
  { name: 'Staff On Duty', value: '156', ... },
];
```

**Updated (role-based):**
```typescript
import { useRole, getCurrentStore } from '../contexts/RoleContext';
import { getStaffByBuilding } from 'shared-data';

const { profile } = useRole();
const currentStore = getCurrentStore(profile);

const stats = useMemo(() => {
  // Get staff from user's stores
  const myStaff = profile.stores.flatMap(store =>
    getStaffByBuilding(store.name)
  );

  // Calculate tasks (110 per store)
  const totalTasks = 110 * profile.stores.length;

  return [
    {
      name: 'Active Tasks',
      value: totalTasks.toString(),
      change: '+12.5%',
      trend: 'up',
      icon: CheckCircle,
      color: 'bg-blue-500',
    },
    {
      name: 'Staff On Duty',
      value: myStaff.length.toString(),
      change: '-2.3%',
      trend: 'down',
      icon: Users,
      color: 'bg-green-500',
    },
    // ... other stats
  ];
}, [profile]);
```

**Result:**
- HQ sees: 440 tasks, 27 staff
- Store Manager sees: 110 tasks, 8 staff
- SI sees: 330 tasks, ~20 staff
- AM sees: 440 tasks, ~25 staff

---

### Example 2: Staff List

**Current (shows all 27 staff):**
```typescript
const mockStaff = [
  { id: '1', name: 'Sarah Johnson', ... },
  { id: '2', name: 'Mike Chen', ... },
  // ... all 27
];

return (
  <div>
    {mockStaff.map(staff => <StaffCard key={staff.id} staff={staff} />)}
  </div>
);
```

**Updated (role-based filtering):**
```typescript
import { useRole } from '../contexts/RoleContext';
import { getStaffByBuilding } from 'shared-data';

const { profile } = useRole();

// Get staff from shared-data based on user's stores
const visibleStaff = useMemo(() => {
  return profile.stores.flatMap(store => {
    const storeStaff = getStaffByBuilding(store.name);

    // Add store info to each staff member
    return storeStaff.map(s => ({
      ...s,
      storeName: store.name,
      storeId: store.id,
    }));
  });
}, [profile]);

return (
  <div>
    <p className="text-sm text-gray-600 mb-4">
      Showing {visibleStaff.length} staff members
      {profile.role !== 'store-manager' && ` across ${profile.stores.length} stores`}
    </p>

    {visibleStaff.map(staff => (
      <StaffCard key={staff.id} staff={staff} />
    ))}
  </div>
);
```

**Result:**
- HQ sees: All 27 staff
- Store Manager sees: 8 staff from their store
- SI sees: Staff from their 3 stores
- AM sees: Staff from their 4 stores

---

### Example 3: Task List

**Current (hardcoded tasks):**
```typescript
const mockTasks = [
  { id: 1, title: 'Task 1', store: 'Store #01', staffId: '1' },
  { id: 2, title: 'Task 2', store: 'Store #02', staffId: '5' },
  // ... many tasks
];
```

**Updated (role-based filtering):**
```typescript
import { useRole } from '../contexts/RoleContext';
import { getStaffByBuilding } from 'shared-data';

const { profile } = useRole();

// Get staff IDs from user's stores
const myStaffIds = useMemo(() => {
  return profile.stores.flatMap(store =>
    getStaffByBuilding(store.name).map(s => s.id)
  );
}, [profile]);

// Filter tasks to show only tasks assigned to user's staff
const visibleTasks = useMemo(() => {
  return mockTasks.filter(task =>
    myStaffIds.includes(task.staffId)
  );
}, [mockTasks, myStaffIds]);

return (
  <div>
    <p className="text-sm text-gray-600 mb-4">
      {visibleTasks.length} tasks
      {profile.role === 'hq' && ' (system-wide)'}
      {profile.role === 'store-manager' && ` at ${profile.stores[0].name}`}
      {(profile.role === 'si' || profile.role === 'am') &&
        ` across ${profile.stores.length} stores`}
    </p>

    {visibleTasks.map(task => (
      <TaskCard key={task.id} task={task} />
    ))}
  </div>
);
```

---

## ⚠️ WHAT WE NEED TO VERIFY

Before implementing, let's check the shared-data:

### Check 1: Staff Distribution
```bash
# Count staff per store
Store #01 (Ocean Park Hawaii): ? staff
Store #02 (Sky Oasis): ? staff
Store #03 (Ecopark Rừng Cọ): ? staff
Store #04 (Ecopark): ? staff
```

**Action Needed:**
1. Read `shared-data/src/master/staff.ts`
2. Count staff per store
3. If uneven, we're OK (realistic)
4. If some stores have 0 staff, add mock staff

---

### Check 2: Task Assignment
**Current:** Tasks are probably not assigned to specific staff yet

**Solution:** Generate tasks dynamically
```typescript
// Generate 110 DWS tasks per store
function generateTasksForStore(store: Store, staff: Staff[]) {
  const dwsTasks = dwsTemplates.slice(0, 110).map((template, index) => ({
    id: `${store.id}-task-${index}`,
    title: template.title,
    staffId: staff[index % staff.length].id, // Round-robin assignment
    storeId: store.id,
    storeName: store.name,
    type: 'DWS',
    status: ['Open', 'Processing', 'Done'][Math.floor(Math.random() * 3)],
    date: new Date().toISOString().split('T')[0],
  }));

  return dwsTasks;
}

// Generate tasks for all stores
const allTasks = allStores.flatMap(store => {
  const storeStaff = getStaffByBuilding(store.name);
  return generateTasksForStore(store, storeStaff);
});
```

---

## 📝 IMPLEMENTATION CHECKLIST

### Before We Start
- [ ] Verify staff distribution in shared-data
- [ ] Confirm all 4 stores have staff assigned
- [ ] Understand store IDs and names

### During Implementation
- [ ] Create helper hook: `useRoleBasedData()`
- [ ] Use `useMemo` for all filtered data
- [ ] Always filter by `profile.stores`
- [ ] Test with all 4 roles

### After Implementation
- [ ] Verify HQ sees 27 staff
- [ ] Verify Store Manager sees 8 staff
- [ ] Verify SI sees correct stores' staff
- [ ] Verify AM sees correct stores' staff

---

## 🎯 REUSABLE HOOK: `useRoleBasedData`

**Create:** `src/hooks/useRoleBasedData.ts`

```typescript
import { useMemo } from 'react';
import { useRole } from '../contexts/RoleContext';
import { getStaffByBuilding } from 'shared-data';

export function useRoleBasedData() {
  const { profile } = useRole();

  // Get all staff from user's stores
  const visibleStaff = useMemo(() => {
    return profile.stores.flatMap(store => {
      const storeStaff = getStaffByBuilding(store.name);
      return storeStaff.map(s => ({
        ...s,
        storeId: store.id,
        storeName: store.name,
      }));
    });
  }, [profile]);

  // Get staff IDs for task filtering
  const visibleStaffIds = useMemo(() => {
    return visibleStaff.map(s => s.id);
  }, [visibleStaff]);

  // Calculate aggregate stats
  const stats = useMemo(() => {
    const totalStores = profile.stores.length;
    const totalStaff = visibleStaff.length;
    const totalTasks = 110 * totalStores; // 110 DWS tasks per store

    return {
      totalStores,
      totalStaff,
      totalTasks,
      avgTasksPerStaff: Math.round(totalTasks / totalStaff),
    };
  }, [profile, visibleStaff]);

  return {
    visibleStores: profile.stores,
    visibleStaff,
    visibleStaffIds,
    stats,
  };
}
```

**Usage in Components:**
```typescript
import { useRoleBasedData } from '../hooks/useRoleBasedData';

function Dashboard() {
  const { visibleStores, visibleStaff, stats } = useRoleBasedData();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>{stats.totalStores} stores</p>
      <p>{stats.totalStaff} staff members</p>
      <p>{stats.totalTasks} total tasks</p>

      {visibleStaff.map(staff => (
        <StaffCard key={staff.id} staff={staff} />
      ))}
    </div>
  );
}
```

---

## 💡 DEMO DATA EXAMPLES

### HQ Manager View
```
Stores: 4 stores
Staff: 27 staff members
Tasks: 440 tasks (110 × 4)
Access: Can switch between all stores
```

### Store Manager View
```
Store: AEON MAXVALU Ocean Park Hawaii
Staff: 8 staff members
  - Sarah Johnson (Store Manager)
  - Mike Chen (Floor Manager)
  - ... 6 more
Tasks: 110 tasks (all at this store)
Access: Cannot switch stores
```

### SI View
```
Stores: 3 stores
  - AEON MAXVALU Ocean Park Hawaii
  - AEON MAXVALU Sky Oasis
  - Store #6
Staff: ~18-24 staff (from these 3 stores)
Tasks: 330 tasks (110 × 3)
Access: Can switch between assigned stores
```

### AM View
```
Stores: 4 stores (South region)
  - Store #3 (Ecopark Rừng Cọ)
  - Store #4 (Ecopark)
  - Store #5
  - Store #8
Staff: ~20-27 staff (from these 4 stores)
Tasks: 440 tasks (110 × 4)
Access: Can switch between region stores
```

---

## ✅ SUMMARY: THE ANSWER

**Q: Are you gonna mock data so that different roles see different data?**

**A: NO - We'll use EXISTING data from shared-data and FILTER it!**

### The Approach:
1. ✅ Use existing 27 staff from `shared-data/src/master/staff.ts`
2. ✅ Use existing 4 stores from `shared-data/src/master/stores.ts`
3. ✅ Use existing helper `getStaffByBuilding(storeName)`
4. ✅ Filter based on `profile.stores` (which stores user has access to)
5. ✅ Create `useRoleBasedData()` hook for reusable filtering logic

### No New Mock Data Needed:
- ❌ Don't create separate data files
- ❌ Don't duplicate staff lists
- ❌ Don't hardcode role-specific data
- ✅ Just filter existing data based on role

### Benefits:
- ✅ Single source of truth (shared-data)
- ✅ Consistent data across roles
- ✅ Easy to maintain
- ✅ Fast to implement
- ✅ Realistic (same staff, different views)

---

## 🚀 READY TO PROCEED?

**Next Steps:**
1. I'll verify staff distribution in shared-data
2. Create `useRoleBasedData()` hook
3. Start implementing role-based filtering on pages

**Should I check the current staff distribution first, then start implementing?**
