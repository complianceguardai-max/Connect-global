import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftRight, TrendingUp, Droplets, Shield, RefreshCw } from 'lucide-react';
import ModalOverlay from '../ui/ModalOverlay';
import { useApp } from '../../context/AppContext';

const STABLECOINS = ['USDC', 'USDT', 'DAI', 'BUSD', 'FRAX', 'TUSD'];

const LIQUIDITY_POOLS = [
  { pair: 'USDC/USDT', tvl: '$4.2B', apy: '3.8%', volume24h: '$890M', utilization: 92 },
  { pair: 'DAI/USDC', tvl: '$2.8B', apy: '4.2%', volume24h: '$620M', utilization: 78 },
  { pair: 'USDT/BUSD', tvl: '$1.9B', apy: '2.9%', volume24h: '$410M', utilization: 65 },
  { pair: 'FRAX/USDC', tvl: '$980M', apy: '5.1%', volume24h: '$280M', utilization: 54 },
  { pair: 'TUSD/DAI', tvl: '$540M', apy: '3.4%', volume24h: '$190M', utilization: 41 },
];

const EXCHANGE_RATES = {
  USDC: { USDT: 1.0002, DAI: 0.9998, BUSD: 1.0001, FRAX: 0.9997, TUSD: 1.0003 },
  USDT: { USDC: 0.9998, DAI: 0.9996, BUSD: 0.9999, FRAX: 0.9995, TUSD: 1.0001 },
  DAI: { USDC: 1.0002, USDT: 1.0004, BUSD: 1.0003, FRAX: 0.9999, TUSD: 1.0005 },
};

