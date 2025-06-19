
import React from 'react';
import { ExternalLink, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { trackPageInteraction } from '@/utils/iframeComm';

interface EventCardProps {
  title: string;
  date: string;
  time: string;
  venue: string;
  icon: React.ReactNode;
  googleMapsUrl?: string;
  className?: string;
}

const EventCard: React.FC<EventCardProps> = ({
  title,
  date,
  time,
  venue,
  icon,
  googleMapsUrl,
  className
}) => {
  const handleMapClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (googleMapsUrl) {
      trackPageInteraction('event_map_clicked', { event: title });
      window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className={cn(
      'relative bg-gradient-to-br from-maroon/80 via-maroon/70 to-maroon/60 rounded-2xl p-6 border-2 border-gold-light/50 hover:border-gold-light/90 transition-all duration-500 hover:shadow-2xl hover:shadow-gold-light/30 hover:-translate-y-2 overflow-hidden group',
      className
    )}>
      {/* Decorative corner elements */}
      <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-gold-light/70 group-hover:border-gold-light transition-colors duration-300"></div>
      <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-gold-light/70 group-hover:border-gold-light transition-colors duration-300"></div>
      
      {/* Shine effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-light/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      
      <div className="relative z-10">
        <div className="flex items-center mb-4">
          <div className="mr-4 p-3 bg-gold-gradient rounded-full shadow-lg ring-2 ring-gold-light/30 group-hover:ring-gold-light/60 transition-all duration-300 group-hover:scale-110">
            {icon}
          </div>
          <h3 className="font-cormorant text-xl md:text-2xl gold-text font-bold group-hover:text-gold-light transition-colors duration-300">
            {title}
          </h3>
        </div>
        
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-cream/90">
            <div className="w-2 h-2 bg-gold-light rounded-full mr-3"></div>
            <span className="font-cormorant text-lg">
              <strong className="gold-text">Date:</strong> {date}
            </span>
          </div>
          
          <div className="flex items-center text-cream/90">
            <div className="w-2 h-2 bg-gold-light rounded-full mr-3"></div>
            <span className="font-cormorant text-lg">
              <strong className="gold-text">Time:</strong> {time}
            </span>
          </div>
          
          <div className="flex items-start text-cream/90">
            <div className="w-2 h-2 bg-gold-light rounded-full mr-3 mt-2"></div>
            <span className="font-cormorant text-lg">
              <strong className="gold-text">Venue:</strong> {venue}
            </span>
          </div>
        </div>
        
        {/* Only show map link if googleMapsUrl is provided and not empty */}
        {googleMapsUrl && googleMapsUrl.trim() !== '' && (
          <button
            onClick={handleMapClick}
            className="w-full flex items-center justify-center px-4 py-3 bg-gold-gradient text-maroon rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium group-hover:bg-gold-light"
          >
            <MapPin className="mr-2" size={18} />
            View Location
            <ExternalLink size={14} className="ml-2" />
          </button>
        )}
      </div>
    </div>
  );
};

export default EventCard;
