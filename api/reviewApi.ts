/**
 * Review API
 * Kết nối UI với Mock Database Store cho Đánh giá & Nhận xét
 */

import { db } from '../data/store';
import { Review } from '../types/common';

export const getReviewsByFoodIdApi = async (foodId: string): Promise<Review[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return db.getReviewsByFoodId(foodId);
};

export const submitReviewApi = async (review: Omit<Review, 'id' | 'date'>): Promise<Review> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const newReview: Review = {
    ...review,
    id: `rv-${Date.now()}`,
    date: new Date().toISOString(),
  };
  
  return db.addReview(newReview);
};