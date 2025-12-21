
export enum Page {
  Home = 'home',
  History = 'history',
  Pending = 'pending',
  Profile = 'profile'
}

export interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

export enum OrderStatus {
  Preparing = 'preparing',
  Delivering = 'delivering',
  Completed = 'completed',
  Cancelled = 'cancelled'
}

export interface Order {
  id: string;
  storeName: string;
  storeImage: string;
  storeAddress: string;
  deliveryAddress: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  paymentMethod: 'Cash' | 'E-Wallet' | 'Online';
  time: string;
  distance?: string;
}

export interface ShipperProfile {
  name: string;
  email: string;
  phone: string;
  dob: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  joinDate: string;
  rank: string;
  avatar: string;
}
