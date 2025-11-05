import { AlertTriangle, TrendingUp } from 'lucide-react';

interface StaffingStatus {
  period: string;
  day: string;
  required: number;
  actual: number;
  status: 'critical' | 'warning' | 'good';
}

interface StaffingOverviewWidgetProps {
  criticalCount: number;
  warningCount: number;
  goodCount: number;
  worstIssues: StaffingStatus[];
  onReviewClick: () => void;
  onRequestClick: () => void;
}

export function StaffingOverviewWidget({
  criticalCount,
  warningCount,
  goodCount,
  worstIssues,
  onReviewClick,
  onRequestClick
}: StaffingOverviewWidgetProps) {
  const total = criticalCount + warningCount + goodCount;
  const criticalPercent = (criticalCount / total) * 100;
  const warningPercent = (warningCount / total) * 100;
  const goodPercent = (goodCount / total) * 100;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-pink-600" />
          This Week's Staffing Status
        </h2>
      </div>

      {/* Status Counts */}
      <div className="flex items-center gap-6 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-sm text-gray-700">
            <span className="font-bold text-red-700">{criticalCount}</span> Critical
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <span className="text-sm text-gray-700">
            <span className="font-bold text-yellow-700">{warningCount}</span> Warnings
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-sm text-gray-700">
            <span className="font-bold text-green-700">{goodCount}</span> All Good
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex h-6 rounded-lg overflow-hidden border border-gray-200">
          {criticalPercent > 0 && (
            <div
              className="bg-red-500 flex items-center justify-center"
              style={{ width: `${criticalPercent}%` }}
            >
              <span className="text-xs text-white font-medium">
                {criticalPercent >= 10 ? `${Math.round(criticalPercent)}%` : ''}
              </span>
            </div>
          )}
          {warningPercent > 0 && (
            <div
              className="bg-yellow-400 flex items-center justify-center"
              style={{ width: `${warningPercent}%` }}
            >
              <span className="text-xs text-white font-medium">
                {warningPercent >= 10 ? `${Math.round(warningPercent)}%` : ''}
              </span>
            </div>
          )}
          {goodPercent > 0 && (
            <div
              className="bg-green-500 flex items-center justify-center"
              style={{ width: `${goodPercent}%` }}
            >
              <span className="text-xs text-white font-medium">
                {goodPercent >= 10 ? `${Math.round(goodPercent)}%` : ''}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Worst Issues */}
      {worstIssues.length > 0 && (
        <div className="mb-4">
          <div className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            Needs Attention:
          </div>
          <div className="space-y-2">
            {worstIssues.map((issue, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm bg-red-50 border border-red-200 rounded px-3 py-2">
                <span className="text-gray-800">
                  {issue.day} {issue.period}:
                </span>
                <span className="font-semibold text-red-700">
                  Need +{issue.required - issue.actual} staff
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={onReviewClick}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm font-medium"
        >
          Review All Alerts
        </button>
        <button
          onClick={onRequestClick}
          className="flex-1 px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 text-sm font-medium"
        >
          Request Support
        </button>
      </div>
    </div>
  );
}
