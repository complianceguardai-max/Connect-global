import { motion } from 'framer-motion';
import { Globe2, MessageCircle, Mail, Share2, Link2, Code2 } from 'lucide-react';

const FOOTER_LINKS = {
  Platform: ['Global Commerce', 'DeFi & Finance', 'International Talent', 'Knowledge Library', 'API Access'],
  Company: ['About Us', 'Careers', 'Press Kit', 'Partners', 'Blog'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR Compliance', 'EU AI Act'],
  Resources: ['Documentation', 'API Reference', 'Status Page', 'Changelog', 'Community'],
};

export default function Footer() {
  return (
    <footer style={{ background: '#030406', borderTop: '1px solid rgba(118,251,211,0.08)' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-14">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, rgba(118,251,211,0.2), rgba(22,181,236,0.2))', border: '1px solid rgba(118,251,211,0.3)' }}>
                <Globe2 size={18} style={{ color: '#76fbd3' }} />
              </div>
              <span className="font-orbitron text-lg font-bold">
                <span style={{ color: '#e2e8f0' }}>Connect</span>
                <span style={{ color: '#76fbd3' }}>Global</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(226,232,240,0.45)' }}>
              Unified cross-border services, resources, and commerce for everyone, everywhere. Intuitively connecting you with a world of opportunities.
            </p>

            {/* Contact */}
            <div className="space-y-3">
              <motion.a href="https://wa.me/380932318376" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm transition-all"
                style={{ color: 'rgba(226,232,240,0.5)', textDecoration: 'none' }}
                whileHover={{ x: 4, color: '#25d366' }}>
                <MessageCircle size={15} style={{ color: '#25d366' }} />
                +380 93 231 8376
              </motion.a>
              <motion.a href="mailto:Complianceguard.ai@gmail.com"
                className="flex items-center gap-3 text-sm transition-all"
                style={{ color: 'rgba(226,232,240,0.5)', textDecoration: 'none' }}
                whileHover={{ x: 4, color: '#16b5ec' }}>
                <Mail size={15} style={{ color: '#16b5ec' }} />
                Complianceguard.ai@gmail.com
              </motion.a>
            </div>

            {/* Social */}
            <div className="flex gap-3 mt-6">
              {[
                { icon: Share2, href: '#', color: '#1da1f2' },
                { icon: Link2, href: '#', color: '#0077b5' },
                { icon: Code2, href: '#', color: '#76fbd3' },
              ].map(({ icon: Icon, href, color }, i) => (
                <motion.a key={i} href={href}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(118,251,211,0.1)', color: 'rgba(226,232,240,0.4)' }}
                  whileHover={{ scale: 1.1, borderColor: color, color }}
                  whileTap={{ scale: 0.95 }}>
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-orbitron font-bold text-xs tracking-wider mb-4" style={{ color: '#76fbd3' }}>
                {category.toUpperCase()}
              </h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link}>
                    <motion.a href="#"
                      className="text-sm flex items-center gap-1 group"
                      style={{ color: 'rgba(226,232,240,0.45)', textDecoration: 'none' }}
                      whileHover={{ x: 3, color: 'rgba(226,232,240,0.85)' }}>
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px mb-8" style={{ background: 'linear-gradient(90deg, transparent, rgba(118,251,211,0.15), transparent)' }} />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: 'rgba(226,232,240,0.3)' }}>
            © 2024 ConnectGlobal. All rights reserved. Built for the global economy.
          </p>
          <div className="flex items-center gap-6 text-xs" style={{ color: 'rgba(226,232,240,0.3)' }}>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#76fbd3' }} />
              All systems operational
            </span>
            <span>v2.4.1</span>
            <span>SOC 2 Type II</span>
            <span>ISO 27001</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
