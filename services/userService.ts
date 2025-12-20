/**
 * User Service
 * File này chứa các nghiệp vụ liên quan đến quản lý người dùng
 */

import { 
  getAllUsersApi, 
  deleteUserApi, 
  updateUserRoleApi, 
  createUserApi,
  AdminUser,
  CreateUserRequest 
} from '../api/userApi';
import { buildNetworkErrorMessage } from '../api/axiosClient';
import { User } from '../types/user';
import { mapRole, mapGender, mapRoleToBackend, mapGenderToBackend, formatDateISO } from '../utils';

/**
 * Map backend user format to frontend User type
 * @param backendUser - User data từ backend
 * @returns User object cho frontend
 */
export const mapBackendUserToFrontend = (backendUser: AdminUser | Record<string, unknown>): User => {
  // Handle both formats: user_id or _id
  const userId = (backendUser as AdminUser).user_id || 
                 (backendUser as Record<string, unknown>)._id || 
                 (backendUser as Record<string, unknown>).id;
  
  const user = backendUser as AdminUser;
  
  return {
    id: userId as string,
    name: user.fullname || (backendUser as Record<string, unknown>).name as string || '',
    email: user.email || '',
    phone: user.phone_number || (backendUser as Record<string, unknown>).phone as string || '',
    role: mapRole(user.role),
    status: 'Active' as const, // Backend doesn't have status field yet
    joinDate: formatDateISO(user.created_at) || new Date().toISOString().split('T')[0],
    gender: mapGender(user.gender),
    dob: formatDateISO(user.birthday) || undefined,
  };
};

/**
 * Lấy danh sách tất cả users và map sang frontend format
 * @returns Promise<User[]>
 */
export const getAllUsers = async (): Promise<User[]> => {
  const backendUsers = await getAllUsersApi();
  return backendUsers.map(mapBackendUserToFrontend);
};

/**
 * Xóa user theo ID
 * @param userId - User ID
 */
export const deleteUser = async (userId: string): Promise<void> => {
  await deleteUserApi(userId);
};

/**
 * Cập nhật role của user
 * @param userId - User ID
 * @param role - New role (frontend format)
 * @returns Updated user
 */
export const updateUserRole = async (userId: string, role: string): Promise<User> => {
  const backendRole = mapRoleToBackend(role);
  const updatedUser = await updateUserRoleApi(userId, backendRole);
  return mapBackendUserToFrontend(updatedUser);
};

/**
 * Tạo user mới
 * @param userData - User data (frontend format)
 * @returns Created user
 */
export const createUser = async (userData: {
  name: string;
  email: string;
  password: string;
  phone: string;
  dob?: string;
  gender?: string;
  role?: string;
}): Promise<User> => {
  const createRequest: CreateUserRequest = {
    fullname: userData.name,
    email: userData.email,
    password: userData.password,
    phone_number: userData.phone,
    birthday: userData.dob ? new Date(userData.dob).toISOString() : undefined,
    gender: userData.gender ? mapGenderToBackend(userData.gender) : undefined,
    role: userData.role ? mapRoleToBackend(userData.role) : 'user',
  };
  
  const createdUser = await createUserApi(createRequest);
  return mapBackendUserToFrontend(createdUser);
};

/**
 * Build error message for user operations
 */
export { buildNetworkErrorMessage };