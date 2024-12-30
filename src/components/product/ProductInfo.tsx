"use client";

import { useState } from "react";
import { MinusIcon, PlusIcon, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs} from "@/components/ui/tabs";
import { ProductBadges } from "./ProductBadges";
import { ColorSelector } from "./ColorSelector";
import { SizeSelector } from "./SizeSelector";
import { ShippingInfo } from "./ShippingInfo";


interface ProductInfoProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
    category: string;
  };
}

export function ProductInfo({ product }: ProductInfoProps) {
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
              <p className="text-muted-foreground">{product.description}</p>
              
            </div>
          ),
        },
      ];
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="space-y-6">
      <ProductBadges category={product.category} isNew />

      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-2xl font-bold mt-2">${product.price}</p>
      </div>

      <div className="space-y-6">
        <ColorSelector colors={["red", "green", "blue"]} />
        <SizeSelector sizes={["s","m","l"]} />

        <div>
          <h3 className="font-medium mb-2">Quantity</h3>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <MinusIcon className="h-4 w-4" />
            </Button>
            <span className="w-12 text-center">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(quantity + 1)}
            >
              <PlusIcon className="h-4 w-4 " />
            </Button>
          </div>
        </div>
      </div>

      <Button className="w-full" size="lg">
        <ShoppingCart className="mr-2 h-5 w-5" />
        Add to Cart
      </Button>

      <ShippingInfo />

      <Tabs tabs={tabs} contentClassName="h-fit"/>
    </div>
  );
}
