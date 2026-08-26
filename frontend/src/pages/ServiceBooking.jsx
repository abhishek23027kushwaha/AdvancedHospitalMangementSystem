import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from '../utils/axiosInstance';
import { toast } from 'react-hot-toast';

const ServiceBooking = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    age: '',
    gender: '',
    email: '',
    paymentMethod: 'Online'
  });

  // Booking State
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedSlotId, setSelectedSlotId] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    fetchServiceDetails();
    // Load user data if available (optional, can be done via context)
  }, [serviceId]);

  const fetchServiceDetails = async () => {
    try {
      const { data } = await axios.get(`/services/${serviceId}`);
      if (data.success) {
        setService(data.service);
        // Find first available slot to pre-select
        const availableSlots = data.service.slots.filter(s => !s.isBooked);
        if (availableSlots.length > 0) {
           // Group by date for the UI
        }
      }
    } catch (err) {
      toast.error("Failed to load service details");
      navigate('/services');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBooking = async () => {
    if (!formData.fullName || !formData.mobile || !formData.age || !formData.gender || !selectedDate || !selectedTime) {
      toast.error("Please fill all required fields and select a slot");
      return;
    }

    setBookingLoading(true);
    try {
      const bookingData = {
        serviceId,
        slotId: selectedSlotId,
        date: selectedDate,
        timeSlot: selectedTime,
        patientName: formData.fullName,
        patientEmail: formData.email,
        patientPhone: formData.mobile,
        patientAge: parseInt(formData.age),
        patientGender: formData.gender,
        paymentMethod: formData.paymentMethod
      };

      const { data } = await axios.post(`/service-appointments/book`, bookingData);

      if (data.success) {
        if (formData.paymentMethod === 'Online' && data.order) {
          initPay(data.order, data.appointment._id, data.razorpayKeyId);
        } else {
          toast.success("Booking confirmed successfully!");
          navigate('/services');
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed");
    } finally {
      if (formData.paymentMethod !== 'Online') setBookingLoading(false);
    }
  };

  const initPay = (order, appointmentId, razorpayKeyId) => {
    const options = {
      key: razorpayKeyId || "rzp_test_SUNI6vBIXNlZ8U", // Fallback if missing
      amount: order.amount,
      currency: order.currency,
      name: "MediCare Hospital",
      description: `Payment for ${service.name}`,
      order_id: order.id,
      handler: async (response) => {
        try {
          const { data } = await axios.post(`/service-appointments/verify-payment`, {
            ...response,
            appointmentId
          });

          if (data.success) {
            toast.success("Payment successful & booking confirmed!");
            navigate('/services');
          }
        } catch (error) {
          toast.error("Payment verification failed");
        }
      },
      prefill: {
        name: formData.fullName,
        email: formData.email,
        contact: formData.mobile
      },
      theme: {
        color: "#114232"
      },
      modal: {
        ondismiss: () => setBookingLoading(false)
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-[#F8FAFC]">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#2563EB]"></div>
    </div>
  );

  if (!service) return null;

  // Group slots by date
  const groupedSlots = service.slots.reduce((acc, slot) => {
    if (!slot.isBooked) {
      if (!acc[slot.date]) acc[slot.date] = [];
      acc[slot.date].push(slot);
    }
    return acc;
  }, {});

  const availableDates = Object.keys(groupedSlots);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-[#F8FAFC] min-h-screen">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-[#2563EB] font-medium mb-6 hover:text-[#1E40AF] transition-colors bg-white px-4 py-2 rounded-xl shadow-sm border border-[#E2E8F0]"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Section: Form & Service Media */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Service Header Card */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#E2E8F0] p-6 flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2 rounded-xl overflow-hidden h-48 bg-[#F8FAFC]">
              <img 
                src={service.image} 
                alt={service.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 space-y-4">
              <h1 className="text-2xl font-black text-[#0F172A] capitalize">{service.name}</h1>
              
              <div className="bg-[#EFF6FF] p-4 rounded-xl border border-[#DBEAFE]">
                <div className="flex items-center gap-2 text-[#2563EB] font-bold mb-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  About This Service
                </div>
                <p className="text-[#64748B] text-sm leading-relaxed">
                  {service.about || "Quality healthcare service tailored for your needs."}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-[#EFF6FF] text-[#2563EB] px-4 py-2 rounded-xl font-black text-lg border border-[#DBEAFE]">
                  ₹{service.price}
                </div>
              </div>

              {service.instructions?.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-[#0F172A] font-bold flex items-center gap-2 text-sm">
                    Pre-Test Instructions
                  </h3>
                  <ul className="list-disc list-inside text-xs text-[#64748B] space-y-1">
                    {service.instructions.map((inst, i) => (
                      <li key={i}>{inst}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Patient Details Form */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E2E8F0]">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#EFF6FF] p-2 rounded-lg text-[#2563EB]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-[#0F172A]">Your Details</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#64748B] ml-1">Full Name *</label>
                <input 
                  type="text" 
                  name="fullName"
                  placeholder="Full Name *"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#2563EB] focus:bg-white outline-none transition-all text-sm text-[#0F172A]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#64748B] ml-1">Mobile (10 digits) *</label>
                <input 
                  type="tel" 
                  name="mobile"
                  placeholder="Mobile *"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  maxLength={10}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#2563EB] focus:bg-white outline-none transition-all text-sm text-[#0F172A]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#64748B] ml-1">Age *</label>
                <input 
                  type="number" 
                  name="age"
                  placeholder="Age *"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#2563EB] focus:bg-white outline-none transition-all text-sm text-[#0F172A]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#64748B] ml-1">Select Gender *</label>
                <select 
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#2563EB] focus:bg-white outline-none transition-all text-sm text-[#0F172A]"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-semibold text-[#64748B] ml-1">Email (optional)</label>
                <input 
                  type="email" 
                  name="email"
                  placeholder="Email (optional)"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#2563EB] focus:bg-white outline-none transition-all text-sm text-[#0F172A]"
                />
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <h3 className="text-xs font-bold text-[#64748B] ml-1 uppercase tracking-wider">Payment Method</h3>
              <div className="flex gap-3">
                {['Cash', 'Online'].map(method => (
                  <button
                    key={method}
                    onClick={() => setFormData(prev => ({ ...prev, paymentMethod: method }))}
                    className={`px-6 py-2 rounded-xl text-sm font-bold transition-all border ${
                      formData.paymentMethod === method 
                        ? 'bg-[#2563EB] border-[#2563EB] text-white shadow-md shadow-[#2563EB]/20' 
                        : 'bg-white border-[#E2E8F0] text-[#64748B] hover:border-[#BFDBFE]'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Summary & Slot Selection */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Booking Summary Card */}
          <div className="bg-[#FFFFFF] rounded-2xl p-6 border border-[#E2E8F0] shadow-sm sticky top-24">
            <h2 className="text-lg font-black text-[#0F172A] mb-4 flex items-center gap-2">
              Booking Summary
            </h2>
            
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-[#F1F5F9]">
                <span className="text-[#64748B] font-bold">Name:</span>
                <span className="text-[#0F172A] font-bold text-right">{formData.fullName || 'Not filled'}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[#F1F5F9]">
                <span className="text-[#64748B] font-bold">Mobile:</span>
                <span className="text-[#0F172A] font-bold text-right">{formData.mobile || 'Not filled'}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[#F1F5F9]">
                <span className="text-[#64748B] font-bold">Age:</span>
                <span className="text-[#0F172A] font-bold text-right">{formData.age || 'Not filled'}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[#F1F5F9]">
                <span className="text-[#64748B] font-bold">Gender:</span>
                <span className="text-[#0F172A] font-bold text-right">{formData.gender || 'Not filled'}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[#F1F5F9]">
                <span className="text-[#64748B] font-bold">Date:</span>
                <span className="text-[#0F172A] font-bold text-right">{selectedDate || 'Not selected'}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[#F1F5F9]">
                <span className="text-[#64748B] font-bold">Time:</span>
                <span className="text-[#0F172A] font-bold text-right">{selectedTime || 'Not selected'}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[#F1F5F9]">
                <span className="text-[#64748B] font-bold">Payment:</span>
                <span className="text-[#0F172A] font-bold text-right">{formData.paymentMethod}</span>
              </div>
              <div className="flex justify-between items-center pt-3">
                <span className="text-[#0F172A] font-black text-sm">Price:</span>
                <span className="text-[#2563EB] font-black text-sm">₹{service.price}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Slots Section - Full Width */}
        <div className="lg:col-span-12 space-y-8 pb-16">
          
          <div className="space-y-4">
            <h2 className="text-lg font-black text-[#0F172A]">Select Date *</h2>
            <div className="flex flex-wrap gap-3">
              {availableDates.length > 0 ? availableDates.map(date => (
                <button
                  key={date}
                  onClick={() => {
                    setSelectedDate(date);
                    setSelectedTime('');
                    setSelectedSlotId(null);
                  }}
                  className={`px-5 py-2.5 rounded-xl font-bold transition-all border text-sm ${
                    selectedDate === date 
                      ? 'bg-[#2563EB] border-[#2563EB] text-white shadow-md shadow-[#2563EB]/20 scale-[1.02]' 
                      : 'bg-white border-[#E2E8F0] text-[#64748B] hover:border-[#BFDBFE]'
                  }`}
                >
                  {date}
                </button>
              )) : (
                <p className="text-[#94A3B8] italic text-sm">No slots available for this service.</p>
              )}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {selectedDate && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <h2 className="text-lg font-black text-[#0F172A]">Select Time *</h2>
                <div className="flex flex-wrap gap-3">
                  {groupedSlots[selectedDate].map(slot => (
                    <button
                      key={slot._id}
                      onClick={() => {
                        setSelectedTime(slot.time);
                        setSelectedSlotId(slot._id);
                      }}
                      className={`px-5 py-2.5 rounded-xl font-bold transition-all border text-sm flex items-center gap-1.5 ${
                        selectedTime === slot.time 
                          ? 'bg-[#2563EB] border-[#2563EB] text-white shadow-md shadow-[#2563EB]/20 scale-[1.02]' 
                          : 'bg-white border-[#E2E8F0] text-[#64748B] hover:border-[#BFDBFE]'
                      }`}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {slot.time}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-center pt-6">
            <button
              onClick={handleBooking}
              disabled={bookingLoading}
              className={`group flex items-center justify-center gap-3 px-10 py-4 rounded-xl font-black text-sm transition-all shadow-lg relative overflow-hidden ${
                bookingLoading || !selectedDate || !selectedTime || !formData.fullName
                  ? 'bg-[#E2E8F0] text-[#64748B] cursor-not-allowed border-none'
                  : 'bg-[#2563EB] text-white hover:bg-[#1E40AF] active:scale-95 shadow-[#2563EB]/20'
              }`}
            >
              {bookingLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
              ) : (
                <>
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                  Confirm Booking • ₹{service.price}
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ServiceBooking;
