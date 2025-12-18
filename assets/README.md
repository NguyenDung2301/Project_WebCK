# Assets Folder

Thư mục chứa các tài nguyên tĩnh của ứng dụng.

## Cấu trúc

```
assets/
  images/
    logo.png        # Logo chính (thêm file vào đây)
    logo-white.png  # Logo màu trắng (optional)
  icons/            # Custom icons (nếu cần)
  fonts/            # Custom fonts (nếu cần)
```

## Hướng dẫn

1. Thêm file `logo.png` vào folder `images/`
2. Kích thước khuyến nghị: 40x40px hoặc 48x48px
3. Format: PNG với background trong suốt

## Sử dụng

```tsx
import logo from '@/assets/images/logo.png';

<img src={logo} alt="FoodDelivery Logo" className="h-10 w-10" />
```
