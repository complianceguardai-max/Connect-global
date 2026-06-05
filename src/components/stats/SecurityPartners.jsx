import { useState } from 'react';
import { Shield, Lock, Eye, Users, Server, FileCheck, X } from 'lucide-react';

const PARTNERS = [
  {
    id: 'cloudflare',
    name: 'Cloudflare',
    icon: Server,
    description: 'Enterprise-grade DDoS protection and CDN services ensuring 99.99% uptime with intelligent traffic routing across 300+ global data centers.',
    color: '#f38020',
  },
  {
    id: 'aws-shield',
    name: 'AWS Shield',
    icon: Shield,
    description: 'Advanced DDoS protection maintaining 99.9% network availability with automatic threat detection and mitigation at the network and application layers.',
    color: '#ff9900',
  },
  {
    id: 'chainanalysis',
    name: 'Chainanalysis',
    icon: Eye,
    description: 'Real-time blockchain transaction monitoring and compliance screening preventing fraud and ensuring regulatory compliance across all crypto operations.',
    color: '#00d4ff',
  },
  {
    id: 'okta',
    name: 'Okta',
    icon: Users,
    description: 'Enterprise identity and access management with multi-factor authentication, single sign-on, and adaptive security policies protecting user accounts.',
    color: '#007dc1',
  },
  {
    id: 'palo-alto',
    name: 'Palo Alto Networks',
    icon: Lock,
    description: 'Next-generation firewall and threat prevention with AI-powered security analytics detecting and blocking advanced cyber threats in real-time.',
    color: '#fa582d',
  },
  {
    id: 'sumsub',
    name: 'Sumsub',
    icon: FileCheck,
    description: 'Automated enterprise-level KYC/AML compliance verification with document authentication, biometric checks, and continuous monitoring across 220+ countries.',
    color: '#6c5ce7',
  },
];

export default function SecurityPartners() {
  const [selectedPartner, setSelectedPartner] = useState(null);

  return (
    <section
      className="w-full py-12 md:py-16 relative z-10 overflow-hidden"
      style={{ background: '#0a0e17' }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 md:mb-10 overflow-hidden">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-xs font-medium"
            style={{
              background: 'rgba(118,251,211,0.07)',
              border: '1px solid rgba(118,251,211,0.2)',
              color: '#76fbd3',
            }}
          >
            <Shield size={14} style={{ color: '#76fbd3' }} />
            Enterprise Security
          </div>
          <h2 className="font-orbitron font-black text-xl sm:text-2xl md:text-3xl mb-3 overflow-hidden">
            <span style={{ color: '#e2e8f0' }}>TRUSTED </span>
            <span style={{ 
              background: 'linear-gradient(135deg, #76fbd3 0%, #16b5ec 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline-block'
            }}>SECURITY PARTNERS</span>
          </h2>
          <p className="text-sm max-w-2xl mx-auto px-4" style={{ color: 'rgba(226,232,240,0.45)' }}>
            Industry-leading security infrastructure protecting your data and transactions 24/7
          </p>
        </div>

        {/* Partner Cards Grid */}
        <div className="w-full flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {PARTNERS.map((partner) => {
            const PartnerIcon = partner.icon;
            return (
              <button
                key={partner.id}
                onClick={() => setSelectedPartner(partner)}
                className="w-full aspect-square rounded-2xl flex flex-col items-center justify-center gap-3 p-4 cursor-pointer transition-all duration-300 max-w-full"
                style={{
                  background: '#0f1928',
                  border: '1px solid rgba(118, 251, 211, 0.15)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${partner.color}60`;
                  e.currentTarget.style.boxShadow = `0 0 20px ${partner.color}25`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(118, 251, 211, 0.15)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <PartnerIcon size={32} style={{ color: partner.color }} />
                <span
                  className="text-xs font-semibold text-center leading-tight"
                  style={{ color: 'rgba(226, 232, 240, 0.8)' }}
                >
                  {partner.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Full-Screen Modal Overlay */}
      {selectedPartner && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0, 0, 0, 0.85)' }}
          onClick={() => setSelectedPartner(null)}
        >
          <div
            className="relative w-full max-w-md rounded-2xl p-6"
            style={{
              background: 'rgba(10, 22, 40, 0.98)',
              border: `2px solid ${selectedPartner.color}40`,
              boxShadow: `0 0 40px ${selectedPartner.color}30, 0 20px 40px rgba(0, 0, 0, 0.7)`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPartner(null)}
              className="absolute top-4 right-4 p-2 rounded-lg transition-all duration-200"
              style={{
                background: `${selectedPartner.color}15`,
                border: `1px solid ${selectedPartner.color}30`,
                color: selectedPartner.color,
              }}
            >
              <X size={18} />
            </button>

            {/* Modal Content */}
            <div className="flex items-start gap-3 mb-4 pr-8">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: `${selectedPartner.color}20`,
                  border: `1px solid ${selectedPartner.color}50`,
                }}
              >
                <selectedPartner.icon size={24} style={{ color: selectedPartner.color }} />
              </div>
              <div>
                <h4 
                  className="font-orbitron font-bold text-lg mb-1" 
                  style={{ color: selectedPartner.color }}
                >
                  {selectedPartner.name}
                </h4>
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ 
                      background: selectedPartner.color, 
                      boxShadow: `0 0 6px ${selectedPartner.color}` 
                    }}
                  />
                  <span className="text-xs" style={{ color: 'rgba(226, 232, 240, 0.6)' }}>
                    Active Protection
                  </span>
                </div>
              </div>
            </div>
            
            <p 
              className="text-sm leading-relaxed" 
              style={{ color: 'rgba(226, 232, 240, 0.75)' }}
            >
              {selectedPartner.description}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
