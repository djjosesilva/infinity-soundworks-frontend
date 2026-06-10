import { useState, useRef, useEffect } from 'react';
import api from '../hooks/api';

function tryParse(text: string) {
  try { const j = JSON.parse(text); return j; } catch { return null; }
}

export default function Beatriz() {
  const [msg, setMsg] = useState('');
  const [chat, setChat] = useState<{ role: string; text: string }[]>([]);
  const endRef = useRef<HTMLDivElement>(null);

  const send = async () => {
    if (!msg.trim()) return;
    setChat(prev => [...prev, { role: 'user', text: msg }]);
    try {
      const { data } = await api.post('/api/beatriz/chat', { message: msg, idioma: 'PT-PT' });
      const text = data.response || (data.data ? JSON.stringify(data.data) : 'Sem resposta');
      setChat(prev => [...prev, { role: 'beatriz', text }]);
    } catch { setChat(prev => [...prev, { role: 'beatriz', text: 'Erro de conexao' }]); }
    setMsg('');
  };

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [chat]);

  const renderMessage = (text: string) => {
    const parsed = tryParse(text);
    if (!parsed || typeof parsed !== 'object') return <p className="text-sm">{text}</p>;
    if (parsed.emocao_primaria) {
      return (
        <div className="space-y-2">
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center"><div className="mono-label text-[10px]">Emoção</div><div className="text-sm font-bold text-primary">{parsed.emocao_primaria}</div></div>
            <div className="text-center"><div className="mono-label text-[10px]">Valência</div><div className="text-sm font-bold" style={{color: parsed.valencia >= 0 ? '#39FF14' : '#FF3B30'}}>{parsed.valencia >= 0 ? '+' : ''}{parsed.valencia?.toFixed(2)}</div></div>
            <div className="text-center"><div className="mono-label text-[10px]">Ativação</div><div className="text-sm font-bold" style={{color: parsed.ativacao >= 0 ? '#39FF14' : '#00D1FF'}}>{parsed.ativacao >= 0 ? '+' : ''}{parsed.ativacao?.toFixed(2)}</div></div>
          </div>
          {parsed.gems_cluster && <div className="text-xs"><span className="mono-label">GEMS: </span><span className="text-secondary">{parsed.gems_cluster}</span></div>}
          {parsed.palavras_chave?.length > 0 && <div className="flex gap-1 flex-wrap">{parsed.palavras_chave.map((w: string, i: number) => <span key={i} className="bg-[rgba(57,255,20,0.1)] text-tertiary px-2 py-0.5 rounded text-xs">{w}</span>)}</div>}
          {parsed.sugestoes && <p className="text-xs text-gray-400">{typeof parsed.sugestoes === 'string' ? parsed.sugestoes : parsed.sugestoes.join(', ')}</p>}
        </div>
      );
    }
    return <p className="text-sm">{text}</p>;
  };

  return (
    <div>
      <h1 className="font-sora text-2xl font-bold mb-1">🧠 BEATRIZ</h1>
      <p className="mono-label mb-6">Psicologia Musical v2.0</p>
      <div className="glass-card p-4 h-96 overflow-auto mb-3 space-y-2">
        {chat.map((c, i) => (
          <div key={i} className={`p-3 rounded ${c.role === 'beatriz' ? 'bg-[rgba(0,209,255,0.03)] border-l-2 border-primary' : 'bg-[rgba(255,255,255,0.02)] border-l-2 border-gray-600'}`}>
            <span className="mono-label text-[10px]">{c.role === 'beatriz' ? '🧠 Beatriz' : '👤 Tu'}</span>
            <div className="mt-1">{renderMessage(c.text)}</div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="flex gap-2">
        <input className="glass-input flex-1" value={msg} onChange={e => setMsg(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Mensagem..." />
        <button onClick={send} className="btn-primary">ENVIAR</button>
      </div>
    </div>
  );
}
