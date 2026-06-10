import { useState, useEffect } from 'react';
import api from '../hooks/api';

export default function ProInfo() {
  const [sysInfo, setSysInfo] = useState<any>(null);
  useEffect(() => { api.get('/api/system/info').then(r => setSysInfo(r.data)).catch(() => {}); }, []);

  return (
    <div className="max-w-4xl">
      <h1 className="font-sora text-3xl font-bold mb-1" style={{ background: 'linear-gradient(90deg, #00d1ff, #BC13FE)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        🚀 INFINITY SOUNDWORKS v3.0 PRO
      </h1>
      <p className="mono-label mb-2">O Primeiro Estúdio Musical com Inteligência Artificial Regenerativa Total</p>
      <p className="text-xs text-gray-500 mb-6">Criado por DJ José Silva para artistas, produtores, DJs, estúdios, editoras e criadores.</p>

      {sysInfo && (
        <div className="glass-card p-4 mb-6">
          <p className="mono-label mb-2">💻 Sistema Actual (Versão Demo Web)</p>
          <div className="grid grid-cols-2 gap-2 technical-data text-xs">
            <p>Python: {sysInfo.python?.split(' ')[0]}</p>
            <p>DeepSeek: {sysInfo.deepseek_available ? '✅ Conectado' : '❌ Demo (HuggingFace)'}</p>
            <p>FFmpeg: {sysInfo.ffmpeg_available ? '✅' : '❌'}</p>
            <p>GPU: ⚠️ Não detectada (CPU)</p>
            <p>Disco: ~2GB livre (HuggingFace)</p>
            <p>RAM: 16GB (HuggingFace Space)</p>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            ⚠️ Esta é uma <strong>versão demo web</strong> com capacidades limitadas. 
            A versão PRO completa corre localmente no teu computador e inclui todas as funcionalidades abaixo.
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 mb-6">
        {[
          { icon: '🎵', title: 'COMPOSIÇÃO INTELIGENTE', items: ['29 agentes regenerativos especializados', 'Pipeline ZACOR AI com 9 agentes principais', 'Letras, melodias, harmonias e arranjos', 'Suporte para 5 idiomas', 'Produção individual ou em lote'] },
          { icon: '🔬', title: 'ANÁLISE FORENSE DE ÁUDIO', items: ['BPM e tonalidade reais', 'Loudness EBU R128', 'MFCC e impressão digital tímbrica', 'Espectrogramas e análise harmónica', 'Relatórios avançados para produção e masterização'] },
          { icon: '🔏', title: 'PROTEÇÃO E AUTORIA', items: ['Assinatura digital multicamada', 'Watermark invisível para áudio e vídeo', 'Certificados SHA-256', 'Sistema de verificação de autenticidade', 'Registo permanente de obras'] },
          { icon: '🧠', title: 'BEATRIZ AI', items: ['Psicologia musical', 'Análise emocional de letras', 'Tendências de mercado em tempo real', 'Otimização comercial de composições'] },
          { icon: '🐺', title: 'ALCATEIA AI', items: ['8 especialistas IA em simultâneo', 'Brainstorming avançado', 'Criação de conceitos completos', 'Estruturas prontas para produção'] },
          { icon: '🎛️', title: 'FERRAMENTAS PARA DJs', items: ['Camelot Wheel', 'Compatibilidade harmónica', 'Sugestão automática de faixas', 'Deteção de estrutura musical'] },
          { icon: '📢', title: 'MARKETING AUTOMÁTICO', items: ['Posts para redes sociais', 'Biografias de artista', 'Press releases', 'Materiais promocionais prontos'] },
          { icon: '🎨', title: 'GALERIA INTELIGENTE', items: ['Gestão completa de produções', 'Comparação de versões', 'Certificados NFT', 'Pesquisa avançada', 'Histórico permanente'] },
        ].map((section, i) => (
          <div key={i} className="glass-card p-4">
            <h3 className="mono-label mb-2">{section.icon} {section.title}</h3>
            <ul className="text-xs space-y-1 text-gray-300">
              {section.items.map((item, j) => <li key={j}>• {item}</li>)}
            </ul>
          </div>
        ))}
      </div>

      <div className="glass-card p-6 text-center mb-6" style={{ border: '1px solid rgba(0,209,255,0.3)' }}>
        <p className="text-2xl font-bold text-primary mb-2">📊 NÚMEROS DA VERSÃO v3.0 PRO</p>
        <div className="grid grid-cols-4 gap-4 mt-4">
          {[['6.200+', 'Linhas de código'], ['28', 'Módulos'], ['29', 'Agentes IA'], ['5', 'Idiomas']].map(([n, l], i) => (
            <div key={i}><div className="text-xl font-bold text-primary">{n}</div><div className="text-xs text-gray-500">{l}</div></div>
          ))}
        </div>
      </div>

      <div className="glass-card p-4 mb-6">
        <p className="mono-label mb-2">🎯 Ideal para</p>
        <div className="grid grid-cols-2 gap-1 text-xs text-gray-300">
          {['Artistas independentes', 'Produtores musicais', 'DJs profissionais', 'Editoras e estúdios', 'Criadores de conteúdo', 'Instituições de ensino musical'].map((t, i) => <p key={i}>• {t}</p>)}
        </div>
      </div>

      <div className="text-center mb-6">
        <p className="text-lg text-gray-400 italic">"Não é a IA que faz a música. É o artista que comanda a IA."</p>
        <p className="mono-label mt-2">— DJ José Silva</p>
      </div>

      <div className="text-center text-xs text-gray-600">
        <p>🌐 oficialdjjosesilva.pt | 📧 oficialdjjosesilva@gmail.com</p>
        <p className="mt-1">📍 INFINITY SOUNDWORKS v3.0 PRO — Junho 2026</p>
      </div>
    </div>
  );
}
