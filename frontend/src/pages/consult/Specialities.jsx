import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const Specialities = () => {
  const scrollRef = useRef(null);

  const specialitiesData = [
    {
      title: "General physician",
      price: "₹799",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200&h=200",
      link: "/doctors?specialty=General"
    },
    {
      title: "Dermatology",
      price: "₹799",
      image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=200&h=200",
      link: "/doctors?specialty=Dermatology"
    },
    {
      title: "Psychiatry",
      price: "₹799",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200",
      link: "/doctors?specialty=Psychiatry"
    },
    {
      title: "Stomach and digestion",
      price: "₹749",
      image: "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&q=80&w=200&h=200",
      link: "/doctors?specialty=Gastroenterologist"
    },
    {
      title: "Pediatrics",
      price: "₹899",
      image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=200&h=200",
      link: "/doctors?specialty=Pediatrician"
    },
    {
      title: "Urology",
      price: "₹799",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=200&h=200",
      link: "/doctors?specialty=Urology"
    }
  ];

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-white py-16 border-b border-[#F0F0F5]">
      <div className="max-w-[1200px] mx-auto px-4 relative">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h2 className="text-[28px] font-bold text-[#414146] mb-1">
              25+ Specialities
            </h2>
            <p className="text-[15px] text-[#787887]">
              Consult with top doctors across specialities
            </p>
          </div>
          <Link 
            to="/doctors"
            className="px-6 py-2 border border-[#d3d3d3] text-[#414146] text-[14px] font-bold rounded hover:bg-gray-50 transition-colors inline-block no-underline whitespace-nowrap self-start md:self-auto"
          >
            See all Specialities
          </Link>
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          
          {/* Left Navigation Arrow */}
          <button 
            onClick={scrollLeft}
            className="absolute -left-5 top-[110px] w-10 h-10 bg-white rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.1)] flex items-center justify-center text-[#414146] hover:bg-gray-50 z-10 hidden md:flex border border-[#F0F0F5]"
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
            {specialitiesData.map((item, idx) => (
              <div 
                key={idx} 
                className="flex-shrink-0 w-[180px] flex flex-col items-center bg-white border border-[#F0F0F5] rounded-xl p-6 snap-start shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-shadow"
              >
                {/* Circular Image */}
                <div className="w-[110px] h-[110px] rounded-full overflow-hidden bg-[#f4f2f8] mb-5 flex items-center justify-center p-2">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                
                {/* Text Content */}
                <h3 className="text-[15px] font-bold text-[#414146] mb-2 text-center h-[45px] flex items-center justify-center">
                  {item.title}
                </h3>
                <p className="text-[13px] text-[#787887] font-medium mb-3">
                  {item.price}
                </p>
                <Link 
                  to={item.link}
                  className="text-[14px] font-bold text-[#00B8E6] flex items-center gap-1 hover:text-[#0096bf] transition-colors no-underline"
                >
                  Consult now <ChevronRight size={14} />
                </Link>
              </div>
            ))}
          </div>

          {/* Right Navigation Arrow */}
          <button 
            onClick={scrollRight}
            className="absolute -right-5 top-[110px] w-10 h-10 bg-white rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.1)] flex items-center justify-center text-[#414146] hover:bg-gray-50 z-10 hidden md:flex border border-[#F0F0F5]"
            aria-label="Scroll Right"
          >
            <ChevronRight size={20} />
          </button>

        </div>

      </div>
    </div>
  );
};

export default Specialities;
