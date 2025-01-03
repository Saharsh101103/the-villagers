import Image from "next/image";
import Link from "next/link";
import all from "../../../public/all.jpg";
import men from "../../../public/men.jpg";
import women from "../../../public/women.jpg";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Category } from "../../../types";

const categories: Category[] = [
  { id: "1", name: "All Products", imageUrl: all, url: "/products/all" },
  { id: "2", name: "Men", imageUrl: men, url: "/products/men" },
  { id: "3", name: "Women", imageUrl: women, url: "/products/women" },
]
export function CategorySelection() {
  return (
      <div className="mx-auto w-full px-8">
        <h2 className="text-4xl font-bold mb-12 text-center">Explore Our Categories</h2>
        <div className="grid grid-cols-6 grid-rows-2 gap-4 h-[600px]">
          {categories.map((category, index) => (
            <Card 
              key={category.id} 
              className={`overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl ${
                index === 0 ? 'col-span-4 row-span-2' :
                index === 1 ? 'col-span-2 row-span-1' :
                'col-span-2 row-span-1'
              }`}
            >
              <Link href={category.url}>
              <CardContent className="p-0 h-full relative group">
                <Image 
                  src={category.imageUrl} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  fill
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                  <div className="text-foreground">
                    <h3 className="text-2xl font-semibold mb-2">{category.name}</h3>
                    <Button 
                      variant="default" 
                      className=" transition-all duration-300 hover:scale-125"
                      >
                      <p className="hidden md:block">
                        Explore
                      </p>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
                      </Link>
            </Card>
          ))}
        </div>
        <Link className="mt-12 text-center block" href={"/products/all"}>
          <Button size="lg" variant={"outline"}>
            Browse All Products
            <ArrowRight className="ml-1 h-5 w-5" />
          </Button>
        </Link>
      </div>
  )
}