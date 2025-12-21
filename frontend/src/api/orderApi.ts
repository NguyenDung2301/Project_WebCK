/**
 * Order API
 * Kết nối UI với Mock Database Store
 */

import { db } from '../data/store';
import { MasterOrder } from '../data/initialData';
import { Order } from '../types/common';

export async function getAllOrdersApi(userId: string): Promise<Order[]>;
export async function getAllOrdersApi(): Promise<any[]>;
export async function getAllOrdersApi(userId?: string) {
  await new Promise(resolve => setTimeout(resolve, 300));
  if (userId) {
    return db.getOrders(userId);
  }
  return db.getAdminOrders();
}

export const deleteOrderApi = async (id: string) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  db.deleteOrder(id);
};

export const createOrderApi = async (orderData: Partial<MasterOrder>) => {
  await new Promise(resolve => setTimeout(resolve, 800)); // Simulate processing delay
  return db.createOrder(orderData);
};
