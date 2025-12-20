/**
 * Restaurant API
 * Kết nối UI với Mock Database Store
 */

import { db } from '../data/store';

export const getRestaurantsApi = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return db.getRestaurants();
};

export const getRestaurantByIdApi = async (id: string) => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return db.getRestaurantById(id);
};

export const deleteRestaurantApi = async (id: string) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  db.deleteRestaurant(id);
};

export const updateRestaurantStatusApi = async (id: string, status: string) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return db.updateRestaurant(id, { status });
};