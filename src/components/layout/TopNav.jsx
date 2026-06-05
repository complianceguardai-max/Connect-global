import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe2, Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

const NAV_ITEMS = [
  { key: 'capabilities', label: 'Capabilities', sub: 'Core Engine' },
  { key: 'risk',         label: 'Risk Tiers',   sub: 'EU AI Act' },
  { key: 'remediation',  label: 'Remediation',  sub: 'Blueprints' },
  { key: 'export',       label: 'Audit PDF',    sub: 'Secure Export' },
];

function NavLink({ label, sub, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col items-start px-3 py-2 rounded-xl transition-all duration-200 text-left"
      style={{
        background: hovered ? 'rgba(118,251,211,0.07)' : 'transparent',
        border: hovered ? '1px solid rgba(118,251,211,0.15)' : '1px solid transparent',
      }}
    >
      <span
        className="text-xs font-semibold tracking-wide uppercase"
        style={{ color: hovered ? '#76fbd3' : 'rgba(226,232,240,0.75)', transition: 'color 0.2s' }}
      >
        {label}
      </span>
      {sub && (
        <span className="text-xs mt-0.5" style={{ color: 'rgba(118,251,211,0.4)', fontSize: '10px' }}>
          ⊕ {sub}
        </span>
      )}
    </button>
  );
}

