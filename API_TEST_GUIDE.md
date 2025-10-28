# API Test Template - Food Delivery

## 📋 Mô tả
Template HTML đơn giản để test các API endpoints của ứng dụng Food Delivery.

## 🚀 Cách sử dụng

### 1. Chạy Flask Server
```bash
cd app
python main.py
```
Server sẽ chạy tại `http://localhost:5000`

### 2. Mở Template
Mở file `api_test_template.html` trong trình duyệt web.

### 3. Test các API

#### 🔐 Authentication APIs
- **POST /api/auth/register** - Đăng ký tài khoản mới
  - Các trường bắt buộc: Họ tên, Email, Mật khẩu, Số điện thoại
  - Các trường tùy chọn: Ngày sinh, Giới tính
  
- **POST /api/auth/login** - Đăng nhập
  - Cần: Email và Mật khẩu
  - Trả về token để sử dụng cho các API khác

#### 👤 User Management APIs (Cần token)
- **GET /api/users/profile_me** - Lấy thông tin profile hiện tại
- **PUT /api/users/update_profile** - Cập nhật thông tin profile
- **GET /api/users/profile_{user_id}** - Lấy thông tin user theo ID
- **DELETE /api/users/{user_id}** - Xóa user theo ID

## 📝 Các trường dữ liệu

### User Schema
- `fullname`: Họ và tên (bắt buộc, 2-100 ký tự)
- `email`: Email (bắt buộc, định dạng email hợp lệ)
- `password`: Mật khẩu (bắt buộc, tối thiểu 6 ký tự)
- `phone_number`: Số điện thoại (bắt buộc, 10-11 số)
- `birthday`: Ngày sinh (tùy chọn, định dạng YYYY-MM-DD)
- `gender`: Giới tính (tùy chọn, "Male" hoặc "Female")

### Response Format
```json
{
  "success": true,
  "message": "Thông báo",
  "data": {
    // Dữ liệu trả về
  }
}
```

## 🔧 Tính năng Template

- ✅ Giao diện đẹp và responsive
- ✅ Validation dữ liệu đầu vào
- ✅ Hiển thị token tự động sau khi đăng nhập
- ✅ Format JSON response đẹp mắt
- ✅ Phân biệt màu sắc cho success/error
- ✅ Hỗ trợ tất cả HTTP methods (GET, POST, PUT, DELETE)

## 🐛 Troubleshooting

### Lỗi CORS
Nếu gặp lỗi CORS, đảm bảo Flask server đã được cấu hình CORS:
```python
from flask_cors import CORS
CORS(app)
```

### Lỗi kết nối
- Kiểm tra Flask server đang chạy tại `http://localhost:5000`
- Kiểm tra MongoDB connection trong `app/db/connection.py`

### Lỗi validation
- Đảm bảo điền đầy đủ các trường bắt buộc (*)
- Kiểm tra định dạng email và số điện thoại
- Mật khẩu phải có ít nhất 6 ký tự
