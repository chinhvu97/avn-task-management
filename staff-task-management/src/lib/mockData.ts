import { Staff, Task, Shift, LeaderboardEntry, TaskType, TaskStatus } from '../types';
import { dwsTemplates, wsTemplates, staff as sharedStaff, getStaffByBuilding } from 'shared-data';

// ============================================
// STAFF DATA (Now using shared-data)
// ============================================
// Use shared staff from all 9 AEON stores (45 total staff)
export const allStaff: Staff[] = sharedStaff;

// DEMO STORE - Main store for full workflow demonstration
export const mockStaff: Staff[] = getStaffByBuilding('AEON MAXVALU OCEAN PARK HAWAII BUILDING');

const today = new Date().toISOString().split('T')[0];
const yesterday = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0];
const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0];

console.log('Mock Data - Today:', today);

// Generate tasks for the month
const generateMonthTasks = (): Task[] => {
  const tasks: Task[] = [];
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  console.log('Generating tasks for:', year, month + 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // DWS tasks - NOW USING SHARED TEMPLATES (110 tasks from shared-data)
  // Map shared templates to local format for task generation
  const dwsTaskTemplates = dwsTemplates.map(t => ({
    title: t.title,
    duration: t.estimatedMinutes,
    guide: t.manualGuide,
    description: t.description
  }));

  // WS tasks - NOW USING SHARED TEMPLATES (10 tasks from shared-data)
  // Group by event for task generation - All 10 event types
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
    const dayEventSeed = day * 13; // Use day-based seed for consistency across all staff
    let hasEvent = dayEventSeed % 10 < 3; // 30% chance
    let eventIndex = hasEvent ? dayEventSeed % wsEventTemplates.length : -1;

    // Special case: Ensure October 27, 2025 has WS tasks for demonstration
    if (dateStr === '2025-10-27') {
      hasEvent = true;
      eventIndex = 4; // Christmas event for visibility
    }

    // Always ensure TODAY has WS tasks for client demonstration
    if (isToday) {
      console.log('Found TODAY! dateStr:', dateStr, 'Setting hasEvent=true');
      hasEvent = true;
      eventIndex = eventIndex >= 0 ? eventIndex : (dayEventSeed % wsEventTemplates.length);
    }

    const todayEvent = hasEvent ? wsEventTemplates[eventIndex] : null;

    // Track which staff members get WS tasks for this event (2-3 staff only)
    let numWSStaff = hasEvent ? (2 + (dayEventSeed % 2)) : 0; // 2-3 staff get WS tasks

    // Special case: For October 27, 2025, assign WS tasks to more staff for visibility
    if (dateStr === '2025-10-27') {
      numWSStaff = 5; // Assign to 5 staff members instead of 2-3
    }

    // Always ensure TODAY has WS tasks assigned to more staff for visibility
    if (isToday && hasEvent) {
      console.log('Setting numWSStaff to ALL staff for TODAY');
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
          // Round down
          return minutes - remainder;
        } else {
          // Round up
          return minutes + (15 - remainder);
        }
      };

      let currentTime = roundToQuarterHour(shiftStart * 60); // Convert to minutes and round
      const shiftEndMinutes = shiftEnd * 60;
      let previousWasOverlapping = false; // Track if last task was overlapping

      // Determine how many WS tasks this staff gets (if any)
      const numWSTasksForStaff = getsWSTask && todayEvent ? Math.min(2 + (seed % 2), todayEvent.tasks.length) : 0; // 2-3 WS tasks
      let wsTasksAssigned = 0;

      for (let i = 0; i < numTasks && currentTime < shiftEndMinutes; i++) {
        // Decide if this specific task should be WS or DWS
        let template;
        let taskType: TaskType;
        let guide: string | undefined;

        // Assign WS tasks early in the shift for staff who get them
        const shouldBeWSTask = getsWSTask && wsTasksAssigned < numWSTasksForStaff && i < numWSTasksForStaff + 2;

        if (shouldBeWSTask && todayEvent) {
          // Pick from WS event tasks
          const wsTemplate = todayEvent.tasks[wsTasksAssigned % todayEvent.tasks.length];
          template = wsTemplate;
          taskType = 'WS';
          guide = undefined;
          wsTasksAssigned++;
        } else {
          // Pick from DWS tasks
          const dwsTemplate = dwsTaskTemplates[taskIdCounter % dwsTaskTemplates.length];
          template = dwsTemplate;
          taskType = 'DWS';
          guide = dwsTemplate.guide;
        }

        let duration = template.duration;

        // For demo purposes: make tasks that will overlap longer (min 90 minutes) so titles are visible
        const canOverlap = !previousWasOverlapping && i > 0;
        const willOverlap = canOverlap && (seed + i) % 10 < 3; // 30% chance
        if (willOverlap) {
          duration = Math.max(duration, 90); // Ensure overlapping tasks are at least 90 minutes
        }

        // Round start time to quarter hour
        currentTime = roundToQuarterHour(currentTime);

        // Calculate end time and round to quarter hour
        let endTime = Math.min(currentTime + duration, shiftEndMinutes);
        endTime = roundToQuarterHour(endTime);

        // Ensure minimum task duration of 15 minutes
        if (endTime <= currentTime) {
          endTime = currentTime + 15;
        }

        // Format times
        const startHour = Math.floor(currentTime / 60);
        const startMin = currentTime % 60;
        const endHour = Math.floor(endTime / 60);
        const endMin = endTime % 60;

        const startTimeStr = `${String(startHour).padStart(2, '0')}:${String(startMin).padStart(2, '0')}`;
        const endTimeStr = `${String(endHour).padStart(2, '0')}:${String(endMin).padStart(2, '0')}`;

        // Determine status based on date and staff level
        let status: TaskStatus;
        const isRegional = staff.id.startsWith('r');
        const isGlobal = staff.id.startsWith('g');

        if (isPast) {
          // Higher completion rates for regional and global staff
          const random = (seed + i) % 10;
          const isWS = taskType === 'WS';

          if (isGlobal) {
            // Global: 95% Done, 3% Cancelled, 2% other statuses
            if (random < 9 || random === 9) {
              // For WS tasks, some should be "Awaiting Approval" instead of "Done"
              if (isWS && random === 9) status = 'Awaiting Approval';
              else status = 'Done';
            } else {
              status = 'Cancelled';
            }
          } else if (isRegional) {
            // Regional: 90% Done, 5% Cancelled, 5% other statuses
            if (random < 9) {
              // For WS tasks, some should be "Awaiting Approval" instead of "Done"
              if (isWS && (random === 7 || random === 8)) status = 'Awaiting Approval';
              else status = 'Done';
            } else {
              status = 'Cancelled';
            }
          } else {
            // Store: 80% Done, 10% Cancelled, 10% other statuses
            if (random < 8) {
              // For WS tasks, some should be "Awaiting Approval" instead of "Done"
              if (isWS && (random === 6 || random === 7)) status = 'Awaiting Approval';
              else status = 'Done';
            } else if (random === 8) {
              status = 'Cancelled';
            } else {
              // DWS tasks can be "Processing", but WS tasks awaiting approval
              if (isWS) status = 'Awaiting Approval';
              else status = 'Processing';
            }
          }
        } else if (isToday) {
          // Today: status based on "now" time (9:30)
          const nowMinutes = 9 * 60 + 30; // 9:30 = 570 minutes
          const taskStartMinutes = currentTime;
          const taskEndMinutes = endTime;

          if (taskEndMinutes <= nowMinutes) {
            // Task ends before 9:30 → Done
            status = 'Done';
          } else if (taskStartMinutes < nowMinutes && taskEndMinutes > nowMinutes) {
            // Task starts before 9:30 and ends after 9:30 → Processing
            status = 'Processing';
          } else {
            // Task starts after 9:30 → Open
            status = 'Open';
          }
        } else {
          // Future: all Open
          status = 'Open';
        }

        // Add sample images for WS tasks
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

        // Move to next task - max 2 parallel tasks at a time
        // Only allow overlap if previous task was NOT overlapping
        // Note: willOverlap was already calculated above for duration adjustment

        if (willOverlap) {
          // Create parallel task: move forward by only part of the duration
          // Overlap by 30-60% of the task duration
          const overlapPercent = 0.3 + ((seed + i) % 30) / 100; // 30-60%
          const actualDuration = endTime - currentTime;
          const timeAdvance = Math.floor(actualDuration * (1 - overlapPercent));
          currentTime = roundToQuarterHour(currentTime + timeAdvance);
          previousWasOverlapping = true; // Mark that this task is overlapping
        } else {
          // Normal sequential task with small gap
          currentTime = roundToQuarterHour(endTime + 15); // 15 minute gap (one quarter hour)
          previousWasOverlapping = false; // Mark that this task is sequential
        }
      }
    });
  }

  return tasks;
};

