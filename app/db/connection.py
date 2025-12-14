from pymongo import MongoClient
from core.config import config

# Khởi tạo MongoDB client
client = MongoClient(config.MONGO_URI)

# Chọn database
db = client[config.MONGO_DB_NAME]

# Thêm các collections vào đây
users_collection = db['users']
branches_collection = db['branches']
restaurants_collection = db['restaurants']

def get_db():
    """Trả về database instance"""
    return db


def get_collection(collection_name: str):
    """Lấy collection theo tên"""
    return db[collection_name]


def close_connection():
    """Đóng kết nối MongoDB"""
    client.close()


def ping_db():
    """Kiểm tra kết nối MongoDB"""
    try:
        client.admin.command('ping')
        return True
    except Exception as e:
        print(f"MongoDB connection failed: {e}")
        return False


# Tạo indexes (chạy 1 lần khi khởi động app)
def init_indexes():
    """Tạo indexes cho collections"""
    try:
        # Index cho users collection
        users_collection.create_index('email', unique=True)
        # Index cho restaurants collection
        # Text index trên tên nhà hàng để hỗ trợ search theo tên
        restaurants_collection.create_index([('name', 'text')])
        # Index trên trường lồng nhau menu.items.name để hỗ trợ tìm món theo tên
        restaurants_collection.create_index('menu.items.name')
        print("MongoDB indexes created successfully")
    except Exception as e:
        print(f"Error creating indexes: {e}")