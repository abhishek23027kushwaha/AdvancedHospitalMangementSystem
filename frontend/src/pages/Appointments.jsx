import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from '../utils/axiosInstance';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Star, Heart, GraduationCap, MapPin, 
  Wallet, CheckCircle, Info, Calendar, Clock, 
  UserPlus, ShieldCheck, Award, MessageSquare, Loader,
  Phone, User, Mail, ChevronRight
} from 'lucide-react';
import gsap from 'gsap';



/* ─── Success Screen ─────────────────────────────────────── */
function SuccessScreen({ data, onReset }) {
  const isCash = data.paymentMethod === 'Cash';

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }} 
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center text-center gap-6 py-12 px-6 bg-[#FFFFFF] rounded-[40px] shadow-2xl border border-[#E2E8F0]"
    >
      <div className="w-28 h-28 rounded-full bg-[#EFF6FF] flex items-center justify-center relative">
        <motion.div 
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }}
          className="absolute inset-0 bg-[#2563EB]/20 rounded-full animate-ping" 
        />
        <CheckCircle className="w-14 h-14 text-[#16A34A] relative z-10" />
      </div>
      <div>
        <h2 className="text-3xl font-black text-[#0F172A] tracking-tight">
          {isCash ? "Booking Pre-Confirmed!" : "Appointment Confirmed!"}
        </h2>
        <p className="text-[#64748B] text-sm mt-3 max-w-sm leading-relaxed">
          {isCash 
            ? `Your appointment with Dr. ${data.doctorName} is registered. Please pay ₹${data.fee} at the clinic.`
            : `Your session with Dr. ${data.doctorName} is all set. We've sent the details to your email.`
          }
        </p>
      </div>

      <div className="w-full max-w-sm bg-[#F8FAFC] rounded-3xl p-6 text-left space-y-3 border border-[#E2E8F0]">
        {[
          { label: "Patient", value: data.name, icon: <UserPlus size={14} className="text-[#2563EB]" /> },
          { label: "Date", value: data.date, icon: <Calendar size={14} className="text-[#2563EB]" /> },
          { label: "Time", value: data.timeSlot, icon: <Clock size={14} className="text-[#2563EB]" /> },
          { label: "Payment", value: data.paymentMethod, icon: <Wallet size={14} className="text-[#2563EB]" /> },
        ].map(({ label, value, icon }) => (
          <div key={label} className="flex justify-between items-center bg-[#FFFFFF] p-3 rounded-2xl border border-[#E2E8F0] shadow-sm">
            <div className="flex items-center gap-2">
              {icon}
              <span className="text-[#64748B] font-bold text-[10px] uppercase tracking-widest">{label}</span>
            </div>
            <span className="text-[#0F172A] font-bold text-sm">{value}</span>
          </div>
        ))}
      </div>

      <button
        onClick={onReset}
        className="mt-4 px-10 py-4 bg-[#2563EB] hover:bg-[#1E40AF] text-white font-black rounded-full text-sm transition-all shadow-xl shadow-blue-200 active:scale-95"
      >
        Book Another Appointment
      </button>
    </motion.div>
  );
}

