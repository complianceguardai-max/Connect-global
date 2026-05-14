import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, BookOpen, Shield, Cpu, FileText, ExternalLink, Tag } from 'lucide-react';
import ModalOverlay from '../ui/ModalOverlay';
import { useApp } from '../../context/AppContext';

const LIBRARY = [
  {
    id: 1,
    category: 'EU AI Act',
    title: 'EU AI Act — Complete Compliance Guide 2024',
    summary: 'Comprehensive breakdown of the EU Artificial Intelligence Act, risk classification tiers (Unacceptable, High, Limited, Minimal), and mandatory compliance requirements for AI system providers operating in the EU market.',
    tags: ['Regulation', 'AI', 'Compliance', 'EU'],
    readTime: '18 min',
    updated: 'Nov 2024',
    icon: Shield,
    color: '#76fbd3',
  },
  {
    id: 2,
    category: 'EU AI Act',
    title: 'High-Risk AI Systems: Article 6 Classification',
    summary: 'Detailed analysis of Article 6 criteria for high-risk AI classification, including biometric identification, critical infrastructure, employment decisions, and access to essential services.',
    tags: ['High-Risk', 'Article 6', 'Classification'],
    readTime: '12 min',
    updated: 'Oct 2024',
    icon: Shield,
    color: '#76fbd3',
  },
  {
    id: 3,
    category: 'EU AI Act',
    title: 'GPAI Models & Foundation Model Obligations',
    summary: 'Requirements for General Purpose AI model providers under the EU AI Act, including transparency obligations, copyright compliance, systemic risk assessment for models exceeding 10^25 FLOPs.',
    tags: ['GPAI', 'Foundation Models', 'LLM'],
    readTime: '15 min',
    updated: 'Dec 2024',
    icon: Shield,
    color: '#76fbd3',
  },
  {
    id: 4,
    category: 'Tech Infrastructure',
    title: 'Zero-Trust Architecture for Global Enterprises',
    summary: 'Implementation guide for Zero-Trust Network Access (ZTNA) across multi-cloud environments, covering identity verification, micro-segmentation, and continuous validation protocols.',
    tags: ['Security', 'Zero-Trust', 'Cloud'],
    readTime: '22 min',
    updated: 'Sep 2024',
    icon: Cpu,
    color: '#16b5ec',
  },
  {
    id: 5,
    category: 'Tech Infrastructure',
    title: 'Blockchain Infrastructure for Cross-Border Payments',
    summary: 'Technical deep-dive into Layer 2 scaling solutions, cross-chain bridges, and settlement finality for enterprise-grade international payment systems using distributed ledger technology.',
    tags: ['Blockchain', 'Payments', 'Layer 2'],
    readTime: '25 min',
    updated: 'Oct 2024',
    icon: Cpu,
    color: '#16b5ec',
  },
  {
    id: 6,
    category: 'GDPR',
    title: 'GDPR Cross-Border Data Transfer Mechanisms',
    summary: 'Analysis of Standard Contractual Clauses (SCCs), Binding Corporate Rules (BCRs), and adequacy decisions for lawful international data transfers post-Schrems II ruling.',
    tags: ['GDPR', 'Data Transfer', 'Privacy'],
    readTime: '14 min',
    updated: 'Aug 2024',
    icon: FileText,
    color: '#a78bfa',
  },
  {
    id: 7,
    category: 'GDPR',
    title: 'Data Residency Requirements by Jurisdiction',
    summary: 'Country-by-country analysis of data localization laws, including Russia\'s Federal Law 242-FZ, China\'s PIPL, India\'s DPDP Act, and their implications for global SaaS platforms.',
    tags: ['Data Residency', 'Localization', 'Compliance'],
    readTime: '20 min',
    updated: 'Nov 2024',
    icon: FileText,
    color: '#a78bfa',
  },
  {
    id: 8,
    category: 'Tech Infrastructure',
    title: 'Multi-Region Kubernetes Deployment Patterns',
    summary: 'Best practices for deploying containerized workloads across AWS, GCP, and Azure regions with active-active failover, global load balancing, and data sovereignty compliance.',
    tags: ['Kubernetes', 'Multi-Cloud', 'DevOps'],
    readTime: '30 min',
    updated: 'Jul 2024',
    icon: Cpu,
    color: '#16b5ec',
  },
];

