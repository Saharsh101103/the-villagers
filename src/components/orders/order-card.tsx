'use client';

import { OrderWithAddress } from "../../../types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { OrderStatusBadge } from "./order-status-badge";
import { formatDistance } from "date-fns";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface OrderCardProps {
  order: OrderWithAddress;
}

export function OrderCard({ order }: OrderCardProps) {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex flex-col space-y-1">
          <p className="text-sm font-medium">Order #{order.id.slice(0, 8)}</p>
          <p className="text-xs text-muted-foreground">
            {formatDistance(new Date(order.createdAt), new Date(), { addSuffix: true })}
          </p>
        </div>
        <OrderStatusBadge status={order.status} />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Amount</span>
            <span className={cn("text-sm", order.status === "cancelled" ? "text-red-500" : "text-green-500")}>₹{(order.amount / 100).toFixed(2)}</span>
          </div>
          {order.shippingAddress && (
            <div className="flex items-start space-x-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mt-0.5" />
              <p className="line-clamp-2">
                {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}