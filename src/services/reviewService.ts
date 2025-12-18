
import { Review } from '../types';
import { reviewApi } from '../api/reviewApi';

export const reviewService = {
  getReviewsByFoodId: (foodId: string): Review[] => {
    const all = reviewApi.getAll();
    return all.filter(r => r.foodId === foodId);
  },

  getRatingStats: (reviews: Review[]) => {
    if (reviews.length === 0) return {
      average: 0,
      count: 0,
      distribution: [
        { stars: 5, count: 0, percentage: 0 },
        { stars: 4, count: 0, percentage: 0 },
        { stars: 3, count: 0, percentage: 0 },
        { stars: 2, count: 0, percentage: 0 },
        { stars: 1, count: 0, percentage: 0 },
      ]
    };

    const total = reviews.length;
    const sum = reviews.reduce((s, r) => s + r.rating, 0);
    const average = (sum / total).toFixed(1);

    const distribution = [5, 4, 3, 2, 1].map(star => {
      const count = reviews.filter(r => r.rating === star).length;
      return {
        stars: star,
        count: count,
        percentage: Math.round((count / total) * 100)
      };
    });

    return {
      average,
      count: total,
      distribution
    };
  }
};
