import { useState, useEffect } from 'react';
import api from '../hooks/api';
import { useAuth } from '../hooks/useAuth';

export default function Galeria() {
  const [prods, setProds] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<number | null>(null);
  const [detail, setDetail] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const load = async () => {
    const { data } = await api.get(`/api/galeria/?search=${search}`);
    setProds(data.productions);
  };

  useEffect(() => { if (token) load(); }, [token, search]);

  const openDetail = async (id: number) => {
    if (expanded === id) { setExpanded(null); setDetail(null); return; }
    setExpanded(id); setLoading(true);
    try {
      const { data } = await api.get(`/api/galeria/${id}`);
      setDetail(data);
    } catch { setDetail(null); }
    finally { setLoading(false); }
  };

  const deleteProd = async (id: number) => {
    if (!confirm('Apagar esta producao?')) return;
    await api.delete(`/api/galeria/${id}`);
    setExpanded(null); setDetail(null);
    load();
  };

  const updateName = async (id: number, nome: string) => {
    await api.put(`/api/galeria/${id}`, { nome });
    load();
  };

  return (
    <div>
      <h1 className="font-sora text-2xl font-bold mb-1">🎨 GALERIA</h1>
      <p className="mono-label mb-6">{prods.length} producoes</p>
      <input className="glass-input mb-4" placeholder="🔍 Pesquisar..." value={search} onChange={e => setSearch(e.target.value)} />

      <div className="space-y-2">
        {prods.map(p => (
          <div key={p.id}>
            <div className="glass-card p-3 flex justify-between items-center cursor-pointer hover:border-primary"
                 onClick={() => openDetail(p.id)}>
              <div>
                <span className="text-sm font-medium">{p.nome}</span>
                <span className="mono-label ml-3">{p.estilo}</span>
                <span className="technical-data text-xs ml-3 text-gray-500">{p.created_at?.slice(0, 10)}</span>
              </div>
              <div className="flex gap-2 items-center">
                <span className="technical-data text-xs">{p.bpm} BPM | {p.key}</span>
                <span className="status-pip success" />
              </div>
            </div>

            {expanded === p.id && (
              <div className="glass-card p-4 mt-1 ml-4 border-l-2 border-primary">
                {loading ? (
                  <p className="mono-label">A carregar...</p>
                ) : detail ? (
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-2">
                      <div><span className="mono-label">BPM</span><p className="text-sm">{detail.bpm}</p></div>
                      <div><span className="mono-label">Key</span><p className="text-sm">{detail.key}</p></div>
                      <div><span className="mono-label">Estilo</span><p className="text-sm">{detail.estilo}</p></div>
                    </div>
                    {detail.lyrics && (
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="mono-label">Letra</span>
                          <button onClick={() => navigator.clipboard.writeText(detail.lyrics)} className="text-xs text-primary hover:underline mono-label">📋 Copiar</button>
                        </div>
                        <pre className="technical-data text-xs whitespace-pre-wrap max-h-64 overflow-auto bg-surface-deepest p-2 rounded">{detail.lyrics}</pre>
                      </div>
                    )}
                    {detail.suno_package && (
                      <div>
                        <span className="mono-label">Pacote Suno</span>
                        <pre className="technical-data text-xs whitespace-pre-wrap max-h-48 overflow-auto bg-surface-deepest p-2 rounded mt-1">{detail.suno_package.slice(0, 2000)}</pre>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <button onClick={() => deleteProd(p.id)} className="btn-glass text-status-error">🗑️ Apagar</button>
                    </div>
                  </div>
                ) : (
                  <p className="text-status-error text-sm">Erro ao carregar</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
