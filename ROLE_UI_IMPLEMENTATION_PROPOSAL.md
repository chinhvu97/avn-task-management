# Role-Based UI Implementation Proposal

**Date:** November 5, 2025
**Duration:** 3 days
**Approach:** Visual indicators + Smart data filtering

---

## 🎯 OVERVIEW

We'll implement role-based UI differences across 8 key pages to demonstrate hierarchy and access control. The approach balances visual impact with manageable implementation time.

### The 4 Roles

| Role | Access | Stores | Staff | Color Theme |
|------|--------|--------|-------|-------------|
| **HQ Manager** | System-wide | All 4 stores | All 27 staff | 🔵 Blue |
| **Store Manager** | Single store | 1 store only | 8 staff | 🎀 Pink (current) |
| **SI** (Store Inspection) | Multi-store | 3 stores | ~24 staff | 🟣 Purple |
| **AM** (Area Manager) | Regional | 4 stores | ~27 staff | 🟠 Orange |

---

## 📦 NEW COMPONENTS TO CREATE

### 1. `<RoleIndicator>` Component
**Location:** `src/components/RoleIndicator.tsx`

Shows current role with colored accent and store context.

```typescript
import { Shield, Building, Network, Globe } from 'lucide-react';
import { useRole, getCurrentStore } from '../contexts/RoleContext';

export function RoleIndicator() {
  const { profile } = useRole();
  const currentStore = getCurrentStore(profile);

  const roleConfig = {
    'hq': {
      color: 'blue',
      icon: Shield,
      label: 'HQ Manager',
      description: 'System-wide access',
    },
    'store-manager': {
      color: 'pink',
      icon: Building,
      label: 'Store Manager',
      description: currentStore?.name || 'Store access',
    },
    'si': {
      color: 'purple',
      icon: Network,
      label: 'Store Inspection',
      description: `Managing ${profile.stores.length} stores`,
    },
    'am': {
      color: 'orange',
      icon: Globe,
      label: 'Area Manager',
      description: `Regional oversight • ${profile.stores.length} stores`,
    },
  };

  const config = roleConfig[profile.role];
  const Icon = config.icon;

  return (
    <div className={`border-l-4 border-${config.color}-500 bg-${config.color}-50 p-4 rounded-r mb-6`}>
      <div className="flex items-center gap-3">
        <div className={`bg-${config.color}-500 p-2 rounded-lg`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className={`font-semibold text-${config.color}-700 text-sm`}>
            {config.label}
          </div>
          <div className="text-xs text-gray-600">
            {config.description}
          </div>
        </div>
      </div>
    </div>
  );
}
```

**Usage:** Add at top of every major page.

---

### 2. `<StoreSelector>` Component
**Location:** `src/components/StoreSelector.tsx`

Dropdown for multi-store roles (HQ, SI, AM). Hidden for Store Manager.

```typescript
import { Building2, ChevronDown } from 'lucide-react';
import { useRole, getCurrentStore } from '../contexts/RoleContext';
import { useState, useRef, useEffect } from 'react';

export function StoreSelector() {
  const { profile, setCurrentStore } = useRole();
  const currentStore = getCurrentStore(profile);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Hide for single-store roles
  if (profile.role === 'store-manager') {
    return (
      <div className="bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Building2 className="w-4 h-4" />
          <span className="font-medium">{currentStore?.name}</span>
        </div>
      </div>
    );
  }

  // Dropdown for multi-store roles
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white px-4 py-2 rounded-lg border border-gray-300 hover:border-gray-400 transition-colors flex items-center gap-2 min-w-[280px]"
      >
        <Building2 className="w-4 h-4 text-gray-600" />
        <span className="text-sm font-medium text-gray-700 flex-1 text-left">
          {currentStore?.name || 'Select Store'}
        </span>
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
          {profile.stores.map((store) => (
            <button
              key={store.id}
              onClick={() => {
                setCurrentStore(store.id);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0 ${
                currentStore?.id === store.id ? 'bg-blue-50' : ''
              }`}
            >
              <div className="font-medium text-sm text-gray-800">{store.name}</div>
              <div className="text-xs text-gray-500">{store.location}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
