
import { FoodItem, Restaurant, Voucher, Order } from './types';

export const CATEGORIES = [
  { id: 'rice', name: 'Rice', image: 'https://th.bing.com/th/id/R.423482e4ae037cdf079bb4b9f2b1282e?rik=EnSelCZ%2fUIQJnw&riu=http%3a%2f%2ffarm1.static.flickr.com%2f1%2f374797_4d0272f14f_o.jpg&ehk=pHcjOEW%2bkNCObjwbnsCmMvs5ayslZTpECQ9O38OVRdM%3d&risl=&pid=ImgRaw&r=0' },
  { id: 'broken-rice', name: 'Broken rice', image: 'https://tse3.mm.bing.net/th/id/OIP.Qjxg1VqfTvR1kkOzjBMZ2QHaE8?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3' },
  { id: 'salad', name: 'Salad', image: 'https://th.bing.com/th/id/OIP.NCKIo1aI0LuE8tQbzgd9qwHaFj?o=7&cb=ucfimg2&rm=3&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3' },
  { id: 'chicken', name: 'Chicken', image: 'https://th.bing.com/th/id/R.a6ec9b2c550894f71623aa0537eed6eb?rik=e1vFzafK3hbbvw&pid=ImgRaw&r=0' },
  { id: 'noodles', name: 'Noodles', image: 'https://th.bing.com/th/id/OIP.nsRO0D1s6jDn0xxeXgaKMgHaE8?o=7&cb=ucfimg2&rm=3&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3' },
  { id: 'drinks', name: 'Drinks', image: 'https://tse3.mm.bing.net/th/id/OIP.guWgpXKMPH22aw7f2FEUIwHaLH?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3' },
  { id: 'burger', name: 'Burger', image: 'https://th.bing.com/th/id/OIP.swj8Jny2lUSn_zfPaeJQawHaHa?w=187&h=187&c=7&r=0&o=7&cb=ucfimg2&dpr=1.3&pid=1.7&rm=3&ucfimg=1' },
];

export const MOCK_RESTAURANTS: Restaurant[] = [
  {
    id: 'r1',
    name: 'Quán Ngon Nhà Làm',
    address: '123 Đường ABC, Quận 1, TP.HCM',
    rating: 4.8,
    reviewsCount: 256,
    isOpen: true,
    imageUrl: 'https://picsum.photos/id/12/50/50'
  }
];

