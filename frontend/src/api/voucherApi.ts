
/**
 * Voucher API
 * Kết nối UI với Mock Database Store cho Voucher
 */

import { db } from '../data/store';
import { Voucher } from '../types/common';

export const getVouchersApi = async (): Promise<Voucher[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return db.getVouchers();
};

export const createVoucherApi = async (voucher: Omit<Voucher, 'id'>): Promise<Voucher> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const newVoucher = {
    ...voucher,
    id: `v-${Date.now()}`
  };
  return db.createVoucher(newVoucher);
};

export const updateVoucherApi = async (id: string, updates: Partial<Voucher>): Promise<Voucher | null> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return db.updateVoucher(id, updates);
};

export const deleteVoucherApi = async (id: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  db.deleteVoucher(id);
};
