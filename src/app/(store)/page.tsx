import { ModeToggle } from "@/components/mode-btn";
import { HeroCaraosel } from "@/components/storefront/HeroCarousel";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-4 overflow-x-hidden mx-auto">
      <HeroCaraosel />
    </main>
  );
}
