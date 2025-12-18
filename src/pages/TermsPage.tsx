
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { BackgroundElements } from '../components/common/BackgroundElements';
import { Logo } from '../components/common/Logo';

interface TermsPageProps {
  onBack: () => void;
  onHome: () => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onBack, onHome }) => {
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
            <h1 className="text-3xl sm:text-4xl font-bold text-primary-600 mb-2">Điều khoản dịch vụ</h1>
            <p className="text-gray-400 italic text-sm">Cập nhật lần cuối: 18/11/2025</p>
        </div>

        <div className="space-y-8 text-gray-600 leading-relaxed text-justify">
            <section>
                <h2 className="text-xl font-semibold text-primary-600 mb-3">1. Chấp nhận điều khoản</h2>
                <p>Bằng việc truy cập và sử dụng dịch vụ của chúng tôi, bạn đồng ý tuân thủ và bị ràng buộc bởi các điều khoản và điều kiện sau đây. Nếu bạn không đồng ý với bất kỳ phần nào của các điều khoản này, vui lòng không sử dụng dịch vụ của chúng tôi.</p>
            </section>

            <section>
                <h2 className="text-xl font-semibold text-primary-600 mb-3">2. Tài khoản người dùng</h2>
                <p className="mb-2">Khi tạo tài khoản, bạn phải:</p>
                <ul className="list-disc pl-5 space-y-2">
                    <li>Cung cấp thông tin chính xác, đầy đủ và cập nhật</li>
                    <li>Bảo mật thông tin đăng nhập và chịu trách nhiệm về mọi hoạt động dưới tài khoản của bạn</li>
                    <li>Không chia sẻ tài khoản của bạn với người khác</li>
                    <li>Đủ 18 tuổi hoặc có sự đồng ý của cha mẹ/người giám hộ hợp pháp</li>
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-semibold text-primary-600 mb-3">3. Quyền sở hữu trí tuệ</h2>
                <p>Tất cả nội dung, tính năng và chức năng của dịch vụ (bao gồm nhưng không giới hạn ở văn bản, đồ họa, logo, biểu tượng, hình ảnh, video, âm thanh và phần mềm) thuộc sở hữu của chúng tôi và được bảo vệ bởi luật bản quyền, thương hiệu và các luật sở hữu trí tuệ khác.</p>
            </section>

            <section>
                <h2 className="text-xl font-semibold text-primary-600 mb-3">4. Hành vi bị cấm</h2>
                <p className="mb-2">Khi sử dụng dịch vụ, bạn đồng ý KHÔNG:</p>
                <ul className="list-disc pl-5 space-y-2">
                    <li>Vi phạm bất kỳ luật hoặc quy định hiện hành nào</li>
                    <li>Gửi hoặc truyền tải bất kỳ nội dung vi phạm pháp luật, có hại, đe dọa, lạm dụng, quấy rối</li>
                    <li>Sử dụng dịch vụ cho mục đích thương mại trái phép</li>
                    <li>Can thiệp hoặc làm gián đoạn hoạt động của dịch vụ</li>
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-semibold text-primary-600 mb-3">5. Chấm dứt dịch vụ</h2>
                <p>Chúng tôi có quyền chấm dứt hoặc đình chỉ quyền truy cập của bạn vào dịch vụ ngay lập tức, không cần thông báo trước hoặc chịu trách nhiệm pháp lý, vì bất kỳ lý do gì, bao gồm nhưng không giới hạn ở việc vi phạm các Điều khoản dịch vụ này.</p>
            </section>

            <section>
                <h2 className="text-xl font-semibold text-primary-600 mb-3">10. Liên hệ</h2>
                <p className="mb-4">Nếu bạn có bất kỳ câu hỏi nào về Điều khoản dịch vụ này, vui lòng liên hệ với chúng tôi qua:</p>
                <div className="bg-gradient-to-br from-orange-50 to-red-50 border-l-4 border-primary-600 p-6 rounded-r-xl">
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
