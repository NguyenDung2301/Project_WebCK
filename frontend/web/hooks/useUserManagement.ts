import React, { useState, useMemo, useEffect } from 'react';
import { User, Role, Status, ModalState } from '../types/admin';
import { getAllUsers, deleteUser, updateUserRole, createUser, updateUser, mapBackendUserToFrontend } from '../utils/adminApi';
import { buildNetworkErrorMessage } from '../utils/api';

export const useUserManagement = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Modal State
  const [modal, setModal] = useState<ModalState>({ type: null });

  // Load users from API
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Check token before making request
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Chưa đăng nhập. Vui lòng đăng nhập lại.');
      }
      
      // Decode token to check role
      try {
        const { jwtDecode } = await import('jwt-decode');
        const decoded = jwtDecode<{ role?: string; exp?: number; email?: string; fullname?: string }>(token);
        console.log('[useUserManagement] Token role:', decoded.role);
        
        // Save admin email and name to localStorage for display in Sidebar
        if (decoded.email) {
          localStorage.setItem('adminEmail', decoded.email);
        }
        if (decoded.fullname) {
          localStorage.setItem('adminName', decoded.fullname);
        }
        
        if (decoded.role !== 'admin') {
          throw new Error('Bạn không có quyền truy cập. Vui lòng đăng nhập lại với tài khoản admin.');
        }
        
        if (decoded.exp && decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem('token');
          throw new Error('Token đã hết hạn. Vui lòng đăng nhập lại.');
        }
      } catch (decodeError) {
        if (decodeError instanceof Error && decodeError.message.includes('quyền')) {
          throw decodeError;
        }
        console.warn('[useUserManagement] Could not decode token, continuing anyway:', decodeError);
      }
      
      console.log('[useUserManagement] Loading users...');
      const backendUsers = await getAllUsers();
      console.log('[useUserManagement] Backend users received:', backendUsers);
      const mappedUsers = backendUsers.map(mapBackendUserToFrontend);
      console.log('[useUserManagement] Mapped users:', mappedUsers);
      setUsers(mappedUsers);
    } catch (err) {
      const errorMessage = buildNetworkErrorMessage(err);
      setError(errorMessage);
      console.error('[useUserManagement] Error loading users:', err);
      console.error('[useUserManagement] Error details:', {
        message: err instanceof Error ? err.message : String(err),
        stack: err instanceof Error ? err.stack : undefined
      });
    } finally {
      setLoading(false);
    }
  };

  // Filtered Data Logic
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.includes(searchTerm);
      const matchesRole = filterRole === 'All' || user.role === filterRole;
      return matchesSearch && matchesRole;
    });
  }, [users, searchTerm, filterRole]);

  // Actions
  const handleDeleteUser = async () => {
    if (modal.data) {
      try {
        await deleteUser(modal.data.id);
        await loadUsers(); // Reload users after deletion
        closeModal();
      } catch (err) {
        setError(buildNetworkErrorMessage(err));
        console.error('Error deleting user:', err);
      }
    }
  };

  const handleToggleStatus = async (user: User) => {
    // Note: Backend doesn't have status field yet, so this is a placeholder
    // For now, we'll just update the local state
    const newStatus = user.status === 'Banned' ? 'Active' : 'Banned';
    setUsers(users.map(u => u.id === user.id ? { ...u, status: newStatus } : u));
  };

  const handleSaveUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      if (modal.type === 'ADD') {
        const genderMap: Record<string, 'Male' | 'Female'> = {
          'Nam': 'Male',
          'Nữ': 'Female',
        };
        
        const roleMap: Record<string, 'admin' | 'user' | 'shipper'> = {
          'User': 'user',
          'Shipper': 'shipper',
          'Admin': 'admin',
        };

        await createUser({
          fullname: formData.get('name') as string,
          email: formData.get('email') as string,
          password: formData.get('password') as string,
          phone_number: formData.get('phone') as string,
          birthday: formData.get('dob') ? new Date(formData.get('dob') as string).toISOString() : undefined,
          gender: genderMap[formData.get('gender') as string] || undefined,
          role: roleMap[formData.get('role') as string] || 'user',
        });
      } else if (modal.type === 'EDIT') {
        const roleMap: Record<string, 'admin' | 'user' | 'shipper'> = {
          'User': 'user',
          'Shipper': 'shipper',
          'Admin': 'admin',
        };

        // Update role if changed
        // Note: Backend doesn't have endpoint for admin to update other users' profile info
        // Only role can be updated for now
        const newRole = roleMap[formData.get('role') as string];
        if (newRole) {
          const currentUser = users.find(u => u.id === modal.data!.id);
          const currentRole = currentUser?.role === 'User' ? 'user' : currentUser?.role === 'Shipper' ? 'shipper' : 'admin';
          if (newRole !== currentRole) {
            await updateUserRole(modal.data!.id, newRole);
          }
        }
      }
      
      await loadUsers(); // Reload users after save
      closeModal();
    } catch (err) {
      const errorMessage = buildNetworkErrorMessage(err);
      setError(errorMessage);
      console.error('Error saving user:', err);
    }
  };

  const openModal = (type: ModalState['type'], data?: User) => {
    setModal({ type, data });
  };

  const closeModal = () => setModal({ type: null, data: null });

  return {
    activeTab,
    setActiveTab,
    users,
    filteredUsers,
    searchTerm,
    setSearchTerm,
    filterRole,
    setFilterRole,
    modal,
    openModal,
    closeModal,
    handleDeleteUser,
    handleToggleStatus,
    handleSaveUser,
    loading,
    error,
    reloadUsers: loadUsers,
  };
};

