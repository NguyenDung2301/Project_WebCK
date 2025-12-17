import { Order, TabItem } from './types';

export const TABS: TabItem[] = [
  { id: 'all', label: 'Tất cả', count: 10 },
  { id: 'ordering', label: 'Đang đặt', count: 1 },
  { id: 'delivering', label: 'Đang giao', count: 1 },
  { id: 'delivered', label: 'Đã giao' }, // Often shows history
  { id: 'rating', label: 'Đánh giá' },
];

export const MOCK_ORDERS: Order[] = [
  // To Rate (Cần đánh giá)
  {
    id: '1',
    restaurantName: 'Cơm Tấm Sài Gòn – Nguyễn Trãi',
    image: 'https://picsum.photos/id/43/100/100',
    orderTime: 'Đặt lúc 10:30 • 24 Th10, 2023',
    description: 'Cơm sườn bì chả đặc biệt, hương vị đậm đà',
    totalPrice: '135.000đ',
    status: 'rate_pending',
  },
  // Ordering (Đang đặt)
  {
    id: '2',
    restaurantName: 'Highlands Coffee – Vincom Center',
    image: 'https://picsum.photos/id/225/100/100',
    orderTime: 'Đặt lúc 10:45 • 24 Th10, 2023',
    description: 'Cà phê đen truyền thống',
    totalPrice: '85.000đ',
    status: 'pending',
    statusLabel: 'Đang chuẩn bị'
  },
  // Delivering (Đang giao)
  {
    id: '3',
    restaurantName: 'Cơm Tấm Sài Gòn – Nguyễn Trãi',
    image: 'https://picsum.photos/id/43/100/100',
    orderTime: 'Đặt lúc 10:30 • 24 Th10, 2023',
    description: 'Cơm sườn bì chả đặc biệt, hương vị đậm đà',
    totalPrice: '135.000đ',
    status: 'delivering',
    deliveryEstimate: 'Dự kiến giao trong 10-15 phút'
  },
  // Delivered / Completed History
  {
    id: '4',
    restaurantName: 'Cơm Tấm Sài Gòn – Nguyễn Trãi',
    image: 'https://picsum.photos/id/43/100/100',
    orderTime: 'Đặt lúc 10:30 • 24 Th10, 2023',
    description: 'Món ăn ngon đậm đà hương vị Sài Gòn',
    totalPrice: '135.000đ',
    status: 'completed',
  },
  // Cancelled
  {
    id: '5',
    restaurantName: 'Bún Đậu Mắm Tôm – Cô Ba',
    image: 'https://picsum.photos/id/292/100/100',
    orderTime: 'Đặt lúc 10:45 • 24 Th10, 2023',
    description: 'Mẹt bún đậu đầy đủ hương vị truyền thống',
    totalPrice: '85.000đ',
    status: 'cancelled',
  },
  // Completed 2
  {
    id: '6',
    restaurantName: 'Phở Cuốn – Hàng Than',
    image: 'https://picsum.photos/id/1080/100/100',
    orderTime: 'Đặt lúc 10:50 • 24 Th10, 2023',
    description: 'Món phở cuốn thanh mát, nước chấm đậm đà',
    totalPrice: '55.000đ',
    status: 'completed',
  },
  // Waiting Confirmation (Đã giao -> Confirm Received)
  {
    id: '7',
    restaurantName: 'Cơm Tấm Sài Gòn – Nguyễn Trãi',
    image: 'https://picsum.photos/id/43/100/100',
    orderTime: 'Đặt lúc 10:30 • 24 Th10, 2023',
    description: 'Cơm sườn bì chả đặc biệt, hương vị đậm đà',
    totalPrice: '135.000đ',
    status: 'delivered', 
    statusLabel: 'Giao hàng thành công'
  }
];