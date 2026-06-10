import { useState, useEffect, useCallback } from 'react';

const FRASES = [
  "A música é a alma do infinito.",
  "Cada batida conta uma história.",
  "O fado encontra a eletrónica no meu estúdio.",
  "Produzir é dar vida ao silêncio.",
  "Deep House é o batimento do coração da noite.",
  "A guitarra portuguesa chora o que as palavras não dizem.",
  "INFINITY SOUNDWORKS — onde o som não tem fronteiras.",
  "Cada produção é um universo novo.",
  "A saudade é a matéria-prima do fado.",
  "Do Tejo para o mundo — DJ José Silva.",
];

const CANAL = "https://www.youtube.com/@musicnowstop";
const NOTES = ["🎵", "🎶", "🎼", "♪", "♫", "🎤", "🎧", "🎹", "🎸", "🥁"];

function getRandom(min: number, max: number) { return Math.random() * (max - min) + min; }

export default function Intro({ onFinish }: { onFinish: () => void }) {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const [particles] = useState(() => Array.from({length: 30}, (_, i) => ({
    id: i, x: getRandom(5, 95), delay: getRandom(0, 5), dur: getRandom(3, 7), size: getRandom(2, 6),
    note: NOTES[Math.floor(Math.random() * NOTES.length)],
  })));
  const [countdown, setCountdown] = useState(15);

  const nextPhrase = useCallback(() => {
    setVisible(false);
    setTimeout(() => { setIdx(i => (i + 1) % FRASES.length); setVisible(true); }, 500);
  }, []);

  useEffect(() => {
    const phraseTimer = setInterval(nextPhrase, 6000);
    const cdTimer = setInterval(() => setCountdown(c => c - 1), 1000);
    const autoSkip = setTimeout(onFinish, 18000);
    return () => { clearInterval(phraseTimer); clearInterval(cdTimer); clearTimeout(autoSkip); };
  }, [nextPhrase, onFinish]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden" style={{ background: 'radial-gradient(ellipse at 50% 30%, #001a2e 0%, #0A0A0B 60%)' }}>
      {/* Particulas musicais */}
      {particles.map(p => (
        <span key={p.id} className="absolute text-cyan-400/20 pointer-events-none select-none"
          style={{ left: `${p.x}%`, fontSize: `${p.size * 6}px`,
            animation: `float-up ${p.dur}s ${p.delay}s ease-in infinite` }}>
          {p.note}
        </span>
      ))}

      {/* Barras de equalizador animadas */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-1 opacity-10">
        {Array.from({length: 40}, (_, i) => (
          <div key={i} className="w-2 bg-primary rounded-t" style={{
            height: `${20 + Math.sin(i * 0.5) * 40 + Math.random() * 60}px`,
            animation: `eq-bar ${getRandom(0.3, 0.8)}s ease-in-out infinite alternate`,
            animationDelay: `${i * 0.05}s`
          }} />
        ))}
      </div>

      {/* Logo + Titulo */}
      <div className="relative z-10 text-center px-8 max-w-2xl">
        <div className="mb-6" style={{ animation: 'pulse-glow 2s ease-in-out infinite' }}>
          <svg width="140" height="140" viewBox="0 0 200 200" className="mx-auto">
            <defs>
              <linearGradient id="gI" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00d1ff" />
                <stop offset="100%" stopColor="#BC13FE" />
              </linearGradient>
            </defs>
            <circle cx="100" cy="100" r="95" fill="none" stroke="url(#gI)" strokeWidth="3" strokeDasharray="8 6" opacity="0.3">
              <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="20s" repeatCount="indefinite" />
            </circle>
            <circle cx="100" cy="100" r="70" fill="none" stroke="url(#gI)" strokeWidth="1" opacity="0.2">
              <animateTransform attributeName="transform" type="rotate" from="360 100 100" to="0 100 100" dur="15s" repeatCount="indefinite" />
            </circle>
            <circle cx="100" cy="100" r="35" fill="url(#gI)" opacity="0.9">
              <animate attributeName="r" values="33;38;33" dur="2s" repeatCount="indefinite" />
            </circle>
            <text x="100" y="190" fontFamily="Sora, sans-serif" fontSize="16" fill="#00d1ff" textAnchor="middle" fontWeight="bold">INFINITY</text>
          </svg>
        </div>

        <h1 className="font-sora text-4xl font-bold mb-2 glow-text" style={{ background: 'linear-gradient(90deg, #00d1ff, #BC13FE, #00d1ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', animation: 'shimmer 3s ease-in-out infinite' }}>
          INFINITY SOUNDWORKS
        </h1>
        <p className="mono-label mb-8 text-sm">Estúdio DJ José Silva</p>

        <div className="h-20 flex items-center justify-center mb-8 transition-all duration-500"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(10px)' }}>
          <p className="font-sora text-xl text-gray-300 max-w-md leading-relaxed">{FRASES[idx]}</p>
        </div>

        <div className="flex gap-3 justify-center">
          <button onClick={onFinish} className="btn-primary text-sm">
            ✨ Entrar ({countdown}s)
          </button>
        </div>

        <div className="mt-6 flex gap-2 justify-center">
          {FRASES.map((_, i) => (
            <div key={i} className={`w-2 h-2 rounded-full transition-all duration-300 ${i === idx ? 'bg-primary w-6' : 'bg-gray-700'}`} />
          ))}
        </div>
      </div>

      <div className="absolute bottom-4 text-xs text-gray-600">
        <a href={CANAL} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors">
          {CANAL}
        </a>
      </div>

      <style>{`
        @keyframes float-up { 0% { transform: translateY(0) rotate(0deg); opacity: 0; } 20% { opacity: 0.3; } 80% { opacity: 0.3; } 100% { transform: translateY(-400px) rotate(180deg); opacity: 0; } }
        @keyframes eq-bar { 0% { transform: scaleY(0.3); } 100% { transform: scaleY(1); } }
        @keyframes pulse-glow { 0%, 100% { filter: drop-shadow(0 0 10px rgba(0,209,255,0.3)); } 50% { filter: drop-shadow(0 0 25px rgba(0,209,255,0.6)); } }
        @keyframes shimmer { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
      `}</style>
    </div>
  );
}