const CATEGORIES = ['All', 'EU AI Act', 'Tech Infrastructure', 'GDPR'];

export default function KnowledgeModal() {
  const { activeNavModal, setActiveNavModal } = useApp();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [expanded, setExpanded] = useState(null);

  const isOpen = activeNavModal === 'knowledge';
  const onClose = () => setActiveNavModal(null);

  const filtered = LIBRARY.filter(item => {
    const matchCat = activeCategory === 'All' || item.category === activeCategory;
    const matchSearch = !search || item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.summary.toLowerCase().includes(search.toLowerCase()) ||
      item.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <ModalOverlay isOpen={isOpen} onClose={onClose} title="Knowledge Library" subtitle="EU AI Act compliance, GDPR & tech infrastructure research" size="xl" accent="mint">
      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'rgba(118,251,211,0.5)' }} />
          <input
            className="input-glass w-full pl-9 pr-4 py-2.5 rounded-lg text-sm"
            placeholder="Search articles, topics, regulations..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className="px-3 py-2 rounded-lg text-xs font-medium transition-all"
              style={{
                background: activeCategory === cat ? 'rgba(118,251,211,0.15)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${activeCategory === cat ? 'rgba(118,251,211,0.4)' : 'rgba(118,251,211,0.1)'}`,
                color: activeCategory === cat ? '#76fbd3' : 'rgba(226,232,240,0.6)',
              }}
            >{cat}</button>
          ))}
        </div>
      </div>

      {/* Stats bar */}
      <div className="flex gap-4 mb-5 text-xs" style={{ color: 'rgba(226,232,240,0.4)' }}>
        <span>{filtered.length} articles</span>
        <span>•</span>
        <span style={{ color: '#76fbd3' }}>{LIBRARY.filter(i => i.category === 'EU AI Act').length} EU AI Act</span>
        <span>•</span>
        <span style={{ color: '#16b5ec' }}>{LIBRARY.filter(i => i.category === 'Tech Infrastructure').length} Infrastructure</span>
        <span>•</span>
        <span style={{ color: '#a78bfa' }}>{LIBRARY.filter(i => i.category === 'GDPR').length} GDPR</span>
      </div>

      {/* Articles Grid */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="text-center py-12" style={{ color: 'rgba(226,232,240,0.3)' }}>
            <BookOpen size={40} className="mx-auto mb-3 opacity-30" />
            <p>No articles found for "{search}"</p>
          </div>
        )}
        {filtered.map((item, i) => {
          const Icon = item.icon;
          const isExpanded = expanded === item.id;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="rounded-xl overflow-hidden cursor-pointer transition-all duration-200"
              style={{
                background: isExpanded ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${isExpanded ? item.color + '30' : 'rgba(118,251,211,0.08)'}`,
              }}
              onClick={() => setExpanded(isExpanded ? null : item.id)}
            >
              <div className="p-4 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: `${item.color}15`, border: `1px solid ${item.color}25` }}>
                  <Icon size={18} style={{ color: item.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <span className="text-xs px-2 py-0.5 rounded-full mr-2"
                        style={{ background: `${item.color}12`, color: item.color, border: `1px solid ${item.color}25` }}>
                        {item.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0 text-xs" style={{ color: 'rgba(226,232,240,0.35)' }}>
                      <span>{item.readTime} read</span>
                      <span>{item.updated}</span>
                    </div>
                  </div>
                  <h4 className="text-sm font-semibold mb-1" style={{ color: 'rgba(226,232,240,0.9)' }}>{item.title}</h4>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {item.tags.map(tag => (
                      <span key={tag} className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full"
                        style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(226,232,240,0.5)', border: '1px solid rgba(255,255,255,0.08)' }}>
                        <Tag size={9} />{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Expanded content */}
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-4 pb-4"
                >
                  <div className="pt-3 border-t" style={{ borderColor: `${item.color}15` }}>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(226,232,240,0.65)' }}>{item.summary}</p>
                    <div className="flex gap-3">
                      <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all hover:scale-105"
                        style={{ background: `${item.color}15`, border: `1px solid ${item.color}30`, color: item.color }}>
                        <BookOpen size={13} /> Read Full Article
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all hover:scale-105"
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(226,232,240,0.6)' }}>
                        <ExternalLink size={13} /> Source
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </ModalOverlay>
  );
}
