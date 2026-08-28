import React from 'react';
import icon1 from '../../assets/7ql5W9wWRxc93z9wrRZb.webp';
import icon2 from '../../assets/Cs0pNcq9jZsLcuKRzLxa.webp';
import icon3 from '../../assets/FVDeMDrN7DerOW80GI0M.webp';
import icon4 from '../../assets/GkmXdH8PQWQTI3LPbLyd.webp';
import icon5 from '../../assets/MCIbStQB09VyegUNYPRI.webp';
import icon6 from '../../assets/atRi6x7nOx8B3xUrn7Mh.webp';
import icon7 from '../../assets/iaFUKMZnOfGnFETeHEYf.webp';
import icon8 from '../../assets/poBhEg5nwOhYiSx37vk9.webp';
import { UserRoundSearch } from 'lucide-react';

const specialties = [
  { name: 'Cardiology', icon: icon1 },
  { name: 'Nephrology', icon: icon2 },
  { name: 'Orthopaedics', icon: icon3 },
  { name: 'Neurology', icon: icon4 },
  { name: 'Gastro Sciences', icon: icon5 },
  { name: 'Cancer Care', icon: icon6 },
  { name: 'Paediatric Medicine', icon: icon7 },
  { name: 'Urology', icon: icon8 },
];

const SpecialtyCarousel = ({ onSeeMoreClick }) => {
  return (
    <div className="w-full bg-white pt-8 pb-10 font-helveticaNeue">
      <div className="max-w-[1200px] mx-auto px-4">
        
        {/* Breadcrumb */}
        <div className="text-[13px] text-gray-500 mb-6 flex items-center gap-1">
          <span className="text-blue-600 cursor-pointer hover:underline">Home</span>
          <span>&gt;</span>
          <span>Find a Doctor</span>
        </div>

        {/* Title */}
        <h1 className="text-[36px] font-helveticaNeue text-black mb-10">Find a Doctor</h1>

        {/* Carousel */}
        <div className="flex items-center justify-between overflow-x-auto pb-4 hide-scrollbar gap-4">
          
          {specialties.map((spec, index) => (
            <div key={index} className="flex flex-col items-center gap-3 cursor-pointer min-w-[90px] group">
              <div className="w-[85px] h-[85px] rounded-full overflow-hidden border border-gray-100 shadow-sm group-hover:shadow-md transition-shadow">
                <img src={spec.icon} alt={spec.name} className="w-full h-full object-cover" />
              </div>
              <span className="text-[14px] text-center text-black font-helveticaNeue px-2 leading-tight">
                {spec.name}
              </span>
            </div>
          ))}

          {/* See More */}
          <div onClick={onSeeMoreClick} className="flex flex-col items-center gap-3 cursor-pointer min-w-[90px] group">
            <div className="w-[85px] h-[85px] rounded-full overflow-hidden bg-[#eff4fa] flex items-center justify-center border border-gray-100 shadow-sm group-hover:shadow-md transition-shadow">
              <UserRoundSearch size={32} className="text-[#28328c]" />
            </div>
            <span className="text-[14px] text-center text-black font-helveticaNeue px-2 leading-tight">
              See More
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};

export default SpecialtyCarousel;
