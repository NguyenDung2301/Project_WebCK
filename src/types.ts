export type Role = 'Admin' | 'User' | 'Driver';
export type Status = 'Active' | 'Inactive' | 'Banned';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  status: Status;
  joinDate: string;
  avatarUrl?: string;
  gender?: 'Nam' | 'Nữ' | 'Khác';
  dob?: string;
}

export interface ModalState {
  type: 'ADD' | 'EDIT' | 'DELETE' | 'VIEW' | null;
  data?: User | null;
}