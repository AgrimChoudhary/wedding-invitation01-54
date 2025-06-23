
import React from 'react';
import { Calendar, Clock, MapPin, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { iframeMessenger } from '@/utils/iframeComm';

interface EventCardProps {
  title: string;
  date: string;
  time: string;
  venue: string;
  icon: React.ReactNode;
  googleMapsUrl?: string;
  isInIframe?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ 
  title, 
  date, 
  time, 
  venue, 
  icon, 
  googleMapsUrl,
  isInIframe = false 
}) => {
  const handleMapClick = () => {
    if (googleMapsUrl) {
      iframeMessenger.trackMapClicked(venue);
      window.open(googleMapsUrl, '_blank');
    }
  };

  const handleEventClick = () => {
    iframeMessenger.trackEventClicked(title);
  };

  return (
    <div 
      className={cn(
        "group relative bg-gradient-to-br from-maroon/80 via-maroon/70 to-maroon/60",
        "rounded-xl border border-gold-light/40 hover:border-gold-light/80",
        "transition-all duration-300 hover:shadow-lg hover:shadow-gold-light/25",
        "hover:-translate-y-1 overflow-hidden cursor-pointer",
        isInIframe ? "p-4 min-h-[180px]" : "p-6 md:p-8 min-h-[220px]"
      )}
      onClick={handleEventClick}
    >
      {/* Clean decorative corners */}
      <div className={cn(
        "absolute top-3 left-3 border-l-2 border-t-2 border-gold-light/50 group-hover:border-gold-light transition-colors duration-300",
        isInIframe ? "w-4 h-4" : "w-6 h-6"
      )}></div>
      <div className={cn(
        "absolute bottom-3 right-3 border-r-2 border-b-2 border-gold-light/50 group-hover:border-gold-light transition-colors duration-300",
        isInIframe ? "w-4 h-4" : "w-6 h-6"
      )}></div>
      
      {/* Subtle shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-light/8 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
      
      <div className="relative z-10 h-full flex flex-col">
        {/* Event Icon and Title */}
        <div className="flex items-center mb-4">
          <div className={cn(
            "bg-gold-gradient rounded-full mr-3 group-hover:scale-110 transition-transform duration-300 flex-shrink-0",
            isInIframe ? "p-2" : "p-3"
          )}>
            {icon}
          </div>
          <h3 className={cn(
            "font-cormorant gold-text font-bold group-hover:text-gold-light transition-colors duration-300 leading-tight",
            isInIframe ? "text-lg md:text-xl" : "text-xl md:text-2xl lg:text-3xl"
          )}>
            {title}
          </h3>
        </div>
        
        {/* Event Details */}
        <div className="space-y-3 flex-1">
          <div className="flex items-center text-cream">
            <Calendar className={cn(
              "text-gold-light mr-3 flex-shrink-0",
              isInIframe ? "w-4 h-4" : "w-5 h-5"
            )} />
            <span className={cn(
              "font-medium font-opensans",
              isInIframe ? "text-sm" : "text-base md:text-lg"
            )}>{date}</span>
          </div>
          
          <div className="flex items-center text-cream">
            <Clock className={cn(
              "text-gold-light mr-3 flex-shrink-0",
              isInIframe ? "w-4 h-4" : "w-5 h-5"
            )} />
            <span className={cn(
              "font-medium font-opensans",
              isInIframe ? "text-sm" : "text-base md:text-lg"
            )}>{time}</span>
          </div>
          
          <div className="flex items-start text-cream">
            <MapPin className={cn(
              "text-gold-light mr-3 mt-0.5 flex-shrink-0",
              isInIframe ? "w-4 h-4" : "w-5 h-5"
            )} />
            <span className={cn(
              "font-medium leading-tight font-opensans",
              isInIframe ? "text-sm" : "text-base md:text-lg"
            )}>{venue}</span>
          </div>
        </div>
        
        {/* Map Link Button */}
        {googleMapsUrl && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleMapClick();
              }}
              className={cn(
                "bg-gold-light/20 hover:bg-gold-light/30 text-gold-light rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center font-medium font-opensans",
                isInIframe ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"
              )}
            >
              <MapPin className={cn(
                "mr-1",
                isInIframe ? "w-3 h-3" : "w-4 h-4"
              )} />
              View Map
              <ExternalLink className={cn(
                "ml-1",
                isInIframe ? "w-3 h-3" : "w-4 h-4"
              )} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;
