/**
 * useUser Hook
 * Hook xử lý logic quản lý người dùng cho Admin Dashboard
 */

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { User } from '../types/user';
import { ModalState } from '../types/admin';
import { 
  getAllUsers, 
  deleteUser, 
  updateUserRole, 
  createUser, 
  buildNetworkErrorMessage 
} from '../services/userService';
import { useAuth } from './useAuth';
import { filterBySearch, filterByField, applyFilters } from '../utils';

export const useUser = () => {
  // Auth hook
  const { checkAdminAccess, saveAdminInfo } = useAuth();

  // State
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Modal State
  const [modal, setModal] = useState<ModalState>({ type: null });

  /**
   * Load users from API
   */
  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Check admin access
      const accessCheck = checkAdminAccess();
      if (!accessCheck.valid) {
        throw new Error(accessCheck.error);
      }
      
      // Save admin info for Sidebar display
      saveAdminInfo();
      
      console.log('[useUser] Loading users...');
      const mappedUsers = await getAllUsers();
      console.log('[useUser] Loaded users:', mappedUsers.length);
      setUsers(mappedUsers);
    } catch (err) {
      const errorMessage = buildNetworkErrorMessage(err);
      setError(errorMessage);
      console.error('[useUser] Error loading users:', err);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty deps - only run on mount, functions are stable

  // Load users on mount
  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  /**
   * Filtered users based on search and role filter
   * Sử dụng utils/filters.ts để tái sử dụng logic
   */
  const filteredUsers = useMemo(() => {
    return applyFilters<User>(users, [
      (items) => filterBySearch(items, searchTerm, ['name', 'email', 'phone'] as (keyof User)[]),
      (items) => filterByField(items, 'role' as keyof User, filterRole),
    ]);
  }, [users, searchTerm, filterRole]);

  /**
   * Delete user
   */
  const handleDeleteUser = useCallback(async () => {
    if (!modal.data) return;
    
    try {
      await deleteUser(modal.data.id);
      await loadUsers();
      setModal({ type: null, data: null }); // inline close to avoid dep
    } catch (err) {
      setError(buildNetworkErrorMessage(err));
      console.error('Error deleting user:', err);
    }
  }, [modal.data, loadUsers]);

  /**
   * Toggle user status (placeholder - backend doesn't support yet)
   */
  const handleToggleStatus = useCallback((user: User) => {
    const newStatus = user.status === 'Banned' ? 'Active' : 'Banned';
    setUsers(prev => prev.map(u => 
      u.id === user.id ? { ...u, status: newStatus } : u
    ));
  }, []);

  /**
   * Save user (create or update)
   */
  const handleSaveUser = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      if (modal.type === 'ADD') {
        await createUser({
          name: formData.get('name') as string,
          email: formData.get('email') as string,
          password: formData.get('password') as string,
          phone: formData.get('phone') as string,
          dob: formData.get('dob') as string || undefined,
          gender: formData.get('gender') as string || undefined,
          role: formData.get('role') as string || 'User',
        });
      } else if (modal.type === 'EDIT' && modal.data) {
        const newRole = formData.get('role') as string;
        if (newRole) {
          const currentUser = users.find(u => u.id === modal.data!.id);
          if (currentUser && currentUser.role !== newRole) {
            await updateUserRole(modal.data.id, newRole);
          }
        }
      }
      
      await loadUsers();
      setModal({ type: null, data: null }); // inline close to avoid dep
    } catch (err) {
      setError(buildNetworkErrorMessage(err));
      console.error('Error saving user:', err);
    }
  }, [modal, users, loadUsers]);

  /**
   * Modal controls
   */
  const openModal = useCallback((type: ModalState['type'], data?: User) => {
    setModal({ type, data });
  }, []);

  const closeModal = useCallback(() => {
    setModal({ type: null, data: null });
  }, []);

  return {
    // Tab
    activeTab,
    setActiveTab,
    // Users data
    users,
    filteredUsers,
    // Filters
    searchTerm,
    setSearchTerm,
    filterRole,
    setFilterRole,
    // Modal
    modal,
    openModal,
    closeModal,
    // Actions
    handleDeleteUser,
    handleToggleStatus,
    handleSaveUser,
    // State
    loading,
    error,
    reloadUsers: loadUsers,
  };
};