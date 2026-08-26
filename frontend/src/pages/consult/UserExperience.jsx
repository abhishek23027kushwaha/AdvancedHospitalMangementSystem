import React, { useRef } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const UserExperience = () => {
  const scrollRef = useRef(null);

  const testimonials = [
    {
      name: "Anamika Bajpai",
      subtitle: "Anonymous",
      text: "Excellent experience consulting on Practo. I could solve my health issue without going to a clinic! Highly recommended!",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150"
    },
    {
      name: "Maitreyi Purohit",
      subtitle: "Anonymous",
      text: "I got answers to all my medical queries. I'll definitely recommend online consultations on Practo to others.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150"
    },
    {
      name: "Mr. Bismoy Murasing",
      subtitle: "Anonymous",
      text: "The consultation on Practo was great and I'm very happy with the experience. Would certainly ask other people to consult online.",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150"
    }
  ];

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 350, behavior: 'smooth' });
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -350, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-[#f8f9fa] py-16 border-b border-[#F0F0F5]">
      <div className="max-w-[1200px] mx-auto px-4 relative">
        
        {/* Header Section */}
        <div className="mb-10 text-left">
          <h2 className="text-[28px] font-bold text-[#414146] mb-1">
            What our users say about their online consultation experience
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          
          {/* Left Navigation Arrow */}
          <button 
            onClick={scrollLeft}
            className="absolute -left-5 top-[50%] -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.1)] flex items-center justify-center text-[#414146] hover:bg-gray-50 z-10 hidden md:flex border border-[#F0F0F5]"
            aria-label="Scroll Left"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Scrollable Area */}
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory py-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((item, idx) => (
              <div 
                key={idx} 
                className="flex-shrink-0 w-[300px] md:w-[350px] bg-white border border-[#F0F0F5] rounded-xl p-6 snap-start shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-shadow"
              >
                <div className="flex items-center gap-4 mb-4">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-[#F0F0F5] flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* User Details */}
                  <div className="flex flex-col text-left">
                    <h3 className="text-[15px] font-bold text-[#414146] mb-0.5">
                      {item.name}
                    </h3>
                    <p className="text-[13px] text-[#787887]">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-[14px] text-[#414146] leading-relaxed text-left">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          {/* Right Navigation Arrow */}
          <button 
            onClick={scrollRight}
            className="absolute -right-5 top-[50%] -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.1)] flex items-center justify-center text-[#414146] hover:bg-gray-50 z-10 hidden md:flex border border-[#F0F0F5]"
            aria-label="Scroll Right"
          >
            <ChevronRight size={20} />
          </button>

        </div>

      </div>
    </div>
  );
};

export default UserExperience;
