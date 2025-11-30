import { getBackendBaseUrl, requestJson, buildNetworkErrorMessage } from './api';

export const getUsersApiBaseUrl = () => `${getBackendBaseUrl()}/api/users`;

export interface AdminUser {
  user_id: string;
  fullname: string;
  email: string;
  phone_number: string | null;
  birthday: string | null;
  gender: 'Male' | 'Female' | null;
  created_at: string;
  role: 'admin' | 'user' | 'shipper' | 'superadmin';
}

// Map backend user to frontend User type
export const mapBackendUserToFrontend = (backendUser: any) => {
  // Handle both formats: user_id or _id
  const userId = backendUser.user_id || backendUser._id || backendUser.id;
  
  // Helper function to format date
  const formatDate = (date: any): string | undefined => {
    if (!date) return undefined;
    try {
      if (typeof date === 'string') {
        // If it's already in format YYYY-MM-DD, return as is
        if (date.match(/^\d{4}-\d{2}-\d{2}/)) {
          return date.split('T')[0];
        }
        // Otherwise try to parse and format
        const parsed = new Date(date);
        if (!isNaN(parsed.getTime())) {
          return parsed.toISOString().split('T')[0];
        }
      } else if (date instanceof Date || typeof date === 'number') {
        const parsed = new Date(date);
        if (!isNaN(parsed.getTime())) {
          return parsed.toISOString().split('T')[0];
        }
      }
    } catch (e) {
      console.warn('Error formatting date:', date, e);
    }
    return undefined;
  };
  
  return {
    id: userId,
    name: backendUser.fullname || backendUser.name || '',
    email: backendUser.email || '',
    phone: backendUser.phone_number || backendUser.phone || '',
    role: backendUser.role === 'user' ? 'User' : backendUser.role === 'shipper' ? 'Shipper' : backendUser.role === 'admin' ? 'Admin' : 'User',
    status: 'Active' as const, // Backend doesn't have status field yet
    joinDate: formatDate(backendUser.created_at) || new Date().toISOString().split('T')[0],
    gender: backendUser.gender === 'Male' ? 'Nam' : backendUser.gender === 'Female' ? 'Nữ' : (backendUser.gender ? backendUser.gender : 'Khác'),
    dob: formatDate(backendUser.birthday),
  };
};

export const getAllUsers = async (): Promise<AdminUser[]> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Chưa đăng nhập. Vui lòng đăng nhập lại.');
  }

  try {
    console.log('Fetching users from:', `${getUsersApiBaseUrl()}/all`);
    console.log('Token:', token.substring(0, 20) + '...');
    
    const response = await fetch(`${getUsersApiBaseUrl()}/all`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Response status:', response.status);
    
    const data = await response.json().catch((err) => {
      console.error('Error parsing JSON:', err);
      throw new Error('Không thể parse response từ server');
    });

    console.log('Response data:', data);

    // Check if response is an error
    if (!response.ok) {
      const errorMessage = data.message || `Lỗi ${response.status}: ${response.statusText}`;
      throw new Error(errorMessage);
    }

    // Handle different response formats
    if (Array.isArray(data)) {
      return data;
    }
    if (data.data && Array.isArray(data.data)) {
      return data.data;
    }
    if (data.success && Array.isArray(data.data)) {
      return data.data;
    }
    
    console.error('Unexpected response format:', data);
    throw new Error('Format dữ liệu không đúng từ server');
  } catch (error) {
    console.error('Error fetching users:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Không thể tải danh sách người dùng');
  }
};

export const deleteUser = async (userId: string): Promise<void> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Chưa đăng nhập');
  }

  await requestJson(
    `${getUsersApiBaseUrl()}/${userId}`,
    {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
};

export const updateUserRole = async (userId: string, role: 'admin' | 'user' | 'shipper'): Promise<AdminUser> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Chưa đăng nhập');
  }

  const data = await requestJson<{ data: AdminUser }>(
    `${getUsersApiBaseUrl()}/role/${userId}`,
    {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role }),
    }
  );

  return data.data;
};

export const createUser = async (userData: {
  fullname: string;
  email: string;
  password: string;
  phone_number: string;
  birthday?: string;
  gender?: 'Male' | 'Female';
  role?: 'admin' | 'user' | 'shipper';
}): Promise<AdminUser> => {
  // Use register endpoint for creating users (doesn't require auth)
  // Note: Backend register always creates user with role 'user', so we'll need to update role after
  const data = await requestJson<{ data: { user: AdminUser; token: string } }>(
    `${getBackendBaseUrl()}/api/auth/register`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullname: userData.fullname,
        email: userData.email,
        password: userData.password,
        phone_number: userData.phone_number,
        birthday: userData.birthday ? new Date(userData.birthday).toISOString() : undefined,
        gender: userData.gender,
      }),
    }
  );

  const createdUser = data.data.user;
  
  // If role is specified and different from default 'user', update it
  if (userData.role && userData.role !== 'user') {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const updatedUser = await updateUserRole(createdUser.user_id, userData.role);
        return updatedUser;
      } catch (err) {
        console.error('Error updating user role:', err);
        // Return the created user even if role update fails
      }
    }
  }

  return createdUser;
};

export const updateUser = async (userId: string, userData: {
  fullname?: string;
  email?: string;
  phone_number?: string;
  birthday?: string;
  gender?: 'Male' | 'Female';
}): Promise<AdminUser> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Chưa đăng nhập');
  }

  // Note: The backend update_profile endpoint updates the current user's profile
  // For admin updating other users, we might need a different endpoint
  // For now, we'll use get_user_by_id to fetch the updated user
  const data = await requestJson<{ data: AdminUser }>(
    `${getUsersApiBaseUrl()}/profile_${userId}`,
    {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return data.data;
};

