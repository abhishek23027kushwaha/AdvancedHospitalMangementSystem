import React from 'react';
import { Link } from 'react-router-dom';

const CorporateNavbar = () => {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 w-full pt-6 pb-4">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center no-underline text-white hover:text-white group">
          <span className="text-[#00B8E6] text-3xl font-black mb-1 mr-0.5">•</span>
          <span className="text-2xl font-black tracking-tight" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>practo</span>
          <span className="text-[#00B8E6] text-3xl font-black mb-1 ml-0.5">•</span>
        </Link>

        {/* Links */}
        <div className="hidden lg:flex items-center gap-8">
          <Link to="#" className="text-[14px] font-bold text-white hover:text-gray-200 transition-colors no-underline">
            Our Services
          </Link>
          <Link to="#" className="text-[14px] font-bold text-white hover:text-gray-200 transition-colors no-underline">
            Practo Ecosystem
          </Link>
          <Link to="#" className="text-[14px] font-bold text-white hover:text-gray-200 transition-colors no-underline">
            Product Capabilities
          </Link>
          <Link to="#" className="text-[14px] font-bold text-white hover:text-gray-200 transition-colors no-underline">
            Testimonials
          </Link>
          <Link to="#" className="text-[14px] font-bold text-white hover:text-gray-200 transition-colors no-underline">
            FAQs
          </Link>
          <Link to="/corporate/group-insurance" className="bg-[#00B8E6] hover:bg-[#009bc2] text-white text-[14px] font-bold px-4 py-2 rounded transition-colors no-underline">
            Group Insurance
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default CorporateNavbar;
