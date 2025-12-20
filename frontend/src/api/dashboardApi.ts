/**
 * Dashboard API
 * Kết nối UI Dashboard với Mock Database Store
 */

import { db } from '../data/store';

export const getDashboardStatsApi = async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return db.getDashboardData();
};
