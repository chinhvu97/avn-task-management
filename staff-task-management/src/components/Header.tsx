import { Bell } from 'lucide-react';
import { Button } from './ui/button';

interface HeaderProps {
  currentDate: Date;
  storeName?: string;
}

export function Header({ currentDate, storeName = 'AEON MAXVALU OCEAN PARK HAWAII BUILDING' }: HeaderProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-custom-pink text-white">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl">{storeName}</h1>
        <div className="text-sm text-white/80">{formatDate(currentDate)}</div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="text-white hover:bg-white/15 relative"
      >
        <Bell className="w-5 h-5" />
        <span className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full"></span>
      </Button>
    </div>
  );
}
