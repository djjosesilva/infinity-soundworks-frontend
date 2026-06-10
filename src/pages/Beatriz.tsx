import { useState } from 'react';
import api from '../hooks/api';

export default function Beatriz() {
  const [msg, setMsg] = useState('');
  const [chat, setChat] = useState<{ role: string; text: string }[]>([]);

  const send = async () => {
    if (!msg.trim()) return;
    setChat(prev => [...prev, { role: 'user', text: msg }]);
    const { data } = await api.post('/api/beatriz/chat', { message: msg, idioma: 'PT-PT' });
    setChat(prev => [...prev, { role: 'beatriz', text: data.response || JSON.stringify(data.data) }]);
    setMsg('');
  };

  return (
    <div>
      <h1 className="font-sora text-2xl font-bold mb-1">🧠 BEATRIZ</h1>
      <p className="mono-label mb-6">Psicologia Musical v2.0</p>
      <div className="glass-card p-4 h-96 overflow-auto mb-3 space-y-2">
        {chat.map((c, i) => (
          <div key={i} className={`p-2 rounded ${c.role === 'beatriz' ? 'bg-[rgba(0,209,255,0.05)]' : 'bg-[rgba(255,255,255,0.03)]'}`}>
            <span className="mono-label">{c.role === 'beatriz' ? '🧠 Beatriz' : '👤 Tu'}</span>
            <p className="text-sm mt-1">{c.text}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-2"><input className="glass-input flex-1" value={msg} onChange={e => setMsg(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Mensagem..." /><button onClick={send} className="btn-primary">ENVIAR</button></div>
    </div>
  );
}
