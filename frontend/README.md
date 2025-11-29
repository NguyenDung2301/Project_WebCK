# Frontend Structure

Thư mục `frontend/` chứa toàn bộ phần giao diện của dự án. Từ thời điểm này, frontend được chạy độc lập bằng Vite và chỉ gọi API khi backend đang chạy song song.

## Cấu trúc thư mục

```
frontend/
├── web/                      # React SPA (Vite + TS)
│   ├── components/           # UI components (Header, Footer, ...)
│   ├── pages/                # Route-level components (Home, Auth, ...)
│   ├── utils/                # Helper utilities (API helpers, ...)
│   ├── App.tsx               # Router + layout
│   ├── index.tsx             # React entry
│   ├── index.html            # Vite template
│   ├── package.json          # Frontend dependencies
│   └── dist/                 # Build output (tạo bởi `npm run build`)
│
├── pages/                    # Legacy static HTML prototypes (auth)
│   └── auth/                 # Không còn được serve bởi backend
│
└── README.md                 # File này
```

## Chạy độc lập

1. **Frontend (Vite)**
   ```bash
   cd frontend/web
   npm install        # một lần
   npm run dev        # http://localhost:3000
   ```

2. **Backend (Flask API)**
   ```bash
   python app/main.py # http://localhost:5000
   ```

Frontend vẫn render và chuyển trang bình thường ngay cả khi backend chưa chạy. Các tác vụ gọi API (đăng nhập/đăng ký) sẽ báo lỗi kết nối nếu thiếu backend, đúng với yêu cầu “frontend chạy độc lập, cần backend để lấy dữ liệu”.

## Build sản phẩm

```bash
cd frontend/web
npm run build
```

Kết quả build nằm trong `frontend/web/dist/` và có thể deploy lên bất kỳ static host nào. Backend không còn serve thư mục này nên việc deploy là độc lập.

## Cấu hình API endpoint

Tạo file `frontend/web/.env.local` (hoặc dùng biến môi trường bất kỳ) nếu muốn chỉ định backend khác mặc định:

```
VITE_BACKEND_URL=http://localhost:5000
```

Nếu không cấu hình, frontend sẽ gọi `http://127.0.0.1:5000`.

## Legacy HTML

Thư mục `frontend/pages/auth` vẫn được giữ lại như tư liệu thiết kế. Các route `/login`, `/register`, `/forgot-password` hiện đã được viết bằng React Router bên trong SPA và không còn được Flask serve trực tiếp.

## Khi nào cần backend?

- **Có backend**: form đăng nhập/đăng ký hoạt động thật, nhận token về LocalStorage.
- **Không có backend**: giao diện vẫn chạy, router hoạt động, form hiển thị thông báo không kết nối được server.

Điều này giúp chia team frontend/backend làm việc độc lập mà không chặn tiến độ của nhau.

