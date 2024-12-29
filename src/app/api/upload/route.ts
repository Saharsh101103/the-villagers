import { NextResponse } from 'next/server';
import {
  uploadProductImages,
  uploadBannerImage,
  type UploadResult,
} from '@/lib/storage-utils';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const type = formData.get('type') as string;
    const files = formData.getAll('files') as File[];
    const productId = formData.get('productId') as string;

    let results: UploadResult | UploadResult[];

    if (type === 'product' && productId) {
      results = await uploadProductImages(files, productId);
    } else if (type === 'banner') {
      results = await uploadBannerImage(files[0]);
    } else {
      throw new Error('Invalid upload type or missing productId');
    }

    return NextResponse.json({ success: true, results });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}