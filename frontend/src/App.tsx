import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { MainLayout } from '@/layouts/MainLayout';
import { AdminRoute, PublicRoute } from '@/routes';
import { HomePage } from '@/page/user/HomePage';
import { LoginPage } from '@/page/auth/LoginPage';
import { RegisterPage } from '@/page/auth/RegisterPage';
import { ForgotPasswordPage } from '@/page/auth/ForgotPasswordPage';
import { UsersManagement } from '@/page/admin/UsersManagement';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin routes - protected, no header/footer */}
        <Route 
          path="/admin" 
          element={
            <AdminRoute>
              <UsersManagement />
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
        
        {/* 404 - Redirect to home */}
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
