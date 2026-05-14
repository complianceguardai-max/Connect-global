import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, TrendingUp, TrendingDown, CheckCircle, XCircle, AlertCircle, BarChart2 } from 'lucide-react';
import ModalOverlay from '../../ui/ModalOverlay';

const TICKERS = [
  { sym: 'EUR/USD', price: '1.0842', change: '+0.12%', up: true },
  { sym: 'GBP/USD', price: '1.2634', change: '-0.08%', up: false },
  { sym: 'USD/JPY', price: '149.82', change: '+0.34%', up: true },
  { sym: 'USD/AED', price: '3.6725', change: '0.00%', up: true },
  { sym: 'USD/SGD', price: '1.3421', change: '-0.05%', up: false },
  { sym: 'BTC/USD', price: '67,420', change: '+2.14%', up: true },
  { sym: 'ETH/USD', price: '3,284', change: '+1.87%', up: true },
  { sym: 'XAU/USD', price: '2,341', change: '+0.42%', up: true },
  { sym: 'USD/BRL', price: '4.9820', change: '+0.21%', up: true },
  { sym: 'USD/CNY', price: '7.2410', change: '-0.03%', up: false },
];

const COUNTRIES_LEGAL = [
  { country: 'United States', region: 'NA', trade: '✓', crypto: '⚠', data: '✓', labor: '✓', status: 'compliant' },
  { country: 'European Union', region: 'EU', trade: '✓', crypto: '✓', data: '✓', labor: '✓', status: 'compliant' },
  { country: 'United Arab Emirates', region: 'ME', trade: '✓', crypto: '✓', data: '⚠', labor: '✓', status: 'compliant' },
  { country: 'United Kingdom', region: 'EU', trade: '✓', crypto: '⚠', data: '✓', labor: '✓', status: 'compliant' },
  { country: 'China', region: 'APAC', trade: '⚠', crypto: '✗', data: '⚠', labor: '✓', status: 'restricted' },
  { country: 'Singapore', region: 'SEA', trade: '✓', crypto: '✓', data: '✓', labor: '✓', status: 'compliant' },
  { country: 'Japan', region: 'APAC', trade: '✓', crypto: '✓', data: '✓', labor: '✓', status: 'compliant' },
  { country: 'Brazil', region: 'SA', trade: '✓', crypto: '⚠', data: '✓', labor: '⚠', status: 'partial' },
  { country: 'India', region: 'SA', trade: '✓', crypto: '⚠', data: '⚠', labor: '✓', status: 'partial' },
  { country: 'Russia', region: 'EU', trade: '✗', crypto: '⚠', data: '✗', labor: '⚠', status: 'restricted' },
  { country: 'Canada', region: 'NA', trade: '✓', crypto: '✓', data: '✓', labor: '✓', status: 'compliant' },
  { country: 'Australia', region: 'OCE', trade: '✓', crypto: '✓', data: '✓', labor: '✓', status: 'compliant' },
  { country: 'Germany', region: 'EU', trade: '✓', crypto: '✓', data: '✓', labor: '✓', status: 'compliant' },
  { country: 'France', region: 'EU', trade: '✓', crypto: '✓', data: '✓', labor: '✓', status: 'compliant' },
  { country: 'South Korea', region: 'APAC', trade: '✓', crypto: '✓', data: '✓', labor: '✓', status: 'compliant' },
];

const REGIONS = ['All', 'NA', 'EU', 'ME', 'APAC', 'SEA', 'SA', 'OCE'];

function StatusIcon({ val }) {
  if (val === '✓') return <CheckCircle size={13} style={{ color: '#76fbd3' }} />;
  if (val === '⚠') return <AlertCircle size={13} style={{ color: '#fbbf24' }} />;
  return <XCircle size={13} style={{ color: '#ef4444' }} />;
}

