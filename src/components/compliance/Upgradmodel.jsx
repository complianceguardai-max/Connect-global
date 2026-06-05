import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, Calendar, X, CalendarDays } from 'lucide-react';

export default function Upgradmodel({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div 
          className="absolute inset-0 backdrop-blur-md" 
          style={{ background: 'rgba(10, 22, 40, 0.8)' }}
          onClick={onClose} 
        />

        <motion.div
          className="relative w-full max-w-2xl rounded-2xl overflow-hidden"
          style={{ 
            background: 'linear-gradient(180deg, rgba(20, 25, 35, 0.95) 0%, rgba(10, 15, 25, 0.95) 100%)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            boxShadow: '0 0 40px rgba(245, 158, 11, 0.15), 0 20px 40px rgba(0,0,0,0.8)'
          }}
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          <div 
            className="absolute top-0 left-0 right-0 h-1" 
            style={{ 
              background: 'linear-gradient(90deg, transparent, rgba(245, 158, 11, 0.8), transparent)',
              boxShadow: '0 0 15px rgba(245, 158, 11, 0.5)'
            }} 
          />

          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>

          <div className="p-8 md:p-10 flex flex-col items-center text-center">
            <div className="mb-4 p-3 rounded-2xl" style={{ border: '1px solid rgba(245, 158, 11, 0.4)', background: 'rgba(245, 158, 11, 0.05)' }}>
              <Shield size={32} style={{ color: '#f59e0b' }} />
            </div>

            <h2 className="font-orbitron font-bold text-2xl md:text-3xl mb-4 tracking-wide" style={{ color: '#fcd34d' }}>
              Enterprise Compliance Upgrade
            </h2>

            <p className="text-sm md:text-base leading-relaxed mb-8 max-w-lg" style={{ color: 'rgba(226, 232, 240, 0.8)' }}>
              To deploy this premium module and secure your infrastructure against the <span className="font-bold text-white">€35M EU AI Act penalty</span>, please schedule a technical integration call with our engineering team.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-8">
              <div className="flex flex-col items-center p-4 rounded-xl cursor-pointer hover:bg-white/5 transition-all" style={{ border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                <Shield size={20} className="mb-2" style={{ color: '#fbbf24' }} />
                <span className="font-bold text-sm text-white mb-1">Full Compliance</span>
                <span className="text-xs" style={{ color: 'rgba(226, 232, 240, 0.6)' }}>EU AI Act Ready</span>
              </div>

              <div className="flex flex-col items-center p-4 rounded-xl cursor-pointer hover:bg-white/5 transition-all" style={{ border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                <Lock size={20} className="mb-2" style={{ color: '#fbbf24' }} />
                <span className="font-bold text-sm text-white mb-1">Secure Deploy</span>
                <span className="text-xs" style={{ color: 'rgba(226, 232, 240, 0.6)' }}>Enterprise Grade</span>
              </div>

              <div className="flex flex-col items-center p-4 rounded-xl cursor-pointer hover:bg-white/5 transition-all" style={{ border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                <Calendar size={20} className="mb-2" style={{ color: '#fbbf24' }} />
                <span className="font-bold text-sm text-white mb-1">Fast Setup</span>
                <span className="text-xs" style={{ color: 'rgba(226, 232, 240, 0.6)' }}>48hr Integration</span>
              </div>
            </div>

            <button className="w-full max-w-md py-4 rounded-xl font-orbitron font-bold text-sm tracking-widest flex items-center justify-center gap-2 transition-all hover:scale-105" 
              style={{ 
                background: 'linear-gradient(90deg, rgba(245, 158, 11, 0.2), rgba(217, 119, 6, 0.2))',
                border: '1px solid rgba(245, 158, 11, 0.5)',
                color: '#fbbf24',
                boxShadow: '0 0 20px rgba(245, 158, 11, 0.2)'
              }}
            >
              <CalendarDays size={18} />
              Book Technical Demo
            </button>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs" style={{ color: 'rgba(226, 232, 240, 0.5)' }}>
              <Lock size={12} />
              <span>Enterprise-grade security • 30-day money-back guarantee • 24/7 support</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}