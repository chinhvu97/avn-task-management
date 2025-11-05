import { useDroppable } from '@dnd-kit/core';
import { ReactNode } from 'react';

interface DroppableStaffRowProps {
  staffId: string;
  children: ReactNode;
  style?: React.CSSProperties;
}

export function DroppableStaffRow({ staffId, children, style }: DroppableStaffRowProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: staffId,
    data: {
      staffId,
      type: 'staff-row',
    },
  });

  return (
    <td
      ref={setNodeRef}
      className={`relative p-0 transition-all ${
        isOver ? 'bg-blue-50 ring-2 ring-blue-400 ring-inset' : ''
      }`}
      style={style || { height: '100px' }}
    >
      {children}
    </td>
  );
}
