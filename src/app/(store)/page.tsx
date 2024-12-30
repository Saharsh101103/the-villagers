import { ModeToggle } from "@/components/mode-btn";
import AboutUs from "@/components/storefront/AboutUs";
import { CategorySelection } from "@/components/storefront/Categories";
import { FeaturedProducts} from "@/components/storefront/FeaturedProducts";
import { HeroSection } from "@/components/storefront/Hero-section";
import { HeroCaraosel } from "@/components/storefront/HeroCarousel";
import { Testimonials } from "@/components/storefront/Testimonials";
import prisma from "@/lib/db";

export default async function Home() {
  const banners = await prisma.banner.findMany();
  const images = banners.map((banner) => banner.imageString);
  return (
    <>
      <HeroCaraosel />
      <HeroSection images={images}/>
      <CategorySelection/>
      <FeaturedProducts/>
      <AboutUs />
      <Testimonials/>
    </>
    
  );
}
