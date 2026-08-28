import React, { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";
import { Search, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const MyServices = () => {
  const navigate = useNavigate();
  const [serviceAppts, setServiceAppts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchServiceAppointments = async () => {
    try {
      const { data } = await axios.get(`/service-appointments/my`);
      if (data.success) {
        setServiceAppts(data.appointments);
      }
    } catch (err) {
      console.error("Error fetching service appointments:", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchServiceAppointments();
      setLoading(false);
    };
    fetchData();
  }, []);

  const filteredAppts = serviceAppts.filter((appt) => {
    const search = searchTerm.toLowerCase();
    return (
      appt.patientName?.toLowerCase().includes(search) ||
      appt.serviceName?.toLowerCase().includes(search)
    );
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Top Header Section */}
      <div className="px-6 sm:px-12 pt-8 pb-4 flex flex-col md:flex-row md:items-center justify-between border-b border-gray-200">
        <div 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 cursor-pointer text-gray-800 hover:text-gray-600 mb-4 md:mb-0 w-fit"
        >
          <ChevronLeft size={20} />
          <h1 className="text-[20px] font-semibold">
            My Tests
          </h1>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by patient"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-200 rounded text-[13px] outline-none focus:border-gray-400 w-full sm:w-[280px]"
            />
          </div>
        </div>
      </div>

      {/* Table Headers */}
      <div className="px-6 sm:px-12 py-3 border-b border-gray-200 grid grid-cols-4 text-[13px] font-semibold text-gray-700 text-center">
        <div className="text-left">Patient Details</div>
        <div>AppointmentDate/Time</div>
        <div>Status</div>
        <div>Tests</div>
      </div>

      {/* Table Body */}
      <div className="px-6 sm:px-12 py-8 min-h-[400px]">
        {loading ? (
           <div className="flex justify-center pt-10">
             <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-400"></div>
           </div>
        ) : filteredAppts.length > 0 ? (
          <div className="flex flex-col gap-4">
            {filteredAppts.map((appt) => (
              <div key={appt._id} className="grid grid-cols-4 items-center text-[13px] text-gray-600 text-center py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <div className="text-left font-medium text-gray-800">
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
                  {appt.serviceName}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center pt-4">
            <span className="text-red-500 text-[13px]">No result found!</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyServices;
