# Role-Based Demo Guide

## Overview

The RetailFlow Manager system now includes **interactive role switching** for client demonstrations. You can instantly switch between different user roles to showcase how each party interacts with the system.

## How to Use the Demo

### 1. Starting the Demo

```bash
npm run dev
```

The app will open on http://localhost:3003 (or next available port).

### 2. Role Switcher

Look for the **pink "Demo: Switch Role" button** in the top-right corner of the header.

Click it to see 4 role options:
- **HQ Manager** - Full system access
- **Store Manager** - Single store management
- **SI (Store Inspection)** - Multi-store (2-3 stores) oversight
- **AM (Area Manager)** - Regional management

### 3. Store Selector

When you switch to multi-store roles (HQ, SI, AM), a **Store Selector** appears on the left side of the header showing:
- Current store name
- Dropdown to switch between assigned stores

## Business Workflow

### Task Template Creation (HQ Only)
1. **HQ creates task templates**
   - DWS Templates: 110 daily recurring tasks
   - WS Templates: Event-based/seasonal tasks
2. **Templates pushed to all stores**

### Task Assignment (SM/SI/AM)
1. **Store/Regional managers receive tasks from HQ**
2. **Assign tasks to staff** in their store(s)
3. **Monitor real-time task status**
4. **SI/AM can reallocate staff cross-store**

## Role Comparison

| Feature | HQ Manager | Store Manager | SI (Store Inspection) | AM (Area Manager) |
|---------|-----------|--------------|---------------------|-------------------|
| **Primary Role** | Create task templates | Assign tasks to staff | Multi-store task assignment | Regional oversight |
| **User Name** | Nguyen Van Admin | Sarah Johnson | Mike Chen | Emily Rodriguez |
| **Stores Access** | All 26 stores | 1 store (Hanoi Long Bien) | 3 stores (Hanoi region) | 4 stores (South region) |
| **Store Selector** | ✅ Yes | ❌ No | ✅ Yes | ✅ Yes |
| **Create Templates** | ✅ Yes (DWS/WS) | ❌ No | ❌ No | ❌ No |
| **Assign Tasks** | ✅ Yes | ✅ Yes | ✅ Yes (cross-store) | ✅ Yes (cross-store) |
| **Cross-Store Staff** | N/A | ❌ No | ✅ Yes | ✅ Yes |

### Navigation Menu Access by Role

**HQ Manager** sees:
- ✅ Dashboard (all stores)
- ✅ Task Management
  - AI Task Assignment
  - Task Monitoring
  - **DWS Templates** ⭐ (Create 110 daily tasks)
  - **WS Templates** ⭐ (Create event tasks)
- ✅ Staff Management
- ✅ Shift Management (all sub-items)
- ✅ Analytics (all sub-items)
- ✅ Store Management
- ✅ Settings ⭐ (System configuration)

**Store Manager** sees:
- ✅ Dashboard (single store)
- ✅ Task Management
  - **AI Task Assignment** ⭐ (Assign HQ tasks to staff)
  - **Task Monitoring** ⭐ (Real-time status)
  - ❌ DWS Templates (hidden - HQ only)
  - ❌ WS Templates (hidden - HQ only)
- ✅ Staff Management
- ✅ Shift Management
  - Shift Schedule
  - Leave Requests
  - Attendance
- ✅ Analytics
  - Performance
  - Leaderboard
- ❌ Store Management (hidden)
- ❌ Settings (hidden)

**SI (Store Inspection)** sees:
- ✅ Dashboard (3 stores aggregated)
- ✅ Task Management
  - **AI Task Assignment** ⭐ (Assign across 3 stores)
  - **Task Monitoring** ⭐ (Cross-store monitoring)
  - ❌ Templates (hidden - HQ only)
- ✅ Staff Management ⭐ (Can reallocate staff cross-store)
- ✅ Shift Management (all sub-items)
- ✅ Analytics (multi-store)
- ✅ Store Management (view assigned stores)
- ❌ Settings (hidden)

**AM (Area Manager)** sees:
- ✅ Dashboard (4 stores regional)
- ✅ Task Management
  - **AI Task Assignment** ⭐ (Regional assignment)
  - **Task Monitoring** ⭐ (Regional monitoring)
  - ❌ Templates (hidden - HQ only)
- ✅ Staff Management ⭐ (Cross-store allocation)
- ✅ Shift Management (all sub-items)
- ✅ Analytics (regional performance)
- ✅ Store Management (regional stores)
- ❌ Settings (hidden)

## Demo Flow Recommendations

### Scenario 1: HQ Creates Task Templates

1. Start as **HQ Manager** (Nguyen Van Admin)
2. Show **DWS Templates** page
   - 110 daily recurring tasks
   - Manual reference codes (1.1.1, 1.1.2, etc.)
   - "Open Guide" buttons
3. Show **WS Templates** page
   - Event/seasonal tasks
   - Photo verification settings
   - AI auto-approval vs HQ manual approval
4. Explain: "HQ creates these templates once, pushes to all stores"

**Key Points:**
- Template creation is centralized
- One-time setup, all stores benefit
- Manual references ensure consistency

### Scenario 2: Store Manager Receives & Assigns Tasks

