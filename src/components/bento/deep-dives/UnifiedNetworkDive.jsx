import { useState } from 'react';
import { motion } from 'framer-motion';
import { Server, Wifi, Activity, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import ModalOverlay from '../../ui/ModalOverlay';

const DATA_CENTERS = [
  { id: 'dc1', name: 'Dubai DC-1', region: 'ME', load: 72, status: 'online', latency: '8ms', uptime: '99.99%', x: 62, y: 42 },
  { id: 'dc2', name: 'London DC-2', region: 'EU', load: 58, status: 'online', latency: '5ms', uptime: '99.97%', x: 47, y: 26 },
  { id: 'dc3', name: 'New York DC-3', region: 'NA', load: 84, status: 'warning', latency: '4ms', uptime: '99.95%', x: 26, y: 31 },
  { id: 'dc4', name: 'Tokyo DC-4', region: 'APAC', load: 45, status: 'online', latency: '6ms', uptime: '99.99%', x: 80, y: 33 },
  { id: 'dc5', name: 'São Paulo DC-5', region: 'SA', load: 31, status: 'online', latency: '14ms', uptime: '99.92%', x: 33, y: 65 },
  { id: 'dc6', name: 'Singapore DC-6', region: 'SEA', load: 67, status: 'online', latency: '7ms', uptime: '99.98%', x: 74, y: 54 },
  { id: 'dc7', name: 'Sydney DC-7', region: 'OCE', load: 22, status: 'online', latency: '18ms', uptime: '99.96%', x: 83, y: 72 },
  { id: 'dc8', name: 'Frankfurt DC-8', region: 'EU', load: 91, status: 'warning', latency: '6ms', uptime: '99.94%', x: 51, y: 28 },
];

const STATUS_ICON = {
  online: <CheckCircle size={12} />,
  warning: <AlertCircle size={12} />,
  offline: <XCircle size={12} />,
};

const STATUS_CLASS = {
  online: 'badge-online',
  warning: 'badge-warning',
  offline: 'badge-offline',
};

export default function UnifiedNetworkDive({ isOpen, onClose }) {
  const [selectedDC, setSelectedDC] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  const totalLoad = Math.round(DATA_CENTERS.reduce((a, d) => a + d.load, 0) / DATA_CENTERS.length);

  return (
    <ModalOverlay isOpen={isOpen} onClose={onClose} title="Unified Global Network" subtitle="Data center map, server status & load balancing" size="xl" accent="mint">
      <div className="flex gap-2 mb-5">
        {['Network Map', 'Server Status', 'Load Balancing'].map((tab, i) => (
          <button key={tab} onClick={() => setActiveTab(i)}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
            style={{
              background: activeTab === i ? 'rgba(118,251,211,0.15)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${activeTab === i ? 'rgba(118,251,211,0.4)' : 'rgba(118,251,211,0.1)'}`,
              color: activeTab === i ? '#76fbd3' : 'rgba(226,232,240,0.6)',
            }}>{tab}</button>
        ))}
      </div>

      {/* Tab 0: Network Map */}
      {activeTab === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="grid grid-cols-4 gap-3 mb-5">
            {[
              { label: 'Active DCs', value: '8', color: '#76fbd3' },
              { label: 'Avg Load', value: `${totalLoad}%`, color: '#16b5ec' },
              { label: 'Total Nodes', value: '847', color: '#76fbd3' },
              { label: 'Uptime', value: '99.97%', color: '#76fbd3' },
            ].map(s => (
              <div key={s.label} className="rounded-xl p-3 text-center" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(118,251,211,0.1)' }}>
                <p className="text-xl font-bold font-orbitron" style={{ color: s.color }}>{s.value}</p>
                <p className="text-xs mt-1" style={{ color: 'rgba(226,232,240,0.4)' }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Dot grid map */}
          <div className="rounded-xl p-4 relative overflow-hidden" style={{ background: 'rgba(5,10,20,0.8)', border: '1px solid rgba(118,251,211,0.1)', minHeight: 220 }}>
            <svg viewBox="0 0 100 60" className="w-full" style={{ height: 200 }}>
              {/* Grid dots */}
              {Array.from({ length: 20 }, (_, row) =>
                Array.from({ length: 34 }, (_, col) => (
                  <circle key={`${row}-${col}`} cx={col * 3 + 1} cy={row * 3 + 1} r="0.4"
                    fill="rgba(118,251,211,0.15)" />
                ))
              )}
              {/* Connection lines */}
              {DATA_CENTERS.slice(0, 6).map((dc, i) => {
                const next = DATA_CENTERS[(i + 1) % 6];
                return (
                  <motion.line key={dc.id}
                    x1={dc.x * 0.1} y1={dc.y * 0.12}
                    x2={next.x * 0.1} y2={next.y * 0.12}
                    stroke="rgba(22,181,236,0.3)" strokeWidth="0.3"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: i * 0.2 }}
                  />
                );
              })}
              {/* DC nodes */}
              {DATA_CENTERS.map((dc, i) => (
                <g key={dc.id} style={{ cursor: 'pointer' }} onClick={() => setSelectedDC(selectedDC?.id === dc.id ? null : dc)}>
                  <motion.circle cx={dc.x * 0.1} cy={dc.y * 0.12} r="2.5"
                    fill={dc.status === 'online' ? '#76fbd3' : '#fbbf24'}
                    opacity="0.9"
                    animate={{ r: [2.5, 3.2, 2.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  />
                  <circle cx={dc.x * 0.1} cy={dc.y * 0.12} r="4"
                    fill="none" stroke={dc.status === 'online' ? 'rgba(118,251,211,0.3)' : 'rgba(251,191,36,0.3)'} strokeWidth="0.5" />
                  <text x={dc.x * 0.1} y={dc.y * 0.12 - 5} textAnchor="middle" fontSize="2.5"
                    fill="rgba(226,232,240,0.7)" fontFamily="Orbitron">{dc.region}</text>
                </g>
              ))}
            </svg>

            {/* Selected DC info */}
            {selectedDC && (
              <motion.div className="absolute bottom-3 right-3 rounded-lg p-3 w-48"
                style={{ background: 'rgba(5,10,20,0.97)', border: '1px solid rgba(118,251,211,0.25)' }}
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                <p className="text-xs font-bold mb-2" style={{ color: '#76fbd3' }}>{selectedDC.name}</p>
                {[
                  { label: 'Load', value: `${selectedDC.load}%` },
                  { label: 'Latency', value: selectedDC.latency },
                  { label: 'Uptime', value: selectedDC.uptime },
                ].map(s => (
                  <div key={s.label} className="flex justify-between text-xs mb-1">
                    <span style={{ color: 'rgba(226,232,240,0.4)' }}>{s.label}</span>
                    <span style={{ color: 'rgba(226,232,240,0.8)' }}>{s.value}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* Tab 1: Server Status */}
      {activeTab === 1 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(118,251,211,0.1)' }}>
            <table className="w-full text-xs">
              <thead>
                <tr style={{ background: 'rgba(118,251,211,0.06)', borderBottom: '1px solid rgba(118,251,211,0.1)' }}>
                  {['Data Center', 'Region', 'Status', 'Load', 'Latency', 'Uptime'].map(h => (
                    <th key={h} className="px-4 py-3 text-left font-semibold" style={{ color: 'rgba(118,251,211,0.8)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {DATA_CENTERS.map((dc, i) => (
                  <motion.tr key={dc.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                    style={{ borderBottom: '1px solid rgba(118,251,211,0.05)' }}>
                    <td className="px-4 py-3 font-medium" style={{ color: 'rgba(226,232,240,0.85)' }}>{dc.name}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded text-xs" style={{ background: 'rgba(22,181,236,0.1)', color: '#16b5ec', border: '1px solid rgba(22,181,236,0.2)' }}>{dc.region}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`${STATUS_CLASS[dc.status]} px-2 py-0.5 rounded-full text-xs flex items-center gap-1 w-fit`}>
                        {STATUS_ICON[dc.status]} {dc.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
                          <motion.div className="h-full rounded-full"
                            style={{ background: dc.load > 80 ? '#fbbf24' : 'linear-gradient(90deg, #76fbd3, #16b5ec)' }}
                            initial={{ width: 0 }} animate={{ width: `${dc.load}%` }} transition={{ duration: 0.8, delay: i * 0.05 }} />
                        </div>
                        <span style={{ color: dc.load > 80 ? '#fbbf24' : 'rgba(226,232,240,0.7)' }}>{dc.load}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono-code" style={{ color: '#76fbd3' }}>{dc.latency}</td>
                    <td className="px-4 py-3" style={{ color: 'rgba(226,232,240,0.7)' }}>{dc.uptime}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Tab 2: Load Balancing */}
      {activeTab === 2 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="rounded-xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(118,251,211,0.1)' }}>
              <h3 className="text-sm font-semibold mb-4 flex items-center gap-2" style={{ color: '#76fbd3' }}>
                <Activity size={14} /> Load Distribution
              </h3>
              <div className="space-y-3">
                {DATA_CENTERS.map((dc, i) => (
                  <div key={dc.id} className="flex items-center gap-3">
                    <span className="text-xs w-28 shrink-0" style={{ color: 'rgba(226,232,240,0.6)' }}>{dc.region}</span>
                    <div className="flex-1 h-5 rounded-lg overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                      <motion.div className="h-full rounded-lg flex items-center px-2"
                        style={{ background: dc.load > 80 ? 'rgba(251,191,36,0.2)' : 'rgba(118,251,211,0.15)', border: `1px solid ${dc.load > 80 ? 'rgba(251,191,36,0.3)' : 'rgba(118,251,211,0.2)'}` }}
                        initial={{ width: 0 }} animate={{ width: `${dc.load}%` }} transition={{ duration: 0.8, delay: i * 0.08 }}>
                        <span className="text-xs font-bold" style={{ color: dc.load > 80 ? '#fbbf24' : '#76fbd3' }}>{dc.load}%</span>
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(118,251,211,0.1)' }}>
                <h3 className="text-sm font-semibold mb-3" style={{ color: '#76fbd3' }}>Balancing Algorithm</h3>
                <div className="space-y-2">
                  {[
                    { algo: 'Round Robin', active: false },
                    { algo: 'Least Connections', active: true },
                    { algo: 'IP Hash', active: false },
                    { algo: 'Weighted Round Robin', active: false },
                  ].map(({ algo, active }) => (
                    <div key={algo} className="flex items-center justify-between px-3 py-2 rounded-lg"
                      style={{ background: active ? 'rgba(118,251,211,0.08)' : 'rgba(255,255,255,0.02)', border: `1px solid ${active ? 'rgba(118,251,211,0.25)' : 'rgba(255,255,255,0.06)'}` }}>
                      <span className="text-xs" style={{ color: active ? '#76fbd3' : 'rgba(226,232,240,0.5)' }}>{algo}</span>
                      {active && <span className="text-xs px-2 py-0.5 rounded-full badge-online">Active</span>}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl p-4" style={{ background: 'rgba(22,181,236,0.05)', border: '1px solid rgba(22,181,236,0.15)' }}>
                <h3 className="text-sm font-semibold mb-3" style={{ color: '#16b5ec' }}>Auto-Scaling Events</h3>
                <div className="space-y-2 text-xs">
                  {[
                    { event: 'NY DC-3 scaled up +2 nodes', time: '2m ago', type: 'scale-up' },
                    { event: 'Frankfurt DC-8 alert: 91% load', time: '5m ago', type: 'alert' },
                    { event: 'Sydney DC-7 scaled down -1 node', time: '12m ago', type: 'scale-down' },
                  ].map(({ event, time, type }) => (
                    <div key={event} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                        style={{ background: type === 'alert' ? '#fbbf24' : type === 'scale-up' ? '#76fbd3' : '#16b5ec' }} />
                      <div>
                        <p style={{ color: 'rgba(226,232,240,0.7)' }}>{event}</p>
                        <p style={{ color: 'rgba(226,232,240,0.3)' }}>{time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </ModalOverlay>
  );
}
