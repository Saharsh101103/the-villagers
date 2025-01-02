import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ColorSelector } from "./ColorSelector";
import { SizeSelector } from "./SizeSelector";
import { MinusIcon, PlusIcon } from "lucide-react";
import { ProductVariant } from "../../../types";
import { cn } from "@/lib/utils";

interface Variant {
  color: string;  // Updated from string[] to string
  size: string;   // Updated from string[] to string
  stock: number;
}

interface ProductVariantProps {
  variants: Variant[];
  parseStrings: (strings: string[]) => string[];
}

export function ProductVariantSelector({ variants, parseStrings }: ProductVariantProps) {
  // Initialize selectedColor and selectedSize based on the first variant
  const [selectedColor, setSelectedColor] = useState<string>(() => variants[0].color);
  const [selectedSize, setSelectedSize] = useState<string | null>(() => variants[0].size || null);
  const [quantity, setQuantity] = useState<number>(1);

  // Function to calculate stock for the selected color and size
  function getStockForSelection(color: string | null, size: string | null): number {
    if (!color || !size) return 0;

    let totalStock = 0;
    variants.forEach((variant) => {
      if (variant.color === color && variant.size === size) {
        totalStock += variant.stock;
      }
    });

    return totalStock;
  }

  function getAvailableOptions(
    variants: ProductVariant[],
    input: string | null,
    type: "color" | "size"
  ): string[] {
    if (!input) return []; // Return an empty array if input is null

    const options = new Set<string>();
    variants.forEach((variant) => {
      if (type === "color" && variant.color === input) {
        options.add(variant.size);
      }

      if (type === "size" && variant.size === input) {
        options.add(variant.color);
      }
    });

    return Array.from(options);
  }

  const colors = parseStrings(variants.map((variant) => variant.color)); // Assuming parseStrings works with single strings
  const sizes = parseStrings(variants.map((variant) => variant.size)); // Same for sizes

  const availableSizes = selectedColor
    ? getAvailableOptions(variants, selectedColor, "color")
    : sizes;

  const stockForSelection = getStockForSelection(selectedColor, selectedSize);

  useEffect(() => {
    if (selectedColor) {
      const availableForColor = getAvailableOptions(variants, selectedColor, "color");
      if (!availableForColor.includes(selectedSize || "")) {
        setSelectedSize(null);
      }
    }
  }, [selectedColor, selectedSize, variants]);
  console.log("selectedColor", selectedColor);
  console.log("selectedSize", selectedSize);
  console.log("quantity", quantity);
  console.log("stockForSelection", stockForSelection);
  console.log("colors", colors);
  console.log("sizes", sizes);
  console.log("availableSizes", availableSizes);
  console.log("variants", variants);
  

  return (
    <div className="space-y-6">
      <ColorSelector
        colors={colors}
        availableColors={colors}
        onColorChange={setSelectedColor}
      />
      <SizeSelector
        sizes={sizes}
        availableSizes={availableSizes}
        onSizeChange={setSelectedSize}
      />
      <div>
        <h3 className={cn(stockForSelection === 0 ? "font-medium mb-2 text-destructive" : stockForSelection === 1 ? "font-medium mb-2 text-yellow-500" : "font-medium mb-2 text-green-500")}>
          {stockForSelection > 0
            ? stockForSelection < 11 && stockForSelection > 1
              ? `Hurry up! Only ${stockForSelection} units remaining`
              : stockForSelection == 1
              ? "Only last piece remaining"
              : `In Stock`
            : "Out of Stock"}
        </h3>
      </div>
      <div>
        <h3 className="font-medium mb-2">Quantity</h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
          >
            <MinusIcon className="h-4 w-4" />
          </Button>
          <span className="w-12 text-center">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(quantity + 1)}
            disabled={quantity >= stockForSelection}
          >
            <PlusIcon className="h-4 w-4 " />
          </Button>
        </div>
      </div>
    </div>
  );
}
