from flask import request, jsonify
from services.user_service import user_service
from schemas.user_schema import (
    UserRegisterRequest,
    UserLoginRequest,
    UserUpdateRequest,
    UserRoleUpdateRequest,
)
from pydantic import ValidationError

class UserController:
    """User Controller - Xử lý HTTP requests"""
    
    def register(self):
        """API đăng ký user"""
        try:
            # Kiểm tra request có JSON không
            if not request.json:
                return jsonify({'success': False, 'message': 'Request body không được để trống'}), 400
            
            # Validate request body với Pydantic
            user_data = UserRegisterRequest(**request.json)
            # Gọi service
            result = user_service.register(user_data)

            return jsonify({'success': True, 'message': 'Đăng ký thành công', 'data': result}), 201
        except ValidationError as e:
            return jsonify({'success': False, 'message': 'Dữ liệu không hợp lệ', 'errors': e.errors()}), 400
        except ValueError as e:
            return jsonify({'success': False, 'message': str(e)}), 400
        except Exception as e:
            return jsonify({'success': False, 'message': f'Lỗi server: {str(e)}'}), 500
    
    def login(self):
        """API đăng nhập"""
        try:
            # Kiểm tra request có JSON không
            if not request.json:
                return jsonify({'success': False, 'message': 'Request body không được để trống'}), 400
                
            login_data = UserLoginRequest(**request.json)
            result = user_service.login(login_data)
            return jsonify({'success': True, 'message': 'Đăng nhập thành công', 'data': result}), 200
        except ValidationError as e:
            return jsonify({'success': False, 'message': 'Dữ liệu không hợp lệ', 'errors': e.errors()}), 400
        except ValueError as e:
            return jsonify({'success': False, 'message': str(e)}), 400
        except Exception as e:
            return jsonify({'success': False, 'message': f'Lỗi server: {str(e)}'}), 500
    
    def update_user(self):
        """API cập nhật thông tin user"""
        try:
            user_id = request.user_id
            user_data = UserUpdateRequest(**request.json)
            result = user_service.update_user(user_id, user_data)
            return jsonify({'success': True, 'message': 'Cập nhật thành công', 'data': result}), 200  
        except ValidationError as e:
            return jsonify({'success': False, 'message': 'Dữ liệu không hợp lệ', 'errors': e.errors()}), 400
        except ValueError as e:
            return jsonify({'success': False, 'message': str(e)}), 400
        except Exception as e:
            return jsonify({'success': False, 'message': f'Lỗi server: {str(e)}'}), 500
    
    def delete_user(self, user_id: str):
        """API xóa user"""
        try:
            result = user_service.delete_user(user_id)
            return jsonify({'success': True,'message': result['message']}), 200   
        except ValueError as e:
            return jsonify({'success': False,'message': str(e)}), 400
    
    def get_user_by_id(self, user_id: str):
        """API lấy user theo ID"""
        try:
            result = user_service.get_user_by_id(user_id)
            return jsonify({'success': True,'data': result}), 200
        except ValueError as e:
            return jsonify({'success': False,'message': str(e)}), 404
    
    def get_profile(self):
        """API lấy profile user hiện tại"""
        try:
            # Lấy user_id từ middleware (sau khi verify token)
            user_id = request.user_id           
            result = user_service.get_user_by_id(user_id)
            return jsonify({'success': True,'data': result}), 200            
        except ValueError as e:
            return jsonify({'success': False,'message': str(e)}), 404

    def get_user_by_email(self):
        """API lấy user theo email (chỉ admin)"""
        try:
            email = request.args.get('email')
            if not email:
                return jsonify({'success': False, 'message': 'Thiếu tham số email'}), 400

            result = user_service.get_user_by_email(email)
            return jsonify({'success': True, 'data': result}), 200
        except ValueError as e:
            return jsonify({'success': False, 'message': str(e)}), 404
        except Exception as e:
            return jsonify({'success': False, 'message': f'Lỗi server: {str(e)}'}), 500

    def update_user_role(self, user_id: str):
        """API cập nhật vai trò user (chỉ admin)"""
        try:
            if not request.json:
                return jsonify({'success': False, 'message': 'Request body không được để trống'}), 400

            role_data = UserRoleUpdateRequest(**request.json)
            result = user_service.update_user_role(user_id, role_data)
            return jsonify({'success': True, 'message': 'Cập nhật vai trò thành công', 'data': result}), 200
        except ValidationError as e:
            return jsonify({'success': False, 'message': 'Dữ liệu không hợp lệ', 'errors': e.errors()}), 400
        except ValueError as e:
            return jsonify({'success': False, 'message': str(e)}), 400
        except Exception as e:
            return jsonify({'success': False, 'message': f'Lỗi server: {str(e)}'}), 500

# Khởi tạo controller instance
user_controller = UserController()