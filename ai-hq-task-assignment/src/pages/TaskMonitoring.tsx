import { useState } from 'react';
import { Search, Filter, Download, RefreshCw, ChevronRight, Calendar, MoreVertical } from 'lucide-react';
import { mockStaff } from '../data/mockData';
import { useRole, getCurrentStore } from '../contexts/RoleContext';
import { getStaffByBuilding, mockTasks } from 'shared-data';

export default function TaskMonitoring() {
  const { profile } = useRole();
  const currentStore = getCurrentStore(profile);

  const [viewMode, setViewMode] = useState<'timeline' | 'kanban' | 'list'>('timeline');
  // Use today's date
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [timeRange, setTimeRange] = useState<'8h' | '24h'>('8h');

  // Filter staff to only show staff from the current store
  const storeStaff = currentStore
    ? getStaffByBuilding(currentStore.name).map(s => {
        // Find matching staff in mockStaff to get avatar
        const staffWithAvatar = mockStaff.find(ms => ms.id === s.id);
        return staffWithAvatar || { ...s, avatar: '' };
      })
    : mockStaff;

  // Get staff IDs from current store
  const storeStaffIds = storeStaff.map(s => s.id);

  // Get tasks from shared-data - filter by date and store staff
  const filteredTasks = mockTasks.filter(task =>
    task.date === selectedDate && storeStaffIds.includes(task.staffId)
  );

  // Enrich tasks with staff info and additional fields for display
  const tasks = filteredTasks.map(task => {
    const staff = storeStaff.find(s => s.id === task.staffId);
    return {
      id: task.id,
      title: task.title,
      store: currentStore?.name || 'Store #01',
      assignee: staff?.name || 'Unassigned',
      avatar: staff?.avatar || '',
      status: task.status,
      type: task.type,
      priority: 'Medium' as const, // Default priority since staff app doesn't have this field
      startTime: task.startTime,
      endTime: task.endTime,
      estimated: task.estimatedMinutes,
      actual: task.actualMinutes || 0,
      progress: task.status === 'Done' ? 100 : task.status === 'Processing' ? 50 : 0,
      category: task.type === 'DWS' ? 'Daily Operations' : 'Event Task',
      // WS specific fields
      samplePhotos: task.sampleImages,
      completionPhotos: task.completionPhotos,
      aiVerificationStatus: task.aiVerificationStatus,
      requiresHQApproval: task.requiresHQApproval,
      staffId: task.staffId, // Add staffId for timeline rendering
    };
  });

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'Open': 'bg-gray-100 border-gray-300 text-gray-700',
      'Processing': 'bg-purple-100 border-purple-300 text-purple-700',
      'Pending': 'bg-yellow-100 border-yellow-300 text-yellow-700',
      'Awaiting Approval': 'bg-blue-100 border-blue-300 text-blue-700',
      'Done': 'bg-green-100 border-green-300 text-green-700',
      'Cancelled': 'bg-red-100 border-red-300 text-red-700',
    };
    return colors[status] || 'bg-gray-100 border-gray-300 text-gray-700';
  };

  const getTypeColor = (type: string) => {
    return type === 'DWS' ? 'bg-blue-500' : 'bg-orange-500';
  };

  const getTypeDotColor = (type: string) => {
    return type === 'DWS' ? 'bg-blue-500' : 'bg-orange-500';
  };

  const getPriorityColor = (priority: string) => {
    const colors: { [key: string]: string } = {
      'High': 'text-red-600',
      'Medium': 'text-orange-600',
      'Low': 'text-gray-600',
    };
    return colors[priority] || 'text-gray-600';
  };

  const statusGroups = [
    { name: 'Open', tasks: tasks.filter(t => t.status === 'Open') },
    { name: 'Processing', tasks: tasks.filter(t => t.status === 'Processing') },
    { name: 'Pending', tasks: tasks.filter(t => t.status === 'Pending') },
    { name: 'Awaiting Approval', tasks: tasks.filter(t => t.status === 'Awaiting Approval') },
    { name: 'Done', tasks: tasks.filter(t => t.status === 'Done') },
  ];

  // Timeline calculations
  const startHour = timeRange === '8h' ? 8 : 0;
  const endHour = timeRange === '8h' ? 16 : 23;
  const hourWidth = timeRange === '8h' ? 120 : 60;

  // Calculate "now" indicator position (demo: 9:30 AM)
  const nowHour = 9;
  const nowMinute = 30;
  const hoursFromStart = nowHour - startHour;
  const minuteFraction = nowMinute / 60;
  const nowPosition = (hoursFromStart + minuteFraction) * hourWidth;

  // Calculate stats
  const getTotalStats = () => {
    const totalEst = tasks.reduce((sum, t) => sum + t.estimated, 0);
    const totalActual = tasks.reduce((sum, t) => sum + (t.actual || 0), 0);
    const staffCapacity = storeStaff.reduce((sum, s) => sum + (9 * 60), 0); // Assume 9h shifts

    const formatTime = (minutes: number) => {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      if (mins === 0) return `${hours}h`;
      return `${hours}h ${mins}m`;
    };

    return {
      tasksAssigned: formatTime(totalEst),
      workLogged: formatTime(totalActual),
      staffCapacity: formatTime(staffCapacity),
    };
  };

  const stats = getTotalStats();

  // Helper functions for task counts
  const getTaskCountByType = (type: string, date: string) => {
    return mockTasks.filter(task => task.type === type && task.date === date && storeStaffIds.includes(task.staffId)).length;
  };

  const getTaskCountByStatus = (status: string, date: string) => {
    return mockTasks.filter(task => task.status === status && task.date === date && storeStaffIds.includes(task.staffId)).length;
  };

  return (
    <div className="p-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-6">
        <span className="text-gray-500">Task Management</span>
        <ChevronRight className="w-4 h-4 text-gray-500" />
        <span className="text-gray-800 font-medium">Task Monitoring</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Task Monitoring</h1>
          <p className="text-gray-500">Real-time task tracking across all stores and staff</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-gray-200 rounded-md hover:bg-gray-50 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="px-4 py-2 border border-gray-200 rounded-md hover:bg-gray-50 flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Data Source Indicator */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-900">Showing Assigned Tasks for {selectedDate}</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-green-700">
              <span className="flex items-center gap-1">
                <span className="font-semibold">{tasks.length}</span> Total Tasks
              </span>
              <span className="flex items-center gap-1">
                <span className="font-semibold">{getTaskCountByType('DWS', selectedDate)}</span> DWS
              </span>
              <span className="flex items-center gap-1">
                <span className="font-semibold">{getTaskCountByType('WS', selectedDate)}</span> WS
              </span>
              <span className="flex items-center gap-1">
                <span className="font-semibold">{getTaskCountByStatus('Done', selectedDate)}</span> Completed
              </span>
            </div>
          </div>
          <span className="text-xs text-green-600">Generated from AI Task Assignment</span>
        </div>
      </div>

      {/* Filters & Controls */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search tasks, staff, or stores..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <button className="px-4 py-2 border border-gray-200 rounded-md hover:bg-gray-50 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </button>
            <div className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-md">
              <Calendar className="w-4 h-4 text-gray-600" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border-none outline-none text-sm"
              />
            </div>
          </div>
          <div className="bg-slate-100 p-1 rounded-lg flex">
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-3 py-1.5 rounded text-sm ${viewMode === 'timeline' ? 'bg-white shadow-sm' : ''}`}
            >
              Timeline
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`px-3 py-1.5 rounded text-sm ${viewMode === 'kanban' ? 'bg-white shadow-sm' : ''}`}
            >
              Kanban
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded text-sm ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
            >
              List
            </button>
          </div>
        </div>
      </div>

      {/* View Content */}
      {viewMode === 'list' && (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-100 border-b border-gray-200">
              <tr>
                <th className="text-left p-4 font-medium text-gray-800">Task</th>
                <th className="text-left p-4 font-medium text-gray-800">Assignee</th>
                <th className="text-left p-4 font-medium text-gray-800">Store</th>
                <th className="text-left p-4 font-medium text-gray-800">Type</th>
                <th className="text-left p-4 font-medium text-gray-800">Status</th>
                <th className="text-left p-4 font-medium text-gray-800">Time</th>
                <th className="text-right p-4 font-medium text-gray-800">Progress</th>
                <th className="text-center p-4 font-medium text-gray-800">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50">
                  <td className="p-4">
                    <div className="font-medium text-gray-800">{task.title}</div>
                    <div className={`text-xs ${getPriorityColor(task.priority)} font-medium mt-1`}>
                      {task.priority} Priority
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <img src={task.avatar} alt={task.assignee} className="w-8 h-8 rounded-full" />
                      <span className="text-sm text-gray-800">{task.assignee}</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600">{task.store}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getTypeDotColor(task.type)}`}></div>
                      <span className="text-xs text-gray-600">{task.type}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs border ${getStatusColor(task.status)}`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    {task.startTime} - {task.endTime}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-pink-600 h-2 rounded-full"
                          style={{ width: `${task.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-12 text-right">{task.progress}%</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <button className="p-2 hover:bg-gray-100 rounded">
                      <MoreVertical className="w-4 h-4 text-gray-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {viewMode === 'kanban' && (
        <div className="flex-1 overflow-auto bg-gray-50 p-6">
          <div className="flex gap-4 h-full">
            {statusGroups.map((group) => (
              <div
                key={group.name}
                className="flex-1 min-w-[280px] bg-white rounded-xl p-4 flex flex-col"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium">{group.name}</h3>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {group.tasks.length}
                  </span>
                </div>

                <div className="flex-1 overflow-auto space-y-3">
                  {group.tasks.map((task) => (
                    <button
                      key={task.id}
                      className={`w-full text-left rounded-lg border-2 p-3 transition-all hover:shadow-lg ${getStatusColor(task.status)}`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="text-sm font-medium flex-1">{task.title}</span>
                        <div className={`w-2 h-2 rounded-full shrink-0 mt-0.5 ${getTypeDotColor(task.type)}`}></div>
                      </div>
                      <div className="text-xs opacity-70 mb-2">{task.category}</div>
                      <div className="flex items-center gap-2 mb-2">
                        <img src={task.avatar} alt={task.assignee} className="w-6 h-6 rounded-full" />
                        <span className="text-xs">{task.assignee}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs opacity-75">
                        <span>{task.startTime} - {task.endTime}</span>
                        <span className={getPriorityColor(task.priority)}>{task.priority}</span>
                      </div>
                      {task.progress > 0 && (
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span>Progress</span>
                            <span>{task.progress}%</span>
                          </div>
                          <div className="bg-gray-200 rounded-full h-1.5">
                            <div
                              className="bg-pink-600 h-1.5 rounded-full"
                              style={{ width: `${task.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {viewMode === 'timeline' && (
        <div className="flex flex-col h-full">
          {/* Stats Bar and Controls */}
          <div className="px-6 py-3 border-b bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6 text-sm">
                <div>
                  <span className="text-gray-500">Tasks Assigned</span>
                  <span className="ml-2 font-medium">{stats.tasksAssigned}</span>
                </div>
                <div>
                  <span className="text-gray-500">Work Logged</span>
                  <span className="ml-2 font-medium">{stats.workLogged}</span>
                </div>
                <div>
                  <span className="text-gray-500">Staff Capacity</span>
                  <span className="ml-2 font-medium">{stats.staffCapacity}</span>
                </div>
                {/* Type Legend */}
                <div className="flex items-center gap-3 text-sm ml-4">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-gray-500">DWS</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                    <span className="text-gray-500">WS</span>
                  </div>
                </div>
              </div>

              {/* 8h/24h Toggle */}
              <div className="flex gap-2">
                <button
                  onClick={() => setTimeRange('8h')}
                  className={`px-3 py-1.5 rounded text-sm border ${
                    timeRange === '8h'
                      ? 'bg-pink-600 text-white border-pink-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  8 hour
                </button>
                <button
                  onClick={() => setTimeRange('24h')}
                  className={`px-3 py-1.5 rounded text-sm border ${
                    timeRange === '24h'
                      ? 'bg-pink-600 text-white border-pink-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  24 hour
                </button>
              </div>
            </div>
          </div>

          {/* Timeline Grid - Table Structure */}
          <div className="flex-1 overflow-auto bg-white">
            <table className="min-w-max w-full border-collapse">
              {/* Table Header */}
              <thead className="sticky top-0 z-20 bg-white">
                <tr className="border-b">
                  <th className="w-32 px-4 py-3 text-left text-sm font-medium text-gray-800 border-r bg-white sticky left-0 z-30">
                    Staff
                  </th>
                  <th className="relative p-0" style={{ minWidth: `${(endHour - startHour + 1) * hourWidth}px` }}>
                    <div className="flex relative">
                      {Array.from({ length: (endHour - startHour) + 1 }, (_, i) => startHour + i).map((hour) => (
                        <div
                          key={hour}
                          className="border-r px-2 py-3 text-center text-sm text-gray-600"
                          style={{ width: `${hourWidth}px` }}
                        >
                          {String(hour).padStart(2, '0')}:00
                        </div>
                      ))}

                      {/* Now indicator circle in header */}
                      {nowHour >= startHour && nowHour <= endHour && (
                        <div
                          className="absolute"
                          style={{ left: `${nowPosition}px`, bottom: '-6px', zIndex: 50, transform: 'translateX(-50%)' }}
                        >
                          <div className="w-3 h-3 rounded-full bg-red-500 shadow-lg"></div>
                        </div>
                      )}
                    </div>
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {storeStaff.map((staff, idx) => {
                  const staffTasks = tasks.filter(t => t.staffId === staff.id);

                  return (
                    <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="w-32 px-4 py-3 border-r bg-white sticky left-0 z-10" style={{ height: '100px' }}>
                        <div className="flex flex-col justify-center">
                          <div className="text-sm font-medium">{staff.name}</div>
                          <div className="text-xs text-gray-500">{staff.shiftStart} - {staff.shiftEnd}</div>
                        </div>
                      </td>

                      <td className="relative p-0" style={{ height: '100px' }}>
                        <div className="relative w-full h-full">
                          {/* Now indicator line for this row */}
                          {nowHour >= startHour && nowHour <= endHour && (
                            <div
                              className="absolute bg-red-500 shadow-sm pointer-events-none"
                              style={{
                                left: `${nowPosition}px`,
                                top: '0',
                                bottom: '0',
                                width: '2px',
                                height: '100%',
                                zIndex: 100,
                                transform: 'translateX(-50%)'
                              }}
                            ></div>
                          )}

                          {/* Grid lines for hour blocks */}
                          <div className="absolute inset-0 flex pointer-events-none" style={{ zIndex: 1 }}>
                            {Array.from({ length: (endHour - startHour) + 1 }).map((_, i) => (
                              <div
                                key={i}
                                className="border-r border-gray-100"
                                style={{ width: `${hourWidth}px` }}
                              />
                            ))}
                          </div>

                          {/* Tasks */}
                          {staffTasks.map((task) => {
                            const taskStartHour = parseInt(task.startTime.split(':')[0]);
                            const taskStartMinute = parseInt(task.startTime.split(':')[1] || '0');
                            const taskEndHour = parseInt(task.endTime.split(':')[0]);
                            const taskEndMinute = parseInt(task.endTime.split(':')[1] || '0');

                            // Calculate position based on time range
                            const taskStartTotal = taskStartHour + taskStartMinute / 60;
                            const taskEndTotal = taskEndHour + taskEndMinute / 60;
                            const left = (taskStartTotal - startHour) * hourWidth + 4; // 4px padding
                            const width = (taskEndTotal - taskStartTotal) * hourWidth - 8; // 8px total padding

                            // Don't render if width is too small or outside visible range
                            if (width < 20 || taskStartHour > endHour || taskEndHour < startHour) {
                              return null;
                            }

                            return (
                              <div
                                key={task.id}
                                className={`absolute rounded-lg border-2 p-2 cursor-pointer hover:shadow-lg transition-all ${getStatusColor(task.status)}`}
                                style={{
                                  left: `${Math.max(0, left)}px`,
                                  width: `${width}px`,
                                  top: '5px',
                                  height: '90px',
                                  zIndex: 10,
                                }}
                              >
                                <div className="flex items-start justify-between gap-1 mb-1">
                                  <span className="text-xs font-medium flex-1 truncate">{task.title}</span>
                                  <div className={`w-3 h-3 rounded-full shrink-0 mt-0.5 ${getTypeDotColor(task.type)} shadow-sm`}></div>
                                </div>
                                <div className="opacity-70" style={{ fontSize: '10px', lineHeight: '1.2' }}>{task.startTime} - {task.endTime}</div>
                              </div>
                            );
                          })}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
