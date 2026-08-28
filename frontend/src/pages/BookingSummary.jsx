import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Pencil } from 'lucide-react';
import { toast } from 'react-hot-toast';
import axiosInstance from '../utils/axiosInstance';
import paymentBanner from '../assets/payment_banner.png';

const BookingSummary = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [bookingLoading, setBookingLoading] = useState(false);

  // Destructure passed state
  const { doctor, patient, slot } = location.state || {};

  // If accessed directly without state, go back
  if (!doctor || !slot) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="mb-4">No booking details found.</p>
        <button onClick={() => navigate('/doctors')} className="text-blue-600 hover:underline">Back to Doctors</button>
      </div>
    );
  }

  const handlePayOnline = async () => {
    setBookingLoading(true);
    try {
      const bookingData = {
        doctorId: doctor._id,
        slotId: slot._id,
        date: slot.date,
        timeSlot: slot.time,
        name: patient.name,
        gender: patient.gender,
        age: patient.age,
        paymentMethod: 'Online'
      };

      const { data } = await axiosInstance.post('/patient/appointments/book', bookingData);

      if (data.success && data.order) {
        initPay(data.order, data.appointment._id, data.razorpayKeyId);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to initiate booking");
      setBookingLoading(false);
    }
  };

  const initPay = (order, appointmentId, razorpayKeyId) => {
    if (!window.Razorpay) {
      toast.error("Razorpay SDK failed to load. Please disable adblockers or check your connection.");
      setBookingLoading(false);
      return;
    }

    try {
      const options = {
        key: razorpayKeyId || "rzp_test_SUNI6vBIXNlZ8U", // Fallback if missing
        amount: order.amount,
        currency: order.currency,
        name: "Narayana Health",
        description: `Consultation with ${doctor.name}`,
        order_id: order.id,
        handler: async (response) => {
          try {
            const { data } = await axiosInstance.post(`/patient/appointments/verify-payment`, {
              ...response,
              appointmentId
            });

            if (data.success) {
              toast.success("Payment successful & appointment confirmed!");
              navigate('/appointments'); // Corrected from my-appointments
            }
          } catch (error) {
            toast.error("Payment verification failed");
          }
        },
        prefill: {
          name: patient?.name || "Patient"
        },
        theme: {
          color: "#004f9e"
        },
        modal: {
          ondismiss: () => setBookingLoading(false)
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response){
         toast.error(response.error.description || "Payment failed");
         setBookingLoading(false);
      });
      rzp.open();
    } catch (err) {
      console.error("Razorpay error:", err);
      toast.error("Something went wrong with the payment gateway.");
      setBookingLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-helveticaNeue pb-20">
      
      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="text-[13px] text-gray-500 mb-4 flex items-center gap-1">
            <span onClick={() => navigate('/')} className="text-blue-600 cursor-pointer hover:underline">Home</span>
            <span>&gt;</span>
            <span>Booking Summary</span>
          </div>
          <h1 className="text-[36px] font-bold text-black">Booking Summary</h1>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 mt-8 flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Left Column - Details */}
        <div className="w-full lg:w-[400px] flex flex-col gap-4">
          
          {/* Time Slot Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex items-center justify-between">
            <span className="text-[15px] font-bold text-black">Time Slot</span>
            <div className="flex items-center gap-3">
              <span className="text-[14px] text-black">{slot.date} | {slot.time}</span>
              <button 
                onClick={() => navigate(-1)}
                className="flex items-center gap-1 text-[#004f9e] font-medium text-[14px] hover:underline"
              >
                <Pencil size={14} /> Edit
              </button>
            </div>
          </div>

          {/* Coupon Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex items-center justify-between">
            <span className="text-[15px] font-bold text-black">Coupon</span>
            <button className="text-[#004f9e] font-medium text-[14px] hover:underline underline-offset-2">
              Apply Coupons
            </button>
          </div>

          {/* Payment Details Card */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-5 flex flex-col gap-4">
              <h3 className="text-[15px] font-bold text-black">Payment Details</h3>
              
              <div className="flex justify-between items-center text-[14px]">
                <span className="text-gray-500">Consultation Fees</span>
                <span className="text-black font-bold">₹ {doctor.fee || 'N/A'}</span>
              </div>
            </div>
            
            <div className="bg-[#eff4fa] p-5 flex justify-between items-center border-t border-gray-100">
              <span className="text-[15px] text-black font-medium">Total Fees</span>
              <span className="text-[16px] text-black font-bold">₹ {doctor.fee || 0}</span>
            </div>
          </div>

        </div>

        {/* Right Column - Banner */}
        <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-[20px] font-medium text-black mb-6">Benefits Of Paying Online</h3>
          <div className="w-full rounded-xl overflow-hidden shadow-sm">
            <img 
              src={paymentBanner} 
              alt="Benefits of paying online" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#004f9e] py-4 px-6 md:px-[20%] flex items-center justify-between shadow-[0_-4px_10px_rgba(0,0,0,0.1)] z-40">
        <div className="flex flex-col">
          <span className="text-white/90 text-[15px] font-medium">Total Fees</span>
          <span className="text-white text-[22px] font-black tracking-wide">₹ {doctor.fee || 0}</span>
        </div>
        <button 
          onClick={handlePayOnline}
          disabled={bookingLoading}
          className={`bg-white text-[#004f9e] px-10 py-2.5 rounded font-bold text-[16px] transition-colors shadow-sm ${
            bookingLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-gray-100'
          }`}
        >
          {bookingLoading ? 'Processing...' : 'Pay Online'}
        </button>
      </div>

    </div>
  );
};

export default BookingSummary;
