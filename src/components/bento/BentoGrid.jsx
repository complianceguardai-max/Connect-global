import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

import UnifiedNetworkDive from './deep-dives/UnifiedNetworkDive';
import SecurePaymentsDive from './deep-dives/SecurePaymentsDive';
import InternationalMarketsDive from './deep-dives/InternationalMarketsDive';
import VirtualHQDive from './deep-dives/VirtualHQDive';

/* ── Holographic SVG Illustrations ── */
function GlobeIcon() {
  return (
    <svg viewBox="0 0 120 120" width="110" height="110" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="globeCore" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#76fbd3" stopOpacity="0.35" />
          <stop offset="60%" stopColor="#16b5ec" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#030818" stopOpacity="0.9" />
        </radialGradient>
        <radialGradient id="globeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#76fbd3" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#16b5ec" stopOpacity="0" />
        </radialGradient>
        <filter id="globeBlur">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="softGlow">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <circle cx="60" cy="60" r="52" fill="url(#globeGlow)" />
      <circle cx="60" cy="60" r="40" fill="url(#globeCore)" stroke="#76fbd3" strokeWidth="0.8" strokeOpacity="0.6" filter="url(#globeBlur)" />
      <ellipse cx="60" cy="60" rx="40" ry="12" fill="none" stroke="#76fbd3" strokeWidth="0.5" strokeOpacity="0.4" />
      <ellipse cx="60" cy="60" rx="40" ry="24" fill="none" stroke="#76fbd3" strokeWidth="0.5" strokeOpacity="0.3" />
      <ellipse cx="60" cy="60" rx="40" ry="36" fill="none" stroke="#76fbd3" strokeWidth="0.5" strokeOpacity="0.25" />
      <ellipse cx="60" cy="60" rx="14" ry="40" fill="none" stroke="#16b5ec" strokeWidth="0.5" strokeOpacity="0.35" />
      <ellipse cx="60" cy="60" rx="28" ry="40" fill="none" stroke="#16b5ec" strokeWidth="0.5" strokeOpacity="0.25" />
      <line x1="60" y1="20" x2="60" y2="100" stroke="#76fbd3" strokeWidth="0.5" strokeOpacity="0.3" />
      <line x1="20" y1="60" x2="100" y2="60" stroke="#76fbd3" strokeWidth="0.5" strokeOpacity="0.3" />
      <circle cx="45" cy="48" r="2.5" fill="#76fbd3" filter="url(#softGlow)" />
      <circle cx="72" cy="42" r="2" fill="#16b5ec" filter="url(#softGlow)" />
      <circle cx="80" cy="62" r="2.5" fill="#76fbd3" filter="url(#softGlow)" />
      <circle cx="38" cy="68" r="2" fill="#16b5ec" filter="url(#softGlow)" />
      <circle cx="60" cy="55" r="3" fill="#76fbd3" filter="url(#softGlow)" />
      <path d="M45 48 Q58 38 72 42" stroke="#76fbd3" strokeWidth="0.8" strokeOpacity="0.6" fill="none" />
      <path d="M72 42 Q80 52 80 62" stroke="#16b5ec" strokeWidth="0.8" strokeOpacity="0.5" fill="none" />
      <path d="M45 48 Q42 58 38 68" stroke="#76fbd3" strokeWidth="0.8" strokeOpacity="0.5" fill="none" />
      <path d="M38 68 Q50 72 60 55" stroke="#16b5ec" strokeWidth="0.8" strokeOpacity="0.4" fill="none" />
      <ellipse cx="60" cy="60" rx="52" ry="16" fill="none" stroke="#76fbd3" strokeWidth="0.6" strokeOpacity="0.25" strokeDasharray="4 3" transform="rotate(-20 60 60)" />
      <circle cx="108" cy="55" r="3" fill="#76fbd3" filter="url(#softGlow)" />
      <ellipse cx="60" cy="105" rx="28" ry="5" fill="#76fbd3" fillOpacity="0.12" />
    </svg>
  );
}

