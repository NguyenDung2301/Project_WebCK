import { LucideIcon } from 'lucide-react';

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  balance: number;
  birthday: string;
  gender: 'male' | 'female' | 'other';
  address: string;
}

export interface UserContextType {
  user: UserProfile;
  updateUser: (user: UserProfile) => void;
}

export enum VoucherType {
  SHIPPING = 'SHIPPING',
  DISCOUNT = 'DISCOUNT'
}

export interface Voucher {
  id: string;
  code: string;
  title: string;
  description: string;
  expiryDate: string;
  value: string; // e.g., "-15K", "50%"
  type: VoucherType;
  isExpired: boolean;
}

export interface FoodItem {
  id: string;
  name: string;
  shopName: string;
  price: number;
  rating: number;
  image: string;
  isFavorite: boolean;
}

export enum PaymentMethodType {
  APP_WALLET = 'APP_WALLET',
  COD = 'COD'
}

export interface BreadcrumbItem {
  label: string;
  path?: string;
}