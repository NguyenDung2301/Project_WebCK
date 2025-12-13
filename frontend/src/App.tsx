import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MainLayout from '@/layouts/MainLayout';
import { AdminRoute } from '@/components/admin/AdminRoute';
import HomePage from '@/page/user/HomePage';
import LoginPage from '@/page/auth/LoginPage';
import RegisterPage from '@/page/auth/RegisterPage';
import ForgotPasswordPage from '@/page/auth/ForgotPasswordPage';
import { AdminDashboard } from '@/page/admin/AdminDashboard';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin routes - no header/footer */}
        <Route 
          path="/admin" 
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } 
        />
        
        {/* Public routes - with header/footer using MainLayout */}
        <Route path="/" element={
          <MainLayout>
            <HomePage />
          </MainLayout>
        } />
        <Route path="/login" element={
          <MainLayout>
            <LoginPage />
          </MainLayout>
        } />
        <Route path="/register" element={
          <MainLayout>
            <RegisterPage />
          </MainLayout>
        } />
        <Route path="/forgot-password" element={
          <MainLayout>
            <ForgotPasswordPage />
          </MainLayout>
        } />
        <Route path="*" element={
          <MainLayout>
            <HomePage />
          </MainLayout>
        } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
