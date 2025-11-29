
import { useState, useMemo } from 'react';
import { User, Role, Status, ModalState } from '../types';
import { initialUsers } from '../data/mockData';

export const useUserManagement = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('All');
  
  // Modal State
  const [modal, setModal] = useState<ModalState>({ type: null });

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
  const handleDeleteUser = () => {
    if (modal.data) {
      setUsers(users.filter(u => u.id !== modal.data!.id));
      closeModal();
    }
  };

  const handleToggleStatus = (user: User) => {
    const newStatus = user.status === 'Banned' ? 'Active' : 'Banned';
    setUsers(users.map(u => u.id === user.id ? { ...u, status: newStatus } : u));
  };

  const handleSaveUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newUser: User = {
      id: modal.data ? modal.data.id : `USR-00${users.length + 1}`,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      role: formData.get('role') as Role,
      status: (modal.data ? modal.data.status : 'Active') as Status,
      joinDate: modal.data ? modal.data.joinDate : new Date().toISOString().split('T')[0],
      gender: formData.get('gender') as 'Nam' | 'Nữ' | 'Khác',
      dob: formData.get('dob') as string,
    };

    if (modal.type === 'ADD') {
      setUsers([newUser, ...users]);
    } else if (modal.type === 'EDIT') {
      setUsers(users.map(u => u.id === newUser.id ? newUser : u));
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