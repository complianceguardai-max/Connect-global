import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Link2, Calculator, Globe, Package, DollarSign, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import ModalOverlay from '../ui/ModalOverlay';
import { useApp } from '../../context/AppContext';

const TABS = ['Trade Dashboard', 'Blockchain Tracker', 'Tax Tools'];

const TRADE_STATS = [
  { label: 'Total Trade Volume', value: '$2.4T', change: '+12.3%', up: true },
  { label: 'Active Corridors', value: '847', change: '+34', up: true },
  { label: 'Avg Settlement Time', value: '1.2s', change: '-0.3s', up: true },
  { label: 'Compliance Rate', value: '99.7%', change: '+0.2%', up: true },
];

const BLOCKCHAIN_TXS = [
  { hash: '0x7f3a...9c2e', from: 'Dubai', to: 'London', amount: '$1,240,000', status: 'confirmed', time: '2s ago' },
  { hash: '0x2b8d...4f1a', from: 'New York', to: 'Singapore', amount: '$890,500', status: 'confirmed', time: '8s ago' },
  { hash: '0x9e1c...7b3d', from: 'Tokyo', to: 'São Paulo', amount: '$2,100,000', status: 'pending', time: '15s ago' },
  { hash: '0x4a6f...2e8c', from: 'London', to: 'Dubai', amount: '$560,200', status: 'confirmed', time: '22s ago' },
  { hash: '0x1d5b...8a4f', from: 'Singapore', to: 'New York', amount: '$3,400,000', status: 'confirmed', time: '31s ago' },
  { hash: '0x6c2e...5d9b', from: 'São Paulo', to: 'Tokyo', amount: '$780,000', status: 'failed', time: '45s ago' },
];

const TAX_RATES = {
  'United Arab Emirates': { vat: '5%', corporate: '9%', import: '5%', notes: 'Free zones offer 0% corporate tax' },
  'United Kingdom': { vat: '20%', corporate: '25%', import: '0-12%', notes: 'Post-Brexit customs apply' },
  'United States': { vat: 'N/A', corporate: '21%', import: '0-25%', notes: 'State taxes vary 0-13%' },
  'Japan': { vat: '10%', corporate: '23.2%', import: '0-30%', notes: 'Consumption tax on digital services' },
  'Singapore': { vat: '9%', corporate: '17%', import: '0%', notes: 'GST applies to most goods' },
  'Germany': { vat: '19%', corporate: '15%', import: '0-17%', notes: 'EU customs union member' },
  'Brazil': { vat: '12-25%', corporate: '34%', import: '0-35%', notes: 'Complex multi-tier tax system' },
  'China': { vat: '13%', corporate: '25%', import: '0-65%', notes: 'Special economic zones available' },
};

