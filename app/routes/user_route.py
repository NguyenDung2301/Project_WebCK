from flask import Blueprint
from middlewares.auth_middleware import admin_required, user_required
from controllers.user_controller import user_controller

user_router = Blueprint("user_router", __name__)

@user_router.route("/profile_me", methods=["GET"])
def get_profile():
    """GET /api/users/profile - Lấy profile của user hiện tại (public)"""
    return user_controller.get_profile()

@user_router.route('/update_profile', methods=['PUT'])
def update_profile():
    """PUT /api/users/profile - Cập nhật profile (public)"""
    return user_controller.update_user()

@user_router.route('/profile_<user_id>', methods=['GET'])
@admin_required
def get_user(user_id):
    """GET /api/users/:id - Lấy thông tin user theo ID"""
    return user_controller.get_user_by_id(user_id)

@user_router.route('/<user_id>', methods=['DELETE'])
@admin_required
def delete_user(user_id):
    """DELETE /api/users/:id - Xóa user"""
    return user_controller.delete_user(user_id)


@user_router.route('/by_email', methods=['GET'])
@admin_required
def get_user_by_email():
    """GET /api/users/by_email?email=... - Lấy thông tin user theo email (chỉ admin)"""
    return user_controller.get_user_by_email()


@user_router.route('/role/<user_id>', methods=['PUT'])
@admin_required
def update_user_role(user_id):
    """PUT /api/users/role/<user_id> - Cập nhật vai trò user (chỉ admin)"""
    return user_controller.update_user_role(user_id)

@user_router.route('/all', methods=['GET'])
@admin_required
def get_all_users():
    """GET /api/users/all - Lấy danh sách tất cả users (chỉ admin)"""
    return user_controller.get_all_users()

@user_router.route('/balance/topup', methods=['POST'])
@user_required
def top_up_balance():
    """POST /api/users/balance/topup - Nạp tiền cho tài khoản hiện tại"""
    return user_controller.top_up()