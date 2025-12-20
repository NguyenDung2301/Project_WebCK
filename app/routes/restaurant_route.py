from flask import Blueprint
from controllers.restaurant_controller import restaurant_controller
from middlewares.auth_middleware import admin_required, user_required, auth_required, user_or_admin_required

restaurant_router = Blueprint("restaurant_router", __name__)

# ==================== PUBLIC ROUTES ====================
@restaurant_router.route('/all', methods=['GET'])
@auth_required
def list_all():
    return restaurant_controller.list_all()

# Lấy chi tiết nhà hàng theo ID (đầy đủ menu) - Chỉ user và admin
@restaurant_router.route('/<restaurant_id>', methods=['GET'])
@user_or_admin_required
def get_by_id(restaurant_id: str):
    return restaurant_controller.get_by_id(restaurant_id)

# ==================== USER ROUTES ====================
# Search cho user: chỉ tìm food và category
@restaurant_router.route('/search', methods=['GET'])
@user_required
def search_for_users():
    return restaurant_controller.search_for_users()

# ==================== ADMIN ROUTES ====================
# Search cho admin: tìm restaurant, food và category
@restaurant_router.route('/search_admin', methods=['GET'])
@admin_required
def search_for_admin():
    return restaurant_controller.search_for_admin()

# Tạo nhà hàng mới - Chỉ admin
@restaurant_router.route('', methods=['POST'])
@admin_required
def create():
    return restaurant_controller.create()

# Cập nhật nhà hàng - Chỉ admin
@restaurant_router.route('/<restaurant_id>', methods=['PUT'])
@admin_required
def update(restaurant_id: str):
    return restaurant_controller.update(restaurant_id)

# Xóa nhà hàng - Chỉ admin
@restaurant_router.route('/<restaurant_id>', methods=['DELETE'])
@admin_required
def delete(restaurant_id: str):
    return restaurant_controller.delete(restaurant_id)
