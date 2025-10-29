// ============================================
// STAFF MASTER DATA (All AEON Vietnam Staff)
// ============================================
// Single source of truth for all staff information
// Used by both HQ app and Staff app

import { Staff } from '../types';

/**
 * Master list of staff members across all AEON Vietnam stores
 * Organized by store location
 */

// ============================================
// AEON MAXVALU OCEAN PARK HAWAII BUILDING (Store ID: demo-01)
// MAIN DEMO STORE - Full workflow demonstration
// ============================================
const oceanParkHawaiiStaff: Staff[] = [
  {
    id: 'DEMO-001',
    name: 'Nguyen Van Nam',
    role: 'Store Manager',
    shiftStart: '07:00',
    shiftEnd: '16:00',
    taskAssignmentPercentage: 95,
    building: 'AEON MAXVALU OCEAN PARK HAWAII BUILDING',
    city: 'Ocean Park',
    region: 'South',
    skills: ['Leadership', 'POS', 'Inventory', 'Customer Service'],
  },
  {
    id: 'DEMO-002',
    name: 'Tran Thi Thuy',
    role: 'Floor Manager',
    shiftStart: '08:00',
    shiftEnd: '17:00',
    taskAssignmentPercentage: 92,
    building: 'AEON MAXVALU OCEAN PARK HAWAII BUILDING',
    city: 'Ocean Park',
    region: 'South',
    skills: ['POS', 'Customer Service', 'Merchandising', 'Leadership'],
  },
  {
    id: 'DEMO-003',
    name: 'Le Van Cuong',
    role: 'Sales Associate',
    shiftStart: '09:00',
    shiftEnd: '18:00',
    taskAssignmentPercentage: 88,
    building: 'AEON MAXVALU OCEAN PARK HAWAII BUILDING',
    city: 'Ocean Park',
    region: 'South',
    skills: ['Customer Service', 'Merchandising', 'POS'],
  },
  {
    id: 'DEMO-004',
    name: 'Do Van Binh',
    role: 'Cashier',
    shiftStart: '07:00',
    shiftEnd: '16:00',
    taskAssignmentPercentage: 90,
    building: 'AEON MAXVALU OCEAN PARK HAWAII BUILDING',
    city: 'Ocean Park',
    region: 'South',
    skills: ['POS', 'Cash Handling', 'Customer Service'],
  },
  {
    id: 'DEMO-005',
    name: 'Tran Van Minh',
    role: 'Stock Clerk',
    shiftStart: '08:00',
    shiftEnd: '17:00',
    taskAssignmentPercentage: 85,
    building: 'AEON MAXVALU OCEAN PARK HAWAII BUILDING',
    city: 'Ocean Park',
    region: 'South',
    skills: ['Inventory', 'Stocking', 'Organization'],
  },
  {
    id: 'DEMO-006',
    name: 'Pham Thi Linh',
    role: 'Sales Associate',
    shiftStart: '09:00',
    shiftEnd: '20:00',
    taskAssignmentPercentage: 87,
    building: 'AEON MAXVALU OCEAN PARK HAWAII BUILDING',
    city: 'Ocean Park',
    region: 'South',
    skills: ['Customer Service', 'Merchandising', 'Cleaning'],
  },
  {
    id: 'DEMO-007',
    name: 'Hoang Minh Huy',
    role: 'Cashier',
    shiftStart: '08:00',
    shiftEnd: '20:00',
    taskAssignmentPercentage: 89,
    building: 'AEON MAXVALU OCEAN PARK HAWAII BUILDING',
    city: 'Ocean Park',
    region: 'South',
    skills: ['POS', 'Cash Handling', 'Customer Service'],
  },
  {
    id: 'DEMO-008',
    name: 'Vu Thi Mai',
    role: 'Floor Manager',
    shiftStart: '10:00',
    shiftEnd: '18:00',
    taskAssignmentPercentage: 91,
    building: 'AEON MAXVALU OCEAN PARK HAWAII BUILDING',
    city: 'Ocean Park',
    region: 'South',
    skills: ['POS', 'Customer Service', 'Inventory', 'Leadership'],
  },
];

