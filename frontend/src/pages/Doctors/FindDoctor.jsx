import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SpecialtyCarousel from './SpecialtyCarousel';
import SearchFilterBar from './SearchFilterBar';
import DoctorList from './DoctorList';
import SelectPatientModal from './SelectPatientModal';
import AddPatientModal from './AddPatientModal';
import AllSpecialtiesModal from './AllSpecialtiesModal';
import axiosInstance from '../../utils/axiosInstance';

const FindDoctor = () => {
  const navigate = useNavigate();
  const [modalState, setModalState] = useState({
    type: 'NONE', // 'NONE' | 'SELECT_PATIENT' | 'ADD_PATIENT' | 'ALL_SPECIALTIES'
    selectedDoctor: null
  });
  
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axiosInstance.get('/doctor/all');
        if (response.data.success) {
          setDoctors(response.data.doctors);
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const handleBookAppointment = (doctor) => {
    setModalState({ type: 'SELECT_PATIENT', selectedDoctor: doctor });
  };

  const handleAddNewPatient = () => {
    setModalState(prev => ({ ...prev, type: 'ADD_PATIENT' }));
  };

  const handleSeeMoreSpecialties = () => {
    setModalState({ type: 'ALL_SPECIALTIES', selectedDoctor: null });
  };

  const handlePatientSelected = (patient) => {
    if (modalState.selectedDoctor) {
      navigate(`/book-appointment/${modalState.selectedDoctor._id}`, { state: { patient } });
    }
  };

  const handlePatientAdded = (patientData) => {
    // Mock adding patient and returning to select
    setModalState(prev => ({ ...prev, type: 'SELECT_PATIENT' }));
  };

  const closeModal = () => {
    setModalState({ type: 'NONE', selectedDoctor: null });
  };
  return (
    <div className="flex flex-col bg-[#f8f9fa] w-full font-helveticaNeue min-h-screen">
      <div className="flex-1 w-full ">
        
        <SpecialtyCarousel onSeeMoreClick={handleSeeMoreSpecialties} />
        
        <SearchFilterBar />
        
        {loading ? (
          <div className="flex justify-center items-center py-20 text-gray-500">
            Loading doctors...
          </div>
        ) : (
          <DoctorList doctors={doctors} onBookAppointment={handleBookAppointment} />
        )}

      </div>

      {modalState.type === 'SELECT_PATIENT' && (
        <SelectPatientModal 
          onClose={closeModal}
          onAddNewPatient={handleAddNewPatient}
          onContinue={handlePatientSelected}
        />
      )}

      {modalState.type === 'ADD_PATIENT' && (
        <AddPatientModal 
          onClose={() => setModalState({ type: 'NONE', selectedDoctor: null })}
          onPatientAdded={handlePatientSelected}
        />
      )}

      {modalState.type === 'ALL_SPECIALTIES' && (
        <AllSpecialtiesModal 
          onClose={() => setModalState({ type: 'NONE', selectedDoctor: null })}
          onApply={(selectedSpecs) => {
            console.log('Selected Specialties:', selectedSpecs);
            // We can later pass these to a filter context or state
          }}
        />
      )}
    </div>
  );
};

export default FindDoctor;
