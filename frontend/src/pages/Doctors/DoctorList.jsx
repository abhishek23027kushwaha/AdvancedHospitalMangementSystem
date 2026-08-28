import React from 'react';
import DoctorCard from './DoctorCard';

const DoctorList = ({ doctors = [], onBookAppointment }) => {
  return (
    <div className="w-full bg-[#f8f9fa] py-12">
      <div className="max-w-[1200px] mx-auto px-4">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doc) => (
            <DoctorCard key={doc._id} doctor={doc} onBookAppointment={onBookAppointment} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default DoctorList;
