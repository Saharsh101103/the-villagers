import { ModeToggle } from "@/components/mode-btn";
import AboutUs from "@/components/storefront/AboutUs";
import { CategorySelection } from "@/components/storefront/Categories";
import { HeroSection } from "@/components/storefront/Hero-section";
import { HeroCaraosel } from "@/components/storefront/HeroCarousel";

export default function Home() {
  return (
    <>
      <HeroCaraosel />
      <HeroSection/>
      <CategorySelection/>
      <AboutUs />
    </>
    
  );
}
