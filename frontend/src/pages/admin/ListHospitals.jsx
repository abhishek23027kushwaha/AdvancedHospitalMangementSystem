import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axiosInstance from '../../utils/axiosInstance';
import { Building2, Edit, Trash2, MapPin, Phone } from 'lucide-react';

const ListHospitals = () => {
  const navigate = useNavigate();
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    try {
      const { data } = await axiosInstance.get('/hospitals');
      if (data.success) {
        setHospitals(data.hospitals);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch hospitals');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this hospital?')) return;
    
    try {
      const { data } = await axiosInstance.delete(`/hospitals/${id}`);
      if (data.success) {
        toast.success(data.message);
        fetchHospitals(); // Refresh list
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete hospital');
    }
  };

  if (loading) {
    return <div className="p-6 text-center text-gray-500">Loading hospitals...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Building2 className="text-blue-600" size={24} />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Hospitals Management</h1>
        </div>
        <button
          onClick={() => navigate('/admin/add-hospital')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          + Add Hospital
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Hospital Name</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">City</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Address</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Contact</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {hospitals.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    No hospitals found. Click "Add Hospital" to create one.
                  </td>
                </tr>
              ) : (
                hospitals.map((hospital) => (
                  <tr key={hospital._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden flex-shrink-0">
                          {hospital.image ? (
                            <img src={hospital.image} alt={hospital.name} className="w-full h-full object-cover" />
                          ) : (
                            <Building2 className="text-gray-400" size={20} />
                          )}
                        </div>
                        <div className="font-semibold text-gray-800">{hospital.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin size={16} className="text-gray-400" />
                        {hospital.city}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600 truncate max-w-xs" title={hospital.address}>
                        {hospital.address}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone size={16} className="text-gray-400" />
                        {hospital.contactNumber || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-3">
                        {/* Edit functionality not implemented yet, but keeping icon ready */}
                        <button 
                          className="text-gray-400 hover:text-blue-600 transition-colors"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(hospital._id)}
                          className="text-gray-400 hover:text-red-600 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListHospitals;
