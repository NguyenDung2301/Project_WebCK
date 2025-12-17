import { UserProfile, Voucher, VoucherType, FoodItem } from './types';

export const MOCK_USER: UserProfile = {
  name: "Nguyễn Văn A",
  email: "nguyenvana@example.com",
  phone: "0912 345 678",
  avatar: "https://picsum.photos/id/64/200/200",
  balance: 1250000,
  birthday: "1995-01-01",
  gender: "male",
  address: "123 Đường ABC, Quận XYZ, TP.HCM"
};

export const MOCK_VOUCHERS: Voucher[] = [
  {
    id: '1',
    code: 'FREESHIP',
    title: 'Miễn phí vận chuyển',
    description: 'Đơn hàng tối thiểu 50.000đ',
    expiryDate: '30/11/2023',
    value: '-15K',
    type: VoucherType.SHIPPING,
    isExpired: false
  },
  {
    id: '2',
    code: 'NEWFRIEND',
    title: 'Giảm 50% Bạn Mới',
    description: 'Giảm tối đa 40k cho đơn đầu tiên',
    expiryDate: '15/12/2023',
    value: '50%',
    type: VoucherType.DISCOUNT,
    isExpired: false
  },
  {
    id: '3',
    code: 'LOVEFOOD',
    title: 'Giảm 20K Món Yêu Thích',
    description: 'Áp dụng cho danh sách cửa hàng chọn lọc',
    expiryDate: '31/12/2023',
    value: '-20K',
    type: VoucherType.DISCOUNT,
    isExpired: false
  }
];

export const MOCK_FAVORITES: FoodItem[] = [
  {
    id: '1',
    name: 'Cơm Tấm Sườn Bì',
    shopName: 'Cơm Tấm Sài Gòn - Q1',
    price: 45000,
    rating: 4.8,
    image: 'https://picsum.photos/id/42/400/300',
    isFavorite: true
  },
  {
    id: '2',
    name: 'Pizza Hải Sản',
    shopName: 'Pizza Company',
    price: 129000,
    rating: 4.5,
    image: 'https://picsum.photos/id/63/400/300',
    isFavorite: true
  },
  {
    id: '3',
    name: 'Bò Bít Tết Sốt Tiêu',
    shopName: 'Nhà Hàng Âu Lạc',
    price: 85000,
    rating: 5.0,
    image: 'https://picsum.photos/id/292/400/300',
    isFavorite: true
  },
  {
    id: '4',
    name: 'Trà Sữa Trân Châu',
    shopName: 'Ding Tea',
    price: 35000,
    rating: 4.2,
    image: 'https://picsum.photos/id/225/400/300',
    isFavorite: true
  },
  {
    id: '5',
    name: 'Bánh Mì Thập Cẩm',
    shopName: 'Bánh Mì Phượng',
    price: 25000,
    rating: 4.9,
    image: 'https://picsum.photos/id/488/400/300',
    isFavorite: true
  },
  {
    id: '6',
    name: 'Phở Bò Tái Nạm',
    shopName: 'Phở Thìn Lò Đúc',
    price: 65000,
    rating: 4.7,
    image: 'https://picsum.photos/id/433/400/300',
    isFavorite: true
  }
];