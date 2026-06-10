import { useState, useEffect } from 'react';
import api from '../hooks/api';
import { useAuth } from '../hooks/useAuth';

export default function Marketing() {
  const [prods, setProds] = useState<any[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    if (token) api.get('/api/galeria/?limit=50').then(r => setProds(r.data.productions));
  }, [token]);

  const generate = async () => {
    if (!selected) return;
    setLoading(true); setResult(null);
    try {
      const { data } = await api.post('/api/marketing/generate', { production_id: selected });
      setResult(data);
    } catch (e: any) { alert(e.response?.data?.detail || 'Erro'); }
    finally { setLoading(false); }
  };

  return (
    <div>
      <h1 className="font-sora text-2xl font-bold mb-1">📢 MARKETING</h1>
      <p className="mono-label mb-6">Material Promocional</p>

      <div className="glass-card p-4 space-y-3 mb-4">
        <select className="glass-input" value={selected || ''} onChange={e => setSelected(e.target.value ? Number(e.target.value) : null)}>
          <option value="">Seleciona uma producao...</option>
          {prods.map(p => <option key={p.id} value={p.id}>{p.nome} ({p.estilo})</option>)}
        </select>
        <button onClick={generate} disabled={!selected || loading} className="btn-primary w-full">
          {loading ? '⏳ A GERAR...' : '📢 GERAR MATERIAL'}
        </button>
      </div>

      {result && (
        <div className="glass-card p-4">
          <div className="mono-label mb-2">{result.mode === 'demo' ? '🆓 Modo Demo' : '✅ Modo PRO'}</div>
          <pre className="text-sm whitespace-pre-wrap">{result.content}</pre>
        </div>
      )}
    </div>
  );
}
