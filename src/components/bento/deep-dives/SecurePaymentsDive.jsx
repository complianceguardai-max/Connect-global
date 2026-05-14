import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, Send, Download, FileText, Shield, CheckCircle, Clock, AlertCircle, Copy } from 'lucide-react';
import ModalOverlay from '../../ui/ModalOverlay';

const WALLET_BALANCE = { USDC: '48,240.00', USDT: '12,800.50', ETH: '4.821', BTC: '0.1847' };

const SMART_CONTRACTS = [
  { hash: '0x3f7a...2c1e', method: 'transfer()', gas: '21,000', status: 'success', block: '19,847,231', time: '12s ago' },
  { hash: '0x8b2d...9f4a', method: 'swap()', gas: '84,200', status: 'success', block: '19,847,228', time: '45s ago' },
  { hash: '0x1e5c...7b3d', method: 'approve()', gas: '46,000', status: 'success', block: '19,847,220', time: '2m ago' },
  { hash: '0x6a9f...4e2c', method: 'deposit()', gas: '62,400', status: 'pending', block: '19,847,215', time: '3m ago' },
  { hash: '0x2c4b...8d1f', method: 'withdraw()', gas: '55,800', status: 'failed', block: '19,847,200', time: '5m ago' },
];

const AUDIT_TRAIL = [
  { action: 'Wallet Created', actor: 'System', hash: '0x9a1b...3c4d', time: '2024-01-15 09:00', verified: true },
  { action: 'KYC Verified', actor: 'Compliance Engine', hash: '0x4d2e...7f8a', time: '2024-01-15 09:12', verified: true },
  { action: 'First Deposit $50,000', actor: 'User', hash: '0x7f3a...9c2e', time: '2024-01-15 10:30', verified: true },
  { action: 'Smart Contract Deployed', actor: 'Dev Team', hash: '0x2b8d...4f1a', time: '2024-01-16 14:00', verified: true },
  { action: 'Cross-border Transfer $12,400', actor: 'User', hash: '0x5e1c...6b3d', time: '2024-01-17 11:22', verified: true },
  { action: 'Compliance Report Generated', actor: 'System', hash: '0x8a4f...2e9c', time: '2024-01-18 08:00', verified: true },
];

