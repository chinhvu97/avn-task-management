import { ChevronRight, Download, Calendar, Clock } from 'lucide-react';

export default function Attendance() {
  return (
    <div className="p-6">
      <div className="flex items-center gap-2 text-sm mb-6">
        <span className="text-gray-500">Shift Management</span>
        <ChevronRight className="w-4 h-4 text-gray-500" />
        <span className="text-gray-800 font-medium">Attendance</span>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Attendance Tracking</h1>
          <p className="text-gray-500">Real-time attendance monitoring with Edoc integration</p>
        </div>
        <button className="px-4 py-2 border border-gray-200 rounded-md hover:bg-gray-50 flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
        <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="font-semibold text-gray-800 mb-2">Attendance Page</h3>
        <p className="text-gray-500">This page will show check-in/check-out records and Edoc integration</p>
      </div>
    </div>
  );
}
