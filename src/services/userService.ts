
import { userApi } from '../api/userApi';
import { User, Role } from '../types';
import { generateId } from '../utils/helpers';

export const userService = {
  getUsers: () => {
    return userApi.getAll();
  },

  filterUsers: (users: User[], searchTerm: string, filterRole: string) => {
    return users.filter(user => {
      const name = user.name || '';
      const email = user.email || '';
      const phone = user.phone || '';
      
      const matchesSearch = 
        name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        phone.includes(searchTerm);
      
      const matchesRole = filterRole === 'All' || user.role === filterRole.toLowerCase();
      return matchesSearch && matchesRole;
    });
  },

  createUser: (formData: FormData): User => {
    const newUser: User = {
      _id: generateId('USR'),
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: (formData.get('password') as string) || '123456', // Lưu mật khẩu từ form
      phone: formData.get('phone') as string,
      role: (formData.get('role') as string || 'customer').toLowerCase() as Role,
      address: formData.get('address') as string || '',
      createdAt: new Date().toISOString(),
      status: 'Active',
      dob: formData.get('dob') as string,
      gender: formData.get('gender') as string
    };
    userApi.add(newUser);
    return newUser;
  },

  updateUser: (currentUser: User, formData: FormData): User => {
    const updatedUser: User = {
      ...currentUser,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      role: (formData.get('role') as string).toLowerCase() as Role,
      dob: formData.get('dob') as string,
      gender: formData.get('gender') as string
    };
    // Nếu có mật khẩu mới trong form thì cập nhật
    const newPassword = formData.get('password') as string;
    if (newPassword) {
      updatedUser.password = newPassword;
    }
    
    userApi.update(updatedUser);
    return updatedUser;
  },

  deleteUser: (id: string) => {
    return userApi.delete(id);
  },

  toggleStatus: (user: User): User => {
    const newStatus = user.status === 'Banned' ? 'Active' : 'Banned';
    const updatedUser = { ...user, status: newStatus as any };
    userApi.update(updatedUser);
    return updatedUser;
  },

  saveUsersToStorage: (users: User[]) => {
    userApi.saveAll(users);
  }
};
