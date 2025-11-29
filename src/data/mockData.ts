
import { User } from '../types';

export const initialUsers: User[] = [
  { id: 'USR-001', name: 'Nguyễn Văn A', email: 'nguyenvana@email.com', phone: '0912345678', role: 'User', status: 'Active', joinDate: '2023-10-26', gender: 'Nam', dob: '1995-08-15' },
  { id: 'USR-002', name: 'Trần Thị B', email: 'tranthib@email.com', phone: '0987654321', role: 'User', status: 'Active', joinDate: '2023-10-25', gender: 'Nữ', dob: '1998-02-20' },
  { id: 'USR-003', name: 'Lê Văn C', email: 'levanc@email.com', phone: '0909090909', role: 'Driver', status: 'Banned', joinDate: '2023-10-24', gender: 'Nam', dob: '1990-11-12' },
  { id: 'USR-004', name: 'Phạm Thị D', email: 'phamthid@email.com', phone: '0911223344', role: 'User', status: 'Active', joinDate: '2023-10-23', gender: 'Nữ', dob: '2000-05-05' },
  { id: 'USR-005', name: 'Hoàng Văn E', email: 'hoangvane@email.com', phone: '0922334455', role: 'User', status: 'Active', joinDate: '2023-10-22', gender: 'Nam', dob: '1992-12-30' },
  { id: 'USR-006', name: 'Ngô Thị F', email: 'ngothif@email.com', phone: '0933445566', role: 'Admin', status: 'Active', joinDate: '2023-10-21', gender: 'Nữ', dob: '1996-07-18' },
];