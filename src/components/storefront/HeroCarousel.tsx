"use client";
import React from "react";
import { HeroParallax } from "../ui/hero-parallax";
import { div } from "framer-motion/client";

export function HeroCaraosel() {
  return <HeroParallax products={products} />;
}

// Mocked
export const products = [
  {
    title: "Rack of Clothes",
    link: "/",
price: "1000.00",
category: "Jackets",
    thumbnail:
      "https://plus.unsplash.com/premium_photo-1664202526559-e21e9c0fb46a?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Woman with bag",
    link: "/",
price: "1000.00",
category: "Jackets",
    thumbnail:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Multiple Women",
    link: "/",
price: "1000.00",
category: "Jackets",
    thumbnail:
      "https://plus.unsplash.com/premium_photo-1683817138481-dcdf64a40859?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },

  {
    title: "Black",
    link: "/",
price: "1000.00",
category: "Jackets",
    thumbnail:
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Good girl",
    link: "/",
price: "1000.00",
category: "Jackets",
    thumbnail:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Kid",
    link: "/",
price: "1000.00",
category: "Jackets",
    thumbnail:
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },

  {
    title: "Wild kid",
    link: "/",
price: "1000.00",
category: "Jackets",
    thumbnail:
      "https://images.unsplash.com/photo-1503341733017-1901578f9f1e?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Patloon",
    link: "/",
price: "1000.00",
category: "Jackets",
    thumbnail:
      "https://plus.unsplash.com/premium_photo-1690338237128-b32fedb44d55?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Shades",
    link: "/",
price: "1000.00",
category: "Jackets",
    thumbnail:
      "https://images.unsplash.com/photo-1502389614483-e475fc34407e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Blonde",
    link: "/",
price: "1000.00",
category: "Jackets",
    thumbnail:
      "https://images.unsplash.com/photo-1503342521957-a6c73074d732?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Beach",
    link: "/",
price: "1000.00",
category: "Jackets",
    thumbnail:
      "https://images.unsplash.com/photo-1564595016712-175004de04ff?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },

  {
    title: "With boot",
    link: "/",
price: "1000.00",
category: "Jackets",
    thumbnail:
      "https://plus.unsplash.com/premium_photo-1701108264364-c6f7d5dd93d1?q=80&w=1918&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "White",
    link: "/",
price: "1000.00",
category: "Jackets",
    thumbnail:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Tomato soup",
    link: "/",
price: "1000.00",
category: "Jackets",
    thumbnail:
      "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Homeless girl",
    link: "/",
price: "1000.00",
category: "Jackets",
    thumbnail:
      "https://images.unsplash.com/photo-1570740566605-49bf22d0d79c?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];
