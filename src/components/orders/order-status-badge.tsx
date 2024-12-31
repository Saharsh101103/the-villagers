'use client';

import { Badge } from "@/components/ui/badge";

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  shipped: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  delivered: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
};

interface OrderStatusBadgeProps {
  status: string;
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const style = statusStyles[status as keyof typeof statusStyles] || statusStyles.pending;
  
  return (
    <Badge className={style}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}