import React from 'react';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';

import { MainLayout } from './layouts/MainLayout';
import { AdminRoute, PublicRoute } from './routes';
import { HomePage } from './page/user/HomePage';
import { LoginPage } from './page/auth/LoginPage';
import { RegisterPage } from './page/auth/RegisterPage';
import { ForgotPasswordPage } from './page/auth/ForgotPasswordPage';
import { UsersManagement } from './page/admin/UsersManagement';
import { DashboardPage } from './page/admin/DashboardPage';
import { RestaurantManagement } from './page/admin/RestaurantManagement';
import { OrderManagement } from './page/admin/OrderManagement';
import { SearchPage } from './page/user/SearchPage';
import { ProductDetailPage } from './page/user/ProductDetailPage';
import { CheckoutPage } from './page/user/CheckoutPage';
import { OrdersPage } from './page/user/OrdersPage';
import { ProfilePage } from './page/user/ProfilePage';
import { ReviewPage } from './page/user/ReviewPage';
import { AuthProvider } from './contexts/AuthContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          {/* Admin routes - protected, no header/footer */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          
          <Route 
            path="/admin/dashboard" 
            element={
              <AdminRoute>
                <DashboardPage />
              </AdminRoute>
            } 
          />
          <Route 
            path="/admin/users" 
            element={
              <AdminRoute>
                <UsersManagement />
              </AdminRoute>
            } 
          />
          <Route 
            path="/admin/restaurants" 
            element={
              <AdminRoute>
                <RestaurantManagement />
              </AdminRoute>
            } 
          />
          <Route 
            path="/admin/orders" 
            element={
              <AdminRoute>
                <OrderManagement />
              </AdminRoute>
            } 
          />
          
          {/* Auth routes - only for guests (not logged in) */}
          <Route path="/login" element={
            <PublicRoute>
              <MainLayout>
                <LoginPage />
              </MainLayout>
            </PublicRoute>
          } />
          <Route path="/register" element={
            <PublicRoute>
              <MainLayout>
                <RegisterPage />
              </MainLayout>
            </PublicRoute>
          } />
          <Route path="/forgot-password" element={
            <PublicRoute>
              <MainLayout>
                <ForgotPasswordPage />
              </MainLayout>
            </PublicRoute>
          } />
          
          {/* Public routes - with header/footer */}
          <Route path="/" element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          } />

          {/* Search Route */}
          <Route path="/search" element={
            <MainLayout>
              <SearchPage />
            </MainLayout>
          } />

          {/* Product Detail Route */}
          <Route path="/product/:id" element={
            <MainLayout>
              <ProductDetailPage />
            </MainLayout>
          } />

          {/* Product Review Route */}
          <Route path="/product/:id/reviews" element={
            <MainLayout>
              <ReviewPage />
            </MainLayout>
          } />

          {/* Checkout Route */}
          <Route path="/checkout" element={
            <MainLayout>
              <CheckoutPage />
            </MainLayout>
          } />

          {/* Orders Route */}
          <Route path="/orders" element={
            <MainLayout>
              <OrdersPage />
            </MainLayout>
          } />

          {/* Profile Route */}
          <Route path="/profile" element={
            <MainLayout>
              <ProfilePage />
            </MainLayout>
          } />
          
          {/* 404 - Redirect to home */}
          <Route path="*" element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          } />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;