/* ─── Main Page ──────────────────────────────────────────── */
const Appointments = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const { user: currentUser } = useSelector(state => state.user);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [fetchingDoc, setFetchingDoc] = useState(!!doctorId);
  const [doctorList, setDoctorList] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: currentUser?.name || "",
    phone: currentUser?.phone || "",
    email: currentUser?.email || "",
    age: currentUser?.age || "",
    gender: currentUser?.gender || "",
    doctorId: doctorId || "",
    doctorName: "",
    service: "General Consultation",
    message: "",
    date: "",
    timeSlot: "",
    slotId: "",
    paymentMethod: "Online", // Default
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (currentUser) {
      setForm(prev => ({
        ...prev,
        name: currentUser.name || prev.name,
        phone: currentUser.phone || prev.phone,
        email: currentUser.email || prev.email,
        age: currentUser.age || prev.age,
        gender: currentUser.gender || prev.gender
      }));
    }
  }, [currentUser]);

  const isFormComplete = !!(currentUser && form.name && form.age && form.phone && form.date && form.timeSlot);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(`/doctor/all?available=true`);
        if (data.success) {
          setDoctorList(data.doctors);
          if (doctorId) {
            const doc = data.doctors.find(d => d._id === doctorId);
            if (doc) {
              setSelectedDoctor(doc);
              setForm(prev => ({ ...prev, doctorName: doc.name, doctorId: doc._id }));
              processSlots(doc.slots);
            }
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setFetchingDoc(false);
      }
    };
    fetchDoctors();
  }, [doctorId]);

  useEffect(() => {
    if (form.doctorId && doctorList.length > 0) {
      const doc = doctorList.find(d => d._id === form.doctorId);
      if (doc) {
        setSelectedDoctor(doc);
        setForm(prev => ({ ...prev, doctorName: doc.name }));
        processSlots(doc.slots);
      }
    }
  }, [form.doctorId, doctorList]);

  // GSAP Animation
  useEffect(() => {
    if (selectedDoctor && !fetchingDoc && containerRef.current) {
      gsap.fromTo(
        ".gsap-animate",
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.1, 
          ease: "power3.out",
          delay: 0.2
        }
      );
    }
  }, [selectedDoctor, fetchingDoc]);

  const processSlots = (slots) => {
    if (!slots) return;
    const unbooked = slots.filter(s => !s.isBooked);
    const dates = [...new Set(unbooked.map(s => s.date))].sort();
    setAvailableDates(dates);
    setAvailableSlots(unbooked);
  };

  const update = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setError("");
  };

  const handleDateChange = (date) => {
    update("date", date);
    update("timeSlot", "");
    update("slotId", "");
  };

  const handleSlotSelection = (slot) => {
    update("timeSlot", slot.time);
    update("slotId", slot._id);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!currentUser) return navigate('/login');
    
    // Basic Validation
    if (!form.name || !form.phone || !form.date || !form.timeSlot) {
      setError("Please fill all required fields and select a slot.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { data } = await axios.post(`/patient/appointments/book`, form);
      
      if (data.success) {
        if (form.paymentMethod === 'Cash') {
          setSubmitted(true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          // Razorpay flow
          const { order, appointment, razorpayKeyId } = data;
          const options = {
            key: razorpayKeyId || "rzp_test_SUNI6vBIXNlZ8U",
            amount: order.amount,
            currency: order.currency,
            name: "MediCare Hospital",
            description: `Appointment with ${form.doctorName}`,
            order_id: order.id,
            handler: async (response) => {
              try {
                const verifyRes = await axios.post(`/patient/appointments/verify-payment`, {
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  appointmentId: appointment._id
                });

                if (verifyRes.data.success) {
                  setSubmitted(true);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              } catch (err) {
                setError("Payment verification failed. Please contact support.");
              }
            },
            prefill: { name: form.name, email: form.email, contact: form.phone },
            theme: { color: "#2563EB" }
          };
          const rzp = new window.Razorpay(options);
          rzp.open();
        }
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Booking failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (fetchingDoc) return (
    <div className="h-screen flex items-center justify-center bg-[#F8FAFC]">
      <div className="w-10 h-10 border-4 border-[#DBEAFE] border-t-[#2563EB] rounded-full animate-spin"></div>
    </div>
  );

  if (!selectedDoctor) return (
    <div className="h-screen flex flex-col items-center justify-center gap-4 bg-[#F8FAFC]">
      <p className="text-[#64748B] font-medium">Please select a doctor to continue.</p>
      <Link to="/doctors" className="px-6 py-2 bg-[#2563EB] text-white rounded-full font-bold">Go to Doctors</Link>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#F8FAFC] pb-20"
      ref={containerRef}
    >
      
      {/* ── Header ─────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[#E2E8F0] px-6 py-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 group">
          <div className="p-2.5 rounded-2xl border border-[#E2E8F0] bg-white shadow-sm group-hover:bg-[#EFF6FF] transition-all">
            <ArrowLeft size={18} className="text-[#2563EB]" />
          </div>
          <span className="text-[#0F172A] font-black text-sm uppercase tracking-wider">Back</span>
        </button>
        <h2 className="text-[#0F172A] font-black text-xl tracking-tight hidden sm:block">Doctor Profile</h2>
        <div className="flex items-center gap-1 bg-[#F59E0B]/10 px-3 py-1.5 rounded-2xl border border-[#F59E0B]/20 shadow-sm">
          <Star size={16} fill="#F59E0B" className="text-[#F59E0B]" />
          <span className="text-[#0F172A] font-black text-sm">{selectedDoctor.rating || '4.8'}</span>
        </div>
      </nav>

      {submitted ? (
        <div className="max-w-2xl mx-auto mt-20 px-6">
          <SuccessScreen data={{...form, fee: selectedDoctor.fee}} onReset={() => window.location.reload()} />
        </div>
      ) : (
        <div className="max-w-[1300px] mx-auto pt-10 px-6">
          
          {/* ── Doctor Info Card ──────────────────────────────── */}
          <div className="bg-gradient-to-br from-[#FFFFFF] to-[#EFF6FF] rounded-3xl shadow-lg border border-[#DBEAFE] p-6 md:p-8 relative overflow-hidden mb-8 gsap-animate transition-all duration-500 hover:shadow-2xl hover:shadow-blue-200/50">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#BFDBFE] rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none opacity-50" />
            
            <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-12 relative z-10">
              <div className="flex flex-col items-center gap-6">
                <div className="relative" style={{ perspective: "1000px" }}>
                  <motion.div 
                    whileHover={{ scale: 1.05, rotateY: 15, rotateX: -10 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="w-40 h-40 rounded-full p-1 bg-gradient-to-br from-[#2563EB]/80 to-[#1E40AF]/80 shadow-2xl"
                  >
                    <div className="w-full h-full rounded-full border-[4px] border-[#FFFFFF] overflow-hidden">
                      <img 
                        src={selectedDoctor.image || 'https://via.placeholder.com/300'} 
                        alt={selectedDoctor.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </motion.div>
                  <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -inset-4 border-[2px] border-[#93C5FD] rounded-full pointer-events-none" />
                </div>
                
                <div className="grid grid-cols-3 gap-3 w-full">
                  {[
                    { label: 'Success', value: selectedDoctor.success ? `${selectedDoctor.success}%` : '98%', icon: <Heart size={16} />, color: 'text-[#16A34A]', bg: 'bg-[#16A34A]/10' },
                    { label: 'Exp', value: `${selectedDoctor.experience || 5}Y`, icon: <Award size={16} />, color: 'text-[#F59E0B]', bg: 'bg-[#F59E0B]/10' },
                    { label: 'Patients', value: selectedDoctor.patients || '500+', icon: <UserPlus size={16} />, color: 'text-[#2563EB]', bg: 'bg-[#2563EB]/10' },
                  ].map((s, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ y: -5, scale: 1.05, rotateZ: i === 1 ? 0 : (i === 0 ? -2 : 2) }}
                      className="bg-[#FFFFFF]/80 backdrop-blur-sm rounded-2xl flex flex-col items-center gap-1.5 p-3 shadow-md border border-[#E2E8F0] cursor-pointer"
                    >
                      <div className={`p-1.5 rounded-lg ${s.bg} ${s.color} flex items-center justify-center`}>{s.icon}</div>
                      <p className="text-sm font-black text-[#0F172A] leading-none">{s.value}</p>
                      <p className="text-[9px] text-[#64748B] font-bold uppercase tracking-wider">{s.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-6 text-left">
                <div>
                  <h1 className="text-3xl md:text-4xl font-black text-[#0F172A] tracking-tight mb-2">Dr. {selectedDoctor.name}</h1>
                  <span className="inline-flex items-center gap-2 bg-[#2563EB] text-[#FFFFFF] px-5 py-2 rounded-2xl text-[13px] font-black shadow-lg shadow-[#2563EB]/20">
                    <Heart size={14} fill="currentColor" />
                    {selectedDoctor.specialization}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Qualifications', value: selectedDoctor.qualifications || 'MBBS, MD', icon: <GraduationCap size={18} /> },
                    { label: 'Location', value: selectedDoctor.location || 'Mumbai, India', icon: <MapPin size={18} /> },
                    { label: 'Consultation Fee', value: `₹${selectedDoctor.fee}`, icon: <Wallet size={18} />, textStyle: 'text-[#E11D48] font-black' },
                    { label: 'Availability', value: selectedDoctor.available ? 'Available' : 'On Leave', icon: <CheckCircle size={18} />, textStyle: 'text-[#16A34A] font-black' },
                  ].map((info, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ scale: 1.05, rotateX: 5, rotateY: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="flex items-center gap-4 bg-[#F8FAFC]/80 backdrop-blur-sm border border-[#E2E8F0] p-4 rounded-3xl shadow-sm cursor-pointer hover:shadow-md hover:border-[#BFDBFE]"
                      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#FFFFFF] border border-[#E2E8F0] flex items-center justify-center text-[#2563EB] shrink-0 shadow-sm" style={{ transform: "translateZ(20px)" }}>{info.icon}</div>
                      <div style={{ transform: "translateZ(10px)" }}>
                        <p className="text-[10px] font-black text-[#64748B] uppercase tracking-widest leading-none mb-1">{info.label}</p>
                        <p className={`text-[13px] font-black text-[#0F172A] ${info.textStyle || ''}`}>{info.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div 
                  whileHover={{ scale: 1.02, rotateX: 2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="bg-[#EFF6FF] rounded-2xl p-5 border border-[#DBEAFE] shadow-sm hover:shadow-md cursor-pointer"
                  style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
                >
                  <p className="text-[#0F172A] text-sm leading-relaxed font-bold" style={{ transform: "translateZ(10px)" }}>
                    <Info className="inline mr-2 text-[#2563EB]" size={16} />
                    {selectedDoctor.about || 'A highly dedicated medical professional with extensive experience in providing comprehensive patient care and innovative treatment solutions...'}
                  </p>
                </motion.div>
              </div>
            </div>
          </div>

          {/* ── Booking & Patient Details Section ────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8">
            
            <div className="space-y-8">
              {/* 1. Date Selection */}
              <div className="bg-[#FFFFFF] rounded-3xl p-6 shadow-sm border border-[#E2E8F0] gsap-animate">
                <h3 className="text-lg font-black text-[#0F172A] flex items-center gap-2 mb-6">
                  <Calendar size={22} className="text-[#2563EB]" />
                  Select Date
                </h3>
                <div className="flex flex-wrap gap-4">
                  {availableDates.length > 0 ? (
                    availableDates.map((date) => {
                      const d = new Date(date);
                      const day = d.toLocaleDateString('en-GB', { weekday: 'short' });
                      const num = d.toLocaleDateString('en-GB', { day: 'numeric' });
                      const mon = d.toLocaleDateString('en-GB', { month: 'short' });
                      
                      return (
                        <button
                          key={date} type="button"
                          onClick={() => handleDateChange(date)}
                          className={`w-16 h-20 rounded-2xl flex flex-col items-center justify-center gap-1 border-2 transition-all duration-300 ${
                            form.date === date
                              ? "bg-[#2563EB] border-[#2563EB] text-[#FFFFFF] shadow-lg shadow-[#2563EB]/20"
                              : "bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B] hover:border-[#DBEAFE]"
                          }`}
                        >
                          <span className={`text-[10px] font-bold uppercase ${form.date === date ? 'text-[#EFF6FF]' : 'text-[#64748B]'}`}>{day}</span>
                          <span className="text-lg font-black">{num}</span>
                          <span className={`text-[10px] font-bold uppercase ${form.date === date ? 'text-[#EFF6FF]' : 'text-[#64748B]'}`}>{mon}</span>
                        </button>
                      );
                    })
                  ) : (
                    <p className="text-[#64748B] font-bold italic py-4">No slots available currently</p>
                  )}
                </div>
              </div>

              {/* 2. Patient Details Form */}
              <div className="bg-[#FFFFFF] rounded-3xl p-6 shadow-sm border border-[#E2E8F0] gsap-animate">
                <h3 className="text-lg font-black text-[#0F172A] flex items-center gap-2 mb-6">
                  <UserPlus size={22} className="text-[#2563EB]" />
                  Patient Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="relative group sm:col-span-1">
                    <User className="absolute left-4 top-4 text-[#94A3B8] group-focus-within:text-[#2563EB] transition-colors" size={18} />
                    <input 
                      type="text" placeholder="Full Name" 
                      value={form.name} onChange={(e) => update('name', e.target.value)}
                      className="w-full pl-12 pr-6 py-4 bg-[#F8FAFC] border-2 border-[#E2E8F0] focus:border-[#2563EB] focus:bg-[#FFFFFF] rounded-2xl outline-none font-bold text-sm text-[#0F172A] transition-all placeholder:text-[#94A3B8]"
                    />
                  </div>
                  <div className="relative group">
                    <Award className="absolute left-4 top-4 text-[#94A3B8] group-focus-within:text-[#2563EB] transition-colors" size={18} />
                    <input 
                      type="number" placeholder="Age" 
                      value={form.age} onChange={(e) => update('age', e.target.value)}
                      className="w-full pl-12 pr-6 py-4 bg-[#F8FAFC] border-2 border-[#E2E8F0] focus:border-[#2563EB] focus:bg-[#FFFFFF] rounded-2xl outline-none font-bold text-sm text-[#0F172A] transition-all placeholder:text-[#94A3B8]"
                    />
                  </div>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-4 text-[#94A3B8] group-focus-within:text-[#2563EB] transition-colors" size={18} />
                    <input 
                      type="tel" placeholder="Mobile Number (10 digits)" 
                      value={form.phone} onChange={(e) => update('phone', e.target.value)}
                      className="w-full pl-12 pr-6 py-4 bg-[#F8FAFC] border-2 border-[#E2E8F0] focus:border-[#2563EB] focus:bg-[#FFFFFF] rounded-2xl outline-none font-bold text-sm text-[#0F172A] transition-all placeholder:text-[#94A3B8]"
                    />
                  </div>
                  <div className="relative group">
                    <User className="absolute left-4 top-4 text-[#94A3B8] group-focus-within:text-[#2563EB] transition-colors" size={18} />
                    <select 
                      value={form.gender} onChange={(e) => update('gender', e.target.value)}
                      className="w-full pl-12 pr-6 py-4 bg-[#F8FAFC] border-2 border-[#E2E8F0] focus:border-[#2563EB] focus:bg-[#FFFFFF] rounded-2xl outline-none font-bold text-sm text-[#0F172A] transition-all appearance-none"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="relative group sm:col-span-2">
                    <Mail className="absolute left-4 top-4 text-[#94A3B8] group-focus-within:text-[#2563EB] transition-colors" size={18} />
                    <input 
                      type="email" placeholder="Email (optional - for receipts)" 
                      value={form.email} onChange={(e) => update('email', e.target.value)}
                      className="w-full pl-12 pr-6 py-4 bg-[#F8FAFC] border-2 border-[#E2E8F0] focus:border-[#2563EB] focus:bg-[#FFFFFF] rounded-2xl outline-none font-bold text-sm text-[#0F172A] transition-all placeholder:text-[#94A3B8]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ── Summary & Slot Selection ────────────────────── */}
            <div className="space-y-6">
              
              {/* Slots Section */}
              <div className="bg-[#FFFFFF] rounded-3xl p-6 border border-[#E2E8F0] shadow-sm gsap-animate">
                <h3 className="text-base font-black text-[#0F172A] flex items-center gap-2 mb-5">
                  <Clock size={20} className="text-[#2563EB]" />
                  Available Time Slots
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {form.date ? (
                    availableSlots
                      .filter((s) => s.date === form.date)
                      .map((slot) => (
                        <button
                          key={slot._id} type="button"
                          onClick={() => handleSlotSelection(slot)}
                          className={`py-3 rounded-xl text-[11px] font-black border-2 transition-all ${
                            form.timeSlot === slot.time
                              ? "bg-[#2563EB] border-[#2563EB] text-[#FFFFFF] shadow-md shadow-[#2563EB]/20"
                              : "bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B] hover:border-[#DBEAFE]"
                          }`}
                        >
                          {slot.time}
                        </button>
                      ))
                  ) : (
                    <div className="col-span-3 text-center py-6 text-[#64748B] font-bold italic text-sm">Select a date to view slots</div>
                  )}
                </div>
              </div>

              {/* Final Summary Card */}
              <div className="bg-[#FFFFFF] rounded-3xl p-6 shadow-sm border border-[#E2E8F0] space-y-6 gsap-animate">
                <h4 className="text-xs font-black text-[#2563EB] uppercase tracking-[0.2em] mb-2">Booking Summary</h4>
                
                <div className="space-y-4">
                  {[
                    { label: 'Patient Name:', value: form.name || 'Not provided', color: form.name ? 'text-[#0F172A] italic' : 'text-[#64748B]/60' },
                    { label: 'Patient Age:', value: form.age || 'Not provided', color: form.age ? 'text-[#0F172A] italic' : 'text-[#64748B]/60' },
                    { label: 'Patient Phone:', value: form.phone || 'Not provided', color: form.phone ? 'text-[#0F172A] italic' : 'text-[#64748B]/60' },
                    { label: 'Selected Doctor:', value: `Dr. ${selectedDoctor.name}`, color: 'text-[#0F172A]' },
                    { label: 'Doctor Speciality:', value: selectedDoctor.specialization, color: 'text-[#64748B]' },
                    { label: 'Selected Date:', value: form.date || 'Not selected', color: form.date ? 'text-[#0F172A]' : 'text-[#64748B] font-bold' },
                    { label: 'Selected Time:', value: form.timeSlot || 'Not selected', color: form.timeSlot ? 'text-[#0F172A]' : 'text-[#64748B] font-bold' },
                    { label: 'Consultation Fee:', value: `₹${selectedDoctor.fee}`, color: 'text-[#E11D48] font-black' },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center text-xs">
                      <span className="text-[#64748B] font-bold">{item.label}</span>
                      <span className={`font-black ${item.color || 'text-[#0F172A]'}`}>{item.value}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-dashed border-[#E2E8F0]">
                   <div className="flex items-center justify-between mb-6">
                    <span className="text-sm font-black text-[#0F172A]">Payment:</span>
                    <div className="flex bg-[#F8FAFC] p-1 rounded-2xl border border-[#E2E8F0]">
                      {['Cash', 'Online'].map((method) => (
                        <button
                          key={method}
                          onClick={() => update('paymentMethod', method)}
                          className={`px-6 py-2 rounded-xl text-xs font-black transition-all ${
                            form.paymentMethod === method
                              ? "bg-[#2563EB] text-[#FFFFFF] shadow-md shadow-[#2563EB]/20"
                              : "text-[#64748B] hover:text-[#0F172A]"
                          }`}
                        >
                          {method}
                        </button>
                      ))}
                    </div>
                   </div>

                   {error && <p className="text-[#E11D48] text-[11px] font-bold text-center mb-4">{error}</p>}

                   <button 
                    onClick={handleSubmit} disabled={loading}
                    className={`w-full py-4 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2 shadow-lg group ${
                      isFormComplete 
                        ? "bg-[#2563EB] text-[#FFFFFF] shadow-[#2563EB]/20 hover:bg-[#1E40AF]" 
                        : "bg-[#E2E8F0] text-[#64748B] shadow-slate-100 cursor-not-allowed"
                    }`}
                  >
                    {loading ? <Loader className="animate-spin" size={20} /> : <ShieldCheck size={20} className={isFormComplete ? "group-hover:scale-110 transition-transform" : ""} />}
                    Confirm Booking
                    <ChevronRight size={18} className={`transition-transform ${isFormComplete ? "group-hover:translate-x-1" : ""}`} />
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>
      )}
    </motion.div>
  );
};

export default Appointments;
