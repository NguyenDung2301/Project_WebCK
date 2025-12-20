import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getPromotionsApi } from '../../api/productApi';

export const PromoSection: React.FC = () => {
  const navigate = useNavigate();
  const [promotions, setPromotions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPromos = async () => {
      try {
        const data = await getPromotionsApi();
        setPromotions(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPromos();
  }, []);

  const handlePromoClick = (foodId: string) => {
    navigate(`/product/${foodId}`);
  };

  if (loading) return <div className="h-60 flex items-center justify-center text-gray-400">Đang tải khuyến mãi...</div>;

  return (
    <section className="px-4 md:px-10 pb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          FoodDelivery Promotion in <span className="text-[#EE501C]">Hanoi</span>
        </h2>
        <div className="flex gap-2">
          <button className="p-1 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"><ChevronLeft className="w-4 h-4 text-gray-400" /></button>
          <button className="p-1 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"><ChevronRight className="w-4 h-4 text-gray-400" /></button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {promotions.map((promo) => (
          <div 
            key={promo.id} 
            onClick={() => handlePromoClick(promo.foodId)}
            className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
          >
            <div className="relative h-44 overflow-hidden">
              <img src={promo.image} alt={promo.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <span className="absolute top-3 left-3 bg-yellow-400 text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 shadow-sm">
                <span className="text-xs">🏷️</span> PROMO
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-800 truncate mb-1">{promo.name}</h3>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-400 uppercase tracking-tight font-bold">{promo.vendor}</span>
                <span className="text-xs font-bold text-[#EE501C] group-hover:underline">{promo.action}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};