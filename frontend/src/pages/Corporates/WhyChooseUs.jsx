import React from 'react';
import { Settings, Users, Mic } from 'lucide-react';

const WhyChooseUs = () => {
  return (
    <div className="w-full bg-[#f8f9fa] py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <h2 className="text-[24px] md:text-[28px] font-bold text-[#1a1a1a] text-center mb-12">
          Why Choose Us?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          
          {/* For Organizations */}
          <div className="flex items-start gap-4">
            <div className="w-[60px] min-w-[60px] h-[60px] flex items-center justify-center text-orange-500">
              <Settings size={50} strokeWidth={1.5} />
            </div>
            <div className="flex flex-col text-left pt-1">
              <h3 className="text-[18px] font-bold text-[#1a1a1a] mb-1">For Organizations</h3>
              <p className="text-[14px] text-[#414146] leading-relaxed">
                Manage benefits, Improve Communication and Engage Employees
              </p>
            </div>
          </div>

          {/* For Employees */}
          <div className="flex items-start gap-4">
            <div className="w-[60px] min-w-[60px] h-[60px] flex items-center justify-center text-purple-500">
              <Users size={50} strokeWidth={1.5} />
            </div>
            <div className="flex flex-col text-left pt-1">
              <h3 className="text-[18px] font-bold text-[#1a1a1a] mb-1">For Employees</h3>
              <p className="text-[14px] text-[#414146] leading-relaxed">
                Better Health, Easy Management and more vitality
              </p>
            </div>
          </div>

          {/* For Leaders */}
          <div className="flex items-start gap-4">
            <div className="w-[60px] min-w-[60px] h-[60px] flex items-center justify-center text-amber-600">
              <Mic size={50} strokeWidth={1.5} />
            </div>
            <div className="flex flex-col text-left pt-1">
              <h3 className="text-[18px] font-bold text-[#1a1a1a] mb-1">For Leaders</h3>
              <p className="text-[14px] text-[#414146] leading-relaxed">
                Culture of Health and Wellness, Peer Interactions
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
