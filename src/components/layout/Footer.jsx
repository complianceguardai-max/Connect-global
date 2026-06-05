import { motion } from 'framer-motion';
import { Globe2, MessageCircle, Mail, Share2, Link2, Code2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const FOOTER_LINKS = {
  Platform: [
    { label: 'Global Commerce', action: 'modal', key: 'commerce' },
    { label: 'DeFi & Finance', action: 'modal', key: 'defi' },
    { label: 'International Talent', action: 'modal', key: 'talent' },
    { label: 'Knowledge Library', action: 'modal', key: 'knowledge' },
    { label: 'API Access', action: 'toast' },
  ],
  Company: [
    { label: 'About Us', action: 'toast' },
    { label: 'Careers', action: 'toast' },
    { label: 'Press Kit', action: 'toast' },
    { label: 'Partners', action: 'toast' },
    { label: 'Blog', action: 'toast' },
  ],
  Legal: [
    { label: 'Privacy Policy', action: 'info', key: 'privacy-policy' },
    { label: 'Terms of Service', action: 'info', key: 'terms-of-service' },
    { label: 'Cookie Policy', action: 'toast' },
    { label: 'GDPR Compliance', action: 'info', key: 'gdpr-compliance' },
    { label: 'EU AI Act', action: 'info', key: 'eu-ai-act' },
  ],
  Resources: [
    { label: 'Documentation', action: 'info', key: 'documentation' },
    { label: 'API Reference', action: 'info', key: 'api-reference' },
    { label: 'Status Page', action: 'toast' },
    { label: 'Changelog', action: 'toast' },
    { label: 'Community', action: 'toast' },
  ],
};

export default function Footer() {
  const { setActiveNavModal, openInfoModal, addToast } = useApp();

  const handleLinkClick = (link) => {
    if (link.action === 'modal') {
      setActiveNavModal(link.key);
    } else if (link.action === 'info') {
      openInfoModal(link.key);
    } else if (link.action === 'toast') {
      addToast('Module coming soon in v2.4 🚀', 'info');
    }
  };

  const handleCopyLink = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      addToast('Link copied to clipboard! 🚀', 'success');
    } catch (err) {
      addToast('Failed to copy link', 'info');
    }
  };

  return (
    <footer className="w-full overflow-hidden" style={{ background: '#030406', borderTop: '1px solid rgba(118,251,211,0.08)' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        {/* Top section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 md:gap-10 mb-12 md:mb-14">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(118,251,211,0.2), rgba(22,181,236,0.2))',
                  border: '1px solid rgba(118,251,211,0.3)',
                }}
              >
                <Globe2 size={18} style={{ color: '#76fbd3' }} />
              </div>
              <span className="font-orbitron text-lg font-bold whitespace-nowrap">
                <span style={{ color: '#e2e8f0' }}>Connect</span>
                <span style={{ color: '#76fbd3' }}>Global</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-md" style={{ color: 'rgba(226,232,240,0.45)' }}>
              Unified cross-border services, resources, and commerce for everyone, everywhere. Intuitively
              connecting you with a world of opportunities.
            </p>

            {/* Contact */}
            <div className="space-y-3 mb-6">
              <motion.a
                href="https://wa.me/380932318376"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm transition-all"
                style={{ color: 'rgba(226,232,240,0.5)', textDecoration: 'none' }}
                whileHover={{ x: 4, color: '#25d366' }}
              >
                <MessageCircle size={15} style={{ color: '#25d366' }} />
                +380 93 231 8376
              </motion.a>
              <motion.a
                href="mailto:Complianceguard.ai@gmail.com"
                className="flex items-center gap-3 text-sm transition-all"
                style={{ color: 'rgba(226,232,240,0.5)', textDecoration: 'none' }}
                whileHover={{ x: 4, color: '#16b5ec' }}
              >
                <Mail size={15} style={{ color: '#16b5ec' }} />
                Complianceguard.ai@gmail.com
              </motion.a>
            </div>

            {/* Social */}
            <div className="flex gap-3">
              <motion.button
                onClick={() => addToast('Social sharing coming soon! 🚀', 'info')}
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(118,251,211,0.1)',
                  color: 'rgba(226,232,240,0.4)',
                }}
                whileHover={{ scale: 1.1, borderColor: '#1da1f2', color: '#1da1f2' }}
                whileTap={{ scale: 0.95 }}
              >
                <Share2 size={16} />
              </motion.button>
              <motion.button
                onClick={handleCopyLink}
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(118,251,211,0.1)',
                  color: 'rgba(226,232,240,0.4)',
                }}
                whileHover={{ scale: 1.1, borderColor: '#0077b5', color: '#0077b5' }}
                whileTap={{ scale: 0.95 }}
              >
                <Link2 size={16} />
              </motion.button>
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(118,251,211,0.1)',
                  color: 'rgba(226,232,240,0.4)',
                  textDecoration: 'none',
                }}
                whileHover={{ scale: 1.1, borderColor: '#76fbd3', color: '#76fbd3' }}
                whileTap={{ scale: 0.95 }}
              >
                <Code2 size={16} />
              </motion.a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category} className="min-w-0">
              <h4
                className="font-orbitron font-bold text-xs tracking-wider mb-4"
                style={{ color: '#76fbd3' }}
              >
                {category.toUpperCase()}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <motion.button
                      onClick={() => handleLinkClick(link)}
                      className="text-sm flex items-center gap-1 group text-left w-full"
                      style={{
                        color: 'rgba(226,232,240,0.45)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0,
                      }}
                      whileHover={{ x: 3, color: 'rgba(226,232,240,0.85)' }}
                    >
                      {link.label}
                    </motion.button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div
          className="h-px mb-6 md:mb-8"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(118,251,211,0.15), transparent)' }}
        />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-xs" style={{ color: 'rgba(226,232,240,0.3)' }}>
            © 2024 ConnectGlobal. All rights reserved. Built for the global economy.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-xs" style={{ color: 'rgba(226,232,240,0.3)' }}>
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: '#76fbd3' }}
              />
              All systems operational
            </span>
            <span className="whitespace-nowrap">v2.4.1</span>
            <span className="whitespace-nowrap">SOC 2 Type II</span>
            <span className="whitespace-nowrap">ISO 27001</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
