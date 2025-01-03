"use client";

import { useState } from "react";
import Image from "next/image";



export function ProductGallery({ images }: { images: { id: string; url: string; alt: string }[] }) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-lg">
        <Image
          src={selectedImage.url}
          alt={selectedImage.alt}
          fill
          className="object-cover"
          priority
        />
        

      </div>
      <div className="grid grid-cols-3 gap-4">
        {images.map((image) => (
          <button
            key={image.id}
            onClick={() => setSelectedImage(image)}
            className={`relative aspect-square overflow-hidden rounded-lg ${
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
    </div>
  );
}