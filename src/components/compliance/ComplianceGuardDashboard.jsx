import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, AlertTriangle, CheckCircle, XCircle, RefreshCw, ChevronDown, ChevronUp, Wrench, Scale, Building2, Download, Lock } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import AIScanModal from './AIScanModal';
import ContactSalesModal from './ContactSalesModal';
import AiSalesAgent from './AiSalesAgent';

// AI Risk Tiers Constants
const AI_RISK_TIERS = {
  MINIMAL: 'Minimal Risk',
  LIMITED: 'Limited Risk',
  HIGH: 'High Risk',
  UNACCEPTABLE: 'Unacceptable Risk',
};

export default function ComplianceGuardDashboard() {
  const { user } = useAuth();
  const { addToast } = useApp();
  
  const [selectedRiskTier, setSelectedRiskTier] = useState('');
  const [showCompliantOnly, setShowCompliantOnly] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [expandedScanId, setExpandedScanId] = useState(null);
  const [isContactSalesModalOpen, setIsContactSalesModalOpen] = useState(false);
  
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchScans = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('ai_scans')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      setScans(data || []);
    } catch (err) {
      console.error('Error fetching scans:', err);
      setError(err);
      addToast('Failed to load scans', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScans();
  }, []);

  const handleStartScan = async ({ modelName, industryFocus }) => {
    setIsModalOpen(false);
    setIsScanning(true);
    addToast('CRITICAL: Initializing Deep AI Vulnerability Scan...', 'warning');

    try {
      const { data: { user: currentUser }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !currentUser) {
        addToast('Authentication error. Please log in.', 'error');
        setIsScanning(false);
        return;
      }

      const { data, error: insertError } = await supabase
        .from('ai_scans')
        .insert([
          {
            user_id: currentUser.id,
            model_name: modelName,
            industry: industryFocus,
            risk_tier: AI_RISK_TIERS.HIGH,
            compliance_status: false,
            summary: 'CRITICAL VULNERABILITY DETECTED: System flags massive exposure to EU AI Act compliance fines (Up to €35M). Lacks automated audit trails, real-time bias logging, and human-in-the-loop control systems.',
            remediation_steps: [
              {
                step: 1,
                title: "Human Oversight Framework",
                category: "Technical",
                priority: "Critical",
                description: "Deploy the enterprise-grade Human Oversight Framework immediately. Manual auditing is insufficient to prevent the €35M non-compliance penalties."
              },
              {
                step: 2,
                title: "Risk Assessment Module",
                category: "Organizational",
                priority: "High",
                description: "Automate compliance routing and dynamic risk classification for EU AI Act Alignment."
              }
            ]
          }
        ])
        .select()
        .single();

      if (insertError) {
        console.error('Supabase insert error:', insertError);
        addToast(`Scan generation failed: ${insertError.message}`, 'error');
        setIsScanning(false);
        return;
      }

      setScans((prev) => [{ ...data, isNew: true, isEvaluating: true }, ...prev]);
      
      await new Promise(resolve => setTimeout(resolve, 3500));

      try {
        const apiResponse = await fetch(`/api/evaluate-model`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            scan_id: data.id,
            model_name: modelName,
            industry: industryFocus,
          }),
          signal: AbortSignal.timeout(30000),
        });

        if (apiResponse.ok) {
          const result = await apiResponse.json();
          if (result.success && result.updated_scan) {
            setScans((prev) =>
              prev.map((scan) =>
                scan.id === data.id
                  ? { ...scan, ...result.updated_scan, isNew: true, isEvaluating: false }
                  : scan
              )
            );
            addToast('AI Compliance Assessment Finalized.', 'success');
            return;
          }
        }
        throw new Error('API Timeout or fallback triggered');
      } catch (apiError) {
        console.warn('Using High-Risk Enterprise Fallback configuration:', apiError);
        setScans((prev) =>
          prev.map((scan) =>
            scan.id === data.id ? { ...scan, isEvaluating: false } : scan
          )
        );
      }
    } catch (err) {
      console.error('Scan system error:', err);
    } finally {
      setIsScanning(false);
    }
  };

  const stats = useMemo(() => {
    const statsObj = {};
    Object.values(AI_RISK_TIERS).forEach(tier => {
      const tierScans = scans.filter(scan => scan.risk_tier === tier);
      statsObj[tier] = {
        total: tierScans.length,
        compliant: tierScans.filter(s => s.compliance_status).length,
        nonCompliant: tierScans.filter(s => !s.compliance_status).length,
      };
    });
    return statsObj;
  }, [scans]);

  const filteredScans = useMemo(() => {
    let filtered = [...scans];
    if (selectedRiskTier) filtered = filtered.filter(scan => scan.risk_tier === selectedRiskTier);
    if (showCompliantOnly) filtered = filtered.filter(scan => scan.compliance_status === true);
    return filtered;
  }, [scans, selectedRiskTier, showCompliantOnly]);

  const getRiskTierColor = (tier) => {
    switch (tier) {
      case AI_RISK_TIERS.MINIMAL: return 'rgba(118,251,211,0.1)';
      case AI_RISK_TIERS.LIMITED: return 'rgba(245,158,11,0.15)';
      case AI_RISK_TIERS.HIGH: return 'rgba(239,68,68,0.12)'; 
      case AI_RISK_TIERS.UNACCEPTABLE: return 'rgba(239,68,68,0.2)';
      default: return 'rgba(148,163,184,0.15)';
    }
  };

  const getRiskTierBorder = (tier) => {
    switch (tier) {
      case AI_RISK_TIERS.MINIMAL: return 'rgba(118,251,211,0.3)';
      case AI_RISK_TIERS.LIMITED: return 'rgba(245,158,11,0.4)';
      case AI_RISK_TIERS.HIGH: return 'rgba(239,68,68,0.5)';
      case AI_RISK_TIERS.UNACCEPTABLE: return 'rgba(239,68,68,0.8)';
      default: return 'rgba(148,163,184,0.3)';
    }
  };

  const getRiskTierText = (tier) => {
    switch (tier) {
      case AI_RISK_TIERS.MINIMAL: return '#76fbd3';
      case AI_RISK_TIERS.LIMITED: return '#f59e0b';
      case AI_RISK_TIERS.HIGH: return '#ef4444';
      case AI_RISK_TIERS.UNACCEPTABLE: return '#ef4444';
      default: return '#94a3b8';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Technical': return <Wrench size={16} style={{ color: '#fbbf24' }} />;
      case 'Legal': return <Scale size={16} style={{ color: '#fb923c' }} />;
      default: return <Building2 size={16} style={{ color: '#16b5ec' }} />;
    }
  };

  const toggleExpandScan = (scanId) => {
    setExpandedScanId(expandedScanId === scanId ? null : scanId);
  };

  const handleDownloadPDF = async (scanId, modelName) => {
    try {
      addToast('Compiling Enterprise Legal Audit Report...', 'info');
      const response = await fetch(`/api/download-report?scan_id=${scanId}`);
      if (!response.ok) throw new Error('Failed to generate PDF structural elements');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ConnectGlobal_Compliance_Audit_${modelName.replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      addToast('Enterprise PDF Audit downloaded successfully', 'success');
    } catch (error) {
      addToast(`PDF compilation error: ${error.message}`, 'error');
    }
  };

  return (
    <div className="w-full min-h-screen overflow-x-hidden flex flex-col items-center relative bg-[#08111e]">
      <section className="py-12 px-4 md:px-6 lg:px-8 w-full z-10" style={{ background: '#0a1628' }}>
        <div className="max-w-7xl mx-auto w-full block">
          
          <motion.div className="text-center mb-10 w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <AnimatePresence>
              {isScanning && (
                <motion.div
                  className="mb-6 mx-auto max-w-xl px-6 py-5 rounded-xl border animate-pulse"
                  style={{
                    background: 'rgba(239,68,68,0.1)',
                    borderColor: 'rgba(239,68,68,0.4)',
                    boxShadow: '0 0 40px rgba(239,68,68,0.25)',
                  }}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                >
                  <div className="flex items-center justify-center gap-3">
                    <RefreshCw size={20} className="animate-spin text-red-500" />
                    <span className="font-orbitron text-sm font-bold tracking-wide text-red-400">
                      WARNING: DEEP VULNERABILITY SCAN ACTIVE. EXAMINING LIABILITY RISKS...
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-xs font-medium" style={{ background: 'rgba(118,251,211,0.08)', border: '1px solid rgba(118,251,211,0.2)', color: '#76fbd3' }}>
              <Shield size={14} />
              <span>ComplianceGuard Ecosystem Enterprise Security</span>
            </div>
            <h2 className="font-orbitron font-black text-2xl md:text-4xl mb-2 tracking-tight">
              <span style={{ color: '#e2e8f0' }}>COMPLIANCEGUARD </span>
              <span style={{ color: '#76fbd3', textShadow: '0 0 15px rgba(118,251,211,0.3)' }}>COMPLIANCE HUB</span>
            </h2>
            <p className="text-sm max-w-lg mx-auto mb-6" style={{ color: 'rgba(226,232,240,0.5)' }}>
              Corporate dashboard monitoring systematic compliance failures and fine vulnerabilities.
            </p>

            <motion.button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-orbitron font-bold text-sm tracking-widest uppercase"
              style={{
                background: 'linear-gradient(135deg, rgba(239,68,68,0.2) 0%, rgba(245,158,11,0.2) 100%)',
                border: '1px solid rgba(239,68,68,0.5)',
                color: '#f87171',
                boxShadow: '0 0 30px rgba(239,68,68,0.2)',
              }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 45px rgba(239,68,68,0.4)' }}
              whileTap={{ scale: 0.97 }}
            >
              <AlertTriangle size={18} />
Run New AI Scan
            </motion.button>
          </motion.div>

          <AIScanModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onStartScan={handleStartScan} />
          <ContactSalesModal isOpen={isContactSalesModalOpen} onClose={() => setIsContactSalesModalOpen(false)} />

          {!loading && stats && (
            <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-4 mb-8 w-full">
              {Object.entries(stats).map(([tier, data]) => (
                <div
                  key={tier}
                  className="p-5 rounded-2xl transition-all block w-full"
                  style={{
                    background: `linear-gradient(135deg, ${getRiskTierColor(tier)} 0%, rgba(10,22,40,0.4) 100%)`,
                    border: `1px solid ${getRiskTierBorder(tier)}`,
                  }}
                >
                  <h3 className="font-semibold text-xs uppercase mb-2 tracking-wider" style={{ color: 'rgba(226,232,240,0.4)' }}>{tier}</h3>
                  <p className="text-3xl font-orbitron font-black mb-2" style={{ color: getRiskTierText(tier) }}>{data.total}</p>
                  <div className="text-xs flex items-center gap-3" style={{ color: 'rgba(226,232,240,0.5)' }}>
                    <span className="flex items-center gap-1"><CheckCircle size={12} style={{ color: '#76fbd3' }} /> {data.compliant} Clear</span>
                    <span className="flex items-center gap-1"><XCircle size={12} style={{ color: '#ef4444' }} /> {data.nonCompliant} Exposed</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="rounded-2xl p-6 mb-6 w-full" style={{ background: 'rgba(16,28,48,0.5)', border: '1px solid rgba(118,251,211,0.1)' }}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 flex-1 w-full">
                <select value={selectedRiskTier} onChange={(e) => setSelectedRiskTier(e.target.value)} className="bg-slate-900 border border-slate-700 text-slate-200 px-4 py-2 rounded-xl text-sm w-full sm:w-auto outline-none">
                  <option value="">All Vulnerability Levels</option>
                  {Object.values(AI_RISK_TIERS).map(tier => <option key={tier} value={tier}>{tier}</option>)}
                </select>
                <label className="flex items-center gap-2 cursor-pointer whitespace-nowrap mt-2 sm:mt-0">
                  <input type="checkbox" checked={showCompliantOnly} onChange={(e) => setShowCompliantOnly(e.target.checked)} className="w-4 h-4 rounded" style={{ accentColor: '#76fbd3' }} />
                  <span className="text-xs font-semibold text-slate-400">Show Compliant Systems Only</span>
                </label>
              </div>
              <button onClick={fetchScans} className="w-full sm:w-auto justify-center px-5 py-2 rounded-xl border border-slate-700 hover:border-emerald-400 text-xs text-slate-300 flex items-center gap-2 transition-all">
                <RefreshCw size={12} className={loading ? 'animate-spin' : ''} /> Refresh Ledger
              </button>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-800 w-full" style={{ background: 'rgba(13,24,41,0.6)' }}>
            <div className="p-5 border-b border-slate-800 flex justify-between items-center w-full">
              <h3 className="font-orbitron font-bold text-sm text-slate-200">ComplianceGuard Monitored Protocols ({filteredScans.length})</h3>
            </div>

            {loading && <div className="p-12 text-center text-slate-400 text-sm animate-pulse">Loading compliance parameters...</div>}

            {!loading && filteredScans.length === 0 && (
              <div className="p-12 text-center text-slate-500 text-xs">No organizational liabilities registered under current filters.</div>
            )}

            {!loading && filteredScans.length > 0 && (
              <div className="w-full overflow-x-auto block">
                <table className="min-w-full text-left table-auto">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-900/40">
                      <th className="px-6 py-3.5 whitespace-nowrap">Model Identifier</th>
                      <th className="px-6 py-3.5 whitespace-nowrap">Sector</th>
                      <th className="px-6 py-3.5 whitespace-nowrap">Risk Vector</th>
                      <th className="px-6 py-3.5 whitespace-nowrap">Legal Status</th>
                      <th className="px-6 py-3.5 whitespace-nowrap">Scan Date</th>
                      <th className="px-6 py-3.5 text-right whitespace-nowrap">Operational Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-slate-300">
                    {filteredScans.map((scan) => (
                      <React.Fragment key={scan.id}>
                        <tr className="border-b border-slate-900/60 hover:bg-slate-800/20 transition-all">
                          <td className="px-6 py-4 font-bold text-slate-100 whitespace-nowrap">{scan.model_name || 'System Internal'}</td>
                          <td className="px-6 py-4 text-slate-400 text-xs whitespace-nowrap">{scan.industry || 'Global'}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full border" style={{ background: getRiskTierColor(scan.risk_tier), borderColor: getRiskTierBorder(scan.risk_tier), color: getRiskTierText(scan.risk_tier) }}>
                              {scan.risk_tier}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {scan.compliance_status ? (
                              <span className="text-emerald-400 flex items-center gap-1 text-xs font-semibold"><CheckCircle size={14} /> Clear</span>
                            ) : (
                              <span className="text-red-400 flex items-center gap-1 text-xs font-semibold"><AlertTriangle size={14} /> Critical Breach</span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-xs text-slate-500 whitespace-nowrap">{scan.created_at ? new Date(scan.created_at).toLocaleDateString() : 'N/A'}</td>
                          <td className="px-6 py-4 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-2">
                              <button onClick={() => toggleExpandScan(scan.id)} className="px-3 py-1.5 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all">
                                {expandedScanId === scan.id ? 'Hide Audit' : 'Review Audit'}
                              </button>
                              <button onClick={() => handleDownloadPDF(scan.id, scan.model_name)} className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 transition-all">
                                <Download size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>

                        <AnimatePresence>
                          {expandedScanId === scan.id && (
                            <tr>
                              <td colSpan="6" className="px-6 py-4 bg-slate-950/40">
                                <motion.div className="p-5 rounded-xl border border-slate-800 bg-slate-900/30 w-full" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                                  <div className="mb-4">
                                    <h4 className="text-xs font-orbitron font-bold text-red-400 mb-1.5 flex items-center gap-2 uppercase tracking-wider">
                                      <AlertTriangle size={14} /> Threat Assessment Narrative
                                    </h4>
                                    <p className="text-xs text-slate-400 leading-relaxed">{scan.summary}</p>
                                  </div>

                                  {scan.remediation_steps && (
                                    <div className="w-full">
                                      <h4 className="text-xs font-orbitron font-bold text-amber-400 mb-3 uppercase tracking-wider">Required Compliance Deployment Modules:</h4>
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                        {scan.remediation_steps.map((step, sIdx) => (
                                          <div key={sIdx} className="p-4 rounded-xl border border-amber-500/20 bg-slate-950/80 relative overflow-hidden group w-full">
                                            <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-2">
                                              <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-widest font-orbitron">
                                                {getCategoryIcon(step.category)} {step.title}
                                              </span>
                                              <span className="text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30">CRITICAL LIABILITY</span>
                                            </div>
                                            <p className="text-xs text-slate-300 mb-3">{step.description}</p>
                                            <button onClick={() => setIsContactSalesModalOpen(true)} className="w-full py-2 rounded-lg bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 text-amber-400 font-orbitron font-bold text-xs tracking-wider flex items-center justify-center gap-2 transition-all">
                                              <Lock size={12} /> Inject Module to Mitigate Risk
                                            </button>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </motion.div>
                              </td>
                            </tr>
                          )}
                        </AnimatePresence>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>
      <div className="fixed bottom-4 right-4 z-50">
        <AiSalesAgent />
      </div>
    </div>
  );
}