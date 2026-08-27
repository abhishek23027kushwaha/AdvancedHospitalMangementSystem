import React from 'react';
import { BriefcaseMedical, FileText, Percent } from 'lucide-react';

const BookWithUs = () => {
  const features = [
    {
      id: 1,
      icon: <BriefcaseMedical size={28} className="text-[#00B8E6] stroke-[1.5]" />,
      text: "FREE home\nsample collection",
    },
    {
      id: 2,
      icon: <FileText size={28} className="text-[#00B8E6] stroke-[1.5]" />,
      text: "E reports\nin 24 hrs",
    },
    {
      id: 3,
      icon: <Percent size={28} className="text-[#00B8E6] stroke-[1.5]" />,
      text: "Offers &\naffordable prices",
    }
  ];

  return (
    <div className="w-full bg-[#f8f9fb] py-12">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <h2 className="text-[24px] font-bold text-[#2d2d32] text-center mb-10">
          Why Book With Us?
        </h2>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-24">
          {features.map((feature) => (
            <div key={feature.id} className="flex items-center gap-4">
              <div className="w-[64px] h-[64px] rounded-full bg-[#eef4ff] flex items-center justify-center shrink-0">
                {feature.icon}
              </div>
              <p className="text-[15px] text-[#414146] font-medium leading-tight whitespace-pre-line text-left">
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookWithUs;
