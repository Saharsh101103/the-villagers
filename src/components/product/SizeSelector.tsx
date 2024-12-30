"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface SizeSelectorProps {
  sizes: string[];
  defaultSize?: string;
  onSizeChange?: (size: string) => void;
}

export function SizeSelector({ sizes, defaultSize, onSizeChange }: SizeSelectorProps) {
  return (
    <div className="space-y-2">
      <h3 className="font-medium">Size</h3>
      <RadioGroup 
        defaultValue={defaultSize || sizes[0]} 
        onValueChange={onSizeChange}
        className="flex flex-wrap gap-2"
      >
        {sizes.map((size) => (
          <div key={size} className="flex items-center">
            <RadioGroupItem value={size} id={`size-${size}`} className="peer sr-only" />
            <Label
              htmlFor={`size-${size}`}
              className="px-4 py-2 border rounded-md peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground hover:bg-muted cursor-pointer"
            >
              {size}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}