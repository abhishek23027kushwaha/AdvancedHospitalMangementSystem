import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, MapPin, BadgeCheck, Heart, Star,
  CalendarCheck, User, ChevronLeft, ChevronRight,
  Clock, Video, SlidersHorizontal, X, CheckCircle2
} from 'lucide-react';
import axios from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

const SPECIALITIES = [
  'All', 'Cardiologist', 'Neurologist', 'Pediatrician', 'Dermatologist',
  'Oncologist', 'Orthopedic Surgeon', 'Nephrologist', 'Gastroenterologist',
  'Gynecologist', 'Pulmonologist', 'Endocrinologist', 'Urologist',
  'Rheumatologist', 'Psychiatrist', 'Ophthalmologist', 'ENT Specialist',
];

const EXPERIENCE_OPTIONS = [
  { label: '0-5 Years', min: 0, max: 5 },
  { label: '5-10 Years', min: 5, max: 10 },
  { label: '10-15 Years', min: 10, max: 15 },
  { label: '15+ Years', min: 15, max: 99 },
];

const ITEMS_PER_PAGE = 6;

/* ─── Doctor Row Card ─── */
const DoctorRow = ({ doc }) => {
  const navigate = useNavigate();
  const rating = typeof doc.rating === 'number' ? doc.rating.toFixed(1) : '4.9';
  const reviews = doc.reviewCount || Math.floor(Math.random() * 120 + 40);
  const spec = doc.specialization || doc.speciality || 'Medical Specialist';
  const exp = doc.experience || 5;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="bg-white border border-[#E2E8F0] rounded-2xl p-5 flex flex-col sm:flex-row gap-4 hover:shadow-md hover:border-[#BFDBFE] transition-all duration-200 group"
    >
      {/* Photo */}
      <div className="flex-shrink-0">
        <div className="relative w-[88px] h-[88px]">
          <div className="w-full h-full rounded-full overflow-hidden bg-[#EFF6FF] border-2 border-[#DBEAFE]">
            <img
              src={doc.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(doc.name)}&background=EFF6FF&color=2563EB&size=96&bold=true`}
              alt={doc.name}
              className="w-full h-full object-cover object-top"
            />
          </div>
          {/* Green dot */}
          <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-[#16A34A] rounded-full border-2 border-white" />
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
          <h3 className="text-[15px] font-bold text-[#0F172A] leading-tight">Dr. {doc.name}</h3>
          <BadgeCheck size={16} className="text-[#2563EB] flex-shrink-0" />
        </div>

        <p className="text-[#2563EB] text-sm font-semibold mb-2">{spec}</p>

        <div className="flex flex-wrap items-center gap-2 text-[13px] text-[#64748B] mb-2">
          <span className="flex items-center gap-1">
            <Star size={13} className="text-[#F59E0B] fill-[#F59E0B]" />
            <span className="font-bold text-[#0F172A]">{rating}</span>
            <span>({reviews} reviews)</span>
          </span>
          <span className="text-[#CBD5E1]">•</span>
          <span>{exp}+ Years Exp.</span>
          {doc.qualifications && (
            <>
              <span className="text-[#CBD5E1]">•</span>
              <span className="truncate max-w-[200px]">{doc.qualifications}</span>
            </>
          )}
        </div>

        {/* Condition tags */}
        {doc.tags && doc.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-1">
            {doc.tags.slice(0, 4).map((tag, i) => (
              <span key={i} className="px-2.5 py-0.5 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] text-[11px] text-[#475569] font-medium">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Right: availability + buttons */}
      <div className="flex flex-col justify-between gap-3 flex-shrink-0 sm:w-[196px]">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold text-[#16A34A] flex items-center gap-1 mb-0.5">
              <CheckCircle2 size={12} />
              Available Today
            </p>
            <p className="text-[11px] text-[#64748B]">10:00 AM – 05:00 PM</p>
          </div>
          <button className="p-1.5 rounded-full hover:bg-red-50 transition-colors flex-shrink-0">
            <Heart size={15} className="text-[#CBD5E1] hover:text-red-400 transition-colors" />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => navigate(`/book-appointment/${doc._id}`)}
            className="flex items-center justify-center gap-1.5 w-full py-2 bg-[#EFF6FF] text-[#2563EB] border border-[#DBEAFE] rounded-xl text-[13px] font-semibold hover:bg-[#DBEAFE] transition-all"
          >
            <User size={13} />
            View Profile
          </button>
          <button
            onClick={() => navigate(`/book-appointment/${doc._id}`)}
            className="flex items-center justify-center gap-1.5 w-full py-2 bg-[#2563EB] text-white rounded-xl text-[13px] font-semibold hover:bg-[#1D4ED8] transition-all border-0 shadow-sm"
          >
            <CalendarCheck size={13} />
            Book Appointment
          </button>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Checkbox Item ─── */
const CheckItem = ({ label, checked, onChange, count }) => (
  <label className="flex items-center justify-between cursor-pointer group py-0.5">
    <div className="flex items-center gap-2.5">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 rounded border-[#CBD5E1] accent-[#2563EB] cursor-pointer flex-shrink-0"
      />
      <span className="text-[13px] text-[#475569] group-hover:text-[#0F172A] transition-colors select-none">{label}</span>
    </div>
    {count !== undefined && (
      <span className="text-[11px] text-[#94A3B8]">({count})</span>
    )}
  </label>
);

/* ─── Main Page ─── */
const AllDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  // Filters
  const [activeSpec, setActiveSpec] = useState('All');
  const [expFilters, setExpFilters] = useState([]);
  const [availToday, setAvailToday] = useState(false);
  const [availTomorrow, setAvailTomorrow] = useState(false);
  const [inPerson, setInPerson] = useState(false);
  const [videoConsult, setVideoConsult] = useState(false);

  // Sort & pagination
  const [sortBy, setSortBy] = useState('Relevance');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
    axios.get('/doctor/all')
      .then(({ data }) => { if (data.success) setDoctors(data.doctors); })
      .catch(() => setError('Failed to load doctors'))
      .finally(() => setLoading(false));
  }, []);

  // Close suggestions on outside click
  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Reset page on filter change
  useEffect(() => { setCurrentPage(1); }, [query, activeSpec, expFilters, availToday, availTomorrow]);

  // Suggestions: names + specialties matching query
  const suggestions = query.length >= 1
    ? [
        ...doctors
          .filter(d => d.name.toLowerCase().includes(query.toLowerCase()))
          .map(d => ({ type: 'doctor', label: `Dr. ${d.name}`, sub: d.specialization, id: d._id })),
        ...SPECIALITIES.filter(s => s !== 'All' && s.toLowerCase().includes(query.toLowerCase()))
          .map(s => ({ type: 'spec', label: s, sub: 'Specialization' })),
      ].slice(0, 8)
    : [];

  // Filtered doctors
  const filtered = doctors.filter(doc => {
    const q = query.toLowerCase();
    const matchSearch = !query || doc.name.toLowerCase().includes(q) || (doc.specialization || '').toLowerCase().includes(q);
    const matchSpec = activeSpec === 'All' || doc.specialization === activeSpec;
    const matchExp = expFilters.length === 0 || expFilters.some(f => {
      const e = Number(doc.experience) || 0;
      return e >= f.min && e < f.max;
    });
    return matchSearch && matchSpec && matchExp;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const toggleExp = (opt) =>
    setExpFilters(prev => prev.find(f => f.label === opt.label) ? prev.filter(f => f.label !== opt.label) : [...prev, opt]);

  const clearAll = () => {
    setExpFilters([]); setAvailToday(false); setAvailTomorrow(false);
    setInPerson(false); setVideoConsult(false); setActiveSpec('All'); setQuery('');
  };

  // Experience counts
  const expCounts = (opt) => doctors.filter(d => {
    const e = Number(d.experience) || 0;
    return e >= opt.min && e < opt.max;
  }).length;

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-[#2563EB] border-t-transparent mb-4" />
        <p className="text-[#64748B] font-semibold uppercase tracking-widest text-xs">Loading Doctors...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC]">

      {/* ── Top Search Bar ── */}
      <div className="bg-white border-b border-[#E2E8F0] px-4 md:px-8 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center gap-3">

          {/* Search with suggestions */}
          <div className="relative flex-1" ref={searchRef}>
            <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={e => { setQuery(e.target.value); setShowSuggestions(true); }}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Search doctors by name or specialization..."
              className="w-full pl-11 pr-10 py-3 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 text-[#334155] text-sm outline-none transition-all font-medium placeholder:text-[#94A3B8]"
            />
            {query && (
              <button onClick={() => { setQuery(''); setShowSuggestions(false); }} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#475569] transition-colors">
                <X size={15} />
              </button>
            )}

            {/* Suggestions Dropdown */}
            <AnimatePresence>
              {showSuggestions && suggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#E2E8F0] rounded-2xl shadow-xl shadow-slate-200/70 z-50 overflow-hidden"
                >
                  {suggestions.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        if (s.type === 'spec') { setActiveSpec(s.label); setQuery(''); }
                        else setQuery(s.label.replace('Dr. ', ''));
                        setShowSuggestions(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-[#F8FAFC] transition-colors border-b border-[#F1F5F9] last:border-0"
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${s.type === 'doctor' ? 'bg-[#EFF6FF]' : 'bg-[#F0FDF4]'}`}>
                        {s.type === 'doctor'
                          ? <User size={14} className="text-[#2563EB]" />
                          : <BadgeCheck size={14} className="text-[#16A34A]" />
                        }
                      </div>
                      <div className="min-w-0">
                        <p className="text-[13px] font-semibold text-[#0F172A] truncate">{s.label}</p>
                        <p className="text-[11px] text-[#94A3B8]">{s.sub}</p>
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Location */}
          <div className="hidden md:flex items-center gap-2 border border-[#E2E8F0] rounded-full px-4 py-3 bg-white text-sm text-[#334155] font-medium cursor-pointer hover:border-[#2563EB] transition-colors flex-shrink-0">
            <MapPin size={15} className="text-[#2563EB]" />
            <span>India</span>
            <ChevronRight size={14} className="text-[#94A3B8] rotate-90" />
          </div>
        </div>
      </div>

      {/* ── Specialty Pills Row ── */}
      <div className="bg-white border-b border-[#E2E8F0] px-4 md:px-8 py-3">
        <div className="max-w-7xl mx-auto overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 flex-nowrap">
            {SPECIALITIES.map(spec => (
              <button
                key={spec}
                onClick={() => { setActiveSpec(spec); setCurrentPage(1); }}
                className={`px-4 py-1.5 rounded-full text-[13px] font-semibold transition-all border whitespace-nowrap flex-shrink-0 ${
                  activeSpec === spec
                    ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-sm'
                    : 'bg-white text-[#475569] border-[#E2E8F0] hover:border-[#2563EB] hover:text-[#2563EB]'
                }`}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Body ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-7">
        <div className="flex gap-6">

          {/* ─── LEFT SIDEBAR ─── */}
          <aside className="hidden lg:flex flex-col gap-0 w-56 flex-shrink-0 sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto no-scrollbar">
            <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden">

              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3.5 border-b border-[#E2E8F0]">
                <h3 className="text-[#0F172A] font-bold text-sm flex items-center gap-2">
                  <SlidersHorizontal size={14} className="text-[#2563EB]" />
                  Filters
                </h3>
                <button onClick={clearAll} className="text-[#2563EB] text-xs font-semibold hover:underline">
                  Clear All
                </button>
              </div>

              {/* Location */}
              <div className="px-4 py-4 border-b border-[#F1F5F9]">
                <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <MapPin size={11} /> Location
                </p>
                <div className="flex items-center justify-between bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-3 py-2 cursor-pointer hover:border-[#2563EB] transition-colors">
                  <span className="text-[13px] text-[#334155] font-medium">India</span>
                  <ChevronRight size={13} className="text-[#94A3B8] rotate-90" />
                </div>
              </div>

              {/* Experience */}
              <div className="px-4 py-4 border-b border-[#F1F5F9]">
                <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-3">Experience</p>
                <div className="space-y-2">
                  {EXPERIENCE_OPTIONS.map(opt => (
                    <CheckItem
                      key={opt.label}
                      label={opt.label}
                      count={expCounts(opt)}
                      checked={expFilters.some(f => f.label === opt.label)}
                      onChange={() => toggleExp(opt)}
                    />
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="px-4 py-4 border-b border-[#F1F5F9]">
                <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <CalendarCheck size={11} /> Availability
                </p>
                <div className="space-y-2">
                  <CheckItem label="Available Today" checked={availToday} onChange={() => setAvailToday(v => !v)} count={doctors.length} />
                  <CheckItem label="Available Tomorrow" checked={availTomorrow} onChange={() => setAvailTomorrow(v => !v)} count={Math.floor(doctors.length * 0.7)} />
                </div>
              </div>

              {/* Consultation Type */}
              <div className="px-4 py-4">
                <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Video size={11} /> Consultation Type
                </p>
                <div className="space-y-2">
                  <CheckItem label="In-person" checked={inPerson} onChange={() => setInPerson(v => !v)} count={doctors.length} />
                  <CheckItem label="Video Consultation" checked={videoConsult} onChange={() => setVideoConsult(v => !v)} count={Math.floor(doctors.length * 0.6)} />
                </div>
              </div>

              {/* Apply */}
              <div className="px-4 pb-4">
                <button className="w-full py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl text-[13px] font-bold transition-all border-0 shadow-sm shadow-blue-200">
                  Apply Filters
                </button>
              </div>
            </div>
          </aside>

          {/* ─── MAIN CONTENT ─── */}
          <div className="flex-1 min-w-0">

            {/* Results + Sort bar */}
            <div className="flex items-center justify-between mb-5">
              <p className="text-[#475569] text-[13px]">
                Showing{' '}
                <span className="text-[#0F172A] font-bold">{filtered.length}</span>{' '}
                Doctor{filtered.length !== 1 ? 's' : ''}
                {activeSpec !== 'All' && <span className="text-[#2563EB] font-semibold"> · {activeSpec}</span>}
              </p>
              <div className="flex items-center gap-1.5 text-[13px] text-[#475569]">
                <span className="hidden sm:block">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="text-[#0F172A] font-semibold bg-transparent border-0 outline-none cursor-pointer text-[13px]"
                >
                  <option>Relevance</option>
                  <option>Rating</option>
                  <option>Experience</option>
                  <option>Fees: Low to High</option>
                </select>
                <ChevronRight size={14} className="text-[#94A3B8] rotate-90" />
              </div>
            </div>

            {error && (
              <div className="mb-5 p-4 bg-red-50 border border-red-100 rounded-xl text-[#DC2626] font-semibold text-sm text-center">
                {error}
              </div>
            )}

            {/* Doctor List */}
            <AnimatePresence mode="popLayout">
              {paginated.length > 0 ? (
                <div className="space-y-3">
                  {paginated.map((doc, i) => (
                    <DoctorRow key={doc._id} doc={doc} />
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-24 bg-white rounded-2xl border border-[#E2E8F0]"
                >
                  <p className="text-5xl mb-4">🔍</p>
                  <h3 className="text-base font-bold text-[#0F172A] mb-1">No doctors found</h3>
                  <p className="text-[#64748B] text-sm">Try a different name or speciality</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Pagination ── */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-1.5 mt-9">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-[#E2E8F0] bg-white text-[#475569] hover:border-[#2563EB] hover:text-[#2563EB] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft size={16} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                  .reduce((acc, p, idx, arr) => {
                    if (idx > 0 && p - arr[idx - 1] > 1) acc.push('...');
                    acc.push(p);
                    return acc;
                  }, [])
                  .map((p, i) =>
                    p === '...' ? (
                      <span key={`dot-${i}`} className="text-[#94A3B8] px-1 text-sm">...</span>
                    ) : (
                      <button
                        key={p}
                        onClick={() => setCurrentPage(p)}
                        className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-bold transition-all border ${
                          currentPage === p
                            ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-sm shadow-blue-200'
                            : 'bg-white text-[#475569] border-[#E2E8F0] hover:border-[#2563EB] hover:text-[#2563EB]'
                        }`}
                      >
                        {p}
                      </button>
                    )
                  )
                }

                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-[#E2E8F0] bg-white text-[#475569] hover:border-[#2563EB] hover:text-[#2563EB] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hide scrollbar utility */}
      <style>{`.no-scrollbar::-webkit-scrollbar{display:none}.no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}`}</style>
    </div>
  );
};

export default AllDoctors;
