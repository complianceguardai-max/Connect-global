import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect } from 'react';

export default function ModalOverlay({ isOpen, onClose, title, subtitle, children, size = 'lg', accent = 'mint' }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const sizeClasses = {
    sm: 'max-w-lg',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    full: 'max-w-7xl',
  };

  const accentColor = accent === 'mint' ? '#76fbd3' : '#16b5ec';
  const accentGlow = accent === 'mint'
    ? '0 0 40px rgba(118,251,211,0.15), 0 0 80px rgba(118,251,211,0.05)'
    : '0 0 40px rgba(22,181,236,0.15), 0 0 80px rgba(22,181,236,0.05)';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className={`relative w-full ${sizeClasses[size]} max-h-[90vh] flex flex-col rounded-2xl overflow-hidden`}
            style={{
              background: 'rgba(5, 8, 15, 0.95)',
              border: `1px solid ${accentColor}30`,
              boxShadow: accentGlow,
            }}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.99 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {/* Header */}
            <div
              className="flex items-start justify-between p-6 border-b shrink-0"
              style={{ borderColor: `${accentColor}20` }}
            >
              <div>
                <h2
                  className="font-orbitron text-xl md:text-2xl font-bold"
                  style={{ color: accentColor, textShadow: `0 0 20px ${accentColor}60` }}
                >
                  {title}
                </h2>
                {subtitle && (
                  <p className="text-sm mt-1" style={{ color: 'rgba(226,232,240,0.5)' }}>
                    {subtitle}
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                className="ml-4 p-2 rounded-lg transition-all duration-200 hover:scale-110 shrink-0"
                style={{
                  background: `${accentColor}15`,
                  border: `1px solid ${accentColor}30`,
                  color: accentColor,
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto scroll-mint p-6">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