function PaymentsIcon() {
  return (
    <svg viewBox="0 0 120 120" width="110" height="110" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="chipGlow2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#16b5ec" stopOpacity="0" />
        </radialGradient>
        <filter id="goldGlow2">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="lockGlow2">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <circle cx="60" cy="60" r="50" fill="url(#chipGlow2)" />
      <rect x="28" y="38" width="64" height="44" rx="6" fill="rgba(22,181,236,0.12)" stroke="#16b5ec" strokeWidth="1" strokeOpacity="0.6" />
      <rect x="38" y="46" width="44" height="28" rx="3" fill="rgba(22,181,236,0.08)" stroke="#76fbd3" strokeWidth="0.6" strokeOpacity="0.5" />
      <line x1="20" y1="46" x2="28" y2="46" stroke="#16b5ec" strokeWidth="1.5" strokeOpacity="0.7" />
      <line x1="20" y1="54" x2="28" y2="54" stroke="#16b5ec" strokeWidth="1.5" strokeOpacity="0.7" />
      <line x1="20" y1="62" x2="28" y2="62" stroke="#16b5ec" strokeWidth="1.5" strokeOpacity="0.7" />
      <line x1="20" y1="70" x2="28" y2="70" stroke="#16b5ec" strokeWidth="1.5" strokeOpacity="0.7" />
      <line x1="92" y1="46" x2="100" y2="46" stroke="#16b5ec" strokeWidth="1.5" strokeOpacity="0.7" />
      <line x1="92" y1="54" x2="100" y2="54" stroke="#16b5ec" strokeWidth="1.5" strokeOpacity="0.7" />
      <line x1="92" y1="62" x2="100" y2="62" stroke="#16b5ec" strokeWidth="1.5" strokeOpacity="0.7" />
      <line x1="92" y1="70" x2="100" y2="70" stroke="#16b5ec" strokeWidth="1.5" strokeOpacity="0.7" />
      <ellipse cx="75" cy="72" rx="14" ry="5" fill="#f59e0b" fillOpacity="0.85" filter="url(#goldGlow2)" />
      <rect x="61" y="58" width="28" height="14" rx="0" fill="#d97706" fillOpacity="0.7" />
      <ellipse cx="75" cy="58" rx="14" ry="5" fill="#fbbf24" fillOpacity="0.9" filter="url(#goldGlow2)" />
      <ellipse cx="75" cy="54" rx="14" ry="5" fill="#f59e0b" fillOpacity="0.85" />
      <ellipse cx="75" cy="50" rx="14" ry="5" fill="#fbbf24" fillOpacity="0.9" filter="url(#goldGlow2)" />
      <text x="75" y="53" textAnchor="middle" fontSize="7" fill="#92400e" fontWeight="bold">$</text>
      <rect x="44" y="54" width="16" height="13" rx="2" fill="rgba(118,251,211,0.2)" stroke="#76fbd3" strokeWidth="1" filter="url(#lockGlow2)" />
      <path d="M47 54 Q47 48 52 48 Q57 48 57 54" stroke="#76fbd3" strokeWidth="1.5" fill="none" />
      <circle cx="52" cy="60" r="2" fill="#76fbd3" />
      <path d="M38 50 L30 50 L30 42 L38 42" stroke="#76fbd3" strokeWidth="0.5" strokeOpacity="0.4" fill="none" />
      <path d="M82 50 L90 50 L90 42 L82 42" stroke="#76fbd3" strokeWidth="0.5" strokeOpacity="0.4" fill="none" />
    </svg>
  );
}

