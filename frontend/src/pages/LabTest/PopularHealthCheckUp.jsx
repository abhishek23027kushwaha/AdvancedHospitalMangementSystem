import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CheckUpCard from './CheckUpcard';

const PopularHealthCheckUp = () => {
  const scrollRef = useRef(null);

  const packages = [
    { 
      discount: '20% OFF', 
      testsCount: 56, 
      title: 'Full Body Checkup', 
      ageGroup: '18-60yrs', 
      currentPrice: 1599, 
      originalPrice: 1999, 
      image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' // Family image
    },
    { 
      discount: '20% OFF', 
      testsCount: 6, 
      title: 'Healthy Bones Packages', 
      ageGroup: '1-100yrs', 
      currentPrice: 1999, 
      originalPrice: 2499, 
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' // Doctor x-ray
    },
    { 
      discount: '22% OFF', 
      testsCount: 9, 
      title: 'Hormonal Profile - Women', 
      ageGroup: '18-60yrs', 
      currentPrice: 699, 
      originalPrice: 900, 
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' // Woman
    },
    { 
      discount: '22% OFF', 
      testsCount: 15, 
      title: 'Kidney and Liver Profile', 
      ageGroup: '1-100yrs', 
      currentPrice: 699, 
      originalPrice: 900, 
      image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    { 
      discount: '15% OFF', 
      testsCount: 64, 
      title: 'Comprehensive Health Plan', 
      ageGroup: '30-80yrs', 
      currentPrice: 2499, 
      originalPrice: 2999, 
      image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    { 
      discount: '10% OFF', 
      testsCount: 4, 
      title: 'Basic Diabetes Care', 
      ageGroup: '18-80yrs', 
      currentPrice: 499, 
      originalPrice: 599, 
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    { 
      discount: '25% OFF', 
      testsCount: 72, 
      title: 'Senior Citizen Package', 
      ageGroup: '60-100yrs', 
      currentPrice: 2999, 
      originalPrice: 3999, 
      image: 'https://images.unsplash.com/photo-1516302752946-6092414a3dff?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full mt-12 mb-12">
      <div className="mb-6">
        <h2 className="text-[22px] font-bold text-[#2d2d32]">Popular Health Checkup Packages</h2>
      </div>

      <div className="relative group">
        {/* Left Navigation Button */}
        <button 
          onClick={() => scroll('left')}
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-[34px] h-[34px] flex items-center justify-center bg-[#f4f2f8] border border-[#d3d3d3] rounded-full text-[#414146] hover:bg-[#e8e5ef] transition-colors hidden md:flex"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Scrollable Container */}
        <div 
          ref={scrollRef}
          className="flex gap-20 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {packages.map((pkg, idx) => (
            <CheckUpCard key={idx} {...pkg} />
          ))}
        </div>

        {/* Right Navigation Button */}
        <button 
          onClick={() => scroll('right')}
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-[34px] h-[34px] flex items-center justify-center bg-[#f4f2f8] border border-[#d3d3d3] rounded-full text-[#414146] hover:bg-[#e8e5ef] transition-colors hidden md:flex"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
      `}} />
    </div>
  );
};

export default PopularHealthCheckUp;
