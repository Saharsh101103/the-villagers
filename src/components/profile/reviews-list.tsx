'use client';


import { motion } from 'framer-motion';
import { MessageSquare, Star } from 'lucide-react';
import { Review } from '../../../types';

interface ReviewsListProps {
  reviews: Review[];
}

export function ReviewsList({ reviews }: ReviewsListProps) {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold">No reviews yet</h3>
        <p className="text-muted-foreground">Share your thoughts on products you've purchased.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review, index) => (
        <motion.div
          key={review.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-card rounded-lg shadow-sm p-6"
        >
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          
          {review.comment && (
            <p className="mt-4 text-sm text-muted-foreground">{review.comment}</p>
          )}
          
          <div className="mt-4 text-xs text-muted-foreground">
            Posted on {new Date(review.createdAt).toLocaleDateString()}
          </div>
        </motion.div>
      ))}
    </div>
  );
}