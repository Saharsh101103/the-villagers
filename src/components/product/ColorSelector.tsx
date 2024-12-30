"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface ColorSelectorProps {
  colors: string[];
  defaultColor?: string;
  onColorChange?: (color: string) => void;
}

export function ColorSelector({ colors, defaultColor, onColorChange }: ColorSelectorProps) {
  return (
    <div className="space-y-2">
      <h3 className="font-medium">Color</h3>
      <RadioGroup 
        defaultValue={defaultColor || colors[0]} 
        onValueChange={onColorChange}
        className="flex gap-2"
      >
        {colors.map((color) => (
          <div key={color} className="flex items-center space-x-2">
            <RadioGroupItem value={color} id={color} />
            <Label htmlFor={color} className="capitalize">{color}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}