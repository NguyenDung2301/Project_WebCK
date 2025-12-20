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

  getDashboardData() {
    // 1. Calculate Total Revenue & Counts
    const totalRevenue = this.orders.reduce((sum, order) => {
      // Only count completed or delivered orders
      if (order.status === 'COMPLETED' || order.status === 'DELIVERING') {
        return sum + (order.totalAmount || 0);
      }
      return sum;
    }, 0);

    const totalUsers = this.users.length;
    const totalRestaurants = this.restaurants.length;
    
    // Mock "Today's Revenue" (randomize slightly based on total for demo)
    const todayRevenue = Math.round(totalRevenue * 0.05); 

    // 2. Calculate Order Status Distribution
    const statusCounts = {
      'COMPLETED': 0,
      'DELIVERING': 0,
      'PENDING': 0,
      'CANCELLED': 0
    };
    
    this.orders.forEach(o => {
      const s = o.status as keyof typeof statusCounts;
      if (statusCounts[s] !== undefined) statusCounts[s]++;
    });

    const statusData = [
      { name: 'Hoàn thành', value: statusCounts.COMPLETED, color: '#10B981' },
      { name: 'Đang giao', value: statusCounts.DELIVERING, color: '#3B82F6' },
      { name: 'Đang chuẩn bị', value: statusCounts.PENDING, color: '#F59E0B' },
      { name: 'Đã hủy', value: statusCounts.CANCELLED, color: '#EF4444' },
    ];

    // 3. Generate Recent Activities from Orders
    const recentActivities = this.orders.slice(0, 5).map(order => {
        let action = 'đã đặt đơn hàng';
        let type = 'order';
        if (order.status === 'COMPLETED') { action = 'đã nhận hàng'; type = 'delivery'; }
        if (order.status === 'CANCELLED') { action = 'đã hủy đơn'; type = 'cancellation'; }
        
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

    // 4. Calculate Top Restaurants (by Revenue)
    const resRevenueMap: Record<string, number> = {};
    this.orders.forEach(order => {
        if (!resRevenueMap[order.restaurantName]) resRevenueMap[order.restaurantName] = 0;
        resRevenueMap[order.restaurantName] += order.totalAmount;
    });

    const topRestaurantsData = Object.entries(resRevenueMap)
        .map(([name, revenue], index) => {
            const resDetails = this.restaurants.find(r => r.name === name);
            return {
                id: resDetails?.id || `R${index}`,
                name: name,
                revenue: revenue,
                logoInitial: name.charAt(0),
                color: resDetails?.colorClass || 'bg-gray-100 text-gray-600'
            };
        })
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 5);

    // 5. Calculate Top Items (by Frequency)
    const itemFreqMap: Record<string, number> = {};
    this.orders.forEach(order => {
        if (!itemFreqMap[order.foodId]) itemFreqMap[order.foodId] = 0;
        itemFreqMap[order.foodId] += 1;
    });

    const topItemsData = Object.entries(itemFreqMap)
        .map(([foodId, count]) => {
            const food = this.foods.find(f => f.id === foodId);
            return {
                id: foodId,
                name: food?.name || 'Món ăn',
                sales: count.toString(),
                image: food?.imageUrl || ''
            };
        })
        .sort((a, b) => Number(b.sales) - Number(a.sales))
        .slice(0, 5);

    // 6. Calculate Monthly Revenue (REAL DATA)
    const monthlyRevenue = Array(12).fill(0);
    this.orders.forEach(order => {
        if (order.status === 'COMPLETED' || order.status === 'DELIVERING') {
            // Parse 'HH:mm • DD/MM/YYYY'
            const datePart = order.orderTime.split('•')[1]?.trim();
            if (datePart) {
                const parts = datePart.split('/');
                if (parts.length === 3) {
                    const month = parseInt(parts[1], 10);
                    // month is 1-12, index is 0-11
                    if (month >= 1 && month <= 12) {
                        monthlyRevenue[month - 1] += order.totalAmount;
                    }
                }
            }
        }
    });

    // Format revenue for chart (in Millions VND for better readability with sample data)
    const revenueChartData = monthlyRevenue.map((total, index) => ({
        name: `T${index + 1}`,
        value: Number((total / 1000000).toFixed(2)) // Convert to Millions
    }));

    return {
      summary: {
        totalRevenue,
        todayRevenue,
        totalUsers,
        totalRestaurants
      },
      revenue: revenueChartData,
      status: statusData,
      activities: recentActivities.length > 0 ? recentActivities : INITIAL_DASHBOARD_DATA.activities,
      topItems: topItemsData.length > 0 ? topItemsData : INITIAL_DASHBOARD_DATA.topItems,
      topRestaurants: topRestaurantsData.length > 0 ? topRestaurantsData : INITIAL_DASHBOARD_DATA.topRestaurants
    };
  }
}

export const db = new MockDatabase();