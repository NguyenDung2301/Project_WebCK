
export enum OrderStatus {
  Pending = 'Pending',
  Delivering = 'Delivering',
  Completed = 'Completed',
  Cancelled = 'Cancelled'
}

export enum Page {
  Home = 'home',
  History = 'history',
  Pending = 'pending',
  Profile = 'profile'
}

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface ShipperOrder {
  id: string;
  storeName: string;
  storeImage: string;
  storeAddress: string;
  deliveryAddress: string;
  status: OrderStatus;
  paymentMethod: 'Cash' | 'Wallet';
  time: string;
  totalAmount: number;
  items: OrderItem[];
}

export interface ShipperProfile {
  name: string;
  email: string;
  avatar: string;
  rank: string;
  joinDate: string;
  phone: string;
  address: string;
  dob: string;
}
