
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

// ============ New UI Types (Product, Checkout, Order) ============

export interface FoodItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  rating: number;
  description: string;
  category: string;
  distance?: string;
  deliveryTime?: string;
  promoTag?: string;
  restaurantId?: string;
}

export interface Voucher {
  id: string;
  code: string;
  title: string;
  description?: string;
  type: 'Fixed' | 'Percent' | 'FreeShip'; // Updated types
  discountValue: number; // Amount or Percent value
  maxDiscount?: number; // For percent types
  minOrderValue: number;
  startDate?: string; // ISO Date
  endDate?: string; // ISO Date
  status: 'Active' | 'Inactive' | 'Expired';
  condition: string; // Display text
  isExpired?: boolean; // Keep for backward compatibility logic
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  balance: number;
  password?: string; // For mock check
}

export interface Order {
  id: string;
  foodId: string;
  restaurantName: string;
  orderTime: string;
  description: string;
  totalAmount: number;
  status: 'PENDING' | 'DELIVERING' | 'COMPLETED' | 'CANCELLED';
  imageUrl: string;
  isReviewed?: boolean;
  needsReview?: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  category: string;
  address: string;
  phone: string;
  email: string;
  rating: number;
  status: string;
  initial: string;
  colorClass: string;
  reviewsCount: number;
  imageUrl?: string;
}

export interface Review {
  id: string;
  foodId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string; // ISO Date string
  images?: string[];
}

// ============ Profile Types ============
export type ProfileSubPage = 'MAIN' | 'PAYMENT' | 'FAVORITES' | 'VOUCHERS' | 'EDIT_PROFILE';
