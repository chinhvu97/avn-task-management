// ============================================
// SHARED TYPES FOR HQ AND STAFF APPS
// ============================================

// Task Status (must match both apps)
export type TaskStatus = 'Open' | 'Processing' | 'Pending' | 'Awaiting Approval' | 'Done' | 'Cancelled';

// Task Types
export type TaskType = 'DWS' | 'WS';

// View Mode (for Staff app)
export type ViewMode = 'timeline' | 'kanban' | 'list';

// AI Verification Status
export type AIVerificationStatus = 'pending' | 'passed' | 'failed' | 'not_required';

// Priority Level
export type Priority = 'High' | 'Medium' | 'Low';

// Time of Day
export type TimeOfDay = 'Morning' | 'Afternoon' | 'Evening';

// Recurrence Type
export type RecurrenceType = 'daily' | 'event-based';

// ============================================
// TASK INTERFACES
// ============================================

/**
 * Task Template - Used by HQ to define DWS/WS task templates
 */
export interface TaskTemplate {
  id: number | string;
  code: string;
  title: string;
  type: TaskType;
  category?: string;              // DWS: "POS Operations", "Inventory", etc.
  event?: string;                 // WS: "Women's Day", "Lunar New Year", etc.
  estimatedMinutes: number;
  description: string;
  manualGuide?: string;           // DWS: Manual reference (e.g., "1.1.1")
  manualLink?: string;            // DWS: Link to manual
  priority?: Priority;
  timeOfDay?: TimeOfDay;
  recurrence: RecurrenceType;
  requiresHQApproval: boolean;    // WS: If false, AI approval is final
  sampleImages?: string[];        // WS: Reference images for guidance
  isActive: boolean;
  order?: number;                 // Display order
}

/**
 * Task Instance - Actual task assigned to staff
 */
export interface Task {
  id: string;
  title: string;
  staffId: string;
  status: TaskStatus;
  type: TaskType;
  startTime: string;              // "HH:MM"
  endTime: string;                // "HH:MM"
  estimatedMinutes: number;
  actualMinutes?: number;
  description?: string;
  date: string;                   // ISO date string (YYYY-MM-DD)

  // DWS task specific fields
  guide?: string;                 // Manual reference (e.g., "1.1.1")

  // WS task specific fields
  sampleImages?: string[];        // Reference photos for guidance (max 5)
  completionPhotos?: string[];    // Photos uploaded by staff (max 5)
  aiVerificationStatus?: AIVerificationStatus;
  aiVerificationMessage?: string;
  requiresHQApproval?: boolean;   // If false, AI approval is final
  autoApproved?: boolean;         // True if AI approved without HQ review

  // Cancellation
  cancellationReason?: string;    // Reason provided when task is cancelled

  // Template reference (links to TaskTemplate)
  templateId?: string | number;
}

// ============================================
// STAFF INTERFACES
// ============================================

/**
 * Staff Member
 */
export interface Staff {
  id: string;
  name: string;
  role?: string;                  // Optional: Used by HQ app for role assignment
  shiftStart: string;             // "HH:MM"
  shiftEnd: string;               // "HH:MM"
  taskAssignmentPercentage: number;
  building: string;               // e.g., "Hawaii Building", "Tower A"
  city: string;                   // e.g., "Ocean Park", "Hanoi"
  region: string;                 // e.g., "Ocean Park", "Hanoi Region"
  skills?: string[];              // e.g., ["POS", "Customer Service"]
  avatar?: string;                // Image URL or import
}

// ============================================
// SHIFT INTERFACES
// ============================================

/**
 * Shift Schedule
 */
export interface Shift {
  id: string;
  staffId: string;
  date: string;                   // ISO date string
  scheduledStart: string;         // "HH:MM"
  scheduledEnd: string;           // "HH:MM"
  actualCheckIn?: string;         // "HH:MM"
  actualCheckOut?: string;        // "HH:MM"
  isOff: boolean;
  shiftName?: string;             // e.g., "Morning", "Evening", "Night"
  taskAssignmentPercentage?: number; // Daily task completion percentage
}

// ============================================
// LEADERBOARD INTERFACES
// ============================================

/**
 * Leaderboard Entry
 */
export interface LeaderboardEntry {
  staffId: string;
  staffName: string;
  tasksCompleted: number;
  completionRate: number;         // Percentage (0-100)
  totalHours: number;
  efficiency: number;             // Percentage (0-100)
  rank: number;
}

// ============================================
// STORE INTERFACES
// ============================================

/**
 * Store Information
 */
export interface Store {
  id: string;
  name: string;
  city: string;
  region: string;
}

// ============================================
// AI SCENARIO INTERFACES (HQ APP)
// ============================================

/**
 * AI Task Assignment Scenario
 */
export interface AIScenario {
  id: string;
  name: string;
  description: string;
  icon: string;                   // lucide-react icon name
  iconColor: string;
  metrics: {
    workload: number;             // Percentage (0-100)
    timeEst: string;              // e.g., "7.5h"
    satisfaction: number;         // Percentage (0-100)
    success: number;              // Percentage (0-100)
  };
  tags: string[];
}

// ============================================
// API RESPONSE INTERFACES
// ============================================

/**
 * Generic API Response
 */
export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Task Assignment Response
 */
export interface TaskAssignmentResponse {
  success: boolean;
  count: number;
  tasks?: Task[];
  error?: string;
}

/**
 * Task Update Response
 */
export interface TaskUpdateResponse {
  success: boolean;
  task?: Task;
  error?: string;
}
