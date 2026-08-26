import React from 'react';
import { Link } from 'react-router-dom';
import { 
  User, BookOpen, CreditCard, Clipboard, 
  MapPin, Users, Mail, ChevronRight,
  Shield, Activity, Heart, Cross, 
  UserPlus, PlusCircle
} from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="min-h-screen relative flex flex-col font-sans -mt-24 pt-24 bg-[#F3EFE9]"> 
      
      {/* ── FAINT HOSPITAL BACKGROUND ────────────────────────────── */}
      <div className="absolute top-0 left-0 right-0 h-[700px] z-0 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=2000" 
          alt="Background" 
          className="w-full h-full object-cover opacity-15 mix-blend-multiply filter grayscale"
        />
      </div>

      {/* ── TOP HERO CONTAINER ─────────────────────────────────── */}
      <div className="w-full max-w-[1100px] mx-auto relative z-10 mt-10 md:mt-16 h-[480px] shadow-2xl flex">
        
        {/* Background Image of Hero */}
        <div className="absolute inset-0 bg-gray-900 border-b-[12px] border-[#1E293B]">
          <img 
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000" 
            alt="Hospital Corridor" 
            className="w-full h-full object-cover opacity-60 mix-blend-screen"
          />
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex border-b-[12px] border-transparent">
          
          {/* Quick Links Sidebar */}
          <div className="hidden lg:flex w-[280px] bg-white flex-col h-full shadow-2xl relative z-20">
            <div className="bg-[#1E293B] text-white p-5">
              <h3 className="text-xl font-serif tracking-wide">Quick Links</h3>
            </div>
            <div className="flex flex-col py-2 flex-1">
              {[
                { icon: <User size={16} className="text-[#0D9488]" />, text: "Find a Doctor" },
                { icon: <BookOpen size={16} className="text-[#0D9488]" />, text: "Patient Guide" },
                { icon: <CreditCard size={16} className="text-[#0D9488]" />, text: "Pay Bill" },
                { icon: <Clipboard size={16} className="text-[#0D9488]" />, text: "My AJH Record" },
                { icon: <MapPin size={16} className="text-[#0D9488]" />, text: "Directions & Parking" },
                { icon: <Users size={16} className="text-[#0D9488]" />, text: "Classes & Support Groups" },
                { icon: <Mail size={16} className="text-[#0D9488]" />, text: "Send a Card" },
              ].map((link, idx) => (
                <Link key={idx} to="#" className="flex items-center justify-between px-6 py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 group transition-colors no-underline">
                  <div className="flex items-center gap-3">
                    {link.icon}
                    <span className="text-[13px] font-bold text-[#0F172A]">{link.text}</span>
                  </div>
                  <ChevronRight size={14} className="text-gray-400 group-hover:text-[#38BDF8]" />
                </Link>
              ))}
            </div>
          </div>

          {/* Hero Text */}
          <div className="flex-1 px-8 lg:px-14 flex flex-col justify-center pb-8 relative z-20">
            <h1 className="text-5xl md:text-[68px] font-serif text-white leading-[1.1] mb-5 drop-shadow-lg italic">
              Quality Care <br/> in Your Community
            </h1>
            <p className="text-white text-lg md:text-xl font-medium max-w-lg mb-10 drop-shadow-md leading-relaxed">
              Delivering high quality community health care with an emphasis on patient satisfaction.
            </p>
            <div>
              <button className="px-8 py-3 bg-[#38BDF8] hover:bg-[#0284C7] text-white font-bold text-[11px] uppercase tracking-widest rounded-full transition-colors shadow-lg">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM SPLIT-BACKGROUND SECTION ────────────────────── */}
      <div className="w-full relative z-0 flex-1 mt-12 md:mt-16 flex flex-col min-h-[600px]">
        
        {/* Split Background Layers */}
        <div className="absolute inset-0 flex pointer-events-none">
          {/* Left White Background - Aligns roughly with the Quick Links */}
          <div className="w-full lg:w-[calc(50%-100px)] xl:w-[calc(50%-180px)] bg-white h-full shadow-[10px_0_20px_-10px_rgba(0,0,0,0.05)] z-10"></div>
          {/* Right Beige Background */}
          <div className="flex-1 bg-[#F3EFE9] h-full"></div>
        </div>

        {/* Content Container (Perfectly aligned with Hero container) */}
        <div className="max-w-[1100px] w-full mx-auto relative z-20 flex flex-col lg:flex-row py-12 md:py-16">
          
          {/* Left Column: Comprehensive Services (Matches width of Quick Links + a bit of margin) */}
          <div className="w-full lg:w-[360px] flex-shrink-0 flex flex-col pr-0 lg:pr-12 xl:pr-16 mb-16 lg:mb-0">
            <div className="flex flex-col items-center mb-8">
              <h2 className="text-[22px] font-serif text-[#1E293B] tracking-wide">Comprehensive Services</h2>
              <div className="w-16 h-[2px] bg-gray-300 mt-4"></div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-0 border-t border-l border-gray-200 bg-white shadow-sm mt-2">
              {[
                { icon: <Heart size={28} strokeWidth={1.5} />, title: "WOMEN'S HEALTH" },
                { icon: <UserPlus size={28} strokeWidth={1.5} />, title: "MATERNITY CARE", active: true },
                { icon: <Activity size={28} strokeWidth={1.5} />, title: "EMERGENCY" },
                { icon: <Shield size={28} strokeWidth={1.5} />, title: "CANCER CARE" },
                { icon: <Cross size={28} strokeWidth={1.5} />, title: "SURGICAL SERVICES" },
                { icon: <PlusCircle size={28} strokeWidth={1.5} />, title: "ORTHOPEDIC SERVICES" },
              ].map((s, idx) => (
                <div key={idx} className={`aspect-square flex flex-col items-center justify-center p-4 border-r border-b border-gray-200 transition-colors cursor-pointer ${s.active ? 'bg-[#38BDF8] text-white shadow-inner relative' : 'bg-white text-[#1E293B] hover:bg-gray-50'}`}>
                  {/* Small top-left cursor highlight dot from screenshot */}
                  {s.active && <div className="absolute top-2 left-2 w-1 h-1 bg-white rounded-full opacity-50"></div>}
                  <div className={`mb-3 ${s.active ? 'text-white' : 'text-[#0F172A]'}`}>
                    {s.icon}
                  </div>
                  <span className={`text-[9px] font-bold text-center leading-tight tracking-wider ${s.active ? 'text-white' : 'text-[#475569]'}`}>
                    {s.title}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 self-center">
              <button className="px-5 py-2.5 bg-[#38BDF8] hover:bg-[#0284C7] text-white font-bold text-[9px] uppercase tracking-widest rounded-full transition-colors shadow-sm">
                VIEW ALL SERVICES & DEPARTMENTS
              </button>
            </div>
          </div>

          {/* Right Column: News & Events */}
          <div className="flex-1 flex flex-col pl-0 lg:pl-4 xl:pl-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Card 1 */}
              <div className="bg-white border border-gray-200 flex flex-col shadow-md group relative">
                <div className="relative h-[160px] overflow-hidden">
                  <span className="absolute top-0 left-0 bg-[#1E293B] text-white text-[9px] uppercase font-bold px-3 py-1.5 z-10 tracking-widest">News</span>
                  <img src="https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=400" alt="Baby" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {/* Small top-left cursor highlight dot from screenshot */}
                  <div className="absolute top-[40%] right-[30%] w-1.5 h-1.5 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="p-5 flex flex-col flex-1 relative border-b-4 border-[#38BDF8]">
                  <h3 className="text-[#38BDF8] font-serif text-[15px] leading-snug mb-2 group-hover:underline cursor-pointer">
                    Meet Aurora! First Baby Born at AJH in 2017
                  </h3>
                  <p className="text-[9px] font-bold text-gray-400 mb-2.5 tracking-wider">JANUARY 2, 2017</p>
                  <p className="text-[11px] text-[#475569] leading-relaxed line-clamp-4">
                    NEWBURYPORT - Aurora Lemieux. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                  <Link to="#" className="mt-auto pt-5 text-[#38BDF8] text-[9px] font-bold uppercase tracking-widest flex items-center justify-end gap-1 hover:text-[#0284C7] no-underline">
                    READ MORE <ChevronRight size={12} />
                  </Link>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white border border-gray-200 flex flex-col shadow-md group relative">
                <div className="relative h-[160px] overflow-hidden">
                  <span className="absolute top-0 left-0 bg-[#38BDF8] text-white text-[9px] uppercase font-bold px-3 py-1.5 z-10 tracking-widest">Events</span>
                  <img src="https://images.unsplash.com/photo-1519494140681-8b17d830a3e9?auto=format&fit=crop&q=80&w=400" alt="Hospital Building" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5 flex flex-col flex-1 relative border-b-4 border-[#38BDF8]">
                  <h3 className="text-[#38BDF8] font-serif text-[15px] leading-snug mb-2 group-hover:underline cursor-pointer">
                    Great Chef's Night 2017
                  </h3>
                  <p className="text-[9px] font-bold text-gray-400 mb-2.5 tracking-wider">JANUARY 3, 2017</p>
                  <p className="text-[11px] text-[#475569] leading-relaxed line-clamp-4">
                    The AJH Aid Association will hold the annual Great Chef's Night on April 7 this year. This event will feature food samplings from some of the best spots in Newburyport.
                  </p>
                  <Link to="#" className="mt-auto pt-5 text-[#38BDF8] text-[9px] font-bold uppercase tracking-widest flex items-center justify-end gap-1 hover:text-[#0284C7] no-underline">
                    READ MORE <ChevronRight size={12} />
                  </Link>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white border border-gray-200 flex flex-col shadow-md group relative">
                <div className="relative h-[160px] overflow-hidden">
                  <span className="absolute top-0 left-0 bg-[#1E293B] text-white text-[9px] uppercase font-bold px-3 py-1.5 z-10 tracking-widest">News</span>
                  <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=400" alt="Doctor" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5 flex flex-col flex-1 relative border-b-4 border-[#1E293B]">
                  <h3 className="text-[#38BDF8] font-serif text-[15px] leading-snug mb-2 group-hover:underline cursor-pointer">
                    Gerrish Breast Care Center Named Certified Center
                  </h3>
                  <p className="text-[9px] font-bold text-gray-400 mb-2.5 tracking-wider">JANUARY 2, 2017</p>
                  <p className="text-[11px] text-[#475569] leading-relaxed line-clamp-4">
                    The Gerrish Breast Care Center at AJH brings together an experienced team of professionals and resources to ensure the highest standard of care.
                  </p>
                  <Link to="#" className="mt-auto pt-5 text-[#38BDF8] text-[9px] font-bold uppercase tracking-widest flex items-center justify-end gap-1 hover:text-[#0284C7] no-underline">
                    READ MORE <ChevronRight size={12} />
                  </Link>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AboutUs;
