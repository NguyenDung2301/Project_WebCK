
import { orderApi, OrderUI } from '../api/orderApi';
import { generateId } from '../utils/helpers';

export const orderService = {
  // Lấy tất cả đơn hàng (cho Admin) - Sắp xếp mới nhất lên đầu
  getAllOrders: (): OrderUI[] => {
    const orders = orderApi.getAll();
    return [...orders].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  // Lấy đơn hàng riêng của từng User - Sắp xếp mới nhất lên đầu
  getOrdersByUserId: (userId: string): OrderUI[] => {
    const all = orderApi.getAll();
    return all
      .filter(order => order.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  addOrder: (orderData: Omit<OrderUI, 'id' | 'orderTime' | 'createdAt'>): OrderUI => {
    const now = new Date();
    const newOrder: OrderUI = {
      ...orderData,
      id: generateId('ORD'),
      // Định dạng hiển thị: HH:mm:ss • DD ThMM, YYYY (Thêm giây để phân biệt đơn hàng)
      orderTime: `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')} • ${now.getDate()} Th${now.getMonth() + 1}, ${now.getFullYear()}`,
      createdAt: now.toISOString()
    };
    
    orderApi.add(newOrder);
    return newOrder;
  },

  deleteOrder: (id: string): OrderUI[] => {
    return orderApi.delete(id);
  }
};

export type { OrderUI };
