// ============================================
// ANALYTICS MOCK DATA FOR DEMO
// ============================================
// Sample data for Performance Analytics dashboard
// Based on WBS requirements for reporting and analytics

// ============================================
// 1. STAFF PERFORMANCE DATA
// ============================================

export interface StaffPerformanceData {
  staffId: string;
  staffName: string;
  tasksCompleted: number;
  completionRate: number;
  avgTime: number; // minutes
  efficiency: number;
}

export const staffPerformanceData: StaffPerformanceData[] = [
  { staffId: 'DEMO-001', staffName: 'Nguyen Van Nam', tasksCompleted: 312, completionRate: 96, avgTime: 35, efficiency: 98 },
  { staffId: 'DEMO-003', staffName: 'Le Van Cuong', tasksCompleted: 289, completionRate: 94, avgTime: 38, efficiency: 95 },
  { staffId: 'DEMO-002', staffName: 'Tran Thi Thuy', tasksCompleted: 275, completionRate: 93, avgTime: 40, efficiency: 92 },
  { staffId: 'DEMO-006', staffName: 'Pham Thi Linh', tasksCompleted: 258, completionRate: 91, avgTime: 42, efficiency: 90 },
  { staffId: 'DEMO-004', staffName: 'Do Van Binh', tasksCompleted: 245, completionRate: 89, avgTime: 45, efficiency: 88 },
  { staffId: 'SKY-001', staffName: 'Pham Van Thanh', tasksCompleted: 232, completionRate: 87, avgTime: 47, efficiency: 86 },
  { staffId: 'SKY-002', staffName: 'Nguyen Thi Lan', tasksCompleted: 221, completionRate: 85, avgTime: 48, efficiency: 84 },
  { staffId: 'SKY-003', staffName: 'Le Minh Duc', tasksCompleted: 208, completionRate: 83, avgTime: 50, efficiency: 82 },
];

// ============================================
// 2. COMPLETION RATE TREND DATA (LINE CHART)
// ============================================

export interface CompletionTrendData {
  date: string;
  completionRate: number;
  tasksCompleted: number;
  totalTasks: number;
}

export const completionTrendData: CompletionTrendData[] = [
  { date: '10/01', completionRate: 85, tasksCompleted: 935, totalTasks: 1100 },
  { date: '10/05', completionRate: 87, tasksCompleted: 957, totalTasks: 1100 },
  { date: '10/10', completionRate: 89, tasksCompleted: 979, totalTasks: 1100 },
  { date: '10/15', completionRate: 91, tasksCompleted: 1001, totalTasks: 1100 },
  { date: '10/20', completionRate: 93, tasksCompleted: 1023, totalTasks: 1100 },
  { date: '10/25', completionRate: 94, tasksCompleted: 1034, totalTasks: 1100 },
  { date: '10/30', completionRate: 96, tasksCompleted: 1056, totalTasks: 1100 },
];

// ============================================
// 3. CATEGORY PERFORMANCE DATA
// ============================================

export interface CategoryPerformanceData {
  category: string;
  tasksCompleted: number;
  avgTime: number; // minutes
  completionRate: number;
  targetTime: number; // standard time in minutes
}

export const categoryPerformanceData: CategoryPerformanceData[] = [
  { category: 'Shelf Display', tasksCompleted: 458, avgTime: 42, completionRate: 94, targetTime: 45 },
  { category: 'Inventory Check', tasksCompleted: 312, avgTime: 35, completionRate: 92, targetTime: 40 },
  { category: 'Customer Service', tasksCompleted: 289, avgTime: 28, completionRate: 96, targetTime: 30 },
  { category: 'Cleaning', tasksCompleted: 267, avgTime: 25, completionRate: 98, targetTime: 25 },
  { category: 'Stock Replenish', tasksCompleted: 245, avgTime: 38, completionRate: 91, targetTime: 40 },
  { category: 'Price Label', tasksCompleted: 198, avgTime: 20, completionRate: 95, targetTime: 22 },
  { category: 'Quality Check', tasksCompleted: 176, avgTime: 32, completionRate: 89, targetTime: 35 },
];

// ============================================
// 4. STORE COMPARISON DATA
// ============================================

export interface StorePerformanceData {
  storeId: string;
  storeName: string;
  tasksCompleted: number;
  completionRate: number;
  efficiency: number;
  totalStaff: number;
  avgTasksPerStaff: number;
}

export const storePerformanceData: StorePerformanceData[] = [
  { storeId: 'demo-01', storeName: 'Ocean Park Hawaii', tasksCompleted: 1982, completionRate: 93, efficiency: 95, totalStaff: 8, avgTasksPerStaff: 248 },
  { storeId: 'demo-02', storeName: 'Sky Oasis', tasksCompleted: 1543, completionRate: 89, efficiency: 91, totalStaff: 6, avgTasksPerStaff: 257 },
  { storeId: 'demo-03', storeName: 'Ecopark Rừng Cọ', tasksCompleted: 1421, completionRate: 86, efficiency: 88, totalStaff: 7, avgTasksPerStaff: 203 },
  { storeId: 'demo-04', storeName: 'Ecopark', tasksCompleted: 1298, completionRate: 83, efficiency: 85, totalStaff: 6, avgTasksPerStaff: 216 },
];

// ============================================
// 5. TIME-OF-DAY PERFORMANCE (HEATMAP DATA)
// ============================================

export interface TimeSlotPerformanceData {
  hour: number;
  dayOfWeek: string;
  tasksCompleted: number;
  efficiency: number;
}

