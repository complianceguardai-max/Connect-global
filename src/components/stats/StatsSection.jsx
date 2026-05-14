import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, Zap, Globe, Server, Users, TrendingUp, HeadphonesIcon } from 'lucide-react';
import { useApp } from '../../context/AppContext';

/* ── Mini Sparkline SVG ── */
function Sparkline({ points, color, height = 40, width = 100 }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const step = width / (points.length - 1);

  const coords = points.map((p, i) => {
    const x = i * step;
    const y = height - ((p - min) / range) * (height - 4) - 2;
    return `${x},${y}`;
  });

  const pathD = `M ${coords.join(' L ')}`;
  const fillD = `M 0,${height} L ${coords.join(' L ')} L ${width},${height} Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height} style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id={`sparkFill-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={fillD} fill={`url(#sparkFill-${color.replace('#', '')})`} />
      <path d={pathD} stroke={color} strokeWidth="1.5" fill="none" strokeLinejoin="round" strokeLinecap="round" />
      {/* Last point dot */}
      <circle
        cx={coords[coords.length - 1].split(',')[0]}
        cy={coords[coords.length - 1].split(',')[1]}
        r="2.5"
        fill={color}
        style={{ filter: `drop-shadow(0 0 4px ${color})` }}
      />
    </svg>
  );
}

/* ── Animated Counter ── */
function AnimatedCounter({ value, suffix = '', prefix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.span
      ref={ref}
      className="font-orbitron font-black"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
    >
      {inView ? (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {prefix}{value}{suffix}
        </motion.span>
      ) : `${prefix}0${suffix}`}
    </motion.span>
  );
}

/* ── Sparkline data sets ── */
const TRANSACTIONS_SPARK = [18, 22, 19, 28, 24, 30, 27, 34, 29, 34];
const PARTNERS_SPARK     = [800, 1000, 1100, 1300, 1500, 1700, 1800, 1950, 2000, 2050];
const SUPPORT_SPARK      = [95, 97, 96, 98, 97, 99, 98, 99, 100, 100];

const SECURITY_PARTNERS = [
  { name: 'Cloudflare',  role: 'DDoS Protection & CDN',    status: 'online', icon: Shield },
  { name: 'AWS Shield',  role: 'Infrastructure Security',  status: 'online', icon: Server },
  { name: 'Chainalysis', role: 'Blockchain Analytics',     status: 'online', icon: Zap },
  { name: 'Okta',        role: 'Identity & Access Mgmt',   status: 'online', icon: Users },
  { name: 'Palo Alto',   role: 'Network Security',         status: 'online', icon: Shield },
  { name: 'Sumsub',      role: 'KYC/AML Verification',     status: 'online', icon: Globe },
];

/* ── Avatar stack for support card ── */
function AvatarStack() {
  const colors = ['#76fbd3', '#16b5ec', '#f59e0b', '#a78bfa'];
  return (
    <div className="flex items-center">
      {colors.map((c, i) => (
        <div
          key={i}
          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
          style={{
            background: `${c}22`,
            border: `2px solid ${c}55`,
            marginLeft: i === 0 ? 0 : '-8px',
            zIndex: colors.length - i,
            color: c,
            fontSize: '10px',
          }}
        >
          {['A', 'E', 'F', 'C'][i]}
        </div>
      ))}
    </div>
  );
}

