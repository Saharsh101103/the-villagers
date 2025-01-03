import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req : Request){
  try {
        const products = await prisma.product.findMany({
    where: {
      status: "published",
    },
    
  });
  return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json(error)
  }
}