
import React, { useState, useCallback, DragEvent } from 'react';
import { Icons } from './Icons';

interface ImageUploaderProps {
  id: string;
  onImageChange: (file: File | null) => void;
  label: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ id, onImageChange, label }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleFileChange = useCallback((file: File | null) => {
    if (file && file.type.startsWith('image/')) {
      onImageChange(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      onImageChange(null);
      setPreview(null);
    }
  }, [onImageChange]);

  const onDragEnter = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const onDragLeave = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const onDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const onDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  return (
    <label
      htmlFor={id}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className={`relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300
        ${isDragging ? 'border-blue-400 bg-gray-700' : 'border-gray-600 bg-gray-800 hover:bg-gray-700/50'}`}
    >
      {preview ? (
        <img src={preview} alt="Preview" className="object-cover w-full h-full rounded-lg" />
      ) : (
        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
          <Icons.upload className="w-8 h-8 mb-2 text-gray-400" />
          <p className="mb-1 text-sm text-gray-400">{label}</p>
          <p className="text-xs text-gray-500">PNG, JPG, WEBP</p>
        </div>
      )}
      <input id={id} type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e.target.files ? e.target.files[0] : null)} />
    </label>
  );
};
