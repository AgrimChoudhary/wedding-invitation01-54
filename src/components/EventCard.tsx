
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp, MapPin, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
  className,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [isSparkle, setIsSparkle] = useState(false);
  const { toast } = useToast();

  const handleSparkle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSparkle(true);
    setTimeout(() => setIsSparkle(false), 1000);
  };

  const handleMapClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (googleMapsUrl) {
      window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
    } else {
      toast({
        title: "Map link unavailable",
        description: "The location map is not available for this venue.",
        variant: "destructive"
      });
    }
  };

  return (
    <div 
      className={cn(
        'relative rounded-xl p-5 md:p-6 card-hover cursor-pointer',
        'border border-gold-light/30 bg-maroon/80 backdrop-blur-sm',
        'max-w-md mx-auto transform transition-all duration-300 hover:-translate-y-1',
        expanded && 'shadow-gold-lg',
        className
      )}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="absolute top-0 left-0 w-full h-full rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-gold-light/5 rotate-[-3deg] transform-gpu"></div>
      </div>
      
      <div className="relative">
        <div className="flex items-center mb-4">
          <div 
            className={cn(
              "mr-4 bg-gold-gradient p-2 rounded-full transition-all duration-300",
              isSparkle && "animate-ping"
            )}
            onClick={handleSparkle}
          >
            {icon}
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-cormorant gold-text font-bold">{title}</h3>
            <div className="flex flex-col md:flex-row md:items-center text-sm text-cream/90 mt-1">
              <span className="font-semibold">{date}</span>
              <span className="hidden md:block mx-2">•</span>
              <span>{time}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center text-cream/80 mb-3 font-opensans">
          <MapPin size={16} className="text-gold-light mr-2 flex-shrink-0" />
          <p className="animate-pulse-slow">{venue}</p>
        </div>
        
        {expanded && (
          <div className="mt-4 animate-fade-in">
            {googleMapsUrl && (
              <button 
                onClick={handleMapClick}
                className="flex items-center justify-center w-full px-4 py-2 rounded-lg border border-gold-light/50 text-gold-light hover:bg-gold-light/10 transition-colors"
              >
                <MapPin size={16} className="mr-2" />
                View Location on Map
                <ExternalLink size={14} className="ml-2" />
              </button>
            )}
          </div>
        )}
        
        <div className="flex justify-center mt-2">
          {expanded ? (
            <ChevronUp className="text-gold-light opacity-70 mt-1" />
          ) : (
            <ChevronDown className="text-gold-light opacity-70 mt-1" />
          )}
        </div>
      </div>

      {isSparkle && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(10)].map((_, i) => {
            const size = Math.random() * 10 + 5;
            const top = Math.random() * 100;
            const left = Math.random() * 100;
            const duration = Math.random() * 1 + 0.5;
            return (
              <div 
                key={i}
                className="absolute bg-gold-light rounded-full animate-ping"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  top: `${top}%`,
                  left: `${left}%`,
                  opacity: Math.random() * 0.7 + 0.3,
                  animationDuration: `${duration}s`
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EventCard;
