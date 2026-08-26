import React from 'react';
import { Link } from 'react-router-dom';

const Connect = () => {
  return (
    <div className="w-full bg-[#2d2d32] py-10">
      <div className="max-w-[1200px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Text Content */}
        <div className="text-left">
          <h2 className="text-[24px] font-bold text-white mb-2">
            Still delaying your health concerns ?
          </h2>
          <p className="text-[15px] text-white/90">
            Connect with India's top doctors online
          </p>
        </div>

        {/* CTA Button */}
        <Link 
          to="/services" 
          className="bg-[#00B8E6] text-white font-bold text-[15px] px-10 py-3.5 rounded hover:bg-[#0096bf] transition-colors no-underline whitespace-nowrap shadow-sm"
        >
          Consult Now
        </Link>
        
      </div>
    </div>
  );
};

export default Connect;
