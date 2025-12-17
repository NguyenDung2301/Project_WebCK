import React from 'react';
import { Order } from '../types';
import { RefreshCw, Bike, Clock, X, CheckCircle, MapPin } from 'lucide-react';

interface OrderCardProps {
  order: Order;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const renderStatusBadge = () => {
    switch (order.status) {
      case 'pending':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-50 text-orange-600 border border-orange-100">
             <Clock className="w-3 h-3 mr-1" />
            {order.statusLabel || 'Đang chuẩn bị'}
          </span>
        );
      case 'delivering':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600 border border-blue-100">
             <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-1.5 animate-pulse" />
            Đang giao hàng
          </span>
        );
      case 'delivered':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-600 border border-green-100">
             <CheckCircle className="w-3 h-3 mr-1" />
            {order.statusLabel || 'Giao hàng thành công'}
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-600 border border-green-100">
            <CheckCircle className="w-3 h-3 mr-1" />
            Hoàn tất
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-500 border border-gray-200">
            <X className="w-3 h-3 mr-1" />
            Đã hủy
          </span>
        );
      default:
        return null;
    }
  };

  const renderButtons = () => {
    switch (order.status) {
      case 'rate_pending':
        return (
          <>
            <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
              Chi tiết
            </button>
            <button className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 shadow-sm shadow-orange-200 transition-colors">
              Đánh giá
            </button>
          </>
        );
      case 'pending':
        return (
          <>
            <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-1 transition-colors">
              <X className="w-4 h-4" />
              Huỷ đơn
            </button>
            <button className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 shadow-sm shadow-orange-200 transition-colors">
              Chi tiết
            </button>
          </>
        );
      case 'delivering':
        return (
          <>
            <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
              Chi tiết
            </button>
            <button className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 flex items-center gap-2 shadow-sm shadow-orange-200 transition-colors">
              <Bike className="w-4 h-4" />
              Theo dõi
            </button>
          </>
        );
      case 'completed':
      case 'cancelled':
        return (
          <>
            <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
              Chi tiết
            </button>
            <button className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 flex items-center gap-1 shadow-sm shadow-orange-200 transition-colors">
              <RefreshCw className="w-4 h-4" />
              Đặt lại
            </button>
          </>
        );
      case 'delivered':
        return (
           <>
            <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
              Chi tiết
            </button>
            <button className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 shadow-sm shadow-orange-200 transition-colors">
              Đã nhận hàng
            </button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-gray-100 mb-4 transition-all hover:shadow-md">
      {/* Header of the card */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2 sm:gap-0">
        <div className="flex items-start gap-4">
          <div className="relative flex-shrink-0">
             <img
              src={order.image}
              alt={order.restaurantName}
              className="w-20 h-20 rounded-lg object-cover border border-gray-100"
            />
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm border border-gray-100">
               <div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center text-[8px] text-white font-bold">
                 F
               </div>
            </div>
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900 line-clamp-1">{order.restaurantName}</h3>
            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {order.orderTime}
            </p>
            <p className="text-sm text-gray-600 mt-2 line-clamp-2">{order.description}</p>
          </div>
        </div>
        <div className="self-end sm:self-auto flex flex-col items-end gap-1">
           {renderStatusBadge()}
        </div>
      </div>

      <div className="h-px bg-gray-50 w-full my-3"></div>

      {/* Footer of the card */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex flex-col items-start">
            <span className="text-xs text-gray-400">Tổng thanh toán</span>
            <span className="text-lg font-bold text-orange-500">{order.totalPrice}</span>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          {renderButtons()}
        </div>
      </div>

      {/* Extra Tracking Info */}
      {order.deliveryEstimate && (
        <div className="mt-4 pt-3 border-t border-dashed border-gray-200 flex items-center gap-3 text-gray-600">
          <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
             <Bike className="w-4 h-4" />
          </div>
          <span className="text-sm">{order.deliveryEstimate}</span>
          <span className="ml-auto text-xs text-orange-500 font-medium cursor-pointer hover:underline">Liên hệ</span>
        </div>
      )}
    </div>
  );
};