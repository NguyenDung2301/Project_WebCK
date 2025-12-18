
import { Review } from '../types';
import { initialReviews } from '../data/reviewData';

const STORAGE_KEY = 'food_delivery_reviews';

export const reviewApi = {
  getAll: (): Review[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialReviews));
      return initialReviews;
    }
    return JSON.parse(data);
  },

  saveAll: (reviews: Review[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
  },

  add: (review: Review): Review[] => {
    const reviews = reviewApi.getAll();
    const updated = [review, ...reviews];
    reviewApi.saveAll(updated);
    return updated;
  }
};
