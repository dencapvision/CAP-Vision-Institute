import React, { useEffect } from 'react';
import SEO from '../components/SEO';
import ClientsSection from '../components/ClientsSection';
import AboutHero from '../components/about/AboutHero';
import FounderStory from '../components/about/FounderStory';
import CapVisionStory from '../components/about/CapVisionStory';
import Methodology from '../components/about/Methodology';
import Experience from '../components/about/Experience';
import SignatureStyle from '../components/about/SignatureStyle';
import Impact from '../components/about/Impact';
import CTASection from '../components/about/CTASection';

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
      <SEO
        title="เกี่ยวกับเรา & CAP Framework | CAP Vision Institute"
        description="ครูเด่น มาสเตอร์ฟา — ผู้นำกระบวนการเปลี่ยนผ่าน นักสร้างบริบทการเรียนรู้ และ Master Facilitator ประสบการณ์กว่า 18 ปี กับองค์กรชั้นนำกว่า 200 แห่ง"
      />

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