export default function StatsSection() {
  const { t } = useApp();

  return (
    <section
      className="py-16 px-4"
      style={{ background: 'rgba(10,22,40,0.98)', borderTop: '1px solid rgba(118,251,211,0.12)' }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-xs font-medium"
            style={{ background: 'rgba(118,251,211,0.08)', border: '1px solid rgba(118,251,211,0.2)', color: '#76fbd3' }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#76fbd3' }} />
            Live Platform Metrics
          </div>
          <h2 className="font-orbitron font-black text-2xl md:text-3xl mb-3">
            <span style={{ color: '#e2e8f0' }}>REAL-TIME </span>
            <span className="gradient-text">GLOBAL STATISTICS</span>
          </h2>
          <p className="text-sm max-w-md mx-auto" style={{ color: 'rgba(226,232,240,0.4)' }}>
            Global movements and data transacting globally — real-time platform metrics.
          </p>
        </motion.div>

        {/* ── 4-stat row matching reference image ── */}
        <div
          className="rounded-2xl mb-8 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(118,251,211,0.06) 0%, rgba(22,181,236,0.04) 100%)',
            border: '1px solid rgba(118,251,211,0.18)',
            boxShadow: '0 0 50px rgba(118,251,211,0.08), inset 0 0 30px rgba(118,251,211,0.03)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
          }}
        >
          <div
            className="grid grid-cols-2 md:grid-cols-4"
            style={{ borderTop: '1px solid rgba(118,251,211,0.08)' }}
          >

            {/* Stat 1: USERS IN 195+ COUNTRIES */}
            <motion.div
              className="p-6 flex flex-col gap-3"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0 }}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: 'rgba(118,251,211,0.1)', border: '1px solid rgba(118,251,211,0.2)' }}>
                  <Globe size={16} style={{ color: '#76fbd3' }} />
                </div>
                <span className="text-xs font-medium uppercase tracking-wide" style={{ color: 'rgba(226,232,240,0.5)' }}>
                  Users in
                </span>
              </div>
              <div>
                <div className="font-orbitron font-black leading-none mb-1" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#76fbd3' }}>
                  <AnimatedCounter value="195+" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'rgba(226,232,240,0.55)' }}>
                  COUNTRIES
                </p>
              </div>
              {/* Small avatar row */}
              <div className="flex items-center gap-2 mt-1">
                <AvatarStack />
                <span className="text-xs" style={{ color: 'rgba(226,232,240,0.35)' }}>+2.4M active</span>
              </div>
            </motion.div>

            {/* Stat 2: GLOBAL TRANSACTIONS FLOWING — 34K with green sparkline */}
            <motion.div
              className="p-6 flex flex-col gap-3"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: 'rgba(118,251,211,0.1)', border: '1px solid rgba(118,251,211,0.2)' }}>
                  <TrendingUp size={16} style={{ color: '#76fbd3' }} />
                </div>
                <span className="text-xs font-medium uppercase tracking-wide" style={{ color: 'rgba(226,232,240,0.5)' }}>
                  Global Transactions
                </span>
              </div>
              <div>
                <div className="font-orbitron font-black leading-none mb-1" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#76fbd3' }}>
                  <AnimatedCounter value="34K" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'rgba(226,232,240,0.55)' }}>
                  FLOWING
                </p>
              </div>
              <Sparkline points={TRANSACTIONS_SPARK} color="#76fbd3" height={36} width={90} />
            </motion.div>

            {/* Stat 3: 2000+ PARTNERS with blue sparkline */}
            <motion.div
              className="p-6 flex flex-col gap-3"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: 'rgba(22,181,236,0.1)', border: '1px solid rgba(22,181,236,0.2)' }}>
                  <Server size={16} style={{ color: '#16b5ec' }} />
                </div>
                <span className="text-xs font-medium uppercase tracking-wide" style={{ color: 'rgba(226,232,240,0.5)' }}>
                  Active Nodes &amp;
                </span>
              </div>
              <div>
                <div className="font-orbitron font-black leading-none mb-1" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#16b5ec' }}>
                  <AnimatedCounter prefix="+" value="2000" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'rgba(226,232,240,0.55)' }}>
                  PARTNERS
                </p>
              </div>
              <Sparkline points={PARTNERS_SPARK} color="#16b5ec" height={36} width={90} />
            </motion.div>

            {/* Stat 4: SUPPORT 24/7 with blue sparkline */}
            <motion.div
              className="p-6 flex flex-col gap-3"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: 'rgba(22,181,236,0.1)', border: '1px solid rgba(22,181,236,0.2)' }}>
                  <HeadphonesIcon size={16} style={{ color: '#16b5ec' }} />
                </div>
                <span className="text-xs font-medium uppercase tracking-wide" style={{ color: 'rgba(226,232,240,0.5)' }}>
                  Support
                </span>
              </div>
              <div>
                <div className="font-orbitron font-black leading-none mb-1" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#16b5ec' }}>
                  <AnimatedCounter value="24/7" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'rgba(226,232,240,0.55)' }}>
                  ALWAYS ON
                </p>
              </div>
              <Sparkline points={SUPPORT_SPARK} color="#16b5ec" height={36} width={90} />
            </motion.div>
          </div>
        </div>

        {/* ── Main content grid: heatmap + partners ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Heatmap — 2/3 width */}
          <HeatmapCard />

          {/* Right column: Partners + Support */}
          <div className="flex flex-col gap-5">
            {/* Security Partners */}
            <div
              className="rounded-2xl p-5 flex-1"
              style={{
                background: 'linear-gradient(135deg, rgba(118,251,211,0.05) 0%, rgba(22,181,236,0.03) 100%)',
                border: '1px solid rgba(118,251,211,0.15)',
                boxShadow: '0 0 25px rgba(118,251,211,0.06), inset 0 0 20px rgba(118,251,211,0.02)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
              }}
            >
              <h3 className="font-orbitron font-bold text-sm mb-4" style={{ color: '#76fbd3' }}>
                Active Security Partners
              </h3>
              <div className="space-y-2">
                {SECURITY_PARTNERS.map((partner, i) => (
                  <motion.div
                    key={partner.name}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(118,251,211,0.07)' }}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: 'rgba(118,251,211,0.08)', border: '1px solid rgba(118,251,211,0.15)' }}
                    >
                      <partner.icon size={13} style={{ color: '#76fbd3' }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold" style={{ color: 'rgba(226,232,240,0.85)' }}>{partner.name}</p>
                      <p className="text-xs truncate" style={{ color: 'rgba(226,232,240,0.35)', fontSize: '10px' }}>{partner.role}</p>
                    </div>
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: '#76fbd3', boxShadow: '0 0 6px #76fbd3' }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 24/7 Support contact */}
            <div
              className="rounded-2xl p-5"
              style={{
                background: 'linear-gradient(135deg, rgba(22,181,236,0.05) 0%, rgba(118,251,211,0.03) 100%)',
                border: '1px solid rgba(22,181,236,0.2)',
                boxShadow: '0 0 25px rgba(22,181,236,0.06), inset 0 0 20px rgba(22,181,236,0.02)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
              }}
            >
              <h3 className="font-orbitron font-bold text-sm mb-3" style={{ color: '#16b5ec' }}>
                24/7 Global Support
              </h3>
              <div className="space-y-2.5">
                <a
                  href="https://wa.me/380932318376"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all"
                  style={{ background: 'rgba(22,181,236,0.06)', border: '1px solid rgba(22,181,236,0.15)' }}
                >
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ background: 'rgba(22,181,236,0.12)' }}>
                    <span style={{ fontSize: '14px' }}>💬</span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold" style={{ color: 'rgba(226,232,240,0.85)' }}>WhatsApp</p>
                    <p className="text-xs" style={{ color: 'rgba(226,232,240,0.4)', fontSize: '10px' }}>Instant response</p>
                  </div>
                  <span className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: '#76fbd3', boxShadow: '0 0 6px #76fbd3' }} />
                </a>
                <a
                  href="mailto:support@connectglobal.io"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all"
                  style={{ background: 'rgba(118,251,211,0.04)', border: '1px solid rgba(118,251,211,0.1)' }}
                >
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ background: 'rgba(118,251,211,0.08)' }}>
                    <span style={{ fontSize: '14px' }}>✉️</span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold" style={{ color: 'rgba(226,232,240,0.85)' }}>Email Support</p>
                    <p className="text-xs" style={{ color: 'rgba(226,232,240,0.4)', fontSize: '10px' }}>24h response SLA</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Heatmap sub-component ── */
