import React from 'react';
import { MousePointer2, MessageSquareText, FileSignature } from 'lucide-react';

const StepFollow = () => {
  const steps = [
    {
      icon: <MousePointer2 size={24} strokeWidth={1.5} className="text-[#414146]" />,
      text: "Select a speciality or symptom"
    },
    {
      icon: <MessageSquareText size={24} strokeWidth={1.5} className="text-[#414146]" />,
      text: "Audio/ video call with a verified doctor"
    },
    {
      icon: <FileSignature size={24} strokeWidth={1.5} className="text-[#414146]" />,
      text: "Get a digital prescription & a free follow-up"
    }
  ];

  return (
    <div className="w-full bg-white py-20 border-b border-[#F0F0F5]">
      <div className="max-w-[1000px] mx-auto px-4 text-center">
        
        <h2 className="text-[28px] font-bold text-[#414146] mb-20">
          How it works
        </h2>

        <div className="relative flex justify-between items-start max-w-[800px] mx-auto px-4 md:px-0">
          
          {/* Horizontal Connecting Line */}
          <div className="absolute top-[35px] left-[10%] right-[10%] h-[1px] bg-[#e0e0e4] z-0 hidden md:block"></div>

          {/* Steps */}
          {steps.map((step, idx) => (
            <div key={idx} className="relative z-10 flex flex-col items-center w-1/3">
              <div className="w-[70px] h-[70px] rounded-full bg-[#f4f2f8] flex items-center justify-center mb-6 shadow-sm border border-white">
                {step.icon}
              </div>
              <p className="text-[14px] text-[#414146] font-medium leading-relaxed max-w-[200px]">
                {step.text}
              </p>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
};

export default StepFollow;
