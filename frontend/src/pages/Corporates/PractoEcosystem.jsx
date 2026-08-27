import React from 'react';
import { MessageSquare, PlusCircle, Stethoscope } from 'lucide-react';

const PractoEcosystem = () => {
  return (
    <div className="w-full bg-white py-12 md:py-20">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-[28px] md:text-[32px] font-bold text-[#1a1a1a] mb-3">
            Practo Ecosystem
          </h2>
          <p className="text-[15px] md:text-[16px] text-[#414146]">
            With a rating of <span className="text-[#a54c8d] font-bold">4.5+</span> we ensure our healthcare solutions are top quality and uniquely personalised to every employee.
          </p>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-24">
          
          {/* Left Stats */}
          <div className="flex flex-col gap-10 w-full md:w-[45%]">
            
            <div className="flex items-center gap-6">
              <div className="w-[70px] min-w-[70px] h-[70px] flex items-center justify-center text-[#a54c8d]">
                <MessageSquare size={48} strokeWidth={1.5} />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-[22px] font-bold text-[#1a1a1a] leading-tight">15k+</h3>
                <p className="text-[15px] text-[#414146] mt-1">Instant consultations per day</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="w-[70px] min-w-[70px] h-[70px] flex items-center justify-center text-[#a54c8d]">
                <PlusCircle size={48} strokeWidth={1.5} />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-[22px] font-bold text-[#1a1a1a] leading-tight">30cr+</h3>
                <p className="text-[15px] text-[#414146] mt-1">Patients per year</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="w-[70px] min-w-[70px] h-[70px] flex items-center justify-center text-[#a54c8d]">
                <Stethoscope size={48} strokeWidth={1.5} />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-[22px] font-bold text-[#1a1a1a] leading-tight">1.2 lakh+</h3>
                <p className="text-[15px] text-[#414146] mt-1">Doctor partners</p>
              </div>
            </div>

          </div>

          {/* Right Map Image */}
          <div className="w-full md:w-[55%] flex justify-center">
            {/* Using a placeholder styled to look like the space for the map. */}
            <div className="w-full aspect-[16/9] bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-400 font-medium">
              World Map Image (Please provide in assets)
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default PractoEcosystem;
