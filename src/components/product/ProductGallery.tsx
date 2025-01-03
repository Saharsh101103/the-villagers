"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: {
    id: string;
    url: string;
    alt: string;
  }[];
  };


export function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="flex gap-4">
      <div className="flex w-1/5 flex-col gap-4">
        {images.map((image) => (
          <button
            key={image.id}
            onClick={() => setSelectedImage(image)}
            className={`relative aspect-square w-full overflow-hidden rounded-lg transition-all hover:opacity-80 ${
              selectedImage.id === image.id ? "ring-2 ring-primary" : ""
            }`}
          >
            <Image
              src={image.url}
              alt={image.alt}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
      {/* Main large image */}
      <div className="relative aspect-square w-4/5 overflow-hidden rounded-lg">
        <Image
          src={selectedImage.url}
          alt={selectedImage.alt}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Thumbnail images */}
      
    </div>
  );
}