/**
 * Product API
 * Kết nối UI với Mock Database Store cho Món ăn, Danh mục, Khuyến mãi
 */

import { db } from '../data/store';
import { FoodItem } from '../types/common';

export const getFoodsApi = async (): Promise<FoodItem[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return db.getFoods();
};

export const getFoodByIdApi = async (id: string): Promise<FoodItem | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return db.getFoodById(id);
};

export const getCategoriesApi = async () => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return db.getCategories();
};

export const getPromotionsApi = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return db.getPromotions();
};

// Mock function for suggestions
export const getSuggestionsApi = async () => {
  await new Promise(resolve => setTimeout(resolve, 100));
  // In a real app, this would query DB. For now return a subset of foods or static suggestions
  return [
    { name: 'Gà Rán KFC', tag: 'Burger, Cơm gà', image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=200&auto=format&fit=crop' },
    { name: 'Cơm Tấm Cali', tag: 'Cơm tấm, Sườn bì', image: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?q=80&w=200&auto=format&fit=crop' },
    { name: 'Trà Sữa Gong Cha', tag: 'Trà sữa trân châu', image: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?q=80&w=200&auto=format&fit=crop' },
    { name: 'The Pizza Company', tag: 'Pizza Hải Sản', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=200&auto=format&fit=crop' },
  ];
};