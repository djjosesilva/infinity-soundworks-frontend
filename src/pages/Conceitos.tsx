import { useState } from 'react';
import api from '../hooks/api';

function parseOutput(output: string) {
  try { return JSON.parse(output); } catch { return null; }
}

export default function Conceitos() {
  const [tema, setTema] = useState('');
  const [estilo, setEstilo] = useState('Fado + Deep House');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const gerar = async () => {
    setLoading(true); setResult(null);
    try {
      const { data } = await api.post('/api/compose/alcateia', { tema, estilo });
      setResult(data);
    } catch (e: any) { alert(e.response?.data?.detail || 'Erro'); }
    finally { setLoading(false); }
  };

  const data = result?.output ? parseOutput(result.output) : null;

  return (
    <div>
      <h1 className="font-sora text-2xl font-bold mb-1">💡 ALCATEIA</h1>
      <p className="mono-label mb-6">8 Mestres IA — 1 chamada API ({result?.mode || '...'})</p>
      <div className="glass-card p-4 space-y-3">
        <textarea className="glass-input h-24" value={tema} onChange={e => setTema(e.target.value)} placeholder="Tema..." />
        <select className="glass-input" value={estilo} onChange={e => setEstilo(e.target.value)}>
          {['Fado + Deep House','Fado','Deep House','Kizomba','Pop','Eletrónica','Rock','Jazz','Bossa Nova'].map(s => <option key={s}>{s}</option>)}
        </select>
        <button onClick={gerar} disabled={!tema || loading} className="btn-primary w-full">
          {loading ? '⏳ A GERAR...' : '🐺 GERAR COM ALCATEIA'}
        </button>
      </div>

      {data && (
        <div className="mt-4 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="glass-card p-3"><span className="mono-label">BPM</span><p className="text-lg font-bold text-primary">{data.compositor?.bpm}</p></div>
            <div className="glass-card p-3"><span className="mono-label">Key</span><p className="text-lg font-bold text-primary">{data.compositor?.key}</p></div>
          </div>

          {data.arranjador?.letra_final && (
            <div className="glass-card p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="mono-label">🎼 Letra Final</span>
                <button onClick={() => navigator.clipboard.writeText(data.arranjador.letra_final)} className="text-xs text-primary hover:underline mono-label">📋 Copiar</button>
              </div>
              <pre className="technical-data text-xs whitespace-pre-wrap max-h-80 overflow-auto bg-surface-deepest p-3 rounded">{data.arranjador.letra_final}</pre>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2">
            {data.hooks?.primario && <div className="glass-card p-3"><span className="mono-label">🎵 Hook Primário</span><p className="text-sm mt-1">{data.hooks.primario}</p></div>}
            {data.hooks?.secundario && <div className="glass-card p-3"><span className="mono-label">🎵 Hook Secundário</span><p className="text-sm mt-1">{data.hooks.secundario}</p></div>}
          </div>

          <div className="grid grid-cols-2 gap-2">
            {data.letrista?.letra_crua && <div className="glass-card p-3"><span className="mono-label">📝 Letra Crua</span><pre className="text-xs mt-1 whitespace-pre-wrap">{data.letrista.letra_crua}</pre></div>}
            {data.revisor?.style_of_music && <div className="glass-card p-3"><span className="mono-label">✅ Revisor</span><p className="text-sm mt-1">{data.revisor.style_of_music}</p><p className="text-xs text-gray-500 mt-1">Aprovado: {data.revisor.aprovado ? '✅' : '❌'}</p></div>}
          </div>

          <details className="glass-card p-3">
            <summary className="mono-label cursor-pointer">📋 JSON Completo</summary>
            <pre className="technical-data text-xs whitespace-pre-wrap max-h-64 overflow-auto mt-2">{JSON.stringify(data, null, 2)}</pre>
          </details>
        </div>
      )}
    </div>
  );
}
