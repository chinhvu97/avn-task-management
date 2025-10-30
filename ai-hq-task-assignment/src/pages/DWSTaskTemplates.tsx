import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Plus, Edit, Copy, Trash2, ChevronRight, BookOpen, ExternalLink } from 'lucide-react';
import { dwsTemplates } from 'shared-data';
import type { TaskTemplate } from 'shared-data';

export default function DWSTaskTemplates() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const categories = [
    { id: 'all', name: 'All Categories', count: 110 },
    { id: 'pos', name: 'POS Operations', count: 18 },
    { id: 'inventory', name: 'Inventory Management', count: 22 },
    { id: 'customer', name: 'Customer Service', count: 15 },
    { id: 'cleaning', name: 'Cleaning & Maintenance', count: 20 },
    { id: 'merchandising', name: 'Merchandising', count: 12 },
    { id: 'safety', name: 'Safety & Security', count: 14 },
    { id: 'admin', name: 'Administrative', count: 9 },
  ];

  // Now using dwsTemplates imported from shared-data module (110 templates)

  const filteredTemplates = selectedCategory === 'all'
    ? dwsTemplates
    : dwsTemplates.filter(t => t.category?.toLowerCase().includes(selectedCategory));

  // Pagination logic
  const totalPages = Math.ceil(filteredTemplates.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTemplates = filteredTemplates.slice(startIndex, endIndex);

  // Reset to page 1 when category changes
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const getPriorityColor = (priority?: string) => {
    const colors: { [key: string]: string } = {
      'High': 'text-red-600 bg-red-50',
      'Medium': 'text-orange-600 bg-orange-50',
      'Low': 'text-gray-600 bg-gray-50',
    };
    return colors[priority || ''] || 'text-gray-600 bg-gray-50';
  };

  const handleCreate = () => {
    navigate('/dws-templates/create');
  };

  const handleEdit = (template: TaskTemplate) => {
    navigate(`/dws-templates/edit/${template.id}`);
  };

  const handleCopy = (template: TaskTemplate) => {
    // For copy, navigate to create page with query params (future enhancement)
    navigate('/dws-templates/create');
  };

  const handleDelete = (template: TaskTemplate) => {
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
        <span className="text-gray-800 font-medium">DWS Task Templates</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-gray-800">DWS Templates</h1>
            <span className="bg-blue-500 text-white px-3 py-1 rounded text-sm font-medium">
              DWS
            </span>
          </div>
          <p className="text-gray-500">Manage 110 recurring daily tasks with manual references</p>
        </div>
        <div className="flex gap-3">
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
          <div className="text-3xl font-bold text-gray-800 mb-1">110</div>
          <div className="text-sm text-gray-500">Total Templates</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-3xl font-bold text-green-600 mb-1">108</div>
          <div className="text-sm text-gray-500">Active</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-3xl font-bold text-gray-600 mb-1">2</div>
          <div className="text-sm text-gray-500">Inactive</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-3xl font-bold text-pink-600 mb-1">52</div>
          <div className="text-sm text-gray-500">Avg Minutes</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-3xl font-bold text-blue-600 mb-1">110</div>
          <div className="text-sm text-gray-500">Manual Refs</div>
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
                onClick={() => handleCategoryChange(category.id)}
                className={`w-full text-left px-3 py-2 rounded-md flex items-center justify-between ${
                  selectedCategory === category.id
                    ? 'bg-pink-50 text-pink-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className="text-sm">{category.name}</span>
                <span className={`text-xs px-2 py-1 rounded ${
                  selectedCategory === category.id ? 'bg-pink-100' : 'bg-gray-100'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-blue-800">Manual Reference</span>
            </div>
            <p className="text-sm text-blue-700">
              All DWS tasks link to detailed manual guides for staff reference during task execution.
            </p>
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
                  placeholder="Search by code, title, or manual reference..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <select className="px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500">
                <option>All Priorities</option>
                <option>High Priority</option>
                <option>Medium Priority</option>
                <option>Low Priority</option>
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
            {paginatedTemplates.map((template) => (
              <div key={template.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="bg-blue-500 p-3 rounded-lg text-white font-bold text-sm">
                      DWS
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded">
                          {template.code}
                        </span>
                        <span className={`text-xs font-medium px-2 py-1 rounded ${getPriorityColor(template.priority)}`}>
                          {template.priority || 'Medium'}
                        </span>
                        <span className="text-xs text-gray-500 capitalize">{template.recurrence}</span>
                      </div>
                      <h3 className="font-semibold text-gray-800 mb-2">{template.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                      
                      {/* Manual Reference Section */}
                      <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg border border-blue-200 mb-3">
                        <BookOpen className="w-5 h-5 text-blue-600" />
                        <div className="flex-1">
                          <div className="text-xs text-blue-600 font-medium mb-1">Manual Reference</div>
                          <div className="text-sm font-semibold text-blue-800">Guide {template.manualGuide}</div>
                        </div>
                        <a
                          href={template.manualLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                        >
                          Open Guide
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>

                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-800">{template.estimatedMinutes} min</span>
                          <span>Estimated Time</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-800">{template.category}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-800">Order: #{template.order}</span>
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

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-6 bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                {/* Page Info */}
                <div className="text-sm text-gray-600">
                  Showing <span className="font-medium text-gray-800">{startIndex + 1}</span> to{' '}
                  <span className="font-medium text-gray-800">{Math.min(endIndex, filteredTemplates.length)}</span> of{' '}
                  <span className="font-medium text-gray-800">{filteredTemplates.length}</span> templates
                </div>

                {/* Pagination Buttons */}
                <div className="flex items-center gap-2">
                  {/* Previous Button */}
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Previous
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                      // Show first page, last page, current page, and pages around current
                      const showPage =
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1);

                      const showEllipsis =
                        (page === 2 && currentPage > 3) ||
                        (page === totalPages - 1 && currentPage < totalPages - 2);

                      if (showEllipsis) {
                        return (
                          <span key={page} className="px-2 text-gray-400">
                            ...
                          </span>
                        );
                      }

                      if (!showPage) return null;

                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-10 h-10 rounded-md text-sm font-medium ${
                            currentPage === page
                              ? 'bg-pink-600 text-white'
                              : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
