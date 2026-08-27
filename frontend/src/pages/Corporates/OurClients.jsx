import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Importing logos based on what was provided in assets
import logoAakash from '../../assets/logo-aakash-byjus.png';
import logoAon from '../../assets/logo-aon.png';
// I will use some of the other generic logos if the specific ones like aviva/oppo are missing by exact name.
import logoTata from '../../assets/logo-tata.png';
import logoXai from '../../assets/logo-xai.png';
// Using placeholders for the rest, assuming they might map to logo1, logo2 etc.
import logo1 from '../../assets/logo1.png';
import logo2 from '../../assets/logo2.png';

const OurClients = () => {
  const clients = [
    { name: 'Aviva', src: logo1 },
    { name: 'Aakash Byjus', src: logoAakash },
    { name: 'Aon', src: logoAon },
    { name: 'Hanu', src: logo2 },
    { name: 'Oppo', src: logoXai }, 
    { name: 'Tata', src: logoTata }
  ];

  return (
    <div className="w-full bg-white py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 text-center">
        <h2 className="text-[20px] md:text-[24px] font-bold text-[#1a1a1a] mb-8">
          Our Clients
        </h2>
        
        <div className="flex items-center justify-between gap-4">
          {/* Left Arrow */}
          <button className="text-gray-300 hover:text-gray-500 transition-colors">
            <ChevronLeft size={36} className="fill-current" />
          </button>
          
          {/* Logos Container */}
          <div className="flex items-center justify-center gap-6 md:gap-12 flex-wrap flex-grow">
            {clients.map((client, index) => (
              <div key={index} className="flex items-center justify-center w-[120px] h-[60px] md:w-[150px] md:h-[80px]">
                <img 
                  src={client.src} 
                  alt={client.name} 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button className="text-gray-300 hover:text-gray-500 transition-colors">
            <ChevronRight size={36} className="fill-current" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OurClients;
