"use client";

import { Input } from "@/components/ui/input";
import { VariantFieldProps } from "../../../types";
import { useState } from "react";


export function VariantField({ name, value, onChange, error, placeholder }: VariantFieldProps) {
  const isArray = Array.isArray(value);
  const actualValue = isArray ? value.join(", ") : value;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isArray) {
      const values = e.target.value.split(",").map((v) => v.trim()).filter(Boolean);
      console.log("values",values)
      onChange(values);
    } else {
      const numberValue = parseInt(e.target.value, 10);
      onChange(isNaN(numberValue) ? 0 : numberValue);
    }
  };
  
  

  return (
    <div className="w-full">
      <Input
        name={name}
        value={actualValue}
        onChange={handleChange}
        type={isArray ? "text" : "number"}
        placeholder={placeholder}
        disabled
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}