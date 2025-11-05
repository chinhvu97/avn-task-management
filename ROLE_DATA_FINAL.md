# Role-Based Data - Final Configuration

**Date:** November 5, 2025
**Status:** ✅ Fixed and Ready for Implementation

---

## 🎯 FINAL ROLE HIERARCHY

### Hierarchy from Top to Bottom:

```
HQ Manager (System Admin)
    ↓
AM (Area Manager) - 3 stores
    ↓
SI (Store Inspection) - 2 stores
    ↓
Store Manager - 1 store
```

**Rationale:**
- **AM > SI:** AM has more stores (3 vs 2), managing a larger region
- **SI:** Entry-level multi-store role, learns to manage 2 stores before becoming AM

---

## 📊 FINAL DATA BREAKDOWN

### **HQ Manager** (Nguyen Van Admin)
```
Role Level: System Administrator
Stores: 4 stores (ALL)
  ✓ AEON MAXVALU OCEAN PARK HAWAII BUILDING
  ✓ AEON MAXVALU SKY OASIS
  ✓ AEON MAXVALU ECOPARK RỪNG CỌ
  ✓ AEON MAXVALU ECOPARK

Staff: 27 staff members (ALL)
  - Ocean Park Hawaii: 8 staff
  - Sky Oasis: 6 staff
  - Ecopark Rừng Cọ: 7 staff
  - Ecopark: 6 staff

Tasks: 440 tasks (110 × 4 stores)

Color Theme: 🔵 Blue
Icon: Shield (System Admin)
```

---

### **Area Manager (AM)** - Emily Rodriguez
```
Role Level: Regional Manager
Stores: 3 stores
  ✓ AEON MAXVALU SKY OASIS
  ✓ AEON MAXVALU ECOPARK RỪNG CỌ
  ✓ AEON MAXVALU ECOPARK

Staff: 19 staff members
  - Sky Oasis: 6 staff
  - Ecopark Rừng Cọ: 7 staff
  - Ecopark: 6 staff

Tasks: 330 tasks (110 × 3 stores)

Color Theme: 🟠 Orange
Icon: Globe (Regional)
```

---

### **Store Inspection (SI)** - Mike Chen
```
Role Level: Multi-Store Supervisor
Stores: 2 stores
  ✓ AEON MAXVALU OCEAN PARK HAWAII BUILDING
  ✓ AEON MAXVALU SKY OASIS

Staff: 14 staff members
  - Ocean Park Hawaii: 8 staff
  - Sky Oasis: 6 staff

Tasks: 220 tasks (110 × 2 stores)

Color Theme: 🟣 Purple
Icon: Network (Multi-Store)
```

---

### **Store Manager** - Sarah Johnson (Default)
```
Role Level: Single Store Manager
Store: 1 store
  ✓ AEON MAXVALU OCEAN PARK HAWAII BUILDING

Staff: 8 staff members
  - DEMO-001: Nguyen Van Nam (Store Manager)
  - DEMO-002: Tran Thi Thuy (Floor Manager)
  - DEMO-003: Le Van Cuong (Sales Associate)
  - DEMO-004: Do Van Binh (Cashier)
  - DEMO-005: Tran Van Minh (Stock Clerk)
  - DEMO-006: Pham Thi Linh (Sales Associate)
  - DEMO-007: Hoang Minh Huy (Cashier)
  - DEMO-008: Vu Thi Mai (Floor Manager)

Tasks: 110 tasks

Color Theme: 🎀 Pink
Icon: Building (Single Store)
```

---

## 📈 COMPARISON TABLE

| Role | Stores | Staff | Tasks | Access Level |
|------|--------|-------|-------|--------------|
| **HQ Manager** | 4 stores | 27 staff | 440 tasks | System-wide |
| **AM** | 3 stores | 19 staff | 330 tasks | Regional |
| **SI** | 2 stores | 14 staff | 220 tasks | Multi-Store |
| **Store Manager** | 1 store | 8 staff | 110 tasks | Single Store |

---

## 🎨 VISUAL DESIGN SYSTEM

### Color Coding

| Role | Primary Color | Background | Border | Text |
|------|--------------|------------|--------|------|
| HQ | `bg-blue-500` | `bg-blue-50` | `border-blue-500` | `text-blue-700` |
| AM | `bg-orange-500` | `bg-orange-50` | `border-orange-500` | `text-orange-700` |
| SI | `bg-purple-500` | `bg-purple-50` | `border-purple-500` | `text-purple-700` |
| Store Manager | `bg-pink-600` | `bg-pink-50` | `border-pink-600` | `text-pink-700` |

### Icons

