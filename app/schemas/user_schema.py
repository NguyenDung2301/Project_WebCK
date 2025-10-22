from pydantic import BaseModel, EmailStr, Field
from typing import Optional

# Các Role được hỗ trợ
ROLES = ["User", "Admin", "Shipper", "Kitchen", "SuperAdmin"]

# -----------------------------
# Schema dùng khi đăng ký (public)
# -----------------------------
class UserRegisterSchema(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    password: str = Field(..., min_length=6)
    fullName: str
    phone: str
    email: EmailStr
    address: Optional[str] = None

    class Config:
        orm_mode = True


# -----------------------------
# Schema login
# -----------------------------
class UserLoginSchema(BaseModel):
    username: str
    password: str


# -----------------------------
# Schema cho Admin tạo nhân sự (Admin/Shipper/Kitchen)
# -----------------------------
class AdminCreateUserSchema(BaseModel):
    username: str
    password: str
    fullName: str
    phone: str
    email: EmailStr
    address: Optional[str] = None
    role: str = Field(..., pattern="^(User|Admin|Shipper|Kitchen|SuperAdmin)$")
    branchId: Optional[str] = None  # SuperAdmin phải truyền khi tạo Admin

    class Config:
        orm_mode = True