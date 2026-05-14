import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Globe2, ShoppingCart, Coins, Users, BookOpen, Building2, CheckCircle, Copy, Rocket, ChevronRight, ChevronLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const USE_CASES = [
  { id: 'commerce', icon: ShoppingCart, label: 'Global Commerce', desc: 'Cross-border trade & supply chain', color: '#76fbd3' },
  { id: 'defi', icon: Coins, label: 'DeFi & Finance', desc: 'Stablecoins, liquidity & payments', color: '#16b5ec' },
  { id: 'talent', icon: Users, label: 'International Talent', desc: 'Hire globally, manage compliance', color: '#a78bfa' },
  { id: 'knowledge', icon: BookOpen, label: 'Knowledge Sharing', desc: 'Research, compliance & AI Act', color: '#76fbd3' },
];

const INDUSTRIES = ['Technology', 'Finance & Banking', 'Healthcare', 'Manufacturing', 'Retail & E-commerce', 'Logistics', 'Legal Services', 'Education', 'Energy', 'Other'];
const JURISDICTIONS = ['European Union', 'United States', 'United Arab Emirates', 'United Kingdom', 'Singapore', 'Japan', 'Brazil', 'Australia', 'Canada', 'India'];

const STEPS = [
  { title: 'Welcome', subtitle: 'Choose your primary use case' },
  { title: 'Company Profile', subtitle: 'Tell us about your organization' },
  { title: 'Compliance Setup', subtitle: 'Select your jurisdictions & preferences' },
  { title: 'Integration', subtitle: 'Your API credentials & webhook' },
  { title: 'Launch', subtitle: 'You\'re ready to go global!' },
];

const FAKE_API_KEY = 'cg_live_sk_' + Math.random().toString(36).substring(2, 18).toUpperCase();
const FAKE_WEBHOOK = 'https://api.connectglobal.io/webhooks/' + Math.random().toString(36).substring(2, 10);

