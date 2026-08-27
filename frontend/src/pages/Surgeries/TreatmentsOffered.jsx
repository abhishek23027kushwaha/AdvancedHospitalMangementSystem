import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Activity } from 'lucide-react';

const treatmentsData = [
  {
    category: "Popular",
    items: [
      { id: 1, name: "Piles", icon: Activity },
      { id: 2, name: "Varicose Veins", icon: Activity },
      { id: 3, name: "Hernia", icon: Activity },
      { id: 4, name: "Lasik", icon: Activity },
      { id: 5, name: "Gallstone", icon: Activity },
      { id: 6, name: "Anal Fistula", icon: Activity },
      { id: 7, name: "Cataract", icon: Activity },
      { id: 8, name: "Kidney Stone", icon: Activity },
      { id: 9, name: "Circumcision", icon: Activity },
      { id: 10, name: "Anal Fissure", icon: Activity },
      { id: 11, name: "Lipoma Removal", icon: Activity },
      { id: 12, name: "Sebaceous Cyst", icon: Activity },
      { id: 13, name: "Pilonidal Sinus", icon: Activity },
      { id: 14, name: "Lump in Breast", icon: Activity },
      { id: 15, name: "TURP", icon: Activity },
      { id: 16, name: "Hydrocele", icon: Activity },
      { id: 17, name: "Knee Replacement", icon: Activity },
      { id: 18, name: "Hair Transplant", icon: Activity },
      { id: 19, name: "Gynaecomastia", icon: Activity }
    ]
  },
  {
    category: "General Surgery",
    items: [
      { id: 3, name: "Hernia", icon: Activity },
      { id: 20, name: "Appendicitis", icon: Activity },
      { id: 5, name: "Gallstone", icon: Activity },
      { id: 11, name: "Lipoma Removal", icon: Activity },
      { id: 12, name: "Sebaceous Cyst", icon: Activity },
      { id: 13, name: "Pilonidal Sinus", icon: Activity }
    ]
  },
  {
    category: "Proctology",
    items: [
      { id: 1, name: "Piles", icon: Activity },
      { id: 6, name: "Anal Fistula", icon: Activity },
      { id: 10, name: "Anal Fissure", icon: Activity },
      { id: 13, name: "Pilonidal Sinus", icon: Activity },
      { id: 21, name: "Perianal Abscess", icon: Activity }
    ]
  },
  {
    category: "Ophthalmology",
    items: [
      { id: 4, name: "Lasik", icon: Activity },
      { id: 7, name: "Cataract", icon: Activity }
    ]
  },
  {
    category: "Urology",
    items: [
      { id: 8, name: "Kidney Stone", icon: Activity },
      { id: 9, name: "Circumcision", icon: Activity },
      { id: 15, name: "TURP", icon: Activity },
      { id: 16, name: "Hydrocele", icon: Activity }
    ]
  },
  { category: "Cosmetic Surgery", items: [] },
  { category: "Orthopedics", items: [] },
  { category: "Robotic Surgeries", items: [] },
  { category: "Oncology", items: [] },
  { category: "Dental", items: [] }
];

const TreatmentsOffered = () => {
  const [openCategory, setOpenCategory] = useState("Popular");

  const toggleCategory = (category) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  return (
    <div className="w-full mt-8">
      <h2 className="text-[22px] md:text-[26px] font-bold text-[#1a1a1a] mb-4 px-1">
        Treatments Offered
      </h2>
      
      <div className="bg-white rounded-[24px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-4 md:p-6">
        <div className="flex flex-col">
          {treatmentsData.map((section, index) => {
            const isOpen = openCategory === section.category;
            
            return (
              <div key={index} className="border-b border-gray-100 last:border-b-0">
                {/* Accordion Header */}
                <button
                  onClick={() => toggleCategory(section.category)}
                  className="w-full py-4 px-2 flex items-center justify-between hover:bg-gray-50/50 transition-colors rounded-lg"
                >
                  <span className="text-[15px] md:text-[16px] font-bold text-[#414146]">
                    {section.category}
                  </span>
                  {isOpen ? (
                    <ChevronUp size={20} className="text-gray-500" />
                  ) : (
                    <ChevronDown size={20} className="text-gray-500" />
                  )}
                </button>

                {/* Accordion Body (Grid) */}
                {isOpen && section.items.length > 0 && (
                  <div className="px-2 pt-2 pb-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                      {section.items.map((item) => (
                        <div 
                          key={item.id} 
                          className="bg-[#f4f7fc] hover:bg-[#ebf0f9] transition-colors cursor-pointer rounded-xl p-4 flex flex-col items-center justify-center gap-3 aspect-[4/3]"
                        >
                          {/* Placeholder for actual image icon */}
                          <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                            <item.icon size={20} className="text-orange-500" />
                          </div>
                          <span className="text-[13px] md:text-[14px] font-bold text-[#1a1a1a] text-center leading-tight">
                            {item.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Empty State (if no items added yet) */}
                {isOpen && section.items.length === 0 && (
                  <div className="px-2 pt-2 pb-6">
                    <p className="text-[14px] text-gray-500 italic">No treatments listed yet.</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TreatmentsOffered;
