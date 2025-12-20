import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, X, Camera, ChevronDown, Send, CheckCircle2 } from 'lucide-react';

const ReviewItem = ({ name, date, rating, comment, images }: { name: string, date: string, rating: number, comment: string, images?: string[] }) => (
  <div className="py-6 border-b border-gray-50 last:border-0 flex gap-4 items-start animate-in fade-in duration-500">
    {/* Avatar bên trái */}
    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-orange-50 overflow-hidden border border-orange-100 shrink-0">
      <img 
        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=fff7ed&color=ee501c&bold=true`} 
        alt={name} 
        className="w-full h-full object-cover"
      />
    </div>

    {/* Nội dung bên phải */}
    <div className="flex-1">
        <div className="flex justify-between items-start">
            <div>
                <h5 className="text-sm font-bold text-gray-900">{name}</h5>
                <div className="flex items-center gap-0.5 mt-0.5">
                    {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} />
                    ))}
                </div>
            </div>
            <span className="text-[10px] md:text-xs text-gray-400 font-medium">{date}</span>
        </div>

        <p className="text-sm text-gray-600 leading-relaxed mt-3 mb-3">{comment}</p>
        
        {images && images.length > 0 && (
        <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            {images.map((img, idx) => (
            <div key={idx} className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-gray-100 shadow-sm bg-gray-50 hover:opacity-90 transition-opacity cursor-pointer">
                <img src={img} alt={`Review ${idx}`} className="w-full h-full object-cover" />
            </div>
            ))}
        </div>
        )}
    </div>
  </div>
);

export const ReviewPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [showWriteForm, setShowWriteForm] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const ratingsDistribution = [
    { stars: 5, count: 192, percent: 75 },
    { stars: 4, count: 38, percent: 15 },
    { stars: 3, count: 12, percent: 5 },
    { stars: 2, count: 5, percent: 2 },
    { stars: 1, count: 9, percent: 3 },
  ];

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (userRating === 0) return;
    
    // Simulate API call
    setIsSubmitted(true);
    setTimeout(() => {
      setShowWriteForm(false);
      setIsSubmitted(false);
      setUserRating(0);
      setComment('');
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-10 animate-in fade-in zoom-in-95 duration-300 min-h-screen">
      <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden relative">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="bg-orange-100 p-1.5 rounded-lg">
                <Star className="w-4 h-4 text-[#EE501C] fill-[#EE501C]" />
            </div>
            <h1 className="text-lg font-bold text-gray-800">Đánh giá & Nhận xét</h1>
          </div>
          <button 
            onClick={() => navigate(-1)}
            className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 md:p-8">
          {/* Summary Section Container */}
          <div className="flex flex-col md:flex-row gap-8 mb-10">
            
            {/* Left: Score Card */}
            <div className="w-full md:w-[280px] bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 flex flex-col items-center justify-center text-center shrink-0">
              <div className="text-6xl font-black text-gray-900 mb-1 leading-none">4.8</div>
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <div className="text-xs text-gray-500 font-medium mb-6">256 đánh giá</div>
              
              <button 
                onClick={() => setShowWriteForm(true)}
                className="w-full bg-[#EE501C] text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-orange-100 hover:bg-[#d44719] transform active:scale-95 transition-all text-sm"
              >
                Viết đánh giá
              </button>
            </div>

            {/* Right: Distribution Bars */}
            <div className="flex-1 py-2 flex flex-col justify-center gap-3">
              {ratingsDistribution.map((item) => (
                <div key={item.stars} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-8 shrink-0">
                    <span className="text-sm font-bold text-gray-700">{item.stars}</span>
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  </div>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#EE501C] rounded-full transition-all duration-1000"
                      style={{ width: `${item.percent}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-medium text-gray-400 w-8 text-right shrink-0">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-gray-50 mb-8" />

          {/* Filter Tabs */}
          <div className="flex gap-3 mb-8 overflow-x-auto scrollbar-hide pb-2">
            <button 
              onClick={() => setActiveFilter('all')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap border ${activeFilter === 'all' ? 'bg-[#EE501C] text-white border-[#EE501C] shadow-md shadow-orange-100' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'}`}
            >
              Tất cả
            </button>
            <button 
              onClick={() => setActiveFilter('5')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap border ${activeFilter === '5' ? 'bg-white border-[#EE501C] text-[#EE501C]' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'}`}
            >
              5 ⭐ (192)
            </button>
            <button 
              onClick={() => setActiveFilter('4')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap border ${activeFilter === '4' ? 'bg-white border-[#EE501C] text-[#EE501C]' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'}`}
            >
              4 ⭐ (38)
            </button>
            <button 
              onClick={() => setActiveFilter('3')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap border ${activeFilter === '3' ? 'bg-white border-[#EE501C] text-[#EE501C]' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'}`}
            >
              3 ⭐ (12)
            </button>
          </div>

          {/* Reviews List */}
          <div className="space-y-2">
            <ReviewItem 
              name="Nguyễn Văn A"
              date="20/10/2023 18:30"
              rating={5}
              comment="Nước lèo rất đậm đà, thịt bò mềm và nhiều. Đóng gói cẩn thận, nước lèo để riêng nóng hổi. Sẽ ủng hộ dài dài!"
              images={[
                "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=200&h=200",
                "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=200&h=200"
              ]}
            />
            <ReviewItem 
              name="Trần Thị B"
              date="18/10/2023 12:15"
              rating={4}
              comment="Món ăn ngon nhưng shipper giao hơi chậm xíu. Bù lại đồ ăn vẫn còn nóng hổi, shop tặng kèm trà đá nữa."
            />
            <ReviewItem 
              name="Lê Văn C"
              date="15/10/2023 09:00"
              rating={1}
              comment="Giao sai món, gọi quán không bắt máy. Rất thất vọng về cách phục vụ."
            />
          </div>

          <div className="mt-8 pt-4 text-center">
             <button className="text-sm font-bold text-gray-400 hover:text-[#EE501C] transition-colors flex items-center justify-center gap-1 mx-auto">
               <ChevronDown className="w-4 h-4" />
             </button>
          </div>
        </div>
      </div>

      {/* Write Review Form Overlay/Modal */}
      {showWriteForm && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-gray-100">
            {isSubmitted ? (
              <div className="p-12 text-center flex flex-col items-center gap-4">
                <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-2 animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-gray-900">Đã gửi đánh giá!</h3>
                <p className="text-sm text-gray-400">Cảm ơn bạn đã đóng góp ý kiến cho sản phẩm này.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview}>
                <div className="px-6 py-5 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                  <h3 className="font-bold text-gray-800">Đánh giá của bạn</h3>
                  <button 
                    type="button"
                    onClick={() => setShowWriteForm(false)}
                    className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-400 hover:text-gray-600 shadow-sm transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-8 space-y-8">
                  {/* Rating Stars */}
                  <div className="flex flex-col items-center gap-3">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Sản phẩm này thế nào?</p>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setUserRating(star)}
                          className="focus:outline-none transition-transform active:scale-90"
                        >
                          <Star 
                            className={`w-10 h-10 transition-all ${
                              star <= (hoverRating || userRating) 
                                ? 'text-yellow-400 fill-yellow-400 scale-110 drop-shadow-sm' 
                                : 'text-gray-200'
                            }`} 
                          />
                        </button>
                      ))}
                    </div>
                    {userRating > 0 && (
                      <span className="text-sm font-bold text-[#EE501C] animate-in fade-in slide-in-from-bottom-2">
                        {userRating === 5 ? 'Tuyệt vời!' : userRating === 4 ? 'Hài lòng' : userRating === 3 ? 'Bình thường' : userRating === 2 ? 'Không hài lòng' : 'Rất tệ'}
                      </span>
                    )}
                  </div>

                  {/* Comment */}
                  <div className="space-y-2">
                    <textarea 
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Hãy chia sẻ trải nghiệm của bạn về món ăn này..."
                      rows={4}
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm focus:bg-white focus:ring-2 focus:ring-orange-50 focus:border-orange-200 outline-none transition-all resize-none"
                    ></textarea>
                  </div>

                  {/* Photo Upload Simulation */}
                  <div className="flex gap-3">
                    <button 
                      type="button"
                      className="w-16 h-16 rounded-xl border border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:text-[#EE501C] hover:border-orange-200 hover:bg-orange-50/50 transition-all gap-1"
                    >
                      <Camera className="w-5 h-5" />
                      <span className="text-[9px] font-bold">Thêm ảnh</span>
                    </button>
                  </div>

                  <button 
                    type="submit"
                    disabled={userRating === 0}
                    className={`w-full font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg ${
                      userRating === 0 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none' 
                        : 'bg-[#EE501C] text-white hover:bg-[#d44719] shadow-orange-100 active:scale-[0.98]'
                    }`}
                  >
                    <Send className="w-4 h-4" /> Gửi đánh giá
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};