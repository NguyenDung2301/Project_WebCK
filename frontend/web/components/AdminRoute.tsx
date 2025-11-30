import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
  user_id: string;
  email: string;
  role?: string;
  exp?: number;
}

interface AdminRouteProps {
  children: React.ReactNode;
}

export const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.log('[AdminRoute] No token found');
      setIsAuthorized(false);
      return;
    }

    try {
      const decoded = jwtDecode<TokenPayload>(token);
      console.log('[AdminRoute] Token decoded:', decoded);
      
      // Check if token is expired
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        console.log('[AdminRoute] Token expired');
        localStorage.removeItem('token');
        setIsAuthorized(false);
        return;
      }

      // Check if user has admin role
      console.log('[AdminRoute] Token role:', decoded.role);
      if (decoded.role === 'admin') {
        setIsAuthorized(true);
      } else {
        console.log('[AdminRoute] User does not have admin role');
        setIsAuthorized(false);
      }
    } catch (error) {
      console.error('[AdminRoute] Error decoding token:', error);
      localStorage.removeItem('token');
      setIsAuthorized(false);
    }
  }, []);

  if (isAuthorized === null) {
    // Still checking
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#EE501C] mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang kiểm tra quyền truy cập...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

