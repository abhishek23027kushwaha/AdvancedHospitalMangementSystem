import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  Calendar,
  ChevronDown,
  CheckCircle2,
  ShieldCheck,
  Smartphone,
  ArrowRight,
  RotateCw,
  Edit3,
  Sparkles,
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { setUser } from '../redux/user.slice.js';
import axios from '../utils/axiosInstance.js';

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    gender: '',
    age: '',
  });

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ── OTP State ──
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [receivedOtp, setReceivedOtp] = useState(''); // Dev helper
  const [timer, setTimer] = useState(60);
  const [resending, setResending] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const otpInputsRef = useRef([]);

  // Countdown timer effect
  useEffect(() => {
    let interval = null;
    if (showOtpModal && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showOtpModal, timer]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError('');
  };

  // Step 1: Validate Form & Request 4-digit OTP
  const handleInitiateSignUp = async (e) => {
    e.preventDefault();

    // Validate phone number
    const cleanPhone = form.phone.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      const msg = 'Please enter a valid 10-digit mobile number';
      setError(msg);
      toast.error(msg);
      return;
    }

    if (form.password.length < 6) {
      const msg = 'Password must be at least 6 characters.';
      setError(msg);
      toast.error(msg);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { data } = await axios.post('/auth/send-otp', {
        phone: cleanPhone,
        email: form.email,
      });

      if (data.success) {
        if (data.otp) {
          setReceivedOtp(data.otp);
        }
        setShowOtpModal(true);
        setTimer(60);
        setOtpDigits(['', '', '', '', '', '']);
        toast.success(`Verification code sent to +91 ${cleanPhone}`);
        // Focus first OTP input after modal renders
        setTimeout(() => {
          otpInputsRef.current[0]?.focus();
        }, 300);
      }
    } catch (err) {
      const errMsg =
        err?.response?.data?.message ||
        (err?.message === 'Network Error'
          ? 'Network Error: Make sure backend server is running on http://localhost:8000'
          : err?.message || 'Failed to send verification code.');
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP digit changes & auto-focus
  const handleOtpDigitChange = (index, value) => {
    const digit = value.replace(/\D/g, '').slice(-1);
    const newDigits = [...otpDigits];
    newDigits[index] = digit;
    setOtpDigits(newDigits);

    // If digit entered, jump to next box
    if (digit && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length === 6) {
      const newDigits = pasted.split('');
      setOtpDigits(newDigits);
      otpInputsRef.current[5]?.focus();
    }
  };

  // Step 2: Resend OTP
  const handleResendOtp = async () => {
    if (timer > 0 || resending) return;
    setResending(true);
    try {
      const cleanPhone = form.phone.replace(/\D/g, '');
      const { data } = await axios.post('/auth/send-otp', {
        phone: cleanPhone,
        email: form.email,
      });

      if (data.success) {
        if (data.otp) setReceivedOtp(data.otp);
        setTimer(60);
        setOtpDigits(['', '', '', '', '', '']);
        toast.success('New verification code sent!');
        otpInputsRef.current[0]?.focus();
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to resend code');
    } finally {
      setResending(false);
    }
  };

  // Step 3: Verify OTP & Finalize Registration
  const handleVerifyAndRegister = async (e) => {
    e?.preventDefault();
    const enteredOtp = otpDigits.join('');
    if (enteredOtp.length !== 6) {
      toast.error('Please enter the full 6-digit verification code');
      return;
    }

    setVerifying(true);
    try {
      const cleanPhone = form.phone.replace(/\D/g, '');
      const { data } = await axios.post('/auth/register', {
        ...form,
        phone: cleanPhone,
        otp: enteredOtp,
      });

      if (data.success) {
        dispatch(
          setUser({
            user: data.user,
            token: data.token,
          })
        );
        toast.success('Mobile verified & account created! Welcome to HealthHub.');
        setShowOtpModal(false);
        navigate('/');
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Invalid or expired OTP code');
    } finally {
      setVerifying(false);
    }
  };

  // Auto-fill OTP helper for testing
  const autoFillOtp = () => {
    if (receivedOtp) {
      const digits = receivedOtp.split('').slice(0, 6);
      while (digits.length < 6) digits.push('');
      setOtpDigits(digits);
      toast.success('Demo OTP auto-filled!');
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f1f4f9] flex items-center justify-center p-3 sm:p-6 font-sans relative">
      {/* Main Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-5xl bg-white rounded-3xl sm:rounded-[32px] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-100 min-h-[660px]"
      >
        {/* ── LEFT PANEL: Royal Blue with Medical Shield Plus Emblem ── */}
        <div className="w-full md:w-[44%] bg-[#2f5af6] p-8 lg:p-10 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Top Logo */}
          <div className="flex items-center gap-2.5 z-10">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center p-1.5 backdrop-blur-sm">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-white" strokeWidth="8">
                <circle cx="35" cy="35" r="14" fill="#10b981" stroke="none" />
                <circle cx="65" cy="35" r="14" fill="#38bdf8" stroke="none" />
                <circle cx="35" cy="65" r="14" fill="#38bdf8" stroke="none" />
                <circle cx="65" cy="65" r="14" fill="#10b981" stroke="none" />
                <circle cx="50" cy="50" r="8" fill="#ffffff" stroke="none" />
              </svg>
            </div>
            <span className="font-bold text-xl tracking-tight text-white">HealthHub</span>
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
                  <rect x="42" y="45" width="16" height="65" rx="4" fill="#10b981" />
                  <rect x="18" y="69.5" width="64" height="16" rx="4" fill="#10b981" />
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
                <circle cx="180" cy="225" r="10" fill="#38bdf8" stroke="#ffffff" strokeWidth="3" />
              </svg>
            </div>
          </div>

          {/* Bottom Headline & Highlights */}
          <div className="z-10 mt-2">
            <h3 className="text-2xl lg:text-3xl font-bold tracking-tight text-white mb-2 leading-snug">
              Start your healthcare journey
            </h3>
            <p className="text-white/80 text-xs lg:text-sm leading-relaxed mb-5 font-normal max-w-sm">
              Create your patient profile to connect with top doctors, schedule treatments, and get 24/7 care support.
            </p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-xs text-white/90">
                <CheckCircle2 size={15} className="text-emerald-300" />
                <span>Verified 10-digit mobile authentication</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/90">
                <CheckCircle2 size={15} className="text-emerald-300" />
                <span>Instant appointment booking</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/90">
                <CheckCircle2 size={15} className="text-emerald-300" />
                <span>Secure medical records</span>
              </div>
            </div>

            {/* Indicator */}
            <div className="flex items-center gap-1.5 pt-2">
              <span className="w-6 h-1.5 bg-white rounded-full" />
              <span className="w-1.5 h-1.5 bg-white/40 rounded-full" />
              <span className="w-1.5 h-1.5 bg-white/40 rounded-full" />
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL: Patient Registration Form ── */}
        <div className="w-full md:w-[56%] p-8 sm:p-10 lg:p-12 flex flex-col justify-center bg-white">
          <div className="mb-5 sm:mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Create an account
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1.5">
              Enter your details to register as a new HealthHub patient.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleInitiateSignUp} className="space-y-3.5">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                  <User size={16} />
                </span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g. John Doe"
                  className="w-full h-10 pl-10 pr-4 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#2f5af6] focus:ring-2 focus:ring-[#2f5af6]/10 transition-all"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                  <Mail size={16} />
                </span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="name@example.com"
                  className="w-full h-10 pl-10 pr-4 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#2f5af6] focus:ring-2 focus:ring-[#2f5af6]/10 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                  <Lock size={16} />
                </span>
                <input
                  type={showPass ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="Min. 6 characters"
                  className="w-full h-10 pl-10 pr-10 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#2f5af6] focus:ring-2 focus:ring-[#2f5af6]/10 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Mobile Phone Number (10 digits validation) */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-semibold text-slate-700">
                  Mobile Number <span className="text-[#2f5af6] font-normal">(4-Digit OTP will be sent)</span>
                </label>
                <span className="text-[10px] text-slate-400 font-mono">10 Digits</span>
              </div>
              <div className="relative flex">
                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-slate-200 bg-slate-50 text-slate-600 text-xs font-semibold">
                  🇮🇳 +91
                </span>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={(e) => {
                    const onlyNums = e.target.value.replace(/\D/g, '').slice(0, 10);
                    setForm((prev) => ({ ...prev, phone: onlyNums }));
                    setError('');
                  }}
                  required
                  placeholder="9876543210"
                  maxLength={10}
                  className="w-full h-10 pl-3 pr-4 rounded-r-lg border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#2f5af6] focus:ring-2 focus:ring-[#2f5af6]/10 transition-all font-mono tracking-wider"
                />
              </div>
            </div>

            {/* Gender & Age Row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Gender
                </label>
                <div className="relative">
                  <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    className="w-full h-10 pl-3 pr-8 rounded-lg border border-slate-200 text-sm text-slate-700 focus:outline-none focus:border-[#2f5af6] focus:ring-2 focus:ring-[#2f5af6]/10 transition-all appearance-none bg-white"
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Age
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                    <Calendar size={15} />
                  </span>
                  <input
                    type="number"
                    name="age"
                    value={form.age}
                    onChange={handleChange}
                    placeholder="25"
                    min="1"
                    max="120"
                    className="w-full h-10 pl-9 pr-3 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#2f5af6] focus:ring-2 focus:ring-[#2f5af6]/10 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-lg bg-[#2f5af6] hover:bg-[#254edb] active:scale-[0.99] text-white font-semibold text-sm shadow-md shadow-[#2f5af6]/25 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  <span>Sending Verification Code...</span>
                </>
              ) : (
                <>
                  <span>Verify Mobile & Create Account</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-5 text-center text-xs text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="text-[#10b981] font-semibold hover:underline">
              Login
            </Link>
          </div>
        </div>
      </motion.div>

      {/* ── 4-DIGIT OTP VERIFICATION MODAL ── */}
      <AnimatePresence>
        {showOtpModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 sm:p-8 relative border border-slate-100 text-center"
            >
              {/* Top Icon */}
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#2f5af6] flex items-center justify-center mx-auto mb-4 border border-blue-100 shadow-inner">
                <Smartphone size={28} />
              </div>

              {/* Title & Phone */}
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Verify Mobile Number
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm mt-1.5">
                We sent a 6-digit verification code to
              </p>
              <div className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1 rounded-full text-xs font-semibold text-slate-800 mt-2">
                <span>+91 {form.phone}</span>
                <button
                  type="button"
                  onClick={() => setShowOtpModal(false)}
                  className="text-[#2f5af6] hover:underline flex items-center gap-0.5 ml-1"
                >
                  <Edit3 size={11} /> Edit
                </button>
              </div>

              {/* Demo Helper Banner */}
              {receivedOtp && (
                <div className="mt-4 p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between gap-2 text-xs text-emerald-950">
                  <div>
                    <span className="font-bold">Test OTP:</span> <span className="font-mono tracking-widest font-bold text-emerald-700">{receivedOtp}</span>
                  </div>
                  <button
                    type="button"
                    onClick={autoFillOtp}
                    className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-semibold flex items-center gap-1 transition-colors"
                  >
                    <Sparkles size={11} /> Auto-Fill
                  </button>
                </div>
              )}

              {/* 6 Digit OTP Inputs */}
              <div className="flex justify-center items-center gap-3 sm:gap-4 my-6" onPaste={handleOtpPaste}>
                {otpDigits.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => (otpInputsRef.current[idx] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpDigitChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    className="w-10 h-12 sm:w-12 sm:h-14 rounded-xl border-2 border-slate-200 text-center text-xl font-bold text-slate-900 focus:outline-none focus:border-[#2f5af6] focus:ring-4 focus:ring-[#2f5af6]/10 transition-all bg-slate-50 focus:bg-white"
                  />
                ))}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handleVerifyAndRegister}
                  disabled={verifying || otpDigits.join('').length !== 6}
                  className="w-full h-11 rounded-xl bg-[#2f5af6] hover:bg-[#254edb] active:scale-[0.99] text-white font-semibold text-sm shadow-md shadow-[#2f5af6]/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {verifying ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      <span>Verifying Code...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck size={17} />
                      <span>Verify & Enter HealthHub</span>
                    </>
                  )}
                </button>

                {/* Resend Timer / Button */}
                <div className="flex items-center justify-between text-xs text-slate-500 pt-2 px-1">
                  <button
                    type="button"
                    onClick={() => setShowOtpModal(false)}
                    className="text-slate-500 hover:text-slate-800 transition-colors"
                  >
                    Cancel
                  </button>

                  <div>
                    {timer > 0 ? (
                      <span className="text-slate-400">
                        Resend code in <strong className="text-slate-700 font-mono">{timer}s</strong>
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        disabled={resending}
                        className="text-[#2f5af6] font-semibold hover:underline flex items-center gap-1"
                      >
                        <RotateCw size={12} className={resending ? 'animate-spin' : ''} />
                        Resend verification code
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SignUp;
