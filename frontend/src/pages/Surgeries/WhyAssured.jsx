import React from 'react';
import { Star, Building2, ShieldCheck, Users } from 'lucide-react';

import logo1 from '../../assets/logo1.png';
import logo2 from '../../assets/logo2.png';
import logo3 from '../../assets/logo3.png';
import logo4 from '../../assets/logo4.png';

const WhyAssured = () => {
  return (
    <div className="w-full bg-white rounded-[24px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-6 md:p-8 mt-4">
      <h2 className="text-[22px] md:text-[26px] font-bold text-[#1a1a1a] mb-3">
        Why Practo Assured?
      </h2>
      <hr className="border-gray-200 mb-5" />

      {/* Practo Assured Benefits */}
      <h3 className="text-[17px] md:text-[19px] font-bold text-[#1a1a1a] mb-3">
        Practo Assured Benefits
      </h3>
      <div className="bg-[#f0f4fd] rounded-2xl flex flex-col md:flex-row mb-6 overflow-hidden border border-[#dbe4f4]">
        {/* Col 1 */}
        <div className="flex-1 p-4 md:p-5 border-b md:border-b-0 md:border-r border-[#dbe4f4]">
          <div className="flex items-center gap-3 mb-2">
            <Star className="text-[#28328C] fill-[#28328C] w-8 h-8" />
            <div>
              <p className="text-[20px] font-bold text-[#28328C] leading-tight">4+/5</p>
              <p className="text-[13px] text-[#28328C] leading-tight">Hospital Excellence<br/>Rating</p>
            </div>
          </div>
          <p className="text-[12px] text-[#414146] leading-relaxed">
            First score of its kind in India, evaluating a hospital's <strong>infrastructure, equipment, and facilities</strong> through an auditing process.
          </p>
        </div>

        {/* Col 2 */}
        <div className="flex-1 p-4 md:p-5 border-b md:border-b-0 md:border-r border-[#dbe4f4]">
          <div className="flex items-center gap-3 mb-2">
            <Building2 className="text-[#28328C] w-8 h-8" />
            <div>
              <p className="text-[20px] font-bold text-[#28328C] leading-tight">1,000+</p>
              <p className="text-[13px] text-[#28328C] leading-tight">Assured Hospitals</p>
            </div>
          </div>
          <p className="text-[12px] text-[#414146] leading-relaxed">
            Carefully Vetted & <strong>Quality-Verified Facilities</strong> Across Multiple Cities
          </p>
        </div>

        {/* Col 3 */}
        <div className="flex-1 p-4 md:p-5">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="text-[#28328C] w-8 h-8" />
            <div>
              <p className="text-[20px] font-bold text-[#28328C] leading-tight">15+</p>
              <p className="text-[13px] text-[#28328C] leading-tight">Years of Expertise</p>
            </div>
          </div>
          <p className="text-[12px] text-[#414146] leading-relaxed">
            Proven <strong>Expertise & Safe</strong> Outcomes
          </p>
        </div>
      </div>

      {/* Practo's Assured Network */}
      <h3 className="text-[17px] md:text-[19px] font-bold text-[#1a1a1a] mb-3">
        Practo's Assured Network
      </h3>
      <div className="bg-[#f0f4fd] rounded-2xl flex flex-col mb-6 overflow-hidden border border-[#dbe4f4]">
        <div className="flex flex-col md:flex-row border-b border-[#dbe4f4]">
          {/* Col 1 */}
          <div className="flex-1 p-4 md:p-5 border-b md:border-b-0 md:border-r border-[#dbe4f4]">
            <p className="text-[22px] font-bold text-[#28328C] leading-tight mb-1">1 Crore+</p>
            <p className="text-[13px] text-[#787887]">Patients</p>
          </div>
          {/* Col 2 */}
          <div className="flex-1 p-4 md:p-5 border-b md:border-b-0 md:border-r border-[#dbe4f4]">
            <p className="text-[22px] font-bold text-[#28328C] leading-tight mb-1">10,000+</p>
            <p className="text-[13px] text-[#787887]">Surgeons</p>
          </div>
          {/* Col 3 */}
          <div className="flex-1 p-4 md:p-5">
            <p className="text-[22px] font-bold text-[#28328C] leading-tight mb-1">25+</p>
            <p className="text-[13px] text-[#787887]">Cities</p>
          </div>
        </div>
        {/* Footer */}
        <div className="bg-white/50 px-4 md:px-5 py-2.5 flex items-center gap-3">
          <div className="flex -space-x-2">
            <div className="w-5 h-5 rounded-full bg-gray-300 border border-white flex items-center justify-center overflow-hidden"><Users size={12} className="text-gray-500" /></div>
            <div className="w-5 h-5 rounded-full bg-gray-400 border border-white flex items-center justify-center overflow-hidden"><Users size={12} className="text-gray-600" /></div>
            <div className="w-5 h-5 rounded-full bg-gray-500 border border-white flex items-center justify-center overflow-hidden"><Users size={12} className="text-gray-700" /></div>
          </div>
          <p className="text-[12px] text-[#414146]"><strong>1,00,000+</strong> satisfied customers monthly</p>
        </div>
      </div>

      {/* Brands that trust us */}
      <h3 className="text-[17px] md:text-[19px] font-bold text-[#1a1a1a] mb-3">
        Brands that trust us
      </h3>
      <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
        {[logo1, logo2, logo3, logo4, logo1].map((logo, idx) => (
          <div key={idx} className="shrink-0 w-[120px] h-[50px] border border-gray-200 rounded-lg flex items-center justify-center p-2 bg-white">
            <img src={logo} alt="Brand Logo" className="max-w-full max-h-full object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyAssured;
