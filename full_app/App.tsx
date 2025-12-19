
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import SearchOverlay from './pages/Search';
import SearchResults from './pages/SearchResults';
import FoodDetail from './pages/FoodDetail';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import ReviewPage from './pages/ReviewPage';
import { Screen, FoodItem, ProfileSubPage, UserProfile, Order } from './types';
import { MOCK_FOODS, MOCK_ORDERS } from './constants';

const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('HOME');
  const [history, setHistory] = useState<Screen[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [favoriteFoodIds, setFavoriteFoodIds] = useState<string[]>([]);
  const [activeProfileTab, setActiveProfileTab] = useState<ProfileSubPage>('MAIN');
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [reviewingOrderId, setReviewingOrderId] = useState<string | null>(null);

  // Global user profile state
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Nguyễn Văn A',
    phone: '0912 345 678',
    address: '123 Đường ABC, Quận XYZ, TP.HCM',
    email: 'nguyenvana@gmail.com',
    balance: 1250000,
    password: '' 
  });

  const navigateTo = (newScreen: Screen, replace = false) => {
    if (!replace && newScreen !== screen) {
      setHistory(prev => [...prev, screen]);
    }
    setScreen(newScreen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setHistory(prev => prev.slice(0, -1));
      setScreen(prev);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigateTo('HOME');
    }
  };

  const handleSearchFocus = () => {
    if (screen !== 'SEARCH') {
      navigateTo('SEARCH');
    }
  };

  const handleLogoClick = () => {
    setSearchValue('');
    setHistory([]);
    setScreen('HOME');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrdersClick = () => {
    setSearchValue('');
    navigateTo('ORDERS');
  };

  const handleProfileClick = () => {
    setSearchValue('');
    setActiveProfileTab('MAIN');
    navigateTo('PROFILE');
  };

  const handleSearchSubmit = (term: string) => {
    setSearchValue(term);
    navigateTo('RESULTS');
  };

  const handleFoodClick = (food: FoodItem) => {
    setSelectedFood(food);
    navigateTo('DETAIL');
  };

  const handleCategoryClick = (cat: string) => {
    setSearchValue(cat);
    navigateTo('RESULTS');
  };

  const handleOrderNow = (food: FoodItem, quantity: number) => {
    setSelectedFood(food);
    setOrderQuantity(quantity);
    navigateTo('CHECKOUT');
  };

  const handlePromoClick = (foodId: string) => {
    const food = MOCK_FOODS.find(f => f.id === foodId);
    if (food) {
      handleFoodClick(food);
    }
  };

  const toggleFavorite = (foodId: string) => {
    setFavoriteFoodIds(prev => 
      prev.includes(foodId) 
        ? prev.filter(id => id !== foodId) 
        : [...prev, foodId]
    );
  };

  const handleReviewNavigate = (order?: Order) => {
    if (order) {
      setReviewingOrderId(order.id);
      const food = MOCK_FOODS.find(f => f.id === order.foodId);
      if (food) setSelectedFood(food);
    } else {
      setReviewingOrderId(null);
    }
    navigateTo('REVIEW');
  };

  const handleReviewSubmit = () => {
    if (reviewingOrderId) {
      setOrders(prev => prev.map(order => 
        order.id === reviewingOrderId 
          ? { ...order, isReviewed: true, needsReview: false } 
          : order
      ));
    }
    handleBack();
  };

  const handleGoToVouchers = () => {
    setSearchValue('');
    setActiveProfileTab('VOUCHERS');
    navigateTo('PROFILE');
  };

  const handleGoToEditProfile = () => {
    setSearchValue('');
    setActiveProfileTab('EDIT_PROFILE');
    navigateTo('PROFILE');
  };

  const handleAddOrder = (newOrder: Order) => {
    setOrders([newOrder, ...orders]);
    if (userProfile.balance >= newOrder.totalAmount) {
       setUserProfile(prev => ({...prev, balance: prev.balance - newOrder.totalAmount}));
    }
  };

  const handleCancelOrder = (orderId: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: 'CANCELLED' as const } : order
    ));
  };

  const handleConfirmReceived = (orderId: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, needsReview: true } : order
    ));
  };

  const handleViewFoodFromOrder = (order: Order) => {
    if (order.foodId) {
      const food = MOCK_FOODS.find(f => f.id === order.foodId);
      if (food) {
        setSelectedFood(food);
        navigateTo('DETAIL');
        return;
      }
    }
    const foodName = order.description.split(' (x')[0];
    const food = MOCK_FOODS.find(f => f.name === foodName);
    if (food) {
      setSelectedFood(food);
      navigateTo('DETAIL');
    }
  };

  const favoriteFoods = MOCK_FOODS.filter(food => favoriteFoodIds.includes(food.id));
  const showFooter = screen !== 'SEARCH';

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB] selection:bg-orange-100 selection:text-orange-900">
      <Header 
        onLogoClick={handleLogoClick}
        onOrdersClick={handleOrdersClick}
        onProfileClick={handleProfileClick}
        onBack={handleBack}
        currentScreen={screen}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onSearchSubmit={handleSearchSubmit}
        onSearchFocus={handleSearchFocus}
        showBackButton={screen !== 'HOME' && history.length > 0}
      />

      <main className="flex-1">
        {screen === 'HOME' && (
          <Home 
            onCategoryClick={handleCategoryClick} 
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            onSearchFocus={handleSearchFocus}
            onPromoClick={handlePromoClick}
          />
        )}
        
        {screen === 'SEARCH' && (
          <SearchOverlay 
            onSearch={handleSearchSubmit} 
            searchValue={searchValue}
            onSearchChange={setSearchValue}
          />
        )}

        {screen === 'RESULTS' && (
          <SearchResults 
            searchTerm={searchValue} 
            onItemClick={handleFoodClick}
            favoriteFoodIds={favoriteFoodIds}
            onToggleFavorite={toggleFavorite}
          />
        )}

        {screen === 'DETAIL' && selectedFood && (
          <FoodDetail 
            food={selectedFood} 
            onHomeClick={handleLogoClick}
            onCategoryNavigate={handleCategoryClick}
            onOrderNow={handleOrderNow}
            onViewReviews={() => handleReviewNavigate()}
            onViewVouchers={handleGoToVouchers}
            onFoodClick={handleFoodClick}
          />
        )}

        {screen === 'CHECKOUT' && selectedFood && (
          <Checkout 
            food={selectedFood}
            quantity={orderQuantity}
            onHomeClick={handleLogoClick}
            onCategoryNavigate={handleCategoryClick}
            onViewVouchers={handleGoToVouchers}
            onEditProfile={handleGoToEditProfile}
            userProfile={userProfile}
            onOrdersClick={handleOrdersClick}
            onAddOrder={handleAddOrder}
            favoriteFoodIds={favoriteFoodIds}
            onToggleFavorite={toggleFavorite}
          />
        )}

        {screen === 'ORDERS' && (
          <Orders 
            onHomeClick={handleLogoClick} 
            onReviewClick={handleReviewNavigate} 
            orders={orders}
            onCancelOrder={handleCancelOrder}
            onConfirmReceived={handleConfirmReceived}
            onViewFood={handleViewFoodFromOrder}
          />
        )}

        {screen === 'PROFILE' && (
          <Profile 
            onHomeClick={handleLogoClick} 
            favoriteFoods={favoriteFoods}
            onToggleFavorite={toggleFavorite}
            onOrderNow={handleOrderNow}
            initialSubPage={activeProfileTab}
            userProfile={userProfile}
            onUpdateProfile={setUserProfile}
          />
        )}

        {screen === 'REVIEW' && (
          <ReviewPage 
            onBack={handleBack} 
            targetName={selectedFood?.name || "Sản phẩm"} 
            onReviewSubmit={handleReviewSubmit}
          />
        )}
      </main>

      {showFooter && <Footer />}
    </div>
  );
};

export default App;
