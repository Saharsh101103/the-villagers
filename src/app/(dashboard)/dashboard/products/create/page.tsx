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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, Loader2, XIcon } from "lucide-react";
import Link from "next/link";
import { useFormState } from "react-dom";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { productSchema } from "@/lib/zodSchemas";
import { useState, useEffect } from "react";
import Image from "next/image";
import { categories } from "@/lib/categories";
import { createProduct } from "@/app/actions";
import { SubmitButton } from "@/components/submitButton";
import { useUpload } from "@/hooks/use-upload";
import { FileUpload } from "@/components/ui/file-upload";
import { VariantForm } from "@/components/dashboard/VariantForm";
import { useProductForm } from "@/hooks/useProductForm";


export default function ProductCreateRoute() {
  const [images, setImages] = useState<string[]>([]);
  const [imageError, setImageError] = useState<string | null>(null);
  const [lastResult, action] = useFormState(createProduct, undefined);
  const [isUploading, setIsUploading] = useState(false);

  
  const {
    variants: productVariants,
    handleVariantChange,
    addVariant,
    removeVariant,
  } = useProductForm();

  const [form, fields] = useForm({
    lastResult,
    defaultValue: {
      variants: productVariants,
    },
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: productSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  useEffect(() => {
    const formData = new FormData();
    productVariants.forEach((variant, index) => {
      variant.color.forEach((color) => {
        formData.append(`variants[${index}].color[]`, color);
      });
      variant.size.forEach((size) => {
        formData.append(`variants[${index}].size[]`, size);
      });
      formData.append(`variants[${index}].stock`, variant.stock.toString());
    });
    const plainObject: any = {};
    formData.forEach((value, key) => {
      plainObject[key] = value;
    });
    form.update(plainObject);
  }, [productVariants, form]);

  const handleDelete = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const { upload, error } = useUpload({
    type: "product",
    productId: "your-product-id",
  });

  const handleUpload = async (files: File[]) => {
    const validFiles: File[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith("image/")) {
        setImageError("Please upload only image files.");
        return;
      } else {
        validFiles.push(file);
      }
    }

    setImageError(null);

    try {
      setIsUploading(true);
      const results = await upload(validFiles);
      setImages(results.map((r) => r));
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };
  
  console.log(form.value?.variants)
  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action}>
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/products">
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold tracking-tight">New Product</h1>
      </div>

      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
          <CardDescription>
            In this form, you can create your product.
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
                defaultValue={fields.name.initialValue}
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
                defaultValue={fields.description.initialValue}
                placeholder="Write your description right here..."
              />
              <p className="text-red-500">{fields.description.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Price</Label>
              <Input
                key={fields.price.key}
                name={fields.price.name}
                defaultValue={fields.price.initialValue}
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
                defaultValue={fields.isFeatured.initialValue}
              />
              <p className="text-red-500">{fields.isFeatured.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Status</Label>
              <Select
                key={fields.status.key}
                name={fields.status.name}
                defaultValue={fields.status.initialValue}
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
                defaultValue={fields.category.initialValue}
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
                <div className="flex gap-5">
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

              {imageError && <p className="text-red-500">{imageError}</p>}
              <p className="text-red-500">{fields.images.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Product Variants</Label>
              <div className="space-y-4">
                {productVariants.map((variant, index) => (
                  <VariantForm
                    key={index}
                    variant={variant}
                    index={index}
                    variantFields={fields.variants.getFieldList()[index]?.getFieldset()}
                    onVariantChange={handleVariantChange}
                    onRemoveVariant={removeVariant}
                    isRemoveDisabled={productVariants.length === 1}
                  />
                ))}
              </div>
              
              <Button
                type="button"
                variant="outline"
                onClick={addVariant}
                className="mt-2"
              >
                Add Variant
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton text="Create Product" />
        </CardFooter>
      </Card>
    </form>
  );
}