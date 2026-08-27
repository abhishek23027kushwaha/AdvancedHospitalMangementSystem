import React from 'react';

import consultationImg from '../../assets/consultation.png';
import pharmacyImg from '../../assets/pharmacy.png';
import labTestImg from '../../assets/lab-test.png';
import insuranceImg from '../../assets/insurance.png';
import ambulanceImg from '../../assets/ambulance.png';
import wellbeingImg from '../../assets/wellbeing.png';
import covidCareImg from '../../assets/covid-care.png';
import activitiesImg from '../../assets/activities.png';

const servicesData = [
  {
    title: "Easy Online consultations",
    description: "Over 25 specialities guided by best in class doctors for effective care around the clock.",
    imgSrc: consultationImg
  },
  {
    title: "Online Pharmacy",
    description: "COVID-19 essentials and self-test kits provided, along with access to a large inventory for medicines.",
    imgSrc: pharmacyImg
  },
  {
    title: "Lab Tests at Home",
    description: "Discounts upto 20% on NABL-accredited lab tests and at-home tests in multiple cities.",
    imgSrc: labTestImg
  },
  {
    title: "Group Health Insurance",
    description: "Over 500+ day care procedures covered with a variety of payment options, for employees and family members.",
    imgSrc: insuranceImg
  },
  {
    title: "SOS Ambulance Service",
    description: "24/7 round the clock Ambulatory services along with equipped medical staff.",
    imgSrc: ambulanceImg
  },
  {
    title: "Mental Wellbeing Solutions",
    description: "Specially focused Mental Wellness plans available with regular informative webinars and constant support.",
    imgSrc: wellbeingImg
  },
  {
    title: "Covid Care Packages",
    description: "Covid-19 specific online consultations, lab tests, medical equipment, SOS assistance, and home care services",
    imgSrc: covidCareImg
  },
  {
    title: "Engagement Activities & Gamification",
    description: "Webinars and other knowledge-building sessions, peer-group challenges, and other employee engagement activities",
    imgSrc: activitiesImg
  }
];

const OurServices = () => {
  return (
    <div className="w-full bg-white py-16 md:py-20">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <h2 className="text-[28px] md:text-[32px] font-bold text-[#1a1a1a] text-center mb-12">
          Our Services
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {servicesData.map((service, index) => (
            <div key={index} className="flex items-start gap-4 md:gap-6">
              
              {/* Image Container */}
              <div className="w-[70px] h-[70px] min-w-[70px] flex items-center justify-center">
                <img 
                  src={service.imgSrc} 
                  alt={service.title} 
                  className="max-w-full max-h-full object-contain" 
                />
              </div>
              
              {/* Text Content */}
              <div className="flex flex-col pt-2">
                <h3 className="text-[17px] font-bold text-[#1a1a1a] mb-1">
                  {service.title}
                </h3>
                <p className="text-[14px] text-[#414146] leading-relaxed">
                  {service.description}
                </p>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurServices;
