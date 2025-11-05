import { useMemo } from 'react';
import { useRole } from '../contexts/RoleContext';
import { getStaffByBuilding } from 'shared-data';

/**
 * useRoleBasedData Hook
 *
 * Provides filtered data based on current user role
 * Returns staff, store IDs, and aggregated stats for the user's accessible stores
 *
 * @example
 * const { visibleStaff, visibleStaffIds, stats } = useRoleBasedData();
 *
 * Results by role:
 * - HQ Manager: 27 staff, 4 stores, 440 tasks
 * - AM: 19 staff, 3 stores, 330 tasks
 * - SI: 14 staff, 2 stores, 220 tasks
 * - Store Manager: 8 staff, 1 store, 110 tasks
 */
export function useRoleBasedData() {
  const { profile } = useRole();

  // Determine which stores to show data for
  const activeStores = useMemo(() => {
    // If a specific store is selected, filter to only that store
    if (profile.currentStoreId) {
      const selectedStore = profile.stores.find(s => s.id === profile.currentStoreId);
      return selectedStore ? [selectedStore] : profile.stores;
    }
    // Otherwise, show all accessible stores
    return profile.stores;
  }, [profile.stores, profile.currentStoreId]);

  // Get all staff from active stores (filtered by selection)
  const visibleStaff = useMemo(() => {
    return activeStores.flatMap(store => {
      const storeStaff = getStaffByBuilding(store.name);
      // Add store info to each staff member for context
      return storeStaff.map(s => ({
        ...s,
        storeId: store.id,
        storeName: store.name,
      }));
    });
  }, [activeStores]);

  // Get staff IDs for task filtering
  const visibleStaffIds = useMemo(() => {
    return visibleStaff.map(s => s.id);
  }, [visibleStaff]);

  // Calculate aggregate stats across active stores
  const stats = useMemo(() => {
    const totalStores = activeStores.length;
    const totalStaff = visibleStaff.length;
    const totalTasks = 110 * totalStores; // 110 DWS tasks per store
    const avgTasksPerStaff = totalStaff > 0 ? Math.round(totalTasks / totalStaff) : 0;

    return {
      totalStores,
      totalStaff,
      totalTasks,
      avgTasksPerStaff,
      // Per-store breakdown
      storesBreakdown: activeStores.map(store => ({
        storeId: store.id,
        storeName: store.name,
        staffCount: getStaffByBuilding(store.name).length,
        taskCount: 110, // 110 tasks per store
      })),
    };
  }, [activeStores, visibleStaff]);

  return {
    // All accessible stores (for dropdowns)
    visibleStores: profile.stores,

    // Currently active stores (filtered by selection)
    activeStores,

    // Filtered staff list (with store context added)
    visibleStaff,

    // Staff IDs for filtering tasks/shifts
    visibleStaffIds,

    // Aggregated statistics
    stats,

    // Convenience flags
    isMultiStore: profile.stores.length > 1,
    isSingleStore: profile.stores.length === 1,
    isHQ: profile.role === 'hq',
    isStoreManager: profile.role === 'store-manager',
    isSI: profile.role === 'si',
    isAM: profile.role === 'am',
  };
}
