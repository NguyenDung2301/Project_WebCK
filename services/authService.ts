/**
 * Authentication Service
 * File này chứa các nghiệp vụ liên quan đến xác thực người dùng
 */

import { jwtDecode } from 'jwt-decode';
import { loginApi, registerApi, LoginRequest, RegisterRequest } from '../api/authApi';
import { buildNetworkErrorMessage } from '../api/axiosClient';
import { TokenPayload, LoginResult, RegisterResult, CurrentUser } from '../types/auth';
import { 
  getToken, 
  setToken, 
  clearAuthData, 
  getAdminInfo as getStoredAdminInfo,
  setAdminInfo 
} from '../utils';

// Re-export types for backward compatibility
export type { TokenPayload, LoginResult, RegisterResult, CurrentUser } from '../types/auth';
// Re-export setAdminInfo for external use
export { setAdminInfo } from '../utils';

/**
 * Helper để tạo Fake JWT cho mục đích test (Bypass Backend)
 */
const createMockToken = (payload: any) => {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = btoa(JSON.stringify(payload));
  const signature = "mock_signature";
  return `${header}.${body}.${signature}`;
};

/**
 * Đăng nhập và lưu token
 * @param credentials - Email và mật khẩu
 * @returns LoginResult
 */
export const login = async (credentials: LoginRequest): Promise<LoginResult> => {
  // --- MOCK LOGIN FOR TESTING ---
  // Cho phép đăng nhập nhanh không cần backend
  if (credentials.password === '123456') {
    let mockPayload = null;

    if (credentials.email === 'admin@gmail.com') {
      mockPayload = {
        user_id: 'mock-admin-id',
        email: 'admin@gmail.com',
        fullname: 'Admin Test',
        role: 'admin', // BackendRole
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) // 24h
      };
    } else if (credentials.email === 'user@gmail.com') {
      mockPayload = {
        user_id: 'mock-user-id',
        email: 'user@gmail.com',
        fullname: 'User Test',
        role: 'user', // BackendRole
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) // 24h
      };
    }

    if (mockPayload) {
      const fakeToken = createMockToken(mockPayload);
      setToken(fakeToken);
      return {
        success: true,
        message: 'Đăng nhập Test thành công!',
        isAdmin: mockPayload.role === 'admin',
      };
    }
  }
  // -----------------------------

  try {
    const data = await loginApi(credentials);
    
    const token = data?.data?.token;
    if (token) {
      setToken(token);
      
      // Check if user is admin
      try {
        const decoded = jwtDecode<TokenPayload>(token);
        return {
          success: true,
          message: 'Đăng nhập thành công!',
          isAdmin: decoded.role === 'admin',
        };
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
    
    return {
      success: true,
      message: 'Đăng nhập thành công!',
    };
  } catch (error) {
    return {
      success: false,
      message: buildNetworkErrorMessage(error),
    };
  }
};

/**
 * Đăng ký tài khoản mới
 * @param userData - Thông tin đăng ký
 * @returns RegisterResult
 */
export const register = async (userData: RegisterRequest): Promise<RegisterResult> => {
  try {
    const data = await registerApi(userData);
    
    const token = data?.data?.token;
    if (token) {
      setToken(token);
    }
    
    return {
      success: true,
      message: 'Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.',
    };
  } catch (error) {
    return {
      success: false,
      message: buildNetworkErrorMessage(error),
    };
  }
};

/**
 * Đăng xuất - xóa token và auth data
 */
export const logout = (): void => {
  clearAuthData();
};

/**
 * Lấy thông tin từ token
 * @returns TokenPayload hoặc null
 */
export const getTokenPayload = (): TokenPayload | null => {
  const token = getToken();
  if (!token) return null;
  
  try {
    return jwtDecode<TokenPayload>(token);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

/**
 * Kiểm tra token có hợp lệ không
 * @returns boolean
 */
export const isTokenValid = (): boolean => {
  const payload = getTokenPayload();
  if (!payload) return false;
  
  // Check if token is expired
  if (payload.exp && payload.exp * 1000 < Date.now()) {
    logout();
    return false;
  }
  
  return true;
};

/**
 * Kiểm tra user có phải admin không
 * @returns boolean
 */
export const isAdmin = (): boolean => {
  const payload = getTokenPayload();
  return payload?.role === 'admin';
};

/**
 * Lấy thông tin user hiện tại từ token
 * @returns User info hoặc null
 */
export const getCurrentUser = (): CurrentUser | null => {
  const payload = getTokenPayload();
  if (!payload) return null;
  
  return {
    id: payload.user_id,
    email: payload.email,
    name: payload.fullname,
    role: payload.role,
  };
};

/**
 * Lấy thông tin admin từ storage hoặc token
 * @returns Admin info { name, email }
 */
export const getAdminInfo = (): { name: string; email: string } => {
  const storedInfo = getStoredAdminInfo();
  
  if (storedInfo.name && storedInfo.email) {
    return { name: storedInfo.name, email: storedInfo.email };
  }
  
  // Fallback to token
  const user = getCurrentUser();
  return {
    name: user?.name || 'Admin',
    email: user?.email || 'admin@food.com',
  };
};