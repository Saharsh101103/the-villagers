"use client";

import Image from "next/image";
import { ShoppingCart, Heart, Share2 } from "lucide-react";
import { Badge } from "../ui/badge";
import { Product} from "../../../types";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-us', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };




  return (
    <div className="group relative rounded-lg border bg-card p-4 transition-all hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden rounded-md">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {product.isFeatured && (
          <Badge className="absolute left-2 top-2">Featured</Badge>
        )}
   
      </div>

      <div className="mt-4 space-y-2">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold">{formatPrice(product.price)}</p>

        </div>
        <Button
          className="w-full"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          View Product
        </Button>
      </div>
    </div>
  );
}

export function LoadingProductCard() {
    return (
      <div className="flex flex-col">
        <Skeleton className="w-full h-[330px]" />
        <div className="flex flex-col mt-2 gap-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="w-full h-6" />
        </div>
        <Skeleton className="w-full h-10 mt-5" />
      </div>
    );
  }