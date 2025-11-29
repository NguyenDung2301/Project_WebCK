# Giải quyết lỗi PowerShell Execution Policy

## Vấn đề
Khi chạy `npm` trong PowerShell, bạn gặp lỗi:
```
npm : File C:\Program Files\nodejs\npm.ps1 cannot be loaded because running scripts is disabled on this system.
```

## Giải pháp

### Cách 1: Sử dụng Command Prompt (cmd) - Khuyến nghị ✅

Thay vì dùng PowerShell, mở **Command Prompt (cmd)** và chạy:

```cmd
cd homepage
npm install
npm run build
```

Hoặc sử dụng script batch:
```cmd
build_homepage_cmd.bat
```

### Cách 2: Bypass Execution Policy tạm thời

Trong PowerShell, chạy:
```powershell
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
npm install
npm run build
```

### Cách 3: Thay đổi Execution Policy vĩnh viễn (Cần quyền Admin)

1. Mở PowerShell **as Administrator**
2. Chạy:
```powershell
Set-ExecutionPolicy RemoteSigned
```
3. Chọn `Y` khi được hỏi

### Cách 4: Sử dụng npm.cmd trực tiếp

```powershell
npm.cmd install
npm.cmd run build
```

## Sau khi build thành công

React app đã được build vào thư mục `homepage/dist`. 

Bây giờ bạn có thể chạy Flask:
```bash
python app/main.py
```

Flask sẽ tự động phát hiện và serve trang homepage từ thư mục `dist`!