export const mockTasks: Task[] = generateMonthTasks();

// Generate shifts for the entire month
const generateMonthShifts = (): Shift[] => {
  const shifts: Shift[] = [];
  const currentDate = new Date();

  const shiftPatterns = [
    { name: 'Morning', start: '08:00', end: '16:00' },
    { name: 'Mid', start: '09:00', end: '17:00' },
    { name: 'Evening', start: '13:00', end: '21:00' },
    { name: 'Full', start: '08:00', end: '20:00' },
  ];

  // Generate shifts for August, September, and current month (October)
  const monthsToGenerate = [
    { year: currentDate.getFullYear(), month: currentDate.getMonth() - 2 }, // August (2 months ago)
    { year: currentDate.getFullYear(), month: currentDate.getMonth() - 1 }, // September (1 month ago)
    { year: currentDate.getFullYear(), month: currentDate.getMonth() },     // Current month (October)
  ];

  monthsToGenerate.forEach(({ year, month }) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateStr = date.toISOString().split('T')[0];

      allStaff.forEach((staff, index) => {
        // Create varying patterns for each staff member
        const isOff = (day + index * 2) % 7 === 0 || (day + index * 3) % 9 === 0; // Some days off
        const shiftPattern = shiftPatterns[day % shiftPatterns.length];

        const isToday = dateStr === today;
        const isPast = date < new Date(today);

        // Extract numeric part from staff ID for seed calculation
        const staffIdNum = parseInt(staff.id.replace(/\D/g, '') || '0');

        // Helper to add/subtract minutes from time string
        const adjustTime = (time: string, minutesDelta: number): string => {
          const [hours, minutes] = time.split(':').map(Number);
          const totalMinutes = hours * 60 + minutes + minutesDelta;
          const newHours = Math.floor(totalMinutes / 60) % 24;
          const newMinutes = totalMinutes % 60;
          return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;
        };

        // Simulate realistic attendance patterns for past dates
        let actualCheckIn: string | undefined;
        let actualCheckOut: string | undefined;

        if (isPast && !isOff) {
          // Create guaranteed test cases for specific days to ensure visible examples
          // Day 3: Staff 1 & 2 late check-in
          // Day 5: Staff 3 & 4 early checkout
          // Day 7: Staff 5 both issues
          if (day === 3 && (staff.id === '1' || staff.id === '2')) {
            // Late check-in: 15 minutes late
            actualCheckIn = adjustTime(shiftPattern.start, 15);
            actualCheckOut = adjustTime(shiftPattern.end, 0);
          } else if (day === 5 && (staff.id === '3' || staff.id === '4')) {
            // Early checkout: 20 minutes early
            actualCheckIn = adjustTime(shiftPattern.start, 0);
            actualCheckOut = adjustTime(shiftPattern.end, -20);
          } else if (day === 7 && staff.id === '5') {
            // Both issues: 10 minutes late, 15 minutes early
            actualCheckIn = adjustTime(shiftPattern.start, 10);
            actualCheckOut = adjustTime(shiftPattern.end, -15);
          } else {
            // Use deterministic random for other days
            const seed = staffIdNum * 100 + day;
            const random = (seed * 9301 + 49297) % 233280 / 233280;

            // Check if regional or global staff (better attendance)
            const isRegionalStaff = staff.id.startsWith('r');
            const isGlobalStaff = staff.id.startsWith('g');

            if (isGlobalStaff) {
              // Global: 90% on time, 7% late check-in, 2% early checkout, 1% both issues
              if (random < 0.90) {
                // On time: exact or slightly early (within -2 to 0 minutes)
                const variance = -Math.floor((random * 100) % 3);
                actualCheckIn = adjustTime(shiftPattern.start, variance);
                actualCheckOut = adjustTime(shiftPattern.end, Math.floor((random * 200) % 3));
              } else if (random < 0.97) {
                // Late check-in only (3-10 minutes late - less severe)
                const lateMinutes = 3 + Math.floor((random * 1000) % 8);
                actualCheckIn = adjustTime(shiftPattern.start, lateMinutes);
                actualCheckOut = adjustTime(shiftPattern.end, 0);
              } else {
                // Early checkout only (3-10 minutes early - less severe)
                const earlyMinutes = -(3 + Math.floor((random * 1000) % 8));
                actualCheckIn = adjustTime(shiftPattern.start, 0);
                actualCheckOut = adjustTime(shiftPattern.end, earlyMinutes);
              }
            } else if (isRegionalStaff) {
              // Regional: 80% on time, 12% late check-in, 5% early checkout, 3% both issues
              if (random < 0.80) {
                // On time: exact or slightly early (within -2 to 0 minutes)
                const variance = -Math.floor((random * 100) % 3);
                actualCheckIn = adjustTime(shiftPattern.start, variance);
                actualCheckOut = adjustTime(shiftPattern.end, Math.floor((random * 200) % 3));
              } else if (random < 0.92) {
                // Late check-in only (5-15 minutes late)
                const lateMinutes = 5 + Math.floor((random * 1000) % 11);
                actualCheckIn = adjustTime(shiftPattern.start, lateMinutes);
                actualCheckOut = adjustTime(shiftPattern.end, 0);
              } else if (random < 0.97) {
                // Early checkout only (5-15 minutes early)
                const earlyMinutes = -(5 + Math.floor((random * 1000) % 11));
                actualCheckIn = adjustTime(shiftPattern.start, 0);
                actualCheckOut = adjustTime(shiftPattern.end, earlyMinutes);
              } else {
                // Both issues (late check-in AND early checkout)
                const lateMinutes = 5 + Math.floor((random * 1000) % 11);
                const earlyMinutes = -(5 + Math.floor((random * 500) % 11));
                actualCheckIn = adjustTime(shiftPattern.start, lateMinutes);
                actualCheckOut = adjustTime(shiftPattern.end, earlyMinutes);
              }
            } else {
              // Store: 65% on time, 20% late check-in, 10% early checkout, 5% both issues
              if (random < 0.65) {
                // On time: exact or slightly early (within -2 to 0 minutes)
                const variance = -Math.floor((random * 100) % 3);
                actualCheckIn = adjustTime(shiftPattern.start, variance);
                actualCheckOut = adjustTime(shiftPattern.end, Math.floor((random * 200) % 3));
              } else if (random < 0.85) {
                // Late check-in only (5-30 minutes late)
                const lateMinutes = 5 + Math.floor((random * 1000) % 26);
                actualCheckIn = adjustTime(shiftPattern.start, lateMinutes);
                actualCheckOut = adjustTime(shiftPattern.end, 0);
              } else if (random < 0.95) {
                // Early checkout only (5-30 minutes early)
                const earlyMinutes = -(5 + Math.floor((random * 1000) % 26));
                actualCheckIn = adjustTime(shiftPattern.start, 0);
                actualCheckOut = adjustTime(shiftPattern.end, earlyMinutes);
              } else {
                // Both issues (late check-in AND early checkout)
                const lateMinutes = 5 + Math.floor((random * 1000) % 26);
                const earlyMinutes = -(5 + Math.floor((random * 500) % 26));
                actualCheckIn = adjustTime(shiftPattern.start, lateMinutes);
                actualCheckOut = adjustTime(shiftPattern.end, earlyMinutes);
              }
            }
          }
        } else if (isToday && index < 3 && !isOff) {
          // Today: only some staff checked in, no checkout yet
          actualCheckIn = shiftPattern.start;
          actualCheckOut = undefined;
        }

        shifts.push({
          id: `shift-${staff.id}-${dateStr}`,
          staffId: staff.id,
          date: dateStr,
          scheduledStart: isOff ? '' : shiftPattern.start,
          scheduledEnd: isOff ? '' : shiftPattern.end,
          actualCheckIn,
          actualCheckOut,
          isOff,
          shiftName: isOff ? undefined : shiftPattern.name,
          taskAssignmentPercentage: isOff ? 0 : Math.floor(75 + Math.random() * 25), // 75-100%
        });
      });
    }
  });

  return shifts;
};

export const mockShifts: Shift[] = generateMonthShifts();

export const mockLeaderboard: LeaderboardEntry[] = [
  { staffId: '1', staffName: 'Nam N.V', tasksCompleted: 45, completionRate: 96, totalHours: 168, efficiency: 98, rank: 1 },
  { staffId: '3', staffName: 'Cuong N.V', tasksCompleted: 42, completionRate: 94, totalHours: 165, efficiency: 95, rank: 2 },
  { staffId: '2', staffName: 'Thuy N.T', tasksCompleted: 38, completionRate: 91, totalHours: 170, efficiency: 92, rank: 3 },
  { staffId: '5', staffName: 'Tran V.M', tasksCompleted: 35, completionRate: 88, totalHours: 156, efficiency: 89, rank: 4 },
  { staffId: '4', staffName: 'Binh D.V', tasksCompleted: 32, completionRate: 85, totalHours: 162, efficiency: 86, rank: 5 },
];
