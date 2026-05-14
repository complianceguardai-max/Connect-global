import { motion, AnimatePresence } from 'framer-motion';
import { AppProvider, useApp } from './context/AppContext';

// Layout
import TopNav from './components/layout/TopNav';
import Footer from './components/layout/Footer';

// Hero
import HeroSection from './components/hero/HeroSection';

// Nav Modals
import GlobalCommerceModal from './components/nav-modals/GlobalCommerceModal';
import DeFiModal from './components/nav-modals/DeFiModal';
import TalentModal from './components/nav-modals/TalentModal';
import KnowledgeModal from './components/nav-modals/KnowledgeModal';

// Onboarding
import OnboardingModal from './components/onboarding/OnboardingModal';

// Bento
import BentoGrid from './components/bento/BentoGrid';

// Stats
import StatsSection from './components/stats/StatsSection';

function AppContent() {
  const { dir } = useApp();

  return (
    <div dir={dir} style={{ background: '#0a1628', minHeight: '100vh' }}>
      {/* Fixed Navigation */}
      <TopNav />

      {/* Nav Modals (rendered at root level for proper z-index) */}
      <GlobalCommerceModal />
      <DeFiModal />
      <TalentModal />
      <KnowledgeModal />

      {/* Onboarding Modal */}
      <OnboardingModal />

      {/* Page Content */}
      <main>
        {/* Hero Section with World Map */}
        <HeroSection />

        {/* Bento Grid with Deep Dive Modals */}
        <BentoGrid />

        {/* Stats, Heatmap, Partners, Support */}
        <StatsSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