export default function OnboardingModal() {
  const { showOnboarding, setShowOnboarding, onboardingStep, setOnboardingStep } = useApp();
  const [selectedUseCase, setSelectedUseCase] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const [country, setCountry] = useState('');
  const [industry, setIndustry] = useState('');
  const [selectedJurisdictions, setSelectedJurisdictions] = useState([]);
  const [copied, setCopied] = useState(null);
  const [particles, setParticles] = useState([]);

  const onClose = () => { setShowOnboarding(false); setOnboardingStep(0); };

  const next = () => {
    if (onboardingStep < 4) setOnboardingStep(s => s + 1);
    if (onboardingStep === 3) {
      // Generate particles for launch
      setParticles(Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 0.5,
        color: Math.random() > 0.5 ? '#76fbd3' : '#16b5ec',
      })));
    }
  };
  const prev = () => { if (onboardingStep > 0) setOnboardingStep(s => s - 1); };

  const toggleJurisdiction = (j) => {
    setSelectedJurisdictions(prev =>
      prev.includes(j) ? prev.filter(x => x !== j) : [...prev, j]
    );
  };

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const canNext = () => {
    if (onboardingStep === 0) return !!selectedUseCase;
    if (onboardingStep === 1) return companyName.trim().length > 0;
    return true;
  };

  if (!showOnboarding) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        className="relative w-full max-w-2xl rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(5,8,15,0.98)',
          border: '1px solid rgba(118,251,211,0.2)',
          boxShadow: '0 0 60px rgba(118,251,211,0.1)',
        }}
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        {/* Progress bar */}
        <div className="h-1 w-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <motion.div
            className="h-full"
            style={{ background: 'linear-gradient(90deg, #76fbd3, #16b5ec)' }}
            animate={{ width: `${((onboardingStep + 1) / 5) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: '1px solid rgba(118,251,211,0.1)' }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(118,251,211,0.1)', border: '1px solid rgba(118,251,211,0.25)' }}>
              <Globe2 size={18} style={{ color: '#76fbd3' }} />
            </div>
            <div>
              <h2 className="font-orbitron font-bold text-base" style={{ color: '#76fbd3' }}>
                {STEPS[onboardingStep].title}
              </h2>
              <p className="text-xs" style={{ color: 'rgba(226,232,240,0.4)' }}>
                Step {onboardingStep + 1} of 5 — {STEPS[onboardingStep].subtitle}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg transition-all hover:scale-110"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(118,251,211,0.15)', color: 'rgba(226,232,240,0.5)' }}>
            <X size={16} />
          </button>
        </div>

        {/* Step indicators */}
        <div className="flex items-center justify-center gap-2 px-6 py-3" style={{ borderBottom: '1px solid rgba(118,251,211,0.06)' }}>
          {STEPS.map((step, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
                style={{
                  background: i < onboardingStep ? 'rgba(118,251,211,0.2)' : i === onboardingStep ? 'rgba(118,251,211,0.15)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${i <= onboardingStep ? 'rgba(118,251,211,0.4)' : 'rgba(255,255,255,0.1)'}`,
                  color: i <= onboardingStep ? '#76fbd3' : 'rgba(226,232,240,0.3)',
                }}>
                {i < onboardingStep ? <CheckCircle size={12} /> : i + 1}
              </div>
              {i < 4 && <div className="w-8 h-0.5 rounded" style={{ background: i < onboardingStep ? 'rgba(118,251,211,0.4)' : 'rgba(255,255,255,0.08)' }} />}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 min-h-72">
          <AnimatePresence mode="wait">
            {/* Step 0: Use Case */}
            {onboardingStep === 0 && (
              <motion.div key="step0" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
                <p className="text-sm mb-4" style={{ color: 'rgba(226,232,240,0.5)' }}>Select your primary use case to personalize your ConnectGlobal experience:</p>
                <div className="grid grid-cols-2 gap-3">
                  {USE_CASES.map(uc => {
                    const Icon = uc.icon;
                    const selected = selectedUseCase === uc.id;
                    return (
                      <motion.button key={uc.id} onClick={() => setSelectedUseCase(uc.id)}
                        className="p-4 rounded-xl text-left transition-all duration-200"
                        style={{
                          background: selected ? `${uc.color}12` : 'rgba(255,255,255,0.03)',
                          border: `1px solid ${selected ? uc.color + '40' : 'rgba(255,255,255,0.08)'}`,
                          boxShadow: selected ? `0 0 20px ${uc.color}15` : 'none',
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                          style={{ background: `${uc.color}15`, border: `1px solid ${uc.color}25` }}>
                          <Icon size={20} style={{ color: uc.color }} />
                        </div>
                        <p className="text-sm font-semibold mb-1" style={{ color: selected ? uc.color : 'rgba(226,232,240,0.85)' }}>{uc.label}</p>
                        <p className="text-xs" style={{ color: 'rgba(226,232,240,0.4)' }}>{uc.desc}</p>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Step 1: Company Profile */}
            {onboardingStep === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs mb-1.5 block font-medium" style={{ color: 'rgba(226,232,240,0.6)' }}>Company / Organization Name *</label>
                    <input className="input-glass w-full px-4 py-3 rounded-xl text-sm" placeholder="e.g. Acme Global Corp"
                      value={companyName} onChange={e => setCompanyName(e.target.value)} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs mb-1.5 block font-medium" style={{ color: 'rgba(226,232,240,0.6)' }}>Country of Registration</label>
                      <input className="input-glass w-full px-4 py-3 rounded-xl text-sm" placeholder="e.g. United Arab Emirates"
                        value={country} onChange={e => setCountry(e.target.value)} />
                    </div>
                    <div>
                      <label className="text-xs mb-1.5 block font-medium" style={{ color: 'rgba(226,232,240,0.6)' }}>Industry</label>
                      <select className="select-glass w-full px-4 py-3 rounded-xl text-sm" value={industry} onChange={e => setIndustry(e.target.value)}>
                        <option value="">Select industry...</option>
                        {INDUSTRIES.map(i => <option key={i}>{i}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs mb-1.5 block font-medium" style={{ color: 'rgba(226,232,240,0.6)' }}>Company Size</label>
                    <div className="grid grid-cols-4 gap-2">
                      {['1-10', '11-50', '51-200', '200+'].map(size => (
                        <button key={size} className="py-2.5 rounded-lg text-xs font-medium transition-all"
                          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(118,251,211,0.12)', color: 'rgba(226,232,240,0.6)' }}
                          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(118,251,211,0.35)'; e.currentTarget.style.color = '#76fbd3'; }}
                          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(118,251,211,0.12)'; e.currentTarget.style.color = 'rgba(226,232,240,0.6)'; }}>
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Compliance */}
            {onboardingStep === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
                <p className="text-sm mb-4" style={{ color: 'rgba(226,232,240,0.5)' }}>Select all jurisdictions where you operate or plan to operate:</p>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {JURISDICTIONS.map(j => {
                    const selected = selectedJurisdictions.includes(j);
                    return (
                      <button key={j} onClick={() => toggleJurisdiction(j)}
                        className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs text-left transition-all"
                        style={{
                          background: selected ? 'rgba(118,251,211,0.1)' : 'rgba(255,255,255,0.03)',
                          border: `1px solid ${selected ? 'rgba(118,251,211,0.35)' : 'rgba(255,255,255,0.08)'}`,
                          color: selected ? '#76fbd3' : 'rgba(226,232,240,0.6)',
                        }}>
                        <div className="w-4 h-4 rounded flex items-center justify-center shrink-0"
                          style={{ background: selected ? 'rgba(118,251,211,0.2)' : 'rgba(255,255,255,0.05)', border: `1px solid ${selected ? '#76fbd3' : 'rgba(255,255,255,0.15)'}` }}>
                          {selected && <CheckCircle size={10} style={{ color: '#76fbd3' }} />}
                        </div>
                        {j}
                      </button>
                    );
                  })}
                </div>
                <div className="rounded-lg p-3" style={{ background: 'rgba(22,181,236,0.06)', border: '1px solid rgba(22,181,236,0.15)' }}>
                  <p className="text-xs" style={{ color: 'rgba(226,232,240,0.5)' }}>
                    <span style={{ color: '#16b5ec' }}>ℹ</span> ConnectGlobal will automatically apply the relevant compliance rules, tax rates, and legal frameworks for your selected jurisdictions.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Step 3: Integration */}
            {onboardingStep === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
                <p className="text-sm mb-4" style={{ color: 'rgba(226,232,240,0.5)' }}>Your API credentials have been generated. Keep these secure.</p>
                <div className="space-y-4">
                  {[
                    { label: 'API Key', value: FAKE_API_KEY, key: 'api' },
                    { label: 'Webhook URL', value: FAKE_WEBHOOK, key: 'webhook' },
                  ].map(({ label, value, key }) => (
                    <div key={key}>
                      <label className="text-xs mb-1.5 block font-medium" style={{ color: 'rgba(226,232,240,0.5)' }}>{label}</label>
                      <div className="flex items-center gap-2 px-4 py-3 rounded-xl"
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(118,251,211,0.15)' }}>
                        <code className="flex-1 text-xs font-mono-code truncate" style={{ color: '#76fbd3' }}>{value}</code>
                        <button onClick={() => copyToClipboard(value, key)}
                          className="shrink-0 p-1.5 rounded transition-all hover:scale-110"
                          style={{ color: copied === key ? '#76fbd3' : 'rgba(226,232,240,0.4)', background: 'rgba(118,251,211,0.08)' }}>
                          {copied === key ? <CheckCircle size={14} /> : <Copy size={14} />}
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="rounded-xl p-4" style={{ background: 'rgba(118,251,211,0.04)', border: '1px solid rgba(118,251,211,0.12)' }}>
                    <h4 className="text-xs font-semibold mb-2" style={{ color: '#76fbd3' }}>Quick Start</h4>
                    <pre className="text-xs font-mono-code overflow-x-auto" style={{ color: 'rgba(226,232,240,0.6)' }}>
{`curl -X POST https://api.connectglobal.io/v1/connect \\
  -H "Authorization: Bearer ${FAKE_API_KEY.slice(0, 20)}..." \\
  -H "Content-Type: application/json" \\
  -d '{"jurisdiction": "UAE", "service": "commerce"}'`}
                    </pre>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Launch */}
            {onboardingStep === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}
                className="text-center py-4 relative overflow-hidden">
                {/* Particles */}
                {particles.map(p => (
                  <motion.div key={p.id} className="absolute w-2 h-2 rounded-full pointer-events-none"
                    style={{ left: `${p.x}%`, top: '50%', background: p.color, boxShadow: `0 0 6px ${p.color}` }}
                    initial={{ y: 0, opacity: 1, scale: 1 }}
                    animate={{ y: -200, opacity: 0, scale: 0, x: (Math.random() - 0.5) * 200 }}
                    transition={{ duration: 1.5, delay: p.delay, ease: 'easeOut' }}
                  />
                ))}

                <motion.div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{
                    background: 'linear-gradient(135deg, rgba(118,251,211,0.2), rgba(22,181,236,0.15))',
                    border: '2px solid rgba(118,251,211,0.4)',
                    boxShadow: '0 0 40px rgba(118,251,211,0.3)',
                  }}
                  animate={{ scale: [1, 1.05, 1], boxShadow: ['0 0 40px rgba(118,251,211,0.3)', '0 0 60px rgba(118,251,211,0.5)', '0 0 40px rgba(118,251,211,0.3)'] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Rocket size={36} style={{ color: '#76fbd3' }} />
                </motion.div>

                <h3 className="font-orbitron font-black text-2xl mb-2" style={{ color: '#76fbd3', textShadow: '0 0 20px rgba(118,251,211,0.5)' }}>
                  You're Live!
                </h3>
                <p className="text-sm mb-6" style={{ color: 'rgba(226,232,240,0.5)' }}>
                  {companyName || 'Your organization'} is now connected to the global network across {selectedJurisdictions.length || 'all'} jurisdictions.
                </p>

                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[
                    { label: 'Jurisdictions', value: selectedJurisdictions.length || '195+' },
                    { label: 'Services Active', value: '4' },
                    { label: 'Network Nodes', value: '847' },
                  ].map(s => (
                    <div key={s.label} className="rounded-xl p-3" style={{ background: 'rgba(118,251,211,0.06)', border: '1px solid rgba(118,251,211,0.15)' }}>
                      <p className="text-xl font-bold font-orbitron" style={{ color: '#76fbd3' }}>{s.value}</p>
                      <p className="text-xs mt-0.5" style={{ color: 'rgba(226,232,240,0.4)' }}>{s.label}</p>
                    </div>
                  ))}
                </div>

                <motion.button onClick={onClose}
                  className="px-8 py-3 rounded-xl font-orbitron font-bold text-sm tracking-wider"
                  style={{
                    background: 'linear-gradient(135deg, rgba(118,251,211,0.2), rgba(22,181,236,0.15))',
                    border: '1px solid rgba(118,251,211,0.4)',
                    color: '#76fbd3',
                    boxShadow: '0 0 30px rgba(118,251,211,0.2)',
                  }}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(118,251,211,0.35)' }}
                  whileTap={{ scale: 0.97 }}
                >
                  Enter Dashboard
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer nav */}
        {onboardingStep < 4 && (
          <div className="flex items-center justify-between px-6 py-4" style={{ borderTop: '1px solid rgba(118,251,211,0.08)' }}>
            <button onClick={prev} disabled={onboardingStep === 0}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all disabled:opacity-30"
              style={{ color: 'rgba(226,232,240,0.5)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <ChevronLeft size={16} /> Back
            </button>
            <motion.button onClick={next} disabled={!canNext()}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-40"
              style={{
                background: 'linear-gradient(135deg, rgba(118,251,211,0.2), rgba(22,181,236,0.15))',
                border: '1px solid rgba(118,251,211,0.35)',
                color: '#76fbd3',
              }}
              whileHover={{ scale: canNext() ? 1.03 : 1 }}
              whileTap={{ scale: canNext() ? 0.97 : 1 }}
            >
              {onboardingStep === 3 ? 'Launch' : 'Continue'} <ChevronRight size={16} />
            </motion.button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
