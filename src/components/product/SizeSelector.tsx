"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface SizeSelectorProps {
  sizes: string[];
  availableSizes: string[];
  defaultSize?: string;
  onSizeChange?: (size: string) => void;
}

export function SizeSelector({ sizes, availableSizes, defaultSize, onSizeChange }: SizeSelectorProps) {
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
            {
              availableSizes.includes(size) ? (
                <RadioGroupItem 
                  value={size} 
                  id={`size-${size}`} 
                  className="peer sr-only" 
                  
                />
              ) : (
                <RadioGroupItem 
                  value={size} 
                  id={`size-${size}`} 
                  className="peer sr-only" 
                  disabled
                />
              )
            }
            <Label
              htmlFor={`size-${size}`}
              className={cn(availableSizes.includes(size) ? "px-4 py-2 border rounded-md peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground hover:bg-muted cursor-pointer" : " px-4 py-2 border rounded-md peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground hover:bg-muted cursor-not-allowed line-through text-destructive")}
            >
              {size.toUpperCase()}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
