
import { BackendUser } from '../types/user';
import { FoodItem, Voucher, Review, Restaurant } from '../types/common';

// --- HELPER ---
const getDateStr = (daysAgo: number) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  return `${day}/${month}`; // Format DD/MM for display
};

const getIsoDate = (daysAgo: number) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
};

// --- 1. USERS (Master Data) ---
export const INITIAL_USERS: BackendUser[] = [
  { user_id: 'usr-admin', fullname: 'Administrator', email: 'admin@gmail.com', phone_number: '0909000001', birthday: '1990-01-01', gender: 'Male', created_at: '2023-01-01', role: 'admin' },
  { user_id: 'usr-shipper', fullname: 'Trần Văn Shipper', email: 'shipper@food.com', phone_number: '0909888777', birthday: '1992-08-20', gender: 'Male', created_at: '2023-02-20', role: 'shipper' },
  // Customers
  { user_id: 'usr-1', fullname: 'Nguyễn Văn A', email: 'user@gmail.com', phone_number: '0901234567', birthday: '1995-05-15', gender: 'Male', created_at: '2023-03-10', role: 'user' },
  { user_id: 'usr-2', fullname: 'Lê Thị Mai', email: 'lethimai@example.com', phone_number: '0912223333', birthday: '1998-11-11', gender: 'Female', created_at: '2023-04-05', role: 'user' },
  { user_id: 'usr-3', fullname: 'Phạm Minh Tuấn', email: 'tuanpm@example.com', phone_number: '0988777666', birthday: '1993-02-28', gender: 'Male', created_at: '2023-06-15', role: 'user' },
  { user_id: 'usr-4', fullname: 'Trần Ngọc Lan', email: 'lanngoc@example.com', phone_number: '0933444555', birthday: '2000-10-10', gender: 'Female', created_at: '2023-08-20', role: 'user' },
  { user_id: 'usr-5', fullname: 'Hoàng Văn Ba', email: 'bahoang@example.com', phone_number: '0977888999', birthday: '1985-12-25', gender: 'Male', created_at: '2023-01-20', role: 'user' },
];

