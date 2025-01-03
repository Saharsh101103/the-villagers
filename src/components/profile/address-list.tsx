'use client';


import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { Address } from '../../../types';


interface AddressListProps {
  addresses: Address[];
}

export function AddressList({ addresses }: AddressListProps) {
  if (addresses.length === 0) {
    return (
      <div className="text-center py-12">
        <MapPin className="w-12 h-12 mx-auto text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold">No addresses saved</h3>
        <p className="text-muted-foreground">Add a shipping or billing address to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {addresses.map((address, index) => (
        <motion.div
          key={address.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-card rounded-lg shadow-sm p-6"
        >
          <div className="flex justify-between items-start">
            <div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                {address.type}
              </span>
            </div>
          </div>
          
          <div className="mt-4 space-y-2">
            <p className="text-sm">{address.street}</p>
            <p className="text-sm">
              {address.city}, {address.state} {address.zipCode}
            </p>
            <p className="text-sm">{address.country}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}