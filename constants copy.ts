import { FoodItem, Restaurant, Voucher } from './types/common';

// --- MOCK CATEGORIES ---
export const CATEGORIES = [
  { id: 'rice', name: 'Cơm', image: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764460831/Screenshot_2025-11-30_070009_s8hzez.png' },
  { id: 'noodles', name: 'Món nước', image: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764461746/Screenshot_2025-11-30_070845_fcckkb.png' },
  { id: 'snack', name: 'Ăn vặt', image: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764461746/Screenshot_2025-11-30_070813_ldmmy9.png' },
  { id: 'drink', name: 'Đồ uống', image: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764461746/Screenshot_2025-11-30_070905_sde2iv.png' },
  { id: 'burger', name: 'Burger', image: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764461748/Screenshot_2025-11-30_070923_miqawt.png' },
  { id: 'pizza', name: 'Pizza', image: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764461747/Screenshot_2025-11-30_070938_y9i2od.png' },
  { id: 'sushi', name: 'Sushi', image: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764461746/Screenshot_2025-11-30_070951_rsrpt1.png' },
  { id: 'dessert', name: 'Tráng miệng', image: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764461748/Screenshot_2025-11-30_071007_euepva.png' },
];

// --- MOCK PROMOTIONS ---
export const MOCK_PROMOTIONS = [
  { id: 1, name: 'Popeyes - Mua 1 Tặng 1', vendor: 'Popeyes Chicken', image: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764462283/Screenshot_2025-11-30_072347_zzyj7x.png', action: 'Đặt ngay', foodId: '1' },
  { id: 2, name: 'McDonald\'s - Giảm 50%', vendor: 'McDonald\'s', image: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764462710/Screenshot_2025-11-30_072620_ak9ylz.png', action: 'Xem ngay', foodId: '2' },
  { id: 3, name: 'Highlands - Freeship', vendor: 'Highlands Coffee', image: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764462712/Screenshot_2025-11-30_072914_omsuvg.png', action: 'Lấy mã', foodId: '3' },
  { id: 4, name: 'KFC - Tặng Pepsi', vendor: 'KFC Vietnam', image: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764462793/Screenshot_2025-11-29_092812_fgyur2.png', action: 'Chi tiết', foodId: '1' },
  { id: 5, name: 'Pizza Hut - Giảm 35k', vendor: 'Pizza Hut', image: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764462713/Screenshot_2025-11-30_072927_meztye.png', action: 'Đặt ngay', foodId: '3' },
  { id: 6, name: 'Starbucks - Upsize Free', vendor: 'Starbucks', image: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764462794/Screenshot_2025-11-29_093114_pqnet4.png', action: 'Xem menu', foodId: '3' },
  { id: 7, name: 'Jollibee - Mỳ Ý 25k', vendor: 'Jollibee', image: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764462712/Screenshot_2025-11-30_073059_amopcl.png', action: 'Đặt ngay', foodId: '1' },
  { id: 8, name: 'Domino\'s - Giảm 70%', vendor: 'Domino\'s Pizza', image: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764462716/Screenshot_2025-11-30_073114_iewzdj.png', action: 'Chi tiết', foodId: '3' },
];

// --- MOCK RESTAURANTS ---
export const MOCK_RESTAURANTS: Restaurant[] = [
  {
    id: 'res-1',
    name: 'Quán Ngon Nhà Làm',
    address: '123 Đường ABC, Quận 1, TP.HCM',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=100&auto=format&fit=crop',
    rating: 4.8,
    reviewsCount: 256,
    category: 'Món Việt',
    phone: '0901234567',
    email: 'contact@quanngon.com',
    status: 'Active',
    initial: 'Q',
    colorClass: 'bg-green-100 text-green-600',
  }
];

// --- MOCK FOODS ---
export const MOCK_FOODS: FoodItem[] = [
  {
    id: '1',
    name: 'Bún Bò Huế Đặc Biệt',
    price: 55000,
    originalPrice: 65000,
    imageUrl: 'https://images.unsplash.com/photo-1582878826618-c05326eff935?q=80&w=1200&auto=format&fit=crop',
    rating: 4.8,
    description: 'Hương vị đậm đà chuẩn gốc Huế với nước dùng hầm xương 24h.',
    category: 'noodles',
    distance: '1.5',
    deliveryTime: '15-20 phút',
    promoTag: 'Freeship'
  },
  {
    id: '2',
    name: 'Cơm Tấm Sườn Bì',
    price: 45000,
    imageUrl: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?q=80&w=800&auto=format&fit=crop',
    rating: 4.6,
    description: 'Sườn nướng than hồng, bì heo dai giòn.',
    category: 'rice',
    distance: '2.0',
    deliveryTime: '20-25 phút'
  },
  {
    id: '3',
    name: 'Trà Sữa Trân Châu',
    price: 35000,
    originalPrice: 40000,
    imageUrl: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
    description: 'Trà sữa đậm vị, trân châu dai ngon.',
    category: 'drink',
    distance: '0.5',
    deliveryTime: '10 phút',
    promoTag: 'Giảm 10%'
  },
  {
    id: '101', 
    name: 'Gỏi Cuốn Tôm Thịt', 
    price: 15000, 
    imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=400&auto=format&fit=crop', 
    rating: 4.9,
    description: 'Gỏi cuốn tươi ngon',
    category: 'snack'
  },
  { 
    id: '102', 
    name: 'Bánh Mì Thập Cẩm', 
    price: 25000, 
    imageUrl: 'https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=400&auto=format&fit=crop', 
    rating: 4.5,
    description: 'Bánh mì giòn rụm',
    category: 'snack'
  },
];

// --- MOCK VOUCHERS ---
export const MOCK_VOUCHERS: Voucher[] = [
  { id: 'v1', title: 'Giảm 15k phí vận chuyển', code: 'FREESHIP', discountValue: 15000, minOrderValue: 100000, type: 'FREESHIP', condition: 'Đơn tối thiểu 100k' },
  { id: 'v2', title: 'Giảm 10k cho đơn hàng', code: 'GIAM10K', discountValue: 10000, minOrderValue: 50000, type: 'DISCOUNT', condition: 'Đơn tối thiểu 50k' },
];

// --- SEARCH CONSTANTS ---
export const RECENT_SEARCHES = [
  'Cơm tấm sườn bì',
  'Trà sữa trân châu',
  'Bún bò Huế',
  'Pizza Company',
  'Bánh xèo giòn'
];

export const SUGGESTIONS = [
  { name: 'Gà Rán KFC', tag: 'Burger, Cơm gà', image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=200&auto=format&fit=crop' },
  { name: 'Cơm Tấm Cali', tag: 'Cơm tấm, Sườn bì', image: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?q=80&w=200&auto=format&fit=crop' },
  { name: 'Trà Sữa Gong Cha', tag: 'Trà sữa trân châu', image: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?q=80&w=200&auto=format&fit=crop' },
  { name: 'The Pizza Company', tag: 'Pizza Hải Sản', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=200&auto=format&fit=crop' },
  { name: 'Phở Thìn', tag: 'Phở tái lăn', image: 'https://images.unsplash.com/photo-1582878826618-c05326eff935?q=80&w=200&auto=format&fit=crop' },
  { name: 'Highlands Coffee', tag: 'Phin Sữa Đá', image: 'https://images.unsplash.com/photo-1584483766114-2cea6fac256d?q=80&w=200&auto=format&fit=crop' },
];