import { useState } from 'react';
import { ClipboardList, CalendarClock, Trophy } from 'lucide-react';
import { Task, ViewMode } from './types';
import { mockStaff, mockTasks, mockShifts, allStaff } from './lib/mockData';
import { Header } from './components/Header';
import { TimelineView } from './components/TimelineView';
import { KanbanView } from './components/KanbanView';
import { ListView } from './components/ListView';
import { ShiftManagement } from './components/ShiftManagement';
import { Leaderboard } from './components/Leaderboard';
import { TaskDetailDialog } from './components/TaskDetailDialog';
import { Tabs, TabsList, TabsTrigger } from './components/ui/tabs';

type Page = 'tasks' | 'shifts' | 'leaderboard';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('tasks');
  const [viewMode, setViewMode] = useState<ViewMode>('timeline');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [taskType, setTaskType] = useState<'all' | 'DWS' | 'WS'>('all');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState(mockTasks);

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    const taskDate = new Date(task.date);
    const isSameDate = taskDate.toDateString() === currentDate.toDateString();
    const matchesType = taskType === 'all' || task.type === taskType;
    return isSameDate && matchesType;
  });

  const handleStatusChange = (taskId: string, newStatus: Task['status'], updates?: Partial<Task>) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const updatedTask = { ...task, status: newStatus, ...updates };
        
        // If completing, add actual time (mock: slightly different from estimated)
        if (newStatus === 'Done' || newStatus === 'Awaiting Approval') {
          if (!updatedTask.actualMinutes) {
            updatedTask.actualMinutes = task.estimatedMinutes + Math.floor(Math.random() * 10 - 5);
          }
        }
        
        return updatedTask;
      }
      return task;
    }));
    
    setSelectedTask(null);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Top Header */}
      <Header currentDate={currentDate} />

      {/* Page Content */}
      <div className="flex-1 overflow-hidden">
        {currentPage === 'tasks' && (
          <div className="flex flex-col h-full bg-white">
            {/* Page Header */}
            <div className="px-6 py-4 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Task Management</h2>
                <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as ViewMode)}>
                  <TabsList>
                    <TabsTrigger value="timeline">Timeline</TabsTrigger>
                    <TabsTrigger value="kanban">Kanban</TabsTrigger>
                    <TabsTrigger value="list">List</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>

            {/* View Content */}
            {viewMode === 'timeline' && (
              <TimelineView
                staff={mockStaff}
                tasks={filteredTasks}
                onTaskClick={setSelectedTask}
                date={currentDate}
                onDateChange={setCurrentDate}
                taskType={taskType}
                onTaskTypeChange={setTaskType}
              />
            )}

            {viewMode === 'kanban' && (
              <KanbanView
                tasks={filteredTasks}
                onTaskClick={setSelectedTask}
                currentDate={currentDate}
                onDateChange={setCurrentDate}
                taskType={taskType}
                onTaskTypeChange={setTaskType}
              />
            )}

            {viewMode === 'list' && (
              <ListView
                tasks={filteredTasks}
                staff={mockStaff}
                onTaskClick={setSelectedTask}
                currentDate={currentDate}
                onDateChange={setCurrentDate}
                taskType={taskType}
                onTaskTypeChange={setTaskType}
              />
            )}
          </div>
        )}

        {currentPage === 'shifts' && (
          <ShiftManagement staff={mockStaff} shifts={mockShifts} tasks={tasks} />
        )}

        {currentPage === 'leaderboard' && (
          <Leaderboard staff={allStaff} shifts={mockShifts} tasks={tasks} />
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white border-t px-6 py-3">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <button
            onClick={() => setCurrentPage('tasks')}
            className={`flex flex-col items-center gap-1 px-6 py-2 rounded-lg transition-colors ${
              currentPage === 'tasks'
                ? 'text-custom-pink bg-custom-pink-light'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <ClipboardList className="w-5 h-5" />
            <span className="text-xs">Tasks</span>
          </button>

          <button
            onClick={() => setCurrentPage('shifts')}
            className={`flex flex-col items-center gap-1 px-6 py-2 rounded-lg transition-colors ${
              currentPage === 'shifts'
                ? 'text-custom-pink bg-custom-pink-light'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <CalendarClock className="w-5 h-5" />
            <span className="text-xs">Shifts</span>
          </button>

          <button
            onClick={() => setCurrentPage('leaderboard')}
            className={`flex flex-col items-center gap-1 px-6 py-2 rounded-lg transition-colors ${
              currentPage === 'leaderboard'
                ? 'text-custom-pink bg-custom-pink-light'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Trophy className="w-5 h-5" />
            <span className="text-xs">Ranking</span>
          </button>
        </div>
      </div>

      {/* Task Detail Dialog */}
      <TaskDetailDialog
        task={selectedTask}
        staff={mockStaff}
        open={!!selectedTask}
        onClose={() => setSelectedTask(null)}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}
