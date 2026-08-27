import React from 'react';
import chatImg from '../../assets/ic-chat.png';
import plusImg from '../../assets/ic-plus.png';
import doctorImg from '../../assets/ic-doctor.png';
import worldMapImg from '../../assets/world-map.png';

const PractoEcosystem = () => {
  return (
    <div id="ecosystem" className="w-full bg-white py-12 md:py-20">
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
              <div className="w-[70px] min-w-[70px] h-[70px] flex items-center justify-center">
                <img src={chatImg} alt="Instant consultations" className="max-w-full max-h-full object-contain" />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-[22px] font-bold text-[#1a1a1a] leading-tight">15k+</h3>
                <p className="text-[15px] text-[#414146] mt-1">Instant consultations per day</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="w-[70px] min-w-[70px] h-[70px] flex items-center justify-center">
                <img src={plusImg} alt="Patients per year" className="max-w-full max-h-full object-contain" />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-[22px] font-bold text-[#1a1a1a] leading-tight">30cr+</h3>
                <p className="text-[15px] text-[#414146] mt-1">Patients per year</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="w-[70px] min-w-[70px] h-[70px] flex items-center justify-center">
                <img src={doctorImg} alt="Doctor partners" className="max-w-full max-h-full object-contain" />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-[22px] font-bold text-[#1a1a1a] leading-tight">1.2 lakh+</h3>
                <p className="text-[15px] text-[#414146] mt-1">Doctor partners</p>
              </div>
            </div>

          </div>

          {/* Right Map Image */}
          <div className="w-full md:w-[55%] flex justify-center items-center">
            <img src={worldMapImg} alt="Practo Ecosystem Map" className="w-full max-w-[500px] h-auto object-contain opacity-90" />
          </div>

        </div>

      </div>
    </div>
  );
};

export default PractoEcosystem;
