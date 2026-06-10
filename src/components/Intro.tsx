import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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

export default function Intro({ onFinish }: { onFinish: () => void }) {
  const [fade, setFade] = useState(true);
  const [idx, setIdx] = useState(0);
  const [showSkip, setShowSkip] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setShowSkip(true), 3000);
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIdx(i => (i + 1) % FRASES.length);
        setFade(true);
      }, 600);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center" style={{ background: 'radial-gradient(ellipse at center, rgba(0,209,255,0.12) 0%, #0A0A0B 70%)' }}>
      <canvas className="absolute inset-0 opacity-20" id="shader-canvas" />
      <div className="relative z-10 text-center px-8 max-w-2xl">
        <div className="mb-8">
          <svg width="120" height="120" viewBox="0 0 200 200" className="mx-auto">
            <defs><linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#00d1ff" /><stop offset="100%" stopColor="#007a99" /></linearGradient></defs>
            <path d="M40 100 Q40 40 100 40 Q160 40 160 100 Q160 160 100 160 Q40 160 40 100" fill="none" stroke="url(#g2)" strokeWidth="4" strokeDasharray="10 5" />
            <circle cx="100" cy="100" r="30" fill="url(#g2)" opacity="0.8"><animate attributeName="r" values="30;35;30" dur="2s" repeatCount="indefinite" /></circle>
          </svg>
        </div>
        <h1 className="font-sora text-3xl font-bold text-primary glow-text mb-6">INFINITY SOUNDWORKS</h1>
        <p className="font-sora text-xl mb-12 transition-opacity duration-500" style={{ opacity: fade ? 1 : 0 }}>
          {FRASES[idx]}
        </p>
        {showSkip && (
          <button onClick={onFinish} className="btn-glass text-sm px-6 py-3">
            Entrar →
          </button>
        )}
      </div>
      <div className="absolute bottom-6 text-xs text-gray-600">{CANAL}</div>
    </div>
  );
}
