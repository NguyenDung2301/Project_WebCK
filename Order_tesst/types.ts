export type OrderStatus = 
  | 'pending'      // Đang chuẩn bị (Waiting/Preparing)
  | 'delivering'   // Đang giao (Delivering)
  | 'delivered'    // Đã giao (Delivered/Waiting for confirmation)
  | 'completed'    // Hoàn tất (Completed history)
  | 'cancelled'    // Đã hủy (Cancelled)
  | 'rate_pending'; // Cần đánh giá (To Rate)

export interface Order {
  id: string;
  restaurantName: string;
  image: string;
  orderTime: string; // e.g., "Đặt lúc 10:30 • 24 Th10, 2023"
  description: string;
  totalPrice: string; // formatted currency e.g., "135.000đ"
  status: OrderStatus;
  statusLabel?: string; // Custom label for the badge if needed
  deliveryEstimate?: string; // e.g., "Dự kiến giao trong 10-15 phút"
}

export type TabId = 'all' | 'ordering' | 'delivering' | 'delivered' | 'rating';

export interface TabItem {
  id: TabId;
  label: string;
  count?: number;
}