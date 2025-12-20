/**
 * User API
 * Sử dụng Mock Database (src/data/store.ts) thay vì fetch API thực
 */

import { BackendUser as AdminUser, CreateUserRequest, UpdateUserRequest } from '../types/user';
import { db } from '../data/store';

// Re-export for backward compatibility
export type { BackendUser as AdminUser, CreateUserRequest, UpdateUserRequest } from '../types/user';

/**
 * Get all users
 */
export const getAllUsersApi = async (): Promise<AdminUser[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return db.getUsers();
};

/**
 * Delete user by ID
 */
export const deleteUserApi = async (userId: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  db.deleteUser(userId);
};

/**
 * Update user role
 */
export const updateUserRoleApi = async (userId: string, role: 'admin' | 'user' | 'shipper'): Promise<AdminUser> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const updated = db.updateUser(userId, { role });
  if (!updated) throw new Error('User not found');
  return updated;
};

/**
 * Create new user
 */
export const createUserApi = async (userData: CreateUserRequest): Promise<AdminUser> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const newUser: AdminUser = {
    user_id: `usr-${Date.now()}`,
    fullname: userData.fullname,
    email: userData.email,
    phone_number: userData.phone_number || null,
    birthday: userData.birthday || null,
    gender: userData.gender || null,
    created_at: new Date().toISOString(),
    role: userData.role || 'user',
  };
  
  return db.createUser(newUser);
};

/**
 * Update user profile
 */
export const updateUserApi = async (userId: string, userData: UpdateUserRequest): Promise<AdminUser> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const updated = db.updateUser(userId, userData);
  if (!updated) throw new Error('User not found');
  return updated;
};