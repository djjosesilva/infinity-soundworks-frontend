import { useState, useEffect } from 'react';
import api from '../hooks/api';

export default function Admin() {
  const [dash, setDash] = useState<any>(null);
  const [diag, setDiag] = useState<any>(null);

  useEffect(() => {
    api.get('/api/admin/dashboard').then(r => setDash(r.data)).catch(() => {});
    api.get('/api/admin/diagnostic').then(r => setDiag(r.data)).catch(() => {});
  }, []);

  return (
    <div>
      <h1 className="font-sora text-2xl font-bold mb-1">📊 ADMIN</h1>
      <p className="mono-label mb-6">Dashboard & Diagnostico</p>

      {dash && (
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="glass-card p-4 text-center"><div className="text-2xl font-bold text-primary">{dash.users}</div><div className="mono-label">Utilizadores</div></div>
          <div className="glass-card p-4 text-center"><div className="text-2xl font-bold text-secondary">{dash.productions}</div><div className="mono-label">Producoes</div></div>
          <div className="glass-card p-4 text-center"><div className="text-2xl font-bold text-tertiary">{dash.certificates}</div><div className="mono-label">Certificados</div></div>
        </div>
      )}

      {diag && (
        <div className="glass-card p-4">
          <p className="mono-label mb-2">Diagnostico</p>
          <div className="technical-data text-xs space-y-1">
            <p>Python: {diag.python?.split(' ')[0]}</p>
            <p>FFmpeg: {diag.ffmpeg ? '✅' : '❌'}</p>
            <p>DeepSeek: {diag.deepseek_available ? '✅' : '❌'}</p>
            {diag.dependencies && Object.entries(diag.dependencies).map(([k, v]) => (
              <p key={k}>{k}: {v === 'OK' ? '✅' : '❌'}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
