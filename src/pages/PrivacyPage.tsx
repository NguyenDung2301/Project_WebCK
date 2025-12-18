
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { BackgroundElements } from '../components/common/BackgroundElements';
import { Logo } from '../components/common/Logo';

interface PrivacyPageProps {
  onBack: () => void;
  onHome: () => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onBack, onHome }) => {
  return (
    <div className="min-h-screen bg-white px-4 pt-28 pb-10 font-sans relative overflow-hidden">
       {/* Global Logo */}
       <div className="absolute top-6 left-6 z-20">
        <Logo onClick={onHome} />
      </div>

      <BackgroundElements />

      <div className="max-w-[800px] mx-auto bg-white/70 backdrop-blur-md rounded-[40px] shadow-sm p-8 sm:p-12 relative border border-gray-100 z-10">
        
        {/* Back Arrow inside Card */}
        <button 
          onClick={onBack} 
          className="absolute top-6 left-6 text-gray-400 hover:text-primary-600 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>

        <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-primary-600 mb-2">Chính sách bảo mật</h1>
            <p className="text-gray-400 italic text-sm">Cập nhật lần cuối: 18/11/2025</p>
        </div>

        <div className="space-y-8 text-gray-600 leading-relaxed">
            <section>
                <h2 className="text-xl font-semibold text-primary-600 mb-3">1. Giới thiệu</h2>
                <p>Chúng tôi cam kết bảo vệ quyền riêng tư và thông tin cá nhân của bạn. Chính sách bảo mật này giải thích cách chúng tôi thu thập, sử dụng, tiết lộ và bảo vệ thông tin của bạn khi bạn sử dụng dịch vụ của chúng tôi.</p>
            </section>

            <section>
                <h2 className="text-xl font-semibold text-primary-600 mb-3">2. Thông tin chúng tôi thu thập</h2>
                
                <h3 className="text-lg font-semibold text-primary-400 mt-4 mb-2">2.1. Thông tin bạn cung cấp</h3>
                <ul className="list-disc pl-5 space-y-2 mb-4">
                    <li><strong className="text-primary-600">Thông tin tài khoản:</strong> Họ tên, địa chỉ email, mật khẩu (được mã hóa)</li>
                    <li><strong className="text-primary-600">Thông tin hồ sơ:</strong> Ảnh đại diện, thông tin cá nhân tùy chọn</li>
                    <li><strong className="text-primary-600">Nội dung:</strong> Tin nhắn, bình luận, và nội dung khác bạn tạo ra hoặc chia sẻ</li>
                </ul>

                <h3 className="text-lg font-semibold text-primary-400 mt-4 mb-2">2.2. Thông tin tự động thu thập</h3>
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong className="text-primary-600">Thông tin thiết bị:</strong> Loại thiết bị, hệ điều hành, trình duyệt</li>
                    <li><strong className="text-primary-600">Dữ liệu sử dụng:</strong> Thời gian truy cập, các trang đã xem, thời gian sử dụng</li>
                    <li><strong className="text-primary-600">Cookies:</strong> Dữ liệu được lưu trữ thông qua cookies và công nghệ tương tự</li>
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-semibold text-primary-600 mb-3">3. Cách chúng tôi sử dụng thông tin</h2>
                <p className="mb-2">Chúng tôi sử dụng thông tin của bạn để:</p>
                <ul className="list-disc pl-5 space-y-2">
                    <li>Cung cấp, duy trì và cải thiện dịch vụ của chúng tôi</li>
                    <li>Xử lý giao dịch và gửi thông báo liên quan</li>
                    <li>Gửi thông tin cập nhật, bảo mật và hỗ trợ</li>
                    <li>Phát hiện, ngăn chặn và giải quyết các vấn đề kỹ thuật</li>
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-semibold text-primary-600 mb-3">10. Liên hệ</h2>
                <p className="mb-4">Nếu bạn có bất kỳ câu hỏi nào về Chính sách bảo mật này, vui lòng liên hệ với chúng tôi qua:</p>
                <div className="bg-primary-50 border-l-4 border-primary-600 p-6 rounded-r-xl">
                    <ul className="space-y-2 text-gray-700">
                        <li><strong className="text-primary-600">Email:</strong> tphong081105@gmail.com</li>
                        <li><strong className="text-primary-600">Điện thoại:</strong> (84) 123-456-789</li>
                        <li><strong className="text-primary-600">Địa chỉ:</strong> 334 Nguyễn Trãi, Hà Nội, Việt Nam</li>
                    </ul>
                </div>
            </section>
        </div>
      </div>
    </div>
  );
};
