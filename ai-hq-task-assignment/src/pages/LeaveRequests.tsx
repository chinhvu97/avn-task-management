import { ChevronRight, Check, X, Clock, Calendar } from 'lucide-react';
import imgSarahJohnson from "figma:asset/95d7a9441ece29d0959b696f896ad7aa18c44dda.png";
import imgMikeChen from "figma:asset/8f8739691b761475875d05de592ee9166a999b67.png";

export default function LeaveRequests() {
  const requests = [
    {
      id: 1,
      staff: 'Mike Chen',
      avatar: imgMikeChen,
      role: 'Sales Associate',
      store: 'Store #01 - Hanoi',
      type: 'Annual Leave',
      startDate: '2025-11-05',
      endDate: '2025-11-07',
      days: 3,
      reason: 'Family vacation',
      status: 'Pending',
      submittedDate: '2025-10-25',
    },
    {
      id: 2,
      staff: 'Sarah Johnson',
      avatar: imgSarahJohnson,
      role: 'Floor Manager',
      store: 'Store #01 - Hanoi',
      type: 'Sick Leave',
      startDate: '2025-10-29',
      endDate: '2025-10-29',
      days: 1,
      reason: 'Medical appointment',
      status: 'Pending',
      submittedDate: '2025-10-26',
    },
    {
      id: 3,
      staff: 'Emily Rodriguez',
      avatar: null,
      role: 'Cashier',
      store: 'Store #02 - Hanoi',
      type: 'Personal Leave',
      startDate: '2025-11-10',
      endDate: '2025-11-12',
      days: 3,
      reason: 'Personal matters',
      status: 'Approved',
      submittedDate: '2025-10-20',
    },
  ];

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'Pending': 'bg-yellow-100 text-yellow-700 border-yellow-300',
      'Approved': 'bg-green-100 text-green-700 border-green-300',
      'Rejected': 'bg-red-100 text-red-700 border-red-300',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="p-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-6">
        <span className="text-gray-500">Shift Management</span>
        <ChevronRight className="w-4 h-4 text-gray-500" />
        <span className="text-gray-800 font-medium">Leave Requests</span>
      </div>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Leave Requests</h1>
        <p className="text-gray-500">Review and approve staff leave applications</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-3xl font-bold text-yellow-600 mb-1">2</div>
          <div className="text-sm text-gray-500">Pending Requests</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-3xl font-bold text-green-600 mb-1">15</div>
          <div className="text-sm text-gray-500">Approved This Month</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-3xl font-bold text-red-600 mb-1">2</div>
          <div className="text-sm text-gray-500">Rejected</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-3xl font-bold text-gray-800 mb-1">3.2</div>
          <div className="text-sm text-gray-500">Avg Days/Request</div>
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {requests.map((request) => (
          <div key={request.id} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                {request.avatar ? (
                  <img src={request.avatar} alt={request.staff} className="w-12 h-12 rounded-full object-cover" />
                ) : (
                  <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium">
                      {request.staff.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-gray-800">{request.staff}</h3>
                  <p className="text-sm text-gray-500">{request.role} • {request.store}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded text-sm border ${getStatusColor(request.status)}`}>
                {request.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-500">Leave Type</span>
                </div>
                <div className="font-medium text-gray-800">{request.type}</div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-500">Duration</span>
                </div>
                <div className="font-medium text-gray-800">{request.days} {request.days === 1 ? 'day' : 'days'}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-2">Start Date</div>
                <div className="font-medium text-gray-800">{new Date(request.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-2">End Date</div>
                <div className="font-medium text-gray-800">{new Date(request.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
              </div>
            </div>

            <div className="mb-4">
              <div className="text-sm text-gray-500 mb-2">Reason</div>
              <div className="text-gray-800">{request.reason}</div>
            </div>

            <div className="text-xs text-gray-500 mb-4">
              Submitted on {new Date(request.submittedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>

            {request.status === 'Pending' && (
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center justify-center gap-2">
                  <Check className="w-4 h-4" />
                  Approve
                </button>
                <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center justify-center gap-2">
                  <X className="w-4 h-4" />
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
