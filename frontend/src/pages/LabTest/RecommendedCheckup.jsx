import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Activity, Droplet, Stethoscope } from 'lucide-react';

const RecommendedCheckup = () => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 350;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const checkups = [
    {
      id: 1,
      title: 'Liver Profile',
      tests: 'Gamma Glutamyl Transferase, Total Bilirubin +3Tests',
      icon: <Activity size={24} className="text-[#3b82f6]" />,
      iconBg: 'bg-[#eff6ff]',
    },
    {
      id: 2,
      title: 'Blood Sugar',
      tests: 'HbA1C, Fasting Blood Sugar +3Tests',
      icon: <Droplet size={24} className="text-[#ef4444]" />,
      iconBg: 'bg-[#fef2f2]',
    },
    {
      id: 3,
      title: 'Thyroid Profile',
      tests: 'TSH, T3 +3Tests',
      icon: <Stethoscope size={24} className="text-[#eab308]" />,
      iconBg: 'bg-[#fefce8]',
    },
    {
      id: 4,
      title: 'Lipid Profile',
      tests: 'Cholesterol, Triglycerides +4Tests',
      icon: <Activity size={24} className="text-[#8b5cf6]" />,
      iconBg: 'bg-[#f5f3ff]',
    }
  ];

  return (
    <div className="w-full bg-white py-8">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative group">
        <h2 className="text-[20px] font-bold text-[#2d2d32] mb-6">Recommended Vital Checkups</h2>
        
        {/* Left Arrow */}
        <button 
          onClick={() => scroll('left')}
          className="absolute left-2 top-[60%] -translate-y-1/2 w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-md z-10 hidden md:flex hover:bg-gray-50 transition-colors"
        >
          <ChevronLeft size={20} className="text-gray-600" />
        </button>

        {/* Scrollable Container */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide scroll-smooth px-1 snap-x snap-mandatory"
          style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
        >
          {checkups.map((checkup) => (
            <div 
              key={checkup.id} 
              className="flex flex-col justify-between min-w-[85%] sm:min-w-[calc((100%-16px)/2)] md:min-w-[calc((100%-32px)/3)] snap-start bg-white border border-gray-200 rounded-xl p-5 shrink-0 hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${checkup.iconBg}`}>
                    {checkup.icon}
                  </div>
                  <h3 className="text-[16px] font-bold text-[#2d2d32]">{checkup.title}</h3>
                </div>
                <p className="text-[13px] text-[#787887] leading-relaxed mb-6">
                  {checkup.tests}
                </p>
              </div>
              
              <div className="flex justify-end mt-auto">
                <button className="px-6 py-1.5 border border-gray-300 rounded-lg text-[14px] font-semibold text-[#414146] hover:bg-gray-50 transition-colors">
                  Book
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button 
          onClick={() => scroll('right')}
          className="absolute right-2 top-[60%] -translate-y-1/2 w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-md z-10 hidden md:flex hover:bg-gray-50 transition-colors"
        >
          <ChevronRight size={20} className="text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default RecommendedCheckup;
