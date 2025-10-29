import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronRight, Save, X, Upload, Image as ImageIcon, Trash2 } from 'lucide-react';

interface WSTemplate {
  id?: number;
  code: string;
  title: string;
  category: string;
  estimatedMinutes: number;
  description: string;
  isActive: boolean;
  dueDate: string;
  requiresPhotoUpload: boolean;
  requiresHQApproval: boolean;
  aiAutoApproval: boolean;
  samplePhotos: string[]; // Array of photo URLs
}

export default function WSTemplateForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [formData, setFormData] = useState<WSTemplate>({
    code: '',
    title: '',
    category: 'Seasonal Events',
    estimatedMinutes: 120,
    description: '',
    isActive: true,
    dueDate: '',
    requiresPhotoUpload: true,
    requiresHQApproval: false,
    aiAutoApproval: true,
    samplePhotos: [],
  });

  const [isDirty, setIsDirty] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  useEffect(() => {
    if (isEditMode) {
      // Mock data - in real app, fetch from API
      setFormData({
        id: 1,
        code: 'WS-001',
        title: 'Holiday Decoration Setup - Christmas',
        category: 'Seasonal Events',
        estimatedMinutes: 240,
        description: 'Set up Christmas decorations including main entrance display, tree, ornaments, and lighting according to seasonal guidelines.',
        isActive: false,
        dueDate: '2024-12-15',
        requiresPhotoUpload: true,
        requiresHQApproval: true,
        aiAutoApproval: false,
        samplePhotos: ['https://example.com/photo1.jpg', 'https://example.com/photo2.jpg', 'https://example.com/photo3.jpg'],
      });
    }
  }, [isEditMode, id]);

  const handleChange = (field: keyof WSTemplate, value: any) => {
    setFormData({ ...formData, [field]: value });
    setIsDirty(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    const totalFiles = uploadedFiles.length + newFiles.length;

    if (totalFiles > 10) {
      alert('Maximum 10 sample photos allowed');
      return;
    }

    setUploadedFiles([...uploadedFiles, ...newFiles]);
    setIsDirty(true);
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);
    setIsDirty(true);
  };

  const handleRemoveSamplePhoto = (index: number) => {
    const newPhotos = formData.samplePhotos.filter((_, i) => i !== index);
    setFormData({ ...formData, samplePhotos: newPhotos });
    setIsDirty(true);
  };

  const handleSave = () => {
    console.log('Saving template:', formData);
    alert(`Template "${formData.title}" ${isEditMode ? 'updated' : 'created'} successfully!`);
    navigate('/ws-templates');
  };

  const handleCancel = () => {
    if (isDirty) {
      if (confirm('You have unsaved changes. Are you sure you want to leave?')) {
        navigate('/ws-templates');
      }
    } else {
      navigate('/ws-templates');
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
              onClick={() => navigate('/ws-templates')}
              className="text-gray-500 hover:text-gray-700"
            >
              Task Management
            </button>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <button
              onClick={() => navigate('/ws-templates')}
              className="text-gray-500 hover:text-gray-700"
            >
              WS Templates
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
                {isEditMode ? 'Edit WS Template' : 'Create WS Template'}
              </h1>
              <p className="text-gray-500">
                {isEditMode
                  ? 'Update template information and settings'
                  : 'Create a new event-based work standard task template'}
              </p>
            </div>
            <span className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-medium">
              WS
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
                        placeholder="e.g., WS-001"
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
                        <option>Seasonal Events</option>
                        <option>Promotions</option>
                        <option>Safety & Compliance</option>
                        <option>Compliance</option>
                        <option>Special Projects</option>
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
                      placeholder="e.g., Holiday Decoration Setup - Christmas"
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

              {/* Schedule */}
              <div style={{ marginBottom: '64px' }}>
                <h2 className="text-lg font-semibold text-gray-800 mb-12 pb-6 border-b border-gray-200">
                  Schedule
                </h2>
                <div className="mt-10">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Due Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) => handleChange('dueDate', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Task Settings */}
              <div style={{ marginBottom: '64px' }}>
                <h2 className="text-lg font-semibold text-gray-800 mb-12 pb-6 border-b border-gray-200">
                  Task Settings
                </h2>
                <div className="mt-10">
                  <div style={{ maxWidth: '400px' }}>
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
                </div>
              </div>

              {/* Sample Photos Upload */}
              <div style={{ marginBottom: '64px' }}>
                <h2 className="text-lg font-semibold text-gray-800 mb-12 pb-6 border-b border-gray-200">
                  Sample Photos (Maximum 10)
                </h2>
                <div className="mt-10">
                  <p className="text-sm text-gray-600 mb-6">
                    Upload reference photos that show how the task should be completed. Staff will compare their work against these samples.
                  </p>

                  {/* Upload Button */}
                  <div className="mb-8">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileUpload}
                      style={{ display: 'none' }}
                      disabled={uploadedFiles.length + formData.samplePhotos.length >= 10}
                      id="photo-upload"
                    />
                    <label
                      htmlFor="photo-upload"
                      className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      <Upload className="w-5 h-5" />
                      <span>Upload Photos</span>
                    </label>
                    <p className="text-xs text-gray-500 mt-2">
                      {uploadedFiles.length + formData.samplePhotos.length} / 10 photos uploaded
                    </p>
                  </div>

                  {/* Existing Sample Photos (Edit Mode) */}
                  {formData.samplePhotos.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-gray-700 mb-3">Existing Photos</h3>
                      <div className="grid grid-cols-5 gap-4">
                        {formData.samplePhotos.map((photo, index) => (
                          <div key={index} className="relative group">
                            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-300">
                              <img
                                src={photo}
                                alt={`Sample ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <button
                              onClick={() => handleRemoveSamplePhoto(index)}
                              className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                              title="Remove photo"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Newly Uploaded Photos */}
                  {uploadedFiles.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-3">New Photos</h3>
                      <div className="grid grid-cols-5 gap-4">
                        {uploadedFiles.map((file, index) => (
                          <div key={index} className="relative group">
                            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-300 flex items-center justify-center">
                              <ImageIcon className="w-8 h-8 text-gray-400" />
                              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xs p-2 text-center">
                                {file.name}
                              </div>
                            </div>
                            <button
                              onClick={() => handleRemoveFile(index)}
                              className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                              title="Remove photo"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Empty State */}
                  {uploadedFiles.length === 0 && formData.samplePhotos.length === 0 && (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                      <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No photos uploaded yet</p>
                      <p className="text-sm text-gray-400 mt-1">Click "Upload Photos" to add sample images</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Photo Verification Settings */}
              <div style={{ marginBottom: '64px' }}>
                <h2 className="text-lg font-semibold text-gray-800 mb-12 pb-6 border-b border-gray-200">
                  Photo Verification Settings
                </h2>
                <div className="space-y-8 mt-10">
                  <div>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.requiresPhotoUpload}
                        onChange={(e) => handleChange('requiresPhotoUpload', e.target.checked)}
                        className="w-5 h-5 text-pink-600 focus:ring-pink-500 rounded"
                      />
                      <div>
                        <span className="text-sm font-medium text-gray-700">Requires Photo Upload</span>
                        <p className="text-xs text-gray-500 mt-1">Staff must upload photos when completing this task</p>
                      </div>
                    </label>
                  </div>

                  <div>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.aiAutoApproval}
                        onChange={(e) => handleChange('aiAutoApproval', e.target.checked)}
                        className="w-5 h-5 text-pink-600 focus:ring-pink-500 rounded"
                      />
                      <div>
                        <span className="text-sm font-medium text-gray-700">AI Auto-Approval</span>
                        <p className="text-xs text-gray-500 mt-1">AI will automatically verify uploaded photos against samples</p>
                      </div>
                    </label>
                  </div>

                  <div>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.requiresHQApproval}
                        onChange={(e) => handleChange('requiresHQApproval', e.target.checked)}
                        className="w-5 h-5 text-pink-600 focus:ring-pink-500 rounded"
                      />
                      <div>
                        <span className="text-sm font-medium text-gray-700">Requires HQ Manual Approval</span>
                        <p className="text-xs text-gray-500 mt-1">HQ must manually review and approve task completion</p>
                      </div>
                    </label>
                  </div>
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
