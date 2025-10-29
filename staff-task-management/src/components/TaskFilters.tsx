import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface TaskFiltersProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  taskType: 'all' | 'DWS' | 'WS';
  onTaskTypeChange: (type: 'all' | 'DWS' | 'WS') => void;
}

export function TaskFilters({ currentDate, onDateChange, taskType, onTaskTypeChange }: TaskFiltersProps) {
  const goToToday = () => onDateChange(new Date());
  const goToPreviousDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    onDateChange(newDate);
  };
  const goToNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    onDateChange(newDate);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={goToPreviousDay}
          className="h-8 w-8"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={goToToday}
          className="px-3"
        >
          Today
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={goToNextDay}
          className="h-8 w-8"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>

        <span className="ml-3 text-sm text-gray-600">
          {formatDate(currentDate)}
        </span>
      </div>

      <Select value={taskType} onValueChange={(value: any) => onTaskTypeChange(value)}>
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Task Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Tasks</SelectItem>
          <SelectItem value="WS">WS</SelectItem>
          <SelectItem value="DWS">DWS</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}