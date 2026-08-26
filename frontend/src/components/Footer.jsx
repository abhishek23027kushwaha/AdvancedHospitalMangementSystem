import React, { useState, useEffect } from 'react';
import axios from '../utils/axiosInstance';
import { Link } from 'react-router-dom';
import { 
  Phone, Mail, MapPin, ChevronRight,
  Facebook, Twitter, Instagram, Linkedin, Youtube,
  Hospital, ArrowUp, Send
} from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [contactInfo, setContactInfo] = useState({
    email: 'hexagonsservices@gmail.com',
    emergencyNumber: '+91 8299431275',
    address: 'Lucknow, India'
  });

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const { data } = await axios.get('/contacts');
        if (data.success && data.contact) {
          setContactInfo({
            email: data.contact.email || 'hexagonsservices@gmail.com',
            emergencyNumber: data.contact.emergencyNumber || '+91 8299431275',
            address: data.contact.address || 'Lucknow, India'
          });
        }
      } catch (err) {
        console.error("Failed to load contacts for footer");
      }
    };
    fetchContacts();
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const quickLinks = [
    { label: 'Home', to: '/' },
    { label: 'Doctors', to: '/doctors' },
    { label: 'Services', to: '/services' },
    { label: 'Contact', to: '/contact' },
    { label: 'Appointments', to: '/appointments' },
  ];

  const services = [
    'Blood Pressure Check',
    'Blood Sugar Test',
    'Full Blood Count',
    'X-Ray Scan',
    'Blood Sugar Test',
  ];

  const socials = [
    { icon: Facebook, label: 'Facebook', href: '#' },
    { icon: Twitter, label: 'Twitter', href: '#' },
    { icon: Instagram, label: 'Instagram', href: '#' },
    { icon: Linkedin, label: 'LinkedIn', href: '#' },
    { icon: Youtube, label: 'YouTube', href: '#' },
  ];

  return (
    <footer className="relative bg-[#0F172A] overflow-hidden">
      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className="absolute top-6 right-6 w-10 h-10 bg-[#1E293B] border border-[#334155] rounded-xl flex items-center justify-center text-[#CBD5E1] hover:text-[#2563EB] hover:border-[#2563EB] transition-all z-20"
      >
        <ArrowUp size={18} />
      </button>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">

          {/* Column 1 – Brand + Contact */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#1E293B] border border-[#334155] flex items-center justify-center">
                <Hospital size={24} className="text-[#2563EB]" />
              </div>
              <div>
                <p className="text-[#FFFFFF] text-2xl font-bold leading-none tracking-tight">MediCare</p>
                <p className="text-[#60A5FA] text-xs font-bold uppercase tracking-[0.05em] mt-1.5">Healthcare Solutions</p>
              </div>
            </div>

            <p className="text-[#94A3B8] text-[15px] leading-relaxed font-medium max-w-[280px]">
              Your trusted partner in healthcare innovation. We&apos;re committed to providing exceptional medical care with cutting-edge technology and compassionate service.
            </p>

            {/* Contact Details */}
            <div className="space-y-4 pt-4">
              {[
                { icon: Phone, text: contactInfo.emergencyNumber },
                { icon: Mail, text: contactInfo.email },
                { icon: MapPin, text: contactInfo.address },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-[#1E293B] border border-[#334155] flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110">
                    <Icon size={17} className="text-[#2563EB]" />
                  </div>
                  <span className="text-[#CBD5E1] text-[15px] font-semibold group-hover:text-[#60A5FA] transition-colors">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2 – Quick Links */}
          <div className="lg:pl-8">
            <h4 className="text-[#FFFFFF] text-xl font-bold mb-10 tracking-tight">Quick Links</h4>
            <ul className="space-y-5">
              {quickLinks.map(({ label, to }, i) => (
                <li key={i}>
                  <Link
                    to={to}
                    className="flex items-center gap-4 text-[#CBD5E1] hover:text-[#60A5FA] transition-all group no-underline"
                  >
                    <div className="w-7 h-7 rounded-full bg-[#1E293B] border border-[#334155] flex items-center justify-center flex-shrink-0 transition-all group-hover:bg-[#2563EB] group-hover:border-[#2563EB]">
                      <ChevronRight size={14} className="text-[#CBD5E1] group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-[15px] font-semibold">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 – Our Services */}
          <div>
            <h4 className="text-[#FFFFFF] text-xl font-bold mb-10 tracking-tight">Our Services</h4>
            <ul className="space-y-5">
              {services.map((service, i) => (
                <li key={i} className="flex items-center gap-4 group">
                  <div className="w-2.5 h-2.5 bg-[#2563EB] rounded-full flex-shrink-0 group-hover:scale-125 transition-transform" />
                  <span className="text-[#CBD5E1] text-[15px] font-semibold hover:text-[#60A5FA] cursor-pointer transition-colors leading-tight">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 – Stay Connected */}
          <div>
            <h4 className="text-[#FFFFFF] text-xl font-bold mb-5 tracking-tight">Stay Connected</h4>
            <p className="text-[#94A3B8] text-[15px] mb-10 leading-relaxed font-medium">
              Subscribe for health tips, medical updates, and wellness insights delivered to your inbox.
            </p>

            {/* Pill-shaped Email input */}
            <div className="flex items-center bg-[#1E293B] rounded-full p-2 border border-[#334155] mb-10">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 bg-transparent outline-none text-[14px] text-[#CBD5E1] placeholder-[#64748B] pl-5 font-medium"
              />
              <button className="bg-[#2563EB] text-white text-[13px] font-bold px-7 py-3 rounded-full flex items-center gap-2 hover:bg-[#1D4ED8] transition-all shadow-md shadow-blue-500/20 active:scale-95 border-0">
                <Send size={15} />
                Subscribe
              </button>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4 flex-wrap">
              {socials.map(({ icon: Icon, label, href }, i) => (
                <a
                  key={i}
                  href={href}
                  aria-label={label}
                  className="w-11 h-11 bg-[#1E293B] border border-[#334155] rounded-2xl flex items-center justify-center text-[#CBD5E1] hover:bg-[#2563EB] hover:text-white hover:border-[#2563EB] transition-all group"
                >
                  <Icon size={20} className="group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#334155]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#64748B] text-sm font-medium">
            © {new Date().getFullYear()} MediCare. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-[#64748B] text-sm font-medium hover:text-[#60A5FA] transition-colors no-underline">Privacy Policy</a>
            <a href="#" className="text-[#64748B] text-sm font-medium hover:text-[#60A5FA] transition-colors no-underline">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
