from typing import Optional, List, Dict
from bson import ObjectId
from pymongo.collection import Collection
from db.connection import restaurants_collection
from db.models.restaurants import Restaurant, MenuCategory, FoodMenuItem
from schemas.restaurant_schema import (
    CreateRestaurantRequest,
    UpdateRestaurantRequest,
    RestaurantResponse,
    RestaurantSimpleResponse,
    SearchFoodResponse,
)

class RestaurantService:
    def __init__(self):
        self.collection: Collection = restaurants_collection

    # ==================== Helpers ====================
    def _to_model(self, doc: dict) -> Restaurant:
        return Restaurant(**doc)

    def _to_simple_response(self, restaurant: Restaurant) -> Dict:
        return RestaurantSimpleResponse(**restaurant.to_dict()).model_dump()

    def _to_full_response(self, restaurant: Restaurant) -> Dict:
        return RestaurantResponse(**restaurant.to_dict()).model_dump()

    # ==================== CRUD ====================
    def find_by_id(self, restaurant_id: str) -> Optional[Restaurant]:
        doc = self.collection.find_one({'_id': ObjectId(restaurant_id)})
        return self._to_model(doc) if doc else None

    def list_all(self) -> List[Dict]:
        result: List[Dict] = []
        for doc in self.collection.find():
            restaurant = self._to_model(doc)
            result.append(self._to_simple_response(restaurant))
        return result

    def create(self, req: CreateRestaurantRequest) -> Dict:
        # Dùng alias khi dump để đúng field lưu trong Mongo (name, openTime,...)
        data = req.model_dump(by_alias=True, exclude_none=True)
        # Chuẩn hóa menu nếu có
        menu_list: List[MenuCategory] = []
        for cat in data.get('menu', []) or []:
            # Pydantic đã validate kiểu MenuCategory; lưu nguyên dict
            if isinstance(cat, dict):
                menu_list.append(MenuCategory(**cat))
            else:
                menu_list.append(cat)
        restaurant = Restaurant(
            restaurant_name=req.restaurant_name,
            address=req.address,
            hotline=req.hotline,
            open_time=req.open_time,
            close_time=req.close_time,
            map_link=req.map_link,
            menu=menu_list
        )
        insert_result = self.collection.insert_one(restaurant.to_mongo())
        created = self.find_by_id(str(insert_result.inserted_id))
        return self._to_full_response(created)

    def update(self, restaurant_id: str, req: UpdateRestaurantRequest) -> Dict:
        update_data = req.model_dump(by_alias=True, exclude_none=True)
        if not update_data:
            raise ValueError('Không có dữ liệu để cập nhật')
        result = self.collection.update_one({'_id': ObjectId(restaurant_id)}, {'$set': update_data})
        if result.matched_count == 0:
            raise ValueError('Không tìm thấy nhà hàng')
        updated = self.find_by_id(restaurant_id)
        return self._to_full_response(updated)

    def delete(self, restaurant_id: str) -> Dict:
        result = self.collection.delete_one({'_id': ObjectId(restaurant_id)})
        if result.deleted_count == 0:
            raise ValueError('Không tìm thấy nhà hàng hoặc không thể xóa')
        return {'message': 'Xóa nhà hàng thành công'}

    # ==================== Search ====================
    
    def search_for_users(self, query: str) -> List[Dict]:
        """
        Search cho USER: Tìm theo food name và category.
        Trả về danh sách món ăn + thông tin nhà hàng.
        """
        results: List[Dict] = []
        
        # 1. Search món ăn theo tên
        pipeline_food = [
            {'$unwind': {'path': '$menu', 'preserveNullAndEmptyArrays': False}},
            {'$unwind': {'path': '$menu.items', 'preserveNullAndEmptyArrays': False}},
            {'$match': {'menu.items.name': {'$regex': query, '$options': 'i'}}},
            {
                '$project': {
                    '_id': 1,
                    'name': 1,
                    'address': 1,
                    'hotline': 1,
                    'openTime': 1,
                    'closeTime': 1,
                    'mapLink': 1,
                    'category': '$menu.category',
                    'food': '$menu.items'
                }
            }
        ]
        food_results = list(self.collection.aggregate(pipeline_food))
        
        for item in food_results:
            food_data = FoodMenuItem(**{
                'name': item['food'].get('name'),
                'price': float(item['food'].get('price', 0)),
                'description': item['food'].get('description'),
                'image': item['food'].get('image'),
                'status': item['food'].get('status', True)
            })
            restaurant_simple = RestaurantSimpleResponse(**{
                '_id': str(item['_id']),
                'name': item.get('name'),
                'address': item.get('address'),
                'hotline': item.get('hotline'),
                'openTime': item.get('openTime'),
                'closeTime': item.get('closeTime'),
                'mapLink': item.get('mapLink'),
            })
            results.append(
                SearchFoodResponse(
                    food=food_data,
                    category=item.get('category'),
                    restaurant=restaurant_simple
                ).model_dump()
            )
        
        # 2. Search theo category
        pipeline_category = [
            {'$unwind': {'path': '$menu', 'preserveNullAndEmptyArrays': False}},
            {'$match': {'menu.category': {'$regex': query, '$options': 'i'}}},
            {'$unwind': {'path': '$menu.items', 'preserveNullAndEmptyArrays': False}},
            {
                '$project': {
                    '_id': 1,
                    'name': 1,
                    'address': 1,
                    'hotline': 1,
                    'openTime': 1,
                    'closeTime': 1,
                    'mapLink': 1,
                    'category': '$menu.category',
                    'food': '$menu.items'
                }
            }
        ]
        category_results = list(self.collection.aggregate(pipeline_category))
        
        # Tránh trùng lặp: track các món đã thêm
        added_items = set()
        for item in food_results:
            key = f"{item['_id']}_{item['category']}_{item['food']['name']}"
            added_items.add(key)
        
        for item in category_results:
            key = f"{item['_id']}_{item['category']}_{item['food']['name']}"
            if key not in added_items:
                food_data = FoodMenuItem(**{
                    'name': item['food'].get('name'),
                    'price': float(item['food'].get('price', 0)),
                    'description': item['food'].get('description'),
                    'image': item['food'].get('image'),
                    'status': item['food'].get('status', True)
                })
                restaurant_simple = RestaurantSimpleResponse(**{
                    '_id': str(item['_id']),
                    'name': item.get('name'),
                    'address': item.get('address'),
                    'hotline': item.get('hotline'),
                    'openTime': item.get('openTime'),
                    'closeTime': item.get('closeTime'),
                    'mapLink': item.get('mapLink'),
                })
                results.append(
                    SearchFoodResponse(
                        food=food_data,
                        category=item.get('category'),
                        restaurant=restaurant_simple
                    ).model_dump()
                )
                added_items.add(key)
        
        return results
    
    def search_for_admin(self, query: str) -> Dict:
        """
        Search cho ADMIN: Tìm theo restaurant name, food name, và category.
        Trả về object chứa restaurants và foods riêng biệt.
        """
        result = {
            'restaurants': [],
            'foods': []
        }
        
        # 1. Search nhà hàng theo tên
        restaurants_cursor = self.collection.find({'name': {'$regex': query, '$options': 'i'}})
        for doc in restaurants_cursor:
            restaurant = self._to_model(doc)
            result['restaurants'].append(self._to_simple_response(restaurant))
        
        # 2. Search món ăn và category (tương tự user)
        result['foods'] = self.search_for_users(query)
        
        return result

restaurant_service = RestaurantService()
