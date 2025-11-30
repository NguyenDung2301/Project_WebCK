# Hướng dẫn kiểm tra Token

## Bước 2: Kiểm tra Token trong Browser

### Cách 1: Kiểm tra qua Developer Console (Khuyến nghị)

#### Bước 1: Mở Developer Tools
1. Nhấn phím **F12** hoặc **Ctrl + Shift + I** (Windows) / **Cmd + Option + I** (Mac)
2. Hoặc click chuột phải vào trang web > chọn **"Inspect"** hoặc **"Kiểm tra"**

#### Bước 2: Xem Console Logs
1. Click vào tab **"Console"** ở trên cùng của Developer Tools
2. Tìm các dòng log bắt đầu bằng:
   - `[AdminRoute] Token role: ...`
   - `[useUserManagement] Token role: ...`
   - `[DEBUG] admin_required: Token payload: ...`

**Ví dụ log hợp lệ:**
```
[AdminRoute] Token decoded: {user_id: "123", email: "admin@example.com", role: "admin", exp: 1234567890}
[AdminRoute] Token role: admin
```

**Ví dụ log lỗi:**
```
[AdminRoute] Token decoded: {user_id: "123", email: "admin@example.com", exp: 1234567890}
[AdminRoute] Token role: undefined
```
→ Nếu `role: undefined` → Token cũ, cần đăng nhập lại

#### Bước 3: Kiểm tra Token trong Local Storage
1. Trong Developer Tools, click vào tab **"Application"** (Chrome) hoặc **"Storage"** (Firefox)
2. Ở sidebar bên trái, mở rộng **"Local Storage"**
3. Click vào URL của website (ví dụ: `http://localhost:5173`)
4. Tìm key **"token"** trong danh sách
5. Copy giá trị của token (chuỗi dài)

### Cách 2: Kiểm tra Token bằng JWT.io

#### Bước 1: Truy cập JWT.io
1. Mở trình duyệt và vào: **https://jwt.io**

#### Bước 2: Paste Token
1. Copy token từ Local Storage (theo Cách 1, Bước 3)
2. Paste vào ô **"Encoded"** bên trái của trang JWT.io

#### Bước 3: Xem Payload (Phần giữa)
Token sẽ tự động được decode và hiển thị ở phần **"Payload"** (giữa trang).

**Kiểm tra các thông tin sau:**

✅ **Token hợp lệ có role admin:**
```json
{
  "user_id": "1234567890abcdef",
  "email": "admin@example.com",
  "role": "admin",
  "exp": 1732896000,
  "iat": 1732809600
}
```

❌ **Token cũ không có role:**
```json
{
  "user_id": "1234567890abcdef",
  "email": "admin@example.com",
  "exp": 1732896000,
  "iat": 1732809600
}
```
→ Không có field `"role"` → Cần đăng nhập lại

❌ **Token hết hạn:**
- Kiểm tra `exp` (expiration time)
- So sánh với thời gian hiện tại
- Nếu `exp` < thời gian hiện tại → Token đã hết hạn

### Cách 3: Kiểm tra qua JavaScript Console

1. Mở Developer Console (F12)
2. Gõ các lệnh sau:

```javascript
// Lấy token từ localStorage
const token = localStorage.getItem('token');
console.log('Token:', token);

// Decode token (nếu đã cài jwt-decode)
import('https://cdn.jsdelivr.net/npm/jwt-decode@4.0.0/build/jwt-decode.esm.js').then(({ jwtDecode }) => {
  try {
    const decoded = jwtDecode(token);
    console.log('Decoded token:', decoded);
    console.log('Role:', decoded.role);
    console.log('Expired:', decoded.exp ? new Date(decoded.exp * 1000) : 'N/A');
  } catch (e) {
    console.error('Error decoding:', e);
  }
});
```

Hoặc đơn giản hơn, dùng hàm có sẵn:

```javascript
// Kiểm tra token có role không
const token = localStorage.getItem('token');
if (token) {
  const parts = token.split('.');
  if (parts.length === 3) {
    const payload = JSON.parse(atob(parts[1]));
    console.log('Token payload:', payload);
    console.log('Has role:', 'role' in payload);
    console.log('Role value:', payload.role);
    console.log('Is admin:', payload.role === 'admin');
  }
}
```

## Các trường hợp và cách xử lý

### Trường hợp 1: Token không có role
**Triệu chứng:** `role: undefined` hoặc không có field `role` trong payload

**Giải pháp:**
1. Đăng xuất (click "Đăng xuất" ở sidebar)
2. Đăng nhập lại với tài khoản admin
3. Token mới sẽ có `role: "admin"`

### Trường hợp 2: Token hết hạn
**Triệu chứng:** `exp` < thời gian hiện tại

**Giải pháp:**
1. Đăng nhập lại để lấy token mới
2. Token mới sẽ có thời gian hết hạn mới

### Trường hợp 3: Token không hợp lệ
**Triệu chứng:** Không thể decode token, hoặc lỗi khi decode

**Giải pháp:**
1. Xóa token cũ: `localStorage.removeItem('token')`
2. Đăng nhập lại

### Trường hợp 4: Role không phải "admin"
**Triệu chứng:** `role: "user"` hoặc `role: "shipper"`

**Giải pháp:**
1. Kiểm tra tài khoản trong MongoDB có role='admin' không
2. Nếu không có, cập nhật role trong MongoDB
3. Đăng nhập lại

## Kiểm tra nhanh bằng một lệnh

Copy và paste vào Console (F12):

```javascript
(() => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.log('❌ Không tìm thấy token');
    return;
  }
  
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      console.log('❌ Token không đúng format');
      return;
    }
    
    const payload = JSON.parse(atob(parts[1]));
    const hasRole = 'role' in payload;
    const isAdmin = payload.role === 'admin';
    const exp = payload.exp ? new Date(payload.exp * 1000) : null;
    const isExpired = exp ? exp < new Date() : false;
    
    console.log('📋 Token Info:');
    console.log('  - Has role field:', hasRole);
    console.log('  - Role value:', payload.role || 'undefined');
    console.log('  - Is admin:', isAdmin);
    console.log('  - Expires at:', exp || 'N/A');
    console.log('  - Is expired:', isExpired);
    console.log('  - User ID:', payload.user_id);
    console.log('  - Email:', payload.email);
    
    if (!hasRole || !isAdmin) {
      console.log('\n⚠️ Token không có role admin. Cần đăng nhập lại!');
    } else if (isExpired) {
      console.log('\n⚠️ Token đã hết hạn. Cần đăng nhập lại!');
    } else {
      console.log('\n✅ Token hợp lệ và có quyền admin!');
    }
  } catch (e) {
    console.log('❌ Lỗi khi decode token:', e);
  }
})();
```

Sau khi chạy lệnh này, bạn sẽ thấy thông tin chi tiết về token và biết cần làm gì tiếp theo.

