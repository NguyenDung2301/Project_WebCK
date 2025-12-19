
export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  distance: number;
  deliveryTime: string;
  imageUrl: string;
  category: string;
  isPromo?: boolean;
  promoTag?: string;
}

export interface Restaurant {
  id: string;
  name: string;
  address: string;
  rating: number;
  reviewsCount: number;
  isOpen: boolean;
  imageUrl: string;
}

export interface Voucher {
  id: string;
  title: string;
  condition: string;
  type: 'FREESHIP' | 'DISCOUNT' | 'CASHBACK';
  isExpired?: boolean;
  discountValue: number; // Giá trị giảm giá cụ thể
}

export interface Order {
  id: string;
  foodId?: string; // ID của sản phẩm để điều hướng
  restaurantName: string;
  orderTime: string;
  description: string;
  totalAmount: number;
  status: 'COMPLETED' | 'CANCELLED' | 'DELIVERING' | 'PENDING';
  imageUrl: string;
  needsReview?: boolean;
  isReviewed?: boolean; // Đánh dấu đơn đã đánh giá xong
}

export interface UserProfile {
  name: string;
  phone: string;
  address: string;
  email: string;
  balance: number;
  password?: string;
}

export type ProfileSubPage = 'MAIN' | 'PAYMENT' | 'FAVORITES' | 'VOUCHERS' | 'EDIT_PROFILE';

export type Screen = 'HOME' | 'SEARCH' | 'RESULTS' | 'DETAIL' | 'CHECKOUT' | 'ORDERS' | 'PROFILE' | 'REVIEW';
