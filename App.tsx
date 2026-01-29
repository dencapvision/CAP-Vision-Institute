
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async'; // Import HelmetProvider
import Header from './components/Header';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot'; // Import ChatBot
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Resources from './pages/Resources';
import BlogPost from './pages/BlogPost'; // New
import Events from './pages/Events'; // New
import LMS from './pages/LMS';
import LMSPlayer from './pages/LMSPlayer';
import LMSProfile from './pages/LMSProfile';
import Speakers from './pages/Speakers';
import SpeakerDetail from './pages/SpeakerDetail';
import JoinUs from './pages/JoinUs';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Login from './pages/Login';
import GrowthMasteryWorkshop from './public/Growth Mastery Workshop';
import { CONTACT_INFO, BRAND_INFO } from './constants';

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:id" element={<CourseDetail />} />
              <Route path="/services" element={<Services />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/resources/:id" element={<BlogPost />} />
              <Route path="/events" element={<Events />} />
              <Route path="/about" element={<About />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/speakers" element={<Speakers />} />
              <Route path="/speakers/:id" element={<SpeakerDetail />} />
              <Route path="/join-us" element={<JoinUs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/growth-mastery" element={<GrowthMasteryWorkshop />} />
              <Route path="/login" element={<Login />} />
              <Route path="/lms" element={<LMS />} />
              <Route
                path="/lms/:id"
                element={
                  <ProtectedRoute>
                    <LMSPlayer />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/lms-profile"
                element={
                  <ProtectedRoute>
                    <LMSProfile />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />

          {/* ChatBot Integrated Globally */}
          <ChatBot />

          {/* Sticky CTA for Mobile */}
          <div className="md:hidden sticky bottom-0 z-40 bg-white/80 backdrop-blur-md border-t border-gray-100 p-4 flex gap-3">
            <a href={`tel:${CONTACT_INFO.phone}`} className="flex-1 bg-[#0f3460] text-white py-4 rounded-2xl font-bold text-center nav-font text-sm">โทรปรึกษา</a>
            <a href={CONTACT_INFO.lineUrl} className="flex-1 bg-[#c5a059] text-white py-4 rounded-2xl font-bold text-center nav-font text-sm">ไลน์ทางการ</a>
          </div>
        </div>
      </Router>
    </HelmetProvider>
  );
};

export default App;
