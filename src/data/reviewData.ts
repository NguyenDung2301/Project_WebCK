
import { Review } from '../types';

export const initialReviews: Review[] = [
  {
    _id: 'rev-001',
    foodId: 'food-001',
    userId: 'user-customer-01',
    userName: 'Nguyễn Văn A',
    rating: 5,
    comment: 'Cơm tấm sườn nướng rất thơm, miếng sườn to và mềm. Nước mắm pha vừa miệng, bì chả cũng rất ngon. Sẽ quay lại ủng hộ quán!',
    createdAt: '2023-10-20T18:30:00Z',
    images: ['https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=150&q=80']
  },
  {
    _id: 'rev-002',
    foodId: 'food-001',
    userId: 'user-customer-02',
    userName: 'Trần Thị H.',
    rating: 4,
    comment: 'Đồ ăn ngon, giao hàng nhanh. Tuy nhiên sườn hôm nay hơi cháy một chút, hy vọng lần sau quán chú ý hơn.',
    createdAt: '2023-10-19T12:15:00Z'
  },
  {
    _id: 'rev-003',
    foodId: 'food-002',
    userId: 'user-customer-03',
    userName: 'Lê Minh',
    rating: 5,
    comment: 'Phở Thìn thì không cần bàn cãi về chất lượng rồi. Nước dùng béo ngậy, thịt bò xào tái lăn rất thơm mùi tỏi.',
    createdAt: '2023-10-15T19:45:00Z',
    images: ['https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=150&q=80']
  },
  {
    _id: 'rev-004',
    foodId: 'food-001',
    userId: 'user-customer-03',
    userName: 'Hoàng Thu Thảo',
    rating: 5,
    comment: 'Thích nhất là canh khổ qua ở đây, ăn kèm cơm tấm sườn rất hợp.',
    createdAt: '2023-11-05T09:15:00Z'
  }
];
