import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Droplet, Sparkles, Activity, Coffee, Heart } from 'lucide-react';

const Service = () => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const concerns = [
    { name: 'Diabetes', icon: <Droplet size={48} className="text-[#f56565]" />, bgColor: 'bg-[#e2e8f0]' },
    { name: 'Skin', icon: <Sparkles size={48} className="text-[#6b46c1]" />, bgColor: 'bg-[#e9d8fd]' },
    { name: 'Kidney', icon: <Activity size={48} className="text-[#d53f8c]" />, bgColor: 'bg-[#fbb6ce]' },
    { name: 'Digestion', icon: <Coffee size={48} className="text-[#dd6b20]" />, bgColor: 'bg-[#fbd38d]' },
    { name: 'Cancer', icon: <Heart size={48} className="text-[#3182ce]" />, bgColor: 'bg-[#bee3f8]' },
    { name: 'Bone', icon: <Activity size={48} className="text-[#805ad5]" />, bgColor: 'bg-[#e9d8fd]' },
    { name: 'Heart', icon: <Heart size={48} className="text-[#e53e3e]" />, bgColor: 'bg-[#fed7d7]' },
    { name: 'Liver', icon: <Activity size={48} className="text-[#38a169]" />, bgColor: 'bg-[#c6f6d5]' },
  ];

  return (
    <div className="w-full bg-white py-8">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <h2 className="text-[20px] font-bold text-[#2d2d32] mb-6">Find Tests by Health Concern</h2>
        
        <div className="relative group">
          {/* Left Arrow */}
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-md z-10 hidden md:flex hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft size={20} className="text-gray-600" />
          </button>

          {/* Scrollable Container */}
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-10 sm:gap-16 md:gap-24 pb-4 scrollbar-hide scroll-smooth px-2"
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
          >
            {concerns.map((concern, index) => (
              <div key={index} className="flex flex-col items-center gap-4 cursor-pointer shrink-0">
                <div className={`w-32 h-32 rounded-full ${concern.bgColor} flex items-center justify-center transition-transform hover:scale-105 shadow-sm`}>
                  {concern.icon}
                </div>
                <span className="text-[14px] font-semibold text-[#2d2d32]">
                  {concern.name}
                </span>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-md z-10 hidden md:flex hover:bg-gray-50 transition-colors"
          >
            <ChevronRight size={20} className="text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Service;
