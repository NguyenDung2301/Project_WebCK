export interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  ratingCount: number;
  distance: string;
  time: string;
  tags: string[];
  address?: string;
  discount?: string;
  isOpen?: boolean;
}

export interface Dish {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  soldCount?: number;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface Voucher {
  id: string;
  code: string;
  description: string;
  minOrder?: string;
  discountAmount?: string;
  expiry?: string;
}