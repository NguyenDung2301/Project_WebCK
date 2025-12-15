import React from 'react';
import { ChevronDown, Star, Heart, MapPin, Clock } from 'lucide-react';
import { SEARCH_RESULTS } from '../constants';
import { Link } from 'react-router-dom';

export const SearchResults: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
           <div>
             <span className="text-xs text-orange-500 font-bold uppercase tracking-wider">Kết quả tìm kiếm</span>
             <h1 className="text-3xl font-bold text-gray-900 mt-1">"Cơm tấm"</h1>
           </div>
           <span className="text-sm text-gray-500">Tìm thấy <span className="font-bold text-gray-900">124</span> kết quả</span>
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
           <button className="px-4 py-1.5 bg-orange-500 text-white rounded-full text-sm font-medium whitespace-nowrap hover:bg-orange-600 transition-colors">Tất cả</button>
           <button className="px-4 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-full text-sm font-medium whitespace-nowrap flex items-center gap-1 hover:border-orange-500 hover:text-orange-500 transition-colors">
             Giá <ChevronDown className="w-3 h-3" />
           </button>
           <button className="px-4 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-full text-sm font-medium whitespace-nowrap flex items-center gap-1 hover:border-orange-500 hover:text-orange-500 transition-colors">
             Đánh giá <ChevronDown className="w-3 h-3" />
           </button>
           <button className="px-4 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-full text-sm font-medium whitespace-nowrap flex items-center gap-1 hover:border-orange-500 hover:text-orange-500 transition-colors">
             Thời gian giao <ChevronDown className="w-3 h-3" />
           </button>
           <button className="px-4 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-full text-sm font-medium whitespace-nowrap flex items-center gap-1 hover:border-orange-500 hover:text-orange-500 transition-colors">
             Ưu đãi <ChevronDown className="w-3 h-3" />
           </button>
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
         {SEARCH_RESULTS.map(item => (
           <Link to={`/product/${item.id}`} key={item.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4 hover:shadow-md transition-all group">
             <div className="sm:w-48 h-32 flex-shrink-0 relative rounded-lg overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                {item.discount && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                    {item.discount}
                  </div>
                )}
             </div>
             
             <div className="flex-1">
               <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">{item.name}</h3>
                    <p className="text-xs text-gray-500 mb-2 truncate max-w-xs md:max-w-md">{item.tags.join(', ')}</p>
                  </div>
                  <button className="text-gray-400 hover:text-red-500 transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
               </div>

               <div className="flex items-center gap-4 text-xs text-gray-600 mb-3">
                  <div className="flex items-center gap-1 text-orange-500 font-bold">
                     <Star className="w-3 h-3 fill-current" /> {item.rating}
                  </div>
                  <div className="flex items-center gap-1">
                     <MapPin className="w-3 h-3" /> {item.distance}
                  </div>
                  <div className="flex items-center gap-1">
                     <Clock className="w-3 h-3" /> {item.time}
                  </div>
               </div>

               <div className="flex justify-between items-end pt-2 border-t border-gray-50">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-500 font-medium bg-gray-100 px-1.5 py-0.5 rounded inline-block w-max">Freeship</span>
                    <span className="text-lg font-bold text-orange-600 mt-1">
                        {item.name.includes("Phúc Lộc Thọ") ? '42.000đ' : item.name.includes("Ba Ghiền") ? '65.000đ' : '55.000đ'}
                    </span>
                  </div>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-4 py-2 rounded-full transition-colors">
                    Đặt ngay
                  </button>
               </div>
             </div>
           </Link>
         ))}
      </div>

      <div className="mt-8 text-center">
        <button className="bg-white border border-gray-200 text-gray-600 font-medium py-2 px-6 rounded-full hover:bg-gray-50 transition-colors flex items-center gap-2 mx-auto">
          Xem thêm kết quả <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};