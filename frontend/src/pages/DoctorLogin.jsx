import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, Stethoscope, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { setDoctor } from '../redux/doctor.slice.js';
import axios from '../utils/axiosInstance.js';

const DoctorLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [rememberMe, setRememberMe] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Clear any normal user session if needed
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      const { data } = await axios.post('/doctor/login', form);

      if (data.success) {
        dispatch(
          setDoctor({
            doctor: data.doctor,
            token: data.token,
          })
        );
        toast.success(`Welcome, Dr. ${data.doctor.name || ''}!`);
        navigate('/doctor-admin');
      }
    } catch (err) {
      const errMsg =
        err?.response?.data?.message ||
        (err?.message === 'Network Error'
          ? 'Network Error: Make sure your backend server is running on http://localhost:8000'
          : err?.message || 'Doctor login failed.');
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f1f4f9] flex items-center justify-center p-3 sm:p-6 font-sans">
      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-5xl bg-white rounded-3xl sm:rounded-[32px] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-100 min-h-[640px]"
      >
        {/* ── LEFT PANEL: Professional Deep Teal with Medical Shield Plus Emblem ── */}
        <div className="w-full md:w-[46%] bg-[#0d9488] p-8 lg:p-10 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Logo */}
          <div className="flex items-center gap-2.5 z-10">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center p-1.5 backdrop-blur-sm">
              <Stethoscope size={20} className="text-white" />
            </div>
            <div>
              <span className="font-bold text-xl tracking-tight text-white">HealthHub</span>
              <span className="block text-[9px] uppercase tracking-widest text-teal-200">Doctor Portal</span>
            </div>
          </div>

          {/* Central Healthcare Plus Shield Artwork */}
          <div className="my-auto py-6 flex items-center justify-center relative z-10">
            <div className="relative w-full max-w-[300px] flex items-center justify-center">
              <div className="absolute w-52 h-52 rounded-full bg-white/10" />

              <svg viewBox="0 0 360 280" className="w-full h-auto drop-shadow-lg">
                {/* Healthcare Cross & Shield Emblem */}
                <g transform="translate(130, 35)">
                  <path
                    d="M 50 10 L 95 30 L 95 90 C 95 130, 50 160, 50 160 C 50 160, 5 130, 5 90 L 5 30 Z"
                    fill="#ffffff"
                    stroke="#e2e8f0"
                    strokeWidth="3"
                  />
                  {/* Medical Plus Cross */}
                  <rect x="42" y="45" width="16" height="65" rx="4" fill="#0d9488" />
                  <rect x="18" y="69.5" width="64" height="16" rx="4" fill="#0d9488" />
                </g>

                {/* Stethoscope / Orbital Dashed Arc */}
                <path
                  d="M 50 180 C 50 250, 310 250, 310 180"
                  fill="none"
                  stroke="#ffffff"
                  strokeOpacity="0.4"
                  strokeWidth="3"
                  strokeDasharray="6 6"
                />
                <circle cx="180" cy="225" r="10" fill="#5eead4" stroke="#ffffff" strokeWidth="3" />
              </svg>
            </div>
          </div>

          {/* Bottom Caption */}
          <div className="z-10 mt-4">
            <h3 className="text-2xl lg:text-3xl font-bold tracking-tight text-white mb-2.5 leading-snug">
              Medical Professional Portal
            </h3>
            <p className="text-teal-100/90 text-xs lg:text-sm leading-relaxed mb-6 font-normal max-w-sm">
              Manage your daily consultation schedule, review patient case histories, and update clinical appointments seamlessly.
            </p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-xs text-white/90">
                <CheckCircle2 size={15} className="text-teal-300" />
                <span>Doctor schedule & slot controls</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/90">
                <CheckCircle2 size={15} className="text-teal-300" />
                <span>Patient case histories & records</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/90">
                <CheckCircle2 size={15} className="text-teal-300" />
                <span>Encrypted clinical data protection</span>
              </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex items-center gap-1.5">
              <span className="w-6 h-1.5 bg-white rounded-full" />
              <span className="w-1.5 h-1.5 bg-white/40 rounded-full" />
              <span className="w-1.5 h-1.5 bg-white/40 rounded-full" />
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL: Doctor Login Form ── */}
        <div className="w-full md:w-[54%] p-8 sm:p-12 lg:p-14 flex flex-col justify-center bg-white">
          <div className="mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold mb-3 border border-teal-100">
              <ShieldCheck size={14} />
              Verified Practitioner Access
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Doctor Sign In
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-2 leading-relaxed">
              Enter your clinical credentials to access your doctor dashboard and appointment manager.
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Medical Email ID
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                  <Mail size={17} />
                </span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="doctor@medicare.com"
                  className="w-full h-11 pl-10 pr-4 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0d9488] focus:ring-2 focus:ring-[#0d9488]/10 transition-all font-normal"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                  <Lock size={17} />
                </span>
                <input
                  type={showPass ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter doctor password"
                  className="w-full h-11 pl-10 pr-10 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0d9488] focus:ring-2 focus:ring-[#0d9488]/10 transition-all font-normal"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Help */}
            <div className="flex items-center justify-between text-xs pt-1 pb-1">
              <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-[#0d9488] focus:ring-[#0d9488]/20"
                />
                <span>Remember Me</span>
              </label>

              <a
                href="#help"
                onClick={(e) => {
                  e.preventDefault();
                  toast('Please contact Hospital Admin to register or reset doctor credentials.');
                }}
                className="text-[#0d9488] hover:text-[#0f766e] font-medium transition-colors"
              >
                Need access? Contact Admin
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-lg bg-[#0d9488] hover:bg-[#0f766e] active:scale-[0.99] text-white font-semibold text-sm shadow-md shadow-[#0d9488]/25 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                'Log In to Doctor Dashboard'
              )}
            </button>
          </form>

          {/* Bottom Footer Navigation */}
          <div className="mt-10 pt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <Link to="/login" className="text-slate-600 hover:text-[#0d9488] font-medium transition-colors">
              ← Patient Login
            </Link>
            <Link to="/admin/login" className="text-[#0d9488] font-semibold hover:underline">
              Admin Login →
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DoctorLogin;
