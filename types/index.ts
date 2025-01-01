import { productSchema } from "@/lib/zodSchemas";
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

  export interface Order {
    id: string;
    status: string;
    amount: number;
    userId: string | null;
    createdAt: Date;
    shippingAddressId: string | null;
  }
  
  export interface OrderWithAddress extends Order {
    shippingAddress: {
      id: string;
      street: string;
      city: string;
      state: string;
      country: string;
      zipCode: string;
    } | null;
  }
  
  export interface PaginatedResponse<T> {
    data: T[];
    hasMore: boolean;
    total: number;
    page: number;
    pageSize: number;
  }
  
  export type ProductVariant = {
    color: string[];
    size: string[];
    stock: number;
  };
  

  
  export type VariantField = keyof ProductVariant;
  export type VariantValue = ProductVariant[VariantField];
  
  export interface VariantFieldProps {
    name: string;
    value: string[] | number;
    onChange: (value: string[] | number) => void;
    error?: string;
    placeholder: string;
  }