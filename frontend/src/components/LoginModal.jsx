import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { X } from 'lucide-react';
import { setUser } from '../redux/user.slice.js';
import axios from '../utils/axiosInstance.js';

const LoginModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState('mobile'); // 'mobile' | 'email'
  
  // Mobile Auth State
  const [phone, setPhone] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [step, setStep] = useState(1); // 1: phone input, 2: otp input
  const [otp, setOtp] = useState(['', '', '', '', '', '']); // 6 digit OTP array (using 6 based on twilio/dev default)
  
  // Email Auth State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleClose = () => {
    // Reset state when closing
    setStep(1);
    setPhone('');
    setEmail('');
    setPassword('');
    setOtp(['', '', '', '', '', '']);
    setError('');
    setActiveTab('mobile');
    onClose();
  };

  // ── Mobile Flow ──────────────────────────────────────────
  const handleGetOtp = async (e) => {
    e.preventDefault();
    if (!agreeTerms) {
      setError("Please agree to the Terms of Use");
      return;
    }
    if (phone.length < 10) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }
    
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.post('/auth/login-otp/send', { phone });
      if (data.success) {
        toast.success(data.message);
        if(data.otp) {
          // Dev mode: fill OTP automatically for ease of testing
          setOtp(data.otp.split('').concat(Array(6 - data.otp.length).fill('')));
          toast('Development Mode: OTP auto-filled', { icon: '🛠️' });
        }
        setStep(2);
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length < 4) {
      setError("Please enter a complete OTP");
      return;
    }
    
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.post('/auth/login-otp/verify', { phone, otp: otpValue });
      if (data.success) {
        dispatch(setUser({ user: data.user, token: data.token }));
        toast.success(`Welcome back, ${data.user.name || 'Patient'}!`);
        handleClose();
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Invalid or expired OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (e, index) => {
    const val = e.target.value;
    if (isNaN(val)) return;
    
    const newOtp = [...otp];
    // Handle paste
    if (val.length > 1) {
      const pastedData = val.slice(0, 6).split('');
      for (let i = 0; i < pastedData.length; i++) {
        if (index + i < 6) newOtp[index + i] = pastedData[i];
      }
      setOtp(newOtp);
      // focus the last filled input
      const nextIndex = Math.min(index + pastedData.length, 5);
      document.getElementById(`otp-${nextIndex}`)?.focus();
      return;
    }

    newOtp[index] = val;
    setOtp(newOtp);
    if (val !== '' && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  // ── Email Flow ──────────────────────────────────────────
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }
    
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.post('/auth/login', { email, password });
      if (data.success) {
        dispatch(setUser({ user: data.user, token: data.token }));
        toast.success(`Welcome back, ${data.user.name || 'Patient'}!`);
        handleClose();
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-[480px] bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button 
          onClick={handleClose} 
          className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors z-10"
        >
          <X size={20} />
        </button>

        <div className="p-8 pb-10 max-h-[90vh] overflow-y-auto">
          {/* Header Section */}
          <div className="mb-8 pr-6">
            <h1 className="text-[32px] sm:text-[36px] font-bold tracking-tight mb-3">Welcome</h1>
            <p className="text-[#6b7280] text-[15px] leading-relaxed">
              Sign in to manage appointments, access reports, and stay connected with your doctors.
            </p>
          </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-3 rounded-md bg-[#fef2f2] border border-[#fecaca] text-[#dc2626] text-sm">
            {error}
          </div>
        )}

        {/* Tab Header (Only show if step is 1) */}
        {step === 1 && (
          <div className="flex border-b border-[#e5e7eb] mb-8">
            <button
              onClick={() => { setActiveTab('mobile'); setError(''); }}
              className={`flex-1 text-center py-4 font-semibold text-[15px] transition-all relative
                ${activeTab === 'mobile' ? 'text-[#0052cc] bg-[#f0f5ff] rounded-t-md' : 'text-[#4b5563] hover:text-[#111827]'}`}
            >
              Mobile Number
              {activeTab === 'mobile' && (
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0052cc]" />
              )}
            </button>
            <button
              onClick={() => { setActiveTab('email'); setError(''); }}
              className={`flex-1 text-center py-4 font-semibold text-[15px] transition-all relative
                ${activeTab === 'email' ? 'text-[#0052cc] bg-[#f0f5ff] rounded-t-md' : 'text-[#4b5563] hover:text-[#111827]'}`}
            >
              Email ID
              {activeTab === 'email' && (
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0052cc]" />
              )}
            </button>
          </div>
        )}

        {/* ── Content: Mobile Tab (Step 1) ── */}
        {activeTab === 'mobile' && step === 1 && (
          <form onSubmit={handleGetOtp} className="space-y-6">
            <div className="relative flex items-center border border-[#d1d5db] rounded-lg overflow-hidden h-14 hover:border-[#9ca3af] focus-within:border-[#0052cc] focus-within:ring-1 focus-within:ring-[#0052cc] transition-colors">
              <div className="flex items-center justify-center px-4 bg-white border-r border-[#e5e7eb] h-full text-[15px] text-[#4b5563] shrink-0">
                <span className="mr-2 text-lg">🇮🇳</span> +91
              </div>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                placeholder="Mobile Number*"
                className="flex-1 h-full px-4 outline-none text-[15px] text-[#111827] placeholder:text-[#9ca3af]"
              />
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-1 w-[18px] h-[18px] rounded border-[#d1d5db] text-[#0052cc] focus:ring-[#0052cc]"
              />
              <label htmlFor="terms" className="text-[14px] text-[#6b7280] select-none">
                By logging in, you agree to our <span className="text-[#0052cc] underline cursor-pointer">Terms of Use</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-[52px] bg-[#0052cc] hover:bg-[#0047b3] text-white rounded-lg font-semibold text-[16px] transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                 <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
              ) : 'Get OTP'}
            </button>
          </form>
        )}

        {/* ── Content: OTP Input (Step 2) ── */}
        {activeTab === 'mobile' && step === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div className="mb-2">
              <p className="text-[14px] text-[#4b5563] mb-4">
                We've sent a verification code to <span className="font-semibold text-[#111827]">+91 {phone}</span>.{' '}
                <button type="button" onClick={() => { setStep(1); setOtp(['','','','','','']); setError(''); }} className="text-[#0052cc] hover:underline font-medium ml-1">Change</button>
              </p>
              
              <div className="flex justify-between gap-2 sm:gap-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={6}
                    value={digit}
                    onChange={(e) => handleOtpChange(e, index)}
                    onKeyDown={(e) => handleOtpKeyDown(e, index)}
                    className="w-10 sm:w-14 h-12 sm:h-16 text-center text-xl font-bold border border-[#d1d5db] rounded-lg text-[#111827] outline-none focus:border-[#0052cc] focus:ring-1 focus:ring-[#0052cc]"
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-[52px] bg-[#0052cc] hover:bg-[#0047b3] text-white rounded-lg font-semibold text-[16px] transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                 <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
              ) : 'Verify & Login'}
            </button>
          </form>
        )}

        {/* ── Content: Email Tab ── */}
        {activeTab === 'email' && (
          <form onSubmit={handleEmailLogin} className="space-y-5">
            <div>
              <label className="block text-[13px] font-semibold text-[#374151] mb-1.5">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full h-12 px-4 rounded-lg border border-[#d1d5db] text-[15px] outline-none focus:border-[#0052cc] focus:ring-1 focus:ring-[#0052cc] placeholder:text-[#9ca3af]"
              />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[13px] font-semibold text-[#374151]">Password</label>
                <a href="#forgot" className="text-[13px] text-[#0052cc] hover:underline font-medium">Forgot Password?</a>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full h-12 px-4 rounded-lg border border-[#d1d5db] text-[15px] outline-none focus:border-[#0052cc] focus:ring-1 focus:ring-[#0052cc] placeholder:text-[#9ca3af]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-[52px] bg-[#0052cc] hover:bg-[#0047b3] text-white rounded-lg font-semibold text-[16px] transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center mt-2"
            >
              {loading ? (
                 <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
              ) : 'Login'}
            </button>
          </form>
        )}

        {/* Bottom Actions */}
        <div className="mt-10 pt-6 border-t border-[#f3f4f6] flex items-center justify-between text-[14px]">
          <p className="text-[#6b7280]">
            New to HealthHub? <Link to="/signup" onClick={handleClose} className="text-[#0052cc] font-semibold hover:underline ml-1">Create an account</Link>
          </p>
          <Link to="/doctor/login" onClick={handleClose} className="text-[#4b5563] font-medium hover:text-[#111827]">
            Doctor Portal
          </Link>
        </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