```

**Usage:** Add to page headers where store context matters.

---

### 3. `<RoleBasedContent>` Helper Component
**Location:** `src/components/RoleBasedContent.tsx`

Conditionally render content based on role.

```typescript
import { useRole } from '../contexts/RoleContext';
import { UserRole } from '../contexts/RoleContext';

interface RoleBasedContentProps {
  roles: UserRole[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function RoleBasedContent({ roles, children, fallback = null }: RoleBasedContentProps) {
  const { profile } = useRole();

  if (roles.includes(profile.role)) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
}
```

**Usage:**
```typescript
<RoleBasedContent roles={['hq', 'si', 'am']}>
  <StoreSelector />
</RoleBasedContent>
```

---

## 📄 PAGES TO MODIFY

### **Page 1: Dashboard.tsx**
**Current State:** Shows hardcoded data for all stores
**Changes Needed:**

#### 1. Add Role Indicator at Top
```typescript
import { RoleIndicator } from '../components/RoleIndicator';

export default function Dashboard() {
  return (
    <div className="p-6">
      <RoleIndicator />

      {/* Existing welcome section... */}
    </div>
  );
}
```

#### 2. Change Welcome Message Based on Role
```typescript
const { profile } = useRole();

<div className="mb-6">
  <h1 className="text-2xl font-bold text-gray-800 mb-2">
    Welcome back, {profile.name}!
  </h1>
  <p className="text-gray-500">
    {profile.role === 'hq' && "Here's what's happening across all stores today."}
    {profile.role === 'store-manager' && "Here's what's happening at your store today."}
    {profile.role === 'si' && "Here's the overview for your assigned stores."}
    {profile.role === 'am' && "Regional performance overview for your area."}
  </p>
</div>
```

#### 3. Filter Stats Based on Role
```typescript
import { useRole, getCurrentStore } from '../contexts/RoleContext';
import { getStaffByBuilding } from 'shared-data';

const { profile } = useRole();
const currentStore = getCurrentStore(profile);

// Calculate stats based on role
const stats = useMemo(() => {
  if (profile.role === 'hq') {
    // System-wide stats
    return [
      { name: 'Active Tasks', value: '847', change: '+12.5%', ... },
      { name: 'Staff On Duty', value: '156', change: '-2.3%', ... },
      // ... all stores
    ];
  } else if (profile.role === 'store-manager') {
    // Single store stats
    const storeStaff = currentStore ? getStaffByBuilding(currentStore.name) : [];
    return [
      { name: 'Active Tasks', value: '110', change: '+8.2%', ... },
      { name: 'Staff On Duty', value: storeStaff.length.toString(), change: '0%', ... },
      // ... single store only
    ];
  } else {
    // Multi-store (SI/AM) - aggregate their stores
    return [
      { name: 'Active Tasks', value: (110 * profile.stores.length).toString(), ... },
      { name: 'Stores Managed', value: profile.stores.length.toString(), ... },
      // ... their stores only
    ];
  }
}, [profile, currentStore]);
```

#### 4. Add Store Selector for Multi-Store Roles
```typescript
import { StoreSelector } from '../components/StoreSelector';
import { RoleBasedContent } from '../components/RoleBasedContent';

{/* After RoleIndicator */}
<RoleBasedContent roles={['hq', 'si', 'am']}>
  <div className="mb-4">
    <StoreSelector />
  </div>
</RoleBasedContent>
```

#### 5. Filter Recent Tasks by Store
```typescript
const visibleTasks = useMemo(() => {
  if (profile.role === 'hq') {
    return recentTasks; // All tasks
  }

  const storeNames = profile.stores.map(s => s.name);
  return recentTasks.filter(task =>
    storeNames.some(name => task.store.includes(name))
  );
}, [profile]);
```

**Estimated Time:** 3-4 hours

---

### **Page 2: AITaskAssignment.tsx**
**Current State:** Already has store filtering! ✅
**Changes Needed:** Minor visual improvements

#### 1. Add Role Indicator
```typescript
<RoleIndicator />
```

#### 2. Enhance Store Selector Visibility
Make it more prominent for HQ/SI/AM users:

```typescript
{/* Replace existing store name display */}
{profile.role === 'store-manager' ? (
  <div className="text-sm text-gray-600">
    Assigning tasks for {currentStore?.name}
  </div>
) : (
  <div className="flex items-center gap-3">
    <span className="text-sm font-medium text-gray-700">Assign tasks for:</span>
    <StoreSelector />
  </div>
)}
```

#### 3. Add Role-Specific Scenario Descriptions
```typescript
const scenarioDescriptions = {
  'hq': 'Optimize across all stores',
  'store-manager': 'Balance workload for your team',
  'si': 'Coordinate across your 3 stores',
  'am': 'Regional optimization for your area',
};

<p className="text-xs text-gray-500">{scenarioDescriptions[profile.role]}</p>
```

**Estimated Time:** 1-2 hours

---

### **Page 3: TaskMonitoring.tsx**
**Current State:** Shows all tasks
**Changes Needed:**

#### 1. Add Role Indicator + Store Selector
```typescript
<div className="p-6">
  <RoleIndicator />

  <RoleBasedContent roles={['hq', 'si', 'am']}>
    <StoreSelector />
  </RoleBasedContent>

  {/* Rest of page */}
</div>
```

#### 2. Filter Tasks by Role
```typescript
const { profile } = useRole();
const currentStore = getCurrentStore(profile);

const visibleTasks = useMemo(() => {
  if (profile.role === 'hq') {
    return mockTasks; // All tasks
  }

  // Get staff IDs from user's stores
  const storeStaffIds = profile.stores.flatMap(store =>
    getStaffByBuilding(store.name).map(s => s.id)
  );

  return mockTasks.filter(task => storeStaffIds.includes(task.staffId));
}, [profile, mockTasks]);
```

#### 3. Update Page Header Count
```typescript
<h1 className="text-2xl font-bold text-gray-800">
  Task Monitoring
  <span className="text-lg font-normal text-gray-500 ml-3">
    {visibleTasks.length} tasks
    {profile.role !== 'store-manager' && ` across ${profile.stores.length} stores`}
  </span>
</h1>
```

**Estimated Time:** 2-3 hours

---

### **Page 4: StaffManagement.tsx**
**Current State:** Shows all 27 staff
**Changes Needed:**

#### 1. Add Role Indicator + Store Selector
```typescript
<RoleIndicator />

<div className="flex items-center justify-between mb-6">
  <div>
    <h1 className="text-2xl font-bold">Staff Management</h1>
    <p className="text-sm text-gray-500">
      {visibleStaff.length} staff members
      {profile.role !== 'store-manager' && ` across ${profile.stores.length} stores`}
    </p>
  </div>

  <RoleBasedContent roles={['hq', 'si', 'am']}>
    <StoreSelector />
  </RoleBasedContent>
</div>
```

#### 2. Filter Staff by Role
```typescript
const visibleStaff = useMemo(() => {
  if (profile.role === 'hq') {
    return mockStaff; // All 27 staff
  }

  // Get staff from user's stores
  const storeStaff = profile.stores.flatMap(store =>
    getStaffByBuilding(store.name)
  );

  // Match with mockStaff to get avatars
  return storeStaff.map(s => {
    const staffWithAvatar = mockStaff.find(ms => ms.id === s.id);
    return staffWithAvatar || { ...s, avatar: '' };
  });
}, [profile]);
```

#### 3. Add Cross-Store Transfer Button (SI/AM only)
```typescript
<RoleBasedContent roles={['si', 'am']}>
  <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 flex items-center gap-2">
    <Network className="w-4 h-4" />
    Transfer Staff Between Stores
  </button>
</RoleBasedContent>
```

**Estimated Time:** 2-3 hours

---

### **Page 5: ShiftSchedule.tsx**
**Current State:** Shows single store shifts
**Changes Needed:**

#### 1. Add Role Indicator + Store Selector
```typescript
<RoleIndicator />

<div className="flex items-center justify-between mb-6">
  <h1 className="text-2xl font-bold">Shift Schedule</h1>

  <RoleBasedContent roles={['hq', 'si', 'am']}>
    <StoreSelector />
  </RoleBasedContent>
</div>
```

#### 2. Already Filters by Store ✅
Code already does this:
```typescript
const staffData = currentStore
  ? getStaffByBuilding(currentStore.name)
  : [];
```

#### 3. Add Multi-Store Summary Widget (HQ/SI/AM)
```typescript
<RoleBasedContent roles={['hq', 'si', 'am']}>
  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
    <h3 className="font-semibold text-blue-800 mb-2">Multi-Store Summary</h3>
    <div className="grid grid-cols-3 gap-4">
      {profile.stores.map(store => {
        const storeStaff = getStaffByBuilding(store.name);
        return (
          <div key={store.id} className="text-sm">
            <div className="font-medium text-gray-800">{store.name}</div>
            <div className="text-gray-600">{storeStaff.length} staff on duty</div>
          </div>
        );
      })}
    </div>
  </div>
</RoleBasedContent>
```

**Estimated Time:** 2 hours

---

### **Page 6: Leaderboard.tsx**
**Current State:** Shows Store/Regional/Global tabs
**Changes Needed:**

#### 1. Add Role Indicator
```typescript
<RoleIndicator />
```

#### 2. Default Tab Based on Role
```typescript
const getDefaultScope = () => {
  if (profile.role === 'store-manager') return 'store';
  if (profile.role === 'si' || profile.role === 'am') return 'regional';
  return 'global'; // HQ
};

const [selectedScope, setSelectedScope] = useState<'store' | 'regional' | 'global'>(
  getDefaultScope()
);
```

#### 3. Hide Global Tab for Store Manager
```typescript
<div className="flex gap-2">
  <button
    onClick={() => setSelectedScope('store')}
    className={selectedScope === 'store' ? 'active' : ''}
  >
    Store
  </button>

  {/* Only show Regional for SI/AM/HQ */}
  <RoleBasedContent roles={['si', 'am', 'hq']}>
    <button
      onClick={() => setSelectedScope('regional')}
      className={selectedScope === 'regional' ? 'active' : ''}
    >
      Regional
    </button>
  </RoleBasedContent>

  {/* Only show Global for HQ */}
  <RoleBasedContent roles={['hq']}>
    <button
      onClick={() => setSelectedScope('global')}
      className={selectedScope === 'global' ? 'active' : ''}
    >
      Global
    </button>
  </RoleBasedContent>
</div>
```

#### 4. Filter Rankings by Store
```typescript
const visibleRankings = useMemo(() => {
  if (selectedScope === 'global') return mockLeaderboard;
  if (selectedScope === 'regional') {
    // Show only staff from user's stores
    const storeIds = profile.stores.map(s => s.id);
    return mockLeaderboard.filter(entry =>
      storeIds.includes(entry.storeId)
    );
  }
  // Store scope
  return mockLeaderboard.filter(entry =>
    entry.storeId === currentStore?.id
  );
}, [selectedScope, profile, currentStore]);
```

**Estimated Time:** 2 hours

---

### **Page 7: Performance.tsx**
**Current State:** Shows system-wide analytics
**Changes Needed:**

#### 1. Add Role Indicator + Store Selector
```typescript
<RoleIndicator />

<div className="flex items-center justify-between mb-6">
  <h1 className="text-2xl font-bold">Performance Analytics</h1>

  <RoleBasedContent roles={['hq', 'si', 'am']}>
    <StoreSelector />
  </RoleBasedContent>
</div>
```

#### 2. Adjust KPI Cards Based on Role
```typescript
const kpiData = useMemo(() => {
  if (profile.role === 'hq') {
    return {
      totalTasks: 33420,
      completionRate: 92.5,
      totalHours: 18450,
      efficiency: 91.3,
      label: 'System-wide',
    };
  } else if (profile.role === 'store-manager') {
    return {
      totalTasks: 110,
      completionRate: 89.0,
      totalHours: 720,
      efficiency: 88.5,
      label: currentStore?.name || 'Your Store',
    };
  } else {
    // SI/AM - aggregate their stores
    return {
      totalTasks: 110 * profile.stores.length,
      completionRate: 90.2,
      totalHours: 720 * profile.stores.length,
      efficiency: 89.8,
      label: `${profile.stores.length} Stores`,
    };
  }
}, [profile, currentStore]);

<div className="text-xs text-gray-500 mt-1">{kpiData.label}</div>
```

#### 3. Filter Store Comparison Table
```typescript
<RoleBasedContent roles={['hq', 'si', 'am']}>
  <div className="bg-white rounded-lg border p-6">
    <h2 className="text-lg font-semibold mb-4">Store Performance Comparison</h2>
    <table>
      <tbody>
        {profile.stores.map(store => (
          <tr key={store.id}>
            <td>{store.name}</td>
            {/* ... performance metrics ... */}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</RoleBasedContent>

<RoleBasedContent roles={['store-manager']}>
  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
    <p className="text-sm text-blue-800">
      📊 Store comparison view is available for multi-store managers (SI/AM) and HQ.
    </p>
  </div>
</RoleBasedContent>
```

**Estimated Time:** 2-3 hours

---

### **Page 8: Layout.tsx (Header)**
**Current State:** Has role switcher dropdown
**Changes Needed:**

#### 1. Add Role Badge in Header
```typescript
{/* After profile avatar */}
<div className="flex items-center gap-2 text-sm">
  <span className="font-medium text-gray-800">{profile.name}</span>
  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
    profile.role === 'hq' ? 'bg-blue-100 text-blue-700' :
    profile.role === 'store-manager' ? 'bg-pink-100 text-pink-700' :
    profile.role === 'si' ? 'bg-purple-100 text-purple-700' :
    'bg-orange-100 text-orange-700'
  }`}>
    {profile.roleLabel}
  </span>
</div>
```

#### 2. Add Store Context in Header (for multi-store roles)
```typescript
{hasMultipleStores && currentStore && (
  <div className="text-xs text-gray-500">
    Currently viewing: {currentStore.name}
  </div>
)}
```

**Estimated Time:** 1 hour

---

## 🎨 VISUAL ENHANCEMENTS

### Color Theme Per Role

Update Tailwind config or use inline styles:

```typescript
// Role-specific accent colors
const roleColors = {
  'hq': {
    primary: 'bg-blue-500',
    light: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-500',
  },
  'store-manager': {
    primary: 'bg-pink-600',
    light: 'bg-pink-50',
    text: 'text-pink-700',
    border: 'border-pink-600',
  },
  'si': {
    primary: 'bg-purple-500',
    light: 'bg-purple-50',
    text: 'text-purple-700',
    border: 'border-purple-500',
  },
  'am': {
    primary: 'bg-orange-500',
    light: 'bg-orange-50',
    text: 'text-orange-700',
    border: 'border-orange-500',
  },
};
```

### Icons Per Role
- **HQ:** Shield icon (system admin)
- **Store Manager:** Building icon (single location)
- **SI:** Network icon (connected stores)
- **AM:** Globe icon (regional/area)

---

## 📅 IMPLEMENTATION TIMELINE

### **Day 1: Core Components + Dashboard/Task Assignment**
**Morning (4 hours):**
- [ ] Create `RoleIndicator.tsx` component (1 hour)
- [ ] Create `StoreSelector.tsx` component (1.5 hours)
- [ ] Create `RoleBasedContent.tsx` helper (30 min)
- [ ] Test components in isolation (1 hour)

**Afternoon (4 hours):**
- [ ] Update Dashboard.tsx (3 hours)
  - Add RoleIndicator
  - Filter stats by role
  - Add StoreSelector
  - Filter tasks and store performance
- [ ] Update AITaskAssignment.tsx (1 hour)
  - Add RoleIndicator
  - Enhance store selector visibility
  - Add role-specific descriptions

**End of Day 1:** 2 pages fully role-aware ✅

---

### **Day 2: Staff, Task Monitoring, Shifts**
**Morning (4 hours):**
- [ ] Update TaskMonitoring.tsx (2 hours)
  - Add RoleIndicator + StoreSelector
  - Filter tasks by role
  - Update header counts
- [ ] Update StaffManagement.tsx (2 hours)
  - Add RoleIndicator + StoreSelector
  - Filter staff by role
  - Add cross-store transfer button (SI/AM)

**Afternoon (4 hours):**
- [ ] Update ShiftSchedule.tsx (2 hours)
  - Add RoleIndicator + StoreSelector
  - Add multi-store summary widget
- [ ] Update Leaderboard.tsx (2 hours)
  - Add RoleIndicator
  - Default tab by role
  - Hide tabs based on role
  - Filter rankings

**End of Day 2:** 4 more pages done, total 6/8 ✅

---

### **Day 3: Performance, Layout, Polish**
**Morning (3 hours):**
- [ ] Update Performance.tsx (2 hours)
  - Add RoleIndicator + StoreSelector
  - Adjust KPIs by role
  - Filter store comparison table
- [ ] Update Layout.tsx header (1 hour)
  - Add role badge
  - Add store context indicator

**Afternoon (5 hours):**
- [ ] Testing & Bug Fixes (2 hours)
  - Test all 4 roles on all 8 pages
  - Fix any visual issues
  - Ensure smooth role switching
- [ ] Visual Polish (2 hours)
  - Consistent spacing and colors
  - Smooth transitions
  - Hover states
- [ ] Documentation (1 hour)
  - Update CLAUDE.md with new components
  - Add screenshots to docs
  - Write demo script

**End of Day 3:** All 8 pages complete + polished ✅

---

## ✅ DEFINITION OF DONE

### Functional Requirements
- [ ] All 4 roles work correctly
- [ ] Store filtering works for multi-store roles
- [ ] Single-store role sees only their data
- [ ] Role switching is smooth (no errors)
- [ ] Components are reusable

### Visual Requirements
- [ ] Each role has distinct color theme
- [ ] Role indicator appears on all pages
- [ ] Store selector works for HQ/SI/AM
- [ ] Store selector hidden for Store Manager
- [ ] Consistent spacing and typography

### Testing Checklist
- [ ] HQ can see all stores and switch between them
- [ ] Store Manager sees only 1 store (no selector)
- [ ] SI sees 3 stores and can switch
- [ ] AM sees 4 stores and can switch
- [ ] Data filters correctly when switching stores
- [ ] Role badges show correct colors
- [ ] No console errors

---

## 🎯 SUCCESS METRICS

**What Good Looks Like:**

1. **Clear Visual Hierarchy**
   - User immediately knows their role (color + icon)
   - Access level is obvious (1 store vs 4 stores)

2. **Smooth Demo Flow**
   ```
   1. Login as Store Manager → See pink theme, 1 store, 8 staff
   2. Switch to HQ → See blue theme, store selector appears, all 27 staff
   3. Switch to SI → See purple theme, 3 stores in selector
   4. Switch to AM → See orange theme, 4 stores, regional view
   ```

3. **Data Accuracy**
   - Store Manager sees 110 tasks (their store only)
   - HQ sees 440 tasks (4 stores × 110)
   - SI sees 330 tasks (3 stores × 110)
   - AM sees 440 tasks (4 stores × 110)

---

## 🚨 RISKS & MITIGATION

### Risk 1: Tailwind Dynamic Classes
**Problem:** `bg-${color}-500` won't work with Tailwind purge.

**Solution:** Use predefined classes:
```typescript
const colorClasses = {
  blue: 'bg-blue-500 text-blue-700 border-blue-500',
  pink: 'bg-pink-600 text-pink-700 border-pink-600',
  purple: 'bg-purple-500 text-purple-700 border-purple-500',
  orange: 'bg-orange-500 text-orange-700 border-orange-500',
};

className={colorClasses[config.color]}
```

### Risk 2: Shared Data Changes
**Problem:** Modifying shared-data might affect staff app.

**Solution:** Only consume data, don't modify schemas.

### Risk 3: Performance with Large Data
**Problem:** Filtering 27 staff on every render.

**Solution:** Use `useMemo` for all filtered data.

---

## 💡 QUICK WINS

If we run short on time, prioritize:

1. ✅ **Must Have:**
   - RoleIndicator on all pages (biggest visual impact)
   - Dashboard role filtering (shows the concept)
   - StoreSelector component (key differentiator)

2. 🟡 **Nice to Have:**
   - All pages with role filtering
   - Color themes per role
   - Cross-store transfer buttons

3. 🔵 **Can Skip:**
   - Multi-store summary widgets
   - Regional performance comparisons
   - Advanced SI/AM features

---

## 🎬 DEMO SCRIPT (Role Features)

**1. Start as Store Manager (30 sec)**
```
"Here's Sarah, a Store Manager. Notice the pink theme.
She sees only her store - AEON Ocean Park Hawaii.
8 staff members, 110 tasks. Everything focused on her location."
```

**2. Switch to HQ Manager (45 sec)**
```
"Now let's switch to HQ. Watch what happens...
[Click role dropdown, select HQ]

The theme turns blue - system admin.
Now there's a store selector - she can view any of the 4 stores.
Dashboard shows all 27 staff across all locations.
Total: 440 tasks system-wide."
```

**3. Switch to SI (30 sec)**
```
"SI manages 3 stores. Purple theme.
Store selector shows only their 3 assigned stores.
They can transfer staff between their stores - see this button?
That's cross-store management."
```

**4. Switch to AM (30 sec)**
```
"Area Manager has regional oversight. Orange theme.
4 stores in their region.
Analytics show regional performance.
They coordinate across a larger area."
```

**Total Demo Time:** 2 minutes, 15 seconds

---

## ❓ QUESTIONS BEFORE WE START

1. **Color Themes:** Should we apply role colors to the entire UI (buttons, links) or just indicators?
   - **Recommendation:** Just indicators. Keep buttons pink for consistency.

2. **Store Switching:** Should switching stores refresh all data or just filter?
   - **Recommendation:** Just filter existing data (no API calls).

3. **SI/AM Differences:** Should SI (3 stores) and AM (4 stores) look different?
   - **Recommendation:** Different colors, same features.

4. **Testing Priority:** Which role should work perfectly for demo?
   - **Recommendation:** Store Manager → HQ (most common demo flow).

---

## 🚀 READY TO START?

**Confirm:**
- [ ] Approach approved (visual indicators + data filtering)
- [ ] 3-day timeline acceptable
- [ ] Component structure makes sense
- [ ] Color scheme approved (blue/pink/purple/orange)

**Then I'll start with Day 1:**
1. Create `RoleIndicator`, `StoreSelector`, `RoleBasedContent` components
2. Update Dashboard.tsx
3. Update AITaskAssignment.tsx

**Should I begin implementation now?** 🚀
