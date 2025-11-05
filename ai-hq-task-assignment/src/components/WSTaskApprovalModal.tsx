import { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, CheckCircle, XCircle, ChevronLeft, ChevronRight, Camera, Clock, MapPin, User, FileText, Image as ImageIcon } from 'lucide-react';
import { WSTaskSubmission } from 'shared-data';
import { AIAnalysisCard } from './AIAnalysisCard';
import { PhotoComparisonViewer } from './PhotoComparisonViewer';

interface WSTaskApprovalModalProps {
  submission: WSTaskSubmission;
  onClose: () => void;
  onApprove: (submissionId: string, notes?: string) => void;
  onReject: (submissionId: string, reason: string) => void;
  onNext?: () => void;
  onPrevious?: () => void;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

const REJECTION_TEMPLATES = [
  'Photo quality too low - retake with better lighting',
  'Missing required items in photo',
  'Does not match sample images - check placement',
  'Safety issue detected - immediate correction needed',
  'Incomplete documentation - additional photos required',
];

export function WSTaskApprovalModal({
  submission,
  onClose,
  onApprove,
  onReject,
  onNext,
  onPrevious,
  hasNext = false,
  hasPrevious = false,
}: WSTaskApprovalModalProps) {
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [approvalNotes, setApprovalNotes] = useState('');
  const [showPhotoComparison, setShowPhotoComparison] = useState(false);

  const handleApprove = () => {
    onApprove(submission.id, approvalNotes || undefined);
    onClose();
  };

  const handleReject = () => {
    if (!rejectionReason.trim()) {
      alert('Please provide a rejection reason');
      return;
    }
    onReject(submission.id, rejectionReason);
    onClose();
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

  const modalContent = (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
        style={{ zIndex: 9999 }}
        onClick={onClose}
      >
        <div
          className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white p-6 flex-shrink-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold">{submission.taskCode}: {submission.title}</h2>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(submission.priority)}`}>
                    {submission.priority} Priority
                  </span>
                </div>
                <div className="text-pink-100 text-sm">
                  {submission.category} • {submission.estimatedMinutes} minutes estimated
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Task Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <div className="text-sm text-gray-500">Store</div>
                  <div className="font-medium text-gray-900">{submission.storeName}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <div className="text-sm text-gray-500">Completed By</div>
                  <div className="font-medium text-gray-900">{submission.staffName}</div>
                </div>
              </div>
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

            <hr className="my-6" />

            {/* Sample Photos */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <ImageIcon className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Reference Sample Images</h3>
                <span className="text-sm text-gray-500">({submission.samplePhotos.length} photos)</span>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {submission.samplePhotos.map((photo, index) => (
                  <button
                    key={index}
                    onClick={() => setShowPhotoComparison(true)}
                    className="aspect-square bg-gradient-to-br from-blue-100 to-blue-50 border-2 border-blue-200 rounded-lg hover:border-blue-400 transition-colors flex items-center justify-center text-sm text-blue-700 hover:shadow-lg"
                  >
                    <div className="text-center">
                      <Camera className="w-8 h-8 mx-auto mb-1 opacity-50" />
                      <div className="font-medium">Sample {index + 1}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Submitted Photos */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Camera className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">Submitted Photos</h3>
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
                  const statusColor = finding?.status === 'Match' ? 'border-green-400 bg-green-50'
                    : finding?.status === 'Warning' ? 'border-yellow-400 bg-yellow-50'
                    : finding?.status === 'Issue' ? 'border-red-400 bg-red-50'
                    : 'border-green-200 bg-green-50';

                  return (
                    <button
                      key={index}
                      onClick={() => setShowPhotoComparison(true)}
                      className={`aspect-square bg-gradient-to-br from-green-100 to-green-50 border-2 ${statusColor} rounded-lg hover:shadow-lg transition-all flex items-center justify-center text-sm text-green-700 relative group`}
                    >
                      <div className="text-center">
                        <Camera className="w-8 h-8 mx-auto mb-1 opacity-50" />
                        <div className="font-medium">Photo {index + 1}</div>
                      </div>
                      {finding && (
                        <div className={`absolute top-1 right-1 w-3 h-3 rounded-full ${
                          finding.status === 'Match' ? 'bg-green-500'
                          : finding.status === 'Warning' ? 'bg-yellow-500'
                          : 'bg-red-500'
                        }`} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* AI Analysis */}
            {submission.aiAnalysis && (
              <div className="mb-6">
                <AIAnalysisCard
                  confidence={submission.aiAnalysis.confidence}
                  recommendation={submission.aiAnalysis.recommendation}
                  findings={submission.aiAnalysis.findings}
                  processedDate={submission.aiAnalysis.processedDate}
                />
              </div>
            )}

            {/* Staff Notes */}
            {submission.staffNotes && (
              <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
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
              <div className={`mb-6 rounded-lg p-4 border ${
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
              <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-red-900 mb-3">Rejection Reason (Required)</h4>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Explain what needs to be fixed..."
                  className="w-full h-24 px-3 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                />
                <div className="mt-3">
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
              <div className="mb-6">
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
          </div>

          {/* Footer */}
          <div className="bg-gray-50 border-t px-6 py-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              {hasPrevious && (
                <button
                  onClick={onPrevious}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-gray-700 font-medium flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
              )}
            </div>

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
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-medium"
                >
                  Close
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              {hasNext && (
                <button
                  onClick={onNext}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-gray-700 font-medium flex items-center gap-2"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
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
    </>
  );

  return createPortal(modalContent, document.body);
}
