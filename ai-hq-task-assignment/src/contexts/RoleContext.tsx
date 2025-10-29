import { createContext, useContext, useState, ReactNode } from 'react';
import { stores as allStores, Store } from 'shared-data';

export type UserRole = 'hq' | 'store-manager' | 'si' | 'am';

export interface UserProfile {
  name: string;
  role: UserRole;
  roleLabel: string;
  avatar: string;
  stores: Store[]; // Stores this user has access to
  currentStoreId?: string; // For multi-store users, which store they're viewing
}

interface RoleContextType {
  profile: UserProfile;
  switchRole: (role: UserRole) => void;
  setCurrentStore: (storeId: string) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

// Role configurations
const roleConfigs: Record<UserRole, Omit<UserProfile, 'currentStoreId'>> = {
  'hq': {
    name: 'Nguyen Van Admin',
    role: 'hq',
    roleLabel: 'HQ Manager',
    avatar: 'NA',
    stores: allStores, // HQ sees all stores
  },
  'store-manager': {
    name: 'Sarah Johnson',
    role: 'store-manager',
    roleLabel: 'Store Manager',
    avatar: 'SJ',
    stores: [allStores[0]], // Only Store #01
  },
  'si': {
    name: 'Mike Chen',
    role: 'si',
    roleLabel: 'SI (Store Inspection)',
    avatar: 'MC',
    stores: [allStores[0], allStores[1], allStores[6]], // 3 stores in Hanoi region
  },
  'am': {
    name: 'Emily Rodriguez',
    role: 'am',
    roleLabel: 'AM (Area Manager)',
    avatar: 'ER',
    stores: [allStores[2], allStores[3], allStores[5], allStores[7]], // South region stores
  },
};

export function RoleProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>({
    ...roleConfigs['store-manager'],
    currentStoreId: allStores[0].id,
  });

  const switchRole = (role: UserRole) => {
    const config = roleConfigs[role];
    setProfile({
      ...config,
      currentStoreId: config.stores[0]?.id,
    });
  };

  const setCurrentStore = (storeId: string) => {
    setProfile(prev => ({
      ...prev,
      currentStoreId: storeId,
    }));
  };

  return (
    <RoleContext.Provider value={{ profile, switchRole, setCurrentStore }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within RoleProvider');
  }
  return context;
}

// Helper functions
export function hasPermission(role: UserRole, permission: string): boolean {
  const permissions: Record<UserRole, string[]> = {
    // HQ: Creates task templates (DWS/WS), manages master data, system settings
    'hq': ['all'], // HQ has all permissions

    // Store Manager: Receives tasks from HQ, assigns to staff, monitors single store
    'store-manager': [
      'dashboard',
      'task-assignment',      // Assign HQ tasks to staff
      'task-monitoring',      // Monitor task status
      'staff',                // Manage staff
      'shifts',               // Manage shifts
      'leave-requests',       // Approve leave
      'attendance',           // Track attendance
      'performance',          // Store performance
      'leaderboard'           // Staff rankings
    ],

    // SI: Same as Store Manager but for 2-3 stores, can reallocate staff cross-store
    'si': [
      'dashboard',
      'task-assignment',      // Assign tasks across multiple stores
      'task-monitoring',      // Monitor tasks across stores
      'staff',                // Manage staff (can reallocate cross-store)
      'shifts',               // Manage shifts across stores
      'leave-requests',       // Approve leave
      'attendance',           // Track attendance
      'performance',          // Multi-store performance
      'leaderboard',          // Rankings
      'stores'                // View all assigned stores
    ],

    // AM: Regional manager, same as SI but for larger area (5-8 stores)
    'am': [
      'dashboard',
      'task-assignment',      // Assign tasks across region
      'task-monitoring',      // Monitor regional tasks
      'staff',                // Manage staff (cross-store allocation)
      'shifts',               // Regional shift management
      'leave-requests',       // Approve leave
      'attendance',           // Regional attendance
      'performance',          // Regional performance analytics
      'leaderboard',          // Regional rankings
      'stores'                // View all regional stores
    ],
  };

  const rolePermissions = permissions[role];
  return rolePermissions.includes('all') || rolePermissions.includes(permission);
}

// Get role description for UI
export function getRoleDescription(role: UserRole): string {
  const descriptions: Record<UserRole, string> = {
    'hq': 'Creates task templates (DWS/WS), manages system settings and master data',
    'store-manager': 'Receives tasks from HQ, assigns to staff, monitors store operations',
    'si': 'Manages 2-3 stores, can assign tasks and reallocate staff cross-store',
    'am': 'Manages regional stores, oversees cross-store operations and staff allocation',
  };
  return descriptions[role];
}

export function getCurrentStore(profile: UserProfile): Store | undefined {
  if (profile.currentStoreId) {
    return profile.stores.find(s => s.id === profile.currentStoreId);
  }
  return profile.stores[0];
}
