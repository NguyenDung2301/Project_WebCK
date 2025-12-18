
import { Restaurant } from '../types';
import { db_restaurants } from '../data/foodData';

const STORAGE_KEY = 'food_delivery_restaurants';

// Mở rộng type Restaurant để hỗ trợ trạng thái
export interface RestaurantWithStatus extends Restaurant {
  status: 'Active' | 'Inactive';
}

export const restaurantApi = {
  getAll: (): RestaurantWithStatus[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      const initial = db_restaurants.map(r => ({ ...r, status: 'Active' as const }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(data);
  },

  saveAll: (restaurants: RestaurantWithStatus[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(restaurants));
  },

  update: (updated: RestaurantWithStatus): RestaurantWithStatus[] => {
    const list = restaurantApi.getAll();
    const newList = list.map(r => r._id === updated._id ? updated : r);
    restaurantApi.saveAll(newList);
    return newList;
  },

  delete: (id: string): RestaurantWithStatus[] => {
    const list = restaurantApi.getAll();
    const newList = list.filter(r => r._id !== id);
    restaurantApi.saveAll(newList);
    return newList;
  }
};
