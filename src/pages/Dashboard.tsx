import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Compose from './Compose';
import Galeria from './Galeria';
import Forense from './Forense';
import Beatriz from './Beatriz';
import Conceitos from './Conceitos';
import Assinatura from './Assinatura';
import Marketing from './Marketing';
import Definicoes from './Definicoes';
import Admin from './Admin';

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

export default function Dashboard() {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <div className="flex h-screen">
      <aside className="w-[280px] bg-surface border-r border-[#2a2a2b] flex flex-col shrink-0">
        <div className="p-4 border-b border-[#2a2a2b]">
          <Link to="/" className="font-sora text-lg font-bold text-primary glow-text no-underline">INFINITY</Link>
          <p className="mono-label mt-1">DJ José Silva</p>
        </div>
        <nav className="flex-1 py-2">
          {TABS.map(tab => (
            <Link key={tab.path} to={tab.path} className={`sidebar-link ${location.pathname === tab.path ? 'active' : ''}`}>
              <span>{tab.icon}</span><span>{tab.label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-[#2a2a2b]">
          <Link to="/admin" className={`sidebar-link ${location.pathname === '/admin' ? 'active' : ''}`}>
            <span>📊</span><span>ADMIN</span>
          </Link>
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
        </Routes>
      </main>
    </div>
  );
}
