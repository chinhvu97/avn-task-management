import { useState } from 'react';
import { Task, Staff } from '../types';
import { getStatusColor, getTaskTypeColor } from '../lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { ArrowUpDown } from 'lucide-react';
import { TaskFilters } from './TaskFilters';

interface ListViewProps {
  tasks: Task[];
  staff: Staff[];
  onTaskClick: (task: Task) => void;
  currentDate: Date;
  onDateChange: (date: Date) => void;
  taskType: 'all' | 'DWS' | 'WS';
  onTaskTypeChange: (type: 'all' | 'DWS' | 'WS') => void;
}

type SortField = 'title' | 'staff' | 'status' | 'type' | 'startTime' | 'estimatedMinutes';

export function ListView({ tasks, staff, onTaskClick, currentDate, onDateChange, taskType, onTaskTypeChange }: ListViewProps) {
  const [sortField, setSortField] = useState<SortField>('startTime');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const getStaffName = (staffId: string) => {
    return staff.find(s => s.id === staffId)?.name || 'Unknown';
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    let aVal: any = a[sortField];
    let bVal: any = b[sortField];

    if (sortField === 'staff') {
      aVal = getStaffName(a.staffId);
      bVal = getStaffName(b.staffId);
    }

    if (typeof aVal === 'string') {
      return sortDirection === 'asc' 
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }

    return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
  });

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

      {/* Table content */}
      <div className="flex-1 overflow-auto bg-white p-6">
        <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <button
                onClick={() => handleSort('title')}
                className="flex items-center gap-2 hover:opacity-70"
              >
                Task Name
                <ArrowUpDown className="w-4 h-4" />
              </button>
            </TableHead>
            <TableHead>
              <button
                onClick={() => handleSort('staff')}
                className="flex items-center gap-2 hover:opacity-70"
              >
                Staff
                <ArrowUpDown className="w-4 h-4" />
              </button>
            </TableHead>
            <TableHead>
              <button
                onClick={() => handleSort('type')}
                className="flex items-center gap-2 hover:opacity-70"
              >
                Type
                <ArrowUpDown className="w-4 h-4" />
              </button>
            </TableHead>
            <TableHead>
              <button
                onClick={() => handleSort('status')}
                className="flex items-center gap-2 hover:opacity-70"
              >
                Status
                <ArrowUpDown className="w-4 h-4" />
              </button>
            </TableHead>
            <TableHead>
              <button
                onClick={() => handleSort('startTime')}
                className="flex items-center gap-2 hover:opacity-70"
              >
                Time
                <ArrowUpDown className="w-4 h-4" />
              </button>
            </TableHead>
            <TableHead>
              <button
                onClick={() => handleSort('estimatedMinutes')}
                className="flex items-center gap-2 hover:opacity-70"
              >
                Duration
                <ArrowUpDown className="w-4 h-4" />
              </button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedTasks.map((task) => (
            <TableRow
              key={task.id}
              onClick={() => onTaskClick(task)}
              className="cursor-pointer hover:bg-gray-50"
            >
              <TableCell>{task.title}</TableCell>
              <TableCell>{getStaffName(task.staffId)}</TableCell>
              <TableCell>
                <span className={`${getTaskTypeColor(task.type)} text-white text-xs px-2 py-1 rounded`}>
                  {task.type}
                </span>
              </TableCell>
              <TableCell>
                <span className={`${getStatusColor(task.status)} text-xs px-2 py-1 rounded border`}>
                  {task.status}
                </span>
              </TableCell>
              <TableCell className="text-sm">
                {task.startTime} - {task.endTime}
              </TableCell>
              <TableCell className="text-sm">
                {task.estimatedMinutes} min
                {task.actualMinutes && ` (${task.actualMinutes} actual)`}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
    </div>
  );
}
