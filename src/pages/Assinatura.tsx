import { useState } from 'react';
import api from '../hooks/api';

export default function Assinatura() {
  const [file, setFile] = useState<File | null>(null);
  const [titulo, setTitulo] = useState('');
  const [result, setResult] = useState<any>(null);

  const sign = async () => {
    if (!file || !titulo) return;
    const fd = new FormData(); fd.append('file', file); fd.append('titulo', titulo); fd.append('artista', 'DJ Jose Silva');
    const { data } = await api.post('/api/assinatura/sign', fd);
    setResult(data);
  };

  return (
    <div>
      <h1 className="font-sora text-2xl font-bold mb-1">🔏 ASSINATURA DIGITAL</h1>
      <p className="mono-label mb-6">3 Camadas de Protecao</p>
      <div className="glass-card p-4 space-y-3">
        <input type="file" accept=".mp3,.wav,.flac" onChange={e => setFile(e.target.files?.[0] || null)} />
        <input className="glass-input" value={titulo} onChange={e => setTitulo(e.target.value)} placeholder="Titulo da obra*" />
        <button onClick={sign} disabled={!file || !titulo} className="btn-primary w-full">🔏 ASSINAR COM 3 CAMADAS</button>
      </div>
      {result && <div className="mt-4 glass-card p-4 technical-data text-xs space-y-1">
        <p>Track ID: {result.track_id}</p><p>Hash: {result.hash_sha256?.slice(0,32)}...</p>
        <p>Camadas: {JSON.stringify(result.camadas)}</p>
      </div>}
    </div>
  );
}
