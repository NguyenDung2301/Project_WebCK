import { Category, Dish, Restaurant, Voucher } from "./types";

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Rice', image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=200&h=200&fit=crop' },
  { id: '2', name: 'Broken Rice', image: 'https://fullofplants.com/wp-content/uploads/2022/10/vietnamese-broken-rice-dish-vegan-com-tam-chay-with-pickles-thumb-10.jpg' },
  { id: '3', name: 'Salad', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&h=200&fit=crop' },
  { id: '4', name: 'Chicken', image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=200&h=200&fit=crop' },
  { id: '5', name: 'Noodles', image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=200&h=200&fit=crop' },
  { id: '6', name: 'Drinks', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=200&h=200&fit=crop' },
  { id: '7', name: 'Burger', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop' },
];

export const PROMO_RESTAURANTS: Restaurant[] = [
  {
    id: '1',
    name: 'Popeyes - Nhà Chung',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&h=400&fit=crop',
    rating: 4.5,
    ratingCount: 100,
    distance: '1.2km',
    time: '20 min',
    tags: ['Chicken', 'Fast Food'],
    discount: 'Buy 1 Get 1'
  },
  {
    id: '2',
    name: 'McDonald\'s - Hồ Gươm',
    image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=600&h=400&fit=crop',
    rating: 4.8,
    ratingCount: 500,
    distance: '0.8km',
    time: '15 min',
    tags: ['Burger', 'American'],
    discount: '50% Off'
  },
  {
    id: '3',
    name: 'Cheese Coffee - Lê Đại Hành',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600&h=400&fit=crop',
    rating: 4.9,
    ratingCount: 200,
    distance: '2.5km',
    time: '30 min',
    tags: ['Coffee', 'Drinks'],
    discount: 'Price 29k'
  },
  {
    id: '4',
    name: 'KFC - Vạn Phúc',
    image: 'https://antt.mediacdn.vn/83577812655439872/2025/6/26/screenshot-2025-06-26-at-08-31-06-17509014757301726905524.png',
    rating: 4.2,
    ratingCount: 150,
    distance: '3.0km',
    time: '35 min',
    tags: ['Chicken'],
    discount: 'Free Pepsi'
  }
];

export const VOUCHERS: Voucher[] = [
  { id: '1', code: 'FREESHIP', description: 'Giảm 15k phí ship', minOrder: 'Đơn tối thiểu 100k', expiry: 'HSD: 30/12' },
  { id: '2', code: 'GIAM10', description: 'Giảm 10% tối đa 50k', minOrder: 'Cho đơn từ 200k', expiry: 'Hết hạn ngày mai' },
  { id: '3', code: 'BANMOI', description: 'Giảm 20k trực tiếp', minOrder: 'Áp dụng cho đơn đầu tiên', expiry: 'Sắp hết lượt' },
];

export const SAMPLE_DISH: Dish = {
  id: 'd1',
  restaurantId: 'r_detail',
  name: 'Bún Bò Huế Đặc Biệt',
  description: 'Hương vị đậm đà chuẩn gốc Huế với nước dùng hầm xương 24h, thịt bò tái mềm, chả cua dai ngon và rau sống tươi sạch.',
  price: 55000,
  image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&h=600&fit=crop',
  originalPrice: 65000,
};

export const SEARCH_RESULTS: Restaurant[] = [
  {
    id: 's1',
    name: 'Cơm Tấm Sà Bì Chưởng',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&h=400&fit=crop',
    rating: 4.8,
    ratingCount: 1200,
    distance: '1.5km',
    time: '25 phút',
    tags: ['Cơm tấm', 'Sườn bì'],
    discount: 'Freeship',
    isOpen: true
  },
  {
    id: 's2',
    name: 'Cơm Tấm Phúc Lộc Thọ',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&h=400&fit=crop',
    rating: 4.6,
    ratingCount: 524,
    distance: '0.8km',
    time: '20 phút',
    tags: ['Cơm tấm', 'Truyền thống'],
    discount: 'Giảm 30%',
    isOpen: true
  },
  {
    id: 's3',
    name: 'Cơm Tấm Ba Ghiền',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop',
    rating: 4.9,
    ratingCount: 2300,
    distance: '2.1km',
    time: '35-45 phút',
    tags: ['Sườn khổng lồ'],
    discount: 'Giảm 15k',
    isOpen: true
  },
  {
    id: 's4',
    name: 'Cơm Tấm Đêm',
    image: 'https://tse3.mm.bing.net/th/id/OIP.-TUw8FwpHGiiakSYoPEs1gHaEP?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3',
    rating: 4.3,
    ratingCount: 89,
    distance: '3.0km',
    time: '10-15 phút',
    tags: ['Phục vụ xuyên đêm'],
    isOpen: true
  }
];

export const HISTORY_TAGS = ['Cơm tấm sườn bì', 'Trà sữa trân châu', 'Bún bò Huế', 'Pizza Company'];

export const SUGGESTED_RESTAURANTS: Restaurant[] = [
  { id: 'sg1', name: 'Gà Rán KFC', image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=100&h=100', rating: 4.5, ratingCount: 200, distance: '1km', time: '20m', tags: ['Burger', 'Cơm gà'] },
  { id: 'sg2', name: 'Cơm Tấm Cali', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=100&h=100', rating: 4.2, ratingCount: 150, distance: '2km', time: '30m', tags: ['Cơm tấm', 'Sườn bì'] },
  { id: 'sg3', name: 'Trà Sữa Gong Cha', image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=100&h=100', rating: 4.8, ratingCount: 400, distance: '0.5km', time: '10m', tags: ['Trà sữa'] },
  { id: 'sg4', name: 'The Pizza Company', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=100&h=100', rating: 4.4, ratingCount: 320, distance: '3km', time: '40m', tags: ['Pizza', 'Hải sản'] },
  { id: 'sg5', name: 'Phở Thìn Lò Đúc', image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=100&h=100', rating: 4.6, ratingCount: 800, distance: '1.2km', time: '25m', tags: ['Phở tái lăn'] },
  { id: 'sg6', name: 'Bánh Mì Huỳnh Hoa', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=100&h=100', rating: 4.9, ratingCount: 1500, distance: '4km', time: '45m', tags: ['Bánh mì thịt'] },
];