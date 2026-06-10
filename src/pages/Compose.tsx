import { useState } from 'react';
import api from '../hooks/api';

export default function Compose() {
  const [tema, setTema] = useState('');
  const [estilo, setEstilo] = useState('Fado + Deep House');
  const [bpm, setBpm] = useState(120);
  const [key, setKey] = useState('Cm');
  const [idioma, setIdioma] = useState('PT-PT');
  const [resultado, setResultado] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const compor = async () => {
    setLoading(true);
    try {
      const { data } = await api.post('/api/compose/zacor', { tema, estilo, bpm, key, idioma });
      setResultado(data);
    } catch (e: any) { alert(e.response?.data?.detail || 'Erro'); }
    finally { setLoading(false); }
  };

  return (
    <div>
      <h1 className="font-sora text-2xl font-bold mb-1">✏️ COMPOSE</h1>
      <p className="mono-label mb-6">ZACOR AI Pipeline — 9 Agentes</p>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="mono-label">Tema / Conceito</label>
          <textarea className="glass-input h-32" value={tema} onChange={e => setTema(e.target.value)} placeholder="Descreve a tua musica..." />
        </div>
        <div className="space-y-3">
          <div><label className="mono-label">Estilo</label><select className="glass-input" value={estilo} onChange={e => setEstilo(e.target.value)}>
            {['Fado + Deep House','Fado','Deep House','Kizomba','Pop','Eletrónica','Rock','Jazz','Bossa Nova'].map(s => <option key={s}>{s}</option>)}
          </select></div>
          <div className="grid grid-cols-2 gap-2">
            <div><label className="mono-label">BPM</label><input type="number" className="glass-input" value={bpm} onChange={e => setBpm(+e.target.value)} /></div>
            <div><label className="mono-label">Key</label><select className="glass-input" value={key} onChange={e => setKey(e.target.value)}>
              {['Cm','Am','Em','Dm','F#m','Gm','C','G','D','F','A','E'].map(k => <option key={k}>{k}</option>)}
            </select></div>
          </div>
          <div><label className="mono-label">Idioma</label><select className="glass-input" value={idioma} onChange={e => setIdioma(e.target.value)}>
            {['PT-PT','PT-BR','EN','ES','FR'].map(l => <option key={l}>{l}</option>)}
          </select></div>
        </div>
      </div>

      <button onClick={compor} disabled={loading || !tema} className="btn-primary mt-4 w-full">
        {loading ? '⏳ A COMPOR...' : '📋 COMPOR COM ZACOR AI'}
      </button>

      {resultado && (
        <div className="mt-6 glass-card p-4">
          <div className="mono-label mb-2">{resultado.mode === 'demo' ? '🆓 MODO DEMO' : '✅ MODO PRO'} — {resultado.mode === 'demo' ? 'HuggingFace (qualidade limitada)' : 'DeepSeek V4 Pro'}</div>
          <pre className="technical-data whitespace-pre-wrap max-h-96 overflow-auto text-xs">{resultado.lyrics || resultado.suno_package || JSON.stringify(resultado, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
