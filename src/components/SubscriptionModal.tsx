import { useState, useEffect, useRef } from 'react';

const CANAL = 'https://www.youtube.com/@musicnowstop?sub_confirmation=1';

export default function SubscriptionModal({ onClose }: { onClose: () => void }) {
  const [visible, setVisible] = useState(false);
  const [subscribing, setSubscribing] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => { setTimeout(() => setVisible(true), 300); }, []);

  useEffect(() => {
    if (!subscribing) return;
    timerRef.current = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) { onClose(); return 10; }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [subscribing, onClose]);

  const handleSubscribe = () => {
    setSubscribing(true);
    window.open(CANAL, '_blank');
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`glass-card p-8 max-w-md w-full mx-4 text-center transition-all duration-500 ${visible ? 'scale-100' : 'scale-90'}`}
        style={{ border: '1px solid rgba(0,209,255,0.3)', boxShadow: '0 0 40px rgba(0,209,255,0.1)' }}>

        <div className="text-5xl mb-4">📺</div>
        <h2 className="font-sora text-xl font-bold text-primary mb-2">Apoia o Estúdio</h2>
        <p className="text-sm text-gray-400 mb-6">
          Subscreve o canal do <strong className="text-white">DJ José Silva</strong> no YouTube
          para teres acesso a todas as funcionalidades.
        </p>

        <div className="space-y-3 mb-6">
          {subscribing ? (
            <button disabled className="btn-glass w-full flex items-center justify-center gap-2 text-sm cursor-not-allowed">
              <span>⏳</span> A confirmar subscrição... ({countdown}s)
            </button>
          ) : (
            <button onClick={handleSubscribe}
              className="btn-primary w-full flex items-center justify-center gap-2 text-sm">
              <span>🔔</span> Subscrever Canal
            </button>
          )}
          <button onClick={onClose} className="btn-glass w-full text-xs">
            {subscribing ? `Já subscrevi — Continuar (${countdown}s)` : 'Já subscrevi — Continuar'}
          </button>
        </div>

        <p className="text-xs text-gray-600">
          @musicnowstop — Fado + Deep House + Eletrónica
        </p>
      </div>
    </div>
  );
}
