import { TrendingUp, TrendingDown, Users, CheckCircle, Clock, AlertCircle, Calendar, Target, BarChart3, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { RoleIndicator } from '../components/RoleIndicator';
import { StoreSelector } from '../components/StoreSelector';
import { RoleBasedContent } from '../components/RoleBasedContent';
import { useRole } from '../contexts/RoleContext';
import { useRoleBasedData } from '../hooks/useRoleBasedData';

export default function Dashboard() {
  const { profile } = useRole();
  const { visibleStaff, stats: roleStats, isMultiStore, visibleStores, activeStores } = useRoleBasedData();

  // Dynamic stats based on role data
  const stats = useMemo(() => [
    {
      name: 'Active Tasks',
      value: String(roleStats.totalTasks),
      change: '+12.5%',
      trend: 'up',
      icon: CheckCircle,
      color: 'bg-blue-500',
    },
    {
      name: 'Staff On Duty',
      value: String(roleStats.totalStaff),
      change: '-2.3%',
      trend: 'down',
      icon: Users,
      color: 'bg-green-500',
    },
    {
      name: 'Completion Rate',
      value: '87.4%',
      change: '+5.2%',
      trend: 'up',
      icon: Target,
      color: 'bg-pink-600',
    },
    {
      name: 'Pending Approvals',
      value: String(Math.round(roleStats.totalTasks * 0.05)),
      change: '-8.1%',
      trend: 'down',
      icon: Clock,
      color: 'bg-orange-500',
    },
  ], [roleStats]);

  // Mock recent tasks - filter based on currently active stores with real staff
  const recentTasks = useMemo(() => {
    const taskTemplates = [
      { title: 'Morning Inventory Check', status: 'Processing', priority: 'High' },
      { title: 'Customer Service Training', status: 'Pending', priority: 'Medium' },
      { title: 'Product Display Update', status: 'Done', priority: 'Low' },
      { title: 'Safety Inspection', status: 'Awaiting Approval', priority: 'High' },
      { title: 'Stock Replenishment', status: 'Open', priority: 'Medium' },
      { title: 'End of Day Cleaning', status: 'Processing', priority: 'Medium' },
    ];

    const tasks = activeStores.flatMap((store, storeIdx) => {
      const storeStaff = visibleStaff.filter(s => s.storeId === store.id);

      // Create 1-2 tasks per store
      return taskTemplates.slice(storeIdx * 2, storeIdx * 2 + 2).map((template, idx) => ({
        id: `${store.id}-${idx}`,
        title: template.title,
        storeId: store.id,
        storeName: store.name,
        status: template.status,
        priority: template.priority,
        // Assign to actual staff from this store
        assignee: storeStaff[idx % storeStaff.length]?.name || 'Unassigned',
      }));
    });

    return tasks.slice(0, 6); // Limit to 6 most recent tasks
  }, [activeStores, visibleStaff]);

  // Dynamic upcoming shifts based on visible staff
  const upcomingShifts = useMemo(() => {
    // Mock: Show next 4 shifts from visible staff
    // In production, this would show staff clocking in within next 1-2 hours
    const mockShiftTimes = ['08:00', '08:30', '09:00', '09:30', '10:00', '11:00', '12:00', '13:00'];

    return visibleStaff
      .slice(0, 4) // Take first 4 staff
      .map((staff, idx) => {
        // Assign sequential shift times
        const shiftTime = mockShiftTimes[idx] || staff.shiftStart;

        // Determine status based on current time
        const now = new Date();
        const [shiftHour, shiftMin] = shiftTime.split(':').map(Number);
        const currentHour = now.getHours();
        const currentMin = now.getMinutes();

        let status: 'on-time' | 'early' | 'late' = 'on-time';

        // If shift time has passed by more than 15 mins, mark as late
        if (currentHour > shiftHour || (currentHour === shiftHour && currentMin > shiftMin + 15)) {
          status = 'late';
        }
        // If current time is within 30 mins before shift, mark as early
        else if (currentHour === shiftHour && currentMin >= shiftMin - 30 && currentMin < shiftMin) {
          status = 'early';
        }

        return {
          time: shiftTime,
          staff: staff.name,
          role: staff.position,
          store: staff.storeName || 'Unknown Store',
          status,
        };
      });
  }, [visibleStaff]);

  // Store performance - filter based on user's visible stores
  const storePerformance = useMemo(() => {
    return roleStats.storesBreakdown.map((store, idx) => ({
      id: store.storeId,
      name: store.storeName,
      tasks: store.taskCount,
      completed: Math.round(store.taskCount * (0.8 + Math.random() * 0.15)), // Mock completion data
      rate: Math.round(80 + Math.random() * 15), // Mock rate 80-95%
    }));
  }, [roleStats]);

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'Open': 'bg-gray-100 text-gray-700 border-gray-300',
      'Processing': 'bg-purple-100 text-purple-700 border-purple-300',
      'Pending': 'bg-yellow-100 text-yellow-700 border-yellow-300',
      'Awaiting Approval': 'bg-blue-100 text-blue-700 border-blue-300',
      'Done': 'bg-green-100 text-green-700 border-green-300',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const getPriorityColor = (priority: string) => {
    const colors: { [key: string]: string } = {
      'High': 'text-red-600',
      'Medium': 'text-orange-600',
      'Low': 'text-gray-600',
    };
    return colors[priority] || 'text-gray-600';
  };

  return (
    <div className="p-6">
      {/* Role Indicator */}
      <RoleIndicator />

      {/* Store Selector - Only for multi-store roles */}
      {isMultiStore && (
        <div className="mb-6">
          <StoreSelector />
        </div>
      )}

      {/* Welcome Section with Quick Actions */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome back, {profile.name}!</h1>
          <p className="text-gray-500">
            {profile.role === 'hq' && `Managing ${roleStats.totalStores} stores across the system.`}
            {profile.role === 'am' && `Overseeing ${roleStats.totalStores} stores in your region.`}
            {profile.role === 'si' && `Inspecting ${roleStats.totalStores} stores under your supervision.`}
            {profile.role === 'store-manager' && `Here's what's happening at your store today.`}
          </p>
        </div>

        {/* Quick Actions - Moved from bottom */}
        <div className="flex items-center gap-3">
          <Link
            to="/task-assignment"
            className="flex items-center gap-2 px-4 py-2.5 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors shadow-sm"
          >
            <Calendar className="w-4 h-4" />
            <span className="font-medium">AI Task Assignment</span>
          </Link>
          <Link
            to="/task-monitoring"
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <CheckCircle className="w-4 h-4" />
            <span className="font-medium">New Task</span>
          </Link>
          <Link
            to="/staff"
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Users className="w-4 h-4" />
            <span className="font-medium">Add Staff</span>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center gap-1 text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {stat.change}
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.name}</div>
          </div>
        ))}
      </div>

      {/* Today's Highlights */}
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-100 rounded-lg p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-pink-600" />
          <h2 className="font-semibold text-gray-800">Today's Highlights</h2>
          <span className="text-xs text-gray-500 ml-2">Real-time updates • {new Date().toLocaleDateString()}</span>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-4 border border-pink-100">
            <div className="text-sm text-gray-500 mb-1">Tasks Completed</div>
            <div className="flex items-baseline gap-2">
              <div className="text-2xl font-bold text-gray-800">
                {Math.round(roleStats.totalTasks * 0.88)} / {roleStats.totalTasks}
              </div>
              <div className="flex items-center gap-1 text-sm text-green-600">
                <TrendingUp className="w-3 h-3" />
                <span>88%</span>
              </div>
            </div>
            <div className="text-xs text-gray-400 mt-1">↑ 3% from yesterday</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-pink-100">
            <div className="text-sm text-gray-500 mb-1">Avg Time per Task</div>
            <div className="flex items-baseline gap-2">
              <div className="text-2xl font-bold text-gray-800">23 mins</div>
              <div className="flex items-center gap-1 text-sm text-green-600">
                <TrendingDown className="w-3 h-3" />
                <span>-5 mins</span>
              </div>
            </div>
            <div className="text-xs text-gray-400 mt-1">Target: 25 mins</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-pink-100">
            <div className="text-sm text-gray-500 mb-1">Top Performer</div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                🏆
              </div>
              <div>
                <div className="text-lg font-bold text-gray-800">
                  {visibleStaff.length > 0 ? visibleStaff[0].name : 'N/A'}
                </div>
                <div className="text-xs text-gray-500">
                  {Math.round(roleStats.totalTasks * 0.1)} tasks completed
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* Recent Tasks */}
        <div className="col-span-2 bg-white border border-gray-200 rounded-lg">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-gray-800">Recent Tasks</h2>
              <p className="text-sm text-gray-500">
                Latest task activities • {activeStores.length} {activeStores.length === 1 ? 'store' : 'stores'}
              </p>
            </div>
            <Link to="/task-monitoring" className="text-sm text-pink-600 hover:text-pink-700 flex items-center gap-1">
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="divide-y divide-gray-200">
            {recentTasks.length > 0 ? (
              recentTasks.map((task) => (
                <div key={task.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-gray-800">{task.title}</div>
                    <span className={`px-2 py-1 rounded text-xs border ${getStatusColor(task.status)}`}>
                      {task.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-gray-500 truncate flex-1">{task.storeName}</div>
                    <div className="flex items-center gap-4">
                      <span className={`${getPriorityColor(task.priority)} font-medium`}>
                        {task.priority}
                      </span>
                      <span className="text-gray-500">{task.assignee}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">
                No recent tasks found for your stores.
              </div>
            )}
          </div>
        </div>

        {/* Upcoming Shifts */}
        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-800">Upcoming Shifts</h2>
            <p className="text-sm text-gray-500">Staff starting soon • {activeStores.length} {activeStores.length === 1 ? 'store' : 'stores'}</p>
          </div>
          <div className="divide-y divide-gray-200">
            {upcomingShifts.length > 0 ? (
              upcomingShifts.map((shift, idx) => {
                const statusConfig = {
                  'on-time': { color: 'bg-green-500', label: 'On time' },
                  'early': { color: 'bg-blue-500', label: 'Checked in early' },
                  'late': { color: 'bg-red-500', label: 'Late' },
                };
                const status = statusConfig[shift.status];

                return (
                  <div key={idx} className="p-4 hover:bg-gray-50">
                    <div className="flex items-start gap-3">
                      <div className="bg-pink-600 text-white px-2 py-1 rounded text-xs font-medium">
                        {shift.time}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <div className="font-medium text-gray-800 text-sm">{shift.staff}</div>
                          <span className={`w-2 h-2 ${status.color} rounded-full`} title={status.label}></span>
                        </div>
                        <div className="text-xs text-gray-500">{shift.role}</div>
                        <div className="text-xs text-gray-400">{shift.store}</div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center text-gray-500">
                <Clock className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <div className="text-sm">No upcoming shifts in the next 4 hours</div>
              </div>
            )}
          </div>
          <div className="p-4 border-t border-gray-200">
            <Link to="/shift-schedule" className="text-sm text-pink-600 hover:text-pink-700 flex items-center gap-1">
              View Full Schedule
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Store Performance */}
      <div className="bg-white border border-gray-200 rounded-lg mb-6">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-gray-800">Store Performance</h2>
            <p className="text-sm text-gray-500">Daily task completion across stores</p>
          </div>
          <Link to="/performance" className="text-sm text-pink-600 hover:text-pink-700 flex items-center gap-1">
            View Analytics
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-100 border-b border-gray-200">
              <tr>
                <th className="text-left p-4 font-medium text-gray-800">Store</th>
                <th className="text-right p-4 font-medium text-gray-800">Total Tasks</th>
                <th className="text-right p-4 font-medium text-gray-800">Completed</th>
                <th className="text-right p-4 font-medium text-gray-800">Completion Rate</th>
                <th className="text-center p-4 font-medium text-gray-800">Progress</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {storePerformance.map((store) => (
                <tr key={store.id} className="hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-800">{store.name}</td>
                  <td className="p-4 text-right text-gray-600">{store.tasks}</td>
                  <td className="p-4 text-right text-gray-600">{store.completed}</td>
                  <td className="p-4 text-right">
                    <span className={`font-medium ${store.rate >= 85 ? 'text-green-600' : 'text-orange-600'}`}>
                      {store.rate}%
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${store.rate >= 85 ? 'bg-green-500' : 'bg-orange-500'}`}
                        style={{ width: `${store.rate}%` }}
                      ></div>
                    </div>
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
