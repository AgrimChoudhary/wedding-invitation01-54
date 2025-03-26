
import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import Countdown from './Countdown';
import MapLocation from './MapLocation';
import { Calendar, Music, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import PhoneIcon from './PhoneIcon';

interface DashboardProps {
  open: boolean;
  onClose: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ open, onClose }) => {
  // Update the wedding date
  const weddingDate = new Date('2025-03-30T00:00:00');
  
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
                        <span className="text-cream/90">Mehndi Ceremony</span>
                        <span className="text-gold-light">28 March 2025</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-cream/90">Sangeet Night</span>
                        <span className="text-gold-light">28 March 2025</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-cream/90">Haldi Ceremony</span>
                        <span className="text-gold-light">29 March 2025</span>
                      </li>
                      <li className="flex justify-between border-t border-gold-light/20 pt-2 mt-2">
                        <span className="text-cream font-bold">Wedding Ceremony</span>
                        <span className="text-gold-light font-bold">30 March 2025</span>
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
                        <div className="text-cream font-medium">Shubh Aangan</div>
                        <div className="text-cream/70 text-sm">Wedding Celebration</div>
                      </div>
                      
                      <div className="relative h-48 mb-3 overflow-hidden rounded-lg gold-border">
                        <iframe 
                          src="https://screenapp.io/app/#/shared/5ZvZZuyaVC?embed=true" 
                          width="100%" 
                          height="100%" 
                          frameBorder="0"
                          allowFullScreen
                          title="Wedding Music"
                          className="w-full h-full"
                        />
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
                venueName="The Royal Celebration Hall"
                address="123 Wedding Lane, Wedding City, WC 12345"
                googleMapsUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2174330532673!2d-73.9888539!3d40.7493051!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9aeb1c6b5%3A0x35b1cfbc89a6097f!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1680566826343!5m2!1sen!2sus"
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
