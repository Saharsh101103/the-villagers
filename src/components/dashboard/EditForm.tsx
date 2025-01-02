"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, XIcon } from "lucide-react";
import Link from "next/link";

import { Switch } from "@/components/ui/switch";
import Image from "next/image";

import { categories } from "@/lib/categories";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { createProduct, editProduct } from "@/app/actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { productSchema } from "@/lib/zodSchemas";
import { ProductVariant, type $Enums } from "@prisma/client";
import { SubmitButton } from "../submitButton";
import { FileUpload } from "../ui/file-upload";
import { useUpload } from "@/hooks/use-upload";
import { Loader2 } from "lucide-react"; // Import the loader icon

interface iAppProps {
  data: {
    id: string;
    name: string;
    description: string;
    status: $Enums.ProductStatus;
    price: number;
    images: string[];
    category: $Enums.Category;
    isFeatured: boolean;
    variants: ProductVariant[];
    color: string;
    size: string;
    stock: number;
  };
}
type Variant = {
  color: string;
  size: string;
  stock: number;
};

export function EditForm({ data }: iAppProps) {
  const [images, setImages] = useState<string[]>(data.images);
  const [imageError, setImageError] = useState<string | null>(null); // Error message for invalid file type
  const [lastResult, action] = useFormState(editProduct, undefined);
  const [isUploading, setIsUploading] = useState(false); // Track the upload state
  const newColor = data.variants.map((variant) => variant.color);
  const newSize = data.variants.map((variant) => variant.size);
  const transformedVariants = data.variants.map((variant) => ({
    color: newColor.join(","),
    size: newSize.join(","),
    stock: variant.stock,
  }));
  
  const [productVariants, setProductVariants] = useState<Variant[]>(transformedVariants);
 
  




  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: productSchema });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const handleVariantChange = (index: number, field: string, value: string | number) => {
    const updatedVariants = [...productVariants];
    updatedVariants[index] = { ...updatedVariants[index], [field]: value };
    setProductVariants(updatedVariants);
  };

  const handleAddVariant = () => {
    setProductVariants([
      ...productVariants,
      { color: "", size: "", stock: 0 },
    ]);
  };

  const handleDelete = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const { upload, error } = useUpload({
    type: "product",
    productId: data.id,
  });

  // Handle file upload with image validation
  const handleUpload = async (files: File[]) => {
    const validFiles: File[] = [];
    // Check each file to see if it's an image
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith("image/")) {
        setImageError("Please upload only image files.");
        return; // Stop processing if any file is not an image
      } else {
        validFiles.push(file);
      }
    }

    setImageError(null); // Clear any previous error

    try {
      setIsUploading(true); // Set uploading state to true
      const results = await upload(validFiles); // Handle file upload
      setImages(results.map((r) => r)); // Update the images after upload
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false); // Reset uploading state when done
    }
  };


  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action}>
      <input type="hidden" name="productId" value={data.id} />
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/products">
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold tracking-tight">Edit Product</h1>
      </div>

      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
          <CardDescription>
            In this form, you can update your product.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <Label>Name</Label>
              <Input
                type="text"
                key={fields.name.key}
                name={fields.name.name}
                defaultValue={data.name}
                className="w-full"
                placeholder="Product Name"
              />
              <p className="text-red-500">{fields.name.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Description</Label>
              <Textarea
                key={fields.description.key}
                name={fields.description.name}
                defaultValue={data.description}
                placeholder="Write your description right here..."
              />
              <p className="text-red-500">{fields.description.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Price</Label>
              <Input
                key={fields.price.key}
                name={fields.price.name}
                defaultValue={data.price}
                type="number"
                placeholder="₹55"
              />
              <p className="text-red-500">{fields.price.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Featured Product</Label>
              <Switch
                key={fields.isFeatured.key}
                name={fields.isFeatured.name}
                defaultChecked={data.isFeatured}
              />
              <p className="text-red-500">{fields.isFeatured.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Status</Label>
              <Select
                key={fields.status.key}
                name={fields.status.name}
                defaultValue={data.status}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-red-500">{fields.status.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Category</Label>
              <Select
                key={fields.category.key}
                name={fields.category.name}
                defaultValue={data.category}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-red-500">{fields.category.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Images</Label>
              <input
                type="hidden"
                value={images}
                key={fields.images.key}
                name={fields.images.name}
                defaultValue={fields.images.initialValue as any}
              />
              
              {isUploading ? (
                <div className="flex justify-center items-center h-96">
                  <Loader2 className="animate-spin text-gray-500 w-10 h-10" />
                </div>
              ) : images.length > 0 ? (
                <div className="grid grid-cols-2 md:flex gap-5">
                  {images.map((image, index) => (
                    <div key={index} className="relative w-[100px] h-[100px]">
                      <Image
                        height={100}
                        width={100}
                        src={image}
                        alt="Product Image"
                        className="w-full h-full object-cover rounded-lg border"
                      />
                      <button
                        onClick={() => handleDelete(index)}
                        type="button"
                        className="absolute -top-3 -right-3 bg-red-500 p-2 rounded-lg text-white"
                      >
                        <XIcon className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
                  <FileUpload maxFiles={5} onChange={handleUpload} />
                </div>
              )}

              {/* Display error if there are non-image files */}
              {imageError && <p className="text-red-500">{imageError}</p>}

              <p className="text-red-500">{fields.images.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Product Variants</Label>
              {data.variants.map((variant, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-full">
                  <Input
                  name={`variants[${index}].color`}
                  key={fields.variants.getFieldList().at(index)?.getFieldset().color.key}
                    value={variant.color}
                    onChange={(e) =>
                      handleVariantChange(index, "color", e.target.value)
                    }
                    placeholder="Color"
                    disabled
                  />
              <p className="text-red-500">{fields.variants.getFieldList().at(index)?.getFieldset().color.errors}</p>
                  </div>
                  <div className="w-full">
                  <Input
                    value={variant.size}
                    name={`variants[${index}].size`}
                    key={fields.variants.getFieldList().at(index)?.getFieldset().size.key}
                    onChange={(e) =>
                      handleVariantChange(index, "size", e.target.value)
                    }
                    placeholder="Size"
                    disabled
                  />
              <p className="text-red-500">{fields.variants.getFieldList().at(index)?.getFieldset().size.errors}</p>

                  </div>
                  <div className="w-full">

                  <Input
                    type="number"
                    name={`variants[${index}].stock`}
                    key={fields.variants.getFieldList().at(index)?.getFieldset().stock.key}
                    value={variant.stock}
                    onChange={(e) =>
                      handleVariantChange(index, "stock", +e.target.value)
                    }
                    placeholder="Stock"
                    disabled
                  />
              <p className="text-red-500">{fields.variants.getFieldList().at(index)?.getFieldset().stock.errors}</p>

                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton text="Edit Product" />
        </CardFooter>
      </Card>
    </form>
  );
}
