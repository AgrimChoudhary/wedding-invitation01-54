
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

  // Updated to a more reliable, optimized audio URL
  const audioUrl = "https://cdn.lovable.dev/wedding/shubh-aangan-128k.mp3";

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

    // Add event listeners for more user gesture types
    const userGestures = ['click', 'touchstart', 'touchend', 'pointerdown', 'keydown'];
    
    // Initial setup of the audio element
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      audioRef.current.preload = "auto";
      
      // Try to play, but expect it might fail due to browser restrictions
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            console.log("Audio playing automatically");
          })
          .catch((error) => {
            console.error("Autoplay prevented:", error);
            // Most browsers prevent autoplay without user interaction
            setIsPlaying(false);
            
            // Add event listeners to attempt playback after user interaction
            userGestures.forEach(event => {
              document.addEventListener(event, handleUserInteraction, { once: true });
            });
          });
      }
    }
    
    return () => {
      userGestures.forEach(event => {
        document.removeEventListener(event, handleUserInteraction);
      });
      
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const toggleMute = () => {
    if (!audioRef.current) return;
    
    const newMutedState = !isMuted;
    audioRef.current.muted = newMutedState;
    setIsMuted(newMutedState);
    
    // Try to play if it's not already playing (this will work with user interaction)
    if (!isPlaying && !newMutedState) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            console.log("Audio started playing from mute toggle");
          })
          .catch(error => {
            console.error("Play failed from mute toggle:", error);
          });
      }
    }
    
    toast({
      title: newMutedState ? "Music muted" : "Music unmuted",
      description: newMutedState ? "Wedding music has been muted" : "Wedding music is now playing",
    });
  };

  return (
    <div 
      className={cn(
        "fixed bottom-4 right-4 z-50 transition-all duration-300",
        className
      )}
    >
      <audio ref={audioRef} loop src={audioUrl} />
      
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
  );
};

export default AudioPlayer;
