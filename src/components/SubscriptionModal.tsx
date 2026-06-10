import { useState, useEffect } from 'react';

const CANAL = 'https://www.youtube.com/@musicnowstop';

export default function SubscriptionModal({ onClose }: { onClose: () => void }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 300); }, []);

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
          <a href={CANAL} target="_blank" rel="noopener noreferrer" 
            className="btn-primary w-full flex items-center justify-center gap-2 text-sm no-underline">
            <span>🔔</span> Subscrever Canal
          </a>
          <button onClick={onClose} className="btn-glass w-full text-xs">
            Já subscrevi — Continuar
          </button>
        </div>

        <p className="text-xs text-gray-600">
          @musicnowstop — Fado + Deep House + Eletrónica
        </p>
      </div>
    </div>
  );
}
