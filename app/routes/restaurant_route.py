from flask import Blueprint
from controllers.restaurant_controller import restaurant_controller
from middlewares.auth_middleware import auth_required, admin_required

restaurant_router = Blueprint("restaurant_router", __name__)

# ==================== PUBLIC ROUTES ====================
# Danh sách tất cả nhà hàng (rút gọn) - Không cần auth
@restaurant_router.route('/all', methods=['GET'])
def list_all():
    return restaurant_controller.list_all()

# Lấy chi tiết nhà hàng theo ID (đầy đủ menu) - Không cần auth
@restaurant_router.route('/<restaurant_id>', methods=['GET'])
def get_by_id(restaurant_id: str):
    return restaurant_controller.get_by_id(restaurant_id)

# ==================== USER ROUTES ====================
# Search cho user: chỉ tìm food và category
@restaurant_router.route('/search', methods=['GET'])
@auth_required
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
