import { useState } from 'react';
import { Camera, X, Upload } from 'lucide-react';
import { Button } from './ui/button';

interface PhotoUploadProps {
  photos: string[];
  maxPhotos?: number;
  onPhotosChange: (photos: string[]) => void;
  disabled?: boolean;
}

export function PhotoUpload({ photos, maxPhotos = 5, onPhotosChange, disabled = false }: PhotoUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleAddPhoto = () => {
    if (photos.length >= maxPhotos) return;
    
    // Simulate photo capture/upload
    setUploading(true);
    setTimeout(() => {
      const newPhoto = `https://images.unsplash.com/photo-${Date.now()}?w=400`;
      onPhotosChange([...photos, newPhoto]);
      setUploading(false);
    }, 1000);
  };

  const handleRemovePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    onPhotosChange(newPhotos);
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-3">
        {photos.map((photo, index) => (
          <div key={index} className="relative aspect-square rounded-lg overflow-hidden border-2 border-gray-200 group">
            <img src={photo} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
            {!disabled && (
              <button
                onClick={() => handleRemovePhoto(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        ))}
        
        {photos.length < maxPhotos && !disabled && (
          <button
            onClick={handleAddPhoto}
            disabled={uploading}
            className="aspect-square rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-colors flex flex-col items-center justify-center gap-2 text-gray-500 hover:text-blue-600"
          >
            {uploading ? (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            ) : (
              <>
                <Camera className="w-6 h-6" />
                <span className="text-xs">Add Photo</span>
              </>
            )}
          </button>
        )}
      </div>
      
      <div className="text-xs text-gray-500 text-center">
        {photos.length} / {maxPhotos} photos uploaded
      </div>
    </div>
  );
}
