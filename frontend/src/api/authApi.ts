/**
 * Authentication API
 * Sử dụng Mock Database
 */

import { LoginRequest, RegisterRequest, AuthResponse } from '../types/auth';
import { db } from '../data/store';
import { BackendUser } from '../types/user';

// Re-export types
export type { LoginRequest, RegisterRequest, AuthResponse } from '../types/auth';

/**
 * Mock JWT generation
 */
const createMockToken = (user: BackendUser) => {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(JSON.stringify({
    user_id: user.user_id,
    email: user.email,
    fullname: user.fullname,
    role: user.role,
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) // 24h
  }));
  const signature = "mock_signature_from_data_folder";
  return `${header}.${payload}.${signature}`;
};

/**
 * Login API
 */
export const loginApi = async (credentials: LoginRequest): Promise<AuthResponse> => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Sim delay

  // Find user in "Database"
  const user = db.getUserByEmail(credentials.email);

  if (!user) {
    throw new Error('Email không tồn tại trong hệ thống.');
  }

  // Simple password check (in real app, hash check)
  // For mock, we accept any password or check specific mock passwords
  // Let's assume '123456' is the global password for simplicity in this mock
  if (credentials.password !== '123456') {
    throw new Error('Mật khẩu không đúng (Mật khẩu mặc định là 123456).');
  }

  const token = createMockToken(user);

  return {
    data: {
      token,
      user: {
        user_id: user.user_id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
      }
    }
  };
};

/**
 * Register API
 */
export const registerApi = async (userData: RegisterRequest): Promise<AuthResponse> => {
  await new Promise(resolve => setTimeout(resolve, 500));

  const existingUser = db.getUserByEmail(userData.email);
  if (existingUser) {
    throw new Error('Email đã được sử dụng.');
  }

  const newUser: BackendUser = {
    user_id: `usr-${Date.now()}`,
    fullname: userData.fullname,
    email: userData.email,
    phone_number: userData.phone_number || null,
    birthday: userData.birthday || null,
    gender: userData.gender || null,
    created_at: new Date().toISOString(),
    role: 'user', // Default role
  };

  db.createUser(newUser);
  const token = createMockToken(newUser);

  return {
    data: {
      token,
      user: {
        user_id: newUser.user_id,
        fullname: newUser.fullname,
        email: newUser.email,
        role: newUser.role,
      }
    }
  };
};

export const forgotPasswordApi = async (email: string): Promise<void> => {
  console.log('Forgot password request for:', email);
  // Mock success
  return;
};