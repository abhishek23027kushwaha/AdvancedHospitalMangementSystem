import { useState } from 'react';
import { UserPlus, Upload, CheckCircle, AlertCircle, Loader, Calendar, Clock, Plus, Trash2, ChevronRight, ChevronLeft, CalendarPlus } from 'lucide-react';
import axios from '../../utils/axiosInstance';
import AllSpecialtiesModal from '../Doctors/AllSpecialtiesModal';

export default function AddDoctor() {
  const [step, setStep] = useState(1);
  
  const [form, setForm] = useState({
    name: '', email: '', password: '', phone: '',
    specialization: [], experience: '', fee: '', about: '', available: 'true',
    qualifications: '', location: '', patients: '', success: '', rating: '5',
  });
  
  const [img, setImg] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [showSpecModal, setShowSpecModal] = useState(false);

  // Slots state (Manual)
  const [slots, setSlots] = useState([]);
  const [slotDate, setSlotDate] = useState('');
  const [slotHour, setSlotHour] = useState('10');
  const [slotMin, setSlotMin] = useState('00');
  const [slotPeriod, setSlotPeriod] = useState('AM');

  // Slots state (Bulk Generator)
  const [bulkStart, setBulkStart] = useState('');
  const [bulkEnd, setBulkEnd] = useState('');
  const [bulkStartTime, setBulkStartTime] = useState('09:00');
  const [bulkEndTime, setBulkEndTime] = useState('17:00');
  const [bulkInterval, setBulkInterval] = useState('30');

  const handleImg = (e) => {
    const file = e.target.files[0];
    if (file) { setImg(file); setPreview(URL.createObjectURL(file)); }
  };

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setError(''); setSuccess('');
  };

  const nextStep = () => {
    // Basic validation per step
    if (step === 1 && (!form.name || !form.email || !form.password)) {
      setError("Please fill all required personal details.");
      return;
    }
    if (step === 2 && (form.specialization.length === 0 || !form.experience || !form.fee)) {
      setError("Please fill all required professional details.");
      return;
    }
    if (step === 3 && (!form.about)) {
      setError("Please fill the 'About' section.");
      return;
    }
    setError('');
    setStep(s => s + 1);
  };

  const prevStep = () => setStep(s => s - 1);

  const addManualSlot = () => {
    if (!slotDate) return alert('Please select a date');
    const time = `${slotHour}:${slotMin} ${slotPeriod}`;
    const d = new Date(slotDate);
    const dateStr = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    
    if (slots.some(s => s.date === dateStr && s.time === time)) return alert('Slot already exists');
    setSlots(prev => [...prev, { date: dateStr, time, isBooked: false }]);
  };

  const generateBulkSlots = () => {
    if (!bulkStart || !bulkEnd || !bulkStartTime || !bulkEndTime) {
      alert("Please fill all bulk generator fields.");
      return;
    }

    let current = new Date(bulkStart);
    const end = new Date(bulkEnd);
    const newSlots = [];

    // Safety limit to prevent infinite loops (max 90 days)
    const diffTime = Math.abs(end - current);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    if(diffDays > 90) return alert("Maximum date range is 90 days for bulk generation.");

    while (current <= end) {
      let startTime = new Date(`${current.toDateString()} ${bulkStartTime}`);
      const endTime = new Date(`${current.toDateString()} ${bulkEndTime}`);
      
      while (startTime < endTime) {
        // En-US locale gives format "10:00 AM"
        const timeString = startTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
        const dateString = current.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
        
        // Prevent duplicates
        if (!slots.some(s => s.date === dateString && s.time === timeString) && !newSlots.some(s => s.date === dateString && s.time === timeString)) {
          newSlots.push({ date: dateString, time: timeString, isBooked: false });
        }
        
        startTime.setMinutes(startTime.getMinutes() + parseInt(bulkInterval));
      }
      current.setDate(current.getDate() + 1);
    }

    setSlots(prev => [...prev, ...newSlots]);
    alert(`Successfully generated ${newSlots.length} slots!`);
  };

  const removeSlot = (index) => setSlots(prev => prev.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(step !== 4) return;
    
    if (slots.length === 0) {
      setError("Please add at least one time slot in the Schedule before registering the doctor.");
      return;
    }

    setError(''); setSuccess('');
    setLoading(true);

    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (k === 'specialization') {
          v.forEach(spec => fd.append('specialization', spec));
        } else {
          fd.append(k, v);
        }
      });
      if (img) fd.append('image', img);
      fd.append('slots', JSON.stringify(slots));

      const { data } = await axios.post(`/admin/doctors`, fd);

      if (data.success) {
        setSuccess(`✅ Dr. ${data.doctor.name} added successfully!`);
        setForm({ name: '', email: '', password: '', phone: '', specialization: [], experience: '', fee: '', about: '', available: 'true', qualifications: '', location: '', patients: '', success: '', rating: '5' });
        setImg(null); setPreview(null);
        setSlots([]); setStep(1);
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inp = {
    width: '100%', padding: '10px 14px', borderRadius: 10,
    border: '1.5px solid #d1fae5', fontSize: 14, outline: 'none',
    fontFamily: 'inherit', background: '#fff', boxSizing: 'border-box', color: '#111827',
  };

  return (
    <div style={{ padding: '28px 32px', fontFamily: "'Inter','Segoe UI',sans-serif", maxWidth: 850, margin: '0 auto' }}>
      <h1 style={{ fontSize: 26, fontWeight: 900, color: '#111827', textTransform: 'uppercase', marginBottom: 4 }}>Add Doctor</h1>
      <p style={{ color: '#6b7280', fontSize: 13, marginBottom: 28 }}>Complete the multi-step process to onboard a new doctor</p>

      {/* Step Progress Bar */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 30 }}>
        {[1,2,3,4].map(num => (
          <div key={num} style={{ flex: 1 }}>
            <div style={{ height: 6, borderRadius: 3, background: step >= num ? '#16a34a' : '#e5e7eb', transition: 'background 0.3s' }} />
            <p style={{ fontSize: 11, fontWeight: 700, marginTop: 8, color: step >= num ? '#16a34a' : '#9ca3af' }}>
              STEP {num}
            </p>
          </div>
        ))}
      </div>

      {/* Alerts */}
      {success && (
        <div style={{ background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: 10, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, color: '#15803d', fontSize: 14, fontWeight: 600 }}>
          <CheckCircle size={18} /> {success}
        </div>
      )}
      {error && (
        <div style={{ background: '#fff1f2', border: '1.5px solid #fca5a5', borderRadius: 10, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, color: '#dc2626', fontSize: 14, fontWeight: 600 }}>
          <AlertCircle size={18} /> {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: 16, border: '1.5px solid #e5e7eb', padding: 32, boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
        
        {/* STEP 1: Personal Info */}
        <div style={{ display: step === 1 ? 'block' : 'none' }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 24, color: '#1f2937' }}>Personal Information</h2>
          
          <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 20 }}>
            <label htmlFor="doc-img" style={{ cursor: 'pointer' }}>
              <div style={{
                width: 110, height: 110, borderRadius: '50%', border: '2px dashed #bbf7d0',
                background: '#f0fdf4', display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
                transition: 'all 0.2s', boxShadow: preview ? '0 4px 12px rgba(22,163,74,0.1)' : 'none'
              }}>
                {preview ? <img src={preview} alt="Doctor" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <><Upload size={24} color="#16a34a" /><span style={{ fontSize: 10, color: '#16a34a', marginTop: 5, fontWeight: 600 }}>Photo</span></>}
              </div>
            </label>
            <input id="doc-img" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImg} />
            <div>
              <p style={{ fontWeight: 700, fontSize: 14, color: '#374151', margin: 0 }}>Doctor Profile Photo</p>
              <p style={{ fontSize: 12, color: '#9ca3af', margin: '4px 0 0' }}>JPG, PNG, WEBP · Max 5 MB</p>
              {preview && <p style={{ fontSize: 11, color: '#16a34a', marginTop: 4, fontWeight: 500 }}>✓ Ready for upload</p>}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Full Name *</label>
              <input name="name" value={form.name} onChange={handleChange} placeholder="Dr. John Smith" style={inp} />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Email Address *</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="doctor@medicare.com" style={inp} />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Password *</label>
              <input name="password" type="text" value={form.password} onChange={handleChange} placeholder="Assign a secure password" style={inp} />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Phone Number</label>
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 9876543210" style={inp} />
            </div>
          </div>
        </div>

        {/* STEP 2: Professional Details */}
        <div style={{ display: step === 2 ? 'block' : 'none' }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 24, color: '#1f2937' }}>Professional Details</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div style={{ minWidth: 0 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Specialization(s) *</label>
              <div onClick={() => setShowSpecModal(true)} style={{ ...inp, cursor: 'pointer', minHeight: 42, display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0, display: 'block' }}>
                  {form.specialization && form.specialization.length > 0 
                    ? (form.specialization.length > 2 ? `${form.specialization.slice(0, 2).join(', ')}, +${form.specialization.length - 2} more` : form.specialization.join(', ')) 
                    : <span style={{ color: '#9ca3af' }}>Select Specialities...</span>}
                </span>
              </div>
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Qualifications</label>
              <input name="qualifications" value={form.qualifications} onChange={handleChange} placeholder="e.g. MBBS, MD, FRCS" style={inp} />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Experience (years) *</label>
              <input name="experience" type="number" value={form.experience} onChange={handleChange} placeholder="e.g. 10" style={inp} min="0" />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Consultation Fee (₹) *</label>
              <input name="fee" type="number" value={form.fee} onChange={handleChange} placeholder="e.g. 1000" style={inp} min="0" />
            </div>
          </div>
        </div>

        {/* STEP 3: Practice & Metrics */}
        <div style={{ display: step === 3 ? 'block' : 'none' }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 24, color: '#1f2937' }}>Practice & Metrics</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Clinic / Hospital Location</label>
              <input name="location" value={form.location} onChange={handleChange} placeholder="e.g. Apollo, Mumbai" style={inp} />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Availability Status</label>
              <select name="available" value={form.available} onChange={handleChange} style={inp}>
                <option value="true">Currently Available</option>
                <option value="false">Not Available / On Leave</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Success Rate (%)</label>
              <input name="success" type="number" value={form.success} onChange={handleChange} placeholder="95" style={inp} min="0" max="100" />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Patients Treated (Count)</label>
              <input name="patients" value={form.patients} onChange={handleChange} placeholder="5000+" style={inp} />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Initial Rating (1-5)</label>
              <input name="rating" type="number" value={form.rating} onChange={handleChange} placeholder="4.8" style={inp} min="1" max="5" step="0.1" />
            </div>
          </div>
          <div style={{ marginTop: 20 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>About the Doctor *</label>
            <textarea name="about" value={form.about} onChange={handleChange}
              placeholder="Write a professional biography emphasizing their expertise, approach, and background..."
              rows={5} style={{ ...inp, resize: 'vertical' }}
            />
          </div>
        </div>

        {/* STEP 4: Schedule / Slots */}
        <div style={{ display: step === 4 ? 'block' : 'none' }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 24, color: '#1f2937' }}>Schedule & Slots Management</h2>
          
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <CalendarPlus size={18} color="#0284c7" />
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0369a1', margin: 0 }}>Smart Bulk Generator</h3>
            </div>
            <p style={{ fontSize: 12, color: '#64748b', marginBottom: 20 }}>Generate recurring slots for a date range automatically.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 12, alignItems: 'flex-end' }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 4 }}>Start Date</label>
                <input type="date" value={bulkStart} onChange={e => setBulkStart(e.target.value)} style={{...inp, padding: '8px 12px', fontSize: 13}} />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 4 }}>End Date</label>
                <input type="date" value={bulkEnd} onChange={e => setBulkEnd(e.target.value)} style={{...inp, padding: '8px 12px', fontSize: 13}} />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 4 }}>Shift Start</label>
                <input type="time" value={bulkStartTime} onChange={e => setBulkStartTime(e.target.value)} style={{...inp, padding: '8px 12px', fontSize: 13}} />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 4 }}>Shift End</label>
                <input type="time" value={bulkEndTime} onChange={e => setBulkEndTime(e.target.value)} style={{...inp, padding: '8px 12px', fontSize: 13}} />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 4 }}>Interval (mins)</label>
                <select value={bulkInterval} onChange={e => setBulkInterval(e.target.value)} style={{...inp, padding: '8px 12px', fontSize: 13}}>
                  <option value="15">15 mins</option>
                  <option value="20">20 mins</option>
                  <option value="30">30 mins</option>
                  <option value="60">60 mins</option>
                </select>
              </div>
              <button type="button" onClick={generateBulkSlots} style={{ background: '#0284c7', color: '#fff', border: 'none', borderRadius: 8, height: 38, fontWeight: 600, fontSize: 12, cursor: 'pointer', transition: 'background 0.2s' }} onMouseEnter={e=>e.currentTarget.style.background='#0369a1'} onMouseLeave={e=>e.currentTarget.style.background='#0284c7'}>
                Generate Slots
              </button>
            </div>
          </div>

          <div style={{ background: '#fff', border: '1.5px solid #f1f5f9', borderRadius: 12, padding: 24 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#334155', margin: '0 0 16px 0' }}>Or Add Manual Slots</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-end' }}>
              <div style={{ flex: 1, minWidth: 150 }}>
                <label style={{ fontSize: 11, fontWeight: 600, color: '#64748b', display: 'block', marginBottom: 4 }}>Date</label>
                <input type="date" value={slotDate} onChange={e => setSlotDate(e.target.value)} style={{...inp, padding: '8px 12px', fontSize: 13}} />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 600, color: '#64748b', display: 'block', marginBottom: 4 }}>Time</label>
                <div style={{ display: 'flex', gap: 6 }}>
                  <select value={slotHour} onChange={e => setSlotHour(e.target.value)} style={{ ...inp, width: 65, padding: '8px', fontSize: 13 }}>
                    {[...Array(12)].map((_, i) => <option key={i} value={String(i + 1).padStart(2, '0')}>{String(i + 1).padStart(2, '0')}</option>)}
                  </select>
                  <select value={slotMin} onChange={e => setSlotMin(e.target.value)} style={{ ...inp, width: 65, padding: '8px', fontSize: 13 }}>
                    {['00', '15', '30', '45'].map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                  <select value={slotPeriod} onChange={e => setSlotPeriod(e.target.value)} style={{ ...inp, width: 65, padding: '8px', fontSize: 13 }}>
                    <option value="AM">AM</option><option value="PM">PM</option>
                  </select>
                </div>
              </div>
              <button type="button" onClick={addManualSlot} style={{ background: '#e2e8f0', color: '#334155', border: 'none', borderRadius: 8, padding: '0 16px', fontWeight: 600, fontSize: 12, cursor: 'pointer', height: 38, display: 'flex', alignItems: 'center', gap: 6 }} onMouseEnter={e=>e.currentTarget.style.background='#cbd5e1'} onMouseLeave={e=>e.currentTarget.style.background='#e2e8f0'}>
                <Plus size={14} /> Add
              </button>
            </div>
          </div>

          <div style={{ marginTop: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: '#475569', margin: 0 }}>Generated Slots ({slots.length})</h4>
              {slots.length > 0 && <button type="button" onClick={()=>setSlots([])} style={{ fontSize: 11, color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Clear All</button>}
            </div>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, maxHeight: 180, overflowY: 'auto', padding: '4px 4px 4px 0' }}>
              {slots.length === 0 ? <p style={{ fontSize: 12, color: '#94a3b8', margin: 0, fontStyle: 'italic' }}>No slots added yet.</p> : null}
              {slots.map((s, idx) => (
                <div key={idx} style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 6, padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 12, color: '#166534', fontWeight: 600 }}>{s.date} <span style={{opacity: 0.6}}>|</span> {s.time}</span>
                  <button type="button" onClick={() => removeSlot(idx)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fca5a5', padding: 0, display: 'flex' }} onMouseEnter={e => e.currentTarget.style.color = '#ef4444'} onMouseLeave={e => e.currentTarget.style.color = '#fca5a5'}>
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wizard Navigation */}
        <div style={{ marginTop: 40, paddingTop: 20, borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between' }}>
          {step > 1 ? (
            <button type="button" onClick={prevStep} style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#fff', border: '1px solid #cbd5e1', color: '#475569', padding: '10px 20px', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
              <ChevronLeft size={16} /> Back
            </button>
          ) : <div />}

          {step < 4 ? (
            <button type="button" onClick={nextStep} style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#111827', border: 'none', color: '#fff', padding: '10px 24px', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
              Continue <ChevronRight size={16} />
            </button>
          ) : (
            <button type="submit" disabled={loading} style={{ display: 'flex', alignItems: 'center', gap: 8, background: loading ? '#86efac' : '#16a34a', border: 'none', color: '#fff', padding: '10px 28px', borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', boxShadow: '0 4px 12px rgba(22,163,74,0.2)' }}>
              {loading ? <Loader size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <UserPlus size={16} />}
              {loading ? 'Registering...' : 'Complete & Register Doctor'}
            </button>
          )}
        </div>
      </form>

      {showSpecModal && (
        <AllSpecialtiesModal 
          onClose={() => setShowSpecModal(false)}
          onApply={(selected) => {
            setForm(f => ({ ...f, specialization: selected }));
          }}
        />
      )}

      <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
    </div>
  );
}
