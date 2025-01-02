import { z } from "zod";

export const productSchema = z.object({
  name: z.string(),
  description: z.string(),
  status: z.enum(["draft", "published", "archived"]),
  price: z.number().min(1),
  images: z.array(z.string()).min(1, "At least one image is required"),
  category: z.enum(["men", "women", "kids"]),
  isFeatured: z.boolean().optional(),
  variants: z.array(z.object({
    color: z.string(),
    size: z.string(),
    stock: z.number().min(0, "Stock cannot be negative"),
  })).min(1, "At least one variant is required"),
});


export const bannerSchema = z.object({
  title: z.string(),
  imageString: z.string(),
});

export type ProductFormData = z.infer<typeof productSchema>;