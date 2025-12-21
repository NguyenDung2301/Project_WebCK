
import { BackendUser } from '../types/user';
import { FoodItem, Voucher, Review, Restaurant, Order } from '../types/common'; // Order type for User View
import { ShipperOrder, OrderStatus, ShipperProfile } from '../types/shipper'; // Shipper Types
import { 
  INITIAL_USERS, 
  INITIAL_RESTAURANTS, 
  INITIAL_FOODS,
  INITIAL_CATEGORIES,
  INITIAL_VOUCHERS,
  INITIAL_PROMOTIONS,
  INITIAL_REVIEWS,
  INITIAL_SUGGESTIONS,
  INITIAL_DASHBOARD_DATA,
  INITIAL_MASTER_ORDERS,
  MasterOrder
} from './initialData';

/**
 * MockDatabase
 * Quản lý dữ liệu tập trung.
 * Order Data được lưu ở `masterOrders` và map ra các view khác nhau để đảm bảo đồng bộ.
 */
class MockDatabase {
  private users: BackendUser[];
  private restaurants: Restaurant[];
  private foods: FoodItem[];
  private masterOrders: MasterOrder[]; // Single Source of Truth
  private reviews: Review[];
  private categories: any[];
  private vouchers: Voucher[];
  private promotions: any[];
  private suggestions: any[];
  private dashboardData: any;

  constructor() {
    this.users = [...INITIAL_USERS];
    this.restaurants = [...INITIAL_RESTAURANTS];
    this.foods = [...INITIAL_FOODS];
    
    // LOAD PERSISTED ORDERS OR INITIALIZE
    const storedOrders = localStorage.getItem('mock_master_orders');
    if (storedOrders) {
      try {
        this.masterOrders = JSON.parse(storedOrders);
      } catch (e) {
        console.error('Failed to parse stored orders', e);
        this.masterOrders = [...INITIAL_MASTER_ORDERS];
      }
    } else {
      this.masterOrders = [...INITIAL_MASTER_ORDERS];
    }

    this.reviews = [...INITIAL_REVIEWS];
    this.categories = [...INITIAL_CATEGORIES];
    this.vouchers = [...INITIAL_VOUCHERS];
    this.promotions = [...INITIAL_PROMOTIONS];
    this.suggestions = [...INITIAL_SUGGESTIONS];
    this.dashboardData = INITIAL_DASHBOARD_DATA;
    console.log('[MockDatabase] Initialized Relational Data.');
  }

  private persistOrders() {
    try {
      localStorage.setItem('mock_master_orders', JSON.stringify(this.masterOrders));
    } catch (e) {
      console.error('Failed to persist orders', e);
    }
  }

  // ==========================================================
  // VIEW GENERATORS (Map Master Data to UI Specific Types)
  // ==========================================================

  /**
   * Tạo view đơn hàng cho User (đơn giản hóa)
   */
  getOrders(userId: string): Order[] {
    // Filter orders by specific userId
    // If userId is 'guest' or undefined, might return nothing or generic
    const targetId = userId || 'usr-1';
    const myOrders = this.masterOrders.filter(o => o.userId === targetId);

    return myOrders.map(mo => {
      const restaurant = this.restaurants.find(r => r.id === mo.restaurantId);
      const firstItem = mo.items[0];
      const food = this.foods.find(f => f.id === firstItem?.foodId);
      
      // Tạo mô tả món ăn từ danh sách items
      const description = mo.items.map(item => {
          const f = this.foods.find(fd => fd.id === item.foodId);
          return `${f?.name} (x${item.quantity})`;
      }).join(', ');

      return {
        id: mo.id,
        foodId: firstItem?.foodId || '', // Main food ID for navigation
        restaurantName: restaurant?.name || 'Unknown Restaurant',
        orderTime: mo.orderTime,
        description: description,
        totalAmount: mo.totalAmount,
        status: mo.status,
        imageUrl: food?.imageUrl || restaurant?.imageUrl || '',
        isReviewed: mo.isReviewed,
        needsReview: mo.needsReview
      };
    });
  }

