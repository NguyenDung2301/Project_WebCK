
export enum OrderStatus {
  COMPLETED = 'Hoàn thành',
  PREPARING = 'Đang chuẩn bị',
  DELIVERING = 'Đang giao',
  CANCELLED = 'Đã hủy'
}

export interface Order {
  id: string;
  customer: string;
  restaurant: string;
  total: number;
  status: OrderStatus;
  timestamp: string;
  avatar: string;
}

export interface DashboardStats {
  monthlyRevenue: number;
  dailyRevenue: number;
  activeUsers: number;
  totalRestaurants: number;
}

export interface Activity {
  id: string;
  user: string;
  action: string;
  target: string;
  time: string;
  type: 'order' | 'delivery' | 'cancellation' | 'waiting';
}

export interface TopItem {
  id: string;
  name: string;
  sales: number;
  image: string;
}

export interface TopRestaurant {
  id: string;
  name: string;
  revenue: number;
  logoInitial: string;
  color: string;
}

export type ViewType = 'dashboard' | 'orders' | 'users' | 'restaurants' | 'settings';
