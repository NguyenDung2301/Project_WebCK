import jwt
from datetime import datetime, timedelta
from flask import request, jsonify
from functools import wraps

SECRET_KEY = "nguyenkien0912"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60


def create_access_token(data: dict, expires_delta: int = ACCESS_TOKEN_EXPIRE_MINUTES):
    """Tạo JWT access token"""
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=expires_delta)
    to_encode.update({"exp": expire})
    token = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    # PyJWT 2.x trả về string, không cần decode thêm
    return token


def login_required(f):
    """Decorator kiểm tra token và gắn current_user"""
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            return jsonify({"message": "Missing or invalid token"}), 401
        token = auth_header.split(" ")[1]
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        except jwt.ExpiredSignatureError:
            return jsonify({"message": "Token expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"message": "Invalid token"}), 401

        kwargs["current_user"] = payload
        return f(*args, **kwargs)

    return decorated


def admin_required(f):
    """Decorator kiểm tra role Admin"""
    @wraps(f)
    def decorated(*args, **kwargs):
        user = kwargs.get("current_user")
        if not user or user.get("role") != "Admin":
            return jsonify({"message": "Admin access required"}), 403
        return f(*args, **kwargs)

    return decorated