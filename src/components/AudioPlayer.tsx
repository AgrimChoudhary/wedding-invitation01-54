
import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

interface AudioPlayerProps {
  className?: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ className }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  // Default song URL - Indian wedding song
  const defaultSongUrl = "https://store-screenapp-production.storage.googleapis.com/vid/67d41dc0e5ce67e04ebe2417/1fb2487e-e8f5-463e-a9ac-3fcbe731f070.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=GOOG1EINEQV5X2QGY62PSZMBMUR7IGGVLKNDB6ABP5GL6O6FKO76DWA2IE3SB%2F20250314%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250314T122512Z&X-Amz-Expires=604800&X-Amz-Signature=cd907dfc1f1bd3dad6a413b6de02cdc4ae48815d996fff64594775c8fad7ec02&X-Amz-SignedHeaders=host&response-content-type=attachment%3B%20filename%3D%221fb2487e-e8f5-463e-a9ac-3fcbe731f070.mp3%22%3B%20filename%2A%3D%20UTF-8%27%27Shubh%2520Aangan%2520_%2520DjPunjab%2520mp3cut.net.mp3.mp3%3B#t=0,";

  useEffect(() => {
    // Solution for browsers requiring user interaction for autoplay
    const handleUserInteraction = () => {
      if (audioRef.current && !isPlaying) {
        // Try to play after user interaction
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            console.log("Audio playing successfully after user interaction");
          })
          .catch(error => {
            console.error("Failed to play audio after user interaction:", error);
          });
      }
    };

    // Initial setup of the audio element
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      
      // Important: preload the audio for better playback chance
      audioRef.current.preload = "auto";
      
      // Try to play, but expect it might fail due to browser restrictions
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          console.log("Audio playing automatically");
        })
        .catch((error) => {
          console.error("Autoplay prevented:", error);
          // Most browsers prevent autoplay without user interaction
          setIsPlaying(false);
          
          // Add event listeners to attempt playback after user interaction
          document.addEventListener('click', handleUserInteraction, { once: true });
          document.addEventListener('touchstart', handleUserInteraction, { once: true });
        });
    }
    
    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const toggleMute = () => {
    if (!audioRef.current) return;
    
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
    
    toast({
      title: isMuted ? "Music unmuted" : "Music muted",
      description: isMuted ? "Wedding music is now playing" : "Wedding music has been muted",
    });
  };

  return (
    <div 
      className={cn(
        "fixed bottom-4 right-4 z-50 transition-all duration-300",
        className
      )}
    >
      <audio ref={audioRef} loop src={defaultSongUrl} />
      
      <button 
        onClick={toggleMute}
        className={cn(
          "bg-maroon/90 gold-border shadow-gold p-3 rounded-full hover:scale-110 transition-transform duration-300",
          isMobile ? "p-2.5" : "p-3"
        )}
        aria-label={isMuted ? "Unmute music" : "Mute music"}
      >
        {isMuted ? 
          <VolumeX className="text-gold-light" size={isMobile ? 18 : 22} /> : 
          <Volume2 className="text-gold-light" size={isMobile ? 18 : 22} />
        }
      </button>
    </div>
  );
};

export default AudioPlayer;
