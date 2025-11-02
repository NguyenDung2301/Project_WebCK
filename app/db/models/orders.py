from datetime import datetime
from enum import Enum
from typing import Optional

from pydantic import BaseModel, Field

from .common import PyObjectId


class PaymentMethodEnum(str, Enum):
    BANK = "bank"
    CARD = "card"
    COD = "cod"


class Order(BaseModel):
    order_id: Optional[PyObjectId] = Field(default=None, alias="_id")
    user_id: PyObjectId = Field(alias="userId")
    promo_id: Optional[PyObjectId] = Field(default=None, alias="promoId")
    branch_id: Optional[PyObjectId] = Field(default=None, alias="branchId")
    total_amount: float
    shipping_fee: float = 0
    payment_method: PaymentMethodEnum
    address: Optional[str] = None
    order_date: datetime = Field(default_factory=datetime.now, alias="orderDate")

    @property
    def id(self):
        return self.order_id

    def to_dict(self):
        return {
            "_id": str(self.order_id) if self.order_id else None,
            "userId": str(self.user_id),
            "promoId": str(self.promo_id) if self.promo_id else None,
            "branchId": str(self.branch_id) if self.branch_id else None,
            "total_amount": float(self.total_amount),
            "shipping_fee": float(self.shipping_fee),
            "payment_method": self.payment_method.value,
            "address": self.address,
            "orderDate": self.order_date.isoformat(),
        }

    def to_mongo(self):
        doc = {
            "userId": self.user_id,
            "promoId": self.promo_id,
            "branchId": self.branch_id,
            "total_amount": float(self.total_amount),
            "shipping_fee": float(self.shipping_fee),
            "payment_method": self.payment_method.value,
            "address": self.address,
            "orderDate": self.order_date,
        }
        if self.order_id:
            doc["_id"] = self.order_id
        return doc


