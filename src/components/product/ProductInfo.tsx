"use client";

import { useEffect, useState } from "react";
import { MinusIcon, PlusIcon, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";
import { ProductBadges } from "./ProductBadges";
import { ColorSelector } from "./ColorSelector";
import { SizeSelector } from "./SizeSelector";
import { ShippingInfo } from "./ShippingInfo";
import { ProductVariant } from "../../../types";
import { get } from "http";
import { ProductVariantSelector } from "./ProductVariantSelector";

interface ProductInfoProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
    category: string;
    shippingInfo: string;
    variants: ProductVariant[];
  };
}

export function ProductInfo({ product }: ProductInfoProps) {

  function parseStrings(colorStrings: string[]){
    const allColors = colorStrings // Split each string by commas and flatten the arrays
      .map((color) => color.trim()) // Trim whitespace around each color
      .filter(Boolean); // Remove empty strings
    
    // Remove duplicates by converting the array to a Set and back to an array
    return Array.from(new Set(allColors));
  }
  

  const tabs = [
    {
      title: "Description",
      value: "description",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p className="text-muted-foreground">{product.description}</p>
        </div>
      ),
    },
    {
      title: "Shipping",
      value: "shipping",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p className="text-muted-foreground">{product.shippingInfo}</p>
        </div>
      ),
    },
  ];




  return (
    <div className="space-y-6">
      <ProductBadges category={product.category} isNew />

      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-2xl font-bold mt-2">${product.price}</p>
      </div>

      <ProductVariantSelector
        variants={product.variants} parseStrings={parseStrings}/>


      <Button className="w-full" size="lg">
        <ShoppingCart className="mr-2 h-5 w-5" />
        Add to Cart
      </Button>

      <ShippingInfo />

      <Tabs tabs={tabs} contentClassName="h-fit" />
    </div>
  );
}
