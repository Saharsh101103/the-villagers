'use client';

import { useState, useEffect } from 'react';
import { OrderWithAddress, PaginatedResponse } from '../../types';

const ITEMS_PER_PAGE = 10;

export function useOrders(isMobile: boolean = false) {
  const [orders, setOrders] = useState<OrderWithAddress[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);

  const fetchOrders = async (pageNum: number) => {
    try {
      setLoading(true);
      // Replace with your actual API endpoint
      const response = await fetch(`/api/orders?page=${pageNum}&limit=${ITEMS_PER_PAGE}`);
      const data: PaginatedResponse<OrderWithAddress> = await response.json();
      
      if (isMobile) {
        setOrders(prev => [...prev, ...data.data]);
      } else {
        setOrders(data.data);
      }
      
      setHasMore(data.hasMore);
      setTotal(data.total);
    } catch (err) {
      setError('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  useEffect(() => {
    fetchOrders(page);
  }, [page]);

  return {
    orders,
    loading,
    error,
    hasMore,
    total,
    page,
    setPage,
    loadMore,
    pageSize: ITEMS_PER_PAGE,
  };
}