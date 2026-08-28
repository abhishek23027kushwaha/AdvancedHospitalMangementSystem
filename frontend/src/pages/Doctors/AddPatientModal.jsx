import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

const AddPatientModal = ({ onClose, onAddPatient }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    gender: 'Male',
    mobileNumber: '',
    emailId: '',
    pincode: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPatient(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 font-helveticaNeue">
      
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col p-8 relative">
        
        {/* Close Button (Optional, but good UX) */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-black text-2xl leading-none"
        >
          &times;
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-[28px] font-bold text-black mb-3">Add a Patient</h2>
          <div className="inline-block bg-[#eff4fa] px-3 py-1.5 rounded-sm">
            <p className="text-[13px] text-black font-medium">A one-time, non-refundable registration charge is included.</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          
          {/* Full Name */}
          <div>
            <input 
              type="text" 
              name="fullName"
              placeholder="Full Name*" 
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-[14px] text-black focus:outline-none focus:border-blue-500 placeholder-gray-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date of Birth */}
            <div className="relative">
              <input 
                type="date" 
                name="dateOfBirth"
                placeholder="Date of Birth*" 
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-[14px] text-black focus:outline-none focus:border-blue-500 placeholder-gray-500"
              />
            </div>

            {/* Gender */}
            <div className="flex items-center gap-4 px-2">
              <span className="text-[14px] text-gray-600 mr-2">Gender:</span>
              {['Male', 'Female', 'Others'].map((g) => (
                <label key={g} className="flex items-center gap-2 cursor-pointer">
                  <div className="relative flex items-center justify-center">
                    <input 
                      type="radio" 
                      name="gender" 
                      value={g} 
                      checked={formData.gender === g}
                      onChange={handleChange}
                      className="appearance-none w-4 h-4 border-2 border-gray-300 rounded-full checked:border-[#004f9e]"
                    />
                    {formData.gender === g && (
                      <div className="absolute w-2 h-2 bg-[#004f9e] rounded-full"></div>
                    )}
                  </div>
                  <span className="text-[14px] text-black">{g}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mobile Number */}
            <div className="flex border border-gray-300 rounded-md overflow-hidden focus-within:border-blue-500">
              <div className="bg-gray-50 px-3 flex items-center gap-2 border-r border-gray-300">
                <span className="text-[16px]">🇮🇳</span>
                <span className="text-[14px] text-gray-600 font-medium">+91</span>
              </div>
              <input 
                type="tel" 
                name="mobileNumber"
                placeholder="Mobile Number*" 
                value={formData.mobileNumber}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 text-[14px] text-black focus:outline-none placeholder-gray-500"
              />
            </div>

            {/* Email ID */}
            <div>
              <input 
                type="email" 
                name="emailId"
                placeholder="Email ID*" 
                value={formData.emailId}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-[14px] text-black focus:outline-none focus:border-blue-500 placeholder-gray-500"
              />
            </div>
          </div>

          {/* Pincode */}
          <div className="w-full md:w-[calc(50%-12px)]">
            <input 
              type="text" 
              name="pincode"
              placeholder="Pincode*" 
              value={formData.pincode}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-[14px] text-black focus:outline-none focus:border-blue-500 placeholder-gray-500"
            />
          </div>

          {/* Submit Button */}
          <div className="mt-4">
            <button 
              type="submit"
              className="w-full bg-[#004f9e] hover:bg-[#003d7a] text-white py-3 rounded-md font-medium text-[15px] transition-colors"
            >
              Add Patient
            </button>
          </div>

        </form>

      </div>

    </div>
  );
};

export default AddPatientModal;
