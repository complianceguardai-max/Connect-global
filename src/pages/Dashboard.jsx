import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Globe2, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import ComplianceGuardDashboard from '../components/compliance/ComplianceGuardDashboard';

// Feature Components from Landing Page
import WhitepaperCTA from '../components/lead/WhitepaperCTA';
import BentoGrid from '../components/bento/BentoGrid';
import StatsSection from '../components/stats/StatsSection';
import SecurityPartners from '../components/stats/SecurityPartners';

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const { addToast } = useApp();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      addToast('Error signing out', 'error');
    } else {
      addToast('Signed out successfully', 'success');
      navigate('/');
    }
  };

  // FORCE RENDER - No conditional blocking

  return (
    <div 
      className="min-h-screen"
      style={{ background: '#0a1628' }}
    >
      {/* Dashboard Header */}
      <motion.div
        className="sticky top-0 z-40"
        style={{
          background: 'rgba(10,22,40,0.95)',
          backdropFilter: 'blur(32px)',
          borderBottom: '1px solid rgba(118,251,211,0.18)',
          boxShadow: '0 4px 35px rgba(0,0,0,0.5)',
        }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.02 }}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(118,251,211,0.2), rgba(22,181,236,0.15))',
                border: '1px solid rgba(118,251,211,0.35)',
                boxShadow: '0 0 18px rgba(118,251,211,0.22)',
              }}
            >
              <Globe2 size={18} style={{ color: '#76fbd3' }} />
            </div>
            <span className="font-orbitron text-base font-bold">
              <span style={{ color: '#e2e8f0' }}>Compliance</span>
              <span style={{ color: '#76fbd3', textShadow: '0 0 12px rgba(118,251,211,0.5)' }}>Guard</span>
            </span>
          </motion.div>

          {/* User Info & Actions */}
          <div className="flex items-center gap-4">
            {/* User Email */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{
              background: 'rgba(118,251,211,0.08)',
              border: '1px solid rgba(118,251,211,0.2)',
            }}>
              <User size={16} style={{ color: '#76fbd3' }} />
              <span className="text-sm" style={{ color: 'rgba(226,232,240,0.8)' }}>
                {user?.email || 'demo@connectglobal.com'}
              </span>
            </div>

            {/* Sign Out Button */}
            <motion.button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
              style={{
                background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.3)',
                color: '#fca5a5',
              }}
              whileHover={{
                scale: 1.05,
                background: 'rgba(239,68,68,0.15)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Sign Out</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ComplianceGuardDashboard />
        </motion.div>

        {/* Feature-Rich Dashboard Components */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Whitepaper Lead Magnet */}
          <WhitepaperCTA />

          {/* Bento Grid with Deep Dive Modals */}
          <BentoGrid />

          {/* Stats, Heatmap, Partners, Support */}
          <StatsSection />

          {/* Security Partners Section */}
          <SecurityPartners />
        </motion.div>
      </div>
    </div>
  );
}
