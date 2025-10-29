import { useState } from 'react';
import { Staff, Shift, Task } from '../types';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';

interface ShiftManagementProps {
  staff: Staff[];
  shifts: Shift[];
  tasks: Task[];
}

type ViewMode = 'attendance' | 'performance';
type ViewType = 'week' | 'month';

export function ShiftManagement({ staff, shifts, tasks }: ShiftManagementProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>('attendance');
  const [viewType, setViewType] = useState<ViewType>('month');

  // Generate all days in the current month
  const generateMonthDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const day = new Date(year, month, i);
      days.push(day);
    }
    return days;
  };

  // Generate week days (7 days starting from the current date's week)
  const generateWeekDays = () => {
    const days = [];
    const current = new Date(currentDate);

    // Find the start of the week (Sunday)
    const dayOfWeek = current.getDay();
    const startOfWeek = new Date(current);
    startOfWeek.setDate(current.getDate() - dayOfWeek);

    // Generate 7 days from start of week
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const displayDays = viewType === 'week' ? generateWeekDays() : generateMonthDays();

  const getShiftForStaffAndDate = (staffId: string, date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return shifts.find(s => s.staffId === staffId && s.date === dateStr);
  };

  const goToPrevious = () => {
    const newDate = new Date(currentDate);
    if (viewType === 'week') {
      newDate.setDate(newDate.getDate() - 7); // Go back 1 week
    } else {
      newDate.setMonth(newDate.getMonth() - 1); // Go back 1 month
    }
    setCurrentDate(newDate);
  };

  const goToNext = () => {
    const newDate = new Date(currentDate);
    if (viewType === 'week') {
      newDate.setDate(newDate.getDate() + 7); // Go forward 1 week
    } else {
      newDate.setMonth(newDate.getMonth() + 1); // Go forward 1 month
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const getShiftDotColor = (shiftName?: string) => {
    switch (shiftName) {
      case 'Morning':
        return 'bg-blue-500';
      case 'Mid':
        return 'bg-green-500';
      case 'Evening':
        return 'bg-purple-500';
      case 'Full':
        return 'bg-orange-500';
      default:
        return 'bg-gray-300';
    }
  };

  const getTaskPercentageColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-500';
    if (percentage >= 75) return 'bg-blue-500';
    if (percentage >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getAttendanceStatus = (shift: Shift) => {
    if (!shift.actualCheckIn || !shift.actualCheckOut) {
      return { color: 'text-gray-400', label: 'pending' };
    }

    // Convert time strings to minutes for comparison
    const toMinutes = (time: string) => {
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes;
    };

    const scheduledStartMin = toMinutes(shift.scheduledStart);
    const scheduledEndMin = toMinutes(shift.scheduledEnd);
    const actualCheckInMin = toMinutes(shift.actualCheckIn);
    const actualCheckOutMin = toMinutes(shift.actualCheckOut);

    const isLateCheckIn = actualCheckInMin > scheduledStartMin;
    const isEarlyCheckOut = actualCheckOutMin < scheduledEndMin;

    if (!isLateCheckIn && !isEarlyCheckOut) {
      // On-time: use same gray as Shift line
      return { color: 'text-gray-600', label: 'on-time' };
    } else if (isLateCheckIn && isEarlyCheckOut) {
      // Both issues: red to highlight serious problem
      return { color: 'text-red-600', label: 'both-issues' };
    } else {
      // Partial issue (late OR early): orange warning
      return { color: 'text-orange-500', label: 'partial-issue' };
    }
  };

  const getPerformanceStats = (staffId: string, date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    const staffTasks = tasks.filter(t => t.staffId === staffId && t.date === dateStr);

    const totalTasks = staffTasks.length;
    const completedTasks = staffTasks.filter(t => t.status === 'Done').length;
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return {
      totalTasks,
      completedTasks,
      completionRate
    };
  };

  const calculateHoursWorked = (shift: Shift): string => {
    if (!shift.actualCheckIn || !shift.actualCheckOut) {
      return '0h';
    }

    const toMinutes = (time: string) => {
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes;
    };

    const checkInMin = toMinutes(shift.actualCheckIn);
    const checkOutMin = toMinutes(shift.actualCheckOut);
    const totalMinutes = checkOutMin - checkInMin;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return minutes > 0 ? `${hours}.${Math.round((minutes / 60) * 10)}h` : `${hours}h`;
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Page Header */}
      <div className="px-6 py-4 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Shift Management</h2>
          <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as ViewMode)}>
            <TabsList>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Filters and View Controls */}
      <div className="px-6 py-3 border-b bg-white space-y-3">
        {/* Date Navigation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={goToToday}>
              <Calendar className="w-4 h-4 mr-2" />
              Today
            </Button>
            <Button variant="outline" size="sm" onClick={goToPrevious}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm font-medium min-w-[150px] text-center">
              {viewType === 'week'
                ? `Week of ${currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
                : currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </span>
            <Button variant="outline" size="sm" onClick={goToNext}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* View Type Toggle */}
          <div className="flex gap-2">
            <Button
              variant={viewType === 'week' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewType('week')}
            >
              Week
            </Button>
            <Button
              variant={viewType === 'month' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewType('month')}
            >
              Month
            </Button>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="px-6 py-3 border-b bg-gray-50">
        <div className="flex items-center gap-6 text-xs">
          <span className="text-gray-600">Shift Types:</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <span>Morning</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span>Mid</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-500"></div>
            <span>Evening</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
            <span>Full Day</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            <span>Day Off</span>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <ScrollArea className="flex-1">
        <div className="min-w-max">
          <table className="w-full border-collapse">
            <thead className="sticky top-0 bg-white border-b z-10">
              <tr>
                <th className="sticky left-0 z-20 bg-white text-left px-4 py-3 text-sm border-r min-w-[140px]">
                  Staff
                </th>
                {displayDays.map((day) => {
                  const isToday = day.toDateString() === new Date().toDateString();
                  const isWeekend = day.getDay() === 0 || day.getDay() === 6;
                  
                  return (
                    <th 
                      key={day.toISOString()} 
                      className={`text-center px-2 py-2 text-xs min-w-[90px] ${
                        isToday ? 'bg-blue-50' : isWeekend ? 'bg-gray-50' : ''
                      }`}
                    >
                      <div className={`${isToday ? 'text-blue-600' : ''}`}>
                        {day.toLocaleDateString('en-US', { weekday: 'short' })}
                      </div>
                      <div className={`text-xs ${isToday ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}>
                        {day.getDate()}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {staff.map((staffMember) => (
                <tr key={staffMember.id} className="border-b hover:bg-gray-50/50">
                  <td className="sticky left-0 z-10 bg-white px-4 py-3 text-sm border-r">
                    <div>{staffMember.name}</div>
                  </td>
                  {displayDays.map((day) => {
                    const shift = getShiftForStaffAndDate(staffMember.id, day);
                    const isToday = day.toDateString() === new Date().toDateString();
                    const isWeekend = day.getDay() === 0 || day.getDay() === 6;
                    
                    return (
                      <td 
                        key={day.toISOString()} 
                        className={`px-2 py-2 ${
                          isToday ? 'bg-blue-50/50' : isWeekend ? 'bg-gray-50/50' : ''
                        }`}
                      >
                        {shift ? (
                          shift.isOff ? (
                            <div className="rounded border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center h-full min-h-[80px]">
                              <span className="text-xs text-gray-400 font-medium">OFF</span>
                            </div>
                          ) : (
                            <div className="flex flex-col gap-1">
                              {/* Shift Card */}
                              <div className={`rounded bg-white p-1.5 border border-gray-200 ${
                                isToday ? 'ring-2 ring-blue-400' : ''
                              }`}>
                                {/* Shift Name with colored dot */}
                                <div className="flex items-center gap-1.5 text-[10px] font-medium leading-tight text-gray-800 mb-1">
                                  <div className={`w-2 h-2 rounded-full shrink-0 ${getShiftDotColor(shift.shiftName)}`}></div>
                                  <span>{shift.shiftName}</span>
                                </div>

                                {viewMode === 'attendance' ? (
                                  // Attendance View - Show shift times and actual times
                                  <div className="space-y-0.5">
                                    {/* Scheduled Time */}
                                    <div className="flex items-center text-[9px] leading-tight">
                                      <span className="text-gray-600 w-12 shrink-0 text-right mr-1">Shift:</span>
                                      <span className="text-gray-600">{shift.scheduledStart}-{shift.scheduledEnd}</span>
                                    </div>
                                    {/* Actual Time (if available) */}
                                    {shift.actualCheckIn && shift.actualCheckOut && (() => {
                                      const status = getAttendanceStatus(shift);
                                      return (
                                        <div className={`flex items-center text-[9px] leading-tight ${status.color}`}>
                                          <span className="w-12 shrink-0 text-right mr-1">Actual:</span>
                                          <span>{shift.actualCheckIn}-{shift.actualCheckOut}</span>
                                        </div>
                                      );
                                    })()}
                                  </div>
                                ) : (
                                  // Performance View - Show tasks and hours worked
                                  (() => {
                                    const perfStats = getPerformanceStats(staffMember.id, day);
                                    const hoursWorked = calculateHoursWorked(shift);

                                    return (
                                      <div className="space-y-1">
                                        {/* Tasks completed */}
                                        <div className="text-[9px] leading-tight text-gray-700">
                                          Tasks: {perfStats.completedTasks}/{perfStats.totalTasks}
                                        </div>
                                        {/* Hours worked */}
                                        <div className="text-[9px] leading-tight text-gray-700">
                                          Hours: {hoursWorked}
                                        </div>
                                        {/* Completion bar */}
                                        {perfStats.totalTasks > 0 && (
                                          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                              className={`h-full ${getTaskPercentageColor(perfStats.completionRate)}`}
                                              style={{ width: `${perfStats.completionRate}%` }}
                                              title={`Completion: ${perfStats.completionRate}%`}
                                            />
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })()
                                )}
                              </div>
                            </div>
                          )
                        ) : (
                          <div className="flex items-center justify-center h-16">
                            <div className="text-xs text-gray-300">-</div>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ScrollArea>

      {/* Footer with Summary */}
      <div className="px-6 py-3 border-t bg-gray-50">
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Total Shifts:</span>
            <span className="ml-2 font-medium">
              {shifts.filter(s => !s.isOff && s.date.startsWith(currentDate.toISOString().slice(0, 7))).length}
            </span>
          </div>
          <div>
            <span className="text-gray-500">Days Off:</span>
            <span className="ml-2 font-medium">
              {shifts.filter(s => s.isOff && s.date.startsWith(currentDate.toISOString().slice(0, 7))).length}
            </span>
          </div>
          <div>
            <span className="text-gray-500">Avg Task Completion:</span>
            <span className="ml-2 font-medium">
              {Math.round(
                shifts
                  .filter(s => !s.isOff && s.taskAssignmentPercentage && s.date.startsWith(currentDate.toISOString().slice(0, 7)))
                  .reduce((acc, s) => acc + (s.taskAssignmentPercentage || 0), 0) /
                  shifts.filter(s => !s.isOff && s.taskAssignmentPercentage && s.date.startsWith(currentDate.toISOString().slice(0, 7))).length
              )}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
