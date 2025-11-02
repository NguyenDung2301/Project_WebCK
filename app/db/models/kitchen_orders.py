from datetime import datetime
from enum import Enum
from typing import Optional

from pydantic import BaseModel, Field

from .common import PyObjectId


class KitchenStatus(str, Enum):
    PREPARE = "Prepare"
    READY = "Ready"
    DELIVERY = "Delivery"


class KitchenOrder(BaseModel):
    kitchen_order_id: Optional[PyObjectId] = Field(default=None, alias="_id")
    kitchen_id: PyObjectId = Field(alias="kitchenId")
    order_id: PyObjectId = Field(alias="orderId")
    status: KitchenStatus = KitchenStatus.PREPARE
    start_time: Optional[datetime] = Field(default=None, alias="startTime")
    end_time: Optional[datetime] = Field(default=None, alias="endTime")

    @property
    def id(self):
        return self.kitchen_order_id

    def to_dict(self):
        return {
            "_id": str(self.kitchen_order_id) if self.kitchen_order_id else None,
            "kitchenId": str(self.kitchen_id),
            "orderId": str(self.order_id),
            "status": self.status.value,
            "startTime": self.start_time.isoformat() if self.start_time else None,
            "endTime": self.end_time.isoformat() if self.end_time else None,
        }

    def to_mongo(self):
        doc = {
            "kitchenId": self.kitchen_id,
            "orderId": self.order_id,
            "status": self.status.value,
            "startTime": self.start_time,
            "endTime": self.end_time,
        }
        if self.kitchen_order_id:
            doc["_id"] = self.kitchen_order_id
        return doc


