from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field

from .common import PyObjectId


class Cart(BaseModel):
    cart_id: Optional[PyObjectId] = Field(default=None, alias="_id")
    user_id: PyObjectId = Field(alias="userId")
    food_id: PyObjectId = Field(alias="foodId")
    quantity: int = 1
    created_at: datetime = Field(default_factory=datetime.now, alias="createdAt")

    @property
    def id(self):
        return self.cart_id

    def to_dict(self):
        return {
            "_id": str(self.cart_id) if self.cart_id else None,
            "userId": str(self.user_id),
            "foodId": str(self.food_id),
            "quantity": int(self.quantity),
            "createdAt": self.created_at.isoformat(),
        }

    def to_mongo(self):
        doc = {
            "userId": self.user_id,
            "foodId": self.food_id,
            "quantity": int(self.quantity),
            "createdAt": self.created_at,
        }
        if self.cart_id:
            doc["_id"] = self.cart_id
        return doc


