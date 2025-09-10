
import React from 'react';
import type { ModificationResult } from '../types';
import { Icons } from './Icons';

interface DisplayPanelProps {
  originalImageUrl: string | null;
  modificationResult: ModificationResult | null;
  isLoading: boolean;
  error: string | null;
}

const ImageViewer: React.FC<{ imageUrl: string; label: string }> = ({ imageUrl, label }) => (
  <div className="flex-1 flex flex-col items-center justify-center p-4 min-w-0">
    <div className="w-full aspect-[4/3] bg-gray-900 rounded-lg overflow-hidden shadow-lg flex items-center justify-center">
      <img src={imageUrl} alt={label} className="max-w-full max-h-full object-contain" />
    </div>
    <h3 className="mt-4 text-lg font-semibold text-gray-300">{label}</h3>
  </div>
);

const LoadingState: React.FC = () => (
  <div className="flex flex-col items-center justify-center text-center p-8 text-gray-400">
    <Icons.spinner className="w-16 h-16 text-blue-500 animate-spin mb-6" />
    <h3 className="text-2xl font-bold text-white mb-2">Customizing Your Ride...</h3>
    <p className="max-w-md">Our AI is meticulously applying your modifications. This may take a moment for photorealistic results.</p>
  </div>
);

const InitialState: React.FC = () => (
  <div className="flex flex-col items-center justify-center text-center p-8 text-gray-500">
    <Icons.car className="w-24 h-24 mb-6 text-gray-600" />
    <h3 className="text-2xl font-bold text-gray-300 mb-2">Your Vision Awaits</h3>
    <p>Upload your car's photo and describe the changes to see the magic happen.</p>
  </div>
);


export const DisplayPanel: React.FC<DisplayPanelProps> = ({
  originalImageUrl,
  modificationResult,
  isLoading,
  error,
}) => {
  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 text-red-400">
        <Icons.error className="w-16 h-16 mb-6" />
        <h3 className="text-2xl font-bold text-red-300 mb-2">An Error Occurred</h3>
        <p className="max-w-md">{error}</p>
      </div>
    );
  }

  if (modificationResult && originalImageUrl) {
    return (
      <div className="w-full p-4 md:p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <ImageViewer imageUrl={originalImageUrl} label="Before" />
          <ImageViewer imageUrl={modificationResult.imageUrl} label="After" />
        </div>
        {modificationResult.commentary && (
            <div className="mt-6 p-4 bg-gray-900/70 rounded-lg border border-gray-700">
                <p className="text-sm text-gray-300 italic">{modificationResult.commentary}</p>
            </div>
        )}
        
        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          <button 
            onClick={() => {
              const link = document.createElement('a');
              link.href = modificationResult.imageUrl;
              link.download = 'customized-car.png';
              link.click();
            }}
            className="glow-button magnetic flex items-center space-x-2"
          >
            <Icons.download className="w-4 h-4" />
            <span>Download</span>
          </button>
          
          <button 
            onClick={() => window.location.reload()}
            className="magnetic-button flex items-center space-x-2"
          >
            <Icons.sparkle className="w-4 h-4" />
            <span>New Render</span>
          </button>
          
          <button 
            onClick={() => window.location.reload()}
            className="magnetic-button flex items-center space-x-2"
          >
            <Icons.refresh className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>
      </div>
    );
  }

  if (originalImageUrl) {
    return (
      <div className="w-full p-4 md:p-6">
          <ImageViewer imageUrl={originalImageUrl} label="Ready to Modify" />
      </div>
    );
  }

  return <InitialState />;
};
