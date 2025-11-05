import { X, RefreshCw, Building2, Clock } from 'lucide-react';

interface StaffingAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  alert: {
    day: string;
    period: string;
    timeRange: string;
    current: number;
    required: number;
    gap: number;
  };
  onRequestShift: () => void;
  onRequestCrossStore: () => void;
}

export function StaffingAlertModal({
  isOpen,
  onClose,
  alert,
  onRequestShift,
  onRequestCrossStore
}: StaffingAlertModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <span className="text-red-600 text-xl">⚠</span>
            </div>
            <h2 className="text-xl font-bold text-gray-800">Staffing Alert: Action Required</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Alert Details */}
          <div className="mb-6">
            <div className="text-lg font-semibold text-gray-800 mb-2">
              {alert.day} • {alert.period} Shift
            </div>
            <div className="flex items-center gap-2 text-gray-600 mb-4">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{alert.timeRange}</span>
            </div>

            <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="text-xs text-gray-600 mb-1">Current Staffing</div>
                <div className="text-2xl font-bold text-gray-800">{alert.current}</div>
                <div className="text-xs text-gray-500">person{alert.current !== 1 ? 's' : ''}</div>
              </div>
              <div>
                <div className="text-xs text-gray-600 mb-1">Required Minimum</div>
                <div className="text-2xl font-bold text-gray-800">{alert.required}</div>
                <div className="text-xs text-gray-500">person{alert.required !== 1 ? 's' : ''}</div>
              </div>
              <div>
                <div className="text-xs text-gray-600 mb-1">Deficit</div>
                <div className="text-2xl font-bold text-red-600">{alert.gap}</div>
                <div className="text-xs text-gray-500">staff needed</div>
              </div>
            </div>
          </div>

          {/* Available Actions */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Available Actions:</h3>

            {/* Request Additional Shift */}
            <button
              onClick={onRequestShift}
              className="w-full mb-3 p-4 border-2 border-gray-200 rounded-lg hover:border-pink-300 hover:bg-pink-50 transition-all text-left group"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 group-hover:bg-blue-200 flex items-center justify-center flex-shrink-0 transition-colors">
                  <RefreshCw className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800 mb-1">Request Additional Shift</div>
                  <div className="text-sm text-gray-600 mb-2">
                    Post shift opportunity for store staff
                  </div>
                  <div className="inline-block px-3 py-1 bg-white border border-blue-200 rounded text-sm font-medium text-blue-700 group-hover:bg-blue-100 transition-colors">
                    Request Shift
                  </div>
                </div>
              </div>
            </button>

            {/* Request Cross-Store Support */}
            <button
              onClick={onRequestCrossStore}
              className="w-full mb-3 p-4 border-2 border-gray-200 rounded-lg hover:border-pink-300 hover:bg-pink-50 transition-all text-left group"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-100 group-hover:bg-purple-200 flex items-center justify-center flex-shrink-0 transition-colors">
                  <Building2 className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800 mb-1">Request Cross-Store Support</div>
                  <div className="text-sm text-gray-600 mb-2">
                    Find available staff from nearby stores
                  </div>
                  <div className="space-y-1 mb-2">
                    <div className="text-xs text-gray-600 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      Tan Phu Mall (2 available)
                    </div>
                    <div className="text-xs text-gray-600 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      Long Bien (1 available)
                    </div>
                  </div>
                  <div className="inline-block px-3 py-1 bg-white border border-purple-200 rounded text-sm font-medium text-purple-700 group-hover:bg-purple-100 transition-colors">
                    Request Support
                  </div>
                </div>
              </div>
            </button>

            {/* Adjust Existing Shifts - Disabled for prototype */}
            <div className="p-4 border-2 border-gray-100 rounded-lg bg-gray-50 opacity-60">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-gray-500" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-600 mb-1">Adjust Existing Shifts</div>
                  <div className="text-sm text-gray-500 mb-2">
                    Extend or modify current shifts
                  </div>
                  <div className="inline-block px-3 py-1 bg-gray-200 rounded text-sm font-medium text-gray-500">
                    Coming Soon
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-white text-gray-700 font-medium"
          >
            Dismiss
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
          >
            Snooze 1 Day
          </button>
        </div>
      </div>
    </div>
  );
}