export default function SecurePaymentsDive({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState(0);
  const [sendAmount, setSendAmount] = useState('');
  const [sendTo, setSendTo] = useState('');
  const [sendCoin, setSendCoin] = useState('USDC');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); setTimeout(() => setSent(false), 3000); }, 2000);
  };

  return (
    <ModalOverlay isOpen={isOpen} onClose={onClose} title="Secure Payments & Finance" subtitle="Digital wallet, smart contract logs & audit trails" size="xl" accent="blue">
      <div className="flex gap-2 mb-5">
        {['Digital Wallet', 'Smart Contracts', 'Audit Trail'].map((tab, i) => (
          <button key={tab} onClick={() => setActiveTab(i)}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
            style={{
              background: activeTab === i ? 'rgba(22,181,236,0.15)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${activeTab === i ? 'rgba(22,181,236,0.4)' : 'rgba(22,181,236,0.1)'}`,
              color: activeTab === i ? '#16b5ec' : 'rgba(226,232,240,0.6)',
            }}>{tab}</button>
        ))}
      </div>

      {/* Tab 0: Digital Wallet */}
      {activeTab === 0 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          {/* Balance cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
            {Object.entries(WALLET_BALANCE).map(([coin, bal]) => (
              <div key={coin} className="rounded-xl p-4" style={{ background: 'rgba(22,181,236,0.06)', border: '1px solid rgba(22,181,236,0.15)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: 'rgba(22,181,236,0.2)', color: '#16b5ec' }}>{coin[0]}</div>
                  <span className="text-xs font-semibold" style={{ color: '#16b5ec' }}>{coin}</span>
                </div>
                <p className="text-lg font-bold font-orbitron" style={{ color: '#e2e8f0' }}>{bal}</p>
              </div>
            ))}
          </div>

          {/* Send form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="rounded-xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(22,181,236,0.12)' }}>
              <h3 className="text-sm font-semibold mb-4 flex items-center gap-2" style={{ color: '#16b5ec' }}>
                <Send size={14} /> Send Payment
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs mb-1 block" style={{ color: 'rgba(226,232,240,0.5)' }}>Recipient Address</label>
                  <input className="input-glass w-full px-3 py-2.5 rounded-lg text-sm font-mono-code"
                    placeholder="0x..." value={sendTo} onChange={e => setSendTo(e.target.value)} />
                </div>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="text-xs mb-1 block" style={{ color: 'rgba(226,232,240,0.5)' }}>Amount</label>
                    <input type="number" className="input-glass w-full px-3 py-2.5 rounded-lg text-sm"
                      placeholder="0.00" value={sendAmount} onChange={e => setSendAmount(e.target.value)} />
                  </div>
                  <div>
                    <label className="text-xs mb-1 block" style={{ color: 'rgba(226,232,240,0.5)' }}>Token</label>
                    <select className="select-glass px-3 py-2.5 rounded-lg text-sm" value={sendCoin} onChange={e => setSendCoin(e.target.value)}>
                      {Object.keys(WALLET_BALANCE).map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <motion.button onClick={handleSend}
                  className="w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
                  style={{
                    background: sent ? 'rgba(118,251,211,0.15)' : 'rgba(22,181,236,0.15)',
                    border: `1px solid ${sent ? 'rgba(118,251,211,0.4)' : 'rgba(22,181,236,0.35)'}`,
                    color: sent ? '#76fbd3' : '#16b5ec',
                  }}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  {sending ? <><Clock size={14} className="animate-spin" /> Processing...</> :
                   sent ? <><CheckCircle size={14} /> Sent!</> :
                   <><Send size={14} /> Send {sendCoin}</>}
                </motion.button>
              </div>
            </div>

            <div className="rounded-xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(22,181,236,0.12)' }}>
              <h3 className="text-sm font-semibold mb-4 flex items-center gap-2" style={{ color: '#16b5ec' }}>
                <Download size={14} /> Recent Transactions
              </h3>
              <div className="space-y-2">
                {[
                  { type: 'Received', amount: '+$12,400', coin: 'USDC', from: 'Dubai Node', time: '2m ago', color: '#76fbd3' },
                  { type: 'Sent', amount: '-$5,200', coin: 'USDT', from: 'London Node', time: '15m ago', color: '#ef4444' },
                  { type: 'Swap', amount: '2.1 ETH', coin: 'ETH→USDC', from: 'Curve', time: '1h ago', color: '#16b5ec' },
                  { type: 'Received', amount: '+$8,900', coin: 'USDC', from: 'NY Node', time: '3h ago', color: '#76fbd3' },
                ].map((tx, i) => (
                  <div key={i} className="flex items-center justify-between px-3 py-2.5 rounded-lg"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(22,181,236,0.08)' }}>
                    <div>
                      <p className="text-xs font-medium" style={{ color: 'rgba(226,232,240,0.8)' }}>{tx.type} · {tx.coin}</p>
                      <p className="text-xs" style={{ color: 'rgba(226,232,240,0.35)' }}>{tx.from} · {tx.time}</p>
                    </div>
                    <span className="text-sm font-bold font-orbitron" style={{ color: tx.color }}>{tx.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Tab 1: Smart Contracts */}
      {activeTab === 1 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { label: 'Total Calls', value: '48,291', color: '#16b5ec' },
              { label: 'Success Rate', value: '99.2%', color: '#76fbd3' },
              { label: 'Avg Gas', value: '54,200', color: '#16b5ec' },
            ].map(s => (
              <div key={s.label} className="rounded-xl p-4 text-center" style={{ background: 'rgba(22,181,236,0.06)', border: '1px solid rgba(22,181,236,0.15)' }}>
                <p className="text-xl font-bold font-orbitron" style={{ color: s.color }}>{s.value}</p>
                <p className="text-xs mt-1" style={{ color: 'rgba(226,232,240,0.4)' }}>{s.label}</p>
              </div>
            ))}
          </div>
          <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(22,181,236,0.15)' }}>
            <table className="w-full text-xs">
              <thead>
                <tr style={{ background: 'rgba(22,181,236,0.08)', borderBottom: '1px solid rgba(22,181,236,0.15)' }}>
                  {['TX Hash', 'Method', 'Gas Used', 'Status', 'Block', 'Time'].map(h => (
                    <th key={h} className="px-4 py-3 text-left font-semibold" style={{ color: 'rgba(22,181,236,0.8)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SMART_CONTRACTS.map((tx, i) => (
                  <motion.tr key={tx.hash} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.06 }}
                    style={{ borderBottom: '1px solid rgba(22,181,236,0.06)' }}>
                    <td className="px-4 py-3 font-mono-code" style={{ color: '#16b5ec' }}>{tx.hash}</td>
                    <td className="px-4 py-3 font-mono-code" style={{ color: '#76fbd3' }}>{tx.method}</td>
                    <td className="px-4 py-3" style={{ color: 'rgba(226,232,240,0.7)' }}>{tx.gas}</td>
                    <td className="px-4 py-3">
                      <span className={`${tx.status === 'success' ? 'badge-online' : tx.status === 'pending' ? 'badge-warning' : 'badge-offline'} px-2 py-0.5 rounded-full text-xs flex items-center gap-1 w-fit`}>
                        {tx.status === 'success' ? <CheckCircle size={10} /> : tx.status === 'pending' ? <Clock size={10} /> : <AlertCircle size={10} />}
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono-code text-xs" style={{ color: 'rgba(226,232,240,0.5)' }}>#{tx.block}</td>
                    <td className="px-4 py-3" style={{ color: 'rgba(226,232,240,0.4)' }}>{tx.time}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Tab 2: Audit Trail */}
      {activeTab === 2 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-5 px-4 py-3 rounded-xl"
            style={{ background: 'rgba(118,251,211,0.06)', border: '1px solid rgba(118,251,211,0.15)' }}>
            <Shield size={16} style={{ color: '#76fbd3' }} />
            <p className="text-xs" style={{ color: 'rgba(226,232,240,0.6)' }}>
              All transactions are cryptographically signed and stored on an immutable ledger. Tamper-proof audit trail compliant with SOC 2 Type II, ISO 27001.
            </p>
          </div>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-5 top-0 bottom-0 w-0.5" style={{ background: 'rgba(118,251,211,0.15)' }} />
            <div className="space-y-4">
              {AUDIT_TRAIL.map((entry, i) => (
                <motion.div key={i} className="flex gap-4 pl-12 relative"
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}>
                  {/* Timeline dot */}
                  <div className="absolute left-3.5 top-3 w-3 h-3 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(118,251,211,0.2)', border: '1px solid rgba(118,251,211,0.4)' }}>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#76fbd3' }} />
                  </div>
                  <div className="flex-1 rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(118,251,211,0.08)' }}>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-sm font-medium" style={{ color: 'rgba(226,232,240,0.9)' }}>{entry.action}</p>
                        <p className="text-xs mt-0.5" style={{ color: 'rgba(226,232,240,0.4)' }}>by {entry.actor}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs" style={{ color: 'rgba(226,232,240,0.35)' }}>{entry.time}</p>
                        {entry.verified && (
                          <span className="text-xs flex items-center gap-1 mt-1" style={{ color: '#76fbd3' }}>
                            <CheckCircle size={10} /> Verified
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="text-xs font-mono-code" style={{ color: '#16b5ec' }}>{entry.hash}</code>
                      <button className="p-1 rounded hover:scale-110 transition-all" style={{ color: 'rgba(226,232,240,0.3)' }}>
                        <Copy size={10} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </ModalOverlay>
  );
}
