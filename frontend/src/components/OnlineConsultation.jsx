import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Thermometer, Baby, Brain, Heart, Sparkles } from 'lucide-react';

const OnlineConsultation = () => {
  const specialties = [
    {
      title: "Period doubts or Pregnancy",
      icon: <Heart size={48} className="text-[#414146]" strokeWidth={1.4} />,
      bgColor: "bg-[#f4f2f8]",
      link: "/services"
    },
    {
      title: "Acne, pimple or skin issues",
      icon: <Sparkles size={48} className="text-[#414146]" strokeWidth={1.5} />,
      bgColor: "bg-[#e2f5fa]",
      link: "/services"
    },
    {
      title: "Performance issues in bed",
      icon: <Activity size={48} className="text-[#414146]" strokeWidth={1.5} />,
      bgColor: "bg-[#f4f2f8]",
      link: "/services"
    },
    {
      title: "Cold, cough or fever",
      icon: <Thermometer size={48} className="text-[#414146]" strokeWidth={1.5} />,
      bgColor: "bg-[#fff2e5]",
      link: "/services"
    },
    {
      title: "Child not feeling well",
      icon: <Baby size={48} className="text-[#414146]" strokeWidth={1.5} />,
      bgColor: "bg-[#f2effa]",
      link: "/services"
    },
    {
      title: "Depression or anxiety",
      icon: <Brain size={48} className="text-[#414146]" strokeWidth={1.5} />,
      bgColor: "bg-[#e2f5fa]",
      link: "/services"
    }
  ];

  return (
    <div 
      className="w-full bg-white py-12 border-b border-[#F0F0F5]"
    >
      <div className="max-w-[1200px] mx-auto px-4">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
          <div>
            <h2 className="text-[26px] font-bold text-[#414146] mb-1">
              Consult top doctors online for any health concern
            </h2>
            <p className="text-[14px] text-[#414146]">
              Private online consultations with verified doctors in all specialists
            </p>
          </div>
          <Link 
            to="/services"
            className="mt-4 md:mt-0 px-6 py-3 border border-[#00B8E6] text-[#00B8E6]  text-[14px] rounded hover:bg-[#f2fdff] transition-colors inline-block no-underline"
          >
            View All Specialities
          </Link>
        </div>

        {/* Specialities Grid */}
        <div className="flex flex-wrap justify-between gap-4">
          {specialties.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center w-[150px] text-center group cursor-pointer">
              <div className={`w-[120px] h-[120px] rounded-full ${item.bgColor} flex items-center justify-center mb-4 transition-transform group-hover:scale-105 duration-300`}>
                {item.icon}
              </div>
              <h3 className="text-[14px] font-bold text-[#414146] leading-tight mb-2 min-h-[40px]">
                {item.title}
              </h3>
              <Link 
                to={item.link}
                className="text-[12px]  text-[#00B8E6] uppercase tracking-wider no-underline group-hover:text-[#0096bf]"
              >
                Consult Now
              </Link>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default OnlineConsultation;