1. Switch to **Store Manager** (Sarah Johnson)
2. **Notice**: DWS/WS Template menus disappear!
3. Navigate to **AI Task Assignment**
   - Receive 110 tasks from HQ
   - AI suggests 4 assignment scenarios
   - Select optimal scenario
4. Go to **Task Monitoring**
   - Real-time task status
   - Timeline/Kanban/List views
5. Check **Staff Management** → 10 staff members
6. Review **Shift Schedule** → weekly planning

**Key Points:**
- Cannot create templates (receives from HQ)
- Focuses on assignment and execution
- Single store responsibility

### Scenario 3: SI Multi-Store Task Assignment

1. Switch to **SI** (Mike Chen)
2. **Store selector appears** → 3 Hanoi stores
3. Dashboard shows **aggregated metrics**
4. Navigate to **AI Task Assignment**
   - View tasks for all 3 stores
   - Can assign tasks across stores
5. Go to **Staff Management**
   - View staff from all 3 stores
   - **Reallocate staff**: "Store 1 needs help? Move staff from Store 2"
6. Use **Store Selector** to switch context
7. **Task Monitoring** → cross-store visibility

**Key Points:**
- Manages 2-3 stores simultaneously
- Can reallocate staff cross-store
- Receives tasks from HQ (doesn't create templates)

### Scenario 4: AM Regional Oversight

1. Switch to **AM** (Emily Rodriguez)
2. Store selector shows **4 South region stores**
3. Dashboard displays **regional analytics**
4. Navigate to **AI Task Assignment**
   - Assign tasks across South region
   - Balance workload across 4 stores
5. Go to **Staff Management**
   - View all South region staff
   - **Reallocate regionally**: "Can Tho is busy? Send staff from Binh Duong"
6. Check **Performance** → regional comparison

**Key Points:**
- Larger scope than SI (4-8 stores)
- Regional staff optimization
- Still receives tasks from HQ (no template creation)

## Presentation Tips

### Opening Statement

> "Let me show you how different users interact with RetailFlow Manager. I'll switch between roles in real-time to demonstrate the system's role-based access control."

### During Demo

1. **Highlight the role switcher**: "Notice this pink button - it shows our current role"
2. **Show store selector**: "When managing multiple stores, users see this dropdown"
3. **Demonstrate navigation changes**: "See how menu items appear/disappear based on permissions"
4. **Switch roles smoothly**: Click role → wait for UI update → narrate the changes

### Key Selling Points

✅ **Centralized Template Management**: HQ creates once, all stores benefit
✅ **Role-Based Workflows**:
   - HQ: Template creation
   - SM/SI/AM: Task assignment and monitoring
✅ **Cross-Store Staff Allocation**: SI/AM can balance workload regionally
✅ **Scalability**: From 1 store (SM) to 300 stores (HQ)
✅ **Real-Time Monitoring**: All roles see live task status
✅ **Intuitive Design**: Navigation adapts to role permissions

## Technical Implementation

### Files Added/Modified

1. **Created:**
   - `src/contexts/RoleContext.tsx` - Role state management

2. **Modified:**
   - `src/main.tsx` - Wrapped app with RoleProvider
   - `src/components/Layout.tsx` - Added role/store switchers, navigation filtering

### How It Works

```typescript
// Role context provides:
- profile: Current user profile (name, role, avatar, stores)
- switchRole(role): Change demo role
- setCurrentStore(storeId): Switch between stores
- hasPermission(role, permission): Check access rights

// Navigation filtering:
const navigation = allNavigation.filter(item =>
  hasPermission(profile.role, item.permission)
);

// Store selector visibility:
const hasMultipleStores = profile.stores.length > 1;
```

## Mock Data

### Stores in Demo

- **Hanoi Region** (North): 3 stores
  - AEON Hanoi Long Bien (HN-01)
  - AEON Hanoi Ha Dong (HN-02)
  - AEON Hai Phong (HP-01)

- **HCMC Region** (South): 4 stores
  - AEON HCMC Tan Phu (HCM-01)
  - AEON HCMC Binh Tan (HCM-02)
  - AEON Binh Duong (BD-01)
  - AEON Can Tho (CT-01)

- **Central Region**: 1 store
  - AEON Da Nang (DN-01)

### User Profiles

| Role | Name | Stores | Avatar |
|------|------|--------|--------|
| HQ | Nguyen Van Admin | All 26 | NA |
| Store Manager | Sarah Johnson | Hanoi Long Bien | SJ |
| SI | Mike Chen | 3 Hanoi stores | MC |
| AM | Emily Rodriguez | 4 South stores | ER |

## Next Steps for Full Implementation

After client approval, these role features will connect to:
- Real authentication system
- Database-driven role assignments
- Backend API for permission checks
- SSO integration with AEON's systems

## Troubleshooting

**Issue**: Role switcher doesn't appear
- **Solution**: Check that `RoleProvider` wraps `<App />` in `main.tsx`

**Issue**: Navigation items don't filter
- **Solution**: Verify permission strings match in both `RoleContext.tsx` and `Layout.tsx`

**Issue**: Store selector always shows
- **Solution**: Ensure `hasMultipleStores` check in Layout header

## Support

For questions or issues during demo preparation, refer to:
- `src/PROJECT_OVERVIEW.md` - Complete project documentation
- `wbs.md` - Work breakdown structure with all requirements
- `CLAUDE.md` - Developer guide for future modifications
