import { Navbar } from "@/components/storefront/Navbar";
import { div } from "framer-motion/client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Villagers",
  description: "An ecommerce store",
};

export default function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="sticky top-0 h-16 z-20 border-b  px-4  md:px-56 my-auto flex flex-col justify-center bg-background opacity-90">
        <Navbar />
      </header>
      <main className="flex min-h-screen flex-col items-center justify-between py-4 overflow-x-hidden mx-auto">{children}</main>
    </>
  );
}
