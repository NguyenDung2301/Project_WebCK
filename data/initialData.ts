import { BackendUser } from '../types/user';
import { Order, Restaurant, FoodItem, Voucher, Review } from '../types/common';

// --- USERS DATA ---
export const INITIAL_USERS: BackendUser[] = [
  { user_id: 'usr-admin-001', fullname: 'Administrator', email: 'admin@gmail.com', phone_number: '0909000001', birthday: '1990-01-01', gender: 'Male', created_at: '2023-01-01T00:00:00Z', role: 'admin' },
  { user_id: 'usr-001', fullname: 'Nguyễn Văn A', email: 'user@gmail.com', phone_number: '0901234567', birthday: '1995-05-15', gender: 'Male', created_at: '2023-03-10T09:15:00Z', role: 'user' },
  { user_id: 'usr-002', fullname: 'Trần Thị Shipper', email: 'shipper@food.com', phone_number: '0902345678', birthday: '1992-08-20', gender: 'Female', created_at: '2023-02-20T14:30:00Z', role: 'shipper' },
  { user_id: 'usr-003', fullname: 'Lê Văn Khách', email: 'levanc@example.com', phone_number: '0912223333', birthday: '1998-11-11', gender: 'Male', created_at: '2023-04-05T16:45:00Z', role: 'user' },
  { user_id: 'usr-004', fullname: 'Phạm Thị D', email: 'phamd@example.com', phone_number: '0914445555', birthday: '1995-07-07', gender: 'Female', created_at: '2023-06-12T08:00:00Z', role: 'user' },
  { user_id: 'usr-005', fullname: 'Hoàng Văn E', email: 'hoange@example.com', phone_number: '0916667777', birthday: '2000-01-01', gender: 'Male', created_at: '2023-07-20T10:00:00Z', role: 'user' },
  { user_id: 'usr-006', fullname: 'Vũ Thị F', email: 'vuf@example.com', phone_number: '0918889999', birthday: '1999-09-09', gender: 'Female', created_at: '2023-08-15T11:30:00Z', role: 'user' }
];

