import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface DateNavigationProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  taskType: 'all' | 'DWS' | 'WS';
  onTaskTypeChange: (type: 'all' | 'DWS' | 'WS') => void;
}

export function DateNavigation({ currentDate, onDateChange, taskType, onTaskTypeChange }: DateNavigationProps) {
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

  return (
    <div className="flex items-center justify-between px-6 py-3 border-b bg-white">
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={goToToday}
        >
          Today
        </Button>
        <div className="flex items-center gap-2 text-sm">
          <button onClick={goToPreviousDay} className="hover:opacity-70 text-gray-600">
            YESTERDAY
          </button>
          <span className="text-gray-300">•</span>
          <button onClick={goToNextDay} className="hover:opacity-70 text-gray-600">
            TOMORROW
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">
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
    </div>
  );
}