export default function GlobalCommerceModal() {
  const { activeNavModal, setActiveNavModal } = useApp();
  const [activeTab, setActiveTab] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState('United Arab Emirates');
  const [tradeValue, setTradeValue] = useState('100000');

  const isOpen = activeNavModal === 'commerce';
  const onClose = () => setActiveNavModal(null);
  const taxData = TAX_RATES[selectedCountry];

  const calcTax = (rate) => {
    const val = parseFloat(tradeValue) || 0;
    const pct = parseFloat(rate) / 100;
    return isNaN(pct) ? 'Variable' : `$${(val * pct).toLocaleString()}`;
  };

  return (
    <ModalOverlay isOpen={isOpen} onClose={onClose} title="Global Commerce Hub" subtitle="Cross-border trade, blockchain tracking & tax intelligence" size="xl" accent="mint">
      {/* Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {TABS.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            style={{
              background: activeTab === i ? 'rgba(118,251,211,0.15)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${activeTab === i ? 'rgba(118,251,211,0.4)' : 'rgba(118,251,211,0.1)'}`,
              color: activeTab === i ? '#76fbd3' : 'rgba(226,232,240,0.6)',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab 0: Trade Dashboard */}
      {activeTab === 0 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {TRADE_STATS.map((stat) => (
              <div key={stat.label} className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(118,251,211,0.1)' }}>
                <p className="text-xs mb-1" style={{ color: 'rgba(226,232,240,0.5)' }}>{stat.label}</p>
                <p className="text-2xl font-bold font-orbitron" style={{ color: '#76fbd3' }}>{stat.value}</p>
                <p className="text-xs mt-1" style={{ color: stat.up ? '#76fbd3' : '#ef4444' }}>{stat.change}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl p-5 mb-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(118,251,211,0.1)' }}>
            <h3 className="text-sm font-semibold mb-4" style={{ color: '#76fbd3' }}>Top Trade Corridors</h3>
            <div className="space-y-3">
              {[
                { route: 'Dubai → London', vol: '$340B', share: 85 },
                { route: 'New York → Singapore', vol: '$280B', share: 70 },
                { route: 'Tokyo → São Paulo', vol: '$190B', share: 48 },
                { route: 'London → Dubai', vol: '$160B', share: 40 },
                { route: 'Singapore → New York', vol: '$140B', share: 35 },
              ].map((c) => (
                <div key={c.route} className="flex items-center gap-3">
                  <span className="text-xs w-40 shrink-0" style={{ color: 'rgba(226,232,240,0.7)' }}>{c.route}</span>
                  <div className="flex-1 h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: 'linear-gradient(90deg, #76fbd3, #16b5ec)' }}
                      initial={{ width: 0 }}
                      animate={{ width: `${c.share}%` }}
                      transition={{ duration: 0.8, delay: 0.1 }}
                    />
                  </div>
                  <span className="text-xs w-16 text-right font-mono-code" style={{ color: '#76fbd3' }}>{c.vol}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: Package, label: 'Shipments Today', value: '12,847', color: '#76fbd3' },
              { icon: Globe, label: 'Countries Active', value: '195', color: '#16b5ec' },
              { icon: DollarSign, label: 'Avg Deal Size', value: '$284K', color: '#76fbd3' },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="rounded-xl p-4 flex items-center gap-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(118,251,211,0.08)' }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
                  <Icon size={18} style={{ color }} />
                </div>
                <div>
                  <p className="text-xs" style={{ color: 'rgba(226,232,240,0.5)' }}>{label}</p>
                  <p className="text-xl font-bold font-orbitron" style={{ color }}>{value}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Tab 1: Blockchain Tracker */}
      {activeTab === 1 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold" style={{ color: '#76fbd3' }}>Live Transaction Feed</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#76fbd3' }} />
              <span className="text-xs" style={{ color: 'rgba(226,232,240,0.5)' }}>Live</span>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(118,251,211,0.1)' }}>
            <table className="w-full text-xs">
              <thead>
                <tr style={{ background: 'rgba(118,251,211,0.06)', borderBottom: '1px solid rgba(118,251,211,0.1)' }}>
                  {['TX Hash', 'From', 'To', 'Amount', 'Status', 'Time'].map(h => (
                    <th key={h} className="px-4 py-3 text-left font-semibold" style={{ color: 'rgba(118,251,211,0.8)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {BLOCKCHAIN_TXS.map((tx, i) => (
                  <motion.tr
                    key={tx.hash}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    style={{ borderBottom: '1px solid rgba(118,251,211,0.05)' }}
                  >
                    <td className="px-4 py-3 font-mono-code" style={{ color: '#16b5ec' }}>{tx.hash}</td>
                    <td className="px-4 py-3" style={{ color: 'rgba(226,232,240,0.7)' }}>{tx.from}</td>
                    <td className="px-4 py-3" style={{ color: 'rgba(226,232,240,0.7)' }}>{tx.to}</td>
                    <td className="px-4 py-3 font-semibold" style={{ color: '#76fbd3' }}>{tx.amount}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        tx.status === 'confirmed' ? 'badge-online' :
                        tx.status === 'pending' ? 'badge-warning' : 'badge-offline'
                      }`}>
                        {tx.status === 'confirmed' && <CheckCircle size={10} className="inline mr-1" />}
                        {tx.status === 'pending' && <Clock size={10} className="inline mr-1" />}
                        {tx.status === 'failed' && <AlertCircle size={10} className="inline mr-1" />}
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-4 py-3" style={{ color: 'rgba(226,232,240,0.4)' }}>{tx.time}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {[
              { label: 'Block Height', value: '#19,847,231' },
              { label: 'Network TPS', value: '4,200' },
              { label: 'Gas Price', value: '12 Gwei' },
            ].map(s => (
              <div key={s.label} className="rounded-lg p-3 text-center" style={{ background: 'rgba(22,181,236,0.08)', border: '1px solid rgba(22,181,236,0.2)' }}>
                <p className="text-xs mb-1" style={{ color: 'rgba(226,232,240,0.5)' }}>{s.label}</p>
                <p className="font-orbitron font-bold text-sm" style={{ color: '#16b5ec' }}>{s.value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Tab 2: Tax Tools */}
      {activeTab === 2 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold mb-3" style={{ color: '#76fbd3' }}>Country Tax Calculator</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs mb-1 block" style={{ color: 'rgba(226,232,240,0.5)' }}>Select Country</label>
                  <select
                    className="select-glass w-full px-3 py-2.5 rounded-lg text-sm"
                    value={selectedCountry}
                    onChange={e => setSelectedCountry(e.target.value)}
                  >
                    {Object.keys(TAX_RATES).map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs mb-1 block" style={{ color: 'rgba(226,232,240,0.5)' }}>Trade Value (USD)</label>
                  <input
                    type="number"
                    className="input-glass w-full px-3 py-2.5 rounded-lg text-sm"
                    value={tradeValue}
                    onChange={e => setTradeValue(e.target.value)}
                    placeholder="Enter trade value..."
                  />
                </div>
              </div>

              {taxData && (
                <div className="mt-4 rounded-xl p-4 space-y-3" style={{ background: 'rgba(118,251,211,0.05)', border: '1px solid rgba(118,251,211,0.15)' }}>
                  <h4 className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#76fbd3' }}>{selectedCountry}</h4>
                  {[
                    { label: 'VAT / GST Rate', rate: taxData.vat },
                    { label: 'Corporate Tax', rate: taxData.corporate },
                    { label: 'Import Duty', rate: taxData.import },
                  ].map(({ label, rate }) => (
                    <div key={label} className="flex justify-between items-center">
                      <span className="text-xs" style={{ color: 'rgba(226,232,240,0.6)' }}>{label}</span>
                      <div className="text-right">
                        <span className="text-sm font-bold font-orbitron" style={{ color: '#76fbd3' }}>{rate}</span>
                        <span className="text-xs ml-2" style={{ color: 'rgba(226,232,240,0.4)' }}>≈ {calcTax(rate)}</span>
                      </div>
                    </div>
                  ))}
                  <div className="pt-2 border-t" style={{ borderColor: 'rgba(118,251,211,0.1)' }}>
                    <p className="text-xs" style={{ color: 'rgba(226,232,240,0.5)' }}>
                      <span style={{ color: '#16b5ec' }}>ℹ</span> {taxData.notes}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-3" style={{ color: '#76fbd3' }}>Compliance Checklist</h3>
              <div className="space-y-2">
                {[
                  { item: 'Export license verified', done: true },
                  { item: 'HS code classification', done: true },
                  { item: 'Sanctions screening passed', done: true },
                  { item: 'AML/KYC documentation', done: true },
                  { item: 'Certificate of origin', done: false },
                  { item: 'Insurance coverage', done: false },
                  { item: 'Customs declaration filed', done: false },
                ].map(({ item, done }) => (
                  <div key={item} className="flex items-center gap-3 px-3 py-2.5 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(118,251,211,0.07)' }}>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${done ? 'badge-online' : ''}`}
                      style={!done ? { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(226,232,240,0.2)' } : {}}>
                      {done && <CheckCircle size={12} />}
                    </div>
                    <span className="text-xs" style={{ color: done ? 'rgba(226,232,240,0.8)' : 'rgba(226,232,240,0.4)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </ModalOverlay>
  );
}
