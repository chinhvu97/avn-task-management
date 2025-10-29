import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTime(time: string): string {
  return time;
}

export function formatDate(date: string): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    'Open': 'bg-gray-100 border-gray-300 text-gray-700',
    'Processing': 'bg-purple-100 border-purple-300 text-purple-700',
    'Pending': 'bg-yellow-100 border-yellow-300 text-yellow-700',
    'Awaiting Approval': 'bg-blue-100 border-blue-300 text-blue-700',
    'Done': 'bg-green-100 border-green-300 text-green-700',
    'Cancelled': 'bg-red-100 border-red-300 text-red-700',
  };
  return colors[status] || 'bg-gray-100 border-gray-300 text-gray-700';
}

export function getTaskTypeColor(type: string): string {
  return type === 'DWS' ? 'bg-blue-500' : 'bg-orange-500';
}

export function calculateTimeSlots(startHour: number, endHour: number, interval: number = 1): string[] {
  const slots: string[] = [];
  for (let hour = startHour; hour <= endHour; hour += interval) {
    slots.push(`${hour}:00`);
  }
  return slots;
}

export function getTaskPosition(startTime: string, startHour: number): number {
  const [hours, minutes] = startTime.split(':').map(Number);
  return ((hours - startHour) * 60 + minutes) / 60;
}

export function getTaskWidth(startTime: string, endTime: string): number {
  const [startHours, startMinutes] = startTime.split(':').map(Number);
  const [endHours, endMinutes] = endTime.split(':').map(Number);
  const startTotal = startHours * 60 + startMinutes;
  const endTotal = endHours * 60 + endMinutes;
  return (endTotal - startTotal) / 60;
}
