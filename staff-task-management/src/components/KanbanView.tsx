import { Task, TaskStatus } from '../types';
import { TaskCard } from './TaskCard';
import { TaskFilters } from './TaskFilters';

interface KanbanViewProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  currentDate: Date;
  onDateChange: (date: Date) => void;
  taskType: 'all' | 'DWS' | 'WS';
  onTaskTypeChange: (type: 'all' | 'DWS' | 'WS') => void;
}

const statuses: TaskStatus[] = ['Open', 'Processing', 'Pending', 'Awaiting Approval', 'Done', 'Cancelled'];

export function KanbanView({ tasks, onTaskClick, currentDate, onDateChange, taskType, onTaskTypeChange }: KanbanViewProps) {
  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter(t => t.status === status);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Date filters header */}
      <div className="px-6 py-3 border-b bg-white">
        <TaskFilters
          currentDate={currentDate}
          onDateChange={onDateChange}
          taskType={taskType}
          onTaskTypeChange={onTaskTypeChange}
        />
      </div>

      {/* Kanban board */}
      <div className="flex-1 overflow-auto bg-gray-50 p-6">
        <div className="flex gap-4 h-full">
        {statuses.map((status) => {
          const statusTasks = getTasksByStatus(status);
          
          return (
            <div
              key={status}
              className="flex-1 min-w-[280px] bg-white rounded-xl p-4 flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm">{status}</h3>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                  {statusTasks.length}
                </span>
              </div>
              
              <div className="flex-1 overflow-auto space-y-3">
                {statusTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onClick={() => onTaskClick(task)}
                    className="w-full"
                  />
                ))}
              </div>
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
}