export const MOCK_FOODS: FoodItem[] = [
  {
    id: '1',
    name: 'Cơm Tấm Sườn Bì Chả',
    description: 'Sườn nướng than hồng, chả trứng, bì heo, canh chua',
    price: 55000,
    rating: 4.8,
    reviewsCount: 120,
    distance: 1.5,
    deliveryTime: '25 phút',
    imageUrl: 'https://th.bing.com/th/id/OIP.8GAh0bNWkpIrt6dJU2m0YgHaEK?o=7&cb=ucfimg2&rm=3&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3',
    category: 'rice',
    isPromo: true,
    promoTag: 'Freeship'
  },
  {
    id: '2',
    name: 'Trà Sữa Trân Châu Gong Cha',
    description: 'Trà sữa truyền thống kèm trân châu đen dai giòn, độ ngọt vừa phải.',
    price: 45000,
    originalPrice: 55000,
    rating: 4.7,
    reviewsCount: 1540,
    distance: 0.5,
    deliveryTime: '15 phút',
    imageUrl: 'https://th.bing.com/th/id/OIP.4TIdR6XSMxgywYulsABxngHaG8?w=213&h=200&c=7&r=0&o=7&cb=ucfimg2&dpr=1.3&pid=1.7&rm=3&ucfimg=1',
    category: 'drinks',
    isPromo: true,
    promoTag: 'Mua 1 tặng 1'
  },
  {
    id: '3',
    name: 'Pizza Hải Sản Đào - The Pizza Company',
    description: 'Pizza đế dày với tôm, mực, thanh cua và những miếng đào tươi mọng nước.',
    price: 289000,
    rating: 4.9,
    reviewsCount: 890,
    distance: 2.3,
    deliveryTime: '30-40 phút',
    imageUrl: 'https://www.foodandwine.com/thmb/Wd4lBRZz3X_8qBr69UOu2m7I2iw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg',
    category: 'burger',
    isPromo: true,
    promoTag: 'Giảm 50k'
  },
  {
    id: 'p1-food',
    name: 'Gà Rán Popeyes - Giòn Tan',
    description: 'Gà rán truyền thống Popeyes với lớp vỏ giòn rụm và thịt gà mọng nước thơm ngon.',
    price: 99000,
    rating: 4.6,
    reviewsCount: 450,
    distance: 1.2,
    deliveryTime: '20 phút',
    imageUrl: 'https://th.bing.com/th/id/OIP.QaqikEXV5p1DVKqj15eYlgHaE8?o=7&cb=ucfimg2&rm=3&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3',
    category: 'chicken',
    isPromo: true,
    promoTag: 'Mua 1 tặng 1'
  },
  {
    id: 'p2-food',
    name: 'Big Mac McDonald\'s',
    description: 'Hamburger bò huyền thoại với 2 lớp bò, phô mai và sốt Big Mac đặc trưng.',
    price: 85000,
    rating: 4.5,
    reviewsCount: 2300,
    distance: 0.8,
    deliveryTime: '15 phút',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=600&h=400',
    category: 'burger',
    isPromo: true,
    promoTag: 'Giảm 50%'
  },
  {
    id: 'p3-food',
    name: 'Cafe Muối Cheese Coffee',
    description: 'Hương vị cafe đậm đà kết hợp lớp kem phô mai béo ngậy và chút muối tinh tế.',
    price: 49000,
    rating: 4.8,
    reviewsCount: 670,
    distance: 1.5,
    deliveryTime: '10 phút',
    imageUrl: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=600&h=400',
    category: 'drinks',
    isPromo: true,
    promoTag: 'Đồng giá 29k'
  },
  {
    id: 'p4-food',
    name: 'Combo Gà Rán KFC - Vạn Phúc',
    description: '2 Miếng Gà Rán Giòn Cay + 1 Khoai Tây Chiên Vừa + 1 Pepsi Tươi mát lạnh. Tặng kèm Pepsi cho đơn hàng FoodDelivery.',
    price: 89000,
    originalPrice: 125000,
    rating: 4.7,
    reviewsCount: 1540,
    distance: 0.5,
    deliveryTime: '15 phút',
    imageUrl: 'https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?auto=format&fit=crop&q=80&w=600&h=400',
    category: 'chicken',
    isPromo: true,
    promoTag: 'Tặng Pepsi'
  },
  {
    id: 'p5-food',
    name: 'Burger Zinger KFC - Vạn Phúc',
    description: 'Hương vị Burger Zinger huyền thoại với nhân gà giòn cay, xà lách tươi và sốt Mayo béo ngậy.',
    price: 54000,
    originalPrice: 65000,
    rating: 4.8,
    reviewsCount: 850,
    distance: 0.5,
    deliveryTime: '12 phút',
    imageUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=600&h=400',
    category: 'burger',
    isPromo: true,
    promoTag: 'Siêu Deal'
  },
  {
    id: 'f-bundau',
    name: 'Bún Đậu Mắm Tôm – Cô Ba',
    description: 'Mẹt bún đậu đầy đủ hương vị truyền thống',
    price: 85000,
    rating: 4.7,
    reviewsCount: 1200,
    distance: 1.8,
    deliveryTime: '20 phút',
    imageUrl: 'https://tse4.mm.bing.net/th/id/OIP.4XApJYzsAEXrejts9uhx9AHaHa?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3',
    category: 'noodles'
  },
  {
    id: 'f-phocuon',
    name: 'Phở Cuốn – Hàng Than',
    description: 'Món phở cuốn thanh mát, nước chấm đậm đà',
    price: 55000,
    rating: 4.9,
    reviewsCount: 450,
    distance: 2.5,
    deliveryTime: '30 phút',
    imageUrl: 'https://th.bing.com/th/id/OIP.2vtQ8tOleSxsjQVtYpbydQHaEK?o=7&cb=ucfimg2&rm=3&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3',
    category: 'noodles'
  }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ord-kfc-1',
    foodId: 'p4-food',
    restaurantName: 'KFC - Vạn Phúc',
    orderTime: '12:00 • 25 Th10, 2023',
    description: 'Combo Gà Rán KFC - Vạn Phúc (x1)',
    totalAmount: 89000,
    status: 'COMPLETED',
    imageUrl: 'https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?auto=format&fit=crop&q=80&w=200&h=150',
    isReviewed: true
  },
  {
    id: 'ord4',
    foodId: 'p3-food',
    restaurantName: 'Highlands Coffee - Vincom Center',
    orderTime: '10:45 • 24 Th10, 2023',
    description: 'Cafe Muối Cheese Coffee (x1)',
    totalAmount: 85000,
    status: 'PENDING',
    imageUrl: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=200&h=150'
  },
  {
    id: 'ord5',
    foodId: '1',
    restaurantName: 'Cơm Tấm Sài Gòn – Nguyễn Trãi',
    orderTime: '10:30 • 24 Th10, 2023',
    description: 'Cơm Tấm Sườn Bì Chả (x1)',
    totalAmount: 135000,
    status: 'DELIVERING',
    imageUrl: 'https://th.bing.com/th/id/OIP.yA69mJN5JbyUU2m-GML_hAHaFh?o=7&cb=ucfimg2&rm=3&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3'
  },
  {
    id: 'ord6',
    foodId: '1',
    restaurantName: 'Cơm Tấm Sài Gòn – Nguyễn Trãi',
    orderTime: '10:15 • 24 Th10, 2023',
    description: 'Cơm Tấm Sườn Bì Chả (x1)',
    totalAmount: 135000,
    status: 'COMPLETED',
    imageUrl: 'https://th.bing.com/th/id/OIP.yA69mJN5JbyUU2m-GML_hAHaFh?o=7&cb=ucfimg2&rm=3&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3',
    needsReview: true
  },
  {
    id: 'ord1',
    foodId: '1',
    restaurantName: 'Cơm Tấm Sài Gòn – Nguyễn Trãi',
    orderTime: '09:30 • 24 Th10, 2023',
    description: 'Cơm Tấm Sườn Bì Chả (x1)',
    totalAmount: 135000,
    status: 'COMPLETED',
    imageUrl: 'https://th.bing.com/th/id/OIP.yA69mJN5JbyUU2m-GML_hAHaFh?o=7&cb=ucfimg2&rm=3&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3'
  },
  {
    id: 'ord2',
    foodId: 'f-bundau',
    restaurantName: 'Bún Đậu Mắm Tôm – Cô Ba',
    orderTime: '10:45 • 23 Th10, 2023',
    description: 'Bún Đậu Mắm Tôm – Cô Ba (x1)',
    totalAmount: 85000,
    status: 'CANCELLED',
    imageUrl: 'https://tse4.mm.bing.net/th/id/OIP.4XApJYzsAEXrejts9uhx9AHaHa?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3'
  },
  {
    id: 'ord3',
    foodId: 'f-phocuon',
    restaurantName: 'Phở Cuốn – Hàng Than',
    orderTime: '10:50 • 22 Th10, 2023',
    description: 'Phở Cuốn – Hàng Than (x1)',
    totalAmount: 55000,
    status: 'COMPLETED',
    imageUrl: 'https://th.bing.com/th/id/OIP.2vtQ8tOleSxsjQVtYpbydQHaEK?o=7&cb=ucfimg2&rm=3&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3'
  }
];