// --- 2. RESTAURANTS (Master Data) ---
// Updated reviewsCount to match INITIAL_REVIEWS length
export const INITIAL_RESTAURANTS: Restaurant[] = [
  { id: 'res-1', name: 'KFC Vietnam', category: 'Fast Food', address: '292 Bà Triệu, Hà Nội', phone: '19006886', email: 'contact@kfc.vn', rating: 4.5, status: 'Active', initial: 'K', colorClass: 'bg-red-100 text-red-600', reviewsCount: 1, imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=200' },
  { id: 'res-2', name: "McDonald's", category: 'Burger', address: '02 Hàng Bài, Hà Nội', phone: '02838203040', email: 'cs@mcdonalds.vn', rating: 4.2, status: 'Active', initial: 'M', colorClass: 'bg-yellow-100 text-yellow-600', reviewsCount: 1, imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=200' },
  { id: 'res-3', name: 'Phúc Long', category: 'Drink', address: '82 Hàng Điếu, Hà Nội', phone: '18006779', email: 'info@phuclong.com', rating: 4.6, status: 'Active', initial: 'P', colorClass: 'bg-green-100 text-green-800', reviewsCount: 1, imageUrl: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?q=80&w=200' },
  { id: 'res-4', name: 'Pizza Hut', category: 'Pizza', address: '138 Tôn Đức Thắng, Hà Nội', phone: '19001822', email: 'cs@pizzahut.vn', rating: 4.0, status: 'Active', initial: 'P', colorClass: 'bg-blue-100 text-blue-600', reviewsCount: 1, imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=200' },
  { id: 'res-5', name: 'Bánh Mì Huỳnh Hoa', category: 'Snack', address: '26 Lê Thị Riêng, TP.HCM', phone: '02839250885', email: 'banhmi@huynhhoa.vn', rating: 4.8, status: 'Active', initial: 'B', colorClass: 'bg-orange-50 text-orange-800', reviewsCount: 1, imageUrl: 'https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=200' },
  { id: 'res-6', name: 'Sushi Tei', category: 'Sushi', address: '200A Lý Tự Trọng, Q1, TP.HCM', phone: '02862841188', email: 'info@sushitei.com', rating: 4.7, status: 'Active', initial: 'S', colorClass: 'bg-red-50 text-red-800', reviewsCount: 1, imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=200' },
  { id: 'res-7', name: 'Phở Thìn Lò Đúc', category: 'Món nước', address: '13 Lò Đúc, Hà Nội', phone: '0982543789', email: 'phothin@gmail.com', rating: 4.3, status: 'Active', initial: 'P', colorClass: 'bg-amber-100 text-amber-800', reviewsCount: 1, imageUrl: 'https://images.unsplash.com/photo-1582878826618-c05326eff935?q=80&w=200' },
  { id: 'res-8', name: 'The Coffee House', category: 'Drink', address: 'Nhiều chi nhánh', phone: '18006935', email: 'hi@thecoffeehouse.vn', rating: 4.5, status: 'Active', initial: 'T', colorClass: 'bg-orange-100 text-orange-700', reviewsCount: 1, imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=200' },
  { id: 'res-9', name: 'Cơm Tấm Cali', category: 'Cơm', address: 'Quận 1, TP.HCM', phone: '19002254', email: 'cali@comtam.vn', rating: 4.0, status: 'Active', initial: 'C', colorClass: 'bg-purple-100 text-purple-700', reviewsCount: 4, imageUrl: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?q=80&w=200' },
];

// --- 3. FOODS (Master Data) ---
export const INITIAL_FOODS: FoodItem[] = [
  // KFC (res-1)
  { id: 'f-1', name: 'Gà Rán Giòn Cay (2 Miếng)', price: 78000, originalPrice: 85000, imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=800', rating: 4.5, description: 'Gà rán da giòn rụm, thịt mềm.', category: 'fastfood', restaurantId: 'res-1', deliveryTime: '15-20 phút' },
  { id: 'f-1b', name: 'Burger Tôm', price: 45000, imageUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800', rating: 4.2, description: 'Nhân tôm nguyên con.', category: 'burger', restaurantId: 'res-1', deliveryTime: '15-20 phút' },
  
  // McDonald's (res-2)
  { id: 'f-2', name: 'Burger Bò Phô Mai 2 Tầng', price: 89000, imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800', rating: 4.7, description: 'Burger bò Úc nướng lửa hồng.', category: 'burger', restaurantId: 'res-2', deliveryTime: '20 phút' },
  { id: 'f-2b', name: 'Khoai Tây Chiên (L)', price: 35000, imageUrl: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?q=80&w=800', rating: 4.8, description: 'Giòn tan, nóng hổi.', category: 'snack', restaurantId: 'res-2', deliveryTime: '15 phút' },

  // Phuc Long (res-3)
  { id: 'f-3', name: 'Trà Sữa Phúc Long (L)', price: 55000, imageUrl: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?q=80&w=800', rating: 4.9, description: 'Trà sữa đậm vị truyền thống.', category: 'drink', restaurantId: 'res-3', deliveryTime: '15 phút' },
  { id: 'f-3b', name: 'Trà Đào Cam Sả', price: 60000, imageUrl: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?q=80&w=800', rating: 4.8, description: 'Thanh mát giải nhiệt.', category: 'drink', restaurantId: 'res-3', deliveryTime: '15 phút' },

  // Pizza Hut (res-4)
  { id: 'f-4', name: 'Pizza Hải Sản (Size M)', price: 159000, originalPrice: 189000, imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800', rating: 4.7, description: 'Tôm, mực, thanh cua, phô mai.', category: 'pizza', restaurantId: 'res-4', deliveryTime: '30 phút' },
  { id: 'f-4b', name: 'Mỳ Ý Bò Bằm', price: 79000, imageUrl: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=800', rating: 4.4, description: 'Sốt bò bằm cà chua.', category: 'noodles', restaurantId: 'res-4', deliveryTime: '25 phút' },

  // Huynh Hoa (res-5)
  { id: 'f-5', name: 'Bánh Mì Đặc Biệt', price: 65000, imageUrl: 'https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=800', rating: 4.8, description: 'Full topping pate, chả, thịt.', category: 'snack', restaurantId: 'res-5', deliveryTime: '10 phút' },

  // Sushi Tei (res-6)
  { id: 'f-6', name: 'Sashimi Cá Hồi', price: 120000, imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800', rating: 4.9, description: 'Cá hồi tươi nhập khẩu.', category: 'sushi', restaurantId: 'res-6', deliveryTime: '25 phút' },
  { id: 'f-6b', name: 'Sushi Set A', price: 180000, imageUrl: 'https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=800', rating: 4.8, description: 'Tổng hợp các loại sushi ngon.', category: 'sushi', restaurantId: 'res-6', deliveryTime: '30 phút' },

  // Pho Thin (res-7)
  { id: 'f-7', name: 'Phở Tái Lăn', price: 70000, imageUrl: 'https://images.unsplash.com/photo-1582878826618-c05326eff935?q=80&w=800', rating: 4.5, description: 'Đặc sản phở Thìn trứ danh.', category: 'noodles', restaurantId: 'res-7', deliveryTime: '20 phút' },

  // The Coffee House (res-8)
  { id: 'f-8', name: 'Cà Phê Sữa Đá', price: 39000, imageUrl: 'https://images.unsplash.com/photo-1584483766114-2cea6fac256d?q=80&w=800', rating: 4.6, description: 'Đậm đà hương vị Việt.', category: 'drink', restaurantId: 'res-8', deliveryTime: '10 phút' },
  { id: 'f-8b', name: 'Bánh Mousse Đào', price: 45000, imageUrl: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=800', rating: 4.7, description: 'Bánh ngọt tráng miệng.', category: 'dessert', restaurantId: 'res-8', deliveryTime: '10 phút' },

  // Com Tam Cali (res-9)
  { id: 'f-9', name: 'Cơm Tấm Sườn Bì Chả', price: 65000, imageUrl: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?q=80&w=800', rating: 4.0, description: 'Sườn nướng mật ong thơm lừng.', category: 'rice', restaurantId: 'res-9', deliveryTime: '25 phút' },
];

// --- 4. ORDERS (Unified Master Data) ---
export interface MasterOrder {
  id: string;
  userId: string;
  restaurantId: string;
  items: Array<{ foodId: string; quantity: number; price: number }>;
  status: 'PENDING' | 'DELIVERING' | 'COMPLETED' | 'CANCELLED';
  orderTime: string; // HH:mm • DD/MM
  paymentMethod: 'Cash' | 'Wallet';
  deliveryAddress: string;
  needsReview: boolean;
  isReviewed: boolean;
  totalAmount: number;
}

export const INITIAL_MASTER_ORDERS: MasterOrder[] = [
  { id: 'ord-101', userId: 'usr-1', restaurantId: 'res-4', items: [{ foodId: 'f-4', quantity: 1, price: 159000 }], status: 'DELIVERING', orderTime: `10:30 • ${getDateStr(0)}`, paymentMethod: 'Wallet', deliveryAddress: 'Landmark 81, TP.HCM', needsReview: false, isReviewed: false, totalAmount: 159000 + 15000 },
  { id: 'ord-103', userId: 'usr-1', restaurantId: 'res-3', items: [{ foodId: 'f-3', quantity: 2, price: 55000 }], status: 'COMPLETED', orderTime: `09:00 • ${getDateStr(0)}`, paymentMethod: 'Wallet', deliveryAddress: 'Bitexco Tower, Q1', needsReview: true, isReviewed: false, totalAmount: 110000 + 15000 },
  { id: 'ord-104', userId: 'usr-1', restaurantId: 'res-1', items: [{ foodId: 'f-1', quantity: 1, price: 78000 }, { foodId: 'f-1b', quantity: 1, price: 45000 }], status: 'COMPLETED', orderTime: `18:30 • ${getDateStr(5)}`, paymentMethod: 'Cash', deliveryAddress: 'Nhà riêng, Q3', needsReview: false, isReviewed: true, totalAmount: 78000 + 45000 + 15000 },
  { id: 'ord-105', userId: 'usr-1', restaurantId: 'res-5', items: [{ foodId: 'f-5', quantity: 3, price: 65000 }], status: 'CANCELLED', orderTime: `12:00 • ${getDateStr(2)}`, paymentMethod: 'Cash', deliveryAddress: 'Công ty, Q1', needsReview: false, isReviewed: false, totalAmount: 195000 + 15000 },
  { id: 'ord-201', userId: 'usr-2', restaurantId: 'res-2', items: [{ foodId: 'f-2', quantity: 2, price: 89000 }, { foodId: 'f-2b', quantity: 1, price: 35000 }], status: 'DELIVERING', orderTime: `11:45 • ${getDateStr(0)}`, paymentMethod: 'Cash', deliveryAddress: '12 Nguyễn Văn Bảo, Gò Vấp', needsReview: false, isReviewed: false, totalAmount: 178000 + 35000 + 15000 },
  { id: 'ord-202', userId: 'usr-3', restaurantId: 'res-6', items: [{ foodId: 'f-6', quantity: 1, price: 120000 }, { foodId: 'f-6b', quantity: 1, price: 180000 }], status: 'DELIVERING', orderTime: `12:10 • ${getDateStr(0)}`, paymentMethod: 'Wallet', deliveryAddress: '55 Nam Kỳ Khởi Nghĩa, Q1', needsReview: false, isReviewed: false, totalAmount: 120000 + 180000 + 15000 },
  { id: 'ord-203', userId: 'usr-4', restaurantId: 'res-8', items: [{ foodId: 'f-8', quantity: 4, price: 39000 }], status: 'DELIVERING', orderTime: `13:00 • ${getDateStr(0)}`, paymentMethod: 'Cash', deliveryAddress: 'Đại học Sài Gòn, Q5', needsReview: false, isReviewed: false, totalAmount: 39000 * 4 + 15000 },
  { id: 'ord-301', userId: 'usr-5', restaurantId: 'res-7', items: [{ foodId: 'f-7', quantity: 2, price: 70000 }], status: 'PENDING', orderTime: `13:15 • ${getDateStr(0)}`, paymentMethod: 'Cash', deliveryAddress: 'Khu chung cư Masteri, Thảo Điền', needsReview: false, isReviewed: false, totalAmount: 140000 + 15000 },
  { id: 'ord-302', userId: 'usr-2', restaurantId: 'res-1', items: [{ foodId: 'f-1', quantity: 5, price: 78000 }], status: 'PENDING', orderTime: `13:20 • ${getDateStr(0)}`, paymentMethod: 'Wallet', deliveryAddress: 'Vincom Center, Q1', needsReview: false, isReviewed: false, totalAmount: 78000 * 5 + 15000 },
  { id: 'ord-303', userId: 'usr-4', restaurantId: 'res-9', items: [{ foodId: 'f-9', quantity: 1, price: 65000 }], status: 'PENDING', orderTime: `13:30 • ${getDateStr(0)}`, paymentMethod: 'Cash', deliveryAddress: 'Hẻm 51, Thành Thái, Q10', needsReview: false, isReviewed: false, totalAmount: 65000 + 15000 },
  { id: 'ord-401', userId: 'usr-2', restaurantId: 'res-2', items: [{ foodId: 'f-2', quantity: 1, price: 89000 }], status: 'COMPLETED', orderTime: `10:00 • ${getDateStr(1)}`, paymentMethod: 'Cash', deliveryAddress: '...', needsReview: false, isReviewed: true, totalAmount: 104000 },
  { id: 'ord-402', userId: 'usr-3', restaurantId: 'res-3', items: [{ foodId: 'f-3', quantity: 3, price: 55000 }], status: 'COMPLETED', orderTime: `14:00 • ${getDateStr(1)}`, paymentMethod: 'Wallet', deliveryAddress: '...', needsReview: false, isReviewed: true, totalAmount: 180000 },
  { id: 'ord-403', userId: 'usr-5', restaurantId: 'res-5', items: [{ foodId: 'f-5', quantity: 2, price: 65000 }], status: 'CANCELLED', orderTime: `19:00 • ${getDateStr(1)}`, paymentMethod: 'Cash', deliveryAddress: '...', needsReview: false, isReviewed: false, totalAmount: 145000 },
  { id: 'ord-404', userId: 'usr-1', restaurantId: 'res-6', items: [{ foodId: 'f-6', quantity: 1, price: 120000 }], status: 'COMPLETED', orderTime: `11:30 • ${getDateStr(2)}`, paymentMethod: 'Wallet', deliveryAddress: '...', needsReview: false, isReviewed: false, totalAmount: 135000 },
  { id: 'ord-405', userId: 'usr-4', restaurantId: 'res-8', items: [{ foodId: 'f-8', quantity: 2, price: 39000 }], status: 'COMPLETED', orderTime: `08:00 • ${getDateStr(2)}`, paymentMethod: 'Cash', deliveryAddress: '...', needsReview: false, isReviewed: true, totalAmount: 93000 },
];

// --- 5. REVIEWS ---
export const INITIAL_REVIEWS: Review[] = [
  { id: 'rv-1', foodId: 'f-1', userId: 'usr-1', userName: 'Nguyễn Văn A', rating: 5, comment: 'Gà ngon, giòn rụm, giao hàng nhanh!', date: getIsoDate(5), images: [] },
  { id: 'rv-2', foodId: 'f-3', userId: 'usr-2', userName: 'Lê Thị Mai', rating: 4, comment: 'Trà đậm vị, nhưng hơi ngọt so với mình.', date: getIsoDate(2) },
  { id: 'rv-3', foodId: 'f-2', userId: 'usr-3', userName: 'Phạm Minh Tuấn', rating: 5, comment: 'Burger to, bò mềm, phô mai béo ngậy. Tuyệt vời!', date: getIsoDate(10), images: ['https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=200'] },
  { id: 'rv-4', foodId: 'f-4', userId: 'usr-4', userName: 'Trần Ngọc Lan', rating: 3, comment: 'Đế bánh hơi cứng, nhân hải sản hơi ít.', date: getIsoDate(15) },
  { id: 'rv-5', foodId: 'f-6', userId: 'usr-5', userName: 'Hoàng Văn Ba', rating: 5, comment: 'Cá hồi tươi rói, cắt miếng dày. Đáng tiền!', date: getIsoDate(1) },
  { id: 'rv-6', foodId: 'f-8', userId: 'usr-1', userName: 'Nguyễn Văn A', rating: 5, comment: 'Cà phê thơm, uống tỉnh táo cả ngày.', date: getIsoDate(20) },
  // Reviews for Cơm Tấm Cali (f-9)
  { id: 'rv-7', foodId: 'f-9', userId: 'usr-1', userName: 'Nguyễn Văn A', rating: 4, comment: 'Cơm tấm ngon, sườn nướng vừa vị.', date: getIsoDate(3) },
  { id: 'rv-8', foodId: 'f-9', userId: 'usr-2', userName: 'Lê Thị Mai', rating: 5, comment: 'Sườn to, chả trứng béo ngậy. Sẽ ủng hộ dài dài.', date: getIsoDate(7) },
  { id: 'rv-9', foodId: 'f-9', userId: 'usr-3', userName: 'Phạm Minh Tuấn', rating: 4, comment: 'Giao hàng hơi lâu chút nhưng đồ ăn nóng hổi.', date: getIsoDate(12) },
  { id: 'rv-10', foodId: 'f-9', userId: 'usr-4', userName: 'Trần Ngọc Lan', rating: 3, comment: 'Nước mắm hơi ngọt quá.', date: getIsoDate(1) },
  // Additional reviews for variety
  { id: 'rv-11', foodId: 'f-5', userId: 'usr-5', userName: 'Hoàng Văn Ba', rating: 5, comment: 'Bánh mì đầy đặn, pate ngon xuất sắc!', date: getIsoDate(4) },
  { id: 'rv-12', foodId: 'f-7', userId: 'usr-2', userName: 'Lê Thị Mai', rating: 4, comment: 'Nước dùng đậm đà, nhiều thịt.', date: getIsoDate(6) },
];

// --- OTHER STATIC DATA ---
export const INITIAL_CATEGORIES = [
  { id: 'rice', name: 'Cơm', image: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764460831/Screenshot_2025-11-30_070009_s8hzez.png' },
  { id: 'noodles', name: 'Món nước', image: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764461746/Screenshot_2025-11-30_070845_fcckkb.png' },
  { id: 'fastfood', name: 'Fast Food', image: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764461748/Screenshot_2025-11-30_070923_miqawt.png' },
  { id: 'drink', name: 'Đồ uống', image: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764461746/Screenshot_2025-11-30_070905_sde2iv.png' },
  { id: 'pizza', name: 'Pizza', image: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764461747/Screenshot_2025-11-30_070938_y9i2od.png' },
  { id: 'snack', name: 'Ăn vặt', image: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764461746/Screenshot_2025-11-30_070813_ldmmy9.png' },
  { id: 'sushi', name: 'Sushi', image: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764461746/Screenshot_2025-11-30_070951_rsrpt1.png' },
  { id: 'dessert', name: 'Tráng miệng', image: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764461748/Screenshot_2025-11-30_071007_euepva.png' },
];

export const INITIAL_VOUCHERS: Voucher[] = [
  { id: 'v1', title: 'Freeship 15k', code: 'FS15', discountValue: 15000, minOrderValue: 50000, type: 'FREESHIP', condition: 'Đơn tối thiểu 50k', isExpired: false },
  { id: 'v2', title: 'Giảm 10%', code: 'SALE10', discountValue: 10000, minOrderValue: 80000, type: 'DISCOUNT', condition: 'Giảm tối đa 10k', isExpired: false },
  { id: 'v3', title: 'Giảm 50k', code: 'SUPER50', discountValue: 50000, minOrderValue: 200000, type: 'DISCOUNT', condition: 'Đơn tối thiểu 200k', isExpired: true },
  { id: 'v4', title: 'Freeship Xtra', code: 'FSXTRA', discountValue: 30000, minOrderValue: 150000, type: 'FREESHIP', condition: 'Đơn tối thiểu 150k', isExpired: false },
];

export const INITIAL_PROMOTIONS = [
  { id: 1, name: 'KFC - Tặng Pepsi', vendor: 'KFC Vietnam', image: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764462793/Screenshot_2025-11-29_092812_fgyur2.png', action: 'Chi tiết', foodId: 'f-1' },
  { id: 2, name: 'McDonald\'s - Giảm 50%', vendor: 'McDonald\'s', image: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764462710/Screenshot_2025-11-30_072620_ak9ylz.png', action: 'Xem ngay', foodId: 'f-2' },
  { id: 3, name: 'Phúc Long - Combo 99k', vendor: 'Phúc Long', image: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764462712/Screenshot_2025-11-30_072914_omsuvg.png', action: 'Đặt ngay', foodId: 'f-3' },
  { id: 4, name: 'Sushi Tei - Mua 1 Tặng 1', vendor: 'Sushi Tei', image: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764462283/Screenshot_2025-11-30_072347_zzyj7x.png', action: 'Ưu đãi', foodId: 'f-6' },
];

export const INITIAL_SUGGESTIONS = [
  { name: 'Gà Rán KFC', tag: 'Fastfood', image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=200' },
  { name: 'Phúc Long', tag: 'Trà sữa', image: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?q=80&w=200' },
  { name: 'Sushi Tei', tag: 'Sushi, Sashimi', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=200' },
  { name: 'Cơm Tấm Cali', tag: 'Cơm trưa', image: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?q=80&w=200' },
  { name: 'Phở Thìn', tag: 'Món nước', image: 'https://images.unsplash.com/photo-1582878826618-c05326eff935?q=80&w=200' },
];

export const INITIAL_DASHBOARD_DATA = {
  summary: { totalRevenue: 2450000000, todayRevenue: 58500000, totalUsers: 8545, totalRestaurants: 482 },
  revenue: [{ name: 'T1', value: 1.2 }, { name: 'T2', value: 1.5 }, { name: 'T3', value: 1.8 }, { name: 'T4', value: 1.4 }, { name: 'T5', value: 2.1 }, { name: 'T6', value: 2.5 }],
  status: [
    { name: 'Hoàn thành', value: 65, color: '#10B981' },
    { name: 'Đang giao', value: 20, color: '#3B82F6' },
    { name: 'Đã hủy', value: 15, color: '#EF4444' }
  ],
  activities: [
    { id: 1, user: 'Nguyễn Văn A', action: 'đã đặt', target: 'KFC Vietnam', time: '5 phút trước', type: 'order' },
    { id: 2, user: 'Trần Văn Shipper', action: 'đã giao', target: 'Đơn #ord-103', time: '10 phút trước', type: 'delivery' },
    { id: 3, user: 'Lê Thị Mai', action: 'đã hủy', target: 'Đơn #ord-403', time: '30 phút trước', type: 'cancellation' },
  ],
  topItems: [
    { id: '#1', name: 'Gà Rán KFC', sales: '1,200', image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=100' },
    { id: '#2', name: 'Trà Sữa Phúc Long', sales: '980', image: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?q=80&w=100' },
    { id: '#3', name: 'Burger Bò', sales: '850', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=100' },
  ],
  topRestaurants: [
    { id: '#1', name: 'KFC Vietnam', revenue: 150000000, color: 'bg-red-100 text-red-600', logoInitial: 'K' },
    { id: '#2', name: 'Phúc Long', revenue: 120000000, color: 'bg-green-100 text-green-800', logoInitial: 'P' },
    { id: '#3', name: 'Sushi Tei', revenue: 98000000, color: 'bg-red-50 text-red-800', logoInitial: 'S' },
  ]
};
