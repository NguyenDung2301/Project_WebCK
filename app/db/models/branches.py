from typing import Optional

from pydantic import BaseModel, Field

from .common import PyObjectId


class Branch(BaseModel):
    branch_id: Optional[PyObjectId] = Field(default=None, alias="_id")
    branch_name: str
    address: Optional[str] = None
    hotline: Optional[str] = None
    open_time: Optional[str] = Field(default=None, alias="openTime")  # Định dạng HH:MM
    close_time: Optional[str] = Field(default=None, alias="closeTime")  # Định dạng HH:MM
    map_link: Optional[str] = Field(default=None, alias="mapLink")

    @property
    def id(self):
        return self.branch_id

    def to_dict(self):
        return {
            "_id": str(self.branch_id) if self.branch_id else None,
            "branch_name": self.branch_name,
            "address": self.address,
            "hotline": self.hotline,
            "openTime": self.open_time,
            "closeTime": self.close_time,
            "mapLink": self.map_link,
        }

    def to_mongo(self):
        doc = {
            "branch_name": self.branch_name,
            "address": self.address,
            "hotline": self.hotline,
            "openTime": self.open_time,
            "closeTime": self.close_time,
            "mapLink": self.map_link,
        }
        if self.branch_id:
            doc["_id"] = self.branch_id
        return doc


