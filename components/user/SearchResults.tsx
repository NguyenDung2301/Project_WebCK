import React, { useMemo } from 'react';
import { ChevronDown, Star, Heart } from 'lucide-react';
import { FoodItem } from '../../types/common';

interface SearchResultsProps {
  searchTerm: string;
  onItemClick: (item: FoodItem) => void;
  favoriteFoodIds: string[];
  onToggleFavorite: (id: string) => void;
  foods?: FoodItem[]; // Add foods prop
}

export const SearchResults: React.FC<SearchResultsProps> = ({ 
  searchTerm, 
  onItemClick, 
  favoriteFoodIds, 
  onToggleFavorite,
  foods = [] // Default to empty
}) => {
  // Filtering logic
  const filteredFoods = useMemo(() => {
    if (!searchTerm) return foods;
    const lowerTerm = searchTerm.toLowerCase();
    return foods.filter(food => 
      (food.name?.toLowerCase() || '').includes(lowerTerm) || 
      (food.description?.toLowerCase() || '').includes(lowerTerm) ||
      (food.category?.toLowerCase() || '').includes(lowerTerm)
    );
  }, [searchTerm, foods]);

  const handleHeartClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    onToggleFavorite(id);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-xs font-medium text-gray-400 mb-1">Kết quả tìm kiếm</p>
          <h1 className="text-3xl font-extrabold text-gray-800">"{searchTerm}"</h1>
        </div>
        <span className="text-sm text-gray-500 mb-1">
          Tìm thấy <span className="font-bold text-gray-800">{filteredFoods.length}</span> kết quả
        </span>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-10 overflow-x-auto scrollbar-hide">
        <button className="bg-[#EE501C] text-white px-5 py-2 rounded-xl text-sm font-semibold whitespace-nowrap shadow-md shadow-orange-100">Tất cả</button>
        <button className="bg-white border border-gray-200 text-gray-700 px-5 py-2 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-gray-50 whitespace-nowrap">
          Giá <ChevronDown className="w-3 h-3" />
        </button>
        <button className="bg-white border border-gray-200 text-gray-700 px-5 py-2 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-gray-50 whitespace-nowrap">
          Đánh giá <ChevronDown className="w-3 h-3" />
        </button>
        <button className="bg-white border border-gray-200 text-gray-700 px-5 py-2 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-gray-50 whitespace-nowrap">
          Thời gian giao <ChevronDown className="w-3 h-3" />
        </button>
        <button className="bg-white border border-gray-200 text-gray-700 px-5 py-2 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-gray-50 whitespace-nowrap">
          Ưu đãi <ChevronDown className="w-3 h-3" />
        </button>
      </div>

      {/* Results List */}
      <div className="space-y-6">
        {filteredFoods.length > 0 ? (
          filteredFoods.map((food) => {
            const isFavorite = favoriteFoodIds.includes(food.id);
            return (
              <div 
                key={food.id} 
                onClick={() => onItemClick(food)}
                className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm flex flex-col md:flex-row gap-6 p-4 md:p-6 hover:shadow-xl hover:border-orange-200 transition-all group cursor-pointer"
              >
                <div className="w-full md:w-56 h-44 shrink-0 overflow-hidden rounded-2xl relative">
                  <img src={food.imageUrl} alt={food.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex-1 py-1 relative">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-[#EE501C] transition-colors">{food.name}</h3>
                    <button 
                      onClick={(e) => handleHeartClick(e, food.id)}
                      className={`p-2 transition-colors ${isFavorite ? 'text-red-500' : 'text-gray-300 hover:text-red-300'}`}
                    >
                      <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                  <p className="text-sm text-gray-400 mb-4 line-clamp-1">{food.description}</p>
                  
                  <div className="flex items-center gap-4 text-xs font-semibold text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                      <span className="text-[#EE501C]">{food.rating}</span>
                    </div>
                    <span>•</span>
                    <span>{food.distance || '1.5'} km</span>
                    <span>•</span>
                    <span>{food.deliveryTime || '15-20 phút'}</span>
                  </div>

                  {food.promoTag && (
                    <div className="mb-4">
                      <span className="text-[10px] bg-orange-50 text-[#EE501C] font-bold px-2 py-0.5 rounded border border-orange-100 uppercase tracking-wider">
                        {food.promoTag}
                      </span>
                    </div>
                  )}

                  <div className="flex items-end justify-between">
                    <div>
                       <span className="text-2xl font-black text-[#EE501C]">{food.price.toLocaleString()}đ</span>
                       {food.originalPrice && <span className="text-sm text-gray-300 line-through ml-2">{food.originalPrice.toLocaleString()}đ</span>}
                    </div>
                    <button className="bg-[#EE501C] text-white font-bold py-2.5 px-8 rounded-2xl shadow-lg shadow-orange-100 transform active:scale-95 transition-all">
                      Đặt ngay
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-[2rem] border border-dashed border-gray-200">
            <p className="text-gray-400 font-medium italic">Không tìm thấy món ăn phù hợp với từ khóa này.</p>
          </div>
        )}
      </div>

      {filteredFoods.length > 0 && (
        <div className="mt-12 flex justify-center">
          <button className="flex items-center gap-2 border border-gray-200 text-gray-500 font-bold py-3 px-10 rounded-2xl hover:bg-gray-50 transition-colors">
            Xem thêm kết quả <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};