from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime
from db.models.user import GenderEnum, Role

class UserLoginRequest(BaseModel):
    """Schema cho đăng nhập"""
    email: EmailStr
    password: str

class UserRegisterRequest(BaseModel):
    """Schema cho đăng ký user"""
    fullname: str = Field(..., min_length=2, max_length=100, description="Tên người dùng")
    email: EmailStr = Field(..., description="Email")
    password: str = Field(..., min_length=6, description="Mật khẩu")
    phone_number: Optional[str] = Field(..., min_length=10, max_length=11, description="Số điện thoại")
    birthday: Optional[datetime] = Field(None, description="Ngày sinh")
    gender: Optional[GenderEnum] = Field(..., description="Giới tính")
    
    class Config:
        json_schema_extra = {
            "example": {
                "fullname": "John Doe",
                "email": "john@example.com",
                "password": "password123",
                "phone_number": "0909090909",
                "birthday": "1990-01-01",
                "gender": "Male"
            }
        }

class UserUpdateRequest(BaseModel):
    """Schema cho cập nhật thông tin user""" #form tương tự với form đăng kí
    fullname: Optional[str] = Field(None, min_length=2, max_length=100, description="Tên người dùng")
    email: Optional[EmailStr] = Field(None, description="Email")
    phone_number: Optional[str] = Field(None, min_length=10, max_length=11, description="Số điện thoại")
    birthday: Optional[datetime] = Field(None, description="Ngày sinh")
    gender: Optional[GenderEnum] = Field(None, description="Giới tính")

class UserResponse(BaseModel):
    """Schema cho response (không có password)""" #form in ra khi tìm kiếm
    user_id: str = Field(..., alias='_id')
    fullname: str
    email: EmailStr
    phone_number: Optional[str] = None
    birthday: Optional[datetime] = None    
    gender: Optional[GenderEnum] = None
    created_at: datetime
    role: Role

class UserLoginResponse(BaseModel):
    """Schema cho response đăng nhập""" #form khi đăng nhập thành công, có thêm token
    user: UserResponse
    token: str


class UserRoleUpdateRequest(BaseModel):
    """Schema cho cập nhật vai trò user (chỉ dành cho admin)"""
    role: Role