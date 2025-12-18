
import { User } from '../types';

export const initialUsers: User[] = [
  { 
    _id: 'user-admin-01', 
    name: 'Nguyễn Văn An', 
    email: 'admin@food.com', 
    phone: '0912345678', 
    role: 'admin', 
    address: '334 Nguyễn Trãi, Thanh Xuân, Hà Nội', 
    createdAt: '2023-10-26T00:00:00Z',
    status: 'Active',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
    gender: 'Nam',
    dob: '1990-01-01'
  },
  { 
    _id: 'user-customer-01', 
    name: 'Trần Thị Bình', 
    email: 'customer@gmail.com', 
    phone: '0987654321', 
    role: 'customer', 
    address: '123 Lê Lợi, Quận 1, TP.HCM', 
    createdAt: '2023-10-25T08:30:00Z',
    status: 'Active',
    gender: 'Nữ',
    dob: '1995-05-15'
  },
  { 
    _id: 'user-driver-01', 
    name: 'Lê Văn Cường', 
    email: 'cuong.driver@food.vn', 
    phone: '0909090909', 
    role: 'driver', 
    address: '456 Điện Biên Phủ, Đà Nẵng', 
    createdAt: '2023-10-24T10:00:00Z',
    status: 'Active',
    gender: 'Nam',
    dob: '1988-12-20'
  },
  { 
    _id: 'user-driver-02', 
    name: 'Phạm Thế Vinh', 
    email: 'vinh.shipper@gmail.com', 
    phone: '0911223344', 
    role: 'driver', 
    address: '102 Xã Đàn, Hà Nội', 
    createdAt: '2023-11-15T07:45:00Z',
    status: 'Active',
    gender: 'Nam',
    dob: '1994-08-25'
  },
  { 
    _id: 'user-customer-02', 
    name: 'Phạm Minh Hoàng', 
    email: 'hoang.pham@outlook.com', 
    phone: '0345678901', 
    role: 'customer', 
    address: '78 Láng Hạ, Đống Đa, Hà Nội', 
    createdAt: '2023-11-01T14:20:00Z',
    status: 'Active',
    gender: 'Nam',
    dob: '1992-03-10'
  },
  { 
    _id: 'user-customer-03', 
    name: 'Hoàng Thu Thảo', 
    email: 'thao.hoang@gmail.com', 
    phone: '0355112233', 
    role: 'customer', 
    address: '12 Cầu Giấy, Hà Nội', 
    createdAt: '2023-11-05T09:15:00Z',
    status: 'Banned',
    gender: 'Nữ',
    dob: '1998-07-22'
  },
  { 
    _id: 'user-customer-04', 
    name: 'Đặng Quốc Bảo', 
    email: 'bao.dang@yahoo.com', 
    phone: '0366778899', 
    role: 'customer', 
    address: '99 Trần Hưng Đạo, Quận 5, TP.HCM', 
    createdAt: '2023-11-10T16:45:00Z',
    status: 'Active',
    gender: 'Nam',
    dob: '1985-11-30'
  },
  { 
    _id: 'user-restaurant-01', 
    name: 'Chủ Quán Cơm Tấm', 
    email: 'comtamcali@partner.com', 
    phone: '02833445566', 
    role: 'restaurant', 
    address: '123 Nguyễn Trãi, Quận 1, TP.HCM', 
    createdAt: '2023-01-15T12:00:00Z',
    status: 'Active',
    gender: 'Khác',
    dob: '1980-01-01'
  }
];
