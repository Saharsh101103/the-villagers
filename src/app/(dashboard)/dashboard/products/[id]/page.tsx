import prisma from "@//lib/db";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import { EditForm } from "@/components/dashboard/EditForm";

async function getData(productId: string) {
 const data = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      variants: true
    },
  });
  

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function EditRoute({
  params,
}: {
  params: { id: string };
}) {
  noStore();
  const data = await getData(params.id);
  const transformedData = {
    ...data,
    color: data.variants.length > 0 ? data.variants[0].color[0] : "", // Pick the first color
    size: data.variants.length > 0 ? data.variants[0].size[0] : "",   // Pick the first size
    stock: data.variants.reduce((sum, variant) => sum + variant.stock, 0), // Sum up the stock
  };

  return <EditForm data={transformedData} />;
}