import React from 'react';
import { Link } from 'react-router-dom';

const Faq = () => {
  const faqs = [
    {
      question: "What is online doctor consultation?",
      answer: "Online doctor consultation or online medical consultation is a method ....",
      link: "#"
    },
    {
      question: "How do I start online consultation with doctors on Practo?",
      answer: "Starting an online doctor consultation is very simple on Practo. Follo....",
      link: "#"
    },
    {
      question: "Are your online doctors qualified?",
      answer: "We follow a strict verification process for every doctor providing onl....",
      link: "#"
    },
    {
      question: "Is online doctor consultation safe and secured on Practo?",
      answer: "The privacy of our patients is critical to us, and thus, we are compli....",
      link: "#"
    },
    {
      question: "What happens if I don't get a response from a doctor?",
      answer: "In the unlikely event that an online doctor does not respond, you will....",
      link: "#"
    },
    {
      question: "Can I do a free online doctor consultation on Practo?",
      answer: "Avail a free online consultation with top doctors in India during the ....",
      link: "#"
    }
  ];

  return (
    <div className="w-full bg-white py-16 border-b border-[#F0F0F5]">
      <div className="max-w-[1200px] mx-auto px-4">
        
        <h2 className="text-[26px] font-bold text-[#414146] mb-10 text-left">
          FAQs
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
          {faqs.map((faq, idx) => (
            <div key={idx} className="flex items-start gap-3">
              {/* Bullet Triangle */}
              <div className="mt-1 flex-shrink-0 text-[#414146] text-[10px]">
                &#9654;
              </div>
              
              {/* Content */}
              <div className="flex flex-col text-left">
                <h3 className="text-[15px] font-bold text-[#414146] mb-2">
                  {faq.question}
                </h3>
                <p className="text-[13px] text-[#787887] leading-relaxed">
                  {faq.answer}
                  <Link 
                    to={faq.link} 
                    className="text-[#787887] underline hover:text-[#00B8E6] transition-colors ml-1"
                  >
                    Read More
                  </Link>
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Faq;
