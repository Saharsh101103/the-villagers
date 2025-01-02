"use client";

import { Input } from "@/components/ui/input";
import { VariantFieldProps } from "../../../types";

export function VariantField({ name, value, onChange, error, placeholder }: VariantFieldProps) {
  const isString = typeof value === "string";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isString) {
      // Remove all non-alphabetic characters
      const processedValue = e.target.value.replace(/[^a-zA-Z]/g, "").toLowerCase();
      onChange(processedValue); // Update with the processed value
    } else {
      const numberValue = parseInt(e.target.value, 10);
      onChange(isNaN(numberValue) ? 0 : numberValue);
    }
  };

  return (
    <div className="w-full">
      <Input
        name={name}
        value={isString ? value.replace(/[^a-zA-Z]/g, "").toLowerCase() : value}
        onChange={handleChange}
        type={isString ? "text" : "number"}
        placeholder={placeholder}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
