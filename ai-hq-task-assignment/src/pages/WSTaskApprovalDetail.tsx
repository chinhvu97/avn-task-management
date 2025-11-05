import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, Camera, Clock, MapPin, User, FileText, Image as ImageIcon } from 'lucide-react';
import { WSTaskSubmission } from 'shared-data';
import { useRole } from '../contexts/RoleContext';
import { RoleIndicator } from '../components/RoleIndicator';
import { AIAnalysisCard } from '../components/AIAnalysisCard';
import { PhotoComparisonViewer } from '../components/PhotoComparisonViewer';

const REJECTION_TEMPLATES = [
  'Photo quality too low - retake with better lighting',
  'Missing required items in photo',
  'Does not match sample images - check placement',
  'Safety issue detected - immediate correction needed',
  'Incomplete documentation - additional photos required',
];

export default function WSTaskApprovalDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile } = useRole();
  const submission = location.state?.submission as WSTaskSubmission;

  const [showRejectForm, setShowRejectForm] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [approvalNotes, setApprovalNotes] = useState('');
  const [showPhotoComparison, setShowPhotoComparison] = useState(false);

  if (!submission) {
    return (
      <div className="p-6">
        <RoleIndicator />
        <div className="text-center py-12">
          <p className="text-gray-500">No submission data found. Please go back to the list.</p>
          <button
            onClick={() => navigate('/ws-task-approval')}
            className="mt-4 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
          >
            Back to List
          </button>
        </div>
      </div>
    );
  }

  const handleApprove = () => {
    // In real app, this would call an API
    alert('Task approved! (This is a demo - in production, this would update the backend)');
    navigate('/ws-task-approval');
  };

  const handleReject = () => {
    if (!rejectionReason.trim()) {
      alert('Please provide a rejection reason');
      return;
    }
    alert('Task rejected! (This is a demo - in production, this would update the backend)');
    navigate('/ws-task-approval');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgent':
        return 'bg-red-100 border-red-300 text-red-700';
      case 'High':
        return 'bg-orange-100 border-orange-300 text-orange-700';
      case 'Medium':
        return 'bg-yellow-100 border-yellow-300 text-yellow-700';
      case 'Low':
        return 'bg-gray-100 border-gray-300 text-gray-700';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-700';
    }
  };

  const isReadOnly = submission.status !== 'Pending';

  return (
    <div className="p-6">
      <RoleIndicator />

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/ws-task-approval')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to List
          </button>
        </div>

        {/* Header */}
        <div className="bg-white border border-gray-200 p-6 rounded-lg">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">{submission.taskCode}: {submission.title}</h1>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(submission.priority)}`}>
                  {submission.priority} Priority
                </span>
              </div>
              <div className="text-gray-600 text-sm">
                {submission.category} • {submission.estimatedMinutes} minutes estimated
              </div>
            </div>
          </div>
        </div>

        {/* Task Info Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <div className="text-sm text-gray-500">Store</div>
                <div className="font-medium text-gray-900">{submission.storeName}</div>
              </div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <div className="text-sm text-gray-500">Completed By</div>
                <div className="font-medium text-gray-900">{submission.staffName}</div>
              </div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <div className="text-sm text-gray-500">Completed</div>
                <div className="font-medium text-gray-900">
                  {new Date(submission.completedDate).toLocaleDateString()}
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(submission.submittedDate).toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <div className="text-sm text-gray-500">Duration</div>
                <div className="font-medium text-gray-900">
                  {submission.actualMinutes} min
                  {submission.actualMinutes !== submission.estimatedMinutes && (
                    <span className={`text-xs ml-1 ${
                      submission.actualMinutes > submission.estimatedMinutes ? 'text-orange-600' : 'text-green-600'
                    }`}>
                      ({submission.actualMinutes > submission.estimatedMinutes ? '+' : ''}
                      {submission.actualMinutes - submission.estimatedMinutes} min)
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sample Photos */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <ImageIcon className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Reference Sample Images</h2>
            <span className="text-sm text-gray-500">({submission.samplePhotos.length} photos)</span>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {submission.samplePhotos.map((photo, index) => (
              <button
                key={index}
                onClick={() => setShowPhotoComparison(true)}
                className="aspect-square border-2 border-blue-200 rounded-lg hover:border-blue-400 transition-colors overflow-hidden hover:shadow-lg relative group"
              >
                <img
                  src={photo}
                  alt={`Sample ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                  <div className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Sample {index + 1}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Submitted Photos */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Camera className="w-5 h-5 text-green-600" />
            <h2 className="text-lg font-semibold text-gray-900">Submitted Photos</h2>
            <span className="text-sm text-gray-500">({submission.submittedPhotos.length} photos)</span>
            <button
              onClick={() => setShowPhotoComparison(true)}
              className="ml-auto text-sm text-pink-600 hover:text-pink-700 font-medium flex items-center gap-1"
            >
              <ImageIcon className="w-4 h-4" />
              Compare Side-by-Side
            </button>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {submission.submittedPhotos.map((photo, index) => {
              const finding = submission.aiAnalysis?.findings.find(f => f.photoIndex === index);
              const borderColor = finding?.status === 'Match' ? 'border-green-400'
                : finding?.status === 'Warning' ? 'border-yellow-400'
                : finding?.status === 'Issue' ? 'border-red-400'
                : 'border-green-200';

              return (
                <button
                  key={index}
                  onClick={() => setShowPhotoComparison(true)}
                  className={`aspect-square border-2 ${borderColor} rounded-lg hover:shadow-lg transition-all overflow-hidden relative group`}
                >
                  <img
                    src={photo}
                    alt={`Submitted Photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                    <div className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Photo {index + 1}
                    </div>
                  </div>
                  {finding && (
                    <div className={`absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg ${
                      finding.status === 'Match' ? 'bg-green-500'
                      : finding.status === 'Warning' ? 'bg-yellow-500'
                      : 'bg-red-500'
                    }`}>
                      {finding.status === 'Match' ? '✓' : finding.status === 'Warning' ? '!' : '×'}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* AI Analysis */}
        {submission.aiAnalysis && (
          <AIAnalysisCard
            confidence={submission.aiAnalysis.confidence}
            recommendation={submission.aiAnalysis.recommendation}
            findings={submission.aiAnalysis.findings}
            processedDate={submission.aiAnalysis.processedDate}
          />
        )}

        {/* Staff Notes */}
        {submission.staffNotes && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-medium text-blue-900 mb-1">Staff Notes</div>
                <div className="text-sm text-blue-800">{submission.staffNotes}</div>
              </div>
            </div>
          </div>
        )}

        {/* Manual Review (if already reviewed) */}
        {submission.manualReview && (
          <div className={`rounded-lg p-4 border ${
            submission.manualReview.decision === 'Approved'
              ? 'bg-green-50 border-green-200'
              : 'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-start gap-2">
              {submission.manualReview.decision === 'Approved' ? (
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <div className={`text-sm font-medium mb-1 ${
                  submission.manualReview.decision === 'Approved' ? 'text-green-900' : 'text-red-900'
                }`}>
                  {submission.manualReview.decision} by {submission.manualReview.reviewerName}
                </div>
                <div className={`text-sm ${
                  submission.manualReview.decision === 'Approved' ? 'text-green-800' : 'text-red-800'
                }`}>
                  {submission.manualReview.notes}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(submission.manualReview.reviewDate).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Rejection Form */}
        {!isReadOnly && showRejectForm && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-red-900 mb-3">Rejection Reason (Required)</h3>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Explain what needs to be fixed..."
              className="w-full h-24 px-3 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm mb-3"
            />
            <div>
              <div className="text-xs font-medium text-red-900 mb-2">Quick Templates:</div>
              <div className="flex flex-wrap gap-2">
                {REJECTION_TEMPLATES.map((template, index) => (
                  <button
                    key={index}
                    onClick={() => setRejectionReason(template)}
                    className="px-3 py-1 bg-white border border-red-300 rounded-full text-xs text-red-700 hover:bg-red-100 transition-colors"
                  >
                    {template}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Approval Notes (Optional) */}
        {!isReadOnly && !showRejectForm && (
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Approval Notes (Optional)
            </label>
            <textarea
              value={approvalNotes}
              onChange={(e) => setApprovalNotes(e.target.value)}
              placeholder="Add any notes about this approval..."
              className="w-full h-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-sm"
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 flex items-center justify-between">
          <button
            onClick={() => navigate('/ws-task-approval')}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-gray-700 font-medium"
          >
            Back to List
          </button>

          <div className="flex items-center gap-3">
            {!isReadOnly ? (
              <>
                {showRejectForm ? (
                  <>
                    <button
                      onClick={() => {
                        setShowRejectForm(false);
                        setRejectionReason('');
                      }}
                      className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-gray-700 font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleReject}
                      disabled={!rejectionReason.trim()}
                      className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      <XCircle className="w-5 h-5" />
                      Confirm Rejection
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setShowRejectForm(true)}
                      className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium flex items-center gap-2"
                    >
                      <XCircle className="w-5 h-5" />
                      Reject & Request Retake
                    </button>
                    <button
                      onClick={handleApprove}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium flex items-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Approve Task
                    </button>
                  </>
                )}
              </>
            ) : (
              <div className="text-sm text-gray-500">
                This task has already been reviewed
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Photo Comparison Viewer */}
      {showPhotoComparison && (
        <PhotoComparisonViewer
          samplePhotos={submission.samplePhotos}
          submittedPhotos={submission.submittedPhotos}
          onClose={() => setShowPhotoComparison(false)}
        />
      )}
    </div>
  );
}
