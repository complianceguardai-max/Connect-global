import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Calculator, FileText, MapPin, Briefcase, CheckCircle, AlertCircle } from 'lucide-react';
import ModalOverlay from '../ui/ModalOverlay';
import { useApp } from '../../context/AppContext';

const COUNTRY_LEGAL = {
  'United Arab Emirates': {
    minWage: 'None (sector-specific)',
    employerCost: '12.5%',
    visaTypes: ['Employment Visa', 'Freelance Permit', 'Golden Visa'],
    noticePeriod: '30 days',
    laborLaw: 'UAE Labour Law (Federal Decree-Law No. 33 of 2021)',
    taxOnSalary: '0%',
    socialSecurity: '5% (UAE nationals only)',
    notes: 'Free zone employment has separate regulations',
  },
  'United Kingdom': {
    minWage: '£11.44/hr (2024)',
    employerCost: '13.8% NI',
    visaTypes: ['Skilled Worker Visa', 'Global Talent Visa', 'ICT Visa'],
    noticePeriod: '1 week per year (max 12)',
    laborLaw: 'Employment Rights Act 1996',
    taxOnSalary: '20-45%',
    socialSecurity: '13.8% employer NI',
    notes: 'IR35 rules apply to contractors',
  },
  'Germany': {
    minWage: '€12.41/hr',
    employerCost: '~21%',
    visaTypes: ['EU Blue Card', 'Skilled Immigration Act', 'Job Seeker Visa'],
    noticePeriod: '4 weeks minimum',
    laborLaw: 'Bürgerliches Gesetzbuch (BGB)',
    taxOnSalary: '14-45%',
    socialSecurity: '~20% employer share',
    notes: 'Works council consultation required for layoffs',
  },
  'Singapore': {
    minWage: 'None (Progressive Wage Model)',
    employerCost: '17% CPF',
    visaTypes: ['Employment Pass', 'S Pass', 'EntrePass'],
    noticePeriod: '1 month (standard)',
    laborLaw: 'Employment Act (Cap. 91A)',
    taxOnSalary: '0-24%',
    socialSecurity: '17% employer CPF',
    notes: 'Fair Consideration Framework applies',
  },
  'United States': {
    minWage: '$7.25/hr federal',
    employerCost: '~7.65% FICA',
    visaTypes: ['H-1B', 'L-1', 'O-1', 'EB-1'],
    noticePeriod: 'At-will (varies by state)',
    laborLaw: 'Fair Labor Standards Act (FLSA)',
    taxOnSalary: '10-37%',
    socialSecurity: '6.2% employer SS + 1.45% Medicare',
    notes: 'State laws may be more restrictive',
  },
};

const PIPELINE = [
  { stage: 'Applied', count: 142, color: '#16b5ec' },
  { stage: 'Screening', count: 67, color: '#76fbd3' },
  { stage: 'Interview', count: 28, color: '#a78bfa' },
  { stage: 'Assessment', count: 12, color: '#fbbf24' },
  { stage: 'Offer', count: 5, color: '#76fbd3' },
];

