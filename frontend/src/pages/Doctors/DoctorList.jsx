import React from 'react';
import DoctorCard from './DoctorCard';

// Temporary dummy image, will use whatever is available in assets or from API later
import dummyImg from '../../assets/doctors_hero.png';

const dummyDoctors = [
  {
    id: 1,
    name: "Dr. Aditi Singhvi",
    designation: "Consultant, Clinical Lead - Adult Heart Failure and Transplant, Heart Failure & Transplantation Medicine...",
    qualifications: "MBBS, MD (General Medicine), Fellowship (Cardiology), Fellowship (Advanced Heart Failure Transplant...",
    expertise: "Heart Failure & Transplantation Medicine | Advanced Cardio-Pulmonary Therapeutics | Heart Failure & Transplant Cardiology",
    location: "Narayana Institute of Cardiac Sciences, Bangalore",
    availabilityDate: "1st Sep",
    image: dummyImg
  },
  {
    id: 2,
    name: "Dr. Arun B S",
    designation: "Visiting Consultant, Adult Cardiology",
    qualifications: "MBBS, MD (General Medicine), DNB (Cardiology), DM (Cardiology)",
    expertise: "Adult Cardiology | Interventional Cardiology",
    location: "Narayana Multispeciality Hospital, HSR Bangalore",
    availabilityDate: "1st Sep",
    image: dummyImg
  },
  {
    id: 3,
    name: "Dr. Arunkumar Ullegaddi",
    designation: "Consultant, Adult Cardiology",
    qualifications: "MBBS, MD (General Medicine), DM (Cardiology)",
    expertise: "Adult Cardiology | Interventional Cardiology",
    location: "Narayana Institute of Cardiac Sciences, Bangalore",
    availabilityDate: "28th Aug",
    image: dummyImg
  },
  {
    id: 4,
    name: "Dr. Atul Surendra Prabhu",
    designation: "Consultant, Paediatric Cardiology",
    qualifications: "MBBS, MD (Paediatrics), FNB (Paediatric Cardiology)",
    expertise: "Paediatric Cardiology | Fetal Echocardiography",
    location: "Narayana Institute of Cardiac Sciences, Bangalore",
    availabilityDate: "2nd Sep",
    image: dummyImg
  },
  {
    id: 5,
    name: "Dr. Babu Reddy T S",
    designation: "Consultant, Adult Cardiology",
    qualifications: "MBBS, MD (General Medicine), DM (Cardiology)",
    expertise: "Adult Cardiology | Interventional Cardiology",
    location: "Narayana Multispeciality Hospital, HSR Bangalore",
    availabilityDate: "1st Sep",
    image: dummyImg
  },
  {
    id: 6,
    name: "Dr. Bagirath Raghuraman",
    designation: "Senior Consultant, Director - Heart Transplant Program, Adult Cardiology",
    qualifications: "MBBS, MD (Medicine), DM (Cardiology), Fellowship (Heart Transplant)",
    expertise: "Heart Failure | Heart Transplant | Adult Cardiology",
    location: "Narayana Institute of Cardiac Sciences, Bangalore",
    availabilityDate: "29th Aug",
    image: dummyImg
  }
];

const DoctorList = ({ onBookAppointment }) => {
  return (
    <div className="w-full bg-[#f8f9fa] py-12">
      <div className="max-w-[1200px] mx-auto px-4">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyDoctors.map((doc) => (
            <DoctorCard key={doc.id} doctor={doc} onBookAppointment={onBookAppointment} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default DoctorList;
