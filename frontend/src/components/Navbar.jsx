import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { User, LogOut, Menu, X, Calendar, Activity, ChevronDown } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, selectUser, selectIsAuth } from "../redux/user.slice.js";
import { selectDoctor, selectIsDoctorAuth, clearDoctor } from "../redux/doctor.slice.js";

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
    navigate("/login");
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
              <Link to="/doctors" className="text-[15px] font-bold text-[#414146] hover:text-[#28328C] transition-colors no-underline">
                Find Doctors
              </Link>
              <Link to="/services" className="text-[15px] font-bold text-[#414146] hover:text-[#28328C] transition-colors no-underline">
                Video Consult
              </Link>
              <Link to="/services" className="text-[15px] font-bold text-[#414146] hover:text-[#28328C] transition-colors no-underline">
                Lab Tests
              </Link>
              <Link to="/services" className="text-[15px] font-bold text-[#414146] hover:text-[#28328C] transition-colors no-underline">
                Surgeries
              </Link>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-6 h-full">
            {/* Desktop right Nav */}
            <div className="hidden xl:flex items-center gap-8 h-full">
              <div className="flex items-center gap-1 cursor-pointer group">
                <span className="bg-[#101026] text-white text-[10px] font-black px-1.5 py-0.5 rounded-[4px] tracking-wider mr-1">NEW</span>
                <span className="text-[14px] text-[#414146] group-hover:text-[#28328C] transition-colors">For Corporates</span>
                <ChevronDown size={14} className="text-[#414146] group-hover:text-[#28328C]" />
              </div>
              <div className="flex items-center gap-1 cursor-pointer group">
                <span className="text-[14px] text-[#414146] group-hover:text-[#28328C] transition-colors">For Providers</span>
                <ChevronDown size={14} className="text-[#414146] group-hover:text-[#28328C]" />
              </div>
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
                  <Link
                    to="/login"
                    className="flex items-center gap-1 cursor-pointer group focus:outline-none no-underline"
                  >
                    <span className="text-[14px] text-[#414146] group-hover:text-[#28328C] transition-colors">
                      Login / Signup
                    </span>
                    <ChevronDown size={14} className="text-[#414146] group-hover:text-[#28328C]" />
                  </Link>
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
                <Link to="/services" className="px-4 py-3 text-[15px] font-bold text-[#414146] hover:bg-[#F0F0F5] no-underline border-b border-[#F0F0F5]">Video Consult</Link>
                <Link to="/services" className="px-4 py-3 text-[15px] font-bold text-[#414146] hover:bg-[#F0F0F5] no-underline border-b border-[#F0F0F5]">Lab Tests</Link>
                <Link to="/services" className="px-4 py-3 text-[15px] font-bold text-[#414146] hover:bg-[#F0F0F5] no-underline">Surgeries</Link>

                <div className="border-t-[4px] border-[#F0F0F5] mt-2 pt-2">
                  {!isAuthenticated ? (
                    <div className="flex flex-col">
                      <Link to="/login" className="px-4 py-3 text-[15px] font-bold text-[#414146] hover:bg-[#F0F0F5] no-underline">Login / Signup</Link>
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
    </>
  );
};

export default Navbar;