export default function TopNav() {
  const { setActiveNavModal, openOnboarding, addToast } = useApp();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      addToast('Error signing out', 'error');
    } else {
      addToast('Signed out successfully', 'success');
      navigate('/');
    }
  };

  // Don't show TopNav on auth or dashboard pages
  if (location.pathname === '/auth' || location.pathname === '/dashboard') {
    return null;
  }

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-40"
        style={{
          background: scrolled
            ? 'rgba(10,22,40,0.95)'
            : 'rgba(10,22,40,0.7)',
          backdropFilter: 'blur(32px)',
          WebkitBackdropFilter: 'blur(32px)',
          borderBottom: scrolled
            ? '1px solid rgba(118,251,211,0.18)'
            : '1px solid rgba(118,251,211,0.12)',
          boxShadow: scrolled ? '0 4px 35px rgba(0,0,0,0.5)' : 'none',
          transition: 'background 0.3s, border-color 0.3s, box-shadow 0.3s',
        }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-4" style={{ width: '100%', maxWidth: '100%' }}>

          {/* ── Logo ── */}
          <motion.div
            className="flex items-center gap-2 cursor-pointer flex-shrink-0"
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

          {/* ── Desktop Nav ── */}
          <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.key}
                label={item.label}
                sub={item.sub}
                onClick={() => setActiveNavModal(item.key)}
              />
            ))}
            <NavLink
              label="Resources"
              sub=""
              onClick={() => {
                const element = document.getElementById('security-partners');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }}
            />
          </div>

          {/* ── Right Controls ── */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            {/* Conditional Auth Buttons */}
            {user ? (
              <>
                {/* Dashboard Button */}
                <motion.button
                  onClick={() => navigate('/dashboard')}
                  className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold tracking-wider transition-all duration-200"
                  style={{
                    background: 'rgba(118,251,211,0.1)',
                    border: '1px solid rgba(118,251,211,0.3)',
                    color: '#76fbd3',
                  }}
                  whileHover={{
                    scale: 1.04,
                    boxShadow: '0 0 20px rgba(118,251,211,0.3)',
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  <LayoutDashboard size={16} />
                  DASHBOARD
                </motion.button>

                {/* Logout Button */}
                <motion.button
                  onClick={handleSignOut}
                  className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold tracking-wider transition-all duration-200"
                  style={{
                    background: 'rgba(239,68,68,0.1)',
                    border: '1px solid rgba(239,68,68,0.3)',
                    color: '#fca5a5',
                  }}
                  whileHover={{
                    scale: 1.04,
                    background: 'rgba(239,68,68,0.15)',
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  <LogOut size={16} />
                  LOGOUT
                </motion.button>
              </>
            ) : (
              <>
                {/* Login Button */}
                <motion.button
                  onClick={() => navigate('/auth')}
                  className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold tracking-wider transition-all duration-200"
                  style={{
                    background: 'rgba(118,251,211,0.08)',
                    border: '1px solid rgba(118,251,211,0.25)',
                    color: '#76fbd3',
                  }}
                  whileHover={{
                    scale: 1.04,
                    boxShadow: '0 0 20px rgba(118,251,211,0.25)',
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  <User size={16} />
                  LOGIN
                </motion.button>

                {/* Get Started Button */}
                <motion.button
                  onClick={openOnboarding}
                  className="hidden md:flex items-center gap-2 font-orbitron text-xs font-bold tracking-wider pill-btn-primary"
                  whileHover={{
                    scale: 1.04,
                    boxShadow: '0 0 32px rgba(118,251,211,0.5)',
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  GET STARTED
                </motion.button>
              </>
            )}

            {/* Mobile toggle */}
            <button
              className="lg:hidden p-2 rounded-xl"
              style={{ color: '#76fbd3', border: '1px solid rgba(118,251,211,0.2)' }}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed top-16 left-0 right-0 z-39 lg:hidden"
            style={{
              background: 'rgba(10,22,40,0.97)',
              borderBottom: '1px solid rgba(118,251,211,0.15)',
              backdropFilter: 'blur(28px)',
            }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-4 py-4 flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.key}
                  onClick={() => { setActiveNavModal(item.key); setMobileOpen(false); }}
                  className="text-left px-4 py-3 rounded-xl text-sm font-medium transition-all"
                  style={{
                    color: 'rgba(226,232,240,0.8)',
                    border: '1px solid rgba(118,251,211,0.1)',
                  }}
                >
                  <span className="uppercase text-xs font-semibold tracking-wide">{item.label}</span>
                  {item.sub && (
                    <span className="block text-xs mt-0.5" style={{ color: 'rgba(118,251,211,0.45)' }}>
                      ⊕ {item.sub}
                    </span>
                  )}
                </button>
              ))}
              <div className="pt-2 flex flex-col gap-2">
                
                {/* Mobile Auth Buttons */}
                {user ? (
                  <>
                    <button
                      onClick={() => { navigate('/dashboard'); setMobileOpen(false); }}
                      className="w-full py-3 rounded-xl font-orbitron text-xs font-bold tracking-wider flex items-center justify-center gap-2"
                      style={{
                        background: 'rgba(118,251,211,0.1)',
                        border: '1px solid rgba(118,251,211,0.3)',
                        color: '#76fbd3',
                      }}
                    >
                      <LayoutDashboard size={16} />
                      DASHBOARD
                    </button>
                    <button
                      onClick={() => { handleSignOut(); setMobileOpen(false); }}
                      className="w-full py-3 rounded-xl font-orbitron text-xs font-bold tracking-wider flex items-center justify-center gap-2"
                      style={{
                        background: 'rgba(239,68,68,0.1)',
                        border: '1px solid rgba(239,68,68,0.3)',
                        color: '#fca5a5',
                      }}
                    >
                      <LogOut size={16} />
                      LOGOUT
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => { navigate('/auth'); setMobileOpen(false); }}
                      className="w-full py-3 rounded-xl font-orbitron text-xs font-bold tracking-wider flex items-center justify-center gap-2"
                      style={{
                        background: 'rgba(118,251,211,0.08)',
                        border: '1px solid rgba(118,251,211,0.25)',
                        color: '#76fbd3',
                      }}
                    >
                      <User size={16} />
                      LOGIN
                    </button>
                    <button
                      onClick={() => { openOnboarding(); setMobileOpen(false); }}
                      className="w-full py-3 rounded-full font-orbitron text-xs font-bold tracking-wider pill-btn-primary"
                    >
                      GET STARTED
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}