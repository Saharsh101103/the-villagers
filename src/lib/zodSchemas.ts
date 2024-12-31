import { z } from "zod";

export const productSchema = z.object({
  name: z.string(),
  description: z.string(),
  status: z.enum(["draft", "published", "archived"]),
  price: z.number().min(1),
  images: z.array(z.string()).min(1, "At least one image is required"),
  category: z.enum(["men", "women", "kids"]),
  isFeatured: z.boolean().optional(),
  color: z.array(z.string()).min(1, "At least one color is required"), // Color options for the variant
  size: z.array(z.string()).min(1, "At least one size is required"), // Size options for the variant
  stock: z.number().min(0, "Stock cannot be negative"), // Available stock for this variant
});

export const bannerSchema = z.object({
  title: z.string(),
  imageString: z.string(),
});