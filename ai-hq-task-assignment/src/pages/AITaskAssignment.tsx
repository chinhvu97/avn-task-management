import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Check, Maximize2, BarChart3, Clock, Smile, Target, BookOpen, MessageCircle, Video } from 'lucide-react';
import { mockStaff } from '../data/mockData';
import { useRole, getCurrentStore } from '../contexts/RoleContext';
import { getStaffByBuilding, dwsTemplates, wsTemplates } from 'shared-data';

export default function AITaskAssignment() {
  const navigate = useNavigate();
  const { profile } = useRole();
  const currentStore = getCurrentStore(profile);

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('Monday, October 27, 2025');
  const [selectedScenario, setSelectedScenario] = useState('balanced');
  const [viewMode, setViewMode] = useState<'gantt' | 'list'>('gantt');

  // Filter staff to only show staff from the current store
  const storeStaff = currentStore
    ? getStaffByBuilding(currentStore.name).map(s => {
        // Find matching staff in mockStaff to get avatar
        const staffWithAvatar = mockStaff.find(ms => ms.id === s.id);
        return staffWithAvatar || { ...s, avatar: '' };
      })
    : mockStaff;

  const scenarios = [
    {
      id: 'balanced',
      name: 'Balanced',
      description: 'Optimal balance between efficiency and staff satisfaction',
      icon: '⚖️',
      iconColor: 'bg-pink-600',
      metrics: {
        workload: 85,
        timeEst: '7.5h',
        satisfaction: 92,
        success: 88
      },
      tags: ['Even distribution', 'Skill matching', 'Break optimization']
    },
    {
      id: 'speed',
      name: 'Speed',
      description: 'Prioritizes task completion speed and urgency',
      icon: '⚡',
      iconColor: 'bg-slate-100',
      iconTextColor: 'text-yellow-600',
      metrics: {
        workload: 95,
        timeEst: '6.2h',
        satisfaction: 78,
        success: 82
      },
      tags: ['Fast completion', 'Priority tasks', 'Minimal breaks']
    },
    {
      id: 'efficiency',
      name: 'Efficiency',
      description: 'Maximizes resource utilization and cost effectiveness',
      icon: '📊',
      iconColor: 'bg-slate-100',
      iconTextColor: 'text-green-600',
      metrics: {
        workload: 88,
        timeEst: '7.8h',
        satisfaction: 85,
        success: 90
      },
      tags: ['Resource optimization', 'Cost effective', 'Skill utilization']
    },
    {
      id: 'custom',
      name: 'Custom',
      description: 'Tailored scenario based on your specific requirements',
      icon: '🎨',
      iconColor: 'bg-slate-100',
      iconTextColor: 'text-purple-600',
      metrics: {
        workload: 82,
        timeEst: '8.0h',
        satisfaction: 95,
        success: 85
      },
      tags: ['Custom rules', 'Flexible timing', 'Personal preferences']
    }
  ];

  // Generate staff schedule using templates from HQ - varies by scenario
  const staffSchedule = storeStaff.map((staff, index) => {
    // Distribute DWS and WS tasks across staff based on their skills, roles, and selected scenario
    const staffTasks = [];

    // Scenario-specific task distribution
    const scenarioAdjustment = {
      balanced: { startOffset: 0, durationMultiplier: 1, taskCount: 'normal' },
      speed: { startOffset: 0.5, durationMultiplier: 0.8, taskCount: 'more' }, // Faster, tighter schedule
      efficiency: { startOffset: 0, durationMultiplier: 1.2, taskCount: 'optimal' }, // Longer, spaced out
      custom: { startOffset: 0.25, durationMultiplier: 1.1, taskCount: 'flexible' },
    }[selectedScenario] || { startOffset: 0, durationMultiplier: 1, taskCount: 'normal' };

    // Assign tasks based on role and scenario
    if (staff.role === 'Store Manager' || staff.role === 'Floor Manager') {
      // Managers get management and supervisory tasks
      if (selectedScenario === 'speed') {
        // Speed: More tasks, shorter duration
        staffTasks.push(
          { name: dwsTemplates[0].title, start: 0 + scenarioAdjustment.startOffset, duration: 0.75 * scenarioAdjustment.durationMultiplier, type: 'DWS', templateId: dwsTemplates[0].id },
          { name: dwsTemplates[16].title, start: 1 + scenarioAdjustment.startOffset, duration: 1 * scenarioAdjustment.durationMultiplier, type: 'DWS', templateId: dwsTemplates[16].id },
          { name: dwsTemplates[4].title, start: 2.5 + scenarioAdjustment.startOffset, duration: 1.25 * scenarioAdjustment.durationMultiplier, type: 'DWS', templateId: dwsTemplates[4].id },
          { name: wsTemplates[3]?.title, start: 4.5 + scenarioAdjustment.startOffset, duration: 1.5 * scenarioAdjustment.durationMultiplier, type: 'WS', templateId: wsTemplates[3]?.id }
        );
      } else if (selectedScenario === 'efficiency') {
        // Efficiency: Optimal spacing, longer breaks
        staffTasks.push(
          { name: dwsTemplates[0].title, start: 0 + scenarioAdjustment.startOffset, duration: 1 * scenarioAdjustment.durationMultiplier, type: 'DWS', templateId: dwsTemplates[0].id },
          { name: dwsTemplates[4].title, start: 2 + scenarioAdjustment.startOffset, duration: 1.5 * scenarioAdjustment.durationMultiplier, type: 'DWS', templateId: dwsTemplates[4].id },
          { name: wsTemplates[3]?.title, start: 5.5 + scenarioAdjustment.startOffset, duration: 2.5 * scenarioAdjustment.durationMultiplier, type: 'WS', templateId: wsTemplates[3]?.id }
        );
      } else if (selectedScenario === 'custom') {
        // Custom: Flexible timing
        staffTasks.push(
          { name: dwsTemplates[0].title, start: 0 + scenarioAdjustment.startOffset, duration: 1.25 * scenarioAdjustment.durationMultiplier, type: 'DWS', templateId: dwsTemplates[0].id },
          { name: dwsTemplates[16].title, start: 2 + scenarioAdjustment.startOffset, duration: 0.75 * scenarioAdjustment.durationMultiplier, type: 'DWS', templateId: dwsTemplates[16].id },
          { name: dwsTemplates[4].title, start: 3.5 + scenarioAdjustment.startOffset, duration: 1.5 * scenarioAdjustment.durationMultiplier, type: 'DWS', templateId: dwsTemplates[4].id },
          { name: wsTemplates[1]?.title, start: 6 + scenarioAdjustment.startOffset, duration: 2 * scenarioAdjustment.durationMultiplier, type: 'WS', templateId: wsTemplates[1]?.id }
        );
      } else {
        // Balanced (default)
        staffTasks.push(
          { name: dwsTemplates[0].title, start: 0 + scenarioAdjustment.startOffset, duration: 1 * scenarioAdjustment.durationMultiplier, type: 'DWS', templateId: dwsTemplates[0].id },
          { name: dwsTemplates[4].title, start: 2 + scenarioAdjustment.startOffset, duration: 1.5 * scenarioAdjustment.durationMultiplier, type: 'DWS', templateId: dwsTemplates[4].id },
          { name: wsTemplates[3]?.title, start: 5 + scenarioAdjustment.startOffset, duration: 2 * scenarioAdjustment.durationMultiplier, type: 'WS', templateId: wsTemplates[3]?.id }
        );
      }
    } else if (staff.role === 'Sales Associate') {
      // Sales Associates get customer service and merchandising
      if (selectedScenario === 'speed') {
        staffTasks.push(
          { name: dwsTemplates[7].title, start: 0.5 + scenarioAdjustment.startOffset, duration: 1.5 * scenarioAdjustment.durationMultiplier, type: 'DWS', templateId: dwsTemplates[7].id },
          { name: dwsTemplates[8].title, start: 2.5 + scenarioAdjustment.startOffset, duration: 1 * scenarioAdjustment.durationMultiplier, type: 'DWS', templateId: dwsTemplates[8].id },
          { name: dwsTemplates[13].title, start: 4 + scenarioAdjustment.startOffset, duration: 1.5 * scenarioAdjustment.durationMultiplier, type: 'DWS', templateId: dwsTemplates[13].id },
          { name: wsTemplates[1]?.title, start: 6.5 + scenarioAdjustment.startOffset, duration: 2 * scenarioAdjustment.durationMultiplier, type: 'WS', templateId: wsTemplates[1]?.id }
        );
      } else if (selectedScenario === 'efficiency') {
        staffTasks.push(
          { name: dwsTemplates[7].title, start: 1 + scenarioAdjustment.startOffset, duration: 2.25 * scenarioAdjustment.durationMultiplier, type: 'DWS', templateId: dwsTemplates[7].id },
          { name: dwsTemplates[13].title, start: 4.5 + scenarioAdjustment.startOffset, duration: 2.25 * scenarioAdjustment.durationMultiplier, type: 'DWS', templateId: dwsTemplates[13].id }
        );
      } else {
        staffTasks.push(
          { name: dwsTemplates[7].title, start: 1 + scenarioAdjustment.startOffset, duration: 2 * scenarioAdjustment.durationMultiplier, type: 'DWS', templateId: dwsTemplates[7].id },
          { name: dwsTemplates[13].title, start: 4 + scenarioAdjustment.startOffset, duration: 2 * scenarioAdjustment.durationMultiplier, type: 'DWS', templateId: dwsTemplates[13].id },
          { name: wsTemplates[1]?.title, start: 7 + scenarioAdjustment.startOffset, duration: 2.5 * scenarioAdjustment.durationMultiplier, type: 'WS', templateId: wsTemplates[1]?.id }
        );
      }
    } else if (staff.role === 'Cashier') {
      // Cashiers get POS tasks
      if (selectedScenario === 'speed') {
        staffTasks.push(
          { name: dwsTemplates[1].title, start: 0 + scenarioAdjustment.startOffset, duration: 0.75 * scenarioAdjustment.durationMultiplier, type: 'DWS', templateId: dwsTemplates[1].id },
          { name: dwsTemplates[2].title, start: 1 + scenarioAdjustment.startOffset, duration: 0.75 * scenarioAdjustment.durationMultiplier, type: 'DWS', templateId: dwsTemplates[2].id },
          { name: dwsTemplates[3].title, start: 2 + scenarioAdjustment.startOffset, duration: 0.75 * scenarioAdjustment.durationMultiplier, type: 'DWS', templateId: dwsTemplates[3].id },
          { name: dwsTemplates[19].title, start: 3 + scenarioAdjustment.startOffset, duration: 0.5 * scenarioAdjustment.durationMultiplier, type: 'DWS', templateId: dwsTemplates[19].id }
        );
      } else if (selectedScenario === 'efficiency') {
        staffTasks.push(
          { name: dwsTemplates[1].title, start: 0 + scenarioAdjustment.startOffset, duration: 1.25 * scenarioAdjustment.durationMultiplier, type: 'DWS', templateId: dwsTemplates[1].id },
          { name: dwsTemplates[2].title, start: 2 + scenarioAdjustment.startOffset, duration: 1.25 * scenarioAdjustment.durationMultiplier, type: 'DWS', templateId: dwsTemplates[2].id },
          { name: dwsTemplates[3].title, start: 4 + scenarioAdjustment.startOffset, duration: 1.25 * scenarioAdjustment.durationMultiplier, type: 'DWS', templateId: dwsTemplates[3].id }
        );
      } else {
        staffTasks.push(
          { name: dwsTemplates[1].title, start: 0 + scenarioAdjustment.startOffset, duration: 1 * scenarioAdjustment.durationMultiplier, type: 'DWS', templateId: dwsTemplates[1].id },
          { name: dwsTemplates[2].title, start: 1.5 + scenarioAdjustment.startOffset, duration: 1 * scenarioAdjustment.durationMultiplier, type: 'DWS', templateId: dwsTemplates[2].id },
          { name: dwsTemplates[3].title, start: 3 + scenarioAdjustment.startOffset, duration: 1 * scenarioAdjustment.durationMultiplier, type: 'DWS', templateId: dwsTemplates[3].id }
        );
      }
    } else if (staff.role === 'Stock Clerk') {
      // Stock Clerks get inventory tasks
      if (selectedScenario === 'speed') {
        staffTasks.push(
          { name: dwsTemplates[5].title, start: 0.5 + scenarioAdjustment.startOffset, duration: 0.75 * scenarioAdjustment.durationMultiplier, type: 'DWS', templateId: dwsTemplates[5].id },
          { name: dwsTemplates[31].title, start: 1.5 + scenarioAdjustment.startOffset, duration: 0.75 * scenarioAdjustment.durationMultiplier, type: 'DWS', templateId: dwsTemplates[31].id },
          { name: dwsTemplates[6].title, start: 2.75 + scenarioAdjustment.startOffset, duration: 1.25 * scenarioAdjustment.durationMultiplier, type: 'DWS', templateId: dwsTemplates[6].id }
        );
      } else if (selectedScenario === 'efficiency') {
        staffTasks.push(
          { name: dwsTemplates[5].title, start: 0.5 + scenarioAdjustment.startOffset, duration: 1.5 * scenarioAdjustment.durationMultiplier, type: 'DWS', templateId: dwsTemplates[5].id },
          { name: dwsTemplates[6].title, start: 3 + scenarioAdjustment.startOffset, duration: 1.75 * scenarioAdjustment.durationMultiplier, type: 'DWS', templateId: dwsTemplates[6].id }
        );
      } else {
        staffTasks.push(
          { name: dwsTemplates[5].title, start: 0.5 + scenarioAdjustment.startOffset, duration: 1 * scenarioAdjustment.durationMultiplier, type: 'DWS', templateId: dwsTemplates[5].id },
          { name: dwsTemplates[6].title, start: 2 + scenarioAdjustment.startOffset, duration: 1.5 * scenarioAdjustment.durationMultiplier, type: 'DWS', templateId: dwsTemplates[6].id }
        );
      }
    }

    return {
      id: staff.id,
      name: staff.name,
      role: staff.role,
      image: staff.avatar,
      tasks: staffTasks
    };
  });

  const timeSlots = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

  const selectedScenarioData = scenarios.find(s => s.id === selectedScenario);

  // Count tasks from templates
  const totalDWSTasks = dwsTemplates.filter(t => t.isActive).length;
  const totalWSTasks = wsTemplates.filter(t => t.isActive).length;
  const totalAssignedTasks = staffSchedule.reduce((sum, staff) => sum + staff.tasks.length, 0);

  // Handle confirm assignment
  const handleConfirmAssignment = () => {
    alert(`✅ Successfully assigned ${totalAssignedTasks} tasks to ${storeStaff.length} staff members at ${currentStore?.name || 'the store'} for ${selectedDate}!\n\nTasks will now appear in Task Monitoring.`);
    navigate('/task-monitoring');
  };

  // Preset date options
  const datePresets = [
    { label: 'Today', value: 'Monday, October 27, 2025' },
    { label: 'Tomorrow', value: 'Tuesday, October 28, 2025' },
    { label: 'Next Monday', value: 'Monday, November 3, 2025' },
    { label: 'Next Friday', value: 'Friday, November 7, 2025' },
  ];

  // STEP 1: Date Selection
  if (currentStep === 1) {
    return (
      <div className="p-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-6">
          <span className="text-gray-500">Task Management</span>
          <ChevronRight className="w-4 h-4 text-gray-500" />
          <span className="text-gray-800 font-medium">AI Task Assignment</span>
        </div>

        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">AI Task Assignment</h1>
          <p className="text-gray-500">Intelligent task distribution with automated scenario generation</p>
        </div>

        {/* Progress Steps */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center shadow-lg">
                <Check className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-medium text-gray-800">Step 1</div>
                <div className="text-xs text-gray-800">Date Selection</div>
              </div>
            </div>

            <div className="flex-1 h-0.5 bg-gray-200 mx-4"></div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-gray-500" />
              </div>
              <div>
                <div className="font-medium text-gray-500">Step 2</div>
                <div className="text-xs text-gray-500">Scenario Generation</div>
              </div>
            </div>

            <div className="flex-1 h-0.5 bg-gray-200 mx-4"></div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                <Check className="w-5 h-5 text-gray-500" />
              </div>
              <div>
                <div className="font-medium text-gray-500">Step 3</div>
                <div className="text-xs text-gray-500">Confirmation</div>
              </div>
            </div>
          </div>
        </div>

        {/* Date Selection */}
        <div className="flex justify-center mb-6">
          <div className="bg-white border border-gray-200 rounded-lg" style={{ width: '700px', maxWidth: '90%', padding: '3rem' }}>
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Select Assignment Date</h2>
              <p className="text-gray-500">Choose the date for AI-powered task assignment</p>
            </div>

            {/* Current Selection */}
            <div className="bg-pink-50 border-2 border-pink-600 rounded-lg p-8 mb-6 text-center">
              <div className="text-sm text-pink-600 font-medium mb-2">Selected Date</div>
              <div className="text-2xl font-bold text-gray-800">{selectedDate}</div>
            </div>

            {/* Quick Presets */}
            <div className="mb-6">
              <label className="text-sm font-medium text-gray-700 mb-3 block">Quick Select</label>
              <div className="grid grid-cols-2 gap-3">
                {datePresets.map((preset) => (
                  <button
                    key={preset.value}
                    onClick={() => setSelectedDate(preset.value)}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      selectedDate === preset.value
                        ? 'border-pink-600 bg-pink-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium text-gray-800">{preset.label}</div>
                    <div className="text-sm text-gray-500 mt-1">{preset.value}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Date Input */}
            <div className="mb-6">
              <label className="text-sm font-medium text-gray-700 mb-3 block">Or Enter Custom Date</label>
              <input
                type="text"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-pink-600"
                placeholder="e.g., Monday, October 27, 2025"
              />
            </div>

            {/* Store Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="text-sm text-blue-900">
                  <span className="font-medium">{currentStore?.name || 'Store'}</span> - {storeStaff.length} Staff Members Available
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => navigate('/task-management')}
                className="px-6 py-3 border border-gray-200 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => setCurrentStep(2)}
                className="px-6 py-3 bg-pink-600 text-white rounded-md hover:bg-pink-700 flex items-center gap-2 shadow-lg"
              >
                Generate Scenarios
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // STEP 3: Confirmation
  if (currentStep === 3) {
    return (
      <div className="p-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-6">
          <span className="text-gray-500">Task Management</span>
          <ChevronRight className="w-4 h-4 text-gray-500" />
          <span className="text-gray-800 font-medium">AI Task Assignment</span>
        </div>

        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">AI Task Assignment</h1>
          <p className="text-gray-500">Intelligent task distribution with automated scenario generation</p>
        </div>

        {/* Progress Steps */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                <Check className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-medium text-gray-800">Step 1</div>
                <div className="text-xs text-gray-800">Date Selection</div>
              </div>
            </div>

            <div className="flex-1 h-0.5 bg-emerald-500 mx-4"></div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-medium text-gray-800">Step 2</div>
                <div className="text-xs text-gray-800">Scenario Generation</div>
              </div>
            </div>

            <div className="flex-1 h-0.5 bg-emerald-500 mx-4"></div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center shadow-lg">
                <Check className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-medium text-gray-800">Step 3</div>
                <div className="text-xs text-gray-800">Confirmation</div>
              </div>
            </div>
          </div>
        </div>

        {/* Confirmation Header */}
        <div className="bg-white border border-gray-200 rounded-lg p-8 mb-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Review Assignment</h2>
            <p className="text-gray-500">Please review the details before confirming</p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Assignment Details</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-slate-100 p-6 rounded-lg">
                <div className="text-sm text-gray-500 mb-2">Assignment Date</div>
                <div className="text-lg font-semibold text-gray-800">{selectedDate}</div>
              </div>
              <div className="bg-slate-100 p-6 rounded-lg">
                <div className="text-sm text-gray-500 mb-2">Store Location</div>
                <div className="text-lg font-semibold text-gray-800">{currentStore?.name || 'Store'}</div>
              </div>
              <div className="bg-slate-100 p-6 rounded-lg">
                <div className="text-sm text-gray-500 mb-2">Selected Scenario</div>
                <div className="text-lg font-semibold text-gray-800">{selectedScenarioData?.name}</div>
              </div>
              <div className="bg-slate-100 p-6 rounded-lg">
                <div className="text-sm text-gray-500 mb-2">Total Tasks</div>
                <div className="text-lg font-semibold text-gray-800">{totalAssignedTasks} Tasks</div>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics Summary */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Predicted Metrics</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-900 mb-1">{selectedScenarioData?.metrics.workload}%</div>
                  <div className="text-xs text-blue-700">Workload</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-900 mb-1">{selectedScenarioData?.metrics.timeEst}</div>
                  <div className="text-xs text-blue-700">Duration</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-900 mb-1">{selectedScenarioData?.metrics.satisfaction}%</div>
                  <div className="text-xs text-blue-700">Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-900 mb-1">{selectedScenarioData?.metrics.success}%</div>
                  <div className="text-xs text-blue-700">Success</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Staff List */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Staff Assignment</h3>
            <div className="bg-slate-100 p-6 rounded-lg">
              <div className="text-sm font-medium text-gray-700 mb-3">{storeStaff.length} Staff Members Assigned</div>
              <div className="flex flex-wrap gap-2">
                {storeStaff.map((staff) => (
                  <div key={staff.id} className="bg-white px-3 py-2 rounded border border-gray-200 text-sm text-gray-700">
                    {staff.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-between">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-6 py-3 border border-gray-200 rounded-md hover:bg-gray-50 flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Back to Scenarios
              </button>
              <button
                onClick={handleConfirmAssignment}
                className="px-6 py-3 bg-pink-600 text-white rounded-md hover:bg-pink-700 flex items-center gap-2 shadow-lg"
              >
                <Check className="w-4 h-4" />
                Confirm Assignment
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // STEP 2: Scenario Generation (existing UI)
  return (
    <div className="p-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-6">
        <span className="text-gray-500">Task Management</span>
        <ChevronRight className="w-4 h-4 text-gray-500" />
        <span className="text-gray-800 font-medium">AI Task Assignment</span>
      </div>

      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">AI Task Assignment</h1>
        <p className="text-gray-500">Intelligent task distribution with automated scenario generation</p>
      </div>

      {/* Data Source Indicator */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-blue-900">Templates Loaded from HQ</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-blue-700">
            <span className="flex items-center gap-1">
              <span className="font-semibold">{totalDWSTasks}</span> DWS Templates
            </span>
            <span className="flex items-center gap-1">
              <span className="font-semibold">{totalWSTasks}</span> WS Templates
            </span>
            <span className="flex items-center gap-1">
              <span className="font-semibold">{totalAssignedTasks}</span> Tasks Ready to Assign
            </span>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
              <Check className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-medium text-gray-800">Step 1</div>
              <div className="text-xs text-gray-800">Date Selection</div>
            </div>
          </div>
          
          <div className="flex-1 h-0.5 bg-emerald-500 mx-4"></div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center shadow-lg">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-medium text-gray-800">Step 2</div>
              <div className="text-xs text-gray-800">Scenario Generation</div>
            </div>
          </div>
          
          <div className="flex-1 h-0.5 bg-gray-200 mx-4"></div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
              <Check className="w-5 h-5 text-gray-500" />
            </div>
            <div>
              <div className="font-medium text-gray-500">Step 3</div>
              <div className="text-xs text-gray-500">Confirmation</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scenarios */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-1">AI Generated Scenarios</h2>
            <p className="text-gray-500">Choose the best assignment strategy for Monday, October 27, 2025</p>
          </div>
          <button className="px-4 py-2 border border-gray-200 rounded-md hover:bg-gray-50 flex items-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <path d="M7.995 3.33125V13.9912M4.66375 13.9912H11.3262" stroke="currentColor" strokeWidth="1.3325" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Regenerate
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {scenarios.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => setSelectedScenario(scenario.id)}
              className={`text-left p-4 rounded-lg border-2 transition-all ${
                selectedScenario === scenario.id
                  ? 'border-pink-600 shadow-sm bg-white'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`${scenario.iconColor} ${scenario.iconTextColor || 'text-white'} w-8 h-8 rounded-lg flex items-center justify-center text-lg`}>
                    {scenario.icon}
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">{scenario.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{scenario.description}</div>
                  </div>
                </div>
                {selectedScenario === scenario.id && (
                  <ChevronRight className="w-5 h-5 text-pink-600" />
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                    <BarChart3 className="w-3 h-3" />
                    Workload
                  </div>
                  <div className="font-semibold text-gray-800">{scenario.metrics.workload}%</div>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                    <Clock className="w-3 h-3" />
                    Time Est.
                  </div>
                  <div className="font-semibold text-gray-800">{scenario.metrics.timeEst}</div>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                    <Smile className="w-3 h-3" />
                    Satisfaction
                  </div>
                  <div className="font-semibold text-gray-800">{scenario.metrics.satisfaction}%</div>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                    <Target className="w-3 h-3" />
                    Success
                  </div>
                  <div className="font-semibold text-gray-800">{scenario.metrics.success}%</div>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {scenario.tags.map((tag, idx) => (
                    <span key={idx} className="text-xs bg-slate-100 px-2 py-1 rounded text-gray-500">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Gantt Chart */}
      <div className="bg-white border border-gray-200 rounded-lg mb-6">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-5 h-5 text-pink-600" />
            <div>
              <h3 className="font-semibold text-gray-800">Task Assignment Visualization</h3>
              <p className="text-sm text-gray-500">{selectedScenarioData?.name} Scenario - Preview</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Task Type Legend */}
            <div className="flex items-center gap-3 text-sm border-r pr-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="text-gray-600">DWS</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                <span className="text-gray-600">WS</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-slate-100 p-1 rounded-lg flex">
                <button
                  onClick={() => setViewMode('gantt')}
                  className={`px-3 py-1.5 rounded text-sm flex items-center gap-2 ${
                    viewMode === 'gantt' ? 'bg-white shadow-sm' : ''
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  Gantt
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-1.5 rounded text-sm text-gray-500 flex items-center gap-2 ${
                    viewMode === 'list' ? 'bg-white shadow-sm' : ''
                  }`}
                >
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                    <path d="M5.33 7.995H13.9912M5.33 11.9925H13.9912M5.33 3.9975H13.9912" stroke="currentColor" strokeWidth="1.3325" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  List
                </button>
              </div>
              <button className="px-3 py-2 border border-gray-200 rounded-md hover:bg-gray-50 flex items-center gap-2 text-sm">
                <Maximize2 className="w-4 h-4" />
                Full Screen
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Time headers */}
            <div className="flex bg-slate-100 border-b border-gray-200">
              <div className="w-48 min-w-48 shrink-0 border-r px-4 py-3">
                <span className="text-sm font-medium text-gray-800">Staff</span>
              </div>
              {timeSlots.map((time, idx) => (
                <div key={idx} className="flex-1 p-3 text-center text-sm text-gray-600 border-l border-gray-200">
                  {time}
                </div>
              ))}
            </div>

            {/* Staff rows */}
            {staffSchedule.map((staff) => {
              // Find staff shift times from storeStaff
              const staffData = storeStaff.find(s => s.id === staff.id);
              const shiftTime = staffData ? `${staffData.shiftStart} - ${staffData.shiftEnd}` : '08:00 - 17:00';

              return (
                <div key={staff.id} className="flex border-b border-gray-200 hover:bg-gray-50">
                  <div className="w-48 min-w-48 max-w-48 shrink-0 border-r px-4 py-3 flex flex-col justify-center bg-white">
                    <div className="text-sm truncate">{staff.name}</div>
                    <div className="text-xs text-gray-500 truncate">{shiftTime}</div>
                  </div>
                <div className="flex-1 relative py-3 overflow-hidden" style={{ height: '100px' }}>
                  {/* Grid lines for hour blocks */}
                  <div className="absolute inset-0 flex pointer-events-none" style={{ zIndex: 1 }}>
                    {timeSlots.map((_, idx) => (
                      <div
                        key={idx}
                        className="flex-1 border-r border-gray-100"
                      />
                    ))}
                  </div>

                  {/* Tasks */}
                  {staff.tasks.map((task, idx) => {
                    // Calculate start and end time
                    const startHour = Math.floor(task.start + 8);
                    const startMinute = Math.round((task.start % 1) * 60);
                    const endHour = Math.floor(task.start + task.duration + 8);
                    const endMinute = Math.round(((task.start + task.duration) % 1) * 60);

                    const formatTime = (hour: number, minute: number) => {
                      return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
                    };

                    // Determine task type (fallback to 'DWS' if not specified)
                    const taskType = task.type || 'DWS';
                    const dotColor = taskType === 'DWS' ? 'bg-blue-500' : 'bg-orange-500';

                    return (
                      <div
                        key={idx}
                        className="absolute bg-gray-100 border-gray-300 text-gray-700 border-2 rounded-lg p-2 cursor-pointer hover:shadow-lg transition-all"
                        style={{
                          left: `${task.start * 10}%`,
                          width: `${task.duration * 10}%`,
                          top: '5px',
                          height: '90px',
                          zIndex: 10,
                        }}
                      >
                        <div className="flex items-start justify-between gap-1">
                          <span className="text-xs font-medium flex-1 line-clamp-2 overflow-hidden">{task.name}</span>
                          <div className={`w-3 h-3 rounded-full shrink-0 mt-0.5 ${dotColor} shadow-sm`}></div>
                        </div>
                        <div className="opacity-70" style={{ fontSize: '10px', lineHeight: '1.2' }}>
                          {formatTime(startHour, startMinute)} - {formatTime(endHour, endMinute)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Scorecard */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Target className="w-5 h-5 text-pink-600" />
          <h3 className="font-semibold text-gray-800">Assignment Scorecard</h3>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="bg-slate-100 p-4 rounded-lg">
            <div className="text-2xl font-bold text-gray-800 mb-1 text-center">
              {selectedScenarioData?.metrics.workload}%
            </div>
            <div className="text-sm text-gray-500 text-center mb-2">Staff Utilization</div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-pink-600 h-2 rounded-full"
                style={{ width: `${selectedScenarioData?.metrics.workload}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-slate-100 p-4 rounded-lg">
            <div className="text-2xl font-bold text-gray-800 mb-1 text-center">
              {selectedScenarioData?.metrics.timeEst}
            </div>
            <div className="text-sm text-gray-500 text-center mb-2">Estimated Duration</div>
            <div className="flex justify-center mt-1">
              <Clock className="w-5 h-5 text-gray-500" />
            </div>
          </div>

          <div className="bg-slate-100 p-4 rounded-lg">
            <div className="text-2xl font-bold text-gray-800 mb-1 text-center">
              {selectedScenarioData?.metrics.satisfaction}%
            </div>
            <div className="text-sm text-gray-500 text-center mb-2">Staff Satisfaction</div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${selectedScenarioData?.metrics.satisfaction}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-slate-100 p-4 rounded-lg">
            <div className="text-2xl font-bold text-gray-800 mb-1 text-center">
              {selectedScenarioData?.metrics.success}%
            </div>
            <div className="text-sm text-gray-500 text-center mb-2">Success Probability</div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${selectedScenarioData?.metrics.success}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setCurrentStep(1)}
          className="px-4 py-2 border border-gray-200 rounded-md hover:bg-gray-50 flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Date Selection
        </button>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-gray-200 rounded-md hover:bg-gray-50 flex items-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <path d="M12.6587 0.66625H1.99875C1.64535 0.66625 1.30642 0.806638 1.05653 1.05653C0.806638 1.30642 0.66625 1.64535 0.66625 1.99875V11.3262C0.66625 11.6797 0.806638 12.0186 1.05653 12.2685C1.30642 12.5184 1.64535 12.6587 1.99875 12.6587H11.3262C11.6797 12.6587 12.0186 12.5184 12.2685 12.2685C12.5184 12.0186 12.6587 11.6797 12.6587 11.3262V6.6625" stroke="currentColor" strokeWidth="1.3325" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Manual Edit
          </button>
          <button
            onClick={() => setCurrentStep(3)}
            className="px-6 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 flex items-center gap-2 shadow-lg"
          >
            Continue to Confirmation
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex gap-4">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-blue-600" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="8.33" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 15C10.92 15 11.67 14.25 11.67 13.33C11.67 12.41 10.92 11.67 10 11.67C9.08 11.67 8.33 12.41 8.33 13.33C8.33 14.25 9.08 15 10 15Z" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 10V6.67" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800 mb-2">Need Help with AI Task Assignment?</h3>
            <p className="text-gray-500 mb-4">
              Our AI system analyzes staff availability, skills, and workload to generate optimal task assignments. You can choose from different scenarios or manually adjust assignments as needed.
            </p>
            <div className="flex flex-wrap gap-2">
              <button className="px-3 py-2 border border-gray-200 rounded-md hover:bg-gray-50 flex items-center gap-2 text-sm">
                <BookOpen className="w-4 h-4" />
                View Guide
              </button>
              <button className="px-3 py-2 border border-gray-200 rounded-md hover:bg-gray-50 flex items-center gap-2 text-sm">
                <MessageCircle className="w-4 h-4" />
                Contact Support
              </button>
              <button className="px-3 py-2 border border-gray-200 rounded-md hover:bg-gray-50 flex items-center gap-2 text-sm">
                <Video className="w-4 h-4" />
                Watch Tutorial
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
