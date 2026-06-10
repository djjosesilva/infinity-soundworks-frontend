import { useState, useEffect } from 'react';
import api from '../hooks/api';
import { useAuth } from '../hooks/useAuth';

export default function Galeria() {
  const [prods, setProds] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const { token } = useAuth();

  const load = async () => {
    const { data } = await api.get(`/api/galeria/?search=${search}`);
    setProds(data.productions);
  };

  useEffect(() => { if (token) load(); }, [token, search]);

  return (
    <div>
      <h1 className="font-sora text-2xl font-bold mb-1">🎨 GALERIA</h1>
      <p className="mono-label mb-6">{prods.length} producoes</p>
      <input className="glass-input mb-4" placeholder="🔍 Pesquisar..." value={search} onChange={e => setSearch(e.target.value)} />
      <div className="space-y-2">
        {prods.map(p => (
          <div key={p.id} className="glass-card p-3 flex justify-between items-center">
            <div><span className="text-sm font-medium">{p.nome}</span><span className="mono-label ml-3">{p.estilo}</span></div>
            <div className="flex gap-2 items-center"><span className="technical-data text-xs">{p.bpm} BPM | {p.key}</span><span className="status-pip success" /></div>
          </div>
        ))}
      </div>
    </div>
  );
}
