import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MassageForUser = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      text: "Very easy to book,maintain history. Hassle free from older versions of booking appointment via telephone..\nThanks Practo for making it simple.",
      author: "Jyothi Bhatia"
    },
    {
      text: "Excellent experience. The doctors are very professional and the online consultation is a breeze. Highly recommended for quick and reliable medical advice.",
      author: "Rahul Sharma"
    },
    {
      text: "I love how I can keep all my medical records in one place and book lab tests from home. It has saved me so much time and effort.",
      author: "Sneha Patel"
    }
  ];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <div className="w-full bg-white py-16 border-b border-[#F0F0F5]">
      <div className="max-w-[1000px] mx-auto px-4 relative flex flex-col items-center">
        
        <h2 className="text-[28px] font-bold text-[#414146] mb-10 text-center">
          What our users have to say
        </h2>

        {/* Carousel Container */}
        <div className="relative w-full flex items-center justify-center min-h-[160px]">
          
          {/* Left Arrow */}
          <button 
            onClick={handlePrev}
            className="absolute left-0 md:-left-12 top-1/2 -translate-y-1/2 p-2 text-[#d3d3d3] hover:text-[#414146] transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={48} strokeWidth={1} />
          </button>

          {/* Testimonial Content */}
          <div className="w-full max-w-[650px] overflow-hidden px-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center text-center"
              >
                <p className="text-[20px] leading-[1.6] text-[#414146] mb-8 whitespace-pre-line">
                  {testimonials[currentIndex].text}
                </p>
                
                <div className="flex items-center gap-3">
                  <div className="w-[32px] h-[32px] rounded-full bg-[#e0e0e4] flex items-center justify-center text-[#787887]">
                    <User size={18} />
                  </div>
                  <span className="text-[14px] font-bold text-[#414146]">
                    {testimonials[currentIndex].author}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Arrow */}
          <button 
            onClick={handleNext}
            className="absolute right-0 md:-right-12 top-1/2 -translate-y-1/2 p-2 text-[#d3d3d3] hover:text-[#414146] transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight size={48} strokeWidth={1} />
          </button>

        </div>

        {/* Pagination Dots */}
        <div className="flex items-center gap-2 mt-12">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-[8px] h-[8px] rounded-full transition-colors ${
                idx === currentIndex ? 'bg-[#c3c3ca]' : 'border border-[#d3d3d3] bg-transparent'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default MassageForUser;
