import { BackendUser } from '../types/user';
import { FoodItem, Voucher, Review, Restaurant } from '../types/common';
import { 
  INITIAL_USERS, 
  INITIAL_RESTAURANTS, 
  INITIAL_ORDERS,
  INITIAL_FOODS,
  INITIAL_CATEGORIES,
  INITIAL_VOUCHERS,
  INITIAL_PROMOTIONS,
  INITIAL_REVIEWS,
  INITIAL_SUGGESTIONS,
  INITIAL_DASHBOARD_DATA
} from './initialData';

/**
 * MockDatabase
 * Class quản lý dữ liệu in-memory (thay thế database thực và localStorage)
 */
class MockDatabase {
  private users: BackendUser[];
  private restaurants: Restaurant[];
  private orders: any[];
  private foods: FoodItem[];
  private categories: any[];
  private vouchers: Voucher[];
  private promotions: any[];
  private reviews: Review[];
  private suggestions: any[];
  private dashboardData: any;

  constructor() {
    this.users = [...INITIAL_USERS];
    this.restaurants = [...INITIAL_RESTAURANTS];
    this.orders = [...INITIAL_ORDERS];
    this.foods = [...INITIAL_FOODS];
    this.categories = [...INITIAL_CATEGORIES];
    this.vouchers = [...INITIAL_VOUCHERS];
    this.promotions = [...INITIAL_PROMOTIONS];
    this.reviews = [...INITIAL_REVIEWS];
    this.suggestions = [...INITIAL_SUGGESTIONS];
    this.dashboardData = INITIAL_DASHBOARD_DATA;
    console.log('[MockDatabase] Initialized with full dataset in src/data folder');
  }

  // Helper to check if restaurant is active
  private isRestaurantActive(restaurantId?: string): boolean {
    if (!restaurantId) return true;
    const restaurant = this.restaurants.find(r => r.id === restaurantId);
    return restaurant ? restaurant.status === 'Active' : true;
  }

  //Helper to calculate restaurant stats based on real data
  private getRestaurantStats(restaurantId: string) {
    // Find all food items for this restaurant
    const foods = this.foods.filter(f => f.restaurantId === restaurantId);
    const foodIds = foods.map(f => f.id);
    
    // Find all reviews for these food items
    const reviews = this.reviews.filter(r => foodIds.includes(r.foodId));
    
    const count = reviews.length;
    let rating = 0;
    
    if (count > 0) {
      const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
      rating = Number((sum / count).toFixed(1));
    }

    return { count, rating };
  }

  // --- USER OPERATIONS ---
  
  getUsers() {
    return [...this.users];
  }

  getUserById(id: string) {
    return this.users.find(u => u.user_id === id);
  }

  getUserByEmail(email: string) {
    return this.users.find(u => u.email === email);
  }

  createUser(user: BackendUser) {
    this.users.unshift(user); // Add to top
    return user;
  }