| Role | Icon | Meaning |
|------|------|---------|
| HQ | `Shield` | System protection & administration |
| AM | `Globe` | Regional/geographic coverage |
| SI | `Network` | Connected stores |
| Store Manager | `Building` | Single location focus |

---

## 🔧 IMPLEMENTATION CODE

### RoleContext Configuration (FIXED)

```typescript
const roleConfigs: Record<UserRole, Omit<UserProfile, 'currentStoreId'>> = {
  'hq': {
    name: 'Nguyen Van Admin',
    role: 'hq',
    roleLabel: 'HQ Manager',
    avatar: 'NA',
    stores: allStores, // All 4 stores
  },
  'store-manager': {
    name: 'Sarah Johnson',
    role: 'store-manager',
    roleLabel: 'Store Manager',
    avatar: 'SJ',
    stores: [allStores[0]], // 1 store: Ocean Park Hawaii
  },
  'si': {
    name: 'Mike Chen',
    role: 'si',
    roleLabel: 'SI (Store Inspection)',
    avatar: 'MC',
    stores: [allStores[0], allStores[1]], // ✅ 2 stores: Ocean Park Hawaii, Sky Oasis
  },
  'am': {
    name: 'Emily Rodriguez',
    role: 'am',
    roleLabel: 'AM (Area Manager)',
    avatar: 'ER',
    stores: [allStores[1], allStores[2], allStores[3]], // ✅ 3 stores: Sky Oasis, Ecopark Rừng Cọ, Ecopark
  },
};
```

### Getting Staff for Current Role

```typescript
import { useRole } from '../contexts/RoleContext';
import { getStaffByBuilding } from 'shared-data';

function MyComponent() {
  const { profile } = useRole();

  // Get staff from user's stores
  const visibleStaff = useMemo(() => {
    return profile.stores.flatMap(store =>
      getStaffByBuilding(store.name)
    );
  }, [profile]);

  // Result:
  // HQ: 27 staff
  // AM: 19 staff
  // SI: 14 staff
  // Store Manager: 8 staff
}
```

---

## ✅ VERIFICATION CHECKLIST

### Build Status
- [x] TypeScript compiles successfully
- [x] Vite build completes without errors
- [x] No runtime errors expected

### Data Integrity
- [x] All store indices are valid (0-3)
- [x] All staff are assigned to real stores
- [x] Helper functions work correctly
- [x] No out-of-bounds array access

### Role Assignments
- [x] HQ has all 4 stores
- [x] AM has 3 stores (more than SI)
- [x] SI has 2 stores (less than AM)
- [x] Store Manager has 1 store

---

## 🎬 DEMO FLOW

### Demo Script: Role Switching

**1. Start as Store Manager (Default)**
```
"Let's start as Sarah, a Store Manager at Ocean Park Hawaii.
She manages 8 staff members and 110 daily tasks at her single location."

Visible:
- 1 store (Ocean Park Hawaii)
- 8 staff members
- Pink theme
```

**2. Switch to SI**
```
"Now let's switch to Mike, a Store Inspection manager.
He oversees 2 stores and can coordinate staff across them."

Visible:
- 2 stores (Ocean Park Hawaii + Sky Oasis)
- 14 staff members (8 + 6)
- Store selector dropdown appears
- Purple theme
```

**3. Switch to AM**
```
"Emily is an Area Manager, managing 3 stores across a region.
She has broader oversight and can optimize resources regionally."

Visible:
- 3 stores (Sky Oasis + Ecopark Rừng Cọ + Ecopark)
- 19 staff members (6 + 7 + 6)
- Store selector with 3 options
- Orange theme
```

**4. Switch to HQ**
```
"Finally, at HQ level, admins see everything system-wide.
All 4 stores, all 27 staff, complete visibility."

Visible:
- 4 stores (ALL)
- 27 staff members (ALL)
- Store selector with all 4 stores
- Blue theme
```

**Demo Time:** 2-3 minutes

---

## 📝 NEXT IMPLEMENTATION STEPS

### Day 1 (Today)
1. ✅ **Fix RoleContext** - DONE
2. ✅ **Build verification** - DONE
3. ⏭️ **Create RoleIndicator component**
4. ⏭️ **Create StoreSelector component**
5. ⏭️ **Update Dashboard with role filtering**

### Day 2
- Update TaskMonitoring, StaffManagement, ShiftSchedule, Leaderboard

### Day 3
- Update Performance, Layout, Testing, Polish

---

## 🚀 STATUS: READY TO IMPLEMENT!

All data is verified and role assignments are fixed.

**Next Step:** Create the `RoleIndicator` component and start implementing role-based UI.

---

**Generated:** November 5, 2025
**Build Status:** ✅ Success (849.02 KB)
**Files Changed:** 1 (RoleContext.tsx)
