
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
    setTimeout(() => setIsSparkle(false), 1500);
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
        'group relative rounded-2xl p-6 md:p-8 cursor-pointer overflow-hidden',
        'bg-gradient-to-br from-maroon via-maroon/95 to-maroon/85',
        'border-2 border-gold-light/40 hover:border-gold-light/80',
        'max-w-md mx-auto transform transition-all duration-500',
        'hover:-translate-y-3 hover:shadow-2xl hover:shadow-gold-light/25',
        'backdrop-blur-sm',
        expanded && 'shadow-2xl shadow-gold-light/30 scale-105',
        className
      )}
      onClick={() => setExpanded(!expanded)}
    >
      {/* Decorative corner elements */}
      <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-gold-light/60 opacity-70"></div>
      <div className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 border-gold-light/60 opacity-70"></div>
      <div className="absolute bottom-3 left-3 w-6 h-6 border-l-2 border-b-2 border-gold-light/60 opacity-70"></div>
      <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-gold-light/60 opacity-70"></div>
      
      {/* Luxury pattern background */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23FFD700' fill-opacity='0.4'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm0 0c0 5.5 4.5 10 10 10s10-4.5 10-10-4.5-10-10-10-10 4.5-10 10z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      {/* Shine effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-light/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      
      <div className="relative z-10">
        <div className="flex items-center mb-6">
          <div 
            className={cn(
              "relative mr-5 p-3 rounded-full transition-all duration-500 cursor-pointer",
              "bg-gradient-to-br from-gold-light via-gold-light to-gold-dark",
              "shadow-xl ring-4 ring-gold-light/20 group-hover:ring-gold-light/40",
              "transform group-hover:scale-110 group-hover:rotate-6",
              isSparkle && "animate-ping"
            )}
            onClick={handleSparkle}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gold-light to-gold-dark rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative z-10">
              {icon}
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-2xl md:text-3xl font-cormorant gold-text font-bold mb-2 group-hover:text-gold-light transition-colors duration-300">
              {title}
            </h3>
            <div className="w-20 h-0.5 bg-gold-gradient rounded-full mb-3"></div>
            <div className="space-y-2">
              <div className="flex items-center text-cream/90 text-sm md:text-base font-medium">
                <Calendar size={16} className="text-gold-light mr-2 flex-shrink-0" />
                <span className="tracking-wide">{date}</span>
              </div>
              <div className="flex items-center text-cream/90 text-sm md:text-base font-medium">
                <Clock size={16} className="text-gold-light mr-2 flex-shrink-0" />
                <span className="tracking-wide">{time}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-gold-light/10 via-gold-light/15 to-gold-light/10 p-4 rounded-xl border border-gold-light/30 mb-4">
          <div className="flex items-center text-cream font-opensans">
            <MapPin size={18} className="text-gold-light mr-3 flex-shrink-0 animate-pulse" />
            <p className="font-medium tracking-wide leading-relaxed">{venue}</p>
          </div>
        </div>
        
        {expanded && (
          <div className="mt-6 animate-fade-in">
            {googleMapsUrl && (
              <button 
                onClick={handleMapClick}
                className="flex items-center justify-center w-full px-6 py-3 rounded-xl bg-gradient-to-r from-gold-light to-gold-dark text-maroon font-bold hover:from-gold-dark hover:to-gold-light transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group/btn"
              >
                <MapPin size={18} className="mr-2 group-hover/btn:animate-bounce" />
                View Location on Map
                <ExternalLink size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
              </button>
            )}
          </div>
        )}
        
        <div className="flex justify-center mt-4">
          <div className="p-2 rounded-full bg-gold-light/20 border border-gold-light/40 group-hover:bg-gold-light/30 transition-colors duration-300">
            {expanded ? (
              <ChevronUp className="text-gold-light h-5 w-5 animate-bounce" />
            ) : (
              <ChevronDown className="text-gold-light h-5 w-5 animate-bounce" />
            )}
          </div>
        </div>
      </div>

      {isSparkle && (
        <div className="absolute inset-0 pointer-events-none z-20">
          {[...Array(15)].map((_, i) => {
            const size = Math.random() * 12 + 6;
            const top = Math.random() * 100;
            const left = Math.random() * 100;
            const duration = Math.random() * 1.5 + 1;
            const delay = Math.random() * 0.5;
            return (
              <div 
                key={i}
                className="absolute bg-gold-light rounded-full animate-ping shadow-lg"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  top: `${top}%`,
                  left: `${left}%`,
                  opacity: Math.random() * 0.8 + 0.2,
                  animationDuration: `${duration}s`,
                  animationDelay: `${delay}s`,
                  boxShadow: '0 0 10px currentColor'
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
