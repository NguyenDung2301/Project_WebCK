
/**
 * Shipper API
 * Kết nối UI Shipper với Mock Database Store
 */

import { db } from '../data/store';
import { OrderStatus, ShipperOrder, ShipperProfile } from '../types/shipper';

export const getShipperOrdersApi = async (status?: OrderStatus | 'HISTORY'): Promise<ShipperOrder[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return db.getShipperOrders(status);
};

export const acceptOrderApi = async (orderId: string): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return db.shipperAcceptOrder(orderId);
};

export const completeOrderApi = async (orderId: string): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return db.shipperCompleteOrder(orderId);
};

export const ignoreOrderApi = async (orderId: string): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  // In a real app, this might assign to another driver. 
  // For mock, we effectively "cancel" it from this driver's view or just leave it.
  // Here we'll treat it as cancelling for simplicity in the view
  return db.shipperCancelOrder(orderId);
};

// New API for Stats
export const getShipperStatsApi = async (): Promise<{ todayIncome: number; completedCount: number; activeHours: string }> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return db.getShipperStats();
};

// New API for Profile
export const getShipperProfileApi = async (): Promise<ShipperProfile> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return db.getShipperProfile();
};