  updateUser(id: string, data: Partial<BackendUser>) {
    const index = this.users.findIndex(u => u.user_id === id);
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...data };
      return this.users[index];
    }
    return null;
  }

  deleteUser(id: string) {
    this.users = this.users.filter(u => u.user_id !== id);
  }

  // --- RESTAURANT OPERATIONS ---

  getRestaurants() {
    return this.restaurants.map(r => {
      const stats = this.getRestaurantStats(r.id);
      return {
        ...r,
        reviewsCount: stats.count,
        rating: stats.count > 0 ? stats.rating : (r.rating || 5.0)
      };
    });
  }
  
  getRestaurantById(id: string) {
    const r = this.restaurants.find(r => r.id === id);
    if (!r) return undefined;

    const stats = this.getRestaurantStats(r.id);
    return {
      ...r,
      reviewsCount: stats.count,
      rating: stats.count > 0 ? stats.rating : (r.rating || 5.0)
    };
  }

  createRestaurant(restaurant: any) {
    this.restaurants.unshift(restaurant);
    return restaurant;
  }

  updateRestaurant(id: string, data: any) {
    const index = this.restaurants.findIndex(r => r.id === id);
    if (index !== -1) {
      this.restaurants[index] = { ...this.restaurants[index], ...data };
      return this.restaurants[index];
    }
    return null;
  }

  deleteRestaurant(id: string) {
    this.restaurants = this.restaurants.filter(r => r.id !== id);
  }

  // --- FOOD & PRODUCT OPERATIONS ---

  getFoods() {
    return this.foods.filter(f => this.isRestaurantActive(f.restaurantId));
  }

  getFoodsByRestaurantId(restaurantId: string) {
    return this.foods.filter(f => f.restaurantId === restaurantId);
  }

  getFoodById(id: string) {
    const food = this.foods.find(f => f.id === id);
    if (!food) return undefined;
    
    if (!this.isRestaurantActive(food.restaurantId)) {
        return undefined;
    }
    
    return food;
  }

  getCategories() {
    return [...this.categories];
  }

  getSuggestions() {
    return [...this.suggestions];
  }

  // --- MARKETING OPERATIONS ---

  getVouchers() {
    return [...this.vouchers];
  }

  getPromotions() {
    return this.promotions.filter(p => {
        const food = this.foods.find(f => f.id === p.foodId);
        if (!food) return false;
        return this.isRestaurantActive(food.restaurantId);
    });
  }

  // --- REVIEW OPERATIONS ---

  getReviewsByFoodId(foodId: string) {
    return this.reviews.filter(r => r.foodId === foodId);
  }

  addReview(review: Review) {
    this.reviews.unshift(review);
    return review;
  }

  // --- ORDER OPERATIONS ---

  getOrders() {
    return [...this.orders];
  }

  deleteOrder(id: string) {
    this.orders = this.orders.filter(o => o.id !== id);
  }

  // --- DASHBOARD OPERATIONS ---

  getDashboardData(selectedYear?: number) {
    const orders = this.orders;
    const targetYear = selectedYear || new Date().getFullYear();

    // 1. Calculate Summary (Revenue & Counts - All Time / Global)
    let totalRevenue = 0;
    const statusCounts = {
        'COMPLETED': 0,
        'PENDING': 0,
        'DELIVERING': 0,
        'CANCELLED': 0
    };

    // Revenue per month (index 0-11) - Filtered by targetYear
    const monthlyRevenue = Array(12).fill(0);
    const restaurantRevenue: Record<string, number> = {};
    const itemSales: Record<string, { name: string, image: string, count: number }> = {};

    orders.forEach(order => {
        // Status Count (Global)
        const status = order.status as 'COMPLETED' | 'PENDING' | 'DELIVERING' | 'CANCELLED';
        if (statusCounts[status] !== undefined) {
            statusCounts[status]++;
        }

        // Only count COMPLETED orders for Revenue & Top Items
        if (order.status === 'COMPLETED') {
            // Global Total Revenue
            totalRevenue += order.totalAmount;

            // Restaurant Revenue (Global)
            const resName = order.restaurantName || 'Unknown';
            restaurantRevenue[resName] = (restaurantRevenue[resName] || 0) + order.totalAmount;

            // Item Sales (Global)
            const foodId = order.foodId;
            if (foodId) {
                if (!itemSales[foodId]) {
                    const rawName = order.description || 'Món ăn';
                    const cleanName = rawName.replace(/\(x\d+\)/g, '').trim();
                    
                    itemSales[foodId] = {
                        name: cleanName,
                        image: order.imageUrl || '',
                        count: 0
                    };
                }
                const qtyMatch = order.description?.match(/\(x(\d+)\)/);
                const qty = qtyMatch ? parseInt(qtyMatch[1], 10) : 1;
                itemSales[foodId].count += qty;
            }
        }

        // Populate Monthly Chart Data (COMPLETED Only, Filtered by Year)
        const datePart = order.orderTime.split('•')[1]?.trim();
        if (datePart) {
            const [day, month, yearStr] = datePart.split('/');
            const monthIndex = parseInt(month, 10) - 1;
            const year = parseInt(yearStr, 10);

            if (year === targetYear && monthIndex >= 0 && monthIndex < 12) {
                 if (order.status === 'COMPLETED') {
                     monthlyRevenue[monthIndex] += order.totalAmount;
                 }
            }
        }
    });

    // 2. Format Chart Data
    const revenueChartData = monthlyRevenue.map((amount, index) => ({
        name: `T${index + 1}`,
        value: amount
    }));

    // 3. Format Status Data
    const statusChartData = [
        { name: 'Hoàn thành', value: statusCounts.COMPLETED, color: '#10B981' },
        { name: 'Đang chuẩn bị', value: statusCounts.PENDING, color: '#F59E0B' },
        { name: 'Đang giao', value: statusCounts.DELIVERING, color: '#3B82F6' },
        { name: 'Đã hủy', value: statusCounts.CANCELLED, color: '#EF4444' },
    ];

    // 4. Format Recent Activities
    const recentActivities = orders.slice(0, 5).map(order => {
        let action = 'vừa đặt đơn hàng';
        let type = 'order';
        
        if (order.status === 'COMPLETED') { 
            action = 'đã hoàn thành đơn'; 
            type = 'delivery'; 
        } else if (order.status === 'CANCELLED') { 
            action = 'đã hủy đơn hàng'; 
            type = 'cancellation'; 
        } else if (order.status === 'DELIVERING') {
            action = 'đang được giao từ';
            type = 'delivery';
        } else if (order.status === 'PENDING') {
            action = 'vừa đặt đơn tại';
            type = 'order';
        }
        
        const userName = order.customer || 'Khách hàng';

        return {
            id: order.id,
            user: userName,
            action: action,
            target: order.restaurantName,
            time: order.orderTime.split('•')[0].trim(),
            type: type
        };
    });

    // 5. Format Top Restaurants
    const topRestaurants = Object.entries(restaurantRevenue)
        .map(([name, revenue], index) => ({
            id: `#RES-TOP-${index+1}`,
            name: name,
            revenue: revenue,
            logoInitial: name.charAt(0),
            color: index === 0 ? 'bg-red-50 text-red-600' : index === 1 ? 'bg-yellow-50 text-yellow-600' : 'bg-blue-50 text-blue-600'
        }))
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 3);

    // 6. Format Top Selling Items
    const topItems = Object.entries(itemSales)
        .map(([id, data]) => ({
            id: id,
            name: data.name,
            sales: data.count.toString(),
            image: data.image
        }))
        .sort((a, b) => parseInt(b.sales) - parseInt(a.sales))
        .slice(0, 5);

    return {
      summary: {
        totalRevenue: totalRevenue,
        todayRevenue: 0,
        totalUsers: this.users.length,
        totalRestaurants: this.restaurants.length
      },
      revenue: revenueChartData,
      status: statusChartData,
      activities: recentActivities,
      topItems: topItems.length > 0 ? topItems : [],
      topRestaurants: topRestaurants.length > 0 ? topRestaurants : INITIAL_DASHBOARD_DATA.topRestaurants
    };
  }
}

export const db = new MockDatabase();