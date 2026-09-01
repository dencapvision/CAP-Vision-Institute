import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.join(__dirname, '..', '..');
const ASTRO_COMPONENTS_DIR = path.join(__dirname, 'src', 'components');

const FILES_TO_PORT = [
  { src: 'pages/Home.tsx', dest: 'HomePage.tsx' },
  { src: 'pages/Assessment.tsx', dest: 'AssessmentPage.tsx' },
  { src: 'components/TransformationAssessment.tsx', dest: 'TransformationAssessment.tsx' },
  { src: 'components/StatCounter.tsx', dest: 'StatCounter.tsx' },
  { src: 'components/Header.tsx', dest: 'Header.tsx' },
  { src: 'components/Footer.tsx', dest: 'Footer.tsx' },
  { src: 'pages/Contact.tsx', dest: 'ContactPage.tsx' },
  { src: 'pages/Services.tsx', dest: 'ServicesPage.tsx' },
  { src: 'pages/About.tsx', dest: 'AboutPage.tsx' },
  { src: 'pages/JoinUs.tsx', dest: 'JoinUsPage.tsx' },
  { src: 'pages/Speakers.tsx', dest: 'SpeakersPage.tsx' },
  { src: 'pages/SpeakerDetail.tsx', dest: 'SpeakerDetailPage.tsx' },
  { src: 'pages/Portfolio.tsx', dest: 'PortfolioPage.tsx' },
  { src: 'pages/PortfolioDetail.tsx', dest: 'PortfolioDetailPage.tsx' },
  { src: 'pages/WebAppPricing.tsx', dest: 'WebAppPricingPage.tsx' },
  { src: 'pages/CEOSpeechfulness.tsx', dest: 'CEOSpeechfulnessPage.tsx' },
  { src: 'pages/SubconsciousSpeaker.tsx', dest: 'SubconsciousSpeakerPage.tsx' },
  { src: 'pages/CEOTierCommunity.tsx', dest: 'CEOTierCommunityPage.tsx' },
  { src: 'pages/workshop/WorkshopHandouts.tsx', dest: 'workshop/WorkshopHandoutsPage.tsx' },
  { src: 'components/SpeechfulnessRegistration.tsx', dest: 'SpeechfulnessRegistration.tsx' },
  { src: 'components/SubconsciousSpeaker/BookingWizard.tsx', dest: 'SubconsciousSpeaker/BookingWizard.tsx' },
  { src: 'components/CEO/BookingWizard.tsx', dest: 'CEO/BookingWizard.tsx' },
  { src: 'components/PortfolioGallery.tsx', dest: 'PortfolioGallery.tsx' },
  { src: 'components/WebAppBookingWizard.tsx', dest: 'WebAppBookingWizard.tsx' },
  { src: 'components/workshop/WheelOfLife.tsx', dest: 'workshop/WheelOfLife.tsx' },
  { src: 'components/workshop/GrowthRoadmap.tsx', dest: 'workshop/GrowthRoadmap.tsx' },
  { src: 'components/workshop/SlideDeck.tsx', dest: 'workshop/SlideDeck.tsx' },
  { src: 'components/workshop/RadarChart.tsx', dest: 'workshop/RadarChart.tsx' },
  { src: 'components/ClientsSection.tsx', dest: 'ClientsSection.tsx' },
  { src: 'components/PortfolioCard.tsx', dest: 'PortfolioCard.tsx' },
  { src: 'components/DrSo/BookingWizard.tsx', dest: 'DrSo/BookingWizard.tsx' },
  { src: 'components/Speakers/BookingWizard.tsx', dest: 'Speakers/BookingWizard.tsx' },
  { src: 'components/about/AboutHero.tsx', dest: 'about/AboutHero.tsx' },
  { src: 'components/about/CTASection.tsx', dest: 'about/CTASection.tsx' },
  { src: 'components/about/CapVisionStory.tsx', dest: 'about/CapVisionStory.tsx' },
  { src: 'components/about/Experience.tsx', dest: 'about/Experience.tsx' },
  { src: 'components/about/FounderStory.tsx', dest: 'about/FounderStory.tsx' },
  { src: 'components/about/Impact.tsx', dest: 'about/Impact.tsx' },
  { src: 'components/about/Methodology.tsx', dest: 'about/Methodology.tsx' },
  { src: 'components/about/SignatureStyle.tsx', dest: 'about/SignatureStyle.tsx' }
];

