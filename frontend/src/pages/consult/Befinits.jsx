import React from 'react';
import { Check } from 'lucide-react';

const Befinits = () => {
  const benefitsList = [
    {
      title: "Consult Top Doctors 24x7",
      description: "Connect instantly with a 24x7 specialist or choose to video visit a particular doctor."
    },
    {
      title: "Convenient and Easy",
      description: "Start an instant consultation within 2 minutes or do video consultation at the scheduled time."
    },
    {
      title: "100% Safe Consultations",
      description: "Be assured that your online consultation will be fully private and secured."
    },
    {
      title: "Similar Clinic Experience",
      description: "Experience clinic-like consultation through a video call with the doctor. Video consultation is available only on the Practo app."
    },
    {
      title: "Free Follow-up",
      description: "Get a valid digital prescription and a 7-day, free follow-up for further clarifications."
    }
  ];

  return (
    <div className="w-full bg-white py-16 border-b border-[#F0F0F5]">
      <div className="max-w-[1000px] mx-auto px-4">
        
        <h2 className="text-[24px] font-bold text-[#414146] mb-8">
          Benefits of Online Consultation
        </h2>

        <div className="border border-[#F0F0F5] rounded-xl p-8 md:p-10 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
            {benefitsList.map((benefit, idx) => (
              <div key={idx} className="flex flex-col text-left">
                <h3 className="flex items-center gap-2 text-[16px] font-bold text-[#414146] mb-3">
                  <Check size={18} strokeWidth={2.5} className="text-[#414146]" />
                  {benefit.title}
                </h3>
                <p className="text-[13px] text-[#787887] leading-relaxed pr-4">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Befinits;
