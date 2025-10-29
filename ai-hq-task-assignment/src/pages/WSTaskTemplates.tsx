import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Plus, Edit, Copy, Trash2, ChevronRight, Image, Camera, Sparkles, CheckCircle } from 'lucide-react';

interface WSTemplate {
  id: number;
  code: string;
  title: string;
  category: string;
  estimatedMinutes: number;
  description: string;
  isActive: boolean;
  season: string;
  deadlineDate: string; // Specific date for task completion
  requiresPhotoUpload: boolean;
  requiresHQApproval: boolean;
  aiAutoApproval: boolean;
  samplePhotos: number;
  createdDate: string;
}

export default function WSTaskTemplates() {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState('all');

  const wsTemplates = [
    {
      id: 1,
      code: 'WS-001',
      title: 'Holiday Decoration Setup - Christmas',
      category: 'Seasonal Events',
      estimatedMinutes: 240,
      description: 'Set up Christmas decorations including main entrance display, tree, ornaments, and lighting according to seasonal guidelines.',
      isActive: false,
      season: 'Winter',
      deadlineDate: '2024-12-15',
      requiresPhotoUpload: true,
      requiresHQApproval: true,
      aiAutoApproval: false,
      samplePhotos: 3,
      createdDate: '2024-10-15',
    },
    {
      id: 2,
      code: 'WS-002',
      title: 'Lunar New Year Display',
      category: 'Seasonal Events',
      estimatedMinutes: 180,
      description: 'Create Lunar New Year themed product displays with traditional decorations and promotional materials.',
      isActive: true,
      season: 'Spring',
      deadlineDate: '2025-01-25',
      requiresPhotoUpload: true,
      requiresHQApproval: false,
      aiAutoApproval: true,
      samplePhotos: 4,
      createdDate: '2024-09-20',
    },
    {
      id: 3,
      code: 'WS-003',
      title: 'Safety Inspection - Fire Equipment',
      category: 'Safety & Compliance',
      estimatedMinutes: 90,
      description: 'Conduct comprehensive fire safety equipment inspection. Photograph all fire extinguishers, emergency exits, and alarm systems.',
      isActive: true,
      season: 'All Year',
      deadlineDate: '2024-12-31',
      requiresPhotoUpload: true,
      requiresHQApproval: true,
      aiAutoApproval: false,
      samplePhotos: 2,
      createdDate: '2024-08-10',
    },
    {
      id: 4,
      code: 'WS-004',
      title: 'Product Recall Documentation',
      category: 'Compliance',
      estimatedMinutes: 60,
      description: 'Document and photograph all recalled products removed from shelves. Ensure proper disposal documentation.',
      isActive: true,
      season: 'All Year',
      deadlineDate: '2024-11-30',
      requiresPhotoUpload: true,
      requiresHQApproval: true,
      aiAutoApproval: false,
      samplePhotos: 2,
      createdDate: '2024-07-05',
    },
    {
      id: 5,
      code: 'WS-005',
      title: 'Store Opening Ceremony',
      category: 'Special Events',
      estimatedMinutes: 300,
      description: 'Set up and execute store opening ceremony including ribbon cutting area, guest seating, and promotional displays.',
      isActive: false,
      season: 'All Year',
      deadlineDate: '2025-03-15',
      requiresPhotoUpload: true,
      requiresHQApproval: true,
      aiAutoApproval: false,
      samplePhotos: 5,
      createdDate: '2024-06-12',
    },
    {
      id: 6,
      code: 'WS-006',
      title: 'Summer Sale Campaign Display',
      category: 'Promotional',
      estimatedMinutes: 150,
      description: 'Set up summer sale promotional displays with signage, product arrangements, and pricing updates.',
      isActive: true,
      season: 'Summer',
      deadlineDate: '2025-06-01',
      requiresPhotoUpload: true,
      requiresHQApproval: false,
      aiAutoApproval: true,
      samplePhotos: 3,
      createdDate: '2024-05-20',
    },
  ];

  const categories = [
    { id: 'all', name: 'All Categories', count: wsTemplates.length },
    { id: 'seasonal', name: 'Seasonal Events', count: wsTemplates.filter(t => t.category === 'Seasonal Events').length },
    { id: 'safety', name: 'Safety & Compliance', count: wsTemplates.filter(t => t.category === 'Safety & Compliance' || t.category === 'Compliance').length },
    { id: 'promotional', name: 'Promotional', count: wsTemplates.filter(t => t.category === 'Promotional').length },
    { id: 'special', name: 'Special Events', count: wsTemplates.filter(t => t.category === 'Special Events').length },
  ];

  const filteredTemplates = selectedFilter === 'all'
    ? wsTemplates
    : wsTemplates.filter(t => 
        t.category.toLowerCase().includes(selectedFilter) || 
        (selectedFilter === 'safety' && (t.category === 'Safety & Compliance' || t.category === 'Compliance'))
      );

  const getSeasonColor = (season: string) => {
    const colors: { [key: string]: string } = {
      'Spring': 'bg-green-100 text-green-700',
      'Summer': 'bg-yellow-100 text-yellow-700',
      'Fall': 'bg-orange-100 text-orange-700',
      'Winter': 'bg-blue-100 text-blue-700',
      'All Year': 'bg-gray-100 text-gray-700',
    };
    return colors[season] || 'bg-gray-100 text-gray-700';
  };

  const handleCreate = () => {
    navigate('/ws-templates/create');
  };

  const handleEdit = (template: WSTemplate) => {
    navigate(`/ws-templates/edit/${template.id}`);
  };

  const handleCopy = (template: WSTemplate) => {
    // For copy, navigate to create page (future enhancement: pass template data)
    navigate('/ws-templates/create');
  };

  const handleDelete = (template: WSTemplate) => {
    if (confirm(`Delete template "${template.title}"?`)) {
      console.log('Deleting template:', template.id);
      alert(`Template "${template.title}" deleted!`);
    }
  };

  return (
    <div className="p-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-6">
        <span className="text-gray-500">Task Management</span>
        <ChevronRight className="w-4 h-4 text-gray-500" />
        <span className="text-gray-800 font-medium">WS Task Templates</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-gray-800">WS Templates</h1>
            <span className="bg-orange-500 text-white px-3 py-1 rounded text-sm font-medium">
              WS
            </span>
          </div>
          <p className="text-gray-500">Manage event-based tasks with photo verification and approval workflow</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/task-assignment')}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2"
          >
            <ChevronRight className="w-4 h-4" />
            Assign Tasks
          </button>
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create Template
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-3xl font-bold text-gray-800 mb-1">{wsTemplates.length}</div>
          <div className="text-sm text-gray-500">Total Templates</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-3xl font-bold text-green-600 mb-1">
            {wsTemplates.filter(t => t.isActive).length}
          </div>
          <div className="text-sm text-gray-500">Active</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-3xl font-bold text-purple-600 mb-1">
            {wsTemplates.filter(t => t.aiAutoApproval).length}
          </div>
          <div className="text-sm text-gray-500">AI Auto-Approval</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-3xl font-bold text-blue-600 mb-1">
            {wsTemplates.filter(t => t.requiresHQApproval).length}
          </div>
          <div className="text-sm text-gray-500">Requires HQ Approval</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-3xl font-bold text-pink-600 mb-1">
            {Math.round(wsTemplates.reduce((sum, t) => sum + t.estimatedMinutes, 0) / wsTemplates.length)}
          </div>
          <div className="text-sm text-gray-500">Avg Minutes</div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Category Filter */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Categories
          </h2>
          <div className="space-y-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedFilter(category.id)}
                className={`w-full text-left px-3 py-2 rounded-md flex items-center justify-between ${
                  selectedFilter === category.id
                    ? 'bg-pink-50 text-pink-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className="text-sm">{category.name}</span>
                <span className={`text-xs px-2 py-1 rounded ${
                  selectedFilter === category.id ? 'bg-pink-100' : 'bg-gray-100'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
            <div className="flex items-center gap-2 mb-2">
              <Camera className="w-5 h-5 text-orange-600" />
              <span className="font-medium text-orange-800">Photo Verification</span>
            </div>
            <p className="text-sm text-orange-700 mb-3">
              All WS tasks require photo evidence for completion verification.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-orange-700">
                <Sparkles className="w-4 h-4" />
                <span>AI Auto-Approval</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-orange-700">
                <CheckCircle className="w-4 h-4" />
                <span>HQ Manual Approval</span>
              </div>
            </div>
          </div>
        </div>

        {/* Templates List */}
        <div className="col-span-3">
          {/* Search & Filters */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by code, title, or category..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <select className="px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500">
                <option>All Seasons</option>
                <option>Spring</option>
                <option>Summer</option>
                <option>Fall</option>
                <option>Winter</option>
                <option>All Year</option>
              </select>
              <select className="px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500">
                <option>All Status</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>

          {/* Template Cards */}
          <div className="space-y-3">
            {filteredTemplates.map((template) => (
              <div key={template.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="bg-orange-500 p-3 rounded-lg text-white font-bold text-sm">
                      WS
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded">
                          {template.code}
                        </span>
                        <span className={`text-xs font-medium px-2 py-1 rounded ${getSeasonColor(template.season)}`}>
                          {template.season}
                        </span>
                        <span className="text-xs text-gray-500">{template.category}</span>
                      </div>
                      <h3 className="font-semibold text-gray-800 mb-2">{template.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                      
                      {/* Photo Verification Section */}
                      <div className="space-y-3 mb-3">
                        <div className="flex items-center gap-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
                          <Image className="w-5 h-5 text-purple-600" />
                          <div className="flex-1">
                            <div className="text-xs text-purple-600 font-medium mb-1">Sample Photos</div>
                            <div className="text-sm font-semibold text-purple-800">{template.samplePhotos} reference images</div>
                          </div>
                          <button className="px-3 py-1 bg-purple-600 text-white rounded text-xs hover:bg-purple-700">
                            View Samples
                          </button>
                        </div>

                        <div className="flex items-center gap-4 p-3 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200">
                          <div className="flex items-center gap-2 flex-1">
                            {template.aiAutoApproval ? (
                              <>
                                <Sparkles className="w-5 h-5 text-blue-600" />
                                <div>
                                  <div className="text-xs text-blue-600 font-medium">Approval Method</div>
                                  <div className="text-sm font-semibold text-blue-800">AI Auto-Approval</div>
                                </div>
                              </>
                            ) : (
                              <>
                                <CheckCircle className="w-5 h-5 text-green-600" />
                                <div>
                                  <div className="text-xs text-green-600 font-medium">Approval Method</div>
                                  <div className="text-sm font-semibold text-green-800">HQ Manual Approval</div>
                                </div>
                              </>
                            )}
                          </div>
                          {template.requiresHQApproval && (
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-medium">
                              Requires HQ Review
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-800">{template.estimatedMinutes} min</span>
                          <span>Estimated Time</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Camera className="w-4 h-4" />
                          <span className="font-medium text-gray-800">Photo Upload Required</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400">Created: {new Date(template.createdDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`px-3 py-1 rounded text-xs font-medium ${
                      template.isActive
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {template.isActive ? 'Active' : 'Inactive'}
                    </div>
                    <button
                      onClick={() => handleEdit(template)}
                      className="p-2 hover:bg-gray-100 rounded"
                      title="Edit Template"
                    >
                      <Edit className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() => handleCopy(template)}
                      className="p-2 hover:bg-gray-100 rounded"
                      title="Duplicate Template"
                    >
                      <Copy className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(template)}
                      className="p-2 hover:bg-gray-100 rounded"
                      title="Delete Template"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
