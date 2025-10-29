import { dwsTemplates } from './templates/dwsTemplates';
import { wsTemplates } from './templates/wsTemplates';
import { staff as allStaff } from './master/staff';
import { TaskType, TaskStatus } from './types';

export interface Task {
  id: string;
  title: string;
  staffId: string;
  status: TaskStatus;
  type: TaskType;
  startTime: string;
  endTime: string;
  estimatedMinutes: number;
  actualMinutes?: number;
  date: string;
  guide?: string;
  sampleImages?: string[];
  completionPhotos?: string[];
  aiVerificationStatus?: 'pending' | 'passed' | 'failed' | 'not_required';
  requiresHQApproval?: boolean;
}

const today = new Date().toISOString().split('T')[0];

// Generate tasks for the month
const generateMonthTasks = (): Task[] => {
  const tasks: Task[] = [];
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // DWS tasks - Map shared templates to local format
  const dwsTaskTemplates = dwsTemplates.map(t => ({
    title: t.title,
    duration: t.estimatedMinutes,
    guide: t.manualGuide,
    description: t.description
  }));

  // WS tasks - Group by event for task generation
  const wsEventTemplates = [
    {
      event: 'Christmas',
      tasks: wsTemplates
        .filter(t => t.event === 'Christmas')
        .map(t => ({ title: t.title, duration: t.estimatedMinutes }))
    },
    {
      event: 'New Year',
      tasks: wsTemplates
        .filter(t => t.event === 'New Year')
        .map(t => ({ title: t.title, duration: t.estimatedMinutes }))
    },
    {
      event: 'Valentine\'s Day',
      tasks: wsTemplates
        .filter(t => t.event === 'Valentine\'s Day')
        .map(t => ({ title: t.title, duration: t.estimatedMinutes }))
    },
    {
      event: 'Safety Inspection',
      tasks: wsTemplates
        .filter(t => t.event === 'Safety Inspection')
        .map(t => ({ title: t.title, duration: t.estimatedMinutes }))
    },
    {
      event: 'Store Renovation',
      tasks: wsTemplates
        .filter(t => t.event === 'Store Renovation')
        .map(t => ({ title: t.title, duration: t.estimatedMinutes }))
    },
    {
      event: 'Lunar New Year',
      tasks: wsTemplates
        .filter(t => t.event === 'Lunar New Year')
        .map(t => ({ title: t.title, duration: t.estimatedMinutes }))
    },
    {
      event: 'Women\'s Day',
      tasks: wsTemplates
        .filter(t => t.event === 'Women\'s Day')
        .map(t => ({ title: t.title, duration: t.estimatedMinutes }))
    },
    {
      event: 'Back to School',
      tasks: wsTemplates
        .filter(t => t.event === 'Back to School')
        .map(t => ({ title: t.title, duration: t.estimatedMinutes }))
    },
    {
      event: 'Summer Sale',
      tasks: wsTemplates
        .filter(t => t.event === 'Summer Sale')
        .map(t => ({ title: t.title, duration: t.estimatedMinutes }))
    },
    {
      event: 'Mid-Autumn Festival',
      tasks: wsTemplates
        .filter(t => t.event === 'Mid-Autumn Festival')
        .map(t => ({ title: t.title, duration: t.estimatedMinutes }))
    },
  ];

  let taskIdCounter = 1;

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dateStr = date.toISOString().split('T')[0];
    const isPast = date < new Date(today);
    const isToday = dateStr === today;

    // Determine if there's a WS event on this day (30% of days have events)
    const dayEventSeed = day * 13;
    let hasEvent = dayEventSeed % 10 < 3; // 30% chance
    let eventIndex = hasEvent ? dayEventSeed % wsEventTemplates.length : -1;

    // Always ensure TODAY has WS tasks for client demonstration
    if (isToday) {
      hasEvent = true;
      eventIndex = eventIndex >= 0 ? eventIndex : (dayEventSeed % wsEventTemplates.length);
    }

    const todayEvent = hasEvent ? wsEventTemplates[eventIndex] : null;

    // Track which staff members get WS tasks for this event (2-3 staff only)
    let numWSStaff = hasEvent ? (2 + (dayEventSeed % 2)) : 0;

    // Always ensure TODAY has WS tasks assigned to more staff for visibility
    if (isToday && hasEvent) {
      numWSStaff = allStaff.length; // Assign to ALL staff members for better visibility
    }

    // For today, assign WS tasks to ALL staff members for visibility
    const wsStaffIndices = hasEvent
      ? (isToday
          ? Array.from({length: numWSStaff}, (_, i) => i) // All staff members
          : Array.from({length: numWSStaff}, (_, i) => (dayEventSeed + i) % allStaff.length))
      : [];

    allStaff.forEach((staff, staffIndex) => {
      // Determine if this staff member gets WS tasks today
      const getsWSTask = wsStaffIndices.includes(staffIndex);

      // Determine number of tasks per staff per day (8-12 tasks)
      const seed = parseInt(staff.id.replace(/\D/g, '') || '0') * 100 + day;
      const numTasks = 8 + (seed % 5); // 8-12 tasks

      const shiftStart = parseInt(staff.shiftStart.split(':')[0]);
      const shiftEnd = parseInt(staff.shiftEnd.split(':')[0]);
      const shiftDuration = shiftEnd - shiftStart;

      // Helper function to round to nearest quarter hour
      const roundToQuarterHour = (minutes: number): number => {
        const remainder = minutes % 15;
        if (remainder < 8) {
          return minutes - remainder;
        } else {
          return minutes + (15 - remainder);
        }
      };

      let currentTime = roundToQuarterHour(shiftStart * 60);
      const shiftEndMinutes = shiftEnd * 60;
      let previousWasOverlapping = false;

      // Determine how many WS tasks this staff gets (if any)
      const numWSTasksForStaff = getsWSTask && todayEvent ? Math.min(2 + (seed % 2), todayEvent.tasks.length) : 0;
      let wsTasksAssigned = 0;

      for (let i = 0; i < numTasks && currentTime < shiftEndMinutes; i++) {
        // Decide if this specific task should be WS or DWS
        let template;
        let taskType: TaskType;
        let guide: string | undefined;

        // Assign WS tasks early in the shift for staff who get them
        const shouldBeWSTask = getsWSTask && wsTasksAssigned < numWSTasksForStaff && i < numWSTasksForStaff + 2;

        if (shouldBeWSTask && todayEvent) {
          const wsTemplate = todayEvent.tasks[wsTasksAssigned % todayEvent.tasks.length];
          template = wsTemplate;
          taskType = 'WS';
          guide = undefined;
          wsTasksAssigned++;
        } else {
          const dwsTemplate = dwsTaskTemplates[taskIdCounter % dwsTaskTemplates.length];
          template = dwsTemplate;
          taskType = 'DWS';
          guide = dwsTemplate.guide;
        }

        let duration = template.duration;

        // For demo purposes: make tasks that will overlap longer
        const canOverlap = !previousWasOverlapping && i > 0;
        const willOverlap = canOverlap && (seed + i) % 10 < 3;
        if (willOverlap) {
          duration = Math.max(duration, 90);
        }

        currentTime = roundToQuarterHour(currentTime);

        let endTime = Math.min(currentTime + duration, shiftEndMinutes);
        endTime = roundToQuarterHour(endTime);

        if (endTime <= currentTime) {
          endTime = currentTime + 15;
        }

        const startHour = Math.floor(currentTime / 60);
        const startMin = currentTime % 60;
        const endHour = Math.floor(endTime / 60);
        const endMin = endTime % 60;

        const startTimeStr = `${String(startHour).padStart(2, '0')}:${String(startMin).padStart(2, '0')}`;
        const endTimeStr = `${String(endHour).padStart(2, '0')}:${String(endMin).padStart(2, '0')}`;

        // Determine status based on date
        let status: TaskStatus;
        const isWS = taskType === 'WS';

        if (isPast) {
          const random = (seed + i) % 10;
          if (random < 8) {
            if (isWS && (random === 6 || random === 7)) status = 'Awaiting Approval';
            else status = 'Done';
          } else if (random === 8) {
            status = 'Cancelled';
          } else {
            if (isWS) status = 'Awaiting Approval';
            else status = 'Processing';
          }
        } else if (isToday) {
          const nowMinutes = 9 * 60 + 30; // 9:30 AM
          const taskStartMinutes = currentTime;
          const taskEndMinutes = endTime;

          if (taskEndMinutes <= nowMinutes) {
            status = 'Done';
          } else if (taskStartMinutes < nowMinutes && taskEndMinutes > nowMinutes) {
            status = 'Processing';
          } else {
            status = 'Open';
          }
        } else {
          status = 'Open';
        }

        const sampleImages = taskType === 'WS' ? [
          'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400&h=400&fit=crop',
          'https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?w=400&h=400&fit=crop',
          'https://images.unsplash.com/photo-1601598851547-4302969d0614?w=400&h=400&fit=crop',
        ] : undefined;

        const task: Task = {
          id: `task-${taskIdCounter}`,
          title: template.title,
          staffId: staff.id,
          status,
          type: taskType,
          startTime: startTimeStr,
          endTime: endTimeStr,
          estimatedMinutes: duration,
          actualMinutes: (isPast || isToday) && status === 'Done' ? duration + ((seed + i) % 10 - 5) : undefined,
          date: dateStr,
          guide,
          sampleImages,
        };

        tasks.push(task);
        taskIdCounter++;

        if (willOverlap) {
          const overlapPercent = 0.3 + ((seed + i) % 30) / 100;
          const actualDuration = endTime - currentTime;
          const timeAdvance = Math.floor(actualDuration * (1 - overlapPercent));
          currentTime = roundToQuarterHour(currentTime + timeAdvance);
          previousWasOverlapping = true;
        } else {
          currentTime = roundToQuarterHour(endTime + 15);
          previousWasOverlapping = false;
        }
      }
    });
  }

  return tasks;
};

export const mockTasks: Task[] = generateMonthTasks();
