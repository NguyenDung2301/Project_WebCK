from typing import Optional

from pydantic import BaseModel, Field

from .common import PyObjectId


class OrderDetail(BaseModel):
    order_detail_id: Optional[PyObjectId] = Field(default=None, alias="_id")
    order_id: PyObjectId = Field(alias="orderId")
    food_id: PyObjectId = Field(alias="foodId")
    quantity: int
    unit_price: float = Field(alias="unitPrice")

    @property
    def id(self):
        return self.order_detail_id

    def to_dict(self):
        return {
            "_id": str(self.order_detail_id) if self.order_detail_id else None,
            "orderId": str(self.order_id),
            "foodId": str(self.food_id),
            "quantity": int(self.quantity),
            "unitPrice": float(self.unit_price),
        }

    def to_mongo(self):
        doc = {
            "orderId": self.order_id,
            "foodId": self.food_id,
            "quantity": int(self.quantity),
            "unitPrice": float(self.unit_price),
        }
        if self.order_detail_id:
            doc["_id"] = self.order_detail_id
        return doc


