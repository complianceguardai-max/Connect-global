import { useApp } from '../context/AppContext';

// Layout
import TopNav from '../components/layout/TopNav';
import Footer from '../components/layout/Footer';

// Hero
import HeroSection from '../components/hero/HeroSection';

// Nav Modals
import GlobalCommerceModal from '../components/nav-modals/GlobalCommerceModal';
import DeFiModal from '../components/nav-modals/DeFiModal';
import TalentModal from '../components/nav-modals/TalentModal';
import KnowledgeModal from '../components/nav-modals/KnowledgeModal';

// Onboarding
import OnboardingModal from '../components/onboarding/OnboardingModal';

// UI
import { ToastContainer } from '../components/ui/Toast';
import InfoModal from '../components/ui/InfoModal';

export default function Home() {
  const { dir, toasts, removeToast, infoModal, closeInfoModal } = useApp();

  return (
    <div dir={dir} style={{ background: '#0a1628', minHeight: '100vh', overflowX: 'hidden', width: '100%', position: 'relative' }}>
      {/* Fixed Navigation */}
      <TopNav />

      {/* Nav Modals (rendered at root level for proper z-index) */}
      <GlobalCommerceModal />
      <DeFiModal />
      <TalentModal />
      <KnowledgeModal />

      {/* Onboarding Modal */}
      <OnboardingModal />

      {/* Info Modal for Legal/Resources */}
      <InfoModal contentKey={infoModal} open={!!infoModal} onClose={closeInfoModal} />

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      {/* Page Content */}
      <main>
        {/* Hero Section with World Map */}
        <HeroSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
