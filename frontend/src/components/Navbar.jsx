import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { User, LogOut, Menu, X, Calendar, Activity, ChevronDown } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, selectUser, selectIsAuth } from "../redux/user.slice.js";
import { selectDoctor, selectIsDoctorAuth, clearDoctor } from "../redux/doctor.slice.js";
import doctorsHeroImg from "../assets/doctors_hero.png";
import LoginModal from "./LoginModal.jsx";

const specialtiesColumn1 = [
  "Cardiologist", "Orthopaedician", "Oncologist", "Cardiac Surgeon", 
  "Neurologist", "Gastroenterologist", "Urologist", "Pulmonologist"
];
const specialtiesColumn2 = [
  "General Surgeon", "Gynecologist", "Endocrinologist", "ENT Specialist", 
  "Vascular Surgeon", "Plastic Surgeon", "Nephrologist", "Dermatologist"
];
const specialtiesColumn3 = [
  "Pediatrician", "Dentist"
];

const hospitalsColumn1 = [
  "Bangalore", "Guwahati", "Mumbai", "Raipur", 
  "Dharwad", "Shimoga", "Kolkata", "Davangere"
];
const hospitalsColumn2 = [
  "Ahmedabad", "Jaipur", "Jamshedpur", "Kolar", 
  "Barasat", "Gurugram", "Howrah", "Delhi"
];
const hospitalsColumn3 = [
  "Mysore", "Hosur"
];

