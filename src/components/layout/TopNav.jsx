import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe2, Menu, X, Wifi, User, ChevronDown } from 'lucide-react';
import { useApp, LANGUAGES } from '../../context/AppContext';

const NAV_ITEMS = [
  { key: 'commerce',  labelKey: 'nav_commerce',  sub: 'Multilingual' },
  { key: 'defi',      labelKey: 'nav_defi',       sub: 'Hints' },
  { key: 'talent',    labelKey: 'nav_talent',      sub: 'Secondary' },
  { key: 'knowledge', labelKey: 'nav_knowledge',   sub: 'Hint' },
];

/* Connection status languages shown in top-right dropdown */
const CONNECTION_LANGS = [
  { code: 'ar', label: 'Arabic',  flag: '🇦🇪' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'French',  flag: '🇫🇷' },
  { code: 'zh', label: 'Chinese', flag: '🇨🇳' },
  { code: 'es', label: 'Spanish', flag: '🇪🇸' },
];

function ConnectionStatusBlock({ language, setLanguage }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* Trigger row: globe + wifi + user icons */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl transition-all duration-200"
        style={{
          background: open ? 'rgba(118,251,211,0.12)' : 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(118,251,211,0.22)',
          boxShadow: open ? '0 0 16px rgba(118,251,211,0.2)' : 'none',
        }}
      >
        <Globe2 size={14} style={{ color: '#76fbd3' }} />
        <Wifi size={13} style={{ color: '#16b5ec' }} />
        <User size={13} style={{ color: 'rgba(226,232,240,0.6)' }} />
        <ChevronDown
          size={11}
          style={{ color: 'rgba(118,251,211,0.6)', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute right-0 top-full mt-2 w-48 rounded-2xl overflow-hidden z-50"
            style={{
              background: 'rgba(4,8,18,0.97)',
              border: '1px solid rgba(118,251,211,0.22)',
              boxShadow: '0 0 40px rgba(118,251,211,0.15), 0 20px 40px rgba(0,0,0,0.5)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
            }}
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
          >
            {/* Header */}
            <div
              className="px-4 py-2.5 flex items-center gap-2"
              style={{ borderBottom: '1px solid rgba(118,251,211,0.1)' }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: '#76fbd3', boxShadow: '0 0 6px #76fbd3' }}
              />
              <span className="text-xs font-medium" style={{ color: 'rgba(118,251,211,0.8)' }}>
                Connected
              </span>
            </div>

            {/* Language list */}
            {CONNECTION_LANGS.map((lang) => (
              <button
                key={lang.code}
                onClick={() => { setLanguage(lang.code); setOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-150 text-left"
                style={{
                  background: language === lang.code ? 'rgba(118,251,211,0.1)' : 'transparent',
                  color: language === lang.code ? '#76fbd3' : 'rgba(226,232,240,0.75)',
                  borderBottom: '1px solid rgba(118,251,211,0.05)',
                }}
                onMouseEnter={e => { if (language !== lang.code) e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                onMouseLeave={e => { if (language !== lang.code) e.currentTarget.style.background = 'transparent'; }}
              >
                <span className="text-base">{lang.flag}</span>
                <span className="font-medium text-xs">{lang.label}</span>
                {language === lang.code && (
                  <span className="ml-auto text-xs" style={{ color: '#76fbd3' }}>✓</span>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

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
  const { setActiveNavModal, openOnboarding, t, language, setLanguage } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

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
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-4">

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
              <span style={{ color: '#e2e8f0' }}>Connect</span>
              <span style={{ color: '#76fbd3', textShadow: '0 0 12px rgba(118,251,211,0.5)' }}>Global</span>
            </span>
          </motion.div>

          {/* ── Desktop Nav ── */}
          <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.key}
                label={t(item.labelKey)}
                sub={item.sub}
                onClick={() => setActiveNavModal(item.key)}
              />
            ))}
            <NavLink label={t('nav_resources')} sub="" onClick={() => {}} />
          </div>

          {/* ── Right Controls ── */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            {/* Connection status block with flags */}
            <div className="hidden md:block">
              <ConnectionStatusBlock language={language} setLanguage={setLanguage} />
            </div>

            {/* Pill CTA button */}
            <motion.button
              onClick={openOnboarding}
              className="hidden md:flex items-center gap-2 font-orbitron text-xs font-bold tracking-wider pill-btn-primary"
              whileHover={{
                scale: 1.04,
                boxShadow: '0 0 32px rgba(118,251,211,0.5)',
              }}
              whileTap={{ scale: 0.97 }}
            >
              START GLOBAL JOURNEY
            </motion.button>

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
                  <span className="uppercase text-xs font-semibold tracking-wide">{t(item.labelKey)}</span>
                  {item.sub && (
                    <span className="block text-xs mt-0.5" style={{ color: 'rgba(118,251,211,0.45)' }}>
                      ⊕ {item.sub}
                    </span>
                  )}
                </button>
              ))}
              <div className="pt-2 flex items-center gap-3">
                <ConnectionStatusBlock language={language} setLanguage={setLanguage} />
                <button
                  onClick={() => { openOnboarding(); setMobileOpen(false); }}
                  className="flex-1 py-3 rounded-full font-orbitron text-xs font-bold tracking-wider pill-btn-primary"
                >
                  START GLOBAL JOURNEY
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
