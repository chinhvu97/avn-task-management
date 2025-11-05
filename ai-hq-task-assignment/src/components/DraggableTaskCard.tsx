import { useDraggable } from '@dnd-kit/core';

interface Task {
  id: string;
  title: string;
  staffId: string;
  status: string;
  type: string;
  startTime: string;
  endTime: string;
}

interface DraggableTaskCardProps {
  task: Task;
  style: React.CSSProperties;
  getStatusColor: (status: string) => string;
  getTypeDotColor: (type: string) => string;
}

export function DraggableTaskCard({
  task,
  style,
  getStatusColor,
  getTypeDotColor
}: DraggableTaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
    data: {
      taskId: task.id,
      staffId: task.staffId,
      type: 'task',
    },
  });

  const dragStyle: React.CSSProperties = transform
    ? {
        ...style,
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0.5 : 1,
        cursor: isDragging ? 'grabbing' : 'grab',
        zIndex: isDragging ? 1000 : (style.zIndex as number) || 10,
      }
    : { ...style, cursor: 'grab' };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`absolute rounded-lg border-2 p-2 transition-all hover:shadow-lg ${getStatusColor(task.status)}`}
      style={dragStyle}
    >
      <div className="flex items-start justify-between gap-1 mb-1">
        <span className="text-xs font-medium flex-1 truncate">{task.title}</span>
        <div className={`w-3 h-3 rounded-full shrink-0 mt-0.5 ${getTypeDotColor(task.type)} shadow-sm`}></div>
      </div>
      <div className="opacity-70" style={{ fontSize: '10px', lineHeight: '1.2' }}>
        {task.startTime} - {task.endTime}
      </div>
    </div>
  );
}
