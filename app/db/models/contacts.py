from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, Field

from .common import PyObjectId


class Contact(BaseModel):
    contact_id: Optional[PyObjectId] = Field(default=None, alias="_id")
    user_id: Optional[PyObjectId] = Field(default=None, alias="userId")
    name: str
    email: Optional[EmailStr] = None
    message: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.now, alias="createdAt")

    @property
    def id(self):
        return self.contact_id

    def to_dict(self):
        return {
            "_id": str(self.contact_id) if self.contact_id else None,
            "userId": str(self.user_id) if self.user_id else None,
            "name": self.name,
            "email": str(self.email) if self.email else None,
            "message": self.message,
            "createdAt": self.created_at.isoformat(),
        }

    def to_mongo(self):
        doc = {
            "userId": self.user_id,
            "name": self.name,
            "email": self.email,
            "message": self.message,
            "createdAt": self.created_at,
        }
        if self.contact_id:
            doc["_id"] = self.contact_id
        return doc


