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
  return db.getSuggestions();
};