from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from db.models.order import OrderItem, OrderStatus
from db.models.payment import PaymentMethod


# ============== REQUEST SCHEMAS ==============

class CreateOrderItemRequest(BaseModel):
    """Request item trong đơn - CHỈ LẤY TÊN VÀ SỐ LƯỢNG, GIÁ LẤY TỬ DB"""
    food_name: str = Field(..., description="Tên món ăn")
    quantity: int = Field(..., ge=1, description="Số lượng")

    class Config:
        populate_by_name = True


class CreateOrderRequest(BaseModel):
    """Request tạo đơn hàng"""
    restaurant_id: str = Field(..., alias="restaurantId", description="ID nhà hàng")
    items: List[CreateOrderItemRequest] = Field(..., description="Danh sách món")
    address: str = Field(..., description="Địa chỉ giao")
    note: Optional[str] = Field(None, description="Ghi chú")
    payment_method: PaymentMethod = Field(..., description="Phương thức thanh toán")
    shipping_fee: float = Field(default=0, ge=0, description="Phí ship")
    discount: float = Field(default=0, ge=0, description="Giảm giá")
    promo_id: Optional[str] = Field(None, alias="promoId", description="ID voucher")

    class Config:
        populate_by_name = True


class UpdateOrderStatusRequest(BaseModel):
    """Request cập nhật trạng thái đơn"""
    status: OrderStatus = Field(..., description="Trạng thái mới")

    class Config:
        populate_by_name = True


class CancelOrderRequest(BaseModel):
    """Request hủy đơn"""
    reason: Optional[str] = Field(None, description="Lý do hủy")

    class Config:
        populate_by_name = True


class AssignShipperRequest(BaseModel):
    """Request gán shipper cho đơn (chỉ admin/system)"""
    shipper_id: str = Field(..., alias="shipperId", description="ID shipper")

    class Config:
        populate_by_name = True


# ============== RESPONSE SCHEMAS ==============

class OrderItemResponse(BaseModel):
    """Response item"""
    food_name: str
    quantity: int
    unit_price: float
    subtotal: float

    class Config:
        populate_by_name = True


class ShipperRejectionResponse(BaseModel):
    """Lịch sử từ chối của shipper cho đơn hàng"""
    shipper_id: str = Field(..., alias="shipperId")
    reason: Optional[str] = None
    timestamp: datetime

    class Config:
        populate_by_name = True


class OrderResponse(BaseModel):
    """Response đơn hàng đầy đủ"""
    order_id: str = Field(..., alias="_id")
    user_id: str = Field(..., alias="userId")
    restaurant_id: str = Field(..., alias="restaurantId")
    shipper_id: Optional[str] = Field(None, alias="shipperId")
    user_fullname: str = Field(..., alias="userFullname")
    user_phone: str = Field(..., alias="userPhone")
    restaurant_name: str = Field(..., alias="restaurantName")
    restaurant_address: str = Field(..., alias="restaurantAddress")
    restaurant_hotline: Optional[str] = Field(None, alias="restaurantHotline")
    items: List[OrderItemResponse]
    address: str
    note: Optional[str] = None
    subtotal: float
    shipping_fee: float
    discount: float
    total_amount: float
    promo_id: Optional[str] = Field(None, alias="promoId")
    payment_id: Optional[str] = Field(None, alias="paymentId")
    payment_method: Optional[PaymentMethod] = Field(None, alias="paymentMethod")
    status: str
    refunded: bool = False
    refunded_amount: float = 0
    refund_at: Optional[datetime] = None
    cancelled_by: Optional[str] = None
    cancellation_reason: Optional[str] = None
    shipper_rejections: List[ShipperRejectionResponse] = Field(default_factory=list, alias="shipperRejections")
    created_at: datetime = Field(..., alias="createdAt")
    updated_at: datetime = Field(..., alias="updatedAt")

    class Config:
        populate_by_name = True


class OrderSimpleResponse(BaseModel):
    """Response rút gọn (danh sách)"""
    order_id: str = Field(..., alias="_id")
    user_id: str = Field(..., alias="userId")
    restaurant_id: str = Field(..., alias="restaurantId")
    user_fullname: str = Field(..., alias="userFullname")
    restaurant_name: str = Field(..., alias="restaurantName")
    restaurant_address: str = Field(..., alias="restaurantAddress")
    address: str
    shipping_fee: float
    total_amount: float
    status: str
    refunded: bool = False
    refunded_amount: float = 0
    refund_at: Optional[datetime] = None
    created_at: datetime = Field(..., alias="createdAt")

    class Config:
        populate_by_name = True
