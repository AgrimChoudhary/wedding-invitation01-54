
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp, MapPin } from 'lucide-react';

interface EventCardProps {
  title: string;
  date: string;
  time: string;
  venue: string;
  icon: React.ReactNode;
  images?: string[];
  className?: string;
}

const EventCard: React.FC<EventCardProps> = ({
  title,
  date,
  time,
  venue,
  icon,
  images = [],
  className,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div 
      className={cn(
        'relative rounded-xl p-5 md:p-6 card-hover cursor-pointer',
        'border border-gold-light/30 bg-maroon/80 backdrop-blur-sm',
        'max-w-md mx-auto',
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
          <div className="mr-4 bg-gold-gradient p-2 rounded-full">
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
          <p>{venue}</p>
        </div>
        
        <div className="flex justify-center">
          {expanded ? (
            <ChevronUp className="text-gold-light opacity-70 mt-1" />
          ) : (
            <ChevronDown className="text-gold-light opacity-70 mt-1" />
          )}
        </div>

        {expanded && images.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-2 animate-fade-in">
            {images.map((image, index) => (
              <div key={index} className="aspect-square rounded-md overflow-hidden gold-border">
                <img
                  src={image}
                  alt={`${title} image ${index + 1}`}
                  className="w-full h-full object-cover transition-transform hover:scale-110 duration-300"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;
