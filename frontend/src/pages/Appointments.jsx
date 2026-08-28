import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar as CalendarIcon } from 'lucide-react';

const Appointments = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();

  // Mock Data
  const doctor = {
    name: "Dr. Aditi Singhvi",
    designation: "Consultant, Clinical Lead - Adult Heart Failure and Transplant",
    fee: 900,
    hospital: "Narayana Institute of Cardiac Sciences, Bangalore",
    image: "https://via.placeholder.com/150"
  };

  const patient = {
    name: "Abhishek Kumar",
    gender: "Male",
    age: "0 Yrs"
  };

  // Generate some dates
  const generateDates = () => {
    const dates = [];
    const today = new Date('2026-09-01'); // Using a fixed date from screenshot
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      dates.push({
        num: d.getDate(),
        day: d.toLocaleDateString('en-US', { weekday: 'short' }),
        fullDate: d
      });
    }
    return dates;
  };

  const dates = generateDates();
  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const [selectedTime, setSelectedTime] = useState(null);

  const timeSlots = [
    "01:00 PM", "01:10 PM", "01:20 PM", "01:30 PM", "01:40 PM", "01:50 PM", "03:00 PM",
    "03:10 PM", "03:20 PM", "03:30 PM", "03:40 PM", "03:50 PM", "12:20 PM", "12:30 PM"
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-helveticaNeue pb-20">
      
      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="text-[13px] text-gray-500 mb-4 flex items-center gap-1">
            <span onClick={() => navigate('/')} className="text-blue-600 cursor-pointer hover:underline">Home</span>
            <span>&gt;</span>
            <span>Book Appointment</span>
          </div>
          <h1 className="text-[36px] font-bold text-black">Time Slot</h1>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 mt-8 flex flex-col lg:flex-row gap-8">
        
        {/* Left Sidebar */}
        <div className="w-full lg:w-[320px] flex flex-col gap-4">
          
          {/* Patient Details */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[13px] text-gray-500 font-medium">Patient Name</span>
              <button 
                onClick={() => navigate('/doctors')} 
                className="text-[13px] text-[#004f9e] font-medium hover:underline"
              >
                Change Patient
              </button>
            </div>
            <p className="text-[16px] text-black font-bold mb-1">{patient.name}</p>
            <p className="text-[13px] text-gray-500">{patient.gender} | {patient.age}</p>
          </div>

          {/* Doctor Details */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm flex flex-col">
            <div className="p-5 flex gap-4 border-b border-gray-100">
              <div className="w-[70px] h-[70px] rounded-lg bg-gray-100 overflow-hidden shrink-0">
                <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col pt-1">
                <h3 className="text-[16px] font-bold text-black leading-tight mb-1">{doctor.name}</h3>
                <p className="text-[12px] text-gray-600 leading-snug">{doctor.designation}</p>
              </div>
            </div>
            <div className="bg-[#eff4fa] p-4 flex items-center justify-center">
              <span className="text-[14px] text-black">
                Consultation Fee: <strong className="font-bold">₹ {doctor.fee}</strong>
              </span>
            </div>
          </div>

          {/* Hospital Details */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <h4 className="text-[14px] font-bold text-black mb-3">Hospitals & Clinics</h4>
            <div className="flex gap-3">
              <div className="mt-1 w-4 h-4 rounded-full border-4 border-[#004f9e] shrink-0"></div>
              <p className="text-[13px] text-black leading-snug">{doctor.hospital}</p>
            </div>
          </div>

        </div>

        {/* Right Main Area */}
        <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <div className="px-8 py-4 border-b-2 border-[#004f9e] bg-[#eff4fa]/50 text-[#004f9e] font-bold text-[15px] cursor-pointer">
              Hospital Visit
            </div>
          </div>

          <div className="p-8 flex flex-col gap-6">
            
            {/* Date Section */}
            <div className="flex justify-between items-center">
              <h3 className="text-[18px] text-black font-bold">Date</h3>
              <div className="flex items-center gap-2 text-[#004f9e] font-medium text-[14px] cursor-pointer">
                <CalendarIcon size={18} />
                <span>01 Sep, 26</span>
              </div>
            </div>

            {/* Date Carousel */}
            <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-2">
              <button className="text-gray-400 hover:text-black px-2">&lt;</button>
              
              <div className="flex gap-3">
                {dates.map((d, i) => {
                  const isSelected = selectedDate.num === d.num;
                  return (
                    <div 
                      key={i} 
                      onClick={() => setSelectedDate(d)}
                      className={`w-[70px] h-[75px] rounded-lg border flex flex-col items-center justify-center cursor-pointer transition-colors ${
                        isSelected 
                          ? 'border-[#004f9e] bg-[#eff4fa] text-[#004f9e]' 
                          : 'border-gray-200 hover:border-blue-300 text-gray-700'
                      }`}
                    >
                      <span className={`text-[18px] ${isSelected ? 'font-medium' : ''}`}>{d.num}</span>
                      <span className={`text-[13px] ${isSelected ? 'font-medium' : ''}`}>{d.day}</span>
                    </div>
                  );
                })}
              </div>

              <button className="text-gray-400 hover:text-black px-2">&gt;</button>
            </div>

            <div className="border-t border-gray-100 my-2"></div>

            {/* Time Slot Section */}
            <h3 className="text-[18px] text-black font-bold mb-2">Time Slot</h3>
            
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[#f59e0b]">☀️</span>
              <span className="text-[14px] font-medium text-black">Afternoon</span>
            </div>

            {/* Time Slots Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6 gap-3">
              {timeSlots.map((time, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedTime(time)}
                  className={`py-3 rounded-md border text-[13px] font-medium transition-colors ${
                    selectedTime === time
                      ? 'border-[#004f9e] bg-[#004f9e] text-white'
                      : 'border-gray-200 text-black hover:border-[#004f9e] hover:text-[#004f9e]'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>

          </div>

        </div>

      </div>

      {/* Sticky Bottom Bar */}
      {selectedDate && selectedTime && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#004f9e] py-4 px-6 md:px-[20%] flex items-center justify-between shadow-[0_-4px_10px_rgba(0,0,0,0.1)] z-40">
          <p className="text-white text-[15px]">
            Selected Time Slot: <span className="ml-2 font-medium">{selectedDate.num} {selectedDate.fullDate.toLocaleDateString('en-US', { month: 'short' })} | {selectedTime}</span>
          </p>
          <button 
            onClick={() => navigate('/booking-summary')}
            className="bg-white text-[#004f9e] px-6 py-2 rounded font-medium text-[14px] hover:bg-gray-100 transition-colors"
          >
            Continue to Pay
          </button>
        </div>
      )}

    </div>
  );
};

export default Appointments;
