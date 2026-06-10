import { useState, useEffect } from 'react';
import api from '../hooks/api';
import { useAuth } from '../hooks/useAuth';

export default function Definicoes() {
  const { user } = useAuth();
  const [deepseekKey, setDeepseekKey] = useState('');
  const [demoStatus, setDemoStatus] = useState<any>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => { api.get('/api/auth/demo/status').then(r => setDemoStatus(r.data)); }, []);

  const saveKey = async () => {
    await api.post('/api/auth/me/api-key', { deepseek_key: deepseekKey });
    setSaved(true); setTimeout(() => setSaved(false), 3000);
    api.get('/api/auth/demo/status').then(r => setDemoStatus(r.data));
  };

  return (
    <div>
      <h1 className="font-sora text-2xl font-bold mb-1">⚙️ DEFINICOES</h1>
      <p className="mono-label mb-6">API Keys & Configuracao</p>

      <div className="glass-card p-4 space-y-3 mb-4">
        <p className="mono-label">Modo Actual</p>
        <div className={`p-2 rounded flex items-center gap-2 ${demoStatus?.mode === 'pro' ? 'bg-[rgba(57,255,20,0.05)] border border-[#39FF14]' : 'bg-[rgba(99,99,102,0.05)] border border-[#636366]'}`}>
          <span className={`status-pip ${demoStatus?.mode === 'pro' ? 'success' : 'pending'}`} />
          <span className="text-sm">{demoStatus?.message || 'A verificar...'}</span>
        </div>
      </div>

      <div className="glass-card p-4 space-y-3">
        <label className="mono-label">🔑 DeepSeek API Key</label>
        <input type="password" className="glass-input" value={deepseekKey} onChange={e => setDeepseekKey(e.target.value)} placeholder="sk-..." />
        <button onClick={saveKey} className="btn-primary w-full">💾 GUARDAR</button>
        {saved && <p className="text-status-success text-xs">✅ Key guardada!</p>}
      </div>

      <div className="mt-4 glass-card p-4">
        <p className="mono-label mb-2">🆓 Modo Demo (HuggingFace Gratuito)</p>
        <p className="text-xs text-gray-500">Sem DeepSeek API Key, a app usa modelos gratuitos do HuggingFace com qualidade limitada. Adiciona a tua key para acesso total.</p>
      </div>
    </div>
  );
}
