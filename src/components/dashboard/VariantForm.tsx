"use client";

import { ProductVariant, VariantField, VariantValue } from "../../../types";
import { VariantField as VariantFieldComponent } from "./VariantField";


interface VariantFormProps {
  variant: ProductVariant;
  index: number;
  variantFields?: {
    color?: { errors?: string[] };
    size?: { errors?: string[] };
    stock?: { errors?: string[] };
  };
  onVariantChange: (index: number, field: VariantField, value: VariantValue) => void;
  onRemoveVariant: (index: number) => void;
  isRemoveDisabled: boolean;
}

export function VariantForm({
  variant,
  index,
  variantFields,
  onVariantChange,
  onRemoveVariant,
  isRemoveDisabled,
}: VariantFormProps) {
  const handleFieldChange = (field: VariantField) => (value: VariantValue) => {
    onVariantChange(index, field, value);
  };

  return (
    <div className="flex gap-4 items-start">
      <VariantFieldComponent
        name={`variants[${index}].color`}
        value={variant.color}
        onChange={handleFieldChange("color")}
        error={variantFields?.color?.errors?.join(", ")}
        placeholder="Colors (comma-separated)"
      />
      
      <VariantFieldComponent
        name={`variants[${index}].size`}
        value={variant.size}
        onChange={handleFieldChange("size")}
        error={variantFields?.size?.errors?.join(", ")}
        placeholder="Sizes (comma-separated)"
      />
      
      <VariantFieldComponent
        name={`variants[${index}].stock`}
        value={variant.stock}
        onChange={handleFieldChange("stock")}
        error={variantFields?.stock?.errors?.join(", ")}
        placeholder="Stock"
      />
    </div>
  );
}