function MarketsIcon() {
  return (
    <svg viewBox="0 0 120 120" width="110" height="110" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="marketGlow3" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#76fbd3" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#16b5ec" stopOpacity="0" />
        </radialGradient>
        <filter id="barGlow3">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <circle cx="60" cy="60" r="50" fill="url(#marketGlow3)" />
      <path d="M22 32 L30 32 L38 68 L88 68 L96 44 L34 44" stroke="#76fbd3" strokeWidth="1.5" fill="none" strokeLinejoin="round" filter="url(#barGlow3)" />
      <circle cx="46" cy="76" r="5" fill="none" stroke="#76fbd3" strokeWidth="1.5" filter="url(#barGlow3)" />
      <circle cx="78" cy="76" r="5" fill="none" stroke="#76fbd3" strokeWidth="1.5" filter="url(#barGlow3)" />
      <rect x="44" y="52" width="7" height="12" rx="1" fill="#76fbd3" fillOpacity="0.7" filter="url(#barGlow3)" />
      <rect x="54" y="46" width="7" height="18" rx="1" fill="#16b5ec" fillOpacity="0.8" filter="url(#barGlow3)" />
      <rect x="64" y="50" width="7" height="14" rx="1" fill="#76fbd3" fillOpacity="0.7" filter="url(#barGlow3)" />
      <rect x="74" y="44" width="7" height="20" rx="1" fill="#16b5ec" fillOpacity="0.9" filter="url(#barGlow3)" />
      <path d="M44 58 L58 50 L68 54 L84 44" stroke="#76fbd3" strokeWidth="1.2" fill="none" strokeDasharray="2 1" />
      <text x="95" y="38" fontSize="9" fill="#f59e0b" fillOpacity="0.9" fontWeight="bold">$</text>
      <text x="18" y="50" fontSize="8" fill="#76fbd3" fillOpacity="0.7">€</text>
      <text x="100" y="58" fontSize="8" fill="#16b5ec" fillOpacity="0.8">¥</text>
      <circle cx="95" cy="85" r="10" fill="none" stroke="#76fbd3" strokeWidth="0.8" strokeOpacity="0.5" />
      <ellipse cx="95" cy="85" rx="10" ry="4" fill="none" stroke="#76fbd3" strokeWidth="0.5" strokeOpacity="0.4" />
      <line x1="95" y1="75" x2="95" y2="95" stroke="#76fbd3" strokeWidth="0.5" strokeOpacity="0.4" />
      <circle cx="25" cy="85" r="3" fill="#76fbd3" fillOpacity="0.6" />
      <circle cx="40" cy="90" r="3" fill="#16b5ec" fillOpacity="0.6" />
      <circle cx="55" cy="85" r="3" fill="#76fbd3" fillOpacity="0.6" />
      <path d="M25 85 L40 90 L55 85" stroke="#76fbd3" strokeWidth="0.8" strokeOpacity="0.4" fill="none" />
    </svg>
  );
}

function CollaborationIcon() {
  return (
    <svg viewBox="0 0 120 120" width="110" height="110" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="collabGlow4" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#16b5ec" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#76fbd3" stopOpacity="0" />
        </radialGradient>
        <filter id="screenGlow4">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <circle cx="60" cy="60" r="50" fill="url(#collabGlow4)" />
      <rect x="30" y="28" width="60" height="42" rx="3" fill="rgba(22,181,236,0.12)" stroke="#16b5ec" strokeWidth="1.2" filter="url(#screenGlow4)" />
      <rect x="33" y="31" width="54" height="36" rx="2" fill="rgba(22,181,236,0.08)" />
      <rect x="55" y="70" width="10" height="8" rx="1" fill="rgba(22,181,236,0.3)" />
      <rect x="48" y="78" width="24" height="3" rx="1.5" fill="rgba(22,181,236,0.4)" />
      <rect x="36" y="34" width="14" height="28" rx="1" fill="rgba(118,251,211,0.08)" stroke="#76fbd3" strokeWidth="0.5" strokeOpacity="0.4" />
      <rect x="52" y="34" width="14" height="28" rx="1" fill="rgba(22,181,236,0.08)" stroke="#16b5ec" strokeWidth="0.5" strokeOpacity="0.4" />
      <rect x="68" y="34" width="16" height="28" rx="1" fill="rgba(118,251,211,0.08)" stroke="#76fbd3" strokeWidth="0.5" strokeOpacity="0.4" />
      <rect x="37" y="36" width="12" height="5" rx="1" fill="#76fbd3" fillOpacity="0.5" />
      <rect x="37" y="43" width="12" height="5" rx="1" fill="#76fbd3" fillOpacity="0.35" />
      <rect x="53" y="36" width="12" height="5" rx="1" fill="#16b5ec" fillOpacity="0.6" />
      <rect x="53" y="43" width="12" height="5" rx="1" fill="#16b5ec" fillOpacity="0.4" />
      <rect x="69" y="36" width="13" height="5" rx="1" fill="#76fbd3" fillOpacity="0.5" />
      <rect x="92" y="40" width="22" height="16" rx="2" fill="rgba(118,251,211,0.1)" stroke="#76fbd3" strokeWidth="0.8" filter="url(#screenGlow4)" />
      <rect x="94" y="42" width="18" height="12" rx="1" fill="rgba(118,251,211,0.06)" />
      <polyline points="96,51 100,47 104,49 108,44 112,46" stroke="#76fbd3" strokeWidth="0.8" fill="none" />
      <circle cx="25" cy="88" r="8" fill="rgba(118,251,211,0.15)" stroke="#76fbd3" strokeWidth="1" />
      <circle cx="25" cy="85" r="3" fill="#76fbd3" fillOpacity="0.6" />
      <path d="M18 94 Q25 90 32 94" stroke="#76fbd3" strokeWidth="0.8" fill="none" />
      <circle cx="42" cy="88" r="8" fill="rgba(22,181,236,0.15)" stroke="#16b5ec" strokeWidth="1" />
      <circle cx="42" cy="85" r="3" fill="#16b5ec" fillOpacity="0.6" />
      <path d="M35 94 Q42 90 49 94" stroke="#16b5ec" strokeWidth="0.8" fill="none" />
      <circle cx="59" cy="88" r="8" fill="rgba(118,251,211,0.15)" stroke="#76fbd3" strokeWidth="1" />
      <circle cx="59" cy="85" r="3" fill="#76fbd3" fillOpacity="0.6" />
      <path d="M52 94 Q59 90 66 94" stroke="#76fbd3" strokeWidth="0.8" fill="none" />
      <path d="M25 80 L30 70" stroke="#76fbd3" strokeWidth="0.6" strokeOpacity="0.4" strokeDasharray="2 2" />
      <path d="M42 80 L50 70" stroke="#16b5ec" strokeWidth="0.6" strokeOpacity="0.4" strokeDasharray="2 2" />
      <path d="M59 80 L60 70" stroke="#76fbd3" strokeWidth="0.6" strokeOpacity="0.4" strokeDasharray="2 2" />
    </svg>
  );
}

