
import React, { useEffect, useRef, useState } from 'react';
import { Music, Volume2, VolumeX, Upload, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface AudioPlayerProps {
  className?: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ className }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [customSongUrl, setCustomSongUrl] = useState<string | null>(null);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Default song URL - replace with actual Indian wedding song
  const defaultSongUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
  
  // Get the actual song URL to use
  const songUrl = customSongUrl || defaultSongUrl;

  useEffect(() => {
    // Try to load a saved custom song URL from localStorage
    const savedSongUrl = localStorage.getItem('customSongUrl');
    if (savedSongUrl) {
      setCustomSongUrl(savedSongUrl);
    }
    
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
  }, [customSongUrl]);

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
  
  const handleUploadClick = () => {
    setUploadDialogOpen(true);
  };
  
  const handleFileSelect = () => {
    if (fileInputRef.current?.files?.[0]) {
      const file = fileInputRef.current.files[0];
      
      // Check if the file is an audio file
      if (!file.type.startsWith('audio/')) {
        toast({
          title: "Invalid file type",
          description: "Please upload an audio file (MP3, WAV, etc.)",
          variant: "destructive",
        });
        return;
      }
      
      // Create an object URL for the uploaded file
      const objectUrl = URL.createObjectURL(file);
      setCustomSongUrl(objectUrl);
      localStorage.setItem('customSongUrl', objectUrl);
      
      // Close the dialog and show success toast
      setUploadDialogOpen(false);
      toast({
        title: "Music uploaded successfully",
        description: "Your custom song is now playing",
      });
      
      // Restart playback with the new song
      if (audioRef.current) {
        audioRef.current.load();
      }
    }
  };
  
  const resetToDefaultSong = () => {
    setCustomSongUrl(null);
    localStorage.removeItem('customSongUrl');
    setUploadDialogOpen(false);
    
    toast({
      title: "Default music restored",
      description: "Playing the default celebration song",
    });
    
    // Restart playback with the default song
    if (audioRef.current) {
      audioRef.current.load();
    }
  };

  return (
    <>
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
              
              <button
                onClick={handleUploadClick}
                className="text-gold-light hover:text-gold-dark transition-colors duration-300"
                aria-label="Upload custom music"
                title="Upload your own music"
              >
                <Upload size={20} />
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
      
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent className="bg-maroon text-cream border-gold-light/40">
          <DialogHeader>
            <DialogTitle className="gold-text text-2xl font-cormorant">Upload Custom Music</DialogTitle>
            <DialogDescription className="text-cream/80">
              Upload your own music to personalize the celebration.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-center w-full">
              <label htmlFor="music-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-maroon/60 border-gold-light/40 hover:border-gold-light/70">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Music className="w-10 h-10 mb-3 text-gold-light" />
                  <p className="mb-2 text-sm text-cream"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                  <p className="text-xs text-cream/70">MP3, WAV, or OGG (MAX. 10MB)</p>
                </div>
                <input 
                  id="music-upload" 
                  type="file" 
                  accept="audio/*" 
                  className="hidden" 
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                />
              </label>
            </div>
            
            <div className="flex items-center justify-center text-sm text-cream/80">
              <AlertCircle className="w-4 h-4 mr-1 text-gold-light" />
              <span>Audio will play for all guests during the visit</span>
            </div>
          </div>
          
          <DialogFooter className="gap-2 sm:gap-0">
            {customSongUrl && (
              <Button
                onClick={resetToDefaultSong}
                variant="outline"
                className="border-gold-light/30 text-cream hover:bg-maroon/70 hover:text-gold-light"
              >
                Reset to Default Song
              </Button>
            )}
            <Button
              onClick={() => setUploadDialogOpen(false)}
              className="bg-gold-gradient text-maroon hover:bg-gold-gradient/90"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AudioPlayer;
