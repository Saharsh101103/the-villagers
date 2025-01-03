'use client';

import { useState } from 'react';
import { ProfileHeader } from './profile-header';

import { AddressType, User } from '../../../types';
import { Tabs } from '../ui/profile-tabs';
import { OrderHistory } from './order-history';
import { ReviewsList } from './reviews-list';
import { AddressList } from './address-list';


const mockUser: User = {
  id: '1',
  email: 'john.doe@example.com',
  firstName: 'John',
  lastName: 'Doe',
  profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  orders: [
    {
        id: "order-67890",
        status: "shipped",
        amount: 150,
        createdAt: new Date("2025-01-01T10:00:00Z"),
        shippingAddressId: "address-001",
        userId: null
    }
  ],
  reviews: [
    {
        id: "review-111",
        rating: 5,
        comment: "Excellent product!",
        productId: "product-123",

        createdAt: new Date("2025-01-02T12:00:00Z"),
        userId: ''
    }
  ],
  addresses: [
    {
      id: "address-001",

      street: "123 Main St",
      city: "Springfield",
      state: "IL",

      country: "USA",
      type: AddressType.shipping,
      postalCode: '62705',
      userId: ''
    },
    {
      id: "address-002",
      type: AddressType.billing,
      street: "456 Elm St",
      city: "Springfield",
      state: "IL",
      postalCode: "62705",
      country: "USA",
      userId: ''
    }
  ],
  createdAt: new Date(),
};

export function ProfilePage(User : {user: User}) {
  const [activeTab, setActiveTab] = useState('orders');
  return (
    <div className="min-h-screen bg-background w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProfileHeader user={User.user} />
        
        <div className="mt-8">
          <Tabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            tabs={[
              { id: 'orders', label: 'Orders' },
              { id: 'reviews', label: 'Reviews' },
              { id: 'addresses', label: 'Addresses' },
            ]}
          />
          
          <div className="mt-6">
            {activeTab === 'orders' && <OrderHistory orders={User.user.orders} />}
            {activeTab === 'reviews' && <ReviewsList reviews={User.user.reviews} />}
            {activeTab === 'addresses' && <AddressList addresses={User.user.addresses} />}
          </div>
        </div>
      </div>
    </div>
  );
}