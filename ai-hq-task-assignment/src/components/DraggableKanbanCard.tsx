import { useDraggable } from '@dnd-kit/core';

interface Task {
  id: string;
  title: string;
  status: string;
  type: string;
  category: string;
  assignee: string;
  avatar: string;
  startTime: string;
  endTime: string;
  priority: string;
  progress: number;
}

interface DraggableKanbanCardProps {
  task: Task;
  getStatusColor: (status: string) => string;
  getTypeDotColor: (type: string) => string;
  getPriorityColor: (priority: string) => string;
}

export function DraggableKanbanCard({
  task,
  getStatusColor,
  getTypeDotColor,
  getPriorityColor
}: DraggableKanbanCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
    data: {
      taskId: task.id,
      status: task.status,
      type: 'kanban-card',
    },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0.5 : 1,
        cursor: isDragging ? 'grabbing' : 'grab',
        zIndex: isDragging ? 1000 : 1,
      }
    : { cursor: 'grab' };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`w-full text-left rounded-lg border-2 p-3 transition-all hover:shadow-lg ${getStatusColor(task.status)}`}
      style={style}
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
    </div>
  );
}
