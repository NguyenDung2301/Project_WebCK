"""
Script để tạo tài khoản admin
Chạy: python create_admin.py
"""
import os
import sys
from datetime import datetime
from dotenv import load_dotenv
from werkzeug.security import generate_password_hash
from pymongo import MongoClient

# Fix encoding cho Windows console
if sys.platform == 'win32':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

# Load environment variables
load_dotenv()

# Import config trực tiếp
from app.core.config import config

# Kết nối MongoDB trực tiếp
client = MongoClient(config.MONGO_URI)
db = client[config.MONGO_DB_NAME]
users_collection = db['users']

# Import Role
from app.utils.roles import Role

def create_admin_user():
    """Tạo tài khoản admin"""
    
    print("=" * 50)
    print("TẠO TÀI KHOẢN ADMIN")
    print("=" * 50)
    
    # Nhập thông tin
    fullname = input("Nhập họ và tên: ").strip()
    email = input("Nhập email: ").strip()
    password = input("Nhập mật khẩu: ").strip()
    phone_number = input("Nhập số điện thoại (tùy chọn, Enter để bỏ qua): ").strip() or None
    
    if not fullname or not email or not password:
        print("❌ Lỗi: Họ tên, email và mật khẩu là bắt buộc!")
        return
    
    # Kiểm tra email đã tồn tại chưa
    existing_user = users_collection.find_one({'email': email})
    if existing_user:
        print(f"❌ Email {email} đã được sử dụng!")
        return
    
    # Hash password
    hashed_password = generate_password_hash(password)
    
    # Tạo user document
    user_doc = {
        'fullname': fullname,
        'email': email,
        'password': hashed_password,
        'phone_number': phone_number,
        'role': Role.ADMIN.value,  # Set role là admin
        'created_at': datetime.now(),
    }
    
    # Insert vào MongoDB
    try:
        result = users_collection.insert_one(user_doc)
        print("\n✅ Tạo tài khoản admin thành công!")
        print(f"   User ID: {result.inserted_id}")
        print(f"   Email: {email}")
        print(f"   Role: {Role.ADMIN.value}")
        print("\nBạn có thể đăng nhập với email và mật khẩu vừa tạo.")
    except Exception as e:
        print(f"❌ Lỗi khi tạo tài khoản: {str(e)}")

if __name__ == "__main__":
    try:
        create_admin_user()
    except KeyboardInterrupt:
        print("\n\nDa huy.")
    except Exception as e:
        print(f"\n[ERROR] Loi: {str(e)}")
        import traceback
        traceback.print_exc()

