
import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';

const RCBViralMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // RCB themed viral tune (you can replace with actual RCB/IPL music URLs)
  const musicUrls = [
    "https://www.soundjay.com/misc/sounds/cricket-2.mp3", // Placeholder cricket sound
    // Add actual RCB/IPL viral music URLs here
  ];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // Set moderate volume
      audioRef.current.loop = true;
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2">
      <audio
        ref={audioRef}
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      >
        {musicUrls.map((url, index) => (
          <source key={index} src={url} type="audio/mpeg" />
        ))}
      </audio>

      {/* Music Controls */}
      <div className="bg-gradient-to-r from-red-700/80 to-yellow-600/80 backdrop-blur-sm border border-yellow-400/40 rounded-full p-2 shadow-lg">
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            className={cn(
              "p-2 rounded-full transition-all duration-300",
              isPlaying 
                ? "bg-yellow-500/80 text-red-900 hover:bg-yellow-400/80" 
                : "bg-red-600/80 text-yellow-100 hover:bg-red-500/80"
            )}
            title={isPlaying ? "Pause RCB Music" : "Play RCB Music"}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>
          
          <button
            onClick={toggleMute}
            className={cn(
              "p-2 rounded-full transition-all duration-300",
              isMuted 
                ? "bg-gray-600/80 text-gray-300 hover:bg-gray-500/80" 
                : "bg-yellow-600/80 text-white hover:bg-yellow-500/80"
            )}
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>
      </div>

      {/* Now Playing Indicator */}
      {isPlaying && (
        <div className="bg-gradient-to-r from-red-700/80 to-yellow-600/80 backdrop-blur-sm border border-yellow-400/40 rounded-full px-3 py-1 shadow-lg">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-yellow-100 font-medium">RCB Vibes</span>
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RCBViralMusic;
