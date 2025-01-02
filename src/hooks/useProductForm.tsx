import { useState, useCallback } from "react";
import { ProductVariant, VariantField, VariantValue } from "../../types";

export function useProductForm(initialVariants: ProductVariant[] = []) {
  const [variants, setVariants] = useState<ProductVariant[]>(
    initialVariants.length > 0
      ? initialVariants
      : [{ color: "", size: "", stock: 0 }]
  );

  const handleVariantChange = useCallback(
    (index: number, field: VariantField, value: VariantValue) => {
      setVariants((prev) => {
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          [field]: value,
        };
        return updated;
      });
    },
    []
  );

  const addVariant = useCallback(() => {
    setVariants((prev) => [...prev, { color: "", size: "", stock: 0 }]);
  }, []);

  const removeVariant = useCallback((index: number) => {
    setVariants((prev) => {
      if (prev.length <= 1) return prev;
      return prev.filter((_, i) => i !== index);
    });
  }, []);

  return {
    variants,
    handleVariantChange,
    addVariant,
    removeVariant,
  };
}
