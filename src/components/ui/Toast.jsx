import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Info } from 'lucide-react';
import { useEffect } from 'react';

export default function Toast({ message, type = 'info', onClose, duration = 3000 }) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const icons = {
    success: CheckCircle,
    info: Info,
  };

  const Icon = icons[type] || Info;

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl max-w-md"
      style={{
        background: 'rgba(10, 22, 40, 0.98)',
        border: '1px solid rgba(118, 251, 211, 0.3)',
        boxShadow: '0 0 40px rgba(118, 251, 211, 0.2), 0 20px 40px rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
      }}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <Icon size={20} style={{ color: '#76fbd3', flexShrink: 0 }} />
      <p className="text-sm flex-1" style={{ color: 'rgba(226, 232, 240, 0.9)' }}>
        {message}
      </p>
      <button
        onClick={onClose}
        className="p-1 rounded-lg transition-colors"
        style={{ color: 'rgba(226, 232, 240, 0.5)' }}
        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
      >
        <X size={16} />
      </button>
    </motion.div>
  );
}

export function ToastContainer({ toasts, removeToast }) {
  return (
    <AnimatePresence>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
          duration={toast.duration}
        />
      ))}
    </AnimatePresence>
  );
}
