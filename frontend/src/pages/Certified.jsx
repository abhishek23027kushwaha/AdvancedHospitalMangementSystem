import React from 'react';
import { motion } from 'framer-motion';
import { Award, UserCheck, Heart, ThumbsUp } from 'lucide-react';
import logo1 from '../assets/logo1.png';
import logo2 from '../assets/logo2.png';
import logo3 from '../assets/logo3.png';
import logo4 from '../assets/logo4.png';

const Certified = () => {
  const logos = [
    { name: "Government Approved", src: logo1 },
    { name: "NABH Accredited", src: logo2 },
    { name: "Medical Council", src: logo3 },
    { name: "Quality Healthcare", src: logo4 },
  ];

  // For seamless marquee, we duplicate the logos
  const marqueeLogos = [...logos, ...logos, ...logos];

  const stats = [
    { label: "Years of Excellence", value: "25+", icon: Award },
    { label: "Expert Doctors", value: "500+", icon: UserCheck },
    { label: "Happy Patients", value: "10k+", icon: Heart },
    { label: "Success Rate", value: "99%", icon: ThumbsUp },
  ];

  return (
    <section className="py-24 bg-[#FFFFFF] overflow-hidden border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Section */}
        <div className="flex flex-col items-center mb-12">
          <div className="flex items-center justify-center w-full mb-4">
            <div className="hidden md:block h-[1px] bg-gradient-to-r from-transparent to-gray-200 flex-grow max-w-[200px]"></div>
            <h2 className="mx-8 text-3xl md:text-5xl font-black text-[#0F172A] text-center tracking-tight uppercase">
              CERTIFIED & EXCELLENT
            </h2>
            <div className="hidden md:block h-[1px] bg-gradient-to-l from-transparent to-gray-200 flex-grow max-w-[200px]"></div>
          </div>
          <p className="text-center text-[#64748B] text-base md:text-lg font-medium max-w-2xl mx-auto">
            Government recognized and internationally accredited healthcare standards
          </p>
        </div>

        {/* Marquee - Centered and Right to Left */}
        <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden py-12 bg-gradient-to-r from-transparent via-[#EFF6FF]/40 to-transparent">
          <motion.div 
            className="flex items-center"
            animate={{
              x: ["0%", "-33.33%"]
            }}
            transition={{
              ease: "linear",
              duration: 25,
              repeat: Infinity
            }}
          >
            {marqueeLogos.map((logo, index) => (
              <div
                key={index}
                className="flex flex-col items-center flex-shrink-0 px-20 group"
              >
                <div className="relative w-28 h-28 mb-6 flex items-center justify-center bg-transparent group-hover:scale-110 transition-all duration-500 ease">
                  <div className="w-full h-full overflow-hidden flex items-center justify-center p-2 rounded-2xl bg-white/50 shadow-sm border border-gray-50">
                    <img 
                      src={logo.src} 
                      alt={logo.name}
                      className="w-full h-full object-contain transition-all duration-500 ease-in-out scale-110"
                    />
                  </div>
                </div>
                <span className="text-sm font-black text-[#334155] transition-all duration-300 text-center tracking-wider max-w-[130px] leading-tight">
                  {logo.name}
                </span>
              </div>
            ))}
          </motion.div>
          
          {/* Fading gradients on sides for smoothness */}
          <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-white via-white/80 to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-white via-white/80 to-transparent z-10"></div>
        </div>

        {/* Experience Stats Section */}
        <div className="mt-32 pt-16 border-t border-gray-100">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, i) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex flex-col items-center p-8 rounded-3xl bg-[#F8FAFC] border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div className="w-16 h-16 rounded-full bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="text-[#2563EB] size-7" />
                  </div>
                  <span className="text-4xl font-black text-[#2563EB] mb-2 tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-[#64748B] uppercase tracking-widest text-center">
                    {stat.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certified;
