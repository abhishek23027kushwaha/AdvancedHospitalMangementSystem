import React from 'react';
import { FlaskConical, Home, FileText } from 'lucide-react';

const WorkFlow = () => {
  return (
    <div className="w-full bg-[#f8f9fb] py-12 mt-4 mb-12">
      <div className="w-full xl:max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16">
        <h2 className="text-[24px] font-bold text-[#2d2d32] text-center mb-12">How it works?</h2>
        
        <div className="flex flex-col md:flex-row items-center justify-between relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-[1px] border-t border-dashed border-[#d3d3d3] -translate-y-1/2 z-0"></div>

          {/* Step 1 */}
          <div className="flex flex-row md:flex-row items-center gap-4 relative z-10 bg-[#f8f9fb] px-4 mb-8 md:mb-0">
            <div className="w-[64px] h-[64px] rounded-full bg-[#eef4ff] flex items-center justify-center shrink-0">
              <FlaskConical size={26} className="text-[#5b6470] stroke-[1.5]" />
            </div>
            <p className="text-[15px] text-[#5b6470] font-medium leading-tight text-left">Book tests &<br/>packages</p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-row md:flex-row items-center gap-4 relative z-10 bg-[#f8f9fb] px-4 mb-8 md:mb-0">
            <div className="w-[64px] h-[64px] rounded-full bg-[#eef4ff] flex items-center justify-center shrink-0">
              <Home size={26} className="text-[#5b6470] stroke-[1.5]" />
            </div>
            <p className="text-[15px] text-[#5b6470] font-medium leading-tight text-left">Home sample<br/>collection</p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-row md:flex-row items-center gap-4 relative z-10 bg-[#f8f9fb] px-4">
            <div className="w-[64px] h-[64px] rounded-full bg-[#eef4ff] flex items-center justify-center shrink-0">
              <FileText size={26} className="text-[#5b6470] stroke-[1.5]" />
            </div>
            <p className="text-[15px] text-[#5b6470] font-medium leading-tight text-left">Reports in<br/>practo app</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkFlow;
