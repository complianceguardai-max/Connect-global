import { motion } from 'framer-motion';
import { X, Activity, Users, Zap, Globe, TrendingUp } from 'lucide-react';

export default function CityNodePopup({ city, onClose }) {
  return (
    <motion.div
      className="absolute z-20 w-64"
      style={{
        left: `${Math.min(Math.max(city.x - 13, 2), 72)}%`,
        top: `${Math.min(Math.max(city.y * 0.95 - 30, 5), 55)}%`,
      }}
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 10 }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
    >
      <div
        className="rounded-xl overflow-hidden"
        style={{
          background: 'rgba(5,10,20,0.97)',
          border: '1px solid rgba(118,251,211,0.3)',
          boxShadow: '0 0 30px rgba(118,251,211,0.15), 0 20px 40px rgba(0,0,0,0.5)',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{
            background: 'linear-gradient(135deg, rgba(118,251,211,0.1), rgba(22,181,236,0.08))',
            borderBottom: '1px solid rgba(118,251,211,0.15)',
          }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: '#76fbd3', boxShadow: '0 0 6px #76fbd3' }}
            />
            <span className="font-orbitron font-bold text-sm" style={{ color: '#76fbd3' }}>
              {city.name}
            </span>
            <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'rgba(118,251,211,0.1)', color: 'rgba(118,251,211,0.7)' }}>
              {city.region}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-6 h-6 rounded flex items-center justify-center transition-all hover:scale-110"
            style={{ color: 'rgba(226,232,240,0.5)', background: 'rgba(255,255,255,0.05)' }}
          >
            <X size={12} />
          </button>
        </div>

        {/* Stats */}
        <div className="p-4 space-y-3">
          {[
            {
              icon: TrendingUp,
              label: 'Trade Volume',
              value: city.tradeVolume,
              color: '#76fbd3',
              sub: 'Annual cross-border',
            },
            {
              icon: Users,
              label: 'Active Users',
              value: city.activeUsers,
              color: '#16b5ec',
              sub: 'Connected this month',
            },
            {
              icon: Zap,
              label: 'Network Latency',
              value: city.latency,
              color: '#76fbd3',
              sub: 'Avg response time',
            },
          ].map(({ icon: Icon, label, value, color, sub }) => (
            <div key={label} className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: `${color}12`, border: `1px solid ${color}25` }}
              >
                <Icon size={14} style={{ color }} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: 'rgba(226,232,240,0.5)' }}>{label}</span>
                  <motion.span
                    className="text-sm font-bold font-orbitron"
                    style={{ color }}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {value}
                  </motion.span>
                </div>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(226,232,240,0.3)' }}>{sub}</p>
              </div>
            </div>
          ))}

          {/* Connected nodes */}
          <div className="pt-2 border-t" style={{ borderColor: 'rgba(118,251,211,0.1)' }}>
            <p className="text-xs mb-2 flex items-center gap-1" style={{ color: 'rgba(226,232,240,0.4)' }}>
              <Activity size={11} /> Connected to {city.connections.length} nodes
            </p>
            <div className="flex flex-wrap gap-1.5">
              {city.connections.map(conn => (
                <span
                  key={conn}
                  className="text-xs px-2 py-0.5 rounded-full capitalize"
                  style={{
                    background: 'rgba(22,181,236,0.1)',
                    border: '1px solid rgba(22,181,236,0.2)',
                    color: '#16b5ec',
                  }}
                >
                  {conn === 'newyork' ? 'New York' : conn === 'saopaulo' ? 'São Paulo' : conn.charAt(0).toUpperCase() + conn.slice(1)}
                </span>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs" style={{ color: 'rgba(226,232,240,0.4)' }}>Node Status</span>
            <span className="badge-online text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
              <Globe size={10} /> Online
            </span>
          </div>
        </div>
      </div>

      {/* Pointer arrow */}
      <div
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45"
        style={{
          background: 'rgba(5,10,20,0.97)',
          borderRight: '1px solid rgba(118,251,211,0.3)',
          borderBottom: '1px solid rgba(118,251,211,0.3)',
        }}
      />
    </motion.div>
  );
}
