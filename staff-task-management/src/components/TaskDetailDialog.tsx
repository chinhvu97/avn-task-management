import { useState, useEffect } from 'react';
import { Task, Staff } from '../types';
import { getStatusColor, getTaskTypeColor } from '../lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Clock, User, Calendar, CheckCircle, XCircle, Pause, Play, ImageIcon, AlertCircle, CheckCircle2, RefreshCw, ExternalLink, BookOpen } from 'lucide-react';
import { PhotoUpload } from './PhotoUpload';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { ScrollArea } from './ui/scroll-area';
import { Textarea } from './ui/textarea';

interface TaskDetailDialogProps {
  task: Task | null;
  staff: Staff[];
  open: boolean;
  onClose: () => void;
  onStatusChange: (taskId: string, newStatus: Task['status'], updates?: Partial<Task>) => void;
}

export function TaskDetailDialog({ task, staff, open, onClose, onStatusChange }: TaskDetailDialogProps) {
  const [completionPhotos, setCompletionPhotos] = useState<string[]>([]);
  const [requiresHQApproval, setRequiresHQApproval] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [cancellationReason, setCancellationReason] = useState('');

  // Reset cancellation dialog state when dialog opens/closes
  useEffect(() => {
    if (!open) {
      setShowCancelDialog(false);
      setCancellationReason('');
    }
  }, [open]);

  if (!task) return null;

  const assignedStaff = staff.find(s => s.id === task.staffId);
  const isWSTask = task.type === 'WS';
  const isDWSTask = task.type === 'DWS';

  const handleStart = () => {
    onStatusChange(task.id, 'Processing');
  };

  const handlePause = () => {
    onStatusChange(task.id, 'Pending');
  };

  const handleComplete = () => {
    if (isWSTask) {
      // For WS tasks, need photos first
      if (!task.completionPhotos || task.completionPhotos.length === 0) {
        alert('Please upload completion photos before submitting.');
        return;
      }
      
      // Trigger AI verification
      handleAIVerification();
    } else {
      onStatusChange(task.id, 'Done');
    }
  };

  const handleSubmitPhotos = () => {
    if (completionPhotos.length === 0) {
      alert('Please upload at least one photo.');
      return;
    }

    // Simulate AI verification
    handleAIVerification();
  };

  const handleAIVerification = () => {
    setIsVerifying(true);
    
    // Simulate AI verification process (2 seconds)
    setTimeout(() => {
      const passed = Math.random() > 0.2; // 80% pass rate
      
      if (passed) {
        const updates: Partial<Task> = {
          completionPhotos: completionPhotos.length > 0 ? completionPhotos : task.completionPhotos,
          aiVerificationStatus: 'passed',
          aiVerificationMessage: 'All requirements met. Display correctly arranged according to guidelines.',
          requiresHQApproval,
        };

        if (!requiresHQApproval) {
          // Auto-approve
          updates.autoApproved = true;
          onStatusChange(task.id, 'Done', updates);
        } else {
          // Send to HQ
          onStatusChange(task.id, 'Awaiting Approval', updates);
        }
      } else {
        // Failed verification
        const updates: Partial<Task> = {
          completionPhotos: completionPhotos.length > 0 ? completionPhotos : task.completionPhotos,
          aiVerificationStatus: 'failed',
          aiVerificationMessage: 'Items not properly aligned. Please adjust product placement and retake photos.',
        };
        onStatusChange(task.id, 'Processing', updates);
      }
      
      setIsVerifying(false);
      setCompletionPhotos([]);
    }, 2000);
  };

  const handleRetakePhotos = () => {
    const updates: Partial<Task> = {
      completionPhotos: [],
      aiVerificationStatus: 'not_required',
      aiVerificationMessage: undefined,
    };
    onStatusChange(task.id, 'Processing', updates);
  };

  const handleCancelClick = () => {
    setShowCancelDialog(true);
  };

  const handleCancelConfirm = () => {
    if (!cancellationReason.trim()) {
      alert('Please provide a reason for cancellation.');
      return;
    }
    onStatusChange(task.id, 'Cancelled', { cancellationReason: cancellationReason.trim() });
    setShowCancelDialog(false);
    setCancellationReason('');
  };

  const handleCancelDialogClose = () => {
    setShowCancelDialog(false);
    setCancellationReason('');
  };

  const handleGuideClick = () => {
    // Open guide app with the guide reference
    // In a real app, this would open the guide app with a deep link
    window.open(`/guide/${task.guide}`, '_blank');
  };

  const showPhotoUpload = isWSTask && (task.status === 'Processing' || task.status === 'Pending');
  const showAIVerification = isWSTask && task.aiVerificationStatus && task.aiVerificationStatus !== 'not_required';

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4 pr-8">
            <DialogTitle className="text-2xl">{task.title}</DialogTitle>
            <div className="flex gap-2 shrink-0">
              <span className={`${getTaskTypeColor(task.type)} text-white text-xs px-3 py-1 rounded`}>
                {task.type}
              </span>
              <span className={`${getStatusColor(task.status)} text-xs px-3 py-1 rounded border`}>
                {task.status}
              </span>
            </div>
          </div>
          <DialogDescription className="sr-only">Task details</DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-120px)]">
          <div className="space-y-6 py-4 pr-4">
            {/* Staff Info */}
            <div className="flex items-center gap-3 text-gray-700">
              <User className="w-5 h-5" />
              <span>{assignedStaff?.name}</span>
            </div>

            {/* Date */}
            <div className="flex items-center gap-3 text-gray-700">
              <Calendar className="w-5 h-5" />
              <span>{new Date(task.date).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>

            {/* Time */}
            <div className="flex items-center gap-3 text-gray-700">
              <Clock className="w-5 h-5" />
              <span>{task.startTime} - {task.endTime}</span>
            </div>

            {/* Guide for DWS tasks */}
            {isDWSTask && task.guide && (
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-gray-700" />
                <button
                  onClick={handleGuideClick}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline"
                >
                  <span>Guide: {task.guide}</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Duration Stats */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="text-sm text-gray-500">Estimated Time</div>
                <div className="text-xl">{task.estimatedMinutes} min</div>
              </div>
              {task.actualMinutes && (
                <div>
                  <div className="text-sm text-gray-500">Actual Time</div>
                  <div className={`text-xl ${task.actualMinutes <= task.estimatedMinutes ? 'text-green-600' : 'text-orange-600'}`}>
                    {task.actualMinutes} min
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            {task.description && (
              <div>
                <div className="text-sm text-gray-500 mb-2">Description</div>
                <p className="text-gray-700">{task.description}</p>
              </div>
            )}

            {/* Cancellation Reason (if task is cancelled) */}
            {task.status === 'Cancelled' && task.cancellationReason && (
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="text-sm text-red-700 mb-1">Cancellation Reason</div>
                <p className="text-sm text-gray-700">{task.cancellationReason}</p>
              </div>
            )}

            {/* Sample Images for WS tasks */}
            {isWSTask && task.sampleImages && task.sampleImages.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <ImageIcon className="w-4 h-4 text-gray-500" />
                  <h3 className="text-sm">Reference Images</h3>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {task.sampleImages.map((image, index) => (
                    <div key={index} className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200">
                      <img src={image} alt={`Reference ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Photo Upload Section for WS tasks */}
            {showPhotoUpload && !showAIVerification && (
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="text-sm mb-3">Upload Completion Photos</h3>
                <PhotoUpload
                  photos={task.completionPhotos || completionPhotos}
                  onPhotosChange={setCompletionPhotos}
                  maxPhotos={5}
                />
                
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Switch
                      id="hq-approval"
                      checked={requiresHQApproval}
                      onCheckedChange={setRequiresHQApproval}
                    />
                    <Label htmlFor="hq-approval" className="text-sm">
                      Requires HQ Approval
                    </Label>
                  </div>
                </div>
              </div>
            )}

            {/* AI Verification Status */}
            {showAIVerification && (
              <div className={`p-4 rounded-lg border ${
                task.aiVerificationStatus === 'passed'
                  ? 'bg-green-50 border-green-200'
                  : task.aiVerificationStatus === 'failed'
                  ? 'bg-red-50 border-red-200'
                  : 'bg-blue-50 border-blue-200'
              }`}>
                <div className="flex items-start gap-3">
                  {task.aiVerificationStatus === 'passed' && (
                    <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  )}
                  {task.aiVerificationStatus === 'failed' && (
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  )}
                  {task.aiVerificationStatus === 'pending' && (
                    <RefreshCw className="w-5 h-5 text-blue-600 shrink-0 mt-0.5 animate-spin" />
                  )}
                  
                  <div className="flex-1">
                    <div className={`text-sm mb-1 ${
                      task.aiVerificationStatus === 'passed' ? 'text-green-700' :
                      task.aiVerificationStatus === 'failed' ? 'text-red-700' :
                      'text-blue-700'
                    }`}>
                      {task.aiVerificationStatus === 'passed' && '✓ AI Verification Passed'}
                      {task.aiVerificationStatus === 'failed' && '✗ AI Verification Failed'}
                      {task.aiVerificationStatus === 'pending' && 'AI Verification in Progress...'}
                    </div>
                    
                    {task.aiVerificationMessage && (
                      <p className="text-xs text-gray-600 mb-2">{task.aiVerificationMessage}</p>
                    )}

                    {task.aiVerificationStatus === 'passed' && task.requiresHQApproval && (
                      <div className="text-xs text-blue-600 mt-2">
                        ⏳ Awaiting HQ approval
                      </div>
                    )}

                    {task.aiVerificationStatus === 'passed' && task.autoApproved && (
                      <div className="text-xs text-green-600 mt-2">
                        ✓ Auto-approved (AI verification only)
                      </div>
                    )}
                  </div>
                </div>

                {/* Show completion photos */}
                {task.completionPhotos && task.completionPhotos.length > 0 && (
                  <div className="mt-4">
                    <div className="text-xs text-gray-500 mb-2">Submitted Photos</div>
                    <div className="grid grid-cols-3 gap-2">
                      {task.completionPhotos.map((photo, index) => (
                        <div key={index} className="aspect-square rounded overflow-hidden border">
                          <img src={photo} alt={`Completion ${index + 1}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Retake photos button if failed */}
                {task.aiVerificationStatus === 'failed' && (
                  <Button
                    onClick={handleRetakePhotos}
                    variant="outline"
                    className="mt-3 w-full gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Retake Photos
                  </Button>
                )}
              </div>
            )}

            {/* AI Verifying State */}
            {isVerifying && (
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-3">
                  <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
                  <div>
                    <div className="text-sm text-blue-700">AI Verification in Progress...</div>
                    <div className="text-xs text-blue-600">Analyzing photos and comparing with guidelines</div>
                  </div>
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex gap-3 pt-4">
              {task.status === 'Open' && (
                <Button onClick={handleStart} className="flex-1 gap-2">
                  <Play className="w-4 h-4" />
                  Start Task
                </Button>
              )}
              
              {task.status === 'Processing' && !showAIVerification && (
                <>
                  <Button onClick={handlePause} variant="outline" className="flex-1 gap-2">
                    <Pause className="w-4 h-4" />
                    Pause
                  </Button>
                  {isWSTask && completionPhotos.length > 0 && (
                    <Button 
                      onClick={handleSubmitPhotos} 
                      className="flex-1 gap-2"
                      disabled={isVerifying}
                    >
                      <CheckCircle className="w-4 h-4" />
                      Submit for Verification
                    </Button>
                  )}
                  {!isWSTask && (
                    <Button onClick={handleComplete} className="flex-1 gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Complete
                    </Button>
                  )}
                </>
              )}

              {task.status === 'Pending' && (
                <>
                  <Button onClick={handleStart} className="flex-1 gap-2">
                    <Play className="w-4 h-4" />
                    Resume
                  </Button>
                  {!isWSTask && (
                    <Button onClick={handleComplete} variant="outline" className="flex-1 gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Complete
                    </Button>
                  )}
                </>
              )}

              {(task.status === 'Open' || task.status === 'Processing' || task.status === 'Pending') && (
                <Button onClick={handleCancelClick} variant="destructive" className="gap-2">
                  <XCircle className="w-4 h-4" />
                  Cancel
                </Button>
              )}
            </div>

            {/* Cancellation Dialog */}
            {showCancelDialog && (
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="text-sm text-red-700 mb-3">
                  Please provide a reason for cancelling this task:
                </div>
                <Textarea
                  value={cancellationReason}
                  onChange={(e) => setCancellationReason(e.target.value)}
                  placeholder="Enter cancellation reason..."
                  className="mb-3 min-h-[100px]"
                />
                <div className="flex gap-2">
                  <Button
                    onClick={handleCancelConfirm}
                    variant="destructive"
                    className="flex-1"
                  >
                    Confirm Cancellation
                  </Button>
                  <Button
                    onClick={handleCancelDialogClose}
                    variant="outline"
                    className="flex-1"
                  >
                    Back
                  </Button>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
