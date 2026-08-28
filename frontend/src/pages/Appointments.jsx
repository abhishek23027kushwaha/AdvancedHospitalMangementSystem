import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Calendar as CalendarIcon } from 'lucide-react';
import axiosInstance from '../utils/axiosInstance';

const Appointments = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const patient = location.state?.patient || {
    name: "Unknown Patient",
    gender: "-",
    age: "-"
  };

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await axiosInstance.get(`/doctor/${doctorId}`);
        if (res.data.success) {
          const doc = res.data.doctor;
          setDoctor(doc);

          // Extract unique dates from slots
          if (doc.slots && doc.slots.length > 0) {
            const uniqueDatesMap = new Map();
            doc.slots.forEach(slot => {
              if (!slot.isBooked) {
                // slot.date format: "22 Mar 2026"
                const d = new Date(slot.date);
                if (!isNaN(d)) {
                  uniqueDatesMap.set(slot.date, {
                    fullStr: slot.date,
                    num: d.getDate(),
                    day: d.toLocaleDateString('en-US', { weekday: 'short' }),
                    fullDate: d
                  });
                }
              }
            });
            const datesArr = Array.from(uniqueDatesMap.values()).sort((a, b) => a.fullDate - b.fullDate);
            setDates(datesArr);
            if (datesArr.length > 0) {
              setSelectedDate(datesArr[0]);
            }
          }
        }
      } catch (err) {
        console.error("Error fetching doctor:", err);
      } finally {
        setLoading(false);
      }
    };
    if (doctorId) fetchDoctor();
  }, [doctorId]);

  // Filter slots for selected date
  const availableSlotsForDate = doctor?.slots?.filter(
    s => s.date === selectedDate?.fullStr && !s.isBooked
  ) || [];

  const handleContinue = () => {
    navigate('/booking-summary', {
      state: {
        doctor,
        patient,
        slot: selectedSlot
      }
    });
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!doctor) return <div className="min-h-screen flex items-center justify-center">Doctor not found.</div>;


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
                Consultation Fee: <strong className="font-bold">₹ {doctor.fee || 'N/A'}</strong>
              </span>
            </div>
          </div>

          {/* Hospital Details */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <h4 className="text-[14px] font-bold text-black mb-3">Hospitals & Clinics</h4>
            <div className="flex gap-3">
              <div className="mt-1 w-4 h-4 rounded-full border-4 border-[#004f9e] shrink-0"></div>
              <p className="text-[13px] text-black leading-snug">{doctor.location || "Hospital Location"}</p>
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
              {selectedDate && (
                <div className="flex items-center gap-2 text-[#004f9e] font-medium text-[14px] cursor-pointer">
                  <CalendarIcon size={18} />
                  <span>{selectedDate.fullStr}</span>
                </div>
              )}
            </div>

            {/* Date Carousel */}
            <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-2">
              <button className="text-gray-400 hover:text-black px-2">&lt;</button>
              
              <div className="flex gap-3">
                {dates.length === 0 ? (
                  <div className="text-gray-500 py-4">No available dates.</div>
                ) : (
                  dates.map((d, i) => {
                    const isSelected = selectedDate?.fullStr === d.fullStr;
                    return (
                      <div 
                        key={i} 
                        onClick={() => {
                          setSelectedDate(d);
                          setSelectedSlot(null); // reset slot on date change
                        }}
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
                })
                )}
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
              {availableSlotsForDate.length === 0 ? (
                <div className="text-gray-500 col-span-full">No slots available for this date.</div>
              ) : (
                availableSlotsForDate.map((slot) => (
                  <button
                    key={slot._id}
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-3 rounded-md border text-[13px] font-medium transition-colors ${
                      selectedSlot?._id === slot._id
                        ? 'border-[#004f9e] bg-[#004f9e] text-white'
                        : 'border-gray-200 text-black hover:border-[#004f9e] hover:text-[#004f9e]'
                    }`}
                  >
                    {slot.time}
                  </button>
                ))
              )}
            </div>

          </div>

        </div>

      </div>

      {/* Sticky Bottom Bar */}
      {selectedSlot && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#004f9e] py-4 px-6 md:px-[20%] flex items-center justify-between shadow-[0_-4px_10px_rgba(0,0,0,0.1)] z-40">
          <p className="text-white text-[15px]">
            Selected Time Slot: <span className="ml-2 font-medium">{selectedDate?.fullStr} | {selectedSlot.time}</span>
          </p>
          <button 
            onClick={handleContinue}
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
