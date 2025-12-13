from pydantic import BaseModel, Field
from typing import Optional, List
from db.models.restaurants import FoodMenuItem


# ============== REQUEST SCHEMAS ==============

class AddFoodToMenuRequest(BaseModel):
    """Request thêm food vào menu của restaurant"""
    food_id: str = Field(..., alias="foodId")
    food_name: str
    price: float
    description: Optional[str] = None
    image: Optional[str] = None
    status: Optional[bool] = True
    category: str = Field(...) 

    class Config:
        populate_by_name = True


class UpdateFoodInMenuRequest(BaseModel):
    """Request cập nhật food trong menu"""
    food_name: Optional[str] = None
    price: Optional[float] = None
    description: Optional[str] = None
    image: Optional[str] = None
    status: Optional[bool] = None
    # ĐIỀU CHỈNH: Category chỉ là một chuỗi (tên category)
    category: Optional[str] = None

    class Config:
        populate_by_name = True


class CreateRestaurantRequest(BaseModel):
    """Request tạo restaurant mới"""
    restaurant_name: str
    address: Optional[str] = None
    hotline: Optional[str] = None
    open_time: Optional[str] = Field(default=None, alias="openTime")
    close_time: Optional[str] = Field(default=None, alias="closeTime")
    map_link: Optional[str] = Field(default=None, alias="mapLink")
    menu: Optional[List[FoodMenuItem]] = Field(default_factory=list)

    class Config:
        populate_by_name = True


class UpdateRestaurantRequest(BaseModel):
    """Request cập nhật thông tin restaurant"""
    restaurant_name: Optional[str] = None
    address: Optional[str] = None
    hotline: Optional[str] = None
    open_time: Optional[str] = Field(default=None, alias="openTime")
    close_time: Optional[str] = Field(default=None, alias="closeTime")
    map_link: Optional[str] = Field(default=None, alias="mapLink")

    class Config:
        populate_by_name = True


# ============== RESPONSE SCHEMAS ==============

class RestaurantResponse(BaseModel):
    """Response trả về restaurant với menu"""
    restaurant_id: str = Field(..., alias="restaurantId")
    restaurant_name: str
    address: Optional[str] = None
    hotline: Optional[str] = None
    open_time: Optional[str] = Field(default=None, alias="openTime")
    close_time: Optional[str] = Field(default=None, alias="closeTime")
    map_link: Optional[str] = Field(default=None, alias="mapLink")
    menu: Optional[List[FoodMenuItem]] = Field(default_factory=list)
    menu_count: int = Field(default=0)  # Số lượng food trong menu

    class Config:
        populate_by_name = True


class SearchFoodResponse(BaseModel):
    """Response khi tìm kiếm food - hiển thị food + restaurant info"""
    food: FoodMenuItem
    restaurant: RestaurantResponse

    class Config:
        populate_by_name = True