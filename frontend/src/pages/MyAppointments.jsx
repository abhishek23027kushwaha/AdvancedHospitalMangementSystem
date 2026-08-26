import React, { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, CheckCircle2, CreditCard, Activity, Search } from "lucide-react";
import toast from "react-hot-toast";



const MyAppointments = () => {
  const [doctorAppts, setDoctorAppts] = useState([]);
  const [serviceAppts, setServiceAppts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDoctorAppointments = async () => {
    try {
      const { data } = await axios.get(`/patient/appointments/my`);
      if (data.success) {
        setDoctorAppts(data.appointments);
      }
    } catch (err) {
      console.error("Error fetching doctor appointments:", err);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchDoctorAppointments();
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#114232]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* ── Doctor Appointments Section ────────────────────── */}
        <section id="doctors" className="space-y-10">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#114232]">
              Your Doctor Appointments
            </h2>
            <div className="w-24 h-1 bg-[#114232] mx-auto mt-4 rounded-full" />
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            <AnimatePresence>
              {doctorAppts.length > 0 ? (
                doctorAppts.map((appt, index) => (
                  <motion.div
                    key={appt._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="w-full max-w-[340px] bg-white rounded-[2rem] p-8 shadow-xl shadow-green-900/5 border border-gray-100 flex flex-col items-center text-center group"
                  >
                    {/* Doctor Image with Border */}
                    <div className="relative mb-6">
                      <div className="w-32 h-32 rounded-full border-[3px] border-[#34ad7b] p-1.5 bg-white shadow-lg overflow-hidden">
                        <img
                          src={appt.doctor?.image || "https://via.placeholder.com/150"}
                          alt={appt.doctorName}
                          className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-800 mb-1">{appt.doctorName}</h3>
                    <p className="text-[#34ad7b] font-medium text-sm mb-6 uppercase tracking-wider">
                      {appt.doctorSpecialization}
                    </p>

                    <div className="w-full space-y-3 mb-8">
                      {/* Date Pill */}
                      <div className="flex items-center gap-3 bg-emerald-50/50 border border-emerald-100 px-5 py-2.5 rounded-full text-gray-600 font-bold text-[13px]">
                        <Calendar size={16} className="text-emerald-500" />
                        {appt.date}
                      </div>
                      {/* Time Pill */}
                      <div className="flex items-center gap-3 bg-emerald-50/50 border border-emerald-100 px-5 py-2.5 rounded-full text-gray-600 font-bold text-[13px]">
                        <Clock size={16} className="text-emerald-500" />
                        {appt.timeSlot}
                      </div>
                    </div>

                    {/* Status Badges */}
                    <div className="flex items-center gap-3 mt-auto">
                      <span className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest border ${
                        appt.isPaid 
                          ? 'bg-emerald-100 text-emerald-700 border-emerald-200' 
                          : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                      }`}>
                        <CreditCard size={12} />
                        {appt.paymentMethod}
                      </span>
                      <span className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest border ${
                        appt.status === 'Completed'
                          ? 'bg-gray-100 text-gray-500 border-gray-200'
                          : appt.status === 'Cancelled'
                            ? 'bg-red-50 text-red-500 border-red-100'
                            : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                      }`}>
                        <CheckCircle2 size={12} />
                        {appt.status}
                      </span>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-10 w-full">
                  <p className="text-gray-500 font-medium text-lg">No doctor appointments are booked.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </section>

      </div>
    </div>
  );
};

export default MyAppointments;
