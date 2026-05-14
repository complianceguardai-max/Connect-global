import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import CityNodePopup from './CityNodePopup';

export const CITIES = [
  {
    id: 'dubai',
    name: 'Dubai',
    x: 61.5,
    y: 42.5,
    tradeVolume: '$2.4T',
    activeUsers: '284,000',
    latency: '12ms',
    region: 'Middle East',
    status: 'online',
    connections: ['london', 'singapore', 'tokyo'],
  },
  {
    id: 'london',
    name: 'London',
    x: 47.5,
    y: 26.5,
    tradeVolume: '$3.1T',
    activeUsers: '412,000',
    latency: '8ms',
    region: 'Europe',
    status: 'online',
    connections: ['dubai', 'newyork', 'singapore'],
  },
  {
    id: 'newyork',
    name: 'New York',
    x: 26.5,
    y: 31.5,
    tradeVolume: '$4.2T',
    activeUsers: '538,000',
    latency: '6ms',
    region: 'North America',
    status: 'online',
    connections: ['london', 'saopaulo', 'singapore'],
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    x: 80.5,
    y: 33.5,
    tradeVolume: '$2.8T',
    activeUsers: '367,000',
    latency: '9ms',
    region: 'Asia Pacific',
    status: 'online',
    connections: ['dubai', 'singapore', 'sydney'],
  },
  {
    id: 'saopaulo',
    name: 'São Paulo',
    x: 33.5,
    y: 65.5,
    tradeVolume: '$1.2T',
    activeUsers: '198,000',
    latency: '18ms',
    region: 'South America',
    status: 'online',
    connections: ['newyork', 'london', 'rio'],
  },
  {
    id: 'singapore',
    name: 'Singapore',
    x: 74.5,
    y: 54.5,
    tradeVolume: '$2.1T',
    activeUsers: '321,000',
    latency: '11ms',
    region: 'Southeast Asia',
    status: 'online',
    connections: ['dubai', 'tokyo', 'sydney'],
  },
  {
    id: 'sydney',
    name: 'Sydney',
    x: 83.5,
    y: 72.5,
    tradeVolume: '$0.9T',
    activeUsers: '142,000',
    latency: '22ms',
    region: 'Oceania',
    status: 'online',
    connections: ['singapore', 'tokyo'],
  },
  {
    id: 'ghana',
    name: 'Ghiang',
    x: 44.5,
    y: 52.5,
    tradeVolume: '$0.4T',
    activeUsers: '87,000',
    latency: '28ms',
    region: 'West Africa',
    status: 'online',
    connections: ['london', 'saopaulo'],
  },
  {
    id: 'rio',
    name: 'Rio',
    x: 35.5,
    y: 70.5,
    tradeVolume: '$0.8T',
    activeUsers: '124,000',
    latency: '20ms',
    region: 'South America',
    status: 'online',
    connections: ['saopaulo', 'newyork'],
  },
];

function getConnections() {
  const pairs = new Set();
  const result = [];
  CITIES.forEach(city => {
    city.connections.forEach(targetId => {
      const key = [city.id, targetId].sort().join('-');
      if (!pairs.has(key)) {
        pairs.add(key);
        const target = CITIES.find(c => c.id === targetId);
        if (target) result.push({ from: city, to: target, key });
      }
    });
  });
  return result;
}

