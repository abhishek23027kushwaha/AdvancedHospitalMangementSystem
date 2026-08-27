import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import medicalExpertsImg from '../../assets/medical-experts.png';
import secureImg from '../../assets/secure.png';
import dashboardImg from '../../assets/dashboard.png';
import interfaceImg from '../../assets/interface.png';
import certificationsImg from '../../assets/certifications.png';

const slides = [
  {
    title: "Access to a large repository of health articles written by medical experts",
    image: medicalExpertsImg
  },
  {
    title: "All records stored on secure servers",
    image: secureImg
  },
  {
    title: "Comprehensive dashboard for easy management and tracking",
    image: dashboardImg
  },
  {
    title: "User-friendly interface for a seamless experience",
    image: interfaceImg
  },
  {
    title: "Recognized with top industry certifications for quality and trust",
    image: certificationsImg
  }
];

const ProductCapabilities = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div id="capabilities" className="w-full bg-white py-10 md:py-16 relative overflow-hidden">
      
      {/* Background Slanted Blue Section */}
      <div 
        className="absolute right-0 top-0 bottom-0 w-[45%] md:w-[35%] bg-[#2d3a7c] z-0"
        style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)' }}
      ></div>

      <div className="max-w-[1000px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-[22px] md:text-[26px] font-bold text-[#1a1a1a]">
            Product Capabilities
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full min-h-[250px] md:min-h-[280px] flex items-center bg-transparent">
          
          {/* Left Arrow */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 md:-left-12 z-20 p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ChevronLeft size={36} strokeWidth={1} />
          </button>

          {/* Slide Content */}
          <div className="w-full flex flex-col md:flex-row items-center justify-between px-8 md:px-12 gap-8 md:gap-0">
            
            {/* Text */}
            <div className="w-full md:w-[50%] pr-4 md:pr-0">
              <h3 className="text-[20px] md:text-[26px] font-semibold text-[#1a1a1a] leading-snug">
                {slides[currentIndex].title}
              </h3>
            </div>

            {/* Image */}
            <div className="w-full md:w-[40%] flex justify-center md:justify-end">
              <img 
                src={slides[currentIndex].image} 
                alt={slides[currentIndex].title} 
                className="max-h-[180px] md:max-h-[260px] object-contain drop-shadow-xl"
              />
            </div>
            
          </div>

          {/* Right Arrow */}
          <button 
            onClick={nextSlide}
            className="absolute right-0 md:-right-12 z-20 p-2 text-white/70 hover:text-white transition-colors"
          >
            <ChevronRight size={36} strokeWidth={1} />
          </button>

        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-3 mt-12">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                index === currentIndex ? 'bg-pink-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default ProductCapabilities;
