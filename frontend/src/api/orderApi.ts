/**
 * Order API
 * Kết nối UI với Mock Database Store
 */

import { db } from '../data/store';

export const getAllOrdersApi = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return db.getOrders();
};

export const deleteOrderApi = async (id: string) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  db.deleteOrder(id);
};