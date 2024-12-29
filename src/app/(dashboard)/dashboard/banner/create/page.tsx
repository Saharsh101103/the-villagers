"use client";

import { createBanner } from "@/app/actions";
import { bannerSchema } from "@/lib/zodSchemas";
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
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useFormState } from "react-dom";
import { SubmitButton } from "@/components/submitButton";
import { FileUpload } from "@/components/ui/file-upload";
import { useUpload } from "@/hooks/use-upload";
import { Loader2 } from "lucide-react"; // Import the loader icon

export default function BannerRoute() {
  const [image, setImages] = useState<string | undefined>(undefined);
  const [imageError, setImageError] = useState<string | null>(null); // State for image error
  const [lastResult, action] = useFormState(createBanner, undefined);

  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: bannerSchema });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  // Handle file upload with image validation
  const handleUpload = async (files: File[]) => {
    const file = files[0];

    // Check if the file is an image
    if (!file.type.startsWith("image/")) {
      setImageError("Please upload a valid image file."); // Set error message if not an image
      return;
    }

    setImageError(null); // Clear the error if the file is valid image

    try {
      const result = await upload([file]);
      setImages(result[0]);
    } catch (err) {
      console.error(err);
    }
  };

  const { upload, isUploading, error } = useUpload({
    type: "banner",
  });

  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action}>
      <div className="flex items-center gap-x-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/products">
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold tracking-tight">New Banner</h1>
      </div>

      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Banner Details</CardTitle>
          <CardDescription>Create your banner right here</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-y-6">
            <div className="flex flex-col gap-3">
              <Label>Name</Label>
              <Input
                name={fields.title.name}
                key={fields.title.key}
                defaultValue={fields.title.initialValue}
                type="text"
                placeholder="Create title for Banner"
              />
              <p className="text-red-500">{fields.title.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Image</Label>
              <input
                type="hidden"
                value={image}
                key={fields.imageString.key}
                name={fields.imageString.name}
                defaultValue={fields.imageString.initialValue}
              />
              {isUploading ? (
                <div className="flex justify-center items-center h-96">
                  <Loader2 className="animate-spin text-gray-500 w-10 h-10" />
                </div>
              ) : image !== undefined ? (
                <Image
                  src={image}
                  alt="Product Image"
                  width={200}
                  height={200}
                  className="w-[200px] h-[200px] object-cover border rounded-lg"
                />
              ) : (
                <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
                  <FileUpload maxFiles={1} onChange={handleUpload} />
                </div>
              )}

              {/* Display image error if any */}
              {imageError && <p className="text-red-500">{imageError}</p>}

              <p className="text-red-500">{fields.imageString.errors}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton text="Create Banner" />
        </CardFooter>
      </Card>
    </form>
  );
}
