
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { DisplayPanel } from './components/DisplayPanel';
import { ImageUploader } from './components/ImageUploader';
import { PromptForm } from './components/PromptForm';
import type { ModificationResult } from './types';
import { toBase64 } from './utils/fileUtils';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [referenceImage, setReferenceImage] = useState<File | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [modificationResult, setModificationResult] = useState<ModificationResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);

  const handleOriginalImageChange = (file: File | null) => {
    setOriginalImage(file);
    setModificationResult(null); // Clear previous results when new car is uploaded
    if (file) {
      setOriginalImageUrl(URL.createObjectURL(file));
    } else {
      setOriginalImageUrl(null);
    }
  };
  
  const handleGenerateClick = useCallback(async () => {
    if (!originalImage) {
      setError('Please upload an image of your car first.');
      return;
    }
    if (!prompt.trim()) {
      setError('Please describe the modification you want.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setModificationResult(null);

    try {
      const originalImageBase64 = await toBase64(originalImage);
      const referenceImageBase64 = referenceImage ? await toBase64(referenceImage) : null;

      // Call our secure API route instead of direct Gemini service
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          originalImageBase64,
          prompt,
          referenceImageBase64,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate image');
      }

      const result = await response.json();
      setModificationResult(result);

    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred during generation.');
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, referenceImage, prompt]);

  return (
    <div className="min-h-screen bg-gray-900 font-sans flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        {/* Grid Layout: 2 columns on large screens, 1 column on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Left Column */}
          <div className="space-y-6">
            {/* Row 1: Upload Car Image */}
            <div className="bg-gray-800/50 rounded-xl p-6 shadow-2xl border border-gray-700 hover:shadow-blue-500/10 hover:border-blue-500/30 transition-all duration-300">
              <h2 className="text-lg font-semibold text-blue-300 mb-4">1. Upload Your Car</h2>
              <ImageUploader 
                id="original-uploader" 
                onImageChange={handleOriginalImageChange} 
                label="Click or drag to upload"
              />
            </div>
            
            {/* Row 2: Optional Reference Image */}
            <div className="bg-gray-800/50 rounded-xl p-6 shadow-2xl border border-gray-700 hover:shadow-blue-500/10 hover:border-blue-500/30 transition-all duration-300">
              <h2 className="text-lg font-semibold text-gray-400 mb-4">3. Add Reference (Optional)</h2>
              <ImageUploader 
                id="reference-uploader" 
                onImageChange={setReferenceImage}
                label="Upload a style example"
              />
            </div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            {/* Row 1: Describe Modification */}
            <div className="bg-gray-800/50 rounded-xl p-6 shadow-2xl border border-gray-700 hover:shadow-blue-500/10 hover:border-blue-500/30 transition-all duration-300 h-fit">
              <h2 className="text-lg font-semibold text-blue-300 mb-4">2. Describe Your Vision</h2>
              <PromptForm
                value={prompt}
                onChange={setPrompt}
                onSubmit={handleGenerateClick}
                isGenerating={isLoading}
              />
            </div>
            
            {/* Row 2: Generated Result */}
            <div className="bg-gray-800/50 rounded-xl shadow-2xl border border-gray-700 hover:shadow-blue-500/10 hover:border-blue-500/30 transition-all duration-300 min-h-[60vh] flex items-center justify-center">
              <DisplayPanel
                originalImageUrl={originalImageUrl}
                modificationResult={modificationResult}
                isLoading={isLoading}
                error={error}
              />
            </div>
          </div>
        </div>
      </main>
      <footer className="text-center p-4 text-gray-500 text-sm">
        <p>Powered by Gemini AI. Images are for illustrative purposes only.</p>
      </footer>
    </div>
  );
};

export default App;
