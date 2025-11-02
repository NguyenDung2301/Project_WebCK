from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field

from .common import PyObjectId


class Review(BaseModel):
    review_id: Optional[PyObjectId] = Field(default=None, alias="_id")
    user_id: PyObjectId = Field(alias="userId")
    food_id: PyObjectId = Field(alias="foodId")
    rating: int
    comment: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.now, alias="createdAt")

    @property
    def id(self):
        return self.review_id

    def to_dict(self):
        return {
            "_id": str(self.review_id) if self.review_id else None,
            "userId": str(self.user_id),
            "foodId": str(self.food_id),
            "rating": int(self.rating),
            "comment": self.comment,
            "createdAt": self.created_at.isoformat(),
        }

    def to_mongo(self):
        doc = {
            "userId": self.user_id,
            "foodId": self.food_id,
            "rating": int(self.rating),
            "comment": self.comment,
            "createdAt": self.created_at,
        }
        if self.review_id:
            doc["_id"] = self.review_id
        return doc


