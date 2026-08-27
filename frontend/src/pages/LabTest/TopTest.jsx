import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Zap } from 'lucide-react';

const TopTest = () => {
  const scrollRef = useRef(null);

  const tests = [
    { title: 'Complete Blood Count', price: 300, desc: 'Known as Complete Blood Count Automated Blood' },
    { title: 'Lipid Profile', price: 620, desc: 'Known as Lipid Profile Blood' },
    { title: 'Liver Function Test', price: 900, desc: 'Known as Liver Function Tests Blood' },
    { title: 'HbA1c', price: 300, desc: 'Known as Glycosylated Haemoglobin Blood' },
    { title: 'Vitamin B 12', price: 999, desc: 'Known as Vitamin B12 Conventional Blood' },
    { title: 'Thyroid Stimulating Hormone', price: 200, desc: 'Known as Thyroid Stimulating Hormone Blood' },
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full mt-12 mb-8">
      <div className="flex flex-col gap-3 mb-6">
        <h2 className="text-[22px] font-size-[82px] font-bold text-[#2d2d32]">Top Booked Diagnostic Tests</h2>
        <div className="inline-flex items-center gap-1.5 bg-[#eaf8e6] text-[#2c933a] px-3 py-1.5 rounded w-fit text-[13px] font-semibold">
          <Zap size={14} className="fill-current" />
          <span>Get reports within 24hrs</span>
        </div>
      </div>

      <div className="relative group">
        {/* Left Navigation Button */}
        <button 
          onClick={() => scroll('left')}
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-[34px] h-[34px] flex items-center justify-center bg-[#f4f2f8] border border-[#d3d3d3] rounded-full text-[#414146] hover:bg-[#e8e5ef] transition-colors hidden md:flex"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Scrollable Container */}
        <div 
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {tests.map((test, idx) => (
            <div key={idx} className="min-w-[220px] max-w-[220px] md:min-w-[240px] md:max-w-[240px] flex-shrink-0 snap-start border border-[#e8e5ef] rounded-lg overflow-hidden flex flex-col bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2 gap-2">
                  <h3 className="font-bold text-[15px] text-[#2d2d32] leading-snug">{test.title}</h3>
                  <span className="font-bold text-[#2c933a] shrink-0 text-[15px]">₹{test.price}</span>
                </div>
                <p className="text-[12px] text-[#787887] line-clamp-2 mt-1 leading-relaxed">{test.desc}</p>
              </div>
              <button className="w-full py-3.5 text-center text-[#00B8E6] font-bold text-[13px] bg-[o-f-color--plight] hover:bg-[#f0f4f8] transition-colors border-t border-[#e8e5ef]">
                ADD TO CART
              </button>
            </div>
          ))}
        </div>

        {/* Right Navigation Button */}
        <button 
          onClick={() => scroll('right')}
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-[34px] h-[34px] flex items-center justify-center bg-[#f4f2f8] border border-[#d3d3d3] rounded-full text-[#414146] hover:bg-[#e8e5ef] transition-colors hidden md:flex"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
      `}} />
    </div>
  );
};

export default TopTest;
