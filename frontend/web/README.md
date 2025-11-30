# FoodDelivery Frontend

Frontend application cho hệ thống FoodDelivery, bao gồm trang chủ, đăng nhập, đăng ký và Admin Dashboard.

## Cấu trúc thư mục

```
frontend/web/
├── src/
│   ├── components/          # Các component tái sử dụng
│   │   ├── admin/           # Components dành cho Admin Dashboard
│   │   ├── Button.tsx       # Button component
│   │   ├── Modal.tsx        # Modal component
│   │   └── Sidebar.tsx     # Sidebar cho Admin Dashboard
│   ├── hooks/               # Custom React hooks
│   │   └── useUserManagement.ts  # Hook quản lý user
│   ├── pages/               # Các trang chính
│   │   ├── AdminDashboard.tsx
│   │   ├── HomePage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── ForgotPasswordPage.tsx
│   │   ├── PrivacyPage.tsx
│   │   └── TermsPage.tsx
│   ├── utils/               # Utilities
│   │   └── api.ts           # API client và helpers
│   ├── types.ts             # TypeScript types
│   └── App.tsx              # Root component
├── index.html               # HTML entry point
├── index.tsx                # React entry point
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config
└── vite.config.ts           # Vite config
```

## Cài đặt

```bash
cd frontend/web
npm install
```

## Chạy development server

```bash
npm run dev
```

Ứng dụng sẽ chạy tại `http://localhost:3000`

## Build production

```bash
npm run build
```

Output sẽ được tạo trong thư mục `dist/`

## Cấu hình

### API Base URL

Mặc định API base URL là `http://localhost:5000/api`. 

Để thay đổi, tạo file `.env` trong `frontend/web/`:

```env
VITE_API_BASE_URL=http://your-api-url/api
```

## Tính năng

### Trang chủ (HomePage)
- Hero carousel với hình ảnh món ăn
- Tìm kiếm món ăn
- Danh mục món ăn
- Danh sách ưu đãi

### Đăng nhập (LoginPage)
- Đăng nhập với email và password
- Chỉ cho phép tài khoản admin đăng nhập vào Admin Dashboard
- Tích hợp với backend API

### Đăng ký (RegisterPage)
- Đăng ký tài khoản mới
- Tích hợp với backend API

### Admin Dashboard
- **Chỉ dành cho admin**: Kiểm tra role admin khi truy cập
- Quản lý người dùng:
  - Tìm kiếm user theo email
  - Xem chi tiết user
  - Cập nhật vai trò user (admin, user, shipper, superadmin)
  - Xóa user
- Sidebar navigation
- Responsive design

## API Integration

Tất cả API calls được xử lý trong `src/utils/api.ts`:

- `authAPI`: Login, Register
- `userAPI`: Get profile, Get user by ID/email, Update role, Delete user

### Authentication

Token được lưu trong `localStorage` với key `token`. Token được tự động thêm vào header của mọi API request.

## Tech Stack

- **React 19**: UI framework
- **TypeScript**: Type safety
- **Vite**: Build tool và dev server
- **Tailwind CSS**: Styling (via CDN)
- **Lucide React**: Icons

## Lưu ý

1. **Admin Only**: Admin Dashboard chỉ có thể truy cập bởi user có role `admin` hoặc `superadmin`
2. **Backend Required**: Cần backend API chạy tại `http://localhost:5000` (hoặc URL đã cấu hình)
3. **Token Management**: Token được lưu trong localStorage, sẽ bị xóa khi logout