export const timeSlotData: TimeSlotPerformanceData[] = [
  // Monday
  { hour: 8, dayOfWeek: 'Mon', tasksCompleted: 12, efficiency: 85 },
  { hour: 10, dayOfWeek: 'Mon', tasksCompleted: 15, efficiency: 92 },
  { hour: 12, dayOfWeek: 'Mon', tasksCompleted: 18, efficiency: 88 },
  { hour: 14, dayOfWeek: 'Mon', tasksCompleted: 20, efficiency: 95 },
  { hour: 16, dayOfWeek: 'Mon', tasksCompleted: 16, efficiency: 90 },
  // Tuesday
  { hour: 8, dayOfWeek: 'Tue', tasksCompleted: 14, efficiency: 87 },
  { hour: 10, dayOfWeek: 'Tue', tasksCompleted: 17, efficiency: 93 },
  { hour: 12, dayOfWeek: 'Tue', tasksCompleted: 19, efficiency: 89 },
  { hour: 14, dayOfWeek: 'Tue', tasksCompleted: 22, efficiency: 96 },
  { hour: 16, dayOfWeek: 'Tue', tasksCompleted: 18, efficiency: 91 },
  // Wednesday
  { hour: 8, dayOfWeek: 'Wed', tasksCompleted: 13, efficiency: 86 },
  { hour: 10, dayOfWeek: 'Wed', tasksCompleted: 16, efficiency: 94 },
  { hour: 12, dayOfWeek: 'Wed', tasksCompleted: 20, efficiency: 90 },
  { hour: 14, dayOfWeek: 'Wed', tasksCompleted: 21, efficiency: 97 },
  { hour: 16, dayOfWeek: 'Wed', tasksCompleted: 17, efficiency: 92 },
];

// ============================================
// 6. MONTHLY TREND DATA (MULTI-LINE)
// ============================================

export interface MonthlyTrendData {
  month: string;
  completionRate: number;
  efficiency: number;
  avgTasksPerDay: number;
}

export const monthlyTrendData: MonthlyTrendData[] = [
  { month: 'Apr', completionRate: 82, efficiency: 85, avgTasksPerDay: 95 },
  { month: 'May', completionRate: 84, efficiency: 87, avgTasksPerDay: 98 },
  { month: 'Jun', completionRate: 86, efficiency: 89, avgTasksPerDay: 102 },
  { month: 'Jul', completionRate: 88, efficiency: 91, avgTasksPerDay: 105 },
  { month: 'Aug', completionRate: 90, efficiency: 93, avgTasksPerDay: 108 },
  { month: 'Sep', completionRate: 92, efficiency: 94, avgTasksPerDay: 110 },
  { month: 'Oct', completionRate: 94, efficiency: 96, avgTasksPerDay: 112 },
];

// ============================================
// 7. AGGREGATE KPI DATA
// ============================================

export interface AggregateKPIData {
  totalTasks: number;
  totalTasksChange: number; // percentage change
  completionRate: number;
  completionRateChange: number;
  totalHours: number;
  totalHoursChange: number;
  avgEfficiency: number;
  avgEfficiencyChange: number;
  activeStores: number;
  activeStaff: number;
}

export const aggregateKPIs: AggregateKPIData = {
  totalTasks: 33420,
  totalTasksChange: 8.2,
  completionRate: 92.5,
  completionRateChange: 3.5,
  totalHours: 18450,
  totalHoursChange: 5.1,
  avgEfficiency: 91.3,
  avgEfficiencyChange: 4.2,
  activeStores: 26,
  activeStaff: 268,
};

// ============================================
// 8. TASK TYPE DISTRIBUTION
// ============================================

export interface TaskTypeDistribution {
  type: string;
  count: number;
  percentage: number;
  completionRate: number;
}

export const taskTypeDistribution: TaskTypeDistribution[] = [
  { type: 'DWS', count: 28600, percentage: 85.6, completionRate: 93 },
  { type: 'WS', count: 4820, percentage: 14.4, completionRate: 89 },
];

// ============================================
// 9. STAFF UTILIZATION DATA
// ============================================

export interface StaffUtilizationData {
  storeId: string;
  storeName: string;
  utilization: number; // percentage
  status: 'optimal' | 'underutilized' | 'overworked';
}

export const staffUtilizationData: StaffUtilizationData[] = [
  { storeId: 'demo-01', storeName: 'Ocean Park Hawaii', utilization: 87, status: 'optimal' },
  { storeId: 'demo-02', storeName: 'Sky Oasis', utilization: 92, status: 'overworked' },
  { storeId: 'demo-03', storeName: 'Ecopark Rừng Cọ', utilization: 78, status: 'optimal' },
  { storeId: 'demo-04', storeName: 'Ecopark', utilization: 65, status: 'underutilized' },
];

// ============================================
// 10. BOTTLENECK ANALYSIS DATA
// ============================================

export interface BottleneckData {
  category: string;
  avgCompletionTime: number; // minutes
  standardTime: number; // minutes
  variance: number; // percentage
  issueCount: number;
}

export const bottleneckData: BottleneckData[] = [
  { category: 'Stock Replenish', avgCompletionTime: 52, standardTime: 40, variance: 30, issueCount: 12 },
  { category: 'Quality Check', avgCompletionTime: 45, standardTime: 35, variance: 28.6, issueCount: 8 },
  { category: 'Shelf Display', avgCompletionTime: 54, standardTime: 45, variance: 20, issueCount: 15 },
  { category: 'Inventory Check', avgCompletionTime: 44, standardTime: 40, variance: 10, issueCount: 5 },
];
