
import React, { useEffect, useRef, useState } from 'react';
import { Music, Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface AudioPlayerProps {
  className?: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ className }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const { toast } = useToast();

  // Default song URL - Indian wedding song
  const defaultSongUrl = "https://store-screenapp-production.storage.googleapis.com/vid/67d41dc0e5ce67e04ebe2417/1fb2487e-e8f5-463e-a9ac-3fcbe731f070.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=GOOG1EINEQV5X2QGY62PSZMBMUR7IGGVLKNDB6ABP5GL6O6FKO76DWA2IE3SB%2F20250314%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250314T122512Z&X-Amz-Expires=604800&X-Amz-Signature=cd907dfc1f1bd3dad6a413b6de02cdc4ae48815d996fff64594775c8fad7ec02&X-Amz-SignedHeaders=host&response-content-type=attachment%3B%20filename%3D%221fb2487e-e8f5-463e-a9ac-3fcbe731f070.mp3%22%3B%20filename%2A%3D%20UTF-8%27%27Shubh%2520Aangan%2520_%2520DjPunjab%2520mp3cut.net.mp3.mp3%3B#t=0,";

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
    
    toast({
      title: isMuted ? "Music unmuted" : "Music muted",
      description: isMuted ? "Wedding music is now playing" : "Wedding music has been muted",
    });
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
      <audio ref={audioRef} loop src={defaultSongUrl} />
      
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
