import React from 'react';
import { MOCK_FAVORITES } from '../constants';
import { Star, Heart, Store } from 'lucide-react';

const Favorites: React.FC = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold text-gray-800">Món yêu thích ({MOCK_FAVORITES.length})</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_FAVORITES.map(item => (
          <div key={item.id} className="bg-white rounded-2xl shadow-sm p-4 hover:shadow-md transition-shadow">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 group">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
              <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow text-primary-500 hover:scale-110 transition-transform">
                <Heart size={16} fill="currentColor" />
              </button>
              <div className="absolute bottom-3 left-3 bg-white px-2 py-1 rounded-lg shadow flex items-center gap-1 text-xs font-bold text-orange-500">
                <Star size={12} fill="currentColor" />
                <span>{item.rating}</span>
              </div>
            </div>

            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-bold text-gray-800 text-lg leading-tight">{item.name}</h3>
                <div className="flex items-center gap-1 text-gray-500 text-xs mt-1">
                    <Store size={12} />
                    <span>{item.shopName}</span>
                </div>
              </div>
              <span className="font-bold text-primary-500">{formatCurrency(item.price)}</span>
            </div>

            <button className="w-full mt-3 bg-primary-50 hover:bg-primary-100 text-primary-600 font-semibold py-2 rounded-lg transition-colors text-sm">
              Đặt ngay
            </button>
          </div>
        ))}
      </div>
       <div className="flex justify-center mt-4">
            <button className="text-gray-400 text-sm flex items-center gap-1 hover:text-gray-600">
                Xem thêm
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
        </div>
    </div>
  );
};

export default Favorites;