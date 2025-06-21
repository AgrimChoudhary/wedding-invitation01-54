
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp, MapPin, ExternalLink, Calendar, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EventCardProps {
  title: string;
  date: string;
  time: string;
  venue: string;
  icon: React.ReactNode;
  googleMapsUrl?: string;
  className?: string;
  isInIframe?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({
  title,
  date,
  time,
  venue,
  icon,
  googleMapsUrl,
  className,
  isInIframe = false,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [isSparkle, setIsSparkle] = useState(false);
  const { toast } = useToast();

  const handleSparkle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isInIframe) {
      setIsSparkle(true);
      setTimeout(() => setIsSparkle(false), 1000);
    }
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
        'group relative rounded-xl cursor-pointer overflow-hidden',
        'bg-gradient-to-br from-maroon via-maroon/95 to-maroon/85',
        'border-2 border-gold-light/40 hover:border-gold-light/80',
        'w-full max-w-md mx-auto transform transition-all duration-300',
        'hover:-translate-y-2 hover:shadow-xl hover:shadow-gold-light/20',
        'backdrop-blur-sm',
        expanded && 'shadow-xl shadow-gold-light/25 scale-[1.02]',
        isInIframe ? 'p-3 sm:p-4 md:p-5 sm:rounded-xl' : 'p-4 sm:p-6 md:p-8 sm:rounded-2xl',
        className
      )}
      onClick={() => setExpanded(!expanded)}
    >
      {/* Decorative corner elements - responsive sizing */}
      <div className={cn(
        "absolute top-2 left-2 border-l-2 border-t-2 border-gold-light/60 opacity-70",
        isInIframe ? "w-3 h-3" : "sm:top-3 sm:left-3 w-4 h-4 sm:w-6 sm:h-6"
      )}></div>
      <div className={cn(
        "absolute top-2 right-2 border-r-2 border-t-2 border-gold-light/60 opacity-70",
        isInIframe ? "w-3 h-3" : "sm:top-3 sm:right-3 w-4 h-4 sm:w-6 sm:h-6"
      )}></div>
      <div className={cn(
        "absolute bottom-2 left-2 border-l-2 border-b-2 border-gold-light/60 opacity-70",
        isInIframe ? "w-3 h-3" : "sm:bottom-3 sm:left-3 w-4 h-4 sm:w-6 sm:h-6"
      )}></div>
      <div className={cn(
        "absolute bottom-2 right-2 border-r-2 border-b-2 border-gold-light/60 opacity-70",
        isInIframe ? "w-3 h-3" : "sm:bottom-3 sm:right-3 w-4 h-4 sm:w-6 sm:h-6"
      )}></div>
      
      {/* Subtle pattern background for iframe compatibility */}
      <div className="absolute inset-0 opacity-3">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23FFD700' fill-opacity='0.3'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm0 0c0 5.5 4.5 10 10 10s10-4.5 10-10-4.5-10-10-10-10 4.5-10 10z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      {/* Subtle shine effect - disabled in iframe for performance */}
      {!isInIframe && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-light/8 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
      )}
      
      <div className="relative z-10">
        <div className={cn(
          "flex items-start gap-3",
          isInIframe ? "mb-3 sm:items-center sm:gap-4" : "sm:items-center mb-4 sm:mb-6 sm:gap-5"
        )}>
          <div 
            className={cn(
              "relative rounded-full transition-all duration-300 cursor-pointer flex-shrink-0",
              "bg-gradient-to-br from-gold-light via-gold-light to-gold-dark",
              "shadow-lg ring-2 ring-gold-light/20 group-hover:ring-gold-light/40",
              "transform group-hover:scale-105 group-hover:rotate-3",
              isSparkle && "animate-pulse",
              isInIframe ? "p-1.5 sm:p-2 sm:ring-4" : "p-2 sm:p-3 sm:ring-4"
            )}
            onClick={handleSparkle}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gold-light to-gold-dark rounded-full blur opacity-50 group-hover:opacity-75 transition duration-300"></div>
            <div className="relative z-10">
              {icon}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className={cn(
              "font-cormorant gold-text font-bold mb-2 group-hover:text-gold-light transition-colors duration-300 line-clamp-2",
              isInIframe ? "text-lg sm:text-xl md:text-2xl" : "text-xl sm:text-2xl md:text-3xl"
            )}>
              {title}
            </h3>
            <div className={cn(
              "bg-gold-gradient rounded-full mb-2",
              isInIframe ? "w-12 h-0.5 sm:w-16 sm:mb-3" : "w-16 sm:w-20 h-0.5 sm:mb-3"
            )}></div>
            <div className={cn(
              "space-y-1",
              isInIframe ? "sm:space-y-2" : "sm:space-y-2"
            )}>
              <div className={cn(
                "flex items-center text-cream/90 font-medium",
                isInIframe ? "text-sm" : "text-sm sm:text-base"
              )}>
                <Calendar size={12} className="text-gold-light mr-2 flex-shrink-0" />
                <span className="tracking-wide truncate">{date}</span>
              </div>
              <div className={cn(
                "flex items-center text-cream/90 font-medium",
                isInIframe ? "text-sm" : "text-sm sm:text-base"
              )}>
                <Clock size={12} className="text-gold-light mr-2 flex-shrink-0" />
                <span className="tracking-wide truncate">{time}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className={cn(
          "flex items-start text-cream font-opensans mb-4 gap-3",
          isInIframe ? "mb-3" : ""
        )}>
          <MapPin size={14} className="text-gold-light flex-shrink-0 animate-pulse mt-0.5" />
          <p className={cn(
            "font-medium tracking-wide leading-relaxed line-clamp-3",
            isInIframe ? "text-sm" : "text-sm sm:text-base"
          )}>{venue}</p>
        </div>
        
        {/* Conditional Map button - Only show if googleMapsUrl is provided and valid */}
        {googleMapsUrl && googleMapsUrl.trim() !== '' && (
          <button 
            onClick={handleMapClick}
            className={cn(
              "flex items-center justify-center w-full rounded-lg bg-gradient-to-r from-gold-light to-gold-dark text-maroon font-bold hover:from-gold-dark hover:to-gold-light transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg group/btn mb-3",
              isInIframe ? "px-3 py-2 text-sm sm:px-4 sm:py-2 sm:rounded-xl sm:mb-4 sm:text-base" : "px-4 sm:px-6 py-2 sm:py-3 sm:rounded-xl sm:mb-4 text-sm sm:text-base"
            )}
          >
            <MapPin size={14} className="mr-2 group-hover/btn:animate-bounce flex-shrink-0" />
            <span className="truncate">View Location on Map</span>
            <ExternalLink size={12} className="ml-2 group-hover/btn:translate-x-1 transition-transform duration-300 flex-shrink-0" />
          </button>
        )}
        
        {expanded && (
          <div className={cn(
            "animate-fade-in",
            isInIframe ? "mt-3 sm:mt-4" : "mt-4 sm:mt-6"
          )}>
            <div className={cn(
              "bg-gradient-to-r from-gold-light/10 via-gold-light/15 to-gold-light/10 rounded-lg border border-gold-light/30",
              isInIframe ? "p-2 sm:p-3 sm:rounded-xl" : "p-3 sm:p-4 sm:rounded-xl"
            )}>
              <p className={cn(
                "text-cream/90 text-center italic leading-relaxed",
                isInIframe ? "text-sm" : "text-sm sm:text-base"
              )}>
                "Join us for this special celebration of love and tradition"
              </p>
            </div>
          </div>
        )}
        
        <div className={cn(
          "flex justify-center",
          isInIframe ? "mt-2 sm:mt-3" : "mt-3 sm:mt-4"
        )}>
          <div className={cn(
            "rounded-full bg-gold-light/20 border border-gold-light/40 group-hover:bg-gold-light/30 transition-colors duration-300",
            isInIframe ? "p-1 sm:p-1.5" : "p-1.5 sm:p-2"
          )}>
            {expanded ? (
              <ChevronUp className={cn(
                "text-gold-light animate-bounce",
                isInIframe ? "h-3 w-3 sm:h-4 sm:w-4" : "h-4 w-4 sm:h-5 sm:w-5"
              )} />
            ) : (
              <ChevronDown className={cn(
                "text-gold-light animate-bounce",
                isInIframe ? "h-3 w-3 sm:h-4 sm:w-4" : "h-4 w-4 sm:h-5 sm:w-5"
              )} />
            )}
          </div>
        </div>
      </div>

      {isSparkle && !isInIframe && (
        <div className="absolute inset-0 pointer-events-none z-20">
          {[...Array(8)].map((_, i) => {
            const size = Math.random() * 8 + 4;
            const top = Math.random() * 100;
            const left = Math.random() * 100;
            const duration = Math.random() * 1 + 0.5;
            const delay = Math.random() * 0.3;
            return (
              <div 
                key={i}
                className="absolute bg-gold-light rounded-full animate-ping shadow-sm"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  top: `${top}%`,
                  left: `${left}%`,
                  opacity: Math.random() * 0.6 + 0.2,
                  animationDuration: `${duration}s`,
                  animationDelay: `${delay}s`,
                  boxShadow: '0 0 6px currentColor'
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