export default function DeFiModal() {
  const { activeNavModal, setActiveNavModal } = useApp();
  const [activeTab, setActiveTab] = useState(0);
  const [fromCoin, setFromCoin] = useState('USDC');
  const [toCoin, setToCoin] = useState('USDT');
  const [amount, setAmount] = useState('10000');
  const [swapping, setSwapping] = useState(false);
  const [swapDone, setSwapDone] = useState(false);

  const isOpen = activeNavModal === 'defi';
  const onClose = () => setActiveNavModal(null);

  const rate = EXCHANGE_RATES[fromCoin]?.[toCoin] || 1.0;
  const received = (parseFloat(amount) * rate).toFixed(2);
  const fee = (parseFloat(amount) * 0.0005).toFixed(2);

  const handleSwap = () => {
    setSwapping(true);
    setTimeout(() => { setSwapping(false); setSwapDone(true); setTimeout(() => setSwapDone(false), 3000); }, 2000);
  };

  const flipCoins = () => { setFromCoin(toCoin); setToCoin(fromCoin); };

  return (
    <ModalOverlay isOpen={isOpen} onClose={onClose} title="Decentralized Finance" subtitle="Stablecoin exchange & liquidity intelligence" size="xl" accent="blue">
      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {['Stablecoin Exchange', 'Liquidity Reports', 'Market Overview'].map((tab, i) => (
          <button key={tab} onClick={() => setActiveTab(i)}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            style={{
              background: activeTab === i ? 'rgba(22,181,236,0.15)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${activeTab === i ? 'rgba(22,181,236,0.4)' : 'rgba(22,181,236,0.1)'}`,
              color: activeTab === i ? '#16b5ec' : 'rgba(226,232,240,0.6)',
            }}
          >{tab}</button>
        ))}
      </div>

      {/* Tab 0: Exchange */}
      {activeTab === 0 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-lg mx-auto">
          <div className="rounded-2xl p-6" style={{ background: 'rgba(22,181,236,0.05)', border: '1px solid rgba(22,181,236,0.2)' }}>
            <h3 className="text-sm font-semibold mb-4 text-center" style={{ color: '#16b5ec' }}>Swap Stablecoins</h3>

            {/* From */}
            <div className="rounded-xl p-4 mb-2" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(22,181,236,0.15)' }}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs" style={{ color: 'rgba(226,232,240,0.5)' }}>From</span>
                <span className="text-xs" style={{ color: 'rgba(226,232,240,0.4)' }}>Balance: 50,000.00</span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  className="input-glass flex-1 px-3 py-2 rounded-lg text-xl font-bold bg-transparent border-none outline-none"
                  style={{ color: '#e2e8f0' }}
                />
                <select
                  className="select-glass px-3 py-2 rounded-lg font-bold text-sm"
                  value={fromCoin}
                  onChange={e => setFromCoin(e.target.value)}
                  style={{ color: '#16b5ec' }}
                >
                  {STABLECOINS.filter(c => c !== toCoin).map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>

            {/* Flip button */}
            <div className="flex justify-center my-2">
              <button onClick={flipCoins}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: 'rgba(22,181,236,0.15)', border: '1px solid rgba(22,181,236,0.3)', color: '#16b5ec' }}>
                <ArrowLeftRight size={16} />
              </button>
            </div>

            {/* To */}
            <div className="rounded-xl p-4 mb-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(22,181,236,0.15)' }}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs" style={{ color: 'rgba(226,232,240,0.5)' }}>To (estimated)</span>
                <span className="text-xs" style={{ color: 'rgba(226,232,240,0.4)' }}>Balance: 0.00</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex-1 text-xl font-bold" style={{ color: '#76fbd3' }}>{isNaN(received) ? '0.00' : received}</span>
                <select
                  className="select-glass px-3 py-2 rounded-lg font-bold text-sm"
                  value={toCoin}
                  onChange={e => setToCoin(e.target.value)}
                  style={{ color: '#16b5ec' }}
                >
                  {STABLECOINS.filter(c => c !== fromCoin).map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>

            {/* Rate info */}
            <div className="rounded-lg p-3 mb-4 space-y-2" style={{ background: 'rgba(22,181,236,0.06)', border: '1px solid rgba(22,181,236,0.12)' }}>
              {[
                { label: 'Exchange Rate', value: `1 ${fromCoin} = ${rate} ${toCoin}` },
                { label: 'Protocol Fee (0.05%)', value: `$${fee}` },
                { label: 'Slippage Tolerance', value: '0.1%' },
                { label: 'Route', value: `${fromCoin} → Curve → ${toCoin}` },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between text-xs">
                  <span style={{ color: 'rgba(226,232,240,0.5)' }}>{label}</span>
                  <span style={{ color: 'rgba(226,232,240,0.8)' }}>{value}</span>
                </div>
              ))}
            </div>

            <motion.button
              onClick={handleSwap}
              disabled={swapping}
              className="w-full py-3.5 rounded-xl font-orbitron font-bold text-sm tracking-wider transition-all"
              style={{
                background: swapDone
                  ? 'rgba(118,251,211,0.2)'
                  : 'linear-gradient(135deg, rgba(22,181,236,0.3), rgba(118,251,211,0.2))',
                border: `1px solid ${swapDone ? 'rgba(118,251,211,0.5)' : 'rgba(22,181,236,0.5)'}`,
                color: swapDone ? '#76fbd3' : '#16b5ec',
                boxShadow: '0 0 20px rgba(22,181,236,0.2)',
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {swapping ? (
                <span className="flex items-center justify-center gap-2">
                  <RefreshCw size={16} className="animate-spin" /> Processing...
                </span>
              ) : swapDone ? '✓ Swap Confirmed!' : `Swap ${fromCoin} → ${toCoin}`}
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Tab 1: Liquidity Reports */}
      {activeTab === 1 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: 'Total Value Locked', value: '$10.4B', icon: Droplets, color: '#16b5ec' },
              { label: 'Total Volume 24h', value: '$2.39B', icon: TrendingUp, color: '#76fbd3' },
              { label: 'Active LPs', value: '48,291', icon: Shield, color: '#16b5ec' },
            ].map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="rounded-xl p-4 text-center" style={{ background: 'rgba(22,181,236,0.06)', border: '1px solid rgba(22,181,236,0.15)' }}>
                <Icon size={20} className="mx-auto mb-2" style={{ color }} />
                <p className="text-xl font-bold font-orbitron" style={{ color }}>{value}</p>
                <p className="text-xs mt-1" style={{ color: 'rgba(226,232,240,0.5)' }}>{label}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(22,181,236,0.15)' }}>
            <table className="w-full text-xs">
              <thead>
                <tr style={{ background: 'rgba(22,181,236,0.08)', borderBottom: '1px solid rgba(22,181,236,0.15)' }}>
                  {['Pool', 'TVL', 'APY', 'Volume 24h', 'Utilization'].map(h => (
                    <th key={h} className="px-4 py-3 text-left font-semibold" style={{ color: 'rgba(22,181,236,0.8)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {LIQUIDITY_POOLS.map((pool, i) => (
                  <motion.tr key={pool.pair} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.06 }}
                    style={{ borderBottom: '1px solid rgba(22,181,236,0.06)' }}>
                    <td className="px-4 py-3 font-semibold" style={{ color: '#16b5ec' }}>{pool.pair}</td>
                    <td className="px-4 py-3" style={{ color: 'rgba(226,232,240,0.8)' }}>{pool.tvl}</td>
                    <td className="px-4 py-3 font-semibold" style={{ color: '#76fbd3' }}>{pool.apy}</td>
                    <td className="px-4 py-3" style={{ color: 'rgba(226,232,240,0.7)' }}>{pool.volume24h}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
                          <motion.div className="h-full rounded-full" style={{ background: 'linear-gradient(90deg, #16b5ec, #76fbd3)' }}
                            initial={{ width: 0 }} animate={{ width: `${pool.utilization}%` }} transition={{ duration: 0.8, delay: i * 0.1 }} />
                        </div>
                        <span style={{ color: 'rgba(226,232,240,0.6)' }}>{pool.utilization}%</span>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Tab 2: Market Overview */}
      {activeTab === 2 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { coin: 'USDC', price: '$1.0002', change: '+0.02%', mcap: '$43.2B', up: true },
              { coin: 'USDT', price: '$0.9998', change: '-0.02%', mcap: '$91.7B', up: false },
              { coin: 'DAI', price: '$1.0001', change: '+0.01%', mcap: '$5.4B', up: true },
              { coin: 'BUSD', price: '$1.0000', change: '0.00%', mcap: '$2.1B', up: true },
              { coin: 'FRAX', price: '$0.9997', change: '-0.03%', mcap: '$1.2B', up: false },
              { coin: 'TUSD', price: '$1.0003', change: '+0.03%', mcap: '$0.8B', up: true },
            ].map((coin) => (
              <div key={coin.coin} className="rounded-xl p-4" style={{ background: 'rgba(22,181,236,0.05)', border: '1px solid rgba(22,181,236,0.12)' }}>
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold font-orbitron text-sm" style={{ color: '#16b5ec' }}>{coin.coin}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{
                    background: coin.up ? 'rgba(118,251,211,0.1)' : 'rgba(239,68,68,0.1)',
                    color: coin.up ? '#76fbd3' : '#ef4444',
                    border: `1px solid ${coin.up ? 'rgba(118,251,211,0.3)' : 'rgba(239,68,68,0.3)'}`,
                  }}>{coin.change}</span>
                </div>
                <p className="text-xl font-bold" style={{ color: '#e2e8f0' }}>{coin.price}</p>
                <p className="text-xs mt-1" style={{ color: 'rgba(226,232,240,0.4)' }}>MCap: {coin.mcap}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </ModalOverlay>
  );
}
