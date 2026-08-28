import React, { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";
import { Search } from "lucide-react";
import toast from "react-hot-toast";

const MyAppointments = () => {
  const [doctorAppts, setDoctorAppts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredAppts = doctorAppts.filter((appt) => {
    const search = searchTerm.toLowerCase();
    return (
      appt.doctorName?.toLowerCase().includes(search) ||
      appt.patientName?.toLowerCase().includes(search)
    );
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Top Header Section */}
      <div className="px-6 sm:px-12 pt-8 pb-4 flex flex-col md:flex-row md:items-center justify-between border-b border-gray-200">
        <h1 className="text-[22px] font-semibold text-gray-800 mb-4 md:mb-0">
          My Consultations
        </h1>
        
        <div className="flex items-center gap-6">
          <button className="text-[#10b981] font-semibold text-[14px] hover:underline">
            Past Consultations
          </button>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by patient or consultant"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-300 rounded text-[14px] outline-none focus:border-[#10b981] w-full sm:w-[280px]"
            />
          </div>
        </div>
      </div>

      {/* Table Headers */}
      <div className="px-6 sm:px-12 py-3 border-b border-gray-200 grid grid-cols-5 text-[13px] font-semibold text-gray-700 text-center">
        <div className="text-left">Consultant Name</div>
        <div>Patient Name</div>
        <div>Appointment Time</div>
        <div>Status</div>
        <div>Attachments</div>
      </div>

      {/* Table Body */}
      <div className="px-6 sm:px-12 py-8 min-h-[400px]">
        {loading ? (
           <div className="flex justify-center pt-10">
             <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#10b981]"></div>
           </div>
        ) : filteredAppts.length > 0 ? (
          <div className="flex flex-col gap-4">
            {filteredAppts.map((appt) => (
              <div key={appt._id} className="grid grid-cols-5 items-center text-[14px] text-gray-600 text-center py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <div className="text-left font-medium text-gray-800">
                  {appt.doctorName}
                </div>
                <div>
                  {appt.patientName || "Self"}
                </div>
                <div>
                  {appt.date} <br/>
                  <span className="text-xs text-gray-500">{appt.timeSlot}</span>
                </div>
                <div>
                  <span className={`px-3 py-1 rounded-full text-[12px] font-medium ${
                    appt.status === 'Completed' ? 'bg-gray-100 text-gray-600' : 
                    appt.status === 'Cancelled' ? 'bg-red-50 text-red-600' : 
                    'bg-green-50 text-[#10b981]'
                  }`}>
                    {appt.status}
                  </span>
                </div>
                <div>
                  <button className="text-[#10b981] text-xs font-semibold hover:underline">View</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center pt-4">
            <span className="text-red-500 text-[14px]">No consultations found!</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;
