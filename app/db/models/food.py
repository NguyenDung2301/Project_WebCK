from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field

from .common import PyObjectId


class Food(BaseModel):
    food_id: Optional[PyObjectId] = Field(default=None, alias="_id")
    food_name: str
    price: float
    description: Optional[str] = None
    image: Optional[str] = None
    status: Optional[bool] = True
    category_id: Optional[PyObjectId] = Field(default=None, alias="categoryId")

    @property
    def id(self):
        return self.food_id

    def to_dict(self):
        return {
            "_id": str(self.food_id) if self.food_id else None,
            "food_name": self.food_name,
            "price": float(self.price),
            "description": self.description,
            "image": self.image,
            "status": bool(self.status) if self.status is not None else None,
            "categoryId": str(self.category_id) if self.category_id else None,
        }

    def to_mongo(self):
        doc = {
            "food_name": self.food_name,
            "price": float(self.price),
            "description": self.description,
            "image": self.image,
            "status": self.status,
            "categoryId": self.category_id,
        }
        if self.food_id:
            doc["_id"] = self.food_id
        return doc


