import React from 'react';
import { motion } from 'framer-motion';
import { Star, Clock, ChevronRight, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DoctorCard = ({ _id, name, speciality, specialization, experience, image, rating, hospitals }) => {
  const displaySpeciality = speciality || specialization || "Medical Specialist";
  const displayRating = typeof rating === 'number' ? rating.toFixed(1) : "4.9";
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4 }}
      onClick={() => navigate(`/book-appointment/${_id || ""}`)}
      className="bg-[#FFFFFF] rounded-3xl p-5 shadow-lg shadow-gray-100/50 border border-[#E2E8F0] flex flex-col group cursor-pointer h-full"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-2xl bg-[#EFF6FF] mb-5 aspect-[4/3]">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
          <Star size={12} className="text-[#F59E0B] fill-[#F59E0B]" />
          <span className="text-xs font-bold text-[#0F172A]">{displayRating}</span>
        </div>
      </div>

      {/* Info */}
      <div className="mb-3">
        <h3 className="text-lg font-black text-[#0F172A] tracking-tight leading-tight line-clamp-1">{name}</h3>
        <p className="text-[#2563EB] font-bold text-sm mt-0.5 line-clamp-1">{displaySpeciality}</p>
      </div>

      {/* Experience & Hospitals */}
      <div className="flex flex-col gap-2 mb-5">
        <div className="inline-flex items-center gap-1.5 bg-[#EFF6FF] text-[#2563EB] px-3 py-1 rounded-full w-fit">
          <Clock size={12} />
          <span className="text-[10px] font-black uppercase tracking-wider">{experience} Years Experience</span>
        </div>
        {hospitals && hospitals.length > 0 && (
          <div className="inline-flex items-center gap-1.5 bg-[#F0FDF4] text-[#16A34A] px-3 py-1 rounded-full w-fit max-w-full">
            <Building2 size={12} className="flex-shrink-0" />
            <span className="text-[10px] font-black uppercase tracking-wider truncate">
              {hospitals.map(h => typeof h === 'object' ? h.name : h).join(', ')}
            </span>
          </div>
        )}
      </div>

      {/* Book Button */}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/book-appointment/${_id || ""}`);
        }}
        className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-1.5 shadow-lg shadow-blue-500/20 active:scale-95 mt-auto transition-all transition-colors duration-200 border-0"
      >
        <ChevronRight size={16} />
        Book Now
      </button>
    </motion.div>
  );
};

export default DoctorCard;
