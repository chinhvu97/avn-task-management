import { ChevronRight, Settings as SettingsIcon } from 'lucide-react';

export default function Settings() {
  return (
    <div className="p-6">
      <div className="flex items-center gap-2 text-sm mb-6">
        <span className="text-gray-500">System</span>
        <ChevronRight className="w-4 h-4 text-gray-500" />
        <span className="text-gray-800 font-medium">Settings</span>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Settings</h1>
        <p className="text-gray-500">System configuration and preferences</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
        <SettingsIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="font-semibold text-gray-800 mb-2">System Settings</h3>
        <p className="text-gray-500">This page will show system configuration options</p>
      </div>
    </div>
  );
}