const generateHeatmap = () => {
  const data = [];
  for (let week = 0; week < 52; week++) {
    const row = [];
    for (let day = 0; day < 7; day++) {
      const base = Math.sin(week / 8) * 0.3 + 0.5;
      const noise = Math.random() * 0.4;
      row.push(Math.min(1, Math.max(0.05, base + noise)));
    }
    data.push(row);
  }
  return data;
};
const HEATMAP_DATA = generateHeatmap();

function HeatmapCard() {
  const heatmapRef = useRef(null);
  const heatmapInView = useInView(heatmapRef, { once: true });

  return (
    <div
      className="lg:col-span-2 rounded-2xl p-6"
      style={{
        background: 'linear-gradient(135deg, rgba(118,251,211,0.05) 0%, rgba(22,181,236,0.03) 100%)',
        border: '1px solid rgba(118,251,211,0.15)',
        boxShadow: '0 0 25px rgba(118,251,211,0.06), inset 0 0 20px rgba(118,251,211,0.02)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-orbitron font-bold text-sm" style={{ color: '#76fbd3' }}>User Growth Heatmap</h3>
        <div className="flex items-center gap-3 text-xs" style={{ color: 'rgba(226,232,240,0.4)' }}>
          <span>Less</span>
          <div className="flex gap-1">
            {[0.1, 0.3, 0.5, 0.7, 0.9].map(v => (
              <div key={v} className="w-3 h-3 rounded-sm" style={{ background: `rgba(118,251,211,${v})` }} />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>

      <div ref={heatmapRef} className="flex gap-1 overflow-x-auto pb-2">
        {HEATMAP_DATA.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1 shrink-0">
            {week.map((val, di) => (
              <motion.div
                key={di}
                className="w-3 h-3 rounded-sm"
                style={{ background: `rgba(118,251,211,${val})` }}
                initial={{ opacity: 0, scale: 0 }}
                animate={heatmapInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: (wi * 7 + di) * 0.002, duration: 0.3 }}
                title={`Week ${wi + 1}, Day ${di + 1}: ${Math.round(val * 100)}% activity`}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-3 text-xs" style={{ color: 'rgba(226,232,240,0.3)' }}>
        <span>Jan 2024</span>
        <span>Apr</span>
        <span>Jul</span>
        <span>Oct</span>
        <span>Dec 2024</span>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-5">
        {[
          { label: 'YoY Growth', value: '+284%', color: '#76fbd3' },
          { label: 'Peak Day',   value: '847K users', color: '#16b5ec' },
          { label: 'Avg Daily',  value: '312K', color: '#76fbd3' },
        ].map(s => (
          <div
            key={s.label}
            className="rounded-xl p-3 text-center"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(118,251,211,0.08)' }}
          >
            <p className="text-base font-bold font-orbitron" style={{ color: s.color }}>{s.value}</p>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(226,232,240,0.4)' }}>{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