// ============================================
// AEON MAXVALU SKY OASIS (Store ID: demo-02)
// ============================================
const skyOasisStaff: Staff[] = [
  {
    id: 'SKY-001',
    name: 'Pham Van Thanh',
    role: 'Store Manager',
    shiftStart: '07:00',
    shiftEnd: '16:00',
    taskAssignmentPercentage: 94,
    building: 'AEON MAXVALU SKY OASIS',
    city: 'Sky Oasis',
    region: 'North',
    skills: ['Leadership', 'POS', 'Inventory', 'Customer Service'],
  },
  {
    id: 'SKY-002',
    name: 'Nguyen Thi Lan',
    role: 'Floor Manager',
    shiftStart: '08:00',
    shiftEnd: '17:00',
    taskAssignmentPercentage: 91,
    building: 'AEON MAXVALU SKY OASIS',
    city: 'Sky Oasis',
    region: 'North',
    skills: ['POS', 'Customer Service', 'Merchandising', 'Leadership'],
  },
  {
    id: 'SKY-003',
    name: 'Le Minh Duc',
    role: 'Sales Associate',
    shiftStart: '09:00',
    shiftEnd: '18:00',
    taskAssignmentPercentage: 87,
    building: 'AEON MAXVALU SKY OASIS',
    city: 'Sky Oasis',
    region: 'North',
    skills: ['Customer Service', 'Merchandising', 'POS'],
  },
  {
    id: 'SKY-004',
    name: 'Tran Thi Huong',
    role: 'Cashier',
    shiftStart: '07:00',
    shiftEnd: '16:00',
    taskAssignmentPercentage: 89,
    building: 'AEON MAXVALU SKY OASIS',
    city: 'Sky Oasis',
    region: 'North',
    skills: ['POS', 'Cash Handling', 'Customer Service'],
  },
  {
    id: 'SKY-005',
    name: 'Vu Van Hai',
    role: 'Stock Clerk',
    shiftStart: '08:00',
    shiftEnd: '17:00',
    taskAssignmentPercentage: 84,
    building: 'AEON MAXVALU SKY OASIS',
    city: 'Sky Oasis',
    region: 'North',
    skills: ['Inventory', 'Stocking', 'Organization'],
  },
  {
    id: 'SKY-006',
    name: 'Hoang Thi Nga',
    role: 'Sales Associate',
    shiftStart: '09:00',
    shiftEnd: '20:00',
    taskAssignmentPercentage: 86,
    building: 'AEON MAXVALU SKY OASIS',
    city: 'Sky Oasis',
    region: 'North',
    skills: ['Customer Service', 'Merchandising', 'Cleaning'],
  },
];

// ============================================
// AEON MAXVALU ECOPARK RỪNG CỌ (Store ID: demo-03)
// ============================================
const ecoparkRungCoStaff: Staff[] = [
  {
    id: 'RC-001',
    name: 'Nguyen Van Khanh',
    role: 'Store Manager',
    shiftStart: '07:00',
    shiftEnd: '16:00',
    taskAssignmentPercentage: 93,
    building: 'AEON MAXVALU ECOPARK RỪNG CỌ',
    city: 'Ecopark',
    region: 'North',
    skills: ['Leadership', 'POS', 'Inventory', 'Customer Service'],
  },
  {
    id: 'RC-002',
    name: 'Le Thi Phuong',
    role: 'Floor Manager',
    shiftStart: '08:00',
    shiftEnd: '17:00',
    taskAssignmentPercentage: 90,
    building: 'AEON MAXVALU ECOPARK RỪNG CỌ',
    city: 'Ecopark',
    region: 'North',
    skills: ['POS', 'Customer Service', 'Merchandising', 'Leadership'],
  },
  {
    id: 'RC-003',
    name: 'Tran Minh Quan',
    role: 'Sales Associate',
    shiftStart: '09:00',
    shiftEnd: '18:00',
    taskAssignmentPercentage: 86,
    building: 'AEON MAXVALU ECOPARK RỪNG CỌ',
    city: 'Ecopark',
    region: 'North',
    skills: ['Customer Service', 'Merchandising', 'POS'],
  },
  {
    id: 'RC-004',
    name: 'Pham Thi Hoa',
    role: 'Cashier',
    shiftStart: '07:00',
    shiftEnd: '16:00',
    taskAssignmentPercentage: 88,
    building: 'AEON MAXVALU ECOPARK RỪNG CỌ',
    city: 'Ecopark',
    region: 'North',
    skills: ['POS', 'Cash Handling', 'Customer Service'],
  },
  {
    id: 'RC-005',
    name: 'Do Van Long',
    role: 'Stock Clerk',
    shiftStart: '08:00',
    shiftEnd: '17:00',
    taskAssignmentPercentage: 83,
    building: 'AEON MAXVALU ECOPARK RỪNG CỌ',
    city: 'Ecopark',
    region: 'North',
    skills: ['Inventory', 'Stocking', 'Organization'],
  },
  {
    id: 'RC-006',
    name: 'Vu Thi Thu',
    role: 'Sales Associate',
    shiftStart: '09:00',
    shiftEnd: '20:00',
    taskAssignmentPercentage: 85,
    building: 'AEON MAXVALU ECOPARK RỪNG CỌ',
    city: 'Ecopark',
    region: 'North',
    skills: ['Customer Service', 'Merchandising', 'Cleaning'],
  },
  {
    id: 'RC-007',
    name: 'Hoang Van Nam',
    role: 'Cashier',
    shiftStart: '08:00',
    shiftEnd: '20:00',
    taskAssignmentPercentage: 87,
    building: 'AEON MAXVALU ECOPARK RỪNG CỌ',
    city: 'Ecopark',
    region: 'North',
    skills: ['POS', 'Cash Handling', 'Customer Service'],
  },
];

