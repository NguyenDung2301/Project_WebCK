from typing import Optional, List, Dict
from datetime import datetime, date
from bson import ObjectId

from db.connection import vouchers_collection, orders_collection
from db.models.vouchers import Promotion, PromotionType
from db.models.order import OrderStatus


class VoucherService:
    """
    Voucher Service - Xử lý nghiệp vụ voucher/promotion
    
    Chức năng chính:
    - CRUD voucher (tạo, đọc, cập nhật, xóa)
    - Kiểm tra tính hợp lệ của voucher (eligibility)
    - Tính toán giảm giá (discount calculation)
    - Lấy danh sách voucher khả dụng cho user
    - Preview discount trước khi áp dụng
    """
    def __init__(self):
        self.collection = vouchers_collection

    # ============== Helpers ==============
    def _to_model(self, doc: dict) -> Promotion:
        """Chuyển MongoDB document thành Promotion model"""
        return Promotion(**doc)

    def _to_dict(self, promotion: Promotion) -> Dict:
        """Chuyển Promotion model thành dict để trả về API"""
        return promotion.to_dict()

    # ==================== MongoDB CRUD Operations ====================
    def create(self, data: Dict) -> Dict:
        """Tạo voucher mới - Input là dict từ schema, output là dict response"""
        promo = Promotion(
            code=data['code'],
            promo_name=data['promo_name'],
            type=data.get('type', PromotionType.PERCENT),
            value=float(data['value']),
            max_discount=float(data['max_discount']) if data.get('max_discount') is not None else None,
            min_order_amount=float(data['min_order_amount']) if data.get('min_order_amount') is not None else None,
            # Ưu tiên khóa 'restaurantId' (camelCase) từ controller; fallback 'restaurant_id' nếu có
            restaurant_id=(
                ObjectId(rid) if (rid := (data.get('restaurantId') or data.get('restaurant_id'))) else None
            ),
            first_order_only=bool(data.get('first_order_only', False)),
            active=bool(data.get('active', True)),
            start_date=data['start_date'],
            end_date=data['end_date'],
            description=data.get('description'),
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        result = self.collection.insert_one(promo.to_mongo())
        created = self.find_by_id(str(result.inserted_id))
        return self._to_dict(created)

    def update(self, promo_id: str, data: Dict) -> Dict:
        """Cập nhật voucher - Chỉ update các field được truyền lên"""
        updates: Dict = { 'updatedAt': datetime.now() }
        if 'promo_name' in data and data['promo_name'] is not None:
            updates['promo_name'] = data['promo_name']
        if 'type' in data and data['type'] is not None:
            updates['type'] = data['type'].value if isinstance(data['type'], PromotionType) else data['type']
        if 'value' in data and data['value'] is not None:
            updates['value'] = float(data['value'])
        if 'max_discount' in data:
            updates['max_discount'] = float(data['max_discount']) if data['max_discount'] is not None else None
        if 'min_order_amount' in data:
            updates['min_order_amount'] = float(data['min_order_amount']) if data['min_order_amount'] is not None else None
        # Hỗ trợ cả 'restaurantId' và 'restaurant_id' khi cập nhật
        if 'restaurantId' in data or 'restaurant_id' in data:
            rid = data.get('restaurantId') if 'restaurantId' in data else data.get('restaurant_id')
            updates['restaurantId'] = ObjectId(rid) if rid else None
        if 'first_order_only' in data and data['first_order_only'] is not None:
            updates['first_order_only'] = bool(data['first_order_only'])
        if 'active' in data and data['active'] is not None:
            updates['active'] = bool(data['active'])
        if 'start_date' in data and data['start_date'] is not None:
            updates['start_date'] = data['start_date']
        if 'end_date' in data and data['end_date'] is not None:
            updates['end_date'] = data['end_date']
        if 'description' in data:
            updates['description'] = data['description']

        self.collection.update_one({'_id': ObjectId(promo_id)}, {'$set': updates})
        updated = self.find_by_id(promo_id)
        if not updated:
            raise ValueError('Không tìm thấy voucher')
        return self._to_dict(updated)

    def delete(self, promo_id: str) -> None:
        """Xóa voucher khỏi database"""
        self.collection.delete_one({'_id': ObjectId(promo_id)})

    def find_by_id(self, promo_id: str) -> Optional[Promotion]:
        """Tìm voucher theo ID - Trả về Model"""
        doc = self.collection.find_one({'_id': ObjectId(promo_id)})
        return self._to_model(doc) if doc else None

    def find_by_code(self, code: str) -> Optional[Promotion]:
        """Tìm voucher theo mã code - Trả về Model"""
        doc = self.collection.find_one({'code': code})
        return self._to_model(doc) if doc else None

    def list_all(self) -> List[Dict]:
        """Lấy tất cả voucher (Admin) - Trả về list dict"""
        cursor = self.collection.find().sort('createdAt', -1)
        return [self._to_dict(self._to_model(doc)) for doc in cursor]

    # ==================== Business Logic ====================
    def _is_date_active(self, promo: Promotion, now: Optional[datetime] = None) -> bool:
        """Kiểm tra voucher có đang trong thời gian hiệu lực không"""
        now = now or datetime.now()
        return (promo.start_date <= now) and (now <= promo.end_date)

    def _is_first_order_eligible(self, user_id: str) -> bool:
        """
        Kiểm tra user có đơn hàng nào chưa (cho voucher first order only).
        Đếm TẤT CẢ đơn hàng (trừ Cancelled) để chặn lỗ hổng:
        - User không thể dùng nhiều voucher first_order_only cho nhiều đơn đồng thời
        - Chỉ loại trừ đơn Cancelled vì đã bị hủy bỏ
        """
        count = orders_collection.count_documents({
            'userId': ObjectId(user_id),
            'status': {'$ne': 'Cancelled'}  # Đếm tất cả trừ Cancelled
        })
        return count == 0

    def _restaurant_scope_ok(self, promo: Promotion, restaurant_id: str) -> bool:
        """Kiểm tra voucher có áp dụng cho nhà hàng này không"""
        if promo.restaurant_id is None:
            return True
        return str(promo.restaurant_id) == restaurant_id

    def calculate_discount(self, promo: Promotion, subtotal: float, shipping_fee: float) -> float:
        """
        Tính số tiền giảm dựa trên loại voucher:
        - PERCENT: Giảm % trên subtotal, giới hạn bởi max_discount
        - FIXED: Giảm số tiền cố định (không vượt quá subtotal)
        - FREESHIP: Giảm phí ship, giới hạn bởi max_discount hoặc shipping_fee
        """
        discount = 0.0
        if promo.type == PromotionType.PERCENT:
            discount = subtotal * (float(promo.value) / 100.0)
            if promo.max_discount is not None:
                discount = min(discount, float(promo.max_discount))
        elif promo.type == PromotionType.FIXED:
            discount = min(float(promo.value), subtotal)
        elif promo.type == PromotionType.FREESHIP:
            cap = float(promo.max_discount) if promo.max_discount is not None else shipping_fee
            discount = min(shipping_fee, cap)
        return float(max(discount, 0.0))

    def validate_and_calculate(self, user_id: str, restaurant_id: str, subtotal: float, shipping_fee: float, promo: Promotion) -> float:
        """
        Validate voucher và tính discount
        - Kiểm tra voucher active
        - Kiểm tra thời gian hiệu lực
        - Kiểm tra phạm vi nhà hàng
        - Kiểm tra giá trị đơn tối thiểu
        - Kiểm tra điều kiện đơn đầu tiên
        - Kiểm tra user đã dùng voucher này chưa
        Raise ValueError nếu không hợp lệ, return discount nếu OK
        """
        if not promo.active:
            raise ValueError('Voucher không hoạt động')
        if not self._is_date_active(promo):
            raise ValueError('Voucher không nằm trong thời gian hiệu lực')
        if not self._restaurant_scope_ok(promo, restaurant_id):
            raise ValueError('Voucher không áp dụng cho nhà hàng này')
        if promo.min_order_amount is not None and subtotal < float(promo.min_order_amount):
            raise ValueError('Chưa đạt giá trị tối thiểu để áp dụng voucher')
        if promo.first_order_only and not self._is_first_order_eligible(user_id):
            raise ValueError('Voucher chỉ áp dụng cho đơn đầu tiên')
        # Kiểm tra user đã dùng voucher này chưa
        user_oid = ObjectId(user_id)
        for usage in promo.user_usage_history:
            if usage.get('user_id') == user_oid:
                raise ValueError('Bạn đã sử dụng voucher này rồi')
        return self.calculate_discount(promo, subtotal, shipping_fee)

    def get_available_for_user(self, user_id: str, restaurant_id: Optional[str] = None) -> List[Dict]:
        """
        Lấy danh sách voucher khả dụng cho user
        - Chỉ lấy voucher đang active
        - Trong thời gian hiệu lực
        - Áp dụng cho nhà hàng (nếu filter theo restaurantId) hoặc toàn hệ thống
        - Loại bỏ voucher user đã sử dụng rồi
        - Trả về thêm flag eligible_first_order để client biết voucher first order
        """
        now = datetime.now()
        user_oid = ObjectId(user_id)
        query: Dict = {
            'active': True,
            'start_date': { '$lte': now },
            'end_date': { '$gte': now },
            # Chỉ lấy voucher mà user CHƯA sử dụng
            'user_usage_history.user_id': {'$ne': user_oid}
        }
        if restaurant_id:
            query['$or'] = [
                { 'restaurantId': None },
                { 'restaurantId': ObjectId(restaurant_id) }
            ]
        cursor = self.collection.find(query).sort('createdAt', -1)
        result: List[Dict] = []
        for doc in cursor:
            promo = self._to_model(doc)
            item = promo.to_dict()
            item['eligible_first_order'] = promo.first_order_only and self._is_first_order_eligible(user_id)
            result.append(item)
        return result

    def get_expired_for_user(self, user_id: Optional[str], restaurant_id: Optional[str] = None) -> List[Dict]:
        """
        Lấy danh sách voucher đã hết hạn cho user
        - Voucher không active hoặc end_date < now
        - Hoặc voucher user đã sử dụng rồi (nếu có user_id)
        - Áp dụng cho nhà hàng (nếu filter) hoặc toàn hệ thống
        """
        now = datetime.now()
        
        # Build restaurant filter
        restaurant_filter = []
        if restaurant_id:
            restaurant_filter = [
                {'restaurantId': None},
                {'restaurantId': ObjectId(restaurant_id)}
            ]
        
        # Query 1: Voucher hết hạn hoặc inactive
        expired_conditions = [
            {'active': False},
            {'end_date': {'$lt': now}}
        ]
        
        # Combine với restaurant filter nếu có
        if restaurant_filter:
            expired_query = {
                '$and': [
                    {'$or': restaurant_filter},
                    {'$or': expired_conditions}
                ]
            }
        else:
            expired_query = {'$or': expired_conditions}
        
        result: List[Dict] = []
        seen_ids = set()
        
        # Lấy voucher hết hạn
        for doc in self.collection.find(expired_query).sort('createdAt', -1):
            promo = self._to_model(doc)
            if promo.promo_id not in seen_ids:
                result.append(promo.to_dict())
                seen_ids.add(promo.promo_id)
        
        # Query 2: Voucher user đã dùng (chỉ khi có user_id)
        if user_id:
            used_query = {'user_usage_history.user_id': ObjectId(user_id)}
            if restaurant_filter:
                used_query['$or'] = restaurant_filter
            
            for doc in self.collection.find(used_query).sort('createdAt', -1):
                promo = self._to_model(doc)
                if promo.promo_id not in seen_ids:
                    result.append(promo.to_dict())
                    seen_ids.add(promo.promo_id)
        
        return result

    def get_all_available(self, restaurant_id: Optional[str] = None) -> List[Dict]:
        """
        Admin lấy danh sách tất cả voucher khả dụng (không filter user)
        - Voucher active
        - Trong thời gian hiệu lực
        - Áp dụng cho nhà hàng (nếu filter) hoặc toàn hệ thống
        """
        now = datetime.now()
        query: Dict = {
            'active': True,
            'start_date': { '$lte': now },
            'end_date': { '$gte': now }
        }
        if restaurant_id:
            query['$or'] = [
                { 'restaurantId': None },
                { 'restaurantId': ObjectId(restaurant_id) }
            ]
        cursor = self.collection.find(query).sort('createdAt', -1)
        result: List[Dict] = []
        for doc in cursor:
            promo = self._to_model(doc)
            result.append(promo.to_dict())
        return result

    def preview_discount(self, user_id: str, restaurant_id: str, subtotal: float, shipping_fee: float, promo_id: Optional[str] = None, code: Optional[str] = None) -> Dict:
        """
        Preview discount trước khi apply voucher vào order
        - Tìm voucher theo promo_id hoặc code
        - Validate và tính discount
        - Trả về thông tin voucher + discount + total sau khi áp dụng
        """
        promo: Optional[Promotion] = None
        if promo_id:
            promo = self.find_by_id(promo_id)
        elif code:
            promo = self.find_by_code(code)
        if not promo:
            raise ValueError('Không tìm thấy voucher')
        discount = self.validate_and_calculate(user_id, restaurant_id, subtotal, shipping_fee, promo)
        return {
            'promotion': promo.to_dict(),
            'discount': float(discount),
            'subtotal': float(subtotal),
            'shipping_fee': float(shipping_fee),
            'total_after_discount': float(max(subtotal + shipping_fee - discount, 0.0))
        }

    def mark_voucher_used(self, promo_id: str, user_id: str) -> None:
        """
        Ghi nhận voucher đã được sử dụng bởi user cụ thể
        - Increment usage_count
        - Thêm user vào user_usage_history
        """
        try:
            self.collection.update_one(
                {'_id': ObjectId(promo_id)},
                {
                    '$inc': {'usage_count': 1},
                    '$push': {
                        'user_usage_history': {
                            'user_id': ObjectId(user_id),
                            'used_at': datetime.now()
                        }
                    },
                    '$set': {'updatedAt': datetime.now()}
                }
            )
        except Exception as e:
            print(f"Error marking voucher as used: {e}")

    def refund_voucher_used(self, promo_id: str, user_id: str) -> None:
        """
        Hoàn lại voucher đã đánh dấu sử dụng khi đơn hàng bị hủy.
        - Xóa user khỏi user_usage_history (nếu có)
        - Giảm usage_count xuống 1 (chỉ khi thực sự có bản ghi bị xóa)
        """
        try:
            # Xóa bản ghi usage của user
            pull_result = self.collection.update_one(
                {'_id': ObjectId(promo_id)},
                {
                    '$pull': {
                        'user_usage_history': {
                            'user_id': ObjectId(user_id)
                        }
                    },
                    '$set': {'updatedAt': datetime.now()}
                }
            )

            # Nếu có thay đổi (tức là đã xóa usage), thì giảm usage_count
            if pull_result.modified_count > 0:
                self.collection.update_one(
                    {'_id': ObjectId(promo_id)},
                    {
                        '$inc': {'usage_count': -1},
                        '$set': {'updatedAt': datetime.now()}
                    }
                )
        except Exception as e:
            print(f"Error refunding voucher usage: {e}")



voucher_service = VoucherService()