const CARDS = [
  {
    id: 'network',
    Icon: GlobeIcon,
    titleKey: 'bento_network',
    desc: 'Cryptographically signed model versioning with tamper-proof logging. Every training run, hyperparameter change, and deployment tracked with blockchain-grade immutability for regulatory audits.',
    color: '#76fbd3',
    glowColor: 'rgba(118,251,211,0.25)',
    borderColor: 'rgba(118,251,211,0.28)',
    borderHover: 'rgba(118,251,211,0.6)',
    bgGrad: 'linear-gradient(135deg, rgba(118,251,211,0.09) 0%, rgba(22,181,236,0.06) 100%)',
  },
  {
    id: 'payments',
    Icon: PaymentsIcon,
    titleKey: 'bento_payments',
    desc: 'Continuous fairness monitoring with statistical parity checks, disparate impact analysis, and full dataset provenance tracking. Detect bias before regulators do.',
    color: '#16b5ec',
    glowColor: 'rgba(22,181,236,0.25)',
    borderColor: 'rgba(22,181,236,0.28)',
    borderHover: 'rgba(22,181,236,0.6)',
    bgGrad: 'linear-gradient(135deg, rgba(22,181,236,0.09) 0%, rgba(118,251,211,0.06) 100%)',
  },
  {
    id: 'markets',
    Icon: MarketsIcon,
    titleKey: 'bento_markets',
    desc: 'Automated risk tier classification (Minimal, Limited, High, Unacceptable) with live compliance dashboards. Map your AI systems to EU AI Act requirements in real-time with zero manual overhead.',
    color: '#76fbd3',
    glowColor: 'rgba(118,251,211,0.25)',
    borderColor: 'rgba(118,251,211,0.28)',
    borderHover: 'rgba(118,251,211,0.6)',
    bgGrad: 'linear-gradient(135deg, rgba(118,251,211,0.09) 0%, rgba(22,181,236,0.06) 100%)',
  },
  {
    id: 'hq',
    Icon: CollaborationIcon,
    titleKey: 'bento_hq',
    desc: 'A multi-screen team workspace with Kanban project boards, encrypted file sharing, and real-time data sync animation.',
    color: '#16b5ec',
    glowColor: 'rgba(22,181,236,0.25)',
    borderColor: 'rgba(22,181,236,0.28)',
    borderHover: 'rgba(22,181,236,0.6)',
    bgGrad: 'linear-gradient(135deg, rgba(22,181,236,0.09) 0%, rgba(118,251,211,0.06) 100%)',
  },
];

