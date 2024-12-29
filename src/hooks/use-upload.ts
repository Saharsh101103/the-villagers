"use client";

import { useState } from 'react';
import { type UploadResult, getUploadPaths } from '@/lib/storage-utils';

type UploadType = 'product' | 'banner';

interface UseUploadProps {
  type: UploadType;
  productId?: string;
}

interface UseUploadReturn {
  upload: (files: File[]) => Promise<string[]>;
  isUploading: boolean;
  error: string | null;
}

export function useUpload({ type, productId }: UseUploadProps): UseUploadReturn {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = async (files: File[]): Promise<string[]> => {
    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('type', type);
      
      if (type === 'product' && !productId) {
        throw new Error('Product ID is required for product uploads');
      }

      if (productId) {
        formData.append('productId', productId);
      }

      files.forEach((file) => {
        formData.append('files', file);
      });

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Upload failed');
      }

      return getUploadPaths(data.results);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    upload,
    isUploading,
    error,
  };
}