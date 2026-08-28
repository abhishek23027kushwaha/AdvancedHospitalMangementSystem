import React, { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';

const specialtiesData = [
  "Adult Cardiology", "Adult Critical Care Medicine", "Adult Haemato-Oncology And Bmt", "Anesthesiology", "Audiology",
  "Blood Bank", "Breast Oncology & Oncoplastic Surgery",
  "Cancer Care", "Cardiac Sciences", "Cardiac Surgery - Adult", "Cardiology", "Cardiology - Paediatric", "Child & Adolescent Psychiatry", "Clinical Genetics", "Clinical Hematology", "Clinical Immunology & Rheumatology", "Clinical Nutrition & Dietetics", "Clinical Psychology", "Congenital Adult Heart Disease", "Cosmetology", "Cranio-Maxillo Facial Surgery", "Critical Care Medicine",
  "Dental", "Dermatology", "Developmental / Behavioural Paediatrics", "Diabetology",
  "E.N.T", "Electrophysiology", "Emergency Medicine", "Endocrinology, Diabetes & Metabolic Medicine",
  "Family Medicine",
  "Gastro Sciences", "Gastrointestinal Oncology", "General & Gi Surgery", "General Administration", "General Medicine", "General Surgery", "Geriatric Medicine", "Gynaecologic Oncology", "Gynaecology",
  "Haemato-Oncology", "Haematology", "Head And Neck Oncology", "Headache & Facial Pain", "Hepatology & Liver Transplant Hepatology",
  "Imaging & Nuclear Medicine", "Infectious Diseases", "Interventional & Endovascular Radiology", "Interventional Neurology", "Interventional Pulmonology", "Interventional Radiology",
  "Laboratory Medicine", "Liver Transplant", "Liver Transplantation And Hepatobiliary Surgery",
  "Medical Administration", "Medical Gastroenterology", "Medical Oncology", "Medical Oncology & Hemato-Oncology", "Minimal Access Gi And Bariatric Surgery", "Musculoskeletal Oncology",
  "Neonatology", "Nephrology", "Neuro Otology", "Neuro Rehabilitation", "Neuro Sciences", "Neurology", "Neurosurgery", "Neurosurgery & Spine Surgery", "Nuclear Medicine", "Nursing",
  "Obstetrics & Gynaecology", "Ophthalmology", "Oral Oncology & Maxillofacial Surgery", "Orthopaedic Surgery", "Orthopaedics", "Orthopaedics & Joint Replacement",
  "Paediatric And Congenital Heart Surgery", "Paediatric Cardiology", "Paediatric Clinical Immunology & Rheumatology",
  "Paediatric Gastroenterology", "Paediatric Haematology Oncology", "Paediatric Medicine", "Paediatric Medicine-Paediatric Critical Care",
  "Paediatric Nephrology", "Paediatric Neurology", "Paediatric Neurophysiology", "Paediatric Neurosurgery", "Paediatric Oncology",
  "Paediatric Oncology, Haemato-Oncology & Bmt", "Paediatric Ophthalmology", "Paediatric Orthodontics", "Paediatric Orthopaedics",
  "Paediatric Pulmonology", "Paediatric Rheumatology", "Paediatric Spine Surgery", "Paediatric Surgery", "Pain & Palliation - Oncology",
  "Pain Management & Palliative Care", "Paramedical", "Pathology", "Perinatology & Fetal Intervention", "Physical Medicine & Rehabilitation",
  "Physiotherapy & Physical Rehabilitation", "Plastic Surgery", "Preventive Oncology", "Psychiatry", "Psychiatry & Psycho-Oncology",
  "Psycho Oncology", "Pulmonology",
  "Radiation Oncology", "Radiology", "Renal Sciences", "Reproductive Medicine", "Rheumatology",
  "Speech And Swallow Rehabilitation", "Spine Surgery", "Surgical Gastroenterology", "Surgical Oncology",
  "Thoracic And Vascular Surgery", "Thoracic Surgery", "Transfusion Medicine (Blood Bank)",
  "Uro Oncology", "Urology",
  "Vascular & Endovascular Surgery",
  "Yoga"
];

const AllSpecialtiesModal = ({ onClose, onApply }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState([]);

  // Group specialties by first letter
  const groupedSpecialties = useMemo(() => {
    const filtered = specialtiesData.filter(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const groups = {};
    filtered.forEach(s => {
      const letter = s.charAt(0).toUpperCase();
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(s);
    });
    return groups;
  }, [searchTerm]);

  const toggleSelection = (spec) => {
    setSelected(prev => 
      prev.includes(spec) 
        ? prev.filter(item => item !== spec)
        : [...prev, spec]
    );
  };

  const handleApply = () => {
    onApply(selected);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm font-helveticaNeue p-4">
      
      <div className="relative w-full max-w-[950px] h-[85vh] mt-8">
        
        {/* External Close Button */}
        <button 
          onClick={onClose} 
          className="absolute -top-[45px] right-0 text-white hover:text-gray-200 transition-colors"
        >
          <X size={32} strokeWidth={1.5} />
        </button>

        <div className="bg-white rounded-xl shadow-2xl w-full h-full flex flex-col relative overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between shrink-0">
          <h2 className="text-[32px] font-bold text-black">Specialities</h2>
          
          <div className="relative w-[300px] md:w-[400px]">
            <input 
              type="text" 
              placeholder="Search for Specialities" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-3 pl-4 pr-10 text-[14px] focus:outline-none focus:border-blue-500 placeholder-gray-500"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          </div>
        </div>

        {/* Content (Scrollable Dictionary List) */}
        <div className="flex-1 overflow-y-auto p-6 px-8">
          
          {Object.keys(groupedSpecialties).sort().map(letter => (
            <div key={letter} className="flex border-b border-gray-100 py-6 last:border-0">
              {/* Letter Heading */}
              <div className="w-[80px] shrink-0">
                <span className="text-[36px] font-bold text-[#004f9e]">{letter}</span>
              </div>
              
              {/* Grid of specialties */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-4">
                {groupedSpecialties[letter].sort().map(spec => (
                  <label key={spec} className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center mt-[2px] shrink-0">
                      <input 
                        type="checkbox" 
                        checked={selected.includes(spec)}
                        onChange={() => toggleSelection(spec)}
                        className="appearance-none w-5 h-5 border border-gray-300 rounded-sm checked:bg-[#004f9e] checked:border-[#004f9e] transition-colors"
                      />
                      {selected.includes(spec) && (
                        <svg className="absolute w-3.5 h-3.5 text-white pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      )}
                    </div>
                    <span className="text-[15px] text-black leading-tight mt-1 group-hover:text-[#004f9e] transition-colors">
                      {spec}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          {Object.keys(groupedSpecialties).length === 0 && (
            <div className="py-20 text-center text-gray-500 text-lg">
              No specialities found matching "{searchTerm}"
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-5 border-t border-gray-100 flex justify-end shrink-0 bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
          <button 
            onClick={handleApply}
            className="px-8 py-3 bg-[#004f9e] hover:bg-[#003d7a] text-white rounded-md font-medium text-[15px] transition-colors shadow-sm"
          >
            Apply Filter(s)
          </button>
        </div>

      </div>

      </div>
    </div>
  );
};

export default AllSpecialtiesModal;
