from typing import Optional, List
from pydantic import BaseModel, Field
from .common import PyObjectId


class FoodMenuItem(BaseModel):
    """Food item nhúng trong menu của Restaurant"""
    food_id: str = Field(..., alias="foodId")
    food_name: str
    price: float
    description: Optional[str] = None
    image: Optional[str] = None
    status: Optional[bool] = True
    category: str = Field(...) 

    class Config:
        populate_by_name = True

    def to_dict(self):
        return {
            "foodId": self.food_id,
            "food_name": self.food_name,
            "price": self.price,
            "description": self.description,
            "image": self.image,
            "status": self.status,
            "category": self.category 
        }


class Restaurant(BaseModel):
    """Restaurant Model với menu nhúng"""
    restaurant_id: Optional[PyObjectId] = Field(default=None, alias="_id")
    restaurant_name: str
    address: Optional[str] = None
    hotline: Optional[str] = None
    open_time: Optional[str] = Field(default=None, alias="openTime")
    close_time: Optional[str] = Field(default=None, alias="closeTime")
    map_link: Optional[str] = Field(default=None, alias="mapLink")
    menu: Optional[List[FoodMenuItem]] = Field(default_factory=list)

    class Config:
        populate_by_name = True

    @property
    def id(self):
        return self.restaurant_id

    def to_dict(self):
        return {
            "_id": str(self.restaurant_id) if self.restaurant_id else None,
            "restaurant_name": self.restaurant_name,
            "address": self.address,
            "hotline": self.hotline,
            "openTime": self.open_time,
            "closeTime": self.close_time,
            "mapLink": self.map_link,
            "menu": [item.to_dict() for item in self.menu] if self.menu else []
        }

    def to_mongo(self):
        doc = {
            "restaurant_name": self.restaurant_name,
            "address": self.address,
            "hotline": self.hotline,
            "openTime": self.open_time,
            "closeTime": self.close_time,
            "mapLink": self.map_link,
            "menu": [item.to_dict() for item in self.menu] if self.menu else []
        }
        if self.restaurant_id:
            doc["_id"] = self.restaurant_id
        return doc