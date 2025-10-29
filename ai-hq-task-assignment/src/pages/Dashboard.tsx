import { TrendingUp, TrendingDown, Users, CheckCircle, Clock, AlertCircle, Calendar, Target, BarChart3, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export default function Dashboard() {
  const stats = [
    {
      name: 'Active Tasks',
      value: '847',
      change: '+12.5%',
      trend: 'up',
      icon: CheckCircle,
      color: 'bg-blue-500',
    },
    {
      name: 'Staff On Duty',
      value: '156',
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
      value: '23',
      change: '-8.1%',
      trend: 'down',
      icon: Clock,
      color: 'bg-orange-500',
    },
  ];

  const recentTasks = [
    { id: 1, title: 'Morning Inventory Check', store: 'Store #01 - Hanoi', status: 'Processing', priority: 'High', assignee: 'Sarah Johnson' },
    { id: 2, title: 'Customer Service Training', store: 'Store #03 - HCMC', status: 'Pending', priority: 'Medium', assignee: 'Mike Chen' },
    { id: 3, title: 'Product Display Update', store: 'Store #05 - Da Nang', status: 'Done', priority: 'Low', assignee: 'Emily Rodriguez' },
    { id: 4, title: 'Safety Inspection', store: 'Store #02 - Hanoi', status: 'Awaiting Approval', priority: 'High', assignee: 'John Smith' },
    { id: 5, title: 'Stock Replenishment', store: 'Store #04 - HCMC', status: 'Open', priority: 'Medium', assignee: 'Lisa Wong' },
  ];

  const upcomingShifts = [
    { time: '08:00 AM', staff: 'Sarah Johnson', role: 'Floor Manager', store: 'Store #01' },
    { time: '09:00 AM', staff: 'Mike Chen', role: 'Sales Associate', store: 'Store #01' },
    { time: '10:00 AM', staff: 'Emily Rodriguez', role: 'Cashier', store: 'Store #02' },
    { time: '11:00 AM', staff: 'John Smith', role: 'Stock Clerk', store: 'Store #03' },
  ];

  const storePerformance = [
    { name: 'Store #01 - Hanoi', tasks: 110, completed: 98, rate: 89 },
    { name: 'Store #02 - Hanoi', tasks: 110, completed: 95, rate: 86 },
    { name: 'Store #03 - HCMC', tasks: 110, completed: 102, rate: 93 },
    { name: 'Store #04 - HCMC', tasks: 110, completed: 88, rate: 80 },
    { name: 'Store #05 - Da Nang', tasks: 110, completed: 91, rate: 83 },
  ];

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
      {/* Welcome Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome back, Sarah!</h1>
        <p className="text-gray-500">Here's what's happening with your stores today.</p>
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

      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* Recent Tasks */}
        <div className="col-span-2 bg-white border border-gray-200 rounded-lg">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-gray-800">Recent Tasks</h2>
              <p className="text-sm text-gray-500">Latest task activities across all stores</p>
            </div>
            <Link to="/task-monitoring" className="text-sm text-pink-600 hover:text-pink-700 flex items-center gap-1">
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="divide-y divide-gray-200">
            {recentTasks.map((task) => (
              <div key={task.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium text-gray-800">{task.title}</div>
                  <span className={`px-2 py-1 rounded text-xs border ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="text-gray-500">{task.store}</div>
                  <div className="flex items-center gap-4">
                    <span className={`${getPriorityColor(task.priority)} font-medium`}>
                      {task.priority}
                    </span>
                    <span className="text-gray-500">{task.assignee}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Shifts */}
        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-800">Upcoming Shifts</h2>
            <p className="text-sm text-gray-500">Today's schedule</p>
          </div>
          <div className="divide-y divide-gray-200">
            {upcomingShifts.map((shift, idx) => (
              <div key={idx} className="p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-pink-600 text-white px-2 py-1 rounded text-xs font-medium">
                    {shift.time}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-800 text-sm">{shift.staff}</div>
                    <div className="text-xs text-gray-500">{shift.role}</div>
                    <div className="text-xs text-gray-400">{shift.store}</div>
                  </div>
                </div>
              </div>
            ))}
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
              {storePerformance.map((store, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
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

      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-4">
        <Link
          to="/task-assignment"
          className="bg-white border border-gray-200 rounded-lg p-6 hover:border-pink-600 hover:shadow-sm transition-all group"
        >
          <div className="bg-pink-600 p-3 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div className="font-medium text-gray-800 mb-1">AI Task Assignment</div>
          <div className="text-sm text-gray-500">Generate smart task schedules</div>
        </Link>

        <Link
          to="/staff"
          className="bg-white border border-gray-200 rounded-lg p-6 hover:border-pink-600 hover:shadow-sm transition-all group"
        >
          <div className="bg-green-500 p-3 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div className="font-medium text-gray-800 mb-1">Manage Staff</div>
          <div className="text-sm text-gray-500">View and manage employees</div>
        </Link>

        <Link
          to="/leave-requests"
          className="bg-white border border-gray-200 rounded-lg p-6 hover:border-pink-600 hover:shadow-sm transition-all group"
        >
          <div className="bg-orange-500 p-3 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform">
            <AlertCircle className="w-6 h-6 text-white" />
          </div>
          <div className="font-medium text-gray-800 mb-1">Leave Requests</div>
          <div className="text-sm text-gray-500">Approve pending requests</div>
        </Link>

        <Link
          to="/leaderboard"
          className="bg-white border border-gray-200 rounded-lg p-6 hover:border-pink-600 hover:shadow-sm transition-all group"
        >
          <div className="bg-blue-500 p-3 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div className="font-medium text-gray-800 mb-1">Leaderboard</div>
          <div className="text-sm text-gray-500">View performance rankings</div>
        </Link>
      </div>
    </div>
  );
}
