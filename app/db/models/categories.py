from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field

from .common import PyObjectId


class Category(BaseModel):
    category_id: Optional[PyObjectId] = Field(default=None, alias="_id")
    category_name: str
    description: Optional[str] = None

    @property
    def id(self):
        return self.category_id

    def to_dict(self):
        return {
            "_id": str(self.category_id) if self.category_id else None,
            "category_name": self.category_name,
            "description": self.description,
        }

    def to_mongo(self):
        doc = {
            "category_name": self.category_name,
            "description": self.description,
        }
        if self.category_id:
            doc["_id"] = self.category_id
        return doc


