import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil } from 'lucide-react';
import paymentBanner from '../assets/payment_banner.png';

const BookingSummary = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-helveticaNeue pb-20">
      
      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="text-[13px] text-gray-500 mb-4 flex items-center gap-1">
            <span onClick={() => navigate('/')} className="text-blue-600 cursor-pointer hover:underline">Home</span>
            <span>&gt;</span>
            <span>Booking Summary</span>
          </div>
          <h1 className="text-[36px] font-bold text-black">Booking Summary</h1>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 mt-8 flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Left Column - Details */}
        <div className="w-full lg:w-[400px] flex flex-col gap-4">
          
          {/* Time Slot Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex items-center justify-between">
            <span className="text-[15px] font-bold text-black">Time Slot</span>
            <div className="flex items-center gap-3">
              <span className="text-[14px] text-black">01 Sep | 13:30 PM</span>
              <button 
                onClick={() => navigate(-1)}
                className="flex items-center gap-1 text-[#004f9e] font-medium text-[14px] hover:underline"
              >
                <Pencil size={14} /> Edit
              </button>
            </div>
          </div>

          {/* Coupon Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex items-center justify-between">
            <span className="text-[15px] font-bold text-black">Coupon</span>
            <button className="text-[#004f9e] font-medium text-[14px] hover:underline underline-offset-2">
              Apply Coupons
            </button>
          </div>

          {/* Payment Details Card */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-5 flex flex-col gap-4">
              <h3 className="text-[15px] font-bold text-black">Payment Details</h3>
              
              <div className="flex justify-between items-center text-[14px]">
                <span className="text-gray-500">Registration Fees</span>
                <span className="text-black font-bold">₹ 300</span>
              </div>
              
              <div className="flex justify-between items-center text-[14px]">
                <span className="text-gray-500">Consultation Fees</span>
                <span className="text-black font-bold">₹ 900</span>
              </div>
            </div>
            
            <div className="bg-[#eff4fa] p-5 flex justify-between items-center border-t border-gray-100">
              <span className="text-[15px] text-black font-medium">Total Fees</span>
              <span className="text-[16px] text-black font-bold">₹ 1,200</span>
            </div>
          </div>

        </div>

        {/* Right Column - Banner */}
        <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-[20px] font-medium text-black mb-6">Benefits Of Paying Online</h3>
          <div className="w-full rounded-xl overflow-hidden shadow-sm">
            <img 
              src={paymentBanner} 
              alt="Benefits of paying online" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#004f9e] py-4 px-6 md:px-[20%] flex items-center justify-between shadow-[0_-4px_10px_rgba(0,0,0,0.1)] z-40">
        <div className="flex flex-col">
          <span className="text-white/90 text-[15px] font-medium">Total Fees</span>
          <span className="text-white text-[22px] font-black tracking-wide">₹ 1,200</span>
        </div>
        <button className="bg-white text-[#004f9e] px-10 py-2.5 rounded font-bold text-[16px] hover:bg-gray-100 transition-colors shadow-sm">
          Pay Online
        </button>
      </div>

    </div>
  );
};

export default BookingSummary;
