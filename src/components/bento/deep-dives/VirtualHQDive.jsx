import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Lock, Upload, File, FileText, Image, Archive, Shield, CheckCircle, Clock, User } from 'lucide-react';
import ModalOverlay from '../../ui/ModalOverlay';

const INITIAL_KANBAN = {
  todo: [
    { id: 1, title: 'Q4 Compliance Audit', tag: 'Legal', priority: 'high', assignee: 'AK' },
    { id: 2, title: 'UAE Market Entry Report', tag: 'Research', priority: 'medium', assignee: 'JL' },
    { id: 3, title: 'API Integration Docs', tag: 'Dev', priority: 'low', assignee: 'MR' },
  ],
  inprogress: [
    { id: 4, title: 'EU AI Act Gap Analysis', tag: 'Compliance', priority: 'high', assignee: 'AK' },
    { id: 5, title: 'Singapore Entity Setup', tag: 'Legal', priority: 'high', assignee: 'JL' },
  ],
  done: [
    { id: 6, title: 'KYC Process Automation', tag: 'Dev', priority: 'medium', assignee: 'MR' },
    { id: 7, title: 'GDPR Data Mapping', tag: 'Compliance', priority: 'high', assignee: 'AK' },
    { id: 8, title: 'Dubai Office Registration', tag: 'Legal', priority: 'medium', assignee: 'JL' },
  ],
};

const FILES = [
  { name: 'EU_AI_Act_Compliance_2024.pdf', size: '2.4 MB', type: 'pdf', encrypted: true, shared: 3, date: '2024-11-15' },
  { name: 'UAE_Trade_License.pdf', size: '1.1 MB', type: 'pdf', encrypted: true, shared: 2, date: '2024-10-22' },
  { name: 'Q3_Financial_Report.xlsx', size: '890 KB', type: 'xlsx', encrypted: true, shared: 5, date: '2024-10-01' },
  { name: 'Team_Org_Chart.png', size: '340 KB', type: 'img', encrypted: false, shared: 8, date: '2024-09-18' },
  { name: 'Singapore_Entity_Docs.zip', size: '5.2 MB', type: 'zip', encrypted: true, shared: 1, date: '2024-11-20' },
  { name: 'GDPR_Data_Map_v3.docx', size: '1.8 MB', type: 'doc', encrypted: true, shared: 4, date: '2024-11-10' },
];

const TAG_COLORS = {
  Legal: { bg: 'rgba(167,139,250,0.15)', border: 'rgba(167,139,250,0.3)', text: '#a78bfa' },
  Research: { bg: 'rgba(22,181,236,0.12)', border: 'rgba(22,181,236,0.25)', text: '#16b5ec' },
  Dev: { bg: 'rgba(118,251,211,0.12)', border: 'rgba(118,251,211,0.25)', text: '#76fbd3' },
  Compliance: { bg: 'rgba(251,191,36,0.12)', border: 'rgba(251,191,36,0.25)', text: '#fbbf24' },
};

const PRIORITY_COLORS = { high: '#ef4444', medium: '#fbbf24', low: '#76fbd3' };

const FILE_ICONS = { pdf: FileText, xlsx: FileText, img: Image, zip: Archive, doc: FileText };

function KanbanCard({ card }) {
  const tag = TAG_COLORS[card.tag] || TAG_COLORS.Dev;
  return (
    <motion.div
      className="kanban-card rounded-xl p-3 mb-2 cursor-grab active:cursor-grabbing"
      whileHover={{ y: -2, boxShadow: '0 4px 20px rgba(118,251,211,0.1)' }}
      layout
    >
      <div className="flex items-start justify-between mb-2">
        <span className="text-xs px-2 py-0.5 rounded-full"
          style={{ background: tag.bg, border: `1px solid ${tag.border}`, color: tag.text }}>
          {card.tag}
        </span>
        <div className="w-2 h-2 rounded-full mt-1" style={{ background: PRIORITY_COLORS[card.priority] }} />
      </div>
      <p className="text-xs font-medium mb-2" style={{ color: 'rgba(226,232,240,0.85)' }}>{card.title}</p>
      <div className="flex items-center justify-between">
        <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
          style={{ background: 'rgba(118,251,211,0.15)', color: '#76fbd3', border: '1px solid rgba(118,251,211,0.2)' }}>
          {card.assignee}
        </div>
        <span className="text-xs" style={{ color: 'rgba(226,232,240,0.3)' }}>#{card.id}</span>
      </div>
    </motion.div>
  );
}

