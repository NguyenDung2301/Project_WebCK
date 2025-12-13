import os
from datetime import datetime
from typing import Optional, List, Dict
from bson import ObjectId
from pymongo.errors import DuplicateKeyError
from core.security import security
from db.connection import users_collection
from db.models.user import User
from schemas.user_schema import (
    UserLoginRequest,
    UserRegisterRequest,
    UserUpdateRequest,
    UserResponse,
    UserLoginResponse,
    UserRoleUpdateRequest,
)
from utils.roles import Role

class UserService:
    def __init__(self):
        self.collection = users_collection
        self.secret_key = os.getenv('JWT_SECRET')

# ==================== MongoDB CRUD Operations ==================== dùng để làm việc với database trên mongo
    def find_by_id(self, user_id: str) -> Optional[User]:
        """Tìm user theo ID"""
        try:
            doc = self.collection.find_one({'_id': ObjectId(user_id)})
            return User(**doc) if doc else None
        except Exception as e:
            print(f"Error finding user by id: {e}")
            return None
    
    def find_by_email(self, email: str) -> Optional[User]:
        """Tìm user theo email"""
        doc = self.collection.find_one({'email': email})
        return User(**doc) if doc else None
    
    def create_user(self, user_data: UserRegisterRequest) -> User:
        """Tạo user mới trong MongoDB"""
        try:
            # Tạo User object
            user = User(
                fullname=user_data.fullname,
                email=user_data.email,
                password=security.hash_password(user_data.password),
                phone_number=user_data.phone_number,
                birthday=user_data.birthday,
                gender=user_data.gender,
                created_at=datetime.now(),
                role=Role.USER,
            )
            
            # Convert sang MongoDB document
            user_doc = user.to_mongo()
            
            # Insert vào MongoDB
            result = self.collection.insert_one(user_doc)
            
            # Lấy user vừa tạo để ktra xem đã có email chưa
            return self.find_by_id(str(result.inserted_id))
        except DuplicateKeyError:
            raise ValueError('Email đã được sử dụng')
    
    def update_user_in_db(self, user_id: str, user_data: UserUpdateRequest) -> Optional[User]:
        """Cập nhật user trong MongoDB"""
        try:
            # Lấy các field cần update (exclude None values)
            update_data = user_data.model_dump(exclude_unset=True, exclude_none=True)
            
            if not update_data:
                raise ValueError('Không có dữ liệu để cập nhật')
            
            # Thêm updated_at
            update_data['updated_at'] = datetime.now()
            
            # Update trong MongoDB
            result = self.collection.update_one(
                {'_id': ObjectId(user_id)},
                {'$set': update_data}
            )
            
            return self.find_by_id(user_id) if result.matched_count > 0 else None
            
        except Exception as e:
            raise ValueError(f'Lỗi khi cập nhật user: {str(e)}')

    def delete_user_from_db(self, user_id: str) -> bool:
        """Xóa user khỏi MongoDB"""
        result = self.collection.delete_one({'_id': ObjectId(user_id)})
        return result.deleted_count > 0
        

# ==================== Business Logic ==================== dùng để xử lý yêu cầu của users
    def register(self, user_data: UserRegisterRequest) -> Dict:
        """Đăng ký user mới"""
        # Kiểm tra email đã tồn tại
        if self.find_by_email(user_data.email):
            raise ValueError('Email đã được sử dụng')
        
        # Tạo user
        user = self.create_user(user_data) #gọi hàm create_user bên trên
        
        # Generate JWT token
        token = security.create_user_token(user_id=str(user.id), email=user.email, role=user.role.value)
        
        # Return response
        return UserLoginResponse(
            user=UserResponse(**user.to_dict()),
            token=token
        ).model_dump()

    def login(self, login_data: UserLoginRequest) -> Dict:
        """Đăng nhập"""
        # Tìm user
        user = self.find_by_email(login_data.email)
        if not user:
            raise ValueError('Email hoặc mật khẩu không đúng')
        
        # Kiểm tra password
        if not security.verify_password(login_data.password, user.password):
            raise ValueError('Email hoặc mật khẩu không đúng')
        
        # Generate token
        token = security.create_user_token(user_id=str(user.id), email=user.email, role=user.role.value)
        
        return UserLoginResponse(
            user=UserResponse(**user.to_dict()),
            token=token
        ).model_dump()

    def update_user(self, user_id: str, user_data: UserUpdateRequest) -> Dict:
        """Cập nhật thông tin user"""
        # Kiểm tra user tồn tại
        user = self.find_by_id(user_id)
        if not user:
            raise ValueError('Không tìm thấy user')
        
        # Update
        updated_user = self.update_user_in_db(user_id, user_data)
        
        return UserResponse(**updated_user.to_dict()).model_dump()

    def delete_user(self, user_id: str) -> Dict:
        """Xóa user"""
        # Kiểm tra user tồn tại
        if not self.find_by_id(user_id):
            raise ValueError('Không tìm thấy user')
        
        # Xóa
        deleted = self.delete_user_from_db(user_id)
        if not deleted:
            raise ValueError('Không thể xóa user')
        
        return {'message': 'Xóa user thành công'}

    def get_user_by_id(self, user_id: str) -> Dict:
        """Lấy thông tin user theo ID"""
        user = self.find_by_id(user_id)
        if not user:
            raise ValueError('Không tìm thấy user')
        
        return UserResponse(**user.to_dict()).model_dump()

    def get_user_by_email(self, email: str) -> Dict:
        """Lấy thông tin user theo email (chỉ dùng trong các API yêu cầu quyền phù hợp)"""
        user = self.find_by_email(email)
        if not user:
            raise ValueError('Không tìm thấy user')

        return UserResponse(**user.to_dict()).model_dump()

    def get_all_users(self) -> List[Dict]:
        """Lấy danh sách tất cả users (chỉ admin được phép gọi API)"""
        try:
            users = self.collection.find({'role': {'$ne': 'admin'}})
            result = []
            for doc in users:
                user = User(**doc)
                result.append(UserResponse(**user.to_dict()).model_dump())
            return result
        except Exception as e:
            raise ValueError(f'Lỗi khi lấy danh sách users: {str(e)}')

    def update_user_role(self, user_id: str, role_data: UserRoleUpdateRequest) -> Dict:
        """Cập nhật vai trò user (chỉ admin được phép gọi API)"""
        # Kiểm tra user tồn tại
        user = self.find_by_id(user_id)
        if not user:
            raise ValueError('Không tìm thấy user')

        new_role = role_data.role

        result = self.collection.update_one(
            {'_id': ObjectId(user_id)},
            {'$set': {'role': new_role}}
        )

        if result.matched_count == 0:
            raise ValueError('Không thể cập nhật vai trò user')

        updated_user = self.find_by_id(user_id)
        return UserResponse(**updated_user.to_dict()).model_dump()

user_service = UserService()