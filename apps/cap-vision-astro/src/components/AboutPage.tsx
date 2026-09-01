import React from 'react';

import ClientsSection from './ClientsSection';
import AboutHero from './about/AboutHero';
import FounderStory from './about/FounderStory';
import CapVisionStory from './about/CapVisionStory';
import Methodology from './about/Methodology';
import Experience from './about/Experience';
import SignatureStyle from './about/SignatureStyle';
import Impact from './about/Impact';
import CTASection from './about/CTASection';

const About: React.FC = () => {
  return (
    <div className="bg-white min-h-screen overflow-x-hidden">
      

      <AboutHero />
      <FounderStory />
      <CapVisionStory />
      <Methodology />
      <Experience />
      <SignatureStyle />
      <Impact />
      <ClientsSection />
      <CTASection />
    </div>
  );
};

export default About;
