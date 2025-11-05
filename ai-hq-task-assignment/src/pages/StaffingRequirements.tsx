import { useState } from 'react';
import { ChevronRight, Settings, Save, AlertCircle } from 'lucide-react';
import { getCurrentStore } from '../contexts/RoleContext';
import { useRole } from '../contexts/RoleContext';
import { RoleIndicator } from '../components/RoleIndicator';
import { StoreSelector } from '../components/StoreSelector';
import { useRoleBasedData } from '../hooks/useRoleBasedData';

interface StaffingConfig {
  storeId: string;
  storeName: string;
  morning: { target: number; warning: number; critical: number };
  mid: { target: number; warning: number; critical: number };
  evening: { target: number; warning: number; critical: number };
  enableAlerts: boolean;
  enableAutoSuggest: boolean;
}

export default function StaffingRequirements() {
  const { profile } = useRole();
  const currentStore = getCurrentStore(profile);
  const { isMultiStore } = useRoleBasedData();

  // Initialize with default requirements per period
  const [config, setConfig] = useState<StaffingConfig>({
    storeId: currentStore?.id || 'store-1',
    storeName: currentStore?.name || 'AEON Mall Binh Tan',
    morning: { target: 10, warning: 9, critical: 8 },
    mid: { target: 10, warning: 9, critical: 8 },
    evening: { target: 10, warning: 9, critical: 8 },
    enableAlerts: true,
    enableAutoSuggest: true,
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem(`staffing_config_${config.storeId}`, JSON.stringify(config));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
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

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-6">
        <span className="text-gray-500">Shift Management</span>
        <ChevronRight className="w-4 h-4 text-gray-500" />
        <span className="text-gray-800 font-medium">Staffing Requirements</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Daily Staffing Requirements</h1>
          <p className="text-gray-500">
            Configure staffing thresholds for visual alerts on the schedule
          </p>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-900">
            <strong>Per-period staffing model:</strong> Configure staffing thresholds for each shift period (Morning, Mid, Evening).
            The system alerts you when staffing falls below your thresholds in any period.
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configuration Form */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <Settings className="w-6 h-6 text-pink-600" />
            <h2 className="text-lg font-semibold text-gray-800">Staffing Levels</h2>
          </div>

          {/* Current Store */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Store</div>
            <div className="font-semibold text-gray-800">{config.storeName}</div>
          </div>

          {/* Staffing Thresholds - Per Period */}
          <div className="mb-6 space-y-4">
            {/* Morning Period */}
            <div className="p-4 border border-gray-200 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                Morning Shift (6:00-12:00)
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-gray-700 mb-1 font-medium">🟢 Target</label>
                  <input
                    type="number"
                    min="1"
                    value={config.morning.target}
                    onChange={(e) => setConfig(prev => ({ ...prev, morning: { ...prev.morning, target: parseInt(e.target.value) || 10 }}))}
                    className="w-full px-3 py-2 border-2 border-green-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-700 mb-1 font-medium">🟡 Warning</label>
                  <input
                    type="number"
                    min="1"
                    value={config.morning.warning}
                    onChange={(e) => setConfig(prev => ({ ...prev, morning: { ...prev.morning, warning: parseInt(e.target.value) || 9 }}))}
                    className="w-full px-3 py-2 border-2 border-yellow-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-700 mb-1 font-medium">🔴 Critical</label>
                  <input
                    type="number"
                    min="1"
                    value={config.morning.critical}
                    onChange={(e) => setConfig(prev => ({ ...prev, morning: { ...prev.morning, critical: parseInt(e.target.value) || 8 }}))}
                    className="w-full px-3 py-2 border-2 border-red-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm font-semibold"
                  />
                </div>
              </div>
            </div>

            {/* Mid Period */}
            <div className="p-4 border border-gray-200 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                Mid Shift (12:00-17:00)
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-gray-700 mb-1 font-medium">🟢 Target</label>
                  <input
                    type="number"
                    min="1"
                    value={config.mid.target}
                    onChange={(e) => setConfig(prev => ({ ...prev, mid: { ...prev.mid, target: parseInt(e.target.value) || 10 }}))}
                    className="w-full px-3 py-2 border-2 border-green-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-700 mb-1 font-medium">🟡 Warning</label>
                  <input
                    type="number"
                    min="1"
                    value={config.mid.warning}
                    onChange={(e) => setConfig(prev => ({ ...prev, mid: { ...prev.mid, warning: parseInt(e.target.value) || 9 }}))}
                    className="w-full px-3 py-2 border-2 border-yellow-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-700 mb-1 font-medium">🔴 Critical</label>
                  <input
                    type="number"
                    min="1"
                    value={config.mid.critical}
                    onChange={(e) => setConfig(prev => ({ ...prev, mid: { ...prev.mid, critical: parseInt(e.target.value) || 8 }}))}
                    className="w-full px-3 py-2 border-2 border-red-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm font-semibold"
                  />
                </div>
              </div>
            </div>

            {/* Evening Period */}
            <div className="p-4 border border-gray-200 rounded-lg bg-gradient-to-br from-orange-50 to-amber-50">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                Evening Shift (17:00-22:00)
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-gray-700 mb-1 font-medium">🟢 Target</label>
                  <input
                    type="number"
                    min="1"
                    value={config.evening.target}
                    onChange={(e) => setConfig(prev => ({ ...prev, evening: { ...prev.evening, target: parseInt(e.target.value) || 10 }}))}
                    className="w-full px-3 py-2 border-2 border-green-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-700 mb-1 font-medium">🟡 Warning</label>
                  <input
                    type="number"
                    min="1"
                    value={config.evening.warning}
                    onChange={(e) => setConfig(prev => ({ ...prev, evening: { ...prev.evening, warning: parseInt(e.target.value) || 9 }}))}
                    className="w-full px-3 py-2 border-2 border-yellow-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-700 mb-1 font-medium">🔴 Critical</label>
                  <input
                    type="number"
                    min="1"
                    value={config.evening.critical}
                    onChange={(e) => setConfig(prev => ({ ...prev, evening: { ...prev.evening, critical: parseInt(e.target.value) || 8 }}))}
                    className="w-full px-3 py-2 border-2 border-red-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm font-semibold"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Alert Settings */}
          <div className="mb-6 p-4 border border-gray-200 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-4">Alert Settings</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.enableAlerts}
                  onChange={(e) => setConfig(prev => ({ ...prev, enableAlerts: e.target.checked }))}
                  className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                />
                <span className="text-sm text-gray-700">Enable automated alerts on schedule</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.enableAutoSuggest}
                  onChange={(e) => setConfig(prev => ({ ...prev, enableAutoSuggest: e.target.checked }))}
                  className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                />
                <span className="text-sm text-gray-700">Auto-suggest cross-store support</span>
              </label>
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full px-4 py-3 bg-pink-600 text-white rounded-md hover:bg-pink-700 flex items-center justify-center gap-2 font-medium"
          >
            <Save className="w-5 h-5" />
            Save Configuration
          </button>

          {saved && (
            <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-md text-sm text-green-800 text-center">
              ✓ Configuration saved successfully!
            </div>
          )}
        </div>

        {/* Preview & Guide */}
        <div className="space-y-6">
          {/* Visual Preview */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Alert Preview</h2>
            <p className="text-sm text-gray-600 mb-4">
              This is how alerts will appear on your Shift Schedule:
            </p>

            <div className="space-y-3">
              {/* Good Status - Morning */}
              <div className="border-2 border-green-400 rounded-lg p-4 bg-green-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-800">Monday Morning</span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-semibold">✓ GOOD</span>
                </div>
                <div className="text-3xl font-bold text-green-700">
                  {config.morning.target}/{config.morning.target}
                </div>
                <div className="text-xs text-gray-600 mt-1">{config.morning.target} staff working - perfect!</div>
              </div>

              {/* Warning Status - Mid */}
              <div className="border-2 border-yellow-400 rounded-lg p-4 bg-yellow-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-800">Tuesday Mid</span>
                  <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded font-semibold">⚠ WARNING</span>
                </div>
                <div className="text-3xl font-bold text-yellow-700">
                  {config.mid.warning}/{config.mid.target}
                </div>
                <div className="text-xs text-gray-600 mt-1">{config.mid.warning} staff - slightly understaffed</div>
              </div>

              {/* Critical Status - Evening */}
              <div className="border-2 border-red-400 rounded-lg p-4 bg-red-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-800">Wednesday Evening</span>
                  <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded font-semibold">🔴 CRITICAL</span>
                </div>
                <div className="text-3xl font-bold text-red-700">
                  {config.evening.critical}/{config.evening.target}
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  Need +{config.evening.target - config.evening.critical} staff!
                </div>
              </div>
            </div>
          </div>

          {/* Status Legend */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Status Levels</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-green-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-green-700 font-bold">✓</span>
                </div>
                <div>
                  <div className="font-medium text-gray-800">Good (Green)</div>
                  <div className="text-sm text-gray-600">
                    Target or more staff working - fully staffed
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-yellow-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-yellow-700 font-bold">⚠</span>
                </div>
                <div>
                  <div className="font-medium text-gray-800">Warning (Yellow)</div>
                  <div className="text-sm text-gray-600">
                    At warning threshold - slightly understaffed, monitor closely
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-red-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-red-700 font-bold">!</span>
                </div>
                <div>
                  <div className="font-medium text-gray-800">Critical (Red)</div>
                  <div className="text-sm text-gray-600">
                    At or below critical threshold - urgent support needed!
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Guide */}
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 border border-pink-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">How It Works</h2>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex items-start gap-2">
                <span className="text-pink-600 font-bold">1.</span>
                <span>Set thresholds for each shift period (Morning, Mid, Evening)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-pink-600 font-bold">2.</span>
                <span>System counts staff scheduled for each period based on shift overlap</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-pink-600 font-bold">3.</span>
                <span>Visual alerts appear on Shift Schedule when period is understaffed</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-pink-600 font-bold">4.</span>
                <span>Click critical alerts to request support or additional shifts</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
