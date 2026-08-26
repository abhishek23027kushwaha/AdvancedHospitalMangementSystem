import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const InClinicConsultation = () => {
  const scrollRef = useRef(null);

  const specialties = [
    {
      title: "Dentist",
      subtitle: "Teething troubles? Schedule a dental checkup",
      image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=400&h=300",
      link: "/doctors?specialty=Dentist"
    },
    {
      title: "Gynecologist/Obstetrician",
      subtitle: "Explore for women's health, pregnancy and infertility treatments",
      image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=400&h=300",
      link: "/doctors?specialty=Gynecologist"
    },
    {
      title: "Dietitian/Nutrition",
      subtitle: "Get guidance on eating right, weight management and sports nutrition",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=400&h=300",
      link: "/doctors?specialty=Dietitian"
    },
    {
      title: "Physiotherapist",
      subtitle: "Pulled a muscle? Get it treated by a trained physiotherapist",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=400&h=300",
      link: "/doctors?specialty=Physiotherapist"
    },
    {
      title: "General physician",
      subtitle: "Find the right family doctor for general health issues",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400&h=300",
      link: "/doctors?specialty=General"
    }
  ];

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-white py-12">
      <div className="max-w-[1200px] mx-auto px-4 relative">
        
        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-[26px] font-bold text-[#414146] mb-1">
            Book an appointment for an in-clinic consultation
          </h2>
          <p className="text-[14px] text-[#787887]">
            Find experienced doctors across all specialties
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          {/* Scrollable Area */}
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {specialties.map((item, idx) => (
              <Link 
                to={item.link} 
                key={idx} 
                className="flex-shrink-0 w-[280px] flex flex-col group cursor-pointer no-underline snap-start"
              >
                {/* Image */}
                <div className="w-full h-[200px] rounded-xl overflow-hidden mb-4">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                
                {/* Text Content */}
                <div>
                  <h3 className="text-[16px] font-bold text-[#414146] mb-1 group-hover:text-[#00B8E6] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[13px] text-[#787887] leading-snug">
                    {item.subtitle}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Right Navigation Arrow */}
          <button 
            onClick={scrollRight}
            className="absolute -right-5 top-[80px] w-12 h-12 bg-white rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.15)] flex items-center justify-center text-[#414146] hover:bg-gray-50 z-10 hidden md:flex"
            aria-label="Scroll Right"
          >
            <ChevronRight size={24} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default InClinicConsultation;
