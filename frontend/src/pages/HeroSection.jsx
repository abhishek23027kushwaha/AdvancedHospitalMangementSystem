import React, { useState } from "react";
import { MapPin, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("Bangalore");
  const [searchQuery, setSearchQuery] = useState("");

  const cards = [
    {
      title: "Instant Video Consultation",
      subtitle: "Connect within 60 secs",
      bgColor: "bg-[#98c6eb]",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400&h=400", // Male doctor placeholder
      path: "/services"
    },
    {
      title: "Find Doctors Near You",
      subtitle: "Confirmed appointments",
      bgColor: "bg-[#85c9c9]",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400&h=400", // Female doctor placeholder
      path: "/doctors"
    },
    {
      title: "Lab Tests",
      subtitle: "Safe and trusted lab tests",
      bgColor: "bg-[#d0d0f2]",
      image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=400&h=400", // Lab test placeholder
      path: "/services"
    },
    {
      title: "Surgeries",
      subtitle: "Safe and trusted surgery centers",
      bgColor: "bg-[#dcdde2]",
      image: "https://images.unsplash.com/photo-1551076805-e1869043e560?auto=format&fit=crop&q=80&w=400&h=400", // Surgeon placeholder
      path: "/services"
    }
  ];

  return (
    <div 
      className="w-full min-h-[500px] bg-white pt-10 pb-24"
    >
      <div className="max-w-[1200px] mx-auto px-4 flex flex-col items-center">
        
        <div className="w-fit flex flex-col items-start">
          {/* Search Bar Container */}
          <div className="flex justify-start mb-16 w-full">
            <div className="flex items-center w-full max-w-[700px] h-[45px] border border-[#d3d3d3] shadow-sm bg-white overflow-hidden">
              {/* Location Input */}
              <div className="flex items-center w-[250px] h-full border-r border-[#d3d3d3] px-4">
                <MapPin size={18} className="text-[#787887] min-w-[18px]" />
                <input 
                  type="text" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full h-full border-none outline-none px-2 text-[#414146] text-[14px] font-medium placeholder-[#787887]"
                  placeholder="City"
                />
              </div>
              
              {/* Search Input */}
              <div className="flex items-center flex-1 h-full px-4">
                <Search size={18} className="text-[#787887] min-w-[18px]" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-full border-none outline-none px-2 text-[#414146] text-[14px] placeholder-[#787887]"
                  placeholder="Search doctors, clinics, hospitals, etc."
                />
              </div>
            </div>
          </div>

          {/* Cards Row */}
          <div className="flex flex-wrap justify-start gap-6">
            {cards.map((card, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.08)" }}
                transition={{ duration: 0.2 }}
                onClick={() => navigate(card.path)}
                className="flex flex-col w-[240px] bg-white rounded-[20px] overflow-hidden cursor-pointer border border-[#F0F0F5] shadow-[0_2px_8px_rgba(0,0,0,0.04)] h-[280px]"
              >
                {/* Card Image Area */}
                <div className={`w-full h-[170px] ${card.bgColor} overflow-hidden relative flex items-end justify-center pt-6 px-4`}>
                  <img 
                    src={card.image} 
                    alt={card.title} 
                    className="w-full h-full object-cover rounded-t-xl opacity-90 mix-blend-multiply" 
                    style={{ objectPosition: 'center top' }}
                  />
                </div>
                
                {/* Card Text Area */}
                <div className="flex flex-col flex-1 p-4 bg-white">
                  <h3 className="text-[17px] font-bold text-[#414146] leading-tight mb-1">
                    {card.title}
                  </h3>
                  <p className="text-[12px] text-[#787887] mt-1">
                    {card.subtitle}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default HeroSection;
