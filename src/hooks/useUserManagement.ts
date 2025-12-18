
import React, { useState, useMemo, useEffect } from 'react';
import { User, ModalState } from '../types';
import { userService } from '../services/userService';

export const useUserManagement = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('All');
  const [modal, setModal] = useState<ModalState>({ type: null });

  // Load ban đầu
  useEffect(() => {
    setUsers(userService.getUsers());
  }, []);

  const filteredUsers = useMemo(() => {
    return userService.filterUsers(users, searchTerm, filterRole);
  }, [users, searchTerm, filterRole]);

  const handleDeleteUser = () => {
    if (modal.data) {
      const updated = userService.deleteUser(modal.data._id);
      setUsers(updated);
      closeModal();
    }
  };

  const handleToggleStatus = (user: User) => {
    const updatedUser = userService.toggleStatus(user);
    setUsers(prev => prev.map(u => u._id === user._id ? updatedUser : u));
  };

  const handleSaveUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (modal.type === 'ADD') {
      userService.createUser(formData);
      // Reload từ database sau khi thêm
      setUsers(userService.getUsers());
    } else if (modal.type === 'EDIT' && modal.data) {
      userService.updateUser(modal.data, formData);
      // Reload từ database sau khi sửa
      setUsers(userService.getUsers());
    }
    closeModal();
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
    handleSaveUser
  };
};
