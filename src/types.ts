
export type Role = 'customer' | 'restaurant' | 'admin' | 'driver';
export type OrderStatus = 'pending' | 'confirmed' | 'delivering' | 'done' | 'cancelled';
export type Status = 'Active' | 'Inactive' | 'Banned';

export interface User {
  _id: string;
  name: string;
  email: string;
  password?: string;
  phone: string;
  address: string;
  role: Role;
  createdAt: string;
  avatarUrl?: string;
  status?: Status;
  dob?: string;
  gender?: string;
}

export interface Review {
  _id: string;
  foodId: string; // Liên kết với món ăn
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  createdAt: string;
  images?: string[];
}

export interface Restaurant {
  _id: string;
  name: string;
  address: string;
  phone: string;
  description: string;
  ownerId: string;
  openTime: string;
  closeTime: string;
  rating: number;
  createdAt: string;
  logo?: string;
}

export interface Category {
  _id: string;
  name: string;
  restaurantId: string;
}

export interface Food {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  isAvailable: boolean;
  restaurantId: string;
  categoryId: string;
  createdAt: string;
  promo?: string;
  rating?: string;
}

export interface OrderItem {
  foodId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  _id: string;
  userId: string;
  restaurantId: string;
  items: OrderItem[];
  totalPrice: number;
  status: OrderStatus;
  deliveryAddress: string;
  createdAt: string;
}

export interface ModalState {
  type: 'ADD' | 'EDIT' | 'DELETE' | 'VIEW' | null;
  data?: any | null;
}

export interface Voucher {
  id: string;
  title: string;
  description: string;
  expiry: string;
  type: 'freeship' | 'discount' | 'newuser';
}

export interface FoodItemUI extends Food {
  id: string;
  img: string;
  tags: string;
  deliveryTime: string;
  distance: string;
  category: string;
  reviewCount: number;
  store: {
    name: string;
    address: string;
    logo: string;
    isOpen: boolean;
  };
}