export default function TalentModal() {
  const { activeNavModal, setActiveNavModal } = useApp();
  const [activeTab, setActiveTab] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState('United Arab Emirates');
  const [salary, setSalary] = useState('80000');

  const isOpen = activeNavModal === 'talent';
  const onClose = () => setActiveNavModal(null);
  const legal = COUNTRY_LEGAL[selectedCountry];

  const employerCostPct = parseFloat(legal?.employerCost) || 0;
  const totalCost = (parseFloat(salary) * (1 + employerCostPct / 100)).toFixed(0);

  return (
    <ModalOverlay isOpen={isOpen} onClose={onClose} title="International Talent Hub" subtitle="Global recruitment portal with automated tax & legal calculators" size="xl" accent="mint">
      {/* Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {['Recruitment Portal', 'Tax & Legal Calculator', 'Visa Guide'].map((tab, i) => (
          <button key={tab} onClick={() => setActiveTab(i)}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            style={{
              background: activeTab === i ? 'rgba(118,251,211,0.15)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${activeTab === i ? 'rgba(118,251,211,0.4)' : 'rgba(118,251,211,0.1)'}`,
              color: activeTab === i ? '#76fbd3' : 'rgba(226,232,240,0.6)',
            }}
          >{tab}</button>
        ))}
      </div>

      {/* Tab 0: Recruitment Portal */}
      {activeTab === 0 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Post Job */}
            <div className="rounded-xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(118,251,211,0.1)' }}>
              <h3 className="text-sm font-semibold mb-4 flex items-center gap-2" style={{ color: '#76fbd3' }}>
                <Briefcase size={15} /> Post a Global Role
              </h3>
              <div className="space-y-3">
                {[
                  { label: 'Job Title', placeholder: 'e.g. Senior Blockchain Engineer' },
                  { label: 'Company', placeholder: 'Your company name' },
                ].map(({ label, placeholder }) => (
                  <div key={label}>
                    <label className="text-xs mb-1 block" style={{ color: 'rgba(226,232,240,0.5)' }}>{label}</label>
                    <input className="input-glass w-full px-3 py-2.5 rounded-lg text-sm" placeholder={placeholder} />
                  </div>
                ))}
                <div>
                  <label className="text-xs mb-1 block" style={{ color: 'rgba(226,232,240,0.5)' }}>Target Countries</label>
                  <select className="select-glass w-full px-3 py-2.5 rounded-lg text-sm">
                    {Object.keys(COUNTRY_LEGAL).map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs mb-1 block" style={{ color: 'rgba(226,232,240,0.5)' }}>Salary Range (USD)</label>
                  <div className="flex gap-2">
                    <input className="input-glass flex-1 px-3 py-2.5 rounded-lg text-sm" placeholder="Min" />
                    <input className="input-glass flex-1 px-3 py-2.5 rounded-lg text-sm" placeholder="Max" />
                  </div>
                </div>
                <motion.button
                  className="w-full py-2.5 rounded-lg text-sm font-semibold transition-all"
                  style={{ background: 'rgba(118,251,211,0.15)', border: '1px solid rgba(118,251,211,0.3)', color: '#76fbd3' }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Post to 195+ Countries
                </motion.button>
              </div>
            </div>

            {/* Pipeline */}
            <div className="rounded-xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(118,251,211,0.1)' }}>
              <h3 className="text-sm font-semibold mb-4 flex items-center gap-2" style={{ color: '#76fbd3' }}>
                <Users size={15} /> Candidate Pipeline
              </h3>
              <div className="space-y-3">
                {PIPELINE.map((stage, i) => (
                  <div key={stage.stage} className="flex items-center gap-3">
                    <span className="text-xs w-24 shrink-0" style={{ color: 'rgba(226,232,240,0.6)' }}>{stage.stage}</span>
                    <div className="flex-1 h-6 rounded-lg overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                      <motion.div
                        className="h-full rounded-lg flex items-center px-2"
                        style={{ background: `${stage.color}25`, border: `1px solid ${stage.color}40` }}
                        initial={{ width: 0 }}
                        animate={{ width: `${(stage.count / 142) * 100}%` }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                      >
                        <span className="text-xs font-bold" style={{ color: stage.color }}>{stage.count}</span>
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t" style={{ borderColor: 'rgba(118,251,211,0.1)' }}>
                <div className="grid grid-cols-3 gap-3 text-center">
                  {[
                    { label: 'Time to Hire', value: '18 days' },
                    { label: 'Offer Rate', value: '3.5%' },
                    { label: 'Countries', value: '47' },
                  ].map(s => (
                    <div key={s.label}>
                      <p className="text-lg font-bold font-orbitron" style={{ color: '#76fbd3' }}>{s.value}</p>
                      <p className="text-xs" style={{ color: 'rgba(226,232,240,0.4)' }}>{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Tab 1: Tax & Legal Calculator */}
      {activeTab === 1 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: '#76fbd3' }}>
                <Calculator size={15} /> Employment Cost Calculator
              </h3>
              <div className="space-y-3 mb-4">
                <div>
                  <label className="text-xs mb-1 block" style={{ color: 'rgba(226,232,240,0.5)' }}>Country of Employment</label>
                  <select className="select-glass w-full px-3 py-2.5 rounded-lg text-sm" value={selectedCountry} onChange={e => setSelectedCountry(e.target.value)}>
                    {Object.keys(COUNTRY_LEGAL).map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs mb-1 block" style={{ color: 'rgba(226,232,240,0.5)' }}>Annual Gross Salary (USD)</label>
                  <input type="number" className="input-glass w-full px-3 py-2.5 rounded-lg text-sm" value={salary} onChange={e => setSalary(e.target.value)} />
                </div>
              </div>

              <div className="rounded-xl p-4 space-y-3" style={{ background: 'rgba(118,251,211,0.05)', border: '1px solid rgba(118,251,211,0.15)' }}>
                <h4 className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#76fbd3' }}>Cost Breakdown</h4>
                {[
                  { label: 'Base Salary', value: `$${parseInt(salary || 0).toLocaleString()}` },
                  { label: `Employer Costs (${legal?.employerCost})`, value: `$${(parseInt(salary || 0) * employerCostPct / 100).toLocaleString()}` },
                  { label: 'Total Employer Cost', value: `$${parseInt(totalCost || 0).toLocaleString()}`, highlight: true },
                  { label: 'Income Tax (employee)', value: legal?.taxOnSalary },
                  { label: 'Social Security', value: legal?.socialSecurity },
                ].map(({ label, value, highlight }) => (
                  <div key={label} className={`flex justify-between items-center ${highlight ? 'pt-2 border-t' : ''}`}
                    style={highlight ? { borderColor: 'rgba(118,251,211,0.15)' } : {}}>
                    <span className="text-xs" style={{ color: highlight ? 'rgba(226,232,240,0.9)' : 'rgba(226,232,240,0.6)' }}>{label}</span>
                    <span className={`text-sm font-bold font-orbitron`} style={{ color: highlight ? '#76fbd3' : 'rgba(226,232,240,0.8)' }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: '#76fbd3' }}>
                <FileText size={15} /> Legal Framework — {selectedCountry}
              </h3>
              <div className="space-y-3">
                {[
                  { label: 'Governing Law', value: legal?.laborLaw },
                  { label: 'Minimum Wage', value: legal?.minWage },
                  { label: 'Notice Period', value: legal?.noticePeriod },
                ].map(({ label, value }) => (
                  <div key={label} className="rounded-lg p-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(118,251,211,0.08)' }}>
                    <p className="text-xs mb-1" style={{ color: 'rgba(226,232,240,0.4)' }}>{label}</p>
                    <p className="text-sm" style={{ color: 'rgba(226,232,240,0.85)' }}>{value}</p>
                  </div>
                ))}
                <div className="rounded-lg p-3" style={{ background: 'rgba(22,181,236,0.06)', border: '1px solid rgba(22,181,236,0.15)' }}>
                  <p className="text-xs mb-1 flex items-center gap-1" style={{ color: '#16b5ec' }}>
                    <AlertCircle size={11} /> Important Note
                  </p>
                  <p className="text-xs" style={{ color: 'rgba(226,232,240,0.7)' }}>{legal?.notes}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Tab 2: Visa Guide */}
      {activeTab === 2 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(COUNTRY_LEGAL).map(([country, data]) => (
              <div key={country} className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(118,251,211,0.08)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <MapPin size={14} style={{ color: '#76fbd3' }} />
                  <h4 className="text-sm font-semibold" style={{ color: '#76fbd3' }}>{country}</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {data.visaTypes.map(visa => (
                    <span key={visa} className="px-2 py-1 rounded-full text-xs"
                      style={{ background: 'rgba(118,251,211,0.08)', border: '1px solid rgba(118,251,211,0.2)', color: 'rgba(226,232,240,0.7)' }}>
                      <CheckCircle size={10} className="inline mr-1" style={{ color: '#76fbd3' }} />
                      {visa}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </ModalOverlay>
  );
}
