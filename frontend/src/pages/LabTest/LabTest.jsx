import React from 'react';
import { ShoppingCart, MapPin, ChevronDown, Search, Phone, MessageCircle } from 'lucide-react';
import TopTest from './TopTest';
import PopularHealthCheckUp from './PopularHealthCheckUp';
import WorkFlow from './workFlow';
import Service from './Service';
import RecommendedCheckup from './RecommendedCheckup';
import BookWithUs from './BookWithUs';

const LabTest = () => {
  return (
    <div className="w-full bg-white text-left pt-15">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex flex-col gap-6 pb-10">
        
        {/* Top Header Row */}
        <div className="flex items-center justify-between">
          <h1 className="text-[32px] font-extrabold text-[#2d2d32]">
            Book Lab Tests Online
          </h1>
          
          <button className="flex items-center gap-2 px-5 py-2 border border-[#d3d3d3] rounded shadow-sm hover:bg-gray-50 transition-colors text-[14px] font-bold text-[#414146]">
            <ShoppingCart size={18} />
            Ca
          </button>
        </div>

        {/* Search and Action Row */}
        <div className="flex flex-col md:flex-row items-center gap-4">
          
          {/* Main Search Bar Container */}
          <div className="flex-1 w-full flex items-center bg-[#f4f2f8] rounded-full px-4 h-[56px] border border-transparent focus-within:border-[#00B8E6] transition-colors">
            
            {/* Location Selector */}
            <div className="flex items-center gap-2 px-2 cursor-pointer text-[#414146]">
              <MapPin size={18} className="text-[#00B8E6]" />
              <span className="text-[15px] font-bold">Mumbai</span>
              <ChevronDown size={16} className="text-[#787887]" />
            </div>

            {/* Divider */}
            <div className="h-[24px] w-[1px] bg-[#d3d3d3] mx-4"></div>

            {/* Search Input */}
            <input 
              type="text"
              placeholder="Search for tests, packages & profiles"
              className="flex-1 bg-transparent outline-none text-[15px] text-[#414146] placeholder:text-[#a0a0a0]"
            />

            {/* Search Icon */}
            <button className="p-2 text-[#414146] hover:text-[#00B8E6] transition-colors">
              <Search size={20} />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Book Via Call */}
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#25A5D8] hover:bg-[#1c92c0] text-white px-5 h-[48px] rounded-full font-bold text-[14px] transition-colors shadow-sm">
              Book Via Call
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-[#25A5D8]">
                <Phone size={14} fill="currentColor" />
              </div>
            </button>

            {/* Book Via Whatsapp */}
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#57C75C] hover:bg-[#49b04e] text-white px-5 h-[48px] rounded-full font-bold text-[14px] transition-colors shadow-sm">
              Book Via Whatsapp
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-[#57C75C]">
                <MessageCircle size={14} fill="currentColor" />
              </div>
            </button>
          </div>

        </div>

     

        {/* Top Diagnostic Tests Component */}
        <TopTest />

        {/* Popular Health Checkup Packages Component */}
        <PopularHealthCheckUp />

      </div>
        <WorkFlow/>
      < Service/>

      {/* Recommended Vital Checkups Component */}
      <RecommendedCheckup />

      {/* Why Book With Us Component */}
      <BookWithUs />
    </div>
  );
};

export default LabTest;
