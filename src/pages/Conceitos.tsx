import { useState } from 'react';
import api from '../hooks/api';

export default function Conceitos() {
  const [tema, setTema] = useState('');
  const [estilo, setEstilo] = useState('Fado + Deep House');
  const [result, setResult] = useState<any>(null);

  const gerar = async () => {
    const { data } = await api.post('/api/compose/alcateia', { tema, estilo });
    setResult(data);
  };

  return (
    <div>
      <h1 className="font-sora text-2xl font-bold mb-1">💡 ALCATEIA</h1>
      <p className="mono-label mb-6">8 Mestres IA — 1 chamada API</p>
      <div className="glass-card p-4 space-y-3">
        <textarea className="glass-input h-24" value={tema} onChange={e => setTema(e.target.value)} placeholder="Tema..." />
        <select className="glass-input" value={estilo} onChange={e => setEstilo(e.target.value)}>
          {['Fado + Deep House','Fado','Deep House','Kizomba','Pop','Eletrónica','Rock','Jazz','Bossa Nova'].map(s => <option key={s}>{s}</option>)}
        </select>
        <button onClick={gerar} disabled={!tema} className="btn-primary w-full">🐺 GERAR COM ALCATEIA</button>
      </div>
      {result && <pre className="mt-4 glass-card p-4 technical-data text-xs whitespace-pre-wrap max-h-96 overflow-auto">{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
}
