from enum import Enum

class Role(str, Enum):
    ADMIN = "admin"
    SUPERADMIN = "superadmin"
    USER = "user"
    SHIPPER = "shipper"
    CHEF = 'chef'
    
class LimitedRole(str, Enum): 
    USER = "user" 
    SHIPPER = "shipper"
    CHEF = 'chef'  
    ADMIN = "admin"