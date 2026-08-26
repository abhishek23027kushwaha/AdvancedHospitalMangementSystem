import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const CommonHealth = () => {
  const scrollRef = useRef(null);

  const concernsData = [
    {
      title: "Skin problems?",
      price: "₹ 799",
      image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=400&h=300",
      link: "/doctors?specialty=Dermatology"
    },
    {
      title: "Depression or anxiety?",
      price: "₹ 799",
      image: "https://images.unsplash.com/photo-1493836512294-502baa1986e2?auto=format&fit=crop&q=80&w=400&h=300",
      link: "/doctors?specialty=Psychiatry"
    },
    {
      title: "Want to lose weight?",
      price: "₹ 700",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=400&h=300",
      link: "/doctors?specialty=Dietitian"
    },
    {
      title: "Stomach issues?",
      price: "₹ 799",
      image: "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&q=80&w=400&h=300",
      link: "/doctors?specialty=Gastroenterologist"
    },
    {
      title: "Cough and Cold?",
      price: "₹ 799",
      image: "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?auto=format&fit=crop&q=80&w=400&h=300",
      link: "/doctors?specialty=General"
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
    <div className="w-full bg-white py-16 border-b border-[#F0F0F5]">
      <div className="max-w-[1200px] mx-auto px-4 relative">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h2 className="text-[28px] font-bold text-[#414146] mb-1">
              Common Health Concerns
            </h2>
            <p className="text-[15px] text-[#787887]">
              Consult a doctor online for any health issue
            </p>
          </div>
          <Link 
            to="/doctors"
            className="px-6 py-2 border border-[#d3d3d3] text-[#414146] text-[14px] font-bold rounded hover:bg-gray-50 transition-colors inline-block no-underline whitespace-nowrap self-start md:self-auto"
          >
            See All Symptoms
          </Link>
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          
          {/* Left Navigation Arrow */}
          <button 
            onClick={scrollLeft}
            className="absolute -left-5 top-[125px] w-10 h-10 bg-white rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.1)] flex items-center justify-center text-[#414146] hover:bg-gray-50 z-10 hidden md:flex border border-[#F0F0F5]"
            aria-label="Scroll Left"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Scrollable Area */}
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {concernsData.map((item, idx) => (
              <div 
                key={idx} 
                className="flex-shrink-0 w-[270px] flex flex-col bg-white border border-[#F0F0F5] rounded-xl overflow-hidden snap-start shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-shadow"
              >
                {/* Image */}
                <div className="w-full h-[180px] overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                
                {/* Text Content */}
                <div className="p-5 flex flex-col items-start text-left">
                  <h3 className="text-[16px] font-bold text-[#414146] mb-1">
                    {item.title}
                  </h3>
                  <p className="text-[14px] text-[#787887] font-medium mb-4">
                    {item.price}
                  </p>
                  <Link 
                    to={item.link}
                    className="text-[14px] font-bold text-[#00B8E6] flex items-center gap-1 hover:text-[#0096bf] transition-colors no-underline"
                  >
                    Consult Now <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Right Navigation Arrow */}
          <button 
            onClick={scrollRight}
            className="absolute -right-5 top-[125px] w-10 h-10 bg-white rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.1)] flex items-center justify-center text-[#414146] hover:bg-gray-50 z-10 hidden md:flex border border-[#F0F0F5]"
            aria-label="Scroll Right"
          >
            <ChevronRight size={20} />
          </button>

        </div>

      </div>
    </div>
  );
};

export default CommonHealth;
