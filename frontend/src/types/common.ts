/**
 * Common Types
 * Các types dùng chung trong toàn bộ ứng dụng
 */

// Roles
export type Role = 'Admin' | 'User' | 'Shipper';
export type BackendRole = 'admin' | 'user' | 'shipper';

// Status
export type Status = 'Active' | 'Inactive' | 'Banned';

// Gender
export type Gender = 'Male' | 'Female';
export type GenderVN = 'Nam' | 'Nữ' | 'Khác';

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
