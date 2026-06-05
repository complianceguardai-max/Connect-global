import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Lock, Calendar, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

/**
 * ContactSalesModal - High-end B2B sales funnel modal
 * Glassmorphic design with premium amber/gold styling
 */
export default function ContactSalesModal({ isOpen, onClose }) {
  const { addToast } = useApp();

  const handleBookDemo = () => {
    addToast('Opening Email Client...', 'info');
    
    const email = 'Complianceguard.ai@gmail.com';
    const subject = 'Enterprise Demo Request';
    const body = 'Hello ComplianceGuard Team, I am interested in scheduling a technical integration call for the Enterprise Compliance Upgrade.';
    
    // Professional SaaS fallback: Try opening Gmail Web directly first for a seamless web experience
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    const newWindow = window.open(gmailUrl, '_blank');
    
    // If pop-up block or failed, fallback to native mailto link
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      window.open(`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
    }

    if (onClose) onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(10,22,40,0.95)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            {/* Modal Container */}
            <motion.div
              className="relative w-full max-w-2xl rounded-3xl overflow-hidden"
              style={{
                background: 'rgba(10,22,40,0.95)',
                border: '1px solid rgba(245,158,11,0.3)',
                boxShadow: '0 0 60px rgba(245,158,11,0.3), 0 20px 80px rgba(0,0,0,0.6), inset 0 0 40px rgba(245,158,11,0.08)',
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)',
              }}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Animated Top Border Glow */}
              <motion.div
                className="absolute top-0 left-0 w-full h-1"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.8), rgba(251,191,36,0.8), rgba(245,158,11,0.8), transparent)',
                }}
                animate={{
                  backgroundPosition: ['0% 0%', '200% 0%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 z-10 p-2 rounded-xl transition-all"
                style={{
                  background: 'rgba(245,158,11,0.1)',
                  border: '1px solid rgba(245,158,11,0.2)',
                  color: '#fbbf24',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(245,158,11,0.2)';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(245,158,11,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(245,158,11,0.1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <X size={20} />
              </button>

              {/* Content */}
              <div className="p-8 md:p-12">
                {/* Icon with Glow */}
                <motion.div
                  className="flex justify-center mb-6"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', damping: 15, delay: 0.2 }}
                >
                  <div
                    className="relative w-20 h-20 rounded-2xl flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, rgba(245,158,11,0.2) 0%, rgba(251,191,36,0.2) 100%)',
                      border: '1px solid rgba(245,158,11,0.4)',
                      boxShadow: '0 0 40px rgba(245,158,11,0.4), inset 0 0 30px rgba(245,158,11,0.1)',
                    }}
                  >
                    <Shield size={40} style={{ color: '#fbbf24' }} />
                    
                    {/* Animated Sparkles */}
                    <motion.div
                      className="absolute -top-2 -right-2"
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      <Sparkles size={20} style={{ color: '#fbbf24' }} />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Title */}
                <motion.h2
                  className="font-orbitron font-black text-3xl md:text-4xl text-center mb-4"
                  style={{
                    background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #fbbf24 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textShadow: '0 0 40px rgba(245,158,11,0.3)',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Enterprise Compliance Upgrade
                </motion.h2>

                {/* Message */}
                <motion.p
                  className="text-center text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto"
                  style={{ color: 'rgba(226,232,240,0.8)' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  To deploy this premium module and secure your infrastructure against the{' '}
                  <span
                    className="font-bold"
                    style={{
                      color: '#fbbf24',
                      textShadow: '0 0 10px rgba(245,158,11,0.5)',
                    }}
                  >
                    €35M EU AI Act penalty
                  </span>
                  , please schedule a technical integration call with our engineering team.
                </motion.p>

                {/* Features List - Now Clickable */}
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {[
                    { icon: Shield, label: 'Full Compliance', desc: 'EU AI Act Ready' },
                    { icon: Lock, label: 'Secure Deploy', desc: 'Enterprise Grade' },
                    { icon: Calendar, label: 'Fast Setup', desc: '48hr Integration' },
                  ].map((feature, idx) => (
                    <motion.button
                      key={idx}
                      onClick={handleBookDemo}
                      className="p-4 rounded-xl text-center w-full cursor-pointer"
                      style={{
                        background: 'rgba(245,158,11,0.08)',
                        border: '1px solid rgba(245,158,11,0.2)',
                      }}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: '0 0 25px rgba(245,158,11,0.2)',
                        background: 'rgba(245,158,11,0.15)',
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <feature.icon
                        size={24}
                        className="mx-auto mb-2"
                        style={{ color: '#fbbf24' }}
                      />
                      <h4
                        className="font-orbitron font-bold text-sm mb-1"
                        style={{ color: '#fbbf24' }}
                      >
                        {feature.label}
                      </h4>
                      <p
                        className="text-xs"
                        style={{ color: 'rgba(226,232,240,0.6)' }}
                      >
                        {feature.desc}
                      </p>
                    </motion.button>
                  ))}
                </motion.div>

                {/* CTA Button */}
                <motion.button
                  onClick={handleBookDemo}
                  className="w-full py-5 rounded-xl font-orbitron font-black text-lg tracking-wider flex items-center justify-center gap-3 transition-all"
                  style={{
                    background: 'linear-gradient(135deg, rgba(245,158,11,0.3) 0%, rgba(251,191,36,0.3) 100%)',
                    border: '2px solid rgba(245,158,11,0.6)',
                    color: '#fbbf24',
                    boxShadow: '0 0 40px rgba(245,158,11,0.3), inset 0 0 30px rgba(245,158,11,0.1)',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: '0 0 60px rgba(245,158,11,0.5), inset 0 0 40px rgba(245,158,11,0.15)',
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Calendar size={24} />
                  Book Technical Demo
                </motion.button>

                {/* Trust Badge */}
                <motion.p
                  className="text-center text-xs mt-6"
                  style={{ color: 'rgba(226,232,240,0.5)' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  🔒 Enterprise-grade security • 30-day money-back guarantee • 24/7 support
                </motion.p>
              </div>

              {/* Bottom Glow Effect */}
              <div
                className="absolute bottom-0 left-0 w-full h-32 pointer-events-none"
                style={{
                  background: 'linear-gradient(to top, rgba(245,158,11,0.1), transparent)',
                }}
              />
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}