
import { User } from '../types';
import { initialUsers } from '../data/initialData';

const STORAGE_KEY = 'food_delivery_users';

export const userApi = {
  getAll: (): User[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialUsers));
      return initialUsers;
    }
    return JSON.parse(data);
  },

  saveAll: (users: User[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  },

  add: (user: User): User[] => {
    const users = userApi.getAll();
    const updated = [user, ...users];
    userApi.saveAll(updated);
    return updated;
  },

  update: (updatedUser: User): User[] => {
    const users = userApi.getAll();
    const updated = users.map(u => u._id === updatedUser._id ? updatedUser : u);
    userApi.saveAll(updated);
    return updated;
  },

  delete: (id: string): User[] => {
    const users = userApi.getAll();
    const updated = users.filter(u => u._id !== id);
    userApi.saveAll(updated);
    return updated;
  }
};
