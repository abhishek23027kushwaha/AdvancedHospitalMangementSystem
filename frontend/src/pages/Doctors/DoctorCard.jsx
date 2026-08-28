import React from 'react';
import { Phone } from 'lucide-react';

const DoctorCard = ({ doctor, onBookAppointment }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
      
      {/* Top Section - Image & Basic Info */}
      <div className="p-5 flex gap-4">
        {/* Doctor Image */}
        <div className="w-[100px] h-[100px] rounded-lg overflow-hidden bg-gray-100 shrink-0">
          <img 
            src={doctor.image} 
            alt={doctor.name} 
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* Name & Designation */}
        <div className="flex flex-col pt-1">
          <h3 className="text-[18px] font-bold text-black leading-tight mb-1">
            {doctor.name}
          </h3>
          <p className="text-[13px] text-gray-600 leading-snug">
            {doctor.qualifications || `${doctor.experience} years experience`}
          </p>
        </div>
      </div>

      {/* Middle Section - Details */}
      <div className="px-5 pb-5 flex flex-col gap-4 flex-1">
        
        {/* Qualifications / Specialization */}
        <div>
          <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider mb-1">Qualifications</p>
          <p className="text-[13px] text-black leading-snug">{doctor.qualifications || "Not specified"}</p>
        </div>

        {/* Expertise */}
        <div>
          <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider mb-1">Areas of Expertise</p>
          <p className="text-[13px] font-medium text-black leading-snug">{Array.isArray(doctor.specialization) ? doctor.specialization.join(', ') : doctor.specialization}</p>
        </div>

        {/* Location */}
        <div className="mt-auto pt-2">
          <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider mb-1">Location</p>
          <p className="text-[13px] text-black leading-snug">{doctor.location || "Hospital Location"}</p>
        </div>
        
      </div>

      {/* Bottom Section - Actions */}
      <div className="p-5 pt-0 mt-auto flex gap-3 items-center">
        
        {/* Book Button with Availability */}
        <div 
          onClick={() => onBookAppointment(doctor)}
          className="flex flex-1 rounded-md overflow-hidden bg-[#004f9e] hover:bg-[#003d7a] transition-colors cursor-pointer text-white h-11"
        >
          <div className="w-[80px] bg-[#003d7a]/30 flex flex-col items-center justify-center border-r border-white/20 px-1 text-center">
            <span className="text-[10px] opacity-90">Available</span>
            <span className="text-[11px] font-bold leading-tight">{doctor.slots?.length > 0 ? "Yes" : "Soon"}</span>
          </div>
          <div className="flex-1 flex items-center justify-center font-bold text-[14px]">
            Book Appointment
          </div>
        </div>

        {/* Phone Button */}
        <button className="w-11 h-11 rounded-md border-2 border-[#004f9e] flex items-center justify-center text-[#004f9e] hover:bg-blue-50 transition-colors">
          <Phone size={20} className="fill-current" />
        </button>
      </div>

    </div>
  );
};

export default DoctorCard;
