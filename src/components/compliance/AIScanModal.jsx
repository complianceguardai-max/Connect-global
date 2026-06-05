import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';

/**
 * AI Scan Modal Component
 * Clean, high-performance modal for initiating new AI compliance scans
 */
export default function AIScanModal({ isOpen, onClose, onStartScan }) {
  const [modelName, setModelName] = useState('');
  const [industryFocus, setIndustryFocus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const trimmedModelName = modelName.trim();
    const trimmedIndustryFocus = industryFocus.trim();
    
    if (!trimmedModelName || !trimmedIndustryFocus) {
      return;
    }
    
    onStartScan({ modelName: trimmedModelName, industryFocus: trimmedIndustryFocus });
    setModelName('');
    setIndustryFocus('');
  };

  const handleClose = () => {
    setModelName('');
    setIndustryFocus('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Static solid background to completely block the background glitch canvas */}
          <div 
            className="fixed inset-0 z-[999] bg-[#030818] bg-opacity-95"
            onClick={handleClose}
          />

          {/* Centered Modal Wrapper */}
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              className="relative w-full max-w-md rounded-2xl overflow-hidden pointer-events-auto"
              style={{
                background: 'linear-gradient(135deg, #0a1628 0%, #0f1e32 100%)',
                border: '1px solid rgba(118,251,211,0.3)',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)'
              }}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="px-6 py-5 border-b border-slate-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                      <Sparkles size={20} className="text-[#76fbd3]" />
                    </div>
                    <div>
                      <h3 className="font-orbitron font-bold text-lg text-slate-200">
                        Run New AI Scan
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Analyze AI model compliance
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleClose}
                    className="p-2 rounded-lg transition-all bg-white/5 border border-slate-700 text-slate-400 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-500"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* AI Model Name */}
                <div>
                  <label htmlFor="modelName" className="block text-sm font-medium mb-2 text-slate-300">
                    AI Model Name
                  </label>
                  <input
                    type="text"
                    id="modelName"
                    value={modelName}
                    onChange={(e) => setModelName(e.target.value)}
                    placeholder="e.g., GPT-4, Claude, Custom Model"
                    required
                    className="w-full px-4 py-3 rounded-lg text-sm bg-white/5 border border-slate-700 text-slate-200 outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all"
                  />
                </div>

                {/* Industry Focus */}
                <div>
                  <label htmlFor="industryFocus" className="block text-sm font-medium mb-2 text-slate-300">
                    Industry Focus
                  </label>
                  <select
                    id="industryFocus"
                    value={industryFocus}
                    onChange={(e) => setIndustryFocus(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg text-sm bg-white/5 border border-slate-700 text-slate-200 outline-none focus:border-emerald-500/50 transition-all"
                  >
                    <option value="" className="bg-[#1a2332] text-slate-200">Select Industry</option>
                    <option value="Healthcare" className="bg-[#1a2332] text-slate-200">Healthcare</option>
                    <option value="Finance" className="bg-[#1a2332] text-slate-200">Finance</option>
                    <option value="Education" className="bg-[#1a2332] text-slate-200">Education</option>
                    <option value="Retail" className="bg-[#1a2332] text-slate-200">Retail</option>
                    <option value="Manufacturing" className="bg-[#1a2332] text-slate-200">Manufacturing</option>
                    <option value="Technology" className="bg-[#1a2332] text-slate-200">Technology</option>
                    <option value="Legal" className="bg-[#1a2332] text-slate-200">Legal</option>
                    <option value="Other" className="bg-[#1a2332] text-slate-200">Other</option>
                  </select>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex-1 px-6 py-3 rounded-lg text-sm font-medium bg-white/5 border border-slate-700 text-slate-300 hover:bg-white/10 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!modelName.trim() || !industryFocus.trim()}
                    className="flex-1 px-6 py-3 rounded-lg text-sm font-orbitron font-bold tracking-wide transition-all"
                    style={{
                      background: (!modelName.trim() || !industryFocus.trim())
                        ? 'rgba(148,163,184,0.1)'
                        : 'linear-gradient(135deg, rgba(118,251,211,0.2) 0%, rgba(22,181,236,0.2) 100%)',
                      border: (!modelName.trim() || !industryFocus.trim())
                        ? '1px solid rgba(148,163,184,0.2)'
                        : '1px solid rgba(118,251,211,0.4)',
                      color: (!modelName.trim() || !industryFocus.trim())
                        ? 'rgba(226,232,240,0.3)'
                        : '#76fbd3',
                      cursor: (!modelName.trim() || !industryFocus.trim())
                        ? 'not-allowed'
                        : 'pointer',
                    }}
                  >
                    Start Scan
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}