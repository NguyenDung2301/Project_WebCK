from pydantic import BaseModel, Field

class BranchSchema(BaseModel):
    _id: str
    BranchName: str
    Address: str
    Hotline: str
    OpenTime: str
    CloseTime: str
    MapLink: str

    class Config:
        from_attributes = True