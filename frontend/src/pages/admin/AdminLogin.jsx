import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, Sparkles, CheckCircle2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { setUser } from '../../redux/user.slice.js';
import axios from '../../utils/axiosInstance.js';

const AdminLogin = () => {
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

  const fillDemoCredentials = () => {
    setForm({
      email: 'adminmedicare@gmail.com',
      password: 'admin@123',
    });
    setError('');
    toast.success('Admin credentials filled!');
  };

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
      // Clear any conflicting doctor session
      localStorage.removeItem('doctorToken');
      localStorage.removeItem('doctor');

      const { data } = await axios.post('/admin/login', form);

      if (data.success) {
        dispatch(
          setUser({
            user: data.admin,
            token: data.token,
          })
        );
        toast.success('Admin logged in successfully!');
        navigate('/admin');
      }
    } catch (err) {
      const errMsg =
        err?.response?.data?.message ||
        (err?.message === 'Network Error'
          ? 'Network Error: Make sure your backend server is running on http://localhost:8000'
          : err?.message || 'Admin login failed.');
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f1f4f9] flex items-center justify-center p-3 sm:p-6 font-sans">
      {/* Main Container Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-5xl bg-white rounded-3xl sm:rounded-[32px] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-100 min-h-[640px]"
      >
        {/* ── LEFT PANEL: Royal Blue with Medical Shield Plus Emblem ── */}
        <div className="w-full md:w-[46%] bg-[#2f5af6] p-8 lg:p-10 text-white flex flex-col justify-between relative overflow-hidden">
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
              {/* Background circular halo */}
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
              Enhance impact in healthcare
            </h3>
            <p className="text-white/80 text-xs lg:text-sm leading-relaxed mb-5 font-normal max-w-sm">
              Your impact in healthcare just got stronger. Enhance patient care through refined data control, seamless appointments, and impactful task management.
            </p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-xs text-white/90">
                <CheckCircle2 size={15} className="text-emerald-300" />
                <span>Verified administrator control</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/90">
                <CheckCircle2 size={15} className="text-emerald-300" />
                <span>Complete hospital management</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/90">
                <CheckCircle2 size={15} className="text-emerald-300" />
                <span>Real-time operational monitoring</span>
              </div>
            </div>

            {/* Pagination Dots Indicator */}
            <div className="flex items-center gap-1.5 pt-2">
              <span className="w-6 h-1.5 bg-white rounded-full" />
              <span className="w-1.5 h-1.5 bg-white/40 rounded-full" />
              <span className="w-1.5 h-1.5 bg-white/40 rounded-full" />
              <span className="w-1.5 h-1.5 bg-white/40 rounded-full" />
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL: Login Form ── */}
        <div className="w-full md:w-[54%] p-8 sm:p-12 lg:p-14 flex flex-col justify-center bg-white">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Login to your account
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-2 leading-relaxed">
              Login to access your healthcare dashboard. Explore appointments, manage tasks and patient records with ease.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Email
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
                  placeholder="Enter your email address"
                  className="w-full h-11 pl-10 pr-4 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#2f5af6] focus:ring-2 focus:ring-[#2f5af6]/10 transition-all font-normal"
                />
              </div>
            </div>

            {/* Password Field */}
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
                  placeholder="Enter your password"
                  className="w-full h-11 pl-10 pr-10 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#2f5af6] focus:ring-2 focus:ring-[#2f5af6]/10 transition-all font-normal"
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

            {/* Remember Me & Forgot Password & AutoFill */}
            <div className="flex items-center justify-between text-xs pt-1 pb-1">
              <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-[#2f5af6] focus:ring-[#2f5af6]/20"
                />
                <span>Remember Me</span>
              </label>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={fillDemoCredentials}
                  className="text-slate-500 hover:text-[#2f5af6] transition-colors flex items-center gap-1 font-medium text-[11px] bg-slate-50 hover:bg-blue-50 px-2 py-1 rounded border border-slate-200"
                  title="Autofill default admin credentials"
                >
                  <Sparkles size={12} className="text-amber-500" />
                  Auto-Fill Admin
                </button>

                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    toast('Contact system administrator to reset password.');
                  }}
                  className="text-[#10b981] hover:text-[#059669] font-medium transition-colors"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-lg bg-[#2f5af6] hover:bg-[#254edb] active:scale-[0.99] text-white font-semibold text-sm shadow-md shadow-[#2f5af6]/25 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  <span>Logging in...</span>
                </>
              ) : (
                'Login'
              )}
            </button>
          </form>

          {/* Social Divider */}
          <div className="my-6 text-center relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100" />
            </div>
            <span className="relative bg-white px-3 text-[11px] text-slate-400 font-normal">
              Or connect with a social account
            </span>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => toast('Google Sign-In is enabled for staff portal')}
              className="h-10 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Google</span>
            </button>

            <button
              type="button"
              onClick={() => toast('Facebook login available')}
              className="h-10 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <svg className="w-4 h-4 fill-[#1877F2]" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Facebook</span>
            </button>
          </div>

          {/* Bottom Footer */}
          <div className="mt-8 text-center text-xs text-slate-500">
            Don't have an account yet?{' '}
            <Link to="/signup" className="text-[#10b981] font-semibold hover:underline">
              Signup
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;