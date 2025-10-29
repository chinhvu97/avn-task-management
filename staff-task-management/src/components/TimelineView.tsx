import { useState } from 'react';
import { Staff, Task } from '../types';
import { Button } from './ui/button';
import { TaskCard } from './TaskCard';
import { TaskFilters } from './TaskFilters';
import { calculateTimeSlots, getTaskPosition, getTaskWidth } from '../lib/utils';

interface TimelineViewProps {
  staff: Staff[];
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  date: Date;
  onDateChange: (date: Date) => void;
  taskType: 'all' | 'DWS' | 'WS';
  onTaskTypeChange: (type: 'all' | 'DWS' | 'WS') => void;
}

export function TimelineView({ staff, tasks, onTaskClick, date, onDateChange, taskType, onTaskTypeChange }: TimelineViewProps) {
  const [timeRange, setTimeRange] = useState<'8h' | '24h'>('8h');

  const startHour = timeRange === '8h' ? 8 : 0;
  const endHour = timeRange === '8h' ? 16 : 23;
  const hourWidth = timeRange === '8h' ? 120 : 60;

  const timeSlots = calculateTimeSlots(startHour, endHour);

  // Calculate position for "now" indicator (demo fixed at 9:30)
  const nowTime = '09:30';
  const nowHour = 9;
  const nowMinute = 30;
  // Calculate position: hours from start + fraction for minutes
  const hoursFromStart = nowHour - startHour;
  const minuteFraction = nowMinute / 60;
  const nowPosition = (hoursFromStart + minuteFraction) * hourWidth;

  const getStaffTasks = (staffId: string) => {
    return tasks.filter(t => t.staffId === staffId);
  };

  const getTotalStats = () => {
    // Only count tasks for the current date (tasks are already filtered by date from parent)
    const totalEst = tasks.reduce((sum, t) => sum + t.estimatedMinutes, 0);
    const totalActual = tasks.reduce((sum, t) => sum + (t.actualMinutes || 0), 0);

    // Calculate total staff capacity (working hours for the day)
    const staffCapacity = staff.reduce((sum, s) => {
      const start = s.shiftStart.split(':').map(Number);
      const end = s.shiftEnd.split(':').map(Number);
      const startMinutes = start[0] * 60 + start[1];
      const endMinutes = end[0] * 60 + end[1];
      return sum + (endMinutes - startMinutes);
    }, 0);

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

  return (
    <div className="flex flex-col h-full">
      {/* Header with date filters and stats */}
      <div className="px-6 py-3 border-b bg-white space-y-3">
        {/* Date Navigation and Filters */}
        <TaskFilters
          currentDate={date}
          onDateChange={onDateChange}
          taskType={taskType}
          onTaskTypeChange={onTaskTypeChange}
        />

        {/* Stats and view toggle */}
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
            {/* Task Type Legend */}
            <div className="flex items-center gap-3 text-sm">
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

          <div className="flex gap-2">
            <Button
              variant={timeRange === '8h' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange('8h')}
            >
              8 hour
            </Button>
            <Button
              variant={timeRange === '24h' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange('24h')}
            >
              24 hour
            </Button>
          </div>
        </div>
      </div>

      {/* Timeline grid */}
      <div className="flex-1 overflow-auto bg-white">
        <div className="min-w-max relative">
          {/* Time header */}
          <div className="sticky top-0 z-10 bg-white border-b flex">
            <div className="w-32 shrink-0 border-r px-4 py-3">
              <span className="text-sm">Staff</span>
            </div>
            <div className="flex relative">
              {timeSlots.map((time) => (
                <div
                  key={time}
                  className="border-r px-2 py-3 text-center text-sm text-gray-600"
                  style={{ width: `${hourWidth}px` }}
                >
                  {time}
                </div>
              ))}

              {/* Now indicator circle in header */}
              <div
                className="absolute"
                style={{ left: `${nowPosition}px`, bottom: '-6px', zIndex: 50, transform: 'translateX(-50%)' }}
              >
                <div className="w-3 h-3 rounded-full bg-red-500 shadow-lg"></div>
              </div>
            </div>
          </div>

          {/* Staff rows */}
          {staff.map((staffMember) => {
            const staffTasks = getStaffTasks(staffMember.id);

            return (
              <div key={staffMember.id} className="flex border-b hover:bg-gray-50">
                <div className="w-32 shrink-0 border-r px-4 py-3 flex flex-col justify-center bg-white">
                  <div className="text-sm">{staffMember.name}</div>
                  <div className="text-xs text-gray-500">
                    {staffMember.shiftStart} - {staffMember.shiftEnd}
                  </div>
                </div>

                <div className="flex-1 relative py-3 overflow-hidden" style={{ height: '100px' }}>
                  {/* Now indicator line for this row */}
                  <div
                    className="absolute bg-red-500 shadow-sm pointer-events-none"
                    style={{ 
                      left: `${nowPosition}px`, 
                      top: '0px',
                      bottom: '0px',
                      width: '2px',
                      height: '100%',
                      zIndex: 100,
                      transform: 'translateX(-50%)'
                    }}
                  ></div>

                  {/* Grid lines for hour blocks */}
                  <div className="absolute inset-0 flex pointer-events-none" style={{ zIndex: 1 }}>
                    {timeSlots.map((time) => (
                      <div
                        key={time}
                        className="border-r border-gray-100"
                        style={{ width: `${hourWidth}px` }}
                      />
                    ))}
                  </div>

                  {/* Tasks */}
                  {staffTasks.map((task, idx) => {
                    const taskStartHour = parseInt(task.startTime.split(':')[0]);
                    const taskEndHour = parseInt(task.endTime.split(':')[0]);

                    // Skip tasks that are completely outside the visible range
                    if (taskEndHour <= startHour || taskStartHour > endHour) {
                      return null;
                    }

                    // Calculate base position and width with padding
                    const padding = 4; // 4px on each side for spacing from grid lines
                    let baseLeft = getTaskPosition(task.startTime, startHour) * hourWidth + padding;
                    let baseWidth = getTaskWidth(task.startTime, task.endTime) * hourWidth - (padding * 2);

                    // If task starts before visible range, adjust position and width
                    if (taskStartHour < startHour) {
                      const minutesBeforeStart = (startHour - taskStartHour) * 60 - parseInt(task.startTime.split(':')[1]);
                      const hoursBeforeStart = minutesBeforeStart / 60;
                      baseWidth = baseWidth - (hoursBeforeStart * hourWidth);
                      baseLeft = padding; // Keep padding from left edge
                    }

                    // If task ends after visible range, clip the width
                    if (taskEndHour > endHour) {
                      const visibleEndTime = `${endHour}:59`;
                      baseWidth = getTaskWidth(
                        taskStartHour < startHour ? `${startHour}:00` : task.startTime,
                        visibleEndTime
                      ) * hourWidth - (padding * 2);
                    }

                    // Don't render if width is too small
                    if (baseWidth < 20) {
                      return null;
                    }

                    // Calculate task time in minutes for overlap detection
                    const taskStart = parseInt(task.startTime.split(':')[0]) * 60 + parseInt(task.startTime.split(':')[1]);
                    const taskEnd = parseInt(task.endTime.split(':')[0]) * 60 + parseInt(task.endTime.split(':')[1]);

                    // Find all tasks that overlap with current task
                    const overlappingTasks = staffTasks.filter((t, i) => {
                      if (i === idx) return false; // Don't compare with itself
                      const tStart = parseInt(t.startTime.split(':')[0]) * 60 + parseInt(t.startTime.split(':')[1]);
                      const tEnd = parseInt(t.endTime.split(':')[0]) * 60 + parseInt(t.endTime.split(':')[1]);
                      return (taskStart < tEnd && taskEnd > tStart);
                    });

                    // Vertical stacking logic
                    const containerHeight = 90; // Available height in the row (100px - padding)
                    const stackGap = 3; // Gap between stacked tasks
                    let taskHeight = containerHeight;
                    let taskTop = 5; // Default top padding
                    let stackPosition = 0; // 0 for first task, 1 for second task

                    if (overlappingTasks.length > 0) {
                      // Split height between overlapping tasks (max 2)
                      const totalTasks = 2; // Max 2 parallel tasks
                      taskHeight = (containerHeight - stackGap) / totalTasks;

                      // Determine stack position (0 = top, 1 = bottom)
                      const earlierOverlaps = overlappingTasks.filter(t => {
                        const tIdx = staffTasks.findIndex(st => st.id === t.id);
                        return tIdx < idx;
                      });

                      stackPosition = earlierOverlaps.length > 0 ? 1 : 0;
                      taskTop = 5 + (stackPosition * (taskHeight + stackGap));
                    }

                    // Use full width for horizontal positioning
                    const finalLeft = baseLeft;
                    const finalWidth = baseWidth;

                    // Determine if card is narrow (< 100px) for minimal view
                    const isNarrow = finalWidth < 100;

                    return (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onClick={() => onTaskClick(task)}
                        compact={overlappingTasks.length > 0}
                        narrow={isNarrow}
                        style={{
                          position: 'absolute',
                          left: `${Math.max(0, finalLeft)}px`,
                          width: `${finalWidth}px`,
                          top: `${taskTop}px`,
                          height: `${taskHeight}px`,
                          zIndex: 10,
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
