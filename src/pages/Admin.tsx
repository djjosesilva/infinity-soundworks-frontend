import { useState, useEffect } from 'react';
import api from '../hooks/api';

export default function Admin() {
  const [dash, setDash] = useState<any>(null);
  const [diag, setDiag] = useState<any>(null);
  const [msg, setMsg] = useState('');
  const [msgUserId, setMsgUserId] = useState<number | null>(null);

  useEffect(() => {
    api.get('/api/admin/dashboard').then(r => setDash(r.data)).catch(() => {});
    api.get('/api/admin/diagnostic').then(r => setDiag(r.data)).catch(() => {});
  }, []);

  const deleteUser = async (id: number) => {
    if (!confirm('Apagar este utilizador?')) return;
    await api.delete(`/api/admin/users/${id}`);
    api.get('/api/admin/dashboard').then(r => setDash(r.data));
  };

  const sendMsg = async () => {
    if (!msgUserId || !msg.trim()) return;
    await api.post('/api/admin/message', { user_id: msgUserId, message: msg });
    alert('Mensagem enviada!');
    setMsg(''); setMsgUserId(null);
  };

  return (
    <div>
      <h1 className="font-sora text-2xl font-bold mb-1">📊 ADMIN</h1>
      <p className="mono-label mb-6">Dashboard & Utilizadores</p>

      {dash && (
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="glass-card p-4 text-center"><div className="text-2xl font-bold text-primary">{dash.users}</div><div className="mono-label">Utilizadores</div></div>
          <div className="glass-card p-4 text-center"><div className="text-2xl font-bold text-secondary">{dash.productions}</div><div className="mono-label">Producoes</div></div>
          <div className="glass-card p-4 text-center"><div className="text-2xl font-bold text-tertiary">{dash.certificates}</div><div className="mono-label">Certificados</div></div>
        </div>
      )}

      {dash?.users_list && (
        <div className="mb-4">
          <p className="mono-label mb-2">👥 Utilizadores</p>
          <div className="space-y-2">
            {dash.users_list.map((u: any) => (
              <div key={u.id} className="glass-card p-3 flex justify-between items-center">
                <div>
                  <span className="text-sm">{u.email}</span>
                  <span className="mono-label ml-3">{u.role === 'admin' ? '👑 Admin' : '👤 User'}</span>
                  <span className="text-xs text-gray-500 ml-3">Logins: {u.login_count} | Ultimo: {u.last_login} | Prods: {u.productions}</span>
                  {!u.is_active && <span className="text-status-error text-xs ml-2">❌ Inactivo</span>}
                </div>
                <div className="flex gap-2 items-center">
                  <button onClick={() => { setMsgUserId(u.id); setMsg(''); }} className="btn-glass text-xs">📢 Msg</button>
                  {u.role !== 'admin' && <button onClick={() => deleteUser(u.id)} className="btn-glass text-xs text-status-error">🗑️</button>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {msgUserId && (
        <div className="glass-card p-3 mb-4 space-y-2">
          <p className="mono-label">📢 Mensagem para utilizador #{msgUserId}</p>
          <textarea className="glass-input h-16 text-sm" value={msg} onChange={e => setMsg(e.target.value)} placeholder="Escreve a mensagem..." />
          <button onClick={sendMsg} className="btn-primary w-full text-xs">ENVIAR MENSAGEM</button>
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
