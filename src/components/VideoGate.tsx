import { useState, useEffect, useRef } from 'react';

const PLAYLIST = [
  'OOllTNyvaco', '4CvvSp95PbE', '6O__7XYiTtQ', 'kejwP4oMErE', 'SS3tYx_lST0'
];

const CANAL = 'https://www.youtube.com/@musicnowstop';
const CANAL2 = 'https://www.youtube.com/channel/UCz1dlWLedWFcV64JLDh1zaw';

interface VideoGateProps {
  onUnlock: () => void;
}

export default function VideoGate({ onUnlock }: VideoGateProps) {
  const [canSkip, setCanSkip] = useState(false);
  const playerRef = useRef<any>(null);
  const videoId = PLAYLIST[Math.floor(Math.random() * PLAYLIST.length)];

  useEffect(() => {
    if (!(window as any).YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      (window as any).onYouTubeIframeAPIReady = () => {
        playerRef.current = new (window as any).YT.Player('yt-player', {
          videoId,
          events: { onStateChange: (e: any) => { if (e.data === 0) setCanSkip(true); } },
        });
      };
    } else {
      playerRef.current = new (window as any).YT.Player('yt-player', {
        videoId,
        events: { onStateChange: (e: any) => { if (e.data === 0) setCanSkip(true); } },
      });
    }
  }, [videoId]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0A0A0B] p-4">
      <div className="max-w-3xl w-full text-center">
        <h2 className="font-sora text-xl font-bold text-primary mb-2">🎬 Video Gating</h2>
        <p className="mono-label mb-4">Ve o video ate ao fim para continuar</p>

        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <div id="yt-player" className="absolute inset-0" />
        </div>

        <div className="flex gap-3 justify-center mt-4">
          <button disabled={!canSkip} onClick={onUnlock}
            className={`px-6 py-2 rounded text-sm font-bold ${canSkip ? 'btn-primary' : 'bg-gray-700 text-gray-500 cursor-not-allowed'}`}>
            {canSkip ? '✅ Continuar' : '⏳ Aguarda o video terminar...'}
          </button>
        </div>

        <div className="flex gap-4 justify-center mt-4 text-xs">
          <a href={CANAL} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline mono-label">
            📺 Subscrever Canal
          </a>
        </div>
      </div>
    </div>
  );
}
