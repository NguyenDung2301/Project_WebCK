
import { FoodItemUI } from '../types';
import { allFoodItems } from '../data/foodData';

const STORAGE_KEY = 'food_delivery_items';

export const foodApi = {
  getAll: (): FoodItemUI[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allFoodItems));
      return allFoodItems;
    }
    return JSON.parse(data);
  },
  
  getById: (id: string): FoodItemUI | undefined => {
    const items = foodApi.getAll();
    return items.find(item => item.id === id);
  }
};
