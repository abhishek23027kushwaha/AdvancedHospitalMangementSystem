import React, { useState, useEffect } from 'react';
import { ChevronLeft, Edit2, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import axios from '../utils/axiosInstance.js';
import { setUser } from '../redux/user.slice.js';

const UserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    mrn: '',
    dob: '',
    gender: '',
    phone: '',
    email: '',
    address: {
      houseNo: '',
      street: '',
      locality: '',
      pinCode: '',
      city: '',
      district: '',
      state: '',
      country: ''
    }
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        mrn: user.mrn || '',
        dob: user.dob || '',
        gender: user.gender || '',
        phone: user.phone || '',
        email: user.email || '',
        address: {
          houseNo: user.address?.houseNo || '',
          street: user.address?.street || '',
          locality: user.address?.locality || '',
          pinCode: user.address?.pinCode || '',
          city: user.address?.city || '',
          district: user.address?.district || '',
          state: user.address?.state || '',
          country: user.address?.country || ''
        }
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: { ...prev.address, [field]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const { data } = await axios.put('/auth/update-profile', formData);
      if (data.success) {
        dispatch(setUser({ user: data.user, token: localStorage.getItem('token') || '' }));
        toast.success("Profile updated successfully");
        setIsEditing(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  // Helper to render initial for avatar
  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-12 bg-white min-h-screen">
      
      {/* Top Header */}
      <div className="flex items-center text-[#1f2937] cursor-pointer mb-6 w-fit hover:text-[#0052cc]" onClick={() => navigate(-1)}>
        <ChevronLeft size={20} />
        <span className="font-semibold text-lg ml-1">Profile</span>
      </div>

      {/* Profile Bar */}
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-2 bg-[#f8fafc] px-4 py-2 rounded-full border border-gray-100">
          <div className="w-5 h-5 rounded-full bg-[#10b981] flex items-center justify-center shrink-0">
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          </div>
          <span className="font-semibold text-[#374151] text-[15px]">{user?.name}</span>
        </div>
        
        {isEditing ? (
          <div className="flex gap-3">
             <button 
              onClick={() => setIsEditing(false)}
              className="px-6 py-2 rounded-full border border-gray-300 text-gray-700 font-medium text-[15px] hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              disabled={loading}
              className="px-6 py-2 rounded-full bg-[#10b981] text-white font-medium text-[15px] hover:bg-[#059669] transition-colors shadow-sm disabled:opacity-70 flex items-center gap-2"
            >
              {loading && <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>}
              Save Profile
            </button>
          </div>
        ) : (
          <button 
            onClick={() => setIsEditing(true)}
            className="px-6 py-2 rounded-full border border-[#10b981] text-[#10b981] font-medium text-[15px] hover:bg-[#ecfdf5] transition-colors"
          >
            Edit Profile
          </button>
        )}
      </div>

      {/* Content Form */}
      <div className="space-y-12 pb-20">
        
        {/* Personal Details */}
        <div>
          <h4 className="text-[15px] font-bold text-[#1f2937] mb-6 relative">
            Personal Details
            <div className="absolute left-[130px] top-1/2 -translate-y-1/2 w-full h-[1px] bg-gray-100 z-0"></div>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 z-10 relative bg-white">
            
            {/* Avatar Column */}
            <div className="md:col-span-2 flex flex-col items-center sm:items-start">
              <span className="text-[13px] text-gray-500 mb-2">Profile Pic</span>
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-[#fdf5e6] flex items-center justify-center text-3xl font-light text-[#1f2937]">
                  {getInitial(formData.name)}
                </div>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 w-7 h-7 bg-[#10b981] rounded-full flex items-center justify-center text-white border-2 border-white hover:bg-[#059669]">
                    <Edit2 size={13} />
                  </button>
                )}
              </div>
            </div>

            {/* Fields Column */}
            <div className="md:col-span-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-6">
              {/* Name */}
              <div>
                <label className="block text-[13px] text-gray-500 mb-1.5">Name</label>
                {isEditing ? (
                  <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full h-11 px-3 bg-[#f3f4f6] rounded border border-transparent focus:border-gray-300 focus:bg-white outline-none text-[14px]" />
                ) : (
                  <div className="text-[15px] font-medium text-[#1f2937]">{formData.name || '-'}</div>
                )}
              </div>
              
              {/* MRN */}
              <div>
                <label className="block text-[13px] text-gray-500 mb-1.5">MRN</label>
                {isEditing ? (
                  <input type="text" name="mrn" value={formData.mrn} onChange={handleChange} placeholder="Enter" className="w-full h-11 px-3 bg-[#f3f4f6] rounded border border-transparent focus:border-gray-300 focus:bg-white outline-none text-[14px]" />
                ) : (
                  <div className="text-[15px] text-[#4b5563]">{formData.mrn || '-'}</div>
                )}
              </div>

              {/* DOB */}
              <div>
                <label className="block text-[13px] text-gray-500 mb-1.5">DOB{isEditing && <span className="text-red-500">*</span>}</label>
                {isEditing ? (
                  <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full h-11 px-3 bg-[#f3f4f6] rounded border border-transparent focus:border-gray-300 focus:bg-white outline-none text-[14px]" />
                ) : (
                  <div className="text-[15px] text-[#4b5563]">{formData.dob || '-'}</div>
                )}
              </div>

              {/* Gender */}
              <div>
                <label className="block text-[13px] text-gray-500 mb-1.5">Gender</label>
                {isEditing ? (
                  <div className="flex items-center gap-4 h-11">
                    {['Male', 'Female', 'Others'].map(g => (
                      <label key={g} className="flex items-center gap-1.5 cursor-pointer">
                        <input type="radio" name="gender" value={g} checked={formData.gender === g} onChange={handleChange} className="w-4 h-4 text-gray-400 focus:ring-0" />
                        <span className="text-[14px] text-gray-400">{g}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <div className="text-[15px] text-[#4b5563]">{formData.gender || '-'}</div>
                )}
              </div>

              {/* Contact Number */}
              <div>
                <label className="block text-[13px] text-gray-500 mb-1.5">Contact Number{isEditing && <span className="text-red-500">*</span>}</label>
                {isEditing ? (
                  <div className="flex items-center w-full h-11 bg-[#f3f4f6] rounded px-3 overflow-hidden">
                    <span className="text-gray-500 text-[14px] mr-2">91</span>
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="flex-1 bg-transparent outline-none text-[14px]" />
                    <button className="text-[#10b981] text-[12px] font-semibold tracking-wide">CHANGE</button>
                  </div>
                ) : (
                  <div className="text-[15px] text-[#4b5563]">{formData.phone ? `91 ${formData.phone}` : '-'}</div>
                )}
              </div>

              {/* Email ID */}
              <div>
                <label className="block text-[13px] text-gray-500 mb-1.5">Email ID{isEditing && <span className="text-red-500">*</span>}</label>
                {isEditing ? (
                   <div className="flex items-center w-full h-11 bg-[#f3f4f6] rounded px-3 overflow-hidden">
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="flex-1 bg-transparent outline-none text-[14px]" />
                    <button className="text-[#10b981] text-[12px] font-semibold tracking-wide">CHANGE</button>
                 </div>
                ) : (
                  <div className="text-[15px] text-[#4b5563]">{formData.email || '-'}</div>
                )}
              </div>

            </div>
          </div>
        </div>

        {/* Address Details */}
        <div>
          <h4 className="text-[15px] font-bold text-[#1f2937] mb-6 relative">
            Address Details
            <div className="absolute left-[130px] top-1/2 -translate-y-1/2 w-full h-[1px] bg-gray-100 z-0"></div>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-6 bg-white relative z-10">
            
            {/* Row 1 */}
            <div>
              <label className="block text-[13px] text-gray-500 mb-1.5">House No, Building/Appartment</label>
              {isEditing ? (
                <input type="text" name="address.houseNo" value={formData.address.houseNo} onChange={handleChange} placeholder="Enter" className="w-full h-11 px-3 bg-[#f3f4f6] rounded border border-transparent focus:border-gray-300 focus:bg-white outline-none text-[14px]" />
              ) : (
                <div className="text-[15px] text-[#4b5563]">{formData.address.houseNo || '-'}</div>
              )}
            </div>

            <div>
              <label className="block text-[13px] text-gray-500 mb-1.5">Street</label>
              {isEditing ? (
                <input type="text" name="address.street" value={formData.address.street} onChange={handleChange} placeholder="Enter" className="w-full h-11 px-3 bg-[#f3f4f6] rounded border border-transparent focus:border-gray-300 focus:bg-white outline-none text-[14px]" />
              ) : (
                <div className="text-[15px] text-[#4b5563]">{formData.address.street || '-'}</div>
              )}
            </div>

            <div>
              <label className="block text-[13px] text-gray-500 mb-1.5">Locality</label>
              {isEditing ? (
                <input type="text" name="address.locality" value={formData.address.locality} onChange={handleChange} placeholder="Enter" className="w-full h-11 px-3 bg-[#f3f4f6] rounded border border-transparent focus:border-gray-300 focus:bg-white outline-none text-[14px]" />
              ) : (
                <div className="text-[15px] text-[#4b5563]">{formData.address.locality || '-'}</div>
              )}
            </div>

            <div>
              <label className="block text-[13px] text-gray-500 mb-1.5">PinCode{isEditing && <span className="text-red-500">*</span>}</label>
              {isEditing ? (
                <input type="text" name="address.pinCode" value={formData.address.pinCode} onChange={handleChange} placeholder="Enter" className="w-full h-11 px-3 bg-[#f3f4f6] rounded border border-transparent focus:border-gray-300 focus:bg-white outline-none text-[14px]" />
              ) : (
                <div className="text-[15px] text-[#4b5563]">{formData.address.pinCode || '-'}</div>
              )}
            </div>

            {/* Row 2 */}
            <div>
              <label className="block text-[13px] text-gray-500 mb-1.5">City</label>
              {isEditing ? (
                <input type="text" name="address.city" value={formData.address.city} onChange={handleChange} placeholder="Enter" className="w-full h-11 px-3 bg-[#f3f4f6] rounded border border-transparent focus:border-gray-300 focus:bg-white outline-none text-[14px]" />
              ) : (
                <div className="text-[15px] text-[#4b5563]">{formData.address.city || '-'}</div>
              )}
            </div>

            <div>
              <label className="block text-[13px] text-gray-500 mb-1.5">District</label>
              {isEditing ? (
                <input type="text" name="address.district" value={formData.address.district} onChange={handleChange} placeholder="Enter" className="w-full h-11 px-3 bg-[#f3f4f6] rounded border border-transparent focus:border-gray-300 focus:bg-white outline-none text-[14px]" />
              ) : (
                <div className="text-[15px] text-[#4b5563]">{formData.address.district || '-'}</div>
              )}
            </div>

            <div>
              <label className="block text-[13px] text-gray-500 mb-1.5">State</label>
              {isEditing ? (
                <input type="text" name="address.state" value={formData.address.state} onChange={handleChange} placeholder="Enter" className="w-full h-11 px-3 bg-[#f3f4f6] rounded border border-transparent focus:border-gray-300 focus:bg-white outline-none text-[14px]" />
              ) : (
                <div className="text-[15px] text-[#4b5563]">{formData.address.state || '-'}</div>
              )}
            </div>

            <div>
              <label className="block text-[13px] text-gray-500 mb-1.5">Country</label>
              {isEditing ? (
                <input type="text" name="address.country" value={formData.address.country} onChange={handleChange} placeholder="Enter" className="w-full h-11 px-3 bg-[#f3f4f6] rounded border border-transparent focus:border-gray-300 focus:bg-white outline-none text-[14px]" />
              ) : (
                <div className="text-[15px] text-[#4b5563]">{formData.address.country || '-'}</div>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default UserProfile;
