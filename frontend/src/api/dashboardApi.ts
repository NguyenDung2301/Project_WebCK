/**
 * Dashboard API
 * Kết nối UI Dashboard với Mock Database Store
 */

import { db } from '../data/store';

export const getDashboardStatsApi = async (year?: number) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return db.getDashboardData(year);
};