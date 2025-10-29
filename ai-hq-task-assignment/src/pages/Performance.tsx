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

// Enhanced data with better metrics
const completionTrendData = [
  { date: 'Week 1', completionRate: 85, target: 90, tasksCompleted: 935 },
  { date: 'Week 2', completionRate: 87, target: 90, tasksCompleted: 957 },
  { date: 'Week 3', completionRate: 89, target: 90, tasksCompleted: 979 },
  { date: 'Week 4', completionRate: 91, target: 90, tasksCompleted: 1001 },
  { date: 'Week 5', completionRate: 93, target: 90, tasksCompleted: 1023 },
  { date: 'Week 6', completionRate: 94, target: 90, tasksCompleted: 1034 },
  { date: 'Week 7', completionRate: 96, target: 90, tasksCompleted: 1056 },
];

// Better category data with completion info
const categoryPerformanceData = [
  { category: 'Shelf Display', avgTime: 42, targetTime: 45, completionRate: 94, performance: 107, tasks: 458 },
  { category: 'Inventory', avgTime: 35, targetTime: 40, completionRate: 92, performance: 114, tasks: 312 },
  { category: 'Customer Service', avgTime: 28, targetTime: 30, completionRate: 96, performance: 107, tasks: 289 },
  { category: 'Cleaning', avgTime: 25, targetTime: 25, completionRate: 98, performance: 100, tasks: 267 },
  { category: 'Stock Replenish', avgTime: 38, targetTime: 40, completionRate: 91, performance: 105, tasks: 245 },
  { category: 'Price Label', avgTime: 20, targetTime: 22, completionRate: 95, performance: 110, tasks: 198 },
].sort((a, b) => b.completionRate - a.completionRate);

// Monthly trend with more metrics
const monthlyTrendData = [
  { month: 'Apr', completionRate: 82, efficiency: 85, satisfaction: 80 },
  { month: 'May', completionRate: 84, efficiency: 87, satisfaction: 83 },
  { month: 'Jun', completionRate: 86, efficiency: 89, satisfaction: 85 },
  { month: 'Jul', completionRate: 88, efficiency: 91, satisfaction: 87 },
  { month: 'Aug', completionRate: 90, efficiency: 93, satisfaction: 89 },
  { month: 'Sep', completionRate: 92, efficiency: 94, satisfaction: 91 },
  { month: 'Oct', completionRate: 94, efficiency: 96, satisfaction: 93 },
];

// Store radar data for multi-dimensional comparison
const storeRadarData = mockStoreLeaderboard.map(store => ({
  store: store.storeName.split(' ').slice(-2).join(' '), // Shortened names
  completionRate: store.completionRate,
  efficiency: store.efficiency,
  taskVolume: Math.round((store.tasksCompleted / 20)),
  staffUtilization: store.totalStaff ? Math.round((store.tasksCompleted / store.totalStaff) / 3) : 0,
}));

// Peak hours analysis
const peakHoursData = [
  { hour: '08:00', taskCount: 45, efficiency: 82 },
  { hour: '09:00', taskCount: 68, efficiency: 88 },
  { hour: '10:00', taskCount: 92, efficiency: 94 },
  { hour: '11:00', taskCount: 85, efficiency: 91 },
  { hour: '12:00', taskCount: 65, efficiency: 78 },
  { hour: '13:00', taskCount: 58, efficiency: 75 },
  { hour: '14:00', taskCount: 88, efficiency: 93 },
  { hour: '15:00', taskCount: 95, efficiency: 96 },
  { hour: '16:00', taskCount: 82, efficiency: 89 },
  { hour: '17:00', taskCount: 52, efficiency: 84 },
];

const aggregateKPIs = {
  totalTasks: 33420,
  totalTasksChange: 8.2,
  completionRate: 92.5,
  completionRateChange: 3.5,
  totalHours: 18450,
  totalHoursChange: 5.1,
  avgEfficiency: 91.3,
  avgEfficiencyChange: 4.2,
  activeStores: 26,
  totalStaff: 268,
};

// KPI targets
const kpiTargets = {
  completionRateTarget: 90,
  efficiencyTarget: 88,
  avgTimeReduction: 15, // percentage
};

export default function Performance() {
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

        {/* Store Multi-Dimensional Comparison */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-gray-800 mb-1">Store Performance Radar</h2>
            <p className="text-sm text-gray-500">Multi-dimensional comparison across key metrics</p>
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
                <Radar name={storeRadarData[0].store} dataKey={storeRadarData[0].store} stroke={COLORS.primary} fill={COLORS.primary} fillOpacity={0.5} strokeWidth={2} />
                <Radar name={storeRadarData[1].store} dataKey={storeRadarData[1].store} stroke={COLORS.info} fill={COLORS.info} fillOpacity={0.5} strokeWidth={2} />
                <Radar name={storeRadarData[2].store} dataKey={storeRadarData[2].store} stroke={COLORS.success} fill={COLORS.success} fillOpacity={0.5} strokeWidth={2} />
                <Radar name={storeRadarData[3].store} dataKey={storeRadarData[3].store} stroke={COLORS.warning} fill={COLORS.warning} fillOpacity={0.5} strokeWidth={2} />
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
