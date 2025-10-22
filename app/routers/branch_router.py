from flask import Blueprint, request, jsonify
from app.services.branch_service import BranchService
from bson import ObjectId

branch_router = Blueprint("branch_router", __name__)

@branch_router.route("/branches", methods=["GET"])
def get_branches():
    try:
        branches = BranchService.get_all_branches()
        return jsonify({"success": True, "data": branches})
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

@branch_router.route("/branches/<branch_id>", methods=["GET"])
def get_branch(branch_id):
    try:
        # Validate ObjectId format
        if not ObjectId.is_valid(branch_id):
            return jsonify({"success": False, "message": "Invalid branch ID format"}), 400
            
        branch = BranchService.get_branch_by_id(branch_id)
        if branch:
            return jsonify({"success": True, "data": branch})
        return jsonify({"success": False, "message": "Branch not found"}), 404
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

@branch_router.route("/branches", methods=["POST"])
def create_branch():
    try:
        if not request.json:
            return jsonify({"success": False, "message": "Request body must be JSON"}), 400
            
        data = request.json
        branch = BranchService.create_branch(data)
        return jsonify({"success": True, "data": branch}), 201
    except ValueError as e:
        return jsonify({"success": False, "message": str(e)}), 400
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500