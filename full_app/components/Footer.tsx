
import React from 'react';

// Custom Burger Icon matching the Logo style
const BurgerIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M4 11C4 7.13401 7.13401 4 11 4H13C16.866 4 20 7.13401 20 11H4Z" 
      fill="currentColor"
    />
    <rect x="4" y="13" width="16" height="2" rx="1" fill="currentColor" />
    <path 
      d="M4 17H20V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V17Z" 
      fill="currentColor"
    />
  </svg>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#EE501C] text-white pt-16 pb-8 px-6 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-12 md:gap-8">
        {/* Brand & Social Section */}
        <div className="col-span-1 md:col-span-1 lg:col-span-2 space-y-6">
          <div className="flex items-center gap-3">
            {/* Logo restored for branding consistency across all pages */}
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#EE501C] shadow-lg shadow-black/10">
              <BurgerIcon className="w-6 h-6" />
            </div>
            <span className="text-2xl font-black tracking-tight">FoodDelivery</span>
          </div>
          <p className="text-orange-100 text-sm leading-relaxed max-w-xs">
            Nền tảng giao đồ ăn hàng đầu, mang hương vị đặc sắc của Việt Nam đến tận cửa nhà bạn một cách nhanh chóng và tiện lợi nhất.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#EE501C] transition-all">
              <span className="font-bold">f</span>
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#EE501C] transition-all">
              <span className="font-bold">in</span>
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#EE501C] transition-all">
              <span className="font-bold">t</span>
            </a>
          </div>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="font-bold mb-6 text-sm uppercase tracking-widest text-white/90">Công ty</h3>
          <ul className="space-y-4 text-sm">
            <li><a href="#" className="text-orange-100 hover:text-white transition-colors">Về chúng tôi</a></li>
            <li><a href="#" className="text-orange-100 hover:text-white transition-colors">Tuyển dụng</a></li>
            <li><a href="#" className="text-orange-100 hover:text-white transition-colors">Blog ẩm thực</a></li>
            <li><a href="#" className="text-orange-100 hover:text-white transition-colors">Báo chí</a></li>
          </ul>
        </div>

        {/* Business Links */}
        <div>
          <h3 className="font-bold mb-6 text-sm uppercase tracking-widest text-white/90">Đối tác</h3>
          <ul className="space-y-4 text-sm">
            <li><a href="#" className="text-orange-100 hover:text-white transition-colors">Mở quán trên FoodDelivery</a></li>
            <li><a href="#" className="text-orange-100 hover:text-white transition-colors">Trở thành tài xế</a></li>
            <li><a href="#" className="text-orange-100 hover:text-white transition-colors">FoodDelivery for Work</a></li>
            <li><a href="#" className="text-orange-100 hover:text-white transition-colors">Quảng cáo quán ăn</a></li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h3 className="font-bold mb-6 text-sm uppercase tracking-widest text-white/90">Hỗ trợ</h3>
          <ul className="space-y-4 text-sm">
            <li><a href="#" className="text-orange-100 hover:text-white transition-colors">Trung tâm trợ giúp</a></li>
            <li><a href="#" className="text-orange-100 hover:text-white transition-colors">Chính sách bảo mật</a></li>
            <li><a href="#" className="text-orange-100 hover:text-white transition-colors">Điều khoản dịch vụ</a></li>
            <li><a href="#" className="text-orange-100 hover:text-white transition-colors">Phí dịch vụ & Giao hàng</a></li>
          </ul>
        </div>
      </div>

      {/* App Stores & Bottom Info */}
      <div className="max-w-7xl mx-auto border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex items-center gap-3">
            <p className="text-[11px] text-orange-200 font-medium">© 2025 FoodDelivery Việt Nam. Một sản phẩm của TechFoods.</p>
          </div>
          <div className="flex gap-4">
            <img 
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" 
              alt="App Store" 
              className="h-8 cursor-pointer hover:opacity-80 transition-opacity" 
            />
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
              alt="Play Store" 
              className="h-8 cursor-pointer hover:opacity-80 transition-opacity" 
            />
          </div>
        </div>
        <div className="flex gap-6 text-[11px] text-orange-200 font-bold uppercase tracking-tighter">
          <a href="#" className="hover:text-white transition-colors">Hà Nội</a>
          <a href="#" className="hover:text-white transition-colors">TP. HCM</a>
          <a href="#" className="hover:text-white transition-colors">Đà Nẵng</a>
          <a href="#" className="hover:text-white transition-colors">Cần Thơ</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
