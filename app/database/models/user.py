from datetime import datetime
from bson import ObjectId
from app.database.connection import mongo
from werkzeug.security import generate_password_hash, check_password_hash

class UserModel:
    @staticmethod
    def get_collection():
        return mongo.db.users

    @staticmethod
    def create(user_data: dict):
        user_data["password"] = generate_password_hash(user_data["password"])
        user_data["created_at"] = datetime.utcnow()
        result = UserModel.get_collection().insert_one(user_data)
        return str(result.inserted_id)

    @staticmethod
    def find_by_id(user_id: str):
        try:
            oid = ObjectId(user_id)
        except:
            return None
        return UserModel.get_collection().find_one({"_id": oid})

    @staticmethod
    def find_by_username(username: str):
        return UserModel.get_collection().find_one({"username": username})

    @staticmethod
    def list_all(limit: int = 100):
        return list(UserModel.get_collection().find().limit(limit))

    @staticmethod
    def update(user_id: str, data: dict):
        try:
            oid = ObjectId(user_id)
        except:
            return False
        if "password" in data:
            data["password"] = generate_password_hash(data["password"])
        data["updated_at"] = datetime.utcnow()
        result = UserModel.get_collection().update_one({"_id": oid}, {"$set": data})
        return result.modified_count == 1

    @staticmethod
    def delete(user_id: str):
        try:
            oid = ObjectId(user_id)
        except:
            return False
        result = UserModel.get_collection().delete_one({"_id": oid})
        return result.deleted_count == 1