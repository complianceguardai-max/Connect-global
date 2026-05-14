import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown } from 'lucide-react';
import { useApp, LANGUAGES } from '../../context/AppContext';

export default function LanguageSelector() {
  const { language, setLanguage } = useApp();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const current = LANGUAGES[language];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200"
        style={{
          background: open ? 'rgba(118,251,211,0.1)' : 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(118,251,211,0.2)',
          color: '#76fbd3',
        }}
      >
        <Globe size={15} />
        <span className="text-sm font-medium">{current.flag} {current.code.toUpperCase()}</span>
        <ChevronDown size={13} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute right-0 top-full mt-2 w-44 rounded-xl overflow-hidden z-50"
            style={{
              background: 'rgba(5,8,15,0.97)',
              border: '1px solid rgba(118,251,211,0.2)',
              boxShadow: '0 0 30px rgba(118,251,211,0.1)',
            }}
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
          >
            {Object.values(LANGUAGES).map((lang) => (
              <button
                key={lang.code}
                onClick={() => { setLanguage(lang.code); setOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm transition-all duration-150 text-left"
                style={{
                  background: language === lang.code ? 'rgba(118,251,211,0.1)' : 'transparent',
                  color: language === lang.code ? '#76fbd3' : 'rgba(226,232,240,0.7)',
                  borderBottom: '1px solid rgba(118,251,211,0.06)',
                }}
                onMouseEnter={e => { if (language !== lang.code) e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                onMouseLeave={e => { if (language !== lang.code) e.currentTarget.style.background = 'transparent'; }}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="font-medium">{lang.label}</span>
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
