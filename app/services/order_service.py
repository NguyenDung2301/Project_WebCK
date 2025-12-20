from typing import Optional, List, Dict
from datetime import datetime
from bson import ObjectId
from pymongo.collection import Collection

from db.connection import orders_collection
from db.models.order import Order, OrderItem, OrderStatus
from db.models.payment import PaymentMethod, PaymentStatus
from services.voucher_service import voucher_service
from services.payment_service import payment_service
from schemas.order_schema import (
    CreateOrderRequest,
    UpdateOrderStatusRequest,
    CancelOrderRequest,
    AssignShipperRequest,
    OrderResponse,
    OrderSimpleResponse,
)


class OrderService:
    def __init__(self, restaurant_service=None, user_service=None):
        self.collection: Collection = orders_collection
        # Import here to avoid circular dependency
        if restaurant_service is None:
            from services.restaurant_service import restaurant_service as rs
            self.restaurant_service = rs
        else:
            self.restaurant_service = restaurant_service
        
        if user_service is None:
            from services.user_service import user_service as us
            self.user_service = us
        else:
            self.user_service = user_service

    # ==================== Helpers ====================
    def _to_model(self, doc: dict) -> Order:
        """Convert MongoDB doc to Order model"""
        return Order(**doc)

    def _to_simple_response(self, order: Order) -> Dict:
        """Convert Order model to simple response dict"""
        return OrderSimpleResponse(**order.to_dict()).model_dump(by_alias=True)

    def _to_full_response(self, order: Order) -> Dict:
        """Convert Order model to full response dict + shipper details if available"""
        data = order.to_dict()

        # Bổ sung thông tin shipper (nếu có)
        try:
            if order.shipper_id:
                shipper = self.user_service.find_by_id(str(order.shipper_id))
                if shipper:
                    data['shipper'] = {
                        'shipperId': str(order.shipper_id),
                        'fullname': shipper.fullname,
                        'phone_number': shipper.phone_number
                    }
        except Exception:
            # Không chặn response nếu lấy shipper info lỗi
            pass

        return OrderResponse(**data).model_dump(by_alias=True)

    # ==================== LAYER 1: MongoDB CRUD Operations ====================

    def find_by_id(self, order_id: str) -> Optional[Order]:
        """Tìm đơn hàng theo ID"""
        try:
            doc = self.collection.find_one({'_id': ObjectId(order_id)})
            return self._to_model(doc) if doc else None
        except Exception as e:
            print(f"Error finding order by id: {e}")
            return None

    def find_by_user_id(self, user_id: str) -> List[Order]:
        """Tìm tất cả đơn hàng của user"""
        try:
            result = []
            for doc in self.collection.find({'userId': ObjectId(user_id)}):
                result.append(self._to_model(doc))
            return result
        except Exception as e:
            print(f"Error finding orders by user id: {e}")
            return []

    def find_by_restaurant_id(self, restaurant_id: str) -> List[Order]:
        """Tìm tất cả đơn hàng cho nhà hàng"""
        try:
            result = []
            for doc in self.collection.find({'restaurantId': ObjectId(restaurant_id)}):
                result.append(self._to_model(doc))
            return result
        except Exception as e:
            print(f"Error finding orders by restaurant id: {e}")
            return []

    def find_by_shipper_id(self, shipper_id: str) -> List[Order]:
        """Tìm tất cả đơn hàng của shipper"""
        try:
            result = []
            for doc in self.collection.find({'shipperId': ObjectId(shipper_id)}):
                result.append(self._to_model(doc))
            return result
        except Exception as e:
            print(f"Error finding orders by shipper id: {e}")
            return []

    def find_by_status(self, status: str) -> List[Order]:
        """Tìm đơn hàng theo trạng thái"""
        try:
            result = []
            for doc in self.collection.find({'status': status}):
                result.append(self._to_model(doc))
            return result
        except Exception as e:
            print(f"Error finding orders by status: {e}")
            return []

    def find_all(self) -> List[Order]:
        """Lấy tất cả đơn hàng"""
        try:
            result = []
            for doc in self.collection.find().sort('createdAt', -1):
                result.append(self._to_model(doc))
            return result
        except Exception as e:
            print(f"Error finding all orders: {e}")
            return []

    def create_order_in_db(self, req: CreateOrderRequest, user_id: str) -> Optional[Order]:
        """Tạo đơn hàng mới - Lấy giá từ DB, lưu thông tin denormalized cho shipper"""
        try:
            # Kiểm tra items không trống
            if not req.items or len(req.items) == 0:
                raise ValueError('Đơn hàng phải có ít nhất 1 món')
            
            # ===== Lấy thông tin User (fullname, phone) =====
            user = self.user_service.find_by_id(user_id)
            if not user:
                raise ValueError(f'Không tìm thấy user {user_id}')
            
            user_fullname = user.fullname or "Unknown"
            user_phone = user.phone_number or "Unknown"
            
            # ===== Lấy thông tin Restaurant (name, address, hotline) =====
            restaurant = self.restaurant_service.find_by_id(req.restaurant_id)
            if not restaurant:
                raise ValueError(f'Không tìm thấy nhà hàng {req.restaurant_id}')
            
            restaurant_name = restaurant.restaurant_name
            restaurant_address = restaurant.address or "Unknown"
            restaurant_hotline = restaurant.hotline
            
            # ===== Build price map từ menu (Tối ưu: Tránh N+1 query) =====
            price_map = {}  # {food_name_lower: price}
            for category in restaurant.menu:
                for food_item in category.items:
                    price_map[food_item.name.lower()] = float(food_item.price)
            
            # ===== Lấy giá từ price_map (O(1) lookup thay vì N queries) =====
            items_list: List[OrderItem] = []
            subtotal = 0
            
            for item_req in req.items:
                # Lookup giá từ price_map (đã build sẵn)
                food_name_lower = item_req.food_name.lower()
                if food_name_lower not in price_map:
                    raise ValueError(f'Món "{item_req.food_name}" không có trong menu nhà hàng')
                
                unit_price = price_map[food_name_lower]
                item_subtotal = item_req.quantity * unit_price
                
                item = OrderItem(
                    food_name=item_req.food_name,
                    quantity=item_req.quantity,
                    unit_price=unit_price,  # Từ DB, không phải frontend
                    subtotal=item_subtotal
                )
                items_list.append(item)
                subtotal += item_subtotal
            
            # Áp dụng voucher (nếu có) để tính discount server-side
            discount = 0.0
            if req.promo_id:
                try:
                    discount = voucher_service.preview_discount(
                        user_id=user_id,
                        restaurant_id=req.restaurant_id,
                        subtotal=subtotal,
                        shipping_fee=req.shipping_fee,
                        promo_id=req.promo_id
                    )['discount']
                except Exception as e:
                    raise ValueError(f'Không thể áp dụng voucher: {str(e)}')

            # Tính total_amount
            total_amount = subtotal + req.shipping_fee - discount
            
            # ===== Tạo Order object với denormalized data =====
            order = Order(
                user_id=ObjectId(user_id),
                restaurant_id=ObjectId(req.restaurant_id),
                user_fullname=user_fullname,  # Denormalized
                user_phone=user_phone,  # Denormalized
                restaurant_name=restaurant_name,  # Denormalized
                restaurant_address=restaurant_address,  # Denormalized
                restaurant_hotline=restaurant_hotline,  # Denormalized
                items=items_list,
                address=req.address,
                note=req.note,
                subtotal=subtotal,
                shipping_fee=req.shipping_fee,
                discount=discount,
                total_amount=total_amount,
                promo_id=ObjectId(req.promo_id) if req.promo_id else None,
                payment_method=req.payment_method,
                status=OrderStatus.PENDING,
                created_at=datetime.now(),
                updated_at=datetime.now(),
            )
            
            # Insert vào MongoDB
            insert_result = self.collection.insert_one(order.to_mongo())
            created = self.find_by_id(str(insert_result.inserted_id))
            
            # NOTE: Không mark voucher ở đây để tránh mất voucher khi payment fail
            # Voucher sẽ được mark trong create_order() sau khi payment thành công
            
            return created
        except Exception as e:
            print(f"Error creating order: {e}")
            raise ValueError(f'Lỗi DB khi tạo đơn hàng: {str(e)}')

    def update_order_status_in_db(self, order_id: str, new_status: str, shipper_id: Optional[str] = None) -> Optional[Order]:
        """Update trạng thái đơn hàng"""
        try:
            update_data = {
                'status': new_status,
                'updatedAt': datetime.now()
            }
            
            # Nếu shipper nhận đơn
            if shipper_id and new_status == OrderStatus.SHIPPING.value:
                update_data['shipperId'] = ObjectId(shipper_id)
            
            result = self.collection.update_one(
                {'_id': ObjectId(order_id)},
                {'$set': update_data}
            )
            
            return self.find_by_id(order_id) if result.matched_count > 0 else None
        except Exception as e:
            raise ValueError(f'Lỗi DB khi cập nhật trạng thái: {str(e)}')

    def cancel_order_in_db(self, order_id: str, cancelled_by: str, reason: Optional[str] = None) -> Optional[Order]:
        """Hủy đơn hàng"""
        try:
            update_data = {
                'status': OrderStatus.CANCELLED.value,
                'cancelled_by': cancelled_by,
                'cancellation_reason': reason,
                'updatedAt': datetime.now()
            }
            
            result = self.collection.update_one(
                {'_id': ObjectId(order_id)},
                {'$set': update_data}
            )
            
            return self.find_by_id(order_id) if result.matched_count > 0 else None
        except Exception as e:
            raise ValueError(f'Lỗi DB khi hủy đơn hàng: {str(e)}')

    # ==================== LAYER 2: Business Logic ====================

    def create_order(self, req: CreateOrderRequest, user_id: str) -> Dict:
        """Tạo đơn hàng mới (User flow) - Giá từ DB, xử lý thanh toán theo phương thức"""
        created = None
        try:
            # Kiểm tra items không trống
            if not req.items or len(req.items) == 0:
                raise ValueError('Đơn hàng phải có ít nhất 1 món')
            
            # BƯỚC 1: Tạo order (giá sẽ được lấy từ DB bên trong create_order_in_db)
            created = self.create_order_in_db(req, user_id)
            if not created:
                raise ValueError('Không thể tạo đơn hàng')

            # BƯỚC 2: Tạo payment và xử lý thanh toán theo phương thức
            payment_status = PaymentStatus.PENDING
            payment = None
            try:
                if req.payment_method == PaymentMethod.BALANCE:
                    # Kiểm tra và trừ số dư
                    self.user_service.deduct_balance(user_id, created.total_amount)
                    payment_status = PaymentStatus.PAID

                payment = payment_service.create_payment(
                    order_id=str(created.id),
                    user_id=user_id,
                    amount=created.total_amount,
                    method=req.payment_method,
                    status=payment_status
                )

                # Gắn paymentId vào order
                self.collection.update_one(
                    {'_id': ObjectId(str(created.id))},
                    {'$set': {'paymentId': payment.id}}
                )
                
                # ✅ CHỈ mark voucher SAU KHI payment thành công
                # Đảm bảo nếu payment fail, voucher không bị mất
                if req.promo_id:
                    try:
                        voucher_service.mark_voucher_used(req.promo_id, user_id)
                    except Exception as e:
                        print(f"Warning: Could not mark voucher as used: {e}")
                        # Không chặn flow nếu mark voucher fail (đơn hàng vẫn thành công)
            except Exception as e:
                # ROLLBACK: Xóa payment (nếu có) và order
                if payment and payment.id:
                    try:
                        payment_service.delete_payment(str(payment.id))
                    except:
                        pass
                if created:
                    try:
                        self.collection.delete_one({'_id': ObjectId(str(created.id))})
                    except:
                        pass
                raise ValueError(f'Thanh toán thất bại: {str(e)}')
            
            return self._to_full_response(created)
        except ValueError:
            raise
        except Exception as e:
            # Nếu có lỗi khác và đã tạo order, cũng rollback
            if created:
                try:
                    self.collection.delete_one({'_id': ObjectId(str(created.id))})
                except:
                    pass  # Ignore rollback error
            raise ValueError(f'Lỗi khi tạo đơn hàng: {str(e)}')

    def get_order_by_id(self, order_id: str) -> Dict:
        """Lấy chi tiết đơn hàng"""
        order = self.find_by_id(order_id)
        if not order:
            raise ValueError('Không tìm thấy đơn hàng')
        
        return self._to_full_response(order)

    def get_user_orders(self, user_id: str) -> List[Dict]:
        """Lấy danh sách đơn hàng của user"""
        try:
            orders = self.find_by_user_id(user_id)
            return [self._to_simple_response(o) for o in orders]
        except Exception as e:
            raise ValueError(f'Lỗi khi lấy danh sách đơn: {str(e)}')

    def get_user_orders_by_status(self, user_id: str, status: str) -> List[Dict]:
        """Lấy danh sách đơn hàng của user theo trạng thái"""
        try:
            # Validate status
            valid_statuses = [s.value for s in OrderStatus]
            if status not in valid_statuses:
                raise ValueError(f'Trạng thái không hợp lệ. Các giá trị hợp lệ: {', '.join(valid_statuses)}')
            
            orders = []
            for doc in self.collection.find({'userId': ObjectId(user_id), 'status': status}).sort('createdAt', -1):
                orders.append(self._to_model(doc))
            
            return [self._to_simple_response(o) for o in orders]
        except ValueError:
            raise
        except Exception as e:
            raise ValueError(f'Lỗi khi lấy đơn hàng theo trạng thái: {str(e)}')

    def get_restaurant_orders(self, restaurant_id: str) -> List[Dict]:
        """Lấy đơn hàng cho nhà hàng"""
        try:
            orders = self.find_by_restaurant_id(restaurant_id)
            return [self._to_simple_response(o) for o in orders]
        except Exception as e:
            raise ValueError(f'Lỗi khi lấy đơn hàng nhà hàng: {str(e)}')

    def get_pending_orders(self) -> List[Dict]:
        """Lấy đơn hàng đang chờ (PENDING) - cho Shipper xem"""
        try:
            orders = self.find_by_status(OrderStatus.PENDING.value)
            return [self._to_simple_response(o) for o in orders]
        except Exception as e:
            raise ValueError(f'Lỗi khi lấy đơn chờ: {str(e)}')

    def get_shipper_orders(self, shipper_id: str) -> List[Dict]:
        """Lấy đơn hàng của shipper"""
        try:
            orders = self.find_by_shipper_id(shipper_id)
            return [self._to_simple_response(o) for o in orders]
        except Exception as e:
            raise ValueError(f'Lỗi khi lấy đơn của shipper: {str(e)}')

    def get_all_orders(self) -> List[Dict]:
        """Lấy tất cả đơn (Admin only)"""
        try:
            orders = self.find_all()
            return [self._to_simple_response(o) for o in orders]
        except Exception as e:
            raise ValueError(f'Lỗi khi lấy danh sách đơn: {str(e)}')

    def get_all_orders_by_status(self, status: str) -> List[Dict]:
        """Lấy tất cả đơn theo trạng thái (Admin only)"""
        try:
            # Validate status
            valid_statuses = [s.value for s in OrderStatus]
            if status not in valid_statuses:
                raise ValueError(f'Trạng thái không hợp lệ. Các giá trị hợp lệ: {', '.join(valid_statuses)}')
            
            orders = []
            for doc in self.collection.find({'status': status}).sort('createdAt', -1):
                orders.append(self._to_model(doc))
            
            return [self._to_simple_response(o) for o in orders]
        except ValueError:
            raise
        except Exception as e:
            raise ValueError(f'Lỗi khi lấy đơn hàng theo trạng thái: {str(e)}')

    def accept_order(self, order_id: str, shipper_id: str) -> Dict:
        """Shipper nhận đơn: PENDING → SHIPPING"""
        try:
            order = self.find_by_id(order_id)
            if not order:
                raise ValueError('Không tìm thấy đơn hàng')
            
            if order.status != OrderStatus.PENDING:
                raise ValueError(f'Chỉ có thể nhận đơn ở trạng thái PENDING, hiện tại: {order.status.value}')
            
            updated = self.update_order_status_in_db(order_id, OrderStatus.SHIPPING.value, shipper_id)
            if not updated:
                raise ValueError('Không thể cập nhật trạng thái')
            
            return self._to_full_response(updated)
        except ValueError:
            raise
        except Exception as e:
            raise ValueError(f'Lỗi khi nhận đơn: {str(e)}')

    def complete_order(self, order_id: str, shipper_id: str) -> Dict:
        """Shipper hoàn thành: SHIPPING → COMPLETED

        - Nếu đơn thanh toán bằng COD: khi hoàn thành sẽ tự động đánh dấu payment = Paid.
        """
        try:
            order = self.find_by_id(order_id)
            if not order:
                raise ValueError('Không tìm thấy đơn hàng')
            
            if order.status != OrderStatus.SHIPPING:
                raise ValueError('Chỉ có thể hoàn thành khi đơn đang SHIPPING')
            
            if str(order.shipper_id) != shipper_id:
                raise ValueError('Chỉ shipper nhận đơn mới có thể hoàn thành')
            
            updated = self.update_order_status_in_db(order_id, OrderStatus.COMPLETED.value)
            if not updated:
                raise ValueError('Không thể cập nhật trạng thái')

            # Nếu là COD thì auto đánh dấu payment đã thanh toán khi shipper hoàn thành
            try:
                payment = payment_service.find_by_order_id(order_id)
                if payment and payment.method == PaymentMethod.COD and payment.status == PaymentStatus.PENDING:
                    payment_service.mark_paid(str(payment.id))
            except Exception:
                # Không chặn luồng hoàn thành đơn nếu cập nhật payment gặp lỗi
                pass
            
            return self._to_full_response(updated)
        except ValueError:
            raise
        except Exception as e:
            raise ValueError(f'Lỗi khi hoàn thành đơn: {str(e)}')

    def reject_order_by_shipper(self, order_id: str, shipper_id: str, reason: Optional[str] = None) -> Dict:
        """Shipper từ chối/hủy đơn đã nhận: SHIPPING → PENDING (bỏ shipperId)

        - Ghi lại lịch sử từ chối vào mảng shipperRejections: shipperId, reason, timestamp
        """
        try:
            order = self.find_by_id(order_id)
            if not order:
                raise ValueError('Không tìm thấy đơn hàng')
            
            if order.status != OrderStatus.SHIPPING:
                raise ValueError('Chỉ có thể từ chối đơn khi đang ở trạng thái SHIPPING')
            
            if str(order.shipper_id) != shipper_id:
                raise ValueError('Chỉ shipper nhận đơn mới có thể từ chối')
            
            # Reset về PENDING, xóa shipperId và lưu lịch sử từ chối
            result = self.collection.update_one(
                {'_id': ObjectId(order_id)},
                {
                    '$set': {
                        'status': OrderStatus.PENDING.value,
                        'shipperId': None,
                        'updatedAt': datetime.now()
                    },
                    '$push': {
                        'shipperRejections': {
                            'shipperId': ObjectId(shipper_id),
                            'reason': reason,
                            'timestamp': datetime.now()
                        }
                    }
                }
            )
            
            if result.matched_count == 0:
                raise ValueError('Không thể cập nhật trạng thái')
            
            updated = self.find_by_id(order_id)
            return self._to_full_response(updated)
        except ValueError:
            raise
        except Exception as e:
            raise ValueError(f'Lỗi khi từ chối đơn: {str(e)}')

    def get_shipper_order_detail(self, order_id: str, shipper_id: str) -> Dict:
        """Shipper xem chi tiết đơn hàng của mình"""
        try:
            order = self.find_by_id(order_id)
            if not order:
                raise ValueError('Không tìm thấy đơn hàng')
            
            # Kiểm tra shipper có quyền xem đơn này không
            if order.shipper_id and str(order.shipper_id) != shipper_id:
                raise ValueError('Bạn không có quyền xem đơn hàng này')
            
            return self._to_full_response(order)
        except ValueError:
            raise
        except Exception as e:
            raise ValueError(f'Lỗi khi lấy chi tiết đơn: {str(e)}')

    def get_shipper_stats(self, shipper_id: str) -> Dict:
        """Lấy thống kê đơn hàng của shipper"""
        try:
            # Đếm đơn theo từng trạng thái
            total_orders = self.collection.count_documents({'shipperId': ObjectId(shipper_id)})
            pending_orders = self.collection.count_documents({
                'shipperId': ObjectId(shipper_id),
                'status': OrderStatus.PENDING.value
            })
            shipping_orders = self.collection.count_documents({
                'shipperId': ObjectId(shipper_id),
                'status': OrderStatus.SHIPPING.value
            })
            completed_orders = self.collection.count_documents({
                'shipperId': ObjectId(shipper_id),
                'status': OrderStatus.COMPLETED.value
            })
            cancelled_orders = self.collection.count_documents({
                'shipperId': ObjectId(shipper_id),
                'status': OrderStatus.CANCELLED.value
            })
            
            # Tính tổng thu nhập (từ các đơn đã hoàn thành)
            pipeline = [
                {'$match': {
                    'shipperId': ObjectId(shipper_id),
                    'status': OrderStatus.COMPLETED.value
                }},
                {'$group': {
                    '_id': None,
                    'total_revenue': {'$sum': '$shipping_fee'}
                }}
            ]
            revenue_result = list(self.collection.aggregate(pipeline))
            total_revenue = revenue_result[0]['total_revenue'] if revenue_result else 0
            
            return {
                'total_orders': total_orders,
                'pending_orders': pending_orders,
                'shipping_orders': shipping_orders,
                'completed_orders': completed_orders,
                'cancelled_orders': cancelled_orders,
                'total_revenue': float(total_revenue)
            }
        except Exception as e:
            raise ValueError(f'Lỗi khi lấy thống kê: {str(e)}')

    def get_shipper_monthly_revenue(self, shipper_id: str, year: Optional[int] = None) -> Dict:
        """Tính doanh thu (shipping_fee) theo tháng cho shipper trong 1 năm.

        - Mặc định lấy năm hiện tại nếu không truyền `year`.
        - Chỉ tính các đơn ở trạng thái COMPLETED.
        - Dựa trên mốc thời gian `updatedAt` (khi đơn được hoàn thành).
        """
        try:
            year = year or datetime.now().year

            start = datetime(year, 1, 1)
            end = datetime(year + 1, 1, 1)

            pipeline = [
                {
                    '$match': {
                        'shipperId': ObjectId(shipper_id),
                        'status': OrderStatus.COMPLETED.value,
                        'updatedAt': {'$gte': start, '$lt': end}
                    }
                },
                {
                    '$group': {
                        '_id': { 'month': { '$month': '$updatedAt' } },
                        'orders': { '$sum': 1 },
                        'revenue': { '$sum': '$shipping_fee' }
                    }
                },
                { '$sort': { '_id.month': 1 } }
            ]

            agg = list(self.collection.aggregate(pipeline))

            # Chuẩn hóa đủ 12 tháng
            month_map = { doc['_id']['month']: doc for doc in agg }
            monthly = []
            for m in range(1, 13):
                if m in month_map:
                    monthly.append({
                        'month': m,
                        'orders': int(month_map[m]['orders']),
                        'revenue': float(month_map[m]['revenue'])
                    })
                else:
                    monthly.append({ 'month': m, 'orders': 0, 'revenue': 0.0 })

            total_orders = sum(item['orders'] for item in monthly)
            total_revenue = sum(item['revenue'] for item in monthly)

            return {
                'year': year,
                'monthly': monthly,
                'total_orders': int(total_orders),
                'total_revenue': float(total_revenue)
            }
        except Exception as e:
            raise ValueError(f'Lỗi khi tính doanh thu theo tháng: {str(e)}')

    def get_shipper_current_month_revenue(self, shipper_id: str, year: Optional[int] = None, month: Optional[int] = None) -> Dict:
        """Tính doanh thu tháng hiện tại (hoặc theo `year`, `month` truyền vào).

        - Mặc định: dùng tháng/năm hiện tại nếu không truyền.
        - Chỉ tính các đơn ở trạng thái COMPLETED, dựa trên `updatedAt` trong khoảng tháng.
        """
        try:
            now = datetime.now()
            year = year or now.year
            month = month or now.month

            start = datetime(year, month, 1)
            # Tính ngày đầu tháng kế tiếp
            if month == 12:
                end = datetime(year + 1, 1, 1)
            else:
                end = datetime(year, month + 1, 1)

            pipeline = [
                {
                    '$match': {
                        'shipperId': ObjectId(shipper_id),
                        'status': OrderStatus.COMPLETED.value,
                        'updatedAt': {'$gte': start, '$lt': end}
                    }
                },
                {
                    '$group': {
                        '_id': None,
                        'orders': { '$sum': 1 },
                        'revenue': { '$sum': '$shipping_fee' }
                    }
                }
            ]

            agg = list(self.collection.aggregate(pipeline))
            orders = int(agg[0]['orders']) if agg else 0
            revenue = float(agg[0]['revenue']) if agg else 0.0

            return {
                'year': year,
                'month': month,
                'orders': orders,
                'revenue': revenue
            }
        except Exception as e:
            raise ValueError(f'Lỗi khi tính doanh thu tháng hiện tại: {str(e)}')

    def get_shipper_orders_by_status(self, shipper_id: str, status: Optional[str] = None) -> List[Dict]:
        """Lấy đơn hàng của shipper theo trạng thái (filter)"""
        try:
            query = {'shipperId': ObjectId(shipper_id)}
            if status:
                # Validate status
                valid_statuses = [s.value for s in OrderStatus]
                if status not in valid_statuses:
                    raise ValueError(f'Trạng thái không hợp lệ. Các giá trị hợp lệ: {", ".join(valid_statuses)}')
                query['status'] = status
            
            orders = []
            for doc in self.collection.find(query).sort('createdAt', -1):
                orders.append(self._to_model(doc))
            
            return [self._to_simple_response(o) for o in orders]
        except ValueError:
            raise
        except Exception as e:
            raise ValueError(f'Lỗi khi lấy đơn hàng theo trạng thái: {str(e)}')

    def cancel_order(self, order_id: str, user_id: str, reason: Optional[str] = None) -> Dict:
        """User hủy đơn (chỉ khi PENDING)"""
        try:
            order = self.find_by_id(order_id)
            if not order:
                raise ValueError('Không tìm thấy đơn hàng')
            
            if order.status != OrderStatus.PENDING:
                raise ValueError('Chỉ có thể hủy đơn ở trạng thái PENDING')
            
            if str(order.user_id) != user_id:
                raise ValueError('Chỉ user đặt đơn mới có thể hủy')
            
            # Xử lý payment: refund nếu đã trả, hoặc đánh dấu thất bại nếu đang chờ
            if order.payment_id:
                payment = payment_service.find_by_order_id(order_id)
                if payment:
                    if payment.status == PaymentStatus.PAID:
                        payment_service.refund(str(order.payment_id))
                    elif payment.status == PaymentStatus.PENDING:
                        payment_service.mark_failed(str(order.payment_id))

            updated = self.cancel_order_in_db(order_id, 'user', reason)
            if not updated:
                raise ValueError('Không thể hủy đơn')

            # Hoàn lại voucher nếu đơn có sử dụng voucher
            try:
                if order.promo_id:
                    voucher_service.refund_voucher_used(str(order.promo_id), user_id)
            except Exception:
                # Không chặn flow nếu refund voucher lỗi
                pass
            
            return self._to_full_response(updated)
        except ValueError:
            raise
        except Exception as e:
            raise ValueError(f'Lỗi khi hủy đơn: {str(e)}')

    def admin_cancel_order(self, order_id: str, reason: Optional[str] = None) -> Dict:
        """Admin hủy đơn (bất kỳ trạng thái nào)"""
        try:
            order = self.find_by_id(order_id)
            if not order:
                raise ValueError('Không tìm thấy đơn hàng')
            
            if order.status == OrderStatus.COMPLETED:
                raise ValueError('Không thể hủy đơn đã hoàn thành')
            
            if order.status == OrderStatus.CANCELLED:
                raise ValueError('Đơn hàng đã bị hủy rồi')
            
            # Xử lý payment: refund nếu đã trả, hoặc đánh dấu thất bại nếu đang chờ
            if order.payment_id:
                payment = payment_service.find_by_order_id(order_id)
                if payment:
                    if payment.status == PaymentStatus.PAID:
                        payment_service.refund(str(order.payment_id))
                    elif payment.status == PaymentStatus.PENDING:
                        payment_service.mark_failed(str(order.payment_id))

            updated = self.cancel_order_in_db(order_id, 'admin', reason)
            if not updated:
                raise ValueError('Không thể hủy đơn')

            # Hoàn lại voucher nếu đơn có sử dụng voucher
            try:
                if order.promo_id:
                    voucher_service.refund_voucher_used(str(order.promo_id), str(order.user_id))
            except Exception:
                # Không chặn flow nếu refund voucher lỗi
                pass
            
            return self._to_full_response(updated)
        except ValueError:
            raise
        except Exception as e:
            raise ValueError(f'Lỗi khi hủy đơn: {str(e)}')

    def mark_paid(self, order_id: str) -> Dict:
        """Cập nhật trạng thái thanh toán thành PAID"""
        try:
            order = self.find_by_id(order_id)
            if not order:
                raise ValueError('Không tìm thấy đơn hàng')

            payment = payment_service.find_by_order_id(order_id)
            if not payment:
                raise ValueError('Không tìm thấy payment cho đơn hàng')

            payment_service.mark_paid(str(payment.id))

            # Trả về order (không thay đổi trạng thái đơn)
            return self._to_full_response(order)
        except ValueError:
            raise
        except Exception as e:
            raise ValueError(f'Lỗi khi cập nhật trạng thái thanh toán: {str(e)}')


order_service = OrderService()
