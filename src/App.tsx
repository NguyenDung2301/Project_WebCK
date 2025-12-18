
import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AdminPage } from './pages/AdminPage';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { VoucherWalletPage } from './pages/VoucherWalletPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { UserProfilePage } from './pages/UserProfilePage';
import { PasswordVerifyPage } from './pages/PasswordVerifyPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { MyOrdersPage } from './pages/MyOrdersPage';
import { orderService } from './services/orderService';

type ViewState = 'home' | 'admin' | 'login' | 'register' | 'forgot-password' | 'privacy' | 'terms' | 'product-detail' | 'vouchers' | 'checkout' | 'user-profile' | 'password-verify' | 'order-success' | 'my-orders';

const AppRouter = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [history, setHistory] = useState<ViewState[]>(['home']);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [appliedVoucherId, setAppliedVoucherId] = useState<string | null>(null);
  
  // Trạng thái đơn hàng đang chờ xử lý sau khi xác thực
  const [pendingOrder, setPendingOrder] = useState<any>(null);

  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const view = history[history.length - 1];

  const navigate = (newView: ViewState, params?: any) => {
    if (newView === 'admin' && (!isAuthenticated || user?.role !== 'admin')) {
       setHistory(prev => [...prev, 'login']);
       return;
    }

    if ((newView === 'vouchers' || newView === 'checkout' || newView === 'user-profile' || newView === 'password-verify' || newView === 'order-success' || newView === 'my-orders') && !isAuthenticated) {
      setHistory(prev => [...prev, 'login']);
      return;
    }

    if (newView === 'product-detail' && params?.id) {
      setSelectedProductId(params.id);
      setAppliedVoucherId(null); 
    }

    if (newView === 'checkout') {
      if (params?.id) {
        setSelectedProductId(params.id);
        setOrderQuantity(params.quantity || 1);
      }
      if (params?.voucherId) {
        setAppliedVoucherId(params.voucherId);
      }
    }

    setHistory(prev => [...prev, newView]);
  };

  const goBack = () => {
    if (history.length > 1) {
      setHistory(prev => prev.slice(0, -1));
    } else {
      setHistory(['home']);
    }
  };

  const goHome = () => {
    setHistory(['home']);
    setIsSearching(false);
    setSearchQuery('');
  };

  const handleProfileNavigation = () => navigate('user-profile');
  const handleMyOrdersListNavigation = () => navigate('my-orders');
  const handleOrderSuccessNavigation = () => navigate('order-success');
  const handlePasswordVerifyNavigation = () => navigate('password-verify');

  // Hàm finalize order sau khi xác thực mật khẩu
  const handleVerificationSuccess = () => {
    if (pendingOrder) {
      orderService.addOrder(pendingOrder);
      setPendingOrder(null);
    }
    handleOrderSuccessNavigation();
  };

  useEffect(() => {
    if (isAuthenticated && view === 'login') {
      if (user?.role === 'admin') {
        navigate('admin');
      } else {
        setHistory(prev => {
          const lastHomeIndex = [...prev].reverse().findIndex(v => v === 'home');
          if (lastHomeIndex !== -1) {
            return prev.slice(0, prev.length - lastHomeIndex);
          }
          return ['home'];
        });
      }
    }
  }, [isAuthenticated, view, user]);

  useEffect(() => {
    if (!isAuthenticated && (view === 'admin' || view === 'vouchers' || view === 'checkout' || view === 'user-profile' || view === 'password-verify' || view === 'order-success' || view === 'my-orders')) {
      setHistory(['login']);
    }
  }, [isAuthenticated, view]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  return (
    <>
      {view === 'home' && (
        <HomePage 
          onLogin={() => navigate('login')} 
          onRegister={() => navigate('register')}
          onPrivacy={() => navigate('privacy')}
          onTerms={() => navigate('terms')}
          onProductClick={(id) => navigate('product-detail', { id })}
          onProfile={handleProfileNavigation}
          isSearching={isSearching}
          setIsSearching={setIsSearching}
          searchValue={searchQuery}
          setSearchValue={setSearchQuery}
          onOrders={handleMyOrdersListNavigation}
          onAdmin={() => navigate('admin')}
        />
      )}

      {view === 'product-detail' && selectedProductId && (
        <ProductDetailPage 
          productId={selectedProductId}
          onBack={goBack}
          onHome={goHome}
          onLogin={() => navigate('login')}
          onRegister={() => navigate('register')}
          onProfile={handleProfileNavigation}
          onProductClick={(id) => navigate('product-detail', { id })}
          onSeeAllVouchers={() => navigate('vouchers')}
          onOrder={(id, qty) => navigate('checkout', { id, quantity: qty })}
          onSearch={(q) => { 
            setSearchQuery(q);
            setIsSearching(true);
            setHistory(['home']);
          }}
          searchQuery={searchQuery}
          onOrders={handleMyOrdersListNavigation}
        />
      )}

      {view === 'checkout' && selectedProductId && (
        <CheckoutPage 
          productId={selectedProductId}
          quantity={orderQuantity}
          initialVoucherId={appliedVoucherId}
          onBack={goBack}
          onHome={goHome}
          onSeeAllVouchers={() => navigate('vouchers')}
          onProfile={handleProfileNavigation}
          onChangeAddress={handleProfileNavigation}
          onConfirmPayment={(orderData, method) => {
            // Nếu thanh toán bằng tiền mặt, không cần nhập mật khẩu
            if (method === 'cash') {
              orderService.addOrder(orderData);
              handleOrderSuccessNavigation();
            } else {
              // Nếu là ví điện tử (foodpay), yêu cầu nhập mật khẩu
              setPendingOrder(orderData);
              handlePasswordVerifyNavigation();
            }
          }}
          onSearch={(q) => { 
            setSearchQuery(q);
            setIsSearching(true);
            setHistory(['home']);
          }}
          onOrders={handleMyOrdersListNavigation}
        />
      )}

      {view === 'password-verify' && (
        <PasswordVerifyPage 
          onBack={goBack}
          onSuccess={handleVerificationSuccess}
          onForgotPassword={() => navigate('forgot-password')}
        />
      )}

      {view === 'order-success' && (
        <OrderSuccessPage 
          onHome={goHome}
          onViewOrders={handleMyOrdersListNavigation} 
        />
      )}

      {view === 'my-orders' && (
        <MyOrdersPage 
          onHome={goHome}
          onProfile={handleProfileNavigation}
          onSearch={(q) => { 
            setSearchQuery(q);
            setIsSearching(true);
            setHistory(['home']);
          }}
          onOrders={handleMyOrdersListNavigation}
        />
      )}

      {view === 'vouchers' && (
        <VoucherWalletPage 
          onBack={goBack}
          onHome={goHome}
          onProfile={handleProfileNavigation}
          onUseVoucher={(voucherId) => {
            const targetId = selectedProductId || 'food-001';
            navigate('checkout', { id: targetId, quantity: orderQuantity, voucherId });
          }}
          onSearch={(q) => { 
            setSearchQuery(q);
            setIsSearching(true);
            setHistory(['home']);
          }}
          onOrders={handleMyOrdersListNavigation}
        />
      )}

      {view === 'user-profile' && (
        <UserProfilePage 
          onBack={goBack}
          onHome={goHome}
          onProfile={handleProfileNavigation}
          onSearch={(q) => { 
            setSearchQuery(q);
            setIsSearching(true);
            setHistory(['home']);
          }}
          onOrders={handleMyOrdersListNavigation}
        />
      )}
      
      {view === 'admin' && isAuthenticated && user?.role === 'admin' && (
        <AdminPage onHome={goHome} />
      )}

      {view === 'login' && (
        <LoginPage 
          onLoginSuccess={() => {}} 
          onRegister={() => navigate('register')}
          onForgotPassword={() => navigate('forgot-password')}
          onBack={goBack}
          onHome={goHome}
        />
      )}

      {view === 'register' && (
        <RegisterPage 
          onLogin={() => navigate('login')}
          onRegisterSuccess={() => navigate('login')}
          onTerms={() => navigate('terms')}
          onPrivacy={() => navigate('privacy')}
          onHome={goHome}
          onBack={goBack}
        />
      )}

      {view === 'forgot-password' && (
        <ForgotPasswordPage 
          onBackToLogin={goBack}
          onRegister={() => navigate('register')}
          onHome={goHome}
        />
      )}

      {view === 'privacy' && (
        <PrivacyPage 
          onBack={goBack} 
          onHome={goHome}
        />
      )}

      {view === 'terms' && (
        <TermsPage 
          onBack={goBack} 
          onHome={goHome}
        />
      )}
    </>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}
