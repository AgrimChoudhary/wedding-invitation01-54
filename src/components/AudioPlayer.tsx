
import React, { useEffect, useRef, useState } from 'react';
import { Music, Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AudioPlayerProps {
  className?: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ className }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // The song URL - replace with actual Indian wedding song
  const songUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

  useEffect(() => {
    if (audioRef.current) {
      // Create audio element
      audioRef.current.volume = 0.4;
      
      // Add event listeners
      const handleCanPlayThrough = () => {
        if (audioRef.current) {
          audioRef.current.play()
            .then(() => {
              setIsPlaying(true);
            })
            .catch((error) => {
              console.error("Autoplay prevented:", error);
              // Most browsers prevent autoplay without user interaction
              setIsPlaying(false);
            });
        }
      };
      
      audioRef.current.addEventListener('canplaythrough', handleCanPlayThrough);
      
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('canplaythrough', handleCanPlayThrough);
        }
      };
    }
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play()
        .catch(err => console.error("Failed to play:", err));
    }
    
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div 
      className={cn(
        "fixed bottom-4 right-4 z-50 transition-all duration-300",
        isVisible ? "opacity-100" : "opacity-50 hover:opacity-100",
        className
      )}
    >
      <audio ref={audioRef} loop src={songUrl} />
      
      <div className="flex items-center gap-2 bg-maroon/90 p-3 rounded-full gold-border shadow-gold">
        <button 
          onClick={togglePlay}
          className="bg-gold-gradient text-maroon p-2 rounded-full hover:scale-110 transition-transform duration-300"
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          <Music size={20} />
        </button>
        
        {isVisible && (
          <div className="flex items-center gap-3 animate-fade-in">
            <div className="h-8 w-24 flex items-center">
              {isPlaying && [...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 mx-px bg-gold-light rounded-full animate-float"
                  style={{ 
                    height: `${Math.sin(i * 0.8) * 15 + 20}px`,
                    animationDelay: `${i * 0.1}s`
                  }}
                ></div>
              ))}
            </div>
            
            <button
              onClick={toggleMute}
              className="text-gold-light hover:text-gold-dark transition-colors duration-300"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
          </div>
        )}
        
        <button
          onClick={toggleVisibility}
          className="text-gold-light hover:text-gold-dark transition-colors duration-300 ml-2"
          aria-label={isVisible ? "Minimize player" : "Expand player"}
        >
          {isVisible ? 
            <span className="font-bold gold-text text-xs">▼</span> : 
            <span className="font-bold gold-text text-xs">▲</span>
          }
        </button>
      </div>
    </div>
  );
};

export default AudioPlayer;
