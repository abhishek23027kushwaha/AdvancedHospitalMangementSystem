import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const footerLinks = [
    {
      title: "Practo",
      links: ["About", "Blog", "Careers", "Press", "Contact Us"]
    },
    {
      title: "For patients",
      links: [
        "Search for doctors", "Search for clinics", "Search for hospitals", 
        "Surgery Costs", "Book Diagnostic Tests", "Practo Plus", 
        "Read health articles", "Read about medicines", "Practo drive", 
        "Health app"
      ]
    },
    {
      title: "For doctors",
      links: ["Practo Profile"],
      extraSection: {
        title: "For clinics",
        links: ["Ray by Practo", "Practo Reach", "Ray Tab", "Practo Pro"]
      }
    },
    {
      title: "For hospitals",
      links: ["Insta by Practo", "Qikwell by Practo", "Practo Profile", "Practo Reach", "Practo Drive"],
      extraSection: {
        title: "For Corporates",
        links: ["Wellness Plans"]
      }
    },
    {
      title: "More",
      links: [
        "Help", "Developers", "Privacy Policy", "Terms & Conditions", 
        "PCS T&C", "Healthcare Directory", "Practo Health Wiki"
      ]
    },
    {
      title: "Social",
      links: ["Facebook", "Twitter", "LinkedIn", "Youtube", "Github"]
    }
  ];

  return (
    <footer className="w-full bg-[#28328c] text-white pt-10 pb-8 font-['Lato',Helvetica,Arial,sans-serif]">
      <div className="max-w-[1200px] mx-auto px-4">
        
        {/* Columns Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-10">
          {footerLinks.map((section, idx) => (
            <div key={idx} className="flex flex-col">
              <h3 className="text-[14px] font-bold mb-3">{section.title}</h3>
              <ul className="flex flex-col gap-1.5">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <Link to="#" className="text-[13px] text-[#ffffff] hover:text-[#00B8E6] transition-colors no-underline">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Extra sub-sections in the same column */}
              {section.extraSection && (
                <div className="mt-6">
                  <h3 className="text-[14px] font-bold mb-3">{section.extraSection.title}</h3>
                  <ul className="flex flex-col gap-1.5">
                    {section.extraSection.links.map((link, i) => (
                      <li key={i}>
                        <Link to="#" className="text-[13px] text-[#ffffff] hover:text-[#00B8E6] transition-colors no-underline">
                          {link}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Logo & Copyright */}
        <div className="flex flex-col items-center justify-center pt-6">
          <div className="flex items-center gap-1 mb-4">
            <div className="w-2 h-2 rounded-full bg-[#00B8E6]"></div>
            <span className="text-[32px] font-bold tracking-tight px-1">practo</span>
            <div className="w-2 h-2 rounded-full bg-[#00B8E6]"></div>
          </div>
          <p className="text-[13px] text-white/90">
            Copyright © 2017, Practo. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
