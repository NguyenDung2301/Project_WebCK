from flask import Blueprint, request, jsonify
from app.services.user_service import UserService
from app.core.security import login_required, admin_required

user_router = Blueprint("user_router", __name__)

@user_router.route("/me", methods=["GET"])
@login_required
def get_my_profile(current_user):
    user = UserService.get_user_by_id(current_user["user_id"])
    return jsonify(user)

@user_router.route("/me", methods=["PUT"])
@login_required
def update_my_profile(current_user):
    data = request.json
    updated_user = UserService.update_user(current_user["user_id"], data)
    return jsonify(updated_user)

@user_router.route("/", methods=["GET"])
@login_required
@admin_required
def list_users(current_user):
    users = UserService.get_all_users()
    return jsonify(users)

@user_router.route("/<user_id>", methods=["DELETE"])
@login_required
@admin_required
def delete_user(user_id, current_user):
    UserService.delete_user(user_id)
    return jsonify({"message": "User deleted successfully"})