  /**
   * Tạo view đơn hàng cho Shipper (chi tiết đầy đủ)
   */
  getShipperOrders(status?: OrderStatus | 'HISTORY'): ShipperOrder[] {
    let targetOrders = this.masterOrders;

    if (status === 'HISTORY') {
      targetOrders = this.masterOrders.filter(o => o.status === 'COMPLETED' || o.status === 'CANCELLED');
    } else if (status) {
      targetOrders = this.masterOrders.filter(o => o.status === status);
    }

    return targetOrders.map(mo => {
      const restaurant = this.restaurants.find(r => r.id === mo.restaurantId);
      const user = this.users.find(u => u.user_id === mo.userId) || { fullname: 'Khách lẻ', phone_number: '090xxxxxxx', email: '' };

      // Map items chi tiết
      const detailedItems = mo.items.map(item => {
        const food = this.foods.find(f => f.id === item.foodId);
        return {
          name: food?.name || 'Unknown Item',
          quantity: item.quantity,
          price: item.price
        };
      });

      // Split time string to get simple time for sorting/display if needed
      const timeDisplay = mo.orderTime.split('•')[0].trim();

      return {
        id: mo.id,
        storeName: restaurant?.name || 'Unknown Store',
        storeImage: restaurant?.imageUrl || '',
        storeAddress: restaurant?.address || '',
        deliveryAddress: mo.deliveryAddress,
        status: mo.status as OrderStatus,
        paymentMethod: mo.paymentMethod,
        time: timeDisplay + ' - ' + mo.orderTime.split('•')[1]?.trim(),
        totalAmount: mo.totalAmount,
        items: detailedItems,
        customer: {
          name: user.fullname || 'Khách vãng lai',
          phone: user.phone_number || '',
          email: user.email || '',
          avatar: '', // Mock avatar if needed
          rank: 'Thành viên'
        }
      };
    });
  }

  /**
   * Tạo view đơn hàng cho Admin (đầy đủ thông tin)
   */
  getAdminOrders() {
    return this.masterOrders.map(mo => {
      const restaurant = this.restaurants.find(r => r.id === mo.restaurantId);
      const user = this.users.find(u => u.user_id === mo.userId);
      
      return {
        id: mo.id,
        restaurantName: restaurant?.name || 'Unknown Restaurant',
        customer: user?.fullname || 'Khách vãng lai',
        email: user?.email || '',
        orderTime: mo.orderTime,
        totalAmount: mo.totalAmount,
        status: mo.status,
        paymentMethod: mo.paymentMethod,
        items: mo.items
      };
    });
  }

  // ==========================================================
  // ACTIONS (Update Master Data)
  // ==========================================================

