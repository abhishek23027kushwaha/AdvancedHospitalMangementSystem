import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../utils/axiosInstance';
import { 
  HeartPulse, Activity, Bone, Pill, Heart, Sparkles, 
  Eye, Brain, Syringe, PlusCircle, ArrowRight
} from 'lucide-react';

const Typewriter = () => {
  const text1 = "Healthcare for Your ";
  const text2 = "Family's Health";
  const [display1, setDisplay1] = useState("");
  const [display2, setDisplay2] = useState("");
  const [isTyping1, setIsTyping1] = useState(true);

  useEffect(() => {
    let timeout;
    if (isTyping1) {
      if (display1.length < text1.length) {
        timeout = setTimeout(() => {
          setDisplay1(text1.slice(0, display1.length + 1));
        }, 80);
      } else {
        timeout = setTimeout(() => setIsTyping1(false), 200);
      }
    } else {
      if (display2.length < text2.length) {
        timeout = setTimeout(() => {
          setDisplay2(text2.slice(0, display2.length + 1));
        }, 80);
      } else {
        timeout = setTimeout(() => {
          setDisplay1("");
          setDisplay2("");
          setIsTyping1(true);
        }, 4000);
      }
    }
    return () => clearTimeout(timeout);
  }, [display1, display2, isTyping1]);

  return (
    <h1 className="text-4xl md:text-5xl font-black leading-tight mb-6 min-h-[100px] md:min-h-[120px] flex flex-col items-center justify-center">
      <span className="text-[#0F172A]">{display1}</span>
      <span className="text-[#2563EB]">
        {display2}
        <span className="animate-pulse font-light ml-1">|</span>
      </span>
    </h1>
  );
};

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    try {
      const { data } = await axios.get('/services');
      if (data.success) {
        setServices(data.services);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      
      {/* ── TOP SECTION (Matching Image 1) ────────────────────────── */}
      <section className="relative py-24 px-6 overflow-hidden">
        {/* Background Dot Pattern (Right) */}
        <div className="absolute right-0 top-1/3 -translate-y-1/2 opacity-20 pointer-events-none hidden md:block">
          <div className="grid grid-cols-6 gap-3">
            {[...Array(48)].map((_, i) => (
              <div key={i} className="w-2.5 h-2.5 bg-[#2563EB] rounded-full" />
            ))}
          </div>
        </div>
        
        {/* Background Decorative Shape (Left) */}
        <div className="absolute left-0 bottom-0 w-64 h-64 bg-[#EFF6FF] rounded-tr-[100px] -z-10 hidden md:block" />

        <div className="max-w-3xl mx-auto text-center mb-20 relative z-10">
          <p className="text-[13px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-4">Our Services</p>
          <Typewriter />
          <p className="text-[#64748B] text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Experience world-class healthcare with our comprehensive range of specialized medical services. 
            Our expert team is dedicated to providing personalized, compassionate care using the latest technology 
            to ensure the best outcomes for you and your family.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 px-4 md:px-0">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl p-8 border border-[#E2E8F0] shadow-sm hover:shadow-xl hover:border-[#BFDBFE] transition-all relative pt-14 group flex flex-col h-full">
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-[#F8FAFC] border-8 border-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
              <HeartPulse className="text-[#38BDF8]" size={32} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold text-[#0F172A] text-center mb-4">Cardiology</h3>
            <p className="text-[#64748B] text-[15px] text-center leading-relaxed mb-8 flex-grow">
              Comprehensive care for your heart health. Our cardiology department offers advanced diagnostics, treatment, and preventive care for all cardiovascular conditions.
            </p>
            <a 
              href="https://jamanetwork.com/journals/jamacardiology/newonline"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 border border-[#BFDBFE] text-[#2563EB] rounded-xl font-bold text-[15px] hover:bg-[#EFF6FF] transition-colors block text-center mt-auto"
            >
              Learn More
            </a>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl p-8 border border-[#E2E8F0] shadow-sm hover:shadow-xl hover:border-[#BFDBFE] transition-all relative pt-14 group flex flex-col h-full">
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-[#F8FAFC] border-8 border-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
              <Activity className="text-[#38BDF8]" size={32} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold text-[#0F172A] text-center mb-4">Gastroenterologist</h3>
            <p className="text-[#64748B] text-[15px] text-center leading-relaxed mb-8 flex-grow">
              Expert care for your digestive system. We provide specialized treatment for gastrointestinal diseases, liver disorders, and nutritional health.
            </p>
            <a 
              href="https://my.clevelandclinic.org/health/articles/24198-gastroenterologist"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 border border-[#BFDBFE] text-[#2563EB] rounded-xl font-bold text-[15px] hover:bg-[#EFF6FF] transition-colors block text-center mt-auto"
            >
              Learn More
            </a>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl p-8 border border-[#E2E8F0] shadow-sm hover:shadow-xl hover:border-[#BFDBFE] transition-all relative pt-14 group flex flex-col h-full">
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-[#F8FAFC] border-8 border-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
              <Bone className="text-[#38BDF8]" size={32} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold text-[#0F172A] text-center mb-4">Orthopaedic</h3>
            <p className="text-[#64748B] text-[15px] text-center leading-relaxed mb-8 flex-grow">
              Advanced care for your bones and joints. Our specialists treat fractures, arthritis, sports injuries, and complex musculoskeletal conditions.
            </p>
            <a 
              href="https://www.orthojournal.org/all-articles"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 border border-[#BFDBFE] text-[#2563EB] rounded-xl font-bold text-[15px] hover:bg-[#EFF6FF] transition-colors block text-center mt-auto"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Carousel Dots */}
        <div className="flex items-center justify-center gap-2 mt-12">
          <div className="w-2.5 h-2.5 rounded-full bg-[#2563EB]"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#DBEAFE]"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#DBEAFE]"></div>
        </div>
      </section>

      {/* ── DYNAMIC SERVICES SECTION ─────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#F8FAFC]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-[#0F172A]">Available Services</h2>
            <p className="text-[#64748B] mt-2">Book any of our specialized medical services online.</p>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#2563EB] border-t-transparent"></div>
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-12 text-[#64748B]">No services available at the moment.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((svc) => (
                <div key={svc._id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-[#E2E8F0] flex flex-col">
                  <div className="relative h-48 bg-[#EFF6FF] overflow-hidden">
                    <span className={`absolute top-3 left-3 z-10 ${svc.available ? 'bg-[#16A34A]' : 'bg-[#E11D48]'} text-white text-[10px] font-bold px-2.5 py-1 rounded-full`}>
                      {svc.available ? 'Available' : 'Unavailable'}
                    </span>
                    {svc.image ? (
                      <img src={svc.image} alt={svc.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#2563EB]">
                        <Activity size={40} />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col flex-1 p-5 gap-4">
                    <div className="space-y-1.5">
                      <h3 className="text-base font-bold text-[#0F172A]">{svc.name}</h3>
                      <p className="text-xs text-[#64748B] line-clamp-2">{svc.about || svc.description}</p>
                    </div>
                    <div className="flex items-center justify-between text-xs text-[#64748B] border-t border-[#E2E8F0] pt-3">
                      <span>{svc.duration || "Consultation"}</span>
                      <span className="font-bold text-[#0F172A] text-sm">₹{svc.price}</span>
                    </div>
                    <Link
                      to={`/book-service/${svc._id}`}
                      className="mt-auto flex items-center justify-center gap-2 w-full py-2.5 bg-[#2563EB] hover:bg-[#1E40AF] text-white text-sm font-bold rounded-xl transition-all"
                    >
                      Book Now <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── BOTTOM SECTION (Matching Image 2) ─────────────────────── */}
      <section className="py-24 bg-white">
        <div className="text-center mb-16">
          <span className="border border-[#CBD5E1] px-5 py-2 text-[11px] font-bold tracking-[0.2em] text-[#64748B] uppercase inline-block mb-6 rounded-sm">
            Services
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] leading-snug">
            Feel Like Home With Best <br className="hidden md:block"/> Medical Care
          </h2>
        </div>

        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Box 1 */}
            <div className="bg-[#F4F4F5] p-8 flex flex-col justify-between group cursor-pointer hover:bg-[#E4E4E7] transition-colors h-[280px]">
              <div>
                <Pill className="text-[#0D9488] mb-6" size={32} strokeWidth={1.5} />
                <h3 className="text-lg font-bold text-[#0F172A] mb-3">Angioplasty</h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed line-clamp-4">
                  Once the family has reached a decision, the team informs the relevant parties.
                </p>
              </div>
              <button className="flex items-center gap-2 text-[13px] font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors mt-4">
                Read More <PlusCircle size={14} className="text-[#CBD5E1] group-hover:text-[#2563EB]" />
              </button>
            </div>

            {/* Box 2 */}
            <div className="bg-[#F4F4F5] p-8 flex flex-col justify-between group cursor-pointer hover:bg-[#E4E4E7] transition-colors h-[280px]">
              <div>
                <Heart className="text-[#0D9488] mb-6" size={32} strokeWidth={1.5} />
                <h3 className="text-lg font-bold text-[#0F172A] mb-3">Cardiology</h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed line-clamp-4">
                  Emergency staff who are available 24 hours a day, seven days a week.
                </p>
              </div>
              <button className="flex items-center gap-2 text-[13px] font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors mt-4">
                Read More <PlusCircle size={14} className="text-[#CBD5E1] group-hover:text-[#2563EB]" />
              </button>
            </div>

            {/* Box 3 */}
            <div className="bg-[#F4F4F5] p-8 flex flex-col justify-between group cursor-pointer hover:bg-[#E4E4E7] transition-colors h-[280px]">
              <div>
                <Sparkles className="text-[#0D9488] mb-6" size={32} strokeWidth={1.5} />
                <h3 className="text-lg font-bold text-[#0F172A] mb-3">Dental</h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed line-clamp-4">
                  Medical professionals team is trained to provide you with the care and support.
                </p>
              </div>
              <button className="flex items-center gap-2 text-[13px] font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors mt-4">
                Read More <PlusCircle size={14} className="text-[#CBD5E1] group-hover:text-[#2563EB]" />
              </button>
            </div>

            {/* Box 4 (Image) */}
            <div className="h-[280px] bg-gray-200 overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=600" 
                alt="Dental Patient" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Box 5 */}
            <div className="bg-[#F4F4F5] p-8 flex flex-col justify-between group cursor-pointer hover:bg-[#E4E4E7] transition-colors h-[280px]">
              <div>
                <Eye className="text-[#0D9488] mb-6" size={32} strokeWidth={1.5} />
                <h3 className="text-lg font-bold text-[#0F172A] mb-3">Eye Care</h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed line-clamp-4">
                  We will fax the records directly to the doctors the day before the appointment.
                </p>
              </div>
              <button className="flex items-center gap-2 text-[13px] font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors mt-4">
                Read More <PlusCircle size={14} className="text-[#CBD5E1] group-hover:text-[#2563EB]" />
              </button>
            </div>

            {/* Box 6 (Image) */}
            <div className="h-[280px] bg-gray-200 overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1598256989800-fea5f95acbb4?auto=format&fit=crop&q=80&w=600" 
                alt="Dental Tools" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Box 7 */}
            <div className="bg-[#F4F4F5] p-8 flex flex-col justify-between group cursor-pointer hover:bg-[#E4E4E7] transition-colors h-[280px]">
              <div>
                <Brain className="text-[#0D9488] mb-6" size={32} strokeWidth={1.5} />
                <h3 className="text-lg font-bold text-[#0F172A] mb-3">Endocrinology</h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed line-clamp-4">
                  Once the family has reached a decision, the team informs the relevant parties.
                </p>
              </div>
              <button className="flex items-center gap-2 text-[13px] font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors mt-4">
                Read More <PlusCircle size={14} className="text-[#CBD5E1] group-hover:text-[#2563EB]" />
              </button>
            </div>

            {/* Box 8 */}
            <div className="bg-[#F4F4F5] p-8 flex flex-col justify-between group cursor-pointer hover:bg-[#E4E4E7] transition-colors h-[280px]">
              <div>
                <Syringe className="text-[#0D9488] mb-6" size={32} strokeWidth={1.5} />
                <h3 className="text-lg font-bold text-[#0F172A] mb-3">Orthopaedics</h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed line-clamp-4">
                  Our team of highly trained professionals uses the latest healing technologies.
                </p>
              </div>
              <button className="flex items-center gap-2 text-[13px] font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors mt-4">
                Read More <PlusCircle size={14} className="text-[#CBD5E1] group-hover:text-[#2563EB]" />
              </button>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default Services;
