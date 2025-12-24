
import { BackendUser, APIUserProfile } from '../types/user';
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
  INITIAL_SEARCH_HISTORY,
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
  private searchHistory: string[];
  // private dashboardData: any; // Removed static dashboard data cache

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
    this.searchHistory = [...INITIAL_SEARCH_HISTORY];
    // this.dashboardData = INITIAL_DASHBOARD_DATA; // Removed
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
      const user = this.users.find(u => u.user_id === mo.userId);

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
          name: user?.fullname || 'Khách vãng lai',
          phone: user?.phone_number || '090xxxxxxx',
          email: user?.email || '',
          avatar: user?.avatar,
          rank: user?.rank || 'Thành viên'
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
        avatar: shipper?.avatar || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&q=60',
        rank: shipper?.rank || 'Tài xế 5 sao',
        joinDate: shipper?.created_at || '',
        phone: shipper?.phone_number || '',
        address: shipper?.address || 'Hà Nội',
        dob: shipper?.birthday || ''
    };
  }

  // --- VOUCHER ACTIONS ---
  getVouchers() { return [...this.vouchers]; }
  
  createVoucher(voucher: Voucher) {
    this.vouchers.unshift(voucher);
    return voucher;
  }

  updateVoucher(id: string, updates: Partial<Voucher>) {
    const index = this.vouchers.findIndex(v => v.id === id);
    if (index !== -1) {
      this.vouchers[index] = { ...this.vouchers[index], ...updates };
      return this.vouchers[index];
    }
    return null;
  }

  deleteVoucher(id: string) {
    this.vouchers = this.vouchers.filter(v => v.id !== id);
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

  // Get Full User Profile for ProfilePage
  getUserProfile(id: string): APIUserProfile {
    const user = this.users.find(u => u.user_id === id);
    if (!user) throw new Error('User not found');
    
    return {
        id: user.user_id,
        fullname: user.fullname,
        email: user.email,
        phone: user.phone_number || '',
        birthday: user.birthday || undefined,
        gender: user.gender || undefined,
        avatar: user.avatar,
        role: user.role,
        created_at: user.created_at,
        address: user.address,
        balance: user.balance
    };
  }

  getRestaurants() { return [...this.restaurants]; }
  getRestaurantById(id: string) { return this.restaurants.find(r => r.id === id); }
  deleteRestaurant(id: string) { this.restaurants = this.restaurants.filter(r => r.id !== id); }
  updateRestaurant(id: string, data: any) {
    const idx = this.restaurants.findIndex(r => r.id === id);
    if (idx !== -1) { this.restaurants[idx] = { ...this.restaurants[idx], ...data }; return this.restaurants[idx]; }
    return null;
  }

  // --- DYNAMIC RATING CALCULATION ---
  private calculateFoodRating(food: FoodItem): number {
      const foodReviews = this.reviews.filter(r => r.foodId === food.id);
      if (foodReviews.length === 0) return food.rating;
      
      const sum = foodReviews.reduce((acc, r) => acc + r.rating, 0);
      return parseFloat((sum / foodReviews.length).toFixed(1));
  }

  getFoods() { 
      return this.foods.map(f => ({
          ...f,
          rating: this.calculateFoodRating(f)
      }));
  }

  getFoodsByRestaurantId(resId: string) { 
      return this.foods
          .filter(f => f.restaurantId === resId)
          .map(f => ({
              ...f,
              rating: this.calculateFoodRating(f)
          }));
  }

  getFoodById(id: string) { 
      const food = this.foods.find(f => f.id === id); 
      if (!food) return undefined;
      return {
          ...food,
          rating: this.calculateFoodRating(food)
      };
  }
  
  getCategories() { return [...this.categories]; }
  getPromotions() { return [...this.promotions]; }
  
  getSuggestions() { return [...this.suggestions]; }
  
  getSearchHistory() { return [...this.searchHistory]; }
  addSearchHistory(term: string) {
      if (!term.trim()) return;
      // Remove if exists then add to top
      this.searchHistory = this.searchHistory.filter(t => t !== term);
      this.searchHistory.unshift(term);
      // Keep only last 10
      if (this.searchHistory.length > 10) this.searchHistory.pop();
      return this.searchHistory;
  }
  clearSearchHistory() { this.searchHistory = []; }

  getReviewsByFoodId(foodId: string) { return this.reviews.filter(r => r.foodId === foodId); }
  addReview(review: Review) { this.reviews.unshift(review); return review; }

  // --- DYNAMIC DASHBOARD CALCULATION ---
  // Helper to parse "HH:mm • DD/MM" into a Date object (using current year)
  private parseMockDate(dateStr: string): Date {
    try {
        const parts = dateStr.split('•');
        if (parts.length < 2) return new Date();
        const datePart = parts[1].trim(); // "DD/MM"
        const [day, month] = datePart.split('/').map(Number);
        const year = new Date().getFullYear(); // Assume current year for mock logic
        return new Date(year, month - 1, day);
    } catch {
        return new Date();
    }
  }

  getDashboardData(year: number = new Date().getFullYear()) {
    // 1. Calculate Summary
    const totalRevenue = this.masterOrders
        .filter(o => o.status === 'COMPLETED')
        .reduce((sum, o) => sum + o.totalAmount, 0);

    const today = new Date();
    const todayRevenue = this.masterOrders
        .filter(o => o.status === 'COMPLETED' && 
                     this.parseMockDate(o.orderTime).getDate() === today.getDate() &&
                     this.parseMockDate(o.orderTime).getMonth() === today.getMonth())
        .reduce((sum, o) => sum + o.totalAmount, 0);

    // 2. Calculate Monthly Revenue (Bar Chart)
    const monthlyRevenue = Array(12).fill(0);
    this.masterOrders.forEach(o => {
        if (o.status === 'COMPLETED') {
            const date = this.parseMockDate(o.orderTime);
            // Only count if year matches (Mock data assumes current year mostly)
            if (date.getFullYear() === year) {
                monthlyRevenue[date.getMonth()] += o.totalAmount;
            }
        }
    });
    const revenueChartData = monthlyRevenue.map((val, idx) => ({ name: `T${idx+1}`, value: val }));

    // 3. Status Breakdown (Pie Chart)
    const statusCounts = {
        COMPLETED: 0,
        DELIVERING: 0,
        CANCELLED: 0,
        PENDING: 0
    };
    this.masterOrders.forEach(o => {
        if (statusCounts[o.status] !== undefined) {
            statusCounts[o.status]++;
        }
    });
    // Group PENDING and DELIVERING for clearer chart if needed, or keep separate
    const statusChartData = [
        { name: 'Hoàn thành', value: statusCounts.COMPLETED, color: '#10B981' },
        { name: 'Đang giao/Chờ', value: statusCounts.DELIVERING + statusCounts.PENDING, color: '#3B82F6' },
        { name: 'Đã hủy', value: statusCounts.CANCELLED, color: '#EF4444' }
    ];

    // 4. Top Restaurants (by Revenue)
    const restaurantRevenue: Record<string, number> = {};
    this.masterOrders.forEach(o => {
        if (o.status === 'COMPLETED') {
            restaurantRevenue[o.restaurantId] = (restaurantRevenue[o.restaurantId] || 0) + o.totalAmount;
        }
    });
    const topRestaurants = Object.entries(restaurantRevenue)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3)
        .map(([resId, revenue], idx) => {
            const res = this.restaurants.find(r => r.id === resId);
            return {
                id: resId,
                name: res?.name || 'Unknown',
                revenue: revenue,
                color: idx === 0 ? 'bg-red-100 text-red-600' : idx === 1 ? 'bg-green-100 text-green-800' : 'bg-blue-50 text-blue-800',
                logoInitial: res?.initial || 'R'
            };
        });

    // 5. Top Items (by Quantity Sold)
    const itemSales: Record<string, number> = {};
    this.masterOrders.forEach(o => {
        if (o.status === 'COMPLETED') {
            o.items.forEach(item => {
                itemSales[item.foodId] = (itemSales[item.foodId] || 0) + item.quantity;
            });
        }
    });
    const topItems = Object.entries(itemSales)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3)
        .map(([foodId, sales], idx) => {
            const food = this.foods.find(f => f.id === foodId);
            return {
                id: `#${idx+1}`,
                name: food?.name || 'Unknown Food',
                sales: sales.toString(),
                image: food?.imageUrl || 'https://via.placeholder.com/100'
            };
        });

    // 6. Recent Activities
    const activities = this.masterOrders.slice(0, 5).map(o => {
        const user = this.users.find(u => u.user_id === o.userId);
        let action = 'đã đặt';
        let type = 'order';
        if (o.status === 'COMPLETED') { action = 'đã nhận'; type = 'delivery'; }
        if (o.status === 'CANCELLED') { action = 'đã hủy'; type = 'cancellation'; }
        
        return {
            id: o.id,
            user: user?.fullname || 'Khách vãng lai',
            action: action,
            target: `Đơn ${o.id}`,
            time: o.orderTime,
            type: type
        };
    });

    return {
        summary: {
            totalRevenue,
            todayRevenue,
            totalUsers: this.users.filter(u => u.role === 'user').length,
            totalRestaurants: this.restaurants.length
        },
        revenue: revenueChartData,
        status: statusChartData,
        activities,
        topItems,
        topRestaurants
    };
  }
}

export const db = new MockDatabase();