  // --- USER ACTIONS ---
  createOrder(orderData: Partial<MasterOrder>) {
    // Generate simple ID
    const newId = `ord-${Date.now().toString().slice(-6)}`;
    
    // Format current time HH:mm • DD/MM
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const dateStr = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}`;
    const formattedTime = `${timeStr} • ${dateStr}`;

    const newOrder: MasterOrder = {
      id: newId,
      userId: orderData.userId || 'usr-1', 
      restaurantId: orderData.restaurantId || 'res-1',
      items: orderData.items || [],
      status: 'PENDING',
      orderTime: formattedTime,
      paymentMethod: orderData.paymentMethod || 'Cash',
      deliveryAddress: orderData.deliveryAddress || '123 Đường ABC, TP.HCM',
      needsReview: false,
      isReviewed: false,
      totalAmount: orderData.totalAmount || 0
    };

    // Add to beginning of array
    this.masterOrders.unshift(newOrder);
    this.persistOrders(); // Save to local storage
    return newOrder;
  }

  deleteOrder(id: string) {
    this.masterOrders = this.masterOrders.filter(o => o.id !== id);
    this.persistOrders();
  }

  // --- SHIPPER ACTIONS ---
  shipperAcceptOrder(orderId: string) {
    const orderIndex = this.masterOrders.findIndex(o => o.id === orderId);
    if (orderIndex > -1) {
      this.masterOrders[orderIndex].status = 'DELIVERING';
      this.persistOrders();
      return true;
    }
    return false;
  }

  shipperCompleteOrder(orderId: string) {
    const orderIndex = this.masterOrders.findIndex(o => o.id === orderId);
    if (orderIndex > -1) {
      this.masterOrders[orderIndex].status = 'COMPLETED';
      this.masterOrders[orderIndex].needsReview = true;
      this.persistOrders();
      return true;
    }
    return false;
  }

  shipperCancelOrder(orderId: string) {
    const orderIndex = this.masterOrders.findIndex(o => o.id === orderId);
    if (orderIndex > -1) {
      this.masterOrders[orderIndex].status = 'CANCELLED';
      this.persistOrders();
      return true;
    }
    return false;
  }

  getShipperStats() {
    // Tính toán trực tiếp từ Master Orders
    const completedOrders = this.masterOrders.filter(o => o.status === 'COMPLETED');
    const totalIncome = completedOrders.reduce((sum, order) => sum + order.totalAmount, 0); // Giả sử shipper nhận toàn bộ (demo)
    return {
      todayIncome: totalIncome,
      completedCount: completedOrders.length,
      activeHours: '8h 00p'
    };
  }

  getShipperProfile(): ShipperProfile {
    const shipper = this.users.find(u => u.role === 'shipper');
    return {
        name: shipper?.fullname || 'Shipper',
        email: shipper?.email || '',
        avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&q=60',
        rank: 'Tài xế 5 sao',
        joinDate: shipper?.created_at || '',
        phone: shipper?.phone_number || '',
        address: 'Hà Nội',
        dob: shipper?.birthday || ''
    };
  }

  // --- COMMON GETTERS ---
  getUsers() { return [...this.users]; }
  getUserById(id: string) { return this.users.find(u => u.user_id === id); }
  getUserByEmail(email: string) { return this.users.find(u => u.email === email); }
  createUser(user: BackendUser) { this.users.unshift(user); return user; }
  updateUser(id: string, data: Partial<BackendUser>) {
    const index = this.users.findIndex(u => u.user_id === id);
    if (index !== -1) { this.users[index] = { ...this.users[index], ...data }; return this.users[index]; }
    return null;
  }
  deleteUser(id: string) { this.users = this.users.filter(u => u.user_id !== id); }

  getRestaurants() { return [...this.restaurants]; }
  getRestaurantById(id: string) { return this.restaurants.find(r => r.id === id); }
  deleteRestaurant(id: string) { this.restaurants = this.restaurants.filter(r => r.id !== id); }
  updateRestaurant(id: string, data: any) {
    const idx = this.restaurants.findIndex(r => r.id === id);
    if (idx !== -1) { this.restaurants[idx] = { ...this.restaurants[idx], ...data }; return this.restaurants[idx]; }
    return null;
  }

  getFoods() { return [...this.foods]; }
  getFoodsByRestaurantId(resId: string) { return this.foods.filter(f => f.restaurantId === resId); }
  getFoodById(id: string) { return this.foods.find(f => f.id === id); }
  
  getCategories() { return [...this.categories]; }
  getVouchers() { return [...this.vouchers]; }
  getPromotions() { return [...this.promotions]; }
  getSuggestions() { return [...this.suggestions]; }

  getReviewsByFoodId(foodId: string) { return this.reviews.filter(r => r.foodId === foodId); }
  addReview(review: Review) { this.reviews.unshift(review); return review; }

  // Dashboard logic (Simplified mapping)
  getDashboardData(year?: number) {
    return this.dashboardData; // Keep static for now, or calculate from masterOrders similarly
  }
}

export const db = new MockDatabase();
