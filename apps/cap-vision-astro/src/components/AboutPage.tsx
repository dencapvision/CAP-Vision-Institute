import React, { useEffect } from 'react';

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
  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 150);
      }
    };

    handleHashScroll();
    window.addEventListener('hashchange', handleHashScroll);
    return () => window.removeEventListener('hashchange', handleHashScroll);
  }, []);

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
