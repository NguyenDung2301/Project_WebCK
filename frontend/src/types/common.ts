/**
 * Common Types
 * Các types dùng chung trong toàn bộ ứng dụng
 */

// ============ Role Types ============

export type Role = 'Admin' | 'User' | 'Shipper';
export type BackendRole = 'admin' | 'user' | 'shipper';

// ============ Status Types ============

export type Status = 'Active' | 'Inactive' | 'Banned';

// ============ Gender Types ============

export type Gender = 'Male' | 'Female';
export type GenderVN = 'Nam' | 'Nữ' | 'Khác';

// ============ API Types ============

// API Response
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Pagination
export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}
