import { useState } from 'react';
import { Search, Filter, Plus, MoreVertical, Mail, Phone, MapPin, ChevronRight, Download, Edit, Trash2 } from 'lucide-react';
import imgSarahJohnson from "figma:asset/95d7a9441ece29d0959b696f896ad7aa18c44dda.png";
import imgMikeChen from "figma:asset/8f8739691b761475875d05de592ee9166a999b67.png";
import imgEmilyRodriguez from "figma:asset/4afc0e5a544bfde91b9b95c54aae40d325105d17.png";

export default function StaffManagement() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const staff = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Floor Manager',
      avatar: imgSarahJohnson,
      store: 'Store #01 - Hanoi',
      email: 'sarah.johnson@aeon.vn',
      phone: '+84 91 234 5678',
      status: 'Active',
      tasksCompleted: 245,
      completionRate: 94,
      shiftStart: '08:00',
      shiftEnd: '17:00',
      joinDate: '2023-01-15',
    },
    {
      id: 2,
      name: 'Mike Chen',
      role: 'Sales Associate',
      avatar: imgMikeChen,
      store: 'Store #01 - Hanoi',
      email: 'mike.chen@aeon.vn',
      phone: '+84 91 234 5679',
      status: 'Active',
      tasksCompleted: 198,
      completionRate: 88,
      shiftStart: '09:00',
      shiftEnd: '18:00',
      joinDate: '2023-03-22',
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Cashier',
      avatar: imgEmilyRodriguez,
      store: 'Store #02 - Hanoi',
      email: 'emily.rodriguez@aeon.vn',
      phone: '+84 91 234 5680',
      status: 'Active',
      tasksCompleted: 312,
      completionRate: 96,
      shiftStart: '07:30',
      shiftEnd: '16:30',
      joinDate: '2022-11-10',
    },
    {
      id: 4,
      name: 'John Smith',
      role: 'Stock Clerk',
      avatar: null,
      store: 'Store #03 - HCMC',
      email: 'john.smith@aeon.vn',
      phone: '+84 91 234 5681',
      status: 'On Leave',
      tasksCompleted: 167,
      completionRate: 82,
      shiftStart: '06:00',
      shiftEnd: '15:00',
      joinDate: '2024-02-01',
    },
    {
      id: 5,
      name: 'Lisa Wong',
      role: 'Customer Service',
      avatar: null,
      store: 'Store #04 - HCMC',
      email: 'lisa.wong@aeon.vn',
      phone: '+84 91 234 5682',
      status: 'Active',
      tasksCompleted: 221,
      completionRate: 91,
      shiftStart: '10:00',
      shiftEnd: '19:00',
      joinDate: '2023-07-18',
    },
    {
      id: 6,
      name: 'David Park',
      role: 'Floor Manager',
      avatar: null,
      store: 'Store #05 - Da Nang',
      email: 'david.park@aeon.vn',
      phone: '+84 91 234 5683',
      status: 'Active',
      tasksCompleted: 289,
      completionRate: 93,
      shiftStart: '08:00',
      shiftEnd: '17:00',
      joinDate: '2022-09-05',
    },
  ];

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'Active': 'bg-green-100 text-green-700 border-green-300',
      'On Leave': 'bg-yellow-100 text-yellow-700 border-yellow-300',
      'Inactive': 'bg-gray-100 text-gray-700 border-gray-300',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="p-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-6">
        <span className="text-gray-500">Management</span>
        <ChevronRight className="w-4 h-4 text-gray-500" />
        <span className="text-gray-800 font-medium">Staff Management</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Staff Management</h1>
          <p className="text-gray-500">Manage employees across all stores</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-gray-200 rounded-md hover:bg-gray-50 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Staff
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-3xl font-bold text-gray-800 mb-1">156</div>
          <div className="text-sm text-gray-500">Total Staff</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-3xl font-bold text-green-600 mb-1">148</div>
          <div className="text-sm text-gray-500">Active Today</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-3xl font-bold text-yellow-600 mb-1">8</div>
          <div className="text-sm text-gray-500">On Leave</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-3xl font-bold text-pink-600 mb-1">91.2%</div>
          <div className="text-sm text-gray-500">Avg Completion Rate</div>
        </div>
      </div>

      {/* Filters & Controls */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search staff by name, role, or store..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <button className="px-4 py-2 border border-gray-200 rounded-md hover:bg-gray-50 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
          <div className="bg-slate-100 p-1 rounded-lg flex">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded text-sm ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded text-sm ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
            >
              List
            </button>
          </div>
        </div>
      </div>

      {/* Staff Grid */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-3 gap-6">
          {staff.map((person) => (
            <div key={person.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {person.avatar ? (
                      <img src={person.avatar} alt={person.name} className="w-12 h-12 rounded-full object-cover" />
                    ) : (
                      <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium">
                          {person.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    )}
                    <div>
                      <div className="font-medium text-gray-800">{person.name}</div>
                      <div className="text-sm text-gray-500">{person.role}</div>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded">
                    <MoreVertical className="w-4 h-4 text-gray-600" />
                  </button>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    {person.store}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    {person.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    {person.phone}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-500">Status</span>
                    <span className={`px-2 py-1 rounded text-xs border ${getStatusColor(person.status)}`}>
                      {person.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-500">Tasks Completed</span>
                    <span className="text-sm font-medium text-gray-800">{person.tasksCompleted}</span>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-500">Completion Rate</span>
                      <span className="text-sm font-medium text-gray-800">{person.completionRate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-pink-600 h-2 rounded-full"
                        style={{ width: `${person.completionRate}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-slate-100 px-6 py-3 flex items-center justify-between">
                <div className="text-xs text-gray-600">
                  Joined {new Date(person.joinDate).toLocaleDateString()}
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-gray-200 rounded">
                    <Edit className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-200 rounded">
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Staff List */}
      {viewMode === 'list' && (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-100 border-b border-gray-200">
              <tr>
                <th className="text-left p-4 font-medium text-gray-800">Staff Member</th>
                <th className="text-left p-4 font-medium text-gray-800">Role</th>
                <th className="text-left p-4 font-medium text-gray-800">Store</th>
                <th className="text-left p-4 font-medium text-gray-800">Contact</th>
                <th className="text-left p-4 font-medium text-gray-800">Status</th>
                <th className="text-right p-4 font-medium text-gray-800">Tasks</th>
                <th className="text-right p-4 font-medium text-gray-800">Rate</th>
                <th className="text-center p-4 font-medium text-gray-800">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {staff.map((person) => (
                <tr key={person.id} className="hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {person.avatar ? (
                        <img src={person.avatar} alt={person.name} className="w-10 h-10 rounded-full object-cover" />
                      ) : (
                        <div className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-medium">
                            {person.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      )}
                      <div>
                        <div className="font-medium text-gray-800">{person.name}</div>
                        <div className="text-xs text-gray-500">{person.shiftStart} - {person.shiftEnd}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600">{person.role}</td>
                  <td className="p-4 text-sm text-gray-600">{person.store}</td>
                  <td className="p-4">
                    <div className="text-sm text-gray-600">{person.email}</div>
                    <div className="text-xs text-gray-500">{person.phone}</div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs border ${getStatusColor(person.status)}`}>
                      {person.status}
                    </span>
                  </td>
                  <td className="p-4 text-right text-sm text-gray-800 font-medium">{person.tasksCompleted}</td>
                  <td className="p-4 text-right">
                    <span className="text-sm font-medium text-gray-800">{person.completionRate}%</span>
                  </td>
                  <td className="p-4 text-center">
                    <button className="p-2 hover:bg-gray-100 rounded">
                      <MoreVertical className="w-4 h-4 text-gray-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
