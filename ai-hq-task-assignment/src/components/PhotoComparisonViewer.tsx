import { useState } from 'react';
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react';

interface PhotoComparisonViewerProps {
  samplePhotos: string[];
  submittedPhotos: string[];
  onClose: () => void;
}

export function PhotoComparisonViewer({ samplePhotos, submittedPhotos, onClose }: PhotoComparisonViewerProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [zoom, setZoom] = useState(1);

  const maxIndex = Math.max(samplePhotos.length, submittedPhotos.length) - 1;

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
    setZoom(1);
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
    setZoom(1);
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.25, 1));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col">
      {/* Header */}
      <div className="bg-gray-900 p-4 flex items-center justify-between border-b border-gray-700">
        <div className="text-white font-medium">
          Photo Comparison - {selectedIndex + 1} of {maxIndex + 1}
        </div>
        <div className="flex items-center gap-4">
          {/* Zoom Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleZoomOut}
              disabled={zoom <= 1}
              className="p-2 rounded hover:bg-gray-800 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            <span className="text-white text-sm">{Math.round(zoom * 100)}%</span>
            <button
              onClick={handleZoomIn}
              disabled={zoom >= 3}
              className="p-2 rounded hover:bg-gray-800 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded hover:bg-gray-800 text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Comparison View */}
      <div className="flex-1 flex items-center justify-center gap-4 p-8 overflow-auto">
        {/* Navigation - Previous */}
        <button
          onClick={handlePrevious}
          className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 text-white"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Sample Photo */}
        <div className="flex-1 max-w-2xl">
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="text-white text-sm font-medium mb-2">Reference Sample</div>
            <div className="bg-gray-900 rounded flex items-center justify-center" style={{ minHeight: '400px' }}>
              {samplePhotos[selectedIndex] ? (
                <div style={{ transform: `scale(${zoom})`, transition: 'transform 0.2s' }}>
                  <div className="w-full h-96 bg-gradient-to-br from-blue-900 to-blue-700 rounded flex items-center justify-center text-white text-sm">
                    Sample Photo {selectedIndex + 1}
                    <br />
                    <span className="text-xs text-blue-200 mt-2">{samplePhotos[selectedIndex]}</span>
                  </div>
                </div>
              ) : (
                <div className="text-gray-500 text-sm">No sample photo</div>
              )}
            </div>
          </div>
        </div>

        {/* Submitted Photo */}
        <div className="flex-1 max-w-2xl">
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="text-white text-sm font-medium mb-2">Staff Submission</div>
            <div className="bg-gray-900 rounded flex items-center justify-center" style={{ minHeight: '400px' }}>
              {submittedPhotos[selectedIndex] ? (
                <div style={{ transform: `scale(${zoom})`, transition: 'transform 0.2s' }}>
                  <div className="w-full h-96 bg-gradient-to-br from-green-900 to-green-700 rounded flex items-center justify-center text-white text-sm">
                    Submitted Photo {selectedIndex + 1}
                    <br />
                    <span className="text-xs text-green-200 mt-2">{submittedPhotos[selectedIndex]}</span>
                  </div>
                </div>
              ) : (
                <div className="text-gray-500 text-sm">No submitted photo</div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation - Next */}
        <button
          onClick={handleNext}
          className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 text-white"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Thumbnail Strip */}
      <div className="bg-gray-900 border-t border-gray-700 p-4">
        <div className="flex gap-2 justify-center overflow-x-auto">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedIndex(index);
                setZoom(1);
              }}
              className={`flex-shrink-0 w-20 h-20 rounded border-2 transition-all ${
                selectedIndex === index
                  ? 'border-pink-500 ring-2 ring-pink-500 ring-opacity-50'
                  : 'border-gray-600 hover:border-gray-400'
              }`}
            >
              <div className={`w-full h-full rounded flex items-center justify-center text-xs ${
                submittedPhotos[index] ? 'bg-gradient-to-br from-green-900 to-green-700' : 'bg-gray-700'
              } text-white`}>
                {index + 1}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
