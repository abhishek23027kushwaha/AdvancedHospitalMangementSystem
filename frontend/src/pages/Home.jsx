import React from 'react';
import HeroSection from './HeroSection';
import Certified from './Certified';
import Doctors from './LatestDoctors';
import VoiceOfTrust from './VoiceOfTrust';
import OnlineConsultation from '../components/OnlineConsultation';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50/50 pb-20 overflow-x-hidden">
      <HeroSection />
      
      <OnlineConsultation />
      
      <div className="relative z-20">
        <Certified />
      </div>
      
      <Doctors />

      <VoiceOfTrust />
    </div>
  );
};

export default Home;
