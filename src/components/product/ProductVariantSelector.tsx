import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ColorSelector } from "./ColorSelector";
import { SizeSelector } from "./SizeSelector";
import { MinusIcon, PlusIcon } from "lucide-react";
import { ProductVariant } from "../../../types";
import { cn } from "@/lib/utils";
import { color } from "framer-motion";

interface Variant {
  color: string[];
  size: string[];
  stock: number;
}

interface ProductVariantProps {
  variants: Variant[];
  parseStrings: (strings: string[]) => string[];
}

export function ProductVariantSelector({ variants, parseStrings }: ProductVariantProps) {
  const [selectedColor, setSelectedColor] = useState<string>(() => {
    const initialColors = variants[0].color
      .flatMap((colorString) => colorString.split(",").map((color) => color.trim()));
    return initialColors[0];
  });

  const [selectedSize, setSelectedSize] = useState<string | null>(() => {
    const initialSizes = variants[0].size
      .flatMap((sizeString) => sizeString.split(",").map((size) => size.trim()));
    return initialSizes[0] || null;
  });

  const [quantity, setQuantity] = useState<number>(1);

  // Function to calculate stock for the selected color and size
  function getStockForSelection(color: string | null, size: string | null): number {
    if (!color || !size) return 0;

    let totalStock = 0;
    variants.forEach((variant) => {
      const colors = variant.color.flatMap((colorString) =>
        colorString.split(",").map((color) => color.trim())
      );
      const sizes = variant.size.flatMap((sizeString) =>
        sizeString.split(",").map((size) => size.trim())
      );

      if (colors.includes(color) && sizes.includes(size)) {
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
      const colors = variant.color.flatMap((colorString) =>
        colorString.split(",").map((color) => color.trim())
      );
      const sizes = variant.size.flatMap((sizeString) =>
        sizeString.split(",").map((size) => size.trim())
      );

      if (type === "color" && colors.includes(input)) {
        sizes.forEach((size) => options.add(size));
      }

      if (type === "size" && sizes.includes(input)) {
        colors.forEach((color) => options.add(color));
      }
    });

    return Array.from(options);
  }

  const colors = parseStrings(variants.map((variant) => variant.color).flat());
  const sizes = parseStrings(variants.map((variant) => variant.size).flat());


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
  }, [selectedColor, selectedSize, variants, colors]);

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
        <h3 className={cn(stockForSelection === 0 ? "font-medium mb-2 text-destructive" : stockForSelection===1 ? "font-medium mb-2 text-yellow-500" : " font-medium mb-2 text-green-500")}>{stockForSelection > 0
            ? stockForSelection<11 && stockForSelection>1 ?  `Hurry up! Only ${stockForSelection} units remaining` : stockForSelection == 1 ? "Only last piece remaining" :  `In Stock`  
            : "Out of Stock"}</h3>
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
