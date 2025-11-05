import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Download, Plus, Clock } from 'lucide-react';
import { getStaffByBuilding } from 'shared-data';
import { useRole, getCurrentStore } from '../contexts/RoleContext';
import { RoleIndicator } from '../components/RoleIndicator';
import { StoreSelector } from '../components/StoreSelector';
import { useRoleBasedData } from '../hooks/useRoleBasedData';

export default function ShiftSchedule() {
  const [selectedWeek, setSelectedWeek] = useState('Oct 28 - Nov 3, 2025');
  const { profile } = useRole();
  const currentStore = getCurrentStore(profile);
  const { isMultiStore, stats: roleStats } = useRoleBasedData();

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

    // Define shift templates for variety across all periods
    const shiftTemplates = [
      { start: '07:00', end: '16:00' },  // Morning
      { start: '08:00', end: '17:00' },  // Morning
      { start: '09:00', end: '18:00' },  // Morning (crosses into Mid)
      { start: '12:00', end: '21:00' },  // Mid
      { start: '13:00', end: '22:00' },  // Mid
      { start: '14:00', end: '23:00' },  // Mid
      { start: '17:00', end: '22:00' },  // Evening
      { start: '18:00', end: '23:00' },  // Evening
    ];

    for (let day = 0; day < 7; day++) {
      // Working days (Mon-Fri typically)
      if (day < 5) {
        // Create variety: rotate through different shift templates
        // Use combination of staffIndex and day to ensure different patterns
        const templateIndex = (staffIndex * 3 + day * 2) % shiftTemplates.length;
        const shiftTime = shiftTemplates[templateIndex];

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
      } else {
        // Weekend off (can be customized per staff)
        baseShifts.push({ day, type: 'off' });
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

  // Determine shift period based on start time
  const getShiftPeriod = (startTime: string) => {
    const hour = parseInt(startTime.split(':')[0]);
    if (hour >= 6 && hour < 12) return 'Morning';
    if (hour >= 12 && hour < 17) return 'Mid';
    if (hour >= 17 && hour < 22) return 'Evening';
    return 'Full';
  };

  // Get dot color for shift period (matching staff-task-management)
  const getShiftDotColor = (period: string) => {
    switch (period) {
      case 'Morning':
        return 'bg-blue-500';
      case 'Mid':
        return 'bg-green-500';
      case 'Evening':
        return 'bg-purple-500';
      case 'Full':
        return 'bg-orange-500';
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

      {/* Schedule Grid */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
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
                  const shiftPeriod = shift.type === 'regular' ? getShiftPeriod(shift.start) : '';
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
        <div className="text-sm font-medium text-gray-700 mb-3">Shift Periods</div>
        <div className="flex items-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>Morning (6:00 - 12:00)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Mid (12:00 - 17:00)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span>Evening (17:00 - 22:00)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span>Full Day</span>
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
    </div>
  );
}
