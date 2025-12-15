import React from 'react';
import { Search, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { CATEGORIES, PROMO_RESTAURANTS } from '../constants';
import { Link, useNavigate } from 'react-router-dom';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="pb-10">
      {/* Hero Banner */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden bg-gray-200">
        <img 
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&h=800&fit=crop" 
          alt="Banner" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            <div className="w-2 h-2 rounded-full bg-white/50"></div>
            <div className="w-6 h-2 rounded-full bg-orange-500"></div>
            <div className="w-2 h-2 rounded-full bg-white/50"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-6 relative z-10">
        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-lg p-2 max-w-2xl mx-auto flex items-center mb-10">
           <div className="pl-3 pr-2">
             <div className="bg-gray-100 p-1 rounded-md border border-gray-200">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
             </div>
           </div>
           <div className="h-6 w-px bg-gray-200 mx-2"></div>
           <input 
             type="text" 
             placeholder="Tìm kiếm đồ ăn, quán ăn..." 
             className="flex-1 outline-none text-gray-700 placeholder-gray-400 text-sm"
             onFocus={() => navigate('/explore')}
           />
           <button 
             className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full ml-2 transition-colors"
             onClick={() => navigate('/explore')}
           >
             <Search className="w-5 h-5" />
           </button>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <div className="flex justify-between items-end mb-6">
             <h2 className="text-xl md:text-2xl font-bold text-gray-800">There's something for everyone!</h2>
             <div className="flex gap-2">
               <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"><ChevronLeft className="w-4 h-4 text-gray-600" /></button>
               <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"><ChevronRight className="w-4 h-4 text-gray-600" /></button>
             </div>
          </div>
          
          <div className="flex overflow-x-auto gap-4 md:gap-8 pb-4 no-scrollbar">
            {CATEGORIES.map(cat => (
              <div key={cat.id} className="flex-shrink-0 flex flex-col items-center gap-3 cursor-pointer group" onClick={() => navigate('/search')}>
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden shadow-md group-hover:shadow-lg transition-all duration-300">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <span className="font-medium text-gray-700 text-sm md:text-base">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Promotions */}
        <div>
          <div className="flex justify-between items-center mb-6">
             <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-1">
               FoodDelivery Promotion in <span className="text-orange-500">Hanoi</span>
             </h2>
             <div className="flex gap-2">
               <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"><ChevronLeft className="w-4 h-4 text-gray-600" /></button>
               <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"><ChevronRight className="w-4 h-4 text-gray-600" /></button>
             </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
             {PROMO_RESTAURANTS.map(promo => (
               <Link to={`/product/${promo.id}`} key={promo.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow overflow-hidden group">
                 <div className="relative h-48 overflow-hidden">
                   <img src={promo.image} alt={promo.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                   {promo.discount && (
                     <div className="absolute top-3 left-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded shadow-sm flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/50"></span> PROMO
                     </div>
                   )}
                 </div>
                 <div className="p-4">
                   <h3 className="font-bold text-gray-800 text-lg mb-1 truncate">{promo.name}</h3>
                   <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                     <span>FoodDelivery</span>
                   </div>
                   <div className="flex justify-between items-center pt-2 border-t border-gray-50">
                      <div className="text-orange-500 font-bold text-sm">{promo.discount}</div>
                   </div>
                 </div>
               </Link>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};