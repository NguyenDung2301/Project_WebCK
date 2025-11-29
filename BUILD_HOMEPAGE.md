# Hướng dẫn Build Homepage

Trang homepage là một ứng dụng **React + Vite + TypeScript**. Để Flask có thể serve trang này, bạn cần build React app trước.

## Cách 1: Build React App (Khuyến nghị cho Production)

1. **Cài đặt dependencies** (nếu chưa có):
   ```bash
   cd homepage
   npm install
   ```

2. **Build React app**:
   ```bash
   npm run build
   ```

   Lệnh này sẽ tạo thư mục `homepage/dist` chứa các file đã build (JavaScript, CSS, HTML).

3. **Chạy Flask app**:
   ```bash
   python app/main.py
   ```

   Flask sẽ tự động phát hiện thư mục `dist` và serve các file từ đó.

## Cách 2: Sử dụng Script Build (Windows)

Chạy file batch script:
```bash
build_homepage.bat
```

## Cách 3: Chạy Vite Dev Server (Cho Development)

Nếu bạn muốn develop và có hot-reload:

1. **Terminal 1 - Chạy Vite dev server**:
   ```bash
   cd homepage
   npm install
   npm run dev
   ```
   Vite sẽ chạy trên `http://localhost:3000`

2. **Terminal 2 - Chạy Flask API**:
   ```bash
   python app/main.py
   ```
   Flask sẽ chạy trên `http://localhost:5000`

   Lúc này bạn có thể:
   - Truy cập homepage tại: `http://localhost:3000` (Vite dev server)
   - Truy cập API tại: `http://localhost:5000/api/*`

## Lưu ý

- **TypeScript không thể chạy trực tiếp trong trình duyệt** - cần phải build hoặc dùng Vite dev server
- Sau khi build, Flask sẽ tự động serve từ thư mục `dist`
- Nếu trang vẫn trống, kiểm tra Console trong browser để xem lỗi JavaScript

## Troubleshooting

### Trang trống sau khi build
1. Kiểm tra Console trong browser (F12)
2. Kiểm tra Network tab để xem file nào không load được
3. Đảm bảo thư mục `homepage/dist` đã được tạo sau khi build

### Build failed
- Đảm bảo Node.js đã được cài đặt
- Chạy `npm install` trước khi build
- Kiểm tra lỗi trong terminal khi build

