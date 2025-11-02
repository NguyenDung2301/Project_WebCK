from datetime import date
from typing import Optional

from pydantic import BaseModel, Field

from .common import PyObjectId


class Promotion(BaseModel):
    promo_id: Optional[PyObjectId] = Field(default=None, alias="_id")
    promo_name: str
    min_order_amount: Optional[float] = None
    discount_percent: float
    start_date: date
    end_date: date
    description: Optional[str] = None

    @property
    def id(self):
        return self.promo_id

    def to_dict(self):
        return {
            "_id": str(self.promo_id) if self.promo_id else None,
            "promo_name": self.promo_name,
            "min_order_amount": self.min_order_amount,
            "discount_percent": float(self.discount_percent),
            "start_date": self.start_date.isoformat(),
            "end_date": self.end_date.isoformat(),
            "description": self.description,
        }

    def to_mongo(self):
        doc = {
            "promo_name": self.promo_name,
            "min_order_amount": self.min_order_amount,
            "discount_percent": float(self.discount_percent),
            "start_date": self.start_date,
            "end_date": self.end_date,
            "description": self.description,
        }
        if self.promo_id:
            doc["_id"] = self.promo_id
        return doc


