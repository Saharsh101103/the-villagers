'use client';

import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useOrders } from '@/hooks/use-order';
import { OrderCard } from '@/components/orders/order-card';
import { OrdersPagination } from '@/components/orders/order-pagination';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';

export default function OrdersPage() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const {
    orders,
    loading,
    error,
    hasMore,
    total,
    page,
    setPage,
    loadMore,
    pageSize,
  } = useOrders(isMobile);

  const observerTarget = useRef(null);

  useEffect(() => {
    if (!isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [isMobile, hasMore, loadMore]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <p className="text-destructive">Failed to load orders. Please try again later.</p>
      </div>
    );
  }

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
      
      <ScrollArea className="h-[calc(100vh-12rem)]">
        <div className="grid gap-4 md:gap-6">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
          
          {loading && (
            <>
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="w-full h-[200px] rounded-lg" />
              ))}
            </>
          )}
          
          {isMobile && hasMore && (
            <div ref={observerTarget} className="h-8" />
          )}
        </div>
      </ScrollArea>

      {!isMobile && totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <OrdersPagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
}