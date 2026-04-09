
import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AIAgent from './components/AIAgent';
import { HelmetProvider } from 'react-helmet-async';

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home'));
const Courses = lazy(() => import('./pages/Courses'));
const CourseDetail = lazy(() => import('./pages/CourseDetail'));
const Services = lazy(() => import('./pages/Services'));
const Contact = lazy(() => import('./pages/Contact'));
const Resources = lazy(() => import('./pages/Resources'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Events = lazy(() => import('./pages/Events'));
const About = lazy(() => import('./pages/About'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Login = lazy(() => import('./pages/Login'));
const Speakers = lazy(() => import('./pages/Speakers'));
const SpeakerDetail = lazy(() => import('./pages/SpeakerDetail'));
const JoinUs = lazy(() => import('./pages/JoinUs'));
const MediaManager = lazy(() => import('./pages/MediaManager'));
const CourseBuilderPage = lazy(() => import('./pages/CourseBuilder'));
const WorkshopHandouts = lazy(() => import('./pages/workshop/WorkshopHandouts'));
const PortfolioDetail = lazy(() => import('./pages/PortfolioDetail'));
const WebAppPricing = lazy(() => import('./pages/WebAppPricing'));
const CEOSpeechfulness = lazy(() => import('./pages/CEOSpeechfulness'));
const CEOTierCommunity = lazy(() => import('./pages/CEOTierCommunity'));
const CEOMemberDashboard = lazy(() => import('./pages/CEOMemberDashboard'));

// Dashboard pages
const DashboardLayout = lazy(() => import('./pages/dashboard/DashboardLayout'));
const DashboardHome = lazy(() => import('./pages/dashboard/DashboardHome'));
const DashboardCourses = lazy(() => import('./pages/dashboard/DashboardCourses'));
const CourseCreateWizard = lazy(() => import('./pages/dashboard/CourseCreateWizard'));
const DashboardSpeakers = lazy(() => import('./pages/dashboard/DashboardSpeakers'));
const DashboardAIGenerator = lazy(() => import('./pages/dashboard/DashboardAIGenerator'));
const DashboardArticles = lazy(() => import('./pages/dashboard/DashboardArticles'));
const DashboardBlog = lazy(() => import('./pages/dashboard/DashboardBlog'));
const DashboardBlogEditor = lazy(() => import('./pages/dashboard/DashboardBlogEditor'));
const DashboardPortfolio = lazy(() => import('./pages/dashboard/DashboardPortfolio'));
const DashboardPortfolioEditor = lazy(() => import('./pages/dashboard/DashboardPortfolioEditor'));
const DashboardSEO = lazy(() => import('./pages/dashboard/DashboardSEO'));
const DashboardResources = lazy(() => import('./pages/dashboard/DashboardResources'));
const DashboardCEOTier = lazy(() => import('./pages/dashboard/DashboardCEOTier'));


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

// Wrapper that hides Header/Footer for /dashboard/* routes
const AppShell: React.FC = () => {
  const { pathname } = useLocation();
  const isDashboard = pathname.startsWith('/dashboard');

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {!isDashboard && <Header />}
      <main className={isDashboard ? 'flex-grow' : 'flex-grow w-full min-w-0'}>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route path="/services" element={<Services />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/resources/:id" element={<BlogPost />} />
            <Route path="/events" element={<Events />} />
            <Route path="/about" element={<About />} />
            <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/portfolio/:slug" element={<PortfolioDetail />} />
            <Route path="/speakers" element={<Speakers />} />
            <Route path="/speakers/:id" element={<SpeakerDetail />} />
            <Route path="/join-us" element={<JoinUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin/media" element={<MediaManager />} />
            <Route path="/admin/course-builder" element={<CourseBuilderPage />} />
            <Route path="/growth-mastery/handouts" element={<WorkshopHandouts />} />
            <Route path="/web-app-pricing" element={<WebAppPricing />} />
            <Route path="/ceo-speechfulness" element={<CEOSpeechfulness />} />
            <Route path="/ceo-tier-community" element={<CEOTierCommunity />} />
            <Route path="/ceo-member-dashboard" element={<CEOMemberDashboard />} />

            {/* Dashboard routes */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardHome />} />
              <Route path="courses" element={<DashboardCourses />} />
              <Route path="courses/new" element={<CourseCreateWizard />} />
              <Route path="speakers" element={<DashboardSpeakers />} />
              <Route path="articles" element={<DashboardArticles />} />
              <Route path="blog" element={<DashboardBlog />} />
              <Route path="blog/new" element={<DashboardBlogEditor />} />
              <Route path="blog/edit/:id" element={<DashboardBlogEditor />} />
              <Route path="portfolio" element={<DashboardPortfolio />} />
              <Route path="portfolio/new" element={<DashboardPortfolioEditor />} />
              <Route path="portfolio/edit/:id" element={<DashboardPortfolioEditor />} />
              <Route path="resources" element={<DashboardResources />} />
              <Route path="seo" element={<DashboardSEO />} />
              <Route path="ai-generator" element={<DashboardAIGenerator />} />
              <Route path="ceo-tier" element={<DashboardCEOTier />} />

            </Route>
          </Routes>
        </Suspense>
      </main>
      {!isDashboard && <Footer />}

      {!isDashboard && (
        <>
          {/* AI Agent Integrated Globally */}
          <AIAgent />

          {/* Sticky CTA for Mobile */}
          <div className="md:hidden sticky bottom-0 z-40 bg-white/80 backdrop-blur-md border-t border-gray-100 p-4 safe-area-pb flex gap-3">
            <a href={`tel:${CONTACT_INFO.phone}`} className="flex-1 bg-[#0f3460] text-white py-4 rounded-2xl font-bold text-center nav-font text-sm">โทรปรึกษา</a>
            <a href={CONTACT_INFO.lineUrl} className="flex-1 bg-[#c5a059] text-white py-4 rounded-2xl font-bold text-center nav-font text-sm">ไลน์ทางการ</a>
          </div>
        </>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <AppShell />
      </Router>
    </HelmetProvider>
  );
};

export default App;
