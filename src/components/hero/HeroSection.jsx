import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import NetworkCanvas from './NetworkCanvas';

export default function HeroSection() {
  const { t, openOnboarding } = useApp();

  return (
    <section
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{
        height: '100vh',
        minHeight: '600px',
        maxHeight: '100vh',
        background: '#0a1628',
      }}
    >
      {/* ── Sharp Static Background Image ── */}
      <img
        src="/map-bg.png.jpeg"
        alt=""
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
      />

      {/* ── Dimming Overlay ── */}
      <div
        className="absolute inset-0 bg-black/50"
        style={{ zIndex: 1 }}
      />

      {/* ── Crystal-Clear Canvas Animation Layer ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          pointerEvents: 'none',
        }}
      >
        <NetworkCanvas />
      </div>

      {/* ── Hero Content - Floating Text ── */}
      <div
        className="relative text-center px-4 flex flex-col items-center justify-center"
        style={{ zIndex: 3, marginTop: '-3vh' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex flex-col items-center"
        >
          {/* Live badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-medium"
            style={{
              background: 'rgba(118,251,211,0.08)',
              border: '1px solid rgba(118,251,211,0.25)',
              color: '#76fbd3',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: '#76fbd3', boxShadow: '0 0 6px #76fbd3' }}
            />
            Live Network — 195+ Countries Connected
          </motion.div>

          {/* Main headline — Orbitron, scaled to match reference */}
          <h1
            className="font-orbitron font-black leading-none mb-4"
            style={{ fontSize: 'clamp(1.6rem, 3.8vw, 3.2rem)', letterSpacing: '-0.01em' }}
          >
            <motion.span
              className="block"
              style={{
                color: '#e2e8f0',
                textShadow: '0 4px 20px rgba(0,0,0,1), 0 2px 10px rgba(0,0,0,0.8), 0 8px 30px rgba(0,0,0,0.6)',
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {t('hero_title_1')}
            </motion.span>
            <motion.span
              className="block bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-500 bg-clip-text text-transparent"
              style={{
                filter: 'drop-shadow(0 4px 12px rgba(0,0,0,1))',
                WebkitTextFillColor: 'transparent',
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
            >
              {t('hero_title_2')}
            </motion.span>
          </h1>

          {/* Subtitle */}
          <motion.p
            className="text-sm md:text-base max-w-lg mx-auto mb-8 leading-relaxed"
            style={{
              color: 'rgba(226,232,240,0.9)',
              textShadow: '0 4px 20px rgba(0,0,0,1), 0 2px 10px rgba(0,0,0,0.8)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {t('hero_subtitle')}
          </motion.p>

          {/* CTA Button — single centered pill matching reference */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <motion.button
              onClick={openOnboarding}
              className="pill-btn-primary font-orbitron font-bold text-xs tracking-widest"
              style={{ minWidth: '200px' }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(118,251,211,0.55), 0 0 80px rgba(118,251,211,0.22)' }}
              whileTap={{ scale: 0.97 }}
            >
              CONNECT NOW
            </motion.button>

            <motion.button
              className="pill-btn-secondary font-orbitron font-bold text-xs tracking-widest"
              style={{ minWidth: '200px' }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(22,181,236,0.45), 0 0 60px rgba(22,181,236,0.18)' }}
              whileTap={{ scale: 0.97 }}
            >
              {t('hero_cta')}
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ zIndex: 3 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <span className="text-xs tracking-widest" style={{ color: 'rgba(118,251,211,0.35)' }}>
          SCROLL
        </span>
        <motion.div
          className="w-0.5 h-7 rounded-full"
          style={{ background: 'linear-gradient(to bottom, rgba(118,251,211,0.45), transparent)' }}
          animate={{ scaleY: [1, 0.5, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
