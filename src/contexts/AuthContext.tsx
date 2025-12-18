
import React, { createContext, useContext, useState, useEffect } from 'react';
import { userService } from '../services/userService';
import { User } from '../types';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
  refreshUser: (updatedUser: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Khi ứng dụng khởi động, kiểm tra phiên làm việc và đồng bộ dữ liệu mới nhất từ "DB"
  useEffect(() => {
    const storedAuth = localStorage.getItem('auth_session');
    if (storedAuth) {
      const parsed = JSON.parse(storedAuth);
      
      // Tìm lại user trong DB để lấy thông tin mới nhất (đề phòng vừa được cập nhật)
      const allUsers = userService.getUsers();
      const latestUser = allUsers.find(u => u._id === parsed._id);
      
      if (latestUser) {
        setIsAuthenticated(true);
        setUser(latestUser);
        // Cập nhật lại session với data mới nhất
        localStorage.setItem('auth_session', JSON.stringify(latestUser));
      } else {
        // Nếu user không còn tồn tại trong DB, logout
        logout();
      }
    }
  }, []);

  const login = (email: string) => {
    const allUsers = userService.getUsers();
    const foundUser = allUsers.find(u => u.email === email);
    
    // Nếu là admin cố định
    if (email === 'admin@food.com' && !foundUser) {
        const adminUser: User = { 
            _id: 'user-admin-01',
            email, 
            role: 'admin',
            name: 'Hệ thống Admin',
            phone: '0912345678',
            address: 'Hà Nội, Việt Nam',
            createdAt: new Date().toISOString(),
            status: 'Active'
        };
        localStorage.setItem('auth_session', JSON.stringify(adminUser));
        setIsAuthenticated(true);
        setUser(adminUser);
        return;
    }

    if (foundUser) {
        localStorage.setItem('auth_session', JSON.stringify(foundUser));
        setIsAuthenticated(true);
        setUser(foundUser);
    }
  };

  const refreshUser = (updatedUser: User) => {
    // Luôn ưu tiên dữ liệu từ tham số truyền vào (thường là sau khi lưu DB thành công)
    localStorage.setItem('auth_session', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const logout = () => {
    localStorage.removeItem('auth_session');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
