import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import VideoGate from '../components/VideoGate';
import SubscriptionModal from '../components/SubscriptionModal';
import Compose from './Compose';
import Galeria from './Galeria';
import Forense from './Forense';
import Beatriz from './Beatriz';
import Conceitos from './Conceitos';
import Assinatura from './Assinatura';
import Marketing from './Marketing';
import Definicoes from './Definicoes';
import Admin from './Admin';
import ProInfo from './ProInfo';

const TABS = [
  { path: '/', icon: '✏️', label: 'COMPOSE' },
  { path: '/galeria', icon: '🎨', label: 'GALERIA' },
  { path: '/forense', icon: '🔬', label: 'FORENSE' },
  { path: '/conceitos', icon: '💡', label: 'CONCEITOS' },
  { path: '/beatriz', icon: '🧠', label: 'BEATRIZ' },
  { path: '/assinatura', icon: '🔏', label: 'ASSINATURA' },
  { path: '/marketing', icon: '📢', label: 'MARKETING' },
  { path: '/definicoes', icon: '⚙️', label: 'DEFS' },
];

const VIDEO_GATE_INTERVALS = [2 * 60, 30 * 60, 60 * 60]; // 2min, 30min, 60min (seconds)

export default function Dashboard() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [videoGate, setVideoGate] = useState(false);
  const [gateIndex, setGateIndex] = useState(0);
  const [showSubModal, setShowSubModal] = useState(!localStorage.getItem('subModalSeen'));

  const closeSubModal = () => { localStorage.setItem('subModalSeen', '1'); setShowSubModal(false); };

  useEffect(() => {
    const interval = VIDEO_GATE_INTERVALS[Math.min(gateIndex, VIDEO_GATE_INTERVALS.length - 1)];
    const timer = setTimeout(() => setVideoGate(true), interval * 1000);
    return () => clearTimeout(timer);
  }, [gateIndex, videoGate]);

  if (videoGate) {
    return <VideoGate onUnlock={() => { setVideoGate(false); setGateIndex(i => i + 1); }} />;
  }

  if (showSubModal) {
    return <SubscriptionModal onClose={closeSubModal} />;
  }

  return (
    <div className="flex h-screen">
      <aside className="w-[280px] bg-surface border-r border-[#2a2a2b] flex flex-col shrink-0">
        <div className="p-4 border-b border-[#2a2a2b]">
          <Link to="/" className="font-sora text-lg font-bold text-primary glow-text no-underline">INFINITY DEMO</Link>
          <p className="mono-label mt-1">{user?.nome || 'DJ José Silva'}</p>
        </div>
        <nav className="flex-1 py-2">
          {TABS.map(tab => (
            <Link key={tab.path} to={tab.path} className={`sidebar-link ${location.pathname === tab.path ? 'active' : ''}`}>
              <span>{tab.icon}</span><span>{tab.label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-[#2a2a2b]">
          {user?.role === 'admin' ? (
            <Link to="/admin" className={`sidebar-link ${location.pathname === '/admin' ? 'active' : ''}`}>
              <span>📊</span><span>ADMIN</span>
            </Link>
          ) : (
            <Link to="/pro" className={`sidebar-link ${location.pathname === '/pro' ? 'active' : ''}`}>
              <span>🚀</span><span>PRO</span>
            </Link>
          )}
          <div className="sidebar-link cursor-pointer" onClick={logout}><span>🚪</span><span>SAIR</span></div>
          <p className="text-xs text-gray-600 mt-2 px-4">{user?.email}</p>
        </div>
      </aside>

      <main className="flex-1 overflow-auto p-6">
        <Routes>
          <Route path="/" element={<Compose />} />
          <Route path="/galeria" element={<Galeria />} />
          <Route path="/forense" element={<Forense />} />
          <Route path="/conceitos" element={<Conceitos />} />
          <Route path="/beatriz" element={<Beatriz />} />
          <Route path="/assinatura" element={<Assinatura />} />
          <Route path="/marketing" element={<Marketing />} />
          <Route path="/definicoes" element={<Definicoes />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/pro" element={<ProInfo />} />
        </Routes>
      </main>
    </div>
  );
}
