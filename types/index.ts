import { StaticImageData } from "next/image";

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: string;
  }
  
  export interface Category {
    id: string;
    name: string;
    imageUrl: string | StaticImageData;
    url: string
  }
  
  