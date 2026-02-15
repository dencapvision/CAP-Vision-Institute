
import React, { useEffect, lazy, Suspense } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home'));
const Courses = lazy(() => import('./pages/Courses'));
const CourseDetail = lazy(() => import('./pages/CourseDetail'));
const Services = lazy(() => import('./pages/Services'));
const Contact = lazy(() => import('./pages/Contact'));
const Resources = lazy(() => import('./pages/Resources'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Events = lazy(() => import('./pages/Events'));
const LMS = lazy(() => import('./pages/LMS'));
const LMSPlayer = lazy(() => import('./pages/LMSPlayer'));
const LMSProfile = lazy(() => import('./pages/LMSProfile'));
const Speakers = lazy(() => import('./pages/Speakers'));
const SpeakerDetail = lazy(() => import('./pages/SpeakerDetail'));
const JoinUs = lazy(() => import('./pages/JoinUs'));
const About = lazy(() => import('./pages/About'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Login = lazy(() => import('./pages/Login'));
const MediaManager = lazy(() => import('./pages/MediaManager'));

import { CONTACT_INFO } from './constants/brand';

// Loading Component
const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-[#c5a059] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

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
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Suspense fallback={<PageLoader />}>
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
              <Route
                path="/admin/media"
                element={
                  <ProtectedRoute>
                    <MediaManager />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Suspense>
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
  );
};

export default App;
