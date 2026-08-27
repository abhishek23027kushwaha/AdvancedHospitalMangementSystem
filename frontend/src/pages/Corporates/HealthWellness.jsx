import React from 'react';
import CorporateNavbar from './CorporateNavbar';
import ScheduleDemoForm from './ScheduleDemoForm';
import OurServices from './OurServices';
import WhyChooseUs from './WhyChooseUs';
import PractoEcosystem from './PractoEcosystem';
import DemoVideo from './DemoVideo';
import ProductCapabilities from './ProductCapabilities';
import CorporateFAQ from './CorporateFAQ';
import CorporateFooter from './CorporateFooter';
import totalProtectImg from '../../assets/total_protect_dweb.png';
import heroImage from '../../assets/hero-image.png';

const HealthWellness = () => {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <div 
        className="min-h-screen relative flex flex-col"
        style={{ 
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 "></div>
        
        {/* Content wrapper */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <CorporateNavbar />

        {/* Main Hero Content */}
        <div className="flex-grow flex items-center pt-[100px] pb-20 lg:pb-32">
          <div className="max-w-[1400px] mx-auto px-4 md:px-8 w-full">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
              
              {/* Left Side - Text Content */}
              <div className="w-full lg:w-[60%] text-white pt-8 lg:pt-0">
                <h1 className="text-[28px] md:text-[36px] lg:text-[40px] font-bold leading-tight mb-5 lg:w-[85%]">
                  Your Workplace Health and Wellness Partner
                </h1>
                <p className="text-[15px] md:text-[18px] font-semibold leading-snug lg:w-[80%] opacity-90">
                  Over 30cr users benefited by our holistic, customizable and accessible healthcare solutions
                </p>
              </div>

              {/* Right Side - Form */}
              <div className="w-full lg:w-[40%] flex justify-center lg:justify-end">
                <ScheduleDemoForm />
              </div>

            </div>
          </div>
        </div>
        {/* End Hero section div */}
      </div> 
      </div>

      {/* Total Protect Banner Section */}
      <div className="w-full bg-white py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <img 
            src={totalProtectImg} 
            alt="Total Protect - A 360 Holistic Healthcare Plan" 
            className="w-full h-auto object-contain shadow-sm rounded-xl cursor-pointer hover:shadow-md transition-shadow" 
          />
        </div>
      </div>

      {/* Our Services Section */}
      <OurServices />

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* Practo Ecosystem Section */}
      <PractoEcosystem />

      {/* Demo Video Section */}
      <DemoVideo />

      {/* Product Capabilities Section */}
      <ProductCapabilities />

      {/* FAQ Section */}
      <CorporateFAQ />

      {/* Footer Section */}
      <CorporateFooter />

    {/* End root container div */}
    </div>
  );
};

export default HealthWellness;