// ============================================
// AEON MAXVALU ECOPARK (Store ID: demo-04)
// ============================================
const ecoparkStaff: Staff[] = [
  {
    id: 'EP-001',
    name: 'Tran Van Hung',
    role: 'Store Manager',
    shiftStart: '07:00',
    shiftEnd: '16:00',
    taskAssignmentPercentage: 92,
    building: 'AEON MAXVALU ECOPARK',
    city: 'Ecopark',
    region: 'North',
    skills: ['Leadership', 'POS', 'Inventory', 'Customer Service'],
  },
  {
    id: 'EP-002',
    name: 'Nguyen Thi Mai',
    role: 'Floor Manager',
    shiftStart: '08:00',
    shiftEnd: '17:00',
    taskAssignmentPercentage: 89,
    building: 'AEON MAXVALU ECOPARK',
    city: 'Ecopark',
    region: 'North',
    skills: ['POS', 'Customer Service', 'Merchandising', 'Leadership'],
  },
  {
    id: 'EP-003',
    name: 'Le Van Tung',
    role: 'Sales Associate',
    shiftStart: '09:00',
    shiftEnd: '18:00',
    taskAssignmentPercentage: 85,
    building: 'AEON MAXVALU ECOPARK',
    city: 'Ecopark',
    region: 'North',
    skills: ['Customer Service', 'Merchandising', 'POS'],
  },
  {
    id: 'EP-004',
    name: 'Pham Thi Thao',
    role: 'Cashier',
    shiftStart: '07:00',
    shiftEnd: '16:00',
    taskAssignmentPercentage: 87,
    building: 'AEON MAXVALU ECOPARK',
    city: 'Ecopark',
    region: 'North',
    skills: ['POS', 'Cash Handling', 'Customer Service'],
  },
  {
    id: 'EP-005',
    name: 'Do Minh Son',
    role: 'Stock Clerk',
    shiftStart: '08:00',
    shiftEnd: '17:00',
    taskAssignmentPercentage: 82,
    building: 'AEON MAXVALU ECOPARK',
    city: 'Ecopark',
    region: 'North',
    skills: ['Inventory', 'Stocking', 'Organization'],
  },
  {
    id: 'EP-006',
    name: 'Vu Thi Linh',
    role: 'Sales Associate',
    shiftStart: '09:00',
    shiftEnd: '20:00',
    taskAssignmentPercentage: 84,
    building: 'AEON MAXVALU ECOPARK',
    city: 'Ecopark',
    region: 'North',
    skills: ['Customer Service', 'Merchandising', 'Cleaning'],
  },
];

// ============================================
// EXPORT ALL STAFF
// ============================================

/**
 * Master list of all staff members (27 total across 4 stores)
 */
export const staff: Staff[] = [
  ...oceanParkHawaiiStaff,    // AEON MAXVALU OCEAN PARK HAWAII BUILDING - 8 staff
  ...skyOasisStaff,           // AEON MAXVALU SKY OASIS - 6 staff
  ...ecoparkRungCoStaff,      // AEON MAXVALU ECOPARK RỪNG CỌ - 7 staff
  ...ecoparkStaff,            // AEON MAXVALU ECOPARK - 6 staff
];

/**
 * Get staff by store/building name
 */
export function getStaffByBuilding(building: string): Staff[] {
  return staff.filter(s => s.building === building);
}

/**
 * Get staff by city
 */
export function getStaffByCity(city: string): Staff[] {
  return staff.filter(s => s.city === city);
}

/**
 * Get staff by region
 */
export function getStaffByRegion(region: string): Staff[] {
  return staff.filter(s => s.region === region);
}

/**
 * Get staff by role
 */
export function getStaffByRole(role: string): Staff[] {
  return staff.filter(s => s.role === role);
}

/**
 * Get staff by ID
 */
export function getStaffById(id: string): Staff | undefined {
  return staff.find(s => s.id === id);
}

/**
 * Get all unique roles
 */
export function getRoles(): string[] {
  return Array.from(new Set(staff.map(s => s.role).filter((r): r is string => r !== undefined)));
}

/**
 * Get all unique buildings
 */
export function getBuildings(): string[] {
  return Array.from(new Set(staff.map(s => s.building)));
}
