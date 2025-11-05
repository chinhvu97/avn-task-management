import { ChevronRight, BarChart3, TrendingUp, Users, Clock, Award, Target, TrendingDown, Activity } from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from 'recharts';

// Import data from shared-data
import { mockStoreLeaderboard } from 'shared-data';
import { useRole, getCurrentStore } from '../contexts/RoleContext';
import { RoleIndicator } from '../components/RoleIndicator';
import { StoreSelector } from '../components/StoreSelector';
import { useRoleBasedData } from '../hooks/useRoleBasedData';
import { useMemo } from 'react';

// Helper: Generate consistent random number based on seed
const seededRandom = (seed: number, min: number, max: number) => {
  const x = Math.sin(seed) * 10000;
  const random = x - Math.floor(x);
  return Math.floor(random * (max - min + 1)) + min;
};

// KPI targets
const kpiTargets = {
  completionRateTarget: 90,
  efficiencyTarget: 88,
  avgTimeReduction: 15, // percentage
};

export default function Performance() {
  const { profile } = useRole();
  const currentStore = getCurrentStore(profile);
  const { isMultiStore, stats: roleStats, visibleStores } = useRoleBasedData();

  // Generate seed from current store ID for consistent but different data per store
  const storeSeed = currentStore ? parseInt(currentStore.id.replace(/\D/g, ''), 10) || 1 : 1;

  // Generate store-specific KPIs based on current store
  const aggregateKPIs = useMemo(() => ({
    totalTasks: roleStats.totalTasks,
    totalTasksChange: 8.2,
    completionRate: seededRandom(storeSeed, 88, 96),
    completionRateChange: 3.5,
    totalHours: roleStats.totalStaff * 9 * 30, // staff * 9h/day * 30 days
    totalHoursChange: 5.1,
    avgEfficiency: seededRandom(storeSeed + 1, 88, 98),
    avgEfficiencyChange: 4.2,
    activeStores: roleStats.totalStores,
    totalStaff: roleStats.totalStaff,
  }), [roleStats, storeSeed]);

  // Weekly completion trend - dynamic based on store
  const completionTrendData = useMemo(() => [
    { date: 'Week 1', completionRate: seededRandom(storeSeed + 10, 82, 87), target: 90, tasksCompleted: roleStats.totalTasks * 0.13 },
    { date: 'Week 2', completionRate: seededRandom(storeSeed + 11, 84, 89), target: 90, tasksCompleted: roleStats.totalTasks * 0.14 },
    { date: 'Week 3', completionRate: seededRandom(storeSeed + 12, 86, 91), target: 90, tasksCompleted: roleStats.totalTasks * 0.14 },
    { date: 'Week 4', completionRate: seededRandom(storeSeed + 13, 88, 93), target: 90, tasksCompleted: roleStats.totalTasks * 0.15 },
    { date: 'Week 5', completionRate: seededRandom(storeSeed + 14, 90, 95), target: 90, tasksCompleted: roleStats.totalTasks * 0.15 },
    { date: 'Week 6', completionRate: seededRandom(storeSeed + 15, 91, 96), target: 90, tasksCompleted: roleStats.totalTasks * 0.14 },
    { date: 'Week 7', completionRate: seededRandom(storeSeed + 16, 93, 98), target: 90, tasksCompleted: roleStats.totalTasks * 0.15 },
  ], [storeSeed, roleStats.totalTasks]);

  // Category performance - dynamic based on store
  const categoryPerformanceData = useMemo(() => {
    const categories = [
      { category: 'Shelf Display', targetTime: 45 },
      { category: 'Inventory', targetTime: 40 },
      { category: 'Customer Service', targetTime: 30 },
      { category: 'Cleaning', targetTime: 25 },
      { category: 'Stock Replenish', targetTime: 40 },
      { category: 'Price Label', targetTime: 22 },
    ];

    return categories.map((cat, idx) => ({
      ...cat,
      avgTime: seededRandom(storeSeed + 20 + idx, cat.targetTime - 5, cat.targetTime + 2),
      completionRate: seededRandom(storeSeed + 30 + idx, 88, 98),
      performance: seededRandom(storeSeed + 40 + idx, 95, 115),
      tasks: Math.round(roleStats.totalTasks * (0.15 + idx * 0.02)),
    })).sort((a, b) => b.completionRate - a.completionRate);
  }, [storeSeed, roleStats.totalTasks]);

  // Monthly trend - dynamic based on store
  const monthlyTrendData = useMemo(() => [
    { month: 'Apr', completionRate: seededRandom(storeSeed + 50, 78, 84), efficiency: seededRandom(storeSeed + 60, 82, 87), satisfaction: seededRandom(storeSeed + 70, 77, 82) },
    { month: 'May', completionRate: seededRandom(storeSeed + 51, 81, 86), efficiency: seededRandom(storeSeed + 61, 84, 89), satisfaction: seededRandom(storeSeed + 71, 80, 85) },
    { month: 'Jun', completionRate: seededRandom(storeSeed + 52, 83, 88), efficiency: seededRandom(storeSeed + 62, 86, 91), satisfaction: seededRandom(storeSeed + 72, 82, 87) },
    { month: 'Jul', completionRate: seededRandom(storeSeed + 53, 85, 90), efficiency: seededRandom(storeSeed + 63, 88, 93), satisfaction: seededRandom(storeSeed + 73, 84, 89) },
    { month: 'Aug', completionRate: seededRandom(storeSeed + 54, 87, 92), efficiency: seededRandom(storeSeed + 64, 90, 95), satisfaction: seededRandom(storeSeed + 74, 86, 91) },
    { month: 'Sep', completionRate: seededRandom(storeSeed + 55, 89, 94), efficiency: seededRandom(storeSeed + 65, 91, 96), satisfaction: seededRandom(storeSeed + 75, 88, 93) },
    { month: 'Oct', completionRate: seededRandom(storeSeed + 56, 91, 96), efficiency: seededRandom(storeSeed + 66, 93, 98), satisfaction: seededRandom(storeSeed + 76, 90, 95) },
  ], [storeSeed]);

  // Peak hours - dynamic based on store
  const peakHoursData = useMemo(() => [
    { hour: '08:00', taskCount: seededRandom(storeSeed + 80, 40, 50), efficiency: seededRandom(storeSeed + 90, 78, 85) },
    { hour: '09:00', taskCount: seededRandom(storeSeed + 81, 60, 75), efficiency: seededRandom(storeSeed + 91, 85, 91) },
    { hour: '10:00', taskCount: seededRandom(storeSeed + 82, 85, 98), efficiency: seededRandom(storeSeed + 92, 90, 96) },
    { hour: '11:00', taskCount: seededRandom(storeSeed + 83, 78, 90), efficiency: seededRandom(storeSeed + 93, 87, 93) },
    { hour: '12:00', taskCount: seededRandom(storeSeed + 84, 58, 70), efficiency: seededRandom(storeSeed + 94, 72, 82) },
    { hour: '13:00', taskCount: seededRandom(storeSeed + 85, 50, 65), efficiency: seededRandom(storeSeed + 95, 70, 78) },
    { hour: '14:00', taskCount: seededRandom(storeSeed + 86, 80, 93), efficiency: seededRandom(storeSeed + 96, 88, 95) },
    { hour: '15:00', taskCount: seededRandom(storeSeed + 87, 88, 100), efficiency: seededRandom(storeSeed + 97, 92, 98) },
    { hour: '16:00', taskCount: seededRandom(storeSeed + 88, 75, 88), efficiency: seededRandom(storeSeed + 98, 85, 92) },
    { hour: '17:00', taskCount: seededRandom(storeSeed + 89, 45, 58), efficiency: seededRandom(storeSeed + 99, 80, 87) },
  ], [storeSeed]);

  // Store radar data - only for multi-store roles
  const storeRadarData = useMemo(() => {
    if (!isMultiStore) return [];
    return mockStoreLeaderboard
      .filter(store => visibleStores.some(s => s.name === store.storeName))
      .map(store => ({
        store: store.storeName.split(' ').slice(-2).join(' '),
        completionRate: store.completionRate,
        efficiency: store.efficiency,
        taskVolume: Math.round((store.tasksCompleted / 20)),
        staffUtilization: store.totalStaff ? Math.round((store.tasksCompleted / store.totalStaff) / 3) : 0,
      }));
  }, [isMultiStore, visibleStores]);

  const COLORS = {
    primary: '#D61F69',
    secondary: '#8B5CF6',
    success: '#10B981',
    warning: '#F59E0B',
    info: '#3B82F6',
    gray: '#6B7280',
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Role Indicator */}
      <RoleIndicator />

      {/* Store Selector - Only for multi-store roles */}
      {isMultiStore && (
        <div className="mb-6">
          <StoreSelector />
        </div>
      )}

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-6">
        <span className="text-gray-500">Analytics</span>
        <ChevronRight className="w-4 h-4 text-gray-500" />
        <span className="text-gray-800 font-medium">Performance Analytics</span>
      </div>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Performance Analytics Dashboard</h1>
        <p className="text-gray-600">Real-time operational insights across 26 stores and 268 staff members</p>
      </div>

      {/* ============================================ */}
      {/* ENHANCED KPI CARDS WITH TARGETS */}
      {/* ============================================ */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-2 border-pink-500">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-medium text-gray-700">Total Tasks</div>
            <BarChart3 className="w-5 h-5 text-pink-600 opacity-80" />
          </div>
          <div className="text-3xl font-bold text-gray-800 mb-3">
            {(aggregateKPIs.totalTasks / 1000).toFixed(1)}K
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span>+{aggregateKPIs.totalTasksChange}% vs last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-2 border-green-500">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-medium text-gray-700">Completion Rate</div>
            <Target className="w-5 h-5 text-green-600 opacity-80" />
          </div>
          <div className="text-3xl font-bold text-gray-800 mb-3">
            {aggregateKPIs.completionRate}%
          </div>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span>+{aggregateKPIs.completionRateChange}%</span>
            </div>
            <span className="text-gray-500">Target: {kpiTargets.completionRateTarget}%</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-2 border-blue-500">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-medium text-gray-700">Total Hours</div>
            <Clock className="w-5 h-5 text-blue-600 opacity-80" />
          </div>
          <div className="text-3xl font-bold text-gray-800 mb-3">
            {(aggregateKPIs.totalHours / 1000).toFixed(1)}K
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span>+{aggregateKPIs.totalHoursChange}% productivity</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-2 border-purple-500">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-medium text-gray-700">Avg Efficiency</div>
            <Award className="w-5 h-5 text-purple-600 opacity-80" />
          </div>
          <div className="text-3xl font-bold text-gray-800 mb-3">
            {aggregateKPIs.avgEfficiency}%
          </div>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span>+{aggregateKPIs.avgEfficiencyChange}%</span>
            </div>
            <span className="text-gray-500">Target: {kpiTargets.efficiencyTarget}%</span>
          </div>
        </div>
      </div>

      {/* ============================================ */}
      {/* TWO COLUMN: COMPLETION TREND + CATEGORY PERFORMANCE */}
      {/* ============================================ */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Completion Rate Trend with Target Line */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-gray-800 mb-1">Completion Rate Trend</h2>
            <p className="text-sm text-gray-500">Weekly performance vs 90% target benchmark</p>
          </div>
          <div style={{ width: '100%', height: 280 }}>
            <ResponsiveContainer>
              <ComposedChart data={completionTrendData}>
                <defs>
                  <linearGradient id="colorCompletion" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#9ca3af" style={{ fontSize: 11 }} />
                <YAxis stroke="#9ca3af" style={{ fontSize: 11 }} domain={[75, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Area
                  type="monotone"
                  dataKey="completionRate"
                  fill="url(#colorCompletion)"
                  stroke="none"
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="#F59E0B"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  name="Target (90%)"
                />
                <Line
                  type="monotone"
                  dataKey="completionRate"
                  stroke="#10B981"
                  strokeWidth={3}
                  dot={{ fill: '#10B981', r: 5, strokeWidth: 2, stroke: '#fff' }}
                  name="Actual Rate"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Performance with Completion Rate */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-gray-800 mb-1">Category Performance Ranking</h2>
            <p className="text-sm text-gray-500">Sorted by completion rate • Showing time efficiency</p>
          </div>
          <div className="space-y-3">
            {categoryPerformanceData.map((cat, index) => (
              <div key={cat.category} className="relative">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-700">{cat.category}</span>
                    {cat.avgTime <= cat.targetTime && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">✓ On Target</span>
                    )}
                  </div>
                  <span className="text-lg font-bold text-pink-600">{cat.completionRate}%</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                  <span className="font-medium">Avg: {cat.avgTime}min</span>
                  <span>•</span>
                  <span className="font-medium">Target: {cat.targetTime}min</span>
                  <span>•</span>
                  <span className={cat.avgTime <= cat.targetTime ? 'text-green-600 font-semibold' : 'text-orange-600 font-semibold'}>
                    {cat.avgTime <= cat.targetTime ? `${cat.targetTime - cat.avgTime}min faster` : `${cat.avgTime - cat.targetTime}min over`}
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div
                    className="h-2.5 rounded-full transition-all duration-500"
                    style={{
                      width: `${cat.completionRate}%`,
                      background: index === 0 ? 'linear-gradient(to right, #10B981, #059669)' :
                                 index === 1 ? 'linear-gradient(to right, #3B82F6, #2563EB)' :
                                 'linear-gradient(to right, #8B5CF6, #7C3AED)'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ============================================ */}
      {/* PEAK HOURS ANALYSIS + STORE RADAR */}
      {/* ============================================ */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Peak Hours Analysis */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-gray-800 mb-1">Peak Performance Hours</h2>
            <p className="text-sm text-gray-500">Task completion volume and efficiency by hour</p>
          </div>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <ComposedChart data={peakHoursData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="hour" stroke="#9ca3af" style={{ fontSize: 10 }} />
                <YAxis yAxisId="left" stroke="#9ca3af" style={{ fontSize: 11 }} />
                <YAxis yAxisId="right" orientation="right" stroke="#9ca3af" style={{ fontSize: 11 }} domain={[70, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar yAxisId="left" dataKey="taskCount" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Task Count" />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="efficiency"
                  stroke="#10B981"
                  strokeWidth={3}
                  dot={{ fill: '#10B981', r: 4 }}
                  name="Efficiency %"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Store Multi-Dimensional Comparison - Only for multi-store roles */}
        {isMultiStore && storeRadarData.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-4">
              <h2 className="text-lg font-bold text-gray-800 mb-1">Store Performance Radar</h2>
              <p className="text-sm text-gray-500">Multi-dimensional comparison across {storeRadarData.length} stores</p>
            </div>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <RadarChart data={[
                  { metric: 'Completion', ...Object.fromEntries(storeRadarData.map(s => [s.store, s.completionRate])) },
                  { metric: 'Efficiency', ...Object.fromEntries(storeRadarData.map(s => [s.store, s.efficiency])) },
                  { metric: 'Volume', ...Object.fromEntries(storeRadarData.map(s => [s.store, s.taskVolume])) },
                  { metric: 'Utilization', ...Object.fromEntries(storeRadarData.map(s => [s.store, s.staffUtilization])) },
                ]}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="metric" style={{ fontSize: 12, fontWeight: 600 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} style={{ fontSize: 10 }} />
                  {storeRadarData.map((store, idx) => {
                    const colors = [COLORS.primary, COLORS.info, COLORS.success, COLORS.warning];
                    const color = colors[idx % colors.length];
                    return (
                      <Radar
                        key={store.store}
                        name={store.store}
                        dataKey={store.store}
                        stroke={color}
                        fill={color}
                        fillOpacity={0.5}
                        strokeWidth={2}
                      />
                    );
                  })}
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>

      {/* ============================================ */}
      {/* MONTHLY TREND - MULTI-LINE */}
      {/* ============================================ */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-800 mb-1">7-Month Performance Trends</h2>
          <p className="text-sm text-gray-500">Completion, Efficiency & Staff Satisfaction scores trending upward</p>
        </div>
        <div style={{ width: '100%', height: 320 }}>
          <ResponsiveContainer>
            <LineChart data={monthlyTrendData}>
              <defs>
                <linearGradient id="completionGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
                <linearGradient id="efficiencyGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#2563EB" />
                </linearGradient>
                <linearGradient id="satisfactionGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#7C3AED" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" style={{ fontSize: 12 }} />
              <YAxis stroke="#9ca3af" style={{ fontSize: 12 }} domain={[75, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line
                type="monotone"
                dataKey="completionRate"
                stroke="url(#completionGradient)"
                strokeWidth={3}
                dot={{ fill: '#10B981', r: 5, strokeWidth: 2, stroke: '#fff' }}
                name="Completion Rate"
              />
              <Line
                type="monotone"
                dataKey="efficiency"
                stroke="url(#efficiencyGradient)"
                strokeWidth={3}
                dot={{ fill: '#3B82F6', r: 5, strokeWidth: 2, stroke: '#fff' }}
                name="Efficiency"
              />
              <Line
                type="monotone"
                dataKey="satisfaction"
                stroke="url(#satisfactionGradient)"
                strokeWidth={3}
                dot={{ fill: '#8B5CF6', r: 5, strokeWidth: 2, stroke: '#fff' }}
                name="Staff Satisfaction"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ============================================ */}
      {/* STORE PERFORMANCE TABLE */}
      {/* ============================================ */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-800 mb-1">Store Performance Overview</h2>
          <p className="text-sm text-gray-500">Comprehensive store comparison with operational metrics</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200 bg-gray-50">
                <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Store Name</th>
                <th className="text-right py-3 px-4 text-sm font-bold text-gray-700">Tasks</th>
                <th className="text-right py-3 px-4 text-sm font-bold text-gray-700">Completion</th>
                <th className="text-right py-3 px-4 text-sm font-bold text-gray-700">Efficiency</th>
                <th className="text-right py-3 px-4 text-sm font-bold text-gray-700">Staff</th>
                <th className="text-right py-3 px-4 text-sm font-bold text-gray-700">Tasks/Staff</th>
                <th className="text-right py-3 px-4 text-sm font-bold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockStoreLeaderboard.map((store) => (
                <tr key={store.storeId} className="border-b border-gray-100 hover:bg-blue-50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="font-semibold text-gray-800">{store.storeName}</div>
                    <div className="text-xs text-gray-500">Store ID: {store.storeId}</div>
                  </td>
                  <td className="text-right py-4 px-4">
                    <span className="text-lg font-bold text-gray-800">{store.tasksCompleted.toLocaleString()}</span>
                  </td>
                  <td className="text-right py-4 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-16 bg-gray-100 rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all"
                          style={{
                            width: `${store.completionRate}%`,
                            background: store.completionRate >= 90 ? 'linear-gradient(to right, #10B981, #059669)' :
                                       store.completionRate >= 85 ? 'linear-gradient(to right, #F59E0B, #D97706)' :
                                       'linear-gradient(to right, #EF4444, #DC2626)'
                          }}
                        />
                      </div>
                      <span className="text-lg font-bold text-gray-800 w-12">{store.completionRate}%</span>
                    </div>
                  </td>
                  <td className="text-right py-4 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-16 bg-gray-100 rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all"
                          style={{
                            width: `${store.efficiency}%`,
                            background: 'linear-gradient(to right, #3B82F6, #2563EB)'
                          }}
                        />
                      </div>
                      <span className="text-lg font-bold text-gray-800 w-12">{store.efficiency}%</span>
                    </div>
                  </td>
                  <td className="text-right py-4 px-4">
                    <span className="text-sm font-medium text-gray-700">{store.totalStaff || 'N/A'}</span>
                  </td>
                  <td className="text-right py-4 px-4">
                    <span className="text-sm font-bold text-purple-600">
                      {store.totalStaff ? Math.round(store.tasksCompleted / store.totalStaff) : 'N/A'}
                    </span>
                  </td>
                  <td className="text-right py-4 px-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                      store.completionRate >= 90 && store.efficiency >= 90
                        ? 'bg-green-100 text-green-700'
                        : store.completionRate >= 85 && store.efficiency >= 85
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {store.completionRate >= 90 && store.efficiency >= 90 ? (
                        <>
                          <Activity className="w-3 h-3" />
                          Excellent
                        </>
                      ) : store.completionRate >= 85 && store.efficiency >= 85 ? (
                        <>
                          <TrendingUp className="w-3 h-3" />
                          Good
                        </>
                      ) : (
                        <>
                          <TrendingDown className="w-3 h-3" />
                          Needs Focus
                        </>
                      )}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