export default function WorldMap() {
  const { selectedCity, setSelectedCity } = useApp();
  const [animatedLines, setAnimatedLines] = useState([]);
  const connections = getConnections();

  useEffect(() => {
    const timers = connections.map((_, i) =>
      setTimeout(() => setAnimatedLines(prev => [...prev, i]), 200 + i * 150)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    /* Full-bleed container — fills the absolute parent in HeroSection */
    <div
      className="w-full h-full"
      style={{ position: 'relative' }}
    >
      <svg
        viewBox="0 0 1000 500"
        preserveAspectRatio="xMidYMid slice"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      >
        <defs>
          <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(22,181,236,0.18)" />
            <stop offset="100%" stopColor="rgba(3,4,6,0)" />
          </radialGradient>
          <filter id="glow-filter">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="node-glow">
            <feGaussianBlur stdDeviation="5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#76fbd3" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#16b5ec" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#76fbd3" stopOpacity="0.5" />
          </linearGradient>
          {/* Teal dot gradient for nodes */}
          <radialGradient id="nodeGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#76fbd3" />
            <stop offset="100%" stopColor="#16b5ec" />
          </radialGradient>
        </defs>

        {/* Dark teal background wash */}
        <rect width="1000" height="500" fill="rgba(3,8,18,0.55)" />
        <rect width="1000" height="500" fill="url(#mapGlow)" />

        {/* Continent shapes — teal/cyan tinted */}
        <g opacity="0.22" fill="rgba(22,181,236,0.55)" stroke="rgba(118,251,211,0.35)" strokeWidth="0.6">
          {/* North America */}
          <path d="M 80 80 L 120 70 L 180 75 L 220 90 L 260 100 L 280 130 L 270 160 L 250 180 L 230 200 L 200 220 L 180 240 L 160 230 L 140 210 L 120 190 L 100 170 L 85 150 L 75 120 Z" />
          {/* Greenland */}
          <path d="M 200 40 L 240 35 L 260 50 L 250 70 L 220 75 L 200 60 Z" />
          {/* South America */}
          <path d="M 220 260 L 260 250 L 290 270 L 310 310 L 320 360 L 300 400 L 270 420 L 240 410 L 220 380 L 210 340 L 215 300 Z" />
          {/* Europe */}
          <path d="M 420 60 L 480 55 L 520 65 L 540 80 L 530 100 L 510 110 L 490 120 L 470 115 L 450 105 L 430 95 L 415 80 Z" />
          {/* Africa */}
          <path d="M 440 130 L 490 125 L 530 140 L 550 170 L 560 210 L 555 260 L 540 300 L 510 330 L 480 340 L 450 330 L 430 300 L 420 260 L 415 210 L 420 170 Z" />
          {/* Asia */}
          <path d="M 540 55 L 650 50 L 750 60 L 820 70 L 860 90 L 870 120 L 850 150 L 800 160 L 750 155 L 700 165 L 660 170 L 620 160 L 580 150 L 550 130 L 535 100 Z" />
          {/* Middle East */}
          <path d="M 560 140 L 620 135 L 650 150 L 640 180 L 610 190 L 580 185 L 560 170 Z" />
          {/* Southeast Asia */}
          <path d="M 720 170 L 780 165 L 810 180 L 800 210 L 770 220 L 740 215 L 720 200 Z" />
          {/* Australia */}
          <path d="M 760 310 L 840 300 L 880 320 L 890 360 L 870 400 L 830 420 L 790 415 L 760 390 L 745 350 Z" />
          {/* Japan */}
          <path d="M 820 120 L 840 115 L 855 130 L 845 150 L 825 148 Z" />
          {/* UK */}
          <path d="M 455 70 L 470 65 L 478 78 L 465 88 L 452 82 Z" />
        </g>

        {/* Connection Lines */}
        {connections.map((conn, i) => {
          const x1 = conn.from.x * 10;
          const y1 = conn.from.y * 5;
          const x2 = conn.to.x * 10;
          const y2 = conn.to.y * 5;
          const mx = (x1 + x2) / 2;
          const my = Math.min(y1, y2) - 40;
          const pathD = `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`;

          return (
            <g key={conn.key}>
              {/* Base dim line */}
              <path d={pathD} fill="none" stroke="rgba(118,251,211,0.07)" strokeWidth="1" />
              {/* Animated glowing line */}
              {animatedLines.includes(i) && (
                <motion.path
                  d={pathD}
                  fill="none"
                  stroke="url(#lineGrad)"
                  strokeWidth="1.5"
                  filter="url(#glow-filter)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: 'easeInOut' }}
                />
              )}
              {/* Traveling dot */}
              {animatedLines.includes(i) && (
                <motion.circle
                  r="3"
                  fill="#76fbd3"
                  filter="url(#node-glow)"
                  animate={{ opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
                >
                  <animateMotion dur="3s" repeatCount="indefinite" begin={`${i * 0.4}s`}>
                    <mpath href={`#path-${conn.key}`} />
                  </animateMotion>
                </motion.circle>
              )}
              <path id={`path-${conn.key}`} d={pathD} fill="none" stroke="none" />
            </g>
          );
        })}

        {/* City Nodes — cyan/teal glowing dots */}
        {CITIES.map((city, i) => {
          const cx = city.x * 10;
          const cy = city.y * 5;
          const isSelected = selectedCity?.id === city.id;

          return (
            <g
              key={city.id}
              style={{ cursor: 'pointer' }}
              onClick={() => setSelectedCity(isSelected ? null : city)}
            >
              {/* Outer pulse ring */}
              <motion.circle
                cx={cx} cy={cy} r="20"
                fill="none"
                stroke={isSelected ? '#76fbd3' : 'rgba(118,251,211,0.25)'}
                strokeWidth="1"
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: [1, 1.9, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.35 }}
              />
              {/* Middle ring */}
              <motion.circle
                cx={cx} cy={cy} r="11"
                fill="none"
                stroke={isSelected ? '#76fbd3' : 'rgba(22,181,236,0.45)'}
                strokeWidth="1.5"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              />
              {/* Core glowing dot */}
              <motion.circle
                cx={cx} cy={cy} r={isSelected ? 7 : 5}
                fill="url(#nodeGrad)"
                filter="url(#node-glow)"
                animate={{ r: isSelected ? 7 : [5, 6.5, 5] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              />
              {/* Bright center */}
              <circle cx={cx} cy={cy} r="2" fill="white" opacity="0.95" />

              {/* City label */}
              <motion.text
                x={cx}
                y={cy - 24}
                textAnchor="middle"
                fontSize="10"
                fontFamily="Orbitron, monospace"
                fontWeight="600"
                fill={isSelected ? '#76fbd3' : 'rgba(226,232,240,0.75)'}
                filter={isSelected ? 'url(#glow-filter)' : undefined}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 + i * 0.1 }}
              >
                {city.name}
              </motion.text>
            </g>
          );
        })}
      </svg>

      {/* City Popup */}
      <AnimatePresence>
        {selectedCity && (
          <CityNodePopup city={selectedCity} onClose={() => setSelectedCity(null)} />
        )}
      </AnimatePresence>

      {/* Legend — bottom left */}
      <div
        className="absolute bottom-4 left-5 flex items-center gap-5 text-xs z-10"
        style={{ color: 'rgba(226,232,240,0.35)' }}
      >
        <div className="flex items-center gap-1.5">
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: '#76fbd3', boxShadow: '0 0 8px #76fbd3' }}
          />
          <span>Active Node</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div
            className="w-6 h-0.5 rounded"
            style={{ background: 'linear-gradient(90deg, #76fbd3, #16b5ec)' }}
          />
          <span>Trade Route</span>
        </div>
      </div>

      {/* Click hint — bottom right */}
      <div
        className="absolute bottom-4 right-5 text-xs z-10"
        style={{ color: 'rgba(226,232,240,0.28)' }}
      >
        Click a node to explore
      </div>
    </div>
  );
}