import BannerImg from "../assets/BannerImg.png";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const doctor = useSelector(selectDoctor);
  const isUserAuth = useSelector(selectIsAuth);
  const isDoctorAuth = useSelector(selectIsDoctorAuth);

  const currentUser = doctor || user;
  const isAuthenticated = isDoctorAuth || isUserAuth;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    dispatch(clearUser());
    dispatch(clearDoctor());
    setDropdownOpen(false);
    setMobileOpen(false);
    navigate("/");
  };

  const displayName = currentUser?.name 
    ? currentUser.name.split(' ')[0].substring(0, 10) + "..."
    : "Login...";

  return (
    <>
      <nav 
        className="fixed top-0 left-0 right-0 z-50 bg-[#FFFFFF] border-b border-[#F0F0F5] shadow-[0_1px_4px_0_rgba(0,0,0,0.05)] h-[102px]"
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-4 md:px-8 h-full">

          <div className="flex items-center gap-10 h-full">
            {/* Logo */}
            <Link to="/" className="flex items-center no-underline text-[#10101C] hover:text-[#10101C] group">
              <span className="text-[#00B8E6] text-3xl font-black mb-1 mr-0.5">•</span>
              <span className="text-2xl font-black tracking-tight" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>practo</span>
              <span className="text-[#00B8E6] text-3xl font-black mb-1 ml-0.5">•</span>
            </Link>

            {/* Desktop Left Nav */}
            <div className="hidden lg:flex items-center gap-8 h-full">
              
              {/* Find Doctors Mega Menu */}
              <div className="relative h-full flex items-center group">
                <Link to="/doctors" className="text-[15px] font-bold text-[#414146] group-hover:text-[#28328C] transition-colors no-underline h-full flex items-center gap-1">
                  Find Doctors
                  <ChevronDown size={14} className="text-[#414146] group-hover:text-[#28328C] transition-transform duration-200 group-hover:rotate-180" />
                </Link>
                
                {/* Backdrop overlay that blurs the rest of the page */}
                <div className="fixed inset-0 top-[102px] bg-black/5 backdrop-blur-[3px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-none" style={{ zIndex: 40 }}></div>

                {/* Mega Menu Dropdown */}
                <div className="absolute top-[102px] left-0 w-[950px] bg-white shadow-2xl rounded-b-xl border border-gray-100 p-4 flex gap-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  
                  {/* Left Side - Links */}
                  <div className="flex-1 bg-[#fafafa] rounded-xl p-8">
                    <h3 className="text-[24px] font-medium text-black mb-2">Find a Doctor</h3>
                    <p className="text-[14px] text-gray-600 mb-8">Explore doctors by specialty and get expert medical guidance.</p>
                    
                    <div className="grid grid-cols-3 gap-y-5 gap-x-4">
                      {/* Column 1 */}
                      <div className="flex flex-col gap-5">
                        {specialtiesColumn1.map((spec, i) => (
                          <Link key={i} to="/doctors" className="text-[14px] text-gray-800 hover:text-blue-600 no-underline transition-colors">
                            Find a {spec}
                          </Link>
                        ))}
                      </div>
                      
                      {/* Column 2 */}
                      <div className="flex flex-col gap-5">
                        {specialtiesColumn2.map((spec, i) => (
                          <Link key={i} to="/doctors" className="text-[14px] text-gray-800 hover:text-blue-600 no-underline transition-colors">
                            Find a {spec}
                          </Link>
                        ))}
                      </div>

                      {/* Column 3 */}
                      <div className="flex flex-col gap-5">
                        {specialtiesColumn3.map((spec, i) => (
                          <Link key={i} to="/doctors" className="text-[14px] text-gray-800 hover:text-blue-600 no-underline transition-colors">
                            Find a {spec}
                          </Link>
                        ))}
                        <Link to="/doctors" className="text-[14px] text-blue-600 hover:underline mt-2">
                          View All
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Image */}
                  <div className="w-[300px] shrink-0 rounded-xl overflow-hidden relative">
                    <img src={doctorsHeroImg} alt="Doctors" className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                      <p className="text-white text-[15px] font-medium leading-snug">
                        2 Million + lives touched every year, & counting....
                      </p>
                    </div>
                  </div>

                </div>
              </div>
              {/* Hospitals & Clinics Mega Menu */}
              <div className="relative h-full flex items-center group">
                <div className="flex items-center gap-1 cursor-pointer">
                  <span className="text-[15px] font-bold text-[#414146] group-hover:text-[#28328C] transition-colors">Hospitals & Clinics</span>
                  <ChevronDown size={14} className="text-[#414146] group-hover:text-[#28328C] transition-transform duration-200 group-hover:rotate-180" />
                </div>
                
                {/* Backdrop overlay */}
                <div className="fixed inset-0 top-[102px] bg-black/5 backdrop-blur-[3px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-none" style={{ zIndex: 40 }}></div>

                {/* Mega Menu Dropdown */}
                <div className="absolute top-[102px] left-0 w-[850px] bg-white shadow-2xl rounded-b-xl border border-gray-100 p-4 flex gap-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  
                  {/* Left Side - Links */}
                  <div className="flex-1 bg-[#fafafa] rounded-xl p-8">
                    <h3 className="text-[24px] font-medium text-black mb-2">Hospitals & Clinics</h3>
                    <p className="text-[14px] text-gray-600 mb-8">Discover hospitals and clinics near you.</p>
                    
                    <div className="grid grid-cols-3 gap-y-5 gap-x-4">
                      {/* Column 1 */}
                      <div className="flex flex-col gap-5">
                        {hospitalsColumn1.map((city, i) => (
                          <Link key={i} to="/hospitals" className="text-[14px] text-gray-800 hover:text-blue-600 no-underline transition-colors">
                            {city}
                          </Link>
                        ))}
                      </div>
                      
                      {/* Column 2 */}
                      <div className="flex flex-col gap-5">
                        {hospitalsColumn2.map((city, i) => (
                          <Link key={i} to="/hospitals" className="text-[14px] text-gray-800 hover:text-blue-600 no-underline transition-colors">
                            {city}
                          </Link>
                        ))}
                      </div>

                      {/* Column 3 */}
                      <div className="flex flex-col gap-5">
                        {hospitalsColumn3.map((city, i) => (
                          <Link key={i} to="/hospitals" className="text-[14px] text-gray-800 hover:text-blue-600 no-underline transition-colors">
                            {city}
                          </Link>
                        ))}
                        <Link to="/hospitals" className="text-[14px] text-blue-600 hover:underline mt-2">
                          View All
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Image */}
                  <div className="w-[280px] shrink-0 rounded-xl overflow-hidden relative bg-gray-200">
                    <img src={BannerImg} alt="Hospital" className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                      <p className="text-white text-[13px] font-bold mb-1">Accreditations</p>
                      <p className="text-white/90 text-[12px] leading-snug">
                        JCI Enterprise, JCI-accredited hospitals, CAP-accredited labs, NABH and NABL.
                      </p>
                    </div>
                  </div>

                </div>
              </div>
              <Link to="/labtest" className="text-[15px] font-bold text-[#414146] hover:text-[#28328C] transition-colors no-underline">
                Lab Tests
              </Link>
              <Link to="/surgeries" className="text-[15px] font-bold text-[#414146] hover:text-[#28328C] transition-colors no-underline">
                Surgeries
              </Link>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-6 h-full">
            {/* Desktop right Nav */}
            <div className="hidden xl:flex items-center gap-8 h-full">
              <div className="relative flex items-center gap-1 cursor-pointer group h-full">
                <span className="bg-[#101026] text-white text-[10px] font-black px-1.5 py-0.5 rounded-[4px] tracking-wider mr-1 mt-0.5">NEW</span>
                <span className="text-[14px] text-[#414146] group-hover:text-[#28328C] transition-colors">For Corporates</span>
                <ChevronDown size={14} className="text-[#414146] group-hover:text-[#28328C] transition-transform duration-200 group-hover:rotate-180" />
                
                {/* Dropdown Menu */}
                <div className="absolute top-[80px] left-0 w-[240px] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.12)] border border-[#F0F0F5] rounded-md py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <Link to="/corporate/health-wellness" className="block px-5 py-3 text-[14px] text-[#414146] hover:bg-[#F8FAFC] hover:text-[#28328C] no-underline">
                    Health & Wellness Plans
                  </Link>
                  <Link to="/corporate/group-insurance" className="block px-5 py-3 text-[14px] text-[#414146] hover:bg-[#F8FAFC] hover:text-[#28328C] no-underline">
                    Group Insurance
                  </Link>
                </div>
              </div>

              <Link to="/consult" className="text-[14px] text-[#414146] hover:text-[#28328C] transition-colors no-underline">
                Video Consult
              </Link>

              <div className="flex items-center gap-1 cursor-pointer group">
                <span className="text-[14px] text-[#414146] group-hover:text-[#28328C] transition-colors">Security & help</span>
                <ChevronDown size={14} className="text-[#414146] group-hover:text-[#28328C]" />
              </div>
            </div>

            <div className="hidden md:flex items-center gap-3">
              {isAuthenticated ? (
                <div className="relative h-full flex items-center" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen((v) => !v)}
                    className="flex items-center gap-1 cursor-pointer group focus:outline-none"
                  >
                    <span className="text-[14px] text-[#414146] group-hover:text-[#28328C] transition-colors font-medium">
                      {displayName}
                    </span>
                    <ChevronDown size={14} className="text-[#414146] group-hover:text-[#28328C]" />
                  </button>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-[60px] w-56 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-[#F0F0F5] py-2 z-50 rounded-sm"
                      >
                        <div className="px-4 py-2 border-b border-[#F0F0F5]">
                          <p className="text-[14px] font-bold text-[#10101C] truncate">{currentUser.name}</p>
                          <p className="text-[12px] text-[#787887] truncate">{currentUser.email}</p>
                        </div>
                        {currentUser?.role === 'doctor' && (
                          <Link
                            to="/doctor-admin"
                            onClick={() => setDropdownOpen(false)}
                            className="w-full flex items-center gap-2 px-4 py-3 text-[14px] text-[#414146] hover:bg-[#F0F0F5] transition-colors no-underline border-b border-[#F0F0F5]"
                          >
                            <User size={16} />
                            Dashboard
                          </Link>
                        )}
                        {currentUser?.role !== 'doctor' && (
                          <>
                            <Link
                              to="/profile"
                              onClick={() => setDropdownOpen(false)}
                              className="w-full flex items-center gap-2 px-4 py-3 text-[14px] text-[#414146] hover:bg-[#F0F0F5] transition-colors no-underline"
                            >
                              <User size={16} />
                              My Profile
                            </Link>
                            <Link
                              to="/appointments"
                              onClick={() => setDropdownOpen(false)}
                              className="w-full flex items-center gap-2 px-4 py-3 text-[14px] text-[#414146] hover:bg-[#F0F0F5] transition-colors no-underline"
                            >
                              <Calendar size={16} />
                              My Appointments
                            </Link>
                            <Link
                              to="/my-services"
                              onClick={() => setDropdownOpen(false)}
                              className="w-full flex items-center gap-2 px-4 py-3 text-[14px] text-[#414146] hover:bg-[#F0F0F5] transition-colors no-underline border-b border-[#F0F0F5]"
                            >
                              <Activity size={16} />
                              My Services
                            </Link>
                          </>
                        )}
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-4 py-3 text-[14px] text-[#414146] hover:bg-[#F0F0F5] transition-colors text-left"
                        >
                          <LogOut size={16} />
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setLoginModalOpen(true)}
                    className="flex items-center gap-1 cursor-pointer group focus:outline-none bg-transparent border-none p-0"
                  >
                    <span className="text-[14px] text-[#414146] group-hover:text-[#28328C] transition-colors">
                      Login / Signup
                    </span>
                    <ChevronDown size={14} className="text-[#414146] group-hover:text-[#28328C]" />
                  </button>
                </div>
              )}
            </div>

            {/* Mobile hamburger */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="p-2 text-[#414146] hover:text-[#28328C] transition-colors"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden border-t border-[#F0F0F5] bg-white px-4 pb-4 md:hidden absolute w-full shadow-md z-40"
            >
              <div className="flex flex-col pt-2">
                <Link to="/doctors" className="px-4 py-3 text-[15px] font-bold text-[#414146] hover:bg-[#F0F0F5] no-underline border-b border-[#F0F0F5]">Find Doctors</Link>
                <Link to="/consult" className="px-4 py-3 text-[15px] font-bold text-[#414146] hover:bg-[#F0F0F5] no-underline border-b border-[#F0F0F5]">Video Consult</Link>
                <Link to="/labtest" className="px-4 py-3 text-[15px] font-bold text-[#414146] hover:bg-[#F0F0F5] no-underline border-b border-[#F0F0F5]">Lab Tests</Link>
                <Link to="/surgeries" className="px-4 py-3 text-[15px] font-bold text-[#414146] hover:bg-[#F0F0F5] no-underline">Surgeries</Link>

                <div className="border-t-[4px] border-[#F0F0F5] mt-2 pt-2">
                  {!isAuthenticated ? (
                    <div className="flex flex-col">
                      <button onClick={() => { setLoginModalOpen(true); setMobileOpen(false); }} className="px-4 py-3 text-[15px] font-bold text-[#414146] hover:bg-[#F0F0F5] text-left border-none bg-transparent w-full">Login / Signup</button>
                      <Link to="/doctor/login" className="px-4 py-3 text-[15px] font-bold text-[#414146] hover:bg-[#F0F0F5] no-underline">Doctor Admin Login</Link>
                    </div>
                  ) : (
                    <div className="flex flex-col">
                      <div className="px-4 py-3 bg-[#F8FAFC]">
                        <p className="text-[14px] font-bold text-[#10101C]">{currentUser.name}</p>
                        <p className="text-[12px] text-[#787887]">{currentUser.email}</p>
                      </div>
                      {currentUser?.role !== 'doctor' && (
                        <>
                          <Link to="/profile" className="px-4 py-3 text-[15px] font-bold text-[#414146] hover:bg-[#F0F0F5] no-underline border-b border-[#F0F0F5]">My Profile</Link>
                          <Link to="/appointments" className="px-4 py-3 text-[15px] font-bold text-[#414146] hover:bg-[#F0F0F5] no-underline border-b border-[#F0F0F5]">My Appointments</Link>
                          <Link to="/my-services" className="px-4 py-3 text-[15px] font-bold text-[#414146] hover:bg-[#F0F0F5] no-underline border-b border-[#F0F0F5]">My Services</Link>
                        </>
                      )}
                      {currentUser?.role === 'doctor' && (
                        <Link to="/doctor-admin" className="px-4 py-3 text-[15px] font-bold text-[#414146] hover:bg-[#F0F0F5] no-underline border-b border-[#F0F0F5]">Dashboard</Link>
                      )}
                      <button onClick={handleLogout} className="px-4 py-3 text-[15px] font-bold text-[#E11D48] hover:bg-[#F0F0F5] text-left">Logout</button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      {/* Spacer to push content down because navbar is fixed and 72px tall */}
      <div className=" bg-white w-full"></div>
      
      {/* Login Modal Overlay */}
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} />
    </>
  );
};

export default Navbar;