export const MOCK_PROMOTIONS = [
  { id: 'p1', name: 'Popeyes - Nhà Chung', type: 'Freeship', vendor: 'FoodDelivery', image: 'https://th.bing.com/th/id/OIP.QaqikEXV5p1DVKqj15eYlgHaE8?o=7&cb=ucfimg2&rm=3&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3', action: 'Mua 1 tặng 1', foodId: 'p1-food' },
  { id: 'p2', name: "McDonald's - Hồ Gươm", type: 'Promo', vendor: 'FoodDelivery', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=300&h=200', action: 'Giảm 50% đơn đầu', foodId: 'p2-food' },
  { id: 'p3', name: 'Cheese Coffee - Lê Đại Hành', type: 'Promo', vendor: 'FoodDelivery', image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=300&h=200', action: 'Đồng giá 29k', foodId: 'p3-food' },
  { id: 'p4', name: 'KFC - Vạn Phúc', type: 'Promo', vendor: 'FoodDelivery', image: 'https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?auto=format&fit=crop&q=80&w=300&h=200', action: 'Tặng Pepsi tươi', foodId: 'p4-food' },
];

export const MOCK_VOUCHERS: Voucher[] = [
  { id: 'v1', title: 'Giảm 15k phí ship', condition: 'Đơn từ tối thiểu 100k', type: 'FREESHIP' },
  { id: 'v2', title: 'Giảm 10% tối đa 50k', condition: 'Cho đơn từ 200k', type: 'DISCOUNT' },
  { id: 'v3', title: 'Giảm 20k trực tiếp', condition: 'Áp dụng cho đơn đầu tiên', type: 'CASHBACK' },
  { id: 'v4', title: 'Siêu Deal Cuối Tuần', condition: 'Hết hạn hôm qua', type: 'DISCOUNT', isExpired: true },
];

export const RECENT_SEARCHES = [
  'Cơm tấm sườn bì', 
  'Trà sữa trân châu', 
  'Bún bò Huế', 
  'Pizza Company',
  'Bánh xèo giòn',
  'Chả cá Lã Vọng',
  'Nem nướng Nha Trang',
  'Cafe muối'
];

export const SUGGESTIONS = [
  { name: 'Gà Rán KFC', tag: 'Burger, Cơm gà', image: 'https://tse1.mm.bing.net/th/id/OIP.3GS6G3JJiL_63XXnlQ9n6wHaEo?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3' },
  { name: 'Cơm Tấm Cali', tag: 'Cơm tấm, Sườn bì', image: 'https://tse4.mm.bing.net/th/id/OIP._mnYbHAHBPK1WPzxPUkguAHaEO?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3' },
  { name: 'Trà Sữa Gong Cha', tag: 'Trà sữa trân châu', image: 'https://th.bing.com/th/id/OIP.4TIdR6XSMxgywYulsABxngHaG8?w=213&h=200&c=7&r=0&o=7&cb=ucfimg2&dpr=1.3&pid=1.7&rm=3&ucfimg=1' },
  { name: 'The Pizza Company', tag: 'Pizza Hải Sản', image: 'https://www.foodandwine.com/thmb/Wd4lBRZz3X_8qBr69UOu2m7I2iw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg',
},
  { name: 'Phở Thìn Lò Đúc', tag: 'Phở tái lăn', image: 'https://tse4.mm.bing.net/th/id/OIP.tFgS0ybRN0GJPlp8Lej3kAHaFF?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3' },
  { name: 'Bánh Mì Huỳnh Hoa', tag: 'Bánh mì thịt', image: 'https://tse1.mm.bing.net/th/id/OIP.xn0hm9BQyi8WWCEjJXfNSgHaEg?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3' },
  { name: 'Bánh Xèo Mười Xiềm', tag: 'Bánh xèo đặc sản', image: 'https://picsum.photos/id/493/80/80' },
  { name: 'Chả Cá Anh Vũ', tag: 'Chả cá Lã Vọng', image: 'https://picsum.photos/id/312/81/80' },
  { name: 'Nem Nướng Đặng Văn Quyên', tag: 'Nem nướng Ninh Hòa', image: 'https://picsum.photos/id/102/81/80' },
  { name: 'The Coffee House', tag: 'Cafe muối, Trà đào', image: 'https://picsum.photos/id/431/80/80' },
];