function portFile(srcRel, destRel) {
  const srcPath = path.join(ROOT_DIR, srcRel);
  const destPath = path.join(ASTRO_COMPONENTS_DIR, destRel);
  
  if (!fs.existsSync(srcPath)) {
    console.error(`Source file not found: ${srcPath}`);
    return;
  }
  
  const destDir = path.dirname(destPath);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  
  let content = fs.readFileSync(srcPath, 'utf8');
  
  // 1. Remove react-router-dom imports
  content = content.replace(/import\s+\{[^}]*Link[^}]*\}\s+from\s+['"]react-router-dom['"];?/g, '');
  content = content.replace(/import\s+\{[^}]*useParams[^}]*\}\s+from\s+['"]react-router-dom['"];?/g, '');
  content = content.replace(/import\s+\{[^}]*useNavigate[^}]*\}\s+from\s+['"]react-router-dom['"];?/g, '');
  content = content.replace(/import\s+\{[^}]*useSearchParams[^}]*\}\s+from\s+['"]react-router-dom['"];?/g, '');
  content = content.replace(/import\s+\{[^}]*useLocation[^}]*\}\s+from\s+['"]react-router-dom['"];?/g, '');
  content = content.replace(/import\s+Link\s+from\s+['"]react-router-dom['"];?/g, '');
  content = content.replace(/import\s+.*?\s+from\s+['"]react-router-dom['"];?/g, '');
  
  // 2. Replace <Link to={...}> with <a href={...}>
  content = content.replace(/<Link\s+([^>]*?)to=\{([^}]+?)\}([^>]*?)>/g, '<a $1href={$2}$3>');
  content = content.replace(/<Link\s+([^>]*?)to=(["'])(.*?)\2([^>]*?)>/g, '<a $1href=$2$3$2$4>');
  content = content.replace(/<\/Link>/g, '</a>');
  
  // 3. Replace supabaseClient imports with Astro client path
  content = content.replace(/supabaseClient/g, 'supabase');
  content = content.replace(/\.\.\/lib\/supabaseClient/g, '../lib/supabase');
  content = content.replace(/\.\.\/\.\.\/lib\/supabaseClient/g, '../../lib/supabase');
  content = content.replace(/@\/lib\/supabaseClient/g, '@/lib/supabase');
  content = content.replace(/@\/services/g, '../../services'); // resolve aliased services in Vite SPA
  
  // 3.5 Remove SEO imports and <SEO ... /> tags
  content = content.replace(/import\s+SEO\s+from\s+['"].*?SEO['"];?/g, '');
  content = content.replace(/<SEO\s+[\s\S]*?\/>/g, '');
  
  // 3. Replace supabaseClient imports with Astro client path
  content = content.replace(/supabaseClient/g, 'supabase');
  content = content.replace(/\.\.\/lib\/supabaseClient/g, '../lib/supabase');
  content = content.replace(/\.\.\/\.\.\/lib\/supabaseClient/g, '../../lib/supabase');
  content = content.replace(/@\/lib\/supabaseClient/g, '@/lib/supabase');
  content = content.replace(/from\s+['"]\.\.\/services\/(.*?)['"]/g, "from '../lib/services/$1'");
  content = content.replace(/from\s+['"]@\/services\/(.*?)['"]/g, "from '../lib/services/$1'");
  content = content.replace(/from\s+['"]\.\.\/\.\.\/components\/workshop\/(.*?)['"]/g, "from './$1'");
  content = content.replace(/from\s+['"]\.\.\/components\/about\/(.*?)['"]/g, "from './about/$1'");
  content = content.replace(/from\s+['"]\.\.\/components\/(.*?)['"]/g, "from './$1'");
  content = content.replace(/from\s+['"]@\/components\/(.*?)['"]/g, "from './$1'");
  content = content.replace(/@\/services/g, '../../services'); // fallback
  
  // 3.5 Remove SEO imports and <SEO ... /> tags
  content = content.replace(/import\s+SEO\s+from\s+['"].*?SEO['"];?/g, '');
  content = content.replace(/<SEO\s+[\s\S]*?\/>/g, '');
  
  // 3.6 Convert all imports from types to 'import type'
  content = content.replace(/import\s+\{(.*?)\}\s+from\s+['"](.*?types|types)['"]/g, "import type { $1 } from '$2'");
  
  // 4. Replace useNavigate mockup
  content = content.replace(/const\s+navigate\s*=\s*useNavigate\(\s*\);?/g, "const navigate = (path) => { if (typeof window !== 'undefined') { window.location.href = path; } };");
  
  // 5. Replace useParams mockup & support props injection
  content = content.replace(
    /const\s+PortfolioDetail:\s*React\.FC\s*=\s*\(\s*\)\s*=>\s*\{/g, 
    "const PortfolioDetail: React.FC<{ slug?: string }> = ({ slug: propSlug }) => {"
  );
  content = content.replace(
    /const\s+\{\s*slug\s*\}\s*=\s*useParams.*?\(.*?\);?/g, 
    "const slug = propSlug || (typeof window !== 'undefined' ? window.location.pathname.split('/').pop() : '');"
  );
  
  content = content.replace(
    /const\s+SpeakerDetail:\s*React\.FC\s*=\s*\(\s*\)\s*=>\s*\{/g, 
    "const SpeakerDetail: React.FC<{ id?: string }> = ({ id: propId }) => {"
  );
  content = content.replace(
    /const\s+\{\s*id\s*\}\s*=\s*useParams.*?\(.*?\);?/g, 
    "const id = propId || (typeof window !== 'undefined' ? window.location.pathname.split('/').pop() : '');"
  );
  
  // 6. Replace useLocation mockup
  content = content.replace(/const\s+location\s*=\s*useLocation\(\s*\);?/g, "const location = (typeof window !== 'undefined' ? window.location : { pathname: '', search: '' });");
  
  // 6.5 Replace residual dynamic Link bindings to anchor tags
  content = content.replace(/const\s+Component\s*=\s*isExternal\s*\?\s*'a'\s*:\s*Link;?/g, "const Component = 'a';");
  content = content.replace(/:\s*\{\s*to:\s*([a-zA-Z0-9._()]+)\s*\}/g, ": { href: $1 }");
  
  // 7. Remove react-router-dom importsckup
  content = content.replace(/const\s+\[\s*searchParams\s*[^\]]*\]\s*=\s*useSearchParams\(\s*\);?/g, "const searchParams = (typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams());");
  
  fs.writeFileSync(destPath, content);
  console.log(`[Port] Done: ${srcRel} -> ${destRel}`);
}

// Port database services
const SERVICES_TO_PORT = [
  { src: 'services/instructors.ts', dest: 'lib/services/instructors.ts' },
  { src: 'services/portfolio.ts', dest: 'lib/services/portfolio.ts' },
  { src: 'services/courses.ts', dest: 'lib/services/courses.ts' },
  { src: 'services/events.ts', dest: 'lib/services/events.ts' },
  { src: 'lib/ceoService.ts', dest: 'lib/ceoService.ts' },
  { src: 'lib/courseService.ts', dest: 'lib/courseService.ts' },
  { src: 'lib/speakerService.ts', dest: 'lib/speakerService.ts' },
  { src: 'lib/drsoService.ts', dest: 'lib/drsoService.ts' },
  { src: 'lib/uploadToR2.ts', dest: 'lib/uploadToR2.ts' }
];

function portService(srcRel, destRel) {
  const srcPath = path.join(ROOT_DIR, srcRel);
  const destPath = path.join(__dirname, 'src', destRel);
  
  if (!fs.existsSync(srcPath)) {
    console.error(`Service source file not found: ${srcPath}`);
    return;
  }
  
  let content = fs.readFileSync(srcPath, 'utf8');
  content = content.replace(/supabaseClient/g, 'supabase');
  content = content.replace(/from\s+['"]\.\.\/lib\/supabaseClient['"]/g, "from '../supabase'");
  content = content.replace(/from\s+['"]\.\.\/lib\/supabase['"]/g, "from '../supabase'");
  content = content.replace(/from\s+['"]\.\/supabaseClient['"]/g, "from '../supabase'");
  content = content.replace(/from\s+['"]@\/lib\/supabaseClient['"]/g, "from '../supabase'");
  content = content.replace(/from\s+['"]@\/lib\/supabase['"]/g, "from '../supabase'");
  
  const destDir = path.dirname(destPath);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  
  fs.writeFileSync(destPath, content);
  console.log(`[Service Port] Done: ${srcRel} -> ${destRel}`);
}

FILES_TO_PORT.forEach(file => portFile(file.src, file.dest));
SERVICES_TO_PORT.forEach(file => portService(file.src, file.dest));
console.log('All components and services ported successfully!');
