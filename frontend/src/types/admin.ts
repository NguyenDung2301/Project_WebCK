/**
 * Admin Types
 * Các types dành riêng cho Admin Dashboard UI
 */

import { User, BackendUser, CreateUserRequest, UpdateUserRequest } from './user';
import { Status } from './common';

// Re-export for backward compatibility
export type { User, BackendUser, CreateUserRequest, UpdateUserRequest } from './user';
export type { Role, BackendRole, Status, Gender } from './common';

// Alias for backward compatibility
export type AdminUser = BackendUser;

// Modal state for Admin UI
export interface ModalState {
  type: 'ADD' | 'EDIT' | 'DELETE' | 'VIEW' | null;
  data?: User | null;
}

// Dashboard statistics
export interface DashboardStats {
  total_users: number;
  total_orders: number;
  total_revenue: number;
  active_shippers: number;
  pending_orders: number;
}

// Admin Modals Props
export interface AdminModalsProps {
  modal: ModalState;
  onClose: () => void;
  onSave: (e: React.FormEvent<HTMLFormElement>) => void;
  onDelete: () => void;
  existingUsers?: Array<{ id: string; email: string; phone: string }>;
}

// User Form Data (for Add/Edit modals)
export interface UserFormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  gender: string;
  dob: string;
  role: string;
}

// UserTable Props
export interface UserTableProps {
  users: User[];
  totalUsers: number;
  onView: (user: User) => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onToggleStatus: (user: User) => void;
}

// Sidebar Props
export interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

