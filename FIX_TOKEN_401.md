# Hướng dẫn sửa lỗi 401 - Token không hợp lệ

## Vấn đề
Token có role='admin' và hợp lệ ở frontend, nhưng backend vẫn trả về 401 (Unauthorized).

## Nguyên nhân có thể

### 1. JWT_SECRET không được cấu hình hoặc không khớp

**Kiểm tra:**
1. Xem terminal backend khi khởi động - có thông báo `[WARNING] JWT_SECRET is not set` không?
2. Nếu có → Cần tạo file `.env` với JWT_SECRET

**Giải pháp:**
1. Tạo file `.env` ở thư mục gốc của project (cùng cấp với `app/`)
2. Thêm nội dung:

```env
# MongoDB Configuration
MONGO_URI=mongodb+srv://23001508:23012005@cluster0.3g2rojb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
MONGO_DB_NAME=fooddelivery

# JWT Configuration - QUAN TRỌNG!
JWT_SECRET=your-super-secret-key-change-this-to-random-string-min-32-chars
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440

# Flask Configuration
SECRET_KEY=your-flask-secret-key
DEBUG=true
HOST=127.0.0.1
PORT=5000
```

3. **QUAN TRỌNG:** Thay `your-super-secret-key-change-this-to-random-string-min-32-chars` bằng một chuỗi ngẫu nhiên dài (ít nhất 32 ký tự)

4. Restart backend server

### 2. JWT_SECRET khác nhau giữa lúc tạo token và verify token

**Vấn đề:** Token được tạo với JWT_SECRET này, nhưng backend đang dùng JWT_SECRET khác.

**Giải pháp:**
- Đảm bảo JWT_SECRET trong `.env` giống nhau khi tạo token và verify token
- Nếu đã thay đổi JWT_SECRET, cần đăng nhập lại để lấy token mới

### 3. Kiểm tra Backend Logs

Khi gọi API `/api/users/all`, xem terminal backend có các log sau:

```
[DEBUG] admin_required: Token payload: {...}
[DEBUG] admin_required: Role in token: admin
[DEBUG] decode_token: Secret key exists: True/False
[DEBUG] decode_token: Algorithm: HS256
```

**Nếu thấy:**
- `Secret key exists: False` → JWT_SECRET chưa được set
- `Invalid token error: ...` → JWT_SECRET không khớp hoặc token bị lỗi

## Các bước kiểm tra

### Bước 1: Kiểm tra file .env
```bash
# Windows PowerShell
Get-Content .env

# Hoặc mở file .env bằng text editor
```

Đảm bảo có dòng:
```
JWT_SECRET=your-secret-key-here
```

### Bước 2: Kiểm tra backend logs khi khởi động
Khi chạy `python app/main.py`, xem có warning:
```
[WARNING] JWT_SECRET is not set in environment variables!
```

Nếu có → Cần tạo/sửa file `.env`

### Bước 3: Kiểm tra backend logs khi gọi API
Khi gọi API `/api/users/all`, xem terminal backend có log:
```
[DEBUG] admin_required: Token payload: ...
[DEBUG] decode_token: ...
```

Nếu không thấy logs → Middleware không được gọi hoặc có lỗi trước đó

### Bước 4: Tạo JWT_SECRET mới (nếu cần)

**Cách 1: Dùng Python**
```python
import secrets
print(secrets.token_urlsafe(32))
```

**Cách 2: Dùng online generator**
- Truy cập: https://generate-secret.vercel.app/32
- Copy secret key và paste vào `.env`

**Cách 3: Tạo thủ công**
- Dùng chuỗi ngẫu nhiên dài ít nhất 32 ký tự
- Ví dụ: `my-super-secret-jwt-key-2024-fooddelivery-app-12345`

## Giải pháp nhanh

1. **Tạo file `.env`** ở thư mục gốc với nội dung:
```env
JWT_SECRET=your-random-secret-key-min-32-chars-12345678901234567890
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440
MONGO_URI=mongodb+srv://23001508:23012005@cluster0.3g2rojb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
MONGO_DB_NAME=fooddelivery
SECRET_KEY=flask-secret-key
DEBUG=true
HOST=127.0.0.1
PORT=5000
```

2. **Restart backend server**

3. **Đăng xuất và đăng nhập lại** để lấy token mới với JWT_SECRET mới

4. **Kiểm tra lại** - API sẽ hoạt động

## Lưu ý quan trọng

- **KHÔNG** commit file `.env` lên Git (nên có trong `.gitignore`)
- **JWT_SECRET** phải giống nhau giữa các lần chạy backend
- Nếu thay đổi JWT_SECRET, tất cả token cũ sẽ không còn hợp lệ
- Token mới chỉ hợp lệ nếu được tạo với JWT_SECRET hiện tại

