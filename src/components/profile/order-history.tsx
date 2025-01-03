'use client';


import { motion } from 'framer-motion';
import { Package } from 'lucide-react';
import { Order } from '../../../types';

interface OrderHistoryProps {
  orders: Order[];
}

export function OrderHistory({ orders }: OrderHistoryProps) {
  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="w-12 h-12 mx-auto text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold">No orders yet</h3>
        <p className="text-muted-foreground">When you make a purchase, your orders will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {orders.map((order, index) => (
        <motion.div
          key={order.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-card rounded-lg shadow-sm p-6"
        >
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <h3 className="font-semibold">Order #{order.id}</h3>
              <p className="text-sm text-muted-foreground">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                {order.status}
              </span>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="text-sm text-muted-foreground">
              Total Amount: <span className="font-medium text-foreground">${(order.amount / 100).toFixed(2)}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}