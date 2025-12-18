
const STORAGE_KEY = 'food_delivery_orders';

export interface OrderUI {
  id: string;
  userId: string;
  storeName: string;
  status: string;
  orderTime: string;
  itemName: string;
  price: number;
  img: string;
  createdAt: string;
}

export const orderApi = {
  getAll: (): OrderUI[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      // Khởi tạo danh sách trống thay vì dữ liệu mẫu rác
      const initial: OrderUI[] = [];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(data);
  },

  saveAll: (orders: OrderUI[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  },

  add: (order: OrderUI): OrderUI[] => {
    const orders = orderApi.getAll();
    // Thêm vào đầu mảng
    const updated = [order, ...orders];
    orderApi.saveAll(updated);
    return updated;
  },

  delete: (id: string): OrderUI[] => {
    const orders = orderApi.getAll();
    const updated = orders.filter(o => o.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  }
};
