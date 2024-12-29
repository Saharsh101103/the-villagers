import { supabase } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';

const PRODUCT_BUCKET = 'products';
const BANNER_BUCKET = 'banners';

export type UploadResult = {
  path: string;
  error: Error | null;
};

// Helper to extract paths from upload results
export const getUploadPaths = (results: UploadResult | UploadResult[]): string[] => {
  if (Array.isArray(results)) {
    return results.filter(r => !r.error).map(r => r.path);
  }
  return results.error ? [] : [results.path];
};

// Helper to generate a unique file path
const generateUniqueFileName = (originalName: string): string => {
  const extension = originalName.split('.').pop();
  return `${uuidv4()}.${extension}`;
};

// Upload a single image
async function uploadImage(
  file: File,
  bucket: string,
  folder?: string
): Promise<UploadResult> {
  try {
    const fileName = generateUniqueFileName(file.name);
    const filePath = folder ? `${folder}/${fileName}` : fileName;

    const { error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) throw error;

    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);

    return {
      path: data.publicUrl,
      error: null,
    };
  } catch (error) {
    return {
      path: '',
      error: error as Error,
    };
  }
}

// Upload multiple product images
export async function uploadProductImages(
  files: File[],
  productId: string
): Promise<UploadResult[]> {
  return Promise.all(
    files.map((file) => uploadImage(file, PRODUCT_BUCKET, productId))
  );
}

// Upload a single banner image
export async function uploadBannerImage(file: File): Promise<UploadResult> {
  return uploadImage(file, BANNER_BUCKET);
}

// Delete a single image
export async function deleteImage(
  path: string,
  bucket: string
): Promise<{ error: Error | null }> {
  try {
    const { error } = await supabase.storage.from(bucket).remove([path]);
    if (error) throw error;
    return { error: null };
  } catch (error) {
    return { error: error as Error };
  }
}

// Delete all product images
export async function deleteProductImages(
  paths: string[]
): Promise<{ error: Error | null }> {
  try {
    const { error } = await supabase.storage
      .from(PRODUCT_BUCKET)
      .remove(paths);
    if (error) throw error;
    return { error: null };
  } catch (error) {
    return { error: error as Error };
  }
}

// Delete a banner image
export async function deleteBannerImage(
  path: string
): Promise<{ error: Error | null }> {
  return deleteImage(path, BANNER_BUCKET);
}