import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronRight, Save, X } from 'lucide-react';

interface DWSTemplate {
  id?: number;
  code: string;
  title: string;
  category: string;
  estimatedMinutes: number;
  description: string;
  manualGuide: string;
  manualLink: string;
  isActive: boolean;
  recurrence: string;
  customRecurrence?: string;
  timeOfDay: string;
  priority: string;
  order: number;
}

export default function DWSTemplateForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [formData, setFormData] = useState<DWSTemplate>({
    code: '',
    title: '',
    category: 'POS Operations',
    estimatedMinutes: 30,
    description: '',
    manualGuide: '',
    manualLink: '',
    isActive: true,
    recurrence: 'daily',
    customRecurrence: '',
    timeOfDay: 'Morning',
    priority: 'Medium',
    order: 1,
  });

  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      // Mock data - in real app, fetch from API
      setFormData({
        id: 1,
        code: '1.1.1',
        title: 'Morning Register Setup',
        category: 'POS Operations',
        estimatedMinutes: 30,
        description: 'Set up cash registers and prepare POS systems for daily operations. Check cash float, printer paper, and system connectivity.',
        manualGuide: '1.1.1',
        manualLink: 'https://manual.aeon.vn/pos/1.1.1',
        isActive: true,
        recurrence: 'daily',
        timeOfDay: 'Morning',
        priority: 'High',
        order: 1,
      });
    }
  }, [isEditMode, id]);

  const handleChange = (field: keyof DWSTemplate, value: any) => {
    setFormData({ ...formData, [field]: value });
    setIsDirty(true);
  };

  const handleSave = () => {
    console.log('Saving template:', formData);
    alert(`Template "${formData.title}" ${isEditMode ? 'updated' : 'created'} successfully!`);
    navigate('/dws-templates');
  };

  const handleCancel = () => {
    if (isDirty) {
      if (confirm('You have unsaved changes. Are you sure you want to leave?')) {
        navigate('/dws-templates');
      }
    } else {
      navigate('/dws-templates');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 lg:px-8 xl:px-12 py-7">
          <div className="max-w-6xl mx-auto pl-6 lg:pl-8 xl:pl-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-3 text-sm mb-6">
            <button
              onClick={() => navigate('/dws-templates')}
              className="text-gray-500 hover:text-gray-700"
            >
              Task Management
            </button>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <button
              onClick={() => navigate('/dws-templates')}
              className="text-gray-500 hover:text-gray-700"
            >
              DWS Templates
            </button>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-800 font-medium">
              {isEditMode ? 'Edit Template' : 'Create Template'}
            </span>
          </div>

          {/* Page Title */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                {isEditMode ? 'Edit DWS Template' : 'Create DWS Template'}
              </h1>
              <p className="text-gray-500">
                {isEditMode
                  ? 'Update template information and settings'
                  : 'Create a new recurring daily work standard task template'}
              </p>
            </div>
            <span className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium">
              DWS
            </span>
          </div>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 xl:px-12 pt-6 pb-8">
        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="p-6 md:p-8 lg:p-10">
            <div>
              {/* Basic Information */}
              <div style={{ marginBottom: '64px' }}>
                <h2 className="text-lg font-semibold text-gray-800 mb-12 pb-6 border-b border-gray-200">
                  Basic Information
                </h2>
                <div className="space-y-20 mt-10">
                  <div className="flex" style={{ gap: '48px' }}>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Task Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.code}
                        onChange={(e) => handleChange('code', e.target.value)}
                        placeholder="e.g., 1.1.1"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => handleChange('category', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      >
                        <option>POS Operations</option>
                        <option>Inventory Management</option>
                        <option>Customer Service</option>
                        <option>Cleaning & Maintenance</option>
                        <option>Merchandising</option>
                        <option>Safety & Security</option>
                        <option>Administrative</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-8">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Task Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleChange('title', e.target.value)}
                      placeholder="e.g., Morning Register Setup"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>

                  <div className="mt-8">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleChange('description', e.target.value)}
                      placeholder="Detailed description of the task..."
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Manual Reference */}
              <div style={{ marginBottom: '64px' }}>
                <h2 className="text-lg font-semibold text-gray-800 mb-12 pb-6 border-b border-gray-200">
                  Manual Reference
                </h2>
                <div className="mt-10">
                  <div className="flex" style={{ gap: '48px' }}>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Manual Guide Reference <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.manualGuide}
                        onChange={(e) => handleChange('manualGuide', e.target.value)}
                        placeholder="e.g., 1.1.1"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Manual Link URL
                      </label>
                      <input
                        type="url"
                        value={formData.manualLink}
                        onChange={(e) => handleChange('manualLink', e.target.value)}
                        placeholder="https://manual.aeon.vn/..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Task Settings */}
              <div style={{ marginBottom: '64px' }}>
                <h2 className="text-lg font-semibold text-gray-800 mb-12 pb-6 border-b border-gray-200">
                  Task Settings
                </h2>
                <div className="mt-10">
                  <div className="flex" style={{ gap: '40px' }}>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Estimated Time (minutes) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        value={formData.estimatedMinutes}
                        onChange={(e) => handleChange('estimatedMinutes', parseInt(e.target.value) || 0)}
                        min="1"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Priority <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.priority}
                        onChange={(e) => handleChange('priority', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      >
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Display Order <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        value={formData.order}
                        onChange={(e) => handleChange('order', parseInt(e.target.value) || 1)}
                        min="1"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Recurrence Schedule */}
              <div style={{ marginBottom: '64px' }}>
                <h2 className="text-lg font-semibold text-gray-800 mb-12 pb-6 border-b border-gray-200">
                  Recurrence Schedule
                </h2>
                <div className="space-y-6 mt-10">
                  <div className="flex" style={{ gap: '48px' }}>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Recurrence Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.recurrence}
                        onChange={(e) => handleChange('recurrence', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      >
                        <option value="daily">Every Day</option>
                        <option value="weekly">Every Week (Specific Days)</option>
                        <option value="custom">Custom Schedule</option>
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Time of Day <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.timeOfDay}
                        onChange={(e) => handleChange('timeOfDay', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      >
                        <option>Morning</option>
                        <option>Afternoon</option>
                        <option>Evening</option>
                        <option>All Day</option>
                      </select>
                    </div>
                  </div>

                  {(formData.recurrence === 'weekly' || formData.recurrence === 'custom') && (
                    <div className="mt-8">
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        {formData.recurrence === 'weekly' ? 'Specific Days' : 'Custom Schedule'} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.customRecurrence || ''}
                        onChange={(e) => handleChange('customRecurrence', e.target.value)}
                        placeholder={formData.recurrence === 'weekly' ? 'e.g., Monday, Wednesday, Friday' : 'e.g., Every 2 hours during store hours'}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-12 mt-8">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 border border-gray-200 rounded-md hover:bg-gray-50 flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {isEditMode ? 'Update Template' : 'Create Template'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
