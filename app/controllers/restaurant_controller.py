from flask import request, jsonify
from pydantic import ValidationError
from services.restaurant_service import restaurant_service
from schemas.restaurant_schema import (
    CreateRestaurantRequest,
    UpdateRestaurantRequest,
)

class RestaurantController:
    """Restaurant Controller - Xử lý HTTP requests cho nhà hàng"""

    def list_all(self):
        try:
            data = restaurant_service.get_all_restaurants()
            return jsonify({'success': True, 'data': data}), 200
        except Exception as e:
            return jsonify({'success': False, 'message': f'Lỗi server: {str(e)}'}), 500

    def get_by_id(self, restaurant_id: str):
        try:
            data = restaurant_service.get_restaurant_by_id(restaurant_id)
            return jsonify({'success': True, 'data': data}), 200
        except ValueError as e:
            return jsonify({'success': False, 'message': str(e)}), 404
        except Exception as e:
            return jsonify({'success': False, 'message': f'Lỗi server: {str(e)}'}), 500

    def create(self):
        try:
            if not request.json:
                return jsonify({'success': False, 'message': 'Request body không được để trống'}), 400
            req = CreateRestaurantRequest(**request.json)
            result = restaurant_service.create_restaurant(req)
            return jsonify({'success': True, 'message': 'Tạo nhà hàng thành công', 'data': result}), 201
        except ValidationError as e:
            return jsonify({'success': False, 'message': 'Dữ liệu không hợp lệ', 'errors': e.errors()}), 400
        except ValueError as e:
            return jsonify({'success': False, 'message': str(e)}), 400
        except Exception as e:
            return jsonify({'success': False, 'message': f'Lỗi server: {str(e)}'}), 500

    def update(self, restaurant_id: str):
        try:
            if not request.json:
                return jsonify({'success': False, 'message': 'Request body không được để trống'}), 400
            req = UpdateRestaurantRequest(**request.json)
            result = restaurant_service.update_restaurant(restaurant_id, req)
            return jsonify({'success': True, 'message': 'Cập nhật nhà hàng thành công', 'data': result}), 200
        except ValidationError as e:
            return jsonify({'success': False, 'message': 'Dữ liệu không hợp lệ', 'errors': e.errors()}), 400
        except ValueError as e:
            return jsonify({'success': False, 'message': str(e)}), 400
        except Exception as e:
            return jsonify({'success': False, 'message': f'Lỗi server: {str(e)}'}), 500

    def delete(self, restaurant_id: str):
        try:
            result = restaurant_service.delete_restaurant(restaurant_id)
            return jsonify({'success': True, 'message': result['message']}), 200
        except ValueError as e:
            return jsonify({'success': False, 'message': str(e)}), 400
        except Exception as e:
            return jsonify({'success': False, 'message': f'Lỗi server: {str(e)}'}), 500

    def search_for_users(self):
        """Search cho user: chỉ tìm food và category"""
        try:
            q = request.args.get('q')
            if not q:
                return jsonify({'success': False, 'message': 'Thiếu tham số q'}), 400
            data = restaurant_service.search_for_users(q)
            return jsonify({'success': True, 'data': data}), 200
        except Exception as e:
            return jsonify({'success': False, 'message': f'Lỗi server: {str(e)}'}), 500

    def search_for_admin(self):
        """Search cho admin: tìm restaurant, food và category"""
        try:
            q = request.args.get('q')
            if not q:
                return jsonify({'success': False, 'message': 'Thiếu tham số q'}), 400
            data = restaurant_service.search_for_admin(q)
            return jsonify({'success': True, 'data': data}), 200
        except Exception as e:
            return jsonify({'success': False, 'message': f'Lỗi server: {str(e)}'}), 500

restaurant_controller = RestaurantController()
