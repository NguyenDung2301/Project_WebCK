from flask import Blueprint, request, jsonify
from app.services.user_service import UserService
from app.schemas.user_schema import UserRegisterSchema, UserLoginSchema

auth_router = Blueprint("auth_router", __name__)

@auth_router.route("/register", methods=["POST"])
def register():
    try:
        schema = UserRegisterSchema(**request.json)
        user_data = UserService.register_user(schema)
        return jsonify({"message": "Đăng ký thành công", "user": user_data}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@auth_router.route("/login", methods=["POST"])
def login():
    try:
        schema = UserLoginSchema(**request.json)
        token_data = UserService.login_user(schema)
        return jsonify({"message": "Đăng nhập thành công", **token_data}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400