import React, { useState } from 'react';
import { UserPlus, Phone, Mail } from 'lucide-react';

const SelectPatientModal = ({ onClose, onAddNewPatient, onContinue }) => {
  const [selectedPatientId, setSelectedPatientId] = useState(1); // Default select the first patient

  // Dummy existing patient for now
  const existingPatients = [
    {
      id: 1,
      name: "Abhishek Kumar",
      gender: "Male",
      age: "0 Yrs",
      phone: "+91-7557712212",
      email: "abhishek9879@gmail.com"
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 font-helveticaNeue">
      
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-[24px] font-normal text-black">Select Patient</h2>
        </div>

        {/* Content */}
        <div className="p-6 flex gap-4 overflow-x-auto">
          
          {/* Add New Patient Card */}
          <div 
            onClick={onAddNewPatient}
            className="min-w-[280px] h-[140px] border border-gray-200 rounded-xl flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-blue-500 hover:bg-blue-50/50 transition-colors"
          >
            <UserPlus size={32} className="text-[#004f9e]" />
            <span className="text-[#004f9e] font-medium text-[14px] underline">Add New Patient</span>
          </div>

          {/* Existing Patients Cards */}
          {existingPatients.map(patient => (
            <div 
              key={patient.id}
              onClick={() => setSelectedPatientId(patient.id)}
              className={`min-w-[320px] h-[140px] border rounded-xl p-5 cursor-pointer transition-colors flex flex-col justify-center ${
                selectedPatientId === patient.id 
                  ? 'border-blue-400 bg-[#eff4fa]' 
                  : 'border-gray-200 bg-[#f8f9fa] hover:border-blue-300'
              }`}
            >
              <h3 className="text-[16px] font-medium text-black mb-1">{patient.name}</h3>
              <p className="text-[12px] text-gray-600 mb-3">{patient.gender} | {patient.age}</p>
              <div className="flex flex-col gap-1 text-[12px] text-gray-800">
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-gray-500" />
                  <span>{patient.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-gray-500" />
                  <span>{patient.email}</span>
                </div>
              </div>
            </div>
          ))}

        </div>

        {/* Footer */}
        <div className="bg-[#f8f9fa] p-5 border-t border-gray-100 flex items-center justify-between">
          <p className="text-[13px] text-black">
            If you wish to add a patient who is already registered with another mobile number, please{' '}
            <span className="text-[#004f9e] font-medium underline cursor-pointer hover:text-blue-800">Click Here</span>
          </p>
          <div className="flex items-center gap-3">
            <button 
              onClick={onClose}
              className="px-6 py-2.5 rounded-md text-[#004f9e] font-medium text-[14px] hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={() => onContinue(existingPatients.find(p => p.id === selectedPatientId))}
              disabled={!selectedPatientId}
              className="px-8 py-2.5 bg-[#004f9e] hover:bg-[#003d7a] text-white rounded-md font-medium text-[14px] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

export default SelectPatientModal;
