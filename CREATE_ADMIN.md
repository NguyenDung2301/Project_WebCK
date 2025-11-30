# Hướng dẫn tạo tài khoản Admin

Có 2 cách để tạo tài khoản admin:

## Cách 1: Sử dụng script Python (Khuyến nghị)

1. Đảm bảo backend đã được cấu hình đúng (có file `.env` với `MONGO_URI`)

2. Chạy script:
```bash
python create_admin.py
```

3. Nhập thông tin theo hướng dẫn:
   - Họ và tên
   - Email
   - Mật khẩu
   - Số điện thoại (tùy chọn)

4. Script sẽ tự động tạo tài khoản với role `admin` trong MongoDB

## Cách 2: Tạo trực tiếp trên MongoDB Atlas

1. Đăng nhập vào MongoDB Atlas
2. Vào **Database** > Chọn database của bạn
3. Vào collection `users`
4. Click **INSERT DOCUMENT**
5. Thêm document với format sau:

```json
{
  "fullname": "Admin User",
  "email": "admin@example.com",
  "password": "<hashed_password>",
  "phone_number": "0912345678",
  "role": "admin",
  "created_at": ISODate("2024-01-01T00:00:00Z")
}
```

**Lưu ý quan trọng về password:**
- Bạn cần hash password trước khi insert
- Có thể sử dụng script Python để hash:

```python
from werkzeug.security import generate_password_hash
password = "your_password_here"
hashed = generate_password_hash(password)
print(hashed)
```

Hoặc tạo user thông thường trước, copy password hash từ đó, rồi update role thành `admin`.

## Cách 3: Tạo user thông thường rồi update role

1. Đăng ký tài khoản thông thường qua frontend (sẽ có role `user`)
2. Vào MongoDB Atlas
3. Tìm user vừa tạo trong collection `users`
4. Update field `role` từ `"user"` thành `"admin"`

## Sau khi tạo xong

1. Đăng nhập với email và mật khẩu vừa tạo
2. Hệ thống sẽ tự động redirect đến `/admin` nếu role là `admin`

