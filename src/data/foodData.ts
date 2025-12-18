
import { Restaurant, Category, Food, FoodItemUI } from '../types';

// 1. Cấu trúc Cửa hàng
export const db_restaurants: Restaurant[] = [
  {
    _id: 'res-001',
    name: 'Cơm Tấm & Bánh Mì Việt',
    address: '123 Nguyễn Trãi, Quận 1, TP.HCM',
    phone: '0901234567',
    description: 'Chuyên các món ăn truyền thống Việt Nam nhanh gọn.',
    ownerId: 'user-admin-01',
    openTime: '06:00',
    closeTime: '22:00',
    rating: 4.8,
    createdAt: '2023-01-01T00:00:00Z',
    logo: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=100&q=80'
  },
  {
    _id: 'res-002',
    name: 'Phở Thìn Lò Đúc',
    address: '13 Lò Đúc, Hai Bà Trưng, Hà Nội',
    phone: '0907654321',
    description: 'Phở bò tái lăn gia truyền nổi tiếng Hà Thành.',
    ownerId: 'user-owner-02',
    openTime: '05:30',
    closeTime: '21:00',
    rating: 4.9,
    createdAt: '2023-02-15T00:00:00Z',
    logo: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=100&q=80'
  },
  {
    _id: 'res-003',
    name: 'Pizza & Pasta 4P\'s',
    address: '8/15 Lê Thánh Tôn, Quận 1',
    phone: '0909998887',
    description: 'Pizza thủ công phong cách Nhật-Ý.',
    ownerId: 'user-owner-03',
    openTime: '10:00',
    closeTime: '23:00',
    rating: 4.7,
    createdAt: '2023-03-10T00:00:00Z',
    logo: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=100&q=80'
  }
];

// 2. Danh mục
export const db_categories: Category[] = [
  { _id: 'cat-001', name: 'Cơm & Bánh mì', restaurantId: 'res-001' },
  { _id: 'cat-002', name: 'Bún & Phở', restaurantId: 'res-002' },
  { _id: 'cat-003', name: 'Pizza', restaurantId: 'res-003' },
];

// 3. Món ăn cơ bản
export const db_foods: Food[] = [
  {
    _id: 'food-001',
    name: 'Cơm Tấm Sườn Bì Chả',
    price: 55000,
    description: 'Sườn nướng than hoa thơm lừng.',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    restaurantId: 'res-001',
    categoryId: 'cat-001',
    createdAt: '2023-05-01T10:00:00Z',
    promo: 'Freeship',
    rating: '4.8'
  },
  {
    _id: 'food-002',
    name: 'Phở Bò Tái Lăn',
    price: 65000,
    description: 'Thịt bò xào tái lăn tỏi thơm phức.',
    image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    restaurantId: 'res-002',
    categoryId: 'cat-002',
    createdAt: '2023-05-02T10:00:00Z',
    promo: 'Giảm 15k',
    rating: '4.9'
  }
];

// Tạo thêm dữ liệu mẫu ngẫu nhiên có logic
const generateMoreFoods = () => {
  const extra: Food[] = [];
  const templates = [
    { name: 'Bánh mì thịt nướng', store: 'res-001', cat: 'cat-001', kw: 'banh-mi' },
    { name: 'Cơm gà xối mỡ', store: 'res-001', cat: 'cat-001', kw: 'chicken-rice' },
    { name: 'Phở bò chín', store: 'res-002', cat: 'cat-002', kw: 'noodle-soup' },
    { name: 'Bún chả Hà Nội', store: 'res-002', cat: 'cat-002', kw: 'bun-cha' },
    { name: 'Pizza Hải Sản', store: 'res-003', cat: 'cat-003', kw: 'pizza' },
    { name: 'Mì Ý Sốt Bò Băm', store: 'res-003', cat: 'cat-003', kw: 'pasta' },
  ];

  for (let i = 0; i < 30; i++) {
    const t = templates[i % templates.length];
    extra.push({
      _id: `food-extra-${i}`,
      name: `${t.name} #${i + 1}`,
      price: 25000 + (Math.floor(Math.random() * 15) * 5000),
      description: 'Hương vị tuyệt vời từ nguyên liệu tươi sạch.',
      image: `https://images.unsplash.com/featured/?${t.kw},food&sig=${i}`,
      isAvailable: true,
      restaurantId: t.store,
      categoryId: t.cat,
      createdAt: new Date().toISOString(),
      rating: (4.0 + Math.random()).toFixed(1)
    });
  }
  return extra;
};

export const all_db_foods = [...db_foods, ...generateMoreFoods()];

export const allFoodItems: FoodItemUI[] = all_db_foods.map(food => {
  const restaurant = db_restaurants.find(r => r._id === food.restaurantId) || db_restaurants[0];
  const category = db_categories.find(c => c._id === food.categoryId) || db_categories[0];

  return {
    ...food,
    id: food._id,
    img: food.image,
    tags: `${category.name}, ${restaurant.name}`,
    deliveryTime: '20-30 phút',
    distance: '1.2 km',
    category: category.name,
    reviewCount: 150 + Math.floor(Math.random() * 300),
    store: {
      name: restaurant.name,
      address: restaurant.address,
      logo: restaurant.logo || '',
      isOpen: true
    }
  };
});
