
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
  const [isMuted, setIsMuted] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Initialize audio
    if (audioRef.current) {
      audioRef.current.volume = 0.5; // Set initial volume to 50%
      
      // Handle autoplay with user interaction
      const handleUserInteraction = () => {
        if (audioRef.current && audioRef.current.paused) {
          audioRef.current.play().catch(error => {
            console.log("Autoplay prevented:", error);
          });
        }
        // Remove event listeners after first interaction
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('touchstart', handleUserInteraction);
      };
      
      document.addEventListener('click', handleUserInteraction);
      document.addEventListener('touchstart', handleUserInteraction);
      
      return () => {
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('touchstart', handleUserInteraction);
      };
    }
  }, []);
  
  // Function to control audio
  const toggleMute = () => {
    if (!audioRef.current) return;
    
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    
    if (audioRef.current) {
      if (newMutedState) {
        audioRef.current.volume = 0;
      } else {
        audioRef.current.volume = 0.5;
      }
      
      toast({
        title: newMutedState ? "Music muted" : "Music unmuted",
        description: newMutedState ? "Wedding music has been muted" : "Wedding music is now playing",
      });
    }
  };

  return (
    <>
      <audio 
        ref={audioRef}
        src="https://pagalfree.com/musics/128-Kudmayi%20(Film%20Version)%20-%20Rocky%20Aur%20Rani%20Kii%20Prem%20Kahaani%20128%20Kbps.mp3"
        loop
        preload="auto"
        className="hidden"
      />
      
      <div 
        className={cn(
          "fixed bottom-4 right-4 z-50 transition-all duration-300",
          className
        )}
      >
        <button 
          onClick={toggleMute}
          className={cn(
            "bg-maroon/90 gold-border shadow-gold p-3 rounded-full hover:scale-110 transition-transform duration-300",
            isMobile ? "p-2.5" : "p-3",
            "animate-pulse-glow" // Add subtle animation to attract attention
          )}
          aria-label={isMuted ? "Unmute music" : "Mute music"}
        >
          {isMuted ? 
            <VolumeX className="text-gold-light" size={isMobile ? 18 : 22} /> : 
            <Volume2 className="text-gold-light" size={isMobile ? 18 : 22} />
          }
          
          {/* Add subtle indicator that's always visible */}
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-gold-light animate-pulse"></span>
        </button>
      </div>
    </>
  );
};

export default AudioPlayer;
