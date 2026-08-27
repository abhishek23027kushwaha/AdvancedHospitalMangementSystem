import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Instagram, Twitter, Facebook } from 'lucide-react';

const CorporateFooter = () => {
  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-[#28328c] py-16 relative">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-white">
          
          {/* Logo & Mission */}
          <div className="flex flex-col">
            <Link to="/" className="flex items-center no-underline text-white hover:text-white mb-4 group">
              <span className="text-[#00B8E6] text-[36px] font-black mb-1.5 mr-0.5 leading-none">•</span>
              <span className="text-[32px] font-black tracking-tight leading-none" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>practo</span>
              <span className="text-[#00B8E6] text-[36px] font-black mb-1.5 ml-0.5 leading-none">•</span>
            </Link>
            <p className="text-[15px] font-medium leading-relaxed max-w-[300px]">
              Practo is on a mission to make quality healthcare affordable and accessible for over a billion+ Indians.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-5 pt-3">
            <h4 className="text-[17px] font-bold mb-1">Quick Links</h4>
            <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="cursor-pointer text-[14px] font-medium text-white hover:text-gray-300 transition-colors no-underline">
              Our Services
            </a>
            <a href="#ecosystem" onClick={(e) => scrollToSection(e, 'ecosystem')} className="cursor-pointer text-[14px] font-medium text-white hover:text-gray-300 transition-colors no-underline">
              Practo Ecosystem
            </a>
            <a href="#capabilities" onClick={(e) => scrollToSection(e, 'capabilities')} className="cursor-pointer text-[14px] font-medium text-white hover:text-gray-300 transition-colors no-underline">
              Product Capabilities
            </a>
          </div>

          {/* FAQs & Socials */}
          <div className="flex flex-col justify-between pt-3 h-full">
            <a href="#faqs" onClick={(e) => scrollToSection(e, 'faqs')} className="cursor-pointer text-[17px] font-bold text-white hover:text-gray-300 transition-colors no-underline">
              FAQs
            </a>
            
            <div className="flex items-center gap-4 mt-12 md:mt-0">
              <a href="#" className="w-10 h-10 rounded-full bg-white text-[#28328c] flex items-center justify-center hover:bg-gray-200 transition-colors">
                <Linkedin size={20} className="fill-current" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white text-[#28328c] flex items-center justify-center hover:bg-gray-200 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white text-[#28328c] flex items-center justify-center hover:bg-gray-200 transition-colors">
                <Twitter size={20} className="fill-current" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white text-[#28328c] flex items-center justify-center hover:bg-gray-200 transition-colors">
                <Facebook size={20} className="fill-current" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default CorporateFooter;
