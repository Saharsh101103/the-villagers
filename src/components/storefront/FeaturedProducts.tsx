import prisma from "@/lib/db";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { AspectRatio } from "../ui/aspect-ratio";

export async function FeaturedProducts() {
  const features = await prisma.product.findMany({
    where: {isFeatured: true},
  })
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 my-8 max-w-7xl mx-auto">
      <h2 className="text-center text-3xl font-bold md:text-4xl my-auto">
        Featured Products
      </h2>
      {features.map((feature, index) => (
        <Feature
            key={feature.id}
            title={feature.name}
            link={`/product/${feature.id}`}
            category={feature.category}
            thumbnail={feature.images[0]}
            price={feature.price.toString()}
            index={index}
        />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  link,
  category,
  index,
  thumbnail,
  price,
}: {
  title: string;
  link: string;
  category: string;
  index: number;
  thumbnail: string;
  price: string;
}) => {
  return (
    <Link href={link}
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
      <AspectRatio ratio={16 / 9}>
        <Image src={thumbnail} alt={title} fill className="rounded-md object-cover"/>
        </AspectRatio>
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <h2 className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </h2>
        <h3 className="group-hover/feature:translate-x-2 transition duration-200 block text-muted-foreground text-xs">
          {category.toUpperCase()}
        </h3>
        
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
       ₹{price}
      </p>
    </Link>
  );
};
