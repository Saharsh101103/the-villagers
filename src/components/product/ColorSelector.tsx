"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface ColorSelectorProps {
  colors: string[];
  availableColors: string[];
  defaultColor?: string;
  onColorChange?: (color: string) => void;
}




export function ColorSelector({ colors, availableColors, defaultColor, onColorChange }: ColorSelectorProps) {
  return (
    <div className="space-y-2">
      <h3 className="font-medium">Color</h3>
      <RadioGroup 
        defaultValue={colors[0]}
        onValueChange={onColorChange}
        className="flex gap-2"
      >
        {colors.map((color) => (
          <div key={color} className="flex items-center space-x-2">
            {
              
                <RadioGroupItem 
                  value={color} 
                  id={`color-${color}`} 
                  className="" 
                />
            }
            <Label htmlFor={color} className={cn(availableColors.includes(color) ? "capitalize" : "capitalize line-through text-destructive")}>
              {color}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
