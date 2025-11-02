from datetime import datetime
from enum import Enum
from typing import Optional

from pydantic import BaseModel, Field

from .common import PyObjectId


class PaymentStatus(str, Enum):
    PENDING = "Pend"
    PAID = "Paid"
    FAIL = "Fail"


class PaymentMethod(str, Enum):
    BANK = "Bank"
    CARD = "Card"
    COD = "COD"


class Payment(BaseModel):
    payment_id: Optional[PyObjectId] = Field(default=None, alias="_id")
    order_id: PyObjectId = Field(alias="orderId")
    amount: float
    payment_time: datetime = Field(default_factory=datetime.now, alias="paymentTime")
    method: PaymentMethod = PaymentMethod.COD
    status: PaymentStatus = PaymentStatus.PENDING

    @property
    def id(self):
        return self.payment_id

    def to_dict(self):
        return {
            "_id": str(self.payment_id) if self.payment_id else None,
            "orderId": str(self.order_id),
            "amount": float(self.amount),
            "paymentTime": self.payment_time.isoformat(),
            "method": self.method.value,
            "status": self.status.value,
        }

    def to_mongo(self):
        doc = {
            "orderId": self.order_id,
            "amount": float(self.amount),
            "paymentTime": self.payment_time,
            "method": self.method.value,
            "status": self.status.value,
        }
        if self.payment_id:
            doc["_id"] = self.payment_id
        return doc


