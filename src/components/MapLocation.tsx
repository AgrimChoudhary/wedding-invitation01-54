
import React, { useState } from 'react';
import { MapPin, Navigation, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MapLocationProps {
  venueName: string;
  address: string;
  googleMapsUrl: string;
  className?: string;
}

const MapLocation: React.FC<MapLocationProps> = ({
  venueName,
  address,
  googleMapsUrl,
  className
}) => {
  const [mapExpanded, setMapExpanded] = useState(false);
  
  return (
    <div className={cn('relative rounded-xl overflow-hidden', className)}>
      <div className="absolute inset-0 bg-gold-gradient opacity-10"></div>
      
      <div className="relative p-5 md:p-6">
        <div className="flex items-start mb-4">
          <MapPin className="text-gold-light mr-3 flex-shrink-0 mt-1" size={24} />
          <div>
            <h3 className="font-cormorant text-xl md:text-2xl gold-text font-bold">{venueName}</h3>
            <p className="text-cream/90 mt-1">{address}</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
          <a 
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center sm:justify-start px-4 py-2 bg-gold-gradient text-maroon rounded-lg transition-transform duration-300 hover:scale-105 font-medium"
          >
            <Navigation className="mr-2" size={18} />
            View on Google Maps
          </a>
          
          <button
            onClick={() => setMapExpanded(!mapExpanded)}
            className="flex items-center justify-center sm:justify-start px-4 py-2 bg-maroon text-gold-light border border-gold-light/50 rounded-lg transition-transform duration-300 hover:scale-105 font-medium"
          >
            <MapPin className="mr-2" size={18} />
            {mapExpanded ? 'Hide Map' : 'Show Map'}
          </button>
        </div>
        
        {mapExpanded && (
          <div className="w-full h-80 rounded-lg overflow-hidden gold-border animate-fade-in">
            <iframe 
              src={`${googleMapsUrl}&output=embed`}
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Venue Location"
              className="w-full h-full"
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapLocation;
