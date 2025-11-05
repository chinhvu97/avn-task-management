import { useDroppable } from '@dnd-kit/core';
import { ReactNode } from 'react';

interface DroppableKanbanColumnProps {
  status: string;
  children: ReactNode;
  count: number;
}

export function DroppableKanbanColumn({ status, children, count }: DroppableKanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
    data: {
      status,
      type: 'kanban-column',
    },
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 min-w-[280px] bg-white rounded-xl p-4 flex flex-col transition-all ${
        isOver ? 'ring-2 ring-pink-400 bg-pink-50' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium">{status}</h3>
        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
          {count}
        </span>
      </div>

      <div className="flex-1 overflow-auto space-y-3">
        {children}
      </div>
    </div>
  );
}
