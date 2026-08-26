import React from 'react';
import { CheckCircle, FileText, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Specialities from './Specialities';
import CommonHealth from './CommonHealth';

const VideoConsult = () => {
  return (
    <div className="flex flex-col w-full bg-white">
      <div className="w-full bg-[#f9eae5] min-h-[500px] flex items-center justify-center pt-24 pb-10">
        <div className="max-w-[1200px] w-full mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Left Content Area */}
        <div className="w-full md:w-1/2 flex flex-col items-start pt-2">
          <h1 className="text-[36px] font-bold text-[#414146] leading-tight mb-2">
            <span className="font-medium text-[32px]">Skip the travel!</span>
            <br />
            Take Online Doctor Consultation
          </h1>
          
          <p className="text-[18px] text-[#414146] mb-8">
            Private consultation + Audio call · Starts at just ₹199
          </p>

          {/* Doctors Online Status */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex -space-x-3">
              <img 
                className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm" 
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=100&h=100" 
                alt="Doctor 1" 
              />
              <img 
                className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm" 
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=100&h=100" 
                alt="Doctor 2" 
              />
              <img 
                className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm" 
                src="https://images.unsplash.com/photo-1537368910025-702800faa86b?auto=format&fit=crop&q=80&w=100&h=100" 
                alt="Doctor 3" 
              />
            </div>
            <div className="flex items-center gap-1.5 text-[15px] font-medium text-[#414146]">
              +144 Doctors are online
              <span className="w-2 h-2 rounded-full bg-[#3db13d] inline-block animate-pulse"></span>
            </div>
          </div>

          {/* CTA Button */}
          <Link 
            to="/services" 
            className="bg-[#00B8E6] text-white font-bold text-[16px] px-8 py-3.5 rounded hover:bg-[#0096bf] transition-colors no-underline mb-12 shadow-md hover:shadow-lg"
          >
            Consult Now
          </Link>

          {/* Features List */}
          <div className="flex flex-wrap items-center gap-6 text-[#787887] text-[13px] font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle size={16} className="text-[#414146]" />
              Verified Doctors
            </div>
            <div className="flex items-center gap-1.5">
              <FileText size={16} className="text-[#414146]" />
              Digital Prescription
            </div>
            <div className="flex items-center gap-1.5">
              <MessageCircle size={16} className="text-[#414146]" />
              Free Followup
            </div>
          </div>
        </div>

        {/* Right Image Area */}
        <div className="w-full md:w-1/2 flex justify-end relative">
          <img 
            src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800&h=600" 
            alt="Patient consulting online" 
            className="w-full max-w-[500px] h-[380px] object-cover rounded-2xl shadow-xl border-4 border-white"
          />
        </div>

        </div>
      </div>

      {/* Specialities Section */}
      <Specialities />

      {/* Common Health Concerns Section */}
      <CommonHealth />
      
    </div>
  );
};

export default VideoConsult;
