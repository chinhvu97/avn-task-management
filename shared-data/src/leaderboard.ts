// ============================================
// LEADERBOARD MOCK DATA
// ============================================
// Shared leaderboard data for both staff-task-management and ai-hq-task-assignment
// This provides consistent ranking data across applications

import { LeaderboardEntry } from './types';

/**
 * Mock Leaderboard Entries - Staff Rankings
 * Used for demo and testing purposes
 * Uses actual staff from shared master data with realistic performance metrics
 */
export const mockLeaderboard: LeaderboardEntry[] = [
  // Top performers from different stores (using actual staff IDs and names)
  // Ocean Park Hawaii Building
  { staffId: 'DEMO-001', staffName: 'Nguyen Van Nam', tasksCompleted: 312, completionRate: 96, totalHours: 184, efficiency: 98, rank: 1 },
  { staffId: 'DEMO-003', staffName: 'Le Van Cuong', tasksCompleted: 289, completionRate: 94, totalHours: 176, efficiency: 95, rank: 2 },
  { staffId: 'DEMO-002', staffName: 'Tran Thi Thuy', tasksCompleted: 275, completionRate: 93, totalHours: 168, efficiency: 92, rank: 3 },
  { staffId: 'DEMO-006', staffName: 'Pham Thi Linh', tasksCompleted: 258, completionRate: 91, totalHours: 160, efficiency: 90, rank: 4 },
  { staffId: 'DEMO-004', staffName: 'Do Van Binh', tasksCompleted: 245, completionRate: 89, totalHours: 156, efficiency: 88, rank: 5 },

  // Sky Oasis
  { staffId: 'SKY-001', staffName: 'Pham Van Thanh', tasksCompleted: 232, completionRate: 87, totalHours: 152, efficiency: 86, rank: 6 },
  { staffId: 'SKY-002', staffName: 'Nguyen Thi Lan', tasksCompleted: 221, completionRate: 85, totalHours: 148, efficiency: 84, rank: 7 },
  { staffId: 'SKY-003', staffName: 'Le Minh Duc', tasksCompleted: 208, completionRate: 83, totalHours: 144, efficiency: 82, rank: 8 },

  // Ecopark Rừng Cọ
  { staffId: 'RC-001', staffName: 'Nguyen Van Khanh', tasksCompleted: 198, completionRate: 82, totalHours: 140, efficiency: 81, rank: 9 },
  { staffId: 'RC-002', staffName: 'Le Thi Phuong', tasksCompleted: 187, completionRate: 80, totalHours: 136, efficiency: 79, rank: 10 },

  // Ecopark
  { staffId: 'EP-001', staffName: 'Tran Van Hung', tasksCompleted: 176, completionRate: 78, totalHours: 132, efficiency: 77, rank: 11 },
  { staffId: 'EP-002', staffName: 'Nguyen Thi Mai', tasksCompleted: 165, completionRate: 76, totalHours: 128, efficiency: 75, rank: 12 },
];

/**
 * Store Performance Rankings
 * Used for HQ dashboard to compare store-level performance
 */
export interface StoreLeaderboardEntry {
  rank: number;
  storeId: string;
  storeName: string;
  tasksCompleted: number;
  completionRate: number;    // Percentage (0-100)
  efficiency: number;         // Percentage (0-100)
  totalStaff?: number;
}

export const mockStoreLeaderboard: StoreLeaderboardEntry[] = [
  { rank: 1, storeId: 'demo-01', storeName: 'AEON MAXVALU OCEAN PARK HAWAII BUILDING', tasksCompleted: 1982, completionRate: 93, efficiency: 95, totalStaff: 8 },
  { rank: 2, storeId: 'demo-02', storeName: 'AEON MAXVALU SKY OASIS', tasksCompleted: 1543, completionRate: 89, efficiency: 91, totalStaff: 6 },
  { rank: 3, storeId: 'demo-03', storeName: 'AEON MAXVALU ECOPARK RỪNG CỌ', tasksCompleted: 1421, completionRate: 86, efficiency: 88, totalStaff: 7 },
  { rank: 4, storeId: 'demo-04', storeName: 'AEON MAXVALU ECOPARK', tasksCompleted: 1298, completionRate: 83, efficiency: 85, totalStaff: 6 },
];

/**
 * Helper function to get leaderboard by scope
 * @param scope - 'store' | 'regional' | 'global'
 * @param storeId - Optional store ID for store-level filtering
 */
export function getLeaderboardByScope(
  scope: 'store' | 'regional' | 'global',
  storeId?: string
): LeaderboardEntry[] {
  if (scope === 'store' && storeId) {
    // Filter by store - would normally query by staff's storeId
    // For now, return top performers (store filtering needs staff-store mapping)
    return mockLeaderboard.slice(0, 5);
  } else if (scope === 'regional') {
    // Regional scope - include regional managers and top store performers
    return mockLeaderboard.filter(entry =>
      entry.staffId.startsWith('r') || entry.rank <= 10
    );
  } else {
    // Global scope - all staff
    return mockLeaderboard;
  }
}

/**
 * Helper function to get top N performers
 */
export function getTopPerformers(limit: number = 3): LeaderboardEntry[] {
  return mockLeaderboard.slice(0, limit);
}

/**
 * Helper function to calculate points from metrics
 * Points formula: (tasksCompleted * 5) + (completionRate * 10) + (efficiency * 5)
 */
export function calculatePoints(entry: LeaderboardEntry): number {
  return Math.round(
    (entry.tasksCompleted * 5) +
    (entry.completionRate * 10) +
    (entry.efficiency * 5)
  );
}

/**
 * Extended leaderboard entry with additional display fields for HQ app
 */
export interface ExtendedLeaderboardEntry extends LeaderboardEntry {
  points?: number;
  avatar?: string;
  store?: string;
}

/**
 * Convert basic leaderboard entry to extended format for HQ display
 */
export function extendLeaderboardEntry(
  entry: LeaderboardEntry,
  avatarUrl?: string,
  storeName?: string
): ExtendedLeaderboardEntry {
  return {
    ...entry,
    points: calculatePoints(entry),
    avatar: avatarUrl,
    store: storeName,
  };
}
