import React from 'react';
import HeroSection from './HeroSection';
import Certified from './Certified';
import Doctors from './LatestDoctors';
import VoiceOfTrust from './VoiceOfTrust';
import OnlineConsultation from '../components/OnlineConsultation';
import InClinicConsultation from '../components/InClinicConsultation';
import ArticlePage from '../components/ArticleSection/ArticlePage';
import MassageForUser from './MassageForUser';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50/50 pb-20 overflow-x-hidden">
      <HeroSection />
      
      <OnlineConsultation />

      <InClinicConsultation />

      <ArticlePage />

      <MassageForUser />

    </div>
  );
};

export default Home;
