import { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Save, Loader2 } from 'lucide-react';
import axios from '../../utils/axiosInstance';

export default function Contacts() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [form, setForm] = useState({
    email: '',
    emergencyNumber: '',
    address: '',
  });

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/contacts');
      if (data.success && data.contact) {
        setForm({
          email: data.contact.email || '',
          emergencyNumber: data.contact.emergencyNumber || '',
          address: data.contact.address || '',
        });
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to load contacts');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const { data } = await axios.put('/contacts', form);
      if (data.success) {
        setSuccess('Contacts updated successfully!');
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to update contacts');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}>
        <Loader2 className="animate-spin" size={32} color="#16a34a" />
      </div>
    );
  }

  const inpStyle = {
    width: '100%', padding: '12px 16px 12px 42px', borderRadius: 12,
    border: '1.5px solid #d1fae5', fontSize: 14, outline: 'none',
    background: '#fff', boxSizing: 'border-box', color: '#111827',
    transition: 'all 0.2s'
  };

  const iconStyle = { position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#10b981' };

  return (
    <div style={{ padding: '32px 40px', fontFamily: "'Inter','Segoe UI',sans-serif", maxWidth: 800, margin: '0 auto' }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 900, color: '#111827', textTransform: 'uppercase', marginBottom: 6 }}>Manage Contacts</h1>
        <p style={{ color: '#6b7280', fontSize: 14 }}>Update hospital contact details displayed to patients.</p>
      </div>

      <div style={{ background: '#fff', borderRadius: 24, padding: 32, boxShadow: '0 4px 20px rgba(0,0,0,0.03)', border: '1px solid #e5e7eb' }}>
        {error && <div style={{ background: '#fef2f2', color: '#dc2626', padding: '12px 16px', borderRadius: 12, fontSize: 14, fontWeight: 600, marginBottom: 24, border: '1px solid #fee2e2' }}>{error}</div>}
        {success && <div style={{ background: '#f0fdf4', color: '#16a34a', padding: '12px 16px', borderRadius: 12, fontSize: 14, fontWeight: 600, marginBottom: 24, border: '1px solid #bbf7d0' }}>{success}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          
          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: '#4b5563', marginBottom: 8, display: 'block' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={iconStyle} />
              <input type="email" name="email" value={form.email} onChange={handleChange} style={inpStyle} required placeholder="contact@medicare.com" />
            </div>
          </div>

          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: '#4b5563', marginBottom: 8, display: 'block' }}>Emergency Number</label>
            <div style={{ position: 'relative' }}>
              <Phone size={18} style={iconStyle} />
              <input type="text" name="emergencyNumber" value={form.emergencyNumber} onChange={handleChange} style={inpStyle} required placeholder="e.g. +1 800 123 4567" />
            </div>
          </div>

          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: '#4b5563', marginBottom: 8, display: 'block' }}>Hospital Address</label>
            <div style={{ position: 'relative' }}>
              <MapPin size={18} style={{ ...iconStyle, top: 20, transform: 'none' }} />
              <textarea name="address" value={form.address} onChange={handleChange} style={{ ...inpStyle, padding: '12px 16px 12px 42px', minHeight: 100, resize: 'vertical' }} required placeholder="Full physical address..." />
            </div>
          </div>

          <button type="submit" disabled={saving} style={{ 
            marginTop: 12, background: '#16a34a', color: '#fff', border: 'none', 
            borderRadius: 14, padding: '16px', fontWeight: 800, fontSize: 15, 
            cursor: saving ? 'not-allowed' : 'pointer', display: 'flex', 
            alignItems: 'center', justifyContent: 'center', gap: 10,
            boxShadow: '0 4px 14px rgba(22,163,74,0.3)', transition: 'all 0.2s'
          }}>
            {saving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
            {saving ? 'Saving Changes...' : 'Save Contacts'}
          </button>
        </form>
      </div>
    </div>
  );
}
