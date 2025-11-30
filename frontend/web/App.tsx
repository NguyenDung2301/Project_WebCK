import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import { AdminRoute } from './components/AdminRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';

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
        
        {/* Public routes - with header/footer */}
        <Route path="/" element={
          <div className="min-h-screen bg-white text-gray-800">
            <Header />
            <div className="flex min-h-screen flex-col pt-[80px]">
              <div className="flex-1">
                <HomePage />
              </div>
              <Footer />
            </div>
          </div>
        } />
        <Route path="/login" element={
          <div className="min-h-screen bg-white text-gray-800">
            <Header />
            <div className="flex min-h-screen flex-col pt-[80px]">
              <div className="flex-1">
                <LoginPage />
              </div>
              <Footer />
            </div>
          </div>
        } />
        <Route path="/register" element={
          <div className="min-h-screen bg-white text-gray-800">
            <Header />
            <div className="flex min-h-screen flex-col pt-[80px]">
              <div className="flex-1">
                <RegisterPage />
              </div>
              <Footer />
            </div>
          </div>
        } />
        <Route path="/forgot-password" element={
          <div className="min-h-screen bg-white text-gray-800">
            <Header />
            <div className="flex min-h-screen flex-col pt-[80px]">
              <div className="flex-1">
                <ForgotPasswordPage />
              </div>
              <Footer />
            </div>
          </div>
        } />
        <Route path="*" element={
          <div className="min-h-screen bg-white text-gray-800">
            <Header />
            <div className="flex min-h-screen flex-col pt-[80px]">
              <div className="flex-1">
                <HomePage />
              </div>
              <Footer />
            </div>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
