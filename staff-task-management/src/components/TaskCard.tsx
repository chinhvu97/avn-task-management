import { Task } from '../types';
import { getStatusColor, getTaskTypeColor } from '../lib/utils';

interface TaskCardProps {
  task: Task;
  onClick: () => void;
  style?: React.CSSProperties;
  className?: string;
  compact?: boolean; // For stacked/parallel tasks with limited height
  narrow?: boolean; // For 24-hour view with limited width
}

export function TaskCard({ task, onClick, style, className = '', compact = false, narrow = false }: TaskCardProps) {
  // Get the background color for the dot (extract from badge color)
  const getDotColor = (type: string) => {
    return type === 'DWS' ? 'bg-blue-500' : 'bg-orange-500';
  };

  return (
    <button
      onClick={onClick}
      style={style}
      className={`text-left rounded-lg border-2 p-2 transition-all hover:shadow-lg hover:scale-105 flex flex-col justify-between ${getStatusColor(task.status)} ${className}`}
    >
      {narrow ? (
        // Narrow view: Only show colored dot on right + task name
        <div className="flex items-start justify-between gap-1 overflow-hidden">
          <span className={`text-xs flex-1 min-w-0 leading-tight overflow-hidden ${compact ? 'truncate whitespace-nowrap' : 'line-clamp-2'}`}>
            {task.title}
          </span>
          <div className={`w-2 h-2 rounded-full shrink-0 mt-0.5 ${getDotColor(task.type)}`}></div>
        </div>
      ) : (
        // Both compact and normal view: Title at top, time at bottom
        <>
          <div className="flex items-start justify-between gap-1">
            <span className={`text-xs flex-1 min-w-0 ${compact ? 'truncate whitespace-nowrap' : 'line-clamp-2'} overflow-hidden`}>{task.title}</span>
            <div className={`w-2 h-2 rounded-full shrink-0 mt-0.5 ${getDotColor(task.type)}`}></div>
          </div>
          <div className="text-[10px] opacity-70">
            {task.startTime} - {task.endTime}
          </div>
        </>
      )}
    </button>
  );
}
