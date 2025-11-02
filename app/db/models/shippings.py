from datetime import datetime
from enum import Enum
from typing import Optional

from pydantic import BaseModel, Field

from .common import PyObjectId


class ShippingStatus(str, Enum):
    PENDING = "Pend"
    COMPLETE = "Complete"
    CANCEL = "Cancel"


class Shipping(BaseModel):
    shipping_id: Optional[PyObjectId] = Field(default=None, alias="_id")
    shipper_id: Optional[PyObjectId] = Field(default=None, alias="shipperId")
    order_id: PyObjectId = Field(alias="orderId")
    delivery_address: Optional[str] = Field(default=None, alias="deliveryAddress")
    distance: Optional[float] = None
    status: ShippingStatus = ShippingStatus.PENDING
    updated_at: datetime = Field(default_factory=datetime.now, alias="updatedAt")

    @property
    def id(self):
        return self.shipping_id

    def to_dict(self):
        return {
            "_id": str(self.shipping_id) if self.shipping_id else None,
            "shipperId": str(self.shipper_id) if self.shipper_id else None,
            "orderId": str(self.order_id),
            "deliveryAddress": self.delivery_address,
            "distance": self.distance,
            "status": self.status.value,
            "updatedAt": self.updated_at.isoformat(),
        }

    def to_mongo(self):
        doc = {
            "shipperId": self.shipper_id,
            "orderId": self.order_id,
            "deliveryAddress": self.delivery_address,
            "distance": self.distance,
            "status": self.status.value,
            "updatedAt": self.updated_at,
        }
        if self.shipping_id:
            doc["_id"] = self.shipping_id
        return doc


