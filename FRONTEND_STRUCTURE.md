# Cấu Trúc Frontend

## Tổng quan

- React SPA (`frontend/web`) là nguồn chính, chạy bằng Vite và React Router.
- Backend Flask chỉ expose API (`/api/**`) và không serve static/frontend nữa.
- Các HTML cũ trong `frontend/pages/auth` giữ lại như mockup tham khảo.

## Cây thư mục

```
frontend/
├── web/
│   ├── components/           # Header, Footer, Sections, AuthLayout...
│   ├── pages/                # HomePage, LoginPage, RegisterPage, ForgotPasswordPage
│   ├── utils/                # Helpers (vd: utils/api.ts)
│   ├── App.tsx               # Router cấu hình BrowserRouter + Routes
│   ├── index.tsx / index.html
│   └── dist/                 # Output build (nếu chạy npm run build)
│
├── pages/
│   └── auth/                 # Legacy HTML, không còn được Flask serve
│
└── README.md
```

## Router mapping

- `/` → `HomePage` (Hero, Search, Category, Promo)
- `/login` → React form đăng nhập (gọi `POST /api/auth/login`)
- `/register` → React form đăng ký (gọi `POST /api/auth/register`)
- `/forgot-password` → Trang hướng dẫn, chờ backend cung cấp API
- `*` → fallback về HomePage

## Chạy dev

```bash
# Frontend
cd frontend/web
npm install
npm run dev  # http://localhost:3000

# Backend
python app/main.py  # http://localhost:5000
```

Frontend hiển thị mà không cần backend. Các request API sẽ báo lỗi kết nối nếu backend chưa chạy.

## Build & deploy

```bash
cd frontend/web
npm run build  # tạo dist/
```

Deploy `dist/` lên static host bất kỳ. Backend deploy độc lập để cung cấp API.

## Environment

- `VITE_BACKEND_URL` (optional): URL gốc của Flask API. Mặc định `http://127.0.0.1:5000`.
- Đặt trong `frontend/web/.env.local` khi làm việc với môi trường khác (staging/prod).

## Ghi chú migration

- Flask không còn route `/`, `/login`, `/register`, `/forgot-password` cho HTML.
- Các script build cũ (`build_homepage*.bat|sh`) vẫn hữu ích để build Vite nếu muốn, không còn phụ thuộc Flask.

