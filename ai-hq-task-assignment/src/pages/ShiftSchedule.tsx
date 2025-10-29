import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Download, Plus, Clock } from 'lucide-react';
import imgSarahJohnson from "figma:asset/95d7a9441ece29d0959b696f896ad7aa18c44dda.png";
import imgMikeChen from "figma:asset/8f8739691b761475875d05de592ee9166a999b67.png";
import imgEmilyRodriguez from "figma:asset/4afc0e5a544bfde91b9b95c54aae40d325105d17.png";

export default function ShiftSchedule() {
  const [selectedWeek, setSelectedWeek] = useState('Oct 28 - Nov 3, 2025');

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const dates = ['Oct 28', 'Oct 29', 'Oct 30', 'Oct 31', 'Nov 1', 'Nov 2', 'Nov 3'];

  const staff = [
    { id: 1, name: 'Sarah Johnson', avatar: imgSarahJohnson, role: 'Floor Manager' },
    { id: 2, name: 'Mike Chen', avatar: imgMikeChen, role: 'Sales Associate' },
    { id: 3, name: 'Emily Rodriguez', avatar: imgEmilyRodriguez, role: 'Cashier' },
  ];

  const shifts = {
    'Sarah Johnson': [
      { day: 0, start: '08:00', end: '17:00', type: 'regular' },
      { day: 1, start: '08:00', end: '17:00', type: 'regular' },
      { day: 2, start: '08:00', end: '17:00', type: 'regular' },
      { day: 3, start: '08:00', end: '17:00', type: 'regular' },
      { day: 4, start: '08:00', end: '17:00', type: 'regular' },
      { day: 5, type: 'off' },
      { day: 6, type: 'off' },
    ],
    'Mike Chen': [
      { day: 0, start: '09:00', end: '18:00', type: 'regular' },
      { day: 1, start: '09:00', end: '18:00', type: 'regular' },
      { day: 2, type: 'off' },
      { day: 3, start: '09:00', end: '18:00', type: 'regular' },
      { day: 4, start: '09:00', end: '18:00', type: 'regular' },
      { day: 5, start: '09:00', end: '18:00', type: 'regular' },
      { day: 6, start: '09:00', end: '18:00', type: 'regular' },
    ],
    'Emily Rodriguez': [
      { day: 0, start: '07:30', end: '16:30', type: 'regular' },
      { day: 1, start: '07:30', end: '16:30', type: 'regular' },
      { day: 2, start: '07:30', end: '16:30', type: 'regular' },
      { day: 3, type: 'leave' },
      { day: 4, start: '07:30', end: '16:30', type: 'regular' },
      { day: 5, start: '07:30', end: '16:30', type: 'regular' },
      { day: 6, type: 'off' },
    ],
  };

  const getShiftColor = (type: string) => {
    if (type === 'regular') return 'bg-pink-600 text-white';
    if (type === 'off') return 'bg-gray-200 text-gray-500';
    if (type === 'leave') return 'bg-yellow-100 text-yellow-700 border border-yellow-300';
    return 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="p-6">
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
          <p className="text-gray-500">Weekly shift planning and staff allocation</p>
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
                  <div className="flex items-center gap-3">
                    <img src={person.avatar} alt={person.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <div className="font-medium text-gray-800">{person.name}</div>
                      <div className="text-xs text-gray-500">{person.role}</div>
                    </div>
                  </div>
                </td>
                {shifts[person.name as keyof typeof shifts].map((shift, idx) => (
                  <td key={idx} className="p-2">
                    <div className={`${getShiftColor(shift.type)} rounded-md p-3 text-center text-sm`}>
                      {shift.type === 'regular' && (
                        <>
                          <div className="font-medium">{shift.start}</div>
                          <div className="text-xs opacity-90">to</div>
                          <div className="font-medium">{shift.end}</div>
                        </>
                      )}
                      {shift.type === 'off' && <div className="font-medium">Day Off</div>}
                      {shift.type === 'leave' && <div className="font-medium">On Leave</div>}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
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