export default function VirtualHQDive({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState(0);
  const [kanban, setKanban] = useState(INITIAL_KANBAN);
  const [dragCard, setDragCard] = useState(null);
  const [dragFrom, setDragFrom] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadDone, setUploadDone] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [showAddTask, setShowAddTask] = useState(false);

  const handleDragStart = (card, col) => { setDragCard(card); setDragFrom(col); };
  const handleDrop = (toCol) => {
    if (!dragCard || dragFrom === toCol) return;
    setKanban(prev => ({
      ...prev,
      [dragFrom]: prev[dragFrom].filter(c => c.id !== dragCard.id),
      [toCol]: [...prev[toCol], dragCard],
    }));
    setDragCard(null);
    setDragFrom(null);
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    const card = { id: Date.now(), title: newTask, tag: 'Dev', priority: 'medium', assignee: 'ME' };
    setKanban(prev => ({ ...prev, todo: [card, ...prev.todo] }));
    setNewTask('');
    setShowAddTask(false);
  };

  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => { setUploading(false); setUploadDone(true); setTimeout(() => setUploadDone(false), 3000); }, 2000);
  };

  const COLUMNS = [
    { key: 'todo', label: 'To Do', color: '#16b5ec', icon: Clock },
    { key: 'inprogress', label: 'In Progress', color: '#fbbf24', icon: User },
    { key: 'done', label: 'Done', color: '#76fbd3', icon: CheckCircle },
  ];

  return (
    <ModalOverlay isOpen={isOpen} onClose={onClose} title="Virtual HQ" subtitle="Kanban workspace & encrypted file sharing" size="xl" accent="mint">
      <div className="flex gap-2 mb-5">
        {['Kanban Board', 'Encrypted Files', 'Team Activity'].map((tab, i) => (
          <button key={tab} onClick={() => setActiveTab(i)}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
            style={{
              background: activeTab === i ? 'rgba(118,251,211,0.15)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${activeTab === i ? 'rgba(118,251,211,0.4)' : 'rgba(118,251,211,0.1)'}`,
              color: activeTab === i ? '#76fbd3' : 'rgba(226,232,240,0.6)',
            }}>{tab}</button>
        ))}
      </div>

      {/* Tab 0: Kanban */}
      {activeTab === 0 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-4 text-xs" style={{ color: 'rgba(226,232,240,0.4)' }}>
              {COLUMNS.map(col => (
                <span key={col.key} className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full" style={{ background: col.color }} />
                  {col.label}: {kanban[col.key].length}
                </span>
              ))}
            </div>
            <button onClick={() => setShowAddTask(!showAddTask)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:scale-105"
              style={{ background: 'rgba(118,251,211,0.1)', border: '1px solid rgba(118,251,211,0.25)', color: '#76fbd3' }}>
              <Plus size={12} /> Add Task
            </button>
          </div>

          {showAddTask && (
            <motion.div className="flex gap-2 mb-4" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
              <input className="input-glass flex-1 px-3 py-2 rounded-lg text-sm" placeholder="New task title..."
                value={newTask} onChange={e => setNewTask(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addTask()} />
              <button onClick={addTask} className="px-4 py-2 rounded-lg text-sm font-medium"
                style={{ background: 'rgba(118,251,211,0.15)', border: '1px solid rgba(118,251,211,0.3)', color: '#76fbd3' }}>
                Add
              </button>
            </motion.div>
          )}

          <div className="grid grid-cols-3 gap-4">
            {COLUMNS.map(col => (
              <div key={col.key}
                className="rounded-xl p-3 min-h-64"
                style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${col.color}18` }}
                onDragOver={e => e.preventDefault()}
                onDrop={() => handleDrop(col.key)}
              >
                <div className="flex items-center gap-2 mb-3">
                  <col.icon size={13} style={{ color: col.color }} />
                  <span className="text-xs font-semibold" style={{ color: col.color }}>{col.label}</span>
                  <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full"
                    style={{ background: `${col.color}15`, color: col.color }}>{kanban[col.key].length}</span>
                </div>
                <AnimatePresence>
                  {kanban[col.key].map(card => (
                    <div key={card.id} draggable
                      onDragStart={() => handleDragStart(card, col.key)}>
                      <KanbanCard card={card} />
                    </div>
                  ))}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Tab 1: Encrypted Files */}
      {activeTab === 1 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          {/* Upload zone */}
          <div className="rounded-xl p-6 mb-5 text-center cursor-pointer transition-all"
            style={{ background: 'rgba(118,251,211,0.04)', border: '2px dashed rgba(118,251,211,0.2)' }}
            onClick={handleUpload}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
              style={{ background: 'rgba(118,251,211,0.1)', border: '1px solid rgba(118,251,211,0.2)' }}>
              {uploading ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                <Upload size={20} style={{ color: '#76fbd3' }} />
              </motion.div> : uploadDone ? <CheckCircle size={20} style={{ color: '#76fbd3' }} /> :
                <Upload size={20} style={{ color: '#76fbd3' }} />}
            </div>
            <p className="text-sm font-medium mb-1" style={{ color: 'rgba(226,232,240,0.7)' }}>
              {uploading ? 'Encrypting & uploading...' : uploadDone ? 'File uploaded & encrypted!' : 'Drop files here or click to upload'}
            </p>
            <p className="text-xs flex items-center justify-center gap-1" style={{ color: 'rgba(226,232,240,0.35)' }}>
              <Lock size={10} /> AES-256 encryption applied automatically
            </p>
          </div>

          {/* Security badge */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl mb-4"
            style={{ background: 'rgba(118,251,211,0.05)', border: '1px solid rgba(118,251,211,0.15)' }}>
            <Shield size={16} style={{ color: '#76fbd3' }} />
            <div>
              <p className="text-xs font-semibold" style={{ color: '#76fbd3' }}>End-to-End Encrypted Storage</p>
              <p className="text-xs" style={{ color: 'rgba(226,232,240,0.4)' }}>AES-256-GCM · Zero-knowledge architecture · SOC 2 Type II certified</p>
            </div>
          </div>

          {/* File list */}
          <div className="space-y-2">
            {FILES.map((file, i) => {
              const FileIcon = FILE_ICONS[file.type] || File;
              return (
                <motion.div key={file.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:scale-[1.01]"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(118,251,211,0.08)' }}>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(118,251,211,0.08)', border: '1px solid rgba(118,251,211,0.15)' }}>
                    <FileIcon size={16} style={{ color: '#76fbd3' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate" style={{ color: 'rgba(226,232,240,0.85)' }}>{file.name}</p>
                    <p className="text-xs" style={{ color: 'rgba(226,232,240,0.35)' }}>{file.size} · {file.date}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs" style={{ color: 'rgba(226,232,240,0.35)' }}>{file.shared} users</span>
                    {file.encrypted && (
                      <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full"
                        style={{ background: 'rgba(118,251,211,0.1)', border: '1px solid rgba(118,251,211,0.2)', color: '#76fbd3' }}>
                        <Lock size={9} /> Encrypted
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Tab 2: Team Activity */}
      {activeTab === 2 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { label: 'Team Members', value: '12', color: '#76fbd3' },
              { label: 'Tasks Completed', value: '284', color: '#16b5ec' },
              { label: 'Files Shared', value: '1,847', color: '#76fbd3' },
            ].map(s => (
              <div key={s.label} className="rounded-xl p-4 text-center" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(118,251,211,0.1)' }}>
                <p className="text-2xl font-bold font-orbitron" style={{ color: s.color }}>{s.value}</p>
                <p className="text-xs mt-1" style={{ color: 'rgba(226,232,240,0.4)' }}>{s.label}</p>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            {[
              { user: 'AK', action: 'completed EU AI Act Gap Analysis', time: '5m ago', color: '#76fbd3' },
              { user: 'JL', action: 'uploaded Singapore_Entity_Docs.zip', time: '12m ago', color: '#16b5ec' },
              { user: 'MR', action: 'moved API Integration Docs to In Progress', time: '28m ago', color: '#a78bfa' },
              { user: 'AK', action: 'shared Q3_Financial_Report.xlsx with 5 users', time: '1h ago', color: '#76fbd3' },
              { user: 'JL', action: 'created task: UAE Market Entry Report', time: '2h ago', color: '#16b5ec' },
              { user: 'MR', action: 'completed KYC Process Automation', time: '3h ago', color: '#a78bfa' },
            ].map((a, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                className="flex items-start gap-3 px-4 py-3 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(118,251,211,0.07)' }}>
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                  style={{ background: `${a.color}20`, color: a.color, border: `1px solid ${a.color}30` }}>{a.user}</div>
                <div className="flex-1">
                  <p className="text-xs" style={{ color: 'rgba(226,232,240,0.7)' }}>
                    <span className="font-semibold" style={{ color: a.color }}>{a.user}</span> {a.action}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(226,232,240,0.3)' }}>{a.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </ModalOverlay>
  );
}
