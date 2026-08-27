import React from 'react';
import { ChevronDown } from 'lucide-react';

const ScheduleDemoForm = () => {
  return (
    <div className="bg-white rounded-[24px] p-6 md:p-8 w-full max-w-[440px] shadow-lg">
      <h2 className="text-[20px] font-bold text-[#10101C] mb-6">
        Schedule a Demo
      </h2>

      <form className="flex flex-col gap-4">
        <input 
          type="text" 
          placeholder="Name" 
          className="w-full h-[48px] border border-gray-300 rounded-md px-4 text-[14px] text-[#414146] outline-none focus:border-[#28328C] transition-colors placeholder-gray-400"
        />

        <input 
          type="text" 
          placeholder="Organization Name" 
          className="w-full h-[48px] border border-gray-300 rounded-md px-4 text-[14px] text-[#414146] outline-none focus:border-[#28328C] transition-colors placeholder-gray-400"
        />

        <input 
          type="tel" 
          placeholder="Contact Number" 
          className="w-full h-[48px] border border-gray-300 rounded-md px-4 text-[14px] text-[#414146] outline-none focus:border-[#28328C] transition-colors placeholder-gray-400"
        />

        <input 
          type="email" 
          placeholder="Official Email ID" 
          className="w-full h-[48px] border border-gray-300 rounded-md px-4 text-[14px] text-[#414146] outline-none focus:border-[#28328C] transition-colors placeholder-gray-400"
        />

        <div className="relative">
          <select className="w-full h-[48px] border border-gray-300 rounded-md px-4 text-[14px] text-gray-400 appearance-none bg-transparent outline-none focus:border-[#28328C] transition-colors cursor-pointer">
            <option value="" disabled selected>Organization Size</option>
            <option value="1-50" className="text-[#414146]">1-50 Employees</option>
            <option value="51-200" className="text-[#414146]">51-200 Employees</option>
            <option value="201-500" className="text-[#414146]">201-500 Employees</option>
            <option value="500+" className="text-[#414146]">500+ Employees</option>
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
        </div>

        <div className="relative">
          <select className="w-full h-[48px] border border-gray-300 rounded-md px-4 text-[14px] text-gray-400 appearance-none bg-transparent outline-none focus:border-[#28328C] transition-colors cursor-pointer">
            <option value="" disabled selected>Interested In</option>
            <option value="health_plans" className="text-[#414146]">Health & Wellness Plans</option>
            <option value="group_insurance" className="text-[#414146]">Group Insurance</option>
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
        </div>

        <button 
          type="button" 
          className="w-full h-[50px] bg-[#B4B4B8] text-white rounded-md font-bold text-[15px] mt-2 transition-colors cursor-not-allowed"
        >
          Schedule a demo
        </button>
      </form>
    </div>
  );
};

export default ScheduleDemoForm;
