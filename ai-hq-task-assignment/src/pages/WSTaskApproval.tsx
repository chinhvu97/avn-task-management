import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Download, CheckCircle, XCircle, Clock, Sparkles, AlertTriangle, Eye, ChevronDown } from 'lucide-react';
import { mockWSSubmissions, WSTaskSubmission } from 'shared-data';
import { useRole } from '../contexts/RoleContext';
import { RoleIndicator } from '../components/RoleIndicator';

export default function WSTaskApproval() {
  const { profile } = useRole();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedStore, setSelectedStore] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [submissions, setSubmissions] = useState(mockWSSubmissions);

  // Filter submissions
  const filteredSubmissions = useMemo(() => {
    return submissions.filter(sub => {
      // Search filter
      const matchesSearch = searchQuery === '' ||
        sub.taskCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.storeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.staffName.toLowerCase().includes(searchQuery.toLowerCase());

      // Status filter
      const matchesStatus = selectedStatus === 'all' || sub.status === selectedStatus;

      // Store filter
      const matchesStore = selectedStore === 'all' || sub.storeId === selectedStore;

      // Category filter
      const matchesCategory = selectedCategory === 'all' || sub.category === selectedCategory;

      // Priority filter
      const matchesPriority = selectedPriority === 'all' || sub.priority === selectedPriority;

      return matchesSearch && matchesStatus && matchesStore && matchesCategory && matchesPriority;
    });
  }, [submissions, searchQuery, selectedStatus, selectedStore, selectedCategory, selectedPriority]);

  // Calculate statistics
  const stats = useMemo(() => {
    const pending = submissions.filter(s => s.status === 'Pending').length;
    const aiApproved = submissions.filter(s => s.status === 'AI Approved').length;
    const manualApproved = submissions.filter(s => s.status === 'Manual Approved').length;
    const approved = aiApproved + manualApproved;
    const rejected = submissions.filter(s => s.status === 'Rejected').length;

    // Calculate average time to approval (in hours)
    const reviewedSubs = submissions.filter(s => s.reviewedDate);
    let avgTime = 0;
    if (reviewedSubs.length > 0) {
      const totalTime = reviewedSubs.reduce((sum, s) => {
        const submitted = new Date(s.submittedDate).getTime();
        const reviewed = new Date(s.reviewedDate!).getTime();
        return sum + (reviewed - submitted);
      }, 0);
      avgTime = totalTime / reviewedSubs.length / (1000 * 60 * 60); // Convert to hours
    }

    return {
      pending,
      approved,
      rejected,
      avgTime,
      aiSuggested: submissions.filter(s =>
        s.status === 'Pending' && s.aiAnalysis && s.aiAnalysis.confidence < 75
      ).length,
      urgent: submissions.filter(s => s.status === 'Pending' && s.priority === 'Urgent').length,
    };
  }, [submissions]);

  // Get unique stores and categories
  const stores = useMemo(() => {
    const unique = Array.from(new Set(submissions.map(s => ({ id: s.storeId, name: s.storeName }))));
    return unique.filter((store, index, self) =>
      index === self.findIndex(s => s.id === store.id)
    );
  }, [submissions]);

  const categories = useMemo(() => {
    return Array.from(new Set(submissions.map(s => s.category)));
  }, [submissions]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pending':
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 border border-yellow-300 text-yellow-700 flex items-center gap-1">
          <Clock className="w-3 h-3" />
          Pending
        </span>;
      case 'AI Approved':
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 border border-green-300 text-green-700 flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          AI Approved
        </span>;
      case 'Manual Approved':
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 border border-green-300 text-green-700 flex items-center gap-1">
          <CheckCircle className="w-3 h-3" />
          Approved
        </span>;
      case 'Rejected':
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 border border-red-300 text-red-700 flex items-center gap-1">
          <XCircle className="w-3 h-3" />
          Rejected
        </span>;
      default:
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 border border-gray-300 text-gray-700">
          {status}
        </span>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      'Urgent': 'bg-red-100 text-red-700 border-red-300',
      'High': 'bg-orange-100 text-orange-700 border-orange-300',
      'Medium': 'bg-yellow-100 text-yellow-700 border-yellow-300',
      'Low': 'bg-gray-100 text-gray-600 border-gray-300',
    };
    return <span className={`px-2 py-0.5 rounded text-xs font-medium border ${colors[priority as keyof typeof colors] || colors.Low}`}>
      {priority}
    </span>;
  };

  const getAIConfidenceBadge = (submission: WSTaskSubmission) => {
    if (!submission.aiAnalysis) return null;

    const { confidence, recommendation } = submission.aiAnalysis;

    if (recommendation === 'Review' && confidence < 75) {
      return <span className="px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-700 border border-yellow-300 flex items-center gap-1">
        <AlertTriangle className="w-3 h-3" />
        AI Review ({confidence}%)
      </span>;
    }

    return null;
  };

  const handleQuickFilter = (type: 'pending' | 'aiSuggested' | 'urgent') => {
    if (type === 'pending') {
      setSelectedStatus('Pending');
      setSelectedPriority('all');
    } else if (type === 'aiSuggested') {
      setSelectedStatus('Pending');
      setSelectedPriority('all');
      // Note: AI suggested filter would need more complex logic in real implementation
    } else if (type === 'urgent') {
      setSelectedStatus('Pending');
      setSelectedPriority('Urgent');
    }
  };

  const handleOpenSubmission = (submission: WSTaskSubmission) => {
    navigate(`/ws-task-approval/${submission.id}`, { state: { submission } });
  };

  return (
    <>
      <div className="p-6">
        {/* Role Indicator */}
        <RoleIndicator />

        <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">WS Task Approval</h1>
            <p className="text-gray-600">
              Review and approve photo verification tasks from stores
            </p>
          </div>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 font-medium flex items-center gap-2">
            <Download className="w-5 h-5" />
            Export Report
          </button>
        </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-8 h-8 text-yellow-600" />
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-900">{stats.pending}</div>
              <div className="text-sm text-gray-500">Pending Review</div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-900">{stats.approved}</div>
              <div className="text-sm text-gray-500">Approved</div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <XCircle className="w-8 h-8 text-red-600" />
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-900">{stats.rejected}</div>
              <div className="text-sm text-gray-500">Rejected</div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-8 h-8 text-blue-600" />
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-900">{stats.avgTime.toFixed(1)}h</div>
              <div className="text-sm text-gray-500">Avg Review Time</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by task code, store, staff name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            />
          </div>
        </div>

        {/* Filter Dropdowns */}
        <div className="flex items-center gap-3 mb-4">
          <Filter className="w-5 h-5 text-gray-500" />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-sm"
          >
            <option value="all">All Status</option>
            <option value="Pending">Pending</option>
            <option value="AI Approved">AI Approved</option>
            <option value="Manual Approved">Manual Approved</option>
            <option value="Rejected">Rejected</option>
          </select>

          <select
            value={selectedStore}
            onChange={(e) => setSelectedStore(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-sm"
          >
            <option value="all">All Stores</option>
            {stores.map(store => (
              <option key={store.id} value={store.id}>{store.name}</option>
            ))}
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-sm"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-sm"
          >
            <option value="all">All Priorities</option>
            <option value="Urgent">Urgent</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        {/* Quick Filters */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 font-medium">Quick Filters:</span>
          <button
            onClick={() => handleQuickFilter('pending')}
            className="px-3 py-1.5 bg-yellow-50 border border-yellow-300 rounded-lg hover:bg-yellow-100 text-sm font-medium text-yellow-700 flex items-center gap-1.5"
          >
            <Clock className="w-4 h-4" />
            Pending ({stats.pending})
          </button>
          <button
            onClick={() => handleQuickFilter('aiSuggested')}
            className="px-3 py-1.5 bg-blue-50 border border-blue-300 rounded-lg hover:bg-blue-100 text-sm font-medium text-blue-700 flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" />
            AI Suggested ({stats.aiSuggested})
          </button>
          <button
            onClick={() => handleQuickFilter('urgent')}
            className="px-3 py-1.5 bg-red-50 border border-red-300 rounded-lg hover:bg-red-100 text-sm font-medium text-red-700 flex items-center gap-1.5"
          >
            <AlertTriangle className="w-4 h-4" />
            Urgent ({stats.urgent})
          </button>
        </div>
      </div>

      {/* Task Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Task Code
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Task Title
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Store
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Staff
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSubmissions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center text-gray-500">
                    No submissions found matching your filters
                  </td>
                </tr>
              ) : (
                filteredSubmissions.map((submission) => (
                  <tr key={submission.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-6 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{submission.taskCode}</div>
                      <div className="text-xs text-gray-500 mt-1">{submission.category}</div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="text-sm font-medium text-gray-900 mb-1 max-w-sm">
                        {submission.title}
                      </div>
                      {getAIConfidenceBadge(submission)}
                    </td>
                    <td className="px-6 py-6">
                      <div className="text-sm text-gray-900 max-w-xs">{submission.storeName}</div>
                    </td>
                    <td className="px-6 py-6 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{submission.staffName}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(submission.submittedDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-6 whitespace-nowrap">
                      {getPriorityBadge(submission.priority)}
                    </td>
                    <td className="px-6 py-6 whitespace-nowrap">
                      {getStatusBadge(submission.status)}
                    </td>
                    <td className="px-6 py-6 whitespace-nowrap">
                      <button
                        onClick={() => handleOpenSubmission(submission)}
                        className="px-3 py-1.5 bg-pink-600 text-white rounded-lg hover:bg-pink-700 text-sm font-medium flex items-center gap-1.5 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        {submission.status === 'Pending' ? 'Review' : 'View'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
        </div>
      </div>
    </>
  );
}
