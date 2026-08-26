import React, { useRef } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const OurDoctor = () => {
  const scrollRef = useRef(null);

  const doctorsData = [
    {
      name: "Dr. Mohit Bansal",
      specialty: "Sexologist, Psychiatrist",
      experience: "6 years experience",
      consults: "5844 consults done",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=150&h=150"
    },
    {
      name: "Dr. Anshuman Gupta",
      specialty: "Cardiologist",
      experience: "12 years experience",
      consults: "20292 consults done",
      image: "https://images.unsplash.com/photo-1537368910025-702800faa86b?auto=format&fit=crop&q=80&w=150&h=150"
    },
    {
      name: "Dr. Simoni Sarodia",
      specialty: "Dermatologist",
      experience: "4 years experience",
      consults: "14773 consults done",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150&h=150"
    },
    {
      name: "Dr. Palak Garg",
      specialty: "Dermatologist",
      experience: "8 years experience",
      consults: "157 consults done",
      image: "https://images.unsplash.com/photo-1594824432258-0062b8812c32?auto=format&fit=crop&q=80&w=150&h=150"
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
        <div className="mb-10 text-left">
          <h2 className="text-[28px] font-bold text-[#414146] mb-1">
            Our Doctors
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
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory py-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {doctorsData.map((doc, idx) => (
              <Link 
                to="/doctors"
                key={idx} 
                className="flex-shrink-0 w-[300px] md:w-[320px] flex items-center gap-4 bg-white border border-[#F0F0F5] rounded-xl p-5 snap-start shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-shadow no-underline"
              >
                {/* Doctor Avatar */}
                <div className="w-[70px] h-[70px] rounded-full overflow-hidden border border-[#F0F0F5] flex-shrink-0">
                  <img 
                    src={doc.image} 
                    alt={doc.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Doctor Details */}
                <div className="flex flex-col text-left">
                  <h3 className="text-[15px] font-bold text-[#414146] mb-1">
                    {doc.name}
                  </h3>
                  <p className="text-[12px] text-[#787887] mb-0.5">
                    {doc.specialty}
                  </p>
                  <p className="text-[12px] text-[#787887] mb-0.5">
                    {doc.experience}
                  </p>
                  <p className="text-[12px] text-[#787887] font-medium">
                    {doc.consults}
                  </p>
                </div>
              </Link>
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

export default OurDoctor;
