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