import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqsData = [
  {
    question: "What is the Employee Health Benefits program?",
    answer: "Our Employee Health Benefits program is a comprehensive 360° holistic healthcare plan designed specifically for corporates. It includes unlimited online doctor consultations, at-home lab tests, pharmacy deliveries, and mental wellness solutions for your employees."
  },
  {
    question: "How can my company enroll in this program?",
    answer: "Enrolling is simple. You can schedule a demo by filling out the form at the top of this page. Our corporate team will get in touch with you to understand your requirements and customize a health plan for your organization."
  },
  {
    question: "Is the Group Health Insurance customizable?",
    answer: "Yes, our Group Health Insurance plans are highly customizable. We offer coverage for over 500+ day care procedures, various payment options, and extensions for family members based on your company's budget and policies."
  },
  {
    question: "How do employees access these benefits?",
    answer: "Once enrolled, employees will receive access to a dedicated portal and mobile application. They can easily book consultations, order medicines, or schedule lab tests using their corporate credentials."
  },
  {
    question: "Are mental wellness solutions included?",
    answer: "Absolutely. We understand the importance of mental health in the workplace. Our plans include access to certified therapists, regular informative webinars, and peer-group engagement activities."
  }
];

const CorporateFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id="faqs" className="w-full bg-[#f8f9fa] py-16 md:py-24">
      <div className="max-w-[900px] mx-auto px-4 md:px-8">
        
        <h2 className="text-[28px] md:text-[32px] font-bold text-[#1a1a1a] text-center mb-12">
          Frequently Asked Questions
        </h2>

        <div className="flex flex-col gap-4">
          {faqsData.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between px-6 py-5 text-left focus:outline-none"
              >
                <span className="text-[16px] md:text-[18px] font-semibold text-[#1a1a1a]">
                  {faq.question}
                </span>
                <ChevronDown 
                  size={24} 
                  className={`text-gray-400 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : 'rotate-0'}`} 
                />
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
                } overflow-hidden`}
              >
                <div className="px-6 pb-6 pt-2 text-[15px] text-[#414146] leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default CorporateFAQ;
