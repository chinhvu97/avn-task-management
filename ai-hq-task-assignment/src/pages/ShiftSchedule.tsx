import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Download, Plus, Clock, AlertTriangle, Settings as SettingsIcon } from 'lucide-react';
import { getStaffByBuilding } from 'shared-data';
import { useRole, getCurrentStore } from '../contexts/RoleContext';
import { RoleIndicator } from '../components/RoleIndicator';
import { StoreSelector } from '../components/StoreSelector';
import { useRoleBasedData } from '../hooks/useRoleBasedData';
import { StaffingOverviewWidget } from '../components/StaffingOverviewWidget';
import { StaffingAlertModal } from '../components/StaffingAlertModal';
import { Link } from 'react-router-dom';

interface StaffingConfig {
  storeId: string;
  storeName: string;
  morning: { target: number; warning: number; critical: number };
  mid: { target: number; warning: number; critical: number };
  evening: { target: number; warning: number; critical: number };
  enableAlerts: boolean;
  enableAutoSuggest: boolean;
}

export default function ShiftSchedule() {
  const [selectedWeek, setSelectedWeek] = useState('Oct 28 - Nov 3, 2025');
  const { profile } = useRole();
  const currentStore = getCurrentStore(profile);
  const { isMultiStore, stats: roleStats } = useRoleBasedData();

  // Staffing alert states
  const [staffingConfig, setStaffingConfig] = useState<StaffingConfig | null>(null);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<any>(null);
  const [showStaffingWidget, setShowStaffingWidget] = useState(true);

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const dates = ['Oct 28', 'Oct 29', 'Oct 30', 'Oct 31', 'Nov 1', 'Nov 2', 'Nov 3'];

  // Get staff from shared-data based on current store
  const staffData = currentStore
    ? getStaffByBuilding(currentStore.name)
    : [];

  const staff = staffData.map((s, index) => ({
    id: index + 1,
    name: s.name,
    avatar: '',
    role: s.role,
    shiftStart: s.shiftStart,
    shiftEnd: s.shiftEnd,
  }));

  // Generate shifts based on staff data with actual clock in/out times
  const generateShiftsForStaff = (staffMember: typeof staff[0], staffIndex: number) => {
    const baseShifts = [];

    // Define shift templates - including double shifts and full day
    const shiftTemplates = [
      { start: '06:00', end: '12:00', period: 'Morning' },           // Morning only (6 hours)
      { start: '12:00', end: '17:00', period: 'Mid' },               // Mid only (5 hours)
      { start: '17:00', end: '22:00', period: 'Evening' },           // Evening only (5 hours)
      { start: '06:00', end: '17:00', period: 'Morning+Mid' },       // Morning + Mid (11 hours)
      { start: '12:00', end: '22:00', period: 'Mid+Evening' },       // Mid + Evening (10 hours)
      { start: '06:00', end: '22:00', period: 'Full' },              // Full day (16 hours)
    ];

    // Assign shift patterns to ensure 10+ staff per period:
    // Staff 0-4: Morning only (5 staff)
    // Staff 5-9: Evening only (5 staff)
    // Staff 10-12: Morning+Mid double shift (3 staff - covers both Morning & Mid)
    // Staff 13-14: Mid+Evening double shift (2 staff - covers both Mid & Evening)
    // This gives: Morning=8, Mid=5, Evening=7
    // Need more coverage, so adjust:

    // Better distribution:
    // Staff 0-2: Morning only (3 staff)
    // Staff 3-5: Evening only (3 staff)
    // Staff 6-10: Morning+Mid (5 staff - covers Morning & Mid)
    // Staff 11-14: Mid+Evening (4 staff - covers Mid & Evening)
    // Result: Morning=8, Mid=9, Evening=7
    // Still need 2-3 more per period...

    // Optimized distribution for 10+ coverage in all periods:
    // Staff 0-2: Full day (3 staff - covers all 3 periods)
    // Staff 3-5: Morning+Mid (3 staff)
    // Staff 6-9: Mid+Evening (4 staff)
    // Staff 10-12: Morning only (3 staff)
    // Staff 13-14: Evening only (2 staff)
    // Base Coverage: Morning=9 (3+3+3), Mid=10 (3+3+4), Evening=9 (3+4+2)
    // This is too low for Morning. Let's adjust:

    // Final: Add one more full day staff to boost all periods
    // Staff 0-3: Full day (4 staff - all periods)
    // Staff 4-6: Morning+Mid (3 staff)
    // Staff 7-10: Mid+Evening (4 staff)
    // Staff 11-12: Morning only (2 staff)
    // Staff 13-14: Evening only (2 staff)
    // Base: Morning=10 (4+3+2), Mid=11 (4+3+4), Evening=10 (4+4+2) ✓

    let shiftType;
    if (staffIndex <= 3) {
      shiftType = 5; // Full day
    } else if (staffIndex <= 6) {
      shiftType = 3; // Morning+Mid
    } else if (staffIndex <= 10) {
      shiftType = 4; // Mid+Evening
    } else if (staffIndex <= 12) {
      shiftType = 0; // Morning only
    } else {
      shiftType = 2; // Evening only
    }

    // Create realistic staffing scenario:
    // - Most days fully staffed (10+ per period)
    // - One or two days with 9/10 (warning)
    // - One day with 8/10 (critical)

    for (let day = 0; day < 7; day++) {
      // Each staff works 6 days per week, takes 1 day off
      // This allows maintaining 10+ coverage on most days
      let isDayOff = false;

      // One day off per staff, spread across week to minimize impact
      // Staff: 4 full, 3 morning+mid, 4 mid+evening, 2 morning, 2 evening
      // Base coverage: Morning=10, Mid=11, Evening=10
      const dayOffSchedule: { [key: number]: number } = {
        // Full day staff (0-3): Spread Sun-Wed
        0: 6,   // Staff 0 (Full): Sunday
        1: 0,   // Staff 1 (Full): Monday
        2: 1,   // Staff 2 (Full): Tuesday
        3: 2,   // Staff 3 (Full): Wednesday

        // Morning+Mid staff (4-6): Spread Thu-Sat
        4: 3,   // Staff 4 (Morning+Mid): Thursday
        5: 4,   // Staff 5 (Morning+Mid): Friday
        6: 5,   // Staff 6 (Morning+Mid): Saturday

        // Mid+Evening staff (7-10): Spread Sun, Mon, Tue, Wed
        7: 6,   // Staff 7 (Mid+Evening): Sunday
        8: 0,   // Staff 8 (Mid+Evening): Monday
        9: 1,   // Staff 9 (Mid+Evening): Tuesday
        10: 2,  // Staff 10 (Mid+Evening): Wednesday

        // Morning only staff (11-12): Spread Thu, Fri
        11: 3,  // Staff 11 (Morning): Thursday
        12: 4,  // Staff 12 (Morning): Friday

        // Evening only staff (13-14): Spread Sat, Sun
        13: 5,  // Staff 13 (Evening): Saturday
        14: 6,  // Staff 14 (Evening): Sunday
      };

      isDayOff = (dayOffSchedule[staffIndex] === day);

      // Staffing with 1 day off per staff (6-day work weeks):
      // Base coverage: Morning=10, Mid=11, Evening=10
      //
      // Monday (0) OFF: Staff 1 (full), 8 (mid+evening)
      //   Morning: 10 - 1 = 9, Mid: 11 - 2 = 9, Evening: 10 - 2 = 8 ✓
      // Tuesday (1) OFF: Staff 2 (full), 9 (mid+evening)
      //   Morning: 10 - 1 = 9, Mid: 11 - 2 = 9, Evening: 10 - 2 = 8 ✓
      // Wednesday (2) OFF: Staff 3 (full), 10 (mid+evening)
      //   Morning: 10 - 1 = 9, Mid: 11 - 2 = 9, Evening: 10 - 2 = 8 ✓
      // Thursday (3) OFF: Staff 4 (morning+mid), 11 (morning)
      //   Morning: 10 - 2 = 8 ✓ (CRITICAL 8/10), Mid: 11 - 1 = 10 ✓, Evening: 10 ✓
      // Friday (4) OFF: Staff 5 (morning+mid), 12 (morning)
      //   Morning: 10 - 2 = 8, Mid: 11 - 1 = 10 ✓, Evening: 10 ✓
      // Saturday (5) OFF: Staff 6 (morning+mid), 13 (evening)
      //   Morning: 10 - 1 = 9, Mid: 11 - 1 = 10 ✓, Evening: 10 - 1 = 9 ✓ (WARNING 9/10)
      // Sunday (6) OFF: Staff 0 (full), 7 (mid+evening), 14 (evening)
      //   Morning: 10 - 1 = 9, Mid: 11 - 2 = 9, Evening: 10 - 3 = 7
      //
      // Result: Mostly 8-10 staff per period (close to target!)
      // Thursday Morning: 8/10 (critical) ✓
      // Saturday Evening: 9/10 (warning) ✓
      // Most other periods: 9-10/10 (good) ✓

      if (isDayOff) {
        baseShifts.push({ day, type: 'off' });
      } else {
        const shiftTime = shiftTemplates[shiftType];

        // Generate slight variance for actual times (simulate real clock in/out)
        const actualStart = adjustTime(shiftTime.start, -2, 2); // -2 to +2 minutes
        const actualEnd = adjustTime(shiftTime.end, -2, 2);

        baseShifts.push({
          day,
          start: shiftTime.start,
          end: shiftTime.end,
          actualStart,
          actualEnd,
          type: 'regular'
        });
      }
    }
    return baseShifts;
  };

  // Helper to adjust time slightly for realistic clock in/out
  const adjustTime = (time: string, minOffset: number, maxOffset: number) => {
    const [hours, minutes] = time.split(':').map(Number);
    const offset = Math.floor(Math.random() * (maxOffset - minOffset + 1)) + minOffset;
    let newMinutes = minutes + offset;
    let newHours = hours;

    if (newMinutes < 0) {
      newMinutes += 60;
      newHours -= 1;
    } else if (newMinutes >= 60) {
      newMinutes -= 60;
      newHours += 1;
    }

    return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;
  };

  const shifts: Record<string, any[]> = {};
  staff.forEach((s, index) => {
    shifts[s.name] = generateShiftsForStaff(s, index);
  });

  const getShiftColor = (type: string) => {
    if (type === 'regular') return 'bg-white border border-gray-300 text-gray-800';
    if (type === 'off') return 'bg-white border border-gray-300 text-gray-500';
    if (type === 'leave') return 'bg-white border border-yellow-400 text-yellow-700';
    return 'bg-white border border-gray-300 text-gray-600';
  };

  // Load staffing config from localStorage
  useEffect(() => {
    if (currentStore) {
      const savedConfig = localStorage.getItem(`staffing_config_${currentStore.id}`);
      if (savedConfig) {
        try {
          const parsed = JSON.parse(savedConfig);
          // Validate config structure - check if it has per-period structure
          if (parsed.morning && parsed.mid && parsed.evening) {
            setStaffingConfig(parsed);
          } else {
            // Old config structure detected - reset to default
            console.warn('Old config structure detected, resetting to default per-period config');
            const defaultConfig = {
              storeId: currentStore.id,
              storeName: currentStore.name,
              morning: { target: 10, warning: 9, critical: 8 },
              mid: { target: 10, warning: 9, critical: 8 },
              evening: { target: 10, warning: 9, critical: 8 },
              enableAlerts: true,
              enableAutoSuggest: true,
            };
            setStaffingConfig(defaultConfig);
            // Save the new structure to localStorage
            localStorage.setItem(`staffing_config_${currentStore.id}`, JSON.stringify(defaultConfig));
          }
        } catch (e) {
          console.error('Error parsing staffing config:', e);
          // Set default config if parsing fails
          const defaultConfig = {
            storeId: currentStore.id,
            storeName: currentStore.name,
            morning: { target: 10, warning: 9, critical: 8 },
            mid: { target: 10, warning: 9, critical: 8 },
            evening: { target: 10, warning: 9, critical: 8 },
            enableAlerts: true,
            enableAutoSuggest: true,
          };
          setStaffingConfig(defaultConfig);
        }
      } else {
        // Default config per period: target 10, warning 9, critical ≤8
        setStaffingConfig({
          storeId: currentStore.id,
          storeName: currentStore.name,
          morning: { target: 10, warning: 9, critical: 8 },
          mid: { target: 10, warning: 9, critical: 8 },
          evening: { target: 10, warning: 9, critical: 8 },
          enableAlerts: true,
          enableAutoSuggest: true,
        });
      }
    }
  }, [currentStore]);

  // Determine shift period based on start and end time
  const getShiftPeriod = (startTime: string, endTime: string) => {
    const parseHour = (time: string) => parseInt(time.split(':')[0]);
    const startHour = parseHour(startTime);
    const endHour = parseHour(endTime);

    // Check for full day shift (6:00-22:00)
    if (startHour <= 6 && endHour >= 22) return 'Full';

    // Check for Morning+Mid double shift (6:00-17:00)
    if (startHour <= 6 && endHour >= 17 && endHour < 22) return 'Morning+Mid';

    // Check for Mid+Evening double shift (12:00-22:00)
    if (startHour >= 12 && startHour < 17 && endHour >= 22) return 'Mid+Evening';

    // Single period shifts
    if (startHour >= 6 && endHour <= 12) return 'Morning';
    if (startHour >= 12 && endHour <= 17) return 'Mid';
    if (startHour >= 17 && endHour <= 22) return 'Evening';

    return 'Full';
  };

  // Check if a shift overlaps with a given period
  const shiftOverlapsPeriod = (shiftStart: string, shiftEnd: string, period: 'Morning' | 'Mid' | 'Evening') => {
    const parseTime = (time: string) => {
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes;
    };

    const shiftStartMin = parseTime(shiftStart);
    const shiftEndMin = parseTime(shiftEnd);

    // Define period boundaries in minutes
    const periods = {
      'Morning': { start: 6 * 60, end: 12 * 60 },    // 360-720 (6:00-12:00)
      'Mid': { start: 12 * 60, end: 17 * 60 },       // 720-1020 (12:00-17:00)
      'Evening': { start: 17 * 60, end: 22 * 60 }    // 1020-1320 (17:00-22:00)
    };

    const periodRange = periods[period];

    // Check if shift overlaps with period (any overlap counts)
    return shiftStartMin < periodRange.end && shiftEndMin > periodRange.start;
  };

  // Calculate staffing status for a given period and day
  const calculateStaffingStatus = (dayIndex: number, period: 'Morning' | 'Mid' | 'Evening') => {
    if (!staffingConfig) return null;

    // Count how many staff are working during this period
    let actualStaff = 0;
    staff.forEach(person => {
      const shift = shifts[person.name as keyof typeof shifts][dayIndex];
      if (shift && shift.type === 'regular') {
        if (shiftOverlapsPeriod(shift.start, shift.end, period)) {
          actualStaff++;
        }
      }
    });

    const periodKey = period.toLowerCase() as 'morning' | 'mid' | 'evening';
    const config = staffingConfig[periodKey];
    const gap = config.target - actualStaff;

    // Determine status based on thresholds
    let status: 'critical' | 'warning' | 'good' = 'good';
    if (actualStaff <= config.critical) {
      status = 'critical';
    } else if (actualStaff === config.warning) {
      status = 'warning';
    } else {
      status = 'good';
    }

    return { period, actualStaff, target: config.target, gap, status };
  };

  // Get all staffing statuses for the week (per period)
  const getWeeklyStaffingStatus = () => {
    const statuses = [];
    const periods: ('Morning' | 'Mid' | 'Evening')[] = ['Morning', 'Mid', 'Evening'];

    for (let day = 0; day < 7; day++) {
      for (const period of periods) {
        const status = calculateStaffingStatus(day, period);
        if (status) {
          statuses.push({
            day: weekDays[day],
            date: dates[day],
            dayIndex: day,
            ...status
          });
        }
      }
    }

    return statuses;
  };

  // Calculate summary stats
  const staffingStatuses = staffingConfig?.enableAlerts ? getWeeklyStaffingStatus() : [];
  const criticalCount = staffingStatuses.filter(s => s.status === 'critical').length;
  const warningCount = staffingStatuses.filter(s => s.status === 'warning').length;
  const goodCount = staffingStatuses.filter(s => s.status === 'good').length;

  // Get worst issues (top 3 critical periods)
  const worstIssues = staffingStatuses
    .filter(s => s.status === 'critical')
    .sort((a, b) => b.gap - a.gap)
    .slice(0, 3)
    .map(s => ({
      period: s.period,
      day: s.day,
      required: s.target,
      actual: s.actualStaff,
      status: s.status as 'critical'
    }));

  // Handle alert cell click
  const handleAlertClick = (dayIndex: number, period: 'Morning' | 'Mid' | 'Evening') => {
    const status = calculateStaffingStatus(dayIndex, period);
    if (status && status.status === 'critical') {
      const periodTimes: Record<string, string> = {
        'Morning': '06:00 - 12:00',
        'Mid': '12:00 - 17:00',
        'Evening': '17:00 - 22:00'
      };

      setSelectedAlert({
        day: weekDays[dayIndex],
        period: period,
        timeRange: periodTimes[period],
        current: status.actualStaff,
        required: status.target,
        gap: Math.abs(status.gap)
      });
      setShowAlertModal(true);
    }
  };

  // Get background color for staffing status
  const getStaffingBgColor = (status: 'critical' | 'warning' | 'good' | null) => {
    if (!status) return '';
    switch (status) {
      case 'critical':
        return 'bg-red-50';
      case 'warning':
        return 'bg-yellow-50';
      case 'good':
        return 'bg-green-50';
      default:
        return '';
    }
  };

  // Get dot color for shift period (matching staff-task-management)
  const getShiftDotColor = (period: string) => {
    switch (period) {
      case 'Morning':
        return 'bg-blue-500';
      case 'Mid':
        return 'bg-green-500';
      case 'Evening':
        return 'bg-orange-500';
      case 'Morning+Mid':
        return 'bg-pink-600'; // Pink for Morning+Mid double shift
      case 'Mid+Evening':
        return 'bg-red-600'; // Red for Mid+Evening double shift
      case 'Full':
        return 'bg-purple-600';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="p-6">
      {/* Role Indicator */}
      <RoleIndicator />

      {/* Store Selector - Only for multi-store roles */}
      {isMultiStore && (
        <div className="mb-6">
          <StoreSelector />
        </div>
      )}

      {/* Multi-Store Summary - Only for multi-store roles */}
      {isMultiStore && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-purple-900 mb-1">Multi-Store Overview</h3>
              <p className="text-sm text-purple-700">
                Managing shifts across {roleStats.totalStores} stores • {roleStats.totalStaff} total staff
              </p>
            </div>
            <div className="flex gap-4">
              {roleStats.storesBreakdown.map((store) => (
                <div key={store.storeId} className="bg-white rounded-lg px-4 py-2 border border-purple-200">
                  <div className="text-xs text-gray-600 mb-1 truncate max-w-[120px]">
                    {store.storeName.split(' ').slice(2).join(' ')}
                  </div>
                  <div className="text-lg font-bold text-purple-700">{store.staffCount} staff</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-6">
        <span className="text-gray-500">Shift Management</span>
        <ChevronRight className="w-4 h-4 text-gray-500" />
        <span className="text-gray-800 font-medium">Shift Schedule</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Shift Schedule</h1>
          <p className="text-gray-500">
            {isMultiStore
              ? `Weekly shift planning across ${roleStats.totalStores} stores`
              : 'Weekly shift planning and staff allocation'}
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            to="/staffing-requirements"
            className="px-4 py-2 border border-gray-200 rounded-md hover:bg-gray-50 flex items-center gap-2"
          >
            <SettingsIcon className="w-4 h-4" />
            Configure Requirements
          </Link>
          <button className="px-4 py-2 border border-gray-200 rounded-md hover:bg-gray-50 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Shift
          </button>
        </div>
      </div>

      {/* Data Source Indicator */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-blue-900">
            {currentStore
              ? `Showing shifts from ${currentStore.name}`
              : 'Showing all shifts across all stores'}
          </span>
          <span className="text-sm text-blue-700 ml-auto">
            <span className="font-semibold">{staff.length}</span> Staff Members
          </span>
        </div>
      </div>

      {/* Week Selector */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <button className="p-2 hover:bg-gray-100 rounded">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-pink-600" />
            <span className="font-semibold text-gray-800">{selectedWeek}</span>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded">
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Critical Alert Banner */}
      {staffingConfig?.enableAlerts && criticalCount > 0 && (
        <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <div className="font-semibold text-red-900">
                  {criticalCount} Critical Staffing Issue{criticalCount !== 1 ? 's' : ''} This Week
                </div>
                <div className="text-sm text-red-700">
                  Click on red cells below to request additional staff or support
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowStaffingWidget(true)}
                className="px-4 py-2 bg-white border border-red-300 rounded-md hover:bg-red-50 text-red-700 text-sm font-medium"
              >
                View Details
              </button>
              <button
                onClick={() => {
                  if (worstIssues.length > 0) {
                    const worst = worstIssues[0];
                    const periodTimes: Record<string, string> = {
                      'Morning': '06:00 - 12:00',
                      'Mid': '12:00 - 17:00',
                      'Evening': '17:00 - 22:00'
                    };
                    setSelectedAlert({
                      day: worst.day,
                      period: worst.period,
                      timeRange: periodTimes[worst.period],
                      current: worst.actual,
                      required: worst.required,
                      gap: worst.required - worst.actual
                    });
                    setShowAlertModal(true);
                  }
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm font-medium"
              >
                Request Support
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Staffing Overview Widget */}
      {staffingConfig?.enableAlerts && showStaffingWidget && (criticalCount > 0 || warningCount > 0) && (
        <StaffingOverviewWidget
          criticalCount={criticalCount}
          warningCount={warningCount}
          goodCount={goodCount}
          worstIssues={worstIssues}
          onReviewClick={() => {
            // Scroll to schedule grid
            const scheduleElement = document.querySelector('.schedule-grid');
            scheduleElement?.scrollIntoView({ behavior: 'smooth' });
          }}
          onRequestClick={() => {
            if (worstIssues.length > 0) {
              const worst = worstIssues[0];
              const periodTimes: Record<string, string> = {
                'Morning': '06:00 - 12:00',
                'Mid': '12:00 - 17:00',
                'Evening': '17:00 - 22:00'
              };
              setSelectedAlert({
                day: worst.day,
                period: worst.period,
                timeRange: periodTimes[worst.period],
                current: worst.actual,
                required: worst.required,
                gap: worst.required - worst.actual
              });
              setShowAlertModal(true);
            }
          }}
        />
      )}

      {/* Staffing Status Table */}
      {staffingConfig?.enableAlerts && (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-pink-600" />
              <h2 className="font-semibold text-gray-800">Staffing Status Overview</h2>
            </div>
          </div>
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="text-left p-4 font-medium text-gray-800 w-32">Period</th>
                {weekDays.map((day, idx) => (
                  <th key={idx} className="text-center p-3 font-medium text-gray-800">
                    <div className="text-sm">{day}</div>
                    <div className="text-xs font-normal text-gray-500">{dates[idx]}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Morning Row */}
              <tr className="border-b border-gray-200">
                <td className="p-4 bg-blue-50 font-medium text-gray-800">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    Morning
                  </div>
                  <div className="text-xs text-gray-600">6:00-12:00</div>
                </td>
                {[...Array(7)].map((_, dayIndex) => {
                  const status = calculateStaffingStatus(dayIndex, 'Morning');
                  return (
                    <td key={dayIndex} className={`p-2 ${getStaffingBgColor(status?.status || null)}`}>
                      {status && (
                        <button
                          onClick={() => handleAlertClick(dayIndex, 'Morning')}
                          className={`w-full px-2 py-2 rounded border-2 transition-all text-center ${
                            status.status === 'critical'
                              ? 'bg-red-100 border-red-400 text-red-900 hover:bg-red-200 cursor-pointer'
                              : status.status === 'warning'
                              ? 'bg-yellow-100 border-yellow-300 text-yellow-800'
                              : 'bg-green-100 border-green-300 text-green-800'
                          }`}
                          disabled={status.status !== 'critical'}
                        >
                          <div className="text-lg font-bold">{status.actualStaff}/{status.target}</div>
                          {status.status === 'critical' && (
                            <div className="text-xs font-medium">+{Math.abs(status.gap)}</div>
                          )}
                        </button>
                      )}
                    </td>
                  );
                })}
              </tr>

              {/* Mid Row */}
              <tr className="border-b border-gray-200">
                <td className="p-4 bg-green-50 font-medium text-gray-800">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    Mid
                  </div>
                  <div className="text-xs text-gray-600">12:00-17:00</div>
                </td>
                {[...Array(7)].map((_, dayIndex) => {
                  const status = calculateStaffingStatus(dayIndex, 'Mid');
                  return (
                    <td key={dayIndex} className={`p-2 ${getStaffingBgColor(status?.status || null)}`}>
                      {status && (
                        <button
                          onClick={() => handleAlertClick(dayIndex, 'Mid')}
                          className={`w-full px-2 py-2 rounded border-2 transition-all text-center ${
                            status.status === 'critical'
                              ? 'bg-red-100 border-red-400 text-red-900 hover:bg-red-200 cursor-pointer'
                              : status.status === 'warning'
                              ? 'bg-yellow-100 border-yellow-300 text-yellow-800'
                              : 'bg-green-100 border-green-300 text-green-800'
                          }`}
                          disabled={status.status !== 'critical'}
                        >
                          <div className="text-lg font-bold">{status.actualStaff}/{status.target}</div>
                          {status.status === 'critical' && (
                            <div className="text-xs font-medium">+{Math.abs(status.gap)}</div>
                          )}
                        </button>
                      )}
                    </td>
                  );
                })}
              </tr>

              {/* Evening Row */}
              <tr className="border-b border-gray-200">
                <td className="p-4 bg-orange-50 font-medium text-gray-800">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    Evening
                  </div>
                  <div className="text-xs text-gray-600">17:00-22:00</div>
                </td>
                {[...Array(7)].map((_, dayIndex) => {
                  const status = calculateStaffingStatus(dayIndex, 'Evening');
                  return (
                    <td key={dayIndex} className={`p-2 ${getStaffingBgColor(status?.status || null)}`}>
                      {status && (
                        <button
                          onClick={() => handleAlertClick(dayIndex, 'Evening')}
                          className={`w-full px-2 py-2 rounded border-2 transition-all text-center ${
                            status.status === 'critical'
                              ? 'bg-red-100 border-red-400 text-red-900 hover:bg-red-200 cursor-pointer'
                              : status.status === 'warning'
                              ? 'bg-yellow-100 border-yellow-300 text-yellow-800'
                              : 'bg-green-100 border-green-300 text-green-800'
                          }`}
                          disabled={status.status !== 'critical'}
                        >
                          <div className="text-lg font-bold">{status.actualStaff}/{status.target}</div>
                          {status.status === 'critical' && (
                            <div className="text-xs font-medium">+{Math.abs(status.gap)}</div>
                          )}
                        </button>
                      )}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Detailed Shift Register Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden schedule-grid">
        <div className="bg-slate-100 p-4 border-b border-gray-200">
          <h2 className="font-semibold text-gray-800">Staff Shift Register</h2>
        </div>
        <table className="w-full">
          <thead className="bg-slate-100 border-b border-gray-200">
            <tr>
              <th className="text-left p-4 font-medium text-gray-800 w-48">Staff Member</th>
              {weekDays.map((day, idx) => (
                <th key={idx} className="text-center p-4 font-medium text-gray-800">
                  <div>{day}</div>
                  <div className="text-xs font-normal text-gray-500">{dates[idx]}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {staff.map((person) => (
              <tr key={person.id} className="hover:bg-gray-50">
                <td className="p-4">
                  <div className="font-medium text-gray-800">{person.name}</div>
                </td>
                {shifts[person.name as keyof typeof shifts].map((shift, idx) => {
                  const shiftPeriod = shift.type === 'regular' ? getShiftPeriod(shift.start, shift.end) : '';
                  const dotColor = shift.type === 'regular' ? getShiftDotColor(shiftPeriod) : '';

                  return (
                    <td key={idx} className="p-2">
                      <div className={`${getShiftColor(shift.type)} rounded-md p-3 text-sm`}>
                        {shift.type === 'regular' && (
                          <div className="space-y-2">
                            {/* Shift Period with Dot */}
                            <div className="flex items-center gap-2 mb-2">
                              <div className={`w-3 h-3 rounded-full ${dotColor} flex-shrink-0`}></div>
                              <span className="text-sm font-semibold text-gray-800">{shiftPeriod}</span>
                            </div>

                            {/* Scheduled Shift Time */}
                            <div className="text-left">
                              <span className="text-xs text-gray-600">Shift: </span>
                              <span className="font-semibold text-gray-800">{shift.start}-{shift.end}</span>
                            </div>

                            {/* Actual Clock In/Out Time */}
                            <div className="text-left">
                              <span className="text-xs text-gray-600">Actual: </span>
                              <span className="font-semibold text-gray-800">{shift.actualStart}-{shift.actualEnd}</span>
                            </div>
                          </div>
                        )}
                        {shift.type === 'off' && <div className="font-medium text-center py-3">Day Off</div>}
                        {shift.type === 'leave' && <div className="font-medium text-center py-3">On Leave</div>}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Shift Period Legend */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mt-6">
        <div className="text-sm font-medium text-gray-700 mb-3">Shift Types</div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>Morning (6:00 - 12:00)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Mid (12:00 - 17:00)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span>Evening (17:00 - 22:00)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-pink-600"></div>
            <span>Morning+Mid (6:00 - 17:00)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-600"></div>
            <span>Mid+Evening (12:00 - 22:00)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-600"></div>
            <span>Full Day (6:00 - 22:00)</span>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-6 mt-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-pink-600" />
            <span className="text-sm text-gray-500">Total Hours</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">432</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-5 h-5 text-green-600" />
            <span className="text-sm text-gray-500">Active Shifts</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">18</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-5 h-5 text-gray-600" />
            <span className="text-sm text-gray-500">Days Off</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">4</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-5 h-5 text-yellow-600" />
            <span className="text-sm text-gray-500">Leave Requests</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">1</div>
        </div>
      </div>

      {/* Staffing Alert Modal */}
      {selectedAlert && (
        <StaffingAlertModal
          isOpen={showAlertModal}
          onClose={() => setShowAlertModal(false)}
          alert={selectedAlert}
          onRequestShift={() => {
            alert('Request sent to available staff!\n\nStaff members will receive push notifications about this shift opportunity.');
            setShowAlertModal(false);
          }}
          onRequestCrossStore={() => {
            alert('Cross-store support request sent!\n\nNearby stores have been notified and available staff will respond.');
            setShowAlertModal(false);
          }}
        />
      )}
    </div>
  );
}
