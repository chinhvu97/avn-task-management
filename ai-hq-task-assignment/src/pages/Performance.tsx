import { ChevronRight, BarChart3 } from 'lucide-react';

export default function Performance() {
  return (
    <div className="p-6">
      <div className="flex items-center gap-2 text-sm mb-6">
        <span className="text-gray-500">Analytics</span>
        <ChevronRight className="w-4 h-4 text-gray-500" />
        <span className="text-gray-800 font-medium">Performance</span>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Performance Analytics</h1>
        <p className="text-gray-500">Store and staff performance metrics and insights</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
        <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="font-semibold text-gray-800 mb-2">Performance Analytics</h3>
        <p className="text-gray-500">This page will show detailed performance charts and metrics</p>
      </div>
    </div>
  );
}
