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
  INITIAL_SUGGESTIONS
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
      // Only override if there is actual data, or force override to 0 to be "synced"
      // Since user wants sync, we return actual calculated values
      return {
        ...r,
        reviewsCount: stats.count,
        rating: stats.count > 0 ? stats.rating : (r.rating || 5.0) // Keep default rating if new, or 0
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
    // Only return foods from active restaurants
    return this.foods.filter(f => this.isRestaurantActive(f.restaurantId));
  }

  getFoodById(id: string) {
    const food = this.foods.find(f => f.id === id);
    if (!food) return undefined;
    
    // Check if restaurant is active
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
    // Filter promotions where the associated food's restaurant is active
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
}

// Export singleton instance
export const db = new MockDatabase();