function BentoCard({ card, onOpenDive, index }) {
  const { t } = useApp();
  const [hovered, setHovered] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const { Icon } = card;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotateX(-y * 8);
    setRotateY(x * 8);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      className="relative overflow-hidden cursor-pointer"
      style={{
        background: card.bgGrad,
        border: `1px solid ${hovered ? card.borderHover : card.borderColor}`,
        borderRadius: '1.25rem',
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        rotateX,
        rotateY,
        boxShadow: hovered
          ? `0 0 50px ${card.glowColor}, 0 0 100px ${card.glowColor.replace('0.22', '0.12')}, inset 0 0 40px ${card.glowColor.replace('0.22', '0.08')}, 0 25px 50px rgba(0,0,0,0.5)`
          : `0 0 25px ${card.glowColor.replace('0.22', '0.12')}, inset 0 0 25px ${card.glowColor.replace('0.22', '0.05')}, 0 8px 25px rgba(0,0,0,0.4)`,
        transition: 'border-color 0.3s, box-shadow 0.3s',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        minHeight: '220px',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="absolute inset-0 pointer-events-none transition-opacity duration-300" style={{ background: `radial-gradient(ellipse at top left, ${card.color}0d 0%, transparent 60%)`, opacity: hovered ? 1 : 0.6, borderRadius: '1rem' }} />
      <div className="absolute inset-0 pointer-events-none transition-opacity duration-300" style={{ background: `radial-gradient(ellipse at bottom right, ${card.color}08 0%, transparent 60%)`, opacity: hovered ? 1 : 0.4, borderRadius: '1rem' }} />

      {hovered && (
        <motion.div className="absolute left-0 right-0 h-px pointer-events-none z-10" style={{ background: `linear-gradient(90deg, transparent, ${card.color}50, transparent)` }} initial={{ top: '0%' }} animate={{ top: '100%' }} transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }} />
      )}

      <div className="relative flex items-start justify-between pt-12 pl-10 pr-10 pb-10 gap-4">
        <div className="flex-1 min-w-0 pt-2 pl-2">
          <h3 className="font-orbitron font-bold text-sm mb-3 leading-tight uppercase" style={{ color: 'rgba(226,232,240,0.95)', letterSpacing: '0.03em' }}>
            {t(card.titleKey)}
          </h3>
          <p className="text-xs leading-relaxed mb-6" style={{ color: 'rgba(226,232,240,0.45)', maxWidth: '200px' }}>
            {card.desc}
          </p>

          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onOpenDive(card.id);
            }}
            className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full transition-all"
            style={{ color: card.color, background: `${card.color}12`, border: `1px solid ${card.color}35`, boxShadow: hovered ? `0 0 14px ${card.color}30` : 'none' }}
            whileHover={{ x: 2, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Run more <ArrowRight size={11} />
          </motion.button>
        </div>

        <motion.div className="shrink-0 flex items-center justify-center" animate={{ filter: hovered ? `drop-shadow(0 0 18px ${card.color}80) drop-shadow(0 0 36px ${card.color}40)` : `drop-shadow(0 0 8px ${card.color}40)`, scale: hovered ? 1.06 : 1 }} transition={{ duration: 0.4 }}>
          <Icon />
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px pointer-events-none transition-opacity duration-300" style={{ background: `linear-gradient(90deg, transparent, ${card.color}55, transparent)`, opacity: hovered ? 1 : 0.35 }} />
      <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none transition-opacity duration-300" style={{ background: `radial-gradient(circle at top right, ${card.color}18, transparent 70%)`, opacity: hovered ? 1 : 0.4 }} />
    </motion.div>
  );
}

export default function BentoGrid() {
  const { activeBentoModal, setActiveBentoModal } = useApp();

  return (
    <div className="w-full flex justify-center overflow-hidden">
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-10" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-xs font-medium" style={{ background: 'rgba(118,251,211,0.07)', border: '1px solid rgba(118,251,211,0.2)', color: '#76fbd3' }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#76fbd3', boxShadow: '0 0 6px #76fbd3' }} />
              Core Infrastructure Capabilities
            </div>
            <h2 className="font-orbitron font-black text-2xl md:text-3xl mb-3">
              <span style={{ color: '#e2e8f0' }}>REGTECH </span>
              <span className="gradient-text">INFRASTRUCTURE</span>
            </h2>
            <p className="text-sm max-w-lg mx-auto" style={{ color: 'rgba(226,232,240,0.45)' }}>
              Production-grade AI governance engineered for compliance-first engineering teams.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            {CARDS.map((card, i) => (
              <BentoCard
                key={card.id}
                card={card}
                index={i}
                onOpenDive={(id) => setActiveBentoModal(id)}
              />
            ))}
          </div>

          <UnifiedNetworkDive isOpen={activeBentoModal === 'network'} onClose={() => setActiveBentoModal(null)} />
          <SecurePaymentsDive isOpen={activeBentoModal === 'payments'} onClose={() => setActiveBentoModal(null)} />
          <InternationalMarketsDive isOpen={activeBentoModal === 'markets'} onClose={() => setActiveBentoModal(null)} />
          <VirtualHQDive isOpen={activeBentoModal === 'hq'} onClose={() => setActiveBentoModal(null)} />
        </div>
      </section>
    </div>
  );
}