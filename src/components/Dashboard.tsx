import React, { useRef, useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import Countdown from './Countdown';
import MapLocation from './MapLocation';
import { Calendar, Music, X, Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';
import PhoneIcon from './PhoneIcon';

interface DashboardProps {
  open: boolean;
  onClose: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ open, onClose }) => {
  // Update the wedding date
  const weddingDate = new Date('2025-06-03T19:30:00');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const toggleAudio = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-4xl w-[95vw] h-[90vh] overflow-y-auto bg-maroon border border-gold-light/30 p-0">
        <div className="relative w-full h-full">
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 z-50 bg-maroon text-gold-light p-2 rounded-full hover:bg-gold-gradient hover:text-maroon transition-all duration-300"
          >
            <X size={20} />
          </button>
          
          <div className="p-6 md:p-8">
            <div className="max-w-4xl mx-auto">
              <header className="mb-8 text-center">
                <h2 className="font-cormorant text-3xl md:text-4xl lg:text-5xl gold-text font-bold mb-2">
                  Event Dashboard
                </h2>
                <p className="text-cream/80 italic font-opensans">
                  All the details for our special celebration
                </p>
              </header>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-maroon/60 backdrop-blur-sm rounded-xl p-5 gold-border">
                  <Countdown targetDate={weddingDate} />
                  
                  <div className="mt-6">
                    <h3 className="font-cormorant text-xl gold-text font-bold flex items-center mb-3">
                      <Calendar className="mr-2" size={20} />
                      Key Dates
                    </h3>
                    
                    <ul className="space-y-3">
                      <li className="flex justify-between">
                        <span className="text-cream/90">Playoff 2 - MI vs PBKS</span>
                        <span className="text-gold-light">1 June 2025</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-cream/90">Final Toss RCB vs PBKS</span>
                        <span className="text-gold-light">3 June 2025</span>
                      </li>
                      <li className="flex justify-between border-t border-gold-light/20 pt-2 mt-2">
                        <span className="text-cream font-bold">Wedding Ceremony</span>
                        <span className="text-gold-light font-bold">3 June 2025</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-maroon/60 backdrop-blur-sm rounded-xl gold-border flex flex-col">
                  <div className="p-5">
                    <h3 className="font-cormorant text-xl gold-text font-bold flex items-center mb-4">
                      <Music className="mr-2" size={20} />
                      Our Celebration Song
                    </h3>
                    
                    <div className="bg-maroon/80 rounded-lg p-4 gold-border">
                      <div className="text-center mb-3">
                        <div className="text-cream font-medium">Kudmayi (Film Version)</div>
                        <div className="text-cream/70 text-sm">Rocky Aur Rani Kii Prem Kahaani</div>
                      </div>
                      
                      <div className="relative mb-3 overflow-hidden rounded-lg gold-border">
                        <div className="p-4 flex flex-col items-center justify-center">
                          <audio 
                            ref={audioRef}
                            src="https://pagalfree.com/musics/128-Kudmayi%20(Film%20Version)%20-%20Rocky%20Aur%20Rani%20Kii%20Prem%20Kahaani%20128%20Kbps.mp3"
                            preload="auto"
                            className="w-full mb-4 max-w-full"
                            controls
                          />
                          
                          <button 
                            onClick={toggleAudio}
                            className="bg-gold-gradient text-maroon px-4 py-2 rounded-full flex items-center justify-center hover:scale-105 transition-transform"
                          >
                            {isPlaying ? (
                              <>
                                <VolumeX className="mr-2" size={18} />
                                Pause Music
                              </>
                            ) : (
                              <>
                                <Volume2 className="mr-2" size={18} />
                                Play Music
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 p-5 pt-0">
                    <div className="mt-4">
                      <h3 className="font-cormorant text-xl gold-text font-bold mb-3">Contact Information</h3>
                      
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <PhoneIcon size={16} className="text-gold-light mr-2" />
                          <span className="text-cream">Priya's Family: </span>
                          <a href="tel:+919876543210" className="text-gold-light ml-2 hover:underline">+91 9876 543 210</a>
                        </div>
                        <div className="flex items-center">
                          <PhoneIcon size={16} className="text-gold-light mr-2" />
                          <span className="text-cream">Vijay's Family: </span>
                          <a href="tel:+919876543211" className="text-gold-light ml-2 hover:underline">+91 9876 543 211</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <MapLocation
                venueName="Narendra Modi Stadium"
                address="Ahmedabad"
                googleMapsUrl="https://g.co/kgs/45CVZL5"
                className="mb-8"
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Dashboard;
