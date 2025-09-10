
import React from 'react';
import { ImageUploader } from './ImageUploader';
import { PromptForm } from './PromptForm';

interface ControlPanelProps {
  onOriginalImageChange: (file: File | null) => void;
  onReferenceImageChange: (file: File | null) => void;
  prompt: string;
  onPromptChange: (value: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
  isGenerateDisabled: boolean;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  onOriginalImageChange,
  onReferenceImageChange,
  prompt,
  onPromptChange,
  onGenerate,
  isLoading,
  isGenerateDisabled,
}) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-blue-300 mb-3">1. Upload Your Car</h2>
        <ImageUploader 
          id="original-uploader" 
          onImageChange={onOriginalImageChange} 
          label="Click or drag to upload"
        />
      </div>
      <div>
        <h2 className="text-lg font-semibold text-blue-300 mb-3">2. Describe Your Vision</h2>
        <PromptForm
          value={prompt}
          onChange={onPromptChange}
          onSubmit={onGenerate}
          isGenerating={isLoading}
        />
      </div>
      <div>
        <h2 className="text-lg font-semibold text-gray-400 mb-3">3. Add Reference (Optional)</h2>
        <ImageUploader 
          id="reference-uploader" 
          onImageChange={onReferenceImageChange}
          label="Upload a style example"
        />
      </div>
    </div>
  );
};
