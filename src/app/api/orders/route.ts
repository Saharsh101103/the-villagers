import { NextRequest, NextResponse } from 'next/server';
import { paginateData } from '@/lib/utils';
import prisma from '@/lib/db';

//mocked
const dummyOrders = Array.from({ length: 50 }, (_, index) => ({
    id: `order-${index + 1}`,
    status: ['pending', 'shipped', 'delivered', 'cancelled'][Math.floor(Math.random() * 4)],
    amount: Math.floor(Math.random() * 50000) + 1000, // Random amount between 10 and 500 dollars (in cents)
    userId: `user-${Math.floor(Math.random() * 10) + 1}`,
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000), // Random date within last 30 days
    shippingAddressId: `addr-${Math.floor(Math.random() * 10) + 1}`,
    shippingAddress: {
      id: `addr-${Math.floor(Math.random() * 10) + 1}`,
      street: `${Math.floor(Math.random() * 1000) + 1} Main St`,
      city: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'][Math.floor(Math.random() * 5)],
      state: ['NY', 'CA', 'IL', 'TX', 'AZ'][Math.floor(Math.random() * 5)],
      country: 'USA',
      zipCode: String(10000 + Math.floor(Math.random() * 90000)),
    },
  }));

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const orders = await prisma.order.findMany()
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    //mocked
    const paginatedOrders = paginateData(dummyOrders, page, limit);

    return NextResponse.json(paginatedOrders);
  } catch (error) {
    return NextResponse.json(
      { error: JSON.stringify(error) },
      { status: 500 }
    );
  }
}