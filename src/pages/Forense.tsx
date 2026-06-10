import { useState } from 'react';
import api from '../hooks/api';

export default function Forense() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [nivel, setNivel] = useState(1);
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    if (!file) return;
    setLoading(true); setResult(null);
    const fd = new FormData(); fd.append('file', file); fd.append('nivel', String(nivel));
    try {
      const { data } = await api.post('/api/forense/analyze', fd);
      setResult(data);
    } catch (e: any) { alert(e.response?.data?.detail || 'Erro'); }
    finally { setLoading(false); }
  };

  const meta = result?.metadata || {};
  const analysis = result?.analysis ? (() => { try { return JSON.parse(result.analysis); } catch { return null; } })() : null;

  return (
    <div>
      <h1 className="font-sora text-2xl font-bold mb-1">🔬 FORENSE</h1>
      <p className="mono-label mb-6">Analise de audio — {result?.mode === 'demo' ? 'Modo Demo' : 'DeepSeek V4 Pro'}</p>

      <div className="glass-card p-4 space-y-3 mb-4">
        <input type="file" accept=".mp3,.wav,.flac" onChange={e => setFile(e.target.files?.[0] || null)} className="text-sm" />
        <div className="flex gap-2">
          {[1, 2, 3].map(n => (
            <button key={n} onClick={() => setNivel(n)} className={`btn-glass flex-1 ${nivel === n ? '!border-primary !text-primary' : ''}`}>
              ⚡ N{n}
            </button>
          ))}
        </div>
        <button onClick={analyze} disabled={!file || loading} className="btn-primary w-full">
          {loading ? '⏳ A ANALISAR...' : '🔬 ANALISAR'}
        </button>
      </div>

      {result && (
        <div className="space-y-3">
          <div className="grid grid-cols-4 gap-2">
            <div className="glass-card p-3 text-center"><div className="mono-label">Duração</div><div className="text-lg font-bold text-primary">{meta.duration_seconds}s</div></div>
            <div className="glass-card p-3 text-center"><div className="mono-label">Bitrate</div><div className="text-lg font-bold text-primary">{Math.round((meta.bitrate||0)/1000)} kbps</div></div>
            <div className="glass-card p-3 text-center"><div className="mono-label">Sample Rate</div><div className="text-lg font-bold text-primary">{meta.sample_rate} Hz</div></div>
            <div className="glass-card p-3 text-center"><div className="mono-label">Canais</div><div className="text-lg font-bold text-primary">{meta.channels === 2 ? 'Stereo' : 'Mono'}</div></div>
          </div>

          {analysis?.analise_forense && (
            <div className="glass-card p-4">
              <p className="mono-label mb-2">Análise Forense</p>
              <div className="text-sm space-y-2">
                <p><span className="text-gray-500">Formato:</span> {analysis.analise_forense.formato}</p>
                <p><span className="text-gray-500">Qualidade:</span> {analysis.analise_forense.qualidade_audio}</p>
                <p><span className="text-gray-500">Observações:</span> {analysis.analise_forense.observacoes}</p>
              </div>
            </div>
          )}

          {result.mode === 'demo' && (
            <div className="glass-card p-3 border border-status-pending">
              <p className="mono-label text-status-pending">🆓 Modo Demo — DeepSeek não configurado. Analise local apenas.</p>
            </div>
          )}

          <details className="glass-card p-3">
            <summary className="mono-label cursor-pointer">📋 Dados brutos (JSON)</summary>
            <pre className="technical-data text-xs whitespace-pre-wrap max-h-64 overflow-auto mt-2">{JSON.stringify(result, null, 2)}</pre>
          </details>
        </div>
      )}
    </div>
  );
}
