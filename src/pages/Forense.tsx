import { useState } from 'react';
import api from '../hooks/api';

export default function Forense() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);

  const analyze = async () => {
    if (!file) return;
    const fd = new FormData(); fd.append('file', file); fd.append('nivel', '2');
    const { data } = await api.post('/api/forense/analyze', fd);
    setResult(data);
  };

  return (
    <div>
      <h1 className="font-sora text-2xl font-bold mb-1">🔬 FORENSE</h1>
      <p className="mono-label mb-6">Analise de audio — 3 niveis</p>
      <div className="glass-card p-4 space-y-3">
        <input type="file" accept=".mp3,.wav,.flac" onChange={e => setFile(e.target.files?.[0] || null)} className="text-sm" />
        <button onClick={analyze} disabled={!file} className="btn-primary">🔬 ANALISAR</button>
      </div>
      {result && <pre className="mt-4 glass-card p-4 technical-data text-xs whitespace-pre-wrap max-h-96 overflow-auto">{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
}
