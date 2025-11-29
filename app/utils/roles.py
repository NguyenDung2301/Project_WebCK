from enum import Enum

class Role(str, Enum):
    ADMIN = "admin"
    SUPERADMIN = "superadmin"
    USER = "user"
    SHIPPER = "shipper"
    
class LimitedRole(str, Enum): 
    USER = "user" 
    SHIPPER = "shipper"
    ADMIN = "admin"