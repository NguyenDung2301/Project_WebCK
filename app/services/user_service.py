from app.database.models.user import UserModel
from app.core.security import create_access_token
from werkzeug.security import check_password_hash

class UserService:
    @staticmethod
    def register_user(schema):
        if UserModel.find_by_username(schema.username):
            raise Exception("Username đã tồn tại")
        user_data = schema.dict()
        user_data["role"] = "User"
        user_id = UserModel.create(user_data)
        user_data["_id"] = user_id
        del user_data["password"]
        return user_data

    @staticmethod
    def login_user(schema):
        user = UserModel.find_by_username(schema.username)
        if not user or not check_password_hash(user["password"], schema.password):
            raise Exception("Username hoặc password không đúng")
        token_data = {
            "user_id": str(user["_id"]),
            "username": user["username"],
            "role": user["role"]
        }
        access_token = create_access_token(token_data)
        return {"access_token": access_token, "token_type": "Bearer"}

    @staticmethod
    def get_user_by_id(user_id):
        user = UserModel.find_by_id(user_id)
        if not user:
            raise Exception("User không tồn tại")
        user.pop("password", None)
        user["_id"] = str(user["_id"])
        return user

    @staticmethod
    def update_user(user_id, data):
        if UserModel.update(user_id, data):
            return UserService.get_user_by_id(user_id)
        raise Exception("Cập nhật thất bại")

    @staticmethod
    def get_all_users():
        users = UserModel.list_all()
        for u in users:
            u["_id"] = str(u["_id"])
            u.pop("password", None)
        return users

    @staticmethod
    def delete_user(user_id):
        if not UserModel.delete(user_id):
            raise Exception("Xóa thất bại")