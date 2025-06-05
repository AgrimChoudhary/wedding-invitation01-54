
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp, MapPin, ExternalLink, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EnhancedEventCardProps {
  title: string;
  date: string;
  time: string;
  venue: string;
  icon: React.ReactNode;
  googleMapsUrl?: string;
  className?: string;
  index: number;
}

const EnhancedEventCard: React.FC<EnhancedEventCardProps> = ({
  title,
  date,
  time,
  venue,
  icon,
  googleMapsUrl,
  className,
  index
}) => {
  const [expanded, setExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { toast } = useToast();

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
        'group relative rounded-2xl p-6 cursor-pointer transition-all duration-700 ease-out',
        'bg-gradient-to-br from-maroon/60 via-maroon/40 to-maroon/60',
        'border border-gold-light/20 backdrop-blur-sm',
        'hover:border-gold-light/60 hover:shadow-2xl hover:shadow-gold-light/20',
        'transform hover:-translate-y-2 hover:scale-[1.02]',
        'before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-r',
        'before:from-gold-light/10 before:via-transparent before:to-gold-light/10',
        'before:opacity-0 before:transition-opacity before:duration-500',
        'hover:before:opacity-100',
        className
      )}
      onClick={() => setExpanded(!expanded)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animationDelay: `${index * 200}ms`,
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <div className={cn(
          "absolute -top-4 -right-4 w-20 h-20 bg-gold-light/10 rounded-full",
          "transition-all duration-700 ease-out",
          isHovered && "scale-150 opacity-20"
        )}></div>
        <div className={cn(
          "absolute -bottom-4 -left-4 w-16 h-16 bg-gold-light/5 rounded-full",
          "transition-all duration-700 ease-out delay-100",
          isHovered && "scale-125 opacity-15"
        )}></div>
      </div>

      <div className="relative z-10">
        {/* Header with icon and title */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className={cn(
              "relative p-3 rounded-xl bg-gold-gradient transition-all duration-500",
              "group-hover:scale-110 group-hover:rotate-3",
              expanded && "rotate-6 scale-105"
            )}>
              <div className="text-maroon">
                {icon}
              </div>
              {isHovered && (
                <div className="absolute inset-0 bg-gold-light/20 rounded-xl animate-pulse"></div>
              )}
            </div>
            
            <div className="space-y-1">
              <h3 className={cn(
                "text-2xl font-cormorant font-bold transition-all duration-300",
                "bg-gradient-to-r from-gold-light via-gold-light to-[#FFE55C] bg-clip-text text-transparent",
                "group-hover:from-[#FFE55C] group-hover:via-gold-light group-hover:to-gold-light"
              )}>
                {title}
              </h3>
              <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-3">
                <span className={cn(
                  "font-semibold text-cream transition-colors duration-300",
                  "group-hover:text-gold-light/90"
                )}>
                  {date}
                </span>
                <span className="hidden md:block text-gold-light/60">•</span>
                <span className="text-cream/80 font-opensans">{time}</span>
              </div>
            </div>
          </div>

          {/* Expand indicator */}
          <div className={cn(
            "flex items-center justify-center w-8 h-8 rounded-full",
            "bg-gold-light/20 transition-all duration-300",
            "group-hover:bg-gold-light/30 group-hover:scale-110"
          )}>
            {expanded ? (
              <ChevronUp className="text-gold-light w-4 h-4" />
            ) : (
              <ChevronDown className="text-gold-light w-4 h-4" />
            )}
          </div>
        </div>

        {/* Venue information */}
        <div className="flex items-start space-x-3 mb-4">
          <MapPin className={cn(
            "text-gold-light w-5 h-5 mt-0.5 transition-all duration-300",
            "group-hover:scale-110 group-hover:text-[#FFE55C]"
          )} />
          <p className={cn(
            "text-cream/90 font-opensans leading-relaxed transition-colors duration-300",
            "group-hover:text-cream"
          )}>
            {venue}
          </p>
        </div>

        {/* Expanded content */}
        {expanded && (
          <div className="mt-6 space-y-4 animate-fade-in">
            <div className="h-px bg-gradient-to-r from-transparent via-gold-light/30 to-transparent"></div>
            
            {googleMapsUrl && (
              <button 
                onClick={handleMapClick}
                className={cn(
                  "group/btn flex items-center justify-center w-full px-6 py-3 rounded-xl",
                  "bg-gradient-to-r from-gold-light/10 to-gold-light/5",
                  "border border-gold-light/30 text-gold-light",
                  "hover:from-gold-light/20 hover:to-gold-light/10",
                  "hover:border-gold-light/50 hover:shadow-lg hover:shadow-gold-light/20",
                  "transition-all duration-300 transform hover:scale-[1.02]"
                )}
              >
                <MapPin className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                <span className="font-medium">View Location on Map</span>
                <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            )}

            {/* Decorative elements */}
            <div className="flex justify-center space-x-2 opacity-60">
              {[...Array(3)].map((_, i) => (
                <Sparkles 
                  key={i}
                  className={cn(
                    "w-3 h-3 text-gold-light animate-pulse",
                    `delay-${i * 200}`
                  )}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Shimmer effect on hover */}
      <div className={cn(
        "absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-700",
        "bg-gradient-to-r from-transparent via-gold-light/20 to-transparent",
        "transform -skew-x-12 -translate-x-full",
        "group-hover:translate-x-full group-hover:opacity-100"
      )}></div>
    </div>
  );
};

export default EnhancedEventCard;
