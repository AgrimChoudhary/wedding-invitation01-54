
import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

interface AudioPlayerProps {
  className?: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ className }) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  // Function to control embedded player
  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    
    // Try to access the iframe to control it
    if (iframeRef.current) {
      try {
        // Post message to the iframe to mute/unmute
        iframeRef.current.contentWindow?.postMessage(
          { action: newMutedState ? 'mute' : 'unmute' }, 
          '*'
        );
        
        toast({
          title: newMutedState ? "Music muted" : "Music unmuted",
          description: newMutedState ? "Wedding music has been muted" : "Wedding music is now playing",
        });
      } catch (error) {
        console.error("Error controlling embedded player:", error);
      }
    }
  };

  // Hidden iframe for the audio player
  return (
    <>
      <div className="hidden">
        <iframe 
          ref={iframeRef}
          src="https://screenapp.io/app/#/shared/5ZvZZuyaVC?embed=true" 
          width="100" 
          height="100" 
          frameBorder="0"
          allow="autoplay"
          title="Wedding Music Player"
        />
      </div>
      
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
