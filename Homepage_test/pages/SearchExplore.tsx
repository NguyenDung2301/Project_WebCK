import React, { useState } from 'react';
import { Search, X, Clock, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { HISTORY_TAGS, SUGGESTED_RESTAURANTS } from '../constants';

export const SearchExplore: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('Cơm gà xối mỡ');

  const handleSearch = () => {
    navigate('/search');
  };

  return (
    <div className="container mx-auto px-4 py-8">
       {/* Big Search Input */}
       <div className="relative mb-8">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
             <Search className="w-5 h-5 text-orange-500" />
          </div>
          <input 
            type="text"
            className="w-full pl-12 pr-10 py-4 text-lg border-2 border-orange-100 rounded-full bg-white shadow-sm focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100/50 transition-all text-gray-800 placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            autoFocus
          />
          {searchTerm && (
            <button 
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600"
            >
                <X className="w-5 h-5 bg-gray-100 rounded-full p-0.5" />
            </button>
          )}
       </div>

       {/* History */}
       <div className="mb-10">
          <div className="flex justify-between items-center mb-4">
             <h3 className="font-bold text-gray-700 flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-500" /> Lịch sử tìm kiếm
             </h3>
             <button className="text-xs font-bold text-orange-500 hover:text-orange-600">Xóa tất cả</button>
          </div>
          <div className="flex flex-wrap gap-3">
             {HISTORY_TAGS.map((tag, idx) => (
               <button 
                key={idx} 
                className="px-4 py-2 bg-white border border-gray-100 rounded-full text-sm text-gray-600 hover:bg-gray-50 hover:border-gray-200 transition-colors flex items-center gap-2"
                onClick={handleSearch}
               >
                 <Clock className="w-3 h-3 text-gray-400" /> {tag} <X className="w-3 h-3 text-gray-300 ml-1 hover:text-gray-500" />
               </button>
             ))}
          </div>
       </div>

       {/* Suggestions */}
       <div>
          <h3 className="font-bold text-gray-700 flex items-center gap-2 mb-4">
             <Sparkles className="w-5 h-5 text-orange-500" /> Gợi ý cho bạn
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
             {SUGGESTED_RESTAURANTS.map(item => (
               <div 
                 key={item.id} 
                 className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-center gap-4 cursor-pointer"
                 onClick={() => navigate(`/product/${item.id}`)}
               >
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                  <div>
                     <h4 className="font-bold text-gray-800 text-sm mb-0.5">{item.name}</h4>
                     <p className="text-xs text-gray-500">{item.tags.join(', ')}</p>
                  </div>
               </div>
             ))}
          </div>
       </div>
    </div>
  );
};