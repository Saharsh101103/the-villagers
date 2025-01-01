
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";



export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({
    where: {
      id: params.id,
    },
    select: {
      price: true,
      images: true,
      description: true,
      name: true,
      id: true,
      category: true,
      shippingInfo: true,
      variants: true,
  }});
  if (!product) {
    notFound();
  }

  const images = product.images.map((image) => ({
    id: product.id,
    url: image,
    alt: product.name,
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ProductGallery images={images} />
        <ProductInfo product={product} />
      </div>
    </div>
  );
}