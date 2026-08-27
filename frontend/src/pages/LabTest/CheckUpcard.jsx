import React from 'react';

const CheckUpCard = ({ discount, image, testsCount, title, ageGroup, currentPrice, originalPrice }) => {
  return (
    <div className="min-w-[260px] max-w-[260px] md:min-w-[280px] md:max-w-[280px] flex-shrink-0 snap-start border border-[#e8e5ef] rounded-xl overflow-hidden flex flex-col bg-white shadow-sm hover:shadow-md transition-shadow">
      {/* Image Container */}
      <div className="relative h-44 bg-gray-100">
        <img 
          src={image || 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=600&q=80'} 
          alt={title} 
          className="w-full h-full object-cover" 
        />
        {discount && (
          <div className="absolute top-3 left-3 bg-[#0da432] text-white text-[11px] font-bold px-2 py-0.5 rounded">
            {discount}
          </div>
        )}
      </div>

      {/* Tests Count */}
      <div className="bg-[#fafafa] border-b border-[#f0f0f0] py-1.5 text-center text-[12px] text-[#787887] font-medium shadow-inner">
        Includes {testsCount} tests
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-bold text-[16px] text-[#2d2d32] leading-snug mb-1">{title}</h3>
        <p className="text-[12px] text-[#787887] mb-4">For Age:{ageGroup}</p>
        
        <div className="flex items-center gap-2 mb-5">
          <span className="font-bold text-[#0da432] text-[16px]">₹{currentPrice}</span>
          {originalPrice && (
            <span className="text-[13px] text-[#a0a0a0] line-through font-medium">₹{originalPrice}</span>
          )}
        </div>
        
        <div className="mt-auto">
          <button className="w-full py-2.5 text-center text-[#414146] font-semibold text-[14px] bg-white border border-[#d3d3d3] rounded-lg hover:bg-[#f4f2f8] transition-colors">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckUpCard;
