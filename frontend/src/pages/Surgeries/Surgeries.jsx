import React from 'react';
import doctorImg from '../../assets/dweb-hero-card.png';
import { ChevronDown, User, Activity, MapPin, Building2 } from 'lucide-react';
import WhyAssured from './WhyAssured';
import TreatmentsOffered from './TreatmentsOffered';

const Surgeries = () => {
  return (
    <div className="w-full bg-[#f0f4fd] min-h-[calc(100vh-102px)] pt-0 pb-12">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        
        <div className="flex flex-col lg:flex-row items-start justify-center lg:justify-start lg:gap-16 xl:gap-24 gap-12">
          
          {/* Left Column (Hero Image + Why Assured) */}
          <div className="w-full lg:w-[800px] xl:w-[900px] flex flex-col gap-6 mx-auto lg:mx-0">
            <div className="flex justify-center items-start">
              <img 
                src={doctorImg} 
                alt="Surgery Network" 
                className="w-full h-auto object-contain rounded-[24px]"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
            
            <WhyAssured />
            <TreatmentsOffered />
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-[380px] xl:w-[420px] shrink-0 flex flex-col gap-4 mt-8 lg:mt-12">
            
            {/* Booking Form Card */}
            <div className="bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-6 md:p-8">
              <h2 className="text-[20px] font-bold text-[#1a1a1a] mb-2">
                Book your consultation today
              </h2>
              <p className="text-[14px] text-[#787887] mb-6">
                Get a Call Back Within 15 Minutes
              </p>

              <form className="flex flex-col gap-4">
                <div className="relative">
                  <select className="w-full h-[48px] border border-gray-300 rounded-md px-4 text-[#414146] appearance-none bg-transparent font-medium outline-none focus:border-[#28328C] transition-colors cursor-pointer text-[15px]">
                    <option value="" disabled selected>Select Surgery</option>
                    <option value="hydrocele">Hydrocele</option>
                    <option value="cataract">Cataract</option>
                    <option value="lasik">LASIK</option>
                    <option value="hernia">Hernia</option>
                    <option value="piles">Piles</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={18} />
                </div>

                <div className="relative">
                  <select className="w-full h-[48px] border border-gray-300 rounded-md px-4 text-[#414146] appearance-none bg-transparent font-medium outline-none focus:border-[#28328C] transition-colors cursor-pointer text-[15px]">
                    <option value="" disabled selected>Select City</option>
                    <option value="mumbai">Mumbai</option>
                    <option value="delhi">Delhi</option>
                    <option value="bangalore">Bangalore</option>
                    <option value="pune">Pune</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={18} />
                </div>

                <input 
                  type="text" 
                  placeholder="Name" 
                  className="w-full h-[48px] border border-gray-300 rounded-md px-4 text-[#414146] font-medium outline-none focus:border-[#28328C] transition-colors text-[15px]"
                />

                <input 
                  type="tel" 
                  placeholder="Phone Number" 
                  className="w-full h-[48px] border border-gray-300 rounded-md px-4 text-[#414146] font-medium outline-none focus:border-[#28328C] transition-colors text-[15px]"
                />

                <button 
                  type="button" 
                  className="w-full h-[50px] bg-[#28328C] hover:bg-[#1f266c] text-white rounded-md font-bold text-[15px] transition-colors mt-2"
                >
                  Book Appointment
                </button>

                <p className="text-center text-[12px] text-[#787887] mt-2">
                  By submitting the form, you agree to Practo's <span className="text-[#00B8E6] cursor-pointer">T&C</span>
                </p>
              </form>
            </div>

            {/* OR Divider */}
            <div className="flex items-center gap-3 px-4">
              <div className="h-[1px] bg-gray-200 flex-1"></div>
              <span className="text-[12px] text-gray-400 font-medium">OR</span>
              <div className="h-[1px] bg-gray-200 flex-1"></div>
            </div>

            {/* Contact Card */}
            <div className="bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#28328C] flex items-center justify-center">
                    <User size={14} className="text-white" />
                  </div>
                  <span className="text-[13px] text-[#414146] font-medium">Reach Out to Us</span>
                </div>
                <a href="tel:+918045685554" className="text-[13px] font-bold text-[#28328C] hover:underline">+91-8045685554</a>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                  </div>
                  <span className="text-[14px] text-[#414146] font-medium">Chat with Us</span>
                </div>
                <a href="tel:+917353101441" className="text-[14px] font-bold text-[#28328C] hover:underline">+91-7353101441</a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Surgeries;
