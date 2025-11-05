import { Sparkles, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface AIAnalysisFinding {
  photoIndex: number;
  status: 'Match' | 'Warning' | 'Issue';
  description: string;
}

interface AIAnalysisCardProps {
  confidence: number;
  recommendation: 'Approve' | 'Review' | 'Reject';
  findings: AIAnalysisFinding[];
  processedDate: string;
}

export function AIAnalysisCard({ confidence, recommendation, findings, processedDate }: AIAnalysisCardProps) {
  const getRecommendationColor = () => {
    switch (recommendation) {
      case 'Approve':
        return 'bg-green-100 border-green-300 text-green-700';
      case 'Review':
        return 'bg-yellow-100 border-yellow-300 text-yellow-700';
      case 'Reject':
        return 'bg-red-100 border-red-300 text-red-700';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-700';
    }
  };

  const getConfidenceColor = () => {
    if (confidence >= 85) return 'bg-green-500';
    if (confidence >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getStatusIcon = (status: 'Match' | 'Warning' | 'Issue') => {
    switch (status) {
      case 'Match':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'Warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'Issue':
        return <XCircle className="w-4 h-4 text-red-600" />;
    }
  };

  const getStatusColor = (status: 'Match' | 'Warning' | 'Issue') => {
    switch (status) {
      case 'Match':
        return 'bg-green-50 border-green-200';
      case 'Warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'Issue':
        return 'bg-red-50 border-red-200';
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-purple-600" />
        <h3 className="text-lg font-semibold text-gray-900">AI Analysis</h3>
        <span className={`ml-auto px-3 py-1 rounded-full text-xs font-medium border ${getRecommendationColor()}`}>
          {recommendation === 'Review' ? 'Manual Review Recommended' : recommendation}
        </span>
      </div>

      {/* Confidence Score */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm text-gray-700 mb-2">
          <span className="font-medium">Confidence Score</span>
          <span className="font-semibold">{confidence}%</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${getConfidenceColor()} transition-all duration-500`}
            style={{ width: `${confidence}%` }}
          />
        </div>
        <div className="text-xs text-gray-500 mt-1">
          Processed: {new Date(processedDate).toLocaleString()}
        </div>
      </div>

      {/* Findings */}
      <div className="space-y-2">
        <div className="text-sm font-medium text-gray-700 mb-2">Detailed Findings:</div>
        {findings.map((finding, index) => (
          <div
            key={index}
            className={`border rounded-lg p-3 ${getStatusColor(finding.status)}`}
          >
            <div className="flex items-start gap-2">
              <div className="flex-shrink-0 mt-0.5">
                {getStatusIcon(finding.status)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 mb-1">
                  Photo {finding.photoIndex + 1}
                </div>
                <div className="text-sm text-gray-700">
                  {finding.description}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recommendation Banner */}
      {recommendation === 'Review' && (
        <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-yellow-800">
              <span className="font-semibold">Manual Review Recommended:</span> AI confidence is below the threshold for automatic approval. Please review photos manually before making a decision.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