// --- CATEGORIES DATA ---
export const INITIAL_CATEGORIES = [
  { id: 'rice', name: 'Cơm', image: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764460831/Screenshot_2025-11-30_070009_s8hzez.png' },
  { id: 'noodles', name: 'Món nước', image: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764461746/Screenshot_2025-11-30_070845_fcckkb.png' },
  { id: 'snack', name: 'Ăn vặt', image: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764461746/Screenshot_2025-11-30_070813_ldmmy9.png' },
  { id: 'drink', name: 'Đồ uống', image: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764461746/Screenshot_2025-11-30_070905_sde2iv.png' },
  { id: 'burger', name: 'Burger', image: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764461748/Screenshot_2025-11-30_070923_miqawt.png' },
  { id: 'pizza', name: 'Pizza', image: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764461747/Screenshot_2025-11-30_070938_y9i2od.png' },
  { id: 'sushi', name: 'Sushi', image: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764461746/Screenshot_2025-11-30_070951_rsrpt1.png' },
  { id: 'dessert', name: 'Tráng miệng', image: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764461748/Screenshot_2025-11-30_071007_euepva.png' },
];

// --- RESTAURANTS DATA ---
export const INITIAL_RESTAURANTS: Restaurant[] = [
  { id: '#RES-001', name: 'KFC Vietnam', category: 'Fast Food', address: '292 Bà Triệu, Hai Bà Trưng, Hà Nội', phone: '028 3848 9999', email: 'contact@kfcvietnam.com.vn', rating: 4.5, status: 'Active', initial: 'K', colorClass: 'bg-red-100 text-red-600', reviewsCount: 1200 },
  { id: '#RES-002', name: "McDonald's", category: 'Burger', address: '02 Hàng Bài, Hoàn Kiếm, Hà Nội', phone: '028 3820 3040', email: 'cs@mcdonalds.vn', rating: 4.2, status: 'Active', initial: 'M', colorClass: 'bg-yellow-100 text-yellow-600', reviewsCount: 850 },
  { id: '#RES-003', name: 'Pizza Hut', category: 'Pizza', address: '138 Tôn Đức Thắng, Đống Đa, Hà Nội', phone: '1900 1822', email: 'customerservice@pizzahut.vn', rating: 4.0, status: 'Inactive', initial: 'P', colorClass: 'bg-blue-100 text-blue-600', reviewsCount: 600 },
  { id: '#RES-004', name: 'Lotteria', category: 'Fast Food', address: '229 Tây Sơn, Đống Đa, Hà Nội', phone: '1900 6778', email: 'marketing@lotteria.vn', rating: 3.8, status: 'Active', initial: 'L', colorClass: 'bg-orange-100 text-orange-600', reviewsCount: 900 },
  { id: '#RES-005', name: 'The Coffee House', category: 'Cafe', address: '86 Nguyễn Thái Học, Ba Đình, Hà Nội', phone: '1800 6936', email: 'hello@thecoffeehouse.vn', rating: 4.8, status: 'Active', initial: 'T', colorClass: 'bg-purple-100 text-purple-600', reviewsCount: 1500 },
  { id: '#RES-006', name: 'Highlands Coffee', category: 'Cafe', address: '1 Tràng Tiền, Hoàn Kiếm, Hà Nội', phone: '1900 1755', email: 'service@highlandscoffee.com.vn', rating: 4.1, status: 'Active', initial: 'H', colorClass: 'bg-red-100 text-red-700', reviewsCount: 2000 },
  { id: '#RES-007', name: 'Jollibee', category: 'Fast Food', address: '304 Phố Huế, Hai Bà Trưng, Hà Nội', phone: '1900 1533', email: 'jbvn@jollibee.com.vn', rating: 4.4, status: 'Active', initial: 'J', colorClass: 'bg-red-100 text-red-600', reviewsCount: 750 },
  { id: '#RES-008', name: 'Cơm Tấm Phúc Lộc Thọ', category: 'Cơm', address: '236 Đinh Tiên Hoàng, Q1, TP.HCM', phone: '0901222333', email: 'info@phucloctho.vn', rating: 4.6, status: 'Active', initial: 'C', colorClass: 'bg-green-100 text-green-600', reviewsCount: 3200 },
  { id: '#RES-009', name: 'Phở Thìn Lò Đúc', category: 'Món nước', address: '13 Lò Đúc, Hai Bà Trưng, Hà Nội', phone: '0988777666', email: 'phothin@gmail.com', rating: 4.9, status: 'Active', initial: 'P', colorClass: 'bg-orange-100 text-orange-600', reviewsCount: 5000 },
  { id: '#RES-010', name: 'Kichi Kichi', category: 'Lẩu', address: '101 Phạm Ngọc Thạch, Đống Đa, Hà Nội', phone: '1900 6622', email: 'cskh@kichi.com.vn', rating: 4.7, status: 'Active', initial: 'K', colorClass: 'bg-red-100 text-red-600', reviewsCount: 1800 },
  { id: '#RES-011', name: 'Gogi House', category: 'Nướng', address: '151 Giảng Võ, Ba Đình, Hà Nội', phone: '1900 6622', email: 'cskh@gogi.com.vn', rating: 4.8, status: 'Active', initial: 'G', colorClass: 'bg-yellow-100 text-yellow-800', reviewsCount: 2200 },
  { id: '#RES-012', name: 'Phúc Long Coffee & Tea', category: 'Trà Sữa', address: '82 Hàng Điếu, Hoàn Kiếm, Hà Nội', phone: '1800 6779', email: 'info@phuclong.com.vn', rating: 4.5, status: 'Active', initial: 'P', colorClass: 'bg-green-100 text-green-800', reviewsCount: 4500 },
  { id: '#RES-013', name: 'Texas Chicken', category: 'Fast Food', address: '228 Phạm Văn Đồng, Cầu Giấy, Hà Nội', phone: '028 6276 9639', email: 'cskh@texas.vn', rating: 4.3, status: 'Active', initial: 'T', colorClass: 'bg-orange-100 text-orange-600', reviewsCount: 600 },
  { id: '#RES-014', name: 'Bánh Mì Huỳnh Hoa', category: 'Snack', address: '26 Lê Thị Riêng, Q1, TP.HCM', phone: '028 3925 0885', email: 'contact@banhmihuynhhoa.vn', rating: 4.8, status: 'Active', initial: 'B', colorClass: 'bg-orange-50 text-orange-800', reviewsCount: 8800 },
  { id: '#RES-015', name: 'Haidilao Hotpot', category: 'Lẩu', address: 'Vincom Center Phạm Ngọc Thạch', phone: '024 3350 2299', email: 'vn.hdl@haidilao.com', rating: 4.9, status: 'Active', initial: 'H', colorClass: 'bg-red-50 text-red-800', reviewsCount: 3000 },
];

// --- FOOD ITEMS DATA ---
export const INITIAL_FOODS: FoodItem[] = [
  {
    id: '1',
    name: 'Bún Bò Huế Đặc Biệt',
    price: 55000,
    originalPrice: 65000,
    imageUrl: 'https://images.unsplash.com/photo-1582878826618-c05326eff935?q=80&w=1200&auto=format&fit=crop',
    rating: 4.8,
    description: 'Hương vị đậm đà chuẩn gốc Huế với nước dùng hầm xương 24h, nạm bò, chả cua.',
    category: 'noodles',
    distance: '1.5',
    deliveryTime: '15-20 phút',
    promoTag: 'Freeship',
    restaurantId: '#RES-009'
  },
  {
    id: '2',
    name: 'Cơm Tấm Sườn Bì',
    price: 45000,
    imageUrl: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?q=80&w=800&auto=format&fit=crop',
    rating: 4.6,
    description: 'Sườn nướng than hồng thơm phức, bì heo dai giòn, chả trứng béo ngậy.',
    category: 'rice',
    distance: '2.0',
    deliveryTime: '20-25 phút',
    restaurantId: '#RES-008'
  },
  {
    id: '3',
    name: 'Trà Sữa Trân Châu Đường Đen',
    price: 35000,
    originalPrice: 40000,
    imageUrl: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
    description: 'Trà sữa đậm vị, trân châu đường đen dẻo dai nấu mới mỗi ngày.',
    category: 'drink',
    distance: '0.5',
    deliveryTime: '10 phút',
    promoTag: 'Giảm 10%',
    restaurantId: '#RES-005'
  },
  {
    id: '4',
    name: 'Gà Rán Giòn Cay (2 Miếng)',
    price: 78000,
    originalPrice: 85000,
    imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=800&auto=format&fit=crop',
    rating: 4.5,
    description: 'Gà rán da giòn rụm, thịt mềm mọng nước, vị cay nồng kích thích vị giác.',
    category: 'fastfood',
    distance: '1.2',
    deliveryTime: '15-20 phút',
    restaurantId: '#RES-001'
  },
  {
    id: '5',
    name: 'Pizza Hải Sản (Size M)',
    price: 159000,
    originalPrice: 189000,
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop',
    rating: 4.7,
    description: 'Pizza đế dày với tôm, mực, thanh cua và phô mai mozzarella hảo hạng.',
    category: 'pizza',
    distance: '3.0',
    deliveryTime: '30-40 phút',
    promoTag: 'Giảm 30K',
    restaurantId: '#RES-003'
  },
  {
    id: '6',
    name: 'Bánh Mì Thập Cẩm',
    price: 25000,
    imageUrl: 'https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=400&auto=format&fit=crop',
    rating: 4.5,
    description: 'Bánh mì Việt Nam truyền thống với pate, chả lụa, thịt nguội và rau dưa.',
    category: 'snack',
    distance: '0.2',
    deliveryTime: '5-10 phút',
    restaurantId: '#RES-014'
  },
  {
    id: '7',
    name: 'Gỏi Cuốn Tôm Thịt (3 cuốn)',
    price: 25000,
    imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=400&auto=format&fit=crop',
    rating: 4.9,
    description: 'Gỏi cuốn tươi ngon với tôm to, thịt ba chỉ, bún và rau sống, chấm tương đen.',
    category: 'snack',
    distance: '1.0',
    deliveryTime: '15 phút',
    restaurantId: '#RES-008'
  },
  {
    id: '8',
    name: 'Phở Bò Tái Lăn',
    price: 60000,
    originalPrice: 70000,
    imageUrl: 'https://images.unsplash.com/photo-1582878826618-c05326eff935?q=80&w=400&auto=format&fit=crop',
    rating: 4.8,
    description: 'Phở bò tái lăn trứ danh Lò Đúc, nước dùng béo ngậy, thịt bò xào thơm lừng.',
    category: 'noodles',
    distance: '2.5',
    deliveryTime: '20-30 phút',
    restaurantId: '#RES-009'
  },
  {
    id: '9',
    name: 'Burger Bò Phô Mai 2 Tầng',
    price: 89000,
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop',
    rating: 4.7,
    description: 'Burger bò Úc nướng lửa hồng, 2 lớp phô mai cheddar tan chảy.',
    category: 'burger',
    distance: '1.8',
    deliveryTime: '20 phút',
    restaurantId: '#RES-002'
  },
  {
    id: '10',
    name: 'Cà Phê Sữa Đá Sài Gòn',
    price: 29000,
    imageUrl: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?q=80&w=400&auto=format&fit=crop',
    rating: 4.8,
    description: 'Cà phê rang xay nguyên chất pha phin, kết hợp sữa đặc Ngôi Sao Phương Nam.',
    category: 'drink',
    distance: '0.5',
    deliveryTime: '10 phút',
    restaurantId: '#RES-006'
  },
  {
    id: '11',
    name: 'Sushi Set Tổng Hợp',
    price: 199000,
    originalPrice: 250000,
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
    description: 'Set sushi cao cấp gồm cá hồi, cá ngừ, tôm, trứng cá và cuộn cali.',
    category: 'sushi',
    distance: '4.0',
    deliveryTime: '45 phút',
    promoTag: 'Deal Hời',
    restaurantId: '#RES-010'
  },
  {
    id: '12',
    name: 'Bánh Flan Caramel (Cặp)',
    price: 20000,
    imageUrl: 'https://images.unsplash.com/photo-1543573852-1a71a6ce19bc?q=80&w=400&auto=format&fit=crop',
    rating: 5.0,
    description: 'Bánh flan mềm mịn, thơm mùi trứng sữa và caramel đắng nhẹ.',
    category: 'dessert',
    distance: '1.0',
    deliveryTime: '15 phút',
    restaurantId: '#RES-005'
  }
];

// --- VOUCHERS DATA ---
export const INITIAL_VOUCHERS: Voucher[] = [
  { id: 'v1', title: 'Freeship 15k', code: 'FS15', discountValue: 15000, minOrderValue: 50000, type: 'FREESHIP', condition: 'Đơn tối thiểu 50k', isExpired: false },
  { id: 'v2', title: 'Giảm 10%', code: 'SALE10', discountValue: 10000, minOrderValue: 80000, type: 'DISCOUNT', condition: 'Giảm tối đa 10k', isExpired: false },
  { id: 'v3', title: 'Giảm 50% Bạn Mới', code: 'HELLO', discountValue: 40000, minOrderValue: 0, type: 'PROMO', condition: 'Giảm tối đa 40k cho đơn đầu tiên', isExpired: false },
  { id: 'v4', title: 'Hoàn Xu 20k', code: 'CASHBACK20', discountValue: 20000, minOrderValue: 150000, type: 'CASHBACK', condition: 'Đơn tối thiểu 150k', isExpired: false },
  { id: 'v5', title: 'Freeship Xtra', code: 'FSXTRA', discountValue: 30000, minOrderValue: 300000, type: 'FREESHIP', condition: 'Đơn tối thiểu 300k', isExpired: false },
  { id: 'v6', title: 'Voucher Hết Hạn', code: 'EXPIRED', discountValue: 50000, minOrderValue: 0, type: 'DISCOUNT', condition: 'Đã hết hạn sử dụng', isExpired: true },
];

// --- PROMOTIONS DATA ---
export const INITIAL_PROMOTIONS = [
  { id: 1, name: 'Popeyes - Mua 1 Tặng 1', vendor: 'Popeyes Chicken', image: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764462283/Screenshot_2025-11-30_072347_zzyj7x.png', action: 'Đặt ngay', foodId: '4' },
  { id: 2, name: 'McDonald\'s - Giảm 50%', vendor: 'McDonald\'s', image: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764462710/Screenshot_2025-11-30_072620_ak9ylz.png', action: 'Xem ngay', foodId: '9' },
  { id: 3, name: 'Highlands - Freeship', vendor: 'Highlands Coffee', image: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764462712/Screenshot_2025-11-30_072914_omsuvg.png', action: 'Lấy mã', foodId: '10' },
  { id: 4, name: 'KFC - Tặng Pepsi', vendor: 'KFC Vietnam', image: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764462793/Screenshot_2025-11-29_092812_fgyur2.png', action: 'Chi tiết', foodId: '4' },
  { id: 5, name: 'Pizza Hut - Giảm 35k', vendor: 'Pizza Hut', image: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764462713/Screenshot_2025-11-30_072927_meztye.png', action: 'Đặt ngay', foodId: '5' },
  { id: 6, name: 'Starbucks - Upsize Free', vendor: 'Starbucks', image: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764462794/Screenshot_2025-11-29_093114_pqnet4.png', action: 'Xem menu', foodId: '10' },
  { id: 7, name: 'Jollibee - Mỳ Ý 25k', vendor: 'Jollibee', image: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764462712/Screenshot_2025-11-30_073059_amopcl.png', action: 'Đặt ngay', foodId: '4' },
  { id: 8, name: 'Domino\'s - Giảm 70%', vendor: 'Domino\'s Pizza', image: 'https://res.cloudinary.com/dvobb8q7p/image/upload/v1764462716/Screenshot_2025-11-30_073114_iewzdj.png', action: 'Chi tiết', foodId: '5' },
];

// --- ORDERS DATA ---
export const INITIAL_ORDERS: any[] = [
  { id: '#979639', customer: 'Ẩn danh', email: 'user-admin-01', restaurant: 'Pizza & Pasta 4P\'s', amount: '170,000đ', status: 'PENDING' },
  { id: '#863137', customer: 'Ẩn danh', email: 'user-admin-01', restaurant: 'Pizza & Pasta 4P\'s', amount: '900,000đ', status: 'PENDING' },
  { id: '#504246', customer: 'Phạm Thị D', email: 'phamd@example.com', restaurant: 'Cơm Tấm & Bánh Mì Việt', amount: '50,000đ', status: 'PENDING' },
  { id: '#357219', customer: 'Nguyễn Văn A', email: 'user@gmail.com', restaurant: 'Cơm Tấm & Bánh Mì Việt', amount: '85,000đ', status: 'COMPLETED' },
  { id: '#357220', customer: 'Nguyễn Văn A', email: 'user@gmail.com', restaurant: 'KFC Vietnam', amount: '150,000đ', status: 'CANCELLED' },
  { id: '#357221', customer: 'Lê Văn Khách', email: 'levanc@example.com', restaurant: 'Highlands Coffee', amount: '59,000đ', status: 'COMPLETED' },
  { id: '#357222', customer: 'Trần Thị Shipper', email: 'shipper@food.com', restaurant: 'Phở Thìn Lò Đúc', amount: '65,000đ', status: 'COMPLETED' },
  { id: '#357223', customer: 'Hoàng Văn E', email: 'hoange@example.com', restaurant: 'Jollibee', amount: '120,000đ', status: 'PENDING' },
];

// --- REVIEWS DATA ---
export const INITIAL_REVIEWS: Review[] = [
  { id: 'rv-1', foodId: '1', userId: 'usr-001', userName: 'Nguyễn Văn A', rating: 5, comment: 'Nước lèo rất đậm đà, thịt bò mềm và nhiều. Đóng gói cẩn thận, nước lèo để riêng nóng hổi. Sẽ ủng hộ dài dài!', date: '2023-10-20T18:30:00Z', images: ["https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=200&h=200"] },
  { id: 'rv-2', foodId: '1', userId: 'usr-002', userName: 'Trần Thị Shipper', rating: 4, comment: 'Món ăn ngon nhưng shipper giao hơi chậm xíu. Bù lại đồ ăn vẫn còn nóng hổi.', date: '2023-10-18T12:15:00Z' },
  { id: 'rv-3', foodId: '1', userId: 'usr-003', userName: 'Lê Văn Khách', rating: 5, comment: 'Chuẩn vị Huế, cay nồng vừa phải.', date: '2023-10-15T09:00:00Z' },
  { id: 'rv-4', foodId: '4', userId: 'usr-004', userName: 'Phạm Thị D', rating: 5, comment: 'Gà giòn rụm, sốt cay rất ngon.', date: '2023-11-01T11:20:00Z' },
  { id: 'rv-5', foodId: '4', userId: 'usr-005', userName: 'Hoàng Văn E', rating: 3, comment: 'Hơi nhiều dầu mỡ, nhưng vị ổn.', date: '2023-11-02T13:45:00Z' },
  { id: 'rv-6', foodId: '2', userId: 'usr-001', userName: 'Nguyễn Văn A', rating: 5, comment: 'Cơm tấm sườn bì chả ngon số dzách!', date: '2023-11-05T12:00:00Z' },
  { id: 'rv-7', foodId: '10', userId: 'usr-006', userName: 'Vũ Thị F', rating: 4, comment: 'Cafe đậm vị, nhưng hơi ngọt so với khẩu vị mình.', date: '2023-11-10T08:30:00Z' },
  { id: 'rv-8', foodId: '5', userId: 'usr-003', userName: 'Lê Văn Khách', rating: 5, comment: 'Pizza nhiều topping, đế bánh giòn, giao hàng nhanh.', date: '2023-11-12T19:00:00Z' },
  { id: 'rv-9', foodId: '5', userId: 'usr-002', userName: 'Trần Thị Shipper', rating: 4, comment: 'Bánh ngon nhưng hơi nguội khi đến nơi.', date: '2023-11-12T20:15:00Z' },
  { id: 'rv-10', foodId: '6', userId: 'usr-004', userName: 'Phạm Thị D', rating: 5, comment: 'Bánh mì đặc ruột, pate thơm phức. Sẽ quay lại.', date: '2023-11-15T08:00:00Z' },
  { id: 'rv-11', foodId: '3', userId: 'usr-005', userName: 'Hoàng Văn E', rating: 5, comment: 'Trân châu đường đen đỉnh của chóp!', date: '2023-11-16T14:30:00Z' },
  { id: 'rv-12', foodId: '3', userId: 'usr-001', userName: 'Nguyễn Văn A', rating: 4, comment: 'Hơi ngọt xíu, lần sau sẽ giảm đường.', date: '2023-11-17T10:00:00Z' },
  { id: 'rv-13', foodId: '9', userId: 'usr-006', userName: 'Vũ Thị F', rating: 5, comment: 'Burger to chà bá, ăn một cái no cả buổi.', date: '2023-11-18T12:30:00Z' }
];

export const INITIAL_SUGGESTIONS = [
  { name: 'Gà Rán KFC', tag: 'Burger, Cơm gà', image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=200&auto=format&fit=crop' },
  { name: 'Cơm Tấm Cali', tag: 'Cơm tấm, Sườn bì', image: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?q=80&w=200&auto=format&fit=crop' },
  { name: 'Trà Sữa Gong Cha', tag: 'Trà sữa trân châu', image: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?q=80&w=200&auto=format&fit=crop' },
  { name: 'The Pizza Company', tag: 'Pizza Hải Sản', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=200&auto=format&fit=crop' },
  { name: 'Phở Thìn', tag: 'Phở tái lăn', image: 'https://images.unsplash.com/photo-1582878826618-c05326eff935?q=80&w=200&auto=format&fit=crop' },
  { name: 'Highlands Coffee', tag: 'Phin Sữa Đá', image: 'https://images.unsplash.com/photo-1584483766114-2cea6fac256d?q=80&w=200&auto=format&fit=crop' },
];