export default function InternationalMarketsDive({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('All');
  const [tickerOffset, setTickerOffset] = useState(0);

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => setTickerOffset(o => o - 1), 30);
    return () => clearInterval(interval);
  }, [isOpen]);

  const filtered = COUNTRIES_LEGAL.filter(c => {
    const matchRegion = region === 'All' || c.region === region;
    const matchSearch = !search || c.country.toLowerCase().includes(search.toLowerCase());
    return matchRegion && matchSearch;
  });

  return (
    <ModalOverlay isOpen={isOpen} onClose={onClose} title="International Markets" subtitle="Market terminal & 195-country legal compliance checklist" size="xl" accent="mint">
      {/* Ticker tape */}
      <div className="rounded-xl overflow-hidden mb-5" style={{ background: 'rgba(5,10,20,0.8)', border: '1px solid rgba(118,251,211,0.1)' }}>
        <div className="ticker-wrap py-2">
          <div className="inline-flex gap-8 px-4" style={{ transform: `translateX(${tickerOffset % 800}px)`, transition: 'none', whiteSpace: 'nowrap' }}>
            {[...TICKERS, ...TICKERS].map((t, i) => (
              <span key={i} className="inline-flex items-center gap-2 text-xs">
                <span className="font-orbitron font-bold" style={{ color: '#16b5ec' }}>{t.sym}</span>
                <span style={{ color: 'rgba(226,232,240,0.8)' }}>{t.price}</span>
                <span className="flex items-center gap-0.5" style={{ color: t.up ? '#76fbd3' : '#ef4444' }}>
                  {t.up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                  {t.change}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-2 mb-5">
        {['Market Terminal', 'Legal Checklist (195+)'].map((tab, i) => (
          <button key={tab} onClick={() => setActiveTab(i)}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
            style={{
              background: activeTab === i ? 'rgba(118,251,211,0.15)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${activeTab === i ? 'rgba(118,251,211,0.4)' : 'rgba(118,251,211,0.1)'}`,
              color: activeTab === i ? '#76fbd3' : 'rgba(226,232,240,0.6)',
            }}>{tab}</button>
        ))}
      </div>

      {/* Tab 0: Market Terminal */}
      {activeTab === 0 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
            {[
              { label: 'Markets Open', value: '47', color: '#76fbd3' },
              { label: 'Total Volume', value: '$8.4T', color: '#16b5ec' },
              { label: 'Active Pairs', value: '2,847', color: '#76fbd3' },
              { label: 'Avg Spread', value: '0.02%', color: '#16b5ec' },
            ].map(s => (
              <div key={s.label} className="rounded-xl p-3 text-center" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(118,251,211,0.1)' }}>
                <p className="text-xl font-bold font-orbitron" style={{ color: s.color }}>{s.value}</p>
                <p className="text-xs mt-1" style={{ color: 'rgba(226,232,240,0.4)' }}>{s.label}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(118,251,211,0.1)' }}>
            <table className="w-full text-xs">
              <thead>
                <tr style={{ background: 'rgba(118,251,211,0.06)', borderBottom: '1px solid rgba(118,251,211,0.1)' }}>
                  {['Pair', 'Price', 'Change', 'Volume', 'Trend'].map(h => (
                    <th key={h} className="px-4 py-3 text-left font-semibold" style={{ color: 'rgba(118,251,211,0.8)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TICKERS.map((t, i) => (
                  <motion.tr key={t.sym} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                    style={{ borderBottom: '1px solid rgba(118,251,211,0.05)' }}>
                    <td className="px-4 py-3 font-bold font-orbitron text-xs" style={{ color: '#16b5ec' }}>{t.sym}</td>
                    <td className="px-4 py-3 font-mono-code" style={{ color: 'rgba(226,232,240,0.9)' }}>{t.price}</td>
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-1" style={{ color: t.up ? '#76fbd3' : '#ef4444' }}>
                        {t.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                        {t.change}
                      </span>
                    </td>
                    <td className="px-4 py-3" style={{ color: 'rgba(226,232,240,0.5)' }}>
                      ${(Math.random() * 900 + 100).toFixed(0)}M
                    </td>
                    <td className="px-4 py-3">
                      <svg width="60" height="20" viewBox="0 0 60 20">
                        <motion.polyline
                          points={Array.from({ length: 8 }, (_, j) => `${j * 8},${10 + (Math.random() - 0.5) * 12}`).join(' ')}
                          fill="none"
                          stroke={t.up ? '#76fbd3' : '#ef4444'}
                          strokeWidth="1.5"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.8, delay: i * 0.05 }}
                        />
                      </svg>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Tab 1: Legal Checklist */}
      {activeTab === 1 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex flex-col md:flex-row gap-3 mb-4">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'rgba(118,251,211,0.4)' }} />
              <input className="input-glass w-full pl-9 pr-4 py-2.5 rounded-lg text-sm"
                placeholder="Search countries..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {REGIONS.map(r => (
                <button key={r} onClick={() => setRegion(r)}
                  className="px-3 py-2 rounded-lg text-xs font-medium transition-all"
                  style={{
                    background: region === r ? 'rgba(118,251,211,0.15)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${region === r ? 'rgba(118,251,211,0.35)' : 'rgba(118,251,211,0.08)'}`,
                    color: region === r ? '#76fbd3' : 'rgba(226,232,240,0.5)',
                  }}>{r}</button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 mb-3 text-xs" style={{ color: 'rgba(226,232,240,0.4)' }}>
            <span className="flex items-center gap-1"><CheckCircle size={11} style={{ color: '#76fbd3' }} /> Compliant</span>
            <span className="flex items-center gap-1"><AlertCircle size={11} style={{ color: '#fbbf24' }} /> Partial/Review</span>
            <span className="flex items-center gap-1"><XCircle size={11} style={{ color: '#ef4444' }} /> Restricted</span>
            <span className="ml-auto">{filtered.length} of 195+ countries shown</span>
          </div>

          <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(118,251,211,0.1)' }}>
            <table className="w-full text-xs">
              <thead>
                <tr style={{ background: 'rgba(118,251,211,0.06)', borderBottom: '1px solid rgba(118,251,211,0.1)' }}>
                  {['Country', 'Region', 'Trade', 'Crypto', 'Data', 'Labor', 'Status'].map(h => (
                    <th key={h} className="px-4 py-3 text-left font-semibold" style={{ color: 'rgba(118,251,211,0.8)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, i) => (
                  <motion.tr key={c.country} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                    style={{ borderBottom: '1px solid rgba(118,251,211,0.05)' }}>
                    <td className="px-4 py-3 font-medium" style={{ color: 'rgba(226,232,240,0.85)' }}>{c.country}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded text-xs" style={{ background: 'rgba(22,181,236,0.1)', color: '#16b5ec', border: '1px solid rgba(22,181,236,0.2)' }}>{c.region}</span>
                    </td>
                    <td className="px-4 py-3"><StatusIcon val={c.trade} /></td>
                    <td className="px-4 py-3"><StatusIcon val={c.crypto} /></td>
                    <td className="px-4 py-3"><StatusIcon val={c.data} /></td>
                    <td className="px-4 py-3"><StatusIcon val={c.labor} /></td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs ${c.status === 'compliant' ? 'badge-online' : c.status === 'partial' ? 'badge-warning' : 'badge-offline'}`}>
                        {c.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </ModalOverlay>
  );
}
