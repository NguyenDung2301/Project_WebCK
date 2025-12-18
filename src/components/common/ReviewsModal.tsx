
import React, { useState } from 'react';
import { Star, MessageSquare, X, ChevronDown, ImageIcon } from 'lucide-react';
import { Modal } from './Modal';
import { Review } from '../../types';
import { cn } from '../../utils/cn';

interface ReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  rating: number | string;
  reviewCount: number;
  reviews: Review[];
}

export const ReviewsModal: React.FC<ReviewsModalProps> = ({ 
  isOpen, 
  onClose, 
  rating, 
  reviewCount, 
  reviews 
}) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const ratingDistribution = [
    { stars: 5, count: 192, percentage: 75 },
    { stars: 4, count: 38, percentage: 15 },
    { stars: 3, count: 12, percentage: 5 },
    { stars: 2, count: 5, percentage: 2 },
    { stars: 1, count: 9, percentage: 3 },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="2xl">
      <div className="-mx-8 -mt-8 mb-6 bg-white border-b border-gray-50 px-8 py-5 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600">
            <Star size={18} fill="currentColor" />
          </div>
          <h3 className="text-xl font-black text-gray-900 tracking-tight">Đánh giá & Nhận xét</h3>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-gray-50 rounded-full transition-colors">
          <X size={20} className="text-gray-400" />
        </button>
      </div>

      <div className="space-y-10">
        {/* Rating Summary Section */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 items-center">
          {/* Summary Box */}
          <div className="md:col-span-2 bg-white rounded-[40px] p-8 flex flex-col items-center justify-center text-center shadow-[0_20px_50px_-15px_rgba(249,115,22,0.1)] border border-primary-50/50">
            <span className="text-7xl font-black text-gray-900 mb-2">{rating}</span>
            <div className="flex gap-1 text-yellow-400 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} fill={i < Math.floor(Number(rating)) ? "currentColor" : "none"} strokeWidth={2.5} />
              ))}
            </div>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">{reviewCount} đánh giá</p>
            <button className="w-full py-3.5 bg-primary-600 text-white font-black rounded-2xl hover:bg-primary-700 shadow-lg shadow-primary-200 transition-all active:scale-95 text-xs uppercase tracking-widest">
              Viết đánh giá
            </button>
          </div>

          {/* Distribution Bars */}
          <div className="md:col-span-3 space-y-3.5">
            {ratingDistribution.map((item) => (
              <div key={item.stars} className="flex items-center gap-4 group">
                <div className="flex items-center gap-1.5 min-w-[30px]">
                  <span className="text-sm font-black text-gray-900">{item.stars}</span>
                  <Star size={12} className="text-yellow-400" fill="currentColor" />
                </div>
                <div className="flex-1 h-2.5 bg-gray-50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary-500 rounded-full transition-all duration-1000 group-hover:bg-primary-600"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                <span className="text-xs font-bold text-gray-400 min-w-[25px] text-right">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2.5">
          <button 
            onClick={() => setActiveFilter('all')}
            className={cn(
              "px-6 py-2.5 rounded-full text-xs font-black transition-all border",
              activeFilter === 'all' 
              ? "bg-primary-600 text-white border-primary-600 shadow-lg shadow-primary-100" 
              : "bg-white text-gray-500 border-gray-100 hover:border-primary-200 hover:text-primary-600"
            )}
          >
            Tất cả
          </button>
          {[5, 4, 3, 2, 1].map((s) => (
            <button 
              key={s}
              onClick={() => setActiveFilter(s.toString())}
              className={cn(
                "px-6 py-2.5 rounded-full text-xs font-black transition-all border flex items-center gap-1.5",
                activeFilter === s.toString()
                ? "bg-primary-600 text-white border-primary-600 shadow-lg shadow-primary-100" 
                : "bg-white text-gray-500 border-gray-100 hover:border-primary-200 hover:text-primary-600"
              )}
            >
              {s} <Star size={12} fill={activeFilter === s.toString() ? "currentColor" : "none"} /> 
              <span className="opacity-40 ml-0.5">({ratingDistribution.find(d => d.stars === s)?.count})</span>
            </button>
          ))}
        </div>

        {/* Review List */}
        <div className="space-y-10 pb-4">
          {reviews.map((review) => (
            <div key={review._id} className="group animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gray-50 overflow-hidden border-2 border-white shadow-sm ring-1 ring-gray-100">
                    <img src={review.userAvatar || `https://ui-avatars.com/api/?name=${review.userName}`} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div>
                    <h4 className="font-black text-gray-900 leading-none mb-1.5">{review.userName}</h4>
                    <div className="flex gap-0.5 text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} fill={i < review.rating ? "currentColor" : "none"} strokeWidth={3} />
                      ))}
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
                  {new Date(review.createdAt).toLocaleDateString('vi-VN')} {new Date(review.createdAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed font-medium mb-4 pl-16">
                {review.comment}
              </p>
              {review.images && review.images.length > 0 && (
                <div className="flex gap-3 pl-16">
                  {review.images.map((img, i) => (
                    <div key={i} className="w-20 h-20 rounded-2xl overflow-hidden border border-gray-50 cursor-pointer hover:opacity-80 transition-opacity">
                      <img src={img} className="w-full h-full object-cover" alt="" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};
