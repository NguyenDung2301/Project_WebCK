
import { OrderStatus, Order, Activity, TopItem, TopRestaurant } from './types';

export const MOCK_STATS = {
  monthlyRevenue: 1800000000,
  dailyRevenue: 45200000,
  activeUsers: 8540,
  totalRestaurants: 482
};

export const MOCK_ORDERS: Order[] = [
  { id: '#ORD-9281', customer: 'Nguyễn Thị A', restaurant: 'Cơm Tấm Sài Gòn', total: 125000, status: OrderStatus.COMPLETED, timestamp: '15/12/2025 10:30', avatar: 'N' },
  { id: '#ORD-9282', customer: 'Lê Minh B', restaurant: 'Phở Lý Quốc Sư', total: 85000, status: OrderStatus.DELIVERING, timestamp: '15/12/2025 11:15', avatar: 'L' },
  { id: '#ORD-9283', customer: 'Trần Hoàng C', restaurant: "Pizza 4P's", total: 350000, status: OrderStatus.PREPARING, timestamp: '15/12/2025 11:45', avatar: 'T' },
  { id: '#ORD-9285', customer: 'Vũ Văn E', restaurant: 'Burger King', total: 180000, status: OrderStatus.CANCELLED, timestamp: '15/12/2025 09:10', avatar: 'V' },
  { id: '#ORD-9286', customer: 'Phạm Thị F', restaurant: 'Highlands Coffee', total: 95000, status: OrderStatus.COMPLETED, timestamp: '15/12/2025 08:30', avatar: 'P' },
  { id: '#ORD-9287', customer: 'Đặng Văn G', restaurant: 'KFC', total: 215000, status: OrderStatus.PREPARING, timestamp: '15/12/2025 08:15', avatar: 'D' },
  { id: '#ORD-9288', customer: 'Hoàng Thị H', restaurant: 'Bún Chả Hương Liên', total: 110000, status: OrderStatus.COMPLETED, timestamp: '15/12/2025 08:05', avatar: 'H' },
];

export const MOCK_ACTIVITIES: Activity[] = [
  { id: '1', user: 'Nguyễn Văn A', action: 'vừa đặt đơn hàng', target: '#ORD-1234', time: '2 phút trước', type: 'order' },
  { id: '2', user: 'Đơn hàng', action: 'đã giao thành công', target: '#ORD-1229', time: '15 phút trước', type: 'delivery' },
  { id: '3', user: 'Trần Thị B', action: 'đang chờ xác nhận đơn', target: '#ORD-1235', time: '20 phút trước', type: 'waiting' },
  { id: '4', user: 'Đơn hàng', action: 'đã bị hủy bởi khách', target: '#ORD-1201', time: '1 giờ trước', type: 'cancellation' },
];

export const MOCK_TOP_ITEMS: TopItem[] = [
  { id: '1029', name: 'Burger Bò Phô Mai', sales: 156, image: 'https://picsum.photos/seed/burger/100/100' },
  { id: '2045', name: 'Pizza Hải Sản', sales: 120, image: 'https://picsum.photos/seed/pizza/100/100' },
  { id: '3310', name: 'Combo Sushi 12 miếng', sales: 98, image: 'https://picsum.photos/seed/sushi/100/100' },
  { id: '1102', name: 'Mì Ý Sốt Bò Băm', sales: 65, image: 'https://picsum.photos/seed/pasta/100/100' },
];

export const MOCK_TOP_RESTAURANTS: TopRestaurant[] = [
  { id: 'RES-001', name: 'KFC Vietnam', revenue: 2400000000, logoInitial: 'K', color: 'red' },
  { id: 'RES-002', name: "McDonald's", revenue: 2100000000, logoInitial: 'M', color: 'amber' },
  { id: 'RES-003', name: 'Pizza Hut', revenue: 1800000000, logoInitial: 'P', color: 'blue' },
  { id: 'RES-004', name: 'Lotteria', revenue: 1500000000, logoInitial: 'L', color: 'orange' },
];

export const REVENUE_CHART_DATA = [
  { name: 'T1', value: 1.2 },
  { name: 'T2', value: 1.5 },
  { name: 'T3', value: 1.8 },
  { name: 'T4', value: 1.4 },
  { name: 'T5', value: 2.0 },
  { name: 'T6', value: 2.2 },
  { name: 'T7', value: 2.5 },
  { name: 'T8', value: 2.1 },
  { name: 'T9', value: 1.9 },
  { name: 'T10', value: 2.3 },
  { name: 'T11', value: 2.4 },
  { name: 'T12', value: 2.6 },
];

export const STATUS_CHART_DATA = [
  { name: 'Hoàn thành', value: 65, color: '#10B981' },
  { name: 'Đang chuẩn bị', value: 15, color: '#F59E0B' },
  { name: 'Đang giao', value: 12, color: '#3B82F6' },
  { name: 'Đã hủy', value: 8, color: '#EF4444' },
];
