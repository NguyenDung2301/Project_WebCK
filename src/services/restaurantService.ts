
import { restaurantApi, RestaurantWithStatus } from '../api/restaurantApi';
import { foodApi } from '../api/foodApi';
import { FoodItemUI } from '../types';

const FOOD_STORAGE_KEY = 'food_delivery_items';

export const restaurantService = {
  getRestaurants: () => restaurantApi.getAll(),

  toggleStatus: (id: string): RestaurantWithStatus[] => {
    const restaurants = restaurantApi.getAll();
    const res = restaurants.find(r => r._id === id);
    if (!res) return restaurants;

    // Explicitly type newStatus to match RestaurantWithStatus requirements
    const newStatus: 'Active' | 'Inactive' = res.status === 'Active' ? 'Inactive' : 'Active';
    const updatedRes: RestaurantWithStatus = { ...res, status: newStatus };
    
    // Cập nhật nhà hàng
    const newList = restaurantApi.update(updatedRes);

    // Cascading: Cập nhật tất cả món ăn của nhà hàng này
    const allFoods = foodApi.getAll();
    const updatedFoods = allFoods.map(food => {
      if (food.restaurantId === id) {
        return { ...food, isAvailable: newStatus === 'Active' };
      }
      return food;
    });
    localStorage.setItem(FOOD_STORAGE_KEY, JSON.stringify(updatedFoods));

    return newList;
  },

  deleteRestaurant: (id: string): RestaurantWithStatus[] => {
    // Xóa nhà hàng
    const newList = restaurantApi.delete(id);

    // Cascading: Xóa tất cả món ăn của nhà hàng này
    const allFoods = foodApi.getAll();
    const updatedFoods = allFoods.filter(food => food.restaurantId !== id);
    localStorage.setItem(FOOD_STORAGE_KEY, JSON.stringify(updatedFoods));

    return newList;
